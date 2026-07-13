# Week-1 Scaffold Spec — StrongerBuilt (Next.js App Router)
Exact file tree + component outlines for an agent to implement Week 1. Branch: `seo/strongerbuilt-week1`. Preview deploy only; owner approval before merge.

## Assumed repo layout (adjust if different — READ FIRST)
```
app/
  layout.tsx            # root: metadataBase, OG/Twitter defaults, JSON-LD LocalBusiness
  page.tsx              # homepage
  pricing/page.tsx      # (W2) pricing hub
  case-studies/page.tsx # list
  case-studies/[slug]/page.tsx  # detail
  services/...          # existing service pages
  learning-center/...   # 80 guides
components/
  Testimonials.tsx
  JsonLd.tsx            # reusable <script type="application/ld+json">
lib/
  caseStudies.ts        # typed data array (OWNER_TO_FILL placeholders)
  testimonials.ts       # typed data array (OWNER_TO_FILL placeholders)
  site.ts               # site constants (name, url, phone, social)
```

## TASK W1-1 — OG / Twitter tags (Next Metadata API)
**File:** `app/layout.tsx`
```tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.strongerbuilt.us"),
  title: { default: "STRONGERbuilt — We Find, Write & Win Gov Bids. You Pay When You Win.", template: "%s | STRONGERbuilt" },
  description: "Expert proposal consultants find, manage, and win government RFPs nationwide. Pay-when-you-win pricing. Free consultation.",
  openGraph: { type: "website", siteName: "STRONGERbuilt", url: "https://www.strongerbuilt.us", title: "...", description: "...", images: ["/og-default.png"] },
  twitter: { card: "summary_large_image", site: "@strongerbuilt", title: "...", description: "...", images: ["/og-default.png"] },
};
```
- Add a `public/og-default.png` (1200×630) — note for owner if missing; agent may add a placeholder note, not a fake brand asset.
- Each route/page exports its own `metadata` (title, description, `openGraph`, `twitter`) so shares render rich.
- Verify: `curl` homepage `<head>` contains `og:title`, `og:image`, `twitter:card`.

## TASK W1-2 — Case-study system
**File:** `lib/caseStudies.ts`
```ts
export interface CaseStudy {
  slug: string; title: string; clientType: string; agency: string;
  contractValue: string; // OWNER_TO_FILL — do NOT invent
  outcome: string;       // OWNER_TO_FILL
  quote?: string;        // OWNER_TO_FILL (real only)
  published: boolean;    // gate unreviewed entries
}
export const caseStudies: CaseStudy[] = [
  // OWNER_TO_FILL: replace placeholders with real, approved wins.
  { slug: "example-dod-win", title: "OWNER_TO_FILL", clientType: "", agency: "", contractValue: "", outcome: "", published: false },
];
```
**File:** `app/case-studies/page.tsx` — list `published` entries (filter `published === true`); if none published, render a tasteful "Case studies coming soon" section (NO fake entries).
**File:** `app/case-studies/[slug]/page.tsx` — `generateStaticParams` from slugs; render fields; inject `Article` + optional `Review` JSON-LD via `components/JsonLd.tsx`.
**Guardrail:** if `published:false` or fields empty, page must NOT render fabricated content — show owner TODO.

## TASK W1-3 — Testimonials + Review schema
**File:** `lib/testimonials.ts`
```ts
export interface Testimonial { name: string; company: string; quote: string; rating: number; } // OWNER_TO_FILL — real quotes only
export const testimonials: Testimonial[] = []; // start empty; owner supplies
```
**File:** `components/Testimonials.tsx` — if `testimonials.length === 0`, render nothing (or a hidden section with owner TODO). When populated, render cards + `AggregateRating` JSON-LD (average of `rating`).
**Component `components/JsonLd.tsx`:**
```tsx
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

## TASK W1-4 — Google Business Profile (owner doc, not code)
Output `docs/gbp-setup.md` with steps: claim "STRONGERbuilt LLC" GBP, category "Business management consultant"/"Government relations consultant", add (408) 657-6116 + strongerbuilt.us, solicit 5–10 real client reviews, post monthly bid-tip updates. Agent writes the doc; does NOT create fake reviews.

## BUILD & VERIFY
```
npm install
npm run build      # must pass, 0 new errors
npm run lint
```
- Confirm `<head>` has OG/Twitter on `/` and at least one sub-route.
- Confirm `/case-studies` builds without rendering fake data.
- Open PR `seo/strongerbuilt-week1` with this checklist; request owner approval. NO merge.

## OUT OF SCOPE WEEK 1
`/pricing` hub, comparison guide, checklists, FAQ hubs, Learning Center taxonomy, BreadcrumbList — these are Weeks 2–4 (see full brief).
