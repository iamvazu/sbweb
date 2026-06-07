import { MetadataRoute } from 'next';
import { COUNTIES } from '@/lib/data/counties';
import { CATEGORIES, ALL_ARTICLES } from '@/lib/data/learning-center';

const BASE_URL = 'https://www.strongerbuilt.us';

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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. Static Routes
  const staticEntries = STATIC_ROUTES.map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Service Detail Routes
  const serviceEntries = SERVICE_SLUGS.map(slug => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Project Detail Routes
  const projectEntries = PROJECT_SLUGS.map(slug => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 4. City Routes (New)
  const cityEntries = CITY_SLUGS.map(slug => ({
    url: `${BASE_URL}/city/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 5. Programmatic SEO (PSEO) County Routes
  // We prioritize the top 5 services for county-level indexing to keep the sitemap size reasonable
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

  // 6. Learning Center Index
  const learningCenterIndexEntry = {
    url: `${BASE_URL}/learning-center`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  };

  // 7. Learning Center Category Hubs
  const learningCenterCategoryEntries = CATEGORIES.map(category => ({
    url: `${BASE_URL}/learning-center/category/${category.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 8. Learning Center Articles
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

