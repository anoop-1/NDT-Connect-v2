import type { ComparisonContent } from '../types';

const comparison: ComparisonContent = {
  slug: 'mt-vs-pt',
  methodA: { abbreviation: 'MT', name: 'Magnetic Particle Testing' },
  methodB: { abbreviation: 'PT', name: 'Liquid Penetrant Testing' },
  metaTitle: 'MT vs PT: Which Surface NDT Method for Welds and Castings',
  metaDescription: 'Magnetic particle vs liquid penetrant testing on welds, castings, and forgings. Sensitivity, surface prep, cost, ASME V Articles 6 and 7 coverage.',
  heroLede:
    "Spec'd MT and PT on the same weld and wondering why? The decision is almost never about defect sensitivity — both methods reliably catch surface-breaking discontinuities at ~0.1 mm aperture. It comes down to material magnetic permeability, surface finish, paint or coating presence, and whether you can drag a yoke and cleanup magnetic ink onto an austenitic stainless flange. ASME V Article 7 (MT) and Article 6 (PT) treat them as alternatives for ferromagnetic carbon steel; on non-ferrous and austenitic alloys, PT is the only choice from this pair.",
  sideBySide: {
    caption: 'MT vs PT — surface NDT side-by-side',
    headers: ['Attribute', 'MT (Magnetic Particle)', 'PT (Liquid Penetrant)'],
    rows: [
      ['Primary defect detection', 'Surface and near-surface (up to ~3 mm deep) cracks, laps, seams', 'Surface-breaking only — crack must open to surface'],
      ['Sensitivity', 'Cracks ~0.025 mm wide; sub-surface to 3 mm with prods/coils', 'Cracks ~0.05 mm wide (visible PT); 0.005 mm with fluorescent at 1000 µW/cm²'],
      ['Material limits', 'Ferromagnetic only — carbon steel, low-alloy, ferritic stainless', 'Any non-porous material — stainless, aluminum, plastics, ceramics'],
      ['Surface preparation', 'Wire brush or grind to clean metal; paint > 0.05 mm thick must come off', 'Solvent clean only; coatings must be fully removed; surface texture < 250 µin Ra preferred'],
      ['Cost per linear foot', '$1.50-$4 fluorescent wet MT; $0.75-$2 dry visible MT', '$2-$5 visible PT; $4-$10 fluorescent PT'],
      ['Throughput rate', '40-80 ft/hr weld inspection with yoke; 15-30 ft/hr with prods', '15-30 ft/hr visible PT (dwell-limited); 10-20 ft/hr fluorescent PT'],
      ['Certification required', 'ASNT Level II per SNT-TC-1A; vision (Snellen 20/30, color)', 'Same ASNT Level II; vision (Snellen 20/30 near, color)'],
      ['Code coverage', 'ASME V Art. 7, ASME VIII UW-51(b)(4), AWS D1.1 §6.14, ASTM E709', 'ASME V Art. 6, AWS D1.1 §6.14, ASTM E165, ISO 3452'],
      ['Training time to Level II', '~70 hours classroom + 130 OJT', '~32 hours classroom + 70 OJT'],
      ['Equipment cost', '$1,800-$4,000 AC/DC yoke + consumables', '$200-$600 aerosol kit; $5,000+ for fluorescent station'],
      ['Environmental / waste', 'Magnetic ink — water-based easy disposal; oil-based hazwaste', 'Solvent-based developer/cleaner — VOC management; aerosol disposal'],
      ['Post-test cleanup', 'Demagnetization required for service; wipe down ink', 'Solvent rinse to remove penetrant residue; mandatory before paint'],
    ],
  },
  whenAWins: [
    {
      scenario: 'Carbon-steel weld inspection on a structural project under AWS D1.1',
      reason:
        'AWS D1.1 §6.14 explicitly allows MT for surface and near-surface flaw detection on groove and fillet welds in dynamically loaded structures. Wet fluorescent MT detects toe cracks and underbead cracks that PT can\'t — the heat-affected-zone underbead crack is below the immediate weld surface and PT cannot reach it. MT also handles slight scale or millscale that PT would lift off.',
    },
    {
      scenario: 'Forgings and castings with surface roughness above 250 µin Ra',
      reason:
        'Rough as-cast or as-forged surfaces trap penetrant in the surface texture, producing false indications that drown real cracks. MT particles only build up at flux leakage points, so surface roughness is largely irrelevant. ASTM E1444 (MT for aerospace forgings) accepts as-forged surfaces; ASTM E165 (PT) requires 250 µin Ra or better for reliable readings.',
    },
    {
      scenario: 'Field inspection with cold or damp conditions',
      reason:
        'PT dwell times stretch dramatically below 50°F — ASTM E165 requires temperature compensation below 40°F. MT works down to 20°F with no procedural adjustment because the magnetic flux mechanism is temperature-independent within normal operating ranges. For winter shutdowns and offshore platform work, MT keeps moving when PT bogs down on dwell calculations.',
    },
    {
      scenario: 'In-service detection of fatigue cracks at known stress concentrators',
      reason:
        'Wet fluorescent MT at 1000 µW/cm² UV-A light catches fatigue cracks at as little as 0.025 mm width — finer than visible PT can resolve. On pump shafts, crane hooks, and load-bearing welds with known fatigue history, MT is the operational standard. API 653 and API 510 both reference MT as preferred for fatigue-prone components in ferromagnetic alloys.',
    },
  ],
  whenBWins: [
    {
      scenario: 'Austenitic stainless steel (300 series) and duplex stainless welds',
      reason:
        '300-series austenitic stainless is non-magnetic; MT will not produce flux leakage at flaws. Duplex stainless is weakly ferromagnetic — MT works in theory but sensitivity drops 50-70% versus carbon steel. PT is the default for stainless under ASME B31.3 §344.4 and is required for code-stamped Class 1 nuclear piping per ASME III NB-2546.',
    },
    {
      scenario: 'Aluminum, titanium, copper, and other non-ferrous alloys',
      reason:
        'Aerospace structural castings (aluminum, titanium), heat exchanger tubes (copper, brass), and aluminum weldments cannot be inspected by MT — they\'re paramagnetic or diamagnetic and won\'t hold flux. PT handles all of these. ASTM E1417 (aerospace PT) is the binding standard for safety-critical aluminum and titanium parts.',
    },
    {
      scenario: 'Complex geometry — threaded connections, bolts, blind corners',
      reason:
        'A magnetic yoke needs flat or gently curved surfaces with two contact points. Bolt threads, blind hole corners, and complex castings can\'t reliably take a yoke or prods without arc burn risk. Penetrant flows into any geometry by capillary action — that\'s why PT is the default for inspecting threaded fasteners under ASTM E165 and the API 7-1 drilling tool specification.',
    },
    {
      scenario: 'Final acceptance inspection on a polished critical surface where arc burns must be avoided',
      reason:
        'MT prods can leave arc burns at contact points if amperage isn\'t controlled — a defect on a precision-machined surface. ASME III nuclear specs and pressure vessel finishing requirements prohibit arc burns on certain surfaces, which rules out prod-method MT. PT has no contact arc and no surface marking.',
    },
  ],
  whenEitherWorks: [
    {
      scenario: 'Carbon steel fillet weld toe on a non-critical structural member — pick by available crew and consumables',
      pick: 'A',
    },
    {
      scenario: 'Final surface NDE on a P-No. 1 vessel weld with smooth ground surface — code-equivalent under ASME V',
      pick: 'B',
    },
  ],
  costDifference:
    "Visible PT in aerosol-kit form is the cheapest weld NDE method on the planet: $0.50-$1.00 per linear foot of weld in consumables, plus the technician's time. Visible dry-powder MT runs a similar bottom-line cost if you own the yoke. The crossover happens at scale and at fluorescent grade: wet fluorescent MT in a shop setting hits $1.50-$4 per foot with proper UV booth setup, while fluorescent PT in a controlled process line runs $4-$10 per foot because of the multi-stage emulsifier/developer process and the UV inspection booth. Capital equipment is the swing factor — a portable yoke is $1,800-$4,000 one-time; a full fluorescent PT line is $20K-$80K. For field weld inspection on carbon steel in volume, MT wins on consumables and demag cycle time. For one-off castings or stainless work, PT aerosol kits keep cost minimal.",
  speedDifference:
    "MT is materially faster than PT for weld inspection because there's no dwell time. A two-person crew with an AC yoke clears 40-80 linear feet of fillet weld per hour, doing both longitudinal and transverse magnetizations as ASME V Art. 7 T-743 requires. PT dwell time alone — 5-10 minutes for the penetrant, 7-10 minutes for the developer — caps throughput at 15-30 ft/hr in the most efficient field setup. Fluorescent PT is even slower because of the emulsifier rinse step and the UV-adapted eye dark period. Where PT wins on speed: large flat surfaces (tank floors, plate steel) where you spray penetrant once over a wide area and inspect a 50-square-foot zone simultaneously. There MT's localized yoke coverage actually becomes the bottleneck.",
  certificationDifference:
    "Both methods sit at ASNT SNT-TC-1A Level II with similar training hours, but MT carries more procedural complexity in the certification practical. MT Level II must demonstrate yoke calibration (lifting weights — 10 lbs at maximum pole spacing per ASME V T-754), prod amperage verification, magnetization technique selection (continuous, residual, multi-directional), and demagnetization verification with a Gauss meter. PT Level II demonstrates surface prep verification, penetrant family selection, dwell time calculation versus temperature, and developer thickness measurement. Both require the standard near-vision (Jaeger 1 or Snellen 20/30) and color discrimination annual exams. For aerospace work, ASTM E1444 (MT) and ASTM E1417 (PT) add NAS 410 endorsements requiring written exams and a procedure qualification test on flawed reference standards.",
  faqs: [
    {
      q: 'Can MT detect subsurface cracks?',
      a: 'Yes, but with sharp depth limits. MT detects cracks up to roughly 3 mm below the surface when using prods or coils at high amperage (continuous DC magnetization, 800-1200 amps). Wet fluorescent particles with strong magnetization can resolve cracks down to ~6 mm in ideal geometry. ASME V Article 7 T-744 covers the magnetization techniques required to extend depth sensitivity. PT, by contrast, only detects open surface-breaking discontinuities — anything sealed below the surface is invisible to penetrant regardless of dwell time or developer thickness.',
    },
    {
      q: 'Do I have to remove paint before MT or PT?',
      a: 'Both methods require coating removal in practice. ASTM E709 (MT) allows up to 0.05 mm (0.002 inch) of non-conductive coating provided you can demonstrate sensitivity on a flawed reference standard — this is rare. PT under ASTM E165 absolutely requires bare metal: any coating wicks penetrant by its own porosity, producing false indications. For field work the standard procedure is to needle-gun or grind the coating off the weld and adjacent 25 mm (1 in) heat-affected zone, run the test, and recoat after acceptance. Budget the prep time into the inspection scope or you\'ll lose 30-40% of the day to surface conditioning.',
    },
    {
      q: 'Which method handles socket welds better?',
      a: 'Socket welds (ASME B16.11 fittings on small-bore piping) are a classic geometry problem. The 1.5-times-pipe-wall socket weld leg is short, and the fillet toe sits right at the pipe-fitting interface. MT yokes can reach the external fillet but produce false indications at the geometry transition due to flux concentration. PT handles socket welds cleanly because it conforms to any geometry and shows real cracks at the toe with no geometry confusion. ASME B31.3 §344.4.1 and most owner specs default to PT for socket welds in process piping.',
    },
    {
      q: 'How do I choose for stainless steel welds?',
      a: 'For austenitic stainless steel (304, 316, 321, 347) — PT only. The material is non-magnetic and MT will not work. For ferritic and martensitic stainless (410, 420, 17-4 PH) — MT works because the material is ferromagnetic; PT also works. For duplex stainless (2205, 2507) — both work in principle but MT sensitivity is degraded by the dual-phase microstructure; most procedures default to PT for duplex weld inspection unless the owner spec calls out MT explicitly. ASME III NB-2546, ASME B31.3 §344.4, and API 582 all reference PT as the surface NDE default for stainless welded components.',
    },
    {
      q: 'Is dry powder or wet bath MT more sensitive?',
      a: 'Wet bath MT — especially wet fluorescent — is materially more sensitive than dry powder. Wet fluorescent particles average 4-7 microns; dry powder averages 50-150 microns. Wet method catches fatigue cracks down to ~0.025 mm width under proper UV illumination (1000 µW/cm² minimum per ASTM E709); dry powder typically resolves 0.1 mm and wider. Trade-off: dry powder is faster, doesn\'t require bath maintenance or post-inspection wipe-down, and works in field cold conditions where wet bath would freeze. Standard practice: dry visible MT for production weld inspection on rough surfaces; wet fluorescent MT for final acceptance and fatigue-prone components in critical service.',
    },
  ],
  internalLinks: [
    { href: '/methods/magnetic-particle-testing', label: 'Magnetic Particle Testing method overview', context: 'MT magnetization techniques, yoke vs prod, wet vs dry are covered in our MT deep-dive.' },
    { href: '/methods/liquid-penetrant-testing', label: 'Liquid Penetrant Testing method overview', context: 'PT sensitivity levels, dwell time, and removal procedures live in our PT deep-dive.' },
    { href: '/methods/visual-testing', label: 'Visual Testing (VT)', context: 'Surface NDE often starts with VT before MT or PT — see the VT method deep-dive.' },
    { href: '/standards/asme-section-v', label: 'ASME Section V — NDE methods', context: 'MT (Article 7) and PT (Article 6) procedures live in ASME Section V.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1 Structural Welding Code', context: 'AWS D1.1 §6.14 accepts MT or PT for surface examination on structural welds.' },
    { href: '/blog/magnetic-particle-testing-complete-guide', label: 'MT complete guide', context: 'Wet vs dry method selection and yoke calibration walked through with field examples.' },
    { href: '/blog/weld-inspection-complete-guide', label: 'Weld inspection complete guide', context: 'How MT and PT fit into the full surface and volumetric NDE stack for code welds.' },
    { href: '/free-tools/ndt-cost-calculator', label: 'NDT cost calculator', context: 'Run a per-weld cost comparison for MT vs PT on your project scope.' },
    { href: '/learn/pt-dwell-time-calculator', label: 'PT dwell time calculation', context: 'Calculate the correct penetrant dwell time before you spec PT for cold-weather work.' },
  ],
  citations: [
    { id: 'asme-v-art-6', source: 'ASME BPVC Section V, 2023, Article 6 — Liquid Penetrant Examination' },
    { id: 'asme-v-art-7', source: 'ASME BPVC Section V, 2023, Article 7 — Magnetic Particle Examination' },
    { id: 'astm-e165', source: 'ASTM E165/E165M-23, Standard Practice for Liquid Penetrant Testing' },
    { id: 'astm-e709', source: 'ASTM E709-21, Standard Guide for Magnetic Particle Testing' },
    { id: 'astm-e1417', source: 'ASTM E1417/E1417M-21e1, Standard Practice for Liquid Penetrant Testing (aerospace)' },
    { id: 'astm-e1444', source: 'ASTM E1444/E1444M-22, Standard Practice for Magnetic Particle Testing (aerospace)' },
    { id: 'aws-d11-6-14', source: 'AWS D1.1/D1.1M:2020 Structural Welding Code — Steel, §6.14 Other Examination Methods' },
    { id: 'iso-3452', source: 'ISO 3452-1:2021 Non-destructive testing — Penetrant testing' },
  ],
};

export default comparison;
