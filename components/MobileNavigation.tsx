"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import SiteLink from "./SiteLink";
import { siteNavigation } from "@/lib/navigation";

export default function MobileNavigation({ items = siteNavigation }: { items?: readonly (readonly [string, string])[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 1200) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, [open]);

  return (
    <div className="lf-mobile-navigation" ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}>
      <button ref={toggle} type="button" aria-expanded={open} aria-controls={id}
        onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
      <nav id={id} hidden={!open} aria-label="Mobile navigation" data-lenis-prevent>
        {items.map(([href, label]) => (
          <SiteLink key={href} href={href} aria-current={pathname === href ? "page" : undefined}
            onClick={() => setOpen(false)}>{label}</SiteLink>
        ))}
      </nav>
    </div>
  );
}
