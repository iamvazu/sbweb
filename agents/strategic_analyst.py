import os
import json
import logging
from dotenv import load_dotenv
from supabase import create_client, Client
from anthropic import Anthropic
import google.generativeai as genai

# Load environment
load_dotenv()
from db_utils import get_supabase_client
from anthropic import Anthropic
import google.generativeai as genai

# Initialize
logger = logging.getLogger("strategic_analyst")
supabase: Client = get_supabase_client()

ANTHROPIC_KEY = os.environ.get("ANTHROPIC_API_KEY")
anthropic = Anthropic(api_key=ANTHROPIC_KEY) if ANTHROPIC_KEY else None

GEMINI_KEY = os.environ.get("GEMINI_API_KEY")
if GEMINI_KEY:
    genai.configure(api_key=GEMINI_KEY)

def analyze_bid_strategy(bid):
    """
    Agent 6: Strategic Analyst
    Uses AI to generate a SWOT analysis, with Gemini as fallback.
    """
    if not (anthropic or GEMINI_KEY) or not bid['extracted_text']:
        return None

    logger.info(f"Generating strategy for bid: {bid['event_id']}")
    text_sample = bid['extracted_text'][:40000]
    
    system_prompt = "You are a government procurement strategy expert. Analyze RFPs and return highly strategic advice in JSON format."

    user_prompt = f"""Analyze this RFP/IFB and return ONLY valid JSON with these keys:
    {{
      "scope_summary": "2-3 sentences overview",
      "technical_requirements": ["string list"],
      "evaluation_criteria": ["string list with weights"],
      "swot": {{
        "strengths": ["string list"],
        "weaknesses": ["string list"],
        "opportunities": ["string list"],
        "threats": ["string list"]
      }},
      "recommended_approach": "2-3 sentences of strategic direction",
      "subcontractor_opportunities": ["string list"]
    }}
    
    Document text:
    {text_sample}"""

    # --- PRIMARY: ANTHROPIC ---
    if anthropic:
        try:
            logger.info("Attempting strategy analysis with Anthropic...")
            response = anthropic.messages.create(
                model="claude-3-5-sonnet-20240620",
                max_tokens=1500,
                system=system_prompt,
                messages=[{"role": "user", "content": user_prompt}]
            )
            return parse_ai_json(response.content[0].text)
        except Exception as e:
            logger.error(f"Anthropic strategy analysis failed: {e}")

    # --- FALLBACK: GEMINI ---
    if GEMINI_KEY:
        try:
            logger.info("Falling back to Gemini for strategy analysis...")
            model = genai.GenerativeModel('gemini-1.5-pro')
            response = model.generate_content(system_prompt + "\n\n" + user_prompt)
            return parse_ai_json(response.text)
        except Exception as e:
            logger.error(f"Gemini strategy analysis failed: {e}")

    return None

def parse_ai_json(content):
    """Utility to clean and parse JSON from AI response."""
    try:
        # Clean JSON markdown if present
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

    # Analyze bids that have AI compliance info but no strategy plan yet
    res = supabase.table("bids").select("*").not_.is_("go_nogo", "null").is_("bid_plan", "null").limit(5).execute()
    bids = res.data
    
    if not bids:
        logger.info("No bids pending strategic analysis.")
        return

    for bid in bids:
        plan = analyze_bid_strategy(bid)
        if plan:
            supabase.table("bids").update({"bid_plan": plan}).eq("id", bid["id"]).execute()
            logger.info(f"Bid plan generated for {bid['event_id']}")

if __name__ == "__main__":
    run()
