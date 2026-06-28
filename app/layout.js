import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';
import SiteBackdrop from './components/SiteBackdrop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
  style: ['normal', 'italic'],
});

const SITE = 'https://localfirstonline.com';

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'LocalFirst — Google Business Profile Management for Colorado Small Businesses',
    template: '%s · LocalFirst',
  },
  description:
    'Customers are asking AI to find a business like yours. LocalFirst keeps your Google Business Profile active, credible, and recommended. Colorado-only. Plans from $297/month, 6-month commitment.',
  applicationName: 'LocalFirst',
  authors: [{ name: 'Nicholas Molina', url: SITE }],
  creator: 'Nicholas Molina',
  publisher: 'LocalFirst',
  keywords: [
    'Google Business Profile',
    'GBP management',
    'local SEO',
    'AI local search',
    'Colorado small business',
    'Denver',
    'Aurora',
    'Google Local Guide',
    'on-site photography',
    'review management',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE,
    siteName: 'LocalFirst',
    title: 'LocalFirst — No Business Left Behind',
    description:
      'On-site Google Business Profile management for Colorado small businesses. Plans from $297/month. Built by a Google Local Guide Level 7.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LocalFirst — No Business Left Behind',
    description:
      'On-site Google Business Profile management for Colorado small businesses. Plans from $297/month.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'business',
};

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

// LocalBusiness JSON-LD — feeds Google's knowledge panel and rich results.
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE}/#business`,
  name: 'LocalFirst',
  description:
    'On-site Google Business Profile management for Colorado small businesses. Weekly photos, videos, posts, and review responses by a Google Local Guide Level 7.',
  url: SITE,
  telephone: '+1-303-524-0591',
  email: 'nicholas@localfirstonline.com',
  founder: {
    '@type': 'Person',
    name: 'Nicholas Molina',
    jobTitle: 'Founder',
  },
  areaServed: [
    { '@type': 'City', name: 'Denver', containedInPlace: { '@type': 'State', name: 'Colorado' } },
    { '@type': 'City', name: 'Aurora', containedInPlace: { '@type': 'State', name: 'Colorado' } },
    { '@type': 'AdministrativeArea', name: 'Front Range, Colorado' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'CO',
    addressCountry: 'US',
  },
  priceRange: '$297–$497',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Active Profile — Google Business Profile Management',
          description:
            'Complete GBP optimization, monthly profile checkup, 5 fresh photos per month, 1 monthly post, 48-hour review replies, and core profile info kept current. 6-month commitment.',
        },
        price: '297',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '297',
          priceCurrency: 'USD',
          billingIncrement: 1,
          unitCode: 'MON',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Growth Profile — Google Business Profile Management',
          description:
            'Complete GBP optimization, weekly GBP post, 8–12 fresh photos per month, monthly short video, 48-hour review replies, monthly performance snapshot, and seasonal offer support. 6-month commitment.',
        },
        price: '497',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '497',
          priceCurrency: 'USD',
          billingIncrement: 1,
          unitCode: 'MON',
        },
      },
    ],
  },
  award: ['Google Local Guide Level 7', 'BBB A+ Accreditation'],
  slogan: 'No Business Left Behind',
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>
        <SmoothScroll />
        <SiteBackdrop />
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
