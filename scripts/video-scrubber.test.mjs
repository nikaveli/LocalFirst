import test from "node:test";
import assert from "node:assert/strict";
import { createVideoScrubber } from "../lib/video-scrubber.ts";

test("scrub clock catches up during slow seeks, retries early gestures, and sleeps offscreen", async () => {
  const saved = Object.fromEntries(["window", "document", "requestAnimationFrame", "cancelAnimationFrame"].map((name) => [name, globalThis[name]]));
  const frames = new Map();
  let id = 0, time = 0;
  globalThis.window = new EventTarget();
  globalThis.document = Object.assign(new EventTarget(), { hidden: false });
  globalThis.requestAnimationFrame = (cb) => { frames.set(++id, cb); return id; };
  globalThis.cancelAnimationFrame = (key) => frames.delete(key);
  const step = () => {
    time += 1000 / 60;
    const queued = [...frames.values()]; frames.clear(); queued.forEach((cb) => cb(time));
  };
  class Video extends EventTarget {
    classList = { add() {} };
    duration = 10;
    readyState = 0;
    seeking = false;
    paused = true;
    seeks = [];
    plays = 0;
    time = 0;
    get currentTime() { return this.time; }
    set currentTime(value) {
      assert.equal(this.seeking, false, "never queue another seek during decoding");
      this.time = value; this.seeking = true; this.seeks.push(value);
    }
    play() { this.plays++; this.paused = false; return Promise.resolve(); }
    pause() { this.paused = true; }
    complete() { this.seeking = false; this.dispatchEvent(new Event("seeked")); }
  }
  const video = new Video();
  const scrub = createVideoScrubber(video);
  try {
    scrub.setTarget(0, true);
    window.dispatchEvent(new Event("touchstart"));
    assert.equal(video.plays, 0, "touch before loading must not consume priming");
    video.readyState = 2;
    video.dispatchEvent(new Event("loadeddata"));
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(video.plays, 1);
    assert.equal(video.paused, true);
    scrub.setTarget(0.9, true);
    step();
    assert.equal(video.seeks.length, 1);
    for (let i = 0; i < 18; i++) step(); // a deliberately slow 300ms decode
    assert.equal(video.seeks.length, 1);
    video.complete(); step();
    assert.ok(video.currentTime > 8.5, "next seek uses current scroll, not a decoder-delayed easing clock");
    for (let i = 0; i < 40; i++) { video.complete(); step(); }
    assert.ok(Math.abs(video.currentTime - 9) < 1 / 30);
    assert.equal(frames.size, 0, "no idle requestAnimationFrame polling");
    assert.ok(video.seeks.every((seconds) => Math.abs(seconds * 30 - Math.round(seconds * 30)) < 0.001), "seek actual footage frames only");
    scrub.setTarget(0.4, true); step();
    document.hidden = true; document.dispatchEvent(new Event("visibilitychange"));
    assert.equal(frames.size, 0);
    document.hidden = false; document.dispatchEvent(new Event("visibilitychange"));
    scrub.setTarget(0.7, false);
    assert.equal(frames.size, 0, "offscreen films do not consume frames");
  } finally {
    scrub.destroy();
    for (const [name, value] of Object.entries(saved)) {
      if (value === undefined) delete globalThis[name]; else globalThis[name] = value;
    }
  }
});
