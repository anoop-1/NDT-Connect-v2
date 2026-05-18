import type { CareerContent } from '../types';

const career: CareerContent = {
  slug: 'ndt-technician-level-2',
  title: 'NDT Technician Level II — Career Guide',
  metaTitle: 'NDT Technician Level II: Pay, Certs & Day-to-Day',
  metaDescription:
    'Level II UT/MT/PT/RT inspectors interpret, accept, and reject. Honest 2024-2026 US pay bands, refinery turnaround day-in-the-life, and the move to Level III.',
  heroLede:
    'A Level II UT technician at a Corpus Christi refinery turnaround spends the first hour calibrating an Olympus EPOCH 650 against a 25.4mm IIW V1 block, setting DAC curves at 80% FSH, and verifying near-zone resolution on a 1.5mm SDH before climbing scaffolding to scan girth welds on a hydrotreater feed line. Unlike a Level I, the Level II owns the calls — accept, reject, repair, monitor — and signs the report that QC accepts as the inspection record[1]. The certification carries real legal weight: a missed crack on a 600°F H₂ service line is a Level II liability, and the company\'s insurance carrier looks at the cert log first when something fails.',
  whatYouDo:
    'A Level II NDT technician sets up equipment, runs the scan, interprets indications against the acceptance criteria in the code or procedure, and writes the inspection report that engineering uses to decide repair, replace, or run[1]. You own the technical call. You can write technique sheets within an approved procedure, train Level I personnel, and conduct procedure qualifications under Level III supervision. Most Level IIs hold 2-4 methods (typical refinery combo: UT + PT + MT + VT; pipeline combo: RT + UT; aerospace combo: ET + UT + FPI).',
  typicalDay: [
    '05:30 — Pre-turnaround safety meeting, JSA review for hydrotreater feed line inspection, draw isotope source authorization paperwork for the RT crew working adjacent on the reactor head.',
    '06:30 — Calibrate UT flaw detector on IIW V1 block: 80% FSH at 25mm with a 5MHz 0° contact transducer, then build a 70° DAC curve on the AWS basic cal block (1.5mm, 3mm, 6mm SDHs).',
    '08:00-11:30 — Scan 28 girth welds on the 16" hydrotreater feed line per ASME V Article 4 / ASME VIII Div 1 acceptance. Find a 4mm planar indication on weld GW-22 at the 2 o\'clock position, characterize as lack-of-fusion based on signal response, mark for repair.',
    '12:00 — Document the morning batch in the QC tracker, sign off the Level I\'s MT reports on the structural pipe supports.',
    '13:00-16:30 — PT on stainless tubesheet welds (Type II Method C visible dye, dwell per ASME V T-622), then VT on the reactor head studs per API 510 internal checklist[2].',
    '17:00 — Hand the day\'s rejected welds to the engineering team with repair scope drafts; brief the night shift Level II on outstanding holds.',
  ],
  responsibilities: [
    'Interpret and evaluate indications against code acceptance criteria (ASME V/VIII, AWS D1.1, API 1104, B31.3) and sign the report as the responsible inspector[1].',
    'Set up equipment, develop technique sheets within approved procedures, and verify Level I work before it leaves the site.',
    'Calibrate UT flaw detectors with DAC curves, TCG, or DGS, and document the calibration verification cycle per ASME V T-461 (every 4 hours or change of operator/temperature).',
    'Conduct on-the-job training for Level I trainees and record OJT hours on their certification file.',
    'Write Non-Conformance Reports (NCRs) on rejected indications, including location, size, characterization, and reference to the failed acceptance criterion.',
    'Witness pressure tests, perform leak testing per ASME V Article 10, and sign off on hydrotest holds.',
    'Maintain procedure qualifications: run the demo on coupons, document parameters, present to the Level III for procedure approval per ASME V T-150.',
  ],
  pathToEntry: [
    {
      step: 1,
      title: 'Hold a Level I cert in the target method (or equivalent training)',
      body: 'You don\'t always need to be certified Level I first — some employers let candidates train direct to Level II if they have the OJT hours and pass the Level II exam. But most paths go I → II in the same method[1].',
    },
    {
      step: 2,
      title: 'Accumulate Level II OJT hours (400-1,200 depending on method)',
      body: 'SNT-TC-1A Level II OJT: MT 400 hrs, PT 400 hrs, UT 840 hrs, RT 840 hrs[1]. Many candidates take 2-3 years to clear UT or RT Level II hours. ASNT CP-189 is similar but stricter on auditable OJT logs.',
    },
    {
      step: 3,
      title: 'Pass Level II exams (general + specific + practical)',
      body: 'Written general (40-80 questions on physics, equipment, procedures), written specific (40 questions on your employer\'s procedures), and practical (you set up, run, interpret, and report on an unknown sample within a time limit). Pass mark is typically 70% per question category and 80% composite.',
    },
    {
      step: 4,
      title: 'Get certified under employer written practice, optionally pursue portable certs',
      body: 'Same as Level I — SNT-TC-1A is employer-based. For real portability and for offshore/aerospace work, pursue PCN, ACCP, ISO 9712, or NAS 410 Level II[3][4]. ISO 9712 is becoming the de facto standard for international offshore work.',
    },
    {
      step: 5,
      title: 'Recertify every 3-5 years; maintain the eye exam annually',
      body: 'SNT-TC-1A recommends 5-year recert with documented continuing experience[1]. ISO 9712 is 5 years with practical re-exam; NAS 410 is 3-year cycle. Eye exam is annual: Jaeger 1 at 12 inches, color contrast Ishihara plates or equivalent.',
    },
  ],
  certificationsRequired: [
    {
      name: 'ASNT SNT-TC-1A Level II (employer-based)',
      mandatory: true,
      reason: 'Industry baseline for accept/reject authority in the US[1].',
    },
    {
      name: 'Annual eye exam (Jaeger 1 @ 12", color-contrast)',
      mandatory: true,
      reason: 'Hard requirement under SNT-TC-1A and CP-189. Failure ends your career until corrected and re-verified.',
    },
    {
      name: 'API 510 / API 570 / API 653 inspector (for refinery work)',
      mandatory: false,
      reason: 'Not an NDT cert, but most refinery Level IIs eventually carry an API inspector cert to expand scope and pay.',
    },
    {
      name: 'ISO 9712 Level II (for international/offshore work)',
      mandatory: false,
      reason: 'Portable, third-party certification. Required by most North Sea, Middle East, and West Africa offshore operators[3].',
    },
  ],
  salaryByExperience: [
    {
      years: '0-2 (new Level II, single method)',
      min: 58000,
      max: 76000,
      median: 67000,
    },
    {
      years: '2-6 (Level II multi-method)',
      min: 72000,
      max: 98000,
      median: 84000,
    },
    {
      years: '6-12 (senior Level II, pre-Level III)',
      min: 88000,
      max: 135000,
      median: 108000,
    },
  ],
  industriesEmploying: [
    {
      industry: 'Refinery turnaround crews (Gulf Coast, Midwest, West Coast)',
      demand: 'Very high — turnaround Level II UT/PT crews are perennially short-staffed. Per diem and overtime stack quickly.',
    },
    {
      industry: 'Pipeline construction and integrity (DOT 49 CFR 192/195)',
      demand: 'High — RT/UT Level II is the standard girth weld inspector profile on new construction[2].',
    },
    {
      industry: 'Power generation (fossil + nuclear)',
      demand: 'High — nuclear contracts require CP-189 Level II at minimum; many require ASME XI ISI experience.',
    },
    {
      industry: 'Offshore (Gulf of Mexico, North Sea, West Africa, Brazil)',
      demand: 'High but specialized — ISO 9712 + offshore survival training (BOSIET) required for most rotations[3].',
    },
    {
      industry: 'Aerospace manufacturing and MRO (Boeing, Lockheed, Pratt, Spirit AeroSystems)',
      demand: 'Moderate — NAS 410 Level II required; Nadcap-audited shops only[4].',
    },
  ],
  advancementPath:
    'From Level II the paths split. Technical: add methods (UT → PAUT → TOFD specialty), then sit Level III in your strongest method. Supervisory: NDT supervisor → NDT manager → QA/QC manager. Commercial: senior inspector → inspection engineer → consultant. The fastest pay growth is the Level II → Level III jump (often $20-40k uplift) plus pivoting into advanced methods (PAUT, eddy current array, guided wave). Many Level IIs leave to start their own inspection company once they have client relationships and capital for equipment.',
  remoteOrField: 'field',
  riskFactors: [
    'Radiation exposure during shared work with RT crews — controlled area dosimetry required per 10 CFR 20.',
    'Confined space, height, and hot work hazards — turnaround sites stack three or four permits at once.',
    'Long-distance travel — most Level IIs spend 150-220 nights per year in hotels. Per diem helps; the toll on family life is real.',
    'Repetitive strain — scanning 6-8 hours/day with a UT probe causes wrist and shoulder issues; rope-access inspectors deal with harness pressure points.',
    'Hot environments — refinery and offshore work in 110°F summer heat with PPE; heat stress training and hydration protocols matter.',
  ],
  faqs: [
    {
      q: 'How much more does a Level II earn vs a Level I?',
      a: 'In the US 2024-2026 market, a new Level II typically earns $58-76k base vs $45-62k for a 1-3 year Level I — a 20-30% jump. The bigger lift comes from per diem and overtime on turnaround work. A Level II UT/PT/MT tech on a Gulf Coast turnaround running 84-hour weeks at $34/hr base with $135/day per diem clears $4,500-$5,500 gross per week during the turn[5]. Pipeline RT Level IIs working AGL spreads see similar numbers. The trade is brutal hours and time away from home, but the cash arrives.',
    },
    {
      q: 'Do I need Level I first, or can I go straight to Level II?',
      a: 'Strictly under SNT-TC-1A, no — you can certify direct to Level II if you accumulate the higher OJT hours (e.g., 840 hours for UT Level II) and pass the Level II exams[1]. In practice most employers prefer the I → II path because it lets them assess your work ethic and reliability before granting accept/reject authority. The exception is candidates with prior military NDT MOS or aerospace MRO experience — those often skip Level I because their service training already covered the basics and their hours transfer with documentation.',
    },
    {
      q: 'Which Level II method pays the most?',
      a: 'Advanced UT methods top the list: Phased Array UT (PAUT) and TOFD specialists earn 15-30% above standard UT Level II rates. RT pays well during shutdowns (isotope + film handling premium, plus radiation work pay). Eddy current testing is a niche but pays strongly in aerospace and heat exchanger tube inspection. The lowest-paying methods by hourly rate are MT, PT, and VT — these are easier to staff so the market clears at lower wages. The highest-pay combo for refinery work is PAUT + UT + AWS CWI; for aerospace it is FPI + ET + PAUT under NAS 410[4].',
    },
    {
      q: 'How often do Level II certifications expire?',
      a: 'Under SNT-TC-1A, the recommended recertification interval is 5 years for Level II with documented continuing experience and an annual eye exam[1]. Many employer written practices shorten this to 3 years. ISO 9712 mandates 5-year recertification with a practical re-examination on a current technique[3]. NAS 410 (aerospace) is on a 3-year cycle and is among the strictest — you re-test on actual aerospace parts under timed conditions[4]. If you let a cert lapse, most employers require full re-examination, not just renewal — keep the dates on your phone calendar.',
    },
  ],
  internalLinks: [
    { href: '/careers/ndt-technician-level-1', label: 'Level I career path', context: 'Where most Level IIs come from.' },
    { href: '/careers/ndt-technician-level-3', label: 'Level III career path', context: 'The next step after 4+ years of senior Level II work.' },
    { href: '/standards/snt-tc-1a', label: 'SNT-TC-1A explained', context: 'The recommended practice governing your certification.' },
    { href: '/standards/iso-9712', label: 'ISO 9712 explained', context: 'Portable certification for international work.' },
    { href: '/learn/phased-array-ultrasonic-testing', label: 'PAUT primer', context: 'Top earning specialty for Level IIs.' },
    { href: '/learn/ultrasonic-testing', label: 'UT method guide', context: 'Core method for refinery Level IIs.' },
    { href: '/free-tools/ndt-salary-calculator', label: 'Salary calculator', context: 'Estimate your comp by method and location.' },
    { href: '/industries/refinery-turnaround', label: 'Refinery turnarounds', context: 'Where Level IIs earn the most overtime and per diem.' },
    { href: '/industries/offshore', label: 'Offshore inspection', context: 'High-paying rotation work for ISO 9712 holders.' },
  ],
  citations: [
    { id: 'asnt-snt-tc-1a', source: 'ASNT SNT-TC-1A (2020), Personnel Qualification and Certification in Nondestructive Testing, Tables 6.3.1A and 6.3.1B (training and experience minimums).' },
    { id: 'dot-cfr-192-241', source: '49 CFR Part 192 §192.241 and §192.243, Inspection and testing of welds.' },
    { id: 'iso-9712-2021', source: 'ISO 9712:2021, Non-destructive testing — Qualification and certification of NDT personnel, §7 Examinations, §10 Renewal & recertification.' },
    { id: 'nas-410', source: 'NAS 410, Rev. 5 (2020), Certification & Qualification of Nondestructive Test Personnel, §6 Training, §7 Examination, §8 Certification.' },
    { id: 'asnt-2024-survey', source: 'ASNT Salary Survey of NDT Professionals (2024), ASNT Materials Evaluation, Vol. 82 No. 3.' },
  ],
};

export default career;
