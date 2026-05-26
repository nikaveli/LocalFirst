'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/first-impressions', label: 'First Impressions' },
  { href: '/diy-google-profile', label: 'DIY Google Profile' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Scroll-state for the backdrop blur.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open + Escape to close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: scrolled || open ? 'blur(14px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled || open ? 'blur(14px) saturate(140%)' : 'none',
          background: open
            ? 'rgba(0,0,0,0.92)'
            : scrolled
              ? 'rgba(0,0,0,0.6)'
              : 'transparent',
          borderBottom:
            scrolled || open ? '1px solid var(--color-line)' : '1px solid transparent',
        }}
      >
        <div className="lf-shell flex items-center justify-between" style={{ height: 72 }}>
          <a href="/" aria-label="LocalFirst home" className="flex items-center gap-2.5">
            <img
              src="/assets/localfirst-logo-light.png"
              alt="LocalFirst"
              style={{ height: 40, width: 'auto', display: 'block' }}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="opacity-80 hover:opacity-100 transition-opacity"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop phone CTA */}
          <a
            href="tel:3035240591"
            className="hidden md:inline-flex lf-btn lf-btn--ghost text-sm"
            style={{ padding: '12px 20px' }}
          >
            303-524-0591
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: '1px solid var(--color-line-strong)',
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: 'var(--color-on-dark)',
              cursor: 'pointer',
            }}
          >
            <Burger open={open} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="md:hidden fixed inset-0 z-40"
        style={{
          background: 'rgba(0, 0, 0, 0.96)',
          backdropFilter: 'blur(14px) saturate(140%)',
          WebkitBackdropFilter: 'blur(14px) saturate(140%)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 280ms var(--ease-out-soft)',
          paddingTop: 72,
        }}
      >
        <div
          className="lf-shell flex flex-col h-full"
          style={{ paddingTop: 32, paddingBottom: 40 }}
        >
          <nav className="flex flex-col gap-1" aria-label="Primary">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block lf-italic"
                style={{
                  fontSize: 'clamp(34px, 8vw, 48px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  paddingBlock: 12,
                  color: 'var(--color-on-dark)',
                  borderBottom: '1px solid var(--color-line)',
                  transform: open ? 'translateY(0)' : 'translateY(16px)',
                  opacity: open ? 1 : 0,
                  transition: `transform 460ms var(--ease-out-soft) ${i * 60 + 80}ms, opacity 460ms var(--ease-out-soft) ${i * 60 + 80}ms`,
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div
            className="mt-auto pt-8 flex flex-col gap-4"
            style={{
              transform: open ? 'translateY(0)' : 'translateY(16px)',
              opacity: open ? 1 : 0,
              transition: `transform 460ms var(--ease-out-soft) ${LINKS.length * 60 + 100}ms, opacity 460ms var(--ease-out-soft) ${LINKS.length * 60 + 100}ms`,
            }}
          >
            <div
              className="lf-eyebrow"
              style={{ color: 'var(--color-on-dark-soft)', marginBottom: 4 }}
            >
              Easiest way to reach me
            </div>
            <a
              href="tel:3035240591"
              onClick={() => setOpen(false)}
              className="lf-btn lf-btn--primary lf-btn--lg"
              style={{ width: '100%' }}
            >
              Call Nicholas — 303-524-0591
            </a>
            <a
              href="mailto:nicholas@localfirstonline.com"
              onClick={() => setOpen(false)}
              className="text-[14px] text-center"
              style={{ color: 'var(--color-on-dark-soft)' }}
            >
              nicholas@localfirstonline.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function Burger({ open }) {
  // Two bars that morph into an X. Pure CSS transforms, no SVG needed.
  const bar = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 20,
    height: 1.5,
    background: 'currentColor',
    borderRadius: 1,
    transition: 'transform 280ms var(--ease-out-soft)',
    transformOrigin: 'center',
  };
  return (
    <span
      aria-hidden
      style={{
        position: 'relative',
        width: 20,
        height: 16,
        display: 'inline-block',
      }}
    >
      <span
        style={{
          ...bar,
          transform: open
            ? 'translate(-50%, -50%) rotate(45deg)'
            : 'translate(-50%, calc(-50% - 5px))',
        }}
      />
      <span
        style={{
          ...bar,
          transform: open
            ? 'translate(-50%, -50%) rotate(-45deg)'
            : 'translate(-50%, calc(-50% + 5px))',
        }}
      />
    </span>
  );
}
