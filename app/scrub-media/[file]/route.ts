// Local Next preview parity; production uses the Worker + ASSETS binding.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { serveScrubMedia } from "@/lib/scrub-media.mjs";

async function respond(request: Request) {
  return (await serveScrubMedia(request, {
    async fetch(assetRequest: Request) {
      const filename = new URL(assetRequest.url).pathname.split("/").pop()!;
      const data = await readFile(join(process.cwd(), "public", "media", filename));
      return new Response(assetRequest.method === "HEAD" ? null : data, {
        headers: { "Content-Type": "video/mp4", "Content-Length": String(data.byteLength), "Cache-Control": "public, max-age=3600" },
      });
    },
  })) || new Response(null, { status: 404 });
}

export const GET = respond;
export const HEAD = respond;
