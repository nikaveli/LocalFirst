import SubpageHeader from "@/components/SubpageHeader";
import SubpageFooter from "@/components/SubpageFooter";
import SiteLink from "@/components/SiteLink";

export default function NotFound() {
  return (
    <div className="lf-subpage">
      <SubpageHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="lf-sub-hero">
          <div className="lf-sub-shell lf-sub-hero__copy">
            <p className="lf-sub-eyebrow">404 · Page not found</p>
            <h1>Let&apos;s get you <em>back to local.</em></h1>
            <p>This page isn&apos;t available. Explore our work or get in touch with Nicholas.</p>
            <div className="lf-sub-actions">
              <SiteLink className="lf-sub-button lf-sub-button--primary" href="/">Back to home</SiteLink>
              <SiteLink className="lf-sub-button" href="/contact">Contact Nicholas</SiteLink>
            </div>
          </div>
        </section>
      </main>
      <SubpageFooter />
    </div>
  );
}
