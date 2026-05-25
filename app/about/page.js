import Nav from '../components/Nav';
import Footer from '../components/Footer';
import AboutHero from './_components/AboutHero';
import AboutStory from './_components/AboutStory';
import AboutCredentials from './_components/AboutCredentials';
import AboutColorado from './_components/AboutColorado';
import AboutCTA from './_components/AboutCTA';

export const metadata = {
  title: 'About Nicholas',
  description:
    'Founder of LocalFirst. Google Local Guide Level 7. On-site Google Business Profile management for Colorado small businesses.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Nicholas — Founder, LocalFirst',
    description:
      'Why I started LocalFirst, the credentials behind it, and why Colorado-only.',
    url: '/about',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Nicholas — Founder, LocalFirst',
    description: 'Google Local Guide Level 7. Colorado-only. No Business Left Behind.',
  },
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
