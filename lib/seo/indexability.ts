// Crawl-budget concentration (2026-06-15 SEO upgrade).
// ~5,000 programmatic pages but only ~6% indexed — crawl budget is spread too
// thin. These predicates pick the rankable subset: city-level pages index only
// for tier-1/2 cities (training: tier-1 only), and city×industry pages index
// only when the industry is materially weighted for that city. Everything else
// is noindex,follow (kept reachable + link-equity, dropped from the index/sitemap).
//
// Used by both the route generateMetadata (robots) AND app/sitemap.ts so the
// sitemap exactly equals the indexable set.
import { findCity } from '@/data/cities';
import { findRichCity } from '@/lib/seo/cities-rich';
import { rawIndustryToSlug } from '@/lib/seo/industry-page-data';

export function cityTier(slug: string): number | undefined {
  return findCity(slug)?.tier;
}

/** City-level programmatic pages. method/cost → tier 1-2; training → tier 1 only. */
export function shouldIndexCity(slug: string, kind: 'method' | 'cost' | 'training' = 'method'): boolean {
  const t = cityTier(slug);
  if (!t) return false;
  return kind === 'training' ? t === 1 : t <= 2;
}

/** City×industry pages: tier 1-2 city AND the industry is weighted >= 0.4 there. */
export function shouldIndexCityIndustry(citySlug: string, industrySlug: string): boolean {
  const t = cityTier(citySlug);
  if (!t || t > 2) return false;
  const rich = findRichCity(citySlug);
  if (!rich) return false;
  let maxW = 0;
  for (const ind of rich.industries) {
    if (rawIndustryToSlug(ind.name) === industrySlug) maxW = Math.max(maxW, ind.weight ?? 0);
  }
  return maxW >= 0.4;
}

/** robots metadata for a page: noindex,follow when not indexable, else default. */
export function robotsFor(indexable: boolean) {
  return indexable ? undefined : { index: false, follow: true };
}
