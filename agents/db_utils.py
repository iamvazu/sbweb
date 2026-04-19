import os
import logging
from supabase import create_client, Client
from dotenv import load_dotenv

# Load common environment
load_dotenv()
logger = logging.getLogger("db_utils")

def get_supabase_client() -> Client:
    """
    Centralized Supabase client initialization with robust error checking.
    """
    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

    if not url:
        logger.error("❌ NEXT_PUBLIC_SUPABASE_URL is missing from environment/secrets.")
        return None
    
    if not key:
        logger.error("❌ SUPABASE_SERVICE_ROLE_KEY is missing from environment/secrets.")
        return None

    if not url.startswith("http"):
        logger.error(f"❌ NEXT_PUBLIC_SUPABASE_URL is invalid: '{url}'")
        return None

    try:
        return create_client(url, key)
    except Exception as e:
        logger.error(f"❌ Failed to initialize Supabase client: {e}")
        return None
