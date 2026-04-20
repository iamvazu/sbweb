import os
import logging
import time
from dotenv import load_dotenv
from supabase import create_client, Client
from playwright.sync_api import sync_playwright
from scraper_utils import get_browser, create_context, navigate_with_retry, human_delay

# Load environment
load_dotenv()
from db_utils import get_supabase_client
from playwright.sync_api import sync_playwright
from scraper_utils import get_browser, create_context, navigate_with_retry, human_delay

# Initialize
logger = logging.getLogger("deep_scraper")
supabase: Client = get_supabase_client()

def deep_scrape_bid(page, bid):
    """Parses the detail page and the event package for a specific bid."""
    logger.info(f"Deep scraping bid: {bid['event_id']}")
    
    if not navigate_with_retry(page, bid['portal_link']):
        return None

    human_delay(2, 4)
    
    data = {}
    
    try:
        # 1. Extract Description (DERIVED_EVENT_LONG_DESCR)
        desc_el = page.query_selector("span[id^='DERIVED_EVENT_LONG_DESCR$']")
        if desc_el:
            data['comments'] = desc_el.inner_text().strip()
            
        # 2. Extract Contact Info
        contact_name_el = page.query_selector("#RESP_INQ_DL0_WK_CONTACT_NAME")
        if contact_name_el:
            data['contact_name'] = contact_name_el.inner_text().strip()
            
        contact_email_el = page.query_selector("#RESP_INQ_DL0_WK_EMAILID")
        if contact_email_el:
            data['contact_email'] = contact_email_el.inner_text().strip()

        # 3. Extract Pre-Bid Conference info
        prebid_section = page.query_selector("div:has-text('Pre Bid Conference')")
        if prebid_section:
            text = prebid_section.inner_text()
            if "Mandatory: Mandatory" in text:
                data['mandatory_prebid'] = True
            elif "Mandatory: Non Mandatory" in text:
                data['mandatory_prebid'] = False
                
        # 4. Visit Event Package / Attachments
        package_btn = page.query_selector("#RESP_INQ_DL0_WK_AUC_DOWNLOAD_PB")
        if package_btn:
            logger.info(f"Stepping into Event Package for {bid['event_id']}")
            
            # Use clicks and wait for navigation/load
            package_btn.click()
            page.wait_for_load_state("networkidle")
            human_delay(2, 3)
            
            # Find document links
            doc_links = []
            # On the package page, documents are usually in a grid with specific IDs
            rows = page.query_selector_all("tr[id^='trPV_ATTACH_WRK_SCM_DOWNLOAD$']")
            for i, row in enumerate(rows):
                name_el = row.query_selector(f"#PV_ATTACH_WRK_ATTACH_DESCR\\${i}")
                btn_el = row.query_selector(f"#PV_ATTACH_WRK_SCM_DOWNLOAD\\${i}")
                
                if name_el and btn_el:
                    doc_name = name_el.inner_text().strip()
                    # Cal eProcure uses JS for downloads, but often there's a reference or we can mock it
                    # For now, we record the name and the event ID to prompt manual download OR background extraction
                    doc_links.append({
                        "name": doc_name,
                        "type": "solicitation_doc",
                        "status": "identified"
                    })
            
            data['doc_links'] = doc_links
            
            # Go back to detail page if needed for next loop, or just close/re-open
            # Returning to main details helps if we scrape more there
            page.go_back()
            page.wait_for_load_state("networkidle")

    except Exception as e:
        logger.error(f"Error during deep scrape for {bid['event_id']}: {e}")
        
    return data

def run():
    if not supabase:
        logger.error("Supabase not initialized.")
        return

    # Targeting bids that lack description or contact info
    res = supabase.table("bids")\
        .select("*")\
        .eq("status", "Posted")\
        .is_("comments", "null")\
        .order("first_seen", desc=True)\
        .limit(10)\
        .execute()
    
    bids = res.data
    
    if not bids:
        logger.info("No bids pending deep scrape.")
        return
        
    logger.info(f"Targeting {len(bids)} bids for high-fidelity deep scraping.")

    with sync_playwright() as p:
        browser = get_browser(p)
        context = create_context(browser)
        page = context.new_page()
        
        for bid in bids:
            try:
                details = deep_scrape_bid(page, bid)
                if details:
                    # Merge with existing data
                    supabase.table("bids").update(details).eq("id", bid["id"]).execute()
                    logger.info(f"Successfully deep scraped {bid['event_id']}")
            except Exception as e:
                logger.error(f"Failed to deep scrape {bid['event_id']}: {e}")
            time.sleep(3)
            
        browser.close()

if __name__ == "__main__":
    run()
