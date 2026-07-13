# StrongerBuilt — Website Growth & SEO Strategy Brief
**Prepared:** 2026-07-13 · **Owner:** Roy Kraustrunk / Vasu Ranganathan (STRONGERbuilt) · **Site:** https://strongerbuilt.us
**Purpose:** Self-contained brief an AI implementation agent (Google Antigravity / Claude / Gemini Pro) can execute against the StrongerBuilt codebase. All competitor claims below were verified by live HTTP fetch of each site's robots.txt, sitemap index, and title/meta tags on 2026-07-13.

---

## 0. EXECUTION GUARDRAILS (read first — non-negotiable)
These are standing business rules. The agent MUST obey them or stop and ask.

1. **NO fabricated content.** Do not invent client names, testimonials, case-study results, dollar amounts, addresses, or statistics. Case-study/testimonial pages must be scaffolded with REAL data supplied by the owner (Roy/Vasu) or left as clearly-marked templates to be filled. Plausible-looking fake social proof is a hard fail.
2. **NO automatic deploys without approval.** Every deploy to production (Vercel) requires explicit owner sign-off. Use preview deploys / branches for all work; merging to main = deploy only after owner approval.
3. **Factual only.** All copy must reflect StrongerBuilt's real offering: Pay-When-You-Win pricing, veteran-owned, all 50 states, no long-term contract, named consultant per engagement, two-sets-of-eyes compliance review, on-time submission guarantee.
4. **Signature / brand fixed.** Do not alter the company name "STRONGERbuilt LLC", the positioning line "We Find, Write & Win Gov Bids. You Pay When You Win.", or contact details without explicit instruction.
5. **Evidence over assumption.** If a task requires data you don't have (real client wins, traffic numbers, review counts), scaffold the structure and output a TODO list for the owner. Do not guess.

---

## 1. SITE TECHNICAL PROFILE (verified)
- **Stack:** Next.js (App Router) on **Vercel** (`_next/static`, `x-vercel-cache`, `server: Vercel`). Likely TypeScript + Tailwind.
- **Content footprint:** ~1,072 indexed URLs (deep sitemap count). Includes: 230 `service` URLs, 98 `va` (Veterans Affairs), 31 `agency`, 26 `rfp`, 18 `state`, 6 `california`, plus the Learning Center (80 guides).
- **Structured data present (home):** `FAQPage`, `GovernmentService`, `LocalBusiness`, `Offer`, `SoftwareApplication`, `Certification`, `Question`, `Answer`, `PostalAddress`.
- **Robots.txt:** Explicitly allows AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `ChatGPT-User`) — strong GEO signal, keep it.
- **Sitemap:** Index of 5 sub-sitemaps, all crawlable.
- **KNOWN DEFECTS (verified):**
  - **Missing Open Graph / Twitter Card tags** in `<head>` → every LinkedIn/Facebook share renders as a bare link. High-priority fix.
  - Learning Center guides may not all be individually crawlable (only ~4 show `guide` theme in URL scan) — investigate URL taxonomy.
  - No `BreadcrumbList` / `Article` schema on guide pages (AEO gap).
  - Pricing not a crawlable, optimised cluster (only 1 pricing URL indexed).

---

## 2. COMPETITIVE LANDSCAPE (verified, 2026-07-13)

### 2a. Federal opportunity-intel giants (do NOT fight head-on on "database" queries)
| Competitor | Indexed URLs | Owns |
|---|---|---|
| HigherGov | 6,462 | 261 "opportunity" pages, 50 VA, tools, training |
| Federal Compass | 4,056 | **1,939 opportunity + 1,937 RFP** pages |
| StarBridge | 15,167 | federal opps |
| SweetSpot | 16,333 | AI proposal mgmt |
| ContractRadar | 1,187 | federal opps |

**Implication:** You cannot out-rank these on "federal bid database / find RFP" at their scale. **Flank them** with decision/comparison content ("HigherGov vs a consultant", "is bid software worth it for small business").

### 2b. Service competitors (your real rivals — you already out-footprint them)
| Firm | URLs | What they own | Their gap (your opening) |
|---|---|---|---|
| The Bid Lab | 245 | 149 RFP, 77 Learning, 14 state (TX/CA/FL) | Generalist (grants+corp), **no pay-when-you-win**, no veteran angle |
| AI Gov Bid | 94 | 66 blog, 21 GSA, CA-focused | No pricing page, buzzwordy, weak crawl |
| GovProposals | 37 | SAM.gov $399 reg | Thin, no strategy content |
| The Bid Studio | 35 | 3 insights only | Tiny footprint, hidden pricing → easy to outrank |
| Lohfeld | ~11 (home) | Enterprise/grants/training | No small-biz, no transparent price |
| **StrongerBuilt** | **1,072** | **Deepest service+VA+agency of any consulting competitor** | Proof signals, pricing-page SEO |

**Key evidence:** On *consulting-firm* content you already beat all 6 on volume. You lose on **proof signals** (case studies/reviews = 0 on your site; they all have some) and **pricing-page SEO**.

---

## 3. SEO GAP MAP (where to attack)
1. **Giants own "opportunity/RFP database" queries** → you capture "HigherGov vs consultant", "bid software vs hiring help" instead.
2. **Service firms own:** GSA deep-dives (AI Gov Bid 21), templates/checklists (Bid Studio, AI Gov Bid), FAQ hubs, transparent pricing pages (Bid Lab). **You have none of these indexed.**
3. **Your gaps (theme scan):** `case-study`=0, `testimonial`=0, `review`=0, `template`=0, `checklist`=0, `faq` under-indexed on service pages, `pricing` cluster=1 url.
4. **State guides:** you have 50 but only 18 indexed; The Bid Lab indexes 14 with named TX/CA/FL. Enrich + interlink yours.

