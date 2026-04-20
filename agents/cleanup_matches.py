from db_utils import get_supabase_client
import logging

logging.basicConfig(level=logging.INFO)
sb = get_supabase_client()

def cleanup():
    # Delete matches for the specific user that are likely false positives
    # Or just wipe and let the new engine re-generate everything correctly
    res = sb.table("user_bid_matches").delete().neq("id", "00000000-0000-0000-0000-000000000000").execute()
    print(f"Cleared {len(res.data) if res.data else 0} old matches for fresh re-scan.")

if __name__ == "__main__":
    cleanup()
