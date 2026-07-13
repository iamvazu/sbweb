# Week-4 Scaffold Spec — StrongerBuilt (Next.js App Router)
Exact file tree + component outlines for an agent to implement Week 4 (final). Branch: `seo/strongerbuilt-week4`. Preview deploy only; owner approval before merge. Depends on W1–W3.

## Assumed repo layout (READ FIRST; adjust to real repo)
```
app/
  learning-center/page.tsx               # EXISTING
  learning-center/[slug]/page.tsx        # EXISTING guide template → add schema/breadcrumbs
components/
  JsonLd.tsx                             # from W1
  Breadcrumbs.tsx                        # NEW
lib/
  guides.ts                              # NEW — guide slug/title/url map (read real routes)
```

## TASK W4-1 — Learning Center URL taxonomy (crawlability)
Verified gap: 80 guides exist but only ~4 show `guide` theme in URL scan → some may not be individually crawlable/rankable.
- Audit: `curl` `/learning-center` sitemap + each sub-sitemap; list all guide URLs. If guides are rendered only via client-side filter (e.g., `?topic=` query with no static route), convert to **static routes** `/learning-center/<slug>` (SSG via `generateStaticParams`) so each is indexable.
- Ensure `app/learning-center/[slug]/page.tsx` uses `generateStaticParams` over the full guide list and `export const metadata` per guide (title = guide H1, description = excerpt).
- Confirm in `curl` sitemap that all 80 `<loc>` present and return 200.

## TASK W4-2 — BreadcrumbList + Article schema on guides
**File:** `components/Breadcrumbs.tsx` — renders nav breadcrumbs (Home › Learning Center › <Guide>) with `BreadcrumbList` JSON-LD via `JsonLd`.
**Edit:** `app/learning-center/[slug]/page.tsx` — render `<Breadcrumbs />` and inject:
```ts
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: guide.title,
  description: guide.excerpt,
  author: { "@type": "Organization", name: "STRONGERbuilt LLC" },
  publisher: { "@type": "Organization", name: "STRONGERbuilt LLC" },
  // datePublished/Modified if available in guide data; else omit
};
```
- Also ensure each guide already has FAQPage where applicable (W3 pattern reusable).
- Verify with Rich Results test (owner): Article + BreadcrumbList valid.

## TASK W4-3 — GEO pass (generative-engine optimization)
Goal: get cited by ChatGPT/Perplexity/Claude. robots.txt already allows AI crawlers — keep it.
- **Answer-shaped intros:** each guide's first paragraph = a direct 40-word answer to the guide's core question (verified best practice). Edit guide templates so the lead `<p>` is the standalone answer.
- **Original-data credibility:** where a guide references live bid data (e.g., agency spend, set-aside %), cite the source inline and add a "Sources" line. Do NOT invent statistics — use only figures present in existing copy or marked OWNER_TO_FILL.
- **Entity naming:** keep natural mentions of SAM.gov, specific agencies (DoD, VA, GSA) — already present; ensure spelled out + abbreviated on first use.
- **No JS-only content:** all answer text must be in server-rendered HTML (supports both SEO + GEO crawlers).

## BUILD & VERIFY
```
npm install && npm run build && npm run lint   # 0 new errors
```
- `curl` sitemap → 80 guide `<loc>` all 200.
- `curl` a guide → `<script application/ld+json>` contains `Article` + `BreadcrumbList`; first `<p>` is a self-contained answer.
- `curl` robots.txt → confirms GPTBot/ClaudeBot/PerplexityBot `Allow: /` (unchanged).
- Open PR `seo/strongerbuilt-week4`; request owner approval. NO merge.

## OUT OF SCOPE WEEK 4
All W1–W3 deliverables assumed complete. Do NOT revisit pricing/case-studies unless a blocker is found (then flag owner).

## COMPLETION CHECKLIST (end of 30 days)
- [ ] OG/Twitter tags sitewide (W1)
- [ ] /case-studies + testimonials w/ schema, real data only (W1)
- [ ] /pricing hub + Offer schema + vs-flat-fee comparison (W2)
- [ ] HigherGov vs Federal Compass vs Consultant guide (W2)
- [ ] RFP checklist + proposal template lead magnets (W3)
- [ ] Per-service FAQPage hubs (W3)
- [ ] 50 state guides interlinked → /pricing (W3)
- [ ] 80 guides individually crawlable + BreadcrumbList/Article schema (W4)
- [ ] GEO answer-shaped intros + AI-crawler allows retained (W4)

## GUARDRAILS
No fabricated statistics/sources, no invented guide URLs (read real routes first), preview-only + owner approval, factual copy only, do not disable AI-crawler allows in robots.txt.
