"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const media = "/media/restaurant-home";

export default function RestaurantHeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const portrait = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let inView = true;
    let mounted = true;
    let ready = false;

    const selectSource = () => {
      const src = `${media}/hero-${portrait.matches ? "mobile" : "desktop"}-v2.mp4`;
      if (element.getAttribute("src") !== src) {
        element.src = src;
        element.load();
      }
    };
    const update = () => {
      if (!ready || reduced.matches || connection?.saveData || manuallyPaused.current || !inView || document.hidden) {
        element.pause();
        return;
      }
      selectSource();
      void element.play().catch(() => { /* Poster and play control remain available on iOS. */ });
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { threshold: 0.05 });
    observer.observe(element);
    portrait.addEventListener("change", update);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    // Finish the critical poster/font requests and allow their first paint before
    // the background movie starts competing for bandwidth on mobile connections.
    const poster = element.parentElement?.querySelector('img');
    let frame = 0;
    void Promise.all([document.fonts.ready, poster?.decode().catch(() => {})]).then(() => {
      if (!mounted) return;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => { if (mounted) { ready = true; update(); } });
      });
    });
    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      portrait.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      element.pause();
      element.removeAttribute("src");
      element.load();
    };
  }, []);

  const toggle = () => {
    const element = video.current;
    if (!element) return;
    if (element.paused) {
      manuallyPaused.current = false;
      if (!element.getAttribute("src")) {
        element.src = `${media}/hero-${window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop"}-v2.mp4`;
      }
      void element.play().catch(() => {});
    } else {
      manuallyPaused.current = true;
      element.pause();
    }
  };

  return (
    <>
      <div className="rh-hero-media" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet={`${media}/hero-mobile-540-v2.webp 540w, ${media}/hero-mobile-1080-v2.webp 1080w`} sizes="100vw" />
          <img src={`${media}/hero-desktop-1920-v2.webp`} srcSet={`${media}/hero-desktop-960-v2.webp 960w, ${media}/hero-desktop-1920-v2.webp 1920w`} sizes="100vw" alt="" width="1920" height="1080" fetchPriority="high" />
        </picture>
        <video ref={video} muted loop playsInline preload="none" onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      </div>
      <button className="rh-video-control" type="button" onClick={toggle} aria-label={playing ? "Pause film" : "Play film"}>
        {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
        <span>{playing ? "Pause film" : "Play film"}</span>
      </button>
    </>
  );
}
