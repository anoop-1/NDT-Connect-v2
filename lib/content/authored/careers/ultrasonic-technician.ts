import type { CareerContent } from '../types';

const career: CareerContent = {
  slug: 'ultrasonic-technician',
  title: 'Ultrasonic Technician (UT) — Career Guide',
  metaTitle: 'Ultrasonic Technician Career: Pay, Path & UT-Specific Tracks',
  metaDescription:
    'UT technicians cover thickness, weld scan, corrosion mapping, and PAUT/TOFD. Honest 2024-2026 US pay bands, the move into phased array, and refinery vs pipeline tracks.',
  heroLede:
    'A UT Level II at a Lake Charles olefins unit spends the first 90 minutes calibrating an Olympus EPOCH 650 against a 25.4mm IIW V1 block — setting 80% FSH on the 25mm backwall, building a 70° DAC curve on the AWS basic block (1.5mm, 3mm, 6mm SDH), and verifying linearity per ASME V T-461 before climbing a man lift to thickness-survey a 14-inch furnace return bend in 750°F service[1]. UT is the highest-value, broadest-scope NDT method in US industry — thickness gauging, weld scan, corrosion mapping, sizing, and advanced techniques (PAUT, TOFD, guided wave) all run on UT physics. The pay reflects the breadth.',
  whatYouDo:
    'A UT technician sets up ultrasonic equipment, calibrates against reference blocks, scans welds or base material, characterizes indications by signal response (amplitude, time of flight, beam geometry), and reports findings against code acceptance[1]. Work scopes: weld scan (ASME V Article 4, AWS D1.1 §6), thickness measurement (API 510/570/653 corrosion programs), corrosion mapping (UT B-scan or C-scan over a grid), high-temperature thickness (HT-UT to 1000°F+), and advanced techniques like Phased Array (PAUT) and Time-of-Flight Diffraction (TOFD) under ASME V Mandatory Appendix VIII.',
  typicalDay: [
    '05:30 — Pre-shift safety brief at the olefins unit, JSA review for furnace bend thickness survey at 750°F surface temperature.',
    '06:30 — Equipment cal: EPOCH 650 with 5MHz dual-element D790 probe for hot UT, verified on a stepped wedge at 80°F (room temp) then offset for high-temp signal velocity per ASTM E797.',
    '08:00-11:30 — Climb the man lift, take 24 thickness readings per bend on 6 furnace bends, log to the TML (thickness measurement location) database. Find a corrosion-thinned spot reading 0.187" against a 0.250" nominal, flag for engineering review per API 510 §7.2.[2]',
    '12:00-13:00 — Lunch, review the day\'s data with the inspection engineer, draft the corrosion rate calculation per API 510 §7.2 (short-term/long-term).',
    '13:30-16:30 — PAUT corrosion mapping on a hydrotreater shell weld using a 64-element 5MHz probe and a 2-axis encoder, scanning a 3-foot section of girth weld for high-temperature hydrogen attack[2].',
    '17:00 — Data review on the laptop, indication characterization, screenshot saves, draft of the inspection report for Level III concurrence on two ambiguous indications.',
  ],
  responsibilities: [
    'Calibrate UT flaw detectors and thickness gauges per ASME V T-461 — DAC curves, TCG, DGS, or AVG depending on procedure; verify linearity at start and every 4 hours.',
    'Conduct thickness surveys on piping, vessels, tanks, and tubes per API 510/570/653/ASME B31.3 — record to engineered TML grids, calculate corrosion rates, flag below-Tmin readings[2].',
    'Scan welds with angle beam probes (typically 45°, 60°, 70°), characterize indications by amplitude response, beam geometry, and movement (transverse, longitudinal, oblique).',
    'Perform corrosion mapping with B-scan or PAUT C-scan over a grid, encoded with a 2-axis scanner, producing a thickness contour plot delivered to the integrity team.',
    'Apply advanced techniques (PAUT, TOFD) under ASME V Mandatory Appendix VIII for sizing and characterization beyond conventional UT capability.',
    'Document equipment serial numbers, calibration block traceability, couplant batch numbers, and surface conditions on every report.',
    'Train Level I UT trainees on probe selection, wedge selection, and basic flaw detector operation under your written practice.',
  ],
  pathToEntry: [
    {
      step: 1,
      title: 'Complete UT Level I training (40 hours classroom)',
      body: 'UT classroom training is 40 hours under SNT-TC-1A[3]. Topics: wave propagation, transducer physics, scan plans, calibration blocks, attenuation. Cost: $1,200-$2,500 at Hellier, Lavender, Acuren Academy, Mistras Training.',
    },
    {
      step: 2,
      title: 'Log 210 hours Level I OJT, then 840 hours Level II OJT',
      body: 'UT requires more OJT than any common method except RT[3]. Most candidates take 12-18 months to clear Level II UT hours on a productive crew.',
    },
    {
      step: 3,
      title: 'Pass Level I and Level II written + practical exams',
      body: 'Written general (60-80 questions on physics/equipment), written specific (40 questions on your employer\'s procedures), practical (set up, scan, interpret on an unknown specimen). Pass mark typically 70% per category, 80% composite.',
    },
    {
      step: 4,
      title: 'Add specialty: PAUT, TOFD, corrosion mapping, or high-temp UT',
      body: 'PAUT certification adds 80 hours classroom + 320-640 OJT[3]. TOFD adds 40 hours classroom + 160 OJT. These specialty endorsements pay 15-30% premium over standard UT Level II and are increasingly required for pipeline integrity and refinery turnaround work.',
    },
  ],
  certificationsRequired: [
    {
      name: 'SNT-TC-1A or CP-189 UT Level II',
      mandatory: true,
      reason: 'Industry baseline for interpretation authority on UT findings[3].',
    },
    {
      name: 'PAUT Level II (advanced specialty)',
      mandatory: false,
      reason: 'Required for pipeline PAUT scope (API 1104 Annex A) and most refinery PAUT corrosion mapping work. Pays 15-30% premium.',
    },
    {
      name: 'TOFD Level II',
      mandatory: false,
      reason: 'Required for TOFD weld sizing under ASME V Mandatory Appendix VIII. Common companion to PAUT.',
    },
    {
      name: 'API 510/570/653 (for owner-side thickness program work)',
      mandatory: false,
      reason: 'Refinery and tank thickness programs are governed by API inspection codes — UT technicians who hold API certs can do both inspection and the data review[2].',
    },
  ],
  salaryByExperience: [
    {
      years: '0-2 (UT Level I/II, single technique)',
      min: 55000,
      max: 76000,
      median: 64000,
    },
    {
      years: '2-7 (UT Level II + PAUT or TOFD)',
      min: 75000,
      max: 115000,
      median: 92000,
    },
    {
      years: '7+ (senior UT, PAUT+TOFD, pre-Level III)',
      min: 105000,
      max: 175000,
      median: 138000,
    },
  ],
  industriesEmploying: [
    {
      industry: 'Refinery turnaround crews',
      demand: 'Very high — UT is the dominant method on Gulf Coast turnarounds for thickness, weld scan, and corrosion mapping.',
    },
    {
      industry: 'Pipeline integrity (in-line inspection support, repair digs)',
      demand: 'Very high — PAUT and TOFD are the standard methods for sizing crack-like flaws found by ILI tools.',
    },
    {
      industry: 'Pipeline construction (girth weld AUT)',
      demand: 'High and growing — automated PAUT (AUT) is replacing RT on most new pipeline construction[2].',
    },
    {
      industry: 'Offshore (jacket node weld inspection, riser FFS)',
      demand: 'High — UT and PAUT are the workhorse methods on offshore structures and risers.',
    },
    {
      industry: 'Aerospace and rail (composite UT, axle UT, casting UT)',
      demand: 'Moderate — specialized but stable; NAS 410 governs aerospace UT[4].',
    },
  ],
  advancementPath:
    'UT Level I → Level II (single technique) → Level II + PAUT → Level II + PAUT + TOFD → Level III UT. The highest-pay path is multi-technique UT Level II for 7-10 years, then ASNT Level III UT plus consulting. Many senior UT technicians pivot to roles as PAUT analysts (data-only, office-based) or guided wave specialists (long-range UT for buried pipe screening). Owner-side roles (refinery reliability engineer, pipeline integrity engineer) are open after 5+ years field experience plus an API authorized inspector cert.',
  remoteOrField: 'field',
  riskFactors: [
    'High-temperature work — HT-UT on operating units exposes you to 400-1000°F surfaces; HT couplant burns and equipment damage are routine.',
    'Confined space and height — turnaround UT work happens inside tanks, on man lifts, and on scaffolding. Annual fall protection and confined space training mandatory.',
    'Repetitive strain — scanning 6-8 hours/day with a UT probe causes wrist and shoulder injuries; rotation between methods helps.',
    'Long shifts and travel — turnaround UT crews work 12-hour shifts 7 days/week for 4-6 weeks. Per diem helps; family life suffers.',
    'Eye strain and screen fatigue — PAUT data analysis is laptop-bound; carpal tunnel and eye fatigue are common occupational complaints.',
  ],
  faqs: [
    {
      q: 'Is UT or PAUT the better long-term career investment?',
      a: 'PAUT is the right investment if you\'re past Level I and choosing where to deepen. PAUT under ASME V Mandatory Appendix VIII and API 1104 Annex A is now widely accepted as a replacement for RT on most pipeline and many refinery scopes — the market is moving toward PAUT[2]. PAUT Level II pays 15-30% above conventional UT Level II in the US market, and PAUT analysts (data-only roles) bill $85-130/hr on contract. Conventional UT remains essential for thickness surveys, simple weld scan, and field troubleshooting where bringing a PAUT rig isn\'t practical. The strongest profile is conventional UT Level II + PAUT Level II + TOFD Level II — the multi-technique inspector who can handle anything the project throws at them.',
    },
    {
      q: 'How long does it take to become a UT Level II?',
      a: 'Realistically 2-4 years from zero. Minimum SNT-TC-1A path: 40 hours classroom + 210 hours OJT for Level I (4-6 months on a productive crew), then 840 hours additional OJT for Level II (12-18 months)[3]. Add the practical exam preparation (4-8 weeks). Most candidates complete Level II UT in 2-3 years on a refinery or pipeline crew. CP-189 paths run 10-20% longer because of stricter OJT documentation. Fast-track paths exist for military NDE veterans (Navy NDT-9985 ratings transfer well) and aerospace MRO veterans whose existing certs map across.',
    },
    {
      q: 'What is the highest-paying UT specialty?',
      a: 'Three specialties top the UT pay ladder. First, Automated UT (AUT) operators on offshore pipeline lay barges — combined PAUT/TOFD on welded girth welds, daily rates of $1,200-$1,800 plus offshore per diem. Second, PAUT data analysts in office roles for major NDT service companies and pipeline operators — $110-160k base, no travel, deep technical work. Third, ASNT Level III UT with PAUT/TOFD endorsements working as procedure consultants — $200-400k income depending on client mix. Guided Wave UT (LRUT) for buried pipe screening is a smaller market but pays well for specialists certified by Plant Integrity Ltd or NDT Global.',
    },
    {
      q: 'Do I need a degree to be a UT technician?',
      a: 'No degree is required for SNT-TC-1A or CP-189 Level II certification[3]. The market is open to technicians from welding, military, or trade school backgrounds. A two-year associate degree in NDT (Tulsa Welding School, Cincinnati State, San Jacinto College) accelerates the path because the schools cover Level I/II coursework as part of the program. A bachelor\'s in engineering or materials science is useful only if you want to pivot to inspection engineer or NDE engineer roles where you\'re writing procedures and interfacing with asset integrity. For straight UT inspector work, technical training plus a strong OJT mentor beats a degree every time.',
    },
  ],
  internalLinks: [
    { href: '/learn/ultrasonic-testing', label: 'Ultrasonic testing primer', context: 'Core method this role performs.' },
    { href: '/learn/phased-array-ultrasonic-testing', label: 'Phased array UT (PAUT) primer', context: 'Top-paying specialty for UT technicians.' },
    { href: '/careers/phased-array-specialist', label: 'PAUT specialist path', context: 'Specialization track for UT Level IIs.' },
    { href: '/careers/ndt-technician-level-2', label: 'Level II Technician general path', context: 'Broader Level II context.' },
    { href: '/standards/asme-section-v', label: 'ASME Section V', context: 'Code governing UT procedures.' },
    { href: '/standards/api-510', label: 'API 510 pressure vessel inspection', context: 'Owner-side cert layered onto UT.' },
    { href: '/free-tools/ut-coverage-calculator', label: 'UT coverage calculator', context: 'Calculator for skip distance and scan plan.' },
    { href: '/industries/refinery-turnaround', label: 'Refinery turnaround', context: 'Largest US employer of UT technicians.' },
    { href: '/industries/pipeline', label: 'Pipeline inspection', context: 'High-demand market for AUT and PAUT.' },
  ],
  citations: [
    { id: 'asme-v', source: 'ASME BPVC Section V (2023), Article 4 — Ultrasonic Examination Methods for Welds, T-461 Calibration.' },
    { id: 'api-510', source: 'API 510, 11th ed. (2022), §7.2 Thickness Measurement, §7.3 Corrosion Rate Determination.' },
    { id: 'asnt-snt-tc-1a-ut', source: 'ASNT SNT-TC-1A (2020), Table 6.3.1A — UT Level I 40hr classroom + 210hr OJT; Level II + 840hr OJT.' },
    { id: 'nas-410', source: 'NAS 410, Rev. 5 (2020), Certification & Qualification of Nondestructive Test Personnel — aerospace UT.' },
    { id: 'asnt-2024-survey', source: 'ASNT 2024 Salary Survey of NDT Professionals, ASNT Materials Evaluation Vol. 82 No. 3.' },
  ],
};

export default career;
