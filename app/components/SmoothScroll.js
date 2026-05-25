'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Site-wide smooth scroll. Mount once in the root layout.
// - Drives GSAP's ticker so any ScrollTrigger animation stays in sync.
// - Forwards every scroll frame to ScrollTrigger.update so pins/scrubs feel native.
// - No-ops under prefers-reduced-motion.
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      // A touch of inertia. Higher = floatier.
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Let touch devices use native scrolling — fights iOS scrolling otherwise.
      smoothTouch: false,
    });

    // ScrollTrigger needs a heartbeat tied to Lenis, not the browser scroll event.
    lenis.on('scroll', ScrollTrigger.update);

    // Pipe Lenis's RAF into GSAP's ticker so we only have one animation loop.
    const tickerCb = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Expose for debugging during dev.
    if (process.env.NODE_ENV !== 'production') {
      window.__lenis = lenis;
    }

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  return null;
}
