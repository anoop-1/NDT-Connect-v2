/**
 * Hand-curated NDT procedure example metadata for the AI Procedure Writer
 * landing page. Bodies are intentionally empty — Workstream 2 requires
 * human-authored content (subject-matter review). The route renders a stub
 * "coming soon" notice when body === ''.
 *
 * Slugs are stable and used in URLs; do not rename without a redirect.
 */

export interface ProcedureExample {
  slug: string;
  /** NDT method abbreviation (UT, RT, MT, PT, VT, PAUT, TOFD, ECT). */
  method: string;
  /** Industry / asset class. */
  industry: string;
  /** Governing standard / code. */
  standard: string;
  /** Human-readable headline (used as <h1> and meta title). */
  title: string;
  /** Short blurb (used as description / OG description). */
  summary: string;
  /** Markdown body — empty string means "not yet authored". */
  body: string;
}

export const procedureExamples: ProcedureExample[] = [
  {
    slug: 'ut-pressure-vessel-asme-v',
    method: 'UT',
    industry: 'Pressure Vessels',
    standard: 'ASME Section V',
    title: 'Ultrasonic Testing Procedure for Pressure Vessel Welds (ASME Section V)',
    summary:
      'Conventional UT examination procedure for full-penetration welds on ASME pressure vessels — calibration, scanning, acceptance criteria per ASME BPVC Section V Article 4.',
    body: '',
  },
  {
    slug: 'rt-pipeline-weld-api-1104',
    method: 'RT',
    industry: 'Oil & Gas Pipelines',
    standard: 'API 1104',
    title: 'Radiographic Testing Procedure for Pipeline Girth Welds (API 1104)',
    summary:
      'X-ray and gamma radiography procedure for pipeline girth welds — exposure setup, IQI placement, acceptance criteria per API 1104 Section 9.',
    body: '',
  },
  {
    slug: 'mt-structural-weld-aws-d1-1',
    method: 'MT',
    industry: 'Structural Steel',
    standard: 'AWS D1.1',
    title: 'Magnetic Particle Testing Procedure for Structural Welds (AWS D1.1)',
    summary:
      'Wet/dry MT procedure for structural steel weldments per AWS D1.1 Clause 8 — yoke technique, indication evaluation, reporting.',
    body: '',
  },
  {
    slug: 'pt-aerospace-fastener-astm-e165',
    method: 'PT',
    industry: 'Aerospace',
    standard: 'ASTM E165',
    title: 'Liquid Penetrant Testing Procedure for Aerospace Fasteners (ASTM E165)',
    summary:
      'Type I fluorescent / Type II visible-dye penetrant procedure for safety-critical aerospace fasteners — pre-cleaning, dwell, and Level 3 sensitivity per ASTM E165.',
    body: '',
  },
  {
    slug: 'paut-corrosion-mapping-api-579',
    method: 'PAUT',
    industry: 'Refining / FFS',
    standard: 'API 579',
    title: 'Phased Array UT Procedure for Corrosion Mapping (API 579 FFS)',
    summary:
      'Encoded phased-array C-scan procedure for wall-loss mapping on in-service piping and pressure equipment — feeds Level 2 fitness-for-service evaluation per API 579-1.',
    body: '',
  },
  {
    slug: 'tofd-girth-weld-asme-b31-3',
    method: 'TOFD',
    industry: 'Process Piping',
    standard: 'ASME B31.3',
    title: 'TOFD Procedure for Process Piping Girth Welds (ASME B31.3)',
    summary:
      'Time-of-flight diffraction procedure for ASME B31.3 process piping welds — probe pairing, dead-zone management, and acceptance criteria per ASME Section V Article 4 Mandatory Appendix.',
    body: '',
  },
  {
    slug: 'ut-storage-tank-api-653',
    method: 'UT',
    industry: 'Aboveground Storage Tanks',
    standard: 'API 653',
    title: 'Ultrasonic Thickness Measurement Procedure for AST Floors and Shells (API 653)',
    summary:
      'UT thickness procedure for aboveground storage tank shells, bottoms, and roofs per API 653 — grid layout, corrosion-rate calculation, and remaining-life assessment.',
    body: '',
  },
  {
    slug: 'rt-castings-asme-bpvc-v',
    method: 'RT',
    industry: 'Foundry / Castings',
    standard: 'ASME BPVC Section V',
    title: 'Radiographic Testing Procedure for Steel Castings (ASME BPVC Section V)',
    summary:
      'Radiographic examination procedure for steel castings — source selection, technique sheets, and discontinuity classification per ASME BPVC Section V Article 2 and ASTM E446/E186/E280.',
    body: '',
  },
  {
    slug: 'mt-pipeline-girth-api-1104',
    method: 'MT',
    industry: 'Oil & Gas Pipelines',
    standard: 'API 1104',
    title: 'Magnetic Particle Testing Procedure for Pipeline Girth Welds (API 1104)',
    summary:
      'Wet fluorescent MT procedure for cross-country pipeline girth welds per API 1104 Section 9 — applicable when RT is not feasible or as a supplementary surface examination.',
    body: '',
  },
  {
    slug: 'vt-bolted-joint-aws-d1-1',
    method: 'VT',
    industry: 'Structural Steel',
    standard: 'AWS D1.1',
    title: 'Visual Testing Procedure for Bolted and Welded Joints (AWS D1.1)',
    summary:
      'VT procedure covering high-strength bolted and welded structural connections per AWS D1.1 Clause 8.9 and RCSC Specification — lighting, gauge calibration, and weld-profile acceptance.',
    body: '',
  },
];

export function getExampleBySlug(slug: string): ProcedureExample | undefined {
  return procedureExamples.find((e) => e.slug === slug);
}
