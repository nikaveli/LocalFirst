// @ts-check
import { defineCloudflareConfig } from '@opennextjs/cloudflare';

/**
 * OpenNext config for Cloudflare Workers + Pages.
 *
 * Defaults are correct for this site:
 *  - SSR/RSC for app router (Server Actions on /contact, dynamic OG image, etc.)
 *  - Static assets served from Cloudflare's edge
 *  - No KV/D1/R2 bindings required for v1 of the site
 *
 * If we later need ISR / on-demand revalidation, swap the incrementalCache here
 * for `r2IncrementalCache` or `kvIncrementalCache`.
 */
export default defineCloudflareConfig();
