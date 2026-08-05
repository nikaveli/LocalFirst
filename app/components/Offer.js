'use client';

import { useReveal } from './useReveal';
import Counter from './Counter';

const PLANS = [
  {
    id: 'visual-update',
    name: 'Visual Update',
    price: 497,
    period: 'one-time',
    commitment: 'No contract. No monthly fees.',
    badge: 'Start here',
    tagline: 'One on-site visit brings the whole profile current.',
    deliverables: [
      'Full profile update — services, hours, categories, and description brought current',
      'Fresh professional photos, taken on-site',
      'Google Business Profile posts',
      'Short video',
      '360° Virtual Tour',
      'Replies to unanswered reviews from the past 14 days',
    ],
  },
  {
    id: 'active',
    name: 'Active Profile',
    price: 297,
    period: '/month',
    commitment: '6-month commitment',
    tagline: 'Keeps the basics current and trustworthy.',
    deliverables: [
      'Full profile refresh to start',
      'Monthly profile checkup',
      '5 fresh photo uploads per month',
      '1 Google Business Profile post per month',
      'Review replies within 48 business hours',
      'Hours, services, categories, description, and basic info kept current',
    ],
  },
  {
    id: 'growth',
    name: 'Growth Profile',
    price: 497,
    period: '/month',
    commitment: '6-month commitment',
    badge: 'Most popular',
    tagline: 'For owners who want their profile actively working every week.',
    recommended: true,
    deliverables: [
      'Full profile refresh to start',
      'Weekly Google Business Profile post',
      '8–12 fresh photo uploads per month',
      '1 short video per month',
      'Review replies within 48 business hours',
      'Monthly profile performance snapshot',
      'Seasonal offer/update support',
    ],
  },
];

// Menu & product photography — priced two ways. The lower number is the
// add-on rate (I'm already on-site for the Visual Update shoot); the higher
// number is a standalone booking.
const PHOTO_TIERS = [
  {
    scope: 'Hero / Small Menu',
    photos: '10–12 photos',
    addon: { pkg: '$250', per: '~$25 / image' },
    standalone: { pkg: '$350', per: '~$35 / image' },
  },
  {
    scope: 'Core Menu Shoot',
    photos: '20–25 photos',
    addon: { pkg: '$450', per: '~$20 / image' },
    standalone: { pkg: '$600', per: '~$25 / image' },
  },
  {
    scope: 'High-Volume Menu',
    photos: '35–40+ photos',
    addon: { pkg: '$750', per: '~$15 / image' },
    standalone: { pkg: '$1,000', per: '~$20 / image' },
  },
];

