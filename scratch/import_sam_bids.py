import os
import csv
import re
import sys
import argparse
import time
from datetime import datetime, timezone
from dotenv import load_dotenv
from supabase import create_client

# 50 States Mapping
STATE_MAP = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
    'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
    'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
    'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
    'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
    'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
    'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
    'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
    'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
    'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming',
    'DC': 'District of Columbia', 'PR': 'Puerto Rico', 'VI': 'Virgin Islands', 'GU': 'Guam'
}

# Industry NAICS Prefixes
TARGET_PREFIXES = (
    "5415", "518", "511",          # IT & Software
    "62", "5613",                  # Healthcare & Staffing
    "5416", "5413", "5411", "5412", # Professional Services
    "5616",                        # Security & Operations
    "61",                          # Education & Training
    "5617", "2382", "2362", "238", # Facilities & Maintenance
    "42", "48", "49"               # Material Supply & Logistics
)

def load_env():
    load_dotenv('.env.local')
    url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    return url, key

def parse_iso_utc(date_str):
    if not date_str:
        return None
    try:
        # datetime.fromisoformat handles offsets like -05:00 in Python 3.7+
        dt = datetime.fromisoformat(date_str.strip())
        # Convert to UTC
        return dt.astimezone(timezone.utc).isoformat()
    except Exception:
        # Fallback to simple parse or return original
        return date_str

