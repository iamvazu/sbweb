import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

def check_counts():
    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    supabase = create_client(url, key)
    
    # Check total bids
    total = supabase.table("bids").select("*", count="exact").execute().count
    print(f"Total Bids: {total}")
    
    # Check SBE Only
    sbe_only = supabase.table("bids").select("*", count="exact").eq("sbe_only", True).execute().count
    print(f"SBE Only Bids: {sbe_only}")
    
    # Check DVBE Goal (not null and not empty)
    dvbe_res = supabase.table("bids").select("dvbe_goal").not_.is_("dvbe_goal", "null").execute()
    dvbe_count = len([b for b in dvbe_res.data if b.get("dvbe_goal") and b["dvbe_goal"] != "0%"])
    print(f"Bids with DVBE Goal (>0%): {dvbe_count}")
    
    # Sample some with goals
    sample = supabase.table("bids").select("event_name, sbe_only, dvbe_goal").or_("sbe_only.eq.true, dvbe_goal.neq.null").limit(5).execute()
    print("\nSamples with goals:")
    for b in sample.data:
        print(f"Name: {b['event_name']}, SBE: {b['sbe_only']}, DVBE: {b['dvbe_goal']}")

if __name__ == "__main__":
    check_counts()
