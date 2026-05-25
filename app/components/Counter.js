'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Number that animates from 0 → `to` once it scrolls into view.
 *
 * SSR renders the final value so search engines / no-JS users see it.
 * On client, the value is reset to 0 in an effect and tweened back up.
 * Updates the DOM via textContent directly to avoid extra React renders.
 *
 * Props:
 *   to        — target number
 *   prefix    — string before the number (e.g. "$", "L")
 *   suffix    — string after the number
 *   duration  — seconds, default 1.4
 *   format    — fn(n) => string. Defaults to Math.round + locale formatting.
 *   start     — ScrollTrigger start, default 'top 88%'
 */
export default function Counter({
  to,
  prefix = '',
  suffix = '',
  duration = 1.4,
  format,
  start = 'top 88%',
  className,
  style,
}) {
  const ref = useRef(null);
  const fmt = format || ((n) => Math.round(n).toLocaleString());
  const finalText = `${prefix}${fmt(to)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = finalText;
      return;
    }

    // Reset visually to 0 then tween up.
    el.textContent = `${prefix}${fmt(0)}${suffix}`;

    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: to,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${prefix}${fmt(obj.n)}${suffix}`;
      },
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
    });

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, [to, prefix, suffix, duration, fmt, start, finalText]);

  return (
    <span
      ref={ref}
      className={className}
      style={style}
      aria-label={finalText}
    >
      {finalText}
    </span>
  );
}
