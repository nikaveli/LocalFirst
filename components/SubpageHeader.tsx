import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "./SiteLink";
import MobileNavigation from "./MobileNavigation";
import { siteNavigation } from "@/lib/navigation";

type ActivePage = "about" | "contact" | "first-impressions" | "pricing" | "resources" | "visual-refresh" | "website-development";

export default function SubpageHeader({ activePage }: { activePage?: ActivePage }) {
  const activeHref = activePage === "resources" ? "/google-business-profile-resources" : activePage === "visual-refresh" ? "/google-business-profile-visual-refresh" : `/${activePage}`;
  return <header className="rh-header">
    <Link href="/" className="rh-logo" aria-label="LocalFirst home"><Image src="/media/localfirst-logo-v3.webp" alt="LocalFirst" width={480} height={160} priority sizes="(max-width: 767px) 118px, 152px" /></Link>
    <nav className="rh-desktop-nav" aria-label="Main navigation">{siteNavigation.map(([href, label]) => <Link key={href} href={href} data-underline-link="" aria-current={href === activeHref ? "page" : undefined}>{label}</Link>)}</nav>
    <a href="sms:+13035240591?&body=FIRST" className="rh-header-contact">Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></a>
    <MobileNavigation />
  </header>;
}
