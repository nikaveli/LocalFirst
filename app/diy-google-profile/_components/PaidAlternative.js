'use client';

import { useReveal } from '../../components/useReveal';

export default function PaidAlternative() {
  const ref = useReveal({ stagger: 0.08, y: 24 });

  return (
    <section ref={ref} className="lf-section lf-ambient">
      <div className="lf-shell relative" style={{ maxWidth: 820, zIndex: 1 }}>
        <div
          data-reveal
          className="lf-card relative overflow-hidden text-center"
          style={{
            padding: 'clamp(40px, 6vw, 72px)',
            borderRadius: 24,
            borderColor: 'var(--color-primary)',
            background:
              'linear-gradient(180deg, rgba(153,187,234,0.08), rgba(0,0,0,0))',
          }}
        >
          <div
            aria-hidden
            className="absolute"
            style={{
              left: '50%',
              top: -180,
              transform: 'translateX(-50%)',
              width: 480,
              height: 480,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(153,187,234,0.22), transparent 60%)',
              pointerEvents: 'none',
            }}
          />

          <div data-reveal className="lf-eyebrow" style={{ marginBottom: 14 }}>
            Rather have it done for you?
          </div>

          <h2 data-reveal className="lf-h2" style={{ marginBottom: 18 }}>
            If This Feels Like a Lot —{' '}
            <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
              That&rsquo;s Because It Is.
            </span>
          </h2>

          <p
            data-reveal
            className="lf-body"
            style={{ maxWidth: 560, marginInline: 'auto', marginBottom: 40 }}
          >
            One on-site visit: full profile update, fresh photos, posts,
            video, a 360° Virtual Tour, and replies to unanswered reviews.
            You run your business. Nicholas makes sure Google shows it.
          </p>

          <div
            data-reveal
            className="flex items-baseline justify-center gap-3"
            style={{ marginBottom: 8 }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(72px, 11vw, 128px)',
                lineHeight: 1,
                color: 'var(--color-on-dark)',
                letterSpacing: '-0.02em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              $497
            </span>
            <span
              style={{
                fontSize: 22,
                color: 'var(--color-on-dark-soft)',
              }}
            >
              one-time
            </span>
          </div>
          <div
            data-reveal
            className="text-[15px]"
            style={{ color: 'var(--color-on-dark-soft)', marginBottom: 36 }}
          >
            No contract · No monthly fees · Monthly Stay Active plans from $297
          </div>

          <div
            data-reveal
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="tel:3035240591" className="lf-btn lf-btn--primary lf-btn--lg">
              Call Nicholas — 303-524-0591
            </a>
            <a href="/#pricing" className="lf-btn lf-btn--ghost lf-btn--lg">
              See both plans →
            </a>
          </div>

          <div
            data-reveal
            className="text-[13px] mt-8"
            style={{ color: 'var(--color-muted-soft)' }}
          >
            LocalFirst · localfirstonline.com · Colorado Only
          </div>
        </div>
      </div>
    </section>
  );
}
