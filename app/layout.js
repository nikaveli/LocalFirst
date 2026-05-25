import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';

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

export const metadata = {
  metadataBase: new URL('https://localfirstonline.com'),
  title: 'LocalFirst — Google Business Profile Management for Colorado Small Businesses',
  description:
    'Customers are asking AI to find a business like yours. LocalFirst keeps your Google Business Profile active, credible, and recommended. Colorado-only. $997 for 6 months. No contracts.',
  openGraph: {
    title: 'LocalFirst — No Business Left Behind',
    description: 'On-site Google Business Profile management for Colorado small businesses.',
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
