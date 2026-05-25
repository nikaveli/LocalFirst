import Nav from '../components/Nav';
import Footer from '../components/Footer';
import AboutHero from './_components/AboutHero';
import AboutStory from './_components/AboutStory';
import AboutCredentials from './_components/AboutCredentials';
import AboutColorado from './_components/AboutColorado';
import AboutCTA from './_components/AboutCTA';

export const metadata = {
  title: 'About Nicholas — LocalFirst',
  description:
    'Founder of LocalFirst. Google Local Guide Level 7. On-site Google Business Profile management for Colorado small businesses.',
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutCredentials />
        <AboutColorado />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
