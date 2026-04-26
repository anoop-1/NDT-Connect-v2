// src/app/find-providers/layout.tsx
import type { Metadata } from "next";

const SITE = "https://ndt-connect.com";

export const metadata: Metadata = {
  title: "Find NDT Service Providers — Marketplace by Method & City",
  description:
    "Find verified NDT service providers near you. Filter by method (UT, RT, MT, PT, ET, VT) and city. Free to browse — only register to request a quote.",
  alternates: { canonical: `${SITE}/find-providers` },
  openGraph: {
    title: "Find NDT Service Providers",
    description:
      "Verified marketplace of NDT inspection companies, filterable by method and city.",
    url: `${SITE}/find-providers`,
    type: "website",
  },
};

export default function FindProvidersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
