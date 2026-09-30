import { chromium } from 'playwright-core';

const base = process.argv[2] || 'http://localhost:3005';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
try {
  for (const mobile of [true, false]) {
    const page = await browser.newPage({ viewport: { width: mobile ? 440 : 1440, height: mobile ? 800 : 1000 }, isMobile: mobile, hasTouch: mobile });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Performance.enable');
    if (mobile) await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    for (const [path, ids] of [['/', ['work', 'signature']], ['/google-business-profile-visual-refresh', ['on-location']]]) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => document.querySelector('[data-site-motion]'));
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.querySelectorAll('[data-bg-zoom-img] img')].map(img => { img.loading = 'eager'; return img.decode(); }));
      });
      await page.waitForTimeout(500);
      for (const id of ids) {
        const range = await page.locator(`#${id}`).evaluate(el => {
          const start = el.querySelector('[data-bg-zoom-start]').getBoundingClientRect();
          const end = el.querySelector('[data-bg-zoom-end]').getBoundingClientRect();
          return { from: start.top + scrollY - innerHeight, to: end.top + scrollY + end.height / 2 - innerHeight / 2 };
        });
        await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), range.from);
        await page.waitForTimeout(200);
        const before = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m => [m.name, m.value]));
        const result = await page.evaluate(async ({ id, from, to }) => {
          const content = document.querySelector(`#${id} [data-bg-zoom-content]`);
          const sizes = new Set();
          const intervals = [];
          let previous = 0;
          await new Promise(resolve => {
            let began;
            function step(now) {
              began ??= now;
              if (previous) intervals.push(now - previous);
              previous = now;
              sizes.add(`${content.style.width}/${content.style.height}`);
              const progress = Math.min(1, (now - began) / 2400);
              scrollTo({ top: from + (to - from) * progress, behavior: 'instant' });
              if (progress < 1) requestAnimationFrame(step); else resolve();
            }
            requestAnimationFrame(step);
          });
          return { dimensionVariants: sizes.size, frames: intervals.length, over33ms: intervals.filter(n => n > 33.5).length, maxFrameMs: Math.round(Math.max(...intervals)) };
        }, { id, ...range });
        const after = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m => [m.name, m.value]));
        console.log(JSON.stringify({ mobile, path, id, ...result, layouts: after.LayoutCount - before.LayoutCount, layoutMs: Math.round((after.LayoutDuration - before.LayoutDuration) * 1000), styleMs: Math.round((after.RecalcStyleDuration - before.RecalcStyleDuration) * 1000) }));
      }
    }
    await page.close();
  }
} finally { await browser.close(); }
