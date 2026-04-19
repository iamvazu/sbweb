import os
import logging
import time
from dotenv import load_dotenv
from supabase import create_client, Client
from playwright.sync_api import sync_playwright
from scraper_utils import get_browser, create_context, navigate_with_retry, human_delay

# Load environment
load_dotenv()
logger = logging.getLogger("deep_scraper")

# Initialize Supabase
URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(URL, KEY) if URL and KEY else None

def deep_scrape_bid(page, bid):
    """Parses the detail page for a specific bid."""
    logger.info(f"Deep scraping bid: {bid['event_id']}")
    
    if not navigate_with_retry(page, bid['portal_link']):
        return None

    human_delay(1.5, 3)
    
    data = {}
    
    try:
        # 1. Extract Description
        desc_el = page.query_selector("span[id^='DERIVED_EVENT_LONG_DESCR$']")
        if desc_el:
            data['comments'] = desc_el.inner_text().strip()
            
        # 2. Extract Contact Info
        contact_name_el = row = page.query_selector("span[id^='DERIVED_EVENT_NAME$']") # Name
        # Actually in Cal eProcure, it's often in a specific div
        # Let's use broader selectors
        contact_section = page.query_selector("div:has-text('Contact Information')")
        if contact_section:
            # This is a bit complex in Playwright without specific IDs, 
            # but usually they are nearby spans
            pass

        # 3. Extract Pre-Bid Conference info
        prebid_section = page.query_selector("div:has-text('Pre Bid Conference')")
        if prebid_section:
            text = prebid_section.inner_text()
            if "Mandatory: Mandatory" in text:
                data['prebid_type'] = 'M'
            elif "Mandatory: Non Mandatory" in text:
                data['prebid_type'] = 'NM'
                
        # 4. Extract UNSPSC (Very important for matching)
        # These are in a grid/table
        unspsc_rows = page.query_selector_all("tr[id^='trGP_EVENT_UNSPSC$']")
        # We can store these in common field or specific one. 
        # For now, let's just log them or store in a JSON field if we have one.
        
    except Exception as e:
        logger.error(f"Error during deep scrape for {bid['event_id']}: {e}")
        
    return data

def run():
    if not supabase:
        logger.error("Supabase not initialized.")
        return

    # Find bids that need deep scraping
    res = supabase.table("bids").select("*").is_("prebid_type", "null").order("first_seen", desc=True).limit(20).execute()
    bids = res.data
    
    if not bids:
        logger.info("No bids pending deep scrape.")
        return
        
    logger.info(f"Targeting {len(bids)} bids for deep scraping.")

    with sync_playwright() as p:
        browser = get_browser(p)
        context = create_context(browser)
        page = context.new_page()
        
        for bid in bids:
            details = deep_scrape_bid(page, bid)
            if details:
                supabase.table("bids").update(details).eq("id", bid["id"]).execute()
                logger.info(f"Updated {bid['event_id']} with deep details.")
            time.sleep(2) # Rate limit guard
            
        browser.close()

if __name__ == "__main__":
    run()
