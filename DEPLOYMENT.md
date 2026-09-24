# LocalFirst replacement release

The six-page site retains Cloudflare Worker `localfirst`, dashboard-managed custom domains, the GitHub repository and historical commits.

## Local checks

```sh
npm ci
npm run lint
npm run cf:build
npm run start -- --port 3002
# In another terminal:
npm run seo:check -- http://localhost:3002
```

`npm run cf:preview` builds and previews the Workers runtime locally. `npm run cf:deploy` publishes to the existing Worker and requires authorized Cloudflare credentials. Do not deploy merely to test a build.

## Hosting

- Repository: `nikaveli/LocalFirst`, production branch `main`.
- Keep the existing Worker/domain connection; do not delete or recreate hosting.
- Build: `npm run cf:build`; Next `output: "export"` creates `out/`. Entry: `worker.mjs`, a small redirect/legacy-media handler delegating to the ASSETS binding. No OpenNext/Next server runs on page requests.
- `worker.mjs` normalizes production HTTP/www page requests to HTTPS apex before asset serving. `npm run test:redirect` verifies six canonicalization scenarios; `npm run test:hosting` covers static pages, HEAD/404, and legacy range requests. Localhost and workers.dev preview URLs remain usable.
- Verify Git-connected deployment settings. A successful push is not proof of deployment.
- Existing daily/manual GitHub workflow preserved, using the repository's `CLOUDFLARE_API_TOKEN` secret. It does not fetch fresh reviews in the rebuild: reviews are static owner-supplied content.
- Contact opens an email draft to `nick.molina@icloud.com`. The old Resend sending backend is not used by the new design.
- Images are optimized at build/authoring time and served directly. No paid Images, Stream or R2 binding is required. The old OpenNext package/config is not part of the active deployment path.
- Do not commit environment files, tokens, `.dev.vars`, `.wrangler`, `.open-next`, raw footage or animation QA captures.

## Release gates

- [x] Next.js and Cloudflare production builds pass.
- [x] Workers runtime smoke test: 219 SEO checks, image/media availability, robots/sitemap, www redirect; home films reach readyState 4.
- [x] Required public assets are below 25 MiB each; no raw footage or QA captures included.
- [x] Dependency audit: zero known vulnerabilities; staged-source secret-pattern review found no matches.
- [x] Initial replacement deployed successfully through GitHub run `34549143030`, commit `a56f26f`.
- [x] Public Home/About/Contact/First Impressions render; three home films loaded; gallery playback tested; SMS/email destinations inspected without sending.
- [x] Check live metadata, robots/sitemap, DIY 404, www redirect and edge HTTP-to-HTTPS. Verified after run `34549702444`.
- [ ] Owner verifies reviews, credentials, price and hours.
- [ ] Search Console rendered inspection and sitemap submission.

See `SEO-AUDIT.md` for scores and limitations. Mobile speed is a known warning, not a completed Core Web Vitals pass.

## Performance and reliability release, September 24 (current)

- An observed production Error 1102 on the pricing page prompted removal of runtime Next/OpenNext rendering. All six routes, robots and sitemap now export to `out/`. The small existing-domain Worker handles canonical redirects and legacy video ranges, then delegates directly to Cloudflare static assets. It preserves real 404 responses; do not enable SPA fallback.
- New mobile frames: `/media/frames/v3/`, 722 frames at the original 1920×1080 / 24 fps, WebP quality 76 from source masters. Verified on-disk total: 59.36 MB versus 102.44 MB for v2 (42% smaller). No 4K upscaling or change to the hero's authored crop/timing. Encoder progress previously undercounted concurrent file writes; its byte counter is now corrected.
- Cache ceiling: four decoded bitmaps and two pending requests per scene. One late request can finish during a swipe; stale speculative requests yield to the current target. Hidden/offscreen scenes release frames; posters are decoded from the existing image element without duplicate network fetches. Later scenes warm near their entrances.
- Desktop films use `/media/hq-v3/`, original resolution, CRF 21 / GOP 12 with fast-start: 30.62 MB versus 51.99 MB (41% smaller). Old versioned files remain available for cached clients and rollback. New versioned assets use immutable caching.
- Header/footer logo is a pre-sized 480×160 WebP (15,552 bytes). All images are served directly, not through an unconfigured runtime image optimizer. Automatic route prefetch is disabled so pricing/about/contact do not download homepage media in the background.
- Portal pixel analysis is deferred until near the viewport and only scans the selected letter when noninteractive. Idle pointer effects stop requesting animation frames. Phones do not run the empty vendor native-video RAF loop. Authored section heights are reserved before hydration.
- Release checks: `npm run test:motion` (14), `npm run test:hosting` (4), `npm run test:redirect` (6), lint, production export, `npm run seo:check -- http://localhost:3002`, and browser checks at phone and desktop sizes. Browser viewport testing is not physical-iPhone or field Core Web Vitals certification.
- Keep `npm run cf:deploy` in the existing daily/manual workflow. It now runs `next build` then `wrangler deploy`; no new hosting project or paid binding is needed. Rollback point before this release: `c20a7df` (normal revert/redeploy or Cloudflare deployment history; never force-push).

