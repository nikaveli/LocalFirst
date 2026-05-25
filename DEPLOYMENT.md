# Deploying LocalFirst to Cloudflare

This site is a Next.js 16 app with Server Actions (the contact form),
dynamic OG image generation, and `next/font` — all features that require
a Node-compatible runtime. The supported adapter is
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).

## Quick reference

| File | What it does |
| ---- | ------------ |
| `open-next.config.ts` | Tells OpenNext to use the default Cloudflare config. |
| `wrangler.jsonc` | Worker name, entry point, compat flags, asset binding. |
| `next.config.mjs` | Initializes OpenNext for `next dev` so Cloudflare bindings work locally. |

## Required environment variable

Set this in the Cloudflare dashboard under **Workers & Pages → Settings → Variables**:

| Name | Value |
| ---- | ----- |
| `RESEND_API_KEY` | The Resend API key (currently in your local `.env.local`). |

Without it, the contact form's Server Action will surface a "call instead"
message — nothing breaks, but no emails ship.

## Option A — Manual deploy (recommended for first deploy)

This is the most reliable path and bypasses any dashboard guesswork.

```bash
# One-time: authenticate
npx wrangler login

# Build the Next app, bundle for Workers, and deploy
npm run cf:deploy
```

Then set `RESEND_API_KEY` for the Worker:

```bash
npx wrangler secret put RESEND_API_KEY
# paste the key when prompted
```

A custom domain (`localfirstonline.com`) can be attached under
**Workers & Pages → localfirst → Settings → Domains & Routes**.

## Option B — Git-connected auto-deploy (Cloudflare Workers Builds)

If you want every push to `main` to auto-deploy:

1. In the Cloudflare dashboard, go to **Workers & Pages**.
2. If your existing project is a legacy *Pages* project, delete it and
   create a fresh project as **Workers → Connect to Git** (this is the
   modern unified workflow — legacy Pages can't run the Worker bundle
   this adapter produces).
3. Point it at `nikaveli/LocalFirst`, branch `main`.
4. Build settings:
   - **Build command:** `npm run cf:build`
   - **Deploy command:** *(leave default — Cloudflare uses `wrangler.jsonc`)*
5. Add the `RESEND_API_KEY` secret in the project's variables.

Cloudflare will read `wrangler.jsonc`, find `.open-next/worker.js` as the
entry, and serve `.open-next/assets/` as static files automatically.

## Local preview (Workers runtime)

To preview the production bundle locally — useful for catching anything
that works in `next dev` but fails on the actual Workers runtime:

```bash
npm run cf:preview
```

This spawns `wrangler dev` against the built worker, hitting
`http://localhost:8787`.

## Troubleshooting 404 on the deployed URL

The most common cause is a legacy Cloudflare *Pages* project pulling from
git but not knowing how to handle the Worker bundle this adapter
produces. Symptoms:

- The deployment shows "success" in the dashboard but every URL is 404.
- Build logs show static files copied but no Worker / Function output.

Fix: delete the legacy Pages project and create a new **Workers** project
as described in Option B above. Cloudflare unified the two in 2025 — new
Next.js sites should use Workers, not Pages.
