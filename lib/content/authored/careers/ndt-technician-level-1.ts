import type { CareerContent } from '../types';

const career: CareerContent = {
  slug: 'ndt-technician-level-1',
  title: 'NDT Technician Level I — Career Guide',
  metaTitle: 'NDT Technician Level I: Pay, Path & Daily Work',
  metaDescription:
    'What a Level I NDT technician actually does day to day, what the SNT-TC-1A path looks like, and honest 2024-2026 US pay bands by experience and method.',
  heroLede:
    'A Level I MT/PT technician on a structural fabrication shop floor in Beaumont starts the shift by pulling 14 AWS D1.1 weld coupons from the QC stamp queue, prepping each with solvent cleaner and a UV-A black light booth setup before the Level II walks the line for interpretation. The Level I does the hands-on work — surface prep, contrast paint, yoke placement, developer dwell time — but cannot accept or reject indications without the Level II signing the report. That gatekeeper role is the entire point of SNT-TC-1A Level I[1].',
  whatYouDo:
    'A Level I NDT technician performs specific calibrations, conducts tests under written procedure, and records results — but cannot independently interpret or accept/reject. You execute the procedure exactly as written and pass findings to a Level II for evaluation[1]. In practice, this means setting up equipment (UT thickness gauges, MT yokes, PT spray kits, RT cassette handling), prepping the test surface, running the scan or shot, and documenting indications. Most Level Is work under a single method (often MT, PT, or VT as entry points; UT and RT require more training hours per ASNT recommendations).',
  typicalDay: [
    '06:30 — Pre-shift safety brief at the fab shop, pick up the procedure packet for the day (AWS D1.1 spool welds, Q4 production run), draw consumables (Magnaflux 7HF black ink, WCP-2 contrast paint) from the QC cage.',
    '07:00 — Set up the MT booth: yoke continuity check on a 4.5kg lift block per ASME V Article 7, UV-A meter calibration showing ≥1,000 µW/cm² at 15 inches, ambient light reading below 20 lux.',
    '09:30 — Run wet fluorescent MT on the first 12 weld joints — clean, magnetize in two perpendicular directions, apply bath, inspect under UV, photograph any indication for the Level II.',
    '12:30 — Lunch, log inspection sheets into the QC tracker, route the morning batch to the Level II reviewer queue.',
    '13:30 — Afternoon production batch: PT on 18 stainless tube-to-tubesheet welds using a Type I, Method C, Form d penetrant system per ASTM E165, observing the 10-minute dwell and 7-minute developer time stamped in the procedure.',
    '16:00 — Equipment teardown, log consumable lot numbers (required for the QC traceability file), file the day’s reports, hand off any pending NCRs to the Level II.',
  ],
  responsibilities: [
    'Execute approved written NDT procedures exactly as specified, without modification — any deviation requires Level II or III approval before proceeding[1].',
    'Set up and verify equipment performance checks: yoke lift tests, UV intensity readings, UT thickness gauge linearity using stepped wedge blocks, RT film density on step wedges.',
    'Prepare test surfaces to the cleanliness standard called out in the procedure (typically SSPC-SP1 solvent clean for MT/PT, no scale or paint over 0.005" thickness for UT).',
    'Document raw inspection data — indication locations, sizes, equipment serial numbers, lot numbers of consumables, environmental conditions — for the Level II to evaluate.',
    'Maintain calibration records and consumable inventory: pull dated batches, segregate expired material, log developer/penetrant lot pairs per ASME V mandatory family rules.',
    'Support Level II and Level III personnel during procedure qualifications, technique development, and audit responses — typically by running setup, taking measurements, and prepping samples.',
    'Hand-carry rejected items into the NCR (Non-Conformance Report) queue without classifying severity — that is reserved for Level II adjudication.',
  ],
  pathToEntry: [
    {
      step: 1,
      title: 'High school diploma + basic shop math',
      body: 'No college required. You need solid arithmetic, the ability to read a tape measure to 1/32" and a caliper to 0.001", and reading comprehension to follow a 30-page procedure without skipping steps. Many entrants come from welding, machining, or military technical MOS backgrounds.',
    },
    {
      step: 2,
      title: 'Choose a starting method (MT, PT, or VT recommended)',
      body: 'MT and PT have the lowest training hour requirements under SNT-TC-1A — 16 hours classroom for Level I MT, 16 hours for Level I PT, vs 40 hours for UT and 40 hours for RT[1]. Many start with MT + PT as a combined entry-level package.',
    },
    {
      step: 3,
      title: 'Complete formal classroom training (16-40 hours per method)',
      body: 'Training providers include Hellier NDT, Lavender International, TEAM Inc training, Acuren Academy, and community college NDT programs (Tulsa Welding School, San Jacinto College). Cost ranges $800-$2,500 per method. Some employers (TEAM, Acuren, Mistras) hire trainees and provide in-house training.',
    },
    {
      step: 4,
      title: 'Log 130-210 OJT hours per method, pass written + practical exams',
      body: 'SNT-TC-1A recommends 130 hours OJT for MT Level I, 130 for PT, 210 for UT, 210 for RT[1]. Your employer\'s written practice (per ASNT CP-189 if they use it) dictates the exact split. Written exam (general + specific), practical exam (set up, perform, record), and an eye exam (Jaeger 1 at 12 inches near vision, color contrast) gate certification.',
    },
    {
      step: 5,
      title: 'Get certified by your employer (employer-based) or take ACCP/PCN central certification',
      body: 'SNT-TC-1A is employer-based — your certification is only valid at the issuing employer[1]. Many candidates pursue ASNT Central Certification Program (ACCP) or PCN (UK-based) for portability. ISO 9712 certifications are also portable and increasingly required for offshore and aerospace work[3].',
    },
  ],
  certificationsRequired: [
    {
      name: 'ASNT SNT-TC-1A Level I (employer-based)',
      mandatory: true,
      reason: 'Industry-recognized baseline. Your employer issues the cert per their written practice; ASNT publishes the recommended training/OJT minimums[1].',
    },
    {
      name: 'Annual near-vision and color-contrast eye exam (Jaeger 1 @ 12")',
      mandatory: true,
      reason: 'Required by SNT-TC-1A and most employer written practices. Failure to pass disqualifies you from certification at recert.',
    },
    {
      name: 'OSHA 10 (general industry) or OSHA 30 (construction)',
      mandatory: false,
      reason: 'Not a Level I cert requirement but mandatory for most refinery and construction site access. Many employers cover the course.',
    },
    {
      name: 'TWIC card (Transportation Worker Identification Credential)',
      mandatory: false,
      reason: 'Required for unescorted access to most US ports, refineries, and chemical facilities. Apply through TSA, $125, 5-year validity.',
    },
  ],
  salaryByExperience: [
    {
      years: '0-1 (entry/trainee)',
      min: 38000,
      max: 52000,
      median: 44000,
    },
    {
      years: '1-3 (Level I single method)',
      min: 45000,
      max: 62000,
      median: 53000,
    },
    {
      years: '3-5 (Level I multi-method, pre-Level II)',
      min: 52000,
      max: 72000,
      median: 61000,
    },
  ],
  industriesEmploying: [
    {
      industry: 'Structural fabrication & welding shops',
      demand: 'High — every AWS D1.1 shop needs MT/PT/VT coverage for production weld inspection.',
    },
    {
      industry: 'Oil & gas service companies (Acuren, TEAM, Mistras, Applus+)',
      demand: 'Very high — entry pipeline for refinery turnaround crews. Most Level Is start here.',
    },
    {
      industry: 'Pipeline construction and maintenance contractors',
      demand: 'High — DOT 49 CFR 192/195 mandates weld inspection on new construction[2].',
    },
    {
      industry: 'Power generation (fossil and nuclear support)',
      demand: 'Moderate — nuclear adds ANSI N45.2.6 / NQA-1 layers requiring more rigorous training before site access.',
    },
    {
      industry: 'Aerospace MRO and manufacturing',
      demand: 'Moderate — NAS 410 governs aerospace certification with stricter hour requirements than SNT-TC-1A[4].',
    },
  ],
  advancementPath:
    'Path forward: Level I → Level II in the same method (1-3 years), then add methods (Level II UT + MT + PT is the standard multi-method combo for refinery work). Level III usually requires 4+ years of Level II experience and either ASNT Level III written exam or ACCP exam. From Level III, paths split: technical (procedure writing, NDE engineer), supervisory (NDT supervisor, QC manager), or commercial (sales engineer, consultant). Many Level IIIs found their own inspection companies after 10-15 years.',
  remoteOrField: 'field',
  riskFactors: [
    'Working at height — scaffolding, man lifts, rope access on tanks and stacks. Annual fall protection training required.',
    'Confined space entry for in-tank UT thickness work — permit required, gas testing required, attendant required (OSHA 1910.146).',
    'Radiation exposure if working with or near RT crews — even non-RT personnel in the controlled area must wear a dosimeter when an exposure is active per 10 CFR 20.',
    'Chemical exposure to penetrants, developers, solvents — SDS review and respirator fit testing required for certain consumables.',
    'Long hours during turnarounds — 12 hours/day, 7 days/week for 4-6 weeks is normal. Burnout is real and the divorce rate among traveling NDT crews is well above average.',
  ],
  faqs: [
    {
      q: 'Can a Level I NDT technician interpret indications?',
      a: 'No. Under SNT-TC-1A, a Level I performs setup, calibration checks, and the actual test, then records the data. Evaluation of indications against acceptance criteria — accept, reject, dispositions — is reserved for Level II personnel[1]. A Level I can describe what they see ("rounded indication 3mm at weld toe") but cannot classify it as a defect or call it acceptable. This is a hard line audited during ISO 9001 and Nadcap surveillance audits. Working outside this scope is the most common audit finding against new shops.',
    },
    {
      q: 'How long does it take to become a Level I NDT technician?',
      a: 'For a single method like MT or PT, plan on 4-8 weeks: 16 hours classroom training, 130 hours OJT (about 16 working days), then exams. UT and RT take significantly longer — 40 hours classroom plus 210 hours OJT each, so 8-12 weeks per method realistically[1]. Most employer programs sequence MT and PT first because the hour requirements are lower and the methods are visual and intuitive, then move trainees into UT once they\'ve proven they can follow procedures.',
    },
    {
      q: 'Is SNT-TC-1A certification portable between employers?',
      a: 'Strictly speaking, no. SNT-TC-1A is an ASNT Recommended Practice that puts certification authority with the employer\'s written practice[1]. When you change employers, the new employer\'s Level III must review your training records, OJT logs, and exam scores, then certify you under their written practice. In practice, most employers honor recent SNT-TC-1A training documentation and shorten retraining. For real portability, pursue ASNT ACCP, PCN, or ISO 9712 — these are independent third-party certifications carried by the individual[3].',
    },
    {
      q: 'What is the difference between SNT-TC-1A and CP-189?',
      a: 'SNT-TC-1A is a Recommended Practice — employers tailor minimums in their written practice. CP-189 is a Standard — the minimums are mandatory and exam content is more rigid[1]. Nuclear and many aerospace contracts require CP-189 because it removes employer discretion on training hours and exam scope. CP-189 also mandates more OJT hours (260 for UT Level I vs 210 under SNT-TC-1A) and requires the Level III certifying the candidate to hold ASNT Level III, not just employer Level III. If a job posting says "CP-189 compliant," expect a stricter audit trail and longer training.',
    },
  ],
  internalLinks: [
    { href: '/learn/ultrasonic-testing', label: 'Ultrasonic testing (UT) overview', context: 'Next-method-up for Level Is moving past MT/PT into UT.' },
    { href: '/learn/magnetic-particle-testing', label: 'Magnetic particle testing (MT) guide', context: 'Common Level I starting method covered in detail.' },
    { href: '/learn/penetrant-testing', label: 'Liquid penetrant testing (PT) guide', context: 'Lowest barrier to entry — the typical first cert.' },
    { href: '/careers/ndt-technician-level-2', label: 'NDT Technician Level II career path', context: 'Where most Level Is move within 1-3 years.' },
    { href: '/standards/snt-tc-1a', label: 'ASNT SNT-TC-1A explained', context: 'The recommended practice that governs your certification path.' },
    { href: '/standards/asnt-cp-189', label: 'ASNT CP-189 standard', context: 'Stricter alternative to SNT-TC-1A required by some nuclear and aerospace contracts.' },
    { href: '/free-tools/ndt-salary-calculator', label: 'NDT salary calculator', context: 'Run your method mix and location to see typical comp.' },
    { href: '/industries/oil-and-gas', label: 'Oil & gas NDT', context: 'Primary employer of entry-level technicians in the US.' },
    { href: '/free-tools/certification-tracker', label: 'Certification tracker tool', context: 'Track hours, exam dates, and recert deadlines.' },
  ],
  citations: [
    { id: 'asnt-snt-tc-1a', source: 'ASNT SNT-TC-1A (2020), Personnel Qualification and Certification in Nondestructive Testing, §6 Training, §7 Experience, §8 Examinations.' },
    { id: 'dot-cfr-192', source: '49 CFR Part 192 §192.241, Inspection and Test of Welds (Pipeline Safety, US DOT).' },
    { id: 'iso-9712', source: 'ISO 9712:2021, Non-destructive testing — Qualification and certification of NDT personnel.' },
    { id: 'nas-410', source: 'NAS 410, Rev. 5 (2020), NAS Certification & Qualification of Nondestructive Test Personnel (aerospace).' },
    { id: 'asnt-salary-survey', source: 'ASNT 2024 Salary Survey of NDT Professionals, ASNT Materials Evaluation, March 2024.' },
  ],
};

export default career;
