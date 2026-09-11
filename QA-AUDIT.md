# LocalFirst website QA and corrections

Date: September 10, 2026

## Outcome and scope

Audited and corrected the local Next.js website. All four content routes were rechecked after the changes, in the rendered browser and in the final production build. Nothing was deployed or committed. Existing unrelated work was preserved.

This is a local QA pass, not a claim of certification on every browser or physical device. The limitations below remain part of the handoff.

## Page inventory

| Route | Sections and interactions inspected |
| --- | --- |
| `/` | Header, original hero, restaurant/spa sequence, concrete glass title card, Google reviews, LOCAL portal, customer profile checklist, orange overlapping CTA, horizontal method panels, founder, offer, closing CTA/footer, all five SMS links |
| `/about` | Header/intro, founder story/portrait, four credential cards, Colorado section, closing actions, footer |
| `/contact` | Header/intro, contact information, concrete form card, required and invalid states, email-draft explanation, footer |
| `/first-impressions` | Intro, all 15 video cards, playback/pause, closing actions, footer |
| `/diy` / unmatched routes | Branded 404 with home/contact recovery links and noindex; DIY was not restored |

## Responsive coverage

The four content pages were measured in the rendered production site at each of these viewports:

1920×1080, 1440×900, 1280×800, 1024×768, 900×900, 768×1024, 600×900, 430×932, 390×844, 375×812, 320×740, and 844×390 landscape.

Final result: **48 combinations, no measured document horizontal overflow, one H1 per page, and no measured intrinsic text overflow** in the checked headings, paragraphs, and links. Intentional horizontal-pan content was excluded from that text-overflow test.

Manual screenshot review covered desktop and phone layouts on all four pages, the tablet gallery, wide desktop About, landscape content, complete supporting-page sections after their entrances, the homepage film sequence, and the orange covering transition. Measurements across all sizes are not a substitute for watching every animation on real hardware.

## Findings and corrections

### High priority

- **Mobile navigation disappeared.** Added a shared keyboard-accessible menu on all pages, with active-page indication, expanded state, outside-click dismissal, Escape dismissal with focus restoration, and close-on-navigation/desktop-resize behavior.
- **Scroll entrances caused off-canvas content and 320px overflow.** Clipped horizontal animation travel at the page boundary without changing the vertical sticky scroll container; removed a fixed 320px minimum that overflowed when the scrollbar consumed viewport width.
- **Motion distances were captured at the original viewport size.** Made scene and side entrances responsive functions and refreshed them when layout changes. GSAP now responds to reduced-motion preference changes and reverts route-scoped animations cleanly.
- **Homepage engine had no destruction API.** Added document navigation when entering/leaving the homepage. This preserves the vendor engine and prevents its document listeners/timeline from lingering on supporting pages. Navigation was exercised across all four pages.
- **Gallery playback lacked proper controls and could reject uncaught play promises.** Added native buttons with descriptive play/pause labels and state, keyboard activation, guarded desktop hover preview, handled playback failures, and pause on blur/offscreen/hidden document. All 15 videos were activated and reached readyState 4 with no media errors observed.
- **Homepage action copy contradicted the SMS buttons.** Replaced remaining booking language around the profile/closing CTA with text-to-start wording. All five home buttons retain `Update Now` and the existing SMS destination/body.
- **Contact form implied direct sending.** Renamed the action to `Open email draft`, explained that the visitor must send it from their email app, and removed the same-day-reply promise. No test email or text was sent.
- **Unsupported Google ranking implications.** Removed claims that a Local Guide's contribution automatically creates source trust or a ranking signal. Kept the on-site service proposition and user-supplied credentials.

### Refinements

- Unified standard section containers around an 80rem maximum and shared fluid page gutters; retained narrower reading measures and full-bleed film/sheet sections.
- Applied the existing Instrument Serif display family to About and Contact headings; loaded its real italic font rather than relying on synthetic italics.
- Standardized supporting CTA typography, navigation labels, phone/menu hit areas, and small-screen header-button wrapping.
- Preserved the existing First Impressions uppercase sans-serif lead treatment as an intentional exception from the earlier recreation request.
- Corrected grammar, terminology, capitalization, missing inline whitespace, and over-absolute claims in First Impressions. Added a semantic gallery heading above its H3 card titles.
- Used one matching logo source across the pages, with responsive image sizing/optimization instead of shipping the full unoptimized logo on supporting pages.
- Added a skip link and main-content target to each route, stronger focus treatment, larger footer-link targets, and 16px form inputs with autocomplete.
- Added required-field whitespace validation. Browser tests confirmed empty required fields, invalid email addresses, and whitespace-only names are rejected and focus the relevant field.
- Shortened reveal staggers while keeping the existing choreography. Removed the gallery CSS transform transition that competed with GSAP entrance transforms.
- Added a branded missing-page state instead of the framework's default error presentation.
- Restarted the development preview after detecting stale compiled global styles; checked the production stylesheet separately.

