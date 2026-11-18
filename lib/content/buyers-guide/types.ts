// NDT Buyer's Guide — long-form, region-specific method-selection guides written from the buyer's side.
// Quality bar (see NDT-CONNECT-CONTEXT.md §8): 2,000+ words, every regulatory/technical claim cited [n], genuinely unique per page.
export interface GuideSection {
  id: string;
  h2: string;
  paragraphs: string[];          // may contain [n] citation markers and **bold**
  bullets?: string[];
  table?: { caption: string; head: string[]; rows: string[][] };
}
export interface BuyerGuide {
  slug: string;
  title: string;                 // H1
  metaTitle: string;             // <title> (template appends " | NDT Connect")
  description: string;           // meta description, ≤160 chars
  region: string;
  states: string[];
  cities: { name: string; href: string }[];
  industry: string;
  updated: string;               // ISO date
  quickAnswer: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  references: { title: string; url: string }[];
  related: { label: string; href: string }[];
}
