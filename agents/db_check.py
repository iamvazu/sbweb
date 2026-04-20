from db_utils import get_supabase_client
import logging

logging.basicConfig(level=logging.INFO)
sb = get_supabase_client()

def check():
    # Check users
    users = sb.table("users").select("*").execute().data
    print(f"\n--- USERS ({len(users)}) ---")
    for u in users:
        print(f"User: {u['email']} | NAICS: {u['naics_codes']} | Counties: {u['counties_served']}")

    # Check bids with AI Analysis
    bids = sb.table("bids").select("*").not.is_("bid_plan", "null").limit(5).execute().data
    print(f"\n--- BIDS WITH AI ({len(bids)}) ---")
    for b in bids:
        print(f"Bid: {b['event_name']} | Comments: {b['comments'][:100]}...")

    # Check matches
    matches = sb.table("user_bid_matches").select("*").execute().data
    print(f"\n--- MATCHES ({len(matches)}) ---")
    for m in matches:
        print(f"Match: User {m['user_id']} -> Bid {m['bid_id']} | Score: {m['fit_score']}")

if __name__ == "__main__":
    check()
