import Nav from './components/Nav';
import Hero from './components/Hero';
import ProfileChecklist from './components/ProfileChecklist';
import WeeklyChecklist from './components/WeeklyChecklist';
import TheMethod from './components/TheMethod';
import FounderNote from './components/FounderNote';
import Offer from './components/Offer';
import OnLocation from './components/OnLocation';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProfileChecklist />
        <WeeklyChecklist />
        <TheMethod />
        <FounderNote />
        <Offer />
        <OnLocation />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
