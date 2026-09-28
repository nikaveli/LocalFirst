"use client";

import { useEffect, useState, type ComponentType } from "react";

export default function RestaurantMotion() {
  const [Engine, setEngine] = useState<ComponentType | null>(null);
  useEffect(() => {
    let active = true;
    let started = false;
    let frame = 0;
    const start = () => {
      if (started || !active) return;
      started = true;
      void import('./RestaurantMotionEngine').then(module => {
        if (active) setEngine(() => module.default);
      }).catch(() => { /* All content remains visible with native scrolling. */ });
    };
    // Font rendering takes priority over the below-fold animation library.
    // An early gesture loads it immediately, rather than waiting for idle time.
    void document.fonts.ready.then(() => { if (active) frame = requestAnimationFrame(start); });
    window.addEventListener('scroll', start, { passive: true, once: true });
    window.addEventListener('touchstart', start, { passive: true, once: true });
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', start);
      window.removeEventListener('touchstart', start);
    };
  }, []);
  return Engine ? <Engine /> : null;
}
