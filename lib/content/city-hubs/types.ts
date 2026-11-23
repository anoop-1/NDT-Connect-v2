// NDT city hubs — one comprehensive 2,000+ word page per new city, served at /ndt-services/<slug>
// by the side-car (nginx routes only these slugs). Quality bar: NDT-CONNECT-CONTEXT.md §8 —
// every facility/regulator/statistic cited [n]; >=60% unique per city; rates labelled indicative.
import type { GuideSection } from '../buyers-guide/types';
export type { GuideSection };
export interface CityHub {
  slug: string;                  // e.g. 'al-khobar-sa' (matches the main app's city slug pattern)
  city: string;                  // 'Al Khobar'
  region: string;                // 'Eastern Province'
  country: string;               // 'Saudi Arabia'
  countrySlug: string;           // 'saudi-arabia'
  wave: number;
  updated: string;               // ISO date
  title: string;                 // H1
  metaTitle: string;             // <title>, template appends " | NDT Connect"
  description: string;           // <=160 chars
  quickAnswer: string;
  keyFacts: { label: string; value: string }[];
  industries: string[];          // short tags
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  references: { title: string; url: string }[];
  nearby: { name: string; href: string }[];
  related: { label: string; href: string }[];
}
