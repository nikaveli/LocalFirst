'use client';

import { useReveal } from './useReveal';

export default function FinalCTA() {
  const ref = useReveal({ stagger: 0.08, y: 24 });

  return (
    <section ref={ref} className="lf-section lf-ambient" style={{ paddingBlock: 112 }}>
      <div className="lf-shell text-center relative" style={{ maxWidth: 720, zIndex: 1 }}>
        <h2
          data-reveal
          className="lf-italic"
          style={{
            fontSize: 'clamp(48px, 6vw, 80px)',
            lineHeight: 1.05,
            marginBottom: 24,
            color: 'var(--color-on-dark)',
            letterSpacing: '-0.02em',
          }}
        >
          No business{' '}
          <span style={{ color: 'var(--color-primary)' }}>left behind.</span>
        </h2>

        <p
          data-reveal
          className="lf-body"
          style={{ marginBottom: 36, maxWidth: 560, marginInline: 'auto' }}
        >
          If you run a brick-and-mortar business in the Denver or Aurora
          metro and you&rsquo;re tired of being invisible, let&rsquo;s talk.
        </p>

        <div data-reveal className="flex justify-center mb-6">
          <a href="tel:3035240591" className="lf-btn lf-btn--primary lf-btn--lg">
            Call Nicholas — 303-524-0591
          </a>
        </div>

        <div
          data-reveal
          className="text-[13px]"
          style={{ color: 'var(--color-muted-soft)' }}
        >
          On-site visits available across the Front Range.{' '}
          <span style={{ color: 'var(--color-on-dark-soft)' }}>
            No pressure. No contracts. If it&rsquo;s not a fit, I&rsquo;ll tell you.
          </span>
        </div>
      </div>
    </section>
  );
}
