// Shared content interfaces for hand-authored long-form pages.
// Every authored content module exports a single object that conforms to one
// of these interfaces. The page template renders the object — content lives
// in data, layout lives in templates. This separation lets parallel agents
// write content without touching JSX.

export interface Author {
  name: string;
  role: string;
  certifications: string[];
  bio: string;
  url?: string;
}

export const PRIMARY_AUTHOR: Author = {
  name: 'Anoop Rayavarapu',
  role: 'Founder & CEO, NDT Connect',
  certifications: ['ASNT Level III (UT, RT, MT, PT, VT)'],
  bio: 'Founder of NDT Connect and Atlantis NDT. 15+ years in industrial inspection across oil & gas, petrochemical, and offshore. ASNT Level III certified across five methods. Drives platform standards for the NDT Connect marketplace.',
  url: 'https://ndt-connect.com/about',
};

export interface Citation {
  id: string; // anchor (e.g. "api-510")
  source: string; // "API 510, 11th ed., 2022, §6.4.1"
  url?: string; // public URL if any
}

export interface Section {
  heading: string;
  level: 2 | 3; // H2 or H3
  paragraphs: string[]; // markdown-safe plain text
  callout?: {
    kind: 'info' | 'warn' | 'spec';
    title: string;
    body: string;
  };
  table?: ContentTable;
  list?: { title?: string; items: string[]; ordered?: boolean };
  code?: { lang: string; body: string };
}

export interface ContentTable {
  caption?: string;
  headers: string[];
  rows: (string | number)[][];
}

export interface Faq {
  q: string;
  a: string;
}

export interface InternalLink {
  href: string;
  label: string;
  context?: string;
}

// --- per-template content shapes ---

export interface MethodContent {
  slug: string;
  abbreviation: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroLede: string; // 1-2 paragraph intro under H1
  physicsPrimer: string; // explanation of underlying physics
  detectableDefects: string[];
  materialsAndForms: string[];
  whenToChoose: string;
  whenNotToChoose: string;
  procedure: Section[]; // step-by-step procedure
  equipment: Section[]; // probes/sources/blocks/etc.
  codesAndStandards: Citation[];
  acceptanceCriteria: string;
  comparisonAgainst: { method: string; tradeoff: string }[];
  costRange: { unit: string; low: number; high: number; mid: number };
  faqs: Faq[];
  internalLinks: InternalLink[];
  citations: Citation[];
}

export interface IndustryContent {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroLede: string;
  marketContext: string;
  commonAssets: string[];
  dominantDefectMechanisms: { mechanism: string; explanation: string }[];
  methodsUsed: { method: string; reason: string }[];
  regulatoryFramework: Citation[];
  caseScenarios: { title: string; body: string }[];
  costDrivers: string[];
  vendorSelection: string;
  faqs: Faq[];
  internalLinks: InternalLink[];
  citations: Citation[];
}

export interface StandardContent {
  code: string;
  fullTitle: string;
  organization: string;
  edition: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroLede: string;
  scope: string;
  whoMustComply: string[];
  keyRequirements: Section[];
  inspectionIntervals?: ContentTable;
  acceptanceCriteria?: ContentTable;
  relatedStandards: { code: string; relation: string }[];
  commonAuditFindings: string[];
  faqs: Faq[];
  internalLinks: InternalLink[];
  citations: Citation[];
}

export interface StateGuideContent {
  slug: string; // lowercase state code (e.g. "tx", "la")
  name: string; // full state name
  abbreviation: string;
  metaTitle: string;
  metaDescription: string;
  heroLede: string;
  industryMix: string; // narrative paragraph
  topMetros: { name: string; slug: string }[];
  regulatoryNotes: Citation[];
  majorAssetOwners: { name: string; sector: string }[];
  methodDemand: { method: string; demandLevel: 'high' | 'medium' | 'low'; reason: string }[];
  certificationAvailability: string;
  salaryBands: { role: string; low: number; high: number }[];
  hiringSeasons: string;
  faqs: Faq[];
  internalLinks: InternalLink[];
  citations: Citation[];
}

export interface CareerContent {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroLede: string;
  whatYouDo: string;
  typicalDay: string[];
  responsibilities: string[];
  pathToEntry: { step: number; title: string; body: string }[];
  certificationsRequired: { name: string; mandatory: boolean; reason: string }[];
  salaryByExperience: { years: string; min: number; max: number; median: number }[];
  industriesEmploying: { industry: string; demand: string }[];
  advancementPath: string;
  remoteOrField: 'remote' | 'field' | 'hybrid';
  riskFactors: string[];
  faqs: Faq[];
  internalLinks: InternalLink[];
  citations: Citation[];
}

