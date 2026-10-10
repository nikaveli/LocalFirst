import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const base = process.argv[2] || "http://localhost:3000";
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
try {
  for (const [name, width, height] of [["desktop", 1440, 1000], ["mobile", 390, 844], ["small-mobile", 360, 800]]) {
    const page = await browser.newPage({ viewport: { width, height }, isMobile: width < 768, hasTouch: width < 768, reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(base, { waitUntil: "load" });
    const schema = await page.locator('head script[type="application/ld+json"]').allTextContents();
    const entities = schema.flatMap(s => JSON.parse(s)["@graph"] || [JSON.parse(s)]);
    assert.equal(entities.filter(e => e["@type"] === "ProfessionalService").length, 1);
    assert.equal(await page.locator("h1").count(), 1);
    const updates = page.locator("#updates");
    await updates.scrollIntoViewIfNeeded();
    assert.equal(await updates.evaluate(el => el.previousElementSibling.id), "about");
    assert.equal(await updates.evaluate(el => el.nextElementSibling.id), "faqs");
    const posts = page.frameLocator("#local-posts-iframe");
    await posts.locator(".post").first().waitFor({ timeout: 30000 });
    assert.ok(await posts.locator(".view-post-button").count() > 0);
    assert.equal(await page.locator("#local-posts-iframe").getAttribute("loading"), "lazy");
    assert.equal(await page.locator("#local-posts-iframe").evaluate(el => el.getBoundingClientRect().height), 480);
    assert.equal(await posts.locator(".App").evaluate(el => el.scrollWidth > el.clientWidth), false);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.screenshot({ path: `/tmp/localfirst-posts-${name}.png` });
    console.log(`PASS ${name}: posts loaded between founder and FAQ, lazy loaded, 480px tall, no horizontal overflow`);
    const faq = page.locator("#faqs");
    await faq.scrollIntoViewIfNeeded();
    const frame = page.frameLocator("#ai-seo-iframe");
    await frame.locator(".accordion-trigger").first().waitFor({ timeout: 30000 });
    assert.ok(await frame.locator(".accordion-trigger").count() > 0);
    assert.equal(await frame.locator(".accordion-content.open").count(), 1, "Only the first answer starts open");
    assert.equal(await frame.locator("#content-0").evaluate(e => e.classList.contains("open")), true);
    assert.equal(await frame.locator(".title").count(), 1, "Provider heading shown as supplied");
    assert.equal(await page.locator(".rh-faq-embed").evaluate(el => getComputedStyle(el).height), "600px");
    assert.equal(await page.locator("#ai-seo-iframe").evaluate(el => getComputedStyle(el).colorScheme), "light", "Avoid opaque dark/light iframe canvas");
    const colors = await frame.locator(".accordion-wrapper").first().evaluate(el => ({
      panel: getComputedStyle(document.querySelector(".App")).backgroundColor,
      card: getComputedStyle(el).backgroundColor,
      question: getComputedStyle(el.querySelector(".accordion-trigger")).color,
      answer: getComputedStyle(el.querySelector(".accordion-content")).color,
    }));
    assert.equal(colors.panel, "rgba(0, 0, 0, 0)", "Transparent widget background");
    assert.equal(colors.question, "rgb(0, 0, 0)", "Black questions as supplied");
    assert.equal(await frame.locator(".accordion-wrapper").first().evaluate(el => getComputedStyle(el).borderRadius), "13px");
    const rgba = value => value.match(/[\d.]+/g).map(Number);
    const luminance = rgb => rgb.slice(0, 3).map(n => n / 255).map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4).reduce((sum, n, i) => sum + n * [.2126, .7152, .0722][i], 0);
    const card = rgba(colors.card);
    const background = card[3] === 0 ? rgba(await page.locator(".rh-faq-embed").evaluate(el => getComputedStyle(el).backgroundColor)) : card;
    const answer = rgba(colors.answer);
    const answerRgb = answer.slice(0, 3).map((n, i) => n * (answer[3] ?? 1) + background[i] * (1 - (answer[3] ?? 1)));
    const contrast = (luminance(background) + .05) / (luminance(answerRgb) + .05);
    assert.ok(contrast >= 4.5, `Answer contrast ${contrast.toFixed(2)}:1`);
    await frame.locator(".accordion-trigger").first().click();
    assert.equal(await frame.locator("#content-0").evaluate(e => e.classList.contains("open")), false);
    await frame.locator(".accordion-trigger").first().click();
    assert.equal(await frame.locator("#content-0").evaluate(e => e.classList.contains("open")), true);
    await frame.locator(".App").evaluate(e => { e.scrollTop = e.scrollHeight; });
    assert.ok(await frame.locator(".App").evaluate(e => e.scrollTop > 0), "Remaining FAQs reachable inside widget");
    await frame.locator(".App").evaluate(e => { e.scrollTop = 0; });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.equal(await frame.locator(".App").evaluate(e => e.scrollWidth > e.clientWidth), false);
    assert.equal(await page.locator("#ai-seo-iframe").getAttribute("title"), "LocalFirst frequently asked questions");
    assert.equal(await page.locator("#ai-seo-iframe").getAttribute("loading"), "lazy");
    await page.screenshot({ path: `/tmp/localfirst-faq-${name}.png`, fullPage: false });
    await page.locator(".rh-close").scrollIntoViewIfNeeded();
    assert.ok(await page.locator('.rh-close a[href^="sms:"]').count() > 0);
    assert.deepEqual(errors, []);
    console.log(`PASS ${name}: supplied 600px transparent embed, first answer open, ${contrast.toFixed(2)}:1 answer contrast, schema in head, expand/collapse, inner scrolling, no horizontal overflow, final CTA accessible`);
    await page.close();
  }
} finally {
  await browser.close();
}
