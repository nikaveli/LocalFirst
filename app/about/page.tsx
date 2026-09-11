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
    copy: "Better Business Bureau accredited with an A+ rating. Receipts, not claims.",
  },
  {
    eyebrow: "Service Area",
    title: "Colorado Only",
    copy: "Denver / Aurora metro on-site. Front Range available by arrangement. Local service, here in Colorado.",
  },
  {
    eyebrow: "Approach",
    title: "On-site, Always",
    copy: "Your photography and video start with a visit to your business. Profile updates are grounded in what I see there. No stock. No filler.",
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
              I started LocalFirst with one mission: no business left behind. I show up in
              person, camera in hand and boots on the sidewalk, to keep Colorado&apos;s small
              businesses visible in the AI search era.
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
                I watched good local businesses close, not because they were bad at what they
                do, but because they were invisible online. A bakery I&apos;d been going to for years.
                A barber who knew everyone&apos;s name. A mechanic who saved my truck more than once.
                Gone, one after another.
              </p>
              <p>
                They were great at their craft. They were terrible at fighting the algorithm.
                And nobody was helping them.
              </p>
              <p className="lf-about-story__promise">That&apos;s not going to happen on my watch.</p>
              <p>
                LocalFirst is the company I wish those businesses had access to. I show up in
                person. I take real photos. I shoot real video. I answer the questions AI is asking
                about your business, on the ground, with my own two feet.
              </p>
              <p>
                I&apos;m a Level 7 Google Local Guide. Contributing photos, reviews, and local
                information has taught me to notice the details customers look for. That
                firsthand perspective shapes the work I do for your business.
              </p>
              <p>
                I only work with Colorado businesses. I only work on-site. And I only take on what
                I can actually handle, one business at a time.
              </p>
              <blockquote>No stock. No filler. No hype. <em>The brand is earned, not announced.</em></blockquote>
            </div>
          </div>
        </section>

        <section className="lf-about-credentials lf-sub-section">
          <div className="lf-sub-shell" data-motion-scene="up">
            <div>
              <p className="lf-sub-eyebrow">Credentials</p>
              <h2>The receipts.</h2>
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
                Local means local. If I can&apos;t drive to you, I can&apos;t help you the way I want to.
                So I keep it tight: Denver, Aurora, and the Front Range.
              </p>
              <p>
                That means I know the neighborhoods. I know the cross-streets. I know which block
                of Colfax is busy at 9am and which one is dead. That context shows up in your photos,
                your videos, and the way I answer questions about your business on Google.
              </p>
              <p className="lf-about-colorado__line">Tight service area. Real visits. Real proof. That&apos;s the deal.</p>
            </div>
          </div>
        </section>

        <section className="lf-sub-cta">
          <div className="lf-sub-shell" data-motion-scene="up">
            <h2>Want to work <em>together?</em></h2>
            <p>
              Best way is the simplest way: call me. We&apos;ll talk about your business for ten
              minutes. If it&apos;s a fit, great. If not, I&apos;ll tell you that too.
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
