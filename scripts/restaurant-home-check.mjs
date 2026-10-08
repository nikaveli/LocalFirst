import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const base = process.argv[2] || 'http://localhost:3000';
const shots = '/tmp/localfirst-restaurant-qa';
await mkdir(shots, { recursive: true });
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
try {
  for (const [name, width, height, mobile] of [['desktop', 1440, 1000, false], ['mobile', 440, 956, true], ['small', 360, 800, true]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
    const errors = [], requests = [];
    page.on('pageerror', error => { errors.push(error.message); console.error(error.message); });
    page.on('request', request => requests.push(request.url()));
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.querySelector('[data-restaurant-home]')?.dataset.motionReady === 'true');
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    assert.equal(await page.locator('h1').count(), 1, 'One H1');
    assert.equal(await page.locator('[data-bg-zoom-init]').count(), 2, 'Two Osmo zooms');
    assert.equal(await page.locator('[data-sc-act], canvas').count(), 0, 'Old scroll hero removed');
    const video = page.locator('.rh-hero video');
    await page.screenshot({ path: `${shots}/${name}-initial.png` });
    await page.waitForFunction(() => document.querySelector('.rh-hero video')?.getAttribute('src'), null, { timeout: 15000 });
    assert.ok((await video.getAttribute('src')).includes(mobile ? 'hero-mobile-v2.mp4' : 'hero-desktop-v2.mp4'), 'Correct responsive video');
    await page.waitForFunction(() => document.querySelector('.rh-hero video')?.currentTime > 0, null, { timeout: 30000 });
    const before = await video.evaluate(el => el.currentTime);
    await page.waitForTimeout(500);
    assert.ok(await video.evaluate((el, t) => el.currentTime > t, before), 'Video advances independently');
    await page.screenshot({ path: `${shots}/${name}-hero.png` });
    await page.getByRole('button', { name: 'Pause film' }).click();
    assert.equal(await video.evaluate(el => el.paused), true, 'Pause control works');
    await page.getByRole('button', { name: 'Play film' }).click();
    await page.waitForTimeout(300);
    assert.equal(await video.evaluate(el => el.paused), false, 'Play control works');

    // Sample both halves of each Flip sequence and verify continuous expansion.
    const zooms = [];
    for (const id of ['work', 'signature']) {
      const geometry = await page.locator(`#${id}`).evaluate(el => {
        const start = el.querySelector('[data-bg-zoom-start]').getBoundingClientRect();
        const end = el.querySelector('[data-bg-zoom-end]').getBoundingClientRect();
        return { from: start.top + scrollY - innerHeight, to: end.top + scrollY + end.height / 2 - innerHeight / 2 };
      });
      const widths = [];
      for (const progress of [0, .5, 1]) {
        await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), geometry.from + (geometry.to - geometry.from) * progress);
        await page.waitForTimeout(250);
        widths.push(await page.locator(`#${id} [data-bg-zoom-content]`).evaluate(el => el.getBoundingClientRect().width));
        if (progress === .5) await page.screenshot({ path: `${shots}/${name}-${id}-zoom.png` });
      }
      assert.ok(widths[1] > widths[0] && widths[2] > widths[1], `${id}: image expands with scroll (${widths.join(', ')})`);
      assert.ok(Math.abs(widths[2] - width) < 3, `${id}: image fills section width`);
      zooms.push({ id, widths });
      await page.evaluate(() => scrollBy({ top: innerHeight * .45, behavior: 'instant' }));
      await page.waitForTimeout(250);
      await page.screenshot({ path: `${shots}/${name}-${id}-story.png` });
    }
    for (const selector of ['.rh-gallery', '#how-it-works', '#pricing', '#monthly', '#training', '#about', '.rh-close']) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(950);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `No overflow at ${selector}`);
      await page.screenshot({ path: `${shots}/${name}-${selector.replace(/[.#]/g, '')}.png` });
    }
    assert.equal(await video.evaluate(el => el.paused), true, 'Offscreen hero pauses');
    const priceText = await page.locator('#pricing').innerText();
    for (const price of ['$349', '$497', '$750', '$1,200']) assert.ok(priceText.includes(price), `${price} visible`);
    const refresh = await page.locator('#pricing .rh-price-card').first().innerText();
    for (const detail of ['2–3-hour on-site shoot', '20 photos total', '5 signature dish photos', '5 specials photos', 'within one week of your shoot']) {
      assert.ok(refresh.includes(detail), `Visual Refresh: ${detail}`);
    }
    const monthly = page.locator('#monthly .rh-price-card');
    assert.equal(await monthly.count(), 2, 'Two monthly plans');
    for (const [index, price] of ['299', '497'].entries()) {
      const card = monthly.nth(index);
      const copy = await card.innerText();
      for (const text of [`$${price}`, 'per month', '8–10 new photos every month', '1 short video clip every month']) assert.ok(copy.includes(text), `Monthly ${price}: ${text}`);
      const sms = new URL(await card.locator('.rh-price-link').getAttribute('href'));
      assert.equal(sms.pathname, '+13035240591');
      assert.ok(sms.searchParams.get('body').includes(`$${price}/month`), 'SMS identifies monthly plan');
    }
    assert.ok((await monthly.nth(1).innerText()).includes('Ongoing Google Business Profile updates'));
    const training = page.locator('#pricing #training');
    const trainingCopy = await training.innerText();
    for (const detail of ['$497', 'one time', 'No photography booking required.', 'No monthly subscription.', '2 hours at your business', 'A guide to keep', 'A 1-hour follow-up']) {
      assert.ok(trainingCopy.includes(detail), `Standalone training: ${detail}`);
    }
    const trainingSms = new URL(await training.getByRole('link', { name: 'Ask Nick about training' }).getAttribute('href'));
    assert.equal(trainingSms.protocol, 'sms:');
    assert.equal(trainingSms.pathname, '+13035240591');
    assert.ok(trainingSms.searchParams.get('body').includes('standalone Google Business Profile training at $497'));
    assert.equal(await page.locator('main').evaluate(el => [...el.querySelectorAll('*')].filter(n => n.children.length === 0 && n.textContent.includes('$') && !n.closest('#pricing')).length), 0, 'Prices only in pricing');
    const contact = new URL(await page.locator('.rh-close .btn-bubble-arrow').getAttribute('href'));
    assert.equal(contact.pathname, '+13035240591');
    assert.ok(contact.searchParams.get('body').includes('plan a photo shoot for my business'));
    assert.ok(!requests.some(url => /\/frames\/|hq-v3|scrollcraft\.js/.test(url)), 'No legacy hero downloads');
    assert.equal(new Set(requests.filter(url => /hero-.*\.mp4/.test(url))).size, 1, 'Only one video source downloaded');
    if (mobile) {
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.getByRole('button', { name: 'Menu', exact: true }).click();
      await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Pricing', exact: true }).click();
      await page.waitForTimeout(500);
      assert.equal(await page.getByRole('button', { name: 'Menu', exact: true }).getAttribute('aria-expanded'), 'false');
      assert.equal(await page.evaluate(() => location.hash), '#pricing');
      await page.setViewportSize({ width, height: height - 90 });
      await page.waitForTimeout(400);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Toolbar resize stable');
    }
    assert.deepEqual(errors, [], 'No browser errors');
    console.log(JSON.stringify({ name, zooms, errors, video: await video.getAttribute('src') }));
    await page.close();
  }
  for (const mode of ['reduced', 'no-js']) {
    const page = await browser.newPage({ viewport: { width: 440, height: 956 }, isMobile: true, hasTouch: true, reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference', javaScriptEnabled: mode !== 'no-js' });
    const requests = [];
    page.on('request', request => requests.push(request.url()));
    await page.goto(base, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.rh-zoom-enhanced').count(), 0, 'Static accessible fallback');
    assert.equal(requests.some(url => /hero-.*\.mp4/.test(url)), false, 'No automatic video in fallback');
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    assert.ok((await page.locator('#pricing').innerText()).includes('$1,200'));
    await page.screenshot({ path: `${shots}/${mode}-pricing.png` });
    await page.close();
    console.log(`PASS ${mode}`);
  }
  console.log(`PASS restaurant homepage. Screenshots: ${shots}. Emulation is not a physical iPhone test.`);
} finally { await browser.close(); }
