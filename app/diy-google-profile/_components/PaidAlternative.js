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
            Nicholas at LocalFirst handles everything for 6 months. Photos,
            video, posts, review replies, all of it. You run your business.
            He keeps you visible.
          </p>

          <div data-reveal style={{ marginBottom: 8 }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(80px, 12vw, 140px)',
                lineHeight: 1,
                color: 'var(--color-on-dark)',
                letterSpacing: '-0.02em',
              }}
            >
              $997
            </span>
          </div>
          <div
            data-reveal
            className="text-[15px]"
            style={{ color: 'var(--color-on-dark-soft)', marginBottom: 36 }}
          >
            One-time. Six months of service. No contract.
          </div>

          <div data-reveal>
            <a href="tel:3035240591" className="lf-btn lf-btn--primary lf-btn--lg">
              📞 Call Nicholas — 303-524-0591
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
