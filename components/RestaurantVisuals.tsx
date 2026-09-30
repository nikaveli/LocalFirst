import type { CSSProperties } from "react";

const base = "/media/restaurant-home";
// Intrinsic dimensions of the 1280px derivatives, also available before lazy decode.
const photoSizes: Record<string, readonly [number, number]> = {
  tacos: [1280, 2276], shrimp: [1280, 836], burger: [1280, 960],
  steak: [1280, 2276], dessert: [1280, 2276], spread: [1280, 720],
};

export function FoodPhoto({ name, alt, className = "", sizes = "(max-width: 767px) 100vw, 50vw", position }: {
  name: string; alt: string; className?: string; sizes?: string; position?: string;
}) {
  return (
    // Explicit derivatives support the site's static export without a runtime image server.
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={`${base}/${name}-1280.webp`} srcSet={`${base}/${name}-640.webp 640w, ${base}/${name}-1280.webp 1280w, ${base}/${name}-1920.webp 1920w`} width={photoSizes[name]?.[0]} height={photoSizes[name]?.[1]} sizes={sizes} alt={alt} loading="lazy" decoding="async" style={position ? { objectPosition: position } : undefined} />
  );
}

export function BubbleButton({ children, href, className = "" }: { children: React.ReactNode; href: string; className?: string }) {
  const arrow = <svg viewBox="0 0 24 24" aria-hidden="true" className="btn-bubble-arrow__arrow-svg"><polyline points="18 8 18 18 8 18" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" /><line x1="18" y1="18" x2="5" y2="5" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" /></svg>;
  return <a className={`btn-bubble-arrow ${className}`} href={href}>
    <span className="btn-bubble-arrow__arrow">{arrow}</span>
    <span className="btn-bubble-arrow__content"><span className="btn-bubble-arrow__content-text">{children}</span></span>
    <span className="btn-bubble-arrow__arrow is--duplicate">{arrow}</span>
  </a>;
}

export function ImageZoom({ id, name, alt, eyebrow, title, after, copy, position = "50% 50%", dark = false }: {
  id: string; name: string; alt: string; eyebrow: string; title: React.ReactNode; after: React.ReactNode; copy: string; position?: string; dark?: boolean;
}) {
  return <section id={id} data-bg-zoom-init="" className={`rh-zoom ${dark ? "rh-zoom--dark" : ""}`} aria-labelledby={`${id}-title`} style={{ "--photo-position": position } as CSSProperties}>
    <header className="rh-zoom-heading"><p className="rh-eyebrow">{eyebrow}</p><h2 id={`${id}-title`}>{title}</h2></header>
    <div data-bg-zoom-start="" className="rh-zoom-start">
      <div data-bg-zoom-content="" className="rh-zoom-content">
        <div data-bg-zoom-img="" className="rh-zoom-image"><FoodPhoto name={name} alt={alt} sizes="100vw" /></div>
        <div data-bg-zoom-dark="" className="rh-zoom-shade" />
      </div>
    </div>
    <div className="rh-zoom-stage">
      <div className="rh-zoom-background-track" aria-hidden="true">
        <div className="rh-zoom-background">
          <FoodPhoto name={name} alt="" sizes="100vw" />
          <div className="rh-zoom-background-shade" />
        </div>
      </div>
      <div data-bg-zoom-end="" className="rh-zoom-end" aria-hidden="true" />
      <div className="rh-zoom-story"><h3>{after}</h3><p>{copy}</p><span className="rh-photo-credit">Photographed by Nick · LocalFirst</span></div>
    </div>
  </section>;
}
