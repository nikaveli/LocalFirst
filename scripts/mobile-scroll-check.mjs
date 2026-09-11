// Real Chrome / touch viewport regression probe, not a physical iOS benchmark.
// Usage: node scripts/mobile-scroll-check.mjs http://localhost:3002
import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: process.env.SCROLLCRAFT_CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
try {
  const page = await browser.newPage({ viewport: { width: 440, height: 956 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  page.setDefaultTimeout(30000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Performance.enable");
  await page.goto(process.argv[2] || "http://localhost:3002", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("html.sc-ready");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => document.querySelector('[data-lf-frame-sequence="localfirst"]')?.dataset.renderedFrame !== undefined, null, { timeout: 30000 });
  await page.touchscreen.tap(220, 320);
  await page.waitForTimeout(500);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: Number(process.env.SCROLL_CPU_RATE) || 1 });
  const before = await cdp.send("Performance.getMetrics");
  const result = await page.evaluate(async () => {
    const canvas = document.querySelector('[data-lf-frame-sequence="localfirst"]');
    const hero = document.querySelector("[data-lf-hero-act]");
    const frames = [], mediaTimes = [];
    let lastFrame = 0;
    const painted = new MutationObserver(() => {
      const seconds = Number(canvas.dataset.renderedFrame) / 24;
      if (mediaTimes.at(-1) !== seconds) mediaTimes.push(seconds);
    });
    painted.observe(canvas, { attributes: true, attributeFilter: ["data-rendered-frame"] });
    const started = performance.now();
    const distance = hero.offsetHeight * 0.8;
    await new Promise((resolve) => {
      const step = (now) => {
        if (lastFrame) frames.push(now - lastFrame);
        lastFrame = now;
        const progress = Math.min((now - started) / 6000, 1);
        window.scrollTo({ top: distance * progress, behavior: "instant" });
        if (progress < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
    await new Promise((resolve) => setTimeout(resolve, 600));
    painted.disconnect();
    const percentile = (list, p) => [...list].sort((a, b) => a - b)[Math.floor((list.length - 1) * p)] ?? 0;
    return {
      paintedFrames: mediaTimes.length,
      rafP95ms: percentile(frames, 0.95), framesOver50ms: frames.filter((v) => v > 50).length,
      videoStart: mediaTimes[0], videoEnd: mediaTimes.at(-1),
      mediaRequests: performance.getEntriesByType("resource").filter((r) => r.name.endsWith(".mp4")).map((r) => ({ url: r.name, bytes: r.transferSize })),
      heroTransform: document.querySelector("[data-lf-hero-media]").style.transform,
      overflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
  const after = await cdp.send("Performance.getMetrics");
  const metric = (data, name) => data.metrics.find((m) => m.name === name)?.value || 0;
  result.layoutCount = metric(after, "LayoutCount") - metric(before, "LayoutCount");
  result.layoutMs = (metric(after, "LayoutDuration") - metric(before, "LayoutDuration")) * 1000;
  result.scriptMs = (metric(after, "ScriptDuration") - metric(before, "ScriptDuration")) * 1000;
  result.errors = errors;
  // The viewport-height-only resize simulates browser toolbar changes. This
  // checks the page-local composition, not the actual iOS compositor.
  await page.setViewportSize({ width: 440, height: 850 });
  await page.waitForTimeout(500);
  result.transformAfterHeightResize = await page.locator("[data-lf-hero-media]").evaluate((el) => el.style.transform);
  result.heightResizeStable = result.heroTransform === result.transformAfterHeightResize;
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await page.waitForTimeout(1000);
  result.closing = await page.locator("#close-title").evaluate((el) => ({
    opacity: getComputedStyle(el).opacity,
    lines: [...el.querySelectorAll(".sc-split__i")].map((line) => getComputedStyle(line).opacity),
    text: el.textContent,
    scroll: scrollY,
    actProgress: el.closest("[data-sc-act]").style.getPropertyValue("--sc-p"),
    actTop: el.closest("[data-sc-act]").getBoundingClientRect().top + scrollY,
    cached: window.ScrollCraft?.instances?.flatMap((i) => i.acts).filter((a) => a.el.id === "contact").map((a) => ({top:a.top,height:a.height,p:a.p})),
  }));
  await page.screenshot({ path: "/private/tmp/localfirst-mobile-closing.png" });
  console.log(JSON.stringify(result, null, 2));
  assert.equal(errors.length, 0, "No runtime errors");
  assert.equal(result.overflow, false, "No horizontal overflow");
  assert.ok(result.videoEnd > result.videoStart + 1, "The hero must advance while scrolling");
  assert.ok(result.closing.lines.every((opacity) => Number(opacity) > 0.9), "The closing message remains visible after height changes");
  if (process.argv.includes("--assert-stable")) assert.equal(result.heightResizeStable, true, "Browser toolbar changes must not rescale the hero");
} finally {
  await browser.close();
}