## Preserved creative decisions

- Original home hero footage, composition, video timing, and hero-to-restaurant-to-spa choreography were not redesigned.
- Concrete `#C5BAAA`, Craft `#806D61`, Bright Brick `#EE7828`, and Graphite `#2C2C2C` remain the palette.
- Concrete card surfaces and the requested glass treatment remain.
- Reviews stay near the top; founder content stays near the bottom.
- LOCAL glyph portal, continuous covering orange sheet, and horizontal method sequence remain.
- Existing gallery businesses, imagery, review excerpts, service pricing, and contact details remain.
- The closing headline remains: “The next person searching should see your best first impression.”

## Verification evidence

- Production build: passed, all four routes plus the missing-page route generated.
- TypeScript: passed.
- ESLint: zero errors; 12 existing unused-variable warnings remain in the two supplied Scrollcraft engine copies, which were not edited.
- Git whitespace check: passed.
- Browser checks: mobile navigation, route transitions, Escape/focus, form validation, all gallery media, responsive typography/layout, and visible closing content.
- Scrollcraft Chrome runs: desktop 1440×900 (47 sampled frames), mobile 390×844 (33), reduced motion (26). Their automated checks reported no dead scroll, no frozen engine-managed scrub clip, and measured cue contrast above 4.5:1. Contact sheets were visually inspected.
- Temporary evidence: `/private/tmp/localfirst-qa-desktop/`, `/private/tmp/localfirst-qa-mobile/`, `/private/tmp/localfirst-qa-reduced/`, each with `report.json`, numbered screenshots, and `sheet.png`.
- The harness does not sample every non-engine section, and its contact sheets show missing closing copy despite the normal browser rendering it. The closing section and orange profile sheet were therefore checked separately in the browser, where the headline, body, and CTA were visible and the orange sheet continued moving over the preceding text.
- Gallery videos now load on interaction, not all at page load. Logos are served through responsive image optimization. No performance score or bandwidth simulation is claimed.

## Remaining limitations and owner checks

- Tested through the in-app Chromium browser and the Scrollcraft installed-Chrome harness. Safari, Firefox, Edge, physical iOS Safari, and Android Chrome still need device/browser testing. Viewport resizing is not physical-device testing.
- The homepage reduced-motion fallback was rendered by the harness. Supporting-page reduced-motion behavior uses the shared responsive GSAP setup and CSS, but was not separately exercised with browser media emulation.
- SMS/mailto destinations and form-draft construction were inspected; actual delivery and OS-specific mail/text handler behavior were deliberately not tested. The contact form still requires a configured email app and is not a backend delivery form.
- Review count/rating and credentials are existing owner-provided claims, not a newly verified live Google/BBB feed. Confirm they remain current before launch. Price and business hours were also preserved.
- Video quality was preserved. The three main desktop videos total roughly 30 MB; no throttled-network, CPU, battery, memory-profile, or field Core Web Vitals benchmark was performed.
- Intro/scroll snapshots can capture a reveal mid-fade. Final-state checks and manual scrolling were used in addition to screenshots; the available tests do not prove every frame is smooth on slower hardware.

The entire four-page site was rechecked after corrections. The remaining real-device and delivery checks prevent calling this universally production-certified.

## Mobile hero follow-up — September 10, 2026

Owner reported stuttering on iPhone 17 Pro Max in Chrome. This is a behavioral fix, not a redesign; original movies, crop/zoom composition, copy, and section handoffs are retained. Scrollcraft's supplied engine remains unmodified.

