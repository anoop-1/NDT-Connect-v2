import type { MethodContent } from '../types';

const method: MethodContent = {
  slug: 'magnetic-particle-testing',
  abbreviation: 'MT',
  name: 'Magnetic Particle Testing',
  metaTitle: 'Magnetic Particle Testing (MT): Yokes, Wet Fluorescent & Acceptance',
  metaDescription:
    'Working inspector guide to MT — AC vs DC yokes, wet fluorescent vs dry powder, ASME V Article 7, ASTM E709, and real cost ranges on welds and castings.',
  heroLede:
    'A 36-inch reactor nozzle weld in a Lake Charles ethylene plant looks clean to the visual inspector — cap dressed, undercut blended, no porosity at the toe. Five minutes with an AC yoke, dry magenta powder, and a 6 mm transverse crack jumps off the toe of the weld like a fluorescent marker pen. MT is the fastest, cheapest, most reliable surface-and-near-surface NDT method on ferromagnetic material — and the one most often skipped or run badly because crews underestimate how much technique matters. The physics is unforgiving: wrong magnetization direction, wrong particle type, wrong lighting, and the indication that would have shown up clear as day in the right conditions stays hidden.',
  physicsPrimer:
    'Magnetic particle testing exploits the fact that a crack in ferromagnetic material distorts an applied magnetic field, forcing flux to leak out of the surface at the discontinuity. Fine ferromagnetic particles — dry powder or wet suspension — applied to the surface migrate into the leakage field and concentrate over the defect, making it visible to the naked eye or under UV-A for fluorescent particles. ASME BPVC Section V Article 7 sets the procedure rules [1]; ASTM E709 covers practice [2]; ASTM E1444 covers aerospace MT [3]. The magnetic field must be roughly perpendicular to the suspected crack orientation — a longitudinal field detects transverse cracks, a circular field detects longitudinal cracks. Two orthogonal magnetizations per area are mandatory under most codes because no single field direction catches all crack orientations.',
  detectableDefects: [
    'Toe cracks in welds (hot cracks, cold cracks, hydrogen-assisted)',
    'Crater cracks at stop-starts in fillet and groove welds',
    'Surface-breaking lack of fusion at weld sidewalls',
    'Fatigue cracks in shafts, pins, and load-bearing pads',
    'Quench cracks in heat-treated forgings and castings',
    'Lap and seam discontinuities in hot-rolled bar and plate',
    'Grinding cracks on hardened ground surfaces',
    'Hydrogen cracks (delayed) in HSLA structural welds',
  ],
  materialsAndForms: [
    'Carbon steel and low-alloy steel welds, castings, forgings',
    'Ferritic and martensitic stainless steel (430, 410, 17-4PH)',
    'Cast iron components (gear housings, pump casings)',
    'Tool steels and case-hardened bearing races',
  ],
  whenToChoose:
    'Choose MT when the material is ferromagnetic, the suspected defects are surface or near-surface (up to about 0.060" depth for dry-powder yoke work), the geometry permits two-orthogonal magnetization passes, and the part can tolerate residual magnetism. MT is the standard for in-process and final weld inspection on carbon steel structural and pressure welds, and it is the highest-sensitivity surface method on ferromagnetic material — wet fluorescent MT under UV-A in a dark inspection booth resolves indications PT cannot match.',
  whenNotToChoose:
    'MT cannot find defects deeper than roughly 1/16" below the surface; volumetric or subsurface flaws need UT or RT. It does not work on non-ferromagnetic material — austenitic stainless (304, 316), aluminum, copper, titanium, nickel-base alloys. Heavy coatings (>0.005") suppress the leakage field. Residual magnetism is unacceptable on parts that will operate near sensitive instruments — instrumentation skids, MRI components — and demagnetization is mandatory before release. Field-induced arc burns from prod-method MT can damage high-strength steel and are prohibited on aerospace and pressure-vessel work.',
  procedure: [
    {
      heading: 'Procedure qualification and surface prep',
      level: 2,
      paragraphs: [
        'A written procedure references the governing code (ASME V Article 7, AWS D1.1 §6.14, API 1104 §11.5) and specifies the magnetizing method (yoke, prod, central conductor, coil), the particle type (dry vs wet, visible vs fluorescent), the field strength verification (Pie gauge or QQI shim), the lighting (≥100 footcandles ambient for visible, ≥1000 µW/cm² UV-A for fluorescent), and the acceptance reference. The procedure is reviewed and signed by a Level III qualified to ASNT CP-189 [4] or SNT-TC-1A.',
        'Surface prep removes loose scale, slag, weld spatter, paint flakes, and oil that would mask indications or block particle mobility. ASTM E709 §7 [2] requires the surface to be dry and free of contaminants that would prevent particles from migrating freely. A weld inspected for hydrogen cracking sits 24-48 hours after welding before MT — delayed cracks need time to develop, and inspecting too soon misses them entirely. AWS D1.5 §6.14 explicitly mandates a delay for HSLA bridge welds [5].',
      ],
    },
    {
      heading: 'Magnetization technique selection',
      level: 2,
      paragraphs: [
        'The yoke method dominates field work — Magnaflux Y-7 or Parker B-310 AC/DC electromagnetic yoke, 10-pound lifting test on AC or 40-pound on DC verifies adequate field strength under ASTM E709 §8.1.2 [2]. AC yokes give the best surface-crack sensitivity because skin effect concentrates flux at the surface. DC yokes penetrate slightly deeper (0.060" vs 0.030" practical) and catch shallow subsurface defects AC will miss. Two perpendicular yoke positions per inspection area are mandatory — typically along the weld axis and across it.',
        'Prod and central-conductor methods are used in shop work on larger parts. A prod pair injects current directly into the part at 100-125 amps per inch of prod spacing under ASTM E709 §8.4. Prods are banned on most aerospace and high-strength steel work because of arc-burn risk; central conductor through a hollow shaft or bolt avoids the burn problem entirely. Coil-shot magnetization (placing the part inside a 5-turn coil) gives a longitudinal field for inspecting transverse cracks on smaller parts.',
      ],
    },
    {
      heading: 'Particle application and field interaction',
      level: 2,
      paragraphs: [
        'Dry powder (Magnaflux 8A red, 1 gray, 3A yellow) is dusted onto the surface during magnetization using a powder bulb or shaker. Excess powder is removed with a light air bulb stream, never wiped. The technician watches for particle migration during application — the indication forms while the field is active, not after. Continuous-method MT applies particles during the magnetizing pulse and holds the pulse until the indication develops, which is the dominant field technique today.',
        'Wet fluorescent MT (Magnaflux 14A or Met-L-Check WCP-2) suspends the particles in a kerosene or water carrier and applies them via spray gun before or during the field. Under UV-A at ≥1000 µW/cm² in a darkened booth (<2 footcandles ambient white light), the indication glows yellow-green. ASTM E1444 §10 [3] mandates the lighting check at the start of every shift with a calibrated UV radiometer (Spectroline DSE-100X).',
      ],
    },
    {
      heading: 'Field strength verification',
      level: 2,
      paragraphs: [
        'The Pie gauge (a notched disc of low-carbon steel) and the QQI (quantitative quality indicator) shim verify that the field at the inspection surface is adequate. ASME V T-754 [1] requires a verification of field direction and adequacy at the start of every inspection and any time the equipment, geometry, or technique changes. A QQI shim shows a clear indication on the engraved notches when the field at the surface meets the minimum 30 oersteds (2400 A/m) typically called out by aerospace MT procedures.',
        'Gauss meters with Hall-effect probes (F.W. Bell 5180, Lake Shore 410) measure residual field after demagnetization. Most pressure-equipment specs cap residual at 3 gauss; aerospace and instrumented assemblies often cap at 1 gauss. Residual above the cap requires demagnetization through a reversing DC coil or an AC reverse-step procedure.',
      ],
    },
    {
      heading: 'Indication interpretation and disposition',
      level: 2,
      paragraphs: [
        'Indications fall into three categories: relevant (real discontinuities), non-relevant (geometric — keyways, splines, magnetic-write across mating surfaces), and false (loose particles, contamination). The technician distinguishes them by re-magnetizing perpendicular to the suspected indication, cleaning and re-particling, and confirming the indication reappears in the same location with the same orientation. Non-relevant indications get noted on the report; false indications are cleaned and disregarded.',
        'Acceptance varies by code. AWS D1.1 §6.14 [5] accepts no cracks, no incomplete penetration or fusion at the surface, and limits porosity per the visual table. ASME B31.3 §344.3.2 accepts MT to the workmanship limits of Table 341.3.2 [6]. API 1104 §11.5 [7] accepts to its own surface-defect table for pipeline welds. Any crack indication is rejectable regardless of length under every common code.',
      ],
    },
    {
      heading: 'Demagnetization and reporting',
      level: 2,
      paragraphs: [
        'Residual magnetism interferes with subsequent welding (arc blow), machining (chip adhesion), and final assembly. AC demagnetization through a reversing coil at gradually decreasing current is the field standard. The gauss-meter check after demag confirms the part meets the spec residual limit. For large weldments, a low-frequency reversing DC field through a coil wrapped around the part demagnetizes more uniformly than an AC field that may not penetrate the thickness.',
        'The MT report names the procedure, magnetization method, current type and amperage, particle type and color, lighting (visible or UV-A intensity), field verification method, all reportable indications with location and dimension, and demagnetization confirmation. ASME V §T-790 [1] lists every required field. Digital reporting systems (Atlantis NDT Reporting, Sonatest CapturePro) auto-populate the form from a barcode of the procedure and a photo of the indication.',
      ],
    },
  ],
  equipment: [
    {
      heading: 'Yokes and current sources',
      level: 2,
      paragraphs: [
        'The Magnaflux Y-7 and Parker B-310 are the dominant field-portable AC/DC yokes in North American service. Both deliver the ASTM E709 [2] 10-lb AC and 40-lb DC lifting test at full field. A spare yoke and a spare cord ride in every MT crew kit because cord failure mid-shift is the most common downtime cause.',
        'For shop work, mobile units like the Magnaflux Multi-MX and Parker DA-750 deliver 5,000-A half-wave DC for thick-section bench inspection. Pulse-method circular magnetization through clamps gives high-current short-duration shots that minimize part heating — useful on large castings where prolonged current would burn the contact pads.',
      ],
    },
    {
      heading: 'Particles and carriers',
      level: 2,
      paragraphs: [
        'Magnaflux 8A red, 1 gray, 3A yellow dry powders cover the visible-light field market. Magnaflux 14A fluorescent wet suspension dominates shop wet-fluorescent MT. Carrier choice between kerosene-based and water-based depends on the part — water-based is required on potable-water-service equipment and many food-processing applications, kerosene-based gives better wetting on oily surfaces and is the default for shop work.',
        'Particle concentration is verified daily with a centrifuge tube (Ascarite or Erlenmeyer 100 ml graduated tube) — typically 0.1 to 0.4 ml settled volume per 100 ml of suspension for fluorescent particles. ASTM E709 §X1.6 [2] gives the method and the acceptance range.',
      ],
    },
    {
      heading: 'Lighting and field verification gear',
      level: 2,
      paragraphs: [
        'For visible MT, a white-light meter (Spectroline DM-365XL) verifies ≥100 footcandles at the inspection surface. For fluorescent MT, a UV-A radiometer (Spectroline DSE-100X) verifies ≥1000 µW/cm² UV-A and <2 footcandles ambient white light. UV-A lamp bulbs degrade with age — output check at the start of every shift, replacement at any reading below the procedure threshold.',
        'Pie gauges (ASTM E709 Figure 11) and QQI shims (Magnaflux 3/8 or 1/2 inch sizes) verify field direction and adequacy at the part surface. A gauss meter (F.W. Bell 5180) measures residual field after demagnetization. All field-verification gear is calibrated annually against NIST-traceable standards.',
      ],
    },
  ],
  codesAndStandards: [
    { id: 'asme-v-art-7', source: 'ASME BPVC Section V (2023), Article 7 — Magnetic Particle Examination' },
    { id: 'astm-e709', source: 'ASTM E709-21 — Standard Guide for Magnetic Particle Testing' },
    { id: 'astm-e1444', source: 'ASTM E1444/E1444M-22 — Standard Practice for Magnetic Particle Testing (Aerospace)' },
    { id: 'asnt-cp-189', source: 'ANSI/ASNT CP-189-2020 — Qualification and Certification of NDT Personnel' },
    { id: 'aws-d1-5', source: 'AWS D1.5/D1.5M:2020 — Bridge Welding Code, §6.14' },
    { id: 'asme-b31-3', source: 'ASME B31.3 (2022), §344.3 and Table 341.3.2 — Magnetic Particle Examination' },
    { id: 'api-1104', source: 'API 1104, 22nd ed. (2021), §11.5 — Magnetic Particle Inspection' },
    { id: 'aws-d1-1', source: 'AWS D1.1/D1.1M:2020 — Structural Welding Code Steel, §6.14' },
    { id: 'iso-9934', source: 'ISO 9934-1:2016 — Non-destructive testing — Magnetic particle testing — General principles' },
  ],
  acceptanceCriteria:
    'For new-construction structural welds under AWS D1.1 §6.14 [8], any crack indication is rejectable regardless of length, lack-of-fusion indications at the surface are rejectable, and porosity follows the visual acceptance table. For ASME B31.3 piping welds, MT acceptance is per Table 341.3.2 — no cracks, no incomplete fusion, linear indications limited to 3/16" for thickness >3/4" [6]. API 1104 §11.5 [7] applies to pipeline construction and adds specific limits for arc burns and undercut measurable through MT. In-service MT under API 510 and API 570 follows the original construction code acceptance for the welded joint, modified by any approved repair-and-rerate procedure. Hydrogen-assisted cold cracks are delayed indications that may not appear for 24-48 hours after weld cooldown — MT performed too early misses them, and inspection timing must follow the procedure delay even when the schedule pressures push for immediate sign-off.',
  comparisonAgainst: [
    { method: 'Penetrant Testing (PT)', tradeoff: 'PT works on any non-porous material (austenitic stainless, aluminum, plastic) where MT cannot — but PT cannot find subsurface defects, takes 30-60 minutes per inspection cycle vs 5 minutes for MT, and uses consumable chemicals that require hazardous-waste disposal.' },
    { method: 'Eddy Current Testing (ET)', tradeoff: 'ET inspects non-ferrous surfaces and detects subsurface defects in thin material, but is sensitive to lift-off, conductivity, and permeability variations that MT ignores.' },
    { method: 'Ultrasonic Testing (UT)', tradeoff: 'UT finds volumetric and planar defects through the wall thickness, but takes longer per linear foot, costs more, and demands a higher-level certified operator than MT.' },
    { method: 'Visual Testing (VT)', tradeoff: 'VT catches gross surface defects in seconds with zero consumables, but misses tight cracks that MT picks up clearly under UV-A in a darkened booth.' },
  ],
  costRange: {
    unit: 'USD per linear foot of weld inspected (Gulf Coast crew, 2025)',
    low: 2,
    high: 6,
    mid: 3.5,
  },
  faqs: [
    {
      q: 'How long after welding should I wait before performing MT for hydrogen cracking?',
      a: 'AWS D1.5 §6.14 [5] mandates a 48-hour delay between weld completion and final MT for HSLA bridge welds because hydrogen-assisted cold cracks can take 24-48 hours to nucleate and propagate to the surface. Pressure-equipment work under ASME B31.3 typically follows the same 48-hour rule for thick-section restraint welds and quenched-and-tempered base metals. Inspecting too soon and signing off a clean MT is the most common cause of delayed weld failures in the field — the delay is not a scheduling inconvenience, it is a real-world physics requirement.',
    },
    {
      q: 'Can MT find subsurface defects?',
      a: 'MT detects subsurface defects only down to about 1/16" (0.060") below the surface with DC or half-wave DC magnetization, and only about 1/32" (0.030") with AC because of skin effect. Anything deeper requires UT or RT. The depth limit is a function of the magnetic flux leakage at the surface from a subsurface defect — beyond about a millimeter the leakage field collapses below the threshold particles can resolve. If you suspect deeper defects (lack of fusion in the root pass, midwall cracks), do not stop at MT — call out volumetric inspection.',
    },
    {
      q: 'What lighting do I need for fluorescent MT?',
      a: 'ASTM E1444 §10 [3] and ASME V T-732 [1] both require ≥1000 µW/cm² UV-A intensity at the inspection surface and <2 footcandles ambient white light at the same location. The technician verifies both with a calibrated UV radiometer and a white-light meter at the start of every shift, after every lamp warm-up (UV-A lamps need 5-10 minutes to reach stable output), and any time the inspection location changes. UV-A safety glasses are mandatory — looking directly at the lamp causes corneal damage similar to a welding flash burn.',
    },
    {
      q: 'Do I need to demagnetize a part after MT?',
      a: 'Yes, in almost every case. Residual magnetism interferes with subsequent welding (arc blow deflects the arc), machining (chips and grinding swarf adhere to magnetized surfaces), and final assembly where the part operates near sensitive instruments. Most pressure-equipment specs cap residual field at 3 gauss; aerospace caps at 1 gauss. Demagnetization through a reversing AC coil at gradually decreasing current is the field standard. A gauss meter (F.W. Bell 5180) verifies residual after demag and the reading goes into the report.',
    },
    {
      q: 'Why two yoke positions for each inspection area?',
      a: 'A magnetic field detects only defects oriented within about 45° of perpendicular to the flux lines. A longitudinal yoke pass along the weld axis catches transverse cracks; a transverse pass across the weld catches longitudinal cracks. Skipping one of the two passes leaves an entire orientation class of defects invisible. ASME V T-733 [1] and ASTM E709 §10 [2] both mandate two orthogonal magnetizations for full coverage, and the typical field rule of thumb is to overlap each pass by at least 10% of the yoke pole spacing to prevent dead zones at the corners.',
    },
  ],
  internalLinks: [
    { href: '/methods/penetrant-testing', label: 'Penetrant Testing', context: 'Switch to PT on austenitic stainless or non-ferrous material where MT physics does not work.' },
    { href: '/methods/visual-testing', label: 'Visual Testing', context: 'VT precedes MT on every weld and catches gross defects before particle work.' },
    { href: '/methods/ultrasonic-testing', label: 'Ultrasonic Testing', context: 'For subsurface and volumetric defects beyond MT depth, UT carries the inspection.' },
    { href: '/industries/oil-and-gas', label: 'Oil & Gas inspection', context: 'MT is the surface-defect standard on carbon-steel piping and vessel welds across upstream and refining.' },
    { href: '/industries/fabrication', label: 'Fabrication shops', context: 'AWS D1.1 structural fabrication uses MT for final weld QC on every load-bearing joint.' },
    { href: '/standards/asme-v', label: 'ASME BPVC Section V', context: 'Article 7 of Section V governs every MT procedure on ASME-stamped equipment.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1', context: 'AWS D1.1 §6.14 lists MT acceptance for structural steel welds.' },
    { href: '/tools/mt-yoke-lift-test', label: 'Yoke lift-test verifier', context: 'Confirm your AC/DC yoke passes the 10/40 lb test before every shift.' },
    { href: '/compare/mt-vs-pt', label: 'MT vs PT', context: 'Decision matrix for choosing between magnetic particle and dye penetrant.' },
  ],
  citations: [
    { id: 'asme-v-art-7', source: 'ASME BPVC Section V (2023), Article 7 — Magnetic Particle Examination' },
    { id: 'astm-e709', source: 'ASTM E709-21 — Standard Guide for Magnetic Particle Testing' },
    { id: 'astm-e1444', source: 'ASTM E1444/E1444M-22 — Standard Practice for Magnetic Particle Testing (Aerospace)' },
    { id: 'asnt-cp-189', source: 'ANSI/ASNT CP-189-2020 — Qualification and Certification of NDT Personnel' },
    { id: 'aws-d1-5', source: 'AWS D1.5/D1.5M:2020 — Bridge Welding Code, §6.14' },
    { id: 'asme-b31-3', source: 'ASME B31.3 (2022), §344.3 — Magnetic Particle Examination of Welds' },
    { id: 'api-1104', source: 'API 1104, 22nd ed. (2021), §11.5 — Magnetic Particle Inspection' },
    { id: 'aws-d1-1', source: 'AWS D1.1/D1.1M:2020 — Structural Welding Code Steel, §6.14' },
    { id: 'iso-9934', source: 'ISO 9934-1:2016 — Magnetic particle testing — General principles' },
  ],
};

export default method;
