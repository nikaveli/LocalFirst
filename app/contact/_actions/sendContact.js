'use server';

import { Resend } from 'resend';

// Where messages from the contact form land.
const TO = 'nicholas@localfirstonline.com';

// Resend's onboarding domain works without verifying localfirstonline.com.
// Once Nicholas verifies the domain in Resend, swap this for forms@localfirstonline.com.
const FROM = 'LocalFirst Site <onboarding@resend.dev>';

/**
 * Server Action for the contact form.
 * Signature matches React 19's useActionState: (prevState, formData) => newState.
 *
 * Returns one of:
 *   { ok: true }
 *   { ok: false, error: string, field?: string }
 */
export async function sendContact(_prevState, formData) {
  // Honeypot: real users never see/touch this. Silently succeed if filled.
  if (formData.get('website')) {
    return { ok: true };
  }

  const name = (formData.get('name') || '').toString().trim();
  const business = (formData.get('business') || '').toString().trim();
  const phone = (formData.get('phone') || '').toString().trim();
  const email = (formData.get('email') || '').toString().trim();
  const message = (formData.get('message') || '').toString().trim();

  // Required-field validation. Email is intentionally optional — phone is the
  // hard requirement because Nicholas calls back.
  if (!name) return { ok: false, error: 'Please add your name.', field: 'name' };
  if (!phone) return { ok: false, error: 'A phone number is required.', field: 'phone' };
  if (!message) return { ok: false, error: 'Tell me a sentence or two about your business.', field: 'message' };

  // Very loose phone sanity check — at least 7 digits.
  if (phone.replace(/\D/g, '').length < 7) {
    return { ok: false, error: 'That phone number looks too short.', field: 'phone' };
  }

  // Optional email format check (only if they provided one).
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'That email address doesn’t look right.', field: 'email' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Soft fail — surface a clear, on-brand message and keep the phone CTA loud.
    return {
      ok: false,
      error:
        'Email service isn’t hooked up yet. Easiest way to reach me right now is the phone — 303-524-0591.',
    };
  }

  const subject = `LocalFirst inquiry — ${business || name}`;
  const text = [
    `From:     ${name}`,
    business && `Business: ${business}`,
    `Phone:    ${phone}`,
    email && `Email:    ${email}`,
    '',
    '— Message —',
    message,
    '',
    '—',
    'Sent from the localfirstonline.com contact form.',
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email || undefined,
      subject,
      text,
    });

    if (error) {
      return {
        ok: false,
        error: 'Something went wrong sending the message. Try again, or call 303-524-0591.',
      };
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: 'Couldn’t reach the mail server. Try again, or call 303-524-0591.',
    };
  }
}
