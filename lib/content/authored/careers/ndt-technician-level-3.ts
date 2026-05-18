import type { CareerContent } from '../types';

const career: CareerContent = {
  slug: 'ndt-technician-level-3',
  title: 'NDT Technician Level III — Career Guide',
  metaTitle: 'NDT Level III: Pay, Certs, Authority & Day-to-Day',
  metaDescription:
    'NDT Level III is the procedure-writing, audit-defending, certification-issuing role. Honest 2024-2026 US pay bands, ASNT exam path, and the move into consulting.',
  heroLede:
    'An ASNT Level III in UT consulting for a Houston EPC starts the morning reviewing a 14-page procedure draft for PAUT examination of a 1.5" wall reactor — checking that the focal law specification matches the geometry, that the calibration block reference notch sizes meet ASME V Article 4 mandatory appendix VIII, and that the qualified personnel listing actually includes a CP-189 PAUT Level II[1]. By 10 AM the Level III is on a call defending a missed indication finding from a Nadcap aerospace audit, and by 14:00 is signing off on Level II promotion exams for two technicians at the affiliated service company. The Level III is the technical authority of record — every procedure, every certification, every audit response routes through this signature.',
  whatYouDo:
    'A Level III is responsible for the technical correctness and adequacy of NDT procedures and personnel. You write and approve procedures, qualify techniques, certify Level I and II personnel under your employer\'s written practice, defend the program in audits (Nadcap, ISO 9001, API Q1, Bureau Veritas, ABS, Lloyd\'s), and serve as the named expert on the inspection program[1]. You may or may not do field inspection — many Level IIIs split time 50/50 between office (procedure development, audit response, training) and field (technique trials, complex defect characterization).',
  typicalDay: [
    '07:00 — Review overnight inspection reports from three sites, flag two indications that need Level III concurrence before the client accepts the call.',
    '08:30 — Draft response to a Nadcap NDT audit finding on traceability of UV intensity readings — write a corrective action, attach the calibration record evidence, update the procedure to close the gap.',
    '10:30 — Conduct Level II practical exam for a candidate UT inspector: hand them an unknown specimen with seeded EDM notches, time the setup and report, mark the practical exam form per CP-189 §8[1].',
    '12:30 — Working lunch with an asset-owner client reviewing a proposed PAUT inspection plan for a high-temperature hydrogen attack survey on a hydrotreater shell[2].',
    '14:00 — Witness a procedure qualification on coupons: PAUT 64-element 5MHz probe on a 50mm carbon steel weld with EDM notches at 10%, 20%, 30% TWE. Verify detection at the lowest defect, record the technique sheet.',
    '16:00 — Approve four technique sheets, sign two new Level II certifications, post the day\'s revisions to the controlled document system.',
    '17:30 — Phone call with a litigation attorney on an old offshore pipeline failure — the Level III is being deposed as an expert witness on the inspection program in place at the time of failure.',
  ],
  responsibilities: [
    'Write, review, approve, and revise NDT procedures within the scope of the employer\'s written practice and the governing code (ASME V, AWS D1.1, API 1104, ASTM E1417, etc.)[1].',
    'Qualify techniques: demonstrate that a technique detects the smallest required defect on representative coupons, document the parameters, and approve for production use per ASME V T-150 / T-461.',
    'Certify Level I and II personnel — administer training, evaluate exams, sign the certification record, and maintain the audit-ready file.',
    'Serve as the technical contact for external audits: Nadcap, ISO 9001, API Q1, ASME stamp surveys, ABS/Lloyd\'s/BV surveys. Most audit findings are Level III writeups.',
    'Resolve technical disputes between the inspection contractor and the asset owner — final call on whether an indication is acceptable rests with the Level III when codes leave room for engineering judgment.',
    'Train and mentor inspection staff, deliver formal training courses, and maintain the training records that audit teams inspect first.',
    'Stay current on code changes — ASME publishes Section V revisions every 2 years; API publishes new editions every 4-5 years. The Level III is the person who reads them and updates procedures.',
    'Defend the program in litigation — when an asset fails, depositions and expert witness testimony often land on the Level III who signed the procedure.',
  ],
  pathToEntry: [
    {
      step: 1,
      title: 'Hold Level II in at least one method for 4+ years',
      body: 'There is no shortcut. SNT-TC-1A recommends 4+ years of Level II experience in the method, plus significant breadth in adjacent methods[1]. Most successful Level III candidates have 6-10 years of multi-method Level II experience.',
    },
    {
      step: 2,
      title: 'Pass the ASNT Level III Basic exam',
      body: 'The Basic exam covers metallurgy/processes, applicable codes/standards, and a working knowledge of all primary NDT methods. ~135 questions, 4 hours, 70% pass mark. ASNT publishes the body of knowledge; most candidates study 100-200 hours over 3-6 months.',
    },
    {
      step: 3,
      title: 'Pass the ASNT Level III Method exam(s)',
      body: 'Separate exam per method — UT, RT, MT, PT, ET, VT, AE, IR, LT each has its own Method exam (~135 questions, 4 hours). Pass each method exam to claim Level III in that method[1]. ASNT also offers PAUT and TOFD specialty endorsements.',
    },
    {
      step: 4,
      title: 'Get certified — employer-based or via ACCP',
      body: 'Once you hold ASNT Level III paperwork in a method, an employer can name you their Level III in that method under SNT-TC-1A. ACCP (ASNT Central Certification Program) provides a portable Level III credential including a practical examination component — more rigorous but more credible across employers.',
    },
    {
      step: 5,
      title: 'Renew every 5 years',
      body: 'ASNT Level III renews every 5 years with continuing education points (CEPs) and continued professional activity, or by re-examination. The eye exam is annual.',
    },
  ],
  certificationsRequired: [
    {
      name: 'ASNT Level III in the named method(s)',
      mandatory: true,
      reason: 'The credential of record. Without it, you cannot legally sign as Level III in audited programs[1].',
    },
    {
      name: 'ASNT ACCP Level III (portable third-party cert)',
      mandatory: false,
      reason: 'Recommended for consultants. Some asset owners (especially nuclear and aerospace) require ACCP over employer-based.',
    },
    {
      name: 'AWS CWI (Certified Welding Inspector)',
      mandatory: false,
      reason: 'Common companion cert for refinery, structural, and pipeline Level IIIs since most work intersects weld inspection.',
    },
    {
      name: 'API authorized inspector (510, 570, or 653)',
      mandatory: false,
      reason: 'For refinery and tank consulting work, an API cert layered on top of Level III opens commercial doors.',
    },
  ],
  salaryByExperience: [
    {
      years: 'New Level III, 1 method',
      min: 110000,
      max: 145000,
      median: 128000,
    },
    {
      years: 'Multi-method Level III, 3-8 yrs',
      min: 135000,
      max: 185000,
      median: 158000,
    },
    {
      years: 'Senior Level III / consultant',
      min: 165000,
      max: 280000,
      median: 215000,
    },
  ],
  industriesEmploying: [
    {
      industry: 'NDT service companies (Acuren, TEAM, Mistras, Applus+, Intertek)',
      demand: 'Very high — every NDT service company needs at least one Level III per method offered. Larger shops carry 4-8 Level IIIs.',
    },
    {
      industry: 'Asset owners (refineries, pipelines, utilities, aerospace OEMs)',
      demand: 'High — owner-side Level IIIs set inspection requirements and audit contractors. Pay is steady, hours are reasonable.',
    },
    {
      industry: 'Independent consulting (single shingle or small firm)',
      demand: 'Steady — established consultants bill $150-$400/hr; the path requires 10+ years of credibility and a client book.',
    },
    {
      industry: 'EPC firms (Bechtel, Worley, Fluor, KBR, McDermott)',
      demand: 'Moderate — project-based, often as part of QA/QC team on capital projects. Mid-six-figure base + assignment uplift.',
    },
    {
      industry: 'Training providers and academia',
      demand: 'Niche — Hellier NDT, Lavender, TWI, ASNT staff positions, and community college NDT program leads.',
    },
  ],
  advancementPath:
    'Level III is itself a senior career destination. Lateral moves: add methods (most Level IIIs hold 2-4 method endorsements), pivot into engineering (Inspection Engineer or NDE Engineer roles often pair Level III with a PE in mechanical or metallurgical), or commercial (sales engineer, business development for an NDT service co). Vertical: NDT Manager → QA Manager → VP Quality. The most lucrative path is independent consulting after 10+ years — billing $200-400/hr for procedure development, expert witness, and audit support.',
  remoteOrField: 'hybrid',
  riskFactors: [
    'Legal liability — your signature on a procedure or certification is the document examined when assets fail. Errors & Omissions insurance is standard for independent Level IIIs.',
    'Audit pressure — Nadcap and nuclear audits routinely find Level III documentation gaps that block production until closed.',
    'Knowledge-keeping load — staying current on ASME, API, AWS, ISO, NAS, NACE/AMPP code changes is unpaid time and never ends.',
    'Travel for technique trials, audits, and litigation — less than a Level II but still 30-60 nights/year for most.',
    'Expert witness work — depositions and trial appearances can stretch over years and emotionally drain experienced engineers.',
  ],
  faqs: [
    {
      q: 'How long does it take to get to Level III?',
      a: 'Realistically 8-12 years from entry. Plan: 1-2 years as Level I, 3-5 years as single-method Level II, 2-4 years as multi-method Level II, then sit the ASNT Basic and Method exams. SNT-TC-1A only requires 4 years of Level II equivalent experience to sit the exams[1], but most successful candidates have broader exposure. The exams themselves take 3-6 months of focused study. Fast tracks exist — military NDE programs and aerospace MRO experience compress the timeline — but skipping the OJT depth shows up later in your ability to write defensible procedures and defend them in audits.',
    },
    {
      q: 'Is ASNT Level III the same as ACCP Level III?',
      a: 'No. ASNT publishes two distinct Level III credentials. The "ASNT Level III" certification is awarded after passing the Basic and Method written exams — it certifies your knowledge, and your employer then names you their Level III under SNT-TC-1A. ACCP (ASNT Central Certification Program) Level III adds a practical examination component administered by ASNT, making it a portable third-party credential more aligned with ISO 9712[1][3]. Many consultants hold both. Nuclear, aerospace, and DOE contracts increasingly require ACCP over employer-based Level III. The exam fees combined run $1,500-$3,500.',
    },
    {
      q: 'Can a Level III work in methods they aren\'t personally certified in?',
      a: 'Only under the supervision of another Level III certified in that method. SNT-TC-1A and CP-189 are explicit: the Level III approving a procedure must be certified in the relevant method[1]. A UT Level III cannot approve an RT procedure. In practice, small companies with one or two Level IIIs cover gaps by contracting an outside Level III for the methods they lack — this is documented in the written practice. The "outside Level III" arrangement is one of the steadiest consulting revenue streams in the industry; many independent Level IIIs cover 3-5 small NDT companies on retainer.',
    },
    {
      q: 'How much does an NDT Level III actually earn?',
      a: 'Per the 2024 ASNT salary survey and industry reporting, US Level III base compensation runs $110-$185k for employed positions, with multi-method senior Level IIIs at $160-220k base plus bonus[5]. Independent consultants bill $150-$400/hr — a busy consultant clears $250k-$400k+ annually. Expert witness work pays $250-$600/hr but is irregular. The salary curve is steeper for Level IIIs who add adjacent credentials: AWS CWI, API authorized inspector, PE in mechanical or metallurgical engineering. The highest earners pair Level III with a CEO/owner role at an NDT service company.',
    },
  ],
  internalLinks: [
    { href: '/careers/ndt-technician-level-2', label: 'Level II career path', context: 'The role most Level III candidates spend 4-8 years in.' },
    { href: '/careers/ndt-consultant', label: 'NDT consultant path', context: 'Where many Level IIIs end up after 10+ years.' },
    { href: '/careers/ndt-trainer', label: 'NDT trainer role', context: 'Adjacent path leveraging Level III certification authority.' },
    { href: '/standards/snt-tc-1a', label: 'SNT-TC-1A explained', context: 'The recommended practice governing certification.' },
    { href: '/standards/asnt-cp-189', label: 'ASNT CP-189 standard', context: 'Stricter alternative to SNT-TC-1A.' },
    { href: '/standards/asme-section-v', label: 'ASME Section V', context: 'The primary code Level IIIs work to in the US.' },
    { href: '/free-tools/procedure-template-generator', label: 'Procedure template generator', context: 'Starting template for Level III procedure development.' },
    { href: '/learn/phased-array-ultrasonic-testing', label: 'PAUT primer', context: 'Top advanced specialty for Level III procedure work.' },
    { href: '/industries/aerospace', label: 'Aerospace NDT', context: 'Strictest Level III audit environment under NAS 410.' },
  ],
  citations: [
    { id: 'asnt-snt-tc-1a', source: 'ASNT SNT-TC-1A (2020), §6.5 Level III, §9 Certification, Tables 6.3.1A/B/C.' },
    { id: 'asme-v', source: 'ASME Boiler & Pressure Vessel Code, Section V (2023), Article 1 General Requirements, Article 4 Ultrasonic Examination Methods for Welds.' },
    { id: 'iso-9712', source: 'ISO 9712:2021, §6.6 Level 3 qualifications.' },
    { id: 'asnt-cp-189', source: 'ASNT CP-189-2020, Standard for Qualification and Certification of Nondestructive Testing Personnel.' },
    { id: 'asnt-salary-survey-2024', source: 'ASNT 2024 Salary Survey of NDT Professionals, ASNT Materials Evaluation, Vol. 82 No. 3 (March 2024).' },
  ],
};

export default career;
