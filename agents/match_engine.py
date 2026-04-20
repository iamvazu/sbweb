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

# NAICS to Keyword mapping for smarter matching
NAICS_KEYWORDS = {
    "561720": ["janitorial", "cleaning", "custodial", "floor", "window cleaning", "sanitary", "maintenance"],
    "236220": ["commercial building", "construction", "remodel", "renovation"],
    "541511": ["software", "programming", "web development", "it services"],
    "561730": ["landscaping", "grounds maintenance", "irrigation", "tree"]
}

def calculate_fit_score(user, bid):
    """
    Agent 7: Match Engine
    Calculates a 0-100 fit score for a specific user and bid.
    Now uses keyword mapping for better industry detection.
    """
    score = 0
    bid_text = ((bid.get('event_name') or '') + ' ' + (bid.get('comments') or '')).lower()
    
    # 1. NAICS & Keyword Match (45 pts)
    # Check for direct code or mapped keywords
    naics_codes = user.get('naics_codes') or []
    industry_match = False
    
    for code in naics_codes:
        # Check code itself
        if code in bid_text:
            industry_match = True
            break
        
        # Check mapped keywords
        keywords = NAICS_KEYWORDS.get(code, [])
        for kw in keywords:
            if kw in bid_text:
                industry_match = True
                break
        if industry_match: break
    
    if industry_match:
        score += 45
            
    # 2. Certification Match (30 pts)
    user_certs = user.get('certifications') or []
    if bid.get('sbe_only') and 'SBE' in user_certs:
        score += 30
    elif bid.get('dvbe_goal') and 'DVBE' in user_certs:
        score += 25
    elif any(cert in user_certs for cert in ['SBE', 'DVBE', 'DBE', 'SDVOSB']):
        # If user has some certs and it's an industry match, give minor boost
        score += 15
        
    # 3. Geographic & Content Fit (25 pts)
    # Cal eProcure has County in event name or we parse it
    for county in (user.get('counties_served') or []):
        if county.lower() in bid_text:
            score += 25
            break
    
    # If it's a strong industry match but no geographic match yet, 
    # keep it above the threshold if it's high value
    if industry_match and score < 50:
        score = 51 # Minimum viable match for industry relevant bids
    
    return min(100, score)

def run():
    if not supabase: return
    
    # Get all active users
    users_res = supabase.table("users").select("*").execute()
    users = users_res.data
    
    # Get recent bids that haven't been matched for all users yet
    # For now, we look at bids from the last 7 days
    bids_res = supabase.table("bids").select("*").limit(50).execute()
    bids = bids_res.data
    
    logger.info(f"Running Match Engine for {len(users)} users and {len(bids)} recent bids.")

    for user in users:
        for bid in bids:
            score = calculate_fit_score(user, bid)
            
            if score > 50: # Only store meaningful matches
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

if __name__ == "__main__":
    run()
