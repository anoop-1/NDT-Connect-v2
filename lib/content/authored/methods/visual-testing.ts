import type { MethodContent } from '../types';

const method: MethodContent = {
  slug: 'visual-testing',
  abbreviation: 'VT',
  name: 'Visual Testing',
  metaTitle: 'Visual Testing (VT): Direct, Remote & Borescope Procedures',
  metaDescription:
    'Practical guide to visual NDT — direct VT, remote VT, borescope use, ASME V Article 9, AWS D1.1 §6.9, and acceptance criteria for welds and pressure equipment.',
  heroLede:
    'Every NDT job starts with visual testing whether the inspector calls it that or not. A welder dressing the cap of a fillet weld looks for undercut, overlap, and start-stop crater cracks before the MT crew arrives — that look is visual NDT, and on a structural job under AWS D1.1, the Level II VT inspector has more reject authority than the volumetric methods combined. ASME V Article 9 [1], AWS D1.1 §6.9 [2], and API 510 §5.5.1 [3] all elevate VT from a courtesy walk-through to a formal procedure with calibrated equipment, written acceptance criteria, and signed reports. Done properly, VT catches 60-70% of all weld defects before any other method touches the part — and it costs less per linear foot than any other NDT method available.',
  physicsPrimer:
    'Visual testing relies on the inspector\'s eye, ambient or aided lighting, and physical or optical access to the inspection surface. The physics is straightforward — reflected light from a defect contrasts with the surrounding surface — but the discipline of executing VT to a procedure is anything but trivial. ASME V Article 9 [1] sets procedure rules, acceptable equipment categories (direct visual, remote visual, translucent visual), lighting minimums (≥100 footcandles for direct VT at the part), and inspector visual-acuity requirements. ASTM E165 cross-references VT with PT [4]; ASTM E1316 defines VT terminology [5]. Inspector visual acuity is verified annually by a Jaeger 2 near-vision card at 12 inches and a color-vision plate test per ASNT CP-189 [6]. An inspector who cannot read Jaeger 2 type with corrective lenses fails the visual-acuity test and cannot perform VT under any code.',
  detectableDefects: [
    'Undercut, overlap, and cap reinforcement violations on welds',
    'Surface cracks visible to the naked eye or under low magnification',
    'Surface porosity (single, cluster, linear, wormhole)',
    'Lack of fusion at the toe of the weld',
    'Burn-through and excessive penetration',
    'Arc strikes outside the weld zone (a common reject under AWS D1.1)',
    'External corrosion (general, pitting, blistering, scaling)',
    'Mechanical damage (gouges, denting, ovality, distortion)',
  ],
  materialsAndForms: [
    'All weld surfaces (groove, fillet, partial penetration) regardless of base material',
    'Pressure vessel exterior and interior surfaces (with remote VT for confined entry)',
    'Storage tank shell, roof, floor, and nozzle attachments',
    'Piping exterior, including hangers, supports, and insulation jacketing',
    'Bolted connection surfaces and gasket faces',
  ],
  whenToChoose:
    'VT is mandatory on every weld under every common construction code as the first inspection — ASME B31.3 §344.2.1 [7], AWS D1.1 §6.9 [2], API 1104 §11.1 [8] all require 100% visual before any other NDT. VT is the standard in-service method for external condition assessment of pressure vessels (API 510 §6.4 [3]) and aboveground storage tanks (API 653 §6 [9]). Remote VT with a borescope or RVI camera handles internal vessel inspection where confined-space entry would require permits, atmospheric monitoring, and standby rescue.',
  whenNotToChoose:
    'VT cannot find subsurface defects. It cannot resolve cracks tighter than about 0.005-0.010" width without aiding magnification or supplementary methods. It is operator-dependent — different inspectors interpret the same indication differently, particularly on borderline undercut or porosity. Lighting below the procedure minimum (100 footcandles direct, application-specific for remote VT) invalidates the inspection. VT in cold-weather field conditions where the inspector cannot maintain steady visual focus through bulky gloves or face shields gets a high false-negative rate.',
  procedure: [
    {
      heading: 'Procedure qualification and inspector vision',
      level: 2,
      paragraphs: [
        'A written VT procedure references the governing code (ASME V Article 9 [1], AWS D1.1 §6.9 [2], API 510 §6.4 [3]) and lists the inspection equipment (mirror, magnifier, light source), the lighting minimum, the access plan, the acceptance criteria, and the inspector certification. The procedure is reviewed and signed by a Level III qualified to SNT-TC-1A or CP-189 [6].',
        'Inspector visual acuity is verified annually. ASNT CP-189 §9.2 [6] requires near-vision verification with a Jaeger J-2 chart at 12 inches (corrective lenses allowed) and color-vision verification with an Ishihara plate test. The vision test results are documented in the inspector\'s certification file. An inspector with vision below the threshold cannot perform VT — and most field crews now run a quick vision check on Monday morning before mobilizing to verify nothing has changed.',
      ],
    },
    {
      heading: 'Lighting and surface preparation',
      level: 2,
      paragraphs: [
        'Direct VT requires ≥100 footcandles at the inspection surface per ASME V T-952 [1]. A white-light meter (Spectroline DM-365XL) verifies the level at the start of every shift and any time the inspection location changes. Overhead and confined-space inspection often falls below the threshold even with portable lighting — supplemental LED work lights bring the level above the minimum. Translucent VT (looking through thin glass or plastic for fractures) and remote VT have their own lighting requirements specified in the procedure.',
        'Surface prep removes loose scale, slag, weld spatter, and oil that mask indications. ASME B31.3 §344.2.1 [7] requires the weld surface to be cleaned to a condition that permits a meaningful visual examination — wire-brush cleaning is the field standard, with grinding for cap dressing where the as-welded condition would prevent VT (e.g., heavily-piled MIG cap that hides toe cracks). Welds with arc burn outside the weld zone get rejected under AWS D1.1 §5.30 [2] regardless of size — clean the surface and look at the heat-affected zone carefully.',
      ],
    },
    {
      heading: 'Direct VT execution',
      level: 2,
      paragraphs: [
        'The inspector positions to view the inspection surface within 24 inches at an angle of at least 30° from the surface plane per ASME V T-953 [1]. A pocket mirror, a magnifier (typically 5×-10×), a fillet weld gauge (Cambridge gauge, V-WAC gauge), and a flashlight cover most field VT work. The scan is methodical — start at the start of the weld and follow the joint, marking every indication on a sketch or directly on the part with paint pen.',
        'Weld dimensional checks happen during VT. The fillet leg length, throat thickness, undercut depth, reinforcement height, and concavity are all measured against the procedure or WPS limits. A Cambridge gauge (Palmgren or G.A.L.) measures fillet leg, throat, undercut, and porosity-pit depth in a single tool. AWS D1.1 §5.24 [2] gives the dimensional limits for structural fillet welds; ASME B31.3 §341.3 covers pipe welds.',
      ],
    },
    {
      heading: 'Remote VT and borescope inspection',
      level: 2,
      paragraphs: [
        'Remote VT uses a borescope, fiberscope, or video camera to inspect surfaces not accessible by direct VT. ASME V Article 9 §T-952 [1] requires the remote system to demonstrate the ability to resolve a 1/32" (0.8 mm) test character at the maximum working distance — typically demonstrated against a black-on-white test card. Standard tools include Olympus IPLEX GX/GT articulating videoscopes (4-6 mm tip), Karl Storz Techno Pack, and Everest VideoProbe systems.',
        'Internal vessel inspection during turnaround typically uses remote VT to clear the vessel for confined-space entry. A pre-entry borescope shot through the manway documents internal condition, identifies surface defects for follow-up direct VT, and flags any structural concerns that would change the entry plan. API 510 §5.5 [3] permits remote VT in lieu of internal entry where the asset owner approves and the inspection plan documents the substitution.',
      ],
    },
    {
      heading: 'Indication recording and disposition',
      level: 2,
      paragraphs: [
        'Every reportable indication is recorded by location (station, distance from datum, clock position) and dimension (length, width, depth). Photographs at the indication with a scale (typically a paint-marker length-reference or a fillet-gauge in frame) accompany the report for any indication above the acceptance threshold. Modern field reporting (Atlantis NDT Reporting, GoCanvas) attaches photos automatically to the digital indication record.',
        'Disposition follows the code. For new-construction welds, indications above the limit go back to the welder for repair, with re-VT after repair grinding and re-welding. For in-service VT, indications go to the inspection engineer for fitness-for-service evaluation under API 579 [10] or similar. The VT report names every indication and its disposition — accept, repair, monitor, or refer.',
      ],
    },
    {
      heading: 'Reporting and certification',
      level: 2,
      paragraphs: [
        'The VT report names procedure, inspector name and certification level, vision-test date, lighting (footcandles measured), equipment used (mirror, magnifier, borescope model and serial number), inspection date, every indication, and disposition. ASME V §T-980 [1] gives the required fields. AWS D1.1 §6.9.4 [2] requires the AWS Certified Welding Inspector (CWI) signature on the report for structural work.',
        'For API in-service work, the inspector must be API Certified — 510 for pressure vessels, 570 for piping, 653 for storage tanks. The certification number and expiry date appear on every report. An expired API certification voids the report, even if the inspector retook the exam the next day — the report date must fall within the certification validity period.',
      ],
    },
  ],
  equipment: [
    {
      heading: 'Direct VT tools',
      level: 2,
      paragraphs: [
        'Standard field VT kit: a 5× pocket magnifier (Bausch & Lomb 81-31-65), a high-CRI LED flashlight (Streamlight 88040), a fillet weld gauge (Palmgren V-WAC), a pocket mirror, a calibrated pit gauge, a steel rule, and a paint marker. White-light meter (Spectroline DM-365XL) verifies the 100-footcandle minimum.',
        'Crack-comparator cards (Western Instruments WCG-1) give a visual reference for crack-width estimation when a crack is found. Surface-roughness comparator (GAR Plate) helps the inspector classify finish quality where surface preparation is a contract requirement.',
      ],
    },
    {
      heading: 'Remote VT and borescopes',
      level: 2,
      paragraphs: [
        'The Olympus IPLEX GX/GT videoscope with 4 mm or 6 mm articulating tip dominates the industrial remote VT market. The Everest VideoProbe Mentor Visual iQ and Karl Storz Techno Pack are the other workhorses. Working channels range from 3 mm to 12 mm OD; the smaller scopes get into heat-exchanger tubes and small-bore piping, the larger scopes handle vessel internal and bundle inspection.',
        'Resolution verification — the system must resolve a 1/32" (0.8 mm) character at the maximum working distance per ASME V T-952 [1] — happens at the start of every shift against a black-on-white test card. The card and the resolution verification log ship in the borescope kit.',
      ],
    },
    {
      heading: 'Drone and crawler systems',
      level: 2,
      paragraphs: [
        'Drone VT (Flyability Elios 3, Skydio X10) inspects tank internals, flare stacks, and confined spaces without human entry. The drone carries a high-resolution camera, LED lighting, and obstacle-avoidance lidar. ASME V Article 9 [1] does not yet explicitly recognize drone VT but does not exclude it — most operators run drone footage as supplementary to a procedure-qualified borescope or direct VT.',
        'Crawler systems (Inuktun MaggHD, Eddyfi Inuktun) carry cameras inside piping for in-service VT of internal corrosion and erosion patterns. The crawler\'s odometer reports indication position relative to a datum (typically the inlet flange).',
      ],
    },
  ],
  codesAndStandards: [
    { id: 'asme-v-art-9', source: 'ASME BPVC Section V (2023), Article 9 — Visual Examination' },
    { id: 'aws-d1-1', source: 'AWS D1.1/D1.1M:2020 — Structural Welding Code Steel, §6.9 — Visual Inspection' },
    { id: 'api-510', source: 'API 510, 11th ed. (2022), §5.5 and §6.4 — Visual Inspection' },
    { id: 'astm-e165', source: 'ASTM E165/E165M-23 — Liquid Penetrant Testing (includes VT cross-reference)' },
    { id: 'astm-e1316', source: 'ASTM E1316-22 — Standard Terminology for Nondestructive Examinations' },
    { id: 'asnt-cp-189', source: 'ANSI/ASNT CP-189-2020 — Qualification and Certification of NDT Personnel, §9.2' },
    { id: 'asme-b31-3', source: 'ASME B31.3 (2022), §344.2 — Visual Examination' },
    { id: 'api-1104', source: 'API 1104, 22nd ed. (2021), §11.1 — Visual Inspection' },
    { id: 'api-653', source: 'API 653, 5th ed. (2014), §6 — Inspection' },
    { id: 'iso-17637', source: 'ISO 17637:2016 — Non-destructive testing of welds — Visual testing of fusion-welded joints' },
  ],
  acceptanceCriteria:
    'For new-construction structural welds under AWS D1.1 §5.24 [2], undercut deeper than 1/32" or longer than 10% of the weld length is rejectable, reinforcement above 1/8" on butt welds is rejectable, any crack indication is rejectable, and arc strikes outside the weld zone are rejectable regardless of size. For ASME B31.3 piping welds, §344.2 [7] gives the visual acceptance limits — no cracks, lack of fusion limited to weld-toe areas with specific length caps, porosity per Table 341.3.2, reinforcement caps by service category. For in-service VT under API 510 §6.4 [3], findings drive fitness-for-service evaluation or repair-and-rerate. For API 653 tank inspection [9], shell, roof, and bottom defects each have category-specific dimensional limits — bottom plate corrosion exceeding 50% of original thickness drives repair-or-replace decisions. Arc strikes, weld undercut, and external corrosion are the most common reject categories in field VT and account for the bulk of weld rework dispatches on Gulf Coast turnaround projects.',
  comparisonAgainst: [
    { method: 'Magnetic Particle Testing (MT)', tradeoff: 'MT finds tight surface cracks that VT may miss but cannot replace VT for dimensional and macro-defect inspection — MT and VT are complementary, not interchangeable.' },
    { method: 'Penetrant Testing (PT)', tradeoff: 'PT pulls out tight cracks via capillary action that VT misses, but requires 30-60 minute cycle time per area vs immediate VT result.' },
    { method: 'Remote Visual Inspection (RVI)', tradeoff: 'RVI uses a borescope to inspect surfaces not accessible by direct VT — same acceptance criteria, different access tool.' },
    { method: 'Ultrasonic Testing (UT)', tradeoff: 'UT finds subsurface defects VT cannot see, but VT must precede UT to clear gross surface condition before scan.' },
  ],
  costRange: {
    unit: 'USD per linear foot of weld inspected (Gulf Coast crew, 2025)',
    low: 1,
    high: 4,
    mid: 2,
  },
  faqs: [
    {
      q: 'Do I need ASNT certification for VT or does an AWS CWI count?',
      a: 'For ASME-stamped pressure equipment work, the inspector must be qualified to SNT-TC-1A or ANSI/ASNT CP-189 [6] under the employer\'s written practice — typically Level II VT. An AWS Certified Welding Inspector (CWI) holds visual-inspection authority for AWS code work (D1.1, D1.5) and is recognized by most ASME B31.3 client specs as well, but the employer\'s written practice must explicitly accept CWI as equivalent to ASNT Level II for VT. For API 510, 570, and 653 in-service work, the inspector must hold the matching API certification — those API certs include a VT component and are the operating credential for the work category.',
    },
    {
      q: 'How often does an inspector\'s vision need to be tested?',
      a: 'ASNT CP-189 §9.2 [6] requires annual visual-acuity verification. The test is a Jaeger J-2 near-vision card at 12 inches (corrective lenses allowed) and a color-vision plate test (Ishihara or equivalent). The results are documented in the inspector\'s certification file with the test date, the optometrist or designated testing agent, and the result. An inspector whose vision falls below the threshold cannot perform VT until corrective lenses bring vision back into spec; if vision cannot be corrected, the inspector\'s VT certification is suspended.',
        },
    {
      q: 'When does the code permit remote VT instead of direct VT?',
      a: 'ASME V Article 9 [1] permits remote VT where direct VT is impractical due to access limitation, provided the remote system demonstrates the ability to resolve a 1/32" test character at the maximum working distance. API 510 §5.5 [3] permits remote VT in lieu of internal entry for pressure vessels with the asset owner\'s approval and a documented inspection plan. AWS D1.1 §6.9 [2] requires direct VT for structural weld inspection — remote VT can supplement but does not substitute. The procedure must explicitly cover the remote method and the resolution verification at every inspection.',
    },
    {
      q: 'What lighting do I need for direct VT?',
      a: 'ASME V T-952 [1] sets 100 footcandles minimum at the inspection surface for direct VT. The white-light meter reading is taken at the start of every shift and any time the inspection location changes. In overhead and confined-space work, ambient lighting often falls below the minimum — supplemental LED work lights bring the level above 100 fc and the technician documents the additional lighting in the inspection record. AWS D1.1 §6.9 [2] adopts the same 100 fc minimum. Translucent VT (looking through thin glass or plastic) has lower lighting requirements specified in the procedure.',
    },
    {
      q: 'Are smartphone photos acceptable for VT documentation?',
      a: 'Most modern code interpretations accept smartphone or tablet photos as supplementary documentation provided the camera resolution meets the inspection procedure and a length-reference scale appears in frame at every indication. ASME V Article 9 [1] does not specify camera technology — only that the documentation must show the indication and its location clearly. Many field reporting platforms (Atlantis NDT Reporting, GoCanvas, FieldEye) integrate phone cameras directly into the indication record with EXIF data and GPS for traceability. The professional VT report still needs the inspector\'s narrative and sketch — photos supplement, not replace.',
    },
  ],
  internalLinks: [
    { href: '/methods/magnetic-particle-testing', label: 'Magnetic Particle Testing', context: 'MT follows VT on every ferromagnetic weld to find tight cracks VT misses.' },
    { href: '/methods/penetrant-testing', label: 'Penetrant Testing', context: 'PT pulls out tight surface cracks below VT resolution on non-ferromagnetic material.' },
    { href: '/methods/ultrasonic-testing', label: 'Ultrasonic Testing', context: 'VT precedes UT to clear gross surface condition before volumetric scan.' },
    { href: '/industries/oil-and-gas', label: 'Oil & Gas inspection', context: 'API 510, 570, and 653 in-service work uses VT as the first inspection on every asset.' },
    { href: '/industries/fabrication', label: 'Fabrication shops', context: 'AWS D1.1 structural fabrication uses VT for 100% weld inspection before any other NDT.' },
    { href: '/standards/asme-v', label: 'ASME BPVC Section V', context: 'Article 9 of Section V governs every VT procedure on ASME-stamped equipment.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1', context: 'AWS D1.1 §6.9 sets VT acceptance for structural steel welds.' },
    { href: '/tools/weld-fillet-gauge', label: 'Fillet weld gauge', context: 'Compute correct fillet leg and throat thickness from VT measurements.' },
    { href: '/learn/api-cwi-difference', label: 'API vs CWI certification', context: 'Decision matrix for which inspector certification fits your scope.' },
  ],
  citations: [
    { id: 'asme-v-art-9', source: 'ASME BPVC Section V (2023), Article 9 — Visual Examination' },
    { id: 'aws-d1-1', source: 'AWS D1.1/D1.1M:2020 — Structural Welding Code Steel, §6.9' },
    { id: 'api-510', source: 'API 510, 11th ed. (2022), §5.5 and §6.4 — Visual Inspection' },
    { id: 'astm-e165', source: 'ASTM E165/E165M-23 — Liquid Penetrant Testing' },
    { id: 'astm-e1316', source: 'ASTM E1316-22 — Terminology for Nondestructive Examinations' },
    { id: 'asnt-cp-189', source: 'ANSI/ASNT CP-189-2020 — Qualification and Certification of NDT Personnel' },
    { id: 'asme-b31-3', source: 'ASME B31.3 (2022), §344.2 — Visual Examination' },
    { id: 'api-1104', source: 'API 1104, 22nd ed. (2021), §11.1 — Visual Inspection' },
    { id: 'api-653', source: 'API 653, 5th ed. (2014), §6 — Inspection' },
    { id: 'api-579', source: 'API 579-1/ASME FFS-1 (2021) — Fitness-for-Service' },
  ],
};

export default method;
