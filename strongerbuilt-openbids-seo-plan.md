# Stronger Built — Open Bids SEO (get all 14,000 bids indexed like HigherGov / BidNet / Bid Banana)

*Implementation plan for Antigravity. Goal: every bid in `/open-bids` ranks in Google for its own title (e.g., "IFB 26-0053 – Re-pavement Services at the Hawaii Fruit Fly Rearing Facility"), the way the competitors in the screenshots do.*

---

## 1. Why your bids don't show up today (root cause)

Your `/open-bids` page is a **client-side search app**. Three things block it from ranking:

1. **No per-bid URL.** Bid details open in a **modal** over `/open-bids` (screenshot 3). Google can only rank *pages with their own URL.* A modal isn't a page.
2. **Client-side rendering.** The bid list and details load via JavaScript after the page loads. Google often won't index JS-rendered content reliably at scale (14k pages), and the bid text isn't in the initial HTML.
3. **No discovery path.** There's no crawlable list of links to individual bids, and no sitemap telling Google those 14k pages exist.

How the competitors win: **each bid = its own server-rendered URL** (e.g., `bidbanana.thebidlab.com/bid/…`, `highergov.com/contract-opportunity/…`, `bidnetdirect.com/open-bids/…`), all listed in **XML sitemaps**, all **linked** from crawlable listing pages. That's "programmatic SEO" — thousands of unique pages generated from one data set.

---

## 2. The fix, in one line

> Give every bid its own crawlable, **server-rendered** URL with a unique title/description/content, list all of them in **XML sitemaps**, **link** to them from crawlable listing/hub pages, and submit to **Search Console.**

Keep your interactive search app for users — just add real pages underneath it for crawlers (and deep-link the modal to the real URL).

---

## 3. URL structure (one clean, unique URL per bid)

`https://strongerbuilt.us/open-bids/{slug}-{eventId}`

Example:
`/open-bids/re-pavement-services-hawaii-fruit-fly-rearing-facility-ifb-26-0053`

**Slug rules:** lowercase the bid title, strip punctuation, replace spaces with hyphens, cap at ~70 chars, then append the `eventId` to guarantee uniqueness (two bids can share a title; IDs don't).

```js
function bidSlug(bid) {
  const base = bid.eventName.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70);
  return `${base}-${bid.eventId.toLowerCase()}`;
}
```

---

## 4. Each bid needs a REAL page (SSR / SSG) — the core change

The modal must be backed by a real route that renders **on the server** so the bid text is in the initial HTML. Two valid approaches:

- **SSG / ISR (recommended for 14k):** pre-generate pages, regenerate on a schedule. Fast, cheap to serve, fully indexable.
- **SSR:** render on each request. Simpler to keep fresh, slightly heavier.

**Next.js App Router example** (`app/open-bids/[slug]/page.tsx`):

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBidBySlug, getAllBidSlugs } from "@/lib/bids";

export const revalidate = 86400; // ISR: refresh daily

// pre-build pages (or omit and rely on on-demand ISR)
export async function generateStaticParams() {
  const slugs = await getAllBidSlugs();           // 14k slugs
  return slugs.map((slug) => ({ slug }));
}

// unique <title>/<meta> per bid — THIS is what shows in Google
export async function generateMetadata({ params }): Promise<Metadata> {
  const bid = await getBidBySlug(params.slug);
  if (!bid) return {};
  const title = `${bid.eventId} – ${bid.eventName} (${bid.state})`;
  const description =
    `${bid.eventName}. Agency: ${bid.departmentName}. Closes ${bid.endDate}. ` +
    `View bid details and get expert help winning it with Stronger Built.`;
  const url = `https://strongerbuilt.us/open-bids/${params.slug}`;
  return {
    title,
    description: description.slice(0, 158),
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    robots: { index: true, follow: true },
  };
}

