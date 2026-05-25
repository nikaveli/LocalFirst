'use client';

import { useRef } from 'react';
import { srcFor } from '../_data/visits';

export default function VisitCard({ visit, dataReveal = true }) {
  const videoRef = useRef(null);

  const onEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  };

  const onLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    try { v.currentTime = 0; } catch {}
  };

  return (
    <article
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

        {/* Subtle hover glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)',
          }}
        />

        {/* Type / visit badge */}
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
          Hover to play
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
