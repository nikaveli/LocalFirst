// Prebuilt HTML/RSC/assets need no Next.js server at request time.
import { canonicalRedirectUrl } from "./lib/canonical-redirect.mjs";
import { serveScrubMedia } from "./lib/scrub-media.mjs";

const worker = {
  async fetch(request, env) {
    const destination = canonicalRedirectUrl(request.url);
    if (destination) return Response.redirect(destination, 308);
    const media = await serveScrubMedia(request, env.ASSETS);
    if (media) return media;
    return env.ASSETS.fetch(request);
  },
};

export default worker;
