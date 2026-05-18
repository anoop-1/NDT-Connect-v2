import type { CareerContent } from '../types';

const career: CareerContent = {
  slug: 'ndt-supervisor',
  title: 'NDT Supervisor — Career Guide',
  metaTitle: 'NDT Supervisor: Pay, Path, and Day-to-Day Reality',
  metaDescription:
    'NDT supervisors run crews of 6-30 inspectors on refinery turnarounds and pipeline spreads. Honest 2024-2026 US pay, certification stack, and the move into management.',
  heroLede:
    'An NDT supervisor on a Port Arthur refinery turnaround manages 18 technicians across UT, MT, PT, and RT scopes, runs the morning huddle in the staging area at 05:30, assigns crews to four reactor systems, and spends the rest of the shift fielding calls — engineering wants a re-shoot on a girth weld with shadow porosity, the RT crew\'s source is in service and they need a 45-minute clear, the client\'s QA inspector is questioning a Level II\'s accept call on a 30mm planar reflector[1]. The supervisor signs the day\'s reports, mediates the dispute with engineering, manages the per-diem timesheets, and at 19:30 hands the night-shift supervisor a 4-page brief on outstanding holds. The role is half technical, half operations, all accountability.',
  whatYouDo:
    'An NDT supervisor leads field crews of 6-30 technicians, manages the inspection scope against the project schedule, ensures procedure compliance and quality on every report leaving the site, and serves as the technical interface with the client and engineering[1]. The role spans operations (scheduling, crew assignments, equipment logistics, per diem and timesheet management), technical (reviewing Level II reports, mediating accept/reject disputes, witnessing critical inspections), and commercial (managing change orders, daily client check-ins, budget oversight). Most NDT supervisors are former senior Level II inspectors with 8+ years field experience.',
  typicalDay: [
    '05:30 — Pre-shift huddle in the staging area: review the day\'s inspection scope (54 girth welds RT, 28 reactor head welds PAUT, thickness survey on the FCC slurry pumparound), assign crews and confirm dosimetry/permits.',
    '07:00 — Walk the unit with the client QC representative — verify barriers, scaffold access, hot work permits. Resolve a dispute about who owns the LOTO for the 36-inch slurry line.',
    '09:30 — Field calls: RT crew lost an exposure on weld GW-22, needs a re-shoot authorization; PAUT crew finds an unexpected indication that engineering wants resolved before next shift.',
    '11:30 — Lunch in the supervisor\'s trailer, review the morning\'s Level II reports, sign off on 14 accept/reject calls, flag 2 borderline indications for Level III review.',
    '13:00 — Meeting with client integrity engineer on a hold list — defend the call on three rejected welds, agree on repair scope and re-inspection cycle.',
    '15:00 — Operations management: timesheet review, per-diem authorization for two technicians who arrived from out-of-state, equipment status check on the EPOCH 650s and the two RT cameras.',
    '18:00 — Night-shift handoff: 4-page brief covering outstanding holds, repair scope, schedule risks, and the open dispute with engineering on GW-22.',
  ],
  responsibilities: [
    'Lead and assign field crews — daily crew composition, shift coverage, rotation between methods, training assignments for Level I trainees.',
    'Review every report leaving the site for technical accuracy and procedural compliance before sign-off; route borderline calls to the Level III[1].',
    'Manage equipment logistics — calibration status, source utilization logs (RT), spare parts inventory, ship-in/ship-out of equipment between sites.',
    'Interface with the client\'s QA/QC organization daily — defend technical calls, negotiate scope changes, document disputes formally.',
    'Manage timesheets, per diem, travel, and lodging for the crew — coordinate with home office payroll and HR on rotation schedules.',
    'Handle safety incidents — first responder on minor injuries, JSA author for unusual scopes, incident report writer for any near-miss or recordable.',
    'Coordinate with adjacent disciplines (welding, mechanical, scaffolding, riggers) on permit scheduling — turnaround sites stack three or four permits per work front.',
    'Train and mentor senior Level IIs into supervisor-track roles.',
  ],
  pathToEntry: [
    {
      step: 1,
      title: 'Accumulate 5-10 years as a multi-method Level II',
      body: 'Most NDT supervisors come from 5-10 years of field experience as Level II in 2-3 methods. The path typically runs Level I → Level II → senior Level II → supervisor. Some supervisors come from CWI + Level II combined backgrounds.',
    },
    {
      step: 2,
      title: 'Develop soft skills — communication, conflict resolution, scheduling',
      body: 'Technical depth gets you considered; managing a crew and a client well gets you promoted. Many companies put high-performing senior Level IIs through internal "lead tech" rotations to test supervisor potential before formal promotion.',
    },
    {
      step: 3,
      title: 'Maintain and broaden NDT certifications + add credentials',
      body: 'NDT supervisors typically hold Level II in 3-4 methods (UT, MT, PT, VT) plus AWS CWI. Many add API 510/570/653 for refinery work, ISO 9712 for offshore, or NAS 410 for aerospace[2]. Some pursue ASNT Level III in their primary method during their 30s and 40s.',
    },
    {
      step: 4,
      title: 'Take supervisor-track training (OSHA 30, leadership, first aid)',
      body: 'OSHA 30 is mandatory for most construction supervisors. Most companies also provide internal leadership development, first aid/CPR, and incident response training. Independent: pursue a project management cert (CAPM, PMP) for higher-level operations roles.',
    },
  ],
  certificationsRequired: [
    {
      name: 'SNT-TC-1A Level II in 2-3 methods',
      mandatory: true,
      reason: 'The technical authority basis for reviewing crew reports[1].',
    },
    {
      name: 'OSHA 30 (construction) or equivalent safety credentials',
      mandatory: true,
      reason: 'Standard requirement for any construction-site supervisor role.',
    },
    {
      name: 'AWS CWI or API authorized inspector',
      mandatory: false,
      reason: 'Common credential layer for refinery and pipeline supervisors[3].',
    },
    {
      name: 'ASNT Level III in primary method',
      mandatory: false,
      reason: 'Required to be named as the company\'s Level III on small inspection contracts; pays significant premium.',
    },
  ],
  salaryByExperience: [
    {
      years: '0-3 (new supervisor, single-site)',
      min: 80000,
      max: 105000,
      median: 92000,
    },
    {
      years: '3-8 (multi-site, turnaround experience)',
      min: 100000,
      max: 145000,
      median: 122000,
    },
    {
      years: '8+ (senior, Level III, regional)',
      min: 130000,
      max: 195000,
      median: 158000,
    },
  ],
  industriesEmploying: [
    {
      industry: 'NDT service companies (Acuren, TEAM, Mistras, Applus+, Intertek)',
      demand: 'Very high — every major NDT service company runs supervisor structures over crew leads and technicians.',
    },
    {
      industry: 'Refinery turnaround crews',
      demand: 'Very high — turnaround supervisors are perennially short-staffed during spring/fall outage seasons.',
    },
    {
      industry: 'Pipeline construction and integrity contractors',
      demand: 'High — spread supervisors lead 10-25 inspectors on cross-country pipeline construction.',
    },
    {
      industry: 'Offshore (GoM, North Sea, West Africa, Brazil)',
      demand: 'Moderate-high — offshore supervisors handle smaller crews but face heavier regulatory scrutiny.',
    },
    {
      industry: 'Owner-side (refinery and pipeline operator integrity teams)',
      demand: 'Moderate — owner-side roles are steadier and less travel-heavy; competitive to enter.',
    },
  ],
  advancementPath:
    'NDT Supervisor → Senior/Regional Supervisor → NDT Operations Manager → QA/QC Manager → VP Quality. Many supervisors pivot to owner-side roles (refinery reliability supervisor, pipeline integrity supervisor) where the pay is steadier and travel less brutal. The lateral move into Level III opens consulting and procedure-writing work. Owner-side QA managers and Level III consultants represent the highest-pay outcomes for the supervisor track ($180-280k base + bonus).',
  remoteOrField: 'field',
  riskFactors: [
    'Crew safety accountability — supervisor signs the JSA and is named on incident reports; OSHA recordables impact your record permanently.',
    'Production pressure — clients push for faster turnarounds; the supervisor is the speed-bump and absorbs the heat.',
    'Long hours — turnaround supervisors work 14-16 hour days for 4-6 weeks; rotation between shifts can wreck sleep schedules.',
    'Travel — 180-220 nights/year in hotels is normal; family strain is real.',
    'Client politics — disputes with client QA escalate quickly; managing them without losing the contract is part of the role.',
  ],
  faqs: [
    {
      q: 'What is the difference between an NDT supervisor and an NDT manager?',
      a: 'Scope and location. An NDT supervisor leads field crews on a single project or site — typically 6-30 technicians on a refinery turnaround, pipeline spread, or fabrication shop. The supervisor is in steel-toes on the ground every day, signing reports, managing crew assignments, interfacing with the client. An NDT manager runs a region, business unit, or operations function — typically multiple project crews, P&L responsibility, hiring authority, sales support[1]. The manager is office-based with occasional site visits. Pay step: supervisor median $122k mid-career, manager median $160-180k mid-career. The transition typically happens after 8-12 years as a supervisor, often with internal promotion at a major NDT service company.',
    },
    {
      q: 'Do I need to be a Level III to supervise NDT crews?',
      a: 'No, but Level III dramatically expands what you can sign and which contracts you can run. Most NDT supervisors hold Level II in 2-3 methods and rely on a designated Level III (employed or contracted) for procedure approval, technique qualification, and certification of Level I/II personnel[1]. Many service companies operate this way for years. The benefit of supervisor + Level III is that small contracts (no separate Level III on site) become single-sign-off operations under the supervisor, which is faster and cheaper. ASNT Level III also adds technical credibility in client disputes and audit defense. Most career supervisors pursue Level III between years 8-15.',
    },
    {
      q: 'How much travel does an NDT supervisor do?',
      a: 'Travel-heavy. Typical NDT supervisors at major service companies spend 180-220 nights per year in hotels and field housing[3]. Turnaround supervisors live near refinery sites for 4-8 week stretches. Pipeline spread supervisors move with the spread across multiple states over 6-12 month construction seasons. Offshore supervisors run rotations (typically 28-on/28-off or 21-on/21-off) plus travel days. Owner-side supervisor roles (working for a single refinery or pipeline operator) cut travel dramatically — typically 30-60 nights/year — but pay 10-20% less than service-company roles. The travel toll is real: divorce rates among traveling NDT supervisors are well above the US average, and burnout is the main reason supervisors leave for owner-side or office roles.',
    },
    {
      q: 'Can I become an NDT supervisor without a degree?',
      a: 'Yes — most NDT supervisors do not hold a four-year degree. The path runs through technical training (welding school, NDT trade school, military) plus 5-10 years of field experience plus the certification stack (Level II × 2-3 methods, often AWS CWI, sometimes API or Level III). A degree helps for owner-side roles at major operators (ExxonMobil, Chevron, Marathon) who increasingly require a B.S. for inspection supervisor postings, but service-company supervisors at Acuren, TEAM, Mistras, and Applus+ are usually promoted from within based on technical credibility and crew management ability. If you eventually want NDT manager or QA manager roles ($160-220k+), a degree (or a project management cert like PMP) becomes more useful as you compete for office-track promotions.',
    },
  ],
  internalLinks: [
    { href: '/careers/ndt-technician-level-2', label: 'Level II Technician path', context: 'Where most supervisors come from.' },
    { href: '/careers/ndt-manager', label: 'NDT manager role', context: 'Next-step office-based management role.' },
    { href: '/careers/ndt-technician-level-3', label: 'Level III career path', context: 'Adjacent technical authority track.' },
    { href: '/standards/snt-tc-1a', label: 'SNT-TC-1A explained', context: 'Foundation of all NDT supervisor authority.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1 structural welding', context: 'Common code in supervisor scope.' },
    { href: '/standards/api-510', label: 'API 510 pressure vessel', context: 'Refinery supervisor code base.' },
    { href: '/free-tools/turnaround-crew-calculator', label: 'Turnaround crew sizing tool', context: 'Used for crew planning.' },
    { href: '/industries/refinery-turnaround', label: 'Refinery turnaround', context: 'Largest market for NDT supervisors.' },
    { href: '/industries/pipeline', label: 'Pipeline inspection', context: 'Major employer of spread supervisors.' },
  ],
  citations: [
    { id: 'asnt-snt-tc-1a', source: 'ASNT SNT-TC-1A (2020), §6 Personnel Qualification levels and responsibilities.' },
    { id: 'nas-410', source: 'NAS 410, Rev. 5 (2020), Certification & Qualification of Nondestructive Test Personnel (aerospace).' },
    { id: 'aws-qc1', source: 'AWS QC1:2007 (R2020), Standard for AWS Certification of Welding Inspectors.' },
    { id: 'asnt-2024-survey', source: 'ASNT 2024 Salary Survey of NDT Professionals, ASNT Materials Evaluation Vol. 82 No. 3.' },
    { id: 'bls-construction-supervisors', source: 'US Bureau of Labor Statistics, Occupational Employment and Wages, May 2023, First-Line Supervisors of Construction Trades (47-1011).' },
  ],
};

export default career;
