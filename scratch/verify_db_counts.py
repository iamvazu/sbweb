import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv('.env.local')

url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase = create_client(url, key)

# Count bids by source
res_bids = supabase.table("bids").select("source", count="exact").execute()
print(f"Total Bids in Database: {res_bids.count}")

# Count by source
sources = {}
for bid in res_bids.data:
    src = bid.get("source", "unknown")
    sources[src] = sources.get(src, 0) + 1

print("\nBids by Source:")
for src, count in sources.items():
    print(f"  - {src}: {count}")

# Count matches
res_matches = supabase.table("user_bid_matches").select("id", count="exact").execute()
print(f"\nTotal Matches in Database: {res_matches.count}")
