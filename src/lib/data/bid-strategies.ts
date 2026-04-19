export const BID_STRATEGIES: Record<string, any> = {
  janitorial: {
    title: "Janitorial & Facility Maintenance Strategy",
    fit_score_modifiers: ["Green Clean Certified", "Shift-Diff Knowledge"],
    strategic_plan: [
      "Focus on eco-friendly cleaning solutions to earn sustainability credits.",
      "Detail your labor retention plan, specifically shift-differential pay for night work.",
      "Emphasize your background check and security clearance protocol for government facilities.",
      "Highlight local responsiveness—ensure the agency knows your team is within 30 miles."
    ]
  },
  construction: {
    title: "General Construction & Infrastructure Strategy",
    fit_score_modifiers: ["Safety Record", "Prevailing Wage Experience"],
    strategic_plan: [
      "Lead with your EMR (Experience Modification Rate) to prove safety excellence.",
      "Detailed project schedule using MS Project or Primavera to show day-by-day execution.",
      "Explicitly mention your experience with California Prevailing Wage compliance (DIR).",
      "List key subcontractors that are SBE/DVBE certified to meet participation goals."
    ]
  },
  landscaping: {
    title: "Landscaping & Civil Works Strategy",
    fit_score_modifiers: ["Water Conservation", "Pest Management"],
    strategic_plan: [
      "Highlight water-efficient irrigation techniques (CALSENSE or similar).",
      "Emphasize Integrated Pest Management (IPM) to show environmental compliance.",
      "Showcase your inventory of specialized equipment for heavy industrial mowing.",
      "Provide a specific seasonal maintenance calendar beyond the basic bid requirements."
    ]
  },
  default: {
    title: "Standard Strategic Bidding Approach",
    fit_score_modifiers: ["Responsive Timeline", "Compliance Accuracy"],
    strategic_plan: [
      "Carefully review the 'Selection Criteria' weighting (e.g., Price vs. Experience).",
      "Ensure all 'Mandatory' forms are signed—this is the #1 cause of disqualification.",
      "Articulate your Unique Value Proposition (UVP) in the first paragraph of the narrative.",
      "Ask clarifying questions during the Q&A period to show technical engagement."
    ]
  }
};

export function getStrategyForBid(bid: any) {
  const name = (bid.event_name || "").toLowerCase();
  if (name.includes("janitorial") || name.includes("custodial") || name.includes("cleaning")) {
    return BID_STRATEGIES.janitorial;
  }
  if (name.includes("construction") || name.includes("build") || name.includes("renovate")) {
    return BID_STRATEGIES.construction;
  }
  if (name.includes("landscape") || name.includes("tree") || name.includes("irrigation")) {
    return BID_STRATEGIES.landscaping;
  }
  return BID_STRATEGIES.default;
}
