'use client';

import { useReveal } from './useReveal';

const DELIVERABLES = [
  'Weekly professional photography on location.',
  'Weekly Google Business Profile posts — twice a week, every week.',
  'Monthly professional video, posted to your profile by a Google Local Guide.',
  'Ask Maps answers, verified on-site, on video.',
  'Every review responded to within 48 hours.',
  'Optional 360° virtual tour included.',
];

export default function Offer() {
  const ref = useReveal({ stagger: 0.06, y: 24 });

  return (
    <section ref={ref} className="lf-section">
      <div className="lf-shell" style={{ maxWidth: 880 }}>
        <div
          data-reveal
          className="lf-card relative overflow-hidden"
          style={{
            padding: 'clamp(36px, 5vw, 64px)',
            borderRadius: 24,
            borderColor: 'var(--color-primary)',
            background:
              'linear-gradient(180deg, rgba(153,187,234,0.06), rgba(0,0,0,0))',
          }}
        >
          <div
            aria-hidden
            className="absolute"
            style={{
              right: -120,
              top: -120,
              width: 360,
              height: 360,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(153,187,234,0.22), transparent 60%)',
              pointerEvents: 'none',
            }}
          />

          <div data-reveal className="lf-eyebrow" style={{ marginBottom: 14 }}>
            Let me handle all of it for you
          </div>

          <h2 data-reveal className="lf-h2" style={{ marginBottom: 10 }}>
            Six months. One price.{' '}
            <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
              Everything done for you.
            </span>
          </h2>

          <p
            data-reveal
            className="lf-italic"
            style={{
              fontSize: 17,
              color: 'var(--color-on-dark-soft)',
              marginBottom: 36,
            }}
          >
            Colorado-based. On-site service. Brick-and-mortar businesses only.
          </p>

          <ul className="space-y-3 mb-12">
            {DELIVERABLES.map((d) => (
              <li
                key={d}
                data-reveal
                className="flex items-start gap-4 text-[16px] md:text-[17px]"
                style={{ color: 'var(--color-on-dark)', lineHeight: 1.45 }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    marginTop: 9,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                  }}
                />
                {d}
              </li>
            ))}
          </ul>

          <div data-reveal className="flex items-baseline gap-3 mb-3">
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(72px, 11vw, 140px)',
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
            style={{ color: 'var(--color-on-dark-soft)', marginBottom: 8 }}
          >
            One-time. Six months of service. No monthly fees. No contract.
          </div>
          <div
            data-reveal
            className="text-[15px] lf-italic"
            style={{ color: 'var(--color-accent)', marginBottom: 36 }}
          >
            One or two new customers a month covers the whole thing.
          </div>

          <div data-reveal>
            <a href="tel:3035240591" className="lf-btn lf-btn--primary lf-btn--lg">
              Call Nicholas — 303-524-0591
            </a>
          </div>

          <div
            data-reveal
            className="text-[13px] mt-6"
            style={{ color: 'var(--color-muted-soft)' }}
          >
            No pressure. No contracts. If it&rsquo;s not a fit, I&rsquo;ll tell you.
          </div>
        </div>
      </div>
    </section>
  );
}
