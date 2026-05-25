import Nav from '../components/Nav';
import Footer from '../components/Footer';
import FIHero from './_components/FIHero';
import FIGallery from './_components/FIGallery';
import FICTA from './_components/FICTA';

export const metadata = {
  title: 'First Impressions — Photos & Video from Real Visits',
  description:
    'Real businesses. Real visits. Every video was captured on-site by Nicholas at LocalFirst. No stock. No filler. Hover any card to play.',
  alternates: { canonical: '/first-impressions' },
  openGraph: {
    title: 'First Impressions — Real Colorado Business Visits',
    description:
      'A growing portfolio of on-site visits to Colorado small businesses. Every video shot in person by Nicholas at LocalFirst.',
    url: '/first-impressions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'First Impressions — Real Visits',
    description: 'On-site videos from Colorado small businesses. No stock. No filler.',
  },
};

export default function FirstImpressionsPage() {
  return (
    <>
      <Nav />
      <main>
        <FIHero />
        <FIGallery />
        <FICTA />
      </main>
      <Footer />
    </>
  );
}
