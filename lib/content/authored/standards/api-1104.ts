import type { StandardContent } from '../types';

const standard: StandardContent = {
  code: 'API 1104',
  fullTitle: 'Welding of Pipelines and Related Facilities',
  organization: 'American Petroleum Institute',
  edition: '22nd Edition, July 2021',
  slug: 'api-1104',
  metaTitle: 'API 1104 Pipeline Welding: WPS, NDT, ECA Acceptance, Audit Risks',
  metaDescription: 'API 1104 22nd ed. (2021) governs cross-country pipeline welding. WPS qualification, NDT requirements, workmanship vs ECA acceptance, audit gaps.',
  heroLede:
    'API 1104 (22nd ed., July 2021) is the welding code for cross-country transmission pipelines and their related facilities — oil, gas, and product pipelines regulated by PHMSA under 49 CFR 192 and 195. It is the standard cited by federal regulation: 49 CFR 192.227 (gas pipelines) and 49 CFR 195.222 (hazardous liquid pipelines) explicitly require welds to be made under written WPS qualified to API 1104 or ASME Section IX. The 22nd edition tightened essential variables for SMAW, GMAW, FCAW, and the modern automated processes (mechanized GMAW for long-distance projects), updated the ECA (Engineering Critical Assessment) pathway in Annex A for alternate acceptance criteria, and expanded NDT requirements with explicit AUT (Automated Ultrasonic Testing) qualification per Annex B and Section 11.',
  scope:
    'API 1104 covers arc and oxyfuel welding of carbon steel and low-alloy steel pipe and components in pipeline transportation systems for liquid petroleum and natural gas. It applies to pipe diameters 2 inches and above, wall thicknesses from 0.156 inches to 0.787 inches in the standard tables (thicker sections require essential variable extensions). It addresses procedure qualification, welder qualification, in-process inspection, NDT acceptance, repair welding, and weld defect characterization. It does not cover ASME Section VIII pressure vessels (those follow Section IX for welding), shop-fabricated piping spools to B31.3 (which uses B31.3 welding rules), or distribution piping below 2-inch diameter governed by ASME B31.8 default rules.',
  whoMustComply: [
    'Pipeline operators of PHMSA-regulated transmission systems under 49 CFR 192 (gas) and 49 CFR 195 (hazardous liquid)',
    'Construction contractors performing new pipeline construction, tie-ins, repairs, or re-routes',
    'Pipeline integrity engineers qualifying WPS for repair sleeves, hot taps, and stopple operations',
    'NDT inspection contractors performing RT, AUT, or manual UT on pipeline girth welds',
    'AUT system vendors and qualified operators meeting Annex B technique qualification',
    'Pipeline coating contractors whose work follows weld inspection acceptance',
  ],
  keyRequirements: [
    {
      heading: 'Procedure and welder qualification',
      level: 2,
      paragraphs: [
        'Section 5 covers WPS qualification. Essential variables include base metal grade, pipe diameter range, wall thickness range, welding process, filler metal classification, electrical characteristics, joint design, shielding gas (for GMAW/FCAW), preheat, and PWHT. Each WPS is qualified by destructive testing of a test joint — tensile testing, nick-break testing, side-bend testing, and root-bend / face-bend testing per §5.6. The 22nd edition tightened essential variables for mechanized GMAW to address procedure drift on long-distance projects.',
        'Section 6 covers welder qualification. Each welder must qualify on each WPS or qualify to a related qualification range. Qualification involves welding a test coupon and passing destructive tests (or NDT for production welder qualification). Single-side, double-side, and uphill versus downhill positions are separate essential variables — a welder qualified downhill is not qualified uphill without re-test. Welder qualification expires after 6 months without use of the process or after a change in essential variable.',
      ],
    },
    {
      heading: 'NDT requirements and acceptance',
      level: 2,
      paragraphs: [
        'Section 9 covers NDT methods: visual inspection (mandatory for every weld), radiographic testing (per Section 11.1), ultrasonic testing (manual per 11.4, automated per Annex B), magnetic particle testing (Section 11.2), and liquid penetrant testing (Section 11.3). RT and UT are the primary volumetric methods. NDT coverage is typically 100% of girth welds on cross-country mainline construction, with reduced coverage on lower-class locations per the operator\'s specification and PHMSA regulatory class requirements.',
        'Acceptance criteria split into workmanship-based (Section 9.3) and ECA-based (Annex A). Workmanship limits — for example, maximum porosity area, maximum slag inclusion length, maximum undercut depth — are conservative and easy to apply but reject welds that may be perfectly fit for service. The ECA pathway in Annex A allows alternate acceptance based on fracture mechanics analysis, weld stress state, material toughness, and crack growth modeling. Most cross-country construction uses workmanship criteria; large-diameter offshore and strain-based pipelines use ECA.',
      ],
      callout: {
        kind: 'spec',
        title: 'AUT qualification is rigorous',
        body: 'Annex B requires automated UT systems to be qualified on test pieces with known reflectors representative of the production weld geometry. Procedure qualification must demonstrate detection at the smallest reflector size to be sized. Many AUT contractors require 2-4 weeks of project-specific qualification before going to production.',
      },
    },
    {
      heading: 'Repair welding rules',
      level: 2,
      paragraphs: [
        'Section 10 addresses defect repair. Most defects can be repaired by grinding out and rewelding under the same qualified WPS. Cracks must be fully removed before rewelding — MT or PT verification of complete removal is required. The number of times a weld can be repaired in the same area is limited — typically two repair attempts before the entire weld must be cut out, though operator specifications often tighten this to one. The 22nd edition clarified that crack repair always requires written procedure approval and engineering review.',
        'In-service welds (hot taps, stopples, weld sleeves for pipeline repair) require qualified WPS that account for the heat sink effect of flowing product — preheat and interpass temperature controls must compensate. The qualifications follow API 2201 and API 1107 for in-service welding plus API 1104 §10 for the procedure structure.',
      ],
    },
    {
      heading: 'Mechanized and automated welding',
      level: 2,
      paragraphs: [
        'Modern long-distance pipeline construction uses mechanized GMAW (PGMAW — pulsed gas metal arc welding) deployed from internal welding clamps and external bug-and-band systems. The 22nd edition expanded essential variable controls for these processes — arc length, arc voltage, wire feed rate, travel speed all tracked per WPS. Production deviations beyond essential variable windows trigger qualification re-evaluation.',
        'NDT for these welds is increasingly Automated UT (Annex B) rather than RT — AUT produces immediate digital records, supports inline inspection during construction without delaying production rate, and eliminates radiation safety logistics. AUT acceptance limits are calibrated against the workmanship or ECA criteria in the project specification. Inline RT is still used where AUT is uneconomic or for verification samples.',
      ],
    },
  ],
  acceptanceCriteria: {
    caption: 'API 1104 §9.3 workmanship acceptance limits (excerpt)',
    headers: ['Defect type', 'Workmanship limit', 'Reference'],
    rows: [
      ['Cracks', 'Not permitted', '§9.3.1'],
      ['Incomplete fusion (sidewall)', '1 inch in any 12 inches', '§9.3.2'],
      ['Incomplete penetration', '1 inch in any 12 inches', '§9.3.3'],
      ['Slag inclusion (elongated)', '½ inch single, 1 inch total in 12 inches', '§9.3.6'],
      ['Porosity (cluster)', '½ inch in 12 inches', '§9.3.7'],
      ['Undercut adjacent to cover pass', 'Less than 1/32 inch or 12.5% of wall', '§9.3.8'],
      ['Burn-through', '¼ inch single, ½ inch total in 12 inches', '§9.3.9'],
      ['Arc burn', 'Not permitted in pressure-retaining wall', '§9.3.11'],
    ],
  },
  relatedStandards: [
    { code: 'ASME Section IX', relation: 'Welding and brazing qualifications standard, alternate WPS qualification path under PHMSA regulation' },
    { code: 'ASME B31.4', relation: 'Pipeline transportation systems for liquid hydrocarbons — references API 1104 for welding' },
    { code: 'ASME B31.8', relation: 'Gas transmission and distribution piping — references API 1104 for welding' },
    { code: 'API 1163', relation: 'ILI systems qualification — paired with API 1104 weld quality for integrity assessment' },
    { code: 'PHMSA 49 CFR 192 / 195', relation: 'Federal pipeline safety regulations citing API 1104 as the authorized welding standard' },
  ],
  commonAuditFindings: [
    'Welder qualifications expired past 6 months for the process used. Citation: §6.5.',
    'WPS essential variable exceeded in production — wall thickness range, preheat temperature, electrode classification. Citation: §5.4.',
    'NDT coverage less than project specification, with no documented basis. Citation: §11.1.',
    'AUT system used on production welds without Annex B qualification on representative reflectors. Citation: Annex B.',
    'Repair welds performed without complete defect removal verified by MT/PT. Citation: §10.2.',
    'ECA-based acceptance applied without engineering report supporting fracture mechanics inputs. Citation: Annex A.',
    'Crack repair performed without engineering review. Citation: §10.2.4.',
    'In-service weld qualification missing — relied on standard WPS without heat sink validation. Citation: §10 + API RP 2201.',
  ],
  faqs: [
    {
      q: 'How does API 1104 differ from ASME Section IX for pipeline welding?',
      a: 'Both standards address welding procedure and welder qualification but they serve different equipment populations. ASME Section IX is general — used for pressure vessels, B31.1 power piping, B31.3 process piping, and any code that adopts it. API 1104 is pipeline-specific — its essential variables, position designations, and acceptance criteria are tuned for girth welds on long-distance transmission pipe. PHMSA regulations allow either, but most pipeline operators standardize on API 1104 because its tables (essential variables, acceptance criteria, ECA pathway) are pipeline-native. Cross-qualification (an API 1104 WPS used on a B31.3 spool, for example) is rare and requires careful essential variable matching.',
    },
    {
      q: 'When is ECA acceptance worth the engineering cost?',
      a: 'Annex A ECA makes sense when workmanship criteria reject welds that engineering analysis would accept — typically on large-diameter pipelines (24 inches and up) where the workmanship limits are conservative compared to actual stress state, on strain-based design projects where the pipe is engineered for plastic strain in service, and on offshore S-lay or J-lay where the cost of weld replacement is enormous. The ECA report requires inputs on material toughness (CTOD or Charpy), residual stress, loading history, and crack growth rate. For onshore Class 1 cross-country construction, workmanship is usually faster and cheaper.',
    },
    {
      q: 'Does API 1104 cover offshore pipeline welding?',
      a: 'Yes — and offshore pipeline construction is where the standard\'s mechanized GMAW provisions and ECA pathway are most heavily used. DNVGL-ST-F101 is the broader offshore pipeline standard internationally and it cross-references API 1104 for welding requirements in many jurisdictions. US Gulf of Mexico pipeline projects under BSEE jurisdiction follow API 1104 directly. Subsea tie-in welds, hyperbaric welds, and J-lay tower welds all use qualified API 1104 procedures with AUT inspection per Annex B.',
    },
    {
      q: 'What is the role of the inspector under API 1104?',
      a: 'Section 8 requires a "qualified inspector" to oversee inspection activities. The standard does not name a specific certification (no "API 1104 Authorized Inspector" exists), but PHMSA and most operators require inspectors to be ASNT Level II or equivalent in the methods used (typically RT and UT), plus pipeline construction experience documented through prior projects. The Independent Inspection Company (IIC) on cross-country projects typically supplies CWI welding inspectors plus separate NDT inspectors with method-specific qualifications. Project specifications define the certification matrix.',
    },
  ],
  internalLinks: [
    { href: '/methods/radiographic-testing', label: 'RT for pipeline girth welds', context: 'Primary volumetric method per API 1104 §11.1.' },
    { href: '/methods/automated-ultrasonic-testing', label: 'AUT for production welds', context: 'Annex B qualified automated UT replacing RT on large projects.' },
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT for weld inspection', context: 'Used in many AUT systems for crack detection and sizing.' },
    { href: '/standards/asme-b31-4', label: 'ASME B31.4 liquid pipeline', context: 'Construction code that references API 1104 for welding.' },
    { href: '/standards/asme-b31-8', label: 'ASME B31.8 gas pipeline', context: 'Gas transmission code referencing API 1104.' },
    { href: '/standards/api-1163', label: 'API 1163 ILI systems', context: 'In-service integrity assessment paired with API 1104 weld quality.' },
    { href: '/industries/pipeline-integrity', label: 'Pipeline integrity programs', context: 'Industry context for API 1104 application.' },
    { href: '/find-providers', label: 'Find pipeline NDT contractors', context: 'Locate API 1104-qualified inspection providers.' },
  ],
  citations: [
    { id: 'api-1104-cover', source: 'API 1104, Welding of Pipelines and Related Facilities, 22nd ed., July 2021', url: 'https://www.api.org/products-and-services/standards' },
    { id: 'api-1104-5', source: 'API 1104 §5 — Procedure qualification' },
    { id: 'api-1104-6', source: 'API 1104 §6 — Welder qualification' },
    { id: 'api-1104-9', source: 'API 1104 §9 — Acceptance standards for NDT' },
    { id: 'api-1104-10', source: 'API 1104 §10 — Repair and removal of defects' },
    { id: 'api-1104-11', source: 'API 1104 §11 — NDT methods' },
    { id: 'api-1104-annex-a', source: 'API 1104 Annex A — Alternative acceptance standards (ECA)' },
    { id: 'api-1104-annex-b', source: 'API 1104 Annex B — Automated ultrasonic testing' },
    { id: 'asme-ix-pipe', source: 'ASME Section IX, Welding, Brazing, and Fusing Qualifications, 2023 edition' },
    { id: 'asme-b31-4-cite', source: 'ASME B31.4-2022, Pipeline Transportation Systems for Liquids and Slurries' },
    { id: 'asme-b31-8-cite', source: 'ASME B31.8-2022, Gas Transmission and Distribution Piping Systems' },
    { id: 'phmsa-192', source: 'PHMSA 49 CFR 192, Transportation of Natural and Other Gas by Pipeline', url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-D/part-192' },
    { id: 'phmsa-195', source: 'PHMSA 49 CFR 195, Transportation of Hazardous Liquids by Pipeline', url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-D/part-195' },
    { id: 'api-rp-2201-1104', source: 'API RP 2201, Safe Hot Tapping Practices, 4th ed. (2020)' },
  ],
};

export default standard;
