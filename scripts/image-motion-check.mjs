import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium, webkit } from 'playwright-core';

const base = process.argv[2] || 'http://localhost:3005';
const engine = process.argv[3] || 'chromium';
const browser = await (engine === 'webkit' ? webkit.launch() : chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }));
await mkdir('/tmp/localfirst-image-motion', { recursive: true });
try {
  for (const mobile of [false, true]) {
    const page = await browser.newPage({ viewport: { width: mobile ? 440 : 1440, height: mobile ? 800 : 1000 }, isMobile: mobile, hasTouch: mobile });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [path, ids] of [['/', ['work', 'signature']], ['/google-business-profile-visual-refresh', ['on-location']]]) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => document.querySelector('[data-site-motion]'));
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.querySelectorAll('[data-bg-zoom-img] img')].map(img => { img.loading = 'eager'; return img.decode(); }));
      });
      await page.waitForTimeout(400);
      for (const id of ids) {
        const section = page.locator(`#${id}`);
        const range = await section.evaluate(el => {
          const start = el.querySelector('[data-bg-zoom-start]').getBoundingClientRect();
          const end = el.querySelector('[data-bg-zoom-end]').getBoundingClientRect();
          return { from: start.top + scrollY - innerHeight, to: end.top + scrollY + end.height / 2 - innerHeight / 2, firstWidth: start.width, lastWidth: end.width };
        });
        const layoutSizes = new Set();
        for (const progress of [0, .25, .5, .75, 1, .5, 0]) {
          await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), range.from + (range.to - range.from) * progress);
          await page.waitForTimeout(150);
          const geometry = await section.evaluate(el => {
            const mask = el.querySelector('[data-bg-zoom-content]');
            const photo = el.querySelector('[data-bg-zoom-img] img');
            const rect = photo.getBoundingClientRect();
            return { width: mask.getBoundingClientRect().width, layout: `${mask.style.width}/${mask.style.height}`, aspect: rect.width / rect.height, expectedAspect: Number(photo.getAttribute('width')) / Number(photo.getAttribute('height')), photoLayout: `${photo.style.width}/${photo.style.height}` };
          });
          assert.ok(Math.abs(geometry.width - (range.firstWidth + (range.lastWidth - range.firstWidth) * progress)) < 3, `${id}: continuous, reversible zoom`);
          assert.ok(Math.abs(geometry.aspect - geometry.expectedAspect) < .005, `${id}: photo is not stretched`);
          layoutSizes.add(geometry.layout + geometry.photoLayout);
          if ([.5, 1].includes(progress)) await page.screenshot({ path: `/tmp/localfirst-image-motion/${engine}-${mobile ? 'mobile' : 'desktop'}-${id}-${progress}.png` });
        }
        assert.equal(layoutSizes.size, 1, `${id}: no width/height writes during scroll`);
        // Story phase remains visually covered and readable after the mask expands.
        await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), range.to + (mobile ? 800 : 1000) * .45);
        await page.waitForTimeout(200);
        await page.screenshot({ path: `/tmp/localfirst-image-motion/${engine}-${mobile ? 'mobile' : 'desktop'}-${id}-story.png` });
        console.log(`PASS ${engine}/${mobile ? 'mobile' : 'desktop'}${path}#${id}: fixed layout, proportional photo, forward/reverse zoom`);
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    }
    // A client-side navigation must dispose the old photo transforms/triggers.
    await page.goto(base + '/about', { waitUntil: 'networkidle' });
    await page.locator('.rh-footer').scrollIntoViewIfNeeded();
    await page.getByRole('navigation', { name: 'Footer navigation' }).getByRole('link', { name: 'Visual Refresh', exact: true }).click();
    await page.waitForURL('**/google-business-profile-visual-refresh');
    await page.waitForFunction(() => document.querySelector('[data-site-motion]'));
    assert.deepEqual(errors, []);
    await page.close();
  }
  for (const reduced of [true, false]) {
    const page = await browser.newPage({ viewport: { width: 440, height: 800 }, reducedMotion: reduced ? 'reduce' : 'no-preference', javaScriptEnabled: reduced });
    for (const path of ['/', '/google-business-profile-visual-refresh']) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('.rh-zoom-enhanced').count(), 0);
      assert.equal(await page.locator('[data-bg-zoom-content]').evaluateAll(els => els.every(el => !el.style.transform)), true);
    }
    await page.close();
  }
  console.log('PASS route cleanup, reduced-motion, and no-JavaScript fallbacks');
} finally { await browser.close(); }
