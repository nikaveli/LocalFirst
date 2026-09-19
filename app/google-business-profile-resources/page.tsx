import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BedDouble,
  BookOpenText,
  Check,
  Compass,
  ExternalLink,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import Link from "@/components/SiteLink";
import SubpageFooter from "@/components/SubpageFooter";
import SubpageHeader from "@/components/SubpageHeader";
import { pageMetadata, pageSchema, siteUrl } from "@/lib/seo";
import "./resources.css";

const path = "/google-business-profile-resources";
export const metadata = pageMetadata(path);

type ResourceGuide = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  details: string;
  points: string[];
  href: string;
  icon: LucideIcon;
};

const resourceGuides: ResourceGuide[] = [
  {
    id: "restaurants-cafes",
    eyebrow: "Food & drink businesses",
    title: "Restaurants & Cafés",
    summary: "Help diners understand the menu, atmosphere, and experience before they choose where to eat.",
    details:
      "Google’s restaurant playbook focuses on complete business information and the decision-making details diners look for: current menus, accurate hours, useful photos and videos, ordering or reservation links, posts, and review responses.",
    points: ["Keep menu items, prices, and links current", "Show the food, space, and dining experience", "Make ordering, booking, and contacting you easy"],
    href: "https://uploads.brandlive.com/31401884-a1ae-4051-8ab4-ad57de7e0081/1772576968734/_1-Restaurant_GBP_Best_Practices_Playbook_2026_%282%29.pdf",
    icon: UtensilsCrossed,
  },
  {
    id: "hotels-accommodations",
    eyebrow: "Hospitality businesses",
    title: "Hotels & Accommodations",
    summary: "Give travelers a clear, current view of the property, amenities, availability, and ways to book.",
    details:
      "Google’s hotel playbook covers accurate lodging information, hotel highlights, photos and videos, connected on-property businesses, posts, social and chat links, free booking links, and review management.",
    points: ["Keep amenities and property details accurate", "Show room types, shared spaces, and key features", "Connect booking options and on-property businesses"],
    href: "https://services.google.com/fh/files/helpcenter/1_hotels_gbp_best_practices_playbook_2026.pdf",
    icon: BedDouble,
  },
  {
    id: "tours-activities",
    eyebrow: "Visitor experience businesses",
    title: "Tour & Activity Operators",
    summary: "Help visitors understand what the experience includes, when it is available, and how to take the next step.",
    details:
      "Google’s tours and attractions playbook emphasizes accurate information, activity and ticket details, service areas, attributes, photos and videos, timely posts, chat options, and thoughtful responses to reviews.",
    points: ["Keep activity, ticket, and schedule details current", "Use visuals to make the experience easy to picture", "Clarify where you operate and how customers book"],
    href: "https://services.google.com/fh/files/helpcenter/1_tours_attractions_gbp_best_practices_playbook_2026.pdf",
    icon: Compass,
  },
  {
    id: "service-businesses",
    eyebrow: "Local service providers",
    title: "Service-Based Businesses",
    summary: "Show customers what you do, where you work, and why they can feel confident contacting you.",
    details:
      "Google’s service-business playbook covers categories, descriptions, hours, service areas, offerings, photos and videos, posts, social and chat links, and review management for businesses that serve customers on-site or at their location.",
    points: ["Choose accurate categories and describe your services", "Define a realistic service area", "Show your work and make contact options obvious"],
    href: "https://services.google.com/fh/files/helpcenter/1_services_gbp_best_practices_playbook_2026.pdf",
    icon: Wrench,
  },
];

const sharedChecklist = [
  "Business name, category, description, hours, phone, and website are accurate",
  "Products, services, menus, activities, or amenities are complete and current",
  "Recent photos and videos show what customers can expect",
  "Booking, ordering, ticketing, messaging, or contact options work",
  "New reviews receive helpful, professional responses",
  "Posts share timely updates, offers, events, or useful information",
];

const resourceListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Google Business Profile industry playbooks",
  url: `${siteUrl}${path}`,
  numberOfItems: resourceGuides.length,
  itemListElement: resourceGuides.map((guide, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "DigitalDocument",
      name: `${guide.title} Google Business Profile Best Practices Playbook 2026`,
      url: guide.href,
      publisher: { "@type": "Organization", name: "Google" },
    },
  })),
};

