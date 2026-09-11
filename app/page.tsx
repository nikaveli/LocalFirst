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
            src="/media/localfirst-logo-primary.png"
            alt="LocalFirst"
            width={2172}
            height={724}
            sizes="(max-width: 380px) 92px, 154px"
            priority
          />
        </Link>
        <nav className="lf-site-nav" aria-label="Main navigation">
          <Link href="/first-impressions">First Impressions</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <a className="lf-header-cta" href={updateHref}>
          Update Now <ArrowUpRight aria-hidden="true" />
        </a>
        <MobileNavigation />
      </header>

      <div
        className="lf-film-sheet lf-film-sheet--restaurant-transition"
        data-lf-restaurant-sheet
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/restaurant-poster.jpg" alt="" />
        <video
          data-lf-scrub
          data-lf-src="/media/restaurant.mp4"
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
                src="/media/localfirst-poster.jpg"
                fetchPriority="high"
                alt="A phone showing a local business Google profile outside the business"
              />
              <video
                className="lf-hero-video"
                data-sc-scrub
                data-sc-src="/media/localfirst.mp4"
                data-sc-src-mobile="/media/localfirst-mobile.mp4"
                muted
                playsInline
                preload="metadata"
                poster="/media/localfirst-poster.jpg"
                aria-label="LocalFirst photography and video reel"
              />
            </div>
            <div className="lf-hero-scrim" data-lf-hero-scrim aria-hidden="true" />
            <div
              className="sc-copy sc-copy--lead lf-hero-copy"
              data-sc-cue="0 0.48 0 0.2"
            >
              <p className="lf-kicker">Colorado&apos;s on-site visibility partner</p>
              <h1 id="hero-title">
                Your next customer decides{" "}
                <span>before they walk in.</span>
              </h1>
              <p className="lf-hero-lede">
                I make your Google profile look like the business you actually run.
              </p>
              <a className="lf-cta" href={updateHref} data-sc-magnet="0.2">
                Update Now <ArrowUpRight aria-hidden="true" />
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
                src="/media/restaurant-poster.jpg"
                alt="Restaurant exterior and food photography"
              />
              <div className="lf-film-shade lf-film-shade--left" aria-hidden="true" />
              <div className="lf-film-copy lf-film-copy--left">
                <p className="lf-kicker">Restaurants</p>
                <h2>Make them hungry before they arrive.</h2>
                <p>Fresh photography turns one search into a reason to choose your table.</p>
              </div>
            </article>

            <div
              className="lf-film-copy lf-film-copy--left lf-film-copy--restaurant-live"
              data-lf-restaurant-copy
            >
              <p className="lf-kicker">Restaurants</p>
              <h2>Make them hungry before they arrive.</h2>
              <p>Fresh photography turns one search into a reason to choose your table.</p>
            </div>

            <article className="lf-film-sheet lf-film-sheet--med-spa" data-lf-med-spa-sheet>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/med-spa-poster.jpg"
                alt="Med spa interior and treatment photography"
              />
              <video
                data-lf-scrub
                data-lf-src="/media/med-spa.mp4"
                data-lf-src-mobile="/media/med-spa-mobile.mp4"
                muted
                playsInline
                preload="none"
                aria-label="Med spa photography and video reel"
              />
              <div className="lf-film-shade lf-film-shade--right" aria-hidden="true" />
              <div className="lf-film-copy lf-film-copy--right" data-lf-med-spa-copy>
                <p className="lf-kicker">Med spas</p>
                <h2>Make trust visible.</h2>
                <p>Precise, polished visuals let the quality of your care show up first.</p>
              </div>
            </article>

            <div className="lf-exposure-tabs" aria-hidden="true">
              <span data-lf-restaurant-tab>Restaurant</span>
              <span data-lf-med-spa-tab>Med spa</span>
            </div>

            <div className="lf-proof-lockup" data-lf-proof-lockup>
              <p>Shot here.</p>
              <h2>Built to be chosen.</h2>
              <span>Real businesses. Real visits. No stock. No filler.</span>
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
          <div className="sc-stage lf-method-stage" data-sc-stage>
            <div className="lf-method-rail" data-sc-pan="0.04">
              <article className="lf-method-panel lf-method-panel--lead" data-lf-method-panel>
                <div>
                  <p className="lf-kicker">The Local First Method</p>
                  <h2 id="method-title">Good visibility starts with ground truth.</h2>
                </div>
                <p className="lf-method-lede">
                  I show up, see the business for myself, and build your profile from what
                  customers can actually experience.
                </p>
              </article>

              <article className="lf-method-panel" data-lf-method-panel>
                <div className="lf-method-icon" aria-hidden="true"><Camera /></div>
                <div>
                  <p className="lf-kicker">Capture</p>
                  <h3>Make the real place look unmistakably worth visiting.</h3>
                </div>
                <p>
                  On-site photography, short-form video, and 360 imagery made for Google,
                  not pulled from a stock library.
                </p>
              </article>

              <article className="lf-method-panel lf-method-panel--brick" data-lf-method-panel>
                <div className="lf-method-icon" aria-hidden="true"><MapPinned /></div>
                <div>
                  <p className="lf-kicker lf-kicker--dark">Build</p>
                  <h3>Turn what I learn on site into useful answers.</h3>
                </div>
                <p>
                  Services, attributes, descriptions, and customer questions are shaped by
                  the business in front of me.
                </p>
              </article>

              <article className="lf-method-panel" data-lf-method-panel>
                <div className="lf-method-icon" aria-hidden="true"><RefreshCw /></div>
                <div>
                  <p className="lf-kicker">Maintain</p>
                  <h3>Keep the profile active after the photo day ends.</h3>
                </div>
                <p>
                  New posts, current visuals, and human review replies keep your first
                  impression from drifting back into neglect.
                </p>
              </article>

              <article className="lf-method-panel lf-method-panel--finish" data-lf-method-panel>
                <ShieldCheck aria-hidden="true" />
                <div>
                  <p className="lf-kicker">On-site. Firsthand. Colorado only.</p>
                  <h3>Your business is not content. It is a place people depend on.</h3>
                </div>
                <p>
                  That is why the work starts with a visit and stays grounded in what is true.
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
                “I started LocalFirst because I watched good local businesses close. Not
                because they were bad at what they do, but because they were invisible
                online.”
              </h2>
              <p className="lf-founder-promise">That&apos;s not going to happen on my watch.</p>
              <p className="lf-founder-mission">No business left behind.</p>
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
              <h2>Start where customers decide.</h2>
              <p>
                I come to your business, capture what is true today, and turn it into a
                Google profile people can trust before they arrive.
              </p>
              <p className="lf-proof-note">On-site. Firsthand. Colorado only.</p>
            </div>

            <article className="lf-offer-plate" data-motion-from-right>
              <div className="lf-offer-heading">
                <p className="lf-kicker lf-kicker--dark">Start with the Visual Update</p>
                <h2 id="offer-title">Give your profile a first impression that matches the work.</h2>
                <div className="lf-price">
                  <span>$</span><strong>497</strong><small>one time</small>
                </div>
              </div>
              <ul>
                <li><Check aria-hidden="true" /> Full Google Business Profile update</li>
                <li><Camera aria-hidden="true" /> Professional on-site photography</li>
                <li><Video aria-hidden="true" /> Google-ready short video</li>
                <li><Sparkles aria-hidden="true" /> 360 virtual tour imagery</li>
                <li><RefreshCw aria-hidden="true" /> Fresh profile posts</li>
                <li><MessageCircleReply aria-hidden="true" /> Replies to recent reviews</li>
              </ul>
              <a className="lf-cta lf-cta--ink lf-offer-cta" href={updateHref}>
                Update Now <ArrowUpRight aria-hidden="true" />
              </a>
              <p className="lf-offer-fineprint">
                No lock-in. No agency maze. Just the clearest place to start.
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
                The next person searching should see your best first impression.
              </h2>
              <p data-sc-cue="0.1 1 0.08 0">
                Text me to get started with photography, video, or a Google Business Profile update.
              </p>
              <a
                className="lf-cta"
                href={updateHref}
                data-sc-magnet="0.24"
                data-sc-cue="0.12 1 0.08 0"
              >
                Update Now <ArrowUpRight aria-hidden="true" />
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