def clean_text(text):
    if not text:
        return ""
    # Remove excessive whitespace, HTML tags if any, etc.
    text = re.sub(r'<[^>]*>', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def run_import(dry_run=False):
    url, key = load_env()
    if not url or not key:
        print("[ERROR] Supabase URL or Service Role Key is missing in .env.local")
        sys.exit(1)

    csv_path = "ContractOpportunitiesFullCSV.csv"
    if not os.path.exists(csv_path):
        print(f"[ERROR] CSV file not found at {csv_path}")
        sys.exit(1)

    print(f"\n{'='*70}")
    print(f"  SAM.gov Opportunities Importer - Stronger Built Group LLC")
    print(f"  Mode: {'DRY RUN (No Database Changes)' if dry_run else 'PRODUCTION IMPORT'}")
    print(f"{'='*70}\n")

    cutoff_date = datetime(2026, 6, 6, tzinfo=timezone.utc)
    records_to_upsert = []

    print("Reading and parsing CSV file...")
    try:
        with open(csv_path, 'r', encoding='utf-8', errors='ignore') as f:
            reader = csv.reader(f)
            headers = next(reader)
            
            # Map header indices
            idx_notice_id = headers.index("NoticeId")
            idx_title = headers.index("Title")
            idx_sol_num = headers.index("Sol#")
            idx_dept = headers.index("Department/Ind.Agency")
            idx_sub_tier = headers.index("Sub-Tier")
            idx_type = headers.index("Type")
            idx_setaside_code = headers.index("SetASideCode")
            idx_setaside = headers.index("SetASide")
            idx_deadline = headers.index("ResponseDeadLine")
            idx_naics = headers.index("NaicsCode")
            idx_pop_city = headers.index("PopCity")
            idx_pop_state = headers.index("PopState")
            idx_pop_country = headers.index("PopCountry")
            idx_active = headers.index("Active")
            idx_p_fullname = headers.index("PrimaryContactFullname")
            idx_p_email = headers.index("PrimaryContactEmail")
            idx_p_phone = headers.index("PrimaryContactPhone")
            idx_s_fullname = headers.index("SecondaryContactFullname")
            idx_s_email = headers.index("SecondaryContactEmail")
            idx_s_phone = headers.index("SecondaryContactPhone")
            idx_state = headers.index("State")
            idx_link = headers.index("Link")
            idx_description = headers.index("Description")

            row_count = 0
            matching_count = 0
            
            for row in reader:
                row_count += 1
                if row_count % 20000 == 0:
                    print(f"  Scanned {row_count} rows...")

                # Filter: Active == Yes
                active = row[idx_active].strip().lower()
                if active != "yes":
                    continue

                # Filter: Deadline >= Cutoff (2026-06-06)
                deadline_str = row[idx_deadline].strip()
                if not deadline_str:
                    continue

                try:
                    # Clean date part for parsing
                    date_part = deadline_str[:10]
                    dt = datetime.strptime(date_part, "%Y-%m-%d").replace(tzinfo=timezone.utc)
                    if dt < cutoff_date:
                        continue
                except ValueError:
                    # If unparseable date, skip it to ensure data quality
                    continue

                # Filter: NAICS Code starts with target industry prefixes
                naics = row[idx_naics].strip()
                if not naics.startswith(TARGET_PREFIXES):
                    continue

                matching_count += 1

                # Parse State and Map to Full Name
                pop_state_code = row[idx_pop_state].strip().upper()
                office_state_code = row[idx_state].strip().upper()
                state_code = pop_state_code if pop_state_code else office_state_code
                state_name = STATE_MAP.get(state_code, None)

                # Clean Title and Agency Name
                title = clean_text(row[idx_title])
                dept_agency = clean_text(row[idx_dept])
                sub_tier = clean_text(row[idx_sub_tier])
                
                # Formulate Department Name
                full_dept_parts = []
                if dept_agency:
                    full_dept_parts.append(dept_agency)
                if sub_tier and sub_tier != dept_agency:
                    full_dept_parts.append(sub_tier)
                
                dept_name = " - ".join(full_dept_parts)
                if state_name:
                    dept_name = f"{dept_name} ({state_name})"

                # Set-aside evaluation
                setaside_code = row[idx_setaside_code].strip().upper()
                setaside_text = row[idx_setaside].strip()
                description = clean_text(row[idx_description])
                
                sbe_only = False
                if setaside_code and setaside_code != "NONE":
                    sbe_only = True
                elif "small business" in setaside_text.lower():
                    sbe_only = True
                elif any(kw in (title + " " + description).lower() for kw in ["small business set-aside", "set-aside for small business", "sba set-aside", "8(a)", "8a", "wosb", "sdvosb"]):
                    sbe_only = True

                # Prevailing Wage evaluation
                prevailing_wage = False
                if any(kw in (title + " " + description).lower() for kw in ["prevailing wage", "davis-bacon", "davis bacon", "certified payroll"]):
                    prevailing_wage = True

                # Bonding evaluation
                bonding_required = False
                if any(kw in (title + " " + description).lower() for kw in ["bid bond", "performance bond", "payment bond", "bonding required", "surety bond", "bonding requirement"]):
                    bonding_required = True

                # Contact info
                p_fullname = clean_text(row[idx_p_fullname])
                p_email = clean_text(row[idx_p_email])
                p_phone = clean_text(row[idx_p_phone])
                s_fullname = clean_text(row[idx_s_fullname])
                s_email = clean_text(row[idx_s_email])
                s_phone = clean_text(row[idx_s_phone])

                contact_name = p_fullname if p_fullname else (s_fullname if s_fullname else None)
                contact_email = p_email if p_email else (s_email if s_email else None)
                contact_phone = p_phone if p_phone else (s_phone if s_phone else None)

                # Link
                portal_link = row[idx_link].strip()
                if not portal_link:
                    portal_link = f"https://sam.gov/workspace/contract/opp/{row[idx_notice_id]}/view"

                # Comments: Inject Location & Set-aside at the beginning
                comments_prefix = []
                pop_city = clean_text(row[idx_pop_city])
                if pop_city or state_name:
                    loc = f"{pop_city}, {state_name}" if pop_city and state_name else (pop_city if pop_city else state_name)
                    comments_prefix.append(f"Location: {loc}.")
                if setaside_text and setaside_text != "No Set aside used":
                    comments_prefix.append(f"Set-Aside: {setaside_text}.")
                
                prefix_str = " ".join(comments_prefix)
                comments = f"{prefix_str} {description}".strip() if prefix_str else description

                # Standardize timestamps
                end_date = parse_iso_utc(deadline_str)
                now_iso = datetime.now(timezone.utc).isoformat()

                db_row = {
                    "event_id": f"sam_{row[idx_notice_id].strip()}",
                    "event_name": title if title else "Unknown SAM.gov Opportunity",
                    "department_name": dept_name if dept_name else "Federal Agency (USA)",
                    "type": row[idx_type].strip() if row[idx_type].strip() else "Solicitation",
                    "end_date": end_date,
                    "published_date": now_iso,
                    "contact_name": contact_name,
                    "contact_email": contact_email,
                    "contact_phone": contact_phone,
                    "comments": comments if comments else "See official SAM.gov notice details.",
                    "status": "Posted",
                    "source": "samgov",
                    "portal_link": portal_link,
                    "bonding_required": bonding_required,
                    "sbe_only": sbe_only,
                    "prevailing_wage": prevailing_wage,
                    "go_nogo": "PENDING",
                    "first_seen": now_iso,
                    "last_updated": now_iso
                }
                records_to_upsert.append(db_row)

    except Exception as e:
        print(f"[ERROR] Failed to read CSV: {e}")
        sys.exit(1)

    print(f"\nScan complete. Found {matching_count} active, industry-relevant opportunities matching NAICS filters out of {row_count} total CSV rows.")

    if not records_to_upsert:
        print("[INFO] No records found matching criteria.")
        return

    if dry_run:
        print("\n--- DRY RUN: PRINTING 3 SAMPLES ---")
        for i in range(min(3, len(records_to_upsert))):
            print(f"Record #{i+1}:")
            for k, v in records_to_upsert[i].items():
                if k == "comments":
                    print(f"  {k}: {v[:120]}... [truncated]")
                else:
                    print(f"  {k}: {v}")
            print("-" * 40)
        print(f"\n[DRY RUN OK] Successfully validated {len(records_to_upsert)} records. No DB changes made.")
        return

    # Production database import
    supabase = create_client(url, key)
    BATCH_SIZE = 50
    success_count = 0
    fail_count = 0
    total_batches = (len(records_to_upsert) + BATCH_SIZE - 1) // BATCH_SIZE

    print(f"\nBeginning Supabase batch upsert of {len(records_to_upsert)} records in batches of {BATCH_SIZE}...")

    for i in range(0, len(records_to_upsert), BATCH_SIZE):
        batch = records_to_upsert[i:i + BATCH_SIZE]
        batch_no = i // BATCH_SIZE + 1
        end_idx = min(i + BATCH_SIZE, len(records_to_upsert))
        
        print(f"  Batch {batch_no}/{total_batches} (Rows {i+1}-{end_idx}) ... ", end="", flush=True)
        
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
            print("[RETRYING GRANULARLY]")
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
    print(f"  IMPORT COMPLETED: {success_count} upserted successfully  ·  {fail_count} failed")
    print(f"{'='*70}\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="SAM.gov CSV Opportunity Importer")
    parser.add_argument("--dry-run", action="store_true", help="Run script in dry-run mode without committing to database.")
    args = parser.parse_args()

    run_import(dry_run=args.dry_run)
