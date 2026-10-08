import JsonLd from "@/components/JsonLd";
import SubpageHeader from "@/components/SubpageHeader";
import SubpageFooter from "@/components/SubpageFooter";
import { BubbleButton } from "@/components/RestaurantVisuals";
import PortfolioScrollVideo from "@/components/PortfolioScrollVideo";
import WebsiteHeroVideo from "@/components/WebsiteHeroVideo";
import { websiteInquiry, websitePortfolio } from "@/lib/website-portfolio";
import { pageMetadata, pageSchema } from "@/lib/seo";
import "./website-development.css";

export const metadata = pageMetadata("/website-development");

const services = [
  ["A message people understand.", "Make it clear what you do, who you help, and why someone should choose you. We start with your business—not a page full of buzzwords."],
  ["A design that feels like you.", "Your colors, your personality, and a layout built around your work. Photography, video, and purposeful motion give visitors something worth slowing down for."],
  ["A clear next step.", "A call, a text, a booking, or a quote request. We shape the page around the action that makes sense for your business, on a phone or a desktop."],
  ["The details behind the design.", "Responsive layouts, readable content, search-friendly page structure, and launch checks. A good first impression has to work as well as it looks."],
];

export default function WebsiteDevelopmentPage() {
  return <div className="lf-subpage wd-page">
    <JsonLd data={pageSchema("/website-development")} />
    <SubpageHeader activePage="website-development" />
    <main id="main-content" tabIndex={-1}>
      <section className="wd-hero" aria-labelledby="website-title">
        <div className="lf-sub-shell wd-hero-grid">
          <div className="wd-hero-copy">
            <p className="wd-eyebrow">LocalFirst / Website design & development</p>
            <h1 id="website-title">Website design &amp; development<br /><em>for Colorado businesses.</em></h1>
            <p>Your next customer is deciding before you ever meet. Give them a website that shows your work, explains your value, and makes getting in touch feel easy.</p>
            <div className="wd-actions"><BubbleButton href={websiteInquiry}>Text Nick about a website</BubbleButton><a href="#portfolio" data-underline-link="">Explore the work ↓</a></div>
          </div>
          <WebsiteHeroVideo />
        </div>
        <div className="lf-sub-shell wd-hero-foot"><span>Built around your business.</span><span>Designed for the person choosing it.</span></div>
      </section>

      <section className="wd-message wd-section" aria-labelledby="message-title">
        <div className="lf-sub-shell wd-message-grid" data-motion-scene="up">
          <div><p className="wd-eyebrow">A note from Nick</p><h2 id="message-title">You do the work.<br /><em>Let’s show people why it matters.</em></h2></div>
          <div className="wd-message-copy"><p>I started LocalFirst because good local businesses deserve to be seen. The same idea guides how I build websites: show what makes your business different, answer the questions people actually have, and give them a reason to reach out.</p><p>Maybe you’re starting fresh. Maybe your current site no longer looks like the business you’ve built. We’ll work together on a site that feels like you—not a template with your name dropped in.</p><p className="wd-signature">Nick Molina <span>Founder, LocalFirst</span></p></div>
        </div>
      </section>

      <section className="wd-services wd-section" aria-labelledby="services-title">
        <div className="lf-sub-shell">
          <header className="wd-section-heading" data-motion-scene="up"><p className="wd-eyebrow">The service</p><h2 id="services-title">More than a good-looking page.<br /><em>A better way to meet your customers.</em></h2></header>
          <div className="wd-services-grid">{services.map(([title, body]) => <article key={title} data-motion-card><h3>{title}</h3><p>{body}</p></article>)}</div>
          <div className="wd-content-note"><p><strong>Need the content, too?</strong> LocalFirst also offers on-site photography and video. We can plan the website and the visuals together so they tell the same story.</p><a href="/first-impressions" data-underline-link="">See the video work ↗</a></div>
        </div>
      </section>

      <section id="portfolio" className="wd-portfolio" aria-labelledby="portfolio-title">
        <header className="lf-sub-shell wd-portfolio-heading" data-motion-scene="up"><p className="wd-eyebrow">Website portfolio</p><h2 id="portfolio-title">Different businesses.<br /><em>Their own point of view.</em></h2><p>Explore five website walkthroughs. Scroll through each preview to see the design unfold, or use Play preview to watch it at its own pace.</p></header>
        {websitePortfolio.map((project, index) => <article className="wd-project" id={`project-${project.id}`} key={project.id} aria-labelledby={`${project.id}-title`}>
          <PortfolioScrollVideo id={project.id} name={project.name} next={index < websitePortfolio.length - 1 ? `#project-${websitePortfolio[index + 1].id}` : '#website-pricing'}>
          <header className="wd-project-heading">
            <div><p className="wd-eyebrow">{project.category}</p><h3 id={`${project.id}-title`}>{project.name}</h3><span className="wd-project-focus">{project.focus}</span><div className="wd-project-visit"><a href={project.url} target="_blank" rel="noopener noreferrer" data-underline-link="" aria-label={`Visit website — ${project.name} (opens in a new tab)`}>Visit website <span aria-hidden="true">↗</span></a></div></div>
            <div><h4>{project.title}</h4><p>{project.description}</p></div>
          </header>
          </PortfolioScrollVideo>
        </article>)}
      </section>

      <section id="website-pricing" className="wd-pricing wd-section" aria-labelledby="website-pricing-title">
        <div className="lf-sub-shell wd-pricing-grid" data-motion-scene="up">
          <div><p className="wd-eyebrow">Website pricing</p><h2 id="website-pricing-title">The right website starts<br /><em>with the right scope.</em></h2></div>
          <div><span className="wd-pricing-label">Packages coming soon</span><p>Website packages are being finalized. In the meantime, let’s talk about your business, the pages you need, and what you want customers to do.</p><p>We’ll discuss design, content, and any booking or contact features before putting a price to the project. You’ll know the scope and what’s included before we begin.</p><BubbleButton href={websiteInquiry}>Let’s talk about your site</BubbleButton></div>
        </div>
      </section>

      <section className="lf-sub-cta wd-close">
        <div className="lf-sub-shell" data-motion-scene="up"><p className="wd-eyebrow">No business left behind</p><h2>Your next customer<br />is taking a look.<br /><em>Give them a reason to stay.</em></h2><p>Tell me what you do and what your current website is missing. We’ll start there.</p><div className="lf-sub-actions"><BubbleButton href={websiteInquiry}>Text Nick</BubbleButton><a className="lf-sub-button" href="/contact">Prefer email? →</a></div></div>
      </section>
    </main>
    <SubpageFooter />
  </div>;
}
