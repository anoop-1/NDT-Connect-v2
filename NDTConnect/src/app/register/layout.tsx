// src/app/register/layout.tsx
import type { Metadata } from "next";

const SITE = "https://ndt-connect.com";

export const metadata: Metadata = {
  title: "Create a Free NDT Connect User ID — No Card Required",
  description:
    "Create a free NDT Connect user ID in 60 seconds. Free equipment management, calibration tracking, and certificate management for NDT companies — no credit card.",
  alternates: { canonical: `${SITE}/register` },
  openGraph: {
    title: "Create a Free NDT Connect User ID",
    description: "Free equipment, calibration, and certificate management for NDT companies. User ID only.",
    url: `${SITE}/register`,
    type: "website",
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
