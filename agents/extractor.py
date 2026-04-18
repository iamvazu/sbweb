import os
import anthropic
import json
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

# Initialize API Clients
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
supabase: Client = create_client(
    os.environ.get("NEXT_PUBLIC_SUPABASE_URL"),
    os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
)

def extract_intelligence():
    """
    Finds bids without intelligence plans, simulates PDF extraction,
    and uses Claude to generate a SWOT and Technical Plan.
    """
    # 1. Fetch bids needing analysis
    bids = supabase.table("bids").select("*").is_("bid_plan", "null").order("end_date").limit(5).execute()
    
    if not bids.data:
        print("No bids requiring intelligence analysis.")
        return

    for bid in bids.data:
        print(f"Analyzing: {bid['event_name']}...")
        
        # Simulating PDF text extraction
        mock_text = f"""
        SOLICITATION DETAILS: {bid['event_name']}
        DEPARTMENT: {bid['department_name']}
        COPE OF WORK: Provide recurring janitorial services, window cleaning, and high-pressure washing for the main facility.
        CONTRACT REQUIREMENTS:
        - Must provide C-15 or C-61 (D-38) license.
        - Must have $2M bonding capacity.
        - Must have DIR registration before award.
        - Mandatory pre-bid walk on {bid['prebid_date']}.
        - DVBE goal is 3%.
        """

        # 2. Call Claude
        try:
            prompt = f"""
            Analyze this government solicitation text and return a JSON object for a contractor's 'Bid Intelligence' dashboard.
            
            Text: {mock_text}

            Return ONLY valid JSON with these keys:
            - scope_summary: brief 2-sentence summary of work.
            - recommended_approach: 1-sentence tactical advice.
            - technical_requirements: list of 4 key technical must-haves.
            - swot: {{ strengths: [], weaknesses: [], opportunities: [], threats: [] }} (at least 2 items each)
            """

            response = client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=1000,
                messages=[{"role": "user", "content": prompt}]
            )
            
            # Simple extractor of JSON from markdown/text
            content = response.content[0].text
            plan = json.loads(content[content.find('{'):content.rfind('}')+1])

            # 3. Update Database
            supabase.table("bids").update({
                "bid_plan": plan,
                "go_nogo": "REVIEW" if plan['swot']['threats'] else "GO"
            }).eq("id", bid["id"]).execute()
            
            print(f" -> Intelligence plan generated for {bid['event_id']}")

        except Exception as e:
            print(f"Error processing bid {bid['event_id']}: {e}")

if __name__ == "__main__":
    extract_intelligence()