export default function Offer() {
  const ref = useReveal({ stagger: 0.06, y: 24 });

  return (
    <section ref={ref} data-bg-hue="42" className="lf-section">
      <div className="lf-shell" style={{ maxWidth: 1120 }}>
        {/* Intro */}
        <div className="text-center" style={{ marginBottom: 56 }}>
          <div data-reveal className="lf-eyebrow" style={{ marginBottom: 14 }}>
            Let me handle all of it for you
          </div>
          <h2
            data-reveal
            className="lf-h2"
            style={{ marginBottom: 18, maxWidth: 720, marginInline: 'auto' }}
          >
            Start with one visit.{' '}
            <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
              Stay active every month.
            </span>
          </h2>
          <p
            data-reveal
            className="lf-body"
            style={{
              maxWidth: 720,
              marginInline: 'auto',
              color: 'var(--color-on-dark-soft)',
            }}
          >
            Google Business Profile is free, but keeping it active, current,
            visual, and trustworthy takes work. These plans are built for
            business owners who do not have time to keep updating photos,
            posts, reviews, services, and messaging every week — but still
            need their Google first impression to help customers choose them.
          </p>
        </div>

        {/* Plan cards — explicit breakpoint so the third card never orphans */}
        <div className="grid gap-6 md:gap-7 grid-cols-1 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Menu & product photography — add-on or standalone */}
        <PhotographyCard />

        {/* Footer notes */}
        <p
          data-reveal
          className="text-center"
          style={{
            fontSize: 14,
            color: 'var(--color-muted-soft)',
            marginTop: 40,
          }}
        >
          360° photo add-ons: 1 photo $95 &nbsp;·&nbsp; 3 photos $135
          &nbsp;·&nbsp; virtual tour $175
        </p>
        <p
          data-reveal
          className="lf-italic text-center"
          style={{
            fontSize: 15,
            color: 'var(--color-on-dark-soft)',
            marginTop: 12,
          }}
        >
          Colorado-based. On-site service. Brick-and-mortar businesses only.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan }) {
  const isRecommended = !!plan.recommended;
  return (
    <div
      data-reveal
      className="lf-card relative overflow-hidden"
      style={{
        padding: 'clamp(32px, 4vw, 48px)',
        borderRadius: 24,
        borderColor: isRecommended
          ? 'var(--color-primary)'
          : 'var(--color-border)',
        background: isRecommended
          ? 'linear-gradient(180deg, rgba(153,187,234,0.10), rgba(0,0,0,0))'
          : 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0))',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {isRecommended && (
        <div
          aria-hidden
          className="absolute"
          style={{
            right: -100,
            top: -100,
            width: 280,
            height: 280,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(153,187,234,0.18), transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {plan.badge && (
        <div
          className="lf-eyebrow"
          style={{
            color: isRecommended
              ? 'var(--color-primary)'
              : 'var(--color-accent)',
            marginBottom: 10,
            position: 'relative',
          }}
        >
          {plan.badge}
        </div>
      )}

      <h3
        className="lf-h3"
        style={{
          marginBottom: 8,
          color: 'var(--color-on-dark)',
          position: 'relative',
        }}
      >
        {plan.name}
      </h3>

      <p
        style={{
          fontSize: 15,
          color: 'var(--color-on-dark-soft)',
          marginBottom: 24,
          lineHeight: 1.45,
          position: 'relative',
        }}
      >
        {plan.tagline}
      </p>

      <div
        className="flex items-baseline gap-2"
        style={{ marginBottom: 4, position: 'relative' }}
      >
        <Counter
          to={plan.price}
          prefix="$"
          duration={1.4}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(56px, 7vw, 88px)',
            lineHeight: 1,
            color: 'var(--color-on-dark)',
            letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
          }}
        />
        <span
          style={{
            fontSize: 18,
            color: 'var(--color-on-dark-soft)',
          }}
        >
          {plan.period}
        </span>
      </div>
      <div
        style={{
          fontSize: 14,
          color: 'var(--color-muted-soft)',
          marginBottom: 28,
          position: 'relative',
        }}
      >
        {plan.commitment}
      </div>

      <div
        aria-hidden
        style={{
          height: 1,
          background: 'var(--color-border)',
          opacity: 0.6,
          marginBottom: 24,
          position: 'relative',
        }}
      />

      <ul
        className="space-y-3"
        style={{ marginBottom: 32, position: 'relative', flexGrow: 1 }}
      >
        {plan.deliverables.map((d) => (
          <li
            key={d}
            className="flex items-start gap-3 text-[15px] md:text-[16px]"
            style={{ color: 'var(--color-on-dark)', lineHeight: 1.45 }}
          >
            <span
              aria-hidden
              style={{
                flexShrink: 0,
                marginTop: 9,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: isRecommended
                  ? 'var(--color-primary)'
                  : 'var(--color-on-dark-soft)',
              }}
            />
            <span>{d}</span>
          </li>
        ))}
      </ul>

      <div style={{ position: 'relative' }}>
        <a
          href="tel:3035240591"
          className={`lf-btn lf-btn--lg ${isRecommended ? 'lf-btn--primary' : 'lf-btn--ghost'}`}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Call Nicholas — 303-524-0591
        </a>
      </div>
    </div>
  );
}

