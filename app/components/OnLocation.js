'use client';

import { useReveal } from './useReveal';
import VisitCard from './VisitCard';
import { VISITS } from '../_data/visits';

// Homepage shows the first 6 — full set lives at /first-impressions.
const HOMEPAGE_VISITS = VISITS.slice(0, 6);

export default function OnLocation() {
  const ref = useReveal({ stagger: 0.08, y: 32 });

  return (
    <section id="on-location" data-bg-hue="200" ref={ref} className="lf-section">
      <div className="lf-shell">
        <div data-reveal className="lf-eyebrow" style={{ marginBottom: 16 }}>
          On location
        </div>

        <h2 data-reveal className="lf-h2" style={{ marginBottom: 18 }}>
          Real businesses. Real visits.{' '}
          <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
            This week.
          </span>
        </h2>

        <p data-reveal className="lf-body" style={{ maxWidth: 560, marginBottom: 56 }}>
          Every video below was captured on-site by me. No stock. No filler.
          Hover any card to play it.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOMEPAGE_VISITS.map((v) => (
            <VisitCard key={v.file} visit={v} />
          ))}
        </div>

        <div data-reveal className="text-center mt-14">
          <a href="/first-impressions" className="lf-link-gold text-[15px]">
            See all {VISITS.length} recent visits →
          </a>
        </div>
      </div>
    </section>
  );
}
