import type { MetadataRoute } from "next";
import { profile } from "./content";

// One-page site, so one URL. lastModified is left out on purpose (no build-time clock).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: profile.site, changeFrequency: "monthly", priority: 1 }];
}
