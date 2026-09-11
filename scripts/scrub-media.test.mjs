import test from "node:test";
import assert from "node:assert/strict";
import { serveScrubMedia } from "../lib/scrub-media.mjs";

const assets = { fetch: async () => new Response("0123456789", { headers: { "Content-Type": "video/mp4", "Content-Length": "10", ETag: '"test"' } }) };
for (const [range, status, body, contentRange] of [
  ["bytes=0-1", 206, "01", "bytes 0-1/10"],
  ["bytes=3-", 206, "3456789", "bytes 3-9/10"],
  ["bytes=-3", 206, "789", "bytes 7-9/10"],
  ["bytes=8-999", 206, "89", "bytes 8-9/10"],
  ["bytes=99-", 416, "", "bytes */10"],
  ["bytes=5-3", 416, "", "bytes */10"],
  ["bytes=-0", 416, "", "bytes */10"],
  ["invalid", 200, "0123456789", null],
  ["bytes=0-1,5-6", 200, "0123456789", null],
]) {
  test(`mobile media ${range}`, async () => {
    const response = await serveScrubMedia(new Request("https://localfirstonline.com/scrub-media/localfirst-mobile.mp4", { headers: { Range: range } }), assets);
    assert.equal(response.status, status);
    assert.equal(response.headers.get("Content-Range"), contentRange);
    assert.equal(await response.text(), body);
  });
}
test("only the three mobile movies may use the range route", async () => {
  assert.equal(await serveScrubMedia(new Request("https://localfirstonline.com/about"), assets), null);
  assert.equal((await serveScrubMedia(new Request("https://localfirstonline.com/scrub-media/secret.mp4"), assets)).status, 404);
});
