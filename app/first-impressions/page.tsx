import JsonLd from "@/components/JsonLd";
import { pageMetadata, pageSchema } from "@/lib/seo";
import Link from "@/components/SiteLink";
import FirstImpressionsGrid, { type Visit } from "@/components/FirstImpressionsGrid";
import SubpageFooter from "@/components/SubpageFooter";
import SubpageHeader from "@/components/SubpageHeader";

export const metadata = pageMetadata("/first-impressions");

const visits: Visit[] = [
  { business: "Sheesh Salon", city: "Denver, CO", slug: "sheesh-salon" },
  { business: "Conrad’s Hot Dog Company", city: "Denver, CO", slug: "conrads-hot-dog-company" },
  { business: "Cafe Chubascos", city: "Aurora, CO", slug: "cafe-chubascos" },
  { business: "Onyx Wax and Skin", city: "Denver, CO", slug: "onyx-wax-and-skin" },
  { business: "Mile High Pupusas", city: "Denver, CO", slug: "mile-high-pupusas" },
  { business: "Cornejo Jewelers", city: "Aurora, CO", slug: "cornejo-jewelers" },
  { business: "Amazon Fresh", city: "Aurora, CO", slug: "amazon-fresh" },
  { business: "Blaze Smoke & Vape Shop", city: "Denver, CO", slug: "blaze-smoke-vape" },
  { business: "EZ Auto Clinic", city: "Aurora, CO", slug: "ez-auto-clinic" },
  { business: "Goyos Grill", city: "Denver, CO", slug: "goyos-grill" },
  { business: "Just My Imagination Tattoo Studio", city: "Denver, CO", slug: "just-my-imagination-tattoo" },
  { business: "Kristy Michelle Aesthetics", city: "Denver, CO", slug: "kristy-michelle-aesthetics" },
  { business: "La Vecindad De La Chilanga", city: "Aurora, CO", slug: "la-vecindad" },
  { business: "Tacos Don Jose’s", city: "Aurora, CO", slug: "tacos-don-joses" },
  { business: "Tacos y Tortas El Mollo y Rifle", city: "Aurora, CO", slug: "tacos-mollo-rifle" },
];

export default function FirstImpressionsPage() {
  return (
    <div className="lf-subpage">
      <JsonLd data={pageSchema("/first-impressions")} />
      <SubpageHeader activePage="first-impressions" />
      <main id="main-content" tabIndex={-1}>
        <section className="lf-first-hero">
          <div className="lf-sub-shell" data-motion-intro>
            <h1>First Impressions: Denver &amp; Aurora Business Videos</h1>
            <h2>Show customers the business<br className="lf-first-break" /> that exists today.</h2>
            <div className="lf-first-hero__copy">
              <p>
                People are already searching for what you sell. Before they call, visit,
                book, or buy, they look at your
                <strong> photos, reviews, hours, and services.</strong>
              </p>
              <p>
                Your <strong>Google Business Profile</strong>{" "}is there to help people who are
                already looking for what you sell find your business, trust your business,
                and take the next step toward becoming a customer.
              </p>
              <p><strong>Give them a clear, current picture of what your business offers.</strong></p>
            </div>
          </div>
        </section>

        <section className="lf-first-gallery" data-motion-scene="up">
          <div className="lf-sub-shell">
            <h2 className="lf-first-gallery__label" data-motion-reveal>15 local visits · real business videos</h2>
            <FirstImpressionsGrid visits={visits} />
          </div>
        </section>

        <section className="lf-sub-cta lf-first-cta">
          <div className="lf-sub-shell" data-motion-scene="right">
            <h2>Give customers a reason to <em>choose you.</em></h2>
            <p>
              The $349 Google Business Profile Visual Refresh includes an on-site visit,
              professional photos, short-form video, and a clearer first impression.
              Call or text Nicholas to talk about your business.
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
