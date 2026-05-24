// src/app/free-tools/[feature]/[city]/page.tsx
// Dynamic city landing page — one entry per (feature, city) combination.
// 50 cities × 3 features = 150 pages from Tier 1 alone. Static-generated.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FREE_TOOLS, findFreeTool } from "@/data/freeTools";
import { PUBLISHABLE_CITIES, findPublishableCity } from "@/data/cities";
import { FreeToolCityPage } from "@/components/free-tools/FreeToolCityPage";

const SITE = "https://ndt-connect.com";

interface Params { params: Promise<{ feature: string; city: string }>; }

// Static-generated over PUBLISHABLE_CITIES (cities that clear the quality
// gate in data/cities.ts). Pruned cities don't get a free-tool page either —
// thin pages here would carry the same SEO penalty as on /ndt-services.
// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

export async function generateStaticParams() {
  const out: { feature: string; city: string }[] = [];
  for (const t of FREE_TOOLS) {
    for (const c of PUBLISHABLE_CITIES) {
      out.push({ feature: t.slug, city: c.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { feature, city: citySlug } = await params;
  const tool = findFreeTool(feature);
  const city = findPublishableCity(citySlug);
  if (!tool || !city) return { title: "Free NDT Tools" };
  const cityLabel = `${city.name}, ${city.state}`;
  const url = `${SITE}/free-tools/${tool.slug}/${city.slug}`;
  const title = `Free NDT ${tool.name} in ${cityLabel} (${new Date().getFullYear()})`;
  // Trim to ~155 chars
  const description =
    `${cityLabel} NDT companies get free ${tool.name.toLowerCase()} software — built for ${city.industries[0]?.toLowerCase()} inspection. Sign up free in 60 seconds — verify email and start.`;
  return {
    title,
    description,
    robots: { index: false, follow: true }, // noindex: near-zero search demand on tool x geo matrix (GSC 2026-05-24); keeps crawl budget for tool hubs
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
  const city = findPublishableCity(citySlug);
  if (!tool || !city) return notFound();
  const alternateFeatures = FREE_TOOLS.filter(f => f.slug !== tool.slug);
  return <FreeToolCityPage tool={tool} city={city} alternateFeatures={alternateFeatures} />;
}
