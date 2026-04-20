"""
BidIQ — CaleProcure Prospects Import Script
Stronger Built Group LLC

Imports 21,255 clean CaleProcure registered businesses
into the public.prospects Supabase table.

Usage:
  1. Run 005_prospects.sql in Supabase SQL Editor first
  2. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY below
  3. Run: python3 import_prospects.py
  4. Verify: check Supabase Table Editor → prospects
"""

import json, os, sys, time, urllib.request, urllib.error

# ─── ENVIRONMENT LOADER ──────────────────────────────────────────
def load_env_local():
    """Manual .env.local loader to avoid dependency on python-dotenv."""
    env_path = os.path.join(os.getcwd(), ".env.local")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if "=" in line and not line.startswith("#"):
                    key, val = line.strip().split("=", 1)
                    os.environ[key] = val

load_env_local()
# ───────────────────────────────────────────────────────────────────

# ─── CONFIG ────────────────────────────────────────────────────────
SUPABASE_URL          = os.getenv("NEXT_PUBLIC_SUPABASE_URL", os.getenv("SUPABASE_URL", ""))
SUPABASE_SERVICE_KEY  = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
JSON_FILE             = "prospects_clean.json"   # output of clean script
BATCH_SIZE            = 100
DELAY_BETWEEN_BATCHES = 0.2   # seconds — stay well under rate limits
# ───────────────────────────────────────────────────────────────────


def upsert_batch(records):
    """POST a batch to Supabase REST, upsert on email conflict."""
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/prospects"
    headers = {
        "Content-Type":  "application/json",
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "apikey":        SUPABASE_SERVICE_KEY,
        "Prefer":        "resolution=merge-duplicates,return=minimal",
    }
    data = json.dumps(records, default=str).encode("utf-8")
    req  = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            return True, resp.status
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        return False, f"HTTP {e.code}: {body[:300]}"
    except Exception as ex:
        return False, str(ex)


def run():
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        print("[ERROR] Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first.")
        sys.exit(1)

    print(f"\n{'='*60}")
    print(f"  BidIQ - CaleProcure Prospects Import")
    print(f"{'='*60}\n")

    if not os.path.exists(JSON_FILE):
        print(f"[ERROR] File not found: {JSON_FILE}")
        sys.exit(1)

    with open(JSON_FILE) as f:
        records = json.load(f)

    total   = len(records)
    batches = (total + BATCH_SIZE - 1) // BATCH_SIZE
    ok = fail = 0

    print(f"[FILE] {total:,} clean records  -  {batches} batches of {BATCH_SIZE}\n")

    for i in range(0, total, BATCH_SIZE):
        batch    = records[i : i + BATCH_SIZE]
        batch_no = i // BATCH_SIZE + 1
        end_row  = min(i + BATCH_SIZE, total)

        print(f"  Batch {batch_no:3}/{batches}  "
              f"(rows {i+1:,}–{end_row:,})  ...", end="", flush=True)

        success, result = upsert_batch(batch)

        if success:
            ok  += len(batch)
            print(f" [OK]")
        else:
            fail += len(batch)
            print(f" [FAIL] {result}")

        if i + BATCH_SIZE < total:
            time.sleep(DELAY_BETWEEN_BATCHES)

    print(f"\n{'='*60}")
    print(f"  DONE  ·  ✅ {ok:,} upserted  ·  ❌ {fail:,} failed")
    print(f"{'='*60}\n")
    if ok > 0:
        print("Next step: run  send_welcome_emails.py  to start outreach.\n")


if __name__ == "__main__":
    run()
