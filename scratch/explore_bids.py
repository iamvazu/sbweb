import os
from supabase import create_client
from dotenv import load_dotenv
import json

load_dotenv()

def check_bids():
    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    supabase = create_client(url, key)
    
    res = supabase.table("bids").select("event_name, department_name, unspsc_codes, sbe_only, dvbe_goal, end_date").limit(20).execute()
    
    for b in res.data:
        print(f"Name: {b['event_name']}")
        print(f"Dept: {b['department_name']}")
        print(f"UNSPSC: {json.dumps(b['unspsc_codes'], indent=2)}")
        print(f"SBE Only: {b['sbe_only']}, DVBE Goal: {b['dvbe_goal']}")
        print(f"End Date: {b['end_date']}")
        print("-" * 20)

if __name__ == "__main__":
    check_bids()
