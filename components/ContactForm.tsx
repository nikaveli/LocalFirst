"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const sendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const business = String(data.get("business") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    for (const field of ["name", "phone", "message"]) {
      const input = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement;
      if (!input.value.trim()) {
        input.setCustomValidity("Please complete this field.");
        input.reportValidity();
        return;
      }
    }

    const subject = `LocalFirst inquiry${business ? ` — ${business}` : ""}`;
    const body = [
      `Name: ${name}`,
      `Business: ${business || "Not provided"}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      "",
      message,
    ].join("\n");

    setStatus("Your email draft is ready. Send it from your email app to finish.");
    window.location.href = `mailto:nick.molina@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="lf-contact-form" onSubmit={sendEmail} onInput={(event) => {
      const input = event.target;
      if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
        input.setCustomValidity("");
      }
      if (status) setStatus("");
    }}>
      <label>
        <span>Your name <b>*</b></span>
        <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
      </label>
      <label>
        <span>Business name</span>
        <input name="business" type="text" autoComplete="organization" placeholder="Your business" />
      </label>
      <div className="lf-contact-form__row">
        <label>
          <span>Phone <b>*</b></span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@business.com" />
        </label>
      </div>
      <label>
        <span>What&apos;s going on? <b>*</b></span>
        <textarea
          name="message"
          rows={5}
          placeholder="A sentence or two about your business and what you’re hoping for."
          required
        />
      </label>
      <button type="submit">Open email draft <span aria-hidden="true">→</span></button>
      <p className="lf-contact-form__note">
        This opens your email app. Review the draft and send it to Nicholas. Prefer to call?{" "}
        <a href="tel:+13035240591">303-524-0591</a>.
      </p>
      <p className="lf-contact-form__status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
