"use client";

import Script from "next/script";
import { useCallback, useEffect, useState } from "react";

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

function setupLocalFirstMotion(root: HTMLElement) {
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

  if (!proofAct || !proofStage) return () => undefined;

  const records = videos.map((video) => ({
    video,
    current: 0,
    target: 0,
    ready: false,
  }));

  let scrollFrame = 0;
  let videoFrame = 0;
  let destroyed = false;
  const mediaController = new AbortController();
  const objectUrls: string[] = [];

  const loadVideo = (video: HTMLVideoElement) => {
    if (reducedMotion || video.dataset.lfLoaded === "true") return;
    const mobile = window.matchMedia("(max-width: 860px)").matches;
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
        videos.forEach(loadVideo);
        observer.disconnect();
      }
    },
    { rootMargin: "140% 0px" },
  );

  if (!reducedMotion) observer.observe(proofAct);

  records.forEach((record) => {
    const markReady = () => {
      record.ready = true;
      record.video.closest<HTMLElement>(".lf-film-sheet")?.classList.add("is-ready");
    };
    record.video.addEventListener("loadeddata", markReady);
    record.video.addEventListener("seeked", markReady);
  });

  const update = () => {
    scrollFrame = 0;
    const heroProgress = heroAct
      ? clamp(
          (window.scrollY - heroAct.offsetTop) /
            Math.max(heroAct.offsetHeight - window.innerHeight, 1),
        )
      : 0;
    const proofProgress = clamp(
      (window.scrollY - proofAct.offsetTop) /
        Math.max(proofAct.offsetHeight - window.innerHeight, 1),
    );
    const restaurantHandoff = clamp(
      (window.scrollY - (proofAct.offsetTop - window.innerHeight * 0.52)) /
        Math.max(window.innerHeight * 0.52, 1),
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

    if (records[0]) records[0].target = restaurantProgress;
    if (records[1]) records[1].target = medSpaProgress;

    if (!reducedMotion) {
      if (heroAct && heroStage) {
        const heroPinEnd =
          heroAct.offsetTop + heroAct.offsetHeight - window.innerHeight;
        const exitHold = clamp(
          window.scrollY - heroPinEnd,
          0,
          window.innerHeight,
        );
        heroStage.style.transform = `translate3d(0, ${exitHold.toFixed(2)}px, 0)`;
        heroStage.style.display =
          window.scrollY >= proofAct.offsetTop ? "none" : "";
      }
      if (heroMedia) {
        const isMobile = window.matchMedia("(max-width: 720px)").matches;
        if (heroScrim) {
          heroScrim.style.opacity = (
            1 - windowed(heroProgress, 0.28, 0.52)
          ).toFixed(3);
        }
        if (isMobile) {
          const baseWidth = Math.max(window.innerWidth - 32, 1);
          const baseHeight = baseWidth * (9 / 16);
          const fillScale = Math.max(
            window.innerWidth / baseWidth,
            window.innerHeight / baseHeight,
          );
          const expansion = windowed(heroProgress, 0.035, 0.58);
          const subjectTrack = 1 - windowed(heroProgress, 0.02, 0.3);
          const scale = 1 + (fillScale - 1) * expansion;
          const baseCenterY = 76 + baseHeight / 2;
          const translateY = (window.innerHeight / 2 - baseCenterY) * expansion;
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
        (window.scrollY - methodAct.offsetTop) /
          Math.max(methodAct.offsetHeight - window.innerHeight, 1),
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

  const tickVideos = () => {
    if (destroyed) return;
    records.forEach((record) => {
      if (!record.ready || record.video.seeking) return;
      record.current = record.target;
      const targetTime = clamp(record.current, 0, 0.999) * (record.video.duration || 1);
      if (Math.abs(record.video.currentTime - targetTime) > 0.025) {
        try {
          record.video.currentTime = targetTime;
        } catch {
          // The next frame retries after the browser has enough media buffered.
        }
      }
    });
    videoFrame = window.requestAnimationFrame(tickVideos);
  };

  const primeVideos = () => {
    records.forEach(({ video }) => {
      if (!video.src) return;
      const play = video.play();
      if (play) play.then(() => video.pause()).catch(() => undefined);
    });
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  window.addEventListener("pointerdown", primeVideos, { passive: true, once: true });
  update();
  videoFrame = window.requestAnimationFrame(tickVideos);

  return () => {
    destroyed = true;
    mediaController.abort();
    observer.disconnect();
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", requestUpdate);
    window.removeEventListener("pointerdown", primeVideos);
    if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    if (videoFrame) window.cancelAnimationFrame(videoFrame);
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

    const instance = window.ScrollCraft.mount(root);
    const cleanupMotion = setupLocalFirstMotion(root);
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
