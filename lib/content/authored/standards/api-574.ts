import type { StandardContent } from '../types';

const standard: StandardContent = {
  code: 'API 574',
  fullTitle: 'Inspection Practices for Piping System Components',
  organization: 'American Petroleum Institute',
  edition: '4th Edition, February 2016',
  slug: 'api-574',
  metaTitle: 'API 574 Piping Inspection Practices: TML Strategy, Components, Findings',
  metaDescription: 'API 574 4th ed. practical inspection guidance for piping components. CML strategy, valve and flange inspection, common findings paired with API 570.',
  heroLede:
    'API 570 sets the legal inspection requirements for in-service process piping, but it leaves "how exactly do you inspect a flange, a valve, a small-bore branch, an injection point?" to API 574 (4th ed., February 2016). API 574 is the practical companion — a Recommended Practice with detailed inspection guidance for the components that make up piping systems: pipe and fittings, valves, flanges, expansion joints, hoses, pressure-relief devices, and small-bore connections. It does not set intervals (API 570 does that) and it does not authorize repairs (API 570 §8 does that). It tells the inspector what to look for and how to look at each component class, and it is the basis for almost every in-house inspection procedure written for process piping at refineries and petrochemical plants.',
  scope:
    'API 574 covers inspection practices for piping components in refining, petrochemical, and chemical service. It addresses external visual inspection, thickness measurement, ultrasonic shear wave examination of welds, valve and flange inspection, bolted joint inspection, small-bore inspection, vibration assessment, and corrosion monitoring location strategy. It is referenced by API 570 §5.4, §6.5, and §7 for technique selection and is widely adopted as the procedural backbone for thickness measurement programs. It does not cover pipeline transmission (API 1163, ASME B31.8S apply there).',
  whoMustComply: [
    'API 570 Authorized Piping Inspectors who must apply API 574 practices to satisfy API 570 inspection requirements',
    'Owner-operators developing or auditing in-house piping inspection procedures at PSM-covered facilities',
    'Inspection contractors performing CML thickness work, valve inspections, and small-bore surveys',
    'Inspection engineers developing CML strategies and inspection effectiveness procedures',
    'EPC firms commissioning new piping systems where inspection baseline programs must align with API 574',
    'NDT Level II technicians performing UT thickness and weld examinations under API 574-compliant procedures',
  ],
  keyRequirements: [
    {
      heading: 'CML strategy and TML placement',
      level: 2,
      paragraphs: [
        'Section 6 details Condition Monitoring Location (CML) placement strategy. CMLs (formerly TMLs — Thickness Monitoring Locations) must be selected to cover expected damage mechanisms identified per API 571. The standard provides density guidance: at least one CML per pipe segment, additional CMLs at elbows (especially on the extrados for erosion or intrados for slug flow), at tees (header and branch), at reducers (downstream of the reducer where velocity changes), at injection points (12 inches upstream and 12 pipe diameters or 3 feet downstream, whichever greater), at dead-leg terminations and low points, and at soil-to-air interfaces.',
        'Number of readings per CML matters for inspection effectiveness. A single point reading is not enough for Highly Effective rating — minimum 4 readings in a grid pattern with the lowest value recorded. Many programs use 5-point readings (center + four cardinal points within a 2-inch circle) or full grid mapping for Critical CMLs. The 4th edition emphasizes that CML density and reading pattern must match the inspection effectiveness target.',
      ],
    },
    {
      heading: 'Valve and flange inspection',
      level: 2,
      paragraphs: [
        'Section 7 covers valves: external visual inspection for leakage, bolting condition, packing leaks; internal inspection during maintenance for seat damage, body erosion, and stem corrosion. For Class 1 service per API 570, valves get added scrutiny — ball valve cavity vents inspected for plugging, gate valve seat erosion checked for through-leakage. Pressure-relief valves follow their own interval per API 570 §6.8 and are typically inspected and tested per API 576.',
        'Flange inspection covers external visual (gap evenness, weep at gasket, bolting condition, paint or coating failure suggesting corrosion behind), bolt torque verification (per ASME PCC-1 procedures), and ultrasonic bolt elongation measurement for critical service. The flange face condition (raised face flatness, ring groove integrity) is inspected during maintenance — surface roughness must meet ASME B16.5 specifications for the gasket type.',
      ],
      callout: {
        kind: 'info',
        title: 'Bolting is its own discipline',
        body: 'ASME PCC-1 (Guidelines for Pressure Boundary Bolted Joint Assembly) is the de-facto procedure reference for bolt torque, sequencing, and re-torque. API 574 §7.3 references it and most refineries adopt PCC-1 as their bolted-joint procedure.',
      },
    },
    {
      heading: 'Small-bore branches and dead-legs',
      level: 2,
      paragraphs: [
        'Section 5.3 calls out small-bore connections (NPS 2 and below) as high-risk areas — they fail more often than larger lines due to vibration, thermal fatigue at the branch, and CUI from inadequate insulation. CMLs on small-bore branches must include the branch-to-header connection (especially the weld root area), any low-point trap where condensate collects, and the dead-end if it is plugged or valved off.',
        'Dead-legs are explicitly addressed in §5.3.3. Common dead-legs at refineries: spare pump suction, sample bypass, future-tie-in stubs, drain plugs, vent stubs above process lines. They accumulate water or condensate, which drives MIC, dewpoint corrosion, or sulfidation acceleration depending on service. Inspection must include the dead-leg terminal point plus any horizontal run where liquid can collect. Best practice is to either eliminate dead-legs in revamps or inspect them quarterly on Class 1 service.',
      ],
    },
    {
      heading: 'Thickness measurement procedure and instrument verification',
      level: 2,
      paragraphs: [
        'Section 9 details UT thickness practice. Instruments must be calibrated to a known-thickness step block (typically the as-built piping material trimmed to known thicknesses), verified at the start of the day and after every 30 readings or 4 hours. Velocity setting must match the piping material (carbon steel 0.2330 in/μs, austenitic stainless 0.2280, 9Cr-1Mo 0.2300). Temperature compensation is mandatory above 150°F — readings on hot piping uncorrected for velocity change can be off by 1-3%.',
        'Coupling and surface preparation drive accuracy. Mill scale, paint, weld spatter, or surface pitting cause back-wall ambiguity. Surface preparation typically by wire brush or grit — most refinery procedures specify SSPC SP-3 minimum prep for thickness work. The 4th edition aligned with ASTM E797 for general UT thickness practice and with ASTM E114 for shear wave examination of welds.',
      ],
    },
  ],
  acceptanceCriteria: {
    caption: 'API 574 CML coverage and reading guidance',
    headers: ['Component', 'CML placement', 'Readings per CML', 'Reference'],
    rows: [
      ['Straight pipe segment', 'One per segment minimum', '4-point minimum', '§6.2'],
      ['Elbow', 'Extrados + intrados', '5-point each', '§6.3'],
      ['Tee', 'Header + branch + crotch', '5-point each', '§6.4'],
      ['Reducer', 'Downstream concentric region', '5-point', '§6.5'],
      ['Injection point', '12" upstream + 12D downstream', 'Grid mapping', '§6.6'],
      ['Dead-leg termination', 'Cap and low point', '5-point each', '§5.3.3'],
      ['Soil-to-air interface', '6-18" of grade band', '5-point each', '§5.4'],
      ['Small-bore weld', 'Weld toe + adjacent material', '5-point', '§5.3.1'],
    ],
  },
  relatedStandards: [
    { code: 'API 570', relation: 'In-service piping inspection code — sets the requirements API 574 helps implement' },
    { code: 'API 571', relation: 'Damage mechanism reference that drives CML placement strategy in API 574' },
    { code: 'API 576', relation: 'Inspection and testing of pressure-relieving devices, paired with API 574 valve coverage' },
    { code: 'ASME PCC-1', relation: 'Guidelines for bolted joint assembly, referenced by API 574 for flange bolting' },
    { code: 'ASME B16.5', relation: 'Flange specification including face finish requirements for gasket sealing' },
  ],
  commonAuditFindings: [
    'Single-point UT thickness readings at CMLs claimed as Highly Effective. Citation: §6.2 / API 581 Annex 2.C.',
    'No CMLs on extrados of elbows where erosion or velocity-related corrosion is expected. Citation: §6.3.',
    'Injection point CMLs missing the 12-diameter downstream zone. Citation: §6.6.',
    'Dead-leg low points not in inspection plan. Citation: §5.3.3.',
    'UT velocity not set for actual material — stainless reading taken with carbon steel velocity. Citation: §9.3.',
    'Temperature compensation skipped on hot piping above 150°F. Citation: §9.4.',
    'Flange bolting condition not assessed as part of external inspection. Citation: §7.3.',
    'Small-bore branch welds not inspected when parent pipe was. Citation: §5.3.1.',
  ],
  faqs: [
    {
      q: 'What is the practical difference between CML and TML?',
      a: 'Same thing, different naming convention. "TML" (Thickness Monitoring Location) was the older term used in earlier API 570 and API 574 editions. The current term is "CML" (Condition Monitoring Location) — broader because it acknowledges that the location may be monitored for damage modes beyond just thickness (cracking, hardness, coating condition). Modern inspection management systems use CML; many in-house procedures and historical reports still use TML. They refer to the same physical location with the same dataset.',
    },
    {
      q: 'How does API 574 interact with the construction code (B31.3)?',
      a: 'ASME B31.3 governs construction — design calculations, materials, fabrication, examination during construction, hydrotest. API 574 governs in-service inspection practices on the resulting piping system. They cross-reference: the tmin (minimum required wall thickness) calculated per B31.3 is the floor that API 574 thickness measurements check against. When API 574 inspection finds thickness below tmin, the engineer goes back to B31.3 calculation rules (and to API 579 for FFS) to determine acceptable action. Both standards live on the same piping circuit for its operational life.',
    },
    {
      q: 'Does API 574 require destructive sampling of piping?',
      a: 'No. API 574 is a non-destructive inspection practice — UT thickness, visual, ultrasonic shear wave on welds, MT or PT for surface flaws, hardness testing for in-service hardening. Destructive sampling (cut-outs for metallographic examination, replication samples) is occasionally invoked when API 579 Level 3 assessment needs material properties or when API 571 HTHA confirmation requires microstructural evidence — but that is the FFS or specialty inspection scope, not API 574 itself. Standard piping inspection programs run entirely on NDT under API 574.',
    },
    {
      q: 'How does the 4th edition differ from prior editions?',
      a: 'The 4th edition (2016) aligned terminology with API 570 5th edition (CML replacing TML, inspection effectiveness ratings imported from API 581), expanded small-bore and dead-leg guidance after several CSB-reported failures traced to these areas, and clarified soil-to-air interface inspection requirements (excavation band, NDT methods, frequency). It also added more detailed valve internal inspection guidance for severe service and updated bolting practices to reference ASME PCC-1. Programs still operating on 3rd edition (2009) need a refresh.',
    },
  ],
  internalLinks: [
    { href: '/standards/api-570', label: 'API 570 piping inspection', context: 'Sets the legal requirements API 574 helps implement.' },
    { href: '/standards/api-571', label: 'API 571 damage mechanisms', context: 'Drives CML placement decisions throughout API 574.' },
    { href: '/ultrasonic-testing', label: 'UT thickness practice', context: 'The workhorse method specified throughout API 574.' },
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT corrosion mapping', context: 'Used for high-effectiveness inspection on critical circuits.' },
    { href: '/standards/api-579', label: 'API 579 FFS', context: 'Invoked when API 574 readings show flaws below tmin.' },
    { href: '/standards/asme-b31-3', label: 'ASME B31.3 process piping', context: 'Construction code that sets the tmin floor API 574 checks.' },
    { href: '/industries/oil-gas-refining', label: 'Refining piping inspection', context: 'Primary industry using API 574 as procedural backbone.' },
    { href: '/find-providers', label: 'Find piping inspection contractors', context: 'Engage API 574-trained inspection teams.' },
  ],
  citations: [
    { id: 'api-574-cover', source: 'API 574, Inspection Practices for Piping System Components, 4th ed., February 2016', url: 'https://www.api.org/products-and-services/standards' },
    { id: 'api-574-5-3', source: 'API 574 §5.3 — Small-bore connections and dead-legs' },
    { id: 'api-574-5-4', source: 'API 574 §5.4 — Soil-to-air interfaces' },
    { id: 'api-574-6', source: 'API 574 §6 — CML placement strategy' },
    { id: 'api-574-7', source: 'API 574 §7 — Valves and flanges' },
    { id: 'api-574-9', source: 'API 574 §9 — Thickness measurement practice' },
    { id: 'api-570-574', source: 'API 570, Piping Inspection Code, 5th ed. (2023)' },
    { id: 'api-571-574', source: 'API 571, Damage Mechanisms Affecting Fixed Equipment, 3rd ed. (2020)' },
    { id: 'api-576', source: 'API 576, Inspection and Testing of Pressure-relieving Devices, 4th ed. (2017)' },
    { id: 'asme-pcc-1', source: 'ASME PCC-1-2022, Guidelines for Pressure Boundary Bolted Flange Joint Assembly' },
    { id: 'asme-b16-5', source: 'ASME B16.5-2020, Pipe Flanges and Flanged Fittings' },
    { id: 'astm-e797-574', source: 'ASTM E797/E797M-21, Standard Practice for Measuring Thickness by Manual Ultrasonic Pulse-Echo Contact Method' },
    { id: 'astm-e114', source: 'ASTM E114-15, Standard Practice for Ultrasonic Pulse-Echo Straight-Beam Contact Testing' },
  ],
};

export default standard;
