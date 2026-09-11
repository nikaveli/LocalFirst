"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface HeroAnimateProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Animates direct children of the hero with a staggered cascade on page load.
 * No ScrollTrigger — fires immediately since the hero is always above the fold.
 */
export default function HeroAnimate({ children, className = "" }: HeroAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(":scope > *");
      gsap.set(items, { opacity: 0, y: 36 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
        stagger: 0.1,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
