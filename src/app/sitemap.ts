// src/app/sitemap.ts
// Source-of-truth sitemap generator for ndt-connect.com.
// Next.js 14 App Router will serve this at /sitemap.xml.
// Add new public routes here when they ship.

import type { MetadataRoute } from "next";
import { FREE_TOOLS } from "@/data/freeTools";
import { CITIES, REGIONS, COUNTRIES } from "@/data/cities";

const SITE = "https://ndt-connect.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/find-providers`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/find-providers/map`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/recommendations`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/request-service`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/register`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/free-tools`, lastModified, changeFrequency: "weekly", priority: 0.95 },
  ];

  const featureUrls: MetadataRoute.Sitemap = FREE_TOOLS.map(t => ({
    url: `${SITE}/free-tools/${t.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const cityUrls: MetadataRoute.Sitemap = [];
  for (const t of FREE_TOOLS) {
    for (const c of CITIES) {
      cityUrls.push({
        url: `${SITE}/free-tools/${t.slug}/${c.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  // Region rollups (when /free-tools/[feature]/region/[region] ships).
  const regionUrls: MetadataRoute.Sitemap = [];
  for (const t of FREE_TOOLS) {
    for (const r of REGIONS) {
      regionUrls.push({
        url: `${SITE}/free-tools/${t.slug}/region/${r.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.65,
      });
    }
  }

  // Country rollups.
  const countryUrls: MetadataRoute.Sitemap = [];
  for (const t of FREE_TOOLS) {
    for (const c of COUNTRIES) {
      countryUrls.push({
        url: `${SITE}/free-tools/${t.slug}/country/${c.code.toLowerCase()}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  return [...staticUrls, ...featureUrls, ...cityUrls, ...regionUrls, ...countryUrls];
}
