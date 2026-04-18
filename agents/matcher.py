import os
import json
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

supabase: Client = create_client(
    os.environ.get("NEXT_PUBLIC_SUPABASE_URL"),
    os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
)

def run_matcher():
    """
    Finds bids and users that haven't been matched yet.
    Calculates a heuristic fit score and inserts into user_bid_matches.
    """
    print("Starting Matcher Engine...")
    
    # 1. Fetch all active users
    users = supabase.table("users").select("*").eq("onboarding_complete", True).execute()
    
    # 2. Fetch recent bids (e.g., from last 2 days)
    bids = supabase.table("bids").select("*").execute()
    
    if not users.data or not bids.data:
        print("Insufficient data to run matching.")
        return

    for user in users.data:
        for bid in bids.data:
            # Check if match already exists
            exists = supabase.table("user_bid_matches") \
                .select("id") \
                .eq("user_id", user["id"]) \
                .eq("bid_id", bid["id"]) \
                .execute()
            
            if exists.data:
                continue

            # SCORING LOGIC (Heuristic)
            score = 50 # Base score
            
            # 1. Geography Match (Crucial)
            # Simplified: checking if department name is in counties_served or department match
            if any(county.lower() in (bid["department_name"] or "").lower() for county in (user["counties_served"] or [])):
                score += 20
            
            # 2. Certification Match
            # If bid has a DVBE goal and user is DVBE
            if bid.get("dvbe_goal") and "DVBE" in (user["certifications"] or []):
                score += 15
            if bid.get("sbe_only") and "SBE" in (user["certifications"] or []):
                score += 15
            
            # 3. Licensing Match
            # If bid has a license requirement in its plan or text
            # (In a real app, this would be structured data)
            
            # Cap at 100
            final_score = min(score, 100)

            if final_score >= 60:
                try:
                    supabase.table("user_bid_matches").insert({
                        "user_id": user["id"],
                        "bid_id": bid["id"],
                        "fit_score": final_score,
                        "pipeline_stage": "new_match"
                    }).execute()
                    print(f" -> Matched User {user['business_name']} to Bid {bid['event_id']} (Score: {final_score})")
                except Exception as e:
                    print(f"Error inserting match: {e}")

    print("Matcher Engine complete.")

if __name__ == "__main__":
    run_matcher()
