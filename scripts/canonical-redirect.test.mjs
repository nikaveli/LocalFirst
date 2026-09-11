import { test } from "node:test";
import assert from "node:assert/strict";
import { canonicalRedirectUrl } from "../lib/canonical-redirect.mjs";

test("HTTP apex redirects once to HTTPS, preserving path and query", () => {
  assert.equal(canonicalRedirectUrl("http://localfirstonline.com/about?source=google"), "https://localfirstonline.com/about?source=google");
});
test("HTTP www combines scheme and host normalization", () => {
  assert.equal(canonicalRedirectUrl("http://www.localfirstonline.com/contact"), "https://localfirstonline.com/contact");
});
test("HTTPS www redirects to apex", () => {
  assert.equal(canonicalRedirectUrl("https://www.localfirstonline.com/"), "https://localfirstonline.com/");
});
test("Canonical HTTPS does not loop", () => {
  assert.equal(canonicalRedirectUrl("https://localfirstonline.com/about"), null);
});
test("Local and Workers preview hosts stay usable", () => {
  assert.equal(canonicalRedirectUrl("http://localhost:8787/"), null);
  assert.equal(canonicalRedirectUrl("https://localfirst.nikaveli.workers.dev/"), null);
});
test("Host matching is exact and does not affect unrelated hosts", () => {
  assert.equal(canonicalRedirectUrl("https://localfirstonline.com.example.org/"), null);
});
