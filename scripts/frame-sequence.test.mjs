import test from "node:test";
import assert from "node:assert/strict";
import { createFrameSequence, FRAME_SEQUENCES, FRAME_VERSION, FRAME_WIDTH, FRAME_HEIGHT, FRAME_CACHE_LIMIT } from "../lib/frame-sequence.ts";
import { readdir } from "node:fs/promises";
import sharp from "sharp";

test("every mobile sequence has all of its published frames", async () => {
  for (const [name, count] of Object.entries(FRAME_SEQUENCES)) {
    const dir = new URL(`../public/media/frames/${FRAME_VERSION}/${name}/`, import.meta.url);
    const files = await readdir(dir);
    for (let index = 0; index < count; index++) assert.ok(files.includes(`${String(index).padStart(4, "0")}.webp`));
    for (const index of [0, Math.floor(count / 2), count - 1]) {
      const metadata = await sharp(new URL(`${String(index).padStart(4, "0")}.webp`, dir).pathname).metadata();
      assert.equal(metadata.width, FRAME_WIDTH);
      assert.equal(metadata.height, FRAME_HEIGHT);
    }
  }
});

test("frame rendering advances without video APIs, reverses, bounds memory, and cleans up", async () => {
  const names = ["document", "requestAnimationFrame", "cancelAnimationFrame", "fetch", "createImageBitmap"];
  const saved = Object.fromEntries(names.map((name) => [name, globalThis[name]]));
  const frames = new Map(), bitmaps = [];
  let id = 0, inFlight = 0, maxInFlight = 0, holdRequests = false;
  const held = [];
  const painted = [];
  const canvas = { style: {}, dataset: {}, setAttribute() {}, remove() { this.removed = true; }, getContext() { return { drawImage(bitmap) { assert.equal(bitmap.closed, false); painted.push(bitmap.index); } }; } };
  globalThis.document = Object.assign(new EventTarget(), { hidden: false, createElement: () => canvas });
  globalThis.requestAnimationFrame = (cb) => { frames.set(++id, cb); return id; };
  globalThis.cancelAnimationFrame = (key) => frames.delete(key);
  globalThis.fetch = async (url, { signal }) => {
    inFlight++; maxInFlight = Math.max(maxInFlight, inFlight);
    if (holdRequests) await new Promise((resolve) => { held.push(resolve); signal.addEventListener("abort", resolve, { once: true }); });
    await new Promise((resolve) => setImmediate(resolve));
    inFlight--;
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    return { ok: true, blob: async () => Number(url.match(/(\d+)\.webp$/)[1]) };
  };
  globalThis.createImageBitmap = async (index) => {
    const bitmap = { index, closed: false, close() { this.closed = true; } };
    bitmaps.push(bitmap); return bitmap;
  };
  const video = { style: { display: "" }, className: "lf-hero-video", after() {}, closest: () => null };
  const player = createFrameSequence(video, "localfirst");
  const flush = async () => {
    for (let i = 0; i < 8; i++) {
      await new Promise((resolve) => setImmediate(resolve));
      const queued = [...frames.values()]; frames.clear(); queued.forEach((cb) => cb());
    }
  };
  try {
    assert.equal(canvas.width, 1920, "Retain master resolution in the backing store");
    assert.equal(canvas.height, 1080);
    player.warm(); await flush();
    assert.equal(painted.at(-1), 0);
    holdRequests = true;
    player.setTarget(0.2, true); // requests frames 48–51
    player.setTarget(0.23, true); // scroll overtakes those requests
    held.splice(0).forEach((resolve) => resolve());
    await flush();
    assert.ok(painted.at(-1) >= 48 && painted.at(-1) <= 51, "late frames must paint instead of starving behind a moving target");
    holdRequests = false;
    held.splice(0).forEach((resolve) => resolve());
    await flush();
    for (const progress of [0.2, 0.6, 1, 0.7, 0.1]) {
      player.setTarget(progress, true); await flush();
      assert.equal(painted.at(-1), Math.round(progress * 239));
      assert.ok(bitmaps.filter((b) => !b.closed).length <= FRAME_CACHE_LIMIT);
    }
    player.setTarget(0.9, true);
    player.setTarget(0, true); await flush();
    assert.equal(painted.at(-1), 0, "fast reversals cannot paint a stale asynchronous target");
    player.setTarget(0, false); await flush();
    assert.equal(bitmaps.filter((b) => !b.closed).length, 1, "inactive scenes retain only their first frame");
    assert.ok(maxInFlight <= 4);
    assert.equal(frames.size, 0, "idle scenes have no RAF loop");
  } finally {
    player.destroy(); await flush();
    assert.ok(bitmaps.every((b) => b.closed));
    assert.equal(canvas.removed, true);
    assert.equal(video.style.display, "");
    for (const [name, value] of Object.entries(saved)) {
      if (value === undefined) delete globalThis[name]; else globalThis[name] = value;
    }
  }
});
