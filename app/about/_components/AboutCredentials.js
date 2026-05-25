'use client';

import { useReveal } from '../../components/useReveal';
import Counter from '../../components/Counter';

const CREDS = [
  {
    label: 'Google Local Guide',
    value: 'Level 7',
    counter: { to: 7, prefix: 'Level ' },
    detail:
      'Verified Top 1% contributor on Google&rsquo;s own platform. Posts and edits I make carry source trust most agencies will never have.',
  },
  {
    label: 'BBB Accreditation',
    value: 'A+ Rated',
    detail:
      'Better Business Bureau accredited with an A+ rating. Receipts, not claims.',
  },
  {
    label: 'Service Area',
    value: 'Colorado Only',
    detail:
      'Denver / Aurora metro on-site. Front Range available by arrangement. I don&rsquo;t take work outside Colorado — full stop.',
  },
  {
    label: 'Approach',
    value: 'On-site, Always',
    detail:
      'Every photo, every video, every Ask Maps answer is captured in person at your business. No remote work. No stock.',
  },
];

export default function AboutCredentials() {
  const ref = useReveal({ stagger: 0.08, y: 28 });

  return (
    <section ref={ref} className="lf-section">
      <div className="lf-shell">
        <div data-reveal className="lf-eyebrow" style={{ marginBottom: 16 }}>
          Credentials
        </div>

        <h2 data-reveal className="lf-h2" style={{ marginBottom: 56, maxWidth: 720 }}>
          The receipts.
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {CREDS.map((c) => (
            <article
              key={c.label}
              data-reveal
              className="lf-card"
              style={{ padding: 'clamp(24px, 3vw, 32px)', borderRadius: 18 }}
            >
              <div
                className="lf-eyebrow lf-eyebrow--soft"
                style={{ marginBottom: 14 }}
              >
                {c.label}
              </div>
              <div
                className="lf-italic"
                style={{
                  fontSize: 'clamp(30px, 3.4vw, 40px)',
                  lineHeight: 1.1,
                  color: 'var(--color-primary)',
                  marginBottom: 16,
                }}
              >
                {c.counter ? (
                  <Counter to={c.counter.to} prefix={c.counter.prefix} duration={1.4} />
                ) : (
                  c.value
                )}
              </div>
              <p
                className="text-[15.5px]"
                style={{ color: 'var(--color-on-dark-soft)', lineHeight: 1.55 }}
                dangerouslySetInnerHTML={{ __html: c.detail }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
