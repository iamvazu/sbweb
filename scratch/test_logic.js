const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const KEYWORD_MAP = {
  "janitorial": ["janitorial", "cleaning", "custodial", "sanitation", "floor", "window", "pressure wash", "chamber cleaning", "trash", "waste"],
  "construction": ["construction", "renovation", "remodel", "painting", "paving", "roofing", "plumbing", "electrical", "hvac", "tenant improvement", "installation", "door", "window", "gutter"],
  "it": ["software", "it services", "programming", "networking", "cloud", "security", "hardware", "computer"],
  "landscaping": ["landscaping", "landscape", "grounds", "irrigation", "tree", "mowing", "weed"],
  "staffing": ["staffing", "personnel", "recruitment", "labor"],
  "professional": ["consulting", "engineering", "architecture", "management", "legal", "accounting"]
};

const calculateMatch = (bid, entity, isProspect) => {
  let score = 0;
  const reasons = [];
  const bidText = ((bid.event_name || "") + " " + (bid.comments || "")).toLowerCase();
  
  const industryTypes = isProspect ? (entity.industry_type || []) : (entity.naics_codes || []);
  const entityName = isProspect ? (entity.legal_name || "").toLowerCase() : (entity.business_name || "").toLowerCase();

  let matchedIndustry = "";
  
  for (const [cat, keywords] of Object.entries(KEYWORD_MAP)) {
    const matchedBidKeywords = keywords.filter(kw => bidText.includes(kw));
    
    if (matchedBidKeywords.length > 0) {
      if (matchedBidKeywords.some(kw => entityName.includes(kw)) || entityName.includes(cat)) {
         score += 50;
         matchedIndustry = cat;
         reasons.push(`Industry: ${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
         break;
      }
      
      if (industryTypes.some((it) => it.toLowerCase().includes(cat))) {
         score += 15;
         matchedIndustry = cat;
         reasons.push(`Broad Category: ${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
         break;
      }
    }
  }

  const certs = isProspect ? (entity.cert_types || []) : (entity.certifications || []);
  if (bidText.includes("dvbe") || bid.dvbe_goal > 0) {
    if (certs.includes("DVBE")) {
      score += 30;
      reasons.push("Eligible: DVBE Certified");
    }
  } else if (bidText.includes("sbe") || bid.sbe_only) {
    if (certs.some(c => ["SB", "SBE", "SB(Micro)"].includes(c))) {
      score += 30;
      reasons.push("Eligible: SBE Certified");
    }
  } else if (certs.length > 0) {
    score += 15;
    reasons.push("Eligible: General Certs");
  }

  const entityAreas = entity.service_areas || entity.counties_served || [];
  if (entityAreas.some(area => bidText.includes(area.toLowerCase()))) {
    score += 20;
    reasons.push(`Geo: Serves Area`);
  }

  return { score: Math.min(100, score), reasons };
};

async function testMatch() {
  // Get the HVAC bid
  const { data: bid } = await supabase.from('bids').select('*').ilike('event_name', '%25-364%').single();
  // Get Merino
  const { data: merino } = await supabase.from('prospects').select('*').ilike('legal_name', '%Merino%').single();
  // Get an HVAC prospect (if any) or a general construction one
  const { data: hvac } = await supabase.from('prospects').select('*').ilike('legal_name', '%HVAC%').limit(1).single();
  
  console.log("BID:", bid.event_name);
  console.log("-------------------");
  
  if (merino) {
    const merinoMatch = calculateMatch(bid, merino, true);
    console.log("MERINO LANDSCAPE:", merinoMatch);
  }
  
  if (hvac) {
    const hvacMatch = calculateMatch(bid, hvac, true);
    console.log("HVAC COMPANY:", hvacMatch);
  }
}

testMatch();