---

## 4. 30-DAY IMPLEMENTATION PLAN (agent task list)

### WEEK 1 — Proof & Conversion (highest priority)
- [ ] **W1-1 Case-study system.** Scaffold `/case-studies` route + template component. Pull REAL wins from owner; do NOT invent. Add `Article` + optional `Review` schema.
- [ ] **W1-2 Testimonials.** Add testimonial component + `AggregateRating`/`Review` schema. Use only real client quotes.
- [ ] **W1-3 Google Business Profile.** Document steps for owner to claim/optimise GBP + seed 5–10 reviews (rank + trust signal none of competitors have).
- [ ] **W1-4 OG/Twitter tags.** Add `og:*` + `twitter:*` to root layout `<head>` with dynamic per-page titles/descriptions/images.

### WEEK 2 — Pricing & Comparison (your differentiator)
- [ ] **W2-1 `/pricing` hub.** Transparent tiers with `Offer` schema; "Pay-When-You-Win explained"; **"vs flat-fee firms" comparison** (directly attacks Bid Lab/Bid Studio).
- [ ] **W2-2 "HigherGov vs Federal Compass vs a Consultant" guide.** Flanks the giants; captures their comparison traffic. Factual, no fabrication.

### WEEK 3 — Fill content gaps they own
- [ ] **W3-1 Lead magnets.** RFP checklist + proposal template (gated or open). AI Gov Bid/Bid Studio have these; you don't.
- [ ] **W3-2 FAQ hubs.** Per-service `FAQPage` schema (you already have FAQ schema on home — extend).
- [ ] **W3-3 Interlink 50 state guides** → `/pricing` + cross-state. Your PSEO moat.

### WEEK 4 — Technical & GEO
- [ ] **W4-1 Learning Center taxonomy.** Ensure all 80 guides individually crawlable/rankable (fix URL structure if hidden).
- [ ] **W4-2 BreadcrumbList + Article schema** on all guides (AEO/voice).
- [ ] **W4-3 GEO pass.** Ensure guides lead with a 40-word direct answer; keep robots.txt AI-crawler allows; add "Sources" credibility where original bid data exists.

---

## 5. AGENT EXECUTION SPEC (for Google Antigravity / Claude / Gemini Pro)

**Repository & stack**
- Framework: **Next.js (App Router) + TypeScript + Tailwind**, hosted on **Vercel**.
- Repo: owner to provide GitHub URL + write access. Agent clones, creates branch `seo/strongerbuilt-<task>`.
- Build/test: `npm install` → `npm run build` (or `next build`) must pass before any PR.
- Deploy: **preview only** via Vercel preview; production merge requires owner approval (Guardrail #2).

**Per-task workflow the agent should follow**
1. Read the relevant existing component/page before editing (trace imports; do not guess shape).
2. Implement the single task; keep changes scoped (no drive-by refactors).
3. Run `next build` + lint; fix all errors introduced by the change.
4. Open a PR with a concise summary + acceptance checklist (below).
5. Request owner approval; do NOT merge/deploy without it.

**Acceptance criteria (per task)**
- OG tags present in `<head>`, render in Facebook Debugger / LinkedIn post inspector.
- `/pricing` crawlable, indexed within 48h of deploy, `Offer` schema valid (Google Rich Results test).
- Case-study/testimonial pages use ONLY real data; schema validates.
- Build passes with zero new errors; no console errors on rendered pages.
- Internal links from state guides to `/pricing` confirmed in rendered HTML.

**Things the agent should NOT do**
- No paid-ad setup (no budget known).
- No copy that implies automatic bid-sending or outcomes not delivered.
- No alteration of pricing numbers without owner confirmation (use existing published tiers: ≤$1M $450+1.00%, laddering to >$5M $1,500+$250/ADD'L $1M+0.50%).
- No fabrication of testimonials/case studies (Guardrail #1).

---

## 6. SUCCESS METRICS (track in Google Search Console + GA4)
- Indexed pages for `/case-studies`, `/pricing`, state guides ↑.
- Rankings for "government bid consultant", "government proposal writing service", "pay when you win government bids", "<state> RFP guide".
- Branded + comparison-query impressions (HigherGov/Federal Compass vs consultant).
- GBP views/calls; review count.
- Organic sessions (baseline = ~2/day; target +300% in 90 days via content + social referral).

---

## 7. DATA FILES (evidence backing this brief)
- `/opt/data/competitive_matrix.csv` / `.json` — 28-site benchmark (status, pricing, content footprint).
- `/opt/data/service_competitors.json` — 6-firm deep dive (CTAs, pricing, certs, weaknesses).
- `/opt/data/seo_gap_firms.json` — per-firm indexed URL theme scan.
- `/opt/data/seo_gap_sitemaps.json` — giant sitemap theme scan.
- `/opt/data/serp_check.json` — SERP attempt (NOTE: Bing RSS was geo-poisoned; not reliable — use GSC/Ahrefs for true rank data).

**Limitation disclosed:** Live SERP rank positions could not be verified from this environment (Bing RSS returned non-US spam). Rank targets above are based on verified content-footprint evidence, not live positions. Connect Google Search Console or an Ahrefs/Semrush account for precise keyword gaps.
