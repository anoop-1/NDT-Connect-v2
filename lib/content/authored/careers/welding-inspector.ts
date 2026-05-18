import type { CareerContent } from '../types';

const career: CareerContent = {
  slug: 'welding-inspector',
  title: 'Welding Inspector (AWS CWI) — Career Guide',
  metaTitle: 'Welding Inspector (CWI) Career: Pay, Path & Day-to-Day',
  metaDescription:
    'AWS CWI inspectors verify fit-up, weld procedure compliance, and visual quality on D1.1, D1.5, B31.3, and ASME work. Honest 2024-2026 pay, CWI exam path.',
  heroLede:
    'An AWS CWI on a Houston Ship Channel structural fabrication shop walks the morning production floor with a fillet gauge, weld profile gauge, mirror, and the company\'s D1.1 weld procedure binder, verifying fit-up gap and root opening on 18 column-to-base-plate assemblies before any welder strikes an arc[1]. The CWI catches a mismatched WPS — the welder selected a GMAW procedure for a joint that the QC plan specified FCAW — and pulls the assembly off the line. That single catch saves the shop a 200-joint rework when the engineer-of-record audits two weeks later. CWI work is unglamorous, code-driven, and constantly contested by production schedules. The pay reflects the discipline.',
  whatYouDo:
    'A welding inspector verifies that welding work conforms to the applicable code (AWS D1.1, D1.5, D17.1, ASME IX, API 1104, B31.3) by inspecting prior to, during, and after welding — fit-up, procedure compliance, welder qualification, visual weld quality, and documentation[1]. CWIs are not NDT technicians by default, though many hold NDT Level II credentials in parallel. The CWI signs the visual acceptance record; NDT methods (UT, RT, MT, PT) are typically performed by separate technicians or by the CWI if dual-qualified.',
  typicalDay: [
    '06:30 — Pre-shift production meeting, review the day\'s WPS schedule and the welder qualification matrix (which welder is qualified for which joint/position/process).',
    '07:30 — Walk the fit-up floor: verify root gap on 14 PJP groove welds against the WPS-specified 3/16" +0/-1/32", check tack weld size and spacing, confirm joint cleanliness per D1.1 §5.15.',
    '09:30 — Spot-check welders mid-production: amperage and voltage on the FCAW machine displays match the WPS range (180-220A, 24-28V), travel speed by stopwatch matches the WPS.',
    '12:30 — Visual inspection on 22 completed welds per AWS D1.1 §6.9 acceptance: undercut depth, weld profile, crater fill, porosity, spatter. Reject 3 welds for undercut >1/32", document with photos.',
    '14:00 — Witness MT on completed PJP groove welds (the company\'s NDT Level II runs the yoke; CWI verifies procedure compliance and signs the report).',
    '15:30 — Welder qualification re-test on a new welder hired this week: bend test coupons per ASME IX QW-462, evaluate against acceptance.',
    '17:00 — Daily QC report, NCR write-ups, hand the package to QC management and the engineer-of-record.',
  ],
  responsibilities: [
    'Verify Welding Procedure Specification (WPS) compliance — confirm welder is qualified, equipment settings match WPS, base material and filler metal match WPS[1].',
    'Inspect fit-up before welding: joint geometry, root gap, root face, tack welds, cleanliness, preheat verification with surface contact thermometer.',
    'Conduct visual inspection of completed welds against code acceptance (AWS D1.1 Table 6.13 or 6.14, ASME VIII Div 1 Mandatory Appendix 8, API 1104 §9)[1][2].',
    'Witness destructive testing for welder qualification per ASME IX QW-462 (bend, tensile, macro) and Procedure Qualification Records (PQR) per ASME IX QW-200.',
    'Review and approve weld documentation: WPS, PQR, welder/operator performance qualification records (WPQ/WOPQ), traceability of filler metal and base material heat numbers.',
    'Write Non-Conformance Reports (NCRs) on rejected welds; specify location, deficiency, code reference, and repair scope.',
    'Coordinate with the engineer-of-record and inspection authority on technical disputes — the CWI defends the call but engineering owns the disposition.',
  ],
  pathToEntry: [
    {
      step: 1,
      title: 'Accumulate 5 years welding industry experience (or substitute with education)',
      body: 'AWS QC1:2007 requires combinations of welding-related experience and education to sit the CWI exam[1]. The fastest path is 5 years of related work (welder, fitter, NDT tech, fabrication QA). A degree in welding engineering or metallurgy substitutes for years of experience per the QC1 matrix.',
    },
    {
      step: 2,
      title: 'Complete a CWI Seminar (recommended, not required)',
      body: 'The AWS CWI seminar is a 5-day intensive ($1,395-$1,895) covering the three exam parts. Pass rates with seminar are ~65%; without are ~40%. Online "Pre-Seminar" course is $695 and prepares you for the seminar.',
    },
    {
      step: 3,
      title: 'Pass the three-part CWI exam',
      body: 'Part A (fundamentals, ~150 questions, 2 hours, closed book), Part B (practical, ~46 questions on weld replicas, 2 hours, open book), Part C (code book — D1.1 default, AWS allows substitution to ASME IX, API 1104, B31.1/B31.3, AWS D1.5, AWS D15.1, ~46 questions, 2 hours)[1]. Pass mark 72% per part.',
    },
    {
      step: 4,
      title: 'Maintain CWI: 9-year cycle with 3-year endorsement renewals',
      body: 'AWS CWI is initially valid for 3 years, with renewals via endorsement (continuing education) or re-examination. The 9-year mark requires re-examination on Part B and Part C[1]. Annual eye exam required (Jaeger 2 at 12 inches, color contrast).',
    },
  ],
  certificationsRequired: [
    {
      name: 'AWS CWI (Certified Welding Inspector)',
      mandatory: true,
      reason: 'The credential the job is built on. Required by AWS D1.1, D1.5, D17.1, and most fabrication contracts[1].',
    },
    {
      name: 'Annual eye exam (Jaeger 2 @ 12", color contrast)',
      mandatory: true,
      reason: 'Required by AWS QC1 §6.4. Failure to pass disqualifies you until corrected and re-verified.',
    },
    {
      name: 'NDT Level II in MT, PT, UT (or VT under SNT-TC-1A)',
      mandatory: false,
      reason: 'Many CWIs add NDT Level II credentials to expand scope. Single-method CWIs are common in structural; multi-method CWI-NDTs are standard in refinery and pipeline.',
    },
    {
      name: 'API 510/570/653 (refinery/pipeline/tank inspector)',
      mandatory: false,
      reason: 'For owner-side refinery work, API certs layered onto CWI open higher-pay roles[2].',
    },
  ],
  salaryByExperience: [
    {
      years: '0-3 (new CWI)',
      min: 60000,
      max: 82000,
      median: 70000,
    },
    {
      years: '3-8 (CWI + NDT Level II)',
      min: 76000,
      max: 110000,
      median: 92000,
    },
    {
      years: '8+ (CWI + multi-method NDT + API or SCWI)',
      min: 100000,
      max: 170000,
      median: 130000,
    },
  ],
  industriesEmploying: [
    {
      industry: 'Structural fabrication (buildings, bridges, oil & gas modules)',
      demand: 'Very high — AWS D1.1 and D1.5 explicitly require CWI sign-off on visual weld inspection.',
    },
    {
      industry: 'Pressure vessel and piping fabrication (ASME VIII, B31.3)',
      demand: 'Very high — ASME stamp shops require CWI or equivalent inspector qualification.',
    },
    {
      industry: 'Pipeline construction and integrity',
      demand: 'High — API 1104 weld inspection layered with DOT pipeline integrity programs.',
    },
    {
      industry: 'Shipbuilding and marine fabrication',
      demand: 'Moderate — ABS, Lloyd\'s, BV surveys require qualified inspectors; CWI is the standard US credential.',
    },
    {
      industry: 'Aerospace welding (D17.1)',
      demand: 'Moderate — D17.1 governs aerospace welding; smaller market but stable.',
    },
  ],
  advancementPath:
    'CWI → Senior CWI (SCWI) → CWI + multi-method NDT Level II → CWI + API authorized inspector → QA/QC Manager. The fastest pay growth comes from stacking credentials: CWI + UT/MT/PT Level II + API 510 + Level III UT. SCWI (Senior CWI) requires 15 years of qualified experience plus an additional exam — adds 8-15% premium. Many CWIs pivot to QC management or NDT supervisor roles after 8-12 years. Independent CWI consultants charge $90-$160/hr for procedure development and audit support.',
  remoteOrField: 'field',
  riskFactors: [
    'Long hours during fabrication peaks — 50-60 hour weeks are common on tight fabrication schedules.',
    'Travel — most CWIs work multiple shops or sites; expect 80-150 nights/year in hotels.',
    'Production pressure — the CWI is the speed-bump between welders and shipping; managing that pressure without compromising the code is the soft-skill challenge of the job.',
    'Eye strain from constant inspection of small details — the eye exam requirement is real and many CWIs need corrective lenses by their 40s.',
    'Heat — outdoor construction CWI work in Texas/Louisiana summers is brutal; indoor shop work is better but still loud and metal-dust heavy.',
  ],
  faqs: [
    {
      q: 'Is CWI harder than NDT Level II?',
      a: 'They test different skills. CWI demands deep code-reading (Part C is brutal — finding the relevant clause in D1.1 under time pressure tests your code book navigation), visual interpretation of weld discontinuities on replica samples (Part B), and welding fundamentals (Part A). NDT Level II tests physics, equipment, and interpretation specific to one method. Most candidates rate CWI harder because the code book section is unforgiving — many candidates fail Part C on the first attempt[1]. The AWS published pass rate is around 65% with seminar attendance. If you\'ve never read AWS D1.1 cover-to-cover, plan 200+ hours of preparation; pre-seminar online courses help but cannot replace independent code reading.',
    },
    {
      q: 'What is the difference between CWI, CAWI, and SCWI?',
      a: 'AWS QC1 defines three levels[1]. CAWI (Certified Associate Welding Inspector) is the entry credential — same Part A and Part B as CWI, but Part C is optional, and CAWIs work under CWI supervision. CWI is the working credential — all three parts passed, can independently sign as inspector under D1.1 and most US codes. SCWI (Senior CWI) requires CWI status plus 15+ years of qualified experience and an additional senior exam. SCWI carries more weight in litigation and is required by some contracts (military, nuclear). Most working inspectors hold CWI; CAWI is rarely seen in the field; SCWI is held by experienced lead inspectors and consultants.',
    },
    {
      q: 'Can I work as a welding inspector without a CWI?',
      a: 'Yes, but your job options narrow significantly. AWS D1.1 specifically requires "Welding Inspector" qualification per AWS QC1 (CWI) or equivalent[1]. Some contracts accept Canadian CWB Level 2, CSWIP 3.1 (UK), or ICorr/IIW equivalents. ASME IX defines welder and procedure qualifications but does not specify the inspector\'s credentials — those come from the contract. Many smaller shops have used in-house inspectors without CWI, but ISO 9001 and API Q1 audits push toward CWI as the documented qualification. If you\'re working internationally, CSWIP is widely recognized in Europe and the Middle East; CWI dominates in the US, Canada, and Latin America.',
    },
    {
      q: 'How much does a CWI earn vs an NDT Level II?',
      a: 'A CWI without NDT credentials earns roughly the same as a single-method NDT Level II — $60-82k entry, $76-110k mid-career, in the US 2024-2026 market[5]. The pay jumps when you stack credentials. CWI + UT Level II is worth $90-130k mid-career; CWI + UT + PAUT + API 510 is $120-170k. The CWI itself is most valuable as a credential multiplier — it expands the scope of work you can sign for and opens supervisor and owner-side roles that pure NDT technicians can\'t. The highest-paying single role for a working inspector is CWI + multi-method NDT + API authorized inspector on a refinery turnaround crew, where total compensation with per diem and OT can clear $150-200k in a strong year.',
    },
  ],
  internalLinks: [
    { href: '/careers/ndt-inspector', label: 'NDT inspector general path', context: 'Related role often combined with CWI.' },
    { href: '/careers/ndt-technician-level-2', label: 'Level II Technician path', context: 'Common companion credential to CWI.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1 structural welding code', context: 'The default code Part C of the CWI exam tests.' },
    { href: '/standards/aws-d1-5', label: 'AWS D1.5 bridge welding', context: 'Bridge fabrication CWI work.' },
    { href: '/standards/asme-section-ix', label: 'ASME Section IX welding qualifications', context: 'Welder and procedure qualification standard.' },
    { href: '/learn/visual-testing', label: 'Visual testing primer', context: 'Core skill of the CWI role.' },
    { href: '/free-tools/cwi-exam-prep', label: 'CWI exam prep tool', context: 'Helps with Part B and Part C study.' },
    { href: '/industries/structural-fabrication', label: 'Structural fabrication', context: 'Largest CWI employer.' },
    { href: '/industries/pipeline', label: 'Pipeline inspection', context: 'API 1104 CWI scope.' },
  ],
  citations: [
    { id: 'aws-qc1', source: 'AWS QC1:2007 (R2020), Standard for AWS Certification of Welding Inspectors.' },
    { id: 'aws-d1-1', source: 'AWS D1.1/D1.1M:2020, Structural Welding Code — Steel, Clause 6 Inspection.' },
    { id: 'asme-ix', source: 'ASME BPVC Section IX (2023), Welding, Brazing, and Fusing Qualifications, QW-200, QW-462.' },
    { id: 'api-1104', source: 'API 1104, 22nd ed. (2021), Welding of Pipelines and Related Facilities.' },
    { id: 'aws-salary-survey', source: 'AWS Welding Journal 2024 Welding Inspector Compensation Report.' },
  ],
};

export default career;
