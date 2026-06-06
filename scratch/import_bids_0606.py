import os
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

def run_import(dry_run=False):
    # Load env
    url, key = load_env()
    if not url or not key:
        print("[ERROR] NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be in .env.local")
        sys.exit(1)

    json_file = "strongerbuilt_bids_060626.json"
    if not os.path.exists(json_file):
        print(f"[ERROR] Bids JSON file not found at {json_file}")
        sys.exit(1)

    print(f"\n{'='*70}")
    print(f"  Cal eProcure Bids Importer - Stronger Built Group LLC")
    print(f"  Mode: {'DRY RUN (No Database Changes)' if dry_run else 'PRODUCTION IMPORT'}")
    print(f"{'='*70}\n")

    # Load data
    with open(json_file, 'r', encoding='utf-8') as f:
        raw_data = json.load(f)

    print(f"Total raw listings in JSON: {len(raw_data)}")

    # Parse and construct upsert rows
    db_rows = []
    for r in raw_data:
        event_id_raw = r.get("eventId", "").strip()
        dept_code = r.get("department", "").strip()
        
        if not event_id_raw:
            continue
            
        # Standardize Cal eProcure event_id format
        event_id = f"cpe_{dept_code}_{event_id_raw}" if dept_code else f"cpe_unknown_{event_id_raw}"
        
        # Parse closing date
        end_date = r.get("endDateISO")
        if end_date:
            # Add UTC suffix if not present
            if not (end_date.endswith("Z") or "+" in end_date):
                end_date = end_date + "+00:00"

        # Portal link format for Cal eProcure
        portal_link = f"https://caleprocure.ca.gov/event/{dept_code}/{event_id_raw}" if dept_code else "https://caleprocure.ca.gov"

        row = {
            "event_id": event_id,
            "event_name": r.get("eventName", "Unknown Bid").strip(),
            "department_code": dept_code or None,
            "department_name": r.get("departmentName", "Unknown Agency").strip(),
            "format": r.get("format", "Sell").strip(),
            "type": r.get("type", "RFx").strip(),
            "end_date": end_date,
            "status": r.get("status", "Posted").strip(),
            "contact_name": r.get("buyerName", "").strip() or None,
            "contact_email": r.get("buyerEmail", "").strip() or None,
            "portal_link": portal_link,
            "source": "caleprocure",
            "last_updated": datetime.utcnow().isoformat() + "+00:00"
        }
        db_rows.append(row)

    print(f"Parsed {len(db_rows)} records successfully.\n")

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
    
    # Import in batches
    BATCH_SIZE = 50
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
                    time.sleep(0.5)
            except Exception as e:
                last_error = str(e)
                retries -= 1
                time.sleep(1)
        
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
                            time.sleep(0.2)
                    except Exception as single_e:
                        last_error = str(single_e)
                        single_retries -= 1
                        time.sleep(0.2)
                if not single_success:
                    fail_count += 1
                    print(f"    Failed row {record['event_id']}: {last_error}")

    print(f"\n{'='*70}")
    print(f"  IMPORT DONE: OK {success_count} upserted  ·  FAILED {fail_count} failed")
    print(f"{'='*70}\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Cal eProcure Bids Importer")
    parser.add_argument("--dry-run", action="store_true", help="Run script in dry-run mode without committing to database.")
    args = parser.parse_args()

    run_import(dry_run=args.dry_run)
