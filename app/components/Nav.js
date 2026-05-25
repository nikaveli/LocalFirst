'use client';

import { useEffect, useState } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
        background: scrolled ? 'rgba(0,0,0,0.6)' : 'transparent',
        borderBottom: scrolled
          ? '1px solid var(--color-line)'
          : '1px solid transparent',
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

        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium">
          <a href="/" className="opacity-80 hover:opacity-100 transition-opacity">Home</a>
          <a href="/first-impressions" className="opacity-80 hover:opacity-100 transition-opacity">
            First Impressions
          </a>
          <a href="/diy-google-profile" className="opacity-80 hover:opacity-100 transition-opacity">
            DIY Google Profile
          </a>
          <a href="/about" className="opacity-80 hover:opacity-100 transition-opacity">About</a>
          <a href="/contact" className="opacity-80 hover:opacity-100 transition-opacity">Contact</a>
        </nav>

        <a href="tel:3035240591" className="lf-btn lf-btn--ghost text-sm" style={{ padding: '12px 20px' }}>
          303-524-0591
        </a>
      </div>
    </header>
  );
}
