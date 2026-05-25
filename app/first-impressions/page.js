import Nav from '../components/Nav';
import Footer from '../components/Footer';
import FIHero from './_components/FIHero';
import FIGallery from './_components/FIGallery';
import FICTA from './_components/FICTA';

export const metadata = {
  title: 'First Impressions — Photos & Video from Real Visits | LocalFirst',
  description:
    'Real businesses. Real visits. Every photo and video below was captured on-site by Nicholas at LocalFirst. No stock. No filler.',
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
