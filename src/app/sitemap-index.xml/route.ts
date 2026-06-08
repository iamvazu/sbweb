import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Get bid count to dynamically determine sitemap chunk count
  const { count, error } = await supabase
    .from("bids")
    .select("id", { count: "exact", head: true });

  const CHUNK_SIZE = 5000;
  const numBidsSitemaps = count ? Math.ceil(count / CHUNK_SIZE) : 0;
  
  // id 0 is always our static/marketing/SEO county routes sitemap
  const sitemaps = [0];
  for (let i = 1; i <= numBidsSitemaps; i++) {
    sitemaps.push(i);
  }

  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(id => `  <sitemap>
    <loc>https://www.strongerbuilt.us/sitemap/${id}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new NextResponse(sitemapIndexXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
