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

## Rollback

Pre-rebuild production commit: `be09226c638bde79f95aa0e18189a1c4231e3930`. Preserve it in history. For persistent 5xx errors, broken navigation/contact access or missing media, restore the previous Cloudflare deployment or revert the replacement commit through Git and redeploy. Do not force-push. Recheck crawl settings after rollback: the old version has issues documented in this audit.
