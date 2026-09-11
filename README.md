# LocalFirst

Colorado on-site photography, video, 360 imagery and Google Business Profile optimization. Next.js, TypeScript, GSAP and Scrollcraft.

## Develop

```sh
npm ci
npm run dev
```

Pages: `/`, `/about`, `/contact`, `/first-impressions`. DIY routes intentionally return 404.

## Verify and release

- `npm run build`: Next.js production build.
- `npm run lint`: source checks.
- `npm run seo:check -- http://localhost:3002`: regression checks against a running production server.
- `npm run cf:build`: build for the existing Cloudflare Worker.
- `npm run cf:preview`: local Workers runtime preview.

Read `DEPLOYMENT.md`, `SEO-AUDIT.md`, and `QA-AUDIT.md` before release. Keep the existing hosting project and domain connection.

Home Update Now buttons open SMS drafts; Contact opens an email draft. Neither silently sends messages. Reviews are static owner-supplied content. Fonts are Inter and Instrument Serif.

Raw footage, design references and generated animation QA captures are excluded from production source control. The approved hero and brand palette remain intact.
