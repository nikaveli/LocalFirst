import Image from "next/image";
import Link from "./SiteLink";
import MobileNavigation from "./MobileNavigation";

type ActivePage = "about" | "contact" | "first-impressions";

export default function SubpageHeader({ activePage }: { activePage?: ActivePage }) {
  const navItems: Array<{ href: string; label: string; key: ActivePage | "home" }> = [
    { href: "/", label: "Home", key: "home" },
    { href: "/first-impressions", label: "First Impressions", key: "first-impressions" },
    { href: "/about", label: "About", key: "about" },
    { href: "/contact", label: "Contact", key: "contact" },
  ];

  return (
    <header className="lf-sub-header">
      <div className="lf-sub-header__inner">
        <Link href="/" className="lf-sub-logo" aria-label="LocalFirst home">
          <Image
            src="/media/localfirst-logo-primary.png"
            alt="LocalFirst"
            width={2172}
            height={724}
            sizes="128px"
            priority
          />
        </Link>

        <nav className="lf-sub-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={item.key === activePage ? "is-active" : undefined}
              aria-current={item.key === activePage ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a className="lf-sub-phone" href="tel:+13035240591">
          303-524-0591
        </a>
        <MobileNavigation />
      </div>
    </header>
  );
}
