// "NDT Leaders" — long-form introduction profiles of people shaping the NDT industry.
// Rules: only publicly reported professional facts, each cited [n]; no private/personal data;
// ≥2,000 rendered words; disclose any relationship with NDT-Connect; corrections welcome.
export interface LeaderSection {
  id: string;
  h2: string;
  paragraphs: string[];          // may contain [n] citations and **bold**
  bullets?: string[];
}
export interface NdtLeader {
  slug: string;
  name: string;
  honorific?: string;            // e.g. "Dr." / "Eng."
  title: string;                 // H1
  metaTitle: string;
  description: string;           // ≤160 chars
  headline: string;              // one-line positioning
  role: string;                  // current role(s)
  organization: string;
  location: string;
  expertise: string[];
  credentials: string[];
  updated: string;
  disclosure?: string;
  quickBio: string;
  highlights: { label: string; value: string }[];
  sections: LeaderSection[];
  quote?: { text: string; source: number };   // ≤15 words, attributed to reference index (1-based)
  faqs: { q: string; a: string }[];
  references: { title: string; url: string }[];
  sameAs: string[];              // public profile URLs for Person schema
  related: { label: string; href: string }[];
}
