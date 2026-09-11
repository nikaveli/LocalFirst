import type { Metadata } from "next";

export const siteUrl = "https://localfirstonline.com";

export const seoPages = {
  "/": {
    title: "Denver Google Business Profile Photography | LocalFirst",
    description:
      "On-site photography, video, 360 imagery, and Google Business Profile optimization in Denver and Aurora, Colorado. Text Nicholas to update your profile today.",
    type: "WebPage",
  },
  "/about": {
    title: "About Nicholas Molina | LocalFirst Colorado Photography",
    description:
      "Meet Nicholas Molina, LocalFirst founder and Colorado photographer. Discover his on-site approach to photos, video, and Google Business Profile optimization.",
    type: "AboutPage",
  },
  "/contact": {
    title: "Contact LocalFirst | Denver Photography & Profile Updates",
    description:
      "Contact Nicholas at LocalFirst for on-site photography, video, and Google Business Profile updates in Denver and Aurora. Call, text, or open an email draft.",
    type: "ContactPage",
  },
  "/first-impressions": {
    title: "First Impressions | Denver & Aurora Videos by LocalFirst",
    description:
      "See LocalFirst video visits to real businesses in Denver and Aurora, Colorado. Explore the work and contact Nicholas about photography and profile updates.",
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
      logo: `${siteUrl}/media/localfirst-logo-primary.png`,
      image: `${siteUrl}/media/localfirst-poster.jpg`,
      telephone: "+1-303-524-0591",
      email: "nick.molina@icloud.com",
      founder: { "@type": "Person", name: "Nicholas Molina" },
      description: "On-site photography, video, 360 imagery, and Google Business Profile optimization for Colorado brick-and-mortar businesses.",
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
      ["google-business-profile", "Google Business Profile optimization"],
    ].map(([slug, name]) => ({
      "@type": "Service",
      "@id": `${siteUrl}/#service-${slug}`,
      name,
      serviceType: name,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: ["Denver, Colorado", "Aurora, Colorado"],
      url: siteUrl,
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
  };
}
