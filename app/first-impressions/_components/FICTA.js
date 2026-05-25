'use client';

import { useReveal } from '../../components/useReveal';

export default function FICTA() {
  const ref = useReveal({ stagger: 0.08, y: 24 });

  return (
    <section ref={ref} className="lf-section lf-ambient">
      <div className="lf-shell relative text-center" style={{ maxWidth: 680, zIndex: 1 }}>
        <h2
          data-reveal
          className="lf-italic"
          style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            lineHeight: 1.1,
            color: 'var(--color-on-dark)',
            marginBottom: 24,
          }}
        >
          Want your business in here{' '}
          <span style={{ color: 'var(--color-primary)' }}>next?</span>
        </h2>

        <p
          data-reveal
          className="lf-body"
          style={{ marginBottom: 36, maxWidth: 520, marginInline: 'auto' }}
        >
          Colorado small businesses only. I&rsquo;ll come to you, capture
          the work, and keep your profile alive for the next six months.
        </p>

        <div data-reveal className="flex flex-wrap justify-center gap-4">
          <a href="tel:3035240591" className="lf-btn lf-btn--primary lf-btn--lg">
            Call Nicholas — 303-524-0591
          </a>
          <a href="/contact" className="lf-btn lf-btn--ghost lf-btn--lg">
            Send a message →
          </a>
        </div>
      </div>
    </section>
  );
}
