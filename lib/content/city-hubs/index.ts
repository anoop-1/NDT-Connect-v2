import type { CityHub } from './types';
import { EXISTING_CITIES } from './existing';
import { ALL_CITY_HUBS } from './all';

export const CITY_HUBS: CityHub[] = ALL_CITY_HUBS;
export const getCityHub = (slug: string) => CITY_HUBS.find(c => c.slug === slug);

/** Every city page on the site (main-app pages + side-car hubs), grouped by country for /ndt-locations. */
export function allLocationsByCountry() {
  const rows = [
    ...EXISTING_CITIES.map(c => ({ slug: c.slug, name: c.name, country: c.country, isNew: false })),
    ...CITY_HUBS.map(c => ({ slug: c.slug, name: c.city, country: c.country, isNew: true })),
  ];
  const by = new Map<string, typeof rows>();
  for (const r of rows) { if (!by.has(r.country)) by.set(r.country, []); by.get(r.country)!.push(r); }
  return [...by.entries()].map(([country, cities]) => ({ country, slug: country.toLowerCase().replace(/[^a-z0-9]+/g, '-'), cities: cities.sort((a, b) => a.name.localeCompare(b.name)) }))
    .sort((a, b) => b.cities.length - a.cities.length || a.country.localeCompare(b.country));
}
export type { CityHub } from './types';
