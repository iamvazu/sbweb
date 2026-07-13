export interface CaseStudy {
  slug: string;
  title: string;
  clientType: string;
  agency: string;
  contractValue: string; // OWNER_TO_FILL - do NOT invent
  outcome: string; // OWNER_TO_FILL
  quote?: string; // OWNER_TO_FILL (real only)
  published: boolean; // gate unreviewed entries
}

export const caseStudies: CaseStudy[] = [
  // OWNER_TO_FILL: replace placeholders with real, approved wins.
  {
    slug: "example-dod-win",
    title: "OWNER_TO_FILL",
    clientType: "",
    agency: "",
    contractValue: "",
    outcome: "",
    published: false,
  },
];
