'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useReveal } from '../../components/useReveal';
import { sendContact } from '../_actions/sendContact';

const INITIAL = { ok: null, error: null, field: null };

export default function ContactContent() {
  const ref = useReveal({ stagger: 0.07, y: 24 });
  const formRef = useRef(null);
  const [state, formAction] = useActionState(sendContact, INITIAL);

  // Reset the form on successful send.
  useEffect(() => {
    if (state?.ok === true && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

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
            {state?.ok === true ? (
              <SuccessState />
            ) : (
              <>
                <div className="lf-eyebrow" style={{ marginBottom: 14 }}>
                  Send a message
                </div>
                <h2
                  className="lf-h3"
                  style={{ marginBottom: 28, color: 'var(--color-on-dark)' }}
                >
                  Tell me about your business.
                </h2>

                <form ref={formRef} action={formAction} className="space-y-5" noValidate>
                  {/* Honeypot — real users never fill this. */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: 1,
                      height: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <label>
                      Website (leave empty)
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <Field label="Your name" required hasError={state?.field === 'name'}>
                    <input type="text" name="name" required placeholder="Nicholas Molina" />
                  </Field>

                  <Field label="Business name">
                    <input type="text" name="business" placeholder="Tacos La Morenita" />
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Phone" required hasError={state?.field === 'phone'}>
                      <input type="tel" name="phone" required placeholder="303-555-0100" />
                    </Field>
                    <Field label="Email" hasError={state?.field === 'email'}>
                      <input type="email" name="email" placeholder="you@business.com" />
                    </Field>
                  </div>

                  <Field label="What's going on?" required hasError={state?.field === 'message'}>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="A sentence or two about your business and what you're hoping for."
                    />
                  </Field>

                  {state?.error && (
                    <div
                      role="alert"
                      className="text-[14px]"
                      style={{
                        color: 'var(--color-down)',
                        background: 'rgba(207,32,47,0.08)',
                        border: '1px solid rgba(207,32,47,0.35)',
                        borderRadius: 10,
                        padding: '10px 14px',
                      }}
                    >
                      {state.error}
                    </div>
                  )}

                  <SubmitButton />

                  <p
                    className="text-[12px] text-center"
                    style={{ color: 'var(--color-muted-soft)' }}
                  >
                    I usually reply same-day. Or just call —{' '}
                    <a href="tel:3035240591" style={{ color: 'var(--color-on-dark-soft)' }}>
                      303-524-0591
                    </a>
                    .
                  </p>
                </form>
              </>
            )}

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
              input[data-err='1'],
              textarea[data-err='1'] {
                border-color: var(--color-down);
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

function Field({ label, required, hasError, children }) {
  // Inject data-err onto child input/textarea when validation fails on this field.
  const child = hasError
    ? Object.assign({}, children, {
        props: { ...children.props, 'data-err': '1' },
      })
    : children;

  return (
    <label className="block">
      <span
        className="text-[12px] block mb-2"
        style={{
          color: hasError ? 'var(--color-down)' : 'var(--color-on-dark-soft)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        {label}
        {required && (
          <span style={{ color: 'var(--color-accent)' }}> *</span>
        )}
      </span>
      {child}
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="lf-btn lf-btn--primary lf-btn--lg w-full"
      disabled={pending}
      style={pending ? { opacity: 0.7, cursor: 'wait' } : undefined}
    >
      {pending ? 'Sending…' : 'Send to Nicholas →'}
    </button>
  );
}

function SuccessState() {
  return (
    <div className="text-center" style={{ padding: '24px 0' }}>
      <div
        aria-hidden
        className="grid place-items-center mx-auto"
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'rgba(5,177,105,0.12)',
          border: '1px solid var(--color-up)',
          color: 'var(--color-up)',
          marginBottom: 20,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12l5 5L20 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="lf-eyebrow" style={{ marginBottom: 12 }}>
        Message sent
      </div>
      <h2 className="lf-h3" style={{ marginBottom: 14, color: 'var(--color-on-dark)' }}>
        Got it. I&rsquo;ll be in touch.
      </h2>
      <p
        className="text-[16px]"
        style={{ color: 'var(--color-on-dark-soft)', lineHeight: 1.55, maxWidth: 360, margin: '0 auto' }}
      >
        I usually reply same-day. If it&rsquo;s urgent, the phone is faster —{' '}
        <a
          href="tel:3035240591"
          style={{
            color: 'var(--color-on-dark)',
            borderBottom: '1px solid var(--color-accent)',
          }}
        >
          303-524-0591
        </a>
        .
      </p>
    </div>
  );
}
