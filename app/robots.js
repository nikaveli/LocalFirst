const SITE = 'https://localfirstonline.com';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Don't expose the API surface (server actions / route handlers).
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
