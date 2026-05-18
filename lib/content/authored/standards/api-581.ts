import type { StandardContent } from '../types';

const standard: StandardContent = {
  code: 'API 581',
  fullTitle: 'Risk-Based Inspection Methodology',
  organization: 'American Petroleum Institute',
  edition: '3rd Edition, April 2016, with Addendums through 2020',
  slug: 'api-581',
  metaTitle: 'API 581 RBI Methodology: POF/COF Math, DF Factors, Audit Mistakes',
  metaDescription: 'API 581 3rd ed. quantitative RBI methodology. Probability and consequence calculation, damage factors, inspection effectiveness, common citations.',
  heroLede:
    'API 581 (3rd ed., April 2016, with 2020 addendums) is the quantitative back-end that makes Risk-Based Inspection defensible. While API 580 says what an RBI program must contain, API 581 supplies the actual math — generic failure frequencies, damage factor calculations for 22 damage mechanisms, consequence calculations for releases to atmosphere and pool fires, environmental and financial consequence components, and the inspection effectiveness modifier tables that let a credible thickness inspection drop the probability of failure by an order of magnitude. The methodology is built around four leak-size categories (1/4", 1", 4", and rupture), three consequence categories (safety/area, financial, environmental), and a risk matrix that crosses probability and consequence to produce one of five risk rankings used to set inspection intervals.',
  scope:
    'API 581 provides quantitative methodology for evaluating probability and consequence of failure of pressure-containing equipment (vessels, piping, tanks, heat exchanger tubes, pressure relief devices) at refineries, petrochemical plants, and chemical plants. It is referenced by API 580 as the default quantitative approach. The methodology covers thinning, environmental cracking, brittle fracture, external damage, mechanical fatigue, and 17 other damage mechanism categories. It does not cover rotating equipment, electrical systems, or non-pressure structural failure.',
  whoMustComply: [
    'Owner-operators applying RBI to extend inspection intervals on PSM-covered pressure equipment',
    'Inspection engineers and corrosion engineers performing API 581 calculations',
    'RBI software vendors whose tools must be qualified to API 581 methodology and version-controlled',
    'EPC firms providing initial RBI assessments during plant commissioning',
    'Insurance loss control engineers validating risk assessments for renewal',
    'Third-party verification firms auditing RBI outputs for owner-users',
  ],
  keyRequirements: [
    {
      heading: 'Probability of failure (POF) framework',
      level: 2,
      paragraphs: [
        'Section 3 (Part 2 of the volume) defines POF as the product of a generic failure frequency (gff) for the equipment type, a damage factor (Df), and a management systems factor (Fms). The gff is a tabulated industry-derived failure rate per leak size — for example, a process pipe segment has a gff of 3.06×10⁻⁶ /year for 1/4" hole, 8.25×10⁻⁷ for 1", and so on. The damage factor Df modifies that frequency based on the active damage mechanism (thinning, stress corrosion cracking, HIC, mechanical fatigue, etc.) and the credit taken for inspection effectiveness.',
        'The damage factor calculation is where the inspection program directly influences risk. A piping circuit with 50 mpy corrosion rate, 5 years since last inspection, and a Highly Effective ultrasonic survey gets a much lower Df than the same circuit with a Poorly Effective inspection. Annex 2.C in API 581 (referenced by both API 580 and API 570) defines the effectiveness ratings — Usually, Fairly, Mostly, Highly Effective — based on inspection technique, coverage, and the ability to detect the expected damage.',
      ],
    },
    {
      heading: 'Consequence of failure (COF) framework',
      level: 2,
      paragraphs: [
        'Part 3 of the volume splits consequence into Safety/Area (Level 1 simplified or Level 2 detailed), Financial (production loss, equipment replacement, environmental cleanup, business interruption), and Environmental (spill volume × clean-up cost). Level 1 safety/area consequence uses simplified release rate calculations and pre-tabulated impact distance curves indexed to fluid type and phase. Level 2 uses a more detailed dispersion analysis, often imported from PHAST or DNV consequence modeling tools.',
        'The leak-size categories drive consequence — a 1/4" leak in light hydrocarbon vapor releases roughly 0.1 kg/s and produces a small flammable cloud; a 4" leak releases 50 kg/s and produces a vapor cloud explosion risk. The methodology integrates across all four leak sizes weighted by their relative frequency to produce an expected consequence per equipment per year.',
      ],
      callout: {
        kind: 'spec',
        title: 'Detection and isolation matter',
        body: 'Section 4.6 lets detection systems (gas detectors, low-pressure alarms) and isolation systems (ROVs, ESDVs) reduce the consequence calculation by shrinking the release duration. A site with poor detection and manual block valves carries higher consequence than the same equipment with automated ESD.',
      },
    },
    {
      heading: 'Damage factor calculation per mechanism',
      level: 2,
      paragraphs: [
        'Annex 2.B walks through Df calculation for each of 22 mechanism categories. For thinning (the most common), Df depends on the Ar/t ratio (rate × time / thickness), the inspection effectiveness rating, the number and frequency of inspections, the on-line monitoring credit, and any thinning rate uncertainty multiplier. The result is a multiplier on the generic failure frequency — a Df of 1 means baseline, a Df of 100 means 100× more likely to fail than the industry average.',
        'For environmental cracking (chloride SCC, polythionic acid SCC, amine cracking, sour cracking, HIC, SOHIC), Df depends on susceptibility (material × environment), severity (chloride concentration, dew point, pH), heat treatment state (PWHT or as-welded), and inspection effectiveness for that specific mechanism. UT thickness does not detect chloride SCC — it requires PT or ECT or PAUT with crack-sizing — so giving "Highly Effective" rating to UT for SCC service is a common audit finding.',
      ],
    },
    {
      heading: 'Risk matrix and inspection interval setting',
      level: 2,
      paragraphs: [
        'Part 1 of the volume defines the risk matrix — typically a 5×5 grid crossing five probability bands with five consequence bands, producing 25 cells colored across five risk rankings. The owner-user sets the risk target (target risk band) for the program — typically Medium-Low or below for normal service, Low for hazardous service. Equipment falling above the risk target requires inspection action: either upgraded inspection (better effectiveness, more frequent) to reduce probability, or operational change (operating envelope tightening, monitoring) to reduce consequence.',
        'Inspection intervals are derived by working backward — given the current risk and target risk, how often must the equipment be inspected with what effectiveness rating to keep risk inside the target? The methodology produces a recommended interval and effectiveness; the inspection plan is the operational embodiment.',
      ],
    },
  ],
  acceptanceCriteria: {
    caption: 'API 581 risk band targets and typical inspection responses',
    headers: ['Risk band', 'Description', 'Typical interval', 'Inspection effectiveness'],
    rows: [
      ['Low', 'Below target — minimal risk', '10+ years', 'Usually Effective'],
      ['Medium-Low', 'At target — normal operation', '7-10 years', 'Usually-Mostly Effective'],
      ['Medium', 'Slightly above target', '5-7 years', 'Mostly Effective'],
      ['Medium-High', 'Above target — action plan needed', '3-5 years', 'Highly Effective'],
      ['High', 'Far above target — immediate action', '1-3 years or mitigation', 'Highly Effective + monitoring'],
    ],
  },
  relatedStandards: [
    { code: 'API 580', relation: 'Qualitative program framework that requires API 581 (or equivalent qualified methodology)' },
    { code: 'API 571', relation: 'Damage mechanism reference required as input to API 581 Df calculations' },
    { code: 'API 510', relation: 'Vessel inspection code that defers to API 581 for quantitative interval extension' },
    { code: 'API 570', relation: 'Piping inspection code that references API 581 for inspection effectiveness ratings' },
    { code: 'API 579', relation: 'FFS methodology invoked when API 581 calculations identify damaged equipment requiring assessment' },
  ],
  commonAuditFindings: [
    'Inspection effectiveness rating "Highly Effective" claimed for UT thickness on a circuit with SCC susceptibility. Citation: Annex 2.C.',
    'Damage factor calculation using corrosion rate from short-term trend only, ignoring long-term rate. Citation: API 510 §7.1.1 + API 581 Annex 2.B.',
    'Consequence calculation using default isolation time without site-specific ESD/ROV credit. Citation: §4.6.',
    'Generic failure frequency taken from outdated edition — gff values were updated in 2020 addendum. Citation: §3.4.',
    'Management systems factor (Fms) taken as 1.0 without supporting MS evaluation. Citation: §3.5.',
    'Risk matrix target band not documented or signed by management. Citation: API 580 §5.2.',
    'Damage mechanism review missing for HIC/SOHIC in sour service circuits. Citation: API 571 §5.1.2.',
    'Software version not qualified — algorithm changes between releases not validated. Citation: API 580 §6.5.',
  ],
  faqs: [
    {
      q: 'Can I use a non-API-581 methodology and still comply with API 580?',
      a: 'Yes — API 580 §6.2 explicitly allows qualified alternative methodologies. The condition is that the alternative produces equivalent rigor: documented probability and consequence calculations, damage mechanism integration, inspection effectiveness credits, traceable audit trail. Some operators use DNV RBI software with its proprietary methodology; some use ABS Group methodology for marine assets. The methodology must be documented in writing, validated against industry-accepted basis, and accepted by the AI and management. API 581 is the most commonly cited because it is publicly available and well-documented, which makes audits easier.',
    },
    {
      q: 'How do inspection effectiveness ratings actually reduce probability?',
      a: 'Annex 2.C provides multipliers. A Highly Effective inspection on a thinning mechanism, performed within the recommended interval, can reduce the damage factor by 80-95% compared to no inspection — meaning the calculated probability of failure drops by the same proportion. The trade-off is rigor: Highly Effective on UT thickness for thinning requires 100% coverage of the susceptible circuit, multiple readings per location, qualified procedure, and documented detection capability. Sampling-based UT typically rates only Usually Effective. The economic implication is significant — a Highly Effective inspection program costs more per turnaround but lets the operator confidently extend intervals and reduce the number of unnecessary internal inspections.',
    },
    {
      q: 'What is the management systems factor Fms?',
      a: 'Fms is a multiplier on the probability calculation that captures the maturity of the site\'s mechanical integrity program. A site with documented MOC, PSM, training, inspection backlog management, and corrosion control performs better at Fms = 0.5 (probability halved) than a site with weak systems at Fms = 1.5. The factor is assessed through a questionnaire-based audit covering 19 management practice categories. Most mature US refineries score Fms between 0.7 and 1.2. Greenfield assets or recently acquired sites with weak documentation score worse until the program matures.',
    },
    {
      q: 'How often must API 581 calculations be re-run?',
      a: 'API 580 §8.2 caps reassessment interval at 10 years and recommends 5 years. In practice the calculations are re-run whenever inputs change — new inspection result, operating envelope change, damage mechanism change, MOC event — and the software platform tracks revision history. Many sites run a "rolling" reassessment where 20% of equipment is reassessed each year on a 5-year cycle, plus event-driven reassessment for triggers. The full program reassessment (recalibration of risk target, MS audit, methodology version refresh) typically aligns with the 5-year cadence.',
    },
  ],
  internalLinks: [
    { href: '/standards/api-580', label: 'API 580 program framework', context: 'Required qualitative program structure that calls API 581.' },
    { href: '/standards/api-571', label: 'API 571 damage mechanisms', context: 'Mechanism inputs for damage factor calculations.' },
    { href: '/standards/api-510', label: 'API 510 vessel inspection', context: 'Inspection code whose intervals API 581 lets you set quantitatively.' },
    { href: '/standards/api-570', label: 'API 570 piping inspection', context: 'Piping code referencing API 581 inspection effectiveness.' },
    { href: '/standards/api-579', label: 'API 579 fitness-for-service', context: 'Engineering assessment for equipment flagged high-risk by API 581.' },
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT for highly-effective inspections', context: 'PAUT corrosion mapping supports Highly Effective rating.' },
    { href: '/industries/oil-gas-refining', label: 'Refining RBI economics', context: 'Industry where API 581 drives inspection planning at scale.' },
    { href: '/find-providers', label: 'Find RBI software and consultants', context: 'Engage qualified providers for API 581 implementation.' },
  ],
  citations: [
    { id: 'api-581-cover', source: 'API 581, Risk-Based Inspection Methodology, 3rd ed., April 2016 (addendums through 2020)', url: 'https://www.api.org/products-and-services/standards' },
    { id: 'api-581-part-1', source: 'API 581 Part 1 — Risk matrix and overall methodology' },
    { id: 'api-581-part-2', source: 'API 581 Part 2 — Probability of failure methodology' },
    { id: 'api-581-part-3', source: 'API 581 Part 3 — Consequence of failure methodology' },
    { id: 'api-581-annex-2b', source: 'API 581 Annex 2.B — Damage factor calculation per mechanism' },
    { id: 'api-581-annex-2c', source: 'API 581 Annex 2.C — Inspection effectiveness ratings' },
    { id: 'api-580-581', source: 'API 580, Risk-Based Inspection, 4th ed. (2023)' },
    { id: 'api-571-581', source: 'API 571, Damage Mechanisms Affecting Fixed Equipment, 3rd ed. (2020)' },
    { id: 'api-510-581', source: 'API 510 §6.4 — Inspection intervals and RBI' },
    { id: 'api-570-581', source: 'API 570 §6.5 — Piping intervals and RBI' },
    { id: 'api-653-581', source: 'API 653 §4.4 — Tank RBI extension' },
    { id: 'phast-dnv', source: 'DNV PHAST consequence modeling — commonly used for API 581 Level 2 consequence input' },
    { id: 'osha-581', source: 'OSHA 29 CFR 1910.119, Process Safety Management', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.119' },
  ],
};

export default standard;
