# PRD — StrongerBuilt Website Growth & SEO (Agent Execution)
**Site:** https://strongerbuilt.us · **Stack:** Next.js (App Router) + TypeScript + Tailwind on Vercel · **Owner:** Roy Kraustrunk / Vasu Ranganathan (STRONGERbuilt LLC)

## MANDATORY GUARDRAILS (violation = STOP)
1. NO fabricated testimonials, case studies, client names, dollar results, or stats. Scaffold structure with clearly-marked `OWNER_TO_FILL` placeholders; use only real data from owner.
2. NO production deploys without explicit owner approval. Use Vercel **preview** only; merge to main = deploy only after sign-off.
3. Copy must reflect REAL offering: Pay-When-You-Win, veteran-owned, all 50 states, no long-term contract, named consultant, two-sets-of-eyes compliance, on-time guarantee.
4. Do NOT alter brand name, positioning line "We Find, Write & Win Gov Bids. You Pay When You Win.", or contact details without instruction.
5. If data is missing, scaffold + output TODO for owner. Never guess.

## VERIFIED FACTS (2026-07-13)
- Next.js App Router + Vercel (`_next/static`, `x-vercel-cache`). Structured data present: FAQPage, GovernmentService, LocalBusiness, Offer, SoftwareApplication.
- ~1,072 indexed URLs (230 service, 98 VA, 31 agency, 26 rfp, 18 state, 80 Learning Center guides).
- **Defects:** missing OG/Twitter tags; no BreadcrumbList/Article schema on guides; pricing not a crawlable cluster (1 url); case-study/testimonial/review/template/checklist = 0 indexed.
- **Competitors (verified content footprints):** HigherGov 6,462 / Federal Compass 4,056 (own "opportunity/RFP database" queries — DO NOT fight); service rivals you already out-footprint: The Bid Lab 245, AI Gov Bid 94, GovProposals 37, The Bid Studio 35, Lohfeld ~11. Their gaps you exploit: transparent pricing pages, GSA/template/FAQ content, and proof signals (none have review schema).

## TASK: 30-DAY PLAN (execute in order; branch `seo/strongerbuilt-<task>`)
**W1 Proof/Conversion:** (a) OG/Twitter tags via Next Metadata API in `app/layout.tsx` + per-page; (b) `/case-studies` list + `[slug]` detail with REAL data + Article/Review JSON-LD; (c) testimonials component + AggregateRating schema (real quotes only); (d) GBP optimization steps doc for owner.
**W2 Pricing/Differentiator:** (a) `/pricing` hub with `Offer` schema + "Pay-When-You-Win explained" + "vs flat-fee firms" comparison; (b) "HigherGov vs Federal Compass vs a Consultant" guide.
**W3 Content gaps:** (a) RFP checklist + proposal template lead magnets; (b) per-service FAQPage hubs; (c) interlink 50 state guides → `/pricing`.
**W4 Technical/GEO:** (a) fix Learning Center URL taxonomy so 80 guides individually crawlable; (b) BreadcrumbList + Article schema on guides; (c) GEO pass (40-word answer lead, keep robots.txt AI-crawler allows).

## AGENT WORKFLOW
1. Read existing component/page before editing; trace imports. 2. Scoped change only. 3. `npm install` → `next build` + lint must pass. 4. Open PR with acceptance checklist. 5. Request owner approval; no merge without it.

## ACCEPTANCE (per task)
OG renders in LinkedIn inspector · `/pricing` indexed + Offer schema valid · case/testimonial use real data + schema validates · build 0 new errors · state→pricing internal links present.

## DO NOT
Paid ads (no budget) · copy implying auto bid-sending · alter pricing numbers (published: ≤$1M $450+1.00% → >$5M $1,500+$250/ADD'L $1M+0.50%) · fabricate social proof.

## METRICS
GSC/GA4: indexed `/case-studies`,`/pricing`, state guides ↑; ranks for "government bid consultant", "government proposal writing service", "pay when you win government bids", "<state> RFP guide"; GBP reviews; organic sessions (baseline ~2/day → +300% in 90d).

## LIMITATION
Live SERP ranks unverified (Bing RSS geo-poisoned). Use GSC/Ahrefs for true gaps. Content-footprint evidence is solid.
