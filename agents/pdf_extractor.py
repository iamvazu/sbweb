import os
import logging
import requests
import io
import pdfplumber
from dotenv import load_dotenv
from supabase import create_client, Client
from playwright.sync_api import sync_playwright
from scraper_utils import get_browser, create_context, navigate_with_retry

# Load environment
load_dotenv()
from db_utils import get_supabase_client
from playwright.sync_api import sync_playwright
from scraper_utils import get_browser, create_context, navigate_with_retry

# Initialize
logger = logging.getLogger("pdf_extractor")
supabase: Client = get_supabase_client()

BUCKET_NAME = "bid-documents"

def extract_content_from_pdf(pdf_bytes):
    """Extracts text content from PDF bytes."""
    text = ""
    try:
        with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        logger.error(f"Error extracting text from PDF: {e}")
    return text

def process_bid_pdfs(page, bid):
    """Finds, downloads, and processes PDFs for a bid."""
    logger.info(f"Processing PDFs for bid: {bid['event_id']}")
    
    if not navigate_with_retry(page, bid['portal_link']):
        return
        
    # Find PDF links - Cal eProcure usually has 'View Event Package' button
    # which leads to a list of attachments. 
    # This might require a nested interaction.
    
    # For now, we simulate finding the 'Download' links on the page
    download_links = page.query_selector_all("a[href*='.pdf']")
    
    pdf_urls = []
    full_text = ""
    
    for link in download_links:
        try:
            url = link.get_attribute("href")
            filename = url.split("/")[-1].split("?")[0] or "document.pdf"
            
            # Use requests to download (might need cookies from playwright)
            # Or use page.expect_download()
            
            # Simple approach: navigate to PDF or click
            with page.expect_download() as download_info:
                link.click()
            download = download_info.value
            path = download.path()
            
            with open(path, "rb") as f:
                content = f.read()
                
            # Upload to Supabase Storage
            storage_path = f"{bid['event_id']}/{filename}"
            supabase.storage.from_(BUCKET_NAME).upload(
                path=storage_path,
                file=content,
                file_options={"content-type": "application/pdf"}
            )
            
            public_url = supabase.storage.from_(BUCKET_NAME).get_public_url(storage_path)
            pdf_urls.append(public_url)
            
            # Extract text
            full_text += extract_content_from_pdf(content)
            
        except Exception as e:
            logger.error(f"Failed to process PDF {filename}: {e}")

    if pdf_urls:
        supabase.table("bids").update({
            "pdf_urls": pdf_urls,
            "extracted_text": full_text[:100000] # Cap to stay within DB limits
        }).eq("id", bid["id"]).execute()
        logger.info(f"Updated {bid['event_id']} with {len(pdf_urls)} PDFs.")

def run():
    if not supabase:
        return

    # Ensure bucket exists
    try:
        buckets = supabase.storage.list_buckets()
        exists = any(b.name == BUCKET_NAME for b in buckets)
        if not exists:
            logger.info(f"Creating storage bucket: {BUCKET_NAME}")
            supabase.storage.create_bucket(BUCKET_NAME, options={'public': True})
    except Exception as e:
        logger.error(f"Error initializing bucket: {e}")

    # Find bids that have been deep-scraped but have no PDFs processed
    res = supabase.table("bids").select("*").not_.is_("prebid_type", "null").is_("extracted_text", "null").limit(5).execute()
    bids = res.data
    
    if not bids:
        logger.info("No bids pending PDF extraction.")
        return

    with sync_playwright() as p:
        browser = get_browser(p)
        context = create_context(browser)
        page = context.new_page()
        
        for bid in bids:
            process_bid_pdfs(page, bid)
            
        browser.close()

if __name__ == "__main__":
    run()
