'use client';

import { useReveal } from '../../components/useReveal';

export default function ContactHero() {
  const ref = useReveal({ stagger: 0.1, y: 28 });

  return (
    <section
      ref={ref}
      className="lf-ambient relative overflow-hidden"
      style={{ paddingTop: 160, paddingBottom: 56 }}
    >
      <div className="lf-shell relative" style={{ maxWidth: 920, zIndex: 1 }}>
        <div data-reveal className="lf-eyebrow" style={{ marginBottom: 18 }}>
          Contact
        </div>

        <h1 data-reveal className="lf-h1" style={{ marginBottom: 24, maxWidth: 760 }}>
          Let&rsquo;s{' '}
          <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
            talk.
          </span>
        </h1>

        <p
          data-reveal
          className="lf-body"
          style={{ fontSize: 19, maxWidth: 620, lineHeight: 1.55 }}
        >
          Easiest way to reach me is the phone. I answer it myself. If you
          prefer to write, the form below sends straight to my inbox.
        </p>
      </div>
    </section>
  );
}
