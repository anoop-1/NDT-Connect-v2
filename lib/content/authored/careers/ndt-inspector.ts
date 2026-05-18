import type { CareerContent } from '../types';

const career: CareerContent = {
  slug: 'ndt-inspector',
  title: 'NDT Inspector — Career Guide',
  metaTitle: 'NDT Inspector: Job, Pay, Path & Day-to-Day',
  metaDescription:
    'What an NDT inspector does, what certifications matter, and honest 2024-2026 US pay bands. Refinery, pipeline, fabrication, and offshore work covered.',
  heroLede:
    'An NDT inspector on a Tulsa-area pipe fabrication shop signs off the morning weld production by walking 22 SAW longitudinal seams with an Olympus EPOCH UT flaw detector, MT yoke, and an AWS CWI eyepiece — three methods, three sign-offs, one report per pipe joint that ships only after the inspector\'s stamp. "NDT Inspector" is a generic title most commonly used to mean a working Level II technician with broad multi-method coverage and authority to accept or reject under code. Some shops use "Inspector" to mean an AWS CWI specifically; others use it for any qualified person who signs the QC report. The credentials matter more than the title.',
  whatYouDo:
    'An NDT inspector executes inspection scope under a code or specification, interprets indications, makes accept/reject decisions within their certification, and writes the report that engineering or the client accepts as the inspection record[1]. In a US fabrication shop, the typical NDT inspector holds Level II in 2-3 methods (UT, MT, PT, VT) plus an AWS CWI. In a refinery turnaround, they may hold UT/PT/MT + API 510 or 570. In aerospace MRO, they hold NAS 410 Level II in FPI + ET + UT[4]. The job is hands-on, code-driven, and reportable — every shift produces a paper trail that survives 30 years of asset litigation.',
  typicalDay: [
    '06:00 — Pre-shift pipe spool walkdown with the shop foreman, review the day\'s production schedule (28 girth welds, 4 NPS 12 carbon steel, B31.3 service).',
    '07:00 — Set up UT cal: 0° contact transducer on 25mm IIW V1 block at 80% FSH, 70° angle beam DAC curve on the AWS basic block.',
    '08:30-11:30 — Scan the morning batch per ASME V Article 4. Find a 3mm lack-of-sidewall fusion at the 4 o\'clock position on spool 14, mark for repair, photograph, dimension.',
    '12:30 — MT on the same welds for surface coverage per AWS D1.1. Two linear toe indications on spool 22 — undercut transverse, reject and mark for grind/reweld.',
    '14:00 — Visual inspection per AWS CWI checklist on 8 completed assemblies; pull tape, gauge, mirror, weld profile gauges.',
    '15:30 — Write up the day\'s reports on the QC tablet: indication maps, accept/reject calls, repair instructions for shop welders, photographs, equipment cal records.',
    '16:30 — Hand the package to QC management, brief the night shift on outstanding holds and the spools released to coat.',
  ],
  responsibilities: [
    'Interpret indications against the applicable acceptance criteria (AWS D1.1 Table 6.13, ASME VIII Div 1 Mandatory Appendix 8, API 1104 §9, B31.3 Table 341.3.2) and accept or reject under your Level II authority[1].',
    'Set up, calibrate, and document equipment performance verification per ASME V T-461 (every 4 hours, change of operator, or change of temperature >25°F).',
    'Conduct visual inspection per AWS QC1 / CWI body of knowledge — fit-up, root gap, profile, undercut, porosity, spatter, slag[6].',
    'Write QC reports that survive owner audits and code surveys — indication location, size, characterization, code reference, photograph, equipment serial numbers.',
    'Coordinate with welders, fitters, and engineering on repair scope — when you reject a weld, you also tell the shop where to grind and how deep.',
    'Maintain consumable records: penetrant/developer lot pairs, MT particle batch numbers, RT film batch and processing chemistry, UT couplant batch.',
    'Train and supervise Level I personnel; sign their OJT records under your written practice.',
  ],
  pathToEntry: [
    {
      step: 1,
      title: 'Start as a Level I in MT/PT (or a welder/fitter)',
      body: 'Many NDT inspectors come from welding or fabrication backgrounds where they already read prints and understand weld geometry. Others start as Level I MT/PT and add methods over 2-3 years. Cost of entry: $1,500-$3,500 in classroom training plus 130-840 OJT hours per method.',
    },
    {
      step: 2,
      title: 'Accumulate Level II hours in 2-3 methods',
      body: 'Refinery/pipeline target: UT + MT + PT Level II. Fabrication target: UT + MT + VT Level II + AWS CWI. Aerospace target: FPI + ET + UT under NAS 410[4]. Plan 3-5 years to reach full multi-method Level II.',
    },
    {
      step: 3,
      title: 'Sit AWS CWI or API authorized inspector exam',
      body: 'AWS CWI is the most common companion credential for an NDT inspector ($1,375 exam fee, three-part exam: fundamentals, practical, code book)[6]. API 510/570/653 require 1-3 years inspection experience and a separate exam. CWI passes are ~50% on first attempt — most candidates buy the CWI Online Pre-Seminar or attend a seminar.',
    },
    {
      step: 4,
      title: 'Pursue site-specific access (TWIC, OSHA 30, BOSIET for offshore)',
      body: 'Most refineries require TWIC + OSHA 30 + site-specific orientation. Offshore Gulf of Mexico requires BSEE-compliant training; North Sea adds BOSIET (Basic Offshore Safety Induction & Emergency Training). Pipeline contractors require OQ (Operator Qualification) under 49 CFR Part 192[2].',
    },
  ],
  certificationsRequired: [
    {
      name: 'SNT-TC-1A or CP-189 Level II in primary methods',
      mandatory: true,
      reason: 'Industry baseline for accept/reject authority[1].',
    },
    {
      name: 'AWS CWI (Certified Welding Inspector)',
      mandatory: false,
      reason: 'Required by most fabrication shops and many refinery contracts. AWS D1.1, D1.5, D17.1 acceptance criteria require a CWI signature[6].',
    },
    {
      name: 'API 510/570/653 (refinery/piping/tank inspector)',
      mandatory: false,
      reason: 'Required for owner-side refinery and pipeline inspection roles. Layered on top of Level II for scope expansion[2].',
    },
    {
      name: 'TWIC + OSHA 30',
      mandatory: false,
      reason: 'Site access requirements for most US refineries and ports. Not technical certs but practically mandatory.',
    },
  ],
  salaryByExperience: [
    {
      years: '0-3 (entry NDT inspector, 1-2 methods)',
      min: 52000,
      max: 72000,
      median: 62000,
    },
    {
      years: '3-8 (multi-method + CWI)',
      min: 70000,
      max: 105000,
      median: 86000,
    },
    {
      years: '8+ (senior, Level III or owner-side)',
      min: 95000,
      max: 165000,
      median: 125000,
    },
  ],
  industriesEmploying: [
    {
      industry: 'Fabrication shops (structural, pressure vessel, piping)',
      demand: 'Very high — ASME stamp shops are legally required to staff certified inspectors per Section V/VIII.',
    },
    {
      industry: 'Oil & gas refinery turnarounds',
      demand: 'Very high — seasonal peaks (spring/fall) generate massive demand for multi-method inspectors.',
    },
    {
      industry: 'Pipeline construction and integrity (DOT/FERC)',
      demand: 'High — DOT 49 CFR 192/195 mandates qualified inspection on all new construction and integrity programs[2].',
    },
    {
      industry: 'Offshore (GoM, North Sea, West Africa)',
      demand: 'High — ISO 9712 + offshore survival required[3]. Rotational schedules pay heavy per diem.',
    },
    {
      industry: 'Aerospace manufacturing and MRO',
      demand: 'Moderate — NAS 410 governs; Nadcap audits make hiring slow but careers stable[4].',
    },
  ],
  advancementPath:
    'NDT Inspector → Senior Inspector → Inspection Supervisor → QA/QC Manager → Inspection Engineer or Level III. Many inspectors with 10+ years pivot into owner-side roles (refinery reliability engineer, pipeline integrity engineer) where the pay is steadier and travel less brutal. The lateral move into ASNT Level III (8-12 years total experience) opens consulting and procedure-writing work. Best long-term comp: API authorized inspector + Level III + AWS CWI = $150-220k base plus consulting income.',
  remoteOrField: 'field',
  riskFactors: [
    'Height — scaffolding, ladders, structural access; annual fall protection training required.',
    'Heat — Gulf Coast turnarounds run in 100°F+ ambient with PPE; heat stress incidents are routine.',
    'Travel — most refinery and pipeline inspectors are away 150-220 nights/year.',
    'Repetitive strain — UT scanning, MT yoke handling, ladder climbing on long shifts.',
    'Liability — your signature stamps the QC record; misses on critical welds can land you in deposition years later.',
  ],
  faqs: [
    {
      q: 'Is "NDT Inspector" the same as Level II NDT Technician?',
      a: 'Often, but not always. The job title "NDT Inspector" is used inconsistently in US industry. Most commonly it refers to a working Level II technician with authority to accept and reject under code — same scope as the Level II definition in SNT-TC-1A[1]. Some shops use "Inspector" for an AWS CWI-only role focused on visual weld inspection, with NDT methods performed by separate technicians. Owner-side ("inspection engineer" or "QA inspector") roles often require API 510/570/653 certs in addition to NDT certs. When reading job postings, look at the required certifications, not the title — the certs define the scope, the title is marketing.',
    },
    {
      q: 'Do I need AWS CWI to be an NDT inspector?',
      a: 'Not always, but it dramatically expands your job options. CWI is required by AWS D1.1 (structural welding), D1.5 (bridge welding), and many ASME and API specs for visual weld inspection sign-off[6]. If you work primarily as a UT or RT specialist on completed welds, you may not need CWI. If you work in fabrication shops, structural construction, or any role where you also inspect fit-up and visual quality, CWI is effectively required. The AWS CWI exam costs $1,375 (member rate), is split into fundamentals/practical/code, and has roughly a 50% first-time pass rate.',
    },
    {
      q: 'What pays more — refinery inspection or pipeline inspection?',
      a: 'Hourly rates are similar ($30-55/hr for multi-method Level II), but refinery turnaround work pays more in absolute dollars because of overtime and per diem stacking. A refinery turnaround inspector can earn $130-180k in a strong year working spring/fall outages plus steady maintenance work between[5]. Pipeline construction (cross-country spreads) pays $110-150k with similar per diem, but the seasons are less predictable. Pipeline integrity (in-line inspection support, repair digs) is steadier but lower per diem. Offshore ISO 9712 inspectors on rotation can clear $140-200k base.',
    },
    {
      q: 'How do I move from inspector into management?',
      a: 'Three steps. First, broaden your certifications — most inspection supervisors hold 3-4 NDT methods at Level II, plus AWS CWI and at least one API authorized inspector cert. Second, learn the business side — quoting jobs, managing crew schedules, reading P&Ls. Third, get visible — present at ASNT regional meetings, write a procedure that the company adopts, take the lead on a tough client. Most inspection supervisor roles open via internal promotion at NDT service companies (Acuren, TEAM, Mistras, Applus+). The next step beyond supervisor is QA/QC manager or NDT manager, which typically requires Level III paperwork[1].',
    },
  ],
  internalLinks: [
    { href: '/careers/ndt-technician-level-2', label: 'Level II Technician career', context: 'Most inspectors are working Level II technicians.' },
    { href: '/careers/welding-inspector', label: 'Welding inspector path', context: 'AWS CWI track that pairs with NDT certifications.' },
    { href: '/careers/ndt-supervisor', label: 'NDT supervisor path', context: 'Next-step management role.' },
    { href: '/standards/snt-tc-1a', label: 'SNT-TC-1A explained', context: 'The recommended practice governing your certification.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1 structural welding', context: 'The most-cited code for fabrication inspectors.' },
    { href: '/standards/api-510', label: 'API 510 pressure vessel inspector', context: 'Layered cert for owner-side refinery work.' },
    { href: '/learn/visual-testing', label: 'Visual testing primer', context: 'Foundation method for all weld inspection.' },
    { href: '/free-tools/ndt-salary-calculator', label: 'NDT salary calculator', context: 'Model your earnings by method, location, and shift.' },
    { href: '/industries/oil-and-gas', label: 'Oil & gas inspection', context: 'Largest US employer of NDT inspectors.' },
  ],
  citations: [
    { id: 'asnt-snt-tc-1a', source: 'ASNT SNT-TC-1A (2020), §6.4 Level II responsibilities.' },
    { id: 'dot-49-cfr-192', source: '49 CFR Part 192 §192.241, Inspection and Test of Welds.' },
    { id: 'iso-9712', source: 'ISO 9712:2021, Non-destructive testing — Qualification and certification of NDT personnel.' },
    { id: 'nas-410', source: 'NAS 410, Rev. 5 (2020), Certification & Qualification of Nondestructive Test Personnel.' },
    { id: 'asnt-2024-survey', source: 'ASNT 2024 Salary Survey of NDT Professionals, ASNT Materials Evaluation Vol. 82 No. 3.' },
    { id: 'aws-qc1', source: 'AWS QC1:2007 (R2020), Standard for AWS Certification of Welding Inspectors.' },
  ],
};

export default career;
