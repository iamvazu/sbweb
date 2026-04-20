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
        # --- TEMPLATE DETECTION & BASIC INFO ---
        # 1. Description (AUC fallback to WV)
        desc_selectors = ["span[id^='DERIVED_EVENT_LONG_DESCR$']", "span[id^='WV_EVENT_HDR_VW_DESCRLONG$']"]
        for sel in desc_selectors:
            el = page.query_selector(sel)
            if el:
                data['comments'] = el.inner_text().strip()
                break
            
        # 2. Event Version
        ver_selectors = ["span[id^='AUC_HDR_VW_AUC_ROUND$']", "span[id^='WV_EVENT_HDR_VW_AUC_ROUND$']", "span[id^='WV_EVENT_HDR_VW_REVISION_NO$']"]
        for sel in ver_selectors:
            el = page.query_selector(sel)
            if el:
                data['event_version'] = el.inner_text().strip()
                break
            
        # 3. Format/Type
        fmt_selectors = ["span[id^='AUC_HDR_VW_EVENT_FORMAT_TYPE$']", "span[id^='WV_EVENT_HDR_VW_EVENT_FORMAT_TYPE$']"]
        for sel in fmt_selectors:
            el = page.query_selector(sel)
            if el:
                data['event_format_type'] = el.inner_text().strip()
                break
            
        # 4. Published Date
        pub_selectors = ["span[id^='AUC_HDR_VW_AUC_PUBLISH_DT$']", "span[id^='WV_EVENT_HISTORY_VW_PUBLISHED_DATE$']", "span[id^='WV_EVENT_HISTORY_VW_PUB_DATE$']"]
        for sel in pub_selectors:
            el = page.query_selector(sel)
            if el:
                data['published_date'] = el.inner_text().strip()
                break
            
        # 5. Contractor License Type
        lic_selectors = ["span[id^='ZZ_AUC_HDR_VWG_ZZ_LICENSE_TYPE$']", "span[id^='WV_EVENT_HDR_VW_ZZ_LICENSE_TYPE$']"]
        for sel in lic_selectors:
            el = page.query_selector(sel)
            if el:
                data['contractor_license_type'] = el.inner_text().strip()
                break

        # --- CONTACT INFO ---
        contact_name_el = page.query_selector("#RESP_INQ_DL0_WK_CONTACT_NAME, span[id^='WV_EVENT_HDR_VW_CONTACT_NAME']")
        if contact_name_el:
            data['contact_name'] = contact_name_el.inner_text().strip()
            
        contact_email_el = page.query_selector("#RESP_INQ_DL0_WK_EMAILID, span[id^='WV_EVENT_HDR_VW_EMAILID']")
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
            
            # AUC Selectors
            pb_date = page.query_selector("span[id^='ZZ_AUC_PREBID_VW_AUC_PREBID_DT$'], span[id^='WV_PREBID_VW_AUC_PREBID_DT$']")
            pb_time = page.query_selector("span[id^='ZZ_AUC_PREBID_VW_AUC_PRE_BID_TIME$'], span[id^='WV_PREBID_VW_AUC_PRE_BID_TIME$']")
            pb_loc = page.query_selector("span[id^='ZZ_AUC_PREBID_VW_DESCRLONG$'], span[id^='WV_PREBID_VW_DESCRLONG$']")
            pb_comm = page.query_selector("span[id^='ZZ_AUC_PREBID_VW_DESCR254$'], span[id^='WV_PREBID_VW_DESCR254$']")
            
            if pb_date: data['prebid_date'] = pb_date.inner_text().strip()
            if pb_time: data['prebid_time'] = pb_time.inner_text().strip()
            if pb_loc: data['prebid_location'] = pb_loc.inner_text().strip()
            if pb_comm: data['prebid_comments'] = pb_comm.inner_text().strip()

        # --- TABLES (UNSPSC & SERVICE AREA) ---
        # Strategy: Use specific PeopleSoft IDs first, then resort to generic table headers
        
        # 1. UNSPSC
        unspsc_list = []
        rows = page.query_selector_all("tr[id^='trZZ_AUC_UNSPSC_VW$'], tr[id^='trWV_UNSPSC_LIST$']")
        for row in rows:
            code_el = row.query_selector("span[id*='UNSPSC$']")
            desc_el = row.query_selector("span[id*='UNSPSC_DESCR$']")
            if code_el and desc_el:
                unspsc_list.append({
                    "code": code_el.inner_text().strip(),
                    "description": desc_el.inner_text().strip()
                })
        
        # Fallback for generic tables
        if not unspsc_list:
            # Look for a table containing 'UNSPSC Classification' text
            table = page.query_selector("table:has-text('UNSPSC Classification')")
            if table:
                trs = table.query_selector_all("tr")
                for tr in trs[1:]: # Skip header
                    tds = tr.query_selector_all("td")
                    if len(tds) >= 2:
                        unspsc_list.append({
                            "code": tds[0].inner_text().strip(),
                            "description": tds[1].inner_text().strip()
                        })
        data['unspsc_codes'] = unspsc_list

        # 2. Service Area
        area_list = []
        rows = page.query_selector_all("tr[id^='trZZ_AUC_SVC_AREA_VW$'], tr[id^='trWV_SERVICE_AREA$']")
        for row in rows:
            id_el = row.query_selector("span[id*='AREA_ID$']")
            county_el = row.query_selector("span[id*='COUNTY$']")
            if id_el and county_el:
                area_list.append({
                    "id": id_el.inner_text().strip(),
                    "county": county_el.inner_text().strip()
                })
        
        if not area_list:
            table = page.query_selector("table:has-text('Service Area')")
            if table:
                trs = table.query_selector_all("tr")
                for tr in trs[1:]:
                    tds = tr.query_selector_all("td")
                    if len(tds) >= 2:
                        area_list.append({
                            "id": tds[0].inner_text().strip(),
                            "county": tds[1].inner_text().strip()
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
