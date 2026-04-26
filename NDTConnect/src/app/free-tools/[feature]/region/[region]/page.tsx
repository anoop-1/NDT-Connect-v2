// src/app/free-tools/[feature]/region/[region]/page.tsx
// Dynamic region rollup landing — one entry per (feature, region) combination.
// 13 regions × 3 features = 39 pages. Static-generated.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FREE_TOOLS, findFreeTool } from "@/data/freeTools";
import { REGIONS, citiesByRegion } from "@/data/cities";
import { FreeToolRegionPage } from "@/components/free-tools/FreeToolRegionPage";

const SITE = "https://ndt-connect.com";

interface Params { params: Promise<{ feature: string; region: string }>; }

export async function generateStaticParams() {
  const out: { feature: string; region: string }[] = [];
  for (const t of FREE_TOOLS) {
    for (const r of REGIONS) {
      out.push({ feature: t.slug, region: r.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { feature, region: regionSlug } = await params;
  const tool = findFreeTool(feature);
  const region = REGIONS.find(r => r.slug === regionSlug);
  if (!tool || !region) return { title: "Free NDT Tools" };
  const cities = citiesByRegion(regionSlug);
  const url = `${SITE}/free-tools/${tool.slug}/region/${region.slug}`;
  const title = `Free ${tool.name} Software for NDT Companies in ${region.name} (2026)`;
  const cityNames = cities.map(c => c.name);
  const firstCity = cityNames[0] || region.name;
  const lastCity = cityNames[cityNames.length - 1] || region.name;
  // Stay ≤155 chars
  const description = `Free ${tool.name.toLowerCase()} for NDT inspection companies across the ${region.name} — built for refinery, aerospace, and industrial workflows from ${firstCity} to ${lastCity}.`.slice(0, 155);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "NDT Connect",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RegionPage({ params }: Params) {
  const { feature, region: regionSlug } = await params;
  const tool = findFreeTool(feature);
  const region = REGIONS.find(r => r.slug === regionSlug);
  if (!tool || !region) return notFound();
  const citiesInRegion = citiesByRegion(regionSlug);
  if (citiesInRegion.length === 0) return notFound();
  return (
    <FreeToolRegionPage
      tool={tool}
      regionSlug={region.slug}
      regionName={region.name}
      citiesInRegion={citiesInRegion}
    />
  );
}
