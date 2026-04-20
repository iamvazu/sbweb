import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

def test_query():
    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    supabase = create_client(url, key)
    
    print(f"URL: {url}")
    print(f"Key Prefix: {key[:10]}...")
    
    res = supabase.table("bids") \
        .select("id, event_id, comments, published_date") \
        .eq("status", "Posted") \
        .or_("comments.is.null,published_date.is.null,event_version.is.null") \
        .order("first_seen", desc=True) \
        .limit(50) \
        .execute()
    
    print(f"Found {len(res.data)} bids to scrape.")
    for bid in res.data[:5]:
        print(f" - {bid['event_id']} (ID: {bid['id']}): comments={bid['comments']}, pub={bid['published_date']}")

if __name__ == "__main__":
    test_query()
