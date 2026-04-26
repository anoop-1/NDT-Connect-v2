// src/app/page-metadata.ts
//
// The homepage (page.tsx) is a Client Component because it reads
// localStorage. Next.js does not allow exporting Metadata from a Client
// Component. We work around this by exporting Metadata from the route's
// `layout.tsx` instead — that layout wraps page.tsx and runs on the server.
//
// This file is a shared constant used by both the layout (for SSR metadata)
// and any future server components that need the same copy.

import type { Metadata } from "next";

const SITE = "https://ndt-connect.com";

export const homeMetadata: Metadata = {
  title: "Free NDT Software for Equipment, Calibration & Certs",
  description:
    "Track NDT equipment, calibration due-dates, and ASNT/ISO 9712 personnel certs free. No credit card. Just create a user ID and start.",
  alternates: { canonical: SITE },
  openGraph: {
    title: "Free NDT Software for Equipment, Calibration & Certs",
    description:
      "Track NDT equipment, calibration due-dates, and ASNT/ISO 9712 personnel certs free. User ID only.",
    url: SITE,
    siteName: "NDT Connect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NDT Connect — Free Tools for NDT Companies",
    description:
      "Free equipment management, calibration tracking, and certificate management. User ID only.",
  },
};
