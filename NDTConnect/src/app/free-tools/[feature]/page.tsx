// src/app/free-tools/[feature]/page.tsx
// Dynamic feature landing page — one of: equipment-management, calibration-tracking, certificate-management.
// Static-generated at build time via generateStaticParams.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FREE_TOOLS, findFreeTool, FreeToolSlug } from "@/data/freeTools";
import { FreeToolFeaturePage } from "@/components/free-tools/FreeToolFeaturePage";

const SITE = "https://ndt-connect.com";

interface Params { params: Promise<{ feature: string }>; }

export async function generateStaticParams() {
  return FREE_TOOLS.map(t => ({ feature: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { feature } = await params;
  const tool = findFreeTool(feature);
  if (!tool) return { title: "Free Tools — NDT Connect" };
  const url = `${SITE}/free-tools/${tool.slug}`;
  return {
    title: `${tool.titlePrefix} (2026)`,
    description: tool.metaDescriptionPrefix,
    alternates: { canonical: url },
    openGraph: {
      title: tool.titlePrefix,
      description: tool.metaDescriptionPrefix,
      url,
      siteName: "NDT Connect",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.titlePrefix,
      description: tool.metaDescriptionPrefix,
    },
  };
}

export default async function FeaturePage({ params }: Params) {
  const { feature } = await params;
  const tool = findFreeTool(feature);
  if (!tool) return notFound();
  return <FreeToolFeaturePage tool={tool} />;
}
