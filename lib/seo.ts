import type { Metadata } from "next";

export const siteUrl = "https://localfirstonline.com";

export const seoPages = {
  "/google-business-profile-visual-refresh": {
    title: "Google Business Profile Photos in Denver | $349 Refresh",
    description:
      "Refresh your Google Business Profile with on-site photos, short video, and an information check. Serving Denver and Aurora. Call or text Nicholas. Just $349.",
    type: "WebPage",
  },
  "/": {
    title: "Google Business Profile Visual Refresh | LocalFirst Denver",
    description:
      "Help customers find, trust, and choose your business. A $349 Google Business Profile visual refresh with on-site photos and video in Denver and Aurora, CO.",
    type: "WebPage",
  },
  "/about": {
    title: "About Nicholas Molina | LocalFirst Colorado Photography",
    description:
      "Meet Nicholas Molina, founder of LocalFirst. He helps Colorado businesses show customers what they offer through on-site photos, video, and profile updates.",
    type: "AboutPage",
  },
  "/contact": {
    title: "Contact LocalFirst | Denver Photography & Profile Updates",
    description:
      "Call or text Nicholas about a $349 Google Business Profile Visual Refresh in Denver and Aurora. Show customers your business today with fresh photos and video.",
    type: "ContactPage",
  },
  "/first-impressions": {
    title: "First Impressions | Denver & Aurora Videos by LocalFirst",
    description:
      "See what local businesses offer through LocalFirst video visits in Denver and Aurora. Help customers feel confident taking the next step. Contact Nicholas.",
    type: "CollectionPage",
  },
} as const;

export type SeoPath = keyof typeof seoPages;

export function pageMetadata(path: SeoPath): Metadata {
  const { title, description } = seoPages[path];
  const images = [{
    url: `${siteUrl}/media/localfirst-poster.jpg`,
    width: 1920,
    height: 1080,
    alt: "LocalFirst on-site photography and Google Business Profile visual showcase",
  }];

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${path === "/" ? "" : path}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path === "/" ? "" : path}`,
      siteName: "LocalFirst",
      locale: "en_US",
      type: "website",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

// Use Organization, not LocalBusiness: no public street address was supplied.
// Do not add self-serving review stars or invented local-business credentials.
export const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "LocalFirst",
      url: siteUrl,
      logo: `${siteUrl}/media/localfirst-logo-web.webp`,
      image: `${siteUrl}/media/localfirst-poster.jpg`,
      telephone: "+1-303-524-0591",
      email: "nick.molina@icloud.com",
      founder: { "@type": "Person", name: "Nicholas Molina" },
      description: "LocalFirst helps Colorado businesses improve what customers see on Google with on-site photos, video, and a Google Business Profile visual refresh.",
      areaServed: ["Denver, Colorado", "Aurora, Colorado"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "LocalFirst",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
    ...[
      ["photography", "On-site business photography"],
      ["video", "Business video"],
      ["360-imagery", "360 virtual tour imagery"],
      ["google-business-profile", "Google Business Profile visual refresh"],
    ].map(([slug, name]) => ({
      "@type": "Service",
      "@id": `${siteUrl}/#service-${slug}`,
      name,
      serviceType: name,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: ["Denver, Colorado", "Aurora, Colorado"],
      url: slug === "google-business-profile" ? `${siteUrl}/google-business-profile-visual-refresh` : siteUrl,
    })),
  ],
};

export function pageSchema(path: SeoPath) {
  const page = seoPages[path];
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  return {
    "@context": "https://schema.org",
    "@type": page.type,
    "@id": `${url}/#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
    ...(path === "/google-business-profile-visual-refresh" ? {
      mainEntity: {
        "@type": "Service",
        "@id": `${siteUrl}/#service-google-business-profile`,
        name: "Google Business Profile Visual Refresh",
        serviceType: "On-site business photography, short-form video, and Google Business Profile visual update",
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: ["Denver, Colorado", "Aurora, Colorado"],
        offers: {
          "@type": "Offer",
          price: "349",
          priceCurrency: "USD",
          url,
          description: "One-time Google Business Profile Visual Refresh",
        },
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Visual Refresh", item: url },
        ],
      },
    } : {}),
  };
}
