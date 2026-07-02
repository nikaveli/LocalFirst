'use client';

import { useReveal } from '../../components/useReveal';

export default function FIHero() {
  const ref = useReveal({ stagger: 0.1, y: 28 });

  return (
    <section
      ref={ref}
      className="lf-ambient relative overflow-hidden"
      style={{ paddingTop: 160, paddingBottom: 56 }}
    >
      <div className="lf-shell relative" style={{ maxWidth: 920, zIndex: 1 }}>
        <h1
          data-reveal
          className="lf-h1"
          style={{ marginBottom: 20, textTransform: 'uppercase' }}
        >
          First Impressions
        </h1>

        <h2
          data-reveal
          className="lf-h2"
          style={{ color: 'var(--color-primary)', marginBottom: 36 }}
        >
          Your Google Business Profile is where the final decision gets made.
        </h2>

        <div
          data-reveal
          className="lf-body"
          style={{ fontSize: 19, maxWidth: 720, lineHeight: 1.6 }}
        >
          <p style={{ marginBottom: 18 }}>
            It doesn&rsquo;t matter how a new customer first hears about your
            business. Maybe a friend recommended them, they drove past your
            storefront, social media, or they saw one of your ads. Before they
            actually reach out, almost all of them do the exact same thing:{' '}
            <strong style={{ color: 'var(--color-primary)' }}>
              They Look You Up On Google, See What You Offer, Menu, Location
              &amp; Reviews!
            </strong>
          </p>

          <p style={{ marginBottom: 18 }}>
            Your <strong>Google Profile</strong>{' '}listing isn&rsquo;t
            just another place to put your name, address and phone number.
            It is
            the final checkpoint every single customer passes through before
            deciding to spend money with you.
          </p>

          <p style={{ marginBottom: 6 }}>
            <strong>
              If your Profile doesn&rsquo;t look trustworthy, you lose the sale.
            </strong>
          </p>

          <p>
            <strong>It really is that simple.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
