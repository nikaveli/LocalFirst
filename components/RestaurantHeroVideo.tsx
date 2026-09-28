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

    const selectSource = () => {
      const src = `${media}/hero-${portrait.matches ? "mobile" : "desktop"}.mp4`;
      if (element.getAttribute("src") !== src) {
        element.src = src;
        element.load();
      }
    };
    const update = () => {
      if (reduced.matches || connection?.saveData || manuallyPaused.current || !inView || document.hidden) {
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
    // Wait for the poster to paint before competing for network bandwidth.
    const frame = requestAnimationFrame(() => { if (mounted) update(); });
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
        element.src = `${media}/hero-${window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop"}.mp4`;
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
          <source media="(max-width: 767px)" srcSet={`${media}/hero-mobile.webp`} />
          <img src={`${media}/hero-desktop.webp`} alt="" width="1920" height="1080" fetchPriority="high" />
        </picture>
        <video ref={video} muted loop playsInline preload="none" onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      </div>
      <button className="rh-video-control" type="button" onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"}>
        {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
        <span>{playing ? "Pause film" : "Play film"}</span>
      </button>
    </>
  );
}
