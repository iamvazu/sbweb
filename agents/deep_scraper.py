import os
import logging
import time
from datetime import datetime
from dotenv import load_dotenv
from supabase import create_client, Client
from playwright.sync_api import sync_playwright
from scraper_utils import get_browser, create_context, navigate_with_retry, human_delay
from db_utils import get_supabase_client

# Load environment
load_dotenv()

# Initialize
logger = logging.getLogger("deep_scraper")
supabase: Client = get_supabase_client()

def deep_scrape_bid(page, bid):
    """Parses the detail page and the event package for a specific bid."""
    logger.info(f"Deep scraping bid: {bid['event_id']} at {bid['portal_link']}")
    
    if not navigate_with_retry(page, bid['portal_link']):
        logger.error(f"Failed to navigate to {bid['portal_link']}")
        return None

    human_delay(2, 4)
    data = {}
    
    try:
        # 1. Description (AUC fallback to WV)
        # We use very flexible selectors to handle both templates
        desc_selectors = [
            "[id*='DERIVED_EVENT_LONG_DESCR']", 
            "[id*='WV_EVENT_HDR_VW_DESCRLONG']", 
            "[id*='AUC_HDR_DESCRLONG']",
            ".pre-wrap[data-if-label='descriptiondetails']",
            "div.pre-wrap:has-text('The contractor shall')",
            "span:has-text('The contractor shall')"
        ]
        for sel in desc_selectors:
            try:
                el = page.query_selector(sel)
                if el:
                    val = el.inner_text().strip()
                    # Only accept description if it's substantial and doesn't look like boilerplate
                    if val and len(val) > 10 and "The documents and files attached" not in val[:100]:
                        data['comments'] = val
                        logger.info(f"  [OK] Description found via {sel}")
                        break
            except: continue
            
        # 2. Event Version
        ver_selectors = ["[id*='AUC_HDR_VW_AUC_ROUND']", "[id*='WV_EVENT_HDR_VW_AUC_ROUND']", "[id*='WV_EVENT_HDR_VW_REVISION_NO']", "[id*='WV_EVENT_HDR_VW_AUC_ROUND_NO']"]
        for sel in ver_selectors:
            try:
                el = page.query_selector(sel)
                if el:
                    data['event_version'] = el.inner_text().strip()
                    logger.info(f"  [OK] Version: {data['event_version']}")
                    break
            except: continue
            
        # 3. Format/Type
        fmt_selectors = ["[id*='AUC_HDR_VW_EVENT_FORMAT_TYPE']", "[id*='WV_EVENT_HDR_VW_EVENT_FORMAT_TYPE']"]
        for sel in fmt_selectors:
            try:
                el = page.query_selector(sel)
                if el:
                    data['event_format_type'] = el.inner_text().strip()
                    break
            except: continue
            
        # 4. Published Date
        pub_selectors = ["[id*='AUC_HDR_VW_AUC_PUBLISH_DT']", "[id*='WV_EVENT_HISTORY_VW_PUBLISHED_DATE']", "[id*='WV_EVENT_HISTORY_VW_PUB_DATE']", "[id*='WV_EVENT_HISTORY_VW_PUBLISH_DT']"]
        for sel in pub_selectors:
            try:
                el = page.query_selector(sel)
                if el:
                    data['published_date'] = el.inner_text().strip()
                    logger.info(f"  [OK] Published: {data['published_date']}")
                    break
            except: continue
            
        # 5. Contractor License Type
        lic_selectors = ["[id*='ZZ_AUC_HDR_VWG_ZZ_LICENSE_TYPE']", "[id*='WV_EVENT_HDR_VW_ZZ_LICENSE_TYPE']"]
        for sel in lic_selectors:
            try:
                el = page.query_selector(sel)
                if el:
                    data['contractor_license_type'] = el.inner_text().strip()
                    break
            except: continue

        # --- CONTACT INFO ---
        contact_name_el = page.query_selector("[id*='AUC_HDR_NAME1'], #RESP_INQ_DL0_WK_CONTACT_NAME, [id*='WV_EVENT_HDR_VW_CONTACT_NAME']")
        if contact_name_el:
            data['contact_name'] = contact_name_el.inner_text().strip()
            
        contact_phone_el = page.query_selector("[id*='AUC_HDR_PHONE'], [id*='WV_EVENT_HDR_VW_PHONE']")
        if contact_phone_el:
            data['contact_phone'] = contact_phone_el.inner_text().strip()
            
        contact_email_el = page.query_selector("[id*='AUC_HDR_EMAIL'], #RESP_INQ_DL0_WK_EMAILID, [id*='WV_EVENT_HDR_VW_EMAILID']")
        if contact_email_el:
            data['contact_email'] = contact_email_el.inner_text().strip()

        # --- PRE-BID CONFERENCE ---
        prebid_section = page.query_selector("div:has-text('Pre Bid Conference'), [id*='conferenceBidSection']")
        if prebid_section:
            text = prebid_section.inner_text()
            
            # Extract Mandatory Status
            mandatory_el = page.query_selector("[id*='ZZ_BID_CNF_VW_VALUE_XLATlbl$'], [id*='ZZ_BID_CNF_VW_COMMENT1$']")
            if mandatory_el:
                m_text = mandatory_el.inner_text().strip().lower()
                data['mandatory_prebid'] = "non mandatory" not in m_text and "mandatory" in m_text
            
            pb_date = page.query_selector("[id^='ZZ_BID_CNF_VW_DATE1$'], [id*='ZZ_AUC_PREBID_VW_AUC_PREBID_DT'], [id*='WV_PREBID_VW_AUC_PREBID_DT']")
            pb_time = page.query_selector("[id^='ZZ_BID_CNF_VW_DUE_DT_TIME$'], [id*='ZZ_AUC_PREBID_VW_AUC_PRE_BID_TIME'], [id*='WV_PREBID_VW_AUC_PRE_BID_TIME']")
            pb_loc = page.query_selector("[id^='ZZ_BID_CNF_VW_DESCR254_1$'], [id*='ZZ_AUC_PREBID_VW_DESCRLONG'], [id*='WV_PREBID_VW_DESCRLONG']")
            pb_comm = page.query_selector("[id^='ZZ_BID_CNF_VW_DESCR254_MIXED$'], [id*='ZZ_AUC_PREBID_VW_DESCR254'], [id*='WV_PREBID_VW_DESCR254']")
            
            if pb_date: data['prebid_date'] = pb_date.inner_text().strip()
            if pb_time: data['prebid_time'] = pb_time.inner_text().strip()
            if pb_loc: data['prebid_location'] = pb_loc.inner_text().strip()
            if pb_comm: data['prebid_comments'] = pb_comm.inner_text().strip()

        # --- TABLES (UNSPSC & SERVICE AREA) ---
        # 1. UNSPSC
        unspsc_list = []
        rows = page.query_selector_all("tr[id^='trZZ_AUC_UNSPSC_VW'], tr[id^='trWV_UNSPSC_LIST']")
        for row in rows:
            code_el = row.query_selector("span[id*='UNSPSC$']")
            desc_el = row.query_selector("span[id*='UNSPSC_DESCR$']")
            if code_el and desc_el:
                unspsc_list.append({"code": code_el.inner_text().strip(), "description": desc_el.inner_text().strip()})
        
        if not unspsc_list:
            table = page.query_selector("table:has-text('UNSPSC Classification')")
            if table:
                trs = table.query_selector_all("tr")
                for tr in trs[1:]:
                    tds = tr.query_selector_all("td")
                    if len(tds) >= 2:
                        unspsc_list.append({"code": tds[0].inner_text().strip(), "description": tds[1].inner_text().strip()})
        data['unspsc_codes'] = unspsc_list

        # 2. Service Area
        area_list = []
        rows = page.query_selector_all("tr[id^='trZZ_AUC_SVC_AREA_VW'], tr[id^='trWV_SERVICE_AREA']")
        for row in rows:
            id_el = row.query_selector("span[id*='AREA_ID$']")
            county_el = row.query_selector("span[id*='COUNTY$']")
            if id_el and county_el:
                area_list.append({"id": id_el.inner_text().strip(), "county": county_el.inner_text().strip()})
        
        if not area_list:
            table = page.query_selector("table:has-text('Service Area')")
            if table:
                trs = table.query_selector_all("tr")
                for tr in trs[1:]:
                    tds = tr.query_selector_all("td")
                    if len(tds) >= 2:
                        area_list.append({"id": tds[0].inner_text().strip(), "county": tds[1].inner_text().strip()})
        data['service_areas'] = area_list
                 
    except Exception as e:
        logger.error(f"Error during deep scrape for {bid['event_id']}: {e}")
        
    return data