export interface EquipmentContent {
  slug: string;
  make: string;
  model: string;
  category: 'flaw-detector' | 'thickness-gauge' | 'phased-array' | 'rt-source' | 'probe' | 'cal-block' | 'mt-yoke' | 'pt-kit' | 'eddy-current' | 'other';
  metaTitle: string;
  metaDescription: string;
  heroLede: string;
  msrpUSD?: number;
  rentalPerWeekUSD?: number;
  specs: ContentTable;
  pros: string[];
  cons: string[];
  bestFor: string[];
  notIdealFor: string[];
  alternatives: { make: string; model: string; reason: string }[];
  certificationCompatibility: string[];
  faqs: Faq[];
  internalLinks: InternalLink[];
  citations: Citation[];
}

export interface CaseStudyContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  // Anonymized: industry + region only.
  industry: string;
  regionLabel: string; // "US Gulf Coast", "North Sea", etc.
  assetType: string; // "30-inch crude pipeline", "Hydrotreater reactor"
  heroLede: string;
  challenge: string;
  approach: Section[];
  methodsUsed: string[];
  defectsFound: string[];
  outcome: string;
  costAvoidance?: string;
  durationDays: number;
  techniciansDeployed: number;
  certificationsNeeded: string[];
  faqs: Faq[];
  internalLinks: InternalLink[];
  citations: Citation[];
}

export interface ComparisonContent {
  slug: string;
  methodA: { abbreviation: string; name: string };
  methodB: { abbreviation: string; name: string };
  metaTitle: string;
  metaDescription: string;
  heroLede: string;
  sideBySide: ContentTable;
  whenAWins: { scenario: string; reason: string }[];
  whenBWins: { scenario: string; reason: string }[];
  whenEitherWorks: { scenario: string; pick: 'A' | 'B' }[];
  costDifference: string;
  speedDifference: string;
  certificationDifference: string;
  faqs: Faq[];
  internalLinks: InternalLink[];
  citations: Citation[];
}

export interface LearnArticleContent {
  slug: string;
  category: 'how-to' | 'faq' | 'concept' | 'troubleshooting';
  metaTitle: string;
  metaDescription: string;
  heroLede: string;
  audience: string; // "Level II UT technicians", "Inspection engineers"
  prerequisiteKnowledge?: string[];
  sections: Section[];
  commonMistakes?: string[];
  relatedFaqs: Faq[];
  internalLinks: InternalLink[];
  citations: Citation[];
}

export interface GlossaryLongFormContent {
  slug: string;
  term: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  heroLede: string;
  preciseDefinition: string;
  alternateNames: string[];
  history?: string;
  technicalDetail: Section[];
  workedExample?: { setup: string; calculation: string; result: string };
  whereItAppears: { context: string; explanation: string }[];
  relatedTerms: { term: string; slug: string }[];
  faqs: Faq[];
  internalLinks: InternalLink[];
  citations: Citation[];
}

export interface PillarHubContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroLede: string;
  topicOverview: string;
  subPages: { href: string; label: string; description: string }[];
  expertCommentary: string;
  externalResources: { label: string; url: string }[];
  faqs: Faq[];
  internalLinks: InternalLink[];
  citations: Citation[];
}

// Generic combinatorial topic page (produced by the daily LLM pipeline).
// Used for permutations like method-x-industry, defect-x-method, etc. that
// share the same content shape but cover a unique angle per slug.
export interface CombinedTopicContent {
  slug: string;
  bucket: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  audience: string;
  heroLede: string;
  sections: Section[];
  faqs: Faq[];
  citations: Citation[];
  internalLinks: InternalLink[];
}

export interface ToolMeta {
  slug: string;
  name: string;
  category: 'ut' | 'rt' | 'mt' | 'pt' | 'et' | 'general' | 'safety' | 'planning';
  inputs: { id: string; label: string; unit?: string; type: 'number' | 'select' | 'text' }[];
  outputs: { id: string; label: string; unit?: string }[];
  metaTitle: string;
  metaDescription: string;
  heroLede: string;
  howItWorks: string;
  formula?: string; // LaTeX or plain text
  workedExample: { inputs: Record<string, string | number>; outputs: Record<string, string | number>; explanation: string };
  whenToUse: string;
  limitations: string[];
  relatedTools: { slug: string; name: string }[];
  faqs: Faq[];
  citations: Citation[];
}
