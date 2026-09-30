# Website development page

- Route: `/website-development`
- Page and messaging: `app/website-development/page.tsx`
- Page-scoped styles: `app/website-development/website-development.css`
- Project names and descriptions: `lib/website-portfolio.ts`
- Shared menu entry: `lib/navigation.ts`

## Reserved content

The hero uses Nick's supplied desktop and portrait films via
`components/WebsiteHeroVideo.tsx`. It autoplays muted, loops, and has no visible
controls as requested. Reduced-motion/data-saver visitors get a still; video
pauses offscreen or in a hidden tab. `scripts/build-website-hero.mjs` creates
full-HD playback copies and first-frame posters from the untouched 4K originals.
Website pricing is kept
in `#website-pricing` with no invented numbers or Offer schema. Existing
photography and monthly prices are unchanged.

## Portfolio films

`scripts/build-website-portfolio.mjs` reads the original desktop/mobile MP4 pairs
from the supplied Portfolio Scroll Videos folder. It creates versioned derivatives
in `public/media/website-portfolio/v1`, preserving the originals:

- Desktop: native 1920×1080, H.264, CRF 20, GOP 8.
- Mobile: 720×1280, H.264, CRF 23, GOP 4.
- Posters: actual first frames from each encoded film.

All files are below the static host's 25 MiB asset limit. Once these URLs are
published, use a new version directory for replacement films because v1 is
immutable-cached.

`lib/portfolio-scroll.ts` adapts the installed scroll-world reference engine to
five independent, section-scoped React previews. It retains blob-based seeks,
seek coalescing, poster-first rendering, and iOS priming, and adds unmount cleanup,
offscreen resource release, explicit playback, and retry. No new scenes or
connectors were generated; the user supplied complete website walkthroughs.

Video downloads begin near the preview, never at the top of this page. Reduced
motion and data saver use stills unless the visitor explicitly requests playback.
Native touch scrolling is preserved. Videos never obscure their project copy.
Each project's heading, description, visit link, and film now share one sticky
stage. Film size is budgeted from the actual copy height so the information stays
visible throughout the scrub. Short landscape screens put copy beside the film;
screens too small for both use the natural-flow still/manual-play fallback instead
of pinning inaccessible content. Touch toolbar resizes do not change the track.

## Verification

Build first, then point these checks at the local static preview:

```sh
npm run test:portfolio -- http://localhost:3005
npm run test:portfolio -- http://localhost:3005 webkit
npm run test:uniform -- http://localhost:3005
npm run seo:check -- http://localhost:3005
```

Checks cover all five films, forward/reverse seeks, fast scroll changes,
4× CPU-throttled Chrome mobile, WebKit phone emulation, orientation changes,
manual playback, no-JavaScript/reduced-motion/data-saver fallbacks, download
failure/retry, and client-side route cleanup. Emulation is not a physical iPhone
test; review on the actual device before publishing.

The unrelated untracked `Praxis/` project is excluded from this site's TypeScript
and ESLint checks. None of its files are part of this change.

## Release checks — September 30, 2026

Before publishing, verify the production build, redirect/motion/hosting unit tests,
SEO/link checks, shared navigation checks, and the portfolio/hero browser suites.
Mobile verification includes WebKit phone emulation, narrow 320px menus, portrait
390px/440px layouts, landscape navigation, and reduced-motion fallbacks.
The previous production source is `e202e9a`. If the new route, navigation, or media
fails in production, revert the website-development release commit and rerun the
existing `daily-refresh.yml` deployment workflow. There are no database changes.
