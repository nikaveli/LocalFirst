"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationVariant =
  | "fade-up"
  | "fade-in"
  | "fade-left"
  | "fade-right"
  | "scale-in"
  | "stagger-children";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  staggerAmount?: number;
  className?: string;
  /** CSS selector for children to stagger (only used with stagger-children) */
  staggerSelector?: string;
}

export default function AnimateOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.8,
  staggerAmount = 0.12,
  className = "",
  staggerSelector = ":scope > *",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (variant === "stagger-children") {
        const children = el.querySelectorAll(staggerSelector);
        gsap.set(children, { opacity: 0, y: 32 });
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          stagger: staggerAmount,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      } else {
        const from: gsap.TweenVars = { opacity: 0 };
        const to: gsap.TweenVars = {
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        };

        switch (variant) {
          case "fade-up":
            from.y = 48;
            to.y = 0;
            break;
          case "fade-in":
            break;
          case "fade-left":
            from.x = -48;
            to.x = 0;
            break;
          case "fade-right":
            from.x = 48;
            to.x = 0;
            break;
          case "scale-in":
            from.scale = 0.92;
            to.scale = 1;
            break;
        }

        gsap.set(el, from);
        gsap.to(el, to);
      }
    }, el);

    return () => ctx.revert();
  }, [variant, delay, duration, staggerAmount, staggerSelector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
