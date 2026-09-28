"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, Flip);

export default function RestaurantMotionEngine() {
  const pathname = usePathname();
  const anchor = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    // Mount with the page, not its streaming layout; the page DOM must exist first.
    const root = anchor.current?.closest<HTMLElement>("[data-restaurant-home], .lf-subpage");
    if (!root) return;
    root.dataset.motionReady = "true";
    const subpage = root.classList.contains("lf-subpage");
    const media = gsap.matchMedia();
    let interacted = false;
    let anchorFrame = 0;
    const markInteraction = () => { interacted = true; };
    const interactionEvents = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    interactionEvents.forEach(event => window.addEventListener(event, markInteraction, { passive: true }));
    const alignAnchor = () => {
      if (interacted || !window.location.hash) return;
      cancelAnimationFrame(anchorFrame);
      // Run after ScrollTrigger's own scroll restoration, including its load refresh.
      anchorFrame = requestAnimationFrame(() => {
        if (interacted) return;
        try {
          document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView({ behavior: "instant", block: "start" });
          ScrollTrigger.update();
        } catch { /* A malformed fragment should not prevent scrolling. */ }
      });
    };
    ScrollTrigger.addEventListener("refresh", alignAnchor);
    window.addEventListener("load", alignAnchor);

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

      const build = (alignInitialHash = false) => {
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
            const story = container.querySelector('.rh-zoom-story');
            // Match copy contrast to the actual background as the photo arrives.
            if (story && !container.classList.contains('rh-zoom--dark')) {
              timeline.fromTo(story, { color: '#2c2c2c' }, { color: '#ffffff', duration: afterRange * .1 }, zoomRange);
            }
          });

          const revealSelector = "[data-rh-reveal], [data-motion-scene], [data-motion-reveal], [data-motion-from-left], [data-motion-from-right], [data-motion-media], [data-motion-card], [data-motion-group] > *";
          root.querySelectorAll<HTMLElement>(revealSelector).forEach(element => {
            // One reveal per content group; don't stack transforms on nested cards.
            if (element.parentElement?.closest("[data-motion-scene], [data-rh-reveal]")) return;
            if (subpage) {
              // Visible, reversible choreography: progress follows the scroll,
              // rather than a small entrance that disappears after one viewing.
              gsap.fromTo(element, { y: isMobileLandscape ? 36 : 64 }, {
                y: 0, ease: "none",
                scrollTrigger: { trigger: element, start: "clamp(top 98%)", end: "clamp(top 52%)", scrub: .3, invalidateOnRefresh: true },
              });
              return;
            }
            // Above-the-fold and already-passed copy must never disappear on resize.
            if (element.getBoundingClientRect().top < window.innerHeight * .9) return;
            gsap.fromTo(element, { y: 28 }, { y: 0, duration: .8, ease: "power2.out", clearProps: "transform", scrollTrigger: { trigger: element, start: "top 92%", once: true } });
          });
        }, root);
        ScrollTrigger.refresh();
        // Zoom enhancement changes document height. Re-align a cross-page anchor
        // after layout settles, but never pull someone back after they interact.
        if (alignInitialHash) alignAnchor();
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
      build(true);
      void document.fonts.ready.then(() => { if (active) build(true); });
      window.addEventListener("resize", resize);
      return () => {
        active = false;
        clearTimeout(timer);
        window.removeEventListener("resize", resize);
        animation?.revert();
        zooms.forEach(section => section.classList.remove("rh-zoom-enhanced"));
      };
    }, root);

    return () => {
      media.revert();
      interactionEvents.forEach(event => window.removeEventListener(event, markInteraction));
      ScrollTrigger.removeEventListener("refresh", alignAnchor);
      window.removeEventListener("load", alignAnchor);
      cancelAnimationFrame(anchorFrame);
      delete root.dataset.motionReady;
    };
  }, [pathname]);
  return <span ref={anchor} hidden data-site-motion="" />;
}
