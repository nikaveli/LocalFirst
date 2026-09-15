import JsonLd from "@/components/JsonLd";
import { pageMetadata, pageSchema } from "@/lib/seo";
import ContactForm from "@/components/ContactForm";
import SubpageFooter from "@/components/SubpageFooter";
import SubpageHeader from "@/components/SubpageHeader";

export const metadata = pageMetadata("/contact");

export default function ContactPage() {
  return (
    <div className="lf-subpage">
      <JsonLd data={pageSchema("/contact")} />
      <SubpageHeader activePage="contact" />
      <main id="main-content" tabIndex={-1}>
        <section className="lf-sub-hero lf-contact-hero">
          <div className="lf-sub-shell lf-sub-hero__copy" data-motion-intro>
            <p className="lf-sub-eyebrow">Contact</p>
            <h1>Let&apos;s refresh <em>what customers see.</em></h1>
            <p>
              Call or text Nicholas about the $349 Google Business Profile Visual Refresh.
              Tell me what your business offers and what you want customers to see.
              Prefer email? The form below opens a draft you can review and send.
            </p>
            <div className="lf-sub-actions">
              <a className="lf-sub-button lf-sub-button--primary" href="sms:+13035240591?body=FIRST">Text Nicholas</a>
              <a className="lf-sub-button" href="tel:+13035240591">Call 303-524-0591</a>
            </div>
          </div>
        </section>

        <section className="lf-contact-main lf-sub-section">
          <div className="lf-sub-shell lf-contact-main__grid" data-motion-scene="up">
            <aside className="lf-contact-details" data-motion-group>
              <div>
                <p className="lf-sub-eyebrow">Phone</p>
                <a className="lf-contact-details__lead" href="tel:+13035240591">303-524-0591</a>
                <span>Call or text Nicholas directly.</span>
              </div>
              <div>
                <p className="lf-sub-eyebrow">Email</p>
                <a className="lf-contact-details__email" href="mailto:nick.molina@icloud.com">nick.molina@icloud.com</a>
              </div>
              <div>
                <p className="lf-sub-eyebrow">Service area</p>
                <span>Denver / Aurora metro on-site.<br />Front Range available by arrangement. Colorado only.</span>
              </div>
              <div>
                <p className="lf-sub-eyebrow">Hours</p>
                <span>Monday – Saturday<br />8 AM – 7 PM Mountain Time</span>
              </div>
              <blockquote>One visit. Fresh content. A stronger first impression.</blockquote>
            </aside>

            <div className="lf-contact-form-wrap" data-motion-from-right>
              <p className="lf-sub-eyebrow">Send a message</p>
              <h2>Tell me about <em>your business.</em></h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SubpageFooter />
    </div>
  );
}
