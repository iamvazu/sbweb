import os
import logging
from datetime import datetime
from dotenv import load_dotenv
from supabase import create_client, Client
from playwright.sync_api import sync_playwright
from scraper_utils import get_browser, create_context, navigate_with_retry, human_delay

# Load environment
load_dotenv()
logger = logging.getLogger("harvester")

# Initialize Supabase
URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
if not KEY:
    logger.error("SUPABASE_SERVICE_ROLE_KEY not found in environment!")

supabase: Client = create_client(URL, KEY) if URL and KEY else None

SEARCH_URL = "https://caleprocure.ca.gov/pages/Events/event-search.aspx"

def harvest():
    """
    Agent 1: Discovery
    Scrapes the main search page for 'Posted' bids.
    """
    logger.info("Starting Harvester (Discovery Agent)...")
    
    with sync_playwright() as p:
        browser = get_browser(p)
        context = create_context(browser)
        page = context.new_page()
        
        if not navigate_with_retry(page, SEARCH_URL):
            logger.error("Could not load search page.")
            return

        # Ensure we are looking at 'Posted' events
        # Note: In a real scenario, we'd interact with filters here if they aren't default.
        # For now, we scrape the results currently visible in the grid.
        
        human_delay(2, 4)
        
        # Select 'Posted' in the status dropdown if needed 
        # (Cal eProcure defaults to 'Posted' usually, but let's be safe if we can find the selector)
        
        bids_found = 0
        new_bids = 0
        
        # Scrape the grid
        # Cal eProcure uses a table with id 'win0divGP_EVENT_SRCH_VW$0' or similar
        # We look for rows in the event results grid
        rows = page.query_selector_all("tr[id^='trEVENT_SRCH_VW$']")
        
        logger.info(f"Found {len(rows)} potential bid rows on page 1.")
        
        for row in rows:
            try:
                # Extract basic info
                event_id_el = row.query_selector("span[id^='EVENT_ID$']")
                event_name_el = row.query_selector("a[id^='EVENT_NAME$']")
                dept_name_el = row.query_selector("span[id^='DEPT_NAME$']")
                end_date_el = row.query_selector("span[id^='EVENT_END_DT$']")
                
                if not event_id_el or not event_name_el:
                    continue
                    
                event_id = event_id_el.inner_text().strip()
                event_name = event_name_el.inner_text().strip()
                dept_name = dept_name_el.inner_text().strip() if dept_name_el else "Unknown"
                end_date_str = end_date_el.inner_text().strip() if end_date_el else None
                
                portal_link = event_name_el.get_attribute("href")
                # Normalize portal link if it's relative
                if portal_link and portal_link.startswith("/"):
                    portal_link = f"https://caleprocure.ca.gov{portal_link}"
                
                # Parse date (Format: MM/DD/YYYY HH:MMAM/PM)
                end_date_iso = None
                if end_date_str:
                    try:
                        # Simple parse for demo - real world needs flexible date parsing
                        dt = datetime.strptime(end_date_str.split(" ")[0], "%m/%d/%Y")
                        end_date_iso = dt.isoformat()
                    except:
                        pass

                bid_data = {
                    "event_id": event_id,
                    "event_name": event_name,
                    "department_name": dept_name,
                    "end_date": end_date_iso,
                    "portal_link": portal_link,
                    "status": "Posted",
                    "source": "caleprocure"
                }
                
                bids_found += 1
                
                if supabase:
                    # Upsert logic
                    res = supabase.table("bids").upsert(
                        bid_data, on_conflict="event_id"
                    ).execute()
                    
                    if res.data:
                        new_bids += 1
                        
            except Exception as e:
                logger.error(f"Error parsing row: {e}")

        browser.close()
        logger.info(f"Harvest complete. Found: {bids_found}, Updated/New: {new_bids}")

if __name__ == "__main__":
    harvest()
