// src/app/robots.ts
// Source-of-truth robots.txt generator for ndt-connect.com.
// Mirrors the rules currently served at https://ndt-connect.com/robots.txt
// and adds the new /free-tools/* allow path explicitly.

import type { MetadataRoute } from "next";

const SITE = "https://ndt-connect.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/free-tools/", "/find-providers/", "/recommendations", "/request-service", "/register", "/about"],
        disallow: [
          "/admin/",
          "/dashboard/",
          "/api/",
          "/settings/",
          "/my-requests/",
          "/provider-dashboard/",
          "/provider-profile/",
          "/provider-requests/",
          "/track-request/",
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
