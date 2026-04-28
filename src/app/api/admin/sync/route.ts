import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const supabase = await createClient();

    // 1. Fetch data
    const [
      { data: bids },
      { data: users },
      { data: prospects }
    ] = await Promise.all([
      supabase.from("bids").select("*").eq("status", "Posted").gt("end_date", new Date().toISOString()),
      supabase.from("users").select("*"),
      supabase.from("prospects").select("*")
    ]);

    if (!bids || (!users && !prospects)) {
      return NextResponse.json({ error: "Insufficient data for matching" }, { status: 400 });
    }

    const KEYWORD_MAP: Record<string, string[]> = {
      "janitorial": ["janitorial", "cleaning", "custodial", "sanitation", "floor", "window", "pressure wash", "chamber cleaning", "trash", "waste"],
      "construction": ["construction", "renovation", "remodel", "painting", "paving", "roofing", "plumbing", "electrical", "hvac", "tenant improvement", "installation", "door", "window", "gutter"],
      "it": ["software", "it services", "programming", "networking", "cloud", "security", "hardware", "computer"],
      "landscaping": ["landscaping", "landscape", "grounds", "irrigation", "tree", "mowing", "weed"],
      "staffing": ["staffing", "personnel", "recruitment", "labor"],
      "professional": ["consulting", "engineering", "architecture", "management", "legal", "accounting"]
    };

    const calculateMatch = (bid: any, entity: any, isProspect: boolean) => {
      let score = 0;
      const reasons: string[] = [];
      const bidText = ((bid.event_name || "") + " " + (bid.comments || "")).toLowerCase();
      
      // 1. Keyword/Industry Match
      const industryTypes = isProspect 
        ? (entity.industry_type || []) 
        : (entity.naics_codes || []);
      
      const entityName = isProspect 
        ? (entity.legal_name || "").toLowerCase() 
        : (entity.business_name || "").toLowerCase();

      let matchedIndustry = "";
      
      for (const [cat, keywords] of Object.entries(KEYWORD_MAP)) {
        // Find which specific keywords from this category are in the bid
        const matchedBidKeywords = keywords.filter(kw => bidText.includes(kw));
        
        if (matchedBidKeywords.length > 0) {
          // Tier 1: Direct Trade Match (50 points)
          if (matchedBidKeywords.some(kw => entityName.includes(kw)) || entityName.includes(cat)) {
             score += 50;
             matchedIndustry = cat;
             reasons.push(`Industry: ${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
             break;
          }
          
          // Tier 2: Broad Category Match (15 points)
          if (industryTypes.some((it: string) => it.toLowerCase().includes(cat))) {
             score += 15;
             matchedIndustry = cat;
             reasons.push(`Broad Category: ${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
             break;
          }
        }
      }

      // 2. Certification Match (Max 30 pts)
      const certs = isProspect ? (entity.cert_types || []) : (entity.certifications || []);
      if (bidText.includes("dvbe") || bid.dvbe_goal > 0) {
        if (certs.includes("DVBE")) {
          score += 30;
          reasons.push("Eligible: DVBE Certified");
        }
      } else if (bidText.includes("sbe") || bid.sbe_only) {
        if (certs.some((c: string) => ["SB", "SBE", "SB(Micro)"].includes(c))) {
          score += 30;
          reasons.push("Eligible: SBE Certified");
        }
      } else if (certs.length > 0) {
        score += 15;
        reasons.push("Eligible: General Certs");
      }

      // 3. Geo Match (Max 20 pts)
      const entityAreas = entity.service_areas || entity.counties_served || [];
      if (entityAreas.some((area: string) => bidText.includes(area.toLowerCase()))) {
        score += 20;
        reasons.push(`Geo: Serves Area`);
      }

      return { score: Math.min(100, score), reasons };
    };

    let userMatchesCount = 0;
    let prospectMatchesCount = 0;

    // Process Users
    if (users) {
      const userMatches = [];
      for (const user of users) {
        for (const bid of bids) {
          const { score, reasons } = calculateMatch(bid, user, false);
          if (score >= 40) {
            userMatches.push({
              user_id: user.id,
              bid_id: bid.id,
              fit_score: score,
              pipeline_stage: "new_match"
            });
          }
        }
      }
      if (userMatches.length > 0) {
        await supabase.from("user_bid_matches").upsert(userMatches, { onConflict: "user_id,bid_id" });
        userMatchesCount = userMatches.length;
      }
    }

    // Process Prospects
    if (prospects) {
      const prospectMatches = [];
      for (const prospect of prospects) {
        for (const bid of bids) {
          const { score, reasons } = calculateMatch(bid, prospect, true);
          if (score >= 40) {
            prospectMatches.push({
              prospect_id: prospect.id,
              bid_id: bid.id,
              score: score,
              match_reasons: reasons,
              status: "pending"
            });
          }
        }
      }
      if (prospectMatches.length > 0) {
        // Chunk prospect matches to avoid payload limits
        const chunkSize = 100;
        for (let i = 0; i < prospectMatches.length; i += chunkSize) {
          await supabase.from("prospect_bid_matches").upsert(prospectMatches.slice(i, i + chunkSize), { onConflict: "prospect_id,bid_id" });
        }
        prospectMatchesCount = prospectMatches.length;
      }
    }

    // Log success
    await supabase.from("system_logs").insert({
      level: "success",
      module: "SyncEngine",
      message: `Manual sync complete. Generated ${userMatchesCount} user matches and ${prospectMatchesCount} prospect matches.`
    });

    return NextResponse.json({ 
      success: true, 
      userMatches: userMatchesCount, 
      prospectMatches: prospectMatchesCount 
    });

  } catch (error: any) {
    console.error("Sync Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
