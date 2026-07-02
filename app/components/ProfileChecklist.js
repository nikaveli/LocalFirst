'use client';

import { useState } from 'react';
import { useReveal } from './useReveal';

// Flyer Side 1 "Check Your Own Numbers" walkthrough. Every step is public
// data the owner can verify on their own phone — evidence before explanation.
const STEPS = [
  'Open Google Maps and search your own business.',
  'Tap Photos, then By Owner. Tap any photo.',
  'At the bottom, tap your business name.',
  'Tap See All Photos. There are your view counts. That&rsquo;s real customers looking.',
  'Back on your profile: find your last post. How old is it?',
  'Count the reviews with no reply.',
];

export default function ProfileChecklist() {
  const ref = useReveal({ stagger: 0.1 });
  const [checked, setChecked] = useState(() => STEPS.map(() => false));

  const toggle = (i) =>
    setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));

  return (
    <section id="checklist" data-bg-hue="0" ref={ref} className="lf-section">
      <div className="lf-shell" style={{ maxWidth: 760 }}>
        <div data-reveal className="lf-eyebrow" style={{ marginBottom: 16 }}>
          Check your own numbers — right now
        </div>

        <h2 data-reveal className="lf-h2" style={{ marginBottom: 28 }}>
          Pull up your Google Business Profile.{' '}
          <span style={{ color: 'var(--color-on-dark-soft)', fontWeight: 500 }}>
            Two minutes on your phone. Every number is public.
          </span>
        </h2>

        <div data-reveal className="space-y-3 mt-10">
          {STEPS.map((step, i) => {
            const isOn = checked[i];
            return (
              <button
                key={step}
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
                    border: `1.5px solid ${isOn ? 'var(--color-up)' : 'var(--color-line-strong)'}`,
                    color: isOn ? 'var(--color-up)' : 'var(--color-primary)',
                    fontSize: isOn ? 18 : 13,
                    fontWeight: 600,
                    transition: 'color 200ms, border-color 200ms',
                  }}
                >
                  {isOn ? '✓' : String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-[17px] md:text-[18px] font-medium"
                  style={{ color: 'var(--color-on-dark)' }}
                  dangerouslySetInnerHTML={{ __html: step }}
                />
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
            If those numbers surprised you, you&rsquo;re not alone.
          </p>
          <p
            className="text-[17px]"
            style={{ color: 'var(--color-on-dark-soft)', lineHeight: 1.55 }}
          >
            About 7 out of 10 local businesses set up their profile once and
            never touch it again. The attention is already there.{' '}
            <span className="lf-italic" style={{ color: 'var(--color-accent)' }}>
              The profile just isn&rsquo;t converting it.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
