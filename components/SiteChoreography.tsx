"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power3.out";

type SceneDirection = "up" | "left" | "right";

const sceneDistance = () => Math.min(window.innerWidth < 760 ? 36 : 80, window.innerWidth * 0.07);

const sceneStart = (direction: SceneDirection): gsap.TweenVars => {
  if (direction === "left") {
    return {
      x: () => -sceneDistance(),
    };
  }

  if (direction === "right") {
    return {
      x: sceneDistance,
    };
  }

  return {
    y: sceneDistance,
  };
};

export default function SiteChoreography() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-motion-intro]").forEach((intro) => {
        const items = Array.from(intro.children).filter(
          (child): child is HTMLElement => child instanceof HTMLElement,
        );

        if (!items.length) return;

        gsap.fromTo(
          items,
          { opacity: 0, y: 38 },
          {
            opacity: 1,
            y: 0,
            duration: 0.92,
            delay: 0.08,
            ease: EASE,
            stagger: 0.075,
            clearProps: "opacity,transform",
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-motion-sheet='up']").forEach((sheet) => {
        gsap.fromTo(
          sheet,
          {
            y: () => Math.min(window.innerHeight * 0.16, 170),
          },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sheet,
              start: "top 100%",
              end: "top 54%",
              scrub: 0.55,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-motion-scene]").forEach((scene) => {
        const requested = scene.dataset.motionScene;
        const direction: SceneDirection =
          requested === "left" || requested === "right" ? requested : "up";

        gsap.fromTo(
          scene,
          sceneStart(direction),
          {
            x: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "top 92%",
              end: "top 48%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      const reveal = (
        selector: string,
        from: gsap.TweenVars,
        start = "top 88%",
      ) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, ...from },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.96,
              ease: EASE,
              clearProps: "opacity,transform,clipPath",
              scrollTrigger: {
                trigger: element,
                start,
                once: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      };

      reveal("[data-motion-reveal]", { y: 46 });
      reveal("[data-motion-from-left]", {
        x: () => -sceneDistance(),
        y: 14,
        clipPath: "inset(0% 12% 0% 0%)",
      });
      reveal("[data-motion-from-right]", {
        x: sceneDistance,
        y: 14,
        clipPath: "inset(0% 0% 0% 12%)",
      });
      reveal(
        "[data-motion-media]",
        { y: 52, scale: 1.035, clipPath: "inset(16% 0% 0% 0%)" },
        "top 90%",
      );

      gsap.utils.toArray<HTMLElement>("[data-motion-group]").forEach((group) => {
        const items = Array.from(group.children).filter(
          (child): child is HTMLElement => child instanceof HTMLElement,
        );

        if (!items.length) return;

        gsap.fromTo(
          items,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.88,
            ease: EASE,
            stagger: 0.075,
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: group,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-motion-card]").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: index % 2 === 0 ? -34 : 34,
            y: 48,
            scale: 0.975,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            delay: (index % 3) * 0.07,
            duration: 0.9,
            ease: EASE,
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              once: true,
            },
          },
        );
      });
    }, document.body);

    let active = true;
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    void document.fonts.ready.then(() => {
      if (active) refresh();
    });

    return () => {
      active = false;
      window.removeEventListener("load", refresh);
      motion.revert();
    };
  }, [pathname]);

  return null;
}
