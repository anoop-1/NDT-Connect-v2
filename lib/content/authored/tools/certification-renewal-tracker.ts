import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'certification-renewal-tracker',
  name: 'NDT Certification Renewal Tracker',
  category: 'planning',
  inputs: [
    { id: 'certBody', label: 'Certifying body (ASNT, AWS, API, PCN, ISO)', type: 'select' },
    { id: 'certType', label: 'Certification type (CWI, API 510/570/653, PCN Level II UT, etc.)', type: 'select' },
    { id: 'issueDate', label: 'Date originally issued', type: 'text' },
    { id: 'lastRenewal', label: 'Date of last renewal/recertification', type: 'text' },
  ],
  outputs: [
    { id: 'expiryDate', label: 'Next expiry date' },
    { id: 'renewalWindow', label: 'Renewal window opens' },
    { id: 'recertWindow', label: 'Recertification (longer cycle) due' },
    { id: 'requiredAction', label: 'Required action (renew / recertify / retest)' },
    { id: 'hoursRequired', label: 'Continuing education hours required' },
  ],
  metaTitle: 'NDT Certification Renewal Tracker [2026]: ASNT, AWS CWI, API 510/570/653',
  metaDescription:
    'Track NDT certification expiry and renewal windows: ASNT Level II/III (5-yr), AWS CWI (3+9 yr), API 510/570/653 (3-yr), PCN, ISO 9712. Required CE hours per cert.',
  heroLede:
    'Letting an API 570 certificate lapse costs an inspector roughly $1,200 in re-exam fees and 3 months of being un-deployable on TAR work. Letting a Level II UT cert lapse on a 12-person crew costs the contractor a six-figure shift on turnaround season. This tracker calculates the expiry date for the major NDT certifications (ASNT SNT-TC-1A, AWS CWI, API 510/570/653, PCN, ISO 9712), surfaces the renewal window (when paperwork can be filed), and flags the longer recertification cycle (when a full retest is required).',
  howItWorks:
    'Each certifying body publishes its renewal cadence in its own program manual. ASNT SNT-TC-1A recommends Level I and II renew every 5 years (employer-administered recertification with continuing education, eye exam, and proficiency demonstration); Level III renews every 5 years via ASNT-administered exam or continuing-education path. AWS CWI runs a 3-year renewal with 9-year recertification (40 hours CE for renewal; full retest at year 9 unless the recertification-by-CE path is taken). API 510, 570, 653, 580, 1163 all run on a 3-year cycle with continuing-education credits plus an open-book recertification exam. PCN runs 5-year recertification (full exam). ISO 9712 runs 5-year renewal + 10-year recertification (eye exam + retest). The tracker takes the issue date and last-renewal date and returns the next expiry, the window when paperwork should be filed (typically 6 months ahead), and whether the next cycle is a renewal or a full recertification.',
  workedExample: {
    inputs: {
      certBody: 'API',
      certType: 'API 510 — Pressure Vessel Inspector',
      issueDate: '2020-03-15',
      lastRenewal: '2023-03-15',
    },
    outputs: {
      expiryDate: '2026-03-15',
      renewalWindow: '2025-09-15 → 2026-03-15 (6-month window)',
      recertWindow: '2029-03-15 (9-yr recert exam due)',
      requiredAction: 'Submit renewal application + 25 CPD points',
      hoursRequired: '25 CPD points (online courses, on-the-job assessments, peer reviews)',
    },
    explanation:
      'API certifications run 3-year renewal cycles. Inspector issued 2020-03-15, last renewed 2023-03-15. Next expiry = 2023-03-15 + 3 years = 2026-03-15. API opens the renewal window 6 months ahead (2025-09-15) — file inside that window to keep continuity. At the 9-year mark (2029-03-15) a full recertification exam is required (open-book, online, $475 fee as of 2025). Renewal requires 25 Continuing Professional Development (CPD) points across 3 years — credits earned through ASNT/AWS courses, inspection time logged, employer-attested on-the-job assessments. Letting it expire forces a full re-exam ($1,200) and a 30-day re-application freeze.',
  },
  whenToUse:
    'Use when planning a turnaround season (so no one on the crew is out of cert when you need them on tools), when onboarding a new inspector and inventorying their cert stack, when an audit (SOX, ISO 9712 third-party, OEM customer audit) asks for the cert-expiry register, or when budgeting for the next 12 months of CPD course enrolments and exam fees.',
  limitations: [
    'Employer-administered ASNT SNT-TC-1A renewal rules vary by employer-written practice. Defaults follow the SNT-TC-1A "shall" minimums; your employer practice may be stricter (some require annual proficiency, not 5-yr).',
    'AWS CWI 9-year recertification has two paths (CE-only and full retest). Most CWIs take the CE path because the retest pass rate sits at ~55%; this tool defaults to the CE path.',
    'API CPD points are subjective — what counts is at the discretion of the API ICP committee. Save certificates and on-the-job assessment forms in case of audit.',
    'Does not track method-specific endorsements (PAUT, TOFD, Phased Array per ISO 13588) which often have their own separate expiry on top of the base certification.',
    'Does not track jurisdictional inspector commissions (NBIC, US state pressure-vessel inspector cards) which run on different cycles, jurisdiction by jurisdiction.',
    'Eye-exam re-validation (required by every body listed) is annual under most programs — this tool surfaces the renewal date but assumes you have an in-date eye exam at the time of renewal application.',
  ],
  relatedTools: [
    { slug: 'ndt-method-selector', name: 'NDT Method Selector' },
    { slug: 'inspection-cost-estimator', name: 'NDT Inspection Cost Estimator' },
    { slug: 'weld-cost', name: 'Weld Inspection Cost Calculator' },
  ],
  faqs: [
    {
      q: 'What happens if I let my API 510 lapse past the renewal window?',
      a: 'Grace period is 6 months past the expiry date — during that window you can renew with a late fee (~$200 on top of standard renewal). Past the grace period, the certification is officially expired and you must re-sit the full closed-book API ICP exam (~$1,200 fee, 6-hour exam at a Prometric test center). Most employers will not let an inspector with an expired API cert stamp inspection reports until the new cert is in hand, which typically takes 30–45 days from exam pass. Plan to file the renewal at least 3 months before expiry to avoid this.',
    },
    {
      q: 'Is the 5-year ASNT Level III "renewal" the same as recertification?',
      a: 'No. ASNT Level III runs two clocks: 5-year renewal (continuing education + ASNT membership maintenance) and the underlying certification itself (which lasts as long as the holder maintains renewal + passes the periodic ASNT-administered recertification exam, typically every 10 years). Letting renewal lapse for >2 years requires retaking the Level III exam in that method. This tracker treats the 5-year cycle as the active renewal and flags the 10-year recertification separately.',
    },
    {
      q: 'How many CE hours does a CWI need per renewal?',
      a: 'AWS CWI requires 40 PDH (Professional Development Hours) for the 3-year renewal at year 3 and year 6. At year 9 (the recertification milestone), you choose: (a) take the full Part B practical retest, or (b) submit 80 PDH plus a code-volume update form. Most CWIs take path (b) because Part B pass rate at 9-year recert is materially lower than at first exam — out-of-practice CWIs often fail the practical macro-etch evaluation. PDH credits come from AWS-approved seminars, in-house training, college coursework, conference attendance, or peer-reviewed publications.',
    },
    {
      q: 'Can the same cert be valid under multiple programs at once?',
      a: 'Yes — and this is the area where most crew-leaders lose track. A typical senior NDT level III might hold ASNT Level III (UT, RT, MT, PT, VT), AWS CWI, API 510, API 570, and PCN Level III (UT). Each runs on its own clock with its own CPD requirements. The tracker is designed to register each separately and aggregate the calendar so a Level III who has 5 active certifications doesn\'t miss the 4th one because they were focused on the 1st. The renewal alert window is set at 6 months before expiry for every certification by default.',
    },
  ],
  citations: [
    { id: 'snt-tc-1a', source: 'ASNT SNT-TC-1A:2020 — Personnel Qualification and Certification in Nondestructive Testing', url: 'https://www.asnt.org' },
    { id: 'aws-qc1', source: 'AWS QC1:2016 — Standard for AWS Certification of Welding Inspectors, §6 Recertification', url: 'https://www.aws.org' },
    { id: 'api-icp', source: 'API Individual Certification Programs (ICP) Recertification Guidelines, 2024 ed.', url: 'https://www.api.org/products-and-services/individual-certification-programs' },
    { id: 'iso-9712', source: 'ISO 9712:2021 — Non-destructive testing — Qualification and certification of NDT personnel, §10 Renewal and Recertification' },
  ],
};

export default tool;
