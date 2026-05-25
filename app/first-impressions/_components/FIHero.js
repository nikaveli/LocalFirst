'use client';

import { useReveal } from '../../components/useReveal';

export default function FIHero() {
  const ref = useReveal({ stagger: 0.1, y: 28 });

  return (
    <section
      ref={ref}
      className="lf-ambient relative overflow-hidden"
      style={{ paddingTop: 160, paddingBottom: 56 }}
    >
      <div className="lf-shell relative" style={{ maxWidth: 920, zIndex: 1 }}>
        <div data-reveal className="lf-eyebrow" style={{ marginBottom: 18 }}>
          First Impressions
        </div>

        <h1 data-reveal className="lf-h1" style={{ marginBottom: 24 }}>
          Real businesses.{' '}
          <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
            Real visits.
          </span>
        </h1>

        <p
          data-reveal
          className="lf-body"
          style={{ fontSize: 19, maxWidth: 680, lineHeight: 1.55 }}
        >
          Every photo and video below was captured on-site by me. No stock.
          No filler. This page updates as I work.
        </p>
      </div>
    </section>
  );
}
