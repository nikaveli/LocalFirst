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
            What do they see when they find your business?
          </h2>
          <p>
            Before they call, visit, book, or buy, customers look at your photos,
            reviews, hours, and services. Does what they see give them a reason to choose you?
          </p>
        </div>

        <ol className="lf-audit-list" aria-label="Customer profile check">
          <li>
            <span>01</span>
            <div>
              <strong>They search for what you sell.</strong>
              <p>Your profile helps them find your business and understand what you offer.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>They look at your business.</strong>
              <p>Current photos show your products, your services, and the space they will visit.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>They decide whether to trust it.</strong>
              <p>Reviews, accurate information, and recent activity help them know what to expect.</p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <strong>They take the next step.</strong>
              <p>Help them feel confident calling, visiting, booking, or buying.</p>
            </div>
          </li>
        </ol>

        <aside className="lf-audit-reveal">
          <div className="lf-audit-reveal__inner">
            <span>An outdated first impression</span>
            <h3>Show them your business today.</h3>
            <p>
              Old photos and missing details can leave a customer unsure. They may
              move on before you ever know they were interested. Let&apos;s improve what they see.
            </p>
            <a className="lf-cta lf-cta--ink" href={updateHref}>
              Text Nicholas <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>
    </GlyphPortal>
  );
}
