// Static sitemap for localfirstonline.com.
// Update lastModified when content on a route changes meaningfully.

const SITE = 'https://localfirstonline.com';
const today = new Date();

export default function sitemap() {
  return [
    {
      url: `${SITE}/`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE}/first-impressions`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE}/diy-google-profile`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE}/about`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE}/contact`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
