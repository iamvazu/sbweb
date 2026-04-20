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
        # --- BASIC INFO ---
        # 1. Description (DERIVED_EVENT_LONG_DESCR)
        desc_el = page.query_selector("span[id^='DERIVED_EVENT_LONG_DESCR$']")
        if desc_el:
            data['comments'] = desc_el.inner_text().strip()
            
        # 2. Event Details (Version, Format/Type, Dates)
        version_el = page.query_selector("span[id^='AUC_HDR_VW_AUC_ROUND$']")
        if version_el:
            data['event_version'] = version_el.inner_text().strip()
            
        format_type_el = page.query_selector("span[id^='AUC_HDR_VW_EVENT_FORMAT_TYPE$']")
        if format_type_el:
            data['event_format_type'] = format_type_el.inner_text().strip()
            
        pub_date_el = page.query_selector("span[id^='AUC_HDR_VW_AUC_PUBLISH_DT$']")
        if pub_date_el:
            # We skip parsing to ISO here to keep the script simple, 
            # but we could use dateutil or similar if needed.
            data['published_date'] = pub_date_el.inner_text().strip()
            
        license_el = page.query_selector("span[id^='ZZ_AUC_HDR_VWG_ZZ_LICENSE_TYPE$']")
        if license_el:
            data['contractor_license_type'] = license_el.inner_text().strip()

        # --- CONTACT INFO ---
        contact_name_el = page.query_selector("#RESP_INQ_DL0_WK_CONTACT_NAME")
        if contact_name_el:
            data['contact_name'] = contact_name_el.inner_text().strip()
            
        contact_email_el = page.query_selector("#RESP_INQ_DL0_WK_EMAILID")
        if contact_email_el:
            data['contact_email'] = contact_email_el.inner_text().strip()

        # --- PRE-BID CONFERENCE ---
        prebid_section = page.query_selector("div:has-text('Pre Bid Conference')")
        if prebid_section:
            text = prebid_section.inner_text()
            if "Mandatory: Mandatory" in text:
                data['mandatory_prebid'] = True
            elif "Mandatory: Non Mandatory" in text:
                data['mandatory_prebid'] = False
            
            # Extract specifics using grid selectors if possible
            # These are usually single-row grids for pre-bid
            pb_date = page.query_selector("span[id^='ZZ_AUC_PREBID_VW_AUC_PREBID_DT$']")
            pb_time = page.query_selector("span[id^='ZZ_AUC_PREBID_VW_AUC_PRE_BID_TIME$']")
            pb_loc = page.query_selector("span[id^='ZZ_AUC_PREBID_VW_DESCRLONG$']")
            pb_comm = page.query_selector("span[id^='ZZ_AUC_PREBID_VW_DESCR254$']")
            
            if pb_date: data['prebid_date'] = pb_date.inner_text().strip()
            if pb_time: data['prebid_time'] = pb_time.inner_text().strip()
            if pb_loc: data['prebid_location'] = pb_loc.inner_text().strip()
            if pb_comm: data['prebid_comments'] = pb_comm.inner_text().strip()

        # --- TABLES (UNSPSC & SERVICE AREA) ---
        # UNSPSC
        unspsc_rows = page.query_selector_all("tr[id^='trZZ_AUC_UNSPSC_VW$']")
        unspsc_list = []
        for i, row in enumerate(unspsc_rows):
            code_el = row.query_selector(f"span[id^='ZZ_AUC_UNSPSC_VW_ZZ_UNSPSC$']")
            desc_el = row.query_selector(f"span[id^='ZZ_AUC_UNSPSC_VW_ZZ_UNSPSC_DESCR$']")
            if code_el and desc_el:
                unspsc_list.append({
                    "code": code_el.inner_text().strip(),
                    "description": desc_el.inner_text().strip()
                })
        data['unspsc_codes'] = unspsc_list

        # Service Area
        area_rows = page.query_selector_all("tr[id^='trZZ_AUC_SVC_AREA_VW$']")
        area_list = []
        for i, row in enumerate(area_rows):
            id_el = row.query_selector(f"span[id^='ZZ_AUC_SVC_AREA_VW_ZZ_AREA_ID$']")
            county_el = row.query_selector(f"span[id^='ZZ_AUC_SVC_AREA_VW_ZZ_COUNTY$']")
            if id_el and county_el:
                area_list.append({
                    "id": id_el.inner_text().strip(),
                    "county": county_el.inner_text().strip()
                })
        data['service_areas'] = area_list
                
        # --- EVENT PACKAGE / ATTACHMENTS ---
        package_btn = page.query_selector("#RESP_INQ_DL0_WK_AUC_DOWNLOAD_PB")
        if package_btn:
            logger.info(f"Stepping into Event Package for {bid['event_id']}")
            # Use clicks and wait for navigation/load
            package_btn.click()
            page.wait_for_load_state("networkidle")
            human_delay(2, 3)
            
            # Find document links
            doc_links = []
            rows = page.query_selector_all("tr[id^='trPV_ATTACH_WRK_SCM_DOWNLOAD$']")
            for i, row in enumerate(rows):
                name_el = row.query_selector(f"#PV_ATTACH_WRK_ATTACH_DESCR\\${i}")
                btn_el = row.query_selector(f"#PV_ATTACH_WRK_SCM_DOWNLOAD\\${i}")
                
                if name_el and btn_el:
                    doc_name = name_el.inner_text().strip()
                    doc_links.append({
                        "name": doc_name,
                        "type": "solicitation_doc",
                        "status": "identified"
                    })
            data['doc_links'] = doc_links
            page.go_back()
            page.wait_for_load_state("networkidle")

    except Exception as e:
        logger.error(f"Error during deep scrape for {bid['event_id']}: {e}")
        
    return data

def run():
    if not supabase:
        logger.error("Supabase not initialized.")
        return

    # Targeting bids that lack description OR were scraped before we added the new fields
    # We use or_ to capture both cases
    res = supabase.table("bids")\
        .select("*")\
        .eq("status", "Posted")\
        .or_("comments.is.null,unspsc_codes.is.null,event_version.is.null")\
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
                    # Explicit mapping to database columns
                    update_payload = {
                        "contact_name": details.get("contact_name"),
                        "contact_email": details.get("contact_email"),
                        "comments": details.get("comments"),
                        "mandatory_prebid": details.get("mandatory_prebid"),
                        "doc_links": details.get("doc_links", []),
                        "event_version": details.get("event_version"),
                        "event_format_type": details.get("event_format_type"),
                        "published_date": details.get("published_date"),
                        "prebid_date": details.get("prebid_date"),
                        "prebid_time": details.get("prebid_time"),
                        "prebid_location": details.get("prebid_location"),
                        "prebid_comments": details.get("prebid_comments"),
                        "unspsc_codes": details.get("unspsc_codes", []),
                        "service_areas": details.get("service_areas", []),
                        "contractor_license_type": details.get("contractor_license_type")
                    }
                    
                    # Remove None values to avoid overwriting existing data with nulls
                    update_payload = {k: v for k, v in update_payload.items() if v is not None}
                    
                    if update_payload:
                        supabase.table("bids").update(update_payload).eq("id", bid["id"]).execute()
                        logger.info(f"Successfully deep scraped {bid['event_id']}")
            except Exception as e:
                logger.error(f"Failed to deep scrape {bid['event_id']}: {e}")
            time.sleep(3)
            
        browser.close()

if __name__ == "__main__":
    run()
