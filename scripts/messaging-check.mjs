import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const base = process.argv[2] || 'http://localhost:3005';
const routes = ['/', '/google-business-profile-visual-refresh', '/website-development', '/about', '/contact', '/google-business-profile-resources', '/first-impressions'];
const directory = '/tmp/localfirst-messaging-qa';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
try {
  for (const width of [360, 440, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width < 768 ? 956 : 1000 }, isMobile: width < 768, hasTouch: width < 768 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of routes) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('h1').isVisible(), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${width}${route}: no horizontal overflow`);
      const bounds = await page.locator('h1').boundingBox();
      assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width + 1, `${route}: H1 fits`);
      for (const cta of await page.locator('main .btn-bubble-arrow').all()) {
        const rect = await cta.boundingBox();
        assert.ok(rect && rect.x >= 0 && rect.x + rect.width <= width + 1, `${width}${route}: CTA fits`);
      }
      if (['/', '/google-business-profile-visual-refresh', '/contact'].includes(route)) {
        const ctas = page.getByRole('link', { name: 'Text Nick about a photo shoot', exact: true });
        assert.equal(await ctas.count(), route === '/contact' ? 1 : 2);
        assert.equal(await page.getByRole('link', { name: /Text Nick about my Google profile/i }).count(), 0);
        for (const cta of await ctas.all()) {
          const url = new URL(await cta.getAttribute('href'));
          assert.equal(url.protocol, 'sms:');
          assert.equal(url.pathname, '+13035240591');
          assert.ok(url.searchParams.get('body').includes('plan a photo shoot for my business'));
        }
      }
      await page.screenshot({ path: `${directory}/${width}-${route.slice(1) || 'home'}.png` });
      console.log(`PASS ${width}${route}: visible H1, layout, CTA`);
    }
    assert.deepEqual(errors, []);
    await page.close();
  }
} finally { await browser.close(); }
