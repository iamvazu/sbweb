import os
import re
import json
import sys
import argparse
from datetime import datetime
from dotenv import load_dotenv
from supabase import create_client

def load_env():
    """Load Supabase keys from env local."""
    load_dotenv('.env.local')
    url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    return url, key

def parse_date(date_str):
    if not date_str:
        return None
    # Remove timezone abbreviation (like EDT, EST) to avoid strptime failure
    clean_str = re.sub(r'\b[A-Z]{3,4}\b', '', date_str).strip()
    clean_str = re.sub(r'\s+', ' ', clean_str)
    try:
        dt = datetime.strptime(clean_str, "%m/%d/%Y %I:%M %p")
        return dt.isoformat()
    except Exception:
        try:
            dt = datetime.strptime(clean_str.split()[0], "%m/%d/%Y")
            return dt.isoformat()
        except Exception:
            return None

def parse_contact_info(contact_str):
    if not contact_str:
        return None, None, None
    
    # Extract email
    email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', contact_str)
    email = email_match.group(0) if email_match else None
    
    # Extract phone
    phone_match = re.search(r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', contact_str)
    phone = phone_match.group(0) if phone_match else None
    
    # Extract name by stripping email and phone
    name = contact_str
    if email:
        name = name.replace(email, "")
    if phone:
        name = name.replace(phone, "")
    
    # Clean up name string formatting
    name = re.sub(r'[\|,\;]', '', name)
    name = re.sub(r'\s+', ' ', name).strip()
    
    if not name or len(name) < 2 or name.lower() in ["n/a", "unknown"]:
        name = None
        
    return name, email, phone

def parse_prebid_events(events_str):
    if not events_str:
        return False, None, None, None, None, None
    
    # Split multiple events
    events = [e.strip() for e in events_str.split("Event Type") if e.strip()]
    
    prebid_event = None
    for e in events:
        e_lower = e.lower()
        if "prebid" in e_lower or "job-walk" in e_lower or "walk" in e_lower or "conference" in e_lower:
            prebid_event = e
            break
            
    if not prebid_event:
        return False, None, None, None, None, None
        
    is_mandatory = "mandatory" in prebid_event.lower()
    prebid_type = 'M' if is_mandatory else 'NM'
    
    date_match = re.search(r'Event date\s+(\d{2}/\d{2}/\d{4}\s+\d{2}:\d{2}\s+[AP]M)', prebid_event, re.IGNORECASE)
    
    prebid_date_str = None
    prebid_time = None
    if date_match:
        full_date_str = date_match.group(1)
        try:
            parts = full_date_str.split()
            prebid_time = parts[1] + " " + parts[2]
        except Exception:
            prebid_time = None
        try:
            dt = datetime.strptime(full_date_str, "%m/%d/%Y %I:%M %p")
            prebid_date_str = dt.isoformat()
        except Exception:
            prebid_date_str = full_date_str
            
    note_match = re.search(r'Event Note\s+(.*)', prebid_event, re.IGNORECASE)
    prebid_comments = note_match.group(1).strip() if note_match else None
    
    if prebid_comments:
        prebid_comments = re.sub(r'var\s+eventNoteText.*', '', prebid_comments).strip()
        
    prebid_location = "See notice detail"
    
    return is_mandatory, prebid_type, prebid_date_str, prebid_time, prebid_location, prebid_comments

def parse_service_areas(location):
    if not location:
        return []
    
    county_name = location.strip()
    if county_name.lower().endswith(" county"):
        county_name = county_name[:-7].strip()
        
    id_code = county_name[:3].upper()
    return [{"county": county_name, "id": id_code}]

def parse_doc_links(docs_str):
    if not docs_str:
        return []
    docs = [d.strip() for d in docs_str.split(",") if d.strip()]
    return [{"name": d, "url": ""} for d in docs]

def run_import(dry_run=False):
    # Load env
    url, key = load_env()
    if not url or not key:
        print("[ERROR] NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be in .env.local")
        sys.exit(1)

    filepath = r"C:\Users\dell\.gemini\antigravity\scratch\bidnet_scraper\bids.json"
    if not os.path.exists(filepath):
        print(f"[ERROR] Scraper bids.json not found at {filepath}")
        sys.exit(1)

    print(f"\n{'='*70}")
    print(f"  BidNet Data Importer & Merger - Stronger Built Group LLC")
    print(f"  Mode: {'DRY RUN (No Database Changes)' if dry_run else 'PRODUCTION IMPORT'}")
    print(f"{'='*70}\n")

    # Load data
    with open(filepath, 'r', encoding='utf-8') as f:
        scraper_data = json.load(f)

    print(f"Total raw listings scanned: {len(scraper_data)}")

    # Filter valid
    valid_bids = []
    for r in scraper_data:
        ref = r.get("reference_number", "").strip()
        if not ref or ref.startswith("UNKNOWN_REF"):
            continue
        valid_bids.append(r)

    print(f"Filtered clean detailed listings: {len(valid_bids)} (Excluded {len(scraper_data) - len(valid_bids)} incomplete scrapes)\n")

    if not valid_bids:
        print("[INFO] No valid records found to import.")
        return

    # Parse and construct upsert rows
    db_rows = []
    for idx, r in enumerate(valid_bids):
        ref_num = r.get("reference_number", "").strip()
        event_id = f"bidnet_{ref_num}"
        
        # Date parsing
        end_date = parse_date(r.get("closing_date"))
        published_date = parse_date(r.get("publication_date"))
        
        # Contact parsing
        contact_name, contact_email, contact_phone = parse_contact_info(r.get("contact_information"))
        
        # Prebid parsing
        mandatory_prebid, prebid_type, prebid_date, prebid_time, prebid_location, prebid_comments = parse_prebid_events(r.get("pre_bidding_events"))
        
        # Requirements & documents
        req_str = r.get("general_requirements", "")
        bonding_required = "bond" in req_str.lower() if req_str else False
        doc_links = parse_doc_links(r.get("downloaded_documents"))
        service_areas = parse_service_areas(r.get("location"))
        
        comments = r.get("description", "").strip()
        if not comments:
            comments = "See official BidNet notice details."

        row = {
            "event_id": event_id,
            "event_name": r.get("title", "Unknown BidNet Bid").strip(),
            "department_name": r.get("issuing_organization", "BidNet Direct").strip(),
            "type": r.get("solicitation_type", "Notice").strip(),
            "end_date": end_date,
            "published_date": published_date,
            "contact_name": contact_name,
            "contact_email": contact_email,
            "contact_phone": contact_phone,
            "comments": comments,
            "status": "Posted",
            "source": "bidnet",
            "portal_link": r.get("detail_url", "https://www.bidnetdirect.com").strip(),
            "bonding_required": bonding_required,
            "doc_links": doc_links,
            "service_areas": service_areas,
            "mandatory_prebid": mandatory_prebid,
            "prebid_type": prebid_type,
            "prebid_date": prebid_date,
            "prebid_time": prebid_time,
            "prebid_location": prebid_location if prebid_date else None,
            "prebid_comments": prebid_comments
        }
        db_rows.append(row)

    if dry_run:
        # Show first 3 samples
        print("--- DRY RUN: SAMPLES PARSED ---")
        for i in range(min(3, len(db_rows))):
            print(f"Sample #{i+1}:")
            print(json.dumps(db_rows[i], indent=2))
            print("-" * 40)
        print(f"\n[DRY RUN OK] Successfully verified {len(db_rows)} records. No DB changes made.")
        return

    # Production Import
    supabase = create_client(url, key)
    
    import time
    
    # Let's import in batches of 15 for extra reliability
    BATCH_SIZE = 15
    success_count = 0
    fail_count = 0
    total_batches = (len(db_rows) + BATCH_SIZE - 1) // BATCH_SIZE

    print(f"Beginning Supabase batch upsert of {len(db_rows)} records...")

    for i in range(0, len(db_rows), BATCH_SIZE):
        batch = db_rows[i:i + BATCH_SIZE]
        batch_no = i // BATCH_SIZE + 1
        end_idx = min(i + BATCH_SIZE, len(db_rows))
        
        print(f"  Batch {batch_no:2}/{total_batches} (Rows {i+1}-{end_idx}) ... ", end="", flush=True)
        
        retries = 3
        success = False
        last_error = ""
        while retries > 0 and not success:
            try:
                res = supabase.table("bids").upsert(batch, on_conflict="event_id").execute()
                if res.data:
                    success_count += len(batch)
                    print("[OK]")
                    success = True
                else:
                    last_error = "No data returned"
                    retries -= 1
                    time.sleep(1)
            except Exception as e:
                last_error = str(e)
                retries -= 1
                time.sleep(1.5)
        
        if not success:
            print(f"[RETRYING GRANULARLY]")
            for record in batch:
                single_success = False
                single_retries = 2
                while single_retries > 0 and not single_success:
                    try:
                        res = supabase.table("bids").upsert([record], on_conflict="event_id").execute()
                        if res.data:
                            success_count += 1
                            single_success = True
                        else:
                            single_retries -= 1
                            time.sleep(0.5)
                    except Exception as single_e:
                        last_error = str(single_e)
                        single_retries -= 1
                        time.sleep(0.5)
                if not single_success:
                    fail_count += 1
                    print(f"    Failed row {record['event_id']}: {last_error}")

    print(f"\n{'='*70}")
    print(f"  IMPORT DONE: OK {success_count} upserted  ·  FAILED {fail_count} failed")
    print(f"{'='*70}\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="BidNet Data Importer")
    parser.add_argument("--dry-run", action="store_true", help="Run script in dry-run mode without committing to database.")
    args = parser.parse_args()

    run_import(dry_run=args.dry_run)
