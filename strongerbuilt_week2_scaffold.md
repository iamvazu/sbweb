# Week-2 Scaffold Spec — StrongerBuilt (Next.js App Router)
Exact file tree + component outlines for an agent to implement Week 2. Branch: `seo/strongerbuilt-week2`. Preview deploy only; owner approval before merge. Depends on Week-1 (OG tags, JsonLd component) — build on those.

## Assumed repo layout (adjust if different — READ FIRST)
```
app/
  layout.tsx            # root metadata (from W1)
  pricing/page.tsx      # NEW pricing hub
  learning-center/
    highergov-vs-federal-compass-vs-consultant/page.tsx  # NEW comparison guide
components/
  JsonLd.tsx            # from W1
  PricingTable.tsx      # NEW
  ComparisonTable.tsx   # NEW (vs flat-fee firms)
lib/
  pricing.ts            # NEW — REAL published tiers (do not alter numbers without owner ok)
  site.ts               # site constants
```

## TASK W2-1 — `/pricing` hub (your differentiator)
**File:** `lib/pricing.ts` — REAL published Pay-When-You-Win tiers. DO NOT change numbers without owner confirmation.
```ts
export interface PricingTier {
  maxContract: string;      // contract value band
  writingFee: string;       // upfront bid writing fee
  successFeePct: string;    // % of contract value, charged ONLY if awarded
}
// Source: owner-published Pay-When-You-Win schedule (verified).
export const payWhenYouWin: PricingTier[] = [
  { maxContract: "Up to $1M",      writingFee: "$450",   successFeePct: "1.00%" },
  { maxContract: "$2M",            writingFee: "$750",   successFeePct: "0.90%" },
  { maxContract: "$3M",            writingFee: "$1,000", successFeePct: "0.80%" },
  { maxContract: "$4M",            writingFee: "$1,250", successFeePct: "0.70%" },
  { maxContract: "$5M",            writingFee: "$1,500", successFeePct: "0.60%" },
  { maxContract: "Above $5M",      writingFee: "$1,500 + $250 per additional $1M", successFeePct: "0.50%" },
];
export const pricingNotes =
  "Writing fee covers requirement extraction, win strategy, full proposal, compliance matrix, and on-time submission. " +
  "Success fee charged ONLY if you are awarded the contract. Flat-rate and monthly-retainer options also available.";
```
**File:** `components/PricingTable.tsx` — render `payWhenYouWin` as an accessible table; include `pricingNotes`. Add a CTA "Book a Free Consultation" → `/` #book or Calendly.
**File:** `app/pricing/page.tsx`
- `export const metadata`: title "Government Bid Pricing — Pay When You Win | STRONGERbuilt", description, OG/Twitter (from W1 pattern).
- Render `<PricingTable />`, a "Pay-When-You-Win explained" section (plain-English: you risk a fraction vs flat-fee firms; win and we both win), and `<ComparisonTable />` (see below).
- Inject `Offer` JSON-LD for each tier via `JsonLd`:
```ts
const offers = payWhenYouWin.map(t => ({
  "@context": "https://schema.org", "@type": "Offer",
  name: `Proposal writing — ${t.maxContract}`,
  priceCurrency: "USD",
  price: t.writingFee.replace(/[^0-9.]/g, ""), // numeric seed; owner to confirm exact
  description: `Bid writing fee for contracts ${t.maxContract}; success fee ${t.successFeePct} only if awarded.`,
}));
```
- **Guardrail:** numbers are owner-published; agent must NOT invent discounts, promo codes, or alternate pricing.

**File:** `components/ComparisonTable.tsx` — "vs flat-fee firms" comparison. Factual columns only:
| | STRONGERbuilt (Pay-When-You-Win) | Typical Flat-Fee Firm |
|---|---|---|
| Pay if you lose | Low writing fee only | Full fee regardless |
| Pay if you win | Writing fee + small % | Full fee |
| Veteran-owned | Yes | Varies |
| All 50 states | Yes | Varies |
| Named consultant | Yes | Varies |
Content must be factual per owner profile; do NOT claim competitors' specifics you haven't verified — use "Varies" where unknown.

## TASK W2-2 — "HigherGov vs Federal Compass vs a Consultant" guide
**File:** `app/learning-center/highergov-vs-federal-compass-vs-consultant/page.tsx`
- `export const metadata`: title "HigherGov vs Federal Compass vs a Consultant: Which Wins for Small Business?", description, OG/Twitter.
- **Factual only.** Use VERIFIED footprint data (from brief evidence files):
  - HigherGov: ~6,462 indexed URLs, 261 opportunity pages, federal focus.
  - Federal Compass: ~4,056 indexed URLs, 1,939 opportunity + 1,937 RFP pages, federal focus.
  - Consultant (STRONGERbuilt): human win strategy, Pay-When-You-Win, veteran-owned, all 50 states, compliance review.
- **Flanking angle (the point of the page):** Tools excel at *finding/aggregating* opportunities at scale; they do NOT write the winning bid, own compliance risk, or share outcome risk. A consultant closes the "now I found it, how do I win?" gap. Do NOT claim the tools are bad — position as complementary; recommend tools for discovery + consultant for winning.
- Lead with a 40-word direct answer (GEO): "HigherGov and Federal Compass are federal opportunity databases; neither writes your proposal or shares your win risk. For small businesses that need to actually win, pair a discovery tool with a Pay-When-You-Win consultant."
- Include an internal link to `/pricing` and to relevant Learning Center guides (e.g., "How to Read an RFP").
- Inject `Article` + `FAQPage` JSON-LD (FAQ: "Do these tools write proposals?" / "Which is cheaper?" / "Can I use both?" — answer factually).
- **Guardrail:** no fabrication of tool pricing/features beyond verified footprint; mark any functional claim as "verify on vendor site."

## BUILD & VERIFY
```
npm install
npm run build      # must pass, 0 new errors
npm run lint
```
- `curl` `/pricing` `<head>` → confirm `og:title`, `twitter:card`, and an `application/ld+json` `Offer` block present.
- `curl` the comparison guide → confirm 40-word answer near top, internal link to `/pricing` in rendered HTML, FAQ JSON-LD present.
- Rich Results test (owner): `/pricing` Offer schema valid.
- Open PR `seo/strongerbuilt-week2` with this checklist; request owner approval. NO merge.

## OUT OF SCOPE WEEK 2
Case studies/testimonials (W1), RFP checklists/templates (W3), FAQ hubs per service (W3), Learning Center taxonomy/BreadcrumbList (W4).

## CROSS-LINK REQUIREMENT
Add `/pricing` to the primary nav (header) and to the homepage CTA cluster so it is crawlable and internally linked (supports the verified "pricing not a crawlable cluster" gap).
