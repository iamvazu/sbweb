import os
import logging
from datetime import datetime, timezone
from dotenv import load_dotenv
from supabase import create_client, Client
import resend

# Load environment
load_dotenv()
logger = logging.getLogger("delta_detector")

# Initialize clients
URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(URL, KEY) if URL and KEY else None

RESEND_KEY = os.environ.get("RESEND_API_KEY")
resend.api_key = RESEND_KEY
FROM_EMAIL = os.environ.get("RESEND_FROM_EMAIL", "noreply@strongerbuilt.us")

def send_digest_to_user(user, matches):
    """Sends a daily digest email of matched bids."""
    if not RESEND_KEY: return
    
    bid_list_html = "<ul>"
    for m in matches:
        # We need to fetch bid names - in a real app would use a join or fetch before
        bid_list_html += f"<li><strong>{m['fit_score']}% Split</strong> - Bid: {m['bid_id']}</li>"
    bid_list_html += "</ul>"
    
    try:
        resend.Emails.send({
            "from": f"BidIQ <{FROM_EMAIL}>",
            "to": user["email"],
            "subject": f"BidIQ: {len(matches)} new matched bids for you today",
            "html": f"<p>Hello {user['business_name']},</p><p>We found new opportunities that match your profile:</p>{bid_list_html}<p><a href='https://www.strongerbuilt.us/portal/matches'>View Details in Portal</a></p>"
        })
        logger.info(f"Digest sent to {user['email']}")
    except Exception as e:
        logger.error(f"Failed to send digest to {user['email']}: {e}")

def run():
    if not supabase: return
    
    # Simple logic: Find matches created today (UTC)
    today = datetime.now(timezone.utc).date().isoformat()
    
    # 1. Get all users
    users = supabase.table("users").select("*").execute().data
    
    for user in users:
        # Find matches for this user created today
        # Note: requires created_at on user_bid_matches
        matches = supabase.table("user_bid_matches").select("*").eq("user_id", user["id"]).gte("created_at", today).execute().data
        
        if matches:
            send_digest_to_user(user, matches)

if __name__ == "__main__":
    run()
