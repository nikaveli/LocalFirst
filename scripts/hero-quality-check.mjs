// Capture actual DPR-3 mobile rendering, including the enlarged/cropped hero.
import { webkit } from "playwright-core";
import { mkdir } from "node:fs/promises";
const url = process.argv[2] || "http://localhost:3000";
const out = process.argv[3] || "/private/tmp/lf-hero-quality";
await mkdir(out, { recursive: true });
const browser = await webkit.launch();
try {
  const page = await browser.newPage({ viewport: { width: 440, height: 956 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("html.sc-ready");
  await page.evaluate(() => document.fonts.ready);
  const positions = await page.evaluate(() => {
    const hero = document.querySelector("[data-lf-hero-act]");
    const proof = document.querySelector("[data-lf-proof-act]");
    return [0, hero.offsetHeight * .5, proof.offsetTop + (proof.offsetHeight - innerHeight) * .22, proof.offsetTop + (proof.offsetHeight - innerHeight) * .76];
  });
  for (let index = 0; index < positions.length; index++) {
    await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), positions[index]);
    await page.waitForTimeout(2200);
    await page.screenshot({ path: `${out}/${index}.png` });
  }
  console.log(JSON.stringify(await page.locator("canvas[data-lf-frame-sequence]").evaluateAll((canvases) => canvases.map((c) => ({ scene: c.dataset.lfFrameSequence, width: c.width, height: c.height, frame: c.dataset.renderedFrame, cache: c.dataset.frameCache }))), null, 2));
} finally { await browser.close(); }