export default async function BidPage({ params }) {
  const bid = await getBidBySlug(params.slug);
  if (!bid) notFound();
  // render the SAME content the modal shows — but server-side (see §5)
  return <BidDetail bid={bid} />;
}
```

> **Not on Next.js?** Same principle in Nuxt (`useAsyncData` + SSR), SvelteKit (`+page.server`), or Astro (SSG). If you genuinely can't SSR soon, a **prerender service** (Prerender.io / Rendertron) that serves bot-rendered HTML is a stopgap — but real SSR/SSG is the right fix.

**Deep-link the modal:** when a user clicks "Details," navigate to `/open-bids/{slug}` (pushState) and render the modal from that route. Users get the app experience; crawlers get a real page. The "Details"/"Get Started" buttons must be real `<a href>` links, not just JS click handlers.

---

## 5. On-page template for each bid page

Render this **server-side**. Pull from the fields you already have (eventId, eventName, departmentName, state, format, status, endDate, endDateISO, sourcePortal, etc. — the same JSON we built).

- **H1:** `{eventId} – {eventName} ({location})`
- **Breadcrumb:** Home › Open Bids › {State} › {this bid}
- **Facts block:** Agency, Solicitation ID, Source portal, Estimated value, Open date, **Closing date**, Status, Set-aside/wage notes.
- **Description:** the solicitation summary. *(If "No description provided," see §10 — never leave it bare.)*
- **"How to win this bid" block (the value-add):** 2–3 sentences on what this kind of bid requires (compliance, deadline, staffing/pricing) + a CTA. This is what makes your page *more* than a raw record and helps it outrank a thin duplicate.
- **CTA:** **"Get Started on This Bid →"** → consultation / Bid Manager. *(This is the payoff — see §12.)*
- **Related bids:** 5–8 links to other bids in the same state/agency/category (internal linking + keeps users on site).
- **FAQ (optional, with FAQPage schema):** "How do I bid on this contract?", "When is it due?", "Can Stronger Built write this proposal?"

**Structured data (JSON-LD):** there's no official schema.org type for an RFP, so don't misuse `JobPosting`. Use **BreadcrumbList** (helps Google show breadcrumbs) plus a generic **WebPage** with dates. The real ranking power here is unique SSR content + sitemaps + links, not schema.

```html
<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"BreadcrumbList",
  "itemListElement":[
    {"@type":"ListItem","position":1,"name":"Open Bids","item":"https://strongerbuilt.us/open-bids"},
    {"@type":"ListItem","position":2,"name":"California","item":"https://strongerbuilt.us/open-bids/state/california"},
    {"@type":"ListItem","position":3,"name":"IFB 26-0053 – Re-pavement Services…"}
  ]
}
</script>
```

---

## 6. Crawlable listing + hub pages (so Google can DISCOVER 14k pages)

Detail pages are useless if nothing links to them. Add **server-rendered, paginated** listing pages with real `<a>` links:

- **Main listing:** `/open-bids` and `/open-bids/page/2`, `/page/3`… each server-rendering ~20–50 bid links (not just the JS app). Link `rel="next"/"prev"`.
- **Hub pages (big SEO win + topical authority):**
  - By state: `/open-bids/state/california` (ties to your Learning Center state guides!)
  - By agency: `/open-bids/agency/dept-of-food-agriculture`
  - By category/industry: `/open-bids/category/janitorial` (ties to your industry subpages!)
- Each hub = an SSR page listing matching bids with links + a short intro paragraph (keyword-rich).

This creates a crawl path: home → /open-bids → state/category hub → individual bid. It also interlinks beautifully with the Learning Center and industry pages you already planned.

---

## 7. XML sitemaps (tell Google all 14k pages exist)

14k URLs fits in a single sitemap (limit is 50,000 URLs / 50MB), but build it to **chunk** so it scales as you grow and refreshes cleanly.

**Next.js** (`app/sitemap.ts`, with chunking via `generateSitemaps`):

```ts
import type { MetadataRoute } from "next";
import { getAllBidsForSitemap, countBids } from "@/lib/bids";

