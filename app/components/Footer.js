export default function Footer() {
  return (
    <footer className="lf-section" style={{ paddingBlock: '72px' }}>
      <div className="lf-shell">
        <div className="lf-divider" style={{ marginBottom: 56 }} />

        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <img
              src="/assets/localfirst-logo-light.png"
              alt="LocalFirst"
              style={{ height: 44, width: 'auto', marginBottom: 16, display: 'block' }}
            />
            <p className="lf-body" style={{ fontSize: 15, marginBottom: 4 }}>
              No Business Left Behind
            </p>
            <p className="lf-body" style={{ fontSize: 14, color: 'var(--color-muted)' }}>
              Colorado · Denver / Aurora Metro
            </p>
          </div>

          <div>
            <div className="lf-eyebrow lf-eyebrow--soft" style={{ marginBottom: 16 }}>
              Sitemap
            </div>
            <ul className="space-y-2.5 text-[15px]">
              <li><a href="/" className="opacity-80 hover:opacity-100">Home</a></li>
              <li><a href="/first-impressions" className="opacity-80 hover:opacity-100">First Impressions</a></li>
              <li><a href="/diy-google-profile" className="opacity-80 hover:opacity-100">DIY Google Profile</a></li>
              <li><a href="/about" className="opacity-80 hover:opacity-100">About</a></li>
              <li><a href="/contact" className="opacity-80 hover:opacity-100">Contact</a></li>
            </ul>
          </div>

          <div>
            <div className="lf-eyebrow lf-eyebrow--soft" style={{ marginBottom: 16 }}>
              Contact
            </div>
            <ul className="space-y-2.5 text-[15px]">
              <li>
                <a href="tel:3035240591" className="opacity-90 hover:opacity-100">
                  303-524-0591
                </a>
              </li>
              <li>
                <a href="mailto:nicholas@localfirstonline.com" className="opacity-80 hover:opacity-100">
                  nicholas@localfirstonline.com
                </a>
              </li>
            </ul>
            <div className="mt-6 text-[13px]" style={{ color: 'var(--color-muted)' }}>
              Google Local Guide · Level 7
              <br />
              BBB A+ Accredited
            </div>
          </div>
        </div>

        <div
          className="text-center text-[12px] mt-14"
          style={{ color: 'var(--color-muted)', letterSpacing: '0.04em' }}
        >
          © 2026 LocalFirst · All rights reserved · Colorado, USA
        </div>
      </div>
    </footer>
  );
}
