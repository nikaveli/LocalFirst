import Image from "next/image";
import Link from "./SiteLink";

export default function SubpageFooter() {
  return (
    <footer className="lf-sub-footer">
      <div
        className="lf-sub-shell lf-sub-footer__grid"
        data-motion-scene="up"
      >
        <div className="lf-sub-footer__brand">
          <Link href="/" aria-label="LocalFirst home">
            <Image
              src="/media/localfirst-logo-web.webp"
              alt="LocalFirst"
              width={2172}
              height={724}
              sizes="128px"
            />
          </Link>
          <p>No Business Left Behind</p>
          <span>Colorado · Denver / Aurora Metro</span>
        </div>

        <nav aria-label="Footer navigation">
          <p className="lf-sub-footer__label">Sitemap</p>
          <Link href="/">Home</Link>
          <Link href="/google-business-profile-visual-refresh#pricing">Pricing</Link>
          <Link href="/google-business-profile-visual-refresh">Visual Refresh · $349</Link>
          <Link href="/google-business-profile-resources">Google Business Profile Guides</Link>
          <Link href="/first-impressions">First Impressions</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="lf-sub-footer__contact">
          <p className="lf-sub-footer__label">Contact</p>
          <a href="tel:+13035240591">303-524-0591</a>
          <a href="mailto:nick.molina@icloud.com">nick.molina@icloud.com</a>
          <span>Google Local Guide · Level 7<br />BBB A+ Accredited</span>
        </div>
      </div>
      <p className="lf-sub-footer__legal" data-motion-reveal>
        © {new Date().getFullYear()} LocalFirst · All rights reserved · Colorado, USA
      </p>
    </footer>
  );
}
