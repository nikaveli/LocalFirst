'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Fixed radial-gradient layer that subtly shifts hue per section.
// Sections opt in by setting data-bg-hue="<number>" on the section element.
// Default base hue is 220 (cool blue, matches hero map-pin video).
export default function SiteBackdrop() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const obj = { h: 220 };
    const root = document.documentElement;

    const apply = () => {
      root.style.setProperty('--bg-hue', String(obj.h));
    };
    apply();

    const sections = document.querySelectorAll('[data-bg-hue]');
    const triggers = [];

    sections.forEach((s) => {
      const hue = parseFloat(s.getAttribute('data-bg-hue'));
      if (Number.isNaN(hue)) return;

      const enter = () =>
        gsap.to(obj, { h: hue, duration: 1.4, ease: 'sine.inOut', onUpdate: apply });

      const t = ScrollTrigger.create({
        trigger: s,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: enter,
        onEnterBack: enter,
      });
      triggers.push(t);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 90% 60% at 50% 25%, hsl(var(--bg-hue, 220), 38%, 7%) 0%, #000 65%)',
        transition: 'background 200ms linear',
      }}
    />
  );
}
