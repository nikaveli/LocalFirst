'use client';

import { useReveal } from './useReveal';

const ITEMS = [
  {
    n: '01',
    title: 'Ask every customer for a review.',
    body: 'Recent reviews are a direct AI ranking signal. No reviews, no trust.',
  },
  {
    n: '02',
    title: 'Respond to every review within 48 hours.',
    body: 'Silence tells AI nobody is running the business.',
  },
  {
    n: '03',
    title: 'Post twice a week.',
    body: 'Consistent posts tell AI your business is alive and worth recommending.',
  },
  {
    n: '04',
    title: 'Upload five fresh photos.',
    body: 'Stale photos = stale business in AI&rsquo;s eyes. New images signal activity.',
  },
  {
    n: '05',
    title: 'Post one video.',
    body: 'Video is the strongest single local ranking signal AI uses. Full stop.',
  },
];

export default function WeeklyChecklist() {
  const ref = useReveal({ stagger: 0.07, y: 28 });

  return (
    <section ref={ref} className="lf-section" style={{ paddingBottom: 64 }}>
      <div className="lf-shell">
        <div data-reveal className="lf-eyebrow" style={{ marginBottom: 16 }}>
          Here&rsquo;s what it actually takes
        </div>

        <h2 data-reveal className="lf-h2" style={{ maxWidth: 760, marginBottom: 56 }}>
          What Google&rsquo;s AI looks for.{' '}
          <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
            Every week.
          </span>{' '}
          <span style={{ color: 'var(--color-on-dark-soft)' }}>No exceptions.</span>
        </h2>

        <ol className="space-y-3">
          {ITEMS.map((item) => (
            <li
              key={item.n}
              data-reveal
              className="lf-card grid items-start gap-x-6"
              style={{
                gridTemplateColumns: '88px 1fr',
                padding: '24px 28px',
                borderRadius: 16,
              }}
            >
              <span className="lf-numeral" style={{ fontSize: 56 }}>
                {item.n}
              </span>
              <div style={{ paddingTop: 8 }}>
                <div
                  className="text-[19px] md:text-[21px] font-semibold"
                  style={{
                    color: 'var(--color-on-dark)',
                    letterSpacing: '-0.01em',
                    marginBottom: 6,
                  }}
                >
                  {item.title}
                </div>
                <div
                  className="text-[16px]"
                  style={{ color: 'var(--color-on-dark-soft)', lineHeight: 1.5 }}
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              </div>
            </li>
          ))}
        </ol>

        <div
          data-reveal
          className="lf-card mt-10"
          style={{
            padding: '32px 32px',
            borderRadius: 18,
            borderColor: 'var(--color-accent)',
            background:
              'linear-gradient(180deg, rgba(244,176,0,0.08), rgba(244,176,0,0.02))',
          }}
        >
          <div className="lf-eyebrow" style={{ marginBottom: 12 }}>
            The Math
          </div>
          <p
            className="text-[20px] md:text-[24px]"
            style={{
              color: 'var(--color-on-dark)',
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
              fontWeight: 500,
            }}
          >
            That&rsquo;s{' '}
            <span style={{ color: 'var(--color-accent)' }}>26 straight weeks</span>{' '}
            of posts, photos, videos, and review responses — while you&rsquo;re
            already running a business full time.
          </p>
        </div>

        <div
          data-reveal
          className="text-center mt-24 mb-2"
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(56px, 8vw, 96px)',
            lineHeight: 1,
            color: 'var(--color-accent)',
          }}
        >
          Or —
        </div>
      </div>
    </section>
  );
}