const PHOTO_COLS = 'md:grid-cols-[1.5fr_1fr_1.1fr_1.1fr]';

function PriceCell({ tier, label, highlight }) {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 14,
        padding: '12px 16px',
        border: `1px solid ${highlight ? 'var(--color-primary)' : 'var(--color-border)'}`,
        background: highlight
          ? 'linear-gradient(180deg, rgba(153,187,234,0.10), rgba(0,0,0,0))'
          : 'rgba(255,255,255,0.02)',
      }}
    >
      {/* Column label — shown inline on mobile, lives in the header row on desktop */}
      <div
        className="md:hidden"
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: highlight ? 'var(--color-primary)' : 'var(--color-muted-soft)',
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 26,
          lineHeight: 1.1,
          color: 'var(--color-on-dark)',
          letterSpacing: '-0.01em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {tier.pkg}
      </div>
      <div style={{ fontSize: 13, color: 'var(--color-on-dark-soft)', marginTop: 2 }}>
        {tier.per}
      </div>
    </div>
  );
}

function PhotographyCard() {
  return (
    <div
      data-reveal
      className="lf-card relative overflow-hidden"
      style={{
        marginTop: 28,
        padding: 'clamp(28px, 4vw, 44px)',
        borderRadius: 24,
        borderColor: 'var(--color-border)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0))',
      }}
    >
      <div className="lf-eyebrow" style={{ color: 'var(--color-accent)', marginBottom: 10 }}>
        Add-on or standalone
      </div>
      <h3 className="lf-h3" style={{ marginBottom: 8, color: 'var(--color-on-dark)' }}>
        Menu &amp; Product Photography
      </h3>
      <p
        style={{
          fontSize: 15,
          color: 'var(--color-on-dark-soft)',
          maxWidth: 680,
          marginBottom: 28,
          lineHeight: 1.5,
        }}
      >
        Appetite-first photos of your food, drinks, and products — styled and
        shot on-site. Add it to your Visual Update visit at the lower rate
        (I&rsquo;m already there), or book it as a standalone shoot.
      </p>

      {/* Header row — desktop only */}
      <div
        className={`hidden md:grid ${PHOTO_COLS} gap-4`}
        style={{
          paddingBottom: 12,
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--color-muted-soft)',
        }}
      >
        <div>Shoot scope</div>
        <div>Delivered photos</div>
        <div style={{ color: 'var(--color-primary)' }}>With your Visual Update</div>
        <div>Standalone</div>
      </div>

      {PHOTO_TIERS.map((t) => (
        <div
          key={t.scope}
          className={`grid grid-cols-1 ${PHOTO_COLS} gap-3 md:gap-4 md:items-center`}
          style={{
            paddingTop: 18,
            paddingBottom: 18,
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div
            className="text-[17px] font-semibold"
            style={{ color: 'var(--color-on-dark)', letterSpacing: '-0.01em' }}
          >
            {t.scope}
          </div>
          <div style={{ fontSize: 15, color: 'var(--color-on-dark-soft)' }}>
            {t.photos}
          </div>
          <PriceCell tier={t.addon} label="With your Visual Update" highlight />
          <PriceCell tier={t.standalone} label="Standalone" />
        </div>
      ))}

      <p
        style={{
          fontSize: 13,
          color: 'var(--color-muted-soft)',
          marginTop: 22,
          lineHeight: 1.5,
        }}
      >
        Final photo count depends on menu size and setup. Every image is edited
        and delivered ready to post to your Google profile, website, and socials.
      </p>

      <div style={{ marginTop: 24 }}>
        <a
          href="tel:3035240591"
          className="lf-btn lf-btn--lg lf-btn--ghost"
          style={{ justifyContent: 'center' }}
        >
          Call Nicholas — 303-524-0591
        </a>
      </div>
    </div>
  );
}
