import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium, webkit } from 'playwright-core';

const base = process.argv[2] || 'http://localhost:3005';
const engine = process.argv[3] || 'chromium';
const only = process.env.PORTFOLIO_FIRST_ONLY === '1';
const shots = '/tmp/localfirst-website-qa';
await mkdir(shots, { recursive: true });
const browser = await (engine === 'webkit' ? webkit.launch({ headless: true }) : chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }));
try {
  for (const [name, width, height, mobile] of engine === 'webkit' ? [['iphone', 440, 956, true]] : [['desktop', 1440, 1000, false], ['mobile', 440, 956, true]]) {
    const page = await browser.newPage({ viewport: { width, height }, screen: { width, height }, isMobile: mobile, hasTouch: mobile });
    const errors = [], requests = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => requests.push(request.url()));
    if (mobile && engine === 'chromium') {
      const cdp = await page.context().newCDPSession(page);
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    }
    await page.goto(base + '/website-development', { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.querySelectorAll('.wd-preview[data-ready]').length === 5);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('h1').count(), 1);
    const destinations = {
      denverdryice: 'https://denverdryiceblasters.com/',
      summit: 'https://www.summitcustombuilders.net/',
      petsfavoritehuman: 'https://yourpetsfavoritehuman.com/',
      praxis: 'https://praxis.nikaveli.workers.dev/',
      localfirst: 'https://localfirstonline.com/',
    };
    for (const [id, destination] of Object.entries(destinations)) {
      const link = page.locator(`#project-${id} .wd-project-visit a`);
      assert.equal(await link.getAttribute('href'), destination, `${id}: correct live destination`);
      assert.equal(await link.getAttribute('target'), '_blank');
      assert.equal(await link.getAttribute('rel'), 'noopener noreferrer');
    }
    assert.equal(requests.filter(url => /website-portfolio.*mp4/.test(url)).length, 0, 'No portfolio videos downloaded above the fold');
    await page.screenshot({ path: `${shots}/${engine}-${name}-hero.png` });
    const previews = page.locator('.wd-preview');
    for (let i = 0; i < (only ? 1 : 5); i++) {
      const preview = previews.nth(i);
      const id = await preview.getAttribute('data-project');
      const trackViewports = await preview.evaluate(root => {
        const compact = innerWidth <= 767;
        const pin = root.querySelector(compact ? '.wd-preview-media' : '[data-preview-stage]');
        const intro = compact ? root.querySelector('.wd-project-heading').offsetHeight : 0;
        return (root.offsetHeight - intro - pin.offsetHeight) / innerHeight;
      });
      assert.ok(Math.abs(trackViewports - 5.2) < .01, `${id}: slower 5.2-screen scroll distance`);
      const scroll = async progress => {
        await preview.evaluate((root, progress) => {
          const compact = innerWidth <= 767;
          const stage = root.querySelector(compact ? '.wd-preview-media' : '[data-preview-stage]');
          const intro = compact ? root.querySelector('.wd-project-heading').offsetHeight : 0;
          scrollTo({ top: root.getBoundingClientRect().top + scrollY + intro - (compact ? 12 : 24) + (root.offsetHeight - intro - stage.offsetHeight) * progress, behavior: 'instant' });
        }, progress);
      };
      await scroll(.05);
      if (mobile) await page.touchscreen.tap(width - 10, height / 2);
      await page.waitForFunction(id => {
        const video = document.querySelector(`[data-project="${id}"] video`);
        return video.readyState >= 2 && video.seekable.length && video.seekable.end(0) > 0;
      }, id, { timeout: 30000 });
      for (const progress of [.12, .5, .92, .25]) {
        await scroll(progress);
        await page.waitForFunction(({ id, progress }) => {
          const video = document.querySelector(`[data-project="${id}"] video`);
          return Math.abs(video.currentTime - progress * (video.duration - 1 / 30)) < .4;
        }, { id, progress }, { timeout: 15000 });
        const bounds = await preview.evaluate(root => {
          const compact = innerWidth <= 767;
          const title = root.querySelector(compact ? '.wd-preview-caption' : 'h3').getBoundingClientRect();
          const description = root.querySelector('.wd-project-heading > div:last-child').getBoundingClientRect();
          const film = root.querySelector('.wd-preview-frame').getBoundingClientRect();
          const stage = root.querySelector(compact ? '.wd-preview-media' : '[data-preview-stage]').getBoundingClientRect();
          return { compact, title: title.top, description: description.bottom, film: film.bottom, filmWidth: film.width, width: innerWidth, stage: stage.top, viewport: innerHeight };
        });
        const pinTop = bounds.compact ? 12 : 24;
        assert.ok(Math.abs(bounds.stage - pinTop) < 2, `${id}: project stage is pinned`);
        assert.ok(bounds.title >= pinTop, `${id}: project title stays visible at ${progress}`);
        if (bounds.compact) assert.ok(bounds.filmWidth / bounds.width > .8, `${id}: mobile movie fills most of the screen width`);
        else assert.ok(bounds.description < bounds.viewport, `${id}: desktop description stays visible`);
        assert.ok(bounds.film <= bounds.viewport, `${id}: complete film stays in view`);
      }
      await page.waitForFunction(id => document.querySelector(`[data-project="${id}"]`).dataset.painted === 'true', id);
      assert.equal(await preview.getAttribute('data-tier'), mobile ? 'mobile' : 'desktop');
      assert.ok(requests.some(url => url.endsWith(`${id}-${mobile ? 'mobile' : 'desktop'}.mp4`)), 'Correct media tier');
      assert.ok(!(requests.some(url => url.endsWith(`${id}-${mobile ? 'desktop' : 'mobile'}.mp4`))), 'No wrong-tier movie download');
      assert.ok(await page.locator('.wd-preview video[src]').count() <= 2, 'Offscreen decoders released');
      if (i === 0) {
        for (const progress of [.9, .1, .8, .3]) await scroll(progress);
        await page.waitForFunction(() => Math.abs(document.querySelector('.wd-preview video').currentTime / document.querySelector('.wd-preview video').duration - .3) < .03);
        await page.screenshot({ path: `${shots}/${engine}-${name}-scrub.png` });
        if (mobile) {
          const before = await preview.evaluate(root => root.offsetHeight);
          await page.setViewportSize({ width, height: height - 80 });
          await page.waitForTimeout(300);
          assert.equal(await preview.evaluate(root => root.offsetHeight), before, 'Toolbar-height change does not rebuild scroll track');
          await page.setViewportSize({ width: height, height: width });
          await scroll(.5);
          await page.waitForFunction(() => Math.abs(document.querySelector('.wd-preview video').currentTime / document.querySelector('.wd-preview video').duration - .5) < .03);
          assert.equal(await preview.getAttribute('data-tier'), 'mobile', 'Phone keeps the light encode in landscape');
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Rotation has no horizontal overflow');
          await page.setViewportSize({ width, height });
          await scroll(.3);
        }
      }
      await preview.locator('button').click();
      await page.waitForFunction(id => !document.querySelector(`[data-project="${id}"] video`).paused, id);
      await preview.locator('video').evaluate(video => video.pause());
      await scroll(1.1);
      assert.ok(await preview.evaluate(root => root.querySelector(innerWidth <= 767 ? '.wd-preview-media' : '[data-preview-stage]').getBoundingClientRect().top < 0), 'Pinned preview releases after scrub');
      console.log(`PASS ${engine}/${name}/${id}: forward, reverse, real frames, manual play, bounded loading`);
    }
    await page.locator('#website-pricing').scrollIntoViewIfNeeded();
    assert.equal(await page.locator('#website-pricing').getByText(/\$\d/).count(), 0, 'No invented prices');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'No horizontal overflow');
    for (const link of await page.locator('main a[href^="sms:"]').all()) {
      const url = new URL(await link.getAttribute('href'));
      assert.equal(url.pathname, '+13035240591');
      assert.ok(url.searchParams.get('body').includes('website'));
    }
    assert.deepEqual(errors, []);
    await page.close();
  }
  if (!only) for (const mode of ['reduced', 'no-js']) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, javaScriptEnabled: mode !== 'no-js', reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });
    const movies = [];
    page.on('request', request => { if (request.url().endsWith('.mp4')) movies.push(request.url()); });
    await page.goto(base + '/website-development', { waitUntil: 'networkidle' });
    for (const preview of await page.locator('.wd-preview').all()) {
      await preview.scrollIntoViewIfNeeded();
      assert.equal(await preview.getAttribute('data-mode'), 'static');
      assert.ok(await preview.evaluate(root => Math.abs(root.offsetHeight - root.querySelector('.wd-project-heading').offsetHeight - root.querySelector('.wd-preview-media').offsetHeight) < 3), 'Static preview has natural content height, no scroll spacer');
    }
    assert.deepEqual(movies, [], 'No automatic video loads in fallback mode');
    console.log(`PASS ${engine}/${mode}`);
    await page.close();
  }
  if (!only && engine === 'chromium') {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/denverdryice-desktop.mp4', route => route.abort());
    await page.goto(base + '/website-development', { waitUntil: 'networkidle' });
    const first = page.locator('.wd-preview').first();
    await first.locator('[data-preview-stage]').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('[data-preview-status]').textContent.includes('could not load'));
    assert.notEqual(await first.getAttribute('data-painted'), 'true', 'Network failure keeps the poster visible');
    await page.unroute('**/denverdryice-desktop.mp4');
    await first.locator('button').click();
    await page.waitForFunction(() => document.querySelector('.wd-preview video').currentTime > 0);
    await page.locator('.rh-footer').scrollIntoViewIfNeeded();
    await page.getByRole('navigation', { name: 'Footer navigation' }).getByRole('link', { name: 'About Nick', exact: true }).click();
    await page.waitForURL('**/about');
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Websites', exact: true }).click();
    await page.waitForURL('**/website-development');
    await page.waitForFunction(() => document.querySelectorAll('.wd-preview[data-ready]').length === 5);
    assert.deepEqual(errors, [], 'Client-side navigation cleans up and remounts the engine');
    await page.close();
    const saver = await browser.newPage();
    const movies = [];
    await saver.addInitScript(() => Object.defineProperty(navigator, 'connection', { value: { saveData: true }, configurable: true }));
    saver.on('request', request => { if (request.url().endsWith('.mp4')) movies.push(request.url()); });
    await saver.goto(base + '/website-development', { waitUntil: 'networkidle' });
    await saver.locator('.wd-preview').first().scrollIntoViewIfNeeded();
    assert.equal(await saver.locator('.wd-preview').first().getAttribute('data-mode'), 'static');
    assert.deepEqual(movies, [], 'Data saver does not load video automatically');
    await saver.close();
    console.log('PASS retry, route cleanup, and data saver');
  }
  if (!only) for (const [width, height] of [[440, 800], [390, 700], [375, 667], [320, 568]]) {
    // Visible browser height, not the full phone screen: catches thumbnail-sized
    // movies that can pass tests using a tall, toolbar-free emulator viewport.
    const page = await browser.newPage({ viewport: { width, height }, screen: { width: 440, height: 956 }, isMobile: true, hasTouch: true });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '/website-development', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    for (const root of await page.locator('.wd-preview').all()) {
      await root.evaluate(root => {
        const intro = root.querySelector('.wd-project-heading').offsetHeight;
        const pin = root.querySelector('.wd-preview-media');
        scrollTo({ top: root.getBoundingClientRect().top + scrollY + intro - 12 + (root.offsetHeight - intro - pin.offsetHeight) * .4, behavior: 'instant' });
      });
      await page.waitForTimeout(150);
      const size = await root.evaluate(root => {
        const media = root.querySelector('.wd-preview-media').getBoundingClientRect();
        const film = root.querySelector('.wd-preview-frame').getBoundingClientRect();
        return { id: root.dataset.project, top: media.top, bottom: media.bottom, width: film.width, mode: root.dataset.mode };
      });
      assert.equal(size.mode, 'scroll');
      assert.ok(Math.abs(size.top - 12) < 2);
      assert.ok(size.bottom <= height, `${size.id}: pinned video and controls fit the visible browser`);
      assert.ok(size.width / width >= .7, `${size.id}: video retains useful size on short phones`);
      if (size.id === 'summit') await page.screenshot({ path: `${shots}/${engine}-large-mobile-${width}.png` });
      await root.locator('.wd-preview-caption a').click();
      await page.waitForFunction(id => {
        const rect = document.querySelector(`[data-project="${id}"] .wd-project-heading`).getBoundingClientRect();
        return rect.top >= 0 && rect.bottom < innerHeight;
      }, size.id);
    }
    assert.deepEqual(errors, []);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    console.log(`PASS ${engine}/${width}x${height}: large mobile videos, visible controls, project details link`);
    await page.close();
  }
} finally { await browser.close(); }
