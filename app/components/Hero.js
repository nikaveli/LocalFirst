'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TrustStrip from './TrustStrip';

export default function Hero() {
  const root = useRef(null);
  const videoRef = useRef(null);

  // GSAP entrance animations
  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: '(prefers-reduced-motion: reduce)',
        normal: '(prefers-reduced-motion: no-preference)',
      },
      (ctx) => {
        const { reduceMotion } = ctx.conditions;
        const els = root.current.querySelectorAll('[data-reveal]');

        if (reduceMotion) {
          gsap.set(els, { opacity: 1, y: 0 });
          return;
        }

        gsap.fromTo(
          els,
          { opacity: 0, y: 28, rotateX: -6, transformPerspective: 800 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.1,
            stagger: 0.08,
            ease: 'power3.out',
          }
        );
      }
    );

    return () => mm.revert();
  }, []);

  // Boomerang playback: play forward → on `ended`, step currentTime backward
  // via rAF until we hit 0, then play forward again. Repeats indefinitely.
  // playbackRate can't go negative in browsers, so we drive reverse manually.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let rafId = null;
    let reversing = false;
    let lastT = 0;

    const startReverse = () => {
      reversing = true;
      lastT = performance.now();
      const step = (now) => {
        if (!reversing || !v) return;
        const dt = (now - lastT) / 1000;
        lastT = now;
        const next = v.currentTime - dt;
        if (next <= 0.02) {
          v.currentTime = 0;
          reversing = false;
          v.play().catch(() => {});
          return;
        }
        v.currentTime = next;
        rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
    };

    const onEnded = () => {
      try { v.currentTime = Math.max(0, v.duration - 0.05); } catch {}
      v.pause();
      startReverse();
    };

    v.addEventListener('ended', onEnded);

    return () => {
      v.removeEventListener('ended', onEnded);
      reversing = false;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden"
      style={{
        paddingTop: 140,
        paddingBottom: 96,
        minHeight: '94vh',
        background: '#000',
      }}
    >
      {/* Background video — covers the entire hero */}
      <video
        ref={videoRef}
        src="/assets/LocalFirst_hero.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* Overlay stack — keeps text legible and ties video to the brand palette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(95deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0.4) 100%)',
          zIndex: 1,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.85) 100%)',
          zIndex: 1,
        }}
      />
      {/* Subtle brand blue wash at the top-left to anchor mood */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: '-15%',
          top: '0',
          width: '70%',
          height: '70%',
          background:
            'radial-gradient(ellipse at 30% 30%, rgba(153,187,234,0.10), transparent 65%)',
          zIndex: 1,
        }}
      />

      {/* Hero content */}
      <div
        className="lf-shell relative h-full flex flex-col"
        style={{ zIndex: 2, minHeight: 'calc(94vh - 236px)' }}
      >
        <div className="max-w-[720px] flex-1 flex flex-col justify-center">
          <div data-reveal className="lf-eyebrow" style={{ marginBottom: 24 }}>
            AI Local Search Is Live
          </div>

          <h1 data-reveal className="lf-h1" style={{ marginBottom: 28 }}>
            Customers are asking AI to find a business like yours.
            <br />
            <span className="lf-italic" style={{ color: 'var(--color-primary)' }}>
              Are you the answer?
            </span>
          </h1>

          <p
            data-reveal
            className="lf-body"
            style={{
              maxWidth: 560,
              marginBottom: 36,
              color: 'rgba(255,255,255,0.88)',
            }}
          >
            Every day, AI decides which Colorado businesses get recommended
            and which ones get skipped. The signal it reads is your
            Google Business Profile. Most local profiles are invisible.
            Yours doesn&rsquo;t have to be.
          </p>

          <div data-reveal className="flex flex-wrap items-center gap-5">
            <a href="#checklist" className="lf-btn lf-btn--primary lf-btn--lg">
              Pull Up Your Profile Right Now →
            </a>
            <a
              href="tel:3035240591"
              className="text-[15px]"
              style={{ color: 'rgba(255,255,255,0.78)' }}
            >
              Or call Nicholas directly:{' '}
              <span style={{ color: 'var(--color-on-dark)' }}>303-524-0591</span>
            </a>
          </div>
        </div>

        <div data-reveal className="mt-16">
          <TrustStrip />
        </div>
      </div>

      {/* Floating credibility chips over the video */}
      <div
        data-reveal
        className="hidden md:flex items-center gap-2.5"
        style={{
          position: 'absolute',
          top: 112,
          right: 32,
          padding: '8px 14px',
          borderRadius: 999,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(10px) saturate(140%)',
          WebkitBackdropFilter: 'blur(10px) saturate(140%)',
          border: '1px solid var(--color-line-strong)',
          zIndex: 3,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--color-up)',
            boxShadow: '0 0 12px var(--color-up)',
          }}
        />
        <span
          className="text-[12px] font-medium"
          style={{ color: 'var(--color-on-dark)', letterSpacing: '0.04em' }}
        >
          Live · Posting to Google Business Profile
        </span>
      </div>

      <div
        data-reveal
        className="lf-card--glass lf-card hidden md:flex items-center gap-3"
        style={{
          position: 'absolute',
          right: 32,
          bottom: 180,
          padding: '14px 18px',
          borderRadius: 14,
          zIndex: 3,
          width: 'max-content',
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: 'var(--color-primary)',
            display: 'grid',
            placeItems: 'center',
            color: 'var(--color-on-primary)',
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          L7
        </div>
        <div>
          <div className="text-[13px] font-medium">Google Local Guide</div>
          <div
            className="text-[11px]"
            style={{ color: 'var(--color-on-dark-soft)' }}
          >
            Top 1% Contributor
          </div>
        </div>
      </div>
    </section>
  );
}
