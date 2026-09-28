import test from "node:test";
import assert from "node:assert/strict";
import worker from "../worker.mjs";
import { access } from "node:fs/promises";

test("Wrangler cannot auto-delegate this static site to the old OpenNext deployment", async () => {
  await assert.rejects(access(new URL("../open-next.config.ts", import.meta.url)), { code: "ENOENT" });
  await assert.rejects(access(new URL("../open-next.config.js", import.meta.url)), { code: "ENOENT" });
});

test("canonical pages delegate directly to prebuilt assets without a Next server", async () => {
  for (const path of ["/", "/about", "/contact", "/first-impressions", "/google-business-profile-resources", "/google-business-profile-visual-refresh", "/robots.txt", "/sitemap.xml"]) {
    let requests = 0;
    const response = await worker.fetch(new Request(`https://localfirstonline.com${path}`), {
      ASSETS: { fetch(request) {
        requests++;
        assert.equal(new URL(request.url).pathname, path);
        return new Response("Prebuilt page", { headers: { "Content-Type": "text/html" } });
      } },
    });
    assert.equal(requests, 1);
    assert.equal(await response.text(), "Prebuilt page");
  }
});

test("www and HTTP redirect before assets and preserve the full destination", async () => {
  const response = await worker.fetch(new Request("http://www.localfirstonline.com/about?source=maps"), {
    ASSETS: { fetch() { assert.fail("redirects must not load page assets"); } },
  });
  assert.equal(response.status, 308);
  assert.equal(response.headers.get("Location"), "https://localfirstonline.com/about?source=maps");
});

test("custom 404 responses and HEAD requests are preserved", async () => {
  const response = await worker.fetch(new Request("https://localfirstonline.com/removed-page", { method: "HEAD" }), {
    ASSETS: { fetch(request) {
      assert.equal(request.method, "HEAD");
      return new Response(null, { status: 404 });
    } },
  });
  assert.equal(response.status, 404);
});

test("legacy video range URLs still work after removing the Next server", async () => {
  const response = await worker.fetch(new Request("https://localfirstonline.com/scrub-media/localfirst-mobile.mp4", { headers: { Range: "bytes=0-1" } }), {
    ASSETS: { fetch(request) {
      assert.equal(new URL(request.url).pathname, "/media/localfirst-mobile.mp4");
      return new Response("0123456789", { headers: { "Content-Length": "10" } });
    } },
  });
  assert.equal(response.status, 206);
  assert.equal(await response.text(), "01");
});

test("restaurant hero videos support the initial iOS byte-range probe", async () => {
  for (const file of ["hero-desktop.mp4", "hero-mobile.mp4", "hero-desktop-v2.mp4", "hero-mobile-v2.mp4"]) {
    const path = `/media/restaurant-home/${file}`;
    const response = await worker.fetch(new Request(`https://localfirstonline.com${path}`, { headers: { Range: "bytes=0-1" } }), {
      ASSETS: { fetch(request) {
        assert.equal(new URL(request.url).pathname, path);
        assert.equal(request.headers.has("Range"), false);
        return new Response("0123456789", { headers: { "Content-Length": "10", "Content-Type": "video/mp4" } });
      } },
    });
    assert.equal(response.status, 206);
    assert.equal(response.headers.get("Accept-Ranges"), "bytes");
    assert.equal(response.headers.get("Content-Range"), "bytes 0-1/10");
    assert.equal(response.headers.get("Content-Length"), "2");
    assert.equal(await response.text(), "01");
  }
});

test("other media still delegates to static assets without buffering", async () => {
  const body = new ReadableStream({ start(controller) { controller.close(); } });
  const asset = new Response(body);
  const response = await worker.fetch(new Request("https://localfirstonline.com/media/restaurant-home/tacos-1280.webp"), { ASSETS: { fetch() { return asset; } } });
  assert.equal(response, asset);
});
