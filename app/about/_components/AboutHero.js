'use client';

import { useReveal } from '../../components/useReveal';

export default function AboutHero() {
  const ref = useReveal({ stagger: 0.1, y: 28 });

  return (
    <section
      ref={ref}
      className="lf-ambient relative overflow-hidden"
      style={{ paddingTop: 160, paddingBottom: 72 }}
    >
      <div className="lf-shell relative" style={{ maxWidth: 920, zIndex: 1 }}>
        <div data-reveal className="lf-eyebrow" style={{ marginBottom: 18 }}>
          About
        </div>

        <h1 data-reveal className="lf-h1" style={{ marginBottom: 28, maxWidth: 820 }}>
          Hi, I&rsquo;m{' '}
          <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
            Nicholas.
          </span>
        </h1>

        <p
          data-reveal
          className="lf-body"
          style={{ fontSize: 21, maxWidth: 680, lineHeight: 1.5 }}
        >
          I started LocalFirst with one mission:{' '}
          <span style={{ color: 'var(--color-on-dark)' }}>
            no business left behind.
          </span>{' '}
          I show up in person — camera in hand, boots on the sidewalk — and
          keep Colorado&rsquo;s small businesses visible in the AI search era.
        </p>
      </div>
    </section>
  );
}
