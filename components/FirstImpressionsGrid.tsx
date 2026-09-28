"use client";

import { useEffect, useRef, useState } from "react";

export type Visit = {
  business: string;
  city: string;
  slug: string;
};

function VisitCard({ visit }: { visit: Visit }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    setFailed(false);
    void video.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setFailed(true);
    });
  };

  const stop = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      play();
    } else {
      stop();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });
    const pauseWhenHidden = () => { if (document.hidden) video.pause(); };
    observer.observe(video);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      video.pause();
    };
  }, []);

  return (
    <article
      className="lf-visit-card"
      data-motion-card
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) play();
      }}
      onMouseLeave={stop}
      onBlur={stop}
    >
      <div className="lf-visit-card__media">
        <video
          ref={videoRef}
          src={`/media/first-impressions/${visit.slug}.mp4`}
          muted
          loop
          playsInline
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label={`${visit.business}, on-site visit by Nicholas`}
        />
        {/* Native lazy images avoid downloading all fifteen video posters on entry. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lf-visit-card__poster" hidden={playing}
          src={`/media/first-impressions/posters-v1/${visit.slug}-640.webp`}
          srcSet={`/media/first-impressions/posters-v1/${visit.slug}-640.webp 640w, /media/first-impressions/posters-v1/${visit.slug}-960.webp 960w`}
          sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
          alt="" width={640} height={1138} loading="lazy" decoding="async" />
        <div className="lf-visit-card__shade" aria-hidden="true" />
        <button type="button" className="lf-visit-card__control" onClick={toggle}
          aria-label={`${playing ? "Pause video" : "Play video"}: ${visit.business}`} aria-pressed={playing}>
          <span className="lf-visit-card__play"><b aria-hidden="true">{playing ? "Ⅱ" : "▶"}</b> {playing ? "Pause video" : "Play video"}</span>
        </button>
      </div>
      <div className="lf-visit-card__caption">
        <h3>{visit.business}</h3>
        <p>{visit.city} · May 2026</p>
        {failed && <p role="status">Video couldn&apos;t load. Select play to try again.</p>}
      </div>
    </article>
  );
}

export default function FirstImpressionsGrid({ visits }: { visits: Visit[] }) {
  return (
    <div className="lf-visit-grid">
      {visits.map((visit) => <VisitCard visit={visit} key={visit.slug} />)}
    </div>
  );
}
