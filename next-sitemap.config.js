/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://strongerbuilt.us',
  generateRobotsTxt: true,
  exclude: ['/portal/*', '/login'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://strongerbuilt.us/sitemap.xml',
    ],
  },
}
