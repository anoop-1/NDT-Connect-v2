import type { LearnArticleContent } from '../types';

const article: LearnArticleContent = {
  slug: 'how-to-perform-pt-development',
  category: 'how-to',
  metaTitle: 'How to Perform PT Development (ASTM E165 / ASME V Art. 6)',
  metaDescription:
    'Liquid penetrant inspection development step: dwell times, developer types, indication evaluation, and acceptance per ASTM E165 and ASME V Article 6.',
  heroLede:
    "Penetrant dwell ends in two minutes, you have one minute of removal, and developer application has to coat evenly inside that window or the whole inspection is invalid. Get the development step wrong and surface cracks 0.05 mm wide stay invisible. The procedure below — ASTM E165 dwell timings, developer-type selection, and indication evaluation — is what works on stainless steel weld inspection at 21°C with Type II Method C visible-color penetrant.",
  audience:
    'Level II PT technicians performing liquid penetrant examination on welds, castings, and machined surfaces per ASTM E165 and ASME V Article 6.',
  prerequisiteKnowledge: [
    'ASNT Level II PT certification per SNT-TC-1A',
    'Surface preparation and contaminant cleanliness verification',
    'Familiarity with penetrant types (visible vs fluorescent, water-washable vs solvent-removable)',
    'Reading procedure-specific dwell, removal, and acceptance requirements',
  ],
  sections: [
    {
      heading: 'Penetrant type and pre-cleaning',
      level: 2,
      paragraphs: [
        'Penetrant types per ASTM E165 §6: Type I (fluorescent) requires UV-A inspection; Type II (visible color, typically red) inspects under white light. Methods per ASTM E165 §7: Method A (water-washable), Method B (post-emulsifiable), Method C (solvent-removable). Method C is the most common for field weld work on stainless steel.[1]',
        'Pre-cleaning: degrease with a vapor degreaser, solvent wipe, or alkaline clean. ASTM E165 §10.1 requires removal of all contaminants that could mask defects — oil, grease, paint, rust, scale, weld smoke. Drying time after cleaning: 5 minutes minimum, longer for porous surfaces.',
        'Surface condition: ASME V Art. 6 §T-642 limits surface roughness only by the ability to see indications; practical limit is 12 µm Ra. Tighter (3 µm Ra) for finished machined surfaces where small indications matter.[2]',
      ],
      callout: {
        kind: 'spec',
        title: 'No-cross-contamination rule',
        body: 'Penetrant brand, batch, and type must remain consistent through pre-cleaner, penetrant, remover, and developer. Mixing Method A and Method C consumables can leave residue that produces false indications.',
      },
    },
    {
      heading: 'Step 1: Penetrant application and dwell',
      level: 2,
      paragraphs: [
        'Apply penetrant by spray, brush, or dip. Cover the entire inspection area with a uniform wet film. ASTM E165 §10.4 specifies dwell time by material — 5 to 10 minutes minimum for most metals and welds at 21°C ambient.[1] ASME V Art. 6 §T-674 mandates 10 minutes minimum dwell unless the procedure qualifies a shorter time.[2]',
        'Temperature dependence: dwell time stretches as temperature drops. At 10°C, multiply dwell by 1.5; at 5°C (the lower limit of standard penetrant operation), double the dwell. Above 50°C, the carrier evaporates too fast and dwell becomes unreliable — use high-temp specialty penetrant or wait for cooling.',
        'Re-wet during long dwell: if the penetrant film dries before dwell ends, re-apply a thin layer. A dried penetrant film leaves residue but no longer migrates into surface defects.',
      ],
    },
    {
      heading: 'Step 2: Excess penetrant removal',
      level: 2,
      paragraphs: [
        'Method A (water-washable): rinse with low-pressure water spray, 275-345 kPa (40-50 psi), water temperature 10-38°C per ASTM E165 §10.5.1.[1] Spray angle 30-45° from the surface, distance 300 mm. Over-washing strips penetrant from defects — limit rinse to the time needed to remove the background film, typically 30-60 seconds.',
        'Method C (solvent-removable): wipe with a dry lint-free cloth first to remove the bulk, then wipe with a cloth dampened (not soaked) with the procedure-specified remover. Never spray remover directly onto the part — it floods defects and removes penetrant from real cracks. Wipe direction follows the weld axis.',
        'After removal, inspect the surface — background should be clear or faintly tinted (acceptable residual), with no penetrant pooling in surface texture. If background is heavily stained, the remover step was inadequate; re-wipe before development.',
      ],
    },
    {
      heading: 'Step 3: Developer application',
      level: 2,
      paragraphs: [
        'Developer types per ASTM E165 §6.4: Form a (dry powder), Form b (water-soluble suspension), Form c (water-suspendable), Form d (non-aqueous wet), Form e (special applications). Form d is the most common for field weld work — sprayed from an aerosol can in a thin uniform layer.[1]',
        'Application: hold the can 200-300 mm from the surface, spray in light passes for a uniform film. ASME V Art. 6 §T-676 specifies developer thickness so it does not mask indications — practical guide is the film thins enough to read printed text held 30 cm away.[2]',
        'Developer dries by carrier evaporation in 2-5 minutes. Indication bleed-out begins as soon as developer contacts the surface — start the development clock when developer is applied, not when it dries.',
      ],
      list: {
        title: 'Developer dwell time targets (ASTM E165 §10.6)',
        items: [
          'Minimum 10 minutes after developer application before final evaluation',
          'Maximum 60 minutes for visible-color penetrant on most surfaces',
          'Watch indications form between minute 5 and minute 30 — most defects bleed in this window',
          'Re-inspect after 30 minutes to catch tight cracks that bleed slowly',
        ],
      },
    },
    {
      heading: 'Step 4: Indication evaluation',
      level: 2,
      paragraphs: [
        'Inspect under white light at the part surface: ASTM E165 §11.2 requires 1000 lux minimum (100 foot-candles) at the test surface for visible-color penetrant.[1] Use a calibrated lux meter to verify lighting before the first inspection of the shift.',
        'For fluorescent penetrant: UV-A intensity ≥ 1000 µW/cm² at the part surface, ambient white light < 20 lux, eyes dark-adapted ≥ 1 minute before evaluation. Re-verify UV-A intensity if the bulb is more than 6 months old.',
        'Classify indications: linear (length ≥ 3x width), rounded (length < 3x width), or false (process-induced, e.g., lint, dust, surface texture). Acceptance per the procedure — ASME B31.3 §344.4 typically disallows any crack-like linear indication.[3] AWS D1.1 Clause 6.10 has its own acceptance for structural welds.[4]',
      ],
    },
    {
      heading: 'Step 5: Post-PT cleaning and documentation',
      level: 2,
      paragraphs: [
        'Remove developer with a solvent wipe, water rinse (for water-suspendable developers), or compressed-air blow-off. Verify cleanliness by inspecting under a 5x glass — residual developer in surface texture can corrode painted surfaces and interfere with subsequent welding.',
        'For parts going to subsequent welding, follow with a solvent wipe and a dry rag. Any residual penetrant or developer in the weld prep zone outgases during welding and causes porosity in the next pass.',
        'Document the inspection: penetrant lot number, removal type, developer lot number, dwell times (penetrant and developer), ambient temperature, lighting verification, all indications with location and orientation, acceptance call, technician name and cert level, and Level III review for any reportable indication.',
      ],
    },
  ],
  commonMistakes: [
    'Over-washing during removal. Excess water spray pressure (above 345 kPa / 50 psi) strips penetrant from real defects and produces a clean-looking part with hidden cracks. Verify spray pressure on the regulator and use the minimum that removes background.',
    'Applying developer too thick. Heavy developer film masks indications by absorbing the bleed-out before it reaches the surface. The developer should be light enough to read printed text held 30 cm beyond it — heavier than that and small indications stay hidden.',
    'Skipping the 10-minute minimum development time. Indications from tight cracks bleed out slowly — calling the part clean at 5 minutes misses defects that would have shown at 15 minutes. Set a kitchen timer and walk to the next part during the wait.',
    'Inspecting under inadequate lighting. 1000 lux at the part surface requires a dedicated inspection lamp or direct sunlight — overhead shop fluorescent often delivers 300-500 lux at typical inspection distance. Verify with a lux meter before the first inspection.',
  ],
  relatedFaqs: [
    {
      q: 'What is the difference between Type I and Type II penetrant?',
      a: 'Type I is fluorescent — particles glow under UV-A black light at 365 nm wavelength, providing the highest sensitivity (detects cracks down to 0.0008 mm width on smooth surfaces under controlled conditions). Required for aerospace and high-acceptance-bar work. Type II is visible-color (typically red) — inspected under white light at 1000 lux minimum, more practical for field weld work where UV-A control is difficult. Type II sensitivity is about half that of Type I but still detects most weld-relevant surface cracks above 0.05 mm width. ASTM E165 §6 defines both; ASME V Art. 6 permits either with appropriate qualification.',
    },
    {
      q: 'Why does dwell time stretch in cold weather?',
      a: 'Penetrant migrates into surface defects by capillary action. The carrier viscosity rises as temperature drops, slowing capillary flow. At 21°C, 10-minute dwell is enough for most penetrants to fill cracks down to 0.05 mm width. At 10°C, the same dwell only achieves ~60% fill — small cracks stay empty and bleed-out fails. ASTM E165 §10.4 requires dwell to extend proportionally with temperature drop, typically 1.5x at 10°C and 2x at 5°C. Below 5°C, standard penetrant carriers approach their freezing point and the chemistry breaks down — use a temperature-qualified special penetrant or warm the part before inspection.',
    },
    {
      q: 'When should I use Method B post-emulsifiable instead of Method A water-washable?',
      a: 'Method B uses a separate emulsifier step before water rinse. The advantage is sensitivity — Method B retains penetrant in cracks better than Method A because the emulsifier only acts on penetrant that contacts the surface long enough for the emulsifier to penetrate the film. Cracks with tight openings retain penetrant; the surrounding background washes off cleanly. Method B is the right choice for finely-machined surfaces where Method A would over-wash, and for tight fatigue cracks in aerospace components. The penalty is process complexity and longer total inspection time (3-5 minutes added for the emulsifier step plus dwell).',
    },
    {
      q: 'How do I tell a false indication from a real crack?',
      a: 'Three checks. First, geometry — a real crack bleeds out in a line with sharp definition, often branched at the ends. A false indication from lint or dust is irregular and spotty. Second, repeatability — clean the area with solvent, reapply developer, and watch for the indication to reappear. A real crack bleeds out again; a contamination indication does not. Third, length and orientation — real cracks in welds have predictable orientations (transverse, longitudinal, toe, HAZ). An indication running across the weld at a 30° angle in the middle of a clean parent metal area is suspect; reprocess and inspect under magnification (5x or 10x) before flagging.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/penetrant-testing',
      label: 'Penetrant Testing method overview',
      context: 'Full PT method context including physics, consumable types, and code framework.',
    },
    {
      href: '/standards/asme-v',
      label: 'ASME Section V Article 6',
      context: 'Article 6 governs PT procedure, dwell, and acceptance for ASME work.',
    },
    {
      href: '/learn/troubleshooting-pt-bleed-out-failure',
      label: 'Troubleshooting PT bleed-out failure',
      context: 'When developer is applied and no indication appears on a suspected crack, this diagnostic walks the causes.',
    },
    {
      href: '/learn/how-to-perform-mt-yoke-shot',
      label: 'MT yoke shot procedure',
      context: 'MT is the magnetic alternative for ferromagnetic parts where PT is also applicable.',
    },
    {
      href: '/methods/magnetic-particle-testing',
      label: 'Magnetic Particle Testing method overview',
      context: 'MT method context for selection vs PT on ferromagnetic surfaces.',
    },
    {
      href: '/standards/asme-b31-3',
      label: 'ASME B31.3 process piping code',
      context: 'B31.3 §344.4 sets PT acceptance for piping welds.',
    },
    {
      href: '/learn/faq-defect-types-in-welds',
      label: 'Weld defect types FAQ',
      context: 'Surface cracks, toe cracks, and lack-of-fusion exit cracks are the primary PT targets.',
    },
    {
      href: '/learn/faq-ndt-method-selection-for-weld-inspection',
      label: 'NDT method selection for weld inspection',
      context: 'Decision tree for choosing PT vs MT vs RT vs UT on a given weld.',
    },
  ],
  citations: [
    {
      id: 'astm-e165',
      source: 'ASTM E165/E165M-23 — Standard Practice for Liquid Penetrant Testing for General Industry',
    },
    {
      id: 'asme-v-art-6',
      source: 'ASME BPVC Section V, Article 6, 2023 edition — Liquid Penetrant Examination, §T-642 through §T-676',
    },
    {
      id: 'asme-b31-3',
      source: 'ASME B31.3-2022 — Process Piping, §344.4 Liquid Penetrant Examination',
    },
    {
      id: 'aws-d1-1',
      source: 'AWS D1.1/D1.1M:2020 — Structural Welding Code — Steel, Clause 6.10 Liquid Penetrant Inspection',
    },
    {
      id: 'iso-3452',
      source: 'ISO 3452-1:2021 — Non-destructive testing — Penetrant testing — Part 1: General principles',
    },
  ],
};

export default article;
