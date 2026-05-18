import type { ComparisonContent } from '../types';

const comparison: ComparisonContent = {
  slug: 'ut-vs-rt',
  methodA: { abbreviation: 'UT', name: 'Ultrasonic Testing' },
  methodB: { abbreviation: 'RT', name: 'Radiographic Testing' },
  metaTitle: 'UT vs RT: When to Spec Ultrasonic or Radiography on Welds',
  metaDescription: 'UT vs RT for butt welds, castings, and corrosion mapping. Cost per linear foot, throughput, code coverage under ASME V/VIII and API 1104. Inspector-written.',
  heroLede:
    "Spec'd both UT and RT for the same butt weld? The decision usually comes down to material thickness, geometry access, and turnaround time, not capability. Both methods are accepted under ASME Section V Article 4 (UT) and Article 2 (RT), and both are referenced as primary volumetric methods in ASME B31.3 §344 and API 1104 §11.1. The real selector is whether you need a film record, whether you can clear an exclusion zone, and whether the indication you're chasing is planar (favors UT) or volumetric (favors RT).",
  sideBySide: {
    caption: 'UT vs RT — head-to-head on the attributes that drive the spec',
    headers: ['Attribute', 'UT (Ultrasonic)', 'RT (Radiographic)'],
    rows: [
      ['Primary defect detection', 'Planar flaws (cracks, LOF, LOP) — high sensitivity', 'Volumetric flaws (porosity, slag, voids) — high sensitivity'],
      ['Sensitivity to tight cracks', '1-2% of wall thickness with calibrated angle beam', 'Poor for cracks parallel to beam; needs 2T sensitivity per ASME V'],
      ['Material thickness range', '6 mm to 300+ mm carbon steel; thicker with TOFD', 'Practical limit ~75 mm steel with Ir-192; Co-60 up to 200 mm'],
      ['Surface preparation', 'Couplant contact zone wire-brushed; no paint removal needed for most contact UT', 'Surface cleaning minimal; weld cap/root grind only if interpretation requires it'],
      ['Cost per linear foot of weld', '$3-$8 manual UT; $12-$25 PAUT', '$8-$20 film RT; $6-$14 digital/CR; $4-$10 in-process panoramic'],
      ['Throughput rate', '20-40 ft/hr manual angle beam; 60-120 ft/hr encoded PAUT', '8-20 shots/hr film RT (incl. processing); 30-60 shots/hr DR'],
      ['Certification required', 'ASNT SNT-TC-1A Level II minimum; CP-189 or ACCP for nuclear', 'Same Level II minimum; radiation safety officer (RSO) required per 10 CFR 34'],
      ['Code coverage', 'ASME V Art. 4, ASME VIII Div. 1 UW-53, API 1104 §11.3, AWS D1.1 §6.20', 'ASME V Art. 2, ASME VIII UW-51, API 1104 §11.1, AWS D1.1 §6.17'],
      ['Training time to Level II', '~400 hours classroom + OJT (ASNT recommendation)', '~280 hours classroom + OJT; plus 40+ hours radiation safety'],
      ['Exclusion zone / hazard', 'None — contact method, no radiation', 'Up to 200 ft radius for Ir-192 sources; shutdown of adjacent work'],
      ['Record / re-readable evidence', 'A-scan/S-scan files (with encoded PAUT or digital flaw detector)', 'Permanent film or DICONDE digital image — auditor-friendly'],
      ['Geometry constraints', 'Needs flat or contoured contact surface; nozzle welds need wedge customization', 'Needs two-sided access for SWSI; SWDI possible for small bore'],
    ],
  },
  whenAWins: [
    {
      scenario: 'In-service refinery turnaround where adjacent work cannot stop',
      reason:
        'UT has no exclusion zone. A 200 ft radiation barrier shuts down half the unit during an outage; angle-beam UT or PAUT lets pipefitters, scaffolders, and other trades keep working in the same module. On a typical Gulf Coast catcracker turnaround, eliminating RT exclusion zones recovers 4-8 crew-hours per shift.',
    },
    {
      scenario: 'Heavy-wall pressure vessel circ welds above 75 mm',
      reason:
        'Ir-192 runs out of penetration around 75 mm steel; Co-60 carries higher hazard and longer exposures. ASME VIII Div. 2 §7.5.5 explicitly permits UT in lieu of RT for thicknesses where UT sensitivity is equivalent or better. PAUT with TOFD becomes the practical primary method above 50 mm.',
    },
    {
      scenario: 'Planar defect detection in austenitic or duplex welds where you must catch tight cracks',
      reason:
        'Tight, in-plane cracks (lack of side-wall fusion, hydrogen-induced cracks) are notoriously RT-invisible — the beam passes through the crack opening without enough density change. Angle-beam UT at 45°/60°/70° catches these because the ultrasonic wave reflects off the crack face. ASME B31.3 §344.6 acknowledges UT as preferred for crack-prone service.',
    },
    {
      scenario: 'Tight schedule where real-time interpretation matters',
      reason:
        "Manual UT gives accept/reject calls at the weld. RT film needs developing (45-60 min minimum) and digital RT still requires shielding and exposure setup. On a fast-track structural project (AWS D1.1) UT lets the inspector clear a weld and release it to coating same shift.",
    },
  ],
  whenBWins: [
    {
      scenario: 'Volumetric defect characterization — porosity, slag, gas pockets',
      reason:
        'Scattered porosity and elongated slag are RT\'s sweet spot. A 1.5 mm gas pocket shows as a clear dark spot on film; on UT it produces an ambiguous, low-amplitude signal that\'s easy to dismiss as noise. ASME V Art. 2 T-275 gives explicit IQI sensitivity (2-2T) for these defects.',
    },
    {
      scenario: 'New construction welds where the owner wants permanent archival imagery',
      reason:
        'Many EPC contracts (especially refinery and pipeline) require film or DICONDE archives for 25-40 years. UT data files are harder to defend in a future failure investigation than a film shot. API 1104 still treats RT as the default volumetric method for cross-country pipeline.',
    },
    {
      scenario: 'Thin-wall material below 6 mm where UT near-surface dead zone is a problem',
      reason:
        'Below ~6 mm, the UT dead zone (first 1-2 mm under the transducer) hides upper-wall indications. RT has no dead zone — penetrameter sensitivity is consistent through the full thickness. Common scenario: 4 mm stainless tubing, small-bore piping ≤ NPS 2.',
    },
    {
      scenario: 'Castings and forgings with complex internal geometry',
      reason:
        'UT on castings is hampered by coarse grain scatter and complex back-wall echoes. RT cuts through the geometry with a single shot. ASME VIII UW-51(b) and ASTM E1742 still call out RT as primary for castings and heavy forgings where grain structure defeats sound transmission.',
    },
  ],
  whenEitherWorks: [
    {
      scenario: 'Carbon steel butt welds 12-50 mm wall under ASME B31.3 normal fluid service — both methods qualified, pick on cost and access',
      pick: 'A',
    },
    {
      scenario: 'AWS D1.1 dynamically loaded structural welds — Table 8.2 accepts UT or RT for groove welds in butt joints',
      pick: 'A',
    },
  ],
  costDifference:
    "Manual UT runs $3-$8 per linear foot of weld on a typical Gulf Coast spread rate; manual film RT lands at $8-$20 per linear foot once you include source rental, film stock, processing, and the radiation safety officer's billable time. Digital RT (CR or DR) narrows the gap to roughly 1.5x UT, but pays back faster on long runs because you skip film processing. PAUT sits in the middle: $12-$25 per foot, but the encoded data file replaces both UT paperwork and RT film for code-compliant retention under ASME V Art. 4 T-432. The hidden cost is shutdown: a single RT shot on a live unit can idle a 20-person crew for 30 minutes inside an exclusion zone — that's $500-$1,000 in lost productivity per shot before the inspection bill even arrives.",
  speedDifference:
    "Throughput differs by an order of magnitude depending on which form of each method you compare. A manual contact-UT technician with a 5 MHz angle-beam probe clears 20-40 ft of weld per hour including layout, scanning, and indication sizing. Encoded PAUT with a wedge fixture and a scanner triples that to 60-120 ft/hr, with the data already archived. RT throughput is gated by exposure time: an Ir-192 panoramic shot on NPS 12 schedule 80 takes 90-180 seconds of exposure plus 5-10 minutes of setup, geometry, and shielding — call it 12-15 shots per hour for an experienced two-person crew. Film processing adds another 45-60 minutes batched. Digital DR cuts processing to seconds and lets you double shot rate, but the exclusion zone still bottlenecks the surrounding crew.",
  certificationDifference:
    "Both methods require ASNT SNT-TC-1A Level II certification at a minimum, with the employer's written practice defining specific training hours, on-the-job time, and eye exams (Snellen near-vision 20/30 or better, color discrimination annual). UT Level II training time is roughly 400 hours of combined classroom and OJT under ASNT recommendation, with a higher classroom load for PAUT (which often requires an additional 80-hour PAUT-specific endorsement and a written practice update). RT carries the same Level II training floor (~280 hours) plus a mandatory radiation safety qualification — typically a 40-hour Radiation Safety Officer course under 10 CFR 34.43, plus state-specific licensure (Texas Department of State Health Services, Louisiana DEQ, etc.). For nuclear-related work both methods step up to ACCP Level II or ASNT CP-189 with employer-specific qualification testing, and the RT side adds NRC-licensed RSO oversight.",
  faqs: [
    {
      q: 'Can UT replace RT under ASME Section VIII?',
      a: 'Yes, with limits. ASME Section VIII Division 1 Code Case 2235 (now incorporated into Division 2 §7.5.5) permits UT in lieu of RT for full-penetration butt welds where the UT procedure is demonstrated to match or exceed RT sensitivity on representative defects. The owner-user must approve the substitution and the procedure must be qualified under ASME V Article 4 with documented essential variables. In practice, PAUT with TOFD is the qualifying configuration; manual angle-beam alone rarely passes the demonstration block test.',
    },
    {
      q: 'Why does RT miss cracks that UT catches?',
      a: 'RT relies on density contrast: a defect must remove enough material along the beam path to register on film as a density change of at least the IQI sensitivity (2-2T per ASME V T-275). A tight crack with a 0.05 mm opening parallel to the radiation beam removes almost no material in the beam direction, so the film density barely shifts. UT angle beam scatters off the crack face regardless of opening width — a 0.1 mm planar crack produces a clear, sizable signal at 70° refracted shear wave. This is why API 1104 cross-country pipeline guidance has shifted toward UT/PAUT for high-risk cracking service.',
    },
    {
      q: 'Which method is faster for new pipeline construction?',
      a: 'For cross-country pipeline new construction, automated UT (AUT) with phased-array zonal discrimination is now faster than RT crawler systems on welds over 12 mm. AUT clears 80-150 welds per shift on a 36-inch line with real-time accept/reject. RT crawlers on the same line clear 40-70 shots per shift, plus the exclusion zone forces all crews to clear during exposure. API 1104 Annex A and DNV-ST-F101 explicitly qualify AUT zonal discrimination as the primary volumetric method for offshore and large-diameter onshore pipeline.',
    },
    {
      q: 'What about hybrid spec — RT plus UT?',
      a: 'Some critical-service piping specs (cryogenic, high-temperature hydrogen, ammonia service) call for both. The rationale: RT catches the volumetric defects (porosity, slag) that drive fatigue, while UT catches the planar defects (LOF, cracks) that drive fracture. ASME B31.3 §K344 (high pressure piping) and many owner specs in petrochemical hydrogen service mandate this belt-and-suspenders approach. Cost goes up roughly 60-80% versus single-method, so it\'s reserved for hydrogen, sour service, and lethal-service piping per B31.3 §300.2.',
    },
    {
      q: 'Is digital RT close enough to UT to replace it?',
      a: 'Digital RT (CR using image plates, or DR using flat-panel detectors) improves resolution and dynamic range over film but does not change the underlying physics — it still struggles with tight planar cracks oriented unfavorably to the beam. CR/DR are excellent at improving RT throughput and archive quality, but they don\'t close the gap on crack detection sensitivity. The right framing: digital RT replaces film RT; it does not replace UT for planar defect work.',
    },
  ],
  internalLinks: [
    { href: '/methods/ultrasonic-testing', label: 'Ultrasonic Testing method overview', context: 'Manual contact UT and angle beam basics are covered in our UT method deep-dive.' },
    { href: '/methods/radiographic-testing', label: 'Radiographic Testing method overview', context: 'RT procedure, source selection, and IQI sensitivity are detailed in our RT method deep-dive.' },
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT method overview', context: 'PAUT is the modern bridge between manual UT and RT for code-quality weld inspection.' },
    { href: '/methods/tofd', label: 'Time-of-Flight Diffraction (TOFD)', context: 'TOFD is the high-sensitivity UT technique commonly paired with PAUT to substitute for RT on heavy wall.' },
    { href: '/standards/asme-section-v', label: 'ASME Section V — NDE methods', context: 'Both UT (Article 4) and RT (Article 2) procedural requirements live in ASME Section V.' },
    { href: '/standards/api-1104', label: 'API 1104 — pipeline welding', context: 'API 1104 §11 sets the radiographic and ultrasonic acceptance criteria for cross-country pipeline.' },
    { href: '/free-tools/ndt-cost-calculator', label: 'NDT cost calculator', context: 'Run a UT vs RT cost comparison for your specific weld count and access conditions.' },
    { href: '/free-tools/exclusion-zone-calculator', label: 'Radiation exclusion zone calculator', context: 'Calculate the RT exclusion zone before you commit to a film or DR shot.' },
    { href: '/blog/ut-vs-rt-comparison', label: 'UT vs RT — long-form blog', context: 'Field examples and case studies pairing UT and RT decisions on real refinery turnarounds.' },
  ],
  citations: [
    { id: 'asme-v-art-2', source: 'ASME BPVC Section V, 2023, Article 2 — Radiographic Examination', url: 'https://www.asme.org/codes-standards/find-codes-standards/bpvc-v' },
    { id: 'asme-v-art-4', source: 'ASME BPVC Section V, 2023, Article 4 — Ultrasonic Examination Methods for Welds' },
    { id: 'asme-viii-uw-51', source: 'ASME BPVC Section VIII Div. 1, 2023, UW-51 Radiographic Examination of Welded Joints' },
    { id: 'asme-viii-7-5-5', source: 'ASME BPVC Section VIII Div. 2, 2023, §7.5.5 UT in lieu of RT' },
    { id: 'api-1104', source: 'API Standard 1104, 22nd ed., 2021, §11.1 (Radiography) and §11.3 (Ultrasonic)' },
    { id: 'aws-d11', source: 'AWS D1.1/D1.1M:2020 Structural Welding Code — Steel, Clauses 6.17 (RT) and 6.20 (UT)' },
    { id: '10-cfr-34', source: '10 CFR Part 34 — Licenses for Industrial Radiography, U.S. NRC', url: 'https://www.nrc.gov/reading-rm/doc-collections/cfr/part034/' },
    { id: 'asnt-cp-189', source: 'ASNT CP-189-2020 Standard for Qualification and Certification of Nondestructive Testing Personnel' },
    { id: 'b31-3', source: 'ASME B31.3, 2022, Process Piping, §344 Examination Requirements' },
  ],
};

export default comparison;