const CHUNK = 5000;
export async function generateSitemaps() {
  const total = await countBids();
  return Array.from({ length: Math.ceil(total / CHUNK) }, (_, id) => ({ id }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const bids = await getAllBidsForSitemap(id * CHUNK, CHUNK); // {slug, endDateISO}
  return bids.map((b) => ({
    url: `https://strongerbuilt.us/open-bids/${b.slug}`,
    lastModified: b.updatedAt ?? new Date(),
    changeFrequency: "daily",
    priority: 0.6,
  }));
}
```

Also include your **hub and listing** URLs in a separate sitemap. Reference everything from `/sitemap.xml` (sitemap index). Re-ping Google whenever bids update (or just rely on the daily `lastmod`).

---

## 8. robots.txt + canonical + indexing rules

```ts
// app/robots.ts
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://strongerbuilt.us/sitemap.xml",
    host: "https://strongerbuilt.us",
  };
}
```
- **Self-canonical** every bid page to its own URL (§4).
- Make sure nothing sets `noindex` on these pages and nothing in robots.txt blocks `/open-bids/`.
- Don't put bid data in query strings you block; the slug path is the canonical.

---

## 9. Handling closed / awarded bids (freshness + long-tail)

Don't 404 a bid when it closes — that's wasted SEO and a bad experience. Instead:
- Flip status to **"Closed"** or **"Awarded,"** keep the page **indexed**, and add award data if you have it. This builds the "closed-bid / award history" corpus that Bid Banana and HigherGov rank for ("who won X contract").
- Add a banner: "This bid has closed — see open {category} bids in {state}" linking to live alternatives (keeps the page useful and passes link equity).
- Keep `endDateISO` accurate; use it for `lastmod` and to drive an "open vs closed" filter that maps to your existing Open / Closed / Award tabs.

---

## 10. Avoid thin / duplicate content (important at 14k pages)

Two real risks: (a) bids with "No description provided" are **thin**, and (b) the same solicitation appears on HigherGov, BidNet, etc., so you're competing on **duplicate** content.

Mitigations:
- **Never ship a bare record.** Always render the "how to win this bid" block, the facts table, related bids, and the CTA — so even a description-less bid has unique, useful content.
- **Templated-but-varied intros** keyed off agency/state/category (not identical boilerplate on every page).
- **Self-canonical** (you're presenting your own aggregated record + guidance, not copying theirs).
- This is exactly how the competitors avoid thin-content problems — they wrap the raw record in their own structure, match scores, and CTAs.

---

## 11. Google Search Console (the launch step)

1. Verify `strongerbuilt.us` in **Google Search Console** (and Bing Webmaster Tools).
2. Submit `/sitemap.xml`.
3. Use **URL Inspection → Request Indexing** on a handful of priority bids to seed crawling.
4. Watch **Pages → Indexed** climb over the following weeks (14k won't index overnight — Google crawls programmatically generated pages gradually; sitemaps + internal links speed it up).
5. Monitor **Performance** for impressions on bid-title queries.

---

## 12. The bonus: every bid page is a conversion landing page

This is the part competitors under-use and you should lean into. Each of your 14k bid pages is a free SEO landing page that funnels to your service. Someone Googling "IFB 26-0053 Hawaii Fruit Fly" lands on your page and sees:

> **"Want to win this bid? Stronger Built writes and submits the proposal for you — you mostly pay when you win. [Get Started on This Bid →]"**

So this isn't just SEO — it's 14,000 entry points into Bid Manager, each tied to a specific opportunity. That CTA should be on every bid page, every hub page, and every closed-bid page.

---

## 13. Implementation checklist (priority order)

1. **Build the SSR/SSG detail route** `/open-bids/{slug}-{eventId}` with unique title, meta, H1, content, self-canonical (§3–5). *This alone is what makes bids rank.*
2. **Deep-link the modal** to the real URL; make Details/Get-Started real `<a>` links (§4).
3. **Add the "how to win" block + CTA + related bids** to every page (§5, §10, §12).
4. **Build crawlable listing + state/agency/category hub pages** with real links (§6).
5. **Generate chunked XML sitemaps** + sitemap index (§7).
6. **Add robots.ts, self-canonicals, confirm no noindex** (§8).
7. **Keep closed bids indexed** with status + alternatives (§9).
8. **Verify in Search Console, submit sitemap, request indexing on priority bids** (§11).
9. Interlink with the **Learning Center state guides** and **industry subpages** for compounding authority.

**Bottom line for the dev/Antigravity:** the single change that unlocks everything is **#1 — real server-rendered URLs per bid.** The modal-only SPA is why you're invisible; SSR pages + sitemaps + internal links are why HigherGov, BidNet, and Bid Banana are not.
