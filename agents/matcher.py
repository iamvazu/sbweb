
import os, json, time, urllib.request, urllib.error, urllib.parse
from datetime import datetime, timezone

# ─── ENVIRONMENT LOADER ──────────────────────────────────────────
def load_env_local():
    """Manual .env.local loader."""
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
SUPABASE_URL         = os.getenv("NEXT_PUBLIC_SUPABASE_URL", os.getenv("SUPABASE_URL", ""))
SUPABASE_KEY         = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

# Batch sizes for processing
BID_BATCH_SIZE      = 100
PROSPECT_BATCH_SIZE = 1000
# ───────────────────────────────────────────────────────────────────

def supabase_get(path, params=None):
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/{path}"
    if params:
        url += "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "apikey": SUPABASE_KEY,
        "Accept": "application/json",
    })
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        print(f"❌ Supabase Get Error: {e.code} - {e.read().decode()}")
        return []

def supabase_upsert(path, data):
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/{path}"
    body = json.dumps(data).encode()
    req = urllib.request.Request(url, data=body, headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "apikey": SUPABASE_KEY,
        "Prefer": "resolution=merge-duplicates,return=minimal",
    }, method="POST")
    try:
        with urllib.request.urlopen(req) as r:
            return True
    except Exception as e:
        print(f"[ERROR] Supabase Upsert Error: {e}")
        return False

# ─── MATCHING ENGINE ──────────────────────────────────────────────

KEYWORD_MAP = {
    "janitorial": ["janitorial", "cleaning", "custodial", "sanitation", "floor", "window", "pressure wash", "chamber cleaning", "trash", "waste", "sanitary", "maintenance"],
    "construction": ["construction", "renovation", "remodel", "painting", "paving", "roofing", "plumbing", "electrical", "hvac", "tenant improvement", "installation", "door", "window", "gutter", "drywall", "concrete", "fencing"],
    "it": ["software", "it services", "programming", "networking", "cloud", "security", "hardware", "computer", "information technology", "saas", "cyber"],
    "landscaping": ["landscaping", "landscape", "grounds", "irrigation", "tree", "mowing", "weed", "arborist", "pest", "vegetation"],
    "staffing": ["staffing", "personnel", "recruitment", "labor", "temporary services", "hr", "workforce"],
    "professional": ["consulting", "engineering", "architecture", "management", "legal", "accounting", "environmental", "audit", "training"]
}

def calculate_match(bid, prospect):
    score = 0
    reasons = []

    # 1. Eligibility (Certification) - 40 points
    bid_text = ((bid.get("event_name") or "") + " " + (bid.get("comments") or "")).upper()
    prospect_certs = prospect.get("cert_types") or []

    is_dvbe_bid = "DVBE" in bid_text or (bid.get("dvbe_goal") and float(bid["dvbe_goal"]) > 0)
    is_sb_bid = " SBE " in bid_text or " SMALL BUSINESS " in bid_text or bid.get("sbe_only")

    if is_dvbe_bid:
        if "DVBE" in prospect_certs:
            score += 40
            reasons.append("Eligible: DVBE Certified")
    elif is_sb_bid:
        if any(c in prospect_certs for c in ["SB", "SB(Micro)", "SB-PW", "SBE"]):
            score += 40
            reasons.append("Eligible: Small Business Certified")
    else:
        score += 20
        reasons.append("Eligible: Open/No Set-Aside")

    # 2. Geography - 30 points
    prospect_areas = prospect.get("service_areas") or []
    geo_match = any(area.upper() in bid_text for area in prospect_areas)
    
    if geo_match:
        score += 30
        reasons.append("Geo: Local Area Match")

    # 3. Industry/Keywords - 30 points
    industry_match = False
    for cat, words in KEYWORD_MAP.items():
        if any(word.upper() in bid_text for word in words):
            # Check prospect
            p_text = ((prospect.get("legal_name") or "") + " " + " ".join(prospect.get("industry_type") or [])).upper()
            if any(word.upper() in p_text for word in words):
                industry_match = True
                score += 30
                reasons.append(f"Industry: {cat.title()}")
                break
    
    if not industry_match:
        # Fallback to UNSPSC
        unspsc = bid.get("unspsc_codes") or []
        for u in unspsc:
            desc = u.get("description", "").upper()
            if any(word.upper() in desc for words in KEYWORD_MAP.values() for word in words):
                score += 20
                reasons.append("Industry: Categorical Match")
                break

    return score, reasons

def run_matcher():
    print(f"\n{'='*60}")
    print(f"  BidIQ Matchmaking Engine v2.0")
    print(f"{'='*60}\n")
    # ... rest of the file ...

    # 1. Fetch Bids
    print("Fetching active bids...")
    bids = supabase_get("bids", {
        "select": "id,event_name,comments,service_areas,dvbe_goal,sbe_only,unspsc_codes",
        "limit": 1000
    })
    print(f"Loaded {len(bids)} bids.")

    total_matches = 0
    start_time = time.time()

    # 2. Process Prospects in Batches
    offset = 0
    while True:
        prospects = supabase_get("prospects", {
            "select": "id,legal_name,cert_types,service_areas,industry_type",
            "limit": PROSPECT_BATCH_SIZE,
            "offset": offset
        })
        
        if not prospects: break
        
        print(f"Processing prospects {offset+1} to {offset+len(prospects)}...")
        
        matches_to_upsert = []
        
        for p in prospects:
            p_matches = []
            for b in bids:
                score, reasons = calculate_match(b, p)
                
                if score >= 50:
                    p_matches.append({
                        "prospect_id": p["id"],
                        "bid_id": b["id"],
                        "score": score,
                        "match_reasons": reasons,
                        "status": "pending",
                        "last_scored_at": datetime.now(timezone.utc).isoformat()
                    })
            
            # Sort individual prospect matches by score and keep top ones if needed
            # For now, we just cap to prevent massive table explosion if every prospect is "Good"
            sorted_matches = sorted(p_matches, key=lambda x: x["score"], reverse=True)
            matches_to_upsert.extend(sorted_matches[:10]) # Top 10 matches per prospect
            
        if matches_to_upsert:
            success = supabase_upsert("prospect_bid_matches", matches_to_upsert)
            if success:
                total_matches += len(matches_to_upsert)
            else:
                print("  [ERROR] Upsert failed for batch.")

        offset += PROSPECT_BATCH_SIZE
        # Optional: Add break or limit for initial test run
        # if offset >= 2000: break 

    duration = time.time() - start_time
    print(f"\n{'='*60}")
    print(f"  MATCHING COMPLETE")
    print(f"  - Total Matches Generated: {total_matches:,}")
    print(f"  - Time Elapsed: {duration:.2f}s")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    run_matcher()
