import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, Star } from "lucide-react";
import Link from "@/components/SiteLink";
import SubpageHeader from "@/components/SubpageHeader";
import SubpageFooter from "@/components/SubpageFooter";
import RestaurantHeroVideo from "@/components/RestaurantHeroVideo";
import { BubbleButton, FoodPhoto, ImageZoom } from "@/components/RestaurantVisuals";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, pageSchema } from "@/lib/seo";
import { photographyInquiry, photographyInquiryLabel } from "@/lib/photography-inquiry";

export const metadata = pageMetadata("/");
const textNick = photographyInquiry;
const trainingInquiry = `sms:+13035240591?&body=${encodeURIComponent("Hi Nick, I'm interested in the standalone Google Business Profile training at $497.")}`;
const packages = [
  { name: "Visual Refresh", price: "349", suffix: "one time", headline: "A fresh look at what’s cooking.", items: ["2–3-hour on-site shoot", "20 photos total, including 5 signature dish photos and 5 specials photos (drinks or daily specials)", "Short-form video content", "Google Business Profile visual update", "Profile information check & practical recommendations", "Delivery within one week of your shoot"], cta: "Ask about a refresh", message: "I'm interested in the Visual Refresh" },
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
          <h1 id="hero-title">Food photography<br /><em>in Denver &amp; Aurora.</em></h1>
          <p className="rh-hero-lede">People are searching. Show them why to choose you.</p>
          <p className="rh-hero-detail">I photograph your dishes, drinks, and space, create short videos, and update your Google Business Profile—so people looking you up can see what makes your restaurant worth a visit.</p>
          <div className="rh-actions"><BubbleButton href={textNick}>{photographyInquiryLabel}</BubbleButton><Link href="/#pricing" data-underline-link="">See photography packages <ArrowDown size={15} aria-hidden="true" /></Link></div>
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

      <section className="rh-google rh-pad" aria-labelledby="google-title">
        <div className="rh-shell">
          <header className="rh-section-heading" data-rh-reveal><div><p className="rh-eyebrow">Your business changes. Your profile should, too.</p><h2 id="google-title">Your Google profile isn’t<br /><em>set-and-forget.</em></h2></div><p>Setting it up was a start. But does it show the restaurant you run today? Before someone visits, they may be checking your photos, menu, reviews, and hours on Google Search or Maps. Give them more than an old listing to go on.</p></header>
          <div className="rh-steps">{[
            ["Show what you sell.", "Your signature dish. The drink people come back for. Help someone picture what they could order before they walk in."],
            ["Show what’s happening.", "A seasonal menu, a new special, a patio opening. Don’t leave your latest reasons to visit out of the picture."],
            ["Make the next step easy.", "Current hours, useful business details, and clear photos help people decide whether to call, get directions, or visit."],
          ].map(([title, copy]) => <article key={title} data-rh-reveal><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <ImageZoom id="work" name="tacos" alt="Tacos topped with herbs, onion, and sauce, photographed on-site by LocalFirst" eyebrow="Restaurant photography for your Google profile" title={<>They’re looking for a meal.<br /><em>Give them a reason to choose yours.</em></>} after={<>Before the first bite,<br />there’s a first impression.</>} copy="Can they see your signature dishes, your drinks, and what makes your restaurant different? Show people what you’re proud to serve while they’re deciding where to go." position="50% 58%" />

      <section className="rh-gallery rh-pad" aria-labelledby="gallery-title">
        <div className="rh-shell">
          <header className="rh-section-heading" data-rh-reveal><div><p className="rh-eyebrow">Restaurant photography &amp; video</p><h2 id="gallery-title">The food.<br /><em>The drinks. The reason to visit.</em></h2></div><p>A new special or a longtime favorite. A seasonal menu or a patio worth settling into. I create on-site photos and video for your Google profile, website, and social media—so what people see online reflects what you offer in person.</p></header>
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
            <header className="rh-monthly-heading" data-rh-reveal><h3 id="monthly-title" className="rh-pricing-group-title">Monthly</h3><p>Your restaurant doesn’t stand still. Keep creating new photos and video as dishes, drinks, and specials change. Choose content only, or add ongoing Google Business Profile updates.</p></header>
            <div className="rh-pricing-grid rh-pricing-grid--monthly">{monthlyPackages.map((offer, index) => <article className={`rh-price-card ${index === 1 ? "rh-price-card--featured" : ""}`} key={offer.name}>
              <p className="rh-eyebrow">{offer.name}</p><h4>{offer.headline}</h4><p className="rh-price"><span>$</span>{offer.price}</p><p className="rh-price-term">per month</p>
              <ul>{offer.items.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>
              <a className="rh-price-link" href={`sms:+13035240591?&body=${encodeURIComponent(offer.message)}`}>{offer.cta}<ArrowUpRight size={18} aria-hidden="true" /></a>
            </article>)}</div>
          </section>
          <section id="training" className="rh-training" aria-labelledby="training-title">
            <div className="rh-training-intro">
              <p className="rh-eyebrow">Prefer to do it yourself?</p>
              <h3 id="training-title">Google Business Profile training.</h3>
              <p>Learn to photograph what you offer and keep your Google profile current using your own phone. I’ll work beside you or a team member, at your business. No photography experience needed.</p>
              <p className="rh-training-price"><strong>$497</strong> <span>one time</span></p>
              <p className="rh-training-terms">No photography booking required.<br />No monthly subscription.</p>
              <a className="rh-price-link" href={trainingInquiry}>Ask Nick about training<ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
            <dl className="rh-training-includes">
              <div><dt>2 hours at your business</dt><dd>Practice taking photos with your phone, upload them, and create a Google post together. Learn to use AI for post drafts and review replies, then check the wording so it sounds like you.</dd></div>
              <div><dt>A guide to keep</dt><dd>Screenshots, AI prompts, and a weekly checklist to help you repeat what you’ve learned.</dd></div>
              <div><dt>A 1-hour follow-up</dt><dd>Review your progress, ask questions, and get help with anything that’s holding you up.</dd></div>
            </dl>
          </section>
        </div>
      </section>

      <section id="about" className="rh-founder rh-pad" aria-labelledby="founder-title">
        <div className="rh-shell rh-founder-grid">
          <figure className="rh-founder-photo"><div className="rh-founder-mask" data-parallax="trigger" data-parallax-start="3" data-parallax-end="-3" data-parallax-disable="mobileLandscape"><div data-parallax="target"><Image src="/media/restaurant-home/nick.webp" alt="Nick Molina, founder and photographer at LocalFirst" width={900} height={1350} sizes="(max-width: 767px) 90vw, 40vw" /></div></div><figcaption>Nick Molina <span>Your photographer. Your point of contact.</span></figcaption></figure>
          <div className="rh-founder-copy" data-rh-reveal><p className="rh-eyebrow">The person behind the camera</p><h2 id="founder-title">I’m Nick.<br /><em>I’ll see you there.</em></h2><p className="rh-founder-lead">I’m local, I show up in person, and I do the shooting myself.</p><p>You put real work into what you serve. I help people see it before they walk through your door—with photography, video, and a Google profile that reflects your restaurant today.</p><p>I work in Denver and Aurora. Other Front Range visits are available by arrangement.</p><Link href="/about" data-underline-link="">A little more about me <ArrowUpRight size={16} aria-hidden="true" /></Link><div className="rh-credentials"><span>Google Local Guide · Level 7</span><span>BBB A+ Accredited</span><span>Colorado-based</span></div></div>
        </div>
      </section>

      <section className="rh-close rh-pad" aria-labelledby="close-title"><div className="rh-shell" data-rh-reveal><p className="rh-eyebrow">Give your next customer a reason to choose you.</p><h2 id="close-title">Your food deserves<br /><em>photos that do it justice.</em></h2><p>Tell me about your dishes, drinks, and what you want to showcase. We’ll plan an on-site photo shoot, with images ready for your Google profile, website, and social media.</p><BubbleButton href={textNick}>{photographyInquiryLabel}</BubbleButton><a className="rh-close-phone" href="tel:+13035240591" data-underline-link="">Or call 303-524-0591</a></div></section>
    </main>

    <SubpageFooter />
  </div>;
}
