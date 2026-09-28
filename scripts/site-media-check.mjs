import assert from 'node:assert/strict';
import { chromium, webkit } from 'playwright-core';

const base = process.argv[2] || 'http://localhost:3004';
const engine = process.argv[3] || 'chromium';
const browser = await (engine === 'webkit' ? webkit.launch({ headless: true }) : chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }));
try {
  const page = await browser.newPage({ viewport: { width: 440, height: 956 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
  const requests = [], errors = [];
  page.on('request', request => requests.push(request.url()));
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base + '/first-impressions', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelector('[data-motion-ready="true"]'));
  const initialPosters = new Set(requests.filter(url => url.includes('/posters-v1/'))).size;
  assert.ok(initialPosters < 15, 'Offscreen posters are not all loaded upfront');
  assert.equal(requests.filter(url => /first-impressions\/.*\.mp4/.test(url)).length, 0, 'Videos remain unloaded until interaction');
  const cards = page.locator('.lf-visit-card');
  assert.equal(await cards.count(), 15);
  for (let index = 0; index < 15; index++) {
    const card = cards.nth(index), video = card.locator('video'), button = card.locator('button');
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.waitForFunction(index => document.querySelectorAll('.lf-visit-card__poster')[index].naturalWidth > 0, index);
    assert.ok((await button.getAttribute('aria-label')).startsWith('Play video:'), 'Visible label matches accessible name');
    await button.tap();
    await page.waitForFunction(index => document.querySelectorAll('.lf-visit-card video')[index].currentTime > 0, index);
    assert.ok(await card.locator('.lf-visit-card__poster').evaluate(image => image.hidden), 'Poster reveals playing movie');
    await button.tap();
    assert.ok(await video.evaluate(video => video.paused), 'Pause works');
    assert.equal(await card.locator('.lf-visit-card__poster').evaluate(image => image.hidden), false, 'Poster restored when paused');
  }
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelector('.rh-hero video')?.currentTime > 0);
  const hero = page.locator('.rh-hero video');
  assert.ok((await hero.getAttribute('src')).endsWith('/hero-mobile-v2.mp4'));
  await page.getByRole('button', { name: 'Pause film', exact: true }).tap();
  assert.ok(await hero.evaluate(video => video.paused));
  await page.getByRole('button', { name: 'Play film', exact: true }).tap();
  await page.waitForFunction(() => !document.querySelector('.rh-hero video').paused);
  assert.deepEqual(errors, []);
  console.log(`PASS ${engine}: ${initialPosters}/15 posters initially requested; all 15 videos and optimized hero play/pause; no browser errors. Emulated, not a physical device.`);
} finally { await browser.close(); }
