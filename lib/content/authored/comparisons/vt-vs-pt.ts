import type { ComparisonContent } from '../types';

const comparison: ComparisonContent = {
  slug: 'vt-vs-pt',
  methodA: { abbreviation: 'VT', name: 'Visual Testing' },
  methodB: { abbreviation: 'PT', name: 'Liquid Penetrant Testing' },
  metaTitle: 'VT vs PT: When Visual Inspection Skips the Penetrant Step',
  metaDescription: 'Visual Testing vs Liquid Penetrant on welds, castings, and aerospace parts. AWS D1.1, ASME V Articles 6 and 9, defect resolution limits, and inspector vision standards.',
  heroLede:
    "Spec'd VT and PT on the same socket weld and wondering why both? They serve sequential, non-redundant purposes. VT catches the gross discontinuities — missed welds, undercut, profile errors, surface porosity, weld spatter — at every linear foot. PT catches the tight surface-breaking cracks (~0.05 mm wide visible PT, 0.005 mm with fluorescent) that VT can't resolve at any magnification. The decision isn't really 'either/or' — it's whether the application needs PT's tighter resolution or can stop at VT's faster, cheaper, broader coverage. ASME V Article 9 (VT) and Article 6 (PT) cover them as complementary methods.",
  sideBySide: {
    caption: 'VT vs PT — surface NDE side-by-side',
    headers: ['Attribute', 'VT (Visual Testing)', 'PT (Liquid Penetrant)'],
    rows: [
      ['Primary defect detection', 'Surface discontinuities, weld profile, geometry compliance', 'Surface-breaking cracks only — must open to surface'],
      ['Defect resolution limit', '~0.5 mm with unaided eye; ~0.1 mm with 5x magnifier', '0.05 mm visible PT; 0.005 mm fluorescent PT at proper UV'],
      ['Material limits', 'Any visible surface — no material restriction', 'Any non-porous material — stainless, aluminum, plastics, ceramics'],
      ['Surface preparation', 'Wire brush, deslag, clean to bare metal for weld inspection', 'Solvent clean to bare metal; coatings fully removed; smooth surface preferred'],
      ['Cost per linear foot', '$0.50-$2 direct VT; $2-$5 with borescope or magnifier', '$2-$5 visible PT; $4-$10 fluorescent PT'],
      ['Throughput rate', '60-150 ft/hr direct VT; 20-40 ft/hr remote VT', '15-30 ft/hr visible PT (dwell-limited); 10-20 ft/hr fluorescent'],
      ['Certification required', 'Level II VT per SNT-TC-1A; AWS CWI for structural welds', 'Level II PT per SNT-TC-1A; ASTM E1417 for aerospace'],
      ['Code coverage', 'ASME V Art. 9; AWS D1.1 §6.5; API 1104 §11.4; ISO 17637', 'ASME V Art. 6; ASTM E165; ISO 3452'],
      ['Training time to certification', '~24 hr classroom + 70 hr OJT to Level II', '~32 hr classroom + 70 hr OJT to Level II'],
      ['Equipment cost', '$200-$2,000 magnifier, weld gauge, borescope; $5K-$20K video borescope', '$200-$600 aerosol kit; $5,000+ fluorescent station'],
      ['Inspector vision requirements', 'Jaeger 2 near vision at 12"; Snellen 20/25 distance; annual color test', 'Jaeger 1 near vision; Snellen 20/30 near; annual color test'],
      ['Post-test cleanup', 'None — visual only', 'Solvent rinse to remove penetrant residue; mandatory before paint'],
    ],
  },
  whenAWins: [
    {
      scenario: 'Pre-weld fit-up and root-pass inspection during fabrication',
      reason:
        'AWS D1.1 §6.5 and ASME B31.3 §344.2 mandate visual examination of joint preparation and root pass before subsequent fill passes. PT cannot inspect mid-weld — the penetrant residue would contaminate subsequent weld passes. VT is the only method that works in-process. A Certified Welding Inspector (CWI) visual on root pass takes 30-60 seconds per weld and prevents 80% of downstream rework.',
    },
    {
      scenario: 'Gross discontinuity detection — undercut, profile errors, missed welds, weld spatter',
      reason:
        'VT catches things PT cannot: weld profile out of tolerance (AWS D1.1 §5.24), undercut beyond 1/32" depth, weld spatter that wasn\'t removed, missed weld locations entirely. PT only detects open surface-breaking flaws — it has no opinion on weld geometry or surface finish. For final acceptance under AWS D1.1, the VT portion catches 60-70% of all reportable findings.',
    },
    {
      scenario: 'High-throughput initial screening across long runs of weld',
      reason:
        'VT clears 60-150 linear feet of weld per hour with a CWI walking the joint, weld gauge in hand. PT is dwell-limited to 15-30 ft/hr. For a 5,000-foot pipeline construction project, VT screens the entire scope in 35-80 hours; PT would take 165-330 hours. The standard workflow: VT 100% of welds, PT only on welds VT flags for crack risk or service-critical joints.',
    },
    {
      scenario: 'In-service inspection where penetrant residue can\'t enter the system',
      reason:
        'Oxygen service piping (ASME B31.3 §X), pharmaceutical clean piping (ASME BPE), and food-grade stainless welds prohibit penetrant residue contact with the wetted surface. PT is not allowed on these systems without exhaustive post-cleaning. VT (often with high-magnification borescope) is the primary surface NDE method. ASME BPE §SF-2 explicitly calls out VT plus surface roughness measurement for sanitary welds.',
    },
  ],
  whenBWins: [
    {
      scenario: 'Tight crack detection where the indication is too fine for the unaided eye',
      reason:
        'VT resolution caps at ~0.5 mm with the unaided eye and ~0.1 mm with a 5x magnifier under good lighting (1000 lux per ASME V Art. 9 T-952). PT visible kit resolves cracks at 0.05 mm; PT fluorescent resolves down to 0.005 mm under 1000 µW/cm² UV. For fatigue cracks at known stress concentrators (pump shafts, crane hooks, structural beam web-to-flange welds), PT catches what VT cannot at any practical magnification.',
    },
    {
      scenario: 'Final acceptance of safety-critical aerospace or nuclear components',
      reason:
        'ASTM E1417 (aerospace PT) and ASME III NB-2546 (nuclear class 1) both require fluorescent PT as final surface NDE on safety-critical parts. The crack sensitivity (down to 0.005 mm) is below VT resolution at any magnification. Owner specs (Boeing, Lockheed, Bechtel nuclear, Westinghouse) make PT contractually mandatory for these parts regardless of VT findings.',
    },
    {
      scenario: 'Castings and forgings where surface roughness hides discontinuities',
      reason:
        'As-cast and as-forged surfaces have texture that masks fine cracks from visual inspection — the eye can\'t separate a crack from surface texture variation. PT penetrant flows into cracks but not into smooth surface texture; developer extracts only true open discontinuities. ASTM E1417 §6.5 and ASTM E165 §6.3 explicitly recommend PT for as-cast surfaces.',
    },
    {
      scenario: 'Threaded fasteners and complex internal geometry',
      reason:
        'VT of threaded sections requires either disassembly or a borescope, and even then the thread root may be inaccessible. PT applied to assembled threaded connections wicks into thread roots by capillary action and reveals fatigue cracks at the load-transfer points. API 7-1 drilling tool inspection and ASTM E1417 aerospace fastener inspection both default to PT for threaded geometry.',
    },
  ],
  whenEitherWorks: [
    {
      scenario: 'Non-critical structural weld toe inspection where defect sensitivity isn\'t the binding constraint — VT meets §6.5 at lower cost',
      pick: 'A',
    },
    {
      scenario: 'Final acceptance on a P-No. 1 carbon steel vessel weld with smooth-ground surface — PT picks up tight cracks VT would miss',
      pick: 'B',
    },
  ],
  costDifference:
    "VT is the cheapest NDE method on the planet at $0.50-$2 per linear foot of weld — the inspector\'s time and a weld gauge. PT runs $2-$5 per foot for visible-kit aerosol PT and $4-$10 per foot for fluorescent PT in a controlled environment. The cost gap reflects three things: (1) PT consumables (penetrant, emulsifier, developer) cost $0.20-$0.50 per foot of weld; (2) PT dwell time (10-15 minutes total) caps technician throughput; (3) fluorescent PT requires UV booth setup with dark adaptation that adds 5-10 minutes per weld zone. Capital cost: VT requires a $50 weld gauge plus a $200 magnifier — total $300 in tooling. PT visible kit is $200-$600 in aerosol cans and a few brushes; fluorescent PT line runs $20K-$80K for a full station. For high-volume work, VT is roughly 3-5x cheaper per weld; for high-sensitivity work, PT is the only choice and the cost is justified by what VT cannot resolve.",
  speedDifference:
    "VT throughput sits at 60-150 ft/hr direct visual on accessible welds with a CWI walking the joint. Remote VT (borescope, video probe) drops to 20-40 ft/hr because navigation and image interpretation take time. PT is dwell-limited: ASME V Art. 6 T-672 sets penetrant dwell at 5-30 minutes depending on temperature and defect type, with developer dwell adding 7-15 minutes. Field PT throughput caps at 15-30 ft/hr for visible kit and 10-20 ft/hr for fluorescent. Setup time is comparable for both — VT needs only a magnifier and lighting; PT needs solvent cleaner and penetrant ready. The decisive throughput gap is dwell: PT must wait for the chemistry to work, whereas VT is immediate. On large flat surfaces (tank floors, plate steel) PT throughput improves because penetrant covers a wide area in one application — for those geometries PT can match or exceed VT speed.",
  certificationDifference:
    "VT certification under ASNT SNT-TC-1A Level II requires 24 hours of classroom training plus 70 hours of OJT, with a written/specific/practical exam. The practical demonstrates weld profile measurement using AWS B5.16 weld gauges, discontinuity identification, and reporting. For structural welds, AWS D1.1 §6.1.4 requires the inspector to be a Certified Welding Inspector (CWI) per AWS QC1 — a separate, more demanding certification with 5-year recertification. CWI requires 1-5 years of welding experience plus a 6-hour written exam covering AWS codes, weld metallurgy, and inspection practice. PT certification is also Level II with 32 hours classroom + 70 OJT, plus the standard written/specific/practical exam structure. PT has no equivalent of the CWI overlay for structural work — Level II PT is the binding qualification. Both methods require near-vision (Jaeger 1 or 2) and color discrimination annual exams with documentation in the personnel file.",
  faqs: [
    {
      q: 'Why is VT required by AWS D1.1 even after PT?',
      a: 'AWS D1.1 §6.5 explicitly requires visual examination of all welds as the primary acceptance inspection. The reason: VT catches a different set of discontinuities than PT — weld profile errors, undercut, missed welds, weld spatter, geometry compliance with the WPS. PT only detects open surface-breaking cracks; it has no opinion on whether the weld leg dimension meets the engineering drawing or whether the welder skipped a segment. VT is the comprehensive geometry-and-discontinuity check; PT is the targeted crack-sensitivity overlay. The two are sequential, not redundant. A weld that passes PT can still fail VT for undersized leg or excessive convexity.',
    },
    {
      q: 'What inspector vision standards apply to VT?',
      a: 'ASME V Article 9 T-921 requires VT personnel to demonstrate Jaeger 2 near vision at 12 inches and Snellen 20/25 distance vision, plus annual color discrimination per ASTM E1316. AWS QC1 (CWI) requires Jaeger 1 near vision at 12 inches and 20/25 distance, plus annual recertification of the vision exam. Corrective lenses are permitted as long as the corrected vision meets the standard. For high-magnification work (5x or higher), the vision standard remains the same — the magnifier supplements but does not replace the visual acuity requirement. Personnel who fail the annual exam are restricted from VT signatory authority until corrected.',
    },
    {
      q: 'Can VT replace PT for any code application?',
      a: 'For some non-critical applications, yes — AWS D1.1 §6.5 accepts VT alone for non-cyclically loaded structural welds. ASME B31.3 §344.2 accepts VT alone for normal fluid service piping welds. But for Category M fluid service, severe cyclic service, high-pressure service, sour service, and lethal service piping, the code calls out supplemental surface NDE — PT or MT — beyond VT. For pressure vessels under ASME VIII Div. 1, UW-51 requires both VT and surface NDE on Category A and B joints for full radiography exemption. The trend: VT handles broad coverage and gross findings; surface NDE (PT or MT) handles the targeted crack sensitivity required for higher-consequence service.',
    },
    {
      q: 'What is remote VT and when is it required?',
      a: 'Remote VT uses borescopes, video probes, or robotic crawlers to inspect surfaces the inspector cannot reach directly — internal piping, vessel internals, heat exchanger tubes, internal weld root surfaces. ASME V Art. 9 T-953.2 covers remote VT and requires resolution demonstration on a calibrated test card (typically the ASME Section V test piece with EDM notches). API 510 §6.5 mandates internal VT of vessels at intervals tied to corrosion rate and remaining life. Equipment ranges from $5K rigid borescopes to $40K articulating video probes with image capture. Resolution at the working distance must demonstrate 0.5 mm crack detection on the test card before production scans.',
    },
    {
      q: 'How does PT sensitivity compare to MT on ferromagnetic steel?',
      a: 'On ferromagnetic carbon steel, MT and PT are comparable for surface-breaking crack detection — both resolve cracks down to 0.025-0.05 mm depending on technique (wet fluorescent MT at 1000 µW/cm² ≈ fluorescent PT). The differences: MT also detects sub-surface cracks up to 3 mm deep that PT cannot reach. PT works on any non-porous material; MT only on ferromagnetic alloys. For carbon steel weld inspection where sub-surface sensitivity matters and the material is magnetic, MT is the more capable choice. For stainless, aluminum, and non-ferrous alloys, PT is the only option from this pair.',
    },
  ],
  internalLinks: [
    { href: '/methods/visual-testing', label: 'Visual Testing method overview', context: 'VT inspector qualifications, weld gauges, and AWS D1.1 acceptance live in our VT deep-dive.' },
    { href: '/methods/liquid-penetrant-testing', label: 'Liquid Penetrant Testing method overview', context: 'PT visible vs fluorescent, dwell time, and post-cleaning live in our PT deep-dive.' },
    { href: '/methods/magnetic-particle-testing', label: 'Magnetic Particle Testing', context: 'MT is the alternative surface NDE method on ferromagnetic steel.' },
    { href: '/standards/asme-section-v', label: 'ASME Section V — NDE methods', context: 'VT (Article 9) and PT (Article 6) both live in ASME Section V.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1 Structural Welding Code', context: 'AWS D1.1 §6.5 and §6.14 cover VT and surface NDE for structural welds.' },
    { href: '/blog/weld-inspection-complete-guide', label: 'Weld inspection complete guide', context: 'VT, PT, MT, and volumetric NDE walked through with field examples.' },
    { href: '/learn/pt-dwell-time-calculator', label: 'PT dwell time calculator', context: 'Calculate the correct penetrant dwell time before spec\'ing PT.' },
    { href: '/free-tools/ndt-cost-calculator', label: 'NDT cost calculator', context: 'Run a per-foot cost comparison for VT-only vs VT+PT on your weld scope.' },
  ],
  citations: [
    { id: 'asme-v-art-9', source: 'ASME BPVC Section V, 2023, Article 9 — Visual Examination' },
    { id: 'asme-v-art-6', source: 'ASME BPVC Section V, 2023, Article 6 — Liquid Penetrant Examination' },
    { id: 'aws-d11-6-5', source: 'AWS D1.1/D1.1M:2020 Structural Welding Code — Steel, §6.5 Visual Inspection' },
    { id: 'aws-qc1', source: 'AWS QC1:2016, Standard for Certification of Welding Inspectors' },
    { id: 'astm-e165', source: 'ASTM E165/E165M-23, Standard Practice for Liquid Penetrant Testing' },
    { id: 'astm-e1417', source: 'ASTM E1417/E1417M-21e1, Standard Practice for Liquid Penetrant Testing (aerospace)' },
    { id: 'iso-17637', source: 'ISO 17637:2016 NDT of welds — Visual testing of fusion-welded joints' },
    { id: 'asme-bpe', source: 'ASME BPE-2022 Bioprocessing Equipment, §SF Surface Finish' },
  ],
};

export default comparison;
