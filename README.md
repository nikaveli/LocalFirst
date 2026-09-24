# LocalFirst

Colorado on-site photography, video, 360 imagery and Google Business Profile optimization. Next.js, TypeScript, GSAP and Scrollcraft.

## Develop

```sh
npm ci
npm run dev
```

Pages: `/`, `/about`, `/contact`, `/first-impressions`, `/google-business-profile-resources`, `/google-business-profile-visual-refresh`. DIY routes intentionally return 404.

## Verify and release

- `npm run build`: Next.js static production export to `out/`.
- `npm run start -- --port 3002`: preview the actual Cloudflare asset/redirect Worker locally.
- `npm run lint`: source checks.
- `npm run test:motion`, `npm run test:hosting`, `npm run test:redirect`: media, serving and redirect regressions.
- `npm run seo:check -- http://localhost:3002`: regression checks against a running production server.
- `npm run cf:build`: build for the existing Cloudflare Worker.
- `npm run cf:preview`: local Workers runtime preview.

Read `DEPLOYMENT.md`, `SEO-AUDIT.md`, and `QA-AUDIT.md` before release. Keep the existing hosting project and domain connection.

Home Update Now buttons open SMS drafts; Contact opens an email draft. Neither silently sends messages. Reviews are static owner-supplied content. Fonts are Inter and Instrument Serif.

Raw footage, design references and generated animation QA captures are excluded from production source control. The approved hero and brand palette remain intact. Pages are prebuilt: there is no Next.js rendering or image transformation at request time, avoiding the previous Cloudflare resource-limit failures.
