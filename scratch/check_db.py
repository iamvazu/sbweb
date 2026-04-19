import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase = create_client(url, key)

def check_counts():
    print("--- DB DIAGNOSTIC ---")
    
    # 1. Bids count
    bids = supabase.table("bids").select("id", count="exact").execute()
    print(f"Total Bids: {bids.count}")
    
    # 2. Bids with AI analysis
    analyzed = supabase.table("bids").select("id", count="exact").not_.is_("bid_plan", "null").execute()
    print(f"Bids with AI Analysis: {analyzed.count}")
    
    # 3. Matches count
    matches = supabase.table("user_bid_matches").select("id", count="exact").execute()
    print(f"Total Matches in DB: {matches.count}")
    
    # 4. Users count
    users = supabase.table("users").select("id", "email").execute()
    print(f"Total Users: {len(users.data)}")
    for u in users.data:
        u_matches = supabase.table("user_bid_matches").select("id", count="exact").eq("user_id", u["id"]).execute()
        print(f"  - User {u['email']}: {u_matches.count} matches")

if __name__ == "__main__":
    check_counts()
