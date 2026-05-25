import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ContactHero from './_components/ContactHero';
import ContactContent from './_components/ContactContent';

export const metadata = {
  title: 'Contact Nicholas — LocalFirst',
  description:
    'Get in touch with Nicholas at LocalFirst. On-site Google Business Profile management for Colorado small businesses. Call 303-524-0591.',
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
