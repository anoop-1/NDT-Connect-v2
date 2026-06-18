import type { LearnArticleContent } from '../types';

// Linkable / AI-citable data study (Phase 3C). Figures are NDT Connect's own
// cost model (lib/content/city-method.ts) — derived, not fabricated. Distinct
// from the per-city /cost-guide pages: this is the national index + methodology.
const content: LearnArticleContent = {
  slug: 'ndt-inspection-cost-index',
  category: 'concept',
  metaTitle: 'NDT Inspection Cost Index [2026]: Rates by Method & Region',
  metaDescription:
    'What NDT inspection costs in 2026 — US hourly rates and day rates by method (UT, PAUT, RT, MT, PT, ET, VT), how region, certification level, and shift change the price, and how to budget a job.',
  heroLede:
    'NDT pricing is opaque: every provider quotes differently and published rate cards are rare. This index distills typical 2026 US rates by method and the factors that move them — region, certification level, shift, mobilisation, and volume — so owners can budget a scope and read a quote critically instead of guessing.',
  audience: 'Plant/maintenance engineers, project buyers, and NDT providers benchmarking rates',
  prerequisiteKnowledge: [],
  sections: [
    {
      heading: 'NDT rates by method (2026 US, typical)',
      level: 2,
      paragraphs: [
        'Hourly ranges below are field rates for a qualified technician; the day rate is a typical 8-hour mobilised figure at mid-band. Advanced methods (PAUT, RT) carry equipment and certification premiums that push them well above conventional surface methods (MT, PT, VT).',
      ],
      table: {
        caption: 'Typical US NDT inspection rates by method (2026)',
        headers: ['Method', 'Hourly range', 'Typical day rate'],
        rows: [
          ['Visual (VT)', '$125 – $375', '$1,700'],
          ['Liquid Penetrant (PT)', '$175 – $525', '$2,300'],
          ['Magnetic Particle (MT)', '$175 – $550', '$2,400'],
          ['Ultrasonic (UT)', '$225 – $700', '$3,200'],
          ['Eddy Current (ET)', '$240 – $780', '$3,400'],
          ['Radiographic (RT)', '$400 – $1,200', '$5,400'],
          ['Phased Array (PAUT)', '$400 – $1,300', '$5,650'],
        ],
      },
      callout: {
        kind: 'info',
        title: 'Hourly vs day rate vs unit price',
        body: 'Short scopes bill hourly with a minimum call-out; full days bill the day rate; high-volume weld work is often quoted per-weld or per-foot. Always confirm which basis a quote uses.',
      },
    },
    {
      heading: 'What moves the price',
      level: 2,
      paragraphs: ['Five factors explain most of the spread within each range above.'],
      list: {
        ordered: true,
        items: [
          'Method & equipment — PAUT/RT carry instrument surcharges ($500–$720/day) that MT/PT/VT do not.',
          'Region / market tier — Tier-1 metros (Gulf Coast, major refining hubs) run ~18% above the national mid-band; lower-tier markets run below it.',
          'Certification level — a Level III on the job adds roughly 12–24% depending on method.',
          'Shift & access — night/turnaround shifts add 25–40%; rope-access, confined-space, or radiation exclusion zones add more.',
          'Mobilisation & volume — travel/mobilisation ($235–$825) is fixed per trip, so small scopes cost more per hour; volume contracts discount the rate.',
        ],
      },
    },
    {
      heading: 'How region changes the rate',
      level: 2,
      paragraphs: [
        'The same method costs more in a saturated, high-cost-of-living inspection market than in an emerging one. As a rule of thumb against the national mid-band:',
      ],
      table: {
        caption: 'Approximate regional rate multiplier vs national mid-band',
        headers: ['Market tier', 'Example', 'Multiplier'],
        rows: [
          ['Tier 1 (premium)', 'Houston, Baton Rouge, LA Basin', '~1.18×'],
          ['Tier 2 (mainstream)', 'Tulsa, Pittsburgh, Mobile', '~1.00×'],
          ['Tier 3 (value)', 'smaller metros', '~0.92×'],
          ['Tier 4 (frontier)', 'remote / emerging', '~0.85×'],
        ],
      },
    },
    {
      heading: 'How to budget and compare quotes',
      level: 2,
      paragraphs: [
        'Estimate hours (or welds/footage) × the method rate for your region tier, add a mobilisation trip charge, then a shift premium if off-hours. For a defensible number, get 2–3 quotes on identical scope and compare the basis (hourly vs day vs unit), what is included (consumables, reporting, standby), and the technician certification level.',
      ],
      callout: {
        kind: 'info',
        title: 'Get real quotes free',
        body: 'Post your scope on NDT Connect and receive quotes from vetted providers in your area — most respond within 24 hours, no signup to browse rates.',
      },
    },
  ],
  commonMistakes: [
    'Comparing an hourly quote against a day-rate quote without normalising the basis.',
    'Ignoring mobilisation — on a 2-hour job it can exceed the inspection labour.',
    'Assuming national rates apply in a Tier-1 metro (they run ~18% higher).',
    'Not specifying certification level — Level III work is priced differently.',
  ],
  relatedFaqs: [
    { q: 'How much does NDT inspection cost in 2026?', a: 'Typical US field rates run from about $125–$375/hr for visual testing up to $400–$1,300/hr for phased array, with day rates from ~$1,700 (VT) to ~$5,650 (PAUT). Region (tier), certification level, shift, and mobilisation move the final price; advanced methods (PAUT, RT) are the most expensive.' },
    { q: 'Why is PAUT or RT so much more expensive than MT or PT?', a: 'Phased array and radiography require costly instruments (a $500–$720/day equipment surcharge), more training, and—for RT—radiation safety logistics and exclusion zones. Magnetic particle and penetrant use inexpensive consumables and minimal equipment, so they sit at the bottom of the rate range.' },
    { q: 'How do regional rates differ?', a: 'Tier-1 inspection markets (major refining/petrochemical hubs) run roughly 18% above the national mid-band; value and frontier markets run 8–15% below it. The same UT scope can therefore differ 30%+ between a Gulf Coast refinery and a smaller inland metro.' },
    { q: 'What is the cheapest way to get NDT done?', a: 'Bundle work to amortise the mobilisation charge, schedule day shifts (avoid the 25–40% night/turnaround premium), and competitively quote identical scope to 2–3 vetted providers. For routine surface work, MT/PT/VT are far cheaper than UT/PAUT/RT where the code allows them.' },
  ],
  internalLinks: [
    { href: '/cost-guide', label: 'NDT cost guides by city & method', context: 'Localised rate breakdowns.' },
    { href: '/tools/inspection-cost-estimator', label: 'Inspection cost estimator', context: 'Estimate your specific job.' },
    { href: '/find-providers', label: 'Get quotes from providers', context: 'Free, ~24h response.' },
    { href: '/learn/ndt-inspector-salary-guide', label: 'NDT salary guide', context: 'What the labour costs reflect.' },
  ],
  citations: [
    { id: 'ndtc-cost-model', source: 'NDT Connect inspection cost model (2026) — method base rates, equipment surcharges, regional tier multipliers.', url: 'https://ndt-connect.com/cost-guide' },
    { id: 'bls-oes', source: 'US Bureau of Labor Statistics, OES — inspectors/testers wage benchmarks.', url: 'https://www.bls.gov/oes/' },
  ],
};

export default content;
