import type { PillarHubContent } from '../types';

const pillar: PillarHubContent = {
  slug: 'cwi-certification-pillar',
  metaTitle: 'AWS CWI Certification [2026]: Cost ($1,065), 25% Pass Rate, Exam & Prep',
  metaDescription:
    'The complete AWS Certified Welding Inspector cluster — QC1 program structure, $1,065 exam fee, 3-part exam (A/B/C), 25–30% first-attempt pass rate, eligibility matrix, prep paths, and 9-year recertification cycle.',
  heroLede:
    'The AWS Certified Welding Inspector (CWI) is the most demanding inspection credential most weld inspectors ever attempt — and it is precisely that difficulty that gives the CWI its weight in the market. The single-sitting three-part exam (Fundamentals, Practical, Code Application) sustains a first-attempt pass rate around 25–30%, the lowest of any major inspection credential in North America. The candidate who passes walks out a fully qualified visual welding inspector under AWS QC1, authorized to interpret AWS D1.1, ASME Section IX, and API 1104, sign weld inspection reports, and earn a wage premium of 18–32% over a comparable Level II NDT technician. The candidate who fails is out the $1,065 fee, the two days at the test centre, and typically four to twelve weeks of study. This hub maps the full CWI cluster — the eligibility matrix that gets you to the seat, the exam structure that decides who passes, the prep paths, the renewal clock, and how the CWI sits next to ASNT, CSWIP, and the sister AWS credentials.',
  topicOverview:
    'The CWI is administered by the American Welding Society under AWS QC1, Standard for AWS Certification of Welding Inspectors. Three credential tiers exist: CAWI (Certified Associate Welding Inspector) for candidates short on experience who work under a CWI; CWI itself for full independent inspection authority; and SCWI (Senior Certified Welding Inspector) for advanced practitioners who pass an additional exam after three years of CWI experience. The credential focuses on visual inspection of welds (it is not an NDT method certification — UT, RT, MT, PT each require separate ASNT or comparable qualification) and on the inspector\'s authority to interpret and apply welding codes. Most CWIs build their working life around AWS D1.1 (Structural Welding Code — Steel), which is the dominant US structural-steel code; specialised CWIs add D1.5 (bridges), D1.6 (stainless), D17.1 (aerospace), or move into ASME Section IX (pressure equipment) and API 1104 (pipeline) work. Eligibility is set by an education-and-experience matrix in AWS QC1 §4: a candidate with an engineering degree needs as little as one year of welding-related experience; a candidate with a high-school diploma needs five years; trades-only candidates can qualify at lower education tiers with proportionately longer experience. Near-vision Jaeger J-2 and natural or corrected color perception must be verified by an examiner-administered eye test on the day. The exam itself is a one-day, three-part sit: Part A Fundamentals (closed book, 150 questions, 2 hours), Part B Practical (using AWS-supplied weld replicas, inspection gauges, and a purpose-written Book of Specifications plus ~46 questions, 2 hours), and Part C Code Application (open book applying a chosen code volume — usually AWS D1.1 — to realistic inspection scenarios, ~50 questions, 2 hours). All three parts must be passed at 72% or above in one sitting; failing any one part means re-sitting that part (the others stand for two years). The 25–30% first-attempt pass rate is driven primarily by Part B (practical macro-etch evaluation and discontinuity sizing are the most-failed sections) and by under-prepared candidates who treat Part C as a code lookup exercise without practicing it under time pressure.',
  subPages: [
    {
      href: '/certifications/cwi-certification',
      label: 'CWI Certification — Quick Reference',
      description:
        'The summary page: fees, levels, exam structure, eligibility matrix, validity period. Use this as the at-a-glance reference; this pillar carries the depth.',
    },
    {
      href: '/methods/visual-testing',
      label: 'Visual Testing (VT) Method',
      description:
        'The NDT method a CWI applies every working day — surface discontinuities, weld geometry, profile gauges, and the acceptance-criteria language that crosses over into the exam.',
    },
    {
      href: '/pillars/weld-inspection-pillar',
      label: 'Weld Inspection — Complete Guide',
      description:
        'The wider weld-inspection cluster — codes (AWS, ASME, API), methods (VT/RT/UT/MT/PT on welds), WPS/PQR/WPQ qualification, and how the CWI fits the bigger picture.',
    },
    {
      href: '/learn/how-to-interpret-radiograph-weld-defects',
      label: 'How to Interpret Radiograph Weld Defects',
      description:
        'Defect identification — slag, porosity, LOF, undercut, crack — that overlaps Part B of the CWI exam and is needed on every interpretive call a CWI makes in the field.',
    },
    {
      href: '/standards/aws-d1-1',
      label: 'AWS D1.1 Structural Welding Code',
      description:
        'The code book most CWIs sit Part C of the exam against and use daily in structural-steel fabrication, erection, and inspection.',
    },
    {
      href: '/standards/api-1104',
      label: 'API 1104 (Pipeline Welding)',
      description:
        'The pipeline-side code path — pipeline CWIs sit Part C against API 1104 instead of D1.1 and work on cross-country and gathering-line construction.',
    },
    {
      href: '/tools/certification-renewal-tracker',
      label: 'Certification Renewal Tracker',
      description:
        'Calculator that tracks the 3-year CWI renewal window (40 PDH) and the 9-year recertification milestone (80 PDH or full Part B retest).',
    },
    {
      href: '/tools/weld-cost',
      label: 'Weld Inspection Cost Calculator',
      description:
        'Per-joint cost estimator for the work a CWI prices and supervises — UT, RT, MT, PT, PAUT — alongside the visual inspection.',
    },
  ],
  expertCommentary:
    'Three things separate the candidates who pass CWI on first attempt from the 70%+ who do not. First, Part B preparation is not optional and cannot be replaced with code study. The AWS Body of Knowledge Part B carries a Book of Specifications that the candidate has never seen until exam morning — and the candidate is asked to apply it to physical weld replicas with inspection gauges. Sitting it cold, even with deep field experience, almost guarantees failure. The five-day AWS seminar is the most reliable Part B preparation path; self-study works only with realistic practice materials and an inspection-gauge kit (~$300). Second, Part C is a code application exam, not a code lookup exam. Candidates who plan to "just look it up" run out of time and fail by minutes. Sticky-tabbing the D1.1 code book, building a personal index of frequently-cited clauses, and practicing 4 timed mock papers before the exam moves the average candidate from a 60% to an 80% Part C score. Third, the math in Part A is fundamentals — heat input, dilution, electrode efficiency, area-of-fusion, weld-volume calculations — and is the section trades-only candidates underestimate. The exam allows a basic calculator only; no smartphone. A week of weld-math problem sets is the cheapest pass-rate insurance on the exam. The 9-year recertification cycle compounds this: a CWI who has not opened the D1.1 code book in five years and is faced with the full Part B retest at recert almost always fails. The 80-PDH continuing-education path exists specifically to spare working CWIs that ordeal — log the credits.',
  externalResources: [
    { label: 'AWS QC1 — Standard for AWS Certification of Welding Inspectors', url: 'https://www.aws.org/certification/page/certified-welding-inspector' },
    { label: 'AWS CWI Body of Knowledge (Parts A, B, C)', url: 'https://www.aws.org/certification/page/cwi-body-of-knowledge' },
    { label: 'AWS D1.1 Structural Welding Code — Steel', url: 'https://www.aws.org/standards/page/aws-d11' },
    { label: 'AWS Five-Day CWI Seminar', url: 'https://www.aws.org/education/page/seminars' },
    { label: 'ASME Section IX — Welding, Brazing & Fusing Qualifications', url: 'https://www.asme.org/codes-standards/find-codes-standards/bpvc-ix-bpvc-section-ix-welding-brazing-and-fusing-qualifications' },
  ],
  faqs: [
    {
      q: 'How much does the CWI exam cost in 2026?',
      a: 'The AWS CWI exam fee in 2026 is $1,065 for AWS members and $1,340 for non-members. That covers the one-day three-part sit only. Add the AWS Five-Day CWI Seminar ($1,895 member / $2,375 non-member) and most candidates spend a total of $1,500–$3,500 to walk into the seat prepared. Failing one part and re-sitting it costs $475 for the single part. The fully-loaded "go from zero to certified" budget for a self-funded candidate is typically $2,500–$4,000 when textbook, code book ($600 for current AWS D1.1), inspection gauge kit, and time off work are included.',
    },
    {
      q: 'What is the CWI exam pass rate?',
      a: 'AWS does not publish a single headline pass-rate figure, but the consistently reported first-attempt pass rate across industry sources is 25–30%. Part B (practical) is the most-failed section — its all-or-nothing format and the unfamiliar AWS Book of Specifications catch candidates who relied on field experience without exam-specific practice. Candidates who complete the AWS Five-Day Seminar before sitting report first-attempt pass rates in the 55–70% range, which is roughly double the unprepared baseline.',
    },
    {
      q: 'How long does it take to prepare for the CWI exam?',
      a: 'The realistic preparation window is 8–16 weeks of structured study at roughly 8–12 hours per week — 80–200 total hours. Less than 8 weeks is feasible only for candidates already deep in AWS D1.1 daily work; more than 16 weeks usually means the candidate has lost momentum and is forgetting the early material faster than they are learning the late material. The compressed path is 2 weeks of self-study plus the AWS Five-Day Seminar in the week immediately before the exam — high-cost but with the highest published pass-rate uplift.',
    },
    {
      q: 'What is the difference between CAWI, CWI, and SCWI?',
      a: 'CAWI (Certified Associate Welding Inspector) is the entry tier for candidates who pass the exam but do not yet meet the full experience requirement for CWI. A CAWI works under the direct supervision of a CWI and cannot sign inspection reports independently. CWI is the full credential — independent inspection authority, code interpretation, and report-signing under AWS QC1. SCWI (Senior CWI) is the advanced tier, requiring three additional years as a CWI, passing the SCWI exam (which adds management-of-inspection topics and a deeper code-interpretation set), and is typically held by inspection supervisors and program managers rather than line inspectors.',
    },
    {
      q: 'How does the CWI compare to ASNT certification?',
      a: 'They are complementary, not substitutes. ASNT certifies NDT method qualification (UT, RT, MT, PT, VT, EC, NR) under SNT-TC-1A or CP-189 — the inspector is qualified to perform that test method to a specific procedure. CWI certifies the inspector\'s authority to interpret weld inspection results against AWS, ASME, or API codes — it is a code-interpretation credential built around visual testing. A senior weld inspector typically holds both: ASNT Level II or III in the relevant NDT methods plus the CWI for code interpretation and report signature. Pipeline contractors often add CSWIP 3.1 or 3.2 for international pipeline work.',
    },
    {
      q: 'What is the CWI salary in 2026?',
      a: 'Median CWI total compensation in the US in 2026 sits at $92,000–$98,000 according to AWS member surveys and the IndustrialNDT Salary Survey, with regional spread from ~$72,000 (low-cost-of-living interior US) to ~$135,000 (Gulf Coast refinery turnaround work + overtime). CWIs in offshore, refinery turnaround, and pipeline construction routinely exceed $150,000 when overtime, per-diem, and travel allowances are included. SCWIs and CWIs who stack ASNT Level III with API 510/570/653 add another 20–35% on top of the base CWI figure. The wage premium over a non-CWI Level II welding inspector is 18–32%.',
    },
    {
      q: 'How do I renew my CWI before it expires?',
      a: 'CWI runs on a 3-year renewal cycle and a 9-year recertification milestone. At each 3-year renewal the CWI submits 40 PDH (Professional Development Hours) plus the renewal fee (~$300). At year 9 the CWI chooses between two recertification paths: (a) submit 80 PDH plus a code-volume update form, or (b) re-sit the full Part B Practical exam. The vast majority of working CWIs take path (a) because Part B retest pass rates at the 9-year mark are reported below 55% — out-of-practice CWIs fail the macro-etch evaluation. PDH credits come from AWS-approved seminars, in-house training, university coursework, conference attendance, and peer-reviewed publications. The certification-renewal-tracker tool surfaces the windows and credit counts.',
    },
  ],
  internalLinks: [
    { href: '/certifications/cwi-certification', label: 'CWI quick-reference cert page', context: 'cert' },
    { href: '/methods/visual-testing', label: 'Visual testing method', context: 'method' },
    { href: '/pillars/weld-inspection-pillar', label: 'Weld inspection pillar', context: 'pillar' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1 structural welding code', context: 'standard' },
    { href: '/standards/api-1104', label: 'API 1104 pipeline welding code', context: 'standard' },
    { href: '/tools/certification-renewal-tracker', label: 'CWI renewal tracker tool', context: 'tool' },
    { href: '/tools/weld-cost', label: 'Weld inspection cost calculator', context: 'tool' },
    { href: '/learn/how-to-interpret-radiograph-weld-defects', label: 'How to interpret radiograph weld defects', context: 'learn' },
  ],
  citations: [
    { id: 'aws-qc1', source: 'AWS QC1:2016 — Standard for AWS Certification of Welding Inspectors', url: 'https://www.aws.org/certification' },
    { id: 'aws-bok', source: 'AWS CWI Body of Knowledge — Parts A, B, C (current edition)', url: 'https://www.aws.org/certification/page/cwi-body-of-knowledge' },
    { id: 'aws-d1-1', source: 'AWS D1.1/D1.1M — Structural Welding Code — Steel, current edition', url: 'https://www.aws.org/standards/page/aws-d11' },
    { id: 'asme-ix', source: 'ASME Boiler and Pressure Vessel Code, Section IX — Welding, Brazing, and Fusing Qualifications, 2023 ed.' },
    { id: 'api-1104', source: 'API Standard 1104 — Welding of Pipelines and Related Facilities, 22nd ed., 2023' },
    { id: 'industrial-ndt-salary', source: 'IndustrialNDT Salary Survey 2024–2026 (US weld inspector compensation)', url: 'https://www.industrialndt.com' },
  ],
};

export default pillar;
