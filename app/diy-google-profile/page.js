import Nav from '../components/Nav';
import Footer from '../components/Footer';
import DiyHero from './_components/DiyHero';
import FiveThings from './_components/FiveThings';
import Playbooks from './_components/Playbooks';
import PaidAlternative from './_components/PaidAlternative';

export const metadata = {
  title: 'DIY Google Business Profile — LocalFirst',
  description:
    'You can absolutely manage your own Google Business Profile. Here are the 5 things you have to do every week to stay visible to AI — plus Google\'s official 2026 playbooks, free.',
};

export default function DiyPage() {
  return (
    <>
      <Nav />
      <main>
        <DiyHero />
        <FiveThings />
        <Playbooks />
        <PaidAlternative />
      </main>
      <Footer />
    </>
  );
}
