import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const base = process.argv[2] || 'http://localhost:3002';
const paths = ['/about', '/contact', '/first-impressions', '/google-business-profile-resources', '/google-business-profile-visual-refresh'];
const shots = '/tmp/localfirst-uniform-qa';
await mkdir(shots, { recursive: true });
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
try {
  for (const mobile of [false, true]) {
    const page = await browser.newPage({ viewport: { width: mobile ? 390 : 1440, height: mobile ? 844 : 1000 }, isMobile: mobile, hasTouch: mobile });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const path of paths) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => document.querySelector('.lf-subpage')?.dataset.motionReady === 'true');
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(500);
      assert.equal(await page.locator('h1').count(), 1, `${path}: H1`);
      assert.equal(await page.locator('.rh-header, .rh-footer').count(), 2, 'Shared header/footer');
      assert.equal(await page.locator('.rh-header img').getAttribute('src'), '/media/localfirst-logo-v3.webp');
      assert.equal(await page.locator('.rh-desktop-nav a').allTextContents().then(a => a.join('|')), 'Pricing|Monthly plans|Visual Refresh|First Impressions|Google Profile Guides|About Nick|Contact');
      assert.deepEqual(await page.locator('.rh-desktop-nav a').allTextContents(), await page.locator('.rh-footer nav a').allTextContents(), 'Header and footer menus match exactly');
      const pricing = await page.locator('a[href$="#pricing"]').evaluateAll(links => links.map(a => a.getAttribute('href')));
      assert.ok(pricing.length >= 3 && pricing.every(href => href === '/#pricing'), `${path}: unified pricing`);
      assert.equal(await page.locator('.lf-refresh-pricing__grid').count(), 0, 'No duplicate pricing');
      await page.screenshot({ path: `${shots}/${mobile ? 'mobile' : 'desktop'}-${path.slice(1)}-top.png` });
      // Verify a below-fold reveal actually animates, then finishes visibly.
      const selector = path === '/contact' ? '.lf-contact-form > label:last-of-type' : path === '/about' ? '.lf-about-credentials .lf-sub-shell' : path === '/first-impressions' ? '.lf-visit-card:nth-child(7)' : path === '/google-business-profile-resources' ? '#restaurants-cafes .lf-sub-shell' : '#includes .lf-sub-shell';
      const reveal = page.locator(selector);
      const before = await reveal.evaluate(el => ({ opacity: getComputedStyle(el).opacity, top: el.getBoundingClientRect().top, viewport: innerHeight }));
      assert.equal(Number(before.opacity), 1, `${path}: text retains full contrast throughout motion`);
      await reveal.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1100);
      assert.equal(await reveal.evaluate(el => getComputedStyle(el).opacity), '1', `${path}: reveal completed`);
      const naturalTop = await reveal.evaluate(el => el.getBoundingClientRect().top + scrollY - new DOMMatrixReadOnly(getComputedStyle(el).transform).m42);
      const samples = [];
      for (const viewportFraction of [.82, .35, .82]) {
        await page.evaluate(({ top, fraction }) => scrollTo({ top: top - innerHeight * fraction, behavior: 'instant' }), { top: naturalTop, fraction: viewportFraction });
        await page.waitForTimeout(500);
        samples.push(await reveal.evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42));
      }
      assert.ok(samples[0] > 5 && samples[1] < 1 && samples[2] > 5, `${path}: reversible scroll progression (${samples})`);
      await reveal.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${shots}/${mobile ? 'mobile' : 'desktop'}-${path.slice(1)}-content.png` });
      if (path === '/google-business-profile-visual-refresh') {
        const geometry = await page.locator('#on-location').evaluate(el => {
          const start = el.querySelector('[data-bg-zoom-start]').getBoundingClientRect();
          const end = el.querySelector('[data-bg-zoom-end]').getBoundingClientRect();
          return { from: start.top + scrollY - innerHeight, to: end.top + scrollY + end.height / 2 - innerHeight / 2 };
        });
        const widths = [];
        for (const progress of [0, .5, 1]) {
          await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), geometry.from + (geometry.to - geometry.from) * progress);
          await page.waitForTimeout(250);
          widths.push(await page.locator('#on-location [data-bg-zoom-content]').evaluate(el => el.getBoundingClientRect().width));
        }
        assert.ok(widths[0] < widths[1] && widths[1] < widths[2], 'Service photo expands continuously');
        await page.screenshot({ path: `${shots}/${mobile ? 'mobile' : 'desktop'}-service-zoom.png` });
      }
      for (const section of await page.locator('main > section, main > div > section').all()) {
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${path}: no horizontal overflow`);
      }
      await page.locator('.rh-footer').scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${shots}/${mobile ? 'mobile' : 'desktop'}-${path.slice(1)}-bottom.png` });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      if (mobile) {
        await page.getByRole('button', { name: 'Menu', exact: true }).click();
        await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Pricing', exact: true }).click();
      } else {
        await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Pricing', exact: true }).click();
      }
      await page.waitForURL(url => url.pathname === '/' && url.hash === '#pricing');
      await page.waitForFunction(() => document.querySelector('[data-restaurant-home]')?.dataset.motionReady === 'true');
      await page.waitForTimeout(1200);
      assert.ok((await page.locator('#monthly').innerText()).includes('$299'), 'Monthly pricing reachable');
      await page.waitForFunction(() => Math.abs(document.querySelector('#pricing').getBoundingClientRect().top) < 150, null, { timeout: 15000 }).catch(async error => {
        console.error('Pricing landing', path, await page.locator('#pricing').evaluate(el => ({ top: el.getBoundingClientRect().top, scroll: scrollY, hash: location.hash })));
        throw error;
      });
      assert.deepEqual(errors, [], `${path}: no browser errors`);
      console.log(`PASS ${mobile ? 'mobile' : 'desktop'} ${path}: layout, motion, shared navigation, pricing destination`);
    }
    await page.close();
  }
  // Client-side transitions must clean up and initialize the shared motion system.
  const routePage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await routePage.goto(base + '/about', { waitUntil: 'networkidle' });
  await routePage.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact', exact: true }).click();
  await routePage.waitForURL('**/contact');
  await routePage.waitForFunction(() => document.querySelector('.lf-subpage')?.dataset.motionReady === 'true');
  await routePage.locator('.lf-contact-form').scrollIntoViewIfNeeded();
  await routePage.waitForTimeout(1000);
  assert.equal(await routePage.locator('.lf-contact-main__grid').evaluate(el => getComputedStyle(el).opacity), '1');
  assert.equal(await routePage.locator('.lf-contact-form').evaluate(form => form.checkValidity()), false, 'Empty form validation');
  await routePage.locator('input[name="name"]').fill('QA test');
  await routePage.locator('input[name="phone"]').fill('3035550100');
  await routePage.locator('textarea[name="message"]').fill('Pricing and design verification; not submitted.');
  assert.equal(await routePage.locator('.lf-contact-form').evaluate(form => form.checkValidity()), true, 'Completed form validation');
  await routePage.close();
  for (const mode of ['reduced', 'no-js']) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference', javaScriptEnabled: mode !== 'no-js' });
    for (const path of paths) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('.rh-zoom-enhanced').count(), 0, 'No zoom in accessible fallback');
      assert.equal(await page.locator('[data-rh-reveal], [data-motion-scene], [data-motion-card]').evaluateAll(els => els.every(el => getComputedStyle(el).opacity === '1')), true, `${mode}: content visible`);
    }
    await page.close();
    console.log(`PASS ${mode} all subpages`);
  }
  console.log(`PASS site uniformity. Screenshots: ${shots}. Mobile is emulated, not a physical iPhone test.`);
} finally { await browser.close(); }