- Isolated mobile zoom changes caused by using live `innerHeight` while the browser toolbar expands/collapses. The page-local camera now uses stable stage geometry, measured outside the scroll paint.
- Added a mobile-only hero seek scheduler. Its time-based clock advances independently of asynchronous video decoding, coalesces pending seeks to the latest target, seeks at the footage's 30 fps boundaries, and stops scheduling while idle/offscreen/hidden. Restaurant/spa use the same scheduler.
- Priming retries after media readiness and on later touches instead of consuming the one available gesture before a video has loaded. Reduced motion still fetches no scrub films.
- Later films warm progressively instead of all three competing at startup. The hero poster now has high fetch priority. The original mobile files already have dense four-frame GOPs; lower-quality experimental encodes were not shipped.
- Production `/media/*-mobile.mp4` range probes returned the entire movie with HTTP 200. Added a narrow `/scrub-media/` Worker route for the three mobile movies, with real 206/416 handling and matching local preview behavior. It uses existing assets and no new external service. Each allowlisted movie is under 7 MB.
- Real document-size changes now refresh the engine's cached act positions as well as page-local geometry, preventing stale closing-section offsets after resizing.
- `npm run test:motion`: 11 deterministic scheduler/range regression tests. Also checked production builds, types/lint, 221 SEO checks, byte-range responses for all three movies, and Scrollcraft desktop/mobile/reduced contact sheets.
- `scripts/mobile-scroll-check.mjs` uses installed Chrome with a 440×956 touch viewport. It checks continuous video advancement, height-change zoom stability, runtime errors, overflow, and closing-copy visibility. These are emulated Chrome checks, **not physical iOS validation**; CPU-throttled runs on this host were unstable and are not a field-performance claim.

The owner should reload the deployed site in Chrome on the iPhone and confirm forward/reverse scrubbing, quick swipes, and the hero-to-restaurant handoff. Real-device confirmation and field Core Web Vitals remain open.

## Mobile canvas follow-up — September 10, 2026

The owner reported that the native-video release still freezes after the first scene, then displays one restaurant frame and one spa frame before leaving the hero. Desktop browser video tests did not reproduce the physical-device failure. Following the explicitly requested Scroll World skill's documented persistent-scrub fallback, all three mobile scenes now draw pre-extracted frames from the same original footage. No new AI media, paid service, hero redesign, timing change, or vendor-engine modification was introduced.

- Mobile no longer depends on video autoplay permission, priming promises, seek completion, or native MP4 decoding. Canvas paint drives verification state only after `drawImage` succeeds.
- Added progressive target-first loading, directional prefetch, a 16-bitmap cache ceiling per scene, four concurrent requests per scene, bounded retries/timeouts, stale-jump cancellation, background/offscreen release, and full cleanup. No full-movie bitmap preloading.
- The first implementation failed a 120 ms delayed-response test: rejecting frames that arrived behind the target starved the canvas during continuous scrolling. Corrected it to retain and paint useful late frames, with a deterministic regression test that fails on that original implementation.
- WebKit delayed-response verification then painted 108 hero / 53 restaurant / 44 spa frames going forward, and 123 / 38 / 37 going backward. All scenes reached their ending footage and returned to the beginning. Native `play()` was deliberately left pending forever; no MP4 requests or runtime errors occurred.
- Chrome delayed-response verification also passed all three forward/reverse checks without native video requests. Host headless Chrome throughput is substantially lower than WebKit; these counts prove advancement, not a physical-device frame-rate guarantee.
- Motion suite: 13 passing tests, including complete asset inventory. Local production TypeScript/webpack build and OpenNext Worker packaging passed. Lint: zero errors, the same 12 supplied-engine warnings.
- Local production SEO smoke test: 223 checks passed (four routes, internal links, metadata, schema, assets). Frame-sequence implementation does not change SEO/content or other pages.
- Temporary mobile sheet `/private/tmp/lf-frame-mobile/sheet.png` inspected: original centered-phone crop, expansion, restaurant/spa transitions, concrete surfaces, and later sections remain. The known screenshot-harness closing-copy limitation still requires the independent viewport/closing check.
- Independent viewport/closing check passed: 83 painted hero frames, no MP4 requests, no overflow/errors, unchanged hero transform after height-only resize, and all closing headline lines at opacity 1. Desktop contact sheet `/private/tmp/lf-frame-desktop/sheet.png` inspected; its original native hero advanced normally and sampled cue contrast cleared 4.5:1.

Physical iPhone 17 Pro Max Chrome confirmation remains necessary after deployment. No claim of universal smoothness, field Core Web Vitals, or Low Power Mode device validation is made.
