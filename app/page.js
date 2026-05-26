import Nav from './components/Nav';
import Hero from './components/Hero';
import ProfileChecklist from './components/ProfileChecklist';
import WeeklyChecklist from './components/WeeklyChecklist';
import TheMethod from './components/TheMethod';
import FounderNote from './components/FounderNote';
import Reviews from './components/Reviews';
import Offer from './components/Offer';
import OnLocation from './components/OnLocation';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

// Rebuild homepage at most once per day so Google reviews stay fresh.
export const revalidate = 86400;

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
        <Reviews />
        <Offer />
        <OnLocation />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
