"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "locomotive-scroll/locomotive-scroll.css";

gsap.registerPlugin(ScrollTrigger, Flip);

export default function RestaurantMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-restaurant-home]");
    if (!root) return;
    const media = gsap.matchMedia();

    // Locomotive manages wheel smoothing only. Touch keeps its native momentum.
    media.add("(min-width: 992px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      let alive = true;
      let scroll: { destroy: () => void } | undefined;
      void import("locomotive-scroll").then(({ default: LocomotiveScroll }) => {
        if (!alive) return;
        scroll = new LocomotiveScroll({
          lenisOptions: { lerp: 0.1, smoothWheel: true, syncTouch: false, anchors: true },
          scrollCallback: () => ScrollTrigger.update(),
          initCustomTicker: render => gsap.ticker.add(render),
          destroyCustomTicker: render => gsap.ticker.remove(render),
        });
      }).catch(() => { /* Native scrolling remains fully functional. */ });
      return () => { alive = false; scroll?.destroy(); };
    });

    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      isMobile: "(max-width: 479px)",
      isMobileLandscape: "(max-width: 767px)",
      isTablet: "(max-width: 991px)",
      isDesktop: "(min-width: 992px)",
    }, context => {
      if (!context.conditions?.motion) return;
      const { isMobile, isMobileLandscape, isTablet } = context.conditions;
      const zooms = Array.from(root.querySelectorAll<HTMLElement>("[data-bg-zoom-init]"));
      zooms.forEach(section => section.classList.add("rh-zoom-enhanced"));
      let animation: gsap.Context | undefined;
      let timer: ReturnType<typeof setTimeout>;
      let active = true;
      let width = window.innerWidth;
      let height = window.innerHeight;

      const build = () => {
        animation?.revert();
        animation = gsap.context(() => {
          // Osmo Global Parallax: retain its attribute API and directional tweens.
          root.querySelectorAll<HTMLElement>('[data-parallax="trigger"]').forEach(trigger => {
            const disable = trigger.getAttribute("data-parallax-disable");
            if ((disable === "mobile" && isMobile) || (disable === "mobileLandscape" && isMobileLandscape) || (disable === "tablet" && isTablet)) return;
            const target = trigger.querySelector('[data-parallax="target"]') || trigger;
            const prop = trigger.getAttribute("data-parallax-direction") === "horizontal" ? "xPercent" : "yPercent";
            const scrub = trigger.getAttribute("data-parallax-scrub");
            gsap.fromTo(target, { [prop]: Number(trigger.getAttribute("data-parallax-start") ?? 20) }, {
              [prop]: Number(trigger.getAttribute("data-parallax-end") ?? -20), ease: "none",
              scrollTrigger: { trigger, start: `clamp(${trigger.getAttribute("data-parallax-scroll-start") || "top bottom"})`, end: `clamp(${trigger.getAttribute("data-parallax-scroll-end") || "bottom top"})`, scrub: scrub !== null && scrub !== "true" ? Number(scrub) : true },
            });
          });

          // Osmo Image to Background (Zoom), scoped to each separated section.
          // Independent timelines account for the gallery/process between them.
          const range = (config: ScrollTrigger.Vars) => {
            const trigger = ScrollTrigger.create(config);
            const distance = Math.max(1, trigger.end - trigger.start);
            trigger.kill();
            return distance;
          };
          zooms.forEach(container => {
            const start = container.querySelector<HTMLElement>("[data-bg-zoom-start]");
            const end = container.querySelector<HTMLElement>("[data-bg-zoom-end]");
            const content = container.querySelector<HTMLElement>("[data-bg-zoom-content]");
            const dark = container.querySelector("[data-bg-zoom-dark]");
            const image = container.querySelector("[data-bg-zoom-img]");
            if (!start || !end || !content) return;
            const radius = getComputedStyle(start).borderRadius;
            Flip.fit(content, start, { scale: false });
            gsap.set(content, { borderRadius: radius });
            const zoomRange = range({ trigger: start, start: "clamp(top bottom)", endTrigger: end, end: "center center" });
            const afterRange = range({ trigger: end, start: "center center", endTrigger: container, end: "bottom top" });
            const timeline = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: start, start: "clamp(top bottom)", endTrigger: container, end: "bottom top", scrub: true } });
            const fit = Flip.fit(content, end, { duration: zoomRange, ease: "none", scale: false });
            if (fit) timeline.add(fit as gsap.core.Tween);
            timeline.to(content, { borderRadius: getComputedStyle(end).borderRadius, duration: zoomRange }, "<");
            timeline.to(content, { y: `+=${afterRange}`, duration: afterRange });
            if (dark) timeline.fromTo(dark, { opacity: 0 }, { opacity: 0.75, duration: afterRange * .25 }, "<");
            if (image) timeline.fromTo(image, { scale: 1, yPercent: 0 }, { scale: 1.25, yPercent: -10, duration: afterRange }, zoomRange);
          });

          root.querySelectorAll<HTMLElement>("[data-rh-reveal]").forEach(element => {
            // Above-the-fold and already-passed copy must never disappear on resize.
            if (element.getBoundingClientRect().top < window.innerHeight * .9) return;
            gsap.fromTo(element, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: "power2.out", clearProps: "transform,opacity", scrollTrigger: { trigger: element, start: "top 92%", once: true } });
          });
        }, root);
        ScrollTrigger.refresh();
      };
      const resize = () => {
        // iOS address-bar height changes are not layout changes. Avoid rebuilding mid-swipe.
        const changed = window.innerWidth !== width || (window.innerWidth >= 992 && Math.abs(window.innerHeight - height) > 100);
        if (!changed) return;
        width = window.innerWidth;
        height = window.innerHeight;
        clearTimeout(timer);
        timer = setTimeout(build, 180);
      };
      build();
      void document.fonts.ready.then(() => { if (active) build(); });
      window.addEventListener("resize", resize);
      return () => {
        active = false;
        clearTimeout(timer);
        window.removeEventListener("resize", resize);
        animation?.revert();
        zooms.forEach(section => section.classList.remove("rh-zoom-enhanced"));
      };
    }, root);

    return () => media.revert();
  }, []);
  return null;
}
