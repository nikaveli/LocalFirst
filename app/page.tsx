import {
  ArrowUpRight,
  Camera,
  Check,
  MapPinned,
  MessageCircleReply,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "@/components/SiteLink";
import MobileNavigation from "@/components/MobileNavigation";
import LocalFirstPortal from "@/components/LocalFirstPortal";
import ScrollcraftMount from "@/components/ScrollcraftMount";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata = pageMetadata("/");

const updateHref = "sms:+13035240591?&body=Update%20Now";

const googleReviews = [
  {
    name: "Daniel Trujillo",
    initial: "D",
    age: "10 months ago",
    quote:
      "I was extremely impressed with the 360 virtual tour that Local First created for my business. The tour looks professional and polished, and it instantly upgraded my Google Business Profile. The team was responsive and delivered the project quickly. I highly recommend Local First for anyone who wants high quality internet marketing services.",
  },
  {
    name: "Nicole",
    initial: "N",
    age: "A year ago",
    quote: "Left a 5-star rating.",
  },
  {
    name: "Alice P Ochoa",
    initial: "A",
    age: "A year ago",
    quote:
      "The LocalFirst team’s expertise in Google Business Profile optimization and Google My Business management enabled us to boost our online visibility and presence with effective local SEO strategies. I highly recommend this service to anyone who is looking to amp up their local business profile on Google.",
  },
  {
    name: "Yula Losasso",
    initial: "Y",
    age: "A year ago",
    quote: "Left a 5-star rating.",
  },
];

export default function Home() {
  return (
    <div className="lf-site" data-localfirst-scrollcraft>
      <JsonLd data={pageSchema("/")} />
      <div className="sc-grain" aria-hidden="true" />

      <header className="lf-site-bar">
        <Link className="lf-wordmark" href="/" aria-label="LocalFirst home">
          <Image
            src="/media/localfirst-logo-v3.webp"
            alt="LocalFirst"
            width={480}
            height={160}
            unoptimized
            sizes="(max-width: 380px) 92px, 154px"
            priority
          />
        </Link>
        <nav className="lf-site-nav" aria-label="Main navigation">
          <Link href="/google-business-profile-visual-refresh#pricing">Pricing</Link>
          <Link href="/google-business-profile-visual-refresh">Visual Refresh</Link>
          <Link href="/google-business-profile-resources">GBP Guides</Link>
          <Link href="/first-impressions">First Impressions</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <a className="lf-header-cta" href={updateHref}>
          Text Nicholas <ArrowUpRight aria-hidden="true" />
        </a>
        <MobileNavigation />
      </header>

      <div
        className="lf-film-sheet lf-film-sheet--restaurant-transition"
        data-lf-restaurant-sheet
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/frames/v3/restaurant/0000.webp" decoding="async" fetchPriority="low" alt="" />
        <video
          data-lf-scrub
          data-lf-src="/media/hq-v3/restaurant.mp4"
          data-lf-src-mobile="/media/restaurant-mobile.mp4"
          muted
          playsInline
          preload="none"
        />
        <div className="lf-film-shade lf-film-shade--left" />
      </div>

      <main id="main-content" tabIndex={-1}>
        <section
          className="lf-hero"
          data-sc-act="scrub"
          data-sc-span="2.35"
          data-sc-dwell="0.22"
          data-sc-drift="#2c2c2c"
          data-lf-hero-act
          aria-labelledby="hero-title"
        >
          <div className="sc-stage lf-hero-stage" data-sc-stage>
            <div className="lf-hero-media" data-lf-hero-media>
              {/* The poster must be the video's exact first painted frame. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="lf-hero-poster"
                src="/media/frames/v3/localfirst/0000.webp"
                fetchPriority="high"
                alt="A phone showing a local business Google profile outside the business"
              />
              <video
                className="lf-hero-video"
                data-sc-scrub
                data-sc-src="/media/hq-v3/localfirst.mp4"
                data-sc-src-mobile="/media/localfirst-mobile.mp4"
                muted
                playsInline
                preload="metadata"
                poster="/media/frames/v3/localfirst/0000.webp"
                aria-label="LocalFirst photography and video reel"
              />
            </div>
            <div className="lf-hero-scrim" data-lf-hero-scrim aria-hidden="true" />
            <div
              className="sc-copy sc-copy--lead lf-hero-copy"
              data-sc-cue="0 0.48 0 0.2"
            >
              <p className="lf-kicker">Google Business Profile visual refresh</p>
              <h1 id="hero-title">
                People are already searching{" "}
                <span>for what you sell.</span>
              </h1>
              <p className="lf-hero-lede">
                What do they see when they find your business?
              </p>
              <a className="lf-cta" href={updateHref} data-sc-magnet="0.2">
                Text Nicholas <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          id="work"
          className="lf-proof-act"
          data-sc-act="pin"
          data-sc-span="2.8"
          data-sc-drift="#2c2c2c"
          data-lf-proof-act
          aria-label="LocalFirst photography for restaurants and med spas"
        >
          <div className="sc-stage lf-film-stack-stage" data-sc-stage data-lf-proof-stage>
            <article className="lf-film-sheet lf-film-sheet--restaurant-fallback">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/frames/v3/restaurant/0000.webp"
                loading="lazy"
                decoding="async"
                alt="Restaurant exterior and food photography"
              />
              <div className="lf-film-shade lf-film-shade--left" aria-hidden="true" />
              <div className="lf-film-copy lf-film-copy--left">
                <p className="lf-kicker">Restaurants</p>
                <h2>Give them a reason to choose your table.</h2>
                <p>Show your food, your space, and what a visit feels like before they arrive.</p>
              </div>
            </article>

            <div
              className="lf-film-copy lf-film-copy--left lf-film-copy--restaurant-live"
              data-lf-restaurant-copy
            >
              <p className="lf-kicker">Restaurants</p>
              <h2>Give them a reason to choose your table.</h2>
              <p>Show your food, your space, and what a visit feels like before they arrive.</p>
            </div>

            <article className="lf-film-sheet lf-film-sheet--med-spa" data-lf-med-spa-sheet>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/frames/v3/med-spa/0000.webp"
                loading="lazy"
                decoding="async"
                alt="Med spa interior and treatment photography"
              />
              <video
                data-lf-scrub
                data-lf-src="/media/hq-v3/med-spa.mp4"
                data-lf-src-mobile="/media/med-spa-mobile.mp4"
                muted
                playsInline
                preload="none"
                aria-label="Med spa photography and video reel"
              />
              <div className="lf-film-shade lf-film-shade--right" aria-hidden="true" />
              <div className="lf-film-copy lf-film-copy--right" data-lf-med-spa-copy>
                <p className="lf-kicker">Med spas</p>
                <h2>Help them feel confident.</h2>
                <p>Show your space and services so people know what to expect.</p>
              </div>
            </article>

            <div className="lf-exposure-tabs" aria-hidden="true">
              <span data-lf-restaurant-tab>Restaurant</span>
              <span data-lf-med-spa-tab>Med spa</span>
            </div>

            <div className="lf-proof-lockup" data-lf-proof-lockup>
              <p>Show what you offer.</p>
              <h2>Make it easy to choose.</h2>
              <span>Help customers see the business that exists today.</span>
            </div>
          </div>
        </section>

        <section
          id="reviews"
          className="sc-section lf-reviews"
          data-sc-act="flow"
          data-sc-drift="#2c2c2c"
          data-motion-sheet="up"
          aria-labelledby="reviews-title"
        >
          <div className="lf-section-shell">
            <header className="lf-reviews-heading" data-motion-reveal>
              <p className="lf-kicker lf-kicker--gold">What businesses are saying</p>
              <h2 id="reviews-title">
                <span>5.0 stars</span> across 19 Google reviews.
              </h2>
              <p>Selected reviews from the LocalFirst Google profile.</p>
            </header>

            <div className="lf-review-grid">
              {googleReviews.map((review) => (
                <article className="lf-review-card" data-motion-card key={review.name}>
                  <div className="lf-review-card-top">
                    <span className="lf-review-stars" role="img" aria-label="5 out of 5 stars">
                      ★★★★★
                    </span>
                    <time>{review.age}</time>
                  </div>
                  <blockquote>“{review.quote}”</blockquote>
                  <footer>
                    <span className="lf-review-avatar" aria-hidden="true">
                      {review.initial}
                    </span>
                    <span>
                      <strong>{review.name}</strong>
                      <small>Verified Google review</small>
                    </span>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        <LocalFirstPortal updateHref={updateHref} />

        <section
          id="method"
          className="lf-method"
          data-sc-act="pan"
          data-sc-span="2.35"
          data-sc-drift="#806d61"
          data-lf-method-act
          aria-labelledby="method-title"
        >
          <div className="sc-stage lf-method-stage" tabIndex={0} role="region" aria-label="How LocalFirst helps" data-sc-stage>
            <div className="lf-method-rail" data-sc-pan="0.04">
              <article className="lf-method-panel lf-method-panel--lead" data-lf-method-panel>
                <div>
                  <p className="lf-kicker">How LocalFirst helps</p>
                  <h2 id="method-title">Find your business. Trust it. Take the next step.</h2>
                </div>
                <p className="lf-method-lede">
                  Your Google Business Profile helps people who already want what you sell
                  find your business, trust it, and feel confident taking the next step.
                </p>
              </article>

              <article className="lf-method-panel" data-lf-method-panel>
                <div className="lf-method-icon" aria-hidden="true"><Camera /></div>
                <div>
                  <p className="lf-kicker">Capture</p>
                  <h3>Show customers the business that exists today.</h3>
                </div>
                <p>
                  Professional photos and short-form video show your products, services,
                  space, and the details customers want to see.
                </p>
              </article>

              <article className="lf-method-panel lf-method-panel--brick" data-lf-method-panel>
                <div className="lf-method-icon" aria-hidden="true"><MapPinned /></div>
                <div>
                  <p className="lf-kicker lf-kicker--dark">Update</p>
                  <h3>Make what you offer clear at a glance.</h3>
                </div>
                <p>
                  Fresh visuals and a profile information check help customers understand
                  what you offer and know what to expect.
                </p>
              </article>

              <article className="lf-method-panel" data-lf-method-panel>
                <div className="lf-method-icon" aria-hidden="true"><RefreshCw /></div>
                <div>
                  <p className="lf-kicker">Review</p>
                  <h3>Know what could make your profile stronger.</h3>
                </div>
                <p>
                  I review what customers see and recommend practical improvements
                  that make your profile clearer and more useful.
                </p>
              </article>

              <article className="lf-method-panel lf-method-panel--finish" data-lf-method-panel>
                <ShieldCheck aria-hidden="true" />
                <div>
                  <p className="lf-kicker">On-site. Firsthand. Colorado only.</p>
                  <h3>Your business deserves to look as good on Google as it does in person.</h3>
                </div>
                <p>
                  Whether customers search or ask AI, give them a clear, current picture of what you offer.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="sc-section lf-founder"
          data-sc-act="flow"
          data-sc-drift="#2c2c2c"
          aria-labelledby="founder-title"
        >
          <div className="lf-section-shell lf-founder-grid">
            <figure className="lf-founder-portrait" data-motion-media>
              {/* The supplied reference contains the current founder portrait. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/nicholas-founder-source.png"
                alt="Nicholas Molina, founder of LocalFirst"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Founder · LocalFirst</figcaption>
            </figure>

            <div className="lf-founder-story" data-motion-group>
              <p className="lf-kicker lf-kicker--gold">Why I started LocalFirst</p>
              <h2 id="founder-title">
                “People are already looking for what you sell. I help make sure they see
                a business they can trust and feel confident choosing.”
              </h2>
              <p className="lf-founder-promise">Show customers the business that exists today.</p>
              <p className="lf-founder-mission">No Business Left Behind.</p>
              <p className="lf-founder-signature">
                Nicholas Molina <span>Founder · LocalFirst · Colorado</span>
              </p>

              <div className="lf-founder-credentials" aria-label="Nicholas Molina credentials">
                <span>Google Local Guide · Level 7</span>
                <span>Top 1% contributor</span>
                <span>BBB A+ accredited</span>
                <span>Colorado-based</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="offer"
          className="sc-section lf-offer"
          data-sc-act="flow"
          data-sc-drift="#2c2c2c"
          aria-labelledby="offer-title"
        >
          <div className="lf-section-shell lf-offer-grid">
            <div className="lf-offer-intro" data-motion-group>
              <p className="lf-kicker">One clear place to start</p>
              <h2>Help turn people searching into customers.</h2>
              <p>
                I come directly to your business and create fresh professional photos
                and video for your Google Business Profile.
              </p>
              <p className="lf-proof-note">On-site. Firsthand. Colorado only.</p>
            </div>

            <article className="lf-offer-plate" data-motion-from-right>
              <div className="lf-offer-heading">
                <p className="lf-kicker lf-kicker--dark">Google Business Profile Visual Refresh</p>
                <h2 id="offer-title">One visit. Fresh content. A stronger first impression.</h2>
                <div className="lf-price">
                  <span>$</span><strong>349</strong><small>one time</small>
                </div>
              </div>
              <ul>
                <li><Check aria-hidden="true" /> Professional photos of your business</li>
                <li><Camera aria-hidden="true" /> Photos of your products, services, or work</li>
                <li><Video aria-hidden="true" /> Short-form video content</li>
                <li><Sparkles aria-hidden="true" /> Google Business Profile visual update</li>
                <li><RefreshCw aria-hidden="true" /> Profile information check</li>
                <li><MessageCircleReply aria-hidden="true" /> Recommendations for improving your profile</li>
              </ul>
              <a className="lf-cta lf-cta--ink lf-offer-cta" href={updateHref}>
                Text Nicholas <ArrowUpRight aria-hidden="true" />
              </a>
              <p className="lf-offer-fineprint">
                <Link href="/google-business-profile-visual-refresh">Explore the $349 package and common questions →</Link>
              </p>
            </article>
          </div>
        </section>

        <section
          id="contact"
          className="lf-close"
          data-sc-act="pin"
          data-sc-span="1.1"
          data-sc-drift="#2c2c2c"
          aria-labelledby="close-title"
        >
          <div className="sc-stage lf-close-stage" data-sc-stage data-sc-spotlight>
            <div className="lf-close-inner">
              <p className="lf-kicker">No Business Left Behind</p>
              <h2 id="close-title" data-sc-cue="0.04 1 0 0" data-sc-kinetic="lines">
                Give them a reason to choose you.
              </h2>
              <p data-sc-cue="0.1 1 0.08 0">
                Call or text Nicholas. Help the next person searching feel confident saying, “This is the place.”
              </p>
              <a
                className="lf-cta"
                href={updateHref}
                data-sc-magnet="0.24"
                data-sc-cue="0.12 1 0.08 0"
              >
                Text Nicholas <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <footer className="lf-footer">
              <a href="mailto:nick.molina@icloud.com">nick.molina@icloud.com</a>
              <span>Denver · Aurora · Colorado</span>
              <span>© {new Date().getFullYear()} LocalFirst</span>
            </footer>
          </div>
        </section>
      </main>

      <ScrollcraftMount />
    </div>
  );
}
