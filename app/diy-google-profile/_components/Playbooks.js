'use client';

import { useReveal } from '../../components/useReveal';

const BOOKS = [
  {
    title: 'Restaurants & Cafés',
    sub: '2026 GBP Best Practices Playbook · PDF',
    href: '#',
  },
  {
    title: 'Hotels & Accommodations',
    sub: '2026 GBP Best Practices Playbook · PDF',
    href: '#',
  },
  {
    title: 'Tour & Activity Operators',
    sub: '2026 GBP Best Practices Playbook · PDF',
    href: '#',
  },
  {
    title: 'Service-Based Businesses',
    sub: '2026 GBP Best Practices Playbook · PDF',
    href: '#',
  },
];

export default function Playbooks() {
  const ref = useReveal({ stagger: 0.08, y: 28 });

  return (
    <section ref={ref} className="lf-section">
      <div className="lf-shell">
        <div data-reveal className="lf-eyebrow" style={{ marginBottom: 16 }}>
          Free Playbooks
        </div>

        <h2 data-reveal className="lf-h2" style={{ marginBottom: 16 }}>
          Free Playbooks to Get You Started
        </h2>

        <h3
          data-reveal
          className="lf-italic"
          style={{
            fontSize: 22,
            color: 'var(--color-primary)',
            marginBottom: 18,
          }}
        >
          Google&rsquo;s Official GBP Guides — By Business Type
        </h3>

        <p data-reveal className="lf-body" style={{ maxWidth: 660, marginBottom: 56 }}>
          Google&rsquo;s own 2026 best practices playbooks. Download the one that
          fits your business and follow it alongside the 5 steps above.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {BOOKS.map((b) => (
            <a
              key={b.title}
              data-reveal
              href={b.href}
              className="lf-card group flex items-start justify-between gap-4"
              style={{
                padding: '26px 28px',
                borderRadius: 16,
                transition: 'border-color 220ms, transform 220ms var(--ease-out-soft)',
              }}
            >
              <div>
                <h4
                  className="text-[19px] font-semibold mb-1.5"
                  style={{ color: 'var(--color-on-dark)', letterSpacing: '-0.01em' }}
                >
                  {b.title}
                </h4>
                <div
                  className="text-[14px]"
                  style={{ color: 'var(--color-on-dark-soft)' }}
                >
                  {b.sub}
                </div>
              </div>
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: '1px solid var(--color-line-strong)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--color-primary)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8H13M13 8L8 3M13 8L8 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          ))}
        </div>

        <p
          data-reveal
          className="text-center mt-12 text-[15px]"
          style={{ color: 'var(--color-on-dark-soft)' }}
        >
          Don&rsquo;t fit a category?{' '}
          <a href="https://support.google.com/business/community" className="lf-link-gold">
            Try the Google Business Help Community →
          </a>
        </p>
      </div>
    </section>
  );
}
