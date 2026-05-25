'use client';

import { useReveal } from '../../components/useReveal';
import VisitCard from '../../components/VisitCard';
import { VISITS } from '../../_data/visits';

export default function FIGallery() {
  const ref = useReveal({ stagger: 0.06, y: 28 });

  return (
    <section ref={ref} className="lf-section" style={{ paddingTop: 32 }}>
      <div className="lf-shell">
        <div
          data-reveal
          className="flex flex-wrap items-baseline justify-between gap-4 mb-10"
        >
          <div
            className="lf-eyebrow lf-eyebrow--soft"
            style={{ letterSpacing: '0.16em' }}
          >
            {VISITS.length} visits · all video · hover to play
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VISITS.map((v) => (
            <VisitCard key={v.file} visit={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
