import type { StandardContent } from '../types';

const standard: StandardContent = {
  code: 'API 1163',
  fullTitle: 'In-line Inspection Systems Qualification',
  organization: 'American Petroleum Institute',
  edition: '3rd Edition, June 2021',
  slug: 'api-1163',
  metaTitle: 'API 1163 ILI Qualification: Tool Selection, PoD/PoI, Audit Pitfalls',
  metaDescription: 'API 1163 3rd ed. (2021) qualifies in-line inspection systems for transmission pipelines. Tool capability, performance specs, validation digs, PHMSA tie-in.',
  heroLede:
    'In-line inspection (ILI) is how transmission pipeline operators see inside the pipe without digging — magnetic flux leakage tools, ultrasonic tools, electromagnetic acoustic tools, and increasingly multi-sensor combo tools running 30-300 miles per pass. API 1163 (3rd ed., June 2021) is the qualification standard that makes ILI results legally defensible under PHMSA integrity management rules. It tells the operator how to select an ILI vendor, what performance specifications to require, how to validate the tool run with field digs, and how to integrate the ILI data into the operator\'s integrity management decision-making. It is referenced by 49 CFR 192.937 (gas transmission integrity management) and 49 CFR 195.591 (hazardous liquid integrity management), making API 1163 compliance a practical requirement for any covered transmission pipeline.',
  scope:
    'API 1163 covers the qualification of ILI systems used to detect, locate, characterize, and size anomalies in cross-country transmission pipelines for gas (49 CFR 192) and hazardous liquid (49 CFR 195) service. It addresses tool capability statements, performance specifications, tool selection, deployment and operation, data interpretation, validation, and the integration of ILI results into integrity management decisions. It does not cover distribution piping (49 CFR 192 Subpart P), gathering pipelines below transmission classification, or in-service piping covered by API 570 inspection programs.',
  whoMustComply: [
    'Transmission pipeline operators of PHMSA-regulated systems implementing integrity management programs',
    'ILI service vendors (Baker Hughes, ROSEN, NDT Global, T.D. Williamson, Quest Integrity, ILI Solutions) supplying qualified tools',
    'Pipeline integrity engineers responsible for ILI program design, tool selection, and data integration',
    'Validation and dig contractors performing the field correlation cuts required to verify ILI tool performance',
    'Third-party data integration firms processing ILI results into integrity management decisions',
    'EPC firms supporting new pipeline baseline ILI runs and tool selection during commissioning',
  ],
  keyRequirements: [
    {
      heading: 'Tool capability and performance specification',
      level: 2,
      paragraphs: [
        'Section 5 requires every ILI tool deployment to begin with a documented tool capability statement covering anomaly types detectable (metal loss, cracks, dents, ovalities, lamination), pipe diameter and wall thickness range, operating envelope (pressure, temperature, flow velocity, product type), and performance specifications. Performance specs include probability of detection (PoD), probability of identification (PoI), sizing accuracy (length, width, depth) with confidence intervals, location accuracy, and overall classification accuracy.',
        'PoD is typically specified as 90% detection at 95% confidence for the smallest anomaly the tool is qualified to detect — for example, 90/95 detection at 10% wall depth for metal loss. The capability statement must match the actual run conditions; running an MFL tool optimized for general corrosion against a pipeline with predominantly axial cracking is a category mismatch flagged at audit.',
      ],
    },
    {
      heading: 'Validation by field digs',
      level: 2,
      paragraphs: [
        'Section 9 requires validation of every ILI run by field excavation and direct measurement of selected anomalies. The validation set must be statistically representative of the reported anomaly population. The 3rd edition specifies validation methodology including the minimum number of validation digs (varies with run size and reported anomaly count) and the statistical evaluation method (linear regression of ILI-reported vs measured size, confidence band evaluation).',
        'The output of validation is a data quality grade — Level 1 (highest, validated and matches spec), Level 2 (validated with adjustments), or Level 3 (validation incomplete, results conditional). Only Level 1 or Level 2 grades support integrity management decisions; Level 3 requires re-validation or additional digs. PHMSA inspectors look at the validation report alongside the raw ILI report — operators who skip or under-resource validation get cited under integrity management rules.',
      ],
      callout: {
        kind: 'warn',
        title: 'Confirmation bias in validation',
        body: 'A common audit failure is picking validation digs that are easy to access or where field results are expected to confirm ILI — this biases the sample. Section 9 requires randomized or stratified selection covering the full anomaly size and type range reported.',
      },
    },
    {
      heading: 'Tool selection by anomaly type',
      level: 2,
      paragraphs: [
        'Section 6 maps anomaly types to tool technologies. MFL (Magnetic Flux Leakage) — high resolution for metal loss; effective on carbon steel; not effective on cracks. EMAT (Electromagnetic Acoustic Transducer) — effective for axial cracks and seam-weld anomalies; sensitive to pipe coating. UT (Ultrasonic) — effective for crack detection and accurate metal loss sizing; requires liquid product or special coupling for gas service. TFI (Transverse Field Inspection) — variation of MFL with magnetization across the pipe axis; effective on circumferential metal loss patterns.',
        'Multi-sensor combo tools combining MFL with EMAT, or MFL with UT, are increasingly standard on critical pipelines. Tool selection must match the operator\'s integrity threat list — if SCC (stress corrosion cracking) is a credible threat, MFL alone does not detect it and EMAT or UT must be added. The 3rd edition aligned tool capability documentation with the threat-based integrity management framework in API 1160 (liquid) and ASME B31.8S (gas).',
      ],
    },
    {
      heading: 'Data integration and reporting',
      level: 2,
      paragraphs: [
        'Section 10 covers how ILI results are integrated into integrity management decision-making. Each reported anomaly must include type classification, size estimate (length × width × depth with confidence), location (absolute and relative to nearest girth weld), and severity rating based on the operator\'s acceptance criteria (typically ASME B31G or RSTRENG for metal loss, API 579 Part 9 for crack-like flaws). The integration is documented in an integrity assessment report that drives dig prioritization and repair scheduling.',
        'PHMSA integrity management rules require response timing on anomalies based on severity. Immediate response anomalies (typically deep metal loss above 80% wall, or anomalies failing strength calculations at MAOP) require pressure reduction or excavation within days. 60-day and 180-day response categories follow. The integration step links ILI data to operational response — and failures here are the most consequential audit findings under 49 CFR 192.933 and 195.452.',
      ],
    },
  ],
  acceptanceCriteria: {
    caption: 'API 1163 typical tool performance specifications (MFL example)',
    headers: ['Parameter', 'Typical spec', 'Reference'],
    rows: [
      ['PoD metal loss (general)', '90% at 10% wall depth, 95% confidence', '§5.2'],
      ['Depth sizing accuracy', '±10% wall, 80% confidence', '§5.3'],
      ['Length sizing accuracy', '±0.5 inch or ±10%', '§5.3'],
      ['Location accuracy (absolute)', '±0.5 m', '§5.4'],
      ['Location accuracy (relative)', '±0.1 m to nearest girth weld', '§5.4'],
      ['Anomaly classification accuracy', '85% correct classification', '§5.5'],
      ['Run repeatability', 'Within sizing spec band', '§5.6'],
    ],
  },
  relatedStandards: [
    { code: 'ASME B31.8S', relation: 'Supplement to ASME B31.8 — managing system integrity of gas pipelines; references API 1163' },
    { code: 'API 1160', relation: 'Managing system integrity for hazardous liquid pipelines; references API 1163' },
    { code: 'ASME B31G', relation: 'Manual for determining remaining strength of corroded pipelines; applied to ILI metal loss data' },
    { code: 'API 579-1', relation: 'Fitness-for-Service for crack-like flaws detected by ILI' },
    { code: 'PHMSA 49 CFR 192 / 195', relation: 'Federal pipeline integrity management rules requiring qualified ILI under API 1163' },
  ],
  commonAuditFindings: [
    'Tool capability statement does not match actual run conditions (wrong product, wrong pressure, wrong threat). Citation: §5.',
    'Validation dig set biased toward easy-access locations rather than statistically representative. Citation: §9.',
    'Data quality grade not documented, or Level 3 grade used to support integrity decisions. Citation: §9.5.',
    'EMAT or UT not deployed on a pipeline with SCC or crack threat — MFL only. Citation: §6.',
    'Anomaly response timing not documented — immediate, 60-day, 180-day categorization missing. Citation: §10.',
    'ILI data integration into integrity assessment lacks repair prioritization linkage. Citation: §10.4.',
    'Vendor qualification records (operator certifications, tool history) not retained for audit. Citation: §11.',
    'Multiple consecutive ILI runs not compared for growth rate calculation. Citation: §10.5.',
  ],
  faqs: [
    {
      q: 'How does API 1163 differ from running an ILI tool?',
      a: 'Running an ILI tool is the operational act of launching, tracking, and retrieving a pig with sensors. API 1163 is the qualification framework that wraps around the run — tool selection criteria before the run, performance specification documentation, validation dig planning, data integration after the run, and the audit-grade documentation chain that ties everything together. An ILI run without API 1163 framework produces data but does not produce regulatory compliance under PHMSA integrity management rules. Operators sometimes treat the standard as paperwork overhead — that view ends the first time a release occurs and the integrity management decision audit trail is requested.',
    },
    {
      q: 'What if the ILI tool reports anomalies that field validation cannot find?',
      a: 'This is a probability of false call problem and the 3rd edition addresses it directly. Validation digs must include both reported anomalies and selected unreported locations to evaluate both PoD (missed real anomalies) and false call rate. If validation shows ILI reporting anomalies that do not exist, the tool data quality grade drops and the operator must either re-validate, dig additional sites to better characterize the false call rate, or rerun with a more capable tool. The opposite problem — anomalies in the field that ILI missed — is more serious and may trigger 49 CFR 192.937(c) regulatory review with possible PHMSA enforcement action.',
    },
    {
      q: 'How frequently must ILI runs be repeated?',
      a: 'PHMSA rules set integrity assessment interval requirements: 49 CFR 192.939 caps reassessment interval at 7 years for gas transmission HCAs (high consequence areas); 49 CFR 195.452(j) caps liquid HCA reassessment at 5 years. The operator can shorten intervals based on threat assessment, anomaly growth rate from comparing successive runs, or operational changes. Many operators run ILI every 3-5 years on critical lines to build a growth-rate-trended dataset and to maintain confidence in anomaly response timing decisions.',
    },
    {
      q: 'Do gathering lines need API 1163-qualified ILI?',
      a: 'Most gathering lines fall below PHMSA transmission classification, so the federal integrity management rules do not apply directly. However, gathering lines that meet the regulatory definition of "regulated rural gathering" or that operate at transmission pressures may be covered. State pipeline safety authorities also impose their own rules — Texas Railroad Commission, North Dakota PSC, and others. Operators of gathering systems increasingly apply API 1163 voluntarily because the qualification framework reduces liability and supports insurance underwriting even where not legally required.',
    },
  ],
  internalLinks: [
    { href: '/methods/magnetic-flux-leakage', label: 'MFL inspection technology', context: 'Primary ILI technology for metal loss detection.' },
    { href: '/methods/ultrasonic-testing', label: 'UT for ILI applications', context: 'Used in liquid-product pipeline ILI tools for crack and metal loss.' },
    { href: '/standards/api-1104', label: 'API 1104 pipeline welding', context: 'Construction code paired with API 1163 in-service inspection.' },
    { href: '/standards/asme-b31-4', label: 'ASME B31.4 liquid pipeline', context: 'Construction code for hazardous liquid transmission.' },
    { href: '/standards/asme-b31-8', label: 'ASME B31.8 gas pipeline', context: 'Construction code for gas transmission.' },
    { href: '/standards/api-579', label: 'API 579 FFS', context: 'Applied to crack-like flaws found by ILI.' },
    { href: '/industries/pipeline-integrity', label: 'Pipeline integrity management', context: 'Regulatory framework where API 1163 is mandatory.' },
    { href: '/find-providers', label: 'Find ILI inspection vendors', context: 'Engage qualified ILI service providers for transmission pipelines.' },
  ],
  citations: [
    { id: 'api-1163-cover', source: 'API 1163, In-line Inspection Systems Qualification, 3rd ed., June 2021', url: 'https://www.api.org/products-and-services/standards' },
    { id: 'api-1163-5', source: 'API 1163 §5 — Tool capability and performance specification' },
    { id: 'api-1163-6', source: 'API 1163 §6 — Tool selection by anomaly type' },
    { id: 'api-1163-9', source: 'API 1163 §9 — Validation by field digs' },
    { id: 'api-1163-10', source: 'API 1163 §10 — Data integration and reporting' },
    { id: 'asme-b31-8s', source: 'ASME B31.8S-2022, Managing System Integrity of Gas Pipelines' },
    { id: 'api-1160', source: 'API 1160, Managing System Integrity for Hazardous Liquid Pipelines, 3rd ed. (2019)' },
    { id: 'asme-b31g', source: 'ASME B31G-2012, Manual for Determining the Remaining Strength of Corroded Pipelines' },
    { id: 'api-579-ili', source: 'API 579-1/ASME FFS-1, Fitness-For-Service, 3rd ed. (2021)' },
    { id: 'phmsa-192-ili', source: 'PHMSA 49 CFR 192.937 — Gas transmission integrity reassessment', url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-D/part-192' },
    { id: 'phmsa-195-ili', source: 'PHMSA 49 CFR 195.452 — Hazardous liquid integrity management', url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-D/part-195' },
    { id: 'api-1104-ili', source: 'API 1104, Welding of Pipelines and Related Facilities, 22nd ed. (2021)' },
    { id: 'astm-e2261', source: 'ASTM E2261-19, Standard Practice for Examination of Welds Using the Alternating Current Field Measurement Technique' },
  ],
};

export default standard;
