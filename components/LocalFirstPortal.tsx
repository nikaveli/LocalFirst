"use client";

import { ArrowUpRight } from "lucide-react";
import GlyphPortal from "@/components/ui/glyph-portal";

export default function LocalFirstPortal({ updateHref }: { updateHref: string }) {
  return (
    <GlyphPortal
      word="LOCAL"
      focusChar="O"
      interactive={false}
      annotations={false}
      scrollLength={1.05}
      fontFamily='"Arial Black", Arial, sans-serif'
      fontWeight={900}
      enterLabel="See the profile check"
      className="lf-glyph-portal"
      style={{
        "--gp-paper": "#2c2c2c",
        "--gp-ink": "#c5baaa",
        "--gp-field": "#c5baaa",
        "--gp-foreground": "#2c2c2c",
      }}
      background={
        <div
          className="lf-glyph-portal__field"
          aria-hidden="true"
        />
      }
    >
      <div id="profile" className="lf-section-shell lf-audit-grid lf-glyph-audit">
        <div className="lf-audit-intro">
          <p className="lf-kicker lf-kicker--dark">What customers see</p>
          <h2 id="audit-title">
            Someone hears about you. They look you up. Then they decide.
          </h2>
          <p>
            Your profile is already speaking. The only question is whether it says
            current, credible, and worth the drive.
          </p>
        </div>

        <ol className="lf-audit-list" aria-label="Customer profile check">
          <li>
            <span>01</span>
            <div>
              <strong>They open Google Maps.</strong>
              <p>Your listing becomes the front door before the front door.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>They scan your photos.</strong>
              <p>Old images quietly become evidence, even when they are no longer true.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>They check for life.</strong>
              <p>Recent posts and answered questions show that someone is paying attention.</p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <strong>They read how you respond.</strong>
              <p>Every thoughtful reply is another reason to trust the business behind the pin.</p>
            </div>
          </li>
        </ol>

        <aside className="lf-audit-reveal">
          <div className="lf-audit-reveal__inner">
            <span>Not a ranking report</span>
            <h3>What are customers seeing today?</h3>
            <p>
              Text me to update your Google Business Profile. We&apos;ll look at what
              customers see today and choose the clearest place to start.
            </p>
            <a className="lf-cta lf-cta--ink" href={updateHref}>
              Update Now <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>
    </GlyphPortal>
  );
}
