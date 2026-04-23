import os
import logging
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment
load_dotenv()
from db_utils import get_supabase_client

# Initialize
logger = logging.getLogger("match_engine")
supabase: Client = get_supabase_client()

# Expanded Industry Keyword Map
INDUSTRY_MAP = {
    "janitorial": ["janitorial", "cleaning", "custodial", "sanitation", "floor", "window", "pressure wash", "chamber cleaning", "trash", "waste", "sanitary", "maintenance"],
    "construction": ["construction", "renovation", "remodel", "painting", "paving", "roofing", "plumbing", "electrical", "hvac", "tenant improvement", "installation", "door", "window", "gutter", "drywall", "concrete", "fencing"],
    "it": ["software", "it services", "programming", "networking", "cloud", "security", "hardware", "computer", "information technology", "saas", "cyber"],
    "landscaping": ["landscaping", "landscape", "grounds", "irrigation", "tree", "mowing", "weed", "arborist", "pest", "vegetation"],
    "staffing": ["staffing", "personnel", "recruitment", "labor", "temporary services", "hr", "workforce"],
    "professional": ["consulting", "engineering", "architecture", "management", "legal", "accounting", "environmental", "audit", "training"]
}

# Negative keywords to prevent false positives (applied globally)
NEGATIVE_KEYWORDS = [
    "fire suppression", "hood cleaning", "hvac", "elevator", "mechanical maintenance", 
    "fire extinguisher", "lab coat", "mop rental", "mats rental", "plumbing"
]

def calculate_fit_score(user, bid):
    """
    Enhanced Match Engine (v2.0)
    Calculates a comprehensive fit score based on multiple vectors.
    """
    score = 0
    bid_text = ((bid.get('event_name') or '') + ' ' + (bid.get('comments') or '')).lower()
    
    # Check for Negative Keywords (Global blocker)
    for n_kw in NEGATIVE_KEYWORDS:
        if n_kw in bid_text:
            return 0 # Automatic disqualified
    
    # 1. Industry / Keyword Match (Max 50 pts)
    naics_codes = user.get('naics_codes') or []
    business_name = (user.get('business_name') or '').lower()
    
    industry_match = False
    for cat, keywords in INDUSTRY_MAP.items():
        if any(kw in bid_text for kw in keywords):
            if any(kw in business_name for kw in keywords) or \
               any(code in naics_codes for code in keywords) or \
               cat in (user.get('industry_type') or []):
                industry_match = True
                break

    if industry_match:
        score += 50
    
    # 2. Certification Match (Max 30 pts)
    user_certs = user.get('certifications') or []
    if (bid.get('dvbe_goal') and float(bid['dvbe_goal']) > 0) or 'dvbe' in bid_text:
        if 'DVBE' in user_certs:
            score += 30
    elif bid.get('sbe_only') or 'sbe' in bid_text or 'small business' in bid_text:
        if any(c in user_certs for c in ['SB', 'SBE', 'SB(Micro)']):
            score += 30
    elif any(cert in user_certs for cert in ['SBE', 'DVBE', 'DBE', 'SDVOSB']):
        score += 15
        
    # 3. Geographic & Content Fit (Max 20 pts)
    user_areas = user.get('counties_served') or []
    for county in user_areas:
        if county.lower() in bid_text:
            score += 20
            break
    
    # 4. Title Keyword Boost
    title = (bid.get('event_name') or '').lower()
    if industry_match and any(kw in title for cat, kws in INDUSTRY_MAP.items() for kw in kws):
        score += 10

    return min(100, score)

def run():
    if not supabase: return
    
    # Get all active users
    users_res = supabase.table("users").select("*").execute()
    users = users_res.data
    
    # BROAD SEARCH: Pull all 'Posted' bids from the last 30 days
    # No more limit(50)
    bids_res = supabase.table("bids")\
        .select("*")\
        .eq("status", "Posted")\
        .execute()
    
    bids = bids_res.data
    
    logger.info(f"Running Match Engine for {len(users)} users and {len(bids)} available bids.")
    
    # Log to DB
    try:
        supabase.table("system_logs").insert({
            "level": "info",
            "module": "MatchEngine",
            "message": f"Starting cycle: {len(users)} users, {len(bids)} bids.",
            "details": {"user_count": len(users), "bid_count": len(bids)}
        }).execute()
    except: pass

    match_count = 0
    for user in users:
        for bid in bids:
            score = calculate_fit_score(user, bid)
            
            if score >= 40: # Only store meaningful matches
                match_count += 1
                try:
                    supabase.table("user_bid_matches").upsert({
                        "user_id": user["id"],
                        "bid_id": bid["id"],
                        "fit_score": score,
                        "pipeline_stage": "new_match"
                    }, on_conflict="user_id,bid_id").execute()
                except Exception as e:
                    pass # Usually unique constraint conflict if already exists

    logger.info("Match engine cycle complete.")
    try:
        supabase.table("system_logs").insert({
            "level": "success",
            "module": "MatchEngine",
            "message": f"Cycle complete. {match_count} meaningful matches identified.",
            "details": {"match_count": match_count}
        }).execute()
    except: pass

if __name__ == "__main__":
    run()
