'use client';

import { useReveal } from '../../components/useReveal';

const ITEMS = [
  {
    n: '1',
    title: 'Ask For Reviews',
    body: 'After every job, every sale, every service — ask your customer to leave a Google review. The more recent reviews you have, the more AI sees you as an active, trusted business.',
    tip: 'A simple text after the visit works. &ldquo;Mind leaving us a quick Google review?&rdquo; is enough.',
  },
  {
    n: '2',
    title: 'Respond To Every Review — Within 48 Hours',
    body: 'Good review, bad review — respond to all of them. AI interprets unanswered reviews as a sign that nobody is running the business. A short, genuine reply is all it takes.',
    tip: 'Even a one-sentence reply counts. Don&rsquo;t overthink it — just respond.',
  },
  {
    n: '3',
    title: 'Post Twice a Week',
    body: 'Google Business Profile posts are like a heartbeat for your listing. Two posts a week signals to AI that your business is alive, active, and worth recommending. Share an offer, a tip, a photo, an update — anything current.',
    tip: 'Pick two days (ex: Tuesday & Friday) and treat it like a standing appointment.',
  },
  {
    n: '4',
    title: 'Add 5 Fresh Photos',
    body: 'Upload at least 5 new photos every week. They don&rsquo;t need to be professional — real photos of your work, your team, your space, or your products all count. Stale photos tell AI your business hasn&rsquo;t changed.',
    tip: 'Take photos on your phone as you work. Five quick shots go a long way.',
  },
  {
    n: '5',
    title: 'Post One Video',
    body: 'Video is one of the strongest signals Google and AI use to rank local businesses. Even a 30-second clip of your team, your work, or your space makes a significant difference in how your profile is scored.',
    tip: 'Shoot vertical on your phone. No editing needed — authentic beats polished every time.',
  },
];

export default function FiveThings() {
  const ref = useReveal({ stagger: 0.07, y: 32 });

  return (
    <section ref={ref} className="lf-section">
      <div className="lf-shell">
        <div data-reveal className="lf-eyebrow" style={{ marginBottom: 16 }}>
          The Weekly Five
        </div>

        <h2 data-reveal className="lf-h2" style={{ marginBottom: 16 }}>
          The 5 Things You{' '}
          <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
            Have To
          </span>{' '}
          Do
        </h2>

        <p data-reveal className="lf-body" style={{ maxWidth: 660, marginBottom: 56 }}>
          Do all five, every week. Skip any one and your profile starts to look
          inactive to AI.
        </p>

        <div className="space-y-5">
          {ITEMS.map((item) => (
            <article
              key={item.n}
              data-reveal
              className="lf-card grid items-start gap-x-7"
              style={{
                gridTemplateColumns: 'auto 1fr',
                padding: 'clamp(24px, 3vw, 36px)',
                borderRadius: 18,
              }}
            >
              <div
                className="lf-numeral"
                style={{ fontSize: 'clamp(56px, 7vw, 84px)', marginTop: -8 }}
              >
                {item.n}
              </div>

              <div>
                <h3
                  className="lf-h3"
                  style={{ color: 'var(--color-on-dark)', marginBottom: 10 }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[16px]"
                  style={{
                    color: 'var(--color-on-dark-soft)',
                    lineHeight: 1.55,
                    marginBottom: 20,
                  }}
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
                <div
                  className="flex items-start gap-3"
                  style={{
                    paddingTop: 16,
                    borderTop: '1px solid var(--color-line)',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      fontSize: 18,
                      lineHeight: 1.4,
                      flexShrink: 0,
                    }}
                  >
                    💡
                  </span>
                  <p
                    className="text-[14.5px] lf-italic"
                    style={{ color: 'var(--color-on-dark-soft)' }}
                    dangerouslySetInnerHTML={{ __html: item.tip }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
