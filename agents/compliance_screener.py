import os
import json
import logging
from dotenv import load_dotenv
from supabase import create_client, Client
from anthropic import Anthropic
import google.generativeai as genai

# Load environment
load_dotenv()
logger = logging.getLogger("compliance_screener")

# Initialize agents
URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(URL, KEY) if URL and KEY else None

ANTHROPIC_KEY = os.environ.get("ANTHROPIC_API_KEY")
anthropic = Anthropic(api_key=ANTHROPIC_KEY) if ANTHROPIC_KEY else None

GEMINI_KEY = os.environ.get("GEMINI_API_KEY")
if GEMINI_KEY:
    genai.configure(api_key=GEMINI_KEY)

def screen_bid_compliance(bid):
    """
    Agent 5: AI Compliance Screener
    Uses Claude to extract structured compliance data, with Gemini as fallback.
    """
    if not (anthropic or GEMINI_KEY) or not bid['extracted_text']:
        logger.warning(f"Skipping Agent 5 for {bid['event_id']}: Missing text or AI keys.")
        return None

    logger.info(f"Screening compliance for bid: {bid['event_id']}")
    text_sample = bid['extracted_text'][:30000]
    
    system_prompt = """You are a California government procurement compliance expert. 
    Analyze the provided bid document and extract mandatory requirements.
    Return ONLY valid JSON."""

    user_prompt = f"""Extract the following from this document and return ONLY valid JSON:
    {{
      "mandatory_prebid": boolean,
      "prebid_date": "ISO date string or null",
      "prebid_time": "string or null",
      "prebid_location": "string or null",
      "prevailing_wage": boolean,
      "dbe_goal": "string or null (e.g. '15%')",
      "dvbe_goal": "string or null",
      "sbe_only": boolean,
      "bonding_required": boolean,
      "estimated_value_min": integer or null,
      "estimated_value_max": integer or null
    }}
    
    Document text:
    {text_sample}"""

    # --- PRIMARY: ANTHROPIC ---
    if anthropic:
        try:
            logger.info("Attempting compliance screening with Anthropic...")
            response = anthropic.messages.create(
                model="claude-3-5-sonnet-20240620",
                max_tokens=1000,
                system=system_prompt,
                messages=[{"role": "user", "content": user_prompt}]
            )
            return parse_ai_json(response.content[0].text)
        except Exception as e:
            logger.error(f"Anthropic failed: {e}")

    # --- FALLBACK: GEMINI ---
    if GEMINI_KEY:
        try:
            logger.info("Falling back to Gemini for compliance screening...")
            model = genai.GenerativeModel('gemini-1.5-pro')
            response = model.generate_content(system_prompt + "\n\n" + user_prompt)
            return parse_ai_json(response.text)
        except Exception as e:
            logger.error(f"Gemini failed: {e}")

    return None

def parse_ai_json(content):
    """Utility to clean and parse JSON from AI response."""
    try:
        # Extract JSON from potential markdown markers
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]
        return json.loads(content.strip())
    except Exception as e:
        logger.error(f"JSON parsing error: {e}")
        return None

def run():
    if not supabase: return

    # Find bids with text but no AI analysis yet
    res = supabase.table("bids").select("*").not_.is_("extracted_text", "null").eq("go_nogo", "PENDING").limit(10).execute()
    bids = res.data
    
    if not bids:
        logger.info("No bids pending AI compliance screening.")
        return

    for bid in bids:
        comp_data = screen_bid_compliance(bid)
        if comp_data:
            # Update bid with extracted fields and set initial go_nogo
            update_data = {**comp_data, "go_nogo": "REVIEW"} # Default to REVIEW for human oversight
            supabase.table("bids").update(update_data).eq("id", bid["id"]).execute()
            logger.info(f"AI Compliance update complete for {bid['event_id']}")

if __name__ == "__main__":
    run()
