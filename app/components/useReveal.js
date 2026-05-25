'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook: scroll-triggered reveal for any [data-reveal] descendant of the ref.
 * Honors prefers-reduced-motion via gsap.matchMedia.
 *
 * Options:
 *   stagger   — number, default 0.08
 *   y         — initial Y offset, default 36
 *   rotateX   — initial X-rotation deg, default -6
 *   duration  — default 0.9
 *   start     — ScrollTrigger start, default 'top 82%'
 */
export function useReveal(options = {}) {
  const ref = useRef(null);
  const {
    stagger = 0.08,
    y = 36,
    rotateX = -6,
    duration = 0.9,
    start = 'top 82%',
  } = options;

  useEffect(() => {
    if (!ref.current) return;
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: '(prefers-reduced-motion: reduce)',
        normal: '(prefers-reduced-motion: no-preference)',
      },
      (ctx) => {
        const { reduceMotion } = ctx.conditions;
        const targets = ref.current.querySelectorAll('[data-reveal]');
        if (targets.length === 0) return;

        if (reduceMotion) {
          gsap.set(targets, { opacity: 1, y: 0, rotateX: 0 });
          return;
        }

        gsap.fromTo(
          targets,
          { opacity: 0, y, rotateX, transformPerspective: 800 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration,
            ease: 'power3.out',
            stagger,
            scrollTrigger: {
              trigger: ref.current,
              start,
              once: true,
            },
          }
        );
      }
    );

    return () => mm.revert();
  }, [stagger, y, rotateX, duration, start]);

  return ref;
}
