'use client';

import { useState } from 'react';
import { useReveal } from './useReveal';

const ROWS = [
  'Posted this week',
  'Added fresh photos',
  'Responded to a review',
];

export default function ProfileChecklist() {
  const ref = useReveal({ stagger: 0.1 });
  const [checked, setChecked] = useState([false, false, false]);

  const toggle = (i) =>
    setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));

  return (
    <section id="checklist" ref={ref} className="lf-section">
      <div className="lf-shell" style={{ maxWidth: 760 }}>
        <div data-reveal className="lf-eyebrow" style={{ marginBottom: 16 }}>
          A 10-second test
        </div>

        <h2 data-reveal className="lf-h2" style={{ marginBottom: 28 }}>
          Pull up your Google Business Profile right now.{' '}
          <span style={{ color: 'var(--color-on-dark-soft)', fontWeight: 500 }}>
            Answer honestly — when was the last time you did any of these?
          </span>
        </h2>

        <div data-reveal className="space-y-3 mt-10">
          {ROWS.map((row, i) => {
            const isOn = checked[i];
            return (
              <button
                key={row}
                type="button"
                onClick={() => toggle(i)}
                className="lf-card w-full flex items-center gap-5 text-left"
                style={{
                  padding: '18px 22px',
                  borderRadius: 14,
                  borderColor: isOn
                    ? 'var(--color-up)'
                    : 'var(--color-line)',
                  transition: 'border-color 220ms var(--ease-out-soft), background 220ms',
                  background: isOn ? 'rgba(5,177,105,0.06)' : 'var(--color-card)',
                }}
                aria-pressed={isOn}
              >
                <span
                  aria-hidden
                  className="grid place-items-center flex-shrink-0"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: `1.5px solid ${isOn ? 'var(--color-up)' : 'var(--color-down)'}`,
                    color: isOn ? 'var(--color-up)' : 'var(--color-down)',
                    fontSize: 18,
                    fontWeight: 600,
                    transition: 'color 200ms, border-color 200ms',
                  }}
                >
                  {isOn ? '✓' : '✕'}
                </span>
                <span
                  className="text-[17px] md:text-[18px] font-medium"
                  style={{ color: 'var(--color-on-dark)' }}
                >
                  {row}
                </span>
              </button>
            );
          })}
        </div>

        <div
          data-reveal
          className="mt-14"
          style={{
            borderLeft: `3px solid var(--color-accent)`,
            paddingLeft: 24,
          }}
        >
          <p
            className="lf-h3"
            style={{ color: 'var(--color-on-dark)', marginBottom: 10 }}
          >
            If you&rsquo;re hesitating, your profile is already marked inactive.
          </p>
          <p
            className="text-[17px]"
            style={{ color: 'var(--color-on-dark-soft)', lineHeight: 1.55 }}
          >
            And to AI, inactive means invisible. Invisible means your
            competitor gets the call.{' '}
            <span className="lf-italic" style={{ color: 'var(--color-accent)' }}>
              Every single week.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
