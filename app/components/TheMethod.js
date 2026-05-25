'use client';

import { useReveal } from './useReveal';

const PILLARS = [
  {
    n: '01',
    title: 'Google Local Guide · Level 7',
    body: 'Google&rsquo;s own platform recognizes me as a verified Top 1% contributor. When I post to your profile, Google trusts the source. That trust becomes a ranking signal — one most agencies will never have.',
    icon: (
      <span
        className="grid place-items-center"
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background:
            'linear-gradient(160deg, rgba(153,187,234,0.18), rgba(153,187,234,0.04))',
          border: '1px solid var(--color-line-strong)',
          color: 'var(--color-primary)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        L7
      </span>
    ),
  },
  {
    n: '02',
    title: 'On-site Ask Maps answers',
    body: 'Google&rsquo;s new AI search surfaces customer questions on your profile — about your hours, your menu, your service, your parking. When those questions go unanswered, AI fills the gap with guesses. I show up in person and answer them on video. Ground-truth in. Guesswork out.',
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="6" y="2" width="44" height="52" rx="8" stroke="var(--color-primary)" strokeWidth="1.5" />
        <rect x="14" y="14" width="28" height="6" rx="3" fill="var(--color-primary)" opacity="0.6" />
        <rect x="14" y="24" width="20" height="6" rx="3" fill="var(--color-primary)" opacity="0.35" />
        <rect x="14" y="34" width="24" height="6" rx="3" fill="var(--color-accent)" opacity="0.8" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'In-person photography & video, every visit',
    body: 'No stock photos. No AI-generated filler. I drive to your business with professional camera gear and create real content on location. Video is the single strongest signal AI rewards — and almost no one in Colorado is delivering it weekly, on-site, for under a thousand dollars.',
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="4" y="14" width="40" height="28" rx="4" stroke="var(--color-primary)" strokeWidth="1.5" />
        <path d="M44 22L52 18V38L44 34V22Z" stroke="var(--color-primary)" strokeWidth="1.5" />
        <circle cx="24" cy="28" r="6" stroke="var(--color-accent)" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function TheMethod() {
  const ref = useReveal({ stagger: 0.12, y: 48 });

  return (
    <section ref={ref} className="lf-section lf-ambient">
      <div className="lf-shell relative" style={{ zIndex: 1 }}>
        <div data-reveal className="lf-eyebrow" style={{ marginBottom: 16 }}>
          The LocalFirst Method
        </div>

        <h2 data-reveal className="lf-h2" style={{ marginBottom: 18 }}>
          Here&rsquo;s how I{' '}
          <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
            actually
          </span>{' '}
          do this.
        </h2>

        <p data-reveal className="lf-body" style={{ maxWidth: 640, marginBottom: 64 }}>
          Three things make LocalFirst different from every other GBP
          service in Colorado. None of them can be faked. None of them
          can be outsourced. All three happen on your sidewalk.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <article
              key={p.n}
              data-reveal
              className="lf-card flex flex-col"
              style={{
                padding: '32px 28px',
                borderRadius: 20,
                minHeight: 380,
              }}
            >
              <div
                className="lf-numeral"
                style={{ fontSize: 56, marginBottom: 8 }}
              >
                {p.n}
              </div>
              <div style={{ marginBottom: 20 }}>{p.icon}</div>
              <h3 className="lf-h3" style={{ marginBottom: 12 }}>
                {p.title}
              </h3>
              <p
                className="text-[15.5px]"
                style={{ color: 'var(--color-on-dark-soft)', lineHeight: 1.55 }}
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
            </article>
          ))}
        </div>

        <div
          data-reveal
          className="text-center mt-16"
          style={{
            fontSize: 'clamp(20px, 2.4vw, 28px)',
            fontWeight: 500,
            color: 'var(--color-on-dark)',
            letterSpacing: '-0.01em',
          }}
        >
          No agency in Colorado works this way.
        </div>
      </div>
    </section>
  );
}
