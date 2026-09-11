# LocalFirst replacement release

The four-page rebuild replaces the old application while retaining Cloudflare Worker `localfirst`, dashboard-managed custom domains, the GitHub repository and historical commits.

## Local checks

```sh
npm ci
npm run lint
npm run cf:build
npm run start -- -p 3002
# In another terminal:
npm run seo:check -- http://localhost:3002
```

`npm run cf:preview` builds and previews the Workers runtime locally. `npm run cf:deploy` publishes to the existing Worker and requires authorized Cloudflare credentials. Do not deploy merely to test a build.

## Hosting

- Repository: `nikaveli/LocalFirst`, production branch `main`.
- Keep the existing Worker/domain connection; do not delete or recreate hosting.
- Build: `npm run cf:build`; entry: `worker.mjs`, wrapping the generated `.open-next/worker.js`; assets: `.open-next/assets`.
- `worker.mjs` normalizes production HTTP/www page requests to HTTPS apex before Next.js routing. `npm run test:redirect` verifies six canonicalization scenarios. Localhost and workers.dev preview URLs remain usable.
- Verify Git-connected deployment settings. A successful push is not proof of deployment.
- Existing daily/manual GitHub workflow preserved, using the repository's `CLOUDFLARE_API_TOKEN` secret. It does not fetch fresh reviews in the rebuild: reviews are static owner-supplied content.
- Contact opens an email draft to `nick.molina@icloud.com`. The old Resend sending backend is not used by the new design.
- No Cloudflare Images binding was provisioned. Without one, the adapter returns original images; production image delivery/performance can differ from local Next optimization. Enabling paid transformations needs an owner decision.
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

### Mobile scrub release checks

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

## Rollback

Pre-rebuild production commit: `be09226c638bde79f95aa0e18189a1c4231e3930`. Preserve it in history. For persistent 5xx errors, broken navigation/contact access or missing media, restore the previous Cloudflare deployment or revert the replacement commit through Git and redeploy. Do not force-push. Recheck crawl settings after rollback: the old version has issues documented in this audit.
