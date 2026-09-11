// OpenNext's documented custom-worker entry preserves the generated handler.
import handler from "./.open-next/worker.js";
import { canonicalRedirectUrl } from "./lib/canonical-redirect.mjs";
export * from "./.open-next/worker.js";

const worker = {
  ...handler,
  fetch(request, env, ctx) {
    const destination = canonicalRedirectUrl(request.url);
    if (destination) return Response.redirect(destination, 308);
    return handler.fetch(request, env, ctx);
  },
};

export default worker;
