"use client";

import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import { createVideoScrubber } from "@/lib/video-scrubber";
import { createFrameSequence } from "@/lib/frame-sequence";

type ScrollCraftInstance = {
  layout: () => void;
  read: () => void;
};

declare global {
  interface Window {
    ScrollCraft?: {
      mount: (root: HTMLElement) => ScrollCraftInstance;
      instances: ScrollCraftInstance[];
    };
  }
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const ease = (value: number) => {
  const n = clamp(value);
  return n * n * (3 - 2 * n);
};

const windowed = (value: number, start: number, end: number) =>
  ease((value - start) / Math.max(end - start, 0.001));

function setupLocalFirstMotion(root: HTMLElement, mobileHero: HTMLVideoElement | null, refreshLayout: () => void) {
  const heroAct = root.querySelector<HTMLElement>("[data-lf-hero-act]");
  const heroStage = root.querySelector<HTMLElement>(
    "[data-lf-hero-act] [data-sc-stage]",
  );
  const heroMedia = root.querySelector<HTMLElement>("[data-lf-hero-media]");
  const heroScrim = root.querySelector<HTMLElement>("[data-lf-hero-scrim]");
  const proofAct = root.querySelector<HTMLElement>("[data-lf-proof-act]");
  const proofStage = root.querySelector<HTMLElement>("[data-lf-proof-stage]");
  const restaurantSheet = root.querySelector<HTMLElement>("[data-lf-restaurant-sheet]");
  const restaurantCopy = root.querySelector<HTMLElement>("[data-lf-restaurant-copy]");
  const medSpaCopy = root.querySelector<HTMLElement>("[data-lf-med-spa-copy]");
  const medSpaSheet = root.querySelector<HTMLElement>("[data-lf-med-spa-sheet]");
  const restaurantTab = root.querySelector<HTMLElement>("[data-lf-restaurant-tab]");
  const medSpaTab = root.querySelector<HTMLElement>("[data-lf-med-spa-tab]");
  const proofLockup = root.querySelector<HTMLElement>("[data-lf-proof-lockup]");
  const methodAct = root.querySelector<HTMLElement>("[data-lf-method-act]");
  const methodPanels = Array.from(
    root.querySelectorAll<HTMLElement>("[data-lf-method-panel]"),
  );
  const videos = Array.from(
    root.querySelectorAll<HTMLVideoElement>("video[data-lf-scrub]"),
  );
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 860px), (pointer: coarse)").matches;

  if (!proofAct || !proofStage) return () => undefined;

  const mobileFrames = mobile && !reducedMotion;
  const sequences = mobileFrames
    ? videos.map((video, index) => createFrameSequence(video, index === 0 ? "restaurant" : "med-spa"))
    : [];
  const records = mobileFrames ? sequences : videos.map(createVideoScrubber);
  const heroScrubber = mobileHero && mobileFrames ? createFrameSequence(mobileHero, "localfirst") : null;

  let scrollFrame = 0;
  let destroyed = false;
  const mediaController = new AbortController();
  const objectUrls: string[] = [];

  const loadVideo = (video: HTMLVideoElement) => {
    if (mobileFrames) {
      sequences[videos.indexOf(video)]?.warm();
      return;
    }
    if (reducedMotion || video.dataset.lfLoaded === "true") return;
    const source = mobile ? video.dataset.lfSrcMobile : video.dataset.lfSrc;
    if (!source) return;
    video.dataset.lfLoaded = "true";
    fetch(source, { signal: mediaController.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${source}`);
        return response.blob();
      })
      .then((blob) => {
        if (destroyed) return;
        const objectUrl = URL.createObjectURL(blob);
        objectUrls.push(objectUrl);
        video.preload = "auto";
        video.src = objectUrl;
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (destroyed) return;
        video.preload = "auto";
        video.src = source;
      });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadVideo(videos[0]);
        observer.disconnect();
      }
    },
    { rootMargin: "70% 0px" },
  );

  if (!reducedMotion) observer.observe(proofAct);

  const readyListeners = videos.map((video) => {
    const markReady = () => {
      video.closest<HTMLElement>(".lf-film-sheet")?.classList.add("is-ready");
    };
    video.addEventListener("loadeddata", markReady);
    return () => video.removeEventListener("loadeddata", markReady);
  });

  // Warm the opening scene only. Upcoming scenes join the queue near their
  // entrance, and reuse their existing poster rather than downloading it twice.
  heroScrubber?.warm();

  // Batch geometry reads outside the scroll paint. In particular, don't use
  // innerHeight for mobile zoom: browser toolbar collapse changes it mid-swipe.
  let viewportWidth = window.innerWidth;
  let viewportHeight = heroStage?.clientHeight || window.innerHeight;
  let heroTop = 0, heroHeight = 1, proofTop = 0, proofHeight = 1;
  let methodTop = 0, methodHeight = 1;
  const measure = () => {
    if (!mobile || viewportWidth !== window.innerWidth) {
      viewportHeight = heroStage?.clientHeight || window.innerHeight;
    }
    viewportWidth = window.innerWidth;
    heroTop = heroAct?.offsetTop || 0;
    heroHeight = heroAct?.offsetHeight || 1;
    proofTop = proofAct.offsetTop;
    proofHeight = proofAct.offsetHeight;
    methodTop = methodAct?.offsetTop || 0;
    methodHeight = methodAct?.offsetHeight || 1;
  };
  measure();

  const update = () => {
    scrollFrame = 0;
    const scrollY = window.scrollY;
    const heroProgress = heroAct
      ? clamp(
          (scrollY - heroTop) / Math.max(heroHeight - viewportHeight, 1),
        )
      : 0;
    const proofProgress = clamp(
      (scrollY - proofTop) / Math.max(proofHeight - viewportHeight, 1),
    );
    const restaurantHandoff = clamp(
      (scrollY - (proofTop - viewportHeight * 0.52)) /
        Math.max(viewportHeight * 0.52, 1),
    );
    const restaurantProgress = clamp(proofProgress / 0.46);
    const restaurantReveal = ease(restaurantHandoff);
    const restaurantEntryOpacity =
      windowed(restaurantHandoff, 0.2, 1) *
      (1 - windowed(proofProgress, 0.55, 0.62));
    const medSpaProgress = clamp((proofProgress - 0.48) / 0.46);
    const medSpaReveal = windowed(proofProgress, 0.4, 0.57);
    const medSpaOpacity = windowed(proofProgress, 0.435, 0.585);
    const restaurantCopyOpacity =
      windowed(proofProgress, 0.015, 0.075) *
      (1 - windowed(proofProgress, 0.32, 0.4));
    const medSpaCopyOpacity =
      windowed(proofProgress, 0.56, 0.63) *
      (1 - windowed(proofProgress, 0.8, 0.87));
    const lockupOpacity = windowed(proofProgress, 0.88, 0.95);

    const proofVisible = scrollY < proofTop + proofHeight && scrollY > proofTop - viewportHeight;
    records[0]?.setTarget(restaurantProgress, !reducedMotion && proofVisible && proofProgress < 0.62);
    records[1]?.setTarget(medSpaProgress, !reducedMotion && proofVisible && proofProgress > 0.32);
    if (!reducedMotion && proofVisible && proofProgress > 0.2) loadVideo(videos[1]);
    if (heroScrubber) {
      // Match the original hero's whole-visible-life mapping and authored dwell.
      const raw = clamp((scrollY - heroTop) / heroHeight);
      const dwell = Number(heroAct?.dataset.scDwell) || 0;
      const progress = (1 - dwell) * raw + dwell * (4 * (raw - 0.5) ** 3 + 0.5);
      heroScrubber.setTarget(progress, !reducedMotion && scrollY < proofTop);
    }

    if (!reducedMotion) {
      if (heroAct && heroStage) {
        const heroPinEnd =
          heroTop + heroHeight - viewportHeight;
        const exitHold = clamp(
          scrollY - heroPinEnd,
          0,
          viewportHeight,
        );
        heroStage.style.transform = `translate3d(0, ${exitHold.toFixed(2)}px, 0)`;
        heroStage.style.display =
          scrollY >= proofTop ? "none" : "";
      }
      if (heroMedia) {
        const isMobile = viewportWidth <= 720;
        if (heroScrim) {
          heroScrim.style.opacity = (
            1 - windowed(heroProgress, 0.28, 0.52)
          ).toFixed(3);
        }
        if (isMobile) {
          const baseWidth = Math.max(viewportWidth - 32, 1);
          const baseHeight = baseWidth * (9 / 16);
          const fillScale = Math.max(
            viewportWidth / baseWidth,
            viewportHeight / baseHeight,
          );
          const expansion = windowed(heroProgress, 0.035, 0.58);
          const subjectTrack = 1 - windowed(heroProgress, 0.02, 0.3);
          const scale = 1 + (fillScale - 1) * expansion;
          const baseCenterY = 76 + baseHeight / 2;
          const translateY = (viewportHeight / 2 - baseCenterY) * expansion;
          heroMedia.style.setProperty(
            "--lf-hero-subject-x",
            `${(subjectTrack * 27.5).toFixed(2)}%`,
          );
          heroMedia.style.setProperty(
            "--lf-hero-subject-scale",
            (1 + subjectTrack * 0.52).toFixed(4),
          );
          heroMedia.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
        } else {
          heroMedia.style.removeProperty("--lf-hero-subject-x");
          heroMedia.style.removeProperty("--lf-hero-subject-scale");
          heroMedia.style.transform = "none";
        }
      }
      if (restaurantSheet) {
        const restaurantFeather = Math.max((1 - restaurantReveal) * 18, 0.01);
        restaurantSheet.style.opacity = restaurantEntryOpacity.toFixed(3);
        restaurantSheet.style.setProperty(
          "--lf-edge-feather",
          `${restaurantFeather.toFixed(2)}vh`,
        );
        restaurantSheet.style.transform = `translate3d(0, ${(1 - restaurantReveal) * 104}%, 0) scale(${(1.012 - restaurantReveal * 0.012).toFixed(4)})`;
      }
      if (medSpaSheet) {
        const edgeFeather = Math.max((1 - medSpaReveal) * 18, 0.01);
        medSpaSheet.style.opacity = medSpaOpacity.toFixed(3);
        medSpaSheet.style.setProperty("--lf-edge-feather", `${edgeFeather.toFixed(2)}vh`);
        medSpaSheet.style.transform = `translate3d(0, ${(1 - medSpaReveal) * 104}%, 0) scale(${(1.012 - medSpaReveal * 0.012).toFixed(4)})`;
      }
      if (restaurantCopy) restaurantCopy.style.opacity = restaurantCopyOpacity.toFixed(3);
      if (medSpaCopy) medSpaCopy.style.opacity = medSpaCopyOpacity.toFixed(3);
      if (proofLockup) {
        proofLockup.style.opacity = lockupOpacity.toFixed(3);
        proofLockup.style.transform = `translate3d(-50%, ${(1 - lockupOpacity) * 18}px, 0)`;
      }
      if (restaurantTab) {
        const tabIn = windowed(proofProgress, 0.36, 0.45);
        restaurantTab.style.opacity = tabIn.toFixed(3);
        restaurantTab.style.transform = `translate3d(0, ${(1 - tabIn) * -16}px, 0)`;
      }
      if (medSpaTab) {
        const tabIn = windowed(proofProgress, 0.82, 0.9);
        medSpaTab.style.opacity = tabIn.toFixed(3);
        medSpaTab.style.transform = `translate3d(0, ${(1 - tabIn) * -16}px, 0)`;
      }
    }

    proofStage.dataset.scVerifyState = [
      `r${restaurantProgress.toFixed(2)}`,
      `m${medSpaProgress.toFixed(2)}`,
      `y${medSpaReveal.toFixed(2)}`,
      `e${restaurantReveal.toFixed(2)}`,
      `p${lockupOpacity.toFixed(2)}`,
    ].join("-");
    if (proofProgress > 0.96) proofStage.dataset.scVerifyHold = "true";
    else delete proofStage.dataset.scVerifyHold;

    if (methodAct && !reducedMotion) {
      const methodProgress = clamp(
        (scrollY - methodTop) / Math.max(methodHeight - viewportHeight, 1),
      );
      methodPanels.forEach((panel, index) => {
        if (index === 0) return;
        const settled = windowed(methodProgress, 0.08 + index * 0.095, 0.24 + index * 0.095);
        panel.style.opacity = (0.55 + settled * 0.45).toFixed(3);
        panel.style.transform = `translate3d(0, ${(1 - settled) * 28}px, 0)`;
      });
    }
  };

  const requestUpdate = () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(update);
  };

  const resize = () => {
    if (mobile && window.innerWidth === viewportWidth) return;
    measure();
    requestUpdate();
  };
  const geometryObserver = new ResizeObserver(() => {
    // A real page-height change (font/portal layout, rotation) invalidates the
    // engine's cached act offsets too. A toolbar-only change doesn't resize
    // this root on iOS, and our hero zoom still uses its stable viewport size.
    refreshLayout();
    measure();
    requestUpdate();
  });
  geometryObserver.observe(root);
  void document.fonts.ready.then(() => { if (!destroyed) { measure(); requestUpdate(); } });

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  update();

  return () => {
    destroyed = true;
    mediaController.abort();
    observer.disconnect();
    geometryObserver.disconnect();
    records.forEach((record) => record.destroy());
    heroScrubber?.destroy();
    readyListeners.forEach((remove) => remove());
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", resize);
    if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    objectUrls.forEach((url) => URL.revokeObjectURL(url));
  };
}

export default function ScrollcraftMount() {
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!ready || !window.ScrollCraft) return;
    const root = document.querySelector<HTMLElement>("[data-localfirst-scrollcraft]");
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelector<HTMLElement>("[data-lf-proof-act]")?.setAttribute("data-sc-act", "flow");
    }

    const mobile = window.matchMedia("(max-width: 860px), (pointer: coarse)").matches;
    const mobileHero = mobile ? root.querySelector<HTMLVideoElement>(".lf-hero-video") : null;
    // Phones use canvas sequences, so the engine must never start fetching or
    // seeking the hidden native video.
    mobileHero?.removeAttribute("data-sc-scrub");
    const instance = window.ScrollCraft.mount(root);
    const cleanupMotion = setupLocalFirstMotion(root, mobileHero, instance.layout);
    const layoutFrame = window.requestAnimationFrame(() => {
      instance.layout();
      instance.read();
    });

    return () => {
      window.cancelAnimationFrame(layoutFrame);
      cleanupMotion();
    };
  }, [ready]);

  return (
    <Script
      src="/scrollcraft.js"
      strategy="afterInteractive"
      onLoad={markReady}
      onReady={markReady}
    />
  );
}
