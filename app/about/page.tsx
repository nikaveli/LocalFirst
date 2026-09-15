import JsonLd from "@/components/JsonLd";
import { pageMetadata, pageSchema } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import SubpageFooter from "@/components/SubpageFooter";
import SubpageHeader from "@/components/SubpageHeader";

export const metadata = pageMetadata("/about");

const credentials = [
  {
    eyebrow: "Google Local Guide",
    title: "Level 7",
    copy: "Firsthand experience contributing photos, reviews, and local information on Google. I bring that same attention to your business.",
  },
  {
    eyebrow: "BBB Accreditation",
    title: "A+ Rated",
    copy: "Better Business Bureau accredited with an A+ rating. A local business you can contact directly.",
  },
  {
    eyebrow: "Service Area",
    title: "Colorado Only",
    copy: "Denver / Aurora metro on-site. Front Range available by arrangement. Local service, here in Colorado.",
  },
  {
    eyebrow: "Approach",
    title: "On-site, Always",
    copy: "I visit your business to create current photos and video that show customers what you offer and what to expect.",
  },
];

export default function AboutPage() {
  return (
    <div className="lf-subpage">
      <JsonLd data={pageSchema("/about")} />
      <SubpageHeader activePage="about" />
      <main id="main-content" tabIndex={-1}>
        <section className="lf-sub-hero">
          <div className="lf-sub-shell lf-sub-hero__copy" data-motion-intro>
            <p className="lf-sub-eyebrow">About</p>
            <h1>Hi, I&apos;m <em>Nicholas.</em></h1>
            <p>
              I help Colorado businesses improve what customers see when they find them
              on Google. People are already looking for what you sell. I help you give
              them a reason to take the next step.
            </p>
          </div>
        </section>

        <section className="lf-about-story lf-sub-section">
          <div className="lf-sub-shell lf-about-story__grid">
            <figure className="lf-about-portrait" data-motion-media>
              <Image
                src="/media/nicholas.png"
                alt="Nicholas, founder of LocalFirst"
                width={1024}
                height={1536}
                sizes="(max-width: 760px) 100vw, 42vw"
                priority
              />
              <figcaption>Founder · LocalFirst</figcaption>
            </figure>

            <div className="lf-about-story__copy" data-motion-group>
              <p className="lf-sub-eyebrow">The story</p>
              <h2>Why I started <em>LocalFirst.</em></h2>
              <p>
                A good local business can offer exactly what someone needs and still leave
                them unsure online. Old photos or missing details can hide the business
                that is there today. That is the gap LocalFirst helps close.
              </p>
              <p>
                Owners are busy running their businesses. My job is to help the Google
                profile reflect the work they are already doing.
              </p>
              <p className="lf-about-story__promise">Show customers the business that exists today.</p>
              <p>
                I come directly to your business and create fresh professional photos and
                video. I show your products, services, space, and the details people want
                to see before they call, visit, book, or buy.
              </p>
              <p>
                I&apos;m a Level 7 Google Local Guide. Contributing photos, reviews, and local
                information has taught me to notice the details customers look for. That
                firsthand perspective shapes the work I do for your business.
              </p>
              <p>
                I work with Colorado businesses, on-site and one business at a time.
                That personal visit is how I help your online first impression match real life.
              </p>
              <blockquote>Help customers find your business. Trust your business. <em>Take the next step.</em></blockquote>
            </div>
          </div>
        </section>

        <section className="lf-about-credentials lf-sub-section">
          <div className="lf-sub-shell" data-motion-scene="up">
            <div>
              <p className="lf-sub-eyebrow">Credentials</p>
              <h2>A local person you can reach.</h2>
            </div>
            <div className="lf-about-credentials__grid">
              {credentials.map((credential) => (
                <article key={credential.title} data-motion-card>
                  <p>{credential.eyebrow}</p>
                  <h3>{credential.title}</h3>
                  <span>{credential.copy}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lf-about-colorado lf-sub-section">
          <div className="lf-sub-shell lf-about-colorado__grid" data-motion-scene="left">
            <div>
              <p className="lf-sub-eyebrow">Colorado</p>
              <h2>Why Colorado only.</h2>
            </div>
            <div>
              <p>
                I come to your business in the Denver and Aurora area.
                Front Range visits are available by arrangement.
              </p>
              <p>
                An on-site visit lets me see what a first-time customer would see: your
                storefront, your space, and the work you do. That context helps me show
                your business clearly in photos, video, and profile information.
              </p>
              <p className="lf-about-colorado__line">One visit. Fresh content. A stronger first impression.</p>
            </div>
          </div>
        </section>

        <section className="lf-sub-cta">
          <div className="lf-sub-shell" data-motion-scene="up">
            <h2>Ready to refresh <em>what customers see?</em></h2>
            <p>
              Call or text me about your business. The $349 Google Business Profile
              Visual Refresh is a clear place to start with professional photos, video,
              and a profile information check.
            </p>
            <div className="lf-sub-actions">
              <a className="lf-sub-button lf-sub-button--primary" href="tel:+13035240591">Call Nicholas</a>
              <Link className="lf-sub-button" href="/contact">Send a message →</Link>
            </div>
          </div>
        </section>
      </main>
      <SubpageFooter />
    </div>
  );
}
