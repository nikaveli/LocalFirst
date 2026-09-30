"use client";

import { useEffect, useRef } from "react";

const media = "/media/website-hero/v1";

export default function WebsiteHeroVideo() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = root.current;
    const video = host?.querySelector('video');
    if (!host || !video) return;
    const portrait = matchMedia('(max-width: 767px)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let mounted = true, inView = false, ready = false, frame = 0;
    const update = () => {
      if (!mounted) return;
      if (reduced.matches || connection?.saveData) {
        video.pause();
        delete host.dataset.playing;
        if (video.hasAttribute('src')) { video.removeAttribute('src'); video.load(); }
        return;
      }
      if (!ready || !inView || document.hidden) { video.pause(); return; }
      const source = `${media}/${portrait.matches ? 'mobile' : 'desktop'}.mp4`;
      if (video.getAttribute('src') !== source) {
        delete host.dataset.playing;
        video.src = source;
        video.load();
      }
      void video.play().catch(() => { /* Keep the poster if the device blocks autoplay. */ });
    };
    const playing = () => { host.dataset.playing = 'true'; };
    const error = () => { delete host.dataset.playing; };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { threshold: .05 });
    observer.observe(host);
    video.addEventListener('playing', playing);
    video.addEventListener('error', error);
    portrait.addEventListener('change', update);
    reduced.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    // Let the responsive still and page fonts paint before starting the movie.
    void Promise.all([document.fonts.ready, host.querySelector('img')?.decode().catch(() => {})]).then(() => {
      if (!mounted) return;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => { if (mounted) { ready = true; update(); } });
      });
    });
    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      video.removeEventListener('playing', playing);
      video.removeEventListener('error', error);
      portrait.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, []);

  return <div ref={root} className="wd-hero-film" aria-hidden="true">
    <video autoPlay muted loop playsInline preload="none" disablePictureInPicture disableRemotePlayback tabIndex={-1} />
    <picture>
      <source media="(max-width: 767px)" srcSet={`${media}/mobile-540.webp 540w, ${media}/mobile-1080.webp 1080w`} sizes="(max-width: 767px) calc(100vw - 40px), 380px" />
      <img src={`${media}/desktop-1920.webp`} srcSet={`${media}/desktop-960.webp 960w, ${media}/desktop-1920.webp 1920w`} sizes="(max-width: 1000px) 93vw, 46vw" width={1920} height={1080} alt="" fetchPriority="high" />
    </picture>
  </div>;
}
