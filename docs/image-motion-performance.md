# Image zoom performance fix — 2026-09-30

Scope: homepage `#work` / `#signature` and Visual Refresh `#on-location`.
Portfolio videos, native touch scrolling, animation distances, and copy are unchanged.

## Cause and change

The shared GSAP Flip zoom used `scale: false`, animating layout width and height
on every scroll frame. It now allocates the destination-size layer once and uses
transform scaling. The child photo counter-scales to preserve its intrinsic
proportions and object-position crop; corner radii compensate for mask scaling.
Intrinsic image dimensions make setup independent of lazy-image decode timing.
GSAP context cleanup restores the original styles on navigation/resize.

## Measurements

Local production build, Chromium, 2.4-second zoom sweeps. Mobile viewport 440×800
with 4× CPU throttling; desktop 1440×1000 without throttling.

| Zoom | Mobile layouts before → after | Desktop layouts before → after |
| --- | --- | --- |
| Home / work | 145 → 2 | 147 → 3 |
| Home / signature | 148 → 5 | 149 → 5 |
| Visual Refresh | 143 → 0 | 144 → 0 |

Animated layout-size variants fell from approximately 145 to 1. The final measured
runs had no frames over 33 ms. The original device-specific visible stutter was
not reproduced in emulation, so these results prove reduced rendering work, not
a guarantee for every physical iPhone. Physical-device confirmation remains useful.

## Verification

- Production build, targeted ESLint, motion unit tests, and SEO audit.
- Existing restaurant-home and site-uniform regression suites.
- Dedicated Chromium/WebKit desktop/mobile tests: forward/reverse zoom,
  image proportions, constant layout dimensions, route navigation, no page errors,
  no horizontal overflow, reduced motion, and no-JavaScript fallback.
- Half-zoom/full-zoom/story screenshots inspected for crop and text readability.

Reproduce with `node scripts/image-motion-profile.mjs http://localhost:3005` and
`node scripts/image-motion-check.mjs http://localhost:3005 webkit` (omit `webkit`
for Chromium). Chrome's installed executable path is configured in these local
browser scripts. The geometry unit test runs in `npm run test:motion` and CI.

## Release safety

No database, credentials, dependencies, or media changes. Deploy only after
browser assertions and CI pass. Recheck both published pages after deployment.
Rollback if photos distort/disappear, navigation produces errors, or scroll
behavior regresses: revert this change and redeploy the previous production
revision `eabf7681f8007b9eb473fb4a246978afcd5b7389` through the existing workflow.

Reference: [GSAP Flip.fit scale option](https://gsap.com/docs/v3/Plugins/Flip/static.fit%28%29/).

## Follow-up: full-screen → text-overlay handoff

The owner localized remaining stutter to the story phase, rather than expansion.
That phase still counteracted scrolling with a per-frame container translation
and enlarged the child image another 25%. The initial benchmark only measured
expansion and did not validate this phase.

The story now uses a native CSS sticky background with an identical cover crop.
At full size the timeline switches visibility from the zoom layer to that
background. There is no second zoom and no JS counter-scroll. Text remains in
normal document flow, and the background leaves naturally with the section.
The same existing image URL is reused; no additional asset is generated.

Browser regression checks now explicitly sample the story phase: the background
stays fixed-size and stationary, text advances by the scroll distance, and the
old layer's transform does not change. Checks also verify the reverse handoff
and reduced-motion/no-JavaScript fallback. Physical iPhone validation is still
needed to confirm the owner's particular stutter is gone.

For this follow-up alone, rollback to `628592549d4e3fd91806bc3d2c0b614c85bec09d`.
