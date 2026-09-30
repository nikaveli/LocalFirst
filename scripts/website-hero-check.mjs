import assert from 'node:assert/strict';
import { chromium, webkit } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const base = process.argv[2] || 'http://localhost:3005';
const engine = process.argv[3] || 'chromium';
const browser = await (engine === 'webkit' ? webkit.launch({ headless: true }) : chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true }));
await mkdir('/tmp/localfirst-web-hero-qa', { recursive: true });
try {
  for (const mobile of [false, true]) {
    const page = await browser.newPage({ viewport: { width: mobile ? 440 : 1440, height: mobile ? 956 : 1000 }, isMobile: mobile, hasTouch: mobile });
    const movies = [], errors = [];
    page.on('request', request => { if (/website-hero.*\.mp4/.test(request.url())) movies.push(request.url()); });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '/website-development', { waitUntil: 'networkidle' });
    const hero = page.locator('.wd-hero-film');
    const video = hero.locator('video');
    await hero.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('.wd-hero-film video').currentTime > .2);
    assert.ok((await video.getAttribute('src')).endsWith(`/${mobile ? 'mobile' : 'desktop'}.mp4`));
    assert.deepEqual(await video.evaluate(v => ({ loop: v.loop, muted: v.muted, inline: v.playsInline, controls: v.controls })), { loop: true, muted: true, inline: true, controls: false });
    assert.equal(await hero.locator('button').count(), 0, 'No visible controls');
    assert.equal(new Set(movies).size, 1, 'Only the matching hero video downloads');
    await video.evaluate(v => { v.currentTime = v.duration - .3; });
    await page.waitForFunction(() => { const v = document.querySelector('.wd-hero-film video'); return v.currentTime < 2 && !v.paused; }, null, { timeout: 15000 });
    assert.equal(await hero.getAttribute('data-playing'), 'true');
    await page.screenshot({ path: `/tmp/localfirst-web-hero-qa/${engine}-${mobile ? 'mobile' : 'desktop'}.png` });
    await page.locator('.wd-services').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('.wd-hero-film video').paused);
    await hero.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => !document.querySelector('.wd-hero-film video').paused);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);
    await page.close();
    console.log(`PASS ${engine}/${mobile ? 'mobile' : 'desktop'}: source, autoplay, actual loop restart, no controls, offscreen pause/resume`);
  }
  for (const mode of ['reduced', 'no-js', 'data-saver']) {
    const page = await browser.newPage({ viewport: { width: 440, height: 956 }, reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference', javaScriptEnabled: mode !== 'no-js' });
    if (mode === 'data-saver') await page.addInitScript(() => Object.defineProperty(navigator, 'connection', { value: { saveData: true }, configurable: true }));
    const movies = [];
    page.on('request', request => { if (/website-hero.*\.mp4/.test(request.url())) movies.push(request.url()); });
    await page.goto(base + '/website-development', { waitUntil: 'networkidle' });
    await page.locator('.wd-hero-film').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    assert.equal(await page.locator('.wd-hero-film picture').evaluate(p => getComputedStyle(p).visibility), 'visible');
    assert.deepEqual(movies, []);
    await page.close();
    console.log(`PASS ${engine}/${mode}: still image without video download`);
  }
} finally { await browser.close(); }
