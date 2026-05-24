// src/app/free-tools/[feature]/country/[code]/page.tsx
// Dynamic country rollup landing — one entry per (feature, country) combo.
// 12 countries × 3 features = 36 pages. Static-generated.
// [code] segment uses the lowercase ISO 3166-1 alpha-2 code (e.g. "us", "gb").

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FREE_TOOLS, findFreeTool } from "@/data/freeTools";
import { COUNTRIES, citiesByCountry } from "@/data/cities";
import { FreeToolCountryPage } from "@/components/free-tools/FreeToolCountryPage";

const SITE = "https://ndt-connect.com";

interface Params { params: Promise<{ feature: string; code: string }>; }

// Country-specific primary code authority used in <title> + meta description.
function primaryAuthorityFor(code: string): string {
  switch (code.toUpperCase()) {
    case "US": return "API / ASME / FAA / NRC";
    case "CA": return "CGSB / TSSA / CSA";
    case "GB": return "PCN / HSE";
    case "NO": return "PSA / NORSOK";
    case "AU": return "AINDT / NATA";
    case "AE": return "ADNOC / DM";
    case "SA": return "Saudi Aramco SAEP / SAES";
    case "QA": return "QatarEnergy";
    case "IN": return "ISNT / IBR";
    case "SG": return "MOM / CAAS";
    case "MY": return "DOSH / Petronas";
    case "BR": return "ABENDI / ANP";
    default: return "international NDT codes";
  }
}

export async function generateStaticParams() {
  const out: { feature: string; code: string }[] = [];
  for (const t of FREE_TOOLS) {
    for (const c of COUNTRIES) {
      out.push({ feature: t.slug, code: c.code.toLowerCase() });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { feature, code: codeParam } = await params;
  const tool = findFreeTool(feature);
  const country = COUNTRIES.find(c => c.code.toLowerCase() === codeParam.toLowerCase());
  if (!tool || !country) return { title: "Free NDT Tools" };
  const cities = citiesByCountry(country.code);
  const url = `${SITE}/free-tools/${tool.slug}/country/${country.code.toLowerCase()}`;
  const title = `Free ${tool.name} Software for NDT Companies in ${country.name} (2026)`;
  const cityList = cities.slice(0, 4).map(c => c.name).join(", ") || country.name;
  const primary = primaryAuthorityFor(country.code);
  // ≤155 chars
  const description = `Free ${tool.name.toLowerCase()} for NDT inspection contractors across ${country.name} — covering ${cityList} under ${primary}.`.slice(0, 155);
  return {
    title,
    description,
    // noindex (follow): near-zero search demand on free-tool x country matrix
    // (GSC 2026-05-24). Concentrates crawl budget on indexable tool hub pages.
    robots: { index: false, follow: true },
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

export default async function CountryPage({ params }: Params) {
  const { feature, code: codeParam } = await params;
  const tool = findFreeTool(feature);
  const country = COUNTRIES.find(c => c.code.toLowerCase() === codeParam.toLowerCase());
  if (!tool || !country) return notFound();
  const citiesInCountry = citiesByCountry(country.code);
  if (citiesInCountry.leng