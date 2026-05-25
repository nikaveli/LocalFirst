'use client';

import { useReveal } from '../../components/useReveal';

export default function AboutStory() {
  const ref = useReveal({ stagger: 0.08, y: 32 });

  return (
    <section ref={ref} className="lf-section">
      <div className="lf-shell">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
          <div data-reveal className="lg:sticky lg:top-32">
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
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.6) 100%)',
                  pointerEvents: 'none',
                }}
              />
              <div
                className="absolute"
                style={{
                  left: 20,
                  bottom: 20,
                  padding: '8px 14px',
                  borderRadius: 999,
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--color-line-strong)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-on-dark)',
                }}
              >
                Founder · LocalFirst
              </div>
            </div>
          </div>

          <div>
            <div data-reveal className="lf-eyebrow" style={{ marginBottom: 16 }}>
              The story
            </div>

            <h2 data-reveal className="lf-h2" style={{ marginBottom: 32 }}>
              Why I started{' '}
              <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
                LocalFirst.
              </span>
            </h2>

            <div className="space-y-6 text-[17px]" style={{ color: 'var(--color-on-dark-soft)', lineHeight: 1.65 }}>
              <p data-reveal>
                I watched good local businesses close — not because they were
                bad at what they do, but because they were invisible online.
                A bakery I&rsquo;d been going to for years. A barber who knew
                everyone&rsquo;s name. A mechanic who saved my truck more than
                once. Gone, one after another.
              </p>

              <p data-reveal>
                They were great at their craft. They were terrible at fighting
                the algorithm. And nobody was helping them.
              </p>

              <p data-reveal style={{ color: 'var(--color-on-dark)', fontWeight: 500 }}>
                That&rsquo;s not going to happen on my watch.
              </p>

              <p data-reveal>
                LocalFirst is the company I wish those businesses had access to.
                I show up in person. I take real photos. I shoot real video. I
                answer the questions AI is asking about your business — on the
                ground, with my own two feet.
              </p>

              <p data-reveal>
                I&rsquo;m a Google Local Guide at Level 7 — Google&rsquo;s own
                platform recognizes me as a verified Top 1% contributor. When
                I post to your profile, Google trusts the source. That trust
                becomes a ranking signal.
              </p>

              <p data-reveal>
                I only work with Colorado businesses. I only work on-site. And
                I only take on what I can actually handle, one business at a
                time.
              </p>
            </div>

            <div
              data-reveal
              className="lf-italic mt-12"
              style={{
                fontSize: 'clamp(24px, 2.6vw, 30px)',
                color: 'var(--color-on-dark)',
                lineHeight: 1.3,
                borderLeft: '3px solid var(--color-accent)',
                paddingLeft: 24,
              }}
            >
              No stock. No filler. No hype.{' '}
              <span style={{ color: 'var(--color-primary)' }}>
                The brand is earned, not announced.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