### Historical mobile scrub release checks

Run `npm run test:motion` and `node scripts/mobile-scroll-check.mjs <preview-url> --assert-stable` in addition to the SEO checks. The deployed `/scrub-media/{localfirst,restaurant,med-spa}-mobile.mp4` endpoints must return **206**, a matching `Content-Range`, and exactly two bytes for `Range: bytes=0-1`. The endpoint is served by the custom Worker before Next.js; the Next route provides local preview parity. It only exposes the three public mobile movies. No Cloudflare Images/Stream/R2 service was provisioned.

### Mobile frame-sequence follow-up

The owner still observed frozen restaurant/spa frames after the native-video fix. Mobile/coarse-pointer homepages now use a canvas sequence for each of the three films. Desktop keeps native video. Existing byte-range endpoints remain for backward compatibility; the new mobile homepage must issue **no MP4 requests**.

- Run `node scripts/mobile-handoff-check.mjs <preview-url> --slow` (installed Playwright WebKit) and again with `--chrome` (installed Google Chrome). The probe starts scrolling without waiting for media, blocks native `play()` forever, delays frame responses, and checks actual painted indices forward and backward in all three scenes.
- Run `npm run test:motion`: verifies all 722 frame assets, bounded decoding/concurrency, late-response paint (rather than starvation), fast reversal, cleanup, and existing video/range regressions.
- WebP assets under `/media/frames/v1/` derive from the existing approved mobile footage: 240 hero + 241 restaurant + 241 spa, 1280×720 at 24 fps, 19.09 MiB total. Only a moving window is requested/decoded; max 16 cached bitmaps and four requests per scene. Offscreen scenes retain one bitmap. Reduced motion requests no sequence or scrub video.
- Generate assets with `node scripts/build-scrub-frames.mjs` (ffmpeg and sharp required). Use a new version directory for future footage changes.
- Local Turbopack hit a sandbox port-binding error. Supported local packaging fallback: `NEXT_PRIVATE_STANDALONE=true npx next build --webpack && npx opennextjs-cloudflare build --skipNextBuild`. GitHub's existing Linux build command is unchanged.
- Before publishing, inspect mobile/desktop/reduced contact sheets and verify closing copy after a height-only viewport resize. Emulation does not certify physical iPhone smoothness or Core Web Vitals.
- Immediate previous production rollback point: `2599b72a4d86fa8740732597fc8b3ae91d662279`. Roll back through a normal revert/redeploy or Cloudflare deployment history if missing media, navigation failures, or persistent 5xx responses appear.

## Full-HD quality upgrade, September 11

- Current mobile sequence version: `/media/frames/v2/`, extracted directly from the supplied 1920×1080 masters at 24 fps and WebP quality 88. Do not derive future frames from the compressed mobile MP4s. The old v1 assets remain for cached clients/rollback.
- Canvas backing dimensions are now 1920×1080. Cache ceiling reduced from 16 to 8 decoded bitmaps; four concurrent requests and late-frame recovery retained. No change to zoom/crop/transition timing.
- All three first-frame posters use the same full-HD sequence assets. Desktop uses `/media/hq-v2/*.mp4`, CRF 17 / GOP 8, audio stripped, fast-start, no spatial upscaling. Each file is below Cloudflare's 25 MiB asset limit.
- Reduced motion loads only those static first-frame posters; it must not create canvas players, load later sequence frames, or fetch scrub MP4s.
- Generation commands: `node scripts/build-scrub-frames.mjs` and `node scripts/build-hq-videos.mjs`. Master footage is local-only; generated web assets are committed. Mobile sequences total 64.30 MiB if every frame is fetched; progressive loading normally fetches only frames near scroll targets. Desktop films total 49.58 MiB. Higher quality increases bandwidth; test against actual cellular conditions before claiming universal smoothness.
- Quality verification: `node scripts/hero-quality-check.mjs <url> <temporary-output-directory>` captures DPR-3 phone opening, zoomed hero, restaurant, and spa states. Inspect these in addition to the existing motion and viewport checks.
- True 4K requires higher-resolution source footage. Enlarging these 1080p masters does not recover detail. No AI upscaling or invented image detail is included.
- Previous production rollback point for this release: `393768255d1a75af9e36f65a3fdc40dca41642ff`.

## Rollback

Pre-rebuild production commit: `be09226c638bde79f95aa0e18189a1c4231e3930`. Preserve it in history. For persistent 5xx errors, broken navigation/contact access or missing media, restore the previous Cloudflare deployment or revert the replacement commit through Git and redeploy. Do not force-push. Recheck crawl settings after rollback: the old version has issues documented in this audit.
