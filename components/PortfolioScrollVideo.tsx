"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { mountPortfolioScroll } from "@/lib/portfolio-scroll";
import { portfolioMedia } from "@/lib/website-portfolio";

export default function PortfolioScrollVideo({ id, name, next, children }: { id: string; name: string; next: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const base = `${portfolioMedia}/${id}`;
  useEffect(() => {
    if (root.current) return mountPortfolioScroll(root.current, base);
  }, [base]);
  return <div ref={root} className="wd-preview" data-mode="static" data-project={id}>
    <div className="wd-preview-stage" data-preview-stage>
      {children}
      <div className="wd-preview-media">
      <div className="wd-preview-caption"><span>{name}</span><a href={`#project-${id}`}>Project details ↑</a></div>
      <div className="wd-preview-frame">
        <video muted playsInline preload="none" aria-label={`${name} website walkthrough`} />
        <picture className="wd-preview-poster">
          <source media="(max-width: 767px)" srcSet={`${base}-mobile.webp`} />
          {/* Explicit responsive posters work with the static export. */}
          <img src={`${base}-desktop.webp`} alt={`${name} website design preview`} width={1920} height={1080} loading="lazy" decoding="async" />
        </picture>
        <div className="wd-preview-progress" aria-hidden="true"><span data-preview-progress /></div>
      </div>
      <div className="wd-preview-tools">
        <span data-preview-status>Website walkthrough preview</span>
        <div><button type="button" data-preview-play hidden>Play preview</button><a href={next}>Skip preview <span aria-hidden="true">↓</span></a></div>
      </div>
      </div>
    </div>
  </div>;
}
