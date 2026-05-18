import type { CareerContent } from '../types';

const career: CareerContent = {
  slug: 'ndt-manager',
  title: 'NDT Manager — Career Guide',
  metaTitle: 'NDT Manager: Pay, Path, and P&L Responsibility',
  metaDescription:
    'NDT managers run regional or business-unit operations: P&L, hiring, sales support, audits. Honest 2024-2026 US pay, the credential stack, and the move into VP roles.',
  heroLede:
    'An NDT manager at a major service company\'s Houston region office runs Monday morning differently than supervisors and technicians: 07:30 forecast meeting with sales on the next four turnaround bids, 09:00 review of last week\'s utilization across 142 inspectors and 38 active projects, 10:30 phone call defending a Nadcap audit finding at the aerospace shop in Fort Worth, 13:00 hiring panel on three Level II UT candidates, 15:30 client lunch with a refinery integrity manager about a multi-year MSA renewal[1]. The NDT manager runs the business: P&L, headcount, equipment capex, sales pipeline, audit readiness. The technical authority sits with the Level IIIs; the operational authority sits with the manager.',
  whatYouDo:
    'An NDT manager has profit-and-loss responsibility for a region, business unit, or service line. Daily work: forecasting revenue and utilization, hiring and developing supervisors and senior technicians, managing equipment capex (UT systems, RT cameras, PAUT units), supporting sales on technical scoping and pricing, defending the operations in client audits and regulatory inspections, maintaining the company\'s written practice and accreditations[1]. The manager interfaces with the senior Level III on technical strategy, with HR on workforce planning, and with operations leadership on multi-region resource sharing.',
  typicalDay: [
    '06:30 — Email and phone catch-up, review overnight reports from 4 active turnaround sites and 12 routine inspection projects.',
    '07:30 — Sales forecast meeting: review the bid pipeline for spring turnaround season, identify crew gaps and equipment shortfalls; commit on three pending proposals.',
    '09:00 — Utilization review: examine last week\'s billable hours per inspector, identify underutilized crews and overloaded supervisors, plan crew movements.',
    '10:30 — Nadcap audit call with the aerospace QA lead, the company\'s Level III, and the Nadcap auditor — defend a finding on UV intensity records.',
    '12:30 — Working lunch with a refinery integrity manager from a key client about the MSA renewal scope and pricing.',
    '14:00 — Hiring panel: three Level II UT candidates and one supervisor candidate; final interviews and offer authorization.',
    '15:30 — Equipment capex review: $410k request for two new PAUT systems and a digital radiography upgrade; review ROI model with finance.',
    '17:00 — Email triage, internal report to the regional VP on the week\'s utilization, hiring, and key wins/losses.',
  ],
  responsibilities: [
    'Own P&L for a region, business unit, or service line — revenue forecasting, cost management, utilization, billable hours, margins[5].',
    'Hire, develop, and discipline supervisors and senior technicians; partner with HR on workforce planning and retention.',
    'Maintain the company\'s written practice for NDT personnel qualification per SNT-TC-1A or CP-189; partner with the company Level III on technical updates[1].',
    'Manage equipment capex and lifecycle — flaw detectors, RT cameras, PAUT systems, calibration blocks; partner with operations on rentals and shared assets.',
    'Defend the operations in client audits (Nadcap, ASME stamp surveys, ISO 9001, API Q1) and regulatory audits (NRC, PHMSA, OSHA).',
    'Support sales on technical scoping and pricing — review proposals over $250k, attend client meetings on strategic accounts.',
    'Drive process improvements — reduce report turnaround time, improve safety record, standardize procedures across sites.',
    'Represent the company at industry events (ASNT, AWS, AMPP), present at regional NDT conferences, build referral relationships.',
  ],
  pathToEntry: [
    {
      step: 1,
      title: 'Build 8-12 years field experience as a Level II then supervisor',
      body: 'Most NDT managers come from the supervisor track. The path typically runs Level II → senior Level II → supervisor → regional supervisor → manager. Some come from the QA/QC management side with engineering degrees and shorter NDT field time.',
    },
    {
      step: 2,
      title: 'Demonstrate operational performance — utilization, safety, P&L impact',
      body: 'Manager promotions hinge on numbers: did your crews bill 80%+ utilization, did you avoid recordable incidents, did you grow revenue at your site or region? Document this for promotion conversations.',
    },
    {
      step: 3,
      title: 'Earn ASNT Level III + AWS CWI + API authorized inspector',
      body: 'The credential stack for NDT managers usually includes Level III in a primary method, AWS CWI, and at least one API authorized inspector cert[3]. Some managers add an MBA or a project management cert (PMP, CAPM) to compete for higher-level operations roles.',
    },
    {
      step: 4,
      title: 'Take internal leadership development; build commercial acumen',
      body: 'Major NDT service companies run formal leadership programs (Acuren NDT University, TEAM Leadership Academy). External programs (Wharton Executive Education, AMA management courses) help for candidates eyeing director or VP roles.',
    },
  ],
  certificationsRequired: [
    {
      name: 'SNT-TC-1A or CP-189 Level II / III in primary methods',
      mandatory: true,
      reason: 'Technical authority basis for signing off the company\'s written practice and audit responses[1].',
    },
    {
      name: 'OSHA 30 and equivalent safety credentials',
      mandatory: true,
      reason: 'Required for any field-adjacent management role.',
    },
    {
      name: 'AWS CWI + API authorized inspector',
      mandatory: false,
      reason: 'Standard credential layer for refinery and pipeline managers; expands the scope the manager can sign off on[3].',
    },
    {
      name: 'PMP (Project Management Professional) or MBA',
      mandatory: false,
      reason: 'Career accelerator for managers eyeing director, VP, or business-unit GM roles.',
    },
  ],
  salaryByExperience: [
    {
      years: '0-3 (new manager, single region/site)',
      min: 110000,
      max: 145000,
      median: 128000,
    },
    {
      years: '3-8 (regional, P&L responsibility)',
      min: 135000,
      max: 195000,
      median: 162000,
    },
    {
      years: '8+ (senior, multi-region or business-unit)',
      min: 175000,
      max: 285000,
      median: 215000,
    },
  ],
  industriesEmploying: [
    {
      industry: 'NDT service companies (Acuren, TEAM, Mistras, Applus+, Intertek, SGS)',
      demand: 'Very high — major service companies maintain regional management structures.',
    },
    {
      industry: 'Owner-side operators (ExxonMobil, Chevron, Marathon, Phillips 66)',
      demand: 'High — refinery and pipeline integrity organizations include NDT/inspection management at the unit and complex level.',
    },
    {
      industry: 'EPC firms (Bechtel, Worley, Fluor, KBR, McDermott)',
      demand: 'Moderate — capital projects with major NDT scope require dedicated NDT management.',
    },
    {
      industry: 'Aerospace OEMs and MRO (Boeing, Lockheed, Pratt, Spirit, GE Aviation)',
      demand: 'Moderate — Nadcap-audited shops require NDT management with NAS 410 depth[2].',
    },
    {
      industry: 'Power generation (utility integrity organizations)',
      demand: 'Moderate — nuclear and fossil utilities maintain NDT management for ASME XI ISI programs.',
    },
  ],
  advancementPath:
    'NDT Manager → Regional Manager → Director of NDT Operations → VP Quality / VP Operations → SVP / President of Service Line. Many NDT managers pivot to owner-side roles (refinery integrity manager, pipeline integrity manager) where the title is similar but the work is asset-owner rather than service-provider. The top of the path is COO or CEO of an NDT service company — many CEOs of small-to-mid NDT firms came up through the manager track. Independent consulting on operations strategy is a niche but high-pay end-of-career option for managers with strong industry networks.',
  remoteOrField: 'hybrid',
  riskFactors: [
    'P&L pressure — manager bonus and tenure depend on hitting revenue and margin targets quarterly.',
    'Hiring market — the NDT technician shortage means managers spend 20-30% of their time on recruiting and retention.',
    'Audit accountability — Nadcap, ISO, API, and regulator audits land on the manager\'s desk; findings can suspend operations.',
    'Travel — less than supervisor (50-100 nights/year) but still significant.',
    'Burnout — managing 50-200 people across multiple sites is mentally heavy; turnover at the manager level in NDT is high (3-5 year average tenure at one company).',
  ],
  faqs: [
    {
      q: 'What is the difference between an NDT manager and a QA/QC manager?',
      a: 'NDT manager owns the NDT service operation specifically — crews, equipment, procedures, P&L for the NDT business. QA/QC manager owns the broader quality function for an asset owner or fabricator — including weld inspection (NDT and visual), procedure compliance, supplier quality, document control[1]. In a service company, the NDT manager is the operations head and reports to a VP or COO. In an asset owner organization, the QA/QC manager is broader and may include NDT as one of several reporting functions (welding, materials, document control). Pay is similar at mid-career ($130-180k base) but QA/QC manager roles on the owner side often include higher bonus and equity exposure.',
    },
    {
      q: 'Do I need a degree to be an NDT manager?',
      a: 'Increasingly yes for major service companies, but historically no. Mid-size and smaller NDT service companies (independent operators with 50-200 employees) routinely promote senior supervisors into manager roles without a degree, especially when the candidate has Level III and CWI credentials. Large multinationals (Acuren, Applus+, SGS, Bureau Veritas) increasingly require a B.S. for regional manager and above, and an MBA or equivalent for director and VP roles[1]. Owner-side NDT/integrity manager roles at refineries and pipelines almost always require a B.S. in engineering plus the technical certs. The fastest path to manager without a degree is to start with a top-tier NDT service company, hit Level III, and build a strong P&L track record at supervisor level.',
    },
    {
      q: 'How much does an NDT manager earn vs an NDT supervisor?',
      a: 'In the US 2024-2026 market, NDT managers earn 30-50% more on base than NDT supervisors[5]. Median supervisor base $122k vs median manager base $162k mid-career. The bigger spread is in total compensation: managers typically get 15-30% bonus (driven by P&L performance) plus stock or LTI in larger companies, while supervisors get OT and per diem (taxable but cash). Senior NDT managers running multi-region P&L ($30M+ revenue) clear $200-280k in base plus bonus. The supervisor-to-manager transition often comes with a 25-40% raise plus a step into office-based, less travel-heavy work — which trades the high per-diem upside for steadier comp and quality of life.',
    },
    {
      q: 'What metrics matter most for NDT manager promotion?',
      a: 'Three metrics dominate. First, utilization — billable hours as a percentage of available technician hours. Target is 75-85% for routine work, higher for turnaround crews; under 70% triggers crew rebalancing. Second, safety record — Total Recordable Incident Rate (TRIR) under 1.0 is good for NDT operations; over 2.0 is concerning. OSHA recordables and PHMSA-reportable incidents kill manager promotions[3]. Third, P&L margin — service-line gross margin targets vary (25-40% gross is typical for major NDT service companies), and the manager owns the levers (pricing, labor mix, equipment utilization). Beyond those, audit performance (clean Nadcap and ISO audits), client retention rate, and key-hire success round out the promotion case.',
    },
  ],
  internalLinks: [
    { href: '/careers/ndt-supervisor', label: 'NDT supervisor path', context: 'Where most NDT managers come from.' },
    { href: '/careers/quality-assurance-manager', label: 'QA/QC manager path', context: 'Adjacent role on the asset-owner side.' },
    { href: '/careers/ndt-technician-level-3', label: 'Level III career path', context: 'Common technical credential for managers.' },
    { href: '/standards/snt-tc-1a', label: 'SNT-TC-1A explained', context: 'Foundation of the company written practice managers maintain.' },
    { href: '/standards/asnt-cp-189', label: 'ASNT CP-189', context: 'Stricter alternative used in nuclear and aerospace.' },
    { href: '/standards/iso-9712', label: 'ISO 9712 explained', context: 'Increasingly required for international operations.' },
    { href: '/free-tools/utilization-tracker', label: 'Utilization tracker tool', context: 'Helps managers monitor crew billable hours.' },
    { href: '/industries/oil-and-gas', label: 'Oil & gas NDT', context: 'Primary market for NDT managers.' },
    { href: '/industries/aerospace', label: 'Aerospace NDT', context: 'Strictest audit environment for NDT managers.' },
  ],
  citations: [
    { id: 'asnt-snt-tc-1a', source: 'ASNT SNT-TC-1A (2020), §6 Personnel Qualification levels and responsibilities.' },
    { id: 'nas-410', source: 'NAS 410, Rev. 5 (2020), Certification & Qualification of Nondestructive Test Personnel (aerospace).' },
    { id: 'aws-qc1', source: 'AWS QC1:2007 (R2020), Standard for AWS Certification of Welding Inspectors.' },
    { id: 'bls-natural-sciences-managers', source: 'US BLS, Occupational Employment and Wages May 2023, Natural Sciences Managers (11-9121) and Industrial Production Managers (11-3051).' },
    { id: 'asnt-2024-survey', source: 'ASNT 2024 Salary Survey of NDT Professionals, ASNT Materials Evaluation Vol. 82 No. 3.' },
  ],
};

export default career;