export default function GoogleBusinessProfileResourcesPage() {
  return (
    <div className="lf-subpage lf-resources-page">
      <JsonLd data={pageSchema(path)} />
      <JsonLd data={resourceListSchema} />
      <SubpageHeader activePage="resources" />

      <main id="main-content" tabIndex={-1}>
        <section className="lf-resources-hero">
          <div className="lf-sub-shell lf-resources-hero__grid">
            <div className="lf-resources-hero__copy" data-motion-intro>
              <p className="lf-sub-eyebrow">Free resources from Google</p>
              <h1>Business Profile guidance, <em>organized for your industry.</em></h1>
              <p>
                Google created separate 2026 playbooks for four kinds of local businesses.
                Start with the guide closest to your business, then use the shared checklist
                below to review what customers see when they find you.
              </p>
              <div className="lf-resources-hero__badges" aria-label="Resource details">
                <span><BadgeCheck aria-hidden="true" /> Official Google guidance</span>
                <span><BookOpenText aria-hidden="true" /> Four free PDF playbooks</span>
              </div>
            </div>

            <figure className="lf-resources-hero__visual" data-motion-media>
              <Image
                src="/media/frames/v2/localfirst/0000.webp"
                alt="A phone showing a local business profile on Google"
                width={1280}
                height={720}
                sizes="(max-width: 900px) 100vw, 44vw"
                priority
              />
              <figcaption>
                <span>Field guide</span>
                <strong>Four ways to make your profile more useful.</strong>
              </figcaption>
            </figure>
          </div>
        </section>

        <nav className="lf-resource-jump" aria-label="Jump to a business guide">
          <div className="lf-sub-shell">
            {resourceGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <a href={`#${guide.id}`} key={guide.id}>
                  <Icon aria-hidden="true" />
                  <span>{guide.title}</span>
                </a>
              );
            })}
          </div>
        </nav>

        <div className="lf-resource-guides">
          {resourceGuides.map((guide, index) => {
            const Icon = guide.icon;
            return (
              <section className="lf-resource-guide" id={guide.id} key={guide.id}>
                <div className="lf-sub-shell lf-resource-guide__grid" data-motion-scene={index % 2 === 0 ? "left" : "right"}>
                  <div className="lf-resource-guide__identity">
                    <span className="lf-resource-guide__icon" aria-hidden="true"><Icon /></span>
                    <p className="lf-sub-eyebrow">{guide.eyebrow}</p>
                    <h2>{guide.title}</h2>
                    <p className="lf-resource-guide__summary">{guide.summary}</p>
                  </div>

                  <div className="lf-resource-guide__body">
                    <p>{guide.details}</p>
                    <ul>
                      {guide.points.map((point) => <li key={point}><Check aria-hidden="true" />{point}</li>)}
                    </ul>
                    <a className="lf-resource-guide__link" href={guide.href} target="_blank" rel="noopener noreferrer">
                      Open the official 2026 playbook <ExternalLink aria-hidden="true" />
                    </a>
                    <small>PDF opens in a new tab.</small>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <section className="lf-resource-checklist lf-sub-section">
          <div className="lf-sub-shell lf-resource-checklist__grid" data-motion-scene="up">
            <div>
              <p className="lf-sub-eyebrow">Useful for every local business</p>
              <h2>A shared profile checklist.</h2>
              <p>
                The details differ by industry, but every strong profile should give people
                accurate information, a clear picture of the business, and an easy next step.
              </p>
            </div>
            <ol>
              {sharedChecklist.map((item, index) => (
                <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <aside className="lf-resource-note">
          <div className="lf-sub-shell">
            <BadgeCheck aria-hidden="true" />
            <p>
              <strong>About these resources:</strong> LocalFirst did not create these guides.
              They are Google’s 2026 Business Profile playbooks, linked here so local owners
              can find the guidance that fits their business. Features and availability can
              vary by business category and location.
            </p>
          </div>
        </aside>

        <section className="lf-sub-cta">
          <div className="lf-sub-shell" data-motion-scene="up">
            <h2>Know what to update. <em>Need help showing it?</em></h2>
            <p>
              LocalFirst comes to your business to create current professional photos and
              video, review key profile information, and help customers see what you offer.
            </p>
            <div className="lf-sub-actions">
              <Link className="lf-sub-button lf-sub-button--primary" href="/google-business-profile-visual-refresh">Explore the $349 Visual Refresh</Link>
              <Link className="lf-sub-button" href="/contact">Contact Nicholas →</Link>
            </div>
          </div>
        </section>
      </main>

      <SubpageFooter />
    </div>
  );
}
