import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, Star } from "lucide-react";
import Link from "@/components/SiteLink";
import SubpageHeader from "@/components/SubpageHeader";
import SubpageFooter from "@/components/SubpageFooter";
import RestaurantHeroVideo from "@/components/RestaurantHeroVideo";
import { BubbleButton, FoodPhoto, ImageZoom } from "@/components/RestaurantVisuals";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata = pageMetadata("/");
const textNick = "sms:+13035240591?&body=FIRST";
const packages = [
  { name: "Visual Refresh", price: "349", suffix: "one time", headline: "A fresh look at what’s cooking.", items: ["On-site business and food photography", "Short-form video content", "Google Business Profile visual update", "Profile information check", "Practical recommendations for your profile"], cta: "Ask about a refresh", message: "I'm interested in the Visual Refresh" },
  { name: "Complete Profile Update", price: "497", suffix: "one time", headline: "The photos. The details. The full profile.", items: ["Professional photos and short-form video", "Services, hours, categories & description updated", "Google Business Profile posts for 90 days", "360° virtual tour", "Replies to unanswered reviews from the previous 14 days"], cta: "Ask about an update", message: "I'm interested in the Complete Profile Update" },
  { name: "Product & Menu Item Photo Shoot", price: "750", suffix: "add-on with either service", headline: "Give your menu its own moment.", items: ["A dedicated on-site photo shoot", "Individual menu-item or product photography", "A consistent set of current images", "Deeper coverage beyond the profile shoot"], cta: "Plan a menu shoot", message: "I'm interested in a Product and Menu Item Photo Shoot" },
];
const monthlyPackages = [
  { name: "Monthly Content", price: "299", headline: "Keep something fresh on the menu.", items: ["8–10 new photos every month", "1 short video clip every month", "Showcase new dishes, drinks, and events"], cta: "Ask about monthly content", message: "I'm interested in Monthly Content at $299/month" },
  { name: "Monthly Content + Profile Updates", price: "497", headline: "Fresh content. A current Google profile.", items: ["8–10 new photos every month", "1 short video clip every month", "Showcase new dishes, drinks, and events", "Ongoing Google Business Profile updates"], cta: "Ask about content + profile updates", message: "I'm interested in Monthly Content + Google Business Profile Updates at $497/month" },
];

