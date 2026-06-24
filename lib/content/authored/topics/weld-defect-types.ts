import type { CombinedTopicContent } from '../types';

const topic: CombinedTopicContent = {
  slug: 'weld-defect-types',
  bucket: 'topics',
  metaTitle: 'Weld Defects & Discontinuities: What Each NDT Method Detects',
  metaDescription:
    'The common weld defects — porosity, slag, lack of fusion, incomplete penetration, cracks, undercut — and which NDT method reliably detects each. Mapped to AWS D1.1 and ASME acceptance.',
  title: 'Weld Defects & Discontinuities, and the NDT Method That Catches Each',
  audience: 'Welding inspectors (CWI/CSWIP), QA/QC engineers and fabrication QC',
  heroLede:
    "A weld can fail acceptance for a dozen different reasons, and each discontinuity has a method that sees it well and methods that miss it. Porosity lights up on radiography but is nearly invisible to a shear-wave UT beam; a tight lack-of-fusion plane reflects ultrasound strongly yet can hide on a radiograph if it is oriented along the beam. This hub maps the common weld discontinuities to the technique that detects each, and links the method guides and code references behind the acceptance call.",
  sections: [
    {
      heading: 'Surface vs sub-surface vs volumetric',
      level: 2,
      paragraphs: [
        'Weld discontinuities split into three families by where they live, and that location dictates the method. Surface-breaking flaws — surface cracks, undercut, overlap, crater cracks — are caught by visual (VT), magnetic particle (MT) on steel, and penetrant (PT). Sub-surface planar flaws — lack of fusion, incomplete penetration, underbead and toe cracks — are the strength of ultrasonics (UT, PAUT) and TOFD. Volumetric flaws — porosity, slag, tungsten inclusions — are classically radiography\'s domain.',
        'The trap is orientation. Radiography images density change, so it sees volumetric flaws and cracks that open along the beam, but it can miss a tight planar crack lying across the film. Ultrasound reflects off planar flaws near-normal to the beam, so it excels at lack of fusion and cracks but needs scanning technique to catch favourably-oriented porosity. This is exactly why critical welds are often inspected by both a volumetric method and a surface method.',
      ],
    },
    {
      heading: 'The discontinuity-to-method map',
      level: 2,
      paragraphs: [
        'Use this as a first pass; the governing code and joint geometry refine it.',
      ],
      table: {
        caption: 'Common weld discontinuities and the NDT methods that detect them',
        headers: ['Discontinuity', 'Where', 'Best methods', 'Weak/blind methods'],
        rows: [
          ['Porosity (gas pores)', 'Volumetric', 'RT (strong), PAUT with care', 'MT, PT (surface only); shear-wave UT can miss'],
          ['Slag inclusions', 'Volumetric', 'RT, UT/PAUT', 'MT, PT'],
          ['Lack of fusion', 'Planar, sub-surface', 'UT, PAUT, TOFD', 'RT (can miss if tight/aligned)'],
          ['Incomplete penetration', 'Planar, root', 'RT, UT/PAUT, TOFD', 'PT/MT unless root accessible'],
          ['Cracks (toe, underbead, crater)', 'Surface & sub-surface', 'MT (surface steel), PT (surface), UT/PAUT/TOFD (buried)', 'RT may miss tight planar cracks'],
          ['Undercut', 'Surface', 'VT, MT, PT', 'RT/UT secondary'],
          ['Overlap / cold lap', 'Surface', 'VT, MT, PT', 'RT/UT poor'],
          ['Tungsten inclusion (GTAW)', 'Volumetric', 'RT (high-density spot)', 'UT, MT, PT'],
        ],
      },
      callout: {
        kind: 'warn',
        title: 'Orientation matters',
        body: 'A tight, well-aligned planar crack can pass a radiograph and fail a UT scan. For fracture-critical welds, pair a volumetric method (RT or UT) with a surface method (MT or PT).',
      },
    },
    {
      heading: 'Sizing, not just detection',
      level: 2,
      paragraphs: [
        'Detection answers "is there a flaw"; engineering-critical assessment needs "how big". Through-wall height drives fitness-for-service decisions under API 579 / BS 7910, and that is where TOFD and PAUT pull ahead of film radiography. TOFD measures the diffracted signal from a flaw\'s tips to size through-wall extent within roughly ±1 mm; PAUT sectorial scans map flaw position and height across the weld volume. If the acceptance route is ECA rather than workmanship, plan for a sizing-capable method from the start.',
      ],
    },
    {
      heading: 'Acceptance is set by the code',
      level: 2,
      paragraphs: [
        'Detecting a discontinuity is not the same as rejecting the weld — the code decides. AWS D1.1 distinguishes acceptable discontinuities from rejectable defects by size, type and loading (statically vs cyclically loaded). ASME Section VIII and B31.3 set their own acceptance for pressure work. A 2 mm pore may be perfectly acceptable in one code and rejectable in another, so the inspector reads the indication and then reads the acceptance clause before writing the report.',
      ],
    },
  ],
  faqs: [
    { q: 'Which NDT method detects porosity in welds?', a: 'Radiography (RT) is the strongest method for porosity because it images the density change of the gas pore. Phased array UT can detect porosity with careful technique, but conventional shear-wave UT may miss favourably-oriented pores. Surface methods (MT, PT) only find porosity that breaks the surface.' },
    { q: 'What is the best method to detect lack of fusion?', a: 'Lack of fusion is a planar, sub-surface flaw that reflects ultrasound strongly, so UT, phased array (PAUT) and TOFD detect it reliably. Radiography can miss tight lack of fusion when it lies along the beam, which is why critical welds often use an ultrasonic method for planar flaws.' },
    { q: 'How do you measure the size of a weld defect?', a: 'Through-wall height is measured with sizing-capable methods. TOFD measures the diffracted tip signals to size flaws within roughly ±1 mm, and PAUT sectorial scans map flaw height across the weld volume. Accurate sizing is required for engineering-critical assessment under API 579 or BS 7910.' },
    { q: 'Do I need more than one NDT method on a weld?', a: 'For fracture-critical or fatigue-loaded welds, yes — a volumetric method (RT or UT) is paired with a surface method (MT or PT) because no single method sees all discontinuity types and orientations. The governing code and the criticality of the joint determine the required combination.' },
    { q: 'Does finding a discontinuity mean the weld is rejected?', a: 'No. A discontinuity becomes a rejectable defect only when it exceeds the acceptance criteria of the governing code (AWS D1.1, ASME VIII, B31.3, etc.) for its type, size and the loading condition. The inspector characterises the indication, then applies the acceptance clause.' },
  ],
  citations: [
    { id: 'aws-d11', source: 'AWS D1.1/D1.1M — Structural Welding Code, Steel, Clause 8 (Inspection)' },
    { id: 'asme-v', source: 'ASME BPVC Section V — Nondestructive Examination' },
    { id: 'bs-7910', source: 'BS 7910 — Guide to methods for assessing the acceptability of flaws in metallic structures' },
  ],
  internalLinks: [
    { href: '/methods/radiographic-testing', label: 'Radiographic Testing guide' },
    { href: '/methods/phased-array-ut', label: 'Phased Array UT guide' },
    { href: '/methods/tofd-testing', label: 'TOFD guide' },
    { href: '/methods/magnetic-particle-testing', label: 'Magnetic Particle Testing guide' },
    { href: '/methods/penetrant-testing', label: 'Penetrant Testing guide' },
    { href: '/pillars/weld-inspection-pillar', label: 'Weld Inspection pillar' },
    { href: '/compare/tofd-vs-paut', label: 'TOFD vs PAUT for sizing' },
    { href: '/standards/api-579', label: 'API 579 fitness-for-service' },
    { href: '/topics/choosing-ndt-method', label: 'How to choose an NDT method' },
  ],
};

export default topic;
