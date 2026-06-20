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

// Cities/locations that ACTUALLY earn GSC impressions (>=10, 90d, pulled 2026-06-15)
// — never noindex these regardless of tier. Prevents the crawl-budget prune from
// shedding live demand (tier-3/4 oil towns + international cities that already rank).
// Refresh periodically from seo-analysis/output (extract city slugs from pages.csv).
const DEMAND_CITIES = new Set<string>([
  'houston-tx','london-uk','tulsa-ok','perth-au','singapore-sg','los-angeles-ca','dubai-ae',
  'kuwait-city-kw','abu-dhabi-ae','denver-co','aberdeen-uk','brisbane-au','corpus-christi-tx',
  'beaumont-tx','pittsburgh-pa','muscat-om','bangalore-in','new-york-ny','calgary-ab','midland-tx',
  'chicago-il','jubail-sa','yanbu-sa','cape-town-za','manama-bh','ahmedabad-in','sydney-au','doha-qa',
  'mumbai-in','new-orleans-la','visakhapatnam-in','edmonton-ab','riyadh-sa','montreal-qc','carlsbad-nm',
  'boston-ma','dammam-sa','toronto-on','johannesburg-za','baton-rouge-la','mobile-al','sacramento-ca',
  'dallas-tx','rotterdam-nl','phoenix-az','melbourne-au','stavanger-no','charleston-sc','san-antonio-tx',
  'billings-mt','lake-charles-la','st-louis-mo','vancouver-bc','newark-nj','oklahoma-city-ok','tampa-fl',
  'pasadena-tx','detroit-mi','chattanooga-tn','atlanta-ga','seattle-wa','pune-in','charlotte-nc',
  'minneapolis-mn','miami-fl','kuala-lumpur-my','portland-or','bakersfield-ca','philadelphia-pa',
  'chennai-in','albuquerque-nm','munich-de','delhi-in','memphis-tn','quad-cities-ia','cape-canaveral-fl',
  'anchorage-ak','rockford-il','casper-wy','honolulu-hi','odessa-tx','columbus-oh','boise-id',
  'birmingham-al','hamburg-de','kolkata-in','kansas-city-mo','indianapolis-in','macae-br','san-diego-ca',
  'buffalo-ny','long-beach-ca','richland-wa','williston-nd','hartford-ct','jamnagar-in','texas-city-tx',
  'cleveland-oh','rock-springs-wy','knoxville-tn','huntsville-al','lafayette-la','farmington-nm',
  'idaho-falls-id','ulsan-kr','tyler-tx','wichita-ks','kochi-in','rio-de-janeiro-br','frankfurt-de',
  'san-francisco-ca','provo-ut','el-dorado-ar','gillette-wy','port-arthur-tx','aiken-sc',
]);

/** City-level programmatic pages. Index tier 1-2 cities, PLUS any city already
 * earning GSC impressions (demand override — don't prune live traffic). */
export function shouldIndexCity(slug: string, kind: 'method' | 'cost' | 'training' = 'method'): boolean {
  if (DEMAND_CITIES.has(slug)) return true;
  const t = cityTier(slug);
  if (!t) return false;
  return t <= 2;
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
