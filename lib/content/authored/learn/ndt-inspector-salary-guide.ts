import type { LearnArticleContent } from '../types';

// Flagship, link-worthy reference asset. Salary ranges are NDT Connect's own
// published role data (lib/careers-data.ts) — no fabricated figures. Frames BLS
// OES as the external benchmark without inventing specific BLS numbers.
const content: LearnArticleContent = {
  slug: 'ndt-inspector-salary-guide',
  category: 'concept',
  metaTitle: 'NDT Inspector Salary Guide [2026]: Pay by Level, Method & Industry',
  metaDescription:
    'What NDT inspectors and technicians earn in 2026 — US salary ranges by certification level (I/II/III), method (UT, PAUT, RT, CWI), and industry, plus how to increase your pay.',
  heroLede:
    'Non-destructive testing is one of the few skilled trades where a Level III certification and a phased-array or CWI endorsement can push pay past six figures without a four-year degree. This guide breaks down US NDT pay in 2026 by certification level, method, role, and industry — and the concrete levers that move you up the range.',
  audience: 'NDT technicians, inspectors, welding inspectors, and career changers',
  prerequisiteKnowledge: [],
  sections: [
    {
      heading: '2026 US NDT salary ranges at a glance',
      level: 2,
      paragraphs: [
        'The table below summarizes typical US base-pay ranges by role, compiled from NDT Connect provider and careers data. Ranges are base salary and exclude overtime, per-diem, and travel premiums, which are substantial in field NDT — offshore and turnaround work can add 30–60% to effective annual earnings.',
        'Pay scales primarily with certification level, the methods you hold, and the industry you serve. A Level II technician who adds phased-array (PAUT) and works oil & gas turnarounds will out-earn a Level II doing shop MT/PT in light manufacturing by a wide margin.',
      ],
      table: {
        caption: 'Typical US NDT base-salary ranges by role (2026, USD)',
        headers: ['Role', 'Typical base range'],
        rows: [
          ['NDT Technician — Level I', '$40,000 – $55,000'],
          ['NDT Technician — Level II', '$55,000 – $80,000'],
          ['NDT Technician — Level III', '$80,000 – $120,000'],
          ['NDT Inspector', '$65,000 – $95,000'],
          ['Radiographic Technician (RT)', '$60,000 – $90,000'],
          ['Ultrasonic Technician (UT)', '$55,000 – $85,000'],
          ['Welding Inspector (CWI)', '$60,000 – $90,000'],
          ['Pipeline Inspector', '$65,000 – $100,000'],
          ['Corrosion Engineer', '$75,000 – $110,000'],
          ['NDT Supervisor', '$75,000 – $110,000'],
          ['QA/QC Manager', '$80,000 – $120,000'],
          ['NDT Manager', '$90,000 – $140,000'],
        ],
      },
      callout: {
        kind: 'info',
        title: 'Base pay vs. total comp',
        body: 'Field roles often quote a lower base but earn far more in practice through overtime, shift differentials, and per-diem. Always compare total compensation, not headline salary.',
      },
    },
    {
      heading: 'What drives NDT pay',
      level: 2,
      paragraphs: [
        'Five factors explain most of the spread within every range above.',
      ],
      list: {
        title: 'The five levers',
        ordered: true,
        items: [
          'Certification level — Level I assists, Level II interprets and reports, Level III writes procedures and certifies others. Each step is a step-change in pay.',
          'Method mix — advanced methods (PAUT, TOFD, eddy-current array, digital radiography) command premiums over conventional UT/MT/PT.',
          'Industry — oil & gas, offshore, nuclear, and pipeline pay materially more than general manufacturing or fabrication.',
          'Location & travel — Gulf Coast, Permian, Alaska/North Slope, and offshore roles add per-diem and hardship/rotation premiums.',
          'Contract vs. staff — 1099/contract and agency rotations pay higher hourly but trade benefits and stability.',
        ],
      },
    },
    {
      heading: 'Pay by certification level (ASNT SNT-TC-1A / NAS 410)',
      level: 2,
      paragraphs: [
        'Level I technicians perform set-ups and acquisitions under supervision and sit at the bottom of the range. Level II is the workhorse certification — independent interpretation, evaluation, and reporting — and is where most field inspectors operate. Level III is the ceiling: procedure authorship, technique qualification, training and examining other personnel, and signing off programs. Holding Level III in multiple methods is the single biggest base-pay multiplier in NDT.',
        'Certification is method-specific: you are certified Level II in UT, in RT, in MT, and so on. Stacking levels across methods is what separates a $60k technician from a $110k+ multi-method Level III.',
      ],
      callout: {
        kind: 'spec',
        title: 'Fastest ROI',
        body: 'For most Level II technicians, adding PAUT or CWI is the highest-return next credential — both unlock premium scopes that conventional UT cannot bid.',
      },
    },
    {
      heading: 'Pay by method',
      level: 2,
      paragraphs: [
        'Conventional UT, MT, and PT are table stakes. The premium sits in advanced methods that fewer technicians hold and that owners increasingly specify in code work:',
      ],
      list: {
        items: [
          'Phased Array UT (PAUT) and TOFD — weld inspection on pipelines, pressure vessels, and structural steel; among the highest-demand premium skills.',
          'Radiographic Testing (RT) — strong pay, but factor radiation-safety logistics and night shoots; digital radiography (CR/DR) is displacing film and is a growing premium.',
          'Eddy-current array (ECA) — heat-exchanger tube and surface inspection; specialized and well-paid.',
          'CWI (AWS Certified Welding Inspector) — pairs with NDT to bid weld-quality and code-compliance scopes that pure NDT cannot.',
        ],
      },
    },
    {
      heading: 'Pay by industry',
      level: 2,
      paragraphs: [
        'The same Level II UT certification is worth more in some sectors than others. Oil & gas (refining, petrochemical, midstream), offshore, and nuclear sit at the top because the consequence of a missed flaw is catastrophic and the work is governed by API and ASME code. Pipeline integrity (in-line and field) and power generation follow. Fabrication shops, automotive, and general manufacturing anchor the lower end because scopes are routine and competition is higher.',
        'Turnaround season concentrates demand: refineries and plants compress months of inspection into weeks, and contractors pay up for certified technicians who can travel on short notice.',
      ],
    },
    {
      heading: 'How to increase your NDT earnings',
      level: 2,
      paragraphs: [
        'The path from the bottom to the top of these ranges is well-trodden:',
      ],
      list: {
        ordered: true,
        items: [
          'Move from Level I to Level II in your primary method as fast as your hours allow.',
          'Add a premium method — PAUT or TOFD — and a CWI if you touch welds.',
          'Pursue Level III in your strongest methods; it unlocks procedure and program roles.',
          'Target high-paying industries (oil & gas, offshore, pipeline) and turnaround work.',
          'Build a public profile so employers and clients find you directly instead of through agencies that take a cut.',
        ],
      },
      callout: {
        kind: 'info',
        title: 'Get found by employers',
        body: 'NDT Connect lets inspectors of any level publish a free profile with certifications and methods, so companies and clients reach you directly. Create yours free.',
      },
    },
  ],
  commonMistakes: [
    'Comparing base salary instead of total compensation (overtime + per-diem often doubles field pay).',
    'Staying single-method — multi-method Level III is where the money is.',
    'Letting certifications lapse; recertification gaps cost real income.',
    'Working only through agencies when a direct profile would capture the margin.',
  ],
  relatedFaqs: [
    { q: 'How much does an NDT inspector make in the US in 2026?', a: 'Typical base pay ranges from about $40,000 for a Level I technician to $120,000+ for a multi-method Level III or NDT manager. Most Level II field inspectors fall in the $55,000–$95,000 base range, with overtime and per-diem often adding 30–60% in field roles.' },
    { q: 'Which NDT certification pays the most?', a: 'ASNT Level III across multiple methods is the highest-paying certification tier. Among method endorsements, phased-array UT (PAUT) and CWI deliver the strongest pay premiums for the effort.' },
    { q: 'Do NDT inspectors need a degree?', a: 'No. NDT is certification-driven (ASNT SNT-TC-1A / NAS 410). Experience hours plus method certifications determine level and pay; a degree helps for engineering and management tracks but is not required to earn six figures as a Level III.' },
    { q: 'What is the highest-paying NDT industry?', a: 'Oil & gas, offshore, and nuclear pay the most, followed by pipeline integrity and power generation, because the work is code-governed and high-consequence. Turnaround and offshore rotations add significant premiums.' },
  ],
  internalLinks: [
    { href: '/careers/roles/ndt-inspector', label: 'NDT Inspector career profile', context: 'Day-to-day, certifications, and outlook.' },
    { href: '/careers/roles/ndt-technician-level-3', label: 'NDT Level III career path', context: 'The top of the pay range.' },
    { href: '/certifications', label: 'NDT certifications explained', context: 'ASNT, NAS 410, CWI and how to get certified.' },
    { href: '/pillars/cwi-certification-pillar', label: 'CWI certification guide', context: 'The welding-inspector premium.' },
    { href: '/register?role=inspector', label: 'Create a free inspector profile', context: 'Get found by employers and clients directly.' },
  ],
  citations: [
    { id: 'ndtc-careers', source: 'NDT Connect careers data — US role salary ranges (2026).', url: 'https://ndt-connect.com/careers' },
    { id: 'bls-oes', source: 'US Bureau of Labor Statistics, Occupational Employment and Wage Statistics (OES) — inspectors, testers, sorters.', url: 'https://www.bls.gov/oes/' },
    { id: 'asnt', source: 'ASNT SNT-TC-1A Recommended Practice — NDT personnel qualification & certification.', url: 'https://www.asnt.org/' },
  ],
};

export default content;
