import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { COUNTIES } from '@/lib/data/counties';
import { CATEGORIES, ALL_ARTICLES } from '@/lib/data/learning-center';
import { bidSlug } from '@/lib/bids';

const BASE_URL = 'https://www.strongerbuilt.us';
const CHUNK_SIZE = 5000;

const SERVICE_SLUGS = [
  "construction-consulting",
  "project-management",
  "subcontracting-services",
  "facility-maintenance",
  "janitorial-services",
  "construction-material-supply",
  "landscape-grounds-maintenance",
  "graffiti-abatement",
  "parking-lot-striping",
  "window-cleaning",
  "painting-services",
  "roofing-repair",
  "hvac-maintenance",
  "electrical-repair",
  "plumbing-repair",
  "moving-relocation",
  "website-build-redesign",
  "strategic-bid-advisory",
  "search-visibility-seo-aeo",
  "security-services",
  "it-software",
  "healthcare-staffing",
  "professional-services",
  "education-training"
];

const PROJECT_SLUGS = [
  "caltrans-district-11-t-i",
  "county-courthouse-facility-maintenance",
  "dwr-material-logistics",
  "homeless-shelters-ca",
  "interior-bathroom-ti",
  "modular-4-plex",
  "interior-ti",
  "480-sqft-adu",
  "affordable-housing-project"
];

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/projects",
  "/government",
  "/government/capabilities-statement",
  "/partners",
  "/partners/join",
  "/contact",
  "/book-call",
  "/service-areas",
  "/insights",
  "/careers",
  "/faqs"
];

const CITY_SLUGS = [
  "los-angeles",
  "san-diego",
  "san-jose",
  "san-francisco",
  "fresno",
  "sacramento",
  "long-beach",
  "oakland",
  "bakersfield",
  "anaheim"
];

// Determine how many sitemaps are needed
export async function generateSitemaps() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { count, error } = await supabase
    .from("bids")
    .select("id", { count: "exact", head: true });

  if (error || !count) {
    return [{ id: 0 }];
  }

  const numSitemaps = Math.ceil(count / CHUNK_SIZE);
  const sitemaps = [{ id: 0 }]; // id 0 is always static routes
  for (let i = 1; i <= numSitemaps; i++) {
    sitemaps.push({ id: i });
  }
  return sitemaps;
}

export default async function sitemap({ id }: { id: any }): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const resolvedId = await id;
  const sitemapId = Number(resolvedId);

  // 1. Sitemap ID 0: Static Marketing Pages, Services, Projects, Cities, and PSEO County Routes
  if (sitemapId === 0) {
    // Static Routes
    const staticEntries = STATIC_ROUTES.map(route => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route === "" ? 1 : 0.8,
    }));

    // Service Detail Routes
    const serviceEntries = SERVICE_SLUGS.map(slug => ({
      url: `${BASE_URL}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    // Project Detail Routes
    const projectEntries = PROJECT_SLUGS.map(slug => ({
      url: `${BASE_URL}/projects/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // City Routes
    const cityEntries = CITY_SLUGS.map(slug => ({
      url: `${BASE_URL}/city/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    // Programmatic SEO (PSEO) County Routes
    const pseoServices = [
      "janitorial-services",
      "facility-maintenance",
      "project-management",
      "construction-consulting",
      "subcontracting-services"
    ];

    const pseoEntries = pseoServices.flatMap(serviceSlug => 
      COUNTIES.map(county => ({
        url: `${BASE_URL}/services/${serviceSlug}/${county.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }))
    );

    // Learning Center Index
    const learningCenterIndexEntry = {
      url: `${BASE_URL}/learning-center`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    };

    // Learning Center Category Hubs
    const learningCenterCategoryEntries = CATEGORIES.map(category => ({
      url: `${BASE_URL}/learning-center/category/${category.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Learning Center Articles
    const learningCenterArticleEntries = ALL_ARTICLES.map(article => ({
      url: `${BASE_URL}/learning-center/${article.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [
      ...staticEntries,
      ...serviceEntries,
      ...projectEntries,
      ...cityEntries,
      ...pseoEntries,
      learningCenterIndexEntry,
      ...learningCenterCategoryEntries,
      ...learningCenterArticleEntries,
    ];
  }

  // 2. Sitemap ID > 0: Dynamic Bids (Chunked in groups of 5000)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const bidIndex = sitemapId - 1;
  const from = bidIndex * CHUNK_SIZE;
  const to = (bidIndex + 1) * CHUNK_SIZE - 1;

  const { data: bids, error } = await supabase
    .from("bids")
    .select("event_name, event_id, first_seen")
    .range(from, to)
    .order("first_seen", { ascending: false });

  if (error || !bids) {
    return [];
  }

  return bids.map((bid) => ({
    url: `${BASE_URL}/open-bids/${bidSlug(bid)}`,
    lastModified: bid.first_seen ? new Date(bid.first_seen) : now,
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));
}
