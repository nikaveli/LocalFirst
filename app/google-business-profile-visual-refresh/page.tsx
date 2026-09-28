import Link from "@/components/SiteLink";
import JsonLd from "@/components/JsonLd";
import SubpageHeader from "@/components/SubpageHeader";
import SubpageFooter from "@/components/SubpageFooter";
import { pageMetadata, pageSchema } from "@/lib/seo";
import { BubbleButton, ImageZoom } from "@/components/RestaurantVisuals";
import "./refresh.css";

const path = "/google-business-profile-visual-refresh";
export const metadata = pageMetadata(path);

const includes = [
  ["Professional photos of your business", "Show customers your space, inside and out, with current professional photos."],
  ["Photos of your products, services, or work", "Give people a closer look at what you sell and the details that make your business worth choosing."],
  ["Short-form video content", "Help customers get a feel for your business before they call, visit, book, or buy."],
  ["Google Business Profile visual update", "Bring fresh visual content to the profile where people are already looking you up."],
  ["Profile information check", "Review the business information customers rely on, including hours, services, and location."],
  ["Recommendations for improving your profile", "Understand practical next steps for giving customers a clearer picture of your business."],
];
const questions = [
  ["What does the Visual Refresh include?", "The one-time package includes an on-site visit, professional business and product or service photos, short-form video, a Google Business Profile visual update, an information check, and recommendations for improving your profile."],
  ["Do you come to my business?", "Yes. I come directly to your business to create fresh photos and video of the products, services, space, and details customers want to see."],
  ["Where do you work?", "LocalFirst serves the Denver and Aurora metro area. Other Front Range visits are available by arrangement. Contact Nicholas with your location to confirm availability."],
  ["Is this a monthly service?", "The Visual Refresh is a one-time service. Monthly content and content-plus-profile-update plans are also available. See the homepage pricing section to compare all options."],
  ["Is this only for restaurants and med spas?", "The refresh is for local businesses that want customers to see what they offer. Restaurants, med spas, salons, shops, and service businesses can all benefit from a current, useful first impression. Tell Nicholas about your business so you can discuss what to capture."],
  ["Will this guarantee higher rankings or more customers?", "No ranking or customer outcome is guaranteed. The goal is to help people who find your business understand what you offer and feel more confident taking the next step."],
  ["How do I get started?", "Call or text Nicholas at 303-524-0591. Share your business name, location, and what you would like to refresh. You can discuss availability, timing, and the details of your visit before booking."],
];

export default function VisualRefreshPage() {
  return (
    <div className="lf-subpage lf-refresh-page">
      <JsonLd data={pageSchema(path)} />
      <SubpageHeader activePage="visual-refresh" />
      <main id="main-content" tabIndex={-1}>
        <section className="lf-sub-hero">
          <div className="lf-sub-shell lf-sub-hero__copy">
            <p className="lf-sub-eyebrow">On-site photography &amp; video · Denver &amp; Aurora</p>
            <h1>Google Business Profile <em>Visual Refresh.</em></h1>
            <p>Your business deserves to look as good on Google as it does in person. I come directly to your business and create fresh professional photos and video that help customers see what you offer.</p>
            <div className="lf-sub-actions">
              <BubbleButton href="sms:+13035240591?&body=FIRST">Text Nick about a shoot</BubbleButton>
              <a className="lf-sub-button" href="tel:+13035240591">Call 303-524-0591</a>
            </div>
          </div>
        </section>
        <section id="pricing" className="lf-refresh-section lf-pricing-directory" aria-labelledby="pricing-title">
          <div className="lf-sub-shell lf-refresh-copy" data-rh-reveal>
            <p className="lf-sub-eyebrow">One-time visits &amp; monthly content</p>
            <h2 id="pricing-title">All your options. One place.</h2>
            <p>Compare the Visual Refresh, Complete Profile Update, dedicated menu shoot, and monthly content plans in our homepage pricing section.</p>
            <div className="lf-sub-actions"><BubbleButton href="/#pricing">See all pricing</BubbleButton><Link href="/#monthly" className="lf-sub-button">Explore monthly plans →</Link></div>
          </div>
        </section>
        <section id="includes" className="lf-refresh-section">
          <div className="lf-sub-shell" data-rh-reveal>
            <p className="lf-sub-eyebrow">What’s included</p>
            <h2>Fresh content. A stronger first impression.</h2>
            <div className="lf-refresh-includes">
              {includes.map(([title, description], i) => (
                <article key={title}><span aria-hidden="true">0{i + 1}</span><h3>{title}</h3><p>{description}</p></article>
              ))}
            </div>
          </div>
        </section>
        <ImageZoom id="on-location" name="burger" alt="A freshly made burger and onion rings photographed on-site by LocalFirst" eyebrow="On location. On your profile." title={<>Show what makes<br /><em>you worth the visit.</em></>} after={<>A real look.<br />Before they arrive.</>} copy="Your food, your space, your business. Photos and video made on-site, ready for the places customers find you." />
        <section className="lf-refresh-section">
          <div className="lf-sub-shell lf-refresh-copy" data-rh-reveal>
            <p className="lf-sub-eyebrow">Local businesses. In person.</p>
            <h2>Show customers the business that exists today.</h2>
            <p>Before someone calls, visits, books, or buys, they look at your photos, reviews, hours, and services. Current photos can help them picture the meal, explore your space, or understand the work you do.</p>
            <p>I’m Nicholas Molina, founder of LocalFirst. I work on-site in the Denver and Aurora metro area. Front Range visits are available by arrangement.</p>
            <div className="lf-sub-actions">
              <Link className="lf-sub-button" href="/first-impressions">See local business videos →</Link>
              <Link className="lf-sub-button" href="/about">Meet Nicholas →</Link>
            </div>
          </div>
        </section>
        <section className="lf-refresh-section">
          <div className="lf-sub-shell lf-refresh-copy" data-rh-reveal>
            <p className="lf-sub-eyebrow">Before your visit</p>
            <h2>Questions about the refresh.</h2>
            <div className="lf-refresh-faq">
              {questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
            </div>
          </div>
        </section>
        <section className="lf-sub-cta">
          <div className="lf-sub-shell" data-rh-reveal>
            <h2>Give them a reason to <em>choose you.</em></h2>
            <p>Tell me what your business offers and what you want customers to see. We’ll talk through the right visit or monthly plan for you.</p>
            <div className="lf-sub-actions">
              <BubbleButton href="sms:+13035240591?&body=FIRST">Text Nick about a shoot</BubbleButton>
              <Link className="lf-sub-button" href="/#pricing">See pricing →</Link>
            </div>
          </div>
        </section>
      </main>
      <SubpageFooter />
    </div>
  );
}
