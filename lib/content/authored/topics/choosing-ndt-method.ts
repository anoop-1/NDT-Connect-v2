import type { CombinedTopicContent } from '../types';

const topic: CombinedTopicContent = {
  slug: 'choosing-ndt-method',
  bucket: 'topics',
  metaTitle: 'How to Choose the Right NDT Method (2026 Decision Guide)',
  metaDescription:
    'A practical decision guide to selecting the right NDT method — UT, PAUT, RT, MT, PT, ET, TOFD or VT — by defect type, material, access, code and cost. Side-by-side comparisons and a free method selector.',
  title: 'How to Choose the Right NDT Method',
  audience: 'Inspection engineers, QA/QC managers, asset owners and buyers scoping an NDT job',
  heroLede:
    "Picking an NDT method is rarely about which technique is 'best' — every method has a defect population it sees well and a population it is blind to. The right choice falls out of four questions: what discontinuity are you hunting, what is the material and surface, what access do you have, and what code governs the acceptance. This hub walks those four decisions and links the method-by-method detail, the head-to-head comparisons, and a free selector to pin the answer down.",
  sections: [
    {
      heading: 'Start with the defect, not the method',
      level: 2,
      paragraphs: [
        'The single most common selection error is starting from a familiar instrument instead of the flaw. A surface-breaking fatigue crack, a buried slag inclusion, mid-wall hydrogen damage, and external corrosion-under-insulation each have a different physics signature — and no single method is strong against all four.',
        'Surface-breaking, open-to-surface cracks are the domain of penetrant (PT) on any non-porous material and magnetic particle (MT) on ferromagnetic steel, where MT also reaches slightly sub-surface. Volumetric flaws — porosity, slag, lack of fusion, mid-wall cracking — need a through-thickness method: radiography (RT) or ultrasonics (UT / PAUT / TOFD). Wall loss and corrosion are a thickness problem, best served by UT thickness gauging, profile radiography, or screening methods like guided wave and MFL.',
      ],
      callout: {
        kind: 'info',
        title: 'Rule of thumb',
        body: 'Surface crack → MT or PT. Volumetric/buried flaw → RT, UT, PAUT or TOFD. Wall loss → UT thickness, profile RT, MFL or guided wave. Conductive surface flaws on non-ferrous → eddy current (ET).',
      },
    },
    {
      heading: 'The four-question decision',
      level: 2,
      paragraphs: [
        '1. Defect type and orientation. Planar flaws (cracks, lack of fusion) reflect ultrasound strongly when the beam hits them near-normal — UT and PAUT excel, and TOFD is especially good at sizing through-wall height. RT is strong on volumetric flaws but can miss tight, favourably-oriented planar cracks that lie parallel to the beam.',
        '2. Material and surface. RT and UT work on most metals; MT only works on ferromagnetic material; ET needs an electrically conductive surface and is sensitive to lift-off; PT needs a non-porous surface clean enough to hold and reveal the penetrant. Coatings, weld cap profile and surface roughness all shift the choice.',
        '3. Access and geometry. One-sided access rules out film RT and favours UT/PAUT or digital radiography. Thin wall, small diameter, or complex nozzles change couplant and probe selection. Radiation exclusion zones can make RT impractical in a live plant, pushing the job to PAUT.',
        '4. Code and acceptance. The governing code often decides the method for you — ASME Section V defines the technique families and ASME VIII / B31.3 / AWS D1.1 set acceptance. Some clients mandate PAUT-in-lieu-of-RT to a written procedure; others require specific coverage that only RT can demonstrate.',
      ],
    },
    {
      heading: 'Method-by-method, in one place',
      level: 2,
      paragraphs: [
        'Each method has a dedicated guide covering principle, equipment, procedure, advantages and limitations. Use these to confirm the technique can actually see your flaw population before you write the procedure.',
      ],
      list: {
        title: 'NDT method guides',
        items: [
          'Ultrasonic Testing (UT) — thickness and volumetric flaw detection',
          'Phased Array UT (PAUT) — electronic beam steering and imaging',
          'Time-of-Flight Diffraction (TOFD) — through-wall sizing of planar flaws',
          'Radiographic Testing (RT) — volumetric imaging on film or digital',
          'Magnetic Particle Testing (MT) — surface/near-surface flaws in steel',
          'Penetrant Testing (PT) — surface-breaking flaws on any non-porous material',
          'Eddy Current Testing (ET) — surface flaws and tube inspection on conductive metals',
          'Visual Testing (VT) — the first and most underrated method',
        ],
      },
    },
    {
      heading: 'When two methods compete: the head-to-heads',
      level: 2,
      paragraphs: [
        'Most real decisions come down to a pair: UT vs RT on a pressure weld, PAUT vs RT for a turnaround, MT vs PT on a casting, TOFD vs PAUT for sizing. The comparison pages put the two side by side on sensitivity, speed, cost, access and code coverage so you can defend the choice in a procedure review.',
      ],
      list: {
        title: 'Method comparisons',
        items: [
          'UT vs RT — the classic volumetric weld decision',
          'PAUT vs RT — why turnarounds move to phased array',
          'PAUT vs UT — when imaging beats conventional pulse-echo',
          'TOFD vs PAUT — sizing accuracy vs coverage',
          'MT vs PT — surface NDT on steel vs everything else',
          'RT vs DR / RT vs CR — film vs digital radiography',
        ],
      },
    },
    {
      heading: 'Then check cost and throughput',
      level: 2,
      paragraphs: [
        'Two methods that both find the flaw can differ 3–5× in cost per weld once you count crew, consumables, radiation exclusion and report turnaround. PAUT carries a higher day rate but inspects faster with no exclusion zone; RT is cheaper per shot but stops other trades during shooting. Use the free calculators to put real numbers on the trade before you award the work.',
      ],
      callout: {
        kind: 'spec',
        title: 'Put numbers on it',
        body: 'The NDT method selector narrows the technique; the inspection cost estimator and weld-cost calculator turn the choice into a budget you can compare against quotes from providers.',
      },
    },
  ],
  faqs: [
    { q: 'What is the best NDT method?', a: 'There is no single best method — each detects a different defect population. The right method depends on the flaw type (surface vs volumetric vs wall loss), the material, the access available, and the governing code. Surface cracks call for MT or PT; buried/volumetric flaws call for RT, UT, PAUT or TOFD; wall loss calls for UT thickness, profile RT, MFL or guided wave.' },
    { q: 'When should I use PAUT instead of RT?', a: 'Phased array is usually preferred over radiography when you need to avoid a radiation exclusion zone in a live plant, want faster coverage with immediate results, or need through-wall sizing of planar flaws. RT remains strong for volumetric flaws and where the client or code specifically requires radiographic records.' },
    { q: 'Which NDT method finds surface cracks?', a: 'Magnetic particle testing (MT) detects surface and slightly sub-surface cracks in ferromagnetic steel; liquid penetrant testing (PT) detects surface-breaking cracks on any non-porous material including stainless and aluminium. Eddy current (ET) also detects surface cracks on conductive non-ferrous metals.' },
    { q: 'Does the inspection code decide the NDT method?', a: 'Often, yes. ASME Section V defines the technique families and codes like ASME VIII, B31.3 and AWS D1.1 set acceptance criteria and may mandate or restrict methods. Always confirm the governing code and the client specification before selecting a method.' },
    { q: 'How do I compare the cost of two NDT methods?', a: 'Cost per weld depends on crew rate, consumables, radiation exclusion or access constraints, and report turnaround — not just the headline day rate. Use a cost estimator to model both methods on your scope, then compare against provider quotes.' },
  ],
  citations: [
    { id: 'asme-v', source: 'ASME Boiler & Pressure Vessel Code, Section V — Nondestructive Examination, 2023 ed.' },
    { id: 'asme-viii', source: 'ASME BPVC Section VIII Div. 1 — Rules for Construction of Pressure Vessels' },
    { id: 'aws-d11', source: 'AWS D1.1/D1.1M — Structural Welding Code, Steel' },
  ],
  internalLinks: [
    { href: '/tools/ndt-method-selector', label: 'NDT Method Selector', context: 'Interactive tool to narrow the method by inputs' },
    { href: '/methods/ultrasonic-testing', label: 'Ultrasonic Testing guide' },
    { href: '/methods/phased-array-ut', label: 'Phased Array UT guide' },
    { href: '/methods/radiographic-testing', label: 'Radiographic Testing guide' },
    { href: '/methods/magnetic-particle-testing', label: 'Magnetic Particle Testing guide' },
    { href: '/methods/penetrant-testing', label: 'Penetrant Testing guide' },
    { href: '/compare/ut-vs-rt', label: 'UT vs RT comparison' },
    { href: '/compare/paut-vs-rt', label: 'PAUT vs RT comparison' },
    { href: '/compare/tofd-vs-paut', label: 'TOFD vs PAUT comparison' },
    { href: '/tools/inspection-cost-estimator', label: 'Inspection Cost Estimator' },
  ],
};

export default topic;
