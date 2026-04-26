// src/app/free-tools/[feature]/[city]/page.tsx
// Dynamic city landing page — one entry per (feature, city) combination.
// 50 cities × 3 features = 150 pages from Tier 1 alone. Static-generated.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FREE_TOOLS, findFreeTool } from "@/data/freeTools";
import { CITIES, findCity } from "@/data/cities";
import { FreeToolCityPage } from "@/components/free-tools/FreeToolCityPage";

const SITE = "https://ndt-connect.com";

interface Params { params: Promise<{ feature: string; city: string }>; }

export async function generateStaticParams() {
  const out: { feature: string; city: string }[] = [];
  for (const t of FREE_TOOLS) {
    for (const c of CITIES) {
      out.push({ feature: t.slug, city: c.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { feature, city: citySlug } = await params;
  const tool = findFreeTool(feature);
  const city = findCity(citySlug);
  if (!tool || !city) return { title: "Free NDT Tools" };
  const cityLabel = `${city.name}, ${city.state}`;
  const url = `${SITE}/free-tools/${tool.slug}/${city.slug}`;
  const title = `Free NDT ${tool.name} in ${cityLabel} (2026)`;
  // Trim to ~155 chars
  const description =
    `${cityLabel} NDT companies get free ${tool.name.toLowerCase()} software — built for ${city.industries[0]?.toLowerCase()} inspection. User ID only, no card.`;
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

export default async function CityPage({ params }: Params) {
  const { feature, city: citySlug } = await params;
  const tool = findFreeTool(feature);
  const city = findCity(citySlug);
  if (!tool || !city) return notFound();
  const alternateFeatures = FREE_TOOLS.filter(f => f.slug !== tool.slug);
  return <FreeToolCityPage tool={tool} city={city} alternateFeatures={alternateFeatures} />;
}
