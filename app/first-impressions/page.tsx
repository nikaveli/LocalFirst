import JsonLd from "@/components/JsonLd";
import { pageMetadata, pageSchema } from "@/lib/seo";
import Link from "next/link";
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
            <h1>First Impressions</h1>
            <h2>Your Google Business Profile is where<br className="lf-first-break" /> the final decision gets made.</h2>
            <div className="lf-first-hero__copy">
              <p>
                A friend recommends you. Someone drives past your storefront or sees your work
                on social media. Their next stop may be Google, where they check your
                <strong> photos, services, menu, location, and reviews.</strong>
              </p>
              <p>
                Your <strong>Google Business Profile</strong>{" "}isn&apos;t just a place to put your
                address and phone number. It helps people decide whether your business is
                worth a visit before they ever walk through the door.
              </p>
              <p><strong>Give them a first impression that matches the work you do.</strong></p>
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
            <h2>Want your business in here <em>next?</em></h2>
            <p>
              I&apos;ll come to your Colorado business, capture the work, and give the people
              already looking a clearer reason to choose you.
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
