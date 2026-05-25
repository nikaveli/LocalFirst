import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ContactHero from './_components/ContactHero';
import ContactContent from './_components/ContactContent';

export const metadata = {
  title: 'Contact Nicholas',
  description:
    'Get in touch with Nicholas at LocalFirst. On-site Google Business Profile management for Colorado small businesses. Call 303-524-0591.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — LocalFirst',
    description:
      'Talk to Nicholas about your Google Business Profile. Denver / Aurora metro on-site. 303-524-0591.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — LocalFirst',
    description: 'Talk to Nicholas. 303-524-0591. Colorado-only.',
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <ContactHero />
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
