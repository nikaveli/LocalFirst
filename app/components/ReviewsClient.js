'use client';

import { useReveal } from './useReveal';

function Stars({ n }) {
  return (
    <span
      aria-label={`${n} out of 5 stars`}
      style={{ display: 'inline-flex', gap: 3, color: 'var(--color-accent)' }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill={i < n ? 'currentColor' : 'transparent'}
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.5 6 0.7-4.4 4 1.2 5.9L10 14.8 4.6 17.6l1.2-5.9-4.4-4 6-0.7L10 1.5z" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ r }) {
  const hasText = r.text && r.text.length > 0;
  return (
    <article
      data-reveal
      className="lf-card reviews-card"
      style={{
        padding: 'clamp(22px, 3vw, 30px)',
        borderRadius: 18,
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: hasText ? 16 : 12 }}
      >
        <Stars n={r.rating} />
        <span
          className="text-[11px]"
          style={{
            color: 'var(--color-on-dark-soft)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {r.relativeTime}
        </span>
      </div>

      {hasText ? (
        <blockquote
          className="lf-italic"
          style={{
            fontSize: 'clamp(16px, 1.5vw, 18px)',
            lineHeight: 1.55,
            color: 'var(--color-on-dark)',
            marginBottom: 20,
          }}
        >
          <span style={{ color: 'var(--color-primary)' }}>&ldquo;</span>
          {r.text}
          <span style={{ color: 'var(--color-primary)' }}>&rdquo;</span>
        </blockquote>
      ) : (
        <p
          className="lf-italic"
          style={{
            fontSize: 15,
            color: 'var(--color-on-dark-soft)',
            marginBottom: 16,
          }}
        >
          Left a {r.rating}-star rating.
        </p>
      )}

      <div
        className="flex items-center gap-3"
        style={{
          paddingTop: 14,
          borderTop: '1px solid var(--color-line)',
        }}
      >
        {r.profilePhoto ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={r.profilePhoto}
            alt=""
            referrerPolicy="no-referrer"
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        ) : (
          <span
            aria-hidden
            className="grid place-items-center"
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'var(--color-card-2)',
              border: '1px solid var(--color-line-strong)',
              color: 'var(--color-on-dark-soft)',
              fontSize: 12,
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {r.author?.[0] || '·'}
          </span>
        )}
        <div style={{ minWidth: 0 }}>
          <div
            className="text-[14px] truncate"
            style={{
              color: 'var(--color-on-dark)',
              fontWeight: 500,
            }}
          >
            {r.author}
          </div>
          <div
            className="text-[11px]"
            style={{
              color: 'var(--color-on-dark-soft)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Verified Google Review
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ReviewsClient({ data }) {
  const ref = useReveal({ stagger: 0.08, y: 32 });
  // Show up to 6 — Google returns max 5 but be defensive.
  const shown = data.reviews.slice(0, 6);

  return (
    <section ref={ref} data-bg-hue="38" className="lf-section">
      <div className="lf-shell">
        <div data-reveal className="lf-eyebrow" style={{ marginBottom: 16 }}>
          What businesses are saying
        </div>

        <h2 data-reveal className="lf-h2" style={{ marginBottom: 16, maxWidth: 800 }}>
          <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
            {data.rating?.toFixed(1)} stars
          </span>{' '}
          across {data.totalReviews} Google reviews.
        </h2>

        <p
          data-reveal
          className="lf-body"
          style={{ maxWidth: 560, marginBottom: 40 }}
        >
          Pulled live from Google — the same source AI is reading to decide
          who gets recommended.
        </p>

        {/* The track behaves as a horizontal swipe carousel on mobile,
            and a 2-column grid on desktop. CSS lives in globals.css. */}
        <div className="reviews-track">
          {shown.map((r, i) => (
            <ReviewCard key={`${r.author}-${i}`} r={r} />
          ))}
        </div>

        {/* Swipe hint, mobile only */}
        <div
          className="reviews-hint"
          style={{
            color: 'var(--color-muted-soft)',
            fontSize: 12,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginTop: 16,
          }}
        >
          Swipe to see more →
        </div>

        <div data-reveal className="text-center mt-12">
          <a
            href={data.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lf-link-gold text-[15px]"
          >
            See all {data.totalReviews} reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
