'use client';

import { useReveal } from './useReveal';

export default function FounderNote() {
  const ref = useReveal({ stagger: 0.1, y: 32 });

  return (
    <section ref={ref} data-bg-hue="240" className="lf-section">
      <div className="lf-shell">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center">
          <div data-reveal className="relative">
            <div
              className="lf-card relative overflow-hidden"
              style={{
                aspectRatio: '4 / 5',
                borderRadius: 22,
                background: 'var(--color-card)',
              }}
            >
              <img
                src="/assets/nicholas.png"
                alt="Nicholas, founder of LocalFirst"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Subtle gradient overlay for badge legibility */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%)',
                  pointerEvents: 'none',
                }}
              />

              <div
                className="absolute"
                style={{
                  left: 20,
                  bottom: 20,
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--color-line-strong)',
                  fontSize: 12,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-on-dark)',
                }}
              >
                Founder · LocalFirst
              </div>
            </div>
          </div>

          <div>
            <div data-reveal className="lf-eyebrow" style={{ marginBottom: 18 }}>
              Why I started LocalFirst
            </div>

            <blockquote
              data-reveal
              className="lf-italic"
              style={{
                fontSize: 'clamp(26px, 3.4vw, 38px)',
                lineHeight: 1.25,
                color: 'var(--color-on-dark)',
                marginBottom: 28,
              }}
            >
              <span style={{ color: 'var(--color-primary)' }}>&ldquo;</span>
              I started LocalFirst because I watched good local businesses
              close — not because they were bad at what they do, but
              because they were invisible online.
              <br />
              <br />
              <span style={{ color: 'var(--color-accent)' }}>
                That&rsquo;s not going to happen on my watch.
              </span>
              <br />
              <br />
              No business left behind.
              <span style={{ color: 'var(--color-primary)' }}>&rdquo;</span>
            </blockquote>

            <div
              data-reveal
              className="flex items-center gap-3 text-[15px]"
              style={{ color: 'var(--color-on-dark-soft)', marginBottom: 24 }}
            >
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: 'var(--color-accent)',
                  display: 'inline-block',
                }}
              />
              Nicholas, Founder &nbsp;·&nbsp; LocalFirst &nbsp;·&nbsp; Colorado
            </div>

            <div data-reveal className="flex flex-wrap gap-6 mt-8 text-[13px]" style={{ color: 'var(--color-on-dark-soft)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <span>Google Local Guide · L7</span>
              <span style={{ color: 'var(--color-line-strong)' }}>|</span>
              <span>BBB A+ Accredited</span>
              <span style={{ color: 'var(--color-line-strong)' }}>|</span>
              <span>Colorado-based</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
