'use client';

import { useReveal } from '../../components/useReveal';

export default function AboutCTA() {
  const ref = useReveal({ stagger: 0.08, y: 24 });

  return (
    <section ref={ref} className="lf-section" style={{ paddingBlock: 96 }}>
      <div className="lf-shell text-center" style={{ maxWidth: 680 }}>
        <h2
          data-reveal
          className="lf-italic"
          style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1.1,
            color: 'var(--color-on-dark)',
            marginBottom: 28,
          }}
        >
          Want to{' '}
          <span style={{ color: 'var(--color-primary)' }}>work together?</span>
        </h2>

        <p
          data-reveal
          className="lf-body"
          style={{ marginBottom: 36, maxWidth: 520, marginInline: 'auto' }}
        >
          Best way is the simplest way: call me. We&rsquo;ll talk about your
          business for ten minutes. If it&rsquo;s a fit, great. If not, I&rsquo;ll
          tell you that too.
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
