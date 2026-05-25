'use client';

import { useReveal } from '../../components/useReveal';

export default function DiyHero() {
  const ref = useReveal({ stagger: 0.1, y: 28 });

  return (
    <section
      ref={ref}
      className="lf-ambient relative overflow-hidden"
      style={{ paddingTop: 160, paddingBottom: 72 }}
    >
      <div className="lf-shell relative" style={{ maxWidth: 880, zIndex: 1 }}>
        <div data-reveal className="lf-eyebrow" style={{ marginBottom: 18 }}>
          DIY Google Profile
        </div>

        <h1
          data-reveal
          className="lf-h1"
          style={{ marginBottom: 18 }}
        >
          Do It Yourself.{' '}
          <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
            Free.
          </span>
        </h1>

        <p
          data-reveal
          className="lf-body"
          style={{ fontSize: 19, maxWidth: 660, marginBottom: 48 }}
        >
          You can absolutely manage your own Google Business Profile. But staying
          visible to AI and to customers requires a real weekly commitment —
          every single week, without exception.
        </p>

        <div
          data-reveal
          className="lf-card"
          style={{
            padding: 'clamp(28px, 4vw, 40px)',
            borderRadius: 20,
            borderColor: 'var(--color-accent)',
            background:
              'linear-gradient(180deg, rgba(244,176,0,0.08), rgba(244,176,0,0.02))',
          }}
        >
          <div className="lf-eyebrow" style={{ marginBottom: 12 }}>
            Every Week. No Exceptions.
          </div>
          <p
            className="text-[20px] md:text-[22px]"
            style={{
              color: 'var(--color-on-dark)',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              marginBottom: 24,
            }}
          >
            This is the minimum to stay in the game.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              ['5', 'photos'],
              ['1', 'video'],
              ['2', 'posts'],
              ['48h', 'review replies'],
            ].map(([k, v]) => (
              <div
                key={v}
                style={{
                  border: '1px solid var(--color-line-strong)',
                  borderRadius: 12,
                  padding: '14px 16px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 36,
                    lineHeight: 1,
                    color: 'var(--color-accent)',
                    marginBottom: 4,
                  }}
                >
                  {k}
                </div>
                <div
                  className="text-[14px]"
                  style={{ color: 'var(--color-on-dark-soft)' }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>

          <p
            className="text-[15px] lf-italic"
            style={{ color: 'var(--color-on-dark-soft)' }}
          >
            Miss a week and you slide. Stay consistent and you climb.
          </p>
        </div>
      </div>
    </section>
  );
}
