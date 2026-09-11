import type { MetadataRoute } from "next";
import { seoPages, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Only canonical, indexable content. Do not advertise removed DIY routes or
  // generate a new lastModified timestamp without a real content change.
  return Object.keys(seoPages).map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
  }));
}
