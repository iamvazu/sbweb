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

def calculate_fit_score(user, bid):
    """
    Agent 7: Match Engine
    Calculates a 0-100 fit score for a specific user and bid.
    """
    score = 0
    
    # 1. NAICS Match (35 pts)
    bid_desc = (bid.get('comments', '') + ' ' + bid.get('event_name', '')).lower()
    for code in (user.get('naics_codes') or []):
        if code in bid_desc: # Simple keyword match for now
            score += 35
            break
            
    # 2. Certification Match (25 pts)
    user_certs = user.get('certifications') or []
    if bid.get('sbe_only') and 'SBE' in user_certs:
        score += 25
    elif bid.get('dvbe_goal') and 'DVBE' in user_certs:
        score += 20
    elif 'DBE' in user_certs:
        score += 15
        
    # 3. Geographic Fit (20 pts)
    # Cal eProcure has County in event name or we parse it
    bid_content = (bid.get('event_name', '') + ' ' + bid.get('department_name', '')).lower()
    for county in (user.get('counties_served') or []):
        if county.lower() in bid_content:
            score += 20
            break
            
    # 4. Capacity Fit (10 pts)
    user_max = user.get('max_contract_value') or 0
    bid_max = bid.get('estimated_value_max') or 0
    if user_max >= bid_max and bid_max > 0:
        score += 10
    elif user_max >= (bid_max * 0.5) and bid_max > 0:
        score += 5
        
    # 5. Timing Score (10 pts)
    # Simple logic: further deadline is better for preparing
    # Not yet implemented deeply
    
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