export default function Home() {
  return <div className="restaurant-home" data-restaurant-home>
    <JsonLd data={pageSchema("/")} />
    <SubpageHeader />

    <main id="main-content" tabIndex={-1}>
      <section className="rh-hero" aria-labelledby="hero-title">
        <RestaurantHeroVideo />
        <div className="rh-hero-shade" aria-hidden="true" />
        <div className="rh-hero-copy">
          <p className="rh-eyebrow"><span className="rh-dot" /> For local restaurants · Denver &amp; Aurora</p>
          <h1 id="hero-title">People are deciding<br className="rh-desktop-break" /> where to eat.<br /><em>Show them<br className="rh-mobile-break" /> what’s cooking.</em></h1>
          <p className="rh-hero-lede">Your signature dish. Today’s special. The drink everyone should try.</p>
          <p className="rh-hero-detail">I create photos and video at your restaurant, update your Google profile, and give you the files to share.</p>
          <div className="rh-actions"><BubbleButton href={textNick}>Text Nick about a shoot</BubbleButton><a href="#work" data-underline-link="">Explore the photography <ArrowDown size={15} aria-hidden="true" /></a></div>
        </div>
        <div className="rh-hero-bottom"><span>Real food. Local restaurants. Shot by Nick.</span><a href="#reviews" aria-label="Scroll to reviews"><ArrowDown size={20} /></a></div>
      </section>

      <section id="reviews" className="rh-reviews rh-pad" aria-labelledby="reviews-title">
        <div className="rh-shell rh-reviews-layout">
          <header><p className="rh-eyebrow">What businesses are saying</p><h2 id="reviews-title">Good work.<br /><em>In their words.</em></h2><p className="rh-review-source">Selected reviews from the LocalFirst Google profile.</p></header>
          <div className="rh-review-list">
            <article><div className="rh-stars" role="img" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} fill="currentColor" aria-hidden="true" />)}</div><blockquote>“The tour looks professional and polished, and it instantly upgraded my Google business profile. The team was responsive and delivered the project quickly.”</blockquote><p>Daniel Trujillo <span>Google review · excerpt</span></p></article>
            <article><div className="rh-stars" role="img" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} fill="currentColor" aria-hidden="true" />)}</div><blockquote>“I highly recommend this service to anyone who is looking to amp up their local business profile on Google.”</blockquote><p>Alice P Ochoa <span>Google review · excerpt</span></p></article>
          </div>
        </div>
      </section>

      <ImageZoom id="work" name="tacos" alt="Tacos topped with herbs, onion, and sauce, photographed on-site by LocalFirst" eyebrow="A little appetite goes a long way" title={<>Give them something<br /><em>to crave.</em></>} after={<>Before the first bite,<br />there’s a first impression.</>} copy="Make it a good one. Show people the food you’re proud to serve, while they’re still deciding where to go." position="50% 58%" />

      <section className="rh-gallery rh-pad" aria-labelledby="gallery-title">
        <div className="rh-shell">
          <header className="rh-section-heading" data-rh-reveal><div><p className="rh-eyebrow">From your kitchen. To their screen.</p><h2 id="gallery-title">The food.<br /><em>The drinks. The vibe.</em></h2></div><p>A new special or a longtime favorite. A seasonal menu or a patio worth settling into. If it’s part of your restaurant’s story, let’s show it.</p></header>
          <div className="rh-photo-grid">
            <figure className="rh-photo rh-photo--wide"><div className="rh-photo-mask" data-parallax="trigger" data-parallax-start="4" data-parallax-end="-4" data-parallax-disable="mobileLandscape"><div className="rh-photo-inner" data-parallax="target"><FoodPhoto name="burger" alt="Toasted burger with golden onion rings on red-and-white checkered paper" /></div></div><figcaption><span>The favorites</span><span>Worth coming back for</span></figcaption></figure>
            <figure className="rh-photo rh-photo--tall"><div className="rh-photo-mask" data-parallax="trigger" data-parallax-start="-4" data-parallax-end="4" data-parallax-disable="mobileLandscape"><div className="rh-photo-inner" data-parallax="target"><FoodPhoto name="steak" alt="Grilled steak with guacamole, lime, and fresh garnishes" position="50% 65%" /></div></div><figcaption><span>The details</span><span>Up close. On location.</span></figcaption></figure>
            <figure className="rh-photo rh-photo--small"><div className="rh-photo-mask" data-parallax="trigger" data-parallax-start="4" data-parallax-end="-4" data-parallax-disable="mobileLandscape"><div className="rh-photo-inner" data-parallax="target"><FoodPhoto name="dessert" alt="Layered dessert topped with cream and a strawberry" position="50% 74%" /></div></div><figcaption><span>The sweet finish</span><span>Save a little room</span></figcaption></figure>
            <figure className="rh-photo rh-photo--last"><div className="rh-photo-mask" data-parallax="trigger" data-parallax-start="-4" data-parallax-end="4" data-parallax-disable="mobileLandscape"><div className="rh-photo-inner" data-parallax="target"><FoodPhoto name="spread" alt="A plate of tacos, rice, beans, lime, and salsa photographed at a local restaurant" /></div></div><figcaption><span>The whole spread</span><span>Give them a reason to visit</span></figcaption></figure>
          </div>
          <div className="rh-gallery-foot"><p>Real restaurants. Real visits.<br />Photography by Nick, not a stock library.</p><Link href="/first-impressions" data-underline-link="">Watch my local business visits <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section id="how-it-works" className="rh-process rh-pad" aria-labelledby="process-title">
        <div className="rh-shell"><header className="rh-section-heading" data-rh-reveal><div><p className="rh-eyebrow">You run the restaurant. I’ll bring the camera.</p><h2 id="process-title">From the kitchen<br /><em>to your customers.</em></h2></div><p>No agency handoff. You talk to the person who shows up and does the shooting.</p></header>
          <div className="rh-steps">{[
            ["01", "You tell me.", "What’s new? What’s a favorite? Tell me what you want people to see, and we’ll plan the visit around your restaurant."],
            ["02", "I come to you.", "I photograph and film on-site: the dishes, the details, and the space that make your place yours."],
            ["03", "Ready to share.", "I upload the finished visuals to your Google profile and send you the files for your website and social media."],
          ].map(([number, title, copy]) => <article key={number} data-rh-reveal><span className="rh-step-number">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <ImageZoom id="signature" name="shrimp" alt="Close-up of seasoned shrimp over a colorful restaurant dish" eyebrow="Make the next visit start here" title={<>Your next customer<br /><em>hasn’t tasted it yet.</em></>} after={<>Let the photos<br />make the introduction.</>} copy="Fresh visuals for your Google profile, website, and social feed. One visit. Content you can put to work." dark />

      <section id="pricing" className="rh-pricing rh-pad" aria-labelledby="pricing-title">
        <div className="rh-shell"><header className="rh-section-heading" data-rh-reveal><div><p className="rh-eyebrow">Clear pricing. On-site service.</p><h2 id="pricing-title">Choose your<br /><em>next step.</em></h2></div><p>Start with a one-time refresh or keep your restaurant looking current with fresh content every month.</p></header>
          <h3 className="rh-pricing-group-title">One-time</h3>
          <div className="rh-pricing-grid">{packages.map((offer, index) => <article className={`rh-price-card ${index === 1 ? "rh-price-card--featured" : ""}`} key={offer.name}>
            <p className="rh-eyebrow">{offer.name}</p><h4>{offer.headline}</h4><p className="rh-price"><span>$</span>{offer.price}</p><p className="rh-price-term">{offer.suffix}</p>
            {index === 2 && <p className="rh-standalone">Booked on its own <strong>$1,200</strong></p>}
            <ul>{offer.items.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>
            <a className="rh-price-link" href={`sms:+13035240591?&body=${encodeURIComponent(offer.message)}`}>{offer.cta}<ArrowUpRight size={18} aria-hidden="true" /></a>
          </article>)}</div>
          <p className="rh-pricing-note">The $750 menu and product shoot is an add-on to the $349 Visual Refresh or $497 Complete Profile Update. Standalone price: $1,200.</p>
          <Link href="/google-business-profile-visual-refresh#includes" data-underline-link="">See full service details <ArrowUpRight size={16} aria-hidden="true" /></Link>
          <section id="monthly" className="rh-monthly" aria-labelledby="monthly-title">
            <header className="rh-monthly-heading" data-rh-reveal><h3 id="monthly-title" className="rh-pricing-group-title">Monthly</h3><p>New dishes. Seasonal drinks. Another reason to visit. Keep showing people what’s happening at your restaurant.</p></header>
            <div className="rh-pricing-grid rh-pricing-grid--monthly">{monthlyPackages.map((offer, index) => <article className={`rh-price-card ${index === 1 ? "rh-price-card--featured" : ""}`} key={offer.name}>
              <p className="rh-eyebrow">{offer.name}</p><h4>{offer.headline}</h4><p className="rh-price"><span>$</span>{offer.price}</p><p className="rh-price-term">per month</p>
              <ul>{offer.items.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>
              <a className="rh-price-link" href={`sms:+13035240591?&body=${encodeURIComponent(offer.message)}`}>{offer.cta}<ArrowUpRight size={18} aria-hidden="true" /></a>
            </article>)}</div>
          </section>
        </div>
      </section>

      <section id="about" className="rh-founder rh-pad" aria-labelledby="founder-title">
        <div className="rh-shell rh-founder-grid">
          <figure className="rh-founder-photo"><div className="rh-founder-mask" data-parallax="trigger" data-parallax-start="3" data-parallax-end="-3" data-parallax-disable="mobileLandscape"><div data-parallax="target"><Image src="/media/restaurant-home/nick.webp" alt="Nick Molina, founder and photographer at LocalFirst" width={900} height={1350} sizes="(max-width: 767px) 90vw, 40vw" /></div></div><figcaption>Nick Molina <span>Your photographer. Your point of contact.</span></figcaption></figure>
          <div className="rh-founder-copy" data-rh-reveal><p className="rh-eyebrow">The person behind the camera</p><h2 id="founder-title">I’m Nick.<br /><em>I’ll see you there.</em></h2><p className="rh-founder-lead">I’m local, I show up in person, and I do the shooting myself.</p><p>You put real work into what you serve. I help people see it before they walk through your door—with photography, video, and a Google profile that reflects your restaurant today.</p><p>I work in Denver and Aurora. Other Front Range visits are available by arrangement.</p><Link href="/about" data-underline-link="">A little more about me <ArrowUpRight size={16} aria-hidden="true" /></Link><div className="rh-credentials"><span>Google Local Guide · Level 7</span><span>BBB A+ Accredited</span><span>Colorado-based</span></div></div>
        </div>
      </section>

      <section className="rh-close rh-pad" aria-labelledby="close-title"><div className="rh-shell" data-rh-reveal><p className="rh-eyebrow">Something good is happening at your restaurant.</p><h2 id="close-title">Let’s show off<br /><em>what’s new.</em></h2><p>A dish. A special. A whole new menu.<br />Tell me what you have in mind.</p><BubbleButton href={textNick}>Text Nick about a shoot</BubbleButton><a className="rh-close-phone" href="tel:+13035240591" data-underline-link="">Or call 303-524-0591</a></div></section>
    </main>

    <SubpageFooter />
  </div>;
}
