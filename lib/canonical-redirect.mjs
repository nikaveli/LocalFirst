export function canonicalRedirectUrl(input) {
  const url = new URL(input);
  if (!["localfirstonline.com", "www.localfirstonline.com"].includes(url.hostname)) return null;
  if (url.protocol === "https:" && url.hostname === "localfirstonline.com") return null;
  url.protocol = "https:";
  url.hostname = "localfirstonline.com";
  url.port = "";
  return url.href;
}
