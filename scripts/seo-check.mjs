import assert from "node:assert/strict";
import http from "node:http";
import https from "node:https";

// Run against a production build: npm run seo:check -- http://localhost:3002
// This is a regression check, not a substitute for Google's rendered inspection.
const base = process.argv[2] || "http://localhost:3000";
const origin = "https://localfirstonline.com";
const paths = ["/", "/about", "/contact", "/first-impressions"];
const titles = new Set();
const descriptions = new Set();
const assets = new Set();
const links = [];
const pages = new Map();
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); checks++; };
const decode = (value) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]));
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))].map((m) => attributes(m[0]));

for (const path of paths) {
  const response = await fetch(new URL(path, base));
  const html = await response.text();
  pages.set(path, html);
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] || "");
  const meta = Object.fromEntries(tags(html, "meta").map((m) => [m.name || m.property, m.content]));
  const canonical = tags(html, "link").filter((l) => l.rel === "canonical");
  const expected = `${origin}${path === "/" ? "" : path}`;

  check(response.status === 200, `${path}: HTTP 200`);
  check(!/noindex|none/i.test(response.headers.get("x-robots-tag") || ""), `${path}: HTTP permits indexing`);
  check(!/noindex|none/i.test(meta.robots || ""), `${path}: metadata permits indexing`);
  check(title.length >= 50 && title.length <= 60, `${path}: editorial title length`);
  check(!titles.has(title), `${path}: unique title`);
  titles.add(title);
  check(meta.description?.length >= 150 && meta.description.length <= 160, `${path}: editorial description length`);
  check(!descriptions.has(meta.description), `${path}: unique description`);
  descriptions.add(meta.description);
  check(canonical.length === 1 && canonical[0].href === expected, `${path}: single correct canonical`);
  check(meta["og:url"] === expected && meta["og:title"] === title, `${path}: route-specific Open Graph`);
  check(meta["og:description"] === meta.description, `${path}: consistent social description`);
  check(meta["og:image"]?.startsWith(`${origin}/`) && Boolean(meta["og:image:alt"]), `${path}: absolute share image and alt`);
  check(meta["twitter:card"] === "summary_large_image" && meta["twitter:title"] === title, `${path}: Twitter card`);
  check(tags(html, "h1").length === 1, `${path}: one server-rendered H1`);
  check(tags(html, "html")[0]?.lang === "en", `${path}: document language`);
  check(meta.viewport?.includes("width=device-width"), `${path}: responsive viewport`);
  check(!/(?:src|poster)="http:\/\//i.test(html), `${path}: no insecure embedded resources`);
  check(tags(html, "img").every((img) => Object.hasOwn(img, "alt")), `${path}: every image has an alt attribute`);

  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  check(schemas.length === 2, `${path}: valid JSON-LD documents`);
  const entities = schemas.flatMap((s) => s["@graph"] || [s]);
  check(entities.some((e) => e["@type"] === "Organization" && e.telephone === "+1-303-524-0591" && e.email === "nick.molina@icloud.com"), `${path}: accurate business entity`);
  check(entities.some((e) => ["WebPage", "AboutPage", "ContactPage", "CollectionPage"].includes(e["@type"]) && e.url === expected), `${path}: page schema`);
  check(entities.filter((e) => e["@type"] === "Service").length === 4, `${path}: four service entities`);
  check(!JSON.stringify(schemas).includes("AggregateRating"), `${path}: no self-serving star markup`);
  for (const tag of ["img", "script", "video", "link"]) {
    for (const attrs of tags(html, tag)) {
      const src = attrs.src || attrs.poster || (["stylesheet", "preload"].includes(attrs.rel) ? attrs.href : undefined);
      if (src?.startsWith("/")) assets.add(src);
      if (attrs.poster?.startsWith("/")) assets.add(attrs.poster);
    }
  }
  assets.add(new URL(meta["og:image"]).pathname);
  for (const link of tags(html, "a")) {
    if (link.href?.startsWith("/") || link.href?.startsWith("#")) links.push({ from: path, href: link.href });
  }
  console.log(`PASS ${path}: metadata, headings, indexing, schema, images`);
}

for (const { from, href } of links) {
  const target = new URL(href, new URL(from, base));
  check(paths.includes(target.pathname), `${from}: internal destination ${href}`);
  if (target.hash) check(pages.get(target.pathname).includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `${from}: fragment ${href}`);
}

for (const asset of assets) {
  const response = await fetch(new URL(asset, base), { method: "HEAD" });
  check(response.ok, `Asset exists: ${asset}`);
}
console.log(`PASS ${links.length} internal links/fragments and ${assets.size} assets`);

const gallery = tags(pages.get("/first-impressions"), "video");
check(gallery.length === 15 && gallery.every((v) => v.src && v.poster && v.preload === "none"), "Gallery: all 15 videos discoverable, playback deferred");
const robotsResponse = await fetch(new URL("/robots.txt", base));
const robots = await robotsResponse.text();
check(robotsResponse.ok && /User-Agent: \*/i.test(robots), "robots.txt available");
check(/Allow: \/\s/i.test(robots) && !/Disallow: \/(?:_next|media|\s)/i.test(robots), "Rendering resources allowed");
check(robots.includes(`Sitemap: ${origin}/sitemap.xml`), "Sitemap advertised");
const sitemapResponse = await fetch(new URL("/sitemap.xml", base));
const sitemap = await sitemapResponse.text();
check(sitemapResponse.ok, "Sitemap available");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check(locations.length === paths.length && paths.every((p) => locations.includes(`${origin}${p === "/" ? "" : p}`)), "Sitemap contains exactly four canonical pages");

for (const path of ["/diy", "/diy-google-profile", "/seo-check-missing-page"]) {
  const response = await fetch(new URL(path, base));
  const html = await response.text();
  check(response.status === 404, `${path}: actual 404 status`);
  check(tags(html, "meta").some((m) => m.name === "robots" && /noindex/.test(m.content)), `${path}: noindex`);
  check(!tags(html, "link").some((l) => l.rel === "canonical"), `${path}: no misleading canonical`);
}
// Node's Fetch strips a custom Host header; use the HTTP client for this check.
const redirectUrl = new URL("/about?source=seo-check", base);
const getRedirect = (headers) => new Promise((resolve, reject) => {
  const client = redirectUrl.protocol === "https:" ? https : http;
  const request = client.get(redirectUrl, { headers }, (response) => {
    response.resume();
    resolve({ status: response.statusCode, location: response.headers.location });
  });
  request.on("error", reject);
});
const redirect = await getRedirect({ host: "www.localfirstonline.com" });
check(redirect.status === 308 && redirect.location === `${origin}/about?source=seo-check`, "www permanently redirects to HTTPS apex and preserves path/query");
console.log(`PASS ${checks} checks. Live indexation, field performance, and external validation remain separate.`);
