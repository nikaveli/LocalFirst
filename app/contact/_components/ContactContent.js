'use client';

import { useState } from 'react';
import { useReveal } from '../../components/useReveal';

export default function ContactContent() {
  const ref = useReveal({ stagger: 0.07, y: 24 });

  const [form, setForm] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = `LocalFirst inquiry — ${form.business || form.name || 'website form'}`;
    const lines = [
      `From: ${form.name}`,
      form.business && `Business: ${form.business}`,
      form.phone && `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      '',
      form.message,
    ].filter(Boolean);
    const body = lines.join('\n');
    const href = `mailto:nicholas@localfirstonline.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  };

  return (
    <section ref={ref} className="lf-section" style={{ paddingTop: 48 }}>
      <div className="lf-shell">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          {/* Left: direct contact info */}
          <div className="space-y-8">
            <div data-reveal>
              <div className="lf-eyebrow lf-eyebrow--soft" style={{ marginBottom: 12, display: 'block' }}>
                Phone
              </div>
              <a
                href="tel:3035240591"
                className="lf-italic block"
                style={{
                  fontSize: 'clamp(38px, 4.6vw, 52px)',
                  lineHeight: 1,
                  color: 'var(--color-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                303-524-0591
              </a>
              <div
                className="text-[14px] mt-2"
                style={{ color: 'var(--color-on-dark-soft)' }}
              >
                Tap to call. I answer it myself.
              </div>
            </div>

            <div data-reveal>
              <div className="lf-eyebrow lf-eyebrow--soft" style={{ marginBottom: 12, display: 'block' }}>
                Email
              </div>
              <a
                href="mailto:nicholas@localfirstonline.com"
                className="text-[18px] md:text-[20px]"
                style={{
                  color: 'var(--color-on-dark)',
                  borderBottom: '1px solid var(--color-accent)',
                  paddingBottom: 4,
                  display: 'inline-block',
                  wordBreak: 'break-all',
                }}
              >
                nicholas@localfirstonline.com
              </a>
            </div>

            <div data-reveal>
              <div className="lf-eyebrow lf-eyebrow--soft" style={{ marginBottom: 12, display: 'block' }}>
                Service Area
              </div>
              <p
                className="text-[17px]"
                style={{ color: 'var(--color-on-dark)', lineHeight: 1.5 }}
              >
                Denver / Aurora metro on-site.
                <br />
                <span style={{ color: 'var(--color-on-dark-soft)' }}>
                  Front Range available by arrangement. Colorado only.
                </span>
              </p>
            </div>

            <div data-reveal>
              <div className="lf-eyebrow lf-eyebrow--soft" style={{ marginBottom: 12, display: 'block' }}>
                Hours
              </div>
              <p
                className="text-[17px]"
                style={{ color: 'var(--color-on-dark)', lineHeight: 1.5 }}
              >
                Monday – Saturday
                <br />
                <span style={{ color: 'var(--color-on-dark-soft)' }}>
                  8 AM – 7 PM Mountain Time
                </span>
              </p>
            </div>

            <div
              data-reveal
              className="text-[13px] pt-8"
              style={{
                borderTop: '1px solid var(--color-line)',
                color: 'var(--color-muted-soft)',
                letterSpacing: '0.04em',
              }}
            >
              No pressure. No contracts. If it&rsquo;s not a fit, I&rsquo;ll tell you.
            </div>
          </div>

          {/* Right: form card */}
          <div
            data-reveal
            className="lf-card"
            style={{
              padding: 'clamp(28px, 3.5vw, 40px)',
              borderRadius: 20,
            }}
          >
            <div className="lf-eyebrow" style={{ marginBottom: 14 }}>
              Send a message
            </div>
            <h2
              className="lf-h3"
              style={{ marginBottom: 28, color: 'var(--color-on-dark)' }}
            >
              Tell me about your business.
            </h2>

            <form onSubmit={onSubmit} className="space-y-5">
              <Field label="Your name" required>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Nicholas Molina"
                />
              </Field>

              <Field label="Business name">
                <input
                  type="text"
                  value={form.business}
                  onChange={update('business')}
                  placeholder="Tacos La Morenita"
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Phone" required>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="303-555-0100"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@business.com"
                  />
                </Field>
              </div>

              <Field label="What&rsquo;s going on?" required>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="A sentence or two about your business and what you&rsquo;re hoping for."
                />
              </Field>

              <button
                type="submit"
                className="lf-btn lf-btn--primary lf-btn--lg w-full"
              >
                {sent ? 'Opening your mail app…' : 'Send to Nicholas →'}
              </button>

              <p
                className="text-[12px] text-center"
                style={{ color: 'var(--color-muted-soft)' }}
              >
                Opens in your email app pre-filled. Or just call —{' '}
                <a href="tel:3035240591" style={{ color: 'var(--color-on-dark-soft)' }}>
                  303-524-0591
                </a>
                .
              </p>
            </form>

            <style jsx>{`
              input,
              textarea {
                width: 100%;
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid var(--color-line-strong);
                color: var(--color-on-dark);
                font: inherit;
                font-size: 15px;
                padding: 12px 14px;
                border-radius: 10px;
                outline: none;
                transition: border-color 200ms var(--ease-out-soft),
                  background 200ms;
              }
              input::placeholder,
              textarea::placeholder {
                color: var(--color-muted);
              }
              input:focus,
              textarea:focus {
                border-color: var(--color-primary);
                background: rgba(0, 0, 0, 0.5);
              }
              textarea {
                resize: vertical;
                font-family: inherit;
                line-height: 1.5;
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span
        className="text-[12px] block mb-2"
        style={{
          color: 'var(--color-on-dark-soft)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
        dangerouslySetInnerHTML={{
          __html: `${label}${required ? ' <span style="color:var(--color-accent)">*</span>' : ''}`,
        }}
      />
      {children}
    </label>
  );
}
