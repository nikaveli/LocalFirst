// Narrow range-capable routes for the legacy films and new background videos. The deployed
// static-asset service currently answers Range requests with a full 200 body.
const files = new Set(["localfirst-mobile.mp4", "restaurant-mobile.mp4", "med-spa-mobile.mp4"]);
const heroPaths = new Set([
  "/media/restaurant-home/hero-desktop.mp4",
  "/media/restaurant-home/hero-mobile.mp4",
]);

export async function serveScrubMedia(request, assets) {
  const url = new URL(request.url);
  if (!heroPaths.has(url.pathname)) {
    if (!url.pathname.startsWith("/scrub-media/")) return null;
    const file = url.pathname.slice("/scrub-media/".length);
    if (!files.has(file)) return new Response("Not found", { status: 404 });
    url.pathname = `/media/${file}`;
  }
  if (!["GET", "HEAD"].includes(request.method)) return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
  // The binding avoids a network loop back through our public route.
  const asset = await assets.fetch(new Request(url, { method: request.method }));
  if (asset.status !== 200) return asset;
  const headers = new Headers(asset.headers);
  headers.set("Accept-Ranges", "bytes");
  const range = request.headers.get("Range");
  const ifRange = request.headers.get("If-Range");
  const match = /^bytes=(\d*)-(\d*)$/.exec(range || "");
  if (request.method === "HEAD" || !match || (!match[1] && !match[2]) || (ifRange && ifRange !== headers.get("ETag"))) {
    return new Response(asset.body, { status: 200, headers });
  }
  // These five allowlisted films are each <10 MB. Do not buffer arbitrary assets.
  const data = await asset.arrayBuffer();
  const size = data.byteLength;
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= size) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}`, "Accept-Ranges": "bytes" } });
  }
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  headers.delete("Content-Encoding");
  return new Response(data.slice(start, end + 1), { status: 206, headers });
}
