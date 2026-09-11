// OpenNext's documented custom-worker entry preserves the generated handler.
import handler from "./.open-next/worker.js";
import { canonicalRedirectUrl } from "./lib/canonical-redirect.mjs";
import { serveScrubMedia } from "./lib/scrub-media.mjs";
export * from "./.open-next/worker.js";

const worker = {
  ...handler,
  async fetch(request, env, ctx) {
    const destination = canonicalRedirectUrl(request.url);
    if (destination) return Response.redirect(destination, 308);
    const media = await serveScrubMedia(request, env.ASSETS);
    if (media) return media;
    return handler.fetch(request, env, ctx);
  },
};

export default worker;
