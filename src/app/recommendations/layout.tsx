// src/app/recommendations/layout.tsx
import type { Metadata } from "next";

const SITE = "https://ndt-connect.com";

export const metadata: Metadata = {
  title: "AI-Powered NDT Provider Recommendations",
  description:
    "Tell us your inspection scope, location, and timeline — our AI matches you to the best-fit verified NDT providers in seconds.",
  alternates: { canonical: `${SITE}/recommendations` },
  openGraph: {
    title: "AI NDT Provider Recommendations",
    description: "Get matched to verified NDT providers based on your scope, location, and timeline.",
    url: `${SITE}/recommendations`,
    type: "website",
  },
};

export default function RecommendationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
