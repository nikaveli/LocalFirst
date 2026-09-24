import assert from "node:assert/strict";
import http from "node:http";
import https from "node:https";

// Run against a production build: npm run seo:check -- http://localhost:3002
// This is a regression check, not a substitute for Google's rendered inspection.
const base = process.argv[2] || "http://localhost:3000";
const origin = "https://localfirstonline.com";
const paths = [
  "/",
  "/about",
  "/contact",
  "/first-impressions",
  "/google-business-profile-resources",
  "/google-business-profile-visual-refresh",
];
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

// Evaluate the applicable crawler groups, not every Disallow in the file.
// Cloudflare can block training bots while continuing to allow Google Search.
function searchRules(text) {
  const groups = [];
  let current;
  for (const line of text.split(/\r?\n/)) {
    const match = line.replace(/#.*/, "").trim().match(/^([^:]+):\s*(.*)$/);
    if (!match) continue;
    const key = match[1].toLowerCase();
    const value = match[2].trim();
    if (key === "user-agent") {
      if (!current || current.hasDirectives) {
        current = { agents: [], rules: [], hasDirectives: false };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
    } else if (current) {
      current.hasDirectives = true;
      if (["allow", "disallow"].includes(key) && value) current.rules.push({ allow: key === "allow", path: value });
    }
  }
  const google = groups.filter((g) => g.agents.includes("googlebot"));
  return (google.length ? google : groups.filter((g) => g.agents.includes("*"))).flatMap((g) => g.rules);
}

function canCrawl(path, rules) {
  const matches = rules.filter((rule) => {
    const anchored = rule.path.endsWith("$");
    const pattern = (anchored ? rule.path.slice(0, -1) : rule.path).split("*").map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*");
    return new RegExp(`^${pattern}${anchored ? "$" : ""}`).test(path);
  }).sort((a, b) => b.path.length - a.path.length || Number(b.allow) - Number(a.allow));
  return matches[0]?.allow ?? true;
}

check(canCrawl("/_next/static/test.js", searchRules("User-agent: *\nAllow: /\nUser-agent: GPTBot\nDisallow: /")), "Robots parser separates training bots from search crawlers");
check(!canCrawl("/_next/static/test.js", searchRules("User-agent: *\nAllow: /\nDisallow: /_next/")), "Robots parser catches blocked rendering resources");

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
  check(schemas.length === (path === "/google-business-profile-resources" ? 3 : 2), `${path}: valid JSON-LD documents`);
  const entities = schemas.flatMap((s) => s["@graph"] || [s]);
  check(entities.some((e) => e["@type"] === "Organization" && e.telephone === "+1-303-524-0591" && e.email === "nick.molina@icloud.com"), `${path}: accurate business entity`);
  check(entities.some((e) => ["WebPage", "AboutPage", "ContactPage", "CollectionPage"].includes(e["@type"]) && e.url === expected), `${path}: page schema`);
  check(entities.filter((e) => e["@type"] === "Service").length === 4, `${path}: four service entities`);
  check(!JSON.stringify(schemas).includes("AggregateRating"), `${path}: no self-serving star markup`);
  if (path === "/google-business-profile-visual-refresh") {
    const servicePage = entities.find((e) => e.url === expected && e.mainEntity);
    check(servicePage?.mainEntity?.offers?.price === "349" && servicePage.mainEntity.offers.priceCurrency === "USD", "Refresh: accurate $349 offer schema");
    check(html.includes("Professional photos of your business") && html.includes("Profile information check"), "Refresh: visible package detail");
    check(tags(html, "a").some((a) => a.href === "sms:+13035240591?body=FIRST"), "Refresh: direct text contact");
    check(html.includes('id="pricing"'), "Refresh: pricing anchor");
    check(["349", "497", "750"].every((price) => html.includes(`<strong>${price}</strong>`)), "Refresh: all three prices visible");
    check(html.includes("added to either profile service") && html.includes("regular price is $1,200"), "Refresh: add-on and standalone photo-shoot pricing is explicit");
    check(html.includes('class="lf-refresh-price-card__standalone"') && html.includes("<strong>$1,200</strong>"), "Refresh: standalone price is prominent inside the photo-shoot card");
    check(tags(html, "a").some((a) => a.href.includes("%24750%20add-on%20Product%20or%20Menu%20Photo%20Shoot")), "Refresh: photo-shoot inquiry identifies the add-on price");
    check(html.includes("Google Business Profile posts for 90 days") && html.includes("360° virtual tour"), "Refresh: complete update scope visible");
  }
  if (path === "/google-business-profile-resources") {
    const itemList = entities.find((e) => e["@type"] === "ItemList");
    const externalGuides = tags(html, "a").filter((a) => /(?:services\.google\.com|uploads\.brandlive\.com)/.test(a.href || ""));
    check(itemList?.numberOfItems === 4 && itemList.itemListElement?.length === 4, "Resources: four-guide ItemList schema");
    check(externalGuides.length === 4 && externalGuides.every((a) => a.target === "_blank" && /noopener/.test(a.rel || "")), "Resources: four safe outbound playbook links");
  }
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
const rules = searchRules(robots);
check([...paths, "/_next/static/test.js", "/_next/image", "/media/localfirst-poster.jpg"].every((path) => canCrawl(path, rules)), "Search pages and rendering resources allowed");
check(robots.includes(`Sitemap: ${origin}/sitemap.xml`), "Sitemap advertised");
const sitemapResponse = await fetch(new URL("/sitemap.xml", base));
const sitemap = await sitemapResponse.text();
check(sitemapResponse.ok, "Sitemap available");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check(locations.length === paths.length && paths.every((p) => locations.includes(`${origin}${p === "/" ? "" : p}`)), "Sitemap contains all canonical pages");

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