def run():
    if not supabase:
        logger.error("Supabase not initialized.")
        return

    # Backfill logic: published_date or comments are the reliable flags
    # We remove the limit to process ALL 600+ bids in one go.
    # We use desc=False (ASC) to clear the backlog from oldest to newest.
    res = supabase.table("bids")\
        .select("*")\
        .eq("status", "Posted")\
        .or_("published_date.is.null,comments.is.null,contact_phone.is.null")\
        .order("first_seen", desc=False)\
        .execute()
    
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
            try:
                details = deep_scrape_bid(page, bid)
                if details:
                    # Clean up the published_date to be a valid ISO timestamp or current time
                    final_pub_date = details.get("published_date")
                    try:
                        if not final_pub_date:
                            final_pub_date = datetime.now().isoformat()
                        # If it's the Cal eProcure format, we might need to be careful, 
                        # but Supabase is quite good at parsing many strings.
                        # However, for our fallback, we MUST use a valid timestamp.
                    except:
                        final_pub_date = datetime.now().isoformat()

                    update_payload = {
                        "contact_name": details.get("contact_name"),
                        "contact_email": details.get("contact_email"),
                        "contact_phone": details.get("contact_phone"),
                        "comments": details.get("comments"),
                        "mandatory_prebid": details.get("mandatory_prebid"),
                        "event_version": details.get("event_version"),
                        "event_format_type": details.get("event_format_type"),
                        "published_date": final_pub_date,
                        "prebid_date": details.get("prebid_date"),
                        "prebid_time": details.get("prebid_time"),
                        "prebid_location": details.get("prebid_location"),
                        "prebid_comments": details.get("prebid_comments"),
                        "unspsc_codes": details.get("unspsc_codes", []),
                        "service_areas": details.get("service_areas", []),
                        "contractor_license_type": details.get("contractor_license_type")
                    }
                    
                    # Ensure we don't nullify existing good data
                    update_payload = {k: v for k, v in update_payload.items() if v is not None}
                    
                    if update_payload:
                        try:
                            supabase.table("bids").update(update_payload).eq("id", bid["id"]).execute()
                            logger.info(f"Successfully deep scraped {bid['event_id']}")
                        except Exception as inner_e:
                            logger.warning(f"Update failed for {bid['event_id']}: {inner_e}. Retrying without contact_phone.")
                            if "contact_phone" in update_payload:
                                del update_payload["contact_phone"]
                                supabase.table("bids").update(update_payload).eq("id", bid["id"]).execute()
                                logger.info(f"Successfully deep scraped {bid['event_id']} (sans phone)")
                            else:
                                raise inner_e
                logger.error(f"Failed to deep scrape {bid['event_id']}: {e}")
            time.sleep(2)
            
        browser.close()

if __name__ == "__main__":
    run()
