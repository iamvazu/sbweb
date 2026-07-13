# Week-3 Scaffold Spec — StrongerBuilt (Next.js App Router)
Exact file tree + component outlines for an agent to implement Week 3. Branch: `seo/strongerbuilt-week3`. Preview deploy only; owner approval before merge. Depends on W1 (JsonLd, OG) + W2 (pricing routes exist).

## Assumed repo layout (READ FIRST; adjust to real repo)
```
app/
  resources/page.tsx                     # NEW lead-magnet hub
  resources/rfp-checklist/page.tsx       # NEW (open or gated download)
  resources/proposal-template/page.tsx   # NEW
  services/[slug]/page.tsx               # EXISTING service pages → add FAQ
  learning-center/page.tsx               # EXISTING → enrich state guide links
components/
  JsonLd.tsx                             # from W1
  FaqAccordion.tsx                       # NEW
  LeadMagnetCard.tsx                     # NEW
lib/
  faqs.ts                                # NEW — per-service FAQ data (factual)
  stateGuides.ts                         # NEW — list of 50 state guide slugs/urls
```

## TASK W3-1 — RFP checklist + proposal template lead magnets
These fill the verified gap: competitors (AI Gov Bid, The Bid Studio) have templates/checklists; StrongerBuilt has 0 indexed.
**File:** `components/LeadMagnetCard.tsx` — card with title, description, download/CTA. CTA = "Get the free checklist" → `/resources/rfp-checklist` (open) or email-capture (owner to wire form; agent scaffolds markup only, no backend unless specified).
**File:** `app/resources/rfp-checklist/page.tsx`
- `metadata`: title "Free RFP Compliance Checklist for Small Businesses | STRONGERbuilt", OG/Twitter.
- Render a REAL, useful checklist (factual — derived from bid process: registration/SAM.gov, read-full-RFP, compliance matrix, past performance, pricing, submission deadline, two-reviewer check). Content must be accurate to gov-bid practice; no fluff.
- Optional downloadable `public/rfp-checklist.pdf` — agent may generate a simple printable page; if no PDF tooling, render a print-CSS page instead. Do NOT invent stats on the asset.
- Inject `Article` JSON-LD.
**File:** `app/resources/proposal-template/page.tsx`
- Title "Government Proposal Template & Structure | STRONGERbuilt".
- Render a factual section outline (Cover/Exec Summary, Understanding of Requirements, Technical Approach, Past Performance, Pricing, Compliance Matrix, Certifications) — educational, not a fake filled-in bid.
- Inject `Article` JSON-LD.
**File:** `app/resources/page.tsx` — hub listing both cards + links to `/learning-center` and `/pricing`.

## TASK W3-2 — Per-service FAQ hubs (FAQPage schema)
You already have FAQ schema on home; extend to service pages (verified gap: FAQ under-indexed on services).
**File:** `lib/faqs.ts`
```ts
export interface Faq { question: string; answer: string; }
export const serviceFaqs: Record<string, Faq[]> = {
  // slug keys must match services/[slug]
  "proposal-writing": [
    { question: "What does government proposal writing include?", answer: "Requirement mapping, compliance matrix, technical approach, past-performance narrative, pricing strategy, and on-time submission under your company's name." },
    { question: "How are you paid?", answer: "Pay-When-You-Win: a low bid writing fee upfront, plus a success fee only if you are awarded the contract." },
    // add 3–5 factual Q&As per service; NO fabricated guarantees
  ],
  // ...other services
};
```
**File:** `components/FaqAccordion.tsx` — accessible accordion; renders `Question`/`Answer` with `FAQPage` JSON-LD via `JsonLd`.
**Edit:** `app/services/[slug]/page.tsx` — import `serviceFaqs[slug]`, render `<FaqAccordion items={...} />` at bottom. Guard: if no FAQs for slug, render nothing.

## TASK W3-3 — Interlink 50 state guides → /pricing
Verified gap: 50 state guides exist but only ~18 indexed; The Bid Lab indexes 14 named. Make them crawlable + conversion-linked.
**File:** `lib/stateGuides.ts` — array of `{ slug, state, url }` for all 50 (agent derives from existing `/learning-center/<state>-rfp-guide` routes; do NOT invent URLs — read the real routes first).
**Edit:** `app/learning-center/page.tsx` (and/or each state guide template) — add a contextual CTA block linking to `/pricing` ("Get a free consultation on your <State> bid") and cross-links to 3–5 related state/agency guides. Ensure links are real `<a href>` in rendered HTML (crawlable), not JS-only.
**Verify:** `curl` a state guide → confirm `<a href="/pricing">` present in HTML source.

## BUILD & VERIFY
```
npm install && npm run build && npm run lint   # 0 new errors
```
- `/resources/rfp-checklist` and `/proposal-template` return 200, have OG tags + Article JSON-LD.
- A service page renders FAQ accordion + `FAQPage` JSON-LD in `<head>`/body.
- State guide HTML source contains `<a href="/pricing">`.
- Open PR `seo/strongerbuilt-week3`; request owner approval. NO merge.

## OUT OF SCOPE WEEK 3
Case studies/testimonials (W1), `/pricing` hub + comparison (W2), Learning Center taxonomy/BreadcrumbList/GEO (W4).

## GUARDRAILS
No fabricated checklist stats, no fake testimonials in resources, no invented state URLs (read real routes), preview-only + owner approval, factual copy only.
