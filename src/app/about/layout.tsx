// src/app/about/layout.tsx
//
// Per-route metadata for /about. Page itself is a server component already,
// but using a layout is the cleanest way to attach metadata without touching
// the existing page body. Layouts compose: this metadata overrides the root.

import type { Metadata } from "next";

const SITE = "https://ndt-connect.com";

export const metadata: Metadata = {
  title: "About NDT Connect — Marketplace + Free Tools for Inspection",
  description:
    "NDT Connect is a marketplace and free SaaS platform for non-destructive testing companies. Find providers, request services, and use free equipment, calibration, and certificate management tools.",
  alternates: { canonical: `${SITE}/about` },
  openGraph: {
    title: "About NDT Connect",
    description:
      "Marketplace + free tools for NDT inspection companies — equipment, calibration, and certificate management.",
    url: `${SITE}/about`,
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
