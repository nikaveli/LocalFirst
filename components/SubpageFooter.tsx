import Image from "next/image";
import Link from "./SiteLink";
import { siteNavigation } from "@/lib/navigation";
import RestaurantMotion from "./RestaurantMotion";

export default function SubpageFooter() {
  return <footer className="rh-footer">
    <div className="rh-shell rh-footer-top">
      <div><Link href="/" className="rh-logo" aria-label="LocalFirst home"><Image src="/media/localfirst-logo-v3.webp" alt="LocalFirst" width={480} height={160} sizes="(max-width: 767px) 118px, 152px" /></Link><p>No business left behind.</p></div>
      <nav aria-label="Footer navigation">
        {siteNavigation.map(([href, label]) => <Link key={href} href={href} data-underline-link="">{label}</Link>)}
      </nav>
      <div className="rh-footer-contact"><a href="tel:+13035240591" data-underline-link="">303-524-0591</a><a href="mailto:nick.molina@icloud.com" data-underline-link="">nick.molina@icloud.com</a><span>Denver / Aurora · Colorado</span></div>
    </div>
    <div className="rh-shell rh-footer-bottom"><span>© {new Date().getFullYear()} LocalFirst</span><span>Restaurant photography · Video · Google Business Profiles</span></div>
    <RestaurantMotion />
  </footer>;
}
