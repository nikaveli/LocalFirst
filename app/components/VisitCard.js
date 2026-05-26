'use client';

import { useEffect, useRef, useState } from 'react';
import { srcFor, posterFor } from '../_data/visits';

/**
 * VisitCard
 *
 * Desktop (hover-capable pointer):
 *   - First frame shown via `poster` (JPG)
 *   - Hover the card → video plays
 *   - Mouse leave → pause + reset to 0
 *
 * Mobile / touch (no hover):
 *   - First frame shown via `poster`
 *   - IntersectionObserver: when ≥55% of the card is in viewport, autoplay (muted)
 *   - When the card scrolls out, pause + reset
 *   - Hover handlers are no-ops (cheap to leave wired up)
 *
 * Badge label adapts to input mode: "Hover to play" on desktop, "In view to play" on mobile.
 * Honors prefers-reduced-motion: no autoplay, no hover-play. Static poster only.
 */
export default function VisitCard({ visit, dataReveal = true }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  // Detect input mode once on mount.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hoverOk = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setIsTouch(!hoverOk);
  }, []);

  // Touch devices: autoplay when in view, pause when out.
  useEffect(() => {
    if (!isTouch) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const card = cardRef.current;
    const v = videoRef.current;
    if (!card || !v) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
          try { v.currentTime = 0; } catch {}
        }
      },
      { threshold: 0.55 }
    );

    io.observe(card);
    return () => io.disconnect();
  }, [isTouch]);

  const onEnter = () => {
    if (isTouch) return;
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  };

  const onLeave = () => {
    if (isTouch) return;
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    try { v.currentTime = 0; } catch {}
  };

  return (
    <article
      ref={cardRef}
      {...(dataReveal ? { 'data-reveal': true } : {})}
      className="lf-card overflow-hidden group"
      style={{ borderRadius: 18, padding: 0 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        style={{
          aspectRatio: '4 / 3',
          position: 'relative',
          background: `
            linear-gradient(160deg,
              hsla(${visit.hue}, 35%, 30%, 0.45) 0%,
              hsla(${visit.hue}, 25%, 12%, 0.85) 100%
            ),
            #000
          `,
          borderBottom: '1px solid var(--color-line)',
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          src={srcFor(visit)}
          poster={posterFor(visit)}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${visit.business} — on-site visit by Nicholas`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Bottom gradient — keeps the type badge legible on light video frames */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)',
          }}
        />

        {/* Type badge — label adapts to input mode */}
        <div
          className="absolute"
          style={{
            left: 12,
            top: 12,
            padding: '6px 12px',
            borderRadius: 999,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid var(--color-primary)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontWeight: 600,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
            <path d="M3 1.5v9l8-4.5z" />
          </svg>
          {isTouch ? 'Video' : 'Hover to play'}
        </div>
      </div>

      <div style={{ padding: '18px 20px 20px' }}>
        <div
          className="text-[17px] font-semibold"
          style={{
            color: 'var(--color-on-dark)',
            letterSpacing: '-0.01em',
            lineHeight: 1.25,
          }}
        >
          {visit.business}
          {visit.variant && (
            <span
              className="lf-italic ml-1.5"
              style={{ color: 'var(--color-primary)', fontSize: 14 }}
            >
              · {visit.variant}
            </span>
          )}
        </div>
        <div
          className="text-[13px] mt-1"
          style={{ color: 'var(--color-on-dark-soft)' }}
        >
          {visit.location} · {visit.date}
        </div>
      </div>
    </article>
  );
}
