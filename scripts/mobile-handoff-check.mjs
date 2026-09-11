// All-scene paint regression. Desktop WebKit/Chrome touch emulation is not a
// physical-iPhone smoothness benchmark. No media-load wait before scrolling.
import assert from "node:assert/strict";
import { webkit, chromium } from "playwright-core";
const useChrome = process.argv.includes("--chrome");
const browser = await (useChrome ? chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" }) : webkit.launch());
try {
  const page = await browser.newPage({ viewport: { width: 440, height: 956 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
  const errors = [], movies = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => { if (request.url().includes(".mp4")) movies.push(request.url()); });
  await page.addInitScript(() => {
    // Worst-case native-media priming failure: play never settles.
    HTMLMediaElement.prototype.play = () => new Promise(() => {});
  });
  if (process.argv.includes("--slow")) {
    await page.route("**/frames/**/*.webp", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 120));
      await route.continue();
    });
  }
  await page.goto(process.argv[2] || "http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("html.sc-ready", { timeout: 30000 });
  const result = await page.evaluate(async () => {
    const canvases = [...document.querySelectorAll("canvas[data-lf-frame-sequence]")];
    const log = canvases.map((canvas) => ({ scene: canvas.dataset.lfFrameSequence, forward: [], reverse: [], maxCache: 0 }));
    const proof = document.querySelector("[data-lf-proof-act]");
    const end = proof.offsetTop + proof.offsetHeight - innerHeight * 0.25;
    const timing = [];
    const move = async (reverse) => {
      const start = performance.now();
      let last = start;
      await new Promise((resolve) => {
        const tick = (now) => {
          timing.push(now - last); last = now;
          const p = Math.min((now - start) / 12000, 1);
          scrollTo({ top: end * (reverse ? 1 - p : p), behavior: "instant" });
          canvases.forEach((canvas, index) => {
            const list = log[index][reverse ? "reverse" : "forward"];
            const rendered = Number(canvas.dataset.renderedFrame ?? -1);
            if (rendered >= 0 && list.at(-1) !== rendered) list.push(rendered);
            log[index].maxCache = Math.max(log[index].maxCache, Number(canvas.dataset.frameCache || 0));
          });
          if (p < 1) requestAnimationFrame(tick); else resolve();
        };
        requestAnimationFrame(tick);
      });
    };
    await move(false);
    await move(true);
    console.info("Scroll RAF p95", timing.sort((a,b) => a-b)[Math.floor(timing.length * .95)]);
    return log.map((entry) => ({
      scene: entry.scene, maxCache: entry.maxCache,
      forwardFrames: entry.forward.length, reverseFrames: entry.reverse.length,
      first: entry.forward[0], furthest: Math.max(...entry.forward),
      lastReverse: entry.reverse.at(-1),
    }));
  });
  await page.screenshot({ path: `/private/tmp/localfirst-frames-${useChrome ? "chrome" : "webkit"}.png` });
  console.log(JSON.stringify({ browser: useChrome ? "Chrome" : "WebKit", slow: process.argv.includes("--slow"), errors, movies, result }, null, 2));
  assert.equal(errors.length, 0);
  assert.equal(movies.length, 0, "Mobile must not depend on native MP4 loading or autoplay");
  assert.equal(result.length, 3);
  for (const scene of result) {
    assert.ok(scene.forwardFrames > 12, `${scene.scene} must paint through the forward scroll`);
    assert.ok(scene.reverseFrames > 12, `${scene.scene} must paint while rewinding`);
    assert.ok(scene.furthest > 180, `${scene.scene} must progress through the footage`);
    assert.ok(scene.lastReverse < 30, `${scene.scene} must return near the beginning`);
    assert.ok(scene.maxCache <= 8, "Full-HD decoded memory remains bounded");
  }
} finally { await browser.close(); }
