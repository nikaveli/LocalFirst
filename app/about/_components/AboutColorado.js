'use client';

import { useReveal } from '../../components/useReveal';

export default function AboutColorado() {
  const ref = useReveal({ stagger: 0.1, y: 28 });

  return (
    <section ref={ref} className="lf-section lf-ambient">
      <div className="lf-shell relative" style={{ maxWidth: 820, zIndex: 1 }}>
        <div data-reveal className="lf-eyebrow" style={{ marginBottom: 16 }}>
          Colorado
        </div>

        <h2 data-reveal className="lf-h2" style={{ marginBottom: 28 }}>
          Why Colorado{' '}
          <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
            only.
          </span>
        </h2>

        <div
          data-reveal
          className="text-[18px]"
          style={{ color: 'var(--color-on-dark-soft)', lineHeight: 1.6 }}
        >
          <p style={{ marginBottom: 20 }}>
            Local means local. If I can&rsquo;t drive to you, I can&rsquo;t
            help you the way I want to. So I keep it tight: Denver, Aurora,
            and the Front Range.
          </p>
          <p style={{ marginBottom: 20 }}>
            That means I know the neighborhoods. I know the cross-streets.
            I know which block of Colfax is busy at 9am and which one is
            dead. That context shows up in your photos, your videos, and
            the way I answer questions about your business on Google.
          </p>
          <p>
            Tight service area. Real visits. Real proof.{' '}
            <span style={{ color: 'var(--color-on-dark)' }}>
              That&rsquo;s the deal.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
