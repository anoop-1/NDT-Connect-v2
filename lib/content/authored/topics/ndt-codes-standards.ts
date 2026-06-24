import type { CombinedTopicContent } from '../types';

const topic: CombinedTopicContent = {
  slug: 'ndt-codes-standards',
  bucket: 'topics',
  metaTitle: 'NDT Codes & Standards: API, ASME & AWS Quick Map (2026)',
  metaDescription:
    'A plain-English map of the NDT codes and standards that actually govern inspection — ASME Section V, API 510/570/653, API 1104, API 579/580/581 RBI, AWS D1.1 — and when each applies.',
  title: 'NDT Codes & Standards: Which One Governs Your Inspection',
  audience: 'Inspection engineers, integrity engineers and QA/QC managers',
  heroLede:
    "NDT lives inside a stack of codes: one defines how a technique is performed, another sets what is acceptable, and a third tells you when to inspect and how often. Confusing the three is how procedures get rejected. This hub separates the method codes from the in-service and construction codes, maps the API and ASME documents to the equipment they govern, and links the detailed guide for each.",
  sections: [
    {
      heading: 'Three kinds of document',
      level: 2,
      paragraphs: [
        'It helps to sort NDT standards into three roles. Method/technique standards say how an examination is carried out — ASME Section V is the anchor, defining radiography, ultrasonics, MT, PT and more. Acceptance/construction codes say what is good enough at build — ASME Section VIII for vessels, B31.3 for process piping, AWS D1.1 for structural steel. In-service inspection codes say when and how often to re-inspect operating equipment — the API 5xx family and risk-based inspection (RBI).',
        'A single weld can touch all three: examined per ASME V, accepted per ASME VIII at construction, then re-inspected on an interval set by API 510 once the vessel is in service. Knowing which document drives which decision is half of getting the procedure approved.',
      ],
    },
    {
      heading: 'The in-service inspection codes (API 5xx)',
      level: 2,
      paragraphs: [
        'For operating plant, the API in-service codes set the inspection program. Each covers a class of equipment and points back to NDT methods for thickness, cracking and damage-mechanism detection.',
      ],
      table: {
        caption: 'API in-service inspection & integrity standards',
        headers: ['Standard', 'Governs', 'Typical NDT'],
        rows: [
          ['API 510', 'Pressure vessels (in-service)', 'UT thickness, PAUT, MT/PT, internal VT'],
          ['API 570', 'Process piping (in-service)', 'UT thickness, profile RT, PAUT, guided wave'],
          ['API 653', 'Aboveground storage tanks', 'MFL floor scanning, UT, vacuum-box, settlement survey'],
          ['API 571', 'Damage mechanisms (reference)', 'Guides method choice by mechanism'],
          ['API 574', 'Piping inspection practices', 'Thickness measurement practice'],
          ['API 579', 'Fitness-for-service', 'Flaw sizing (TOFD/PAUT), assessment'],
          ['API 580 / 581', 'Risk-based inspection (RBI)', 'Sets scope and interval by risk'],
          ['API 1104', 'Pipeline welding & acceptance', 'RT, AUT/PAUT girth-weld inspection'],
          ['API 1163', 'In-line inspection systems', 'Validates ILI (MFL/UT) results'],
        ],
      },
    },
    {
      heading: 'The method standard: ASME Section V',
      level: 2,
      paragraphs: [
        'ASME Section V is the technique rulebook referenced by most construction codes. Its articles define how each examination is performed — Article 2 (radiography), Article 4 (ultrasonics, including encoded PAUT and TOFD appendices), Article 6 (penetrant), Article 7 (magnetic particle), Article 9 (visual). When a construction code says "examine per Section V", it is Section V that sets calibration, technique and documentation, while the construction code keeps the acceptance criteria.',
      ],
      callout: {
        kind: 'spec',
        title: 'Method vs acceptance',
        body: 'Section V tells you HOW to shoot the radiograph or run the scan. ASME VIII, B31.3 or AWS D1.1 tell you whether the indication you found is acceptable. You need both, and they are different documents.',
      },
    },
    {
      heading: 'From damage mechanism to method',
      level: 2,
      paragraphs: [
        'The most efficient inspection programs start from the credible damage mechanism, not a blanket scan. API 571 catalogues mechanisms — thinning, environmental cracking, high-temperature degradation, mechanical fatigue — and each points to the method that detects it. Sulfidation thinning is a UT-thickness problem; chloride stress-corrosion cracking needs surface methods or PAUT; high-temperature hydrogen attack (HTHA) calls for advanced UT/TOFD and velocity-ratio techniques. RBI (API 580/581) then turns that mechanism-and-consequence picture into a scope and an interval, so high-risk circuits get more NDT and low-risk circuits get less.',
      ],
    },
  ],
  faqs: [
    { q: 'What is the difference between ASME Section V and ASME Section VIII?', a: 'Section V is the method standard — it defines how each NDT examination (RT, UT, MT, PT, VT) is performed, including calibration and technique. Section VIII is a construction code for pressure vessels that sets the acceptance criteria. A weld is examined per Section V and accepted per Section VIII; you need both documents.' },
    { q: 'Which code governs in-service pressure vessel inspection?', a: 'API 510 governs in-service pressure vessels, setting inspection intervals and required examinations (UT thickness, PAUT, MT/PT, internal visual). API 570 covers in-service process piping and API 653 covers aboveground storage tanks.' },
    { q: 'What is risk-based inspection (RBI)?', a: 'RBI, defined by API 580 (practice) and API 581 (methodology), prioritises inspection by combining the probability of failure (from damage mechanisms) with the consequence of failure. High-risk equipment receives more frequent and more thorough NDT; low-risk equipment receives less, optimising the overall program.' },
    { q: 'How do I know which NDT method a code requires?', a: 'Construction codes reference ASME Section V for the technique and set their own acceptance. In-service API codes point to the method appropriate for the damage mechanism — API 571 maps mechanisms to detection methods. Always read the governing code and client specification together.' },
    { q: 'Which standard covers pipeline girth weld inspection?', a: 'API 1104 governs the welding and acceptance of pipeline girth welds, including radiographic and automated ultrasonic (AUT/PAUT) inspection. API 1163 validates in-line inspection (ILI) systems used for in-service pipeline integrity.' },
  ],
  citations: [
    { id: 'asme-v', source: 'ASME BPVC Section V — Nondestructive Examination, 2023 ed.' },
    { id: 'api-510', source: 'API 510 — Pressure Vessel Inspection Code, 11th ed.' },
    { id: 'api-571', source: 'API RP 571 — Damage Mechanisms Affecting Fixed Equipment in the Refining Industry' },
    { id: 'api-580', source: 'API RP 580 — Risk-Based Inspection' },
  ],
  internalLinks: [
    { href: '/standards/asme-section-v', label: 'ASME Section V guide' },
    { href: '/standards/api-510', label: 'API 510 — pressure vessels' },
    { href: '/standards/api-570', label: 'API 570 — process piping' },
    { href: '/standards/api-653', label: 'API 653 — storage tanks' },
    { href: '/standards/api-571', label: 'API 571 — damage mechanisms' },
    { href: '/standards/api-579', label: 'API 579 — fitness-for-service' },
    { href: '/standards/api-580', label: 'API 580 — risk-based inspection' },
    { href: '/standards/api-1104', label: 'API 1104 — pipeline welding' },
    { href: '/topics/choosing-ndt-method', label: 'How to choose an NDT method' },
  ],
};

export default topic;
