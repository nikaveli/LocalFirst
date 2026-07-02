'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
    title: 'Add 2–5 fresh photos.',
    body: 'Stale photos = stale business in AI&rsquo;s eyes. New images signal activity.',
  },
  {
    n: '05',
    title: 'Post one short video.',
    body: 'Video is the strongest single local ranking signal AI uses. Full stop.',
  },
  {
    n: '06',
    title: 'Review and update key sections on your profile.',
    body: 'Hours, services, and details drift out of date — and customers act on whatever the profile says.',
  },
];

export default function WeeklyChecklist() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const mm = gsap.matchMedia();

    // Desktop + motion-OK: pin section and scrub items in one by one.
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
      const items = pin.querySelectorAll('[data-pin-item]');
      const head = pin.querySelectorAll('[data-pin-head]');

      gsap.set(items, { opacity: 0.12, y: 32, scale: 0.98 });

      // Head reveals on initial scroll-in.
      gsap.from(head, {
        opacity: 0,
        y: 28,
        rotateX: -6,
        transformPerspective: 800,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
      });

      // Pin + scrub timeline for items.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + window.innerHeight * (items.length * 0.55 + 0.3),
          scrub: 0.8,
          pin: pin,
          anticipatePin: 1,
        },
      });

      items.forEach((it, i) => {
        tl.to(
          it,
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' },
          i * 0.7
        );
      });
    });

    // Mobile or reduced-motion: just reveal everything on enter.
    mm.add(
      '(prefers-reduced-motion: reduce), (max-width: 1023px)',
      () => {
        const targets = pin.querySelectorAll('[data-pin-item], [data-pin-head]');
        gsap.fromTo(
          targets,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 85%', once: true },
          }
        );
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} data-bg-hue="38" className="lf-section" style={{ paddingBottom: 64 }}>
      <div ref={pinRef} className="lf-shell">
        <div data-pin-head className="lf-eyebrow" style={{ marginBottom: 16 }}>
          Here&rsquo;s what it actually takes
        </div>

        <h2 data-pin-head className="lf-h2" style={{ maxWidth: 760, marginBottom: 56 }}>
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
              data-pin-item
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

        <p
          data-pin-item
          className="lf-italic text-[18px] md:text-[20px] mt-10"
          style={{ color: 'var(--color-on-dark-soft)', letterSpacing: '-0.01em' }}
        >
          That&rsquo;s every week —{' '}
          <span style={{ color: 'var(--color-accent)' }}>
            on top of actually running your business.
          </span>
        </p>
      </div>

      {/* Outside the pin so it appears after the user scrolls past. */}
      <div
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
    </section>
  );
}
