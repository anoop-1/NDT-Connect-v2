// lib/seo-helpers.ts
//
// SEO utility layer used by the programmatic city pages. Centralises three
// concerns so they stay consistent across every route:
//
//   1. nearestCities(slug, n) — Haversine over CityData.latitude/longitude.
//      Used by "Also serving nearby cities" blocks on every city page and
//      every city × method page.
//   2. buildAlternates(slug) — emits a Next.js `alternates.languages` map
//      so Google can serve the right regional variant. We don't currently
//      run /en-AE/, /en-IN/ etc. as separate URL prefixes — every page is
//      published once at the canonical URL — but the hreflang signal helps
//      Google match search-region to the page.
//   3. getCityLatLong — small normaliser, because cities.ts historically
//      shipped `latitude`/`longitude` and route code expects `lat`/`long`.
//
// All TypeScript. No Python, no shell scripts. Pure data.

import type { Metadata } from 'next';
import { CITIES, PUBLISHABLE_CITIES, type City } from '@/data/cities';

const SITE = 'https://ndt-connect.com';

// ---- coordinate normalisation ---------------------------------------------

/**
 * Returns lat/long as a tuple. Reads from `latitude`/`longitude` (the names
 * actually present in data/cities.ts) but accepts the `lat`/`long` aliases
 * if a future row uses them. Returns null when neither is present so
 * callers can short-circuit rather than render a NaN distance.
 */
export function getCityLatLong(city: City | undefined | null): { lat: number; long: number } | null {
  if (!city) return null;
  const lat = (city as { latitude?: number; lat?: number }).latitude ?? (city as { lat?: number }).lat;
  const long = (city as { longitude?: number; long?: number }).longitude ?? (city as { long?: number }).long;
  if (typeof lat !== 'number' || typeof long !== 'number') return null;
  return { lat, long };
}

// ---- Haversine -------------------------------------------------------------

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Great-circle distance in kilometres. Standard Haversine. Earth radius
 * approximated at 6371 km — adequate for sorting cities by proximity, not
 * for navigation.
 */
function haversineKm(aLat: number, aLong: number, bLat: number, bLong: number): number {
  const R = 6371;
  const dLat = toRad(bLat - aLat);
  const dLong = toRad(bLong - aLong);
  const lat1 = toRad(aLat);
  const lat2 = toRad(bLat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLong / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/**
 * Returns up to `n` publishable cities nearest to `slug`, sorted ascending
 * by great-circle distance. Cities without coordinates are skipped silently
 * (we'd rather show fewer suggestions than show wrong ones). When the
 * target city itself has no coordinates we fall back to same-region cities
 * so the UI block isn't empty.
 */
export function nearestCities(slug: string, n: number = 5): City[] {
  const me = CITIES.find((c) => c.slug === slug);
  if (!me) return [];
  const myCoords = getCityLatLong(me);
  // Fallback: when the source city has no coords, return same-region siblings.
  if (!myCoords) {
    return PUBLISHABLE_CITIES.filter((c) => c.region === me.region && c.slug !== me.slug).slice(0, n);
  }
  const ranked = PUBLISHABLE_CITIES
    .filter((c) => c.slug !== me.slug)
    .map((c) => {
      const coords = getCityLatLong(c);
      if (!coords) return null;
      return { city: c, distance: haversineKm(myCoords.lat, myCoords.long, coords.lat, coords.long) };
    })
    .filter((x): x is { city: City; distance: number } => x !== null)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, n)
    .map((x) => x.city);
  // If too few cities have coords, top up with same-region peers.
  if (ranked.length < n) {
    const have = new Set(ranked.map((c) => c.slug));
    for (const c of PUBLISHABLE_CITIES) {
      if (ranked.length >= n) break;
      if (c.slug === me.slug || have.has(c.slug)) continue;
      if (c.region === me.region) ranked.push(c);
    }
  }
  return ranked;
}

// ---- hreflang / alternates ------------------------------------------------

/**
 * Maps CityData.country (ISO alpha-2) to the regional English variant
 * Google understands. We don't actually serve separate locale URLs — each
 * page is published once — but the hreflang signal disambiguates intent.
 *
 * GCC + wider Arab gulf -> en-AE
 * India sub-continent  -> en-IN
 * UK + EU              -> en-GB
 * Default x-default    -> en-US
 */
function hreflangForCountry(country: string | undefined | null): string {
  const c = (country || '').toUpperCase();
  if (['AE', 'SA', 'QA', 'KW', 'OM', 'BH'].includes(c)) return 'en-AE';
  if (['IN'].includes(c)) return 'en-IN';
  if (['GB', 'IE', 'NO', 'NL', 'DE', 'FR', 'ES', 'IT', 'DK', 'SE', 'FI', 'PL', 'BE', 'AT', 'CH'].includes(c)) {
    return 'en-GB';
  }
  return 'en-US';
}

/**
 * Returns the `alternates.languages` map for a city page. We always emit:
 *   - the canonical en-US URL
 *   - the regional variant matching the city's country
 *   - x-default pointing to the canonical
 *
 * Pass the *fully-qualified* URL for the page being rendered. Returns the
 * exact shape Next.js' Metadata API wants under `alternates.languages`.
 */
export function buildAlternates(
  citySlug: string,
  fullUrl: string,
): NonNullable<NonNullable<Metadata['alternates']>['languages']> {
  const city = CITIES.find((c) => c.slug === citySlug);
  const regional = hreflangForCountry(city?.country);
  const out: Record<string, string> = {
    'en-US': fullUrl,
    'x-default': fullUrl,
  };
  if (regional !== 'en-US') out[regional] = fullUrl;
  return out;
}

/**
 * Sugar over buildAlternates for the canonical city URL pattern. Use when
 * the page is `/ndt-services/[city]` or any other path that follows the
 * `${SITE}/<path>/<slug>` shape.
 */
export function buildCityAlternates(citySlug: string, path: string = '/ndt-services'): NonNullable<Metadata['alternates']> {
  const url = `${SITE}${path}/${citySlug}`;
  return {
    canonical: url,
    languages: buildAlternates(citySlug, url),
  };
}
