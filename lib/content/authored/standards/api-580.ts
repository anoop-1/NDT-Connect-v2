import type { StandardContent } from '../types';

const standard: StandardContent = {
  code: 'API 580',
  fullTitle: 'Risk-Based Inspection',
  organization: 'American Petroleum Institute',
  edition: '4th Edition, March 2023',
  slug: 'api-580',
  metaTitle: 'API 580 Risk-Based Inspection: Program Elements, Roles, Audit Hot Spots',
  metaDescription: 'API 580 4th ed. (2023) governs how to build a credible RBI program. Required elements, team roles, reassessment cadence, and common audit findings.',
  heroLede:
    'The moment an owner-user wants to extend inspection intervals beyond the defaults in API 510, API 570, or API 653, the program documenting that extension must satisfy API 580. The 4th edition (March 2023) is the qualitative program-level recommended practice — it tells you what an RBI program must contain (organizational roles, damage mechanism review, consequence and probability evaluation, action plan development, MOC integration, reassessment triggers) without prescribing the calculation methodology. The companion document API 581 supplies the quantitative methodology. Together they let refineries, petrochemical plants, and offshore operators rebalance inspection effort from low-risk equipment to high-risk equipment while staying inside the regulatory boundary set by OSHA PSM and state pressure equipment authorities.',
  scope:
    'API 580 covers the management framework, organizational structure, and program elements required to credibly implement Risk-Based Inspection on pressurized equipment in process service — pressure vessels per API 510, piping per API 570, and atmospheric storage tanks per API 653. It does not prescribe the probability or consequence calculation method (that is API 581 or any qualified equivalent). It does not apply to non-pressurized rotating equipment, electrical equipment, or structural steel. The 4th edition strengthened sections on MOC integration, software qualification, and the line between RBI and traditional time-based inspection programs.',
  whoMustComply: [
    'Owner-operators implementing or maintaining RBI to extend inspection intervals on PSM-covered equipment',
    'Inspection managers responsible for the documented RBI program at refineries, petrochemical, and chemical plants',
    'Corrosion engineers and inspection engineers serving on the RBI team per §4',
    'Process engineers responsible for operating envelope definition and MOC integration',
    'Software vendors supplying RBI platforms (Meridium APM, GE APM, PCMS, Antea, RBI-Pro) whose tools must be qualified per §6',
    'Third-party verification firms auditing RBI programs for owner-users or insurers',
  ],
  keyRequirements: [
    {
      heading: 'Required program elements',
      level: 2,
      paragraphs: [
        'Section 4 lists the mandatory elements: management systems, organizational structure, written procedures, qualified personnel, equipment screening, damage mechanism identification per API 571, consequence and probability evaluation, risk ranking, inspection planning, action prioritization, reassessment, MOC integration, and documentation/recordkeeping. Missing any one of these is a finding at audit — and many programs fail on MOC integration specifically.',
        'The 4th edition adds explicit requirements that the program documentation cover software qualification (algorithms, version control, data integrity), data sources (field data, lab analyses, operating envelope), and approval signatures from both inspection management and engineering management. The "RBI assessment" itself is a deliverable: a documented report per assessment cycle that lists every covered piece of equipment, its damage mechanisms, its consequence and probability scores, its risk ranking, and the resulting inspection plan.',
      ],
    },
    {
      heading: 'Team composition and qualifications',
      level: 2,
      paragraphs: [
        'Section 5 requires a multi-disciplinary team. Minimum membership: an inspection engineer or AI, a corrosion or materials engineer, a process engineer with operating knowledge, an operations representative, and a facilitator. Larger or more complex assessments add reliability engineers, mechanical engineers for FFS interface, and risk analysts. Each team member must be qualified by training and experience for their role — and qualifications must be documented.',
        'The facilitator is the most under-recognized role at audit. A qualified RBI facilitator is responsible for ensuring the methodology is applied consistently, that consequence and probability inputs are auditable, and that the team\'s output is defensible. Many programs fail because the "facilitator" is just a software operator without RBI training. The 4th edition specifies the facilitator must have completed documented RBI training plus a minimum number of assessments under supervision.',
      ],
      callout: {
        kind: 'info',
        title: 'Sponsorship matters',
        body: 'Section 5.2 requires senior management sponsorship for the RBI program. Without documented executive approval and resource commitment, the program is treated as a side project at audit. PSM cite-able.',
      },
    },
    {
      heading: 'Reassessment triggers and cadence',
      level: 2,
      paragraphs: [
        'Section 8.2 sets maximum reassessment interval at 10 years and recommends 5 years for normal programs. Reassessment is triggered earlier by any MOC event that changes operating envelope (temperature, pressure, feed composition, velocity, dewpoint), by a confirmed damage mechanism change, by significant inspection findings, by an incident or near-miss, by equipment modification, or by software version change that affects calculation results.',
        'The most common audit gap is the operating envelope creep — sulfur in feed creeps up over years, naphthenic acid TAN edges higher, hydrogen partial pressure increases as the unit pushes harder. None of these may individually trigger MOC, but they cumulatively shift damage mechanism severity. A mature RBI program runs an envelope check at every turnaround to compare measured conditions against assessed conditions and flags drift before it invalidates the risk ranking.',
      ],
    },
    {
      heading: 'Documentation and audit trail',
      level: 2,
      paragraphs: [
        'Section 12 requires documented records for every element. The RBI report must include: equipment list, operating envelope, damage mechanism review per API 571, consequence inputs and calculation, probability inputs and calculation, inspection effectiveness ratings (per API 581 Annex 2.C), risk ranking, inspection plan with intervals, action items, owner approval, and revision history. Records must be retained for the life of the equipment.',
        'Auditors look for traceability — every number in the risk ranking should trace back to a data source, a calculation, an assumption, and an approval. Programs that store outputs only ("equipment X is medium risk, inspect every 7 years") without the underlying inputs fail at audit. Modern software handles this if used correctly; spreadsheet-based programs often lose the trail.',
      ],
    },
  ],
  relatedStandards: [
    { code: 'API 581', relation: 'Quantitative RBI methodology providing calculation procedures for consequence and probability' },
    { code: 'API 510', relation: 'Vessel inspection code whose intervals can be extended through an API 580-compliant RBI program' },
    { code: 'API 570', relation: 'Piping inspection code that defers to API 580 for interval extension' },
    { code: 'API 653', relation: 'Tank inspection code with limited RBI extension allowed under API 580 framework' },
    { code: 'API 571', relation: 'Damage mechanism reference required as input to every API 580 risk evaluation' },
  ],
  commonAuditFindings: [
    'MOC events not flagged to the RBI team — operating envelope drift not captured. Citation: §8.2.',
    'Facilitator without documented training and assessment experience. Citation: §5.4.',
    'Damage mechanism review missing or generic — no reference to API 571 mechanisms specific to the unit. Citation: §6.3.',
    'Consequence calculation using default fluid inventory instead of measured leak rate × isolation time. Citation: §7.2.',
    'Inspection effectiveness ratings claimed without supporting procedure or coverage data. Citation: §9.3.',
    'Reassessment interval exceeded 10 years without documented extension justification. Citation: §8.2.',
    'Risk ranking output stored without traceable inputs in the system of record. Citation: §12.',
    'Software qualification missing — no version control, no algorithm validation. Citation: §6.5.',
  ],
  faqs: [
    {
      q: 'What is the difference between API 580 and API 581?',
      a: 'API 580 is the qualitative recommended practice — it defines what an RBI program must contain (organizational structure, processes, documentation, reassessment cadence) without specifying how to calculate consequence or probability. API 581 is the quantitative methodology — it provides actual algorithms, lookup tables, and equations for calculating consequence of failure (release rates, ignition probability, financial loss, safety impact) and probability of failure (generic failure frequency with modification factors for thinning, environmental cracking, mechanical fatigue, etc.). An RBI program implementing API 581 satisfies API 580; an RBI program using a different qualified quantitative methodology can also satisfy API 580.',
    },
    {
      q: 'Can a small operator implement RBI without dedicated software?',
      a: 'Technically yes — the standard does not mandate specific software. But practical reality is that even a mid-size refinery covers 1,000+ equipment items, and the qualitative cross-checks, damage mechanism reviews, inspection effectiveness ratings, and audit trail requirements rapidly outgrow spreadsheets. Common platforms: Meridium APM (now GE APM), PCMS, Antea, Hexagon PPM RBI module, Honeywell Forge, RBI-Pro. The standard requires whatever tool is used to be qualified — meaning its algorithms, version control, and data integrity controls are documented and validated against API 581 methodology.',
    },
    {
      q: 'How long can an RBI assessment remain valid?',
      a: 'Section 8.2 caps reassessment interval at 10 years and recommends 5 years for active programs. In practice most refineries reassess every 5 years on a rolling basis (different units in different years) plus event-driven reassessment when MOC, incidents, or major inspection findings invalidate prior assumptions. State authorities sometimes impose stricter limits — Texas TCEQ and California Cal/OSHA have both cited operators for reassessment older than 5 years on Class 1 piping or H2S service vessels even when the API 580 default would allow longer.',
    },
    {
      q: 'Does API 580 apply to atmospheric storage tanks?',
      a: 'Yes, but the extension benefit is narrower than for pressure equipment. API 653 allows internal inspection extension from 20 years to 30 years only when RBI is combined with a release prevention barrier and continuous leak detection — RBI alone does not unlock the 30-year cap. Without RPB and leak detection, the 20-year cap holds even with the best RBI program. API 580 still applies to the program-level framework, but the practical lever for tanks is smaller than for piping or vessels.',
    },
  ],
  internalLinks: [
    { href: '/standards/api-581', label: 'API 581 quantitative methodology', context: 'Calculation procedures behind the API 580 framework.' },
    { href: '/standards/api-510', label: 'API 510 vessel inspection', context: 'Primary code whose intervals API 580 lets you extend.' },
    { href: '/standards/api-570', label: 'API 570 piping inspection', context: 'Piping code that defers to API 580 for interval extension.' },
    { href: '/standards/api-653', label: 'API 653 tank inspection', context: 'Tank code with limited RBI extension under API 580.' },
    { href: '/standards/api-571', label: 'API 571 damage mechanisms', context: 'Required input for every API 580 risk evaluation.' },
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT for highly-effective inspection', context: 'Drives inspection effectiveness ratings used in API 580/581.' },
    { href: '/industries/oil-gas-refining', label: 'Refining RBI programs', context: 'Industry where API 580 is enforced under OSHA PSM.' },
    { href: '/find-providers', label: 'Find RBI consulting firms', context: 'Engage specialty firms for RBI implementation and audits.' },
  ],
  citations: [
    { id: 'api-580-cover', source: 'API 580, Risk-Based Inspection, 4th ed., March 2023', url: 'https://www.api.org/products-and-services/standards' },
    { id: 'api-580-4', source: 'API 580 §4 — Required program elements' },
    { id: 'api-580-5', source: 'API 580 §5 — RBI team composition and qualifications' },
    { id: 'api-580-6', source: 'API 580 §6 — Damage mechanism review' },
    { id: 'api-580-7', source: 'API 580 §7 — Consequence of failure evaluation' },
    { id: 'api-580-8', source: 'API 580 §8 — Probability evaluation and reassessment' },
    { id: 'api-580-9', source: 'API 580 §9 — Inspection planning and effectiveness' },
    { id: 'api-580-12', source: 'API 580 §12 — Documentation and recordkeeping' },
    { id: 'api-581-580', source: 'API 581, Risk-Based Inspection Methodology, 3rd ed. (2016, addendums)' },
    { id: 'api-510-rbi', source: 'API 510 §6.4 — Inspection intervals and RBI extension path' },
    { id: 'api-570-rbi', source: 'API 570 §6.5 — Piping intervals and RBI extension' },
    { id: 'api-571-rbi', source: 'API 571, Damage Mechanisms Affecting Fixed Equipment, 3rd ed. (2020)' },
    { id: 'osha-psm-rbi', source: 'OSHA 29 CFR 1910.119, Process Safety Management', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.119' },
  ],
};

export default standard;
