import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

def check_bid():
    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    supabase = create_client(url, key)
    
    bid_id = "2706259c-30d3-496e-912f-869d4b54e12d"
    res = supabase.table("bids").select("*").eq("id", bid_id).single().execute()
    
    print(f"Bid ID: {bid_id}")
    print(f"Comments: {res.data.get('comments')}")
    print(f"Published Date: {res.data.get('published_date')}")
    print(f"Event Version: {res.data.get('event_version')}")
    print(f"UNSPSC: {res.data.get('unspsc_codes')}")
    print(f"Service Areas: {res.data.get('service_areas')}")

if __name__ == "__main__":
    check_bid()
