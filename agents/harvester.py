import os
import requests
import json
from datetime import datetime, timedelta
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

# Initialize Supabase
url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") # IMPORTANT: Must use Service Role key for backend scripts
supabase: Client = create_client(url, key)

CAL_EPROC_API = "https://caleprocure.ca.gov/api/event-search" # Example API point

def harvest_late_breaking_bids():
    """
    Harvests bids from Cal eProcure published in the last 24 hours.
    Note: Real implementation would handle pagination and retries.
    """
    print(f"[{datetime.now()}] Starting Harvester...")
    
    # Mock data for demonstration purposes
    # In a real scenario, this would be a BeautifulSoup or requests.post call
    mock_bids = [
      {
        "event_id": "0000031415",
        "department_name": "Caltrans",
        "event_name": "Janitorial Services - District 7 HQ",
        "end_date": (datetime.now() + timedelta(days=14)).isoformat(),
        "portal_link": "https://caleprocure.ca.gov/event/2660/0000031415",
        "source": "caleprocure",
        "type": "IFB",
        "status": "Posted",
        "prebid_type": "M",
        "prebid_date": (datetime.now() + timedelta(days=5)).isoformat(),
        "estimated_value_min": 150000,
        "estimated_value_max": 225000,
        "prevailing_wage": True
      },
      {
        "event_id": "9988776655",
        "department_name": "Department of General Services",
        "event_name": "HVAC Maintenance - State Capitol Building",
        "end_date": (datetime.now() + timedelta(days=21)).isoformat(),
        "portal_link": "https://caleprocure.ca.gov/event/2660/9988776655",
        "source": "caleprocure",
        "type": "RFP",
        "status": "Posted",
        "prebid_type": "NM",
        "estimated_value_min": 500000,
        "estimated_value_max": 850000,
        "prevailing_wage": True
      }
    ]

    new_count = 0
    for bid_data in mock_bids:
        try:
            # Check if exists
            exists = supabase.table("bids").select("id").eq("event_id", bid_data["event_id"]).execute()
            
            if not exists.data:
                # Insert new bid
                res = supabase.table("bids").insert(bid_data).execute()
                print(f" -> Inserted: {bid_data['event_name']} ({bid_data['event_id']})")
                new_count += 1
            else:
                print(f" -> Skipping (exists): {bid_data['event_id']}")
        except Exception as e:
            print(f"Error inserting bid {bid_data['event_id']}: {e}")

    print(f"[{datetime.now()}] Harvester complete. {new_count} new bids added.")

if __name__ == "__main__":
    harvest_late_breaking_bids()
