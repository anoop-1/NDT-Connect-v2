import type { ComparisonContent } from '../types';

const comparison: ComparisonContent = {
  slug: 'paut-vs-rt',
  methodA: { abbreviation: 'PAUT', name: 'Phased Array Ultrasonic Testing' },
  methodB: { abbreviation: 'RT', name: 'Radiographic Testing' },
  metaTitle: 'PAUT vs RT: When Phased Array Replaces Radiography on Welds',
  metaDescription: 'PAUT vs radiographic testing on butt welds and vessels. ASME VIII §7.5.5 substitution, API 1104 Annex A, cost per weld, throughput, and exclusion zones.',
  heroLede:
    "Spec'd PAUT to replace RT on a 36-inch pipeline girth weld and the inspection authority is asking for procedure qualification evidence? PAUT-for-RT substitution is now mainstream — ASME VIII Div. 2 §7.5.5 and API 1104 Annex A both qualify it — but the substitution is conditional. The real comparison isn't capability (PAUT meets or exceeds RT sensitivity on most defect types). It's the qualification block requirement, the data archival format, and the regulatory comfort of the AHJ. Pick PAUT when you want throughput, no exclusion zone, and encoded data. Pick RT when you need volumetric defect imagery for a customer who still trusts film over A-scans.",
  sideBySide: {
    caption: 'PAUT vs RT — by attribute',
    headers: ['Attribute', 'PAUT', 'RT'],
    rows: [
      ['Primary defect detection', 'Planar (cracks, LOF) and volumetric flaws — high sensitivity', 'Volumetric (porosity, slag) and large planar flaws — RT-favorable orientation only'],
      ['Sensitivity to tight cracks', '0.5-1% of wall thickness on calibrated SDH block', 'Poor for cracks parallel to beam; needs 2T sensitivity per ASME V'],
      ['Wall thickness range', '6 mm to 300+ mm with TOFD pairing', '~75 mm with Ir-192; up to 200 mm with Co-60'],
      ['Surface preparation', 'Couplant zone wire-brushed; paint > 0.1 mm removed', 'Cap/root grind only if interpretation needs it'],
      ['Cost per linear foot', '$12-$25 PAUT with encoder', '$8-$20 film RT; $6-$14 digital RT'],
      ['Throughput rate', '60-120 ft/hr encoded scan', '8-20 shots/hr film RT; 30-60 shots/hr DR'],
      ['Certification required', 'Level II UT + PAUT endorsement; CWB for Canada', 'Level II RT + RSO under 10 CFR 34'],
      ['Code coverage', 'ASME V Art. 4 App. IV/V/IX; ASME VIII §7.5.5; API 1104 Annex A', 'ASME V Art. 2; ASME VIII UW-51; API 1104 §11.1'],
      ['Training time to certification', '~120 hr PAUT after Level II UT base', '~280 hr classroom + 40 hr RSO course'],
      ['Exclusion zone / hazard', 'None — contact ultrasonic', '50-200 ft radius for Ir-192; full shutdown of adjacent work'],
      ['Archival record format', 'DICONDE binary or vendor format; re-interpretable A/S/C-scans', 'Film or DICONDE digital image — image-based, intuitive'],
      ['Defect sizing accuracy', '±1 mm with TOFD pairing', '±2-3 mm from film density and IQI reference'],
    ],
  },
  whenAWins: [
    {
      scenario: 'In-service refinery turnaround with parallel crews working adjacent areas',
      reason:
        'PAUT has no exclusion zone. The Ir-192 source for a typical butt weld shot demands a 50-200 ft radiation barrier that idles every other trade in the module — scaffolders, pipefitters, insulators, electricians. On a major Gulf Coast catcracker turnaround, eliminating RT exclusion zones recovers 4-8 crew-hours per shift across the unit. That alone justifies the PAUT cost premium.',
    },
    {
      scenario: 'Heavy-wall pressure vessel welds above 75 mm where Ir-192 runs out of penetration',
      reason:
        'Ir-192 (the most common industrial RT source) loses sensitivity around 75 mm of steel; Co-60 carries higher gamma energy but longer exposures, larger exclusion zones, and an SUA license. PAUT paired with TOFD comfortably inspects 75-300 mm wall under ASME V Art. 4 Mand. App. III/IV. ASME VIII Div. 2 §7.5.5 explicitly permits the substitution and most owners default to it above 50 mm wall.',
    },
    {
      scenario: 'Tight schedule where same-shift accept/reject matters',
      reason:
        'PAUT produces real-time A/S/C-scan data with on-screen indication marking — the technician calls accept/reject at the weld. RT film requires 45-60 minutes of darkroom processing before the radiographer can read it; digital RT cuts that to 5-10 minutes but still requires the shielded shot setup. On a fast-track project where welds must release to PWHT or coating within shift, PAUT wins on cycle time.',
    },
    {
      scenario: 'Tight planar defects in austenitic stainless welds where RT struggles',
      reason:
        'Tight cracks, lack of side-wall fusion, and hydrogen-induced planar flaws in austenitic stainless are RT-hostile — the planar orientation parallel to the beam removes too little material to register density change. PAUT angle-beam reflects off the crack face regardless of opening. ASME B31.3 §344.6 and the petrochemical industry sour service standards (NACE MR0103) increasingly mandate PAUT for crack-prone service.',
    },
  ],
  whenBWins: [
    {
      scenario: 'Volumetric defect characterization in cast or forged components',
      reason:
        'Castings have coarse grain that scatters ultrasound and produces noisy A-scans. RT cuts through grain structure cleanly — porosity, shrinkage, gas pockets show up as obvious dark spots on film. ASME VIII UW-51 and ASTM E1742 still treat RT as the default volumetric method for castings, and most casting suppliers will not certify a heat without RT records.',
    },
    {
      scenario: 'New construction with a procedure that hasn\'t been qualified for PAUT substitution',
      reason:
        'ASME VIII §7.5.5 substitution requires a written PAUT procedure qualified by demonstration on a flawed test piece, plus owner-user approval. If the project is mid-fabrication with an RT-only spec already approved and no qualification block in hand, switching to PAUT mid-stream requires a procedure revision, AI approval, and a qualification scan — typically 2-4 weeks. RT keeps the schedule.',
    },
    {
      scenario: 'Owner or insurance carrier that requires film or DICONDE imagery for archive',
      reason:
        'Some EPC contracts and most insurance underwriters (Lloyd\'s, AEGIS) still require image-based archival records — a film shot or a DR image — for 25-40 year retention. PAUT A/S/C-scan files are encoded data that re-interpretation can extract, but the file format is vendor-specific and harder to defend in court than a film image. For owners with image-based archive policies, RT remains contractually required.',
    },
    {
      scenario: 'Small-bore piping below NPS 2 where PAUT wedges don\'t couple',
      reason:
        'Standard PAUT wedges target flat or large-radius surfaces. Small-bore piping (NPS 1, NPS 1.5) presents a tight radius that off-the-shelf wedges can\'t conform to without custom machining. RT panoramic shots on small-bore are routine — one exposure covers the full circumference. For NPS 2 and below, RT is the practical default unless a custom small-bore PAUT wedge is in inventory.',
    },
  ],
  whenEitherWorks: [
    {
      scenario: 'Carbon steel butt weld 25-50 mm wall in new construction, normal fluid service — pick on schedule and adjacent crew impact',
      pick: 'A',
    },
    {
      scenario: 'API 1104 cross-country pipeline 24 mm wall — Annex A qualifies AUT/PAUT, §11.1 covers RT',
      pick: 'A',
    },
  ],
  costDifference:
    "Per linear foot, PAUT runs $12-$25 versus film RT at $8-$20 — PAUT lands at a 1.3-1.8x premium on the inspection line item alone. The cost picture flips when you account for shutdown impact: a single RT shot on a live unit idles a 20-person crew for 30-45 minutes inside the exclusion zone, costing $400-$800 in lost productivity per shot before the inspection bill arrives. Across a 200-weld turnaround scope, PAUT typically nets out cheaper by 10-25% once exclusion zone losses are factored. Digital RT (CR/DR) closes the inspection-line cost gap to ~10% over PAUT but doesn\'t eliminate the exclusion zone. Capital equipment is the swing factor: a PAUT spread is $45K-$95K; an industrial RT crew with shielding, dosimetry, and source carries about $15K-$30K in capital but adds the recurring source rental and RSO billable time.",
  speedDifference:
    "Throughput is where PAUT pulls cleanly ahead. Encoded PAUT scans 60-120 linear feet of weld per hour once setup is complete; film RT clears 12-15 shots per hour on a typical butt weld geometry, with each shot covering 1-2 feet of weld circumference. Digital RT (DR with flat-panel detector) doubles RT shot rate to 25-30 per hour by eliminating film processing, narrowing the gap but not closing it. Setup time favors RT for a single weld: a one-off RT shot takes 10-15 minutes; a one-off PAUT scan takes 25-40 minutes including calibration block verification and focal law check. Crossover is at 4-6 welds per mob. The biggest schedule impact: same-shift accept/reject. PAUT calls go on the as-built drawing within minutes; RT (even DR) requires the radiographer to read, mark, and report after the exposure batch is processed.",
  certificationDifference:
    "PAUT certification builds on a Level II UT base (typically 400+ hours of UT training and OJT) plus an 80-hour PAUT-specific course covering electronic beam steering, focal law construction, sector vs linear scans, calibration on side-drilled holes per ASME V Art. 4 Mand. App. IV, and scan plan documentation. The PAUT practical exam includes a qualification scan on a flawed test piece. RT Level II is roughly 280 hours of classroom and OJT under SNT-TC-1A or CP-189, plus a separate 40-hour Radiation Safety Officer course required for the radiographer-in-charge under 10 CFR 34.43 and state-level licensure (Texas DSHS, Louisiana DEQ, etc.). NRC and Agreement-State licensure adds annual training, dosimetry programs, leak testing of sources every 6 months, and SUA renewal paperwork. RT carries the heavier compliance burden; PAUT carries the heavier technical-skill burden. Both methods now require demonstrated weld-flaw detection on a graded sample under most owner specs (Chevron, Shell, Saudi Aramco SAEP-1142).",
  faqs: [
    {
      q: 'Is PAUT formally accepted as a replacement for RT under ASME?',
      a: 'Yes, with documented qualification. ASME Section VIII Division 2 §7.5.5 (and Code Case 2235 incorporated into Division 1) permits PAUT in lieu of RT on full-penetration butt welds when the procedure is demonstrated on a representative flawed test piece to meet or exceed RT sensitivity. The procedure must be qualified under ASME V Article 4 Mandatory Appendix IV (manual PAUT) or V (linear scan PAUT), with documented essential variables, calibration on side-drilled holes, and a qualification block matching the production geometry within ±25% wall thickness. The owner-user must approve the substitution in writing, and the Authorized Inspector reviews the procedure before first production scan. API 1104 Annex A makes the substitution explicit for cross-country pipeline girth welds using automated UT zonal discrimination.',
    },
    {
      q: 'Does PAUT really catch porosity as well as RT?',
      a: 'For clusters and large isolated porosity, yes — PAUT detects voids 1 mm and larger reliably when paired with TOFD and 0° straight beam. For scattered fine porosity (sub-1 mm dispersed pores), RT still has the edge because the cumulative density change is what triggers detection on film; on PAUT each tiny pore produces a low-amplitude indication that can be lost in grain noise. Most modern PAUT procedures for code-quality work include a 0° straight beam channel specifically to catch volumetric defects, and the combined S-scan + TOFD + 0° coverage matches film RT detection on representative weld populations. Studies by EPRI and the Welding Institute (TWI) show PAUT POD curves overlapping RT POD curves above ~1.5 mm equivalent flaw size.',
    },
    {
      q: 'What is the procedure qualification block for PAUT substitution?',
      a: 'A demonstration block is a section of the same material grade and wall thickness as production, containing intentional embedded flaws — typically electrodischarge machined notches simulating LOF and cracks, plus side-drilled holes for sensitivity calibration. ASME V Art. 4 Mand. App. IV T-IV-422 specifies the block configuration. The PAUT procedure must detect all reportable flaws at or below the acceptance criterion sensitivity (typically -6 dB or amplitude-based per the project). The qualification scan is witnessed by the Authorized Inspector. Once qualified, the procedure is locked to the essential variables (probe frequency, element count, focal laws, scan plan geometry, calibration block) — any change above the tolerance window requires requalification.',
    },
    {
      q: 'Why do some operators still require RT after PAUT?',
      a: 'Insurance carriers, regulatory comfort, and procedural inertia drive parallel RT in some specs. Hydrogen service piping under ASME B31.3 §K344, certain offshore platform welds under DNV-ST-F101, and nuclear-grade welds under ASME III still require RT as primary with PAUT supplemental. The rationale: redundant coverage on highest-consequence welds. The trend, though, is the opposite — Shell, Equinor, ExxonMobil, and the major LNG owners have all updated specs in the last 5 years to allow PAUT-only substitution above qualified procedures, with RT reserved for unusual geometry or arbitration scans.',
    },
    {
      q: 'How long does it take to qualify a PAUT procedure for RT substitution?',
      a: 'For a procedure already qualified by the inspection contractor on similar geometry, the project-specific qualification scan and witness take 1-2 days. For a new procedure (new wall thickness range, new material, new pipe diameter outside the existing qualification envelope), expect 2-4 weeks: procedure writing, qualification block fabrication or procurement, demonstration scan, witness by AI, owner-user approval, and AI signature. Mid-project switches from RT to PAUT typically take 3-6 weeks once contract change orders and procedure revisions are accounted for. Plan PAUT substitution at the spec writing phase, not at the kickoff meeting.',
    },
  ],
  internalLinks: [
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT method overview', context: 'Phased array beam forming, focal laws, and scan plans are covered in our PAUT deep-dive.' },
    { href: '/methods/radiographic-testing', label: 'Radiographic Testing method overview', context: 'RT source selection, IQI sensitivity, and film processing live in our RT deep-dive.' },
    { href: '/methods/tofd', label: 'Time-of-Flight Diffraction (TOFD)', context: 'TOFD pairs with PAUT to match RT sensitivity on heavy-wall vessel welds.' },
    { href: '/methods/ultrasonic-testing', label: 'Conventional Ultrasonic Testing', context: 'Conventional UT is the building block under PAUT certification and procedure.' },
    { href: '/standards/asme-section-v', label: 'ASME Section V — NDE methods', context: 'PAUT mandatory appendices and RT Article 2 both live in ASME Section V.' },
    { href: '/standards/api-1104', label: 'API 1104 — pipeline welding', context: 'API 1104 Annex A is the controlling qualification path for PAUT on cross-country pipeline.' },
    { href: '/free-tools/ndt-cost-calculator', label: 'NDT cost calculator', context: 'Run a PAUT vs RT cost comparison including exclusion zone productivity loss.' },
    { href: '/free-tools/exclusion-zone-calculator', label: 'Radiation exclusion zone calculator', context: 'Compute the RT exclusion radius for your source activity before scheduling shots.' },
    { href: '/blog/ut-vs-rt-comparison', label: 'UT vs RT — blog deep-dive', context: 'Real-world UT/PAUT vs RT decisions from refinery turnaround case studies.' },
  ],
  citations: [
    { id: 'asme-viii-div2-7-5-5', source: 'ASME BPVC Section VIII Div. 2, 2023, §7.5.5 Ultrasonic in lieu of Radiographic Examination' },
    { id: 'asme-cc-2235', source: 'ASME Code Case 2235-13, Use of UT in Lieu of RT for Section VIII Div. 1 and Div. 2' },
    { id: 'asme-v-art-4-app-iv', source: 'ASME BPVC Section V, 2023, Article 4 Mandatory Appendix IV — Phased Array Manual Raster' },
    { id: 'api-1104-annex-a', source: 'API Standard 1104, 22nd ed., 2021, Annex A — Alternative Acceptance Standards for Girth Welds Using Automated UT' },
    { id: 'asme-v-art-2', source: 'ASME BPVC Section V, 2023, Article 2 — Radiographic Examination' },
    { id: '10-cfr-34', source: '10 CFR Part 34 — Licenses for Industrial Radiography, U.S. NRC' },
    { id: 'iso-13588', source: 'ISO 13588:2019 NDT of welds — Ultrasonic testing using automated phased array' },
    { id: 'dnv-st-f101', source: 'DNV-ST-F101:2021 Submarine pipeline systems, §10 Inspection and testing' },
  ],
};

export default comparison;
