import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/login',
          '/portal/',
          '/api/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot'],
        allow: '/',
        disallow: [
          '/admin',
          '/portal/',
        ],
      }
    ],
    sitemap: 'https://strongerbuilt.us/sitemap.xml',
  };
}
