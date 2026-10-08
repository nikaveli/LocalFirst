import assert from 'node:assert/strict';
import { chromium, webkit } from 'playwright-core';

const base = process.argv[2] || 'http://localhost:3005';
for (const engine of ['chromium', 'webkit']) {
  const browser = await (engine === 'webkit' ? webkit : chromium).launch(engine === 'chromium'
    ? { executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' } : {});
  try {
    for (const [width, mode] of [[360, 'normal'], [440, 'normal'], [1440, 'normal'], [360, 'reduced'], [360, 'no-js']]) {
      const page = await browser.newPage({ viewport: { width, height: 956 }, isMobile: width < 768,
        hasTouch: width < 768, javaScriptEnabled: mode !== 'no-js', reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const section = page.locator('#pricing #training');
      await section.scrollIntoViewIfNeeded();
      const copy = await section.innerText();
      for (const detail of ['$497', 'one time', 'No photography booking required.', 'No monthly subscription.', '2 hours at your business', 'A guide to keep', 'A 1-hour follow-up']) {
        assert.ok(copy.includes(detail), `${engine}/${width}/${mode}: ${detail}`);
      }
      assert.equal(await page.locator('#monthly .rh-price-card').count(), 2);
      assert.equal(await page.locator('#pricing > .rh-shell > .rh-pricing-grid .rh-price-card').count(), 3);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      const cta = section.getByRole('link', { name: 'Ask Nick about training' });
      const url = new URL(await cta.getAttribute('href'));
      assert.equal(url.protocol, 'sms:');
      assert.equal(url.pathname, '+13035240591');
      assert.equal(url.searchParams.get('body'), "Hi Nick, I'm interested in the standalone Google Business Profile training at $497.");
      const box = await cta.boundingBox();
      assert.ok(box && box.x >= 0 && box.x + box.width <= width + 1 && box.height >= 44, 'CTA fits and is touch-sized');
      await section.screenshot({ path: `/tmp/localfirst-training-${engine}-${width}-${mode}.png` });
      assert.deepEqual(errors, []);
      console.log(`PASS training ${engine} ${width}px ${mode}`);
      await page.close();
    }
  } finally { await browser.close(); }
}
console.log('Emulation checks only; no text messages sent.');
