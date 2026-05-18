import type { ComparisonContent } from '../types';

const comparison: ComparisonContent = {
  slug: 'rt-vs-dr',
  methodA: { abbreviation: 'RT (Film)', name: 'Film Radiographic Testing' },
  methodB: { abbreviation: 'DR', name: 'Digital Radiography' },
  metaTitle: 'Film RT vs Digital Radiography: When DR Earns Its Capital Cost',
  metaDescription: 'Film RT vs DR flat-panel detectors on welds and castings. Real-time imaging, IQI sensitivity, ASME V Mand. App. VIII, cost per shot, and ROI math.',
  heroLede:
    "Got an EPC asking for DR on a 2,000-weld vessel fabrication scope and the price came in 60% higher than film? DR (digital radiography with flat-panel detectors) is the highest-capital RT technology in the family, and the per-shot price reflects that — but on high-volume shop work and in-process casting inspection, DR shaves 50-70% off the schedule clock and eliminates chemistry entirely. Both methods qualify under ASME V Article 2; DR specifically under Mandatory Appendix IX. The decision pivots on shot volume, fixturing repeatability, and whether real-time imaging is operationally required.",
  sideBySide: {
    caption: 'Film RT vs DR — by attribute',
    headers: ['Attribute', 'Film RT', 'DR (Digital Radiography)'],
    rows: [
      ['Image acquisition medium', 'Silver-halide film, chemically processed', 'Flat-panel detector (a-Se or scintillator + CMOS/CCD)'],
      ['IQI sensitivity', '2-2T per ASME V T-275', '2-2T per ASME V Mand. App. IX; meets or exceeds film'],
      ['Image resolution', '50-100 µm equivalent', '127-200 µm pixel pitch typical; 75-100 µm available'],
      ['Dynamic range (bit depth)', '~1.5 OD usable; narrow latitude', '16-bit (65,536 levels); wide latitude'],
      ['Cost per shot', '$35-$70 (film + chemistry)', '$30-$60 (no consumables; detector amortization included)'],
      ['Throughput rate', '8-15 shots/hr including processing', '30-90 shots/hr — image in 2-10 seconds'],
      ['Certification required', 'Level II RT + RSO', 'Same Level II RT + RSO; DR-specific endorsement'],
      ['Code coverage', 'ASME V Art. 2 T-274; AWS D1.1 §6.17; API 1104 §11.1', 'ASME V Art. 2 Mand. App. IX; ISO 17636-2; ASTM E2698'],
      ['Training time to certification', '~280 hr RT base', 'Same RT base + 24-40 hr DR endorsement'],
      ['Equipment capital cost', '$15K-$30K (source, processor, dosimetry)', '$80K-$200K (detector + cables + workstation)'],
      ['Archive format', 'Physical film storage', 'DICONDE native; cloud or local digital archive'],
      ['Real-time imaging capability', 'No — exposure then process', 'Yes — image displays within 2-10 seconds of exposure'],
    ],
  },
  whenAWins: [
    {
      scenario: 'Low-volume one-off field shots where DR fixturing cost is uneconomic',
      reason:
        'DR flat-panel detectors weigh 5-15 lbs and require positioning fixtures, cable management, and a workstation within 50 ft of the detector. For a single repair shot on a remote pipeline section or a one-off vessel weld, setup overhead for DR exceeds film by 30-45 minutes. Film with a portable cassette holder and a portable darkroom finishes faster end-to-end on single-shot mobs.',
    },
    {
      scenario: 'Contract spec written for film with no qualified DR procedure',
      reason:
        'Substituting DR for film mid-project requires a procedure qualification under ASME V Mand. App. IX with owner-user approval and AI signature. The qualification block must be representative of the production geometry within ±25% wall thickness and must include the smallest reportable flaw size. Substitution overhead for short-duration projects (under 30 days) exceeds throughput savings. Film keeps the schedule when the contract is film-locked.',
    },
    {
      scenario: 'Variable, hard-to-fixture geometry — nozzle welds, branch connections, structural complexity',
      reason:
        'DR detectors need a flat or large-radius surface within the detector\'s active area (typically 14"x17" or 17"x17"). On nozzle welds with rolled reinforcement pads, the detector can\'t lie flat against the joint, producing geometric unsharpness and edge artifacts. Film cassettes flex around complex geometry, accepting curved positioning that DR rigid panels can\'t. For one-off structural welds with awkward geometry, film often wins on practicality.',
    },
    {
      scenario: 'Cost-sensitive bid where shot count is below 100 and project duration is under 14 days',
      reason:
        'DR amortizes its $80K-$200K capital cost across volume. Per-shot pricing only makes sense when the equipment is spread across 1,000+ shots/year. Contractors who don\'t own DR equipment rent it at $1,500-$3,000/day plus per-shot fees, which prices out below 100-shot projects. Film mobile crews are widely available and cost less to mobilize for short jobs.',
    },
  ],
  whenBWins: [
    {
      scenario: 'High-volume shop fabrication with 500+ shots and a fixed RT booth',
      reason:
        'DR throughput is 30-90 shots/hr versus film at 8-15 shots/hr. On a 1,500-shot vessel fabrication scope, DR clears in 4-5 days; film clears in 12-15 days with the same crew. The labor savings alone — $40K-$80K on that schedule difference — pay back DR capital in 2-3 projects. Shop work with fixed positioning fixtures, repeatable geometry, and high throughput is DR\'s sweet spot.',
    },
    {
      scenario: 'Real-time inspection during welding or in-process casting verification',
      reason:
        'DR displays the image 2-10 seconds after exposure ends. For multi-pass weld inspection (root pass before fill, fill pass before cap), the welder gets accept/reject feedback in real time and corrects the next pass. Same workflow for casting inspection — molten pour validation in metal additive manufacturing or sand casting. Film\'s 45-60 minute processing delay rules out real-time use cases entirely.',
    },
    {
      scenario: 'Cryogenic or high-temperature environments where film chemistry fails',
      reason:
        'Film developer must hold 65-75°F for repeatable density. Outdoor RT in Alaska winter or Gulf Coast summer humidity drives chemistry variability and 20-30% retake rates. DR detectors operate from 0°C to 50°C (32-122°F) with no chemistry dependency. For pipeline integrity work in extreme climates or LNG/ammonia plants with cryogenic-zone welds, DR\'s temperature stability eliminates a recurring source of retake cost.',
    },
    {
      scenario: 'Owner spec requires DICONDE archive and audit-ready digital records',
      reason:
        'Major operators (Shell, ExxonMobil, Equinor, Saudi Aramco, ADNOC) have updated specs to require DICONDE digital archive with 25-40 year retention per ASTM E2339. DR produces DICONDE natively with full metadata (exposure parameters, IQI sensitivity, radiographer credentials, scan parameters). Film satisfies the spec only with secondary scanning to DICONDE — doubling the workflow. For any spec written in the last 5 years, DR is the contractually compliant path.',
    },
  ],
  whenEitherWorks: [
    {
      scenario: 'Carbon steel vessel circumferential weld 20 mm wall, controlled shop environment, 50-shot project — pick on shop equipment availability',
      pick: 'A',
    },
    {
      scenario: 'High-throughput pipe spool fabrication 600+ shots — DR amortizes faster, but film qualifies the same code',
      pick: 'B',
    },
  ],
  costDifference:
    "Per-shot list price favors DR at $30-$60 versus film at $35-$70 when DR is volume-amortized properly — film carries consumable cost (film stock, chemistry, processing) that scales linearly with shot count, while DR\'s detector amortization gets cheaper as volume rises. The math: a $120K DR detector amortized over 30,000 shots (typical 5-year service life) costs $4/shot in capital recovery; below 5,000 shots/year the per-shot amortization climbs to $24+. Capital cost is the bigger gap — a film RT spread is $15-30K (source, shielding, processor, dosimetry); a DR system adds $80-200K for detector, cables, workstation, and exposure control. ROI math for a typical NDT contractor: at 8,000+ shots/year of DR-suitable work, the system amortizes in 18-30 months on labor savings alone (10-12x throughput multiplier on shot-rate days). Below 3,000 shots/year DR doesn\'t pay back; rent it from a regional supplier at $1,500-$3,000/day plus per-shot fees.",
  speedDifference:
    "Throughput is where DR vs film diverges most dramatically. Film RT clears 8-15 shots/hr including chemistry batched processing. DR clears 30-90 shots/hr because the image displays in 2-10 seconds and the next exposure can start immediately. On a typical vessel circ weld pattern requiring 12 panoramic shots, film takes 90-120 minutes total clock time (12 exposures + chemistry); DR takes 25-40 minutes total. For in-process applications (real-time weld verification, casting inspection), DR\'s zero-wait imaging enables workflows film cannot support at all. Setup time per shot is comparable (similar source positioning, similar shielding, similar exclusion zone) — but DR\'s elimination of chemistry batching is where the throughput multiplier comes from. The crossover where DR pulls ahead on total project clock: roughly 30-50 shots in a continuous workflow.",
  certificationDifference:
    "Both methods build on ASNT SNT-TC-1A Level II RT certification (~280 hours classroom + OJT + written/specific/practical exam at ≥70% each portion). The radiation safety officer needs the same 40-hour RSO course under 10 CFR 34.43 and state-specific licensure regardless of imaging medium. DR adds a method-specific endorsement of 24-40 hours covering detector physics (a-selenium or scintillator + CMOS), exposure parameter optimization, image processing controls (window/level, edge enhancement, contrast), DICONDE export, and procedure qualification under ASME V Mand. App. IX. ASTM E2698 and ASTM E2737 are the standard references for DR procedure and detector performance evaluation. Many employers cross-certify experienced film radiographers into DR with 16-24 hours of practical training because the source physics is unchanged — only the imaging medium and post-processing differ. For NRC and Agreement-State licensure, both methods require the same source license, dosimetry program, leak testing, and quarterly source-utilization reports.",
  faqs: [
    {
      q: 'Does DR meet ASME Section V sensitivity requirements?',
      a: 'Yes. ASME Section V Article 2 Mandatory Appendix IX covers digital radiography using flat-panel detectors and requires the same 2-2T IQI sensitivity as film RT under T-275. The detector must demonstrate sensitivity on a step-wedge or wire-type IQI placed source-side, with the procedure qualified on a representative weld coupon. Pixel pitch and modulation transfer function (MTF) must meet the resolution requirements in ASTM E2698. Once qualified, DR is fully code-compliant under ASME V, ASME VIII UW-51, ASME B31.3 §344, and AWS D1.1 §6.17. The substitution requires owner-user approval and AI signature on the qualified procedure.',
    },
    {
      q: 'What is the difference between CR and DR?',
      a: 'CR (computed radiography) uses an offline phosphor imaging plate that captures the exposure and is then scanned by a laser reader to produce a digital image — workflow is "expose, carry to reader, scan, view." DR (digital radiography) uses a flat-panel detector wired to a workstation that displays the image directly in 2-10 seconds — workflow is "expose, view immediately." CR equipment is $25-60K; DR equipment is $80-200K. CR is film-replacement with shorter processing; DR enables real-time imaging that CR cannot. Image quality and dynamic range are comparable. CR is more portable; DR is faster.',
    },
    {
      q: 'How long do DR flat-panel detectors last?',
      a: 'Industrial DR detectors are rated for 5-7 years of normal field use, typically 10,000-30,000 exposure cycles before sensitivity degradation requires recalibration or replacement. Detector cost is $40K-$120K depending on size (14"x17" vs 17"x17") and pixel pitch (75-200 µm). Heat, mechanical shock, and exposure to high-energy sources (Co-60 above 10 Ci) accelerate degradation. Most contractors run a periodic detector performance evaluation per ASTM E2737 — quarterly verification of MTF, contrast-to-noise ratio, and pixel uniformity against a known target. Detectors that fail the performance check are returned for refurbishment or replaced.',
    },
    {
      q: 'Can DR replace UT/PAUT for code compliance?',
      a: 'DR can replace film RT for code work but does not replace UT/PAUT. The underlying physics is still radiographic — DR remains poor at detecting tight planar cracks oriented parallel to the beam, just like film RT. ASME VIII §7.5.5 substitution of UT for RT is method-based, not imaging-medium-based. DR improves RT throughput and archive quality; UT/PAUT improves defect detection physics for planar flaws. The decision tree: choose between RT and UT/PAUT first based on defect type, then choose film vs CR vs DR within RT based on volume and workflow.',
    },
    {
      q: 'Why does DR cost so much more than CR if image quality is similar?',
      a: 'DR detectors are integrated imaging systems with built-in scintillators, CMOS or CCD readout electronics, cooling, and direct workstation interface — all packaged in a ruggedized field-portable enclosure. CR uses a passive phosphor IP and a separate laser reader; the IP is the consumable, the reader is the capital. DR\'s integration enables real-time imaging at the cost of higher capital and lower portability. For shop work and high-volume fixtured production, DR\'s capital pays back. For field portability with moderate throughput, CR is the better economic fit. Many contractors carry both — DR for the booth, CR for the truck.',
    },
  ],
  internalLinks: [
    { href: '/methods/radiographic-testing', label: 'Radiographic Testing method overview', context: 'RT source selection, IQI sensitivity, and procedure qualification live in our RT method deep-dive.' },
    { href: '/methods/digital-radiography', label: 'Digital Radiography (DR)', context: 'DR flat-panel detectors and real-time imaging workflows are covered in our DR method page.' },
    { href: '/methods/computed-radiography', label: 'Computed Radiography (CR)', context: 'CR is the middle ground between film and DR — see the CR method page.' },
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT', context: 'PAUT is the modern UT substitute for RT entirely on planar-defect-critical welds.' },
    { href: '/standards/asme-section-v', label: 'ASME Section V — NDE methods', context: 'Film RT (T-274) and DR (Mand. App. IX) both live in ASME V Article 2.' },
    { href: '/standards/api-1104', label: 'API 1104 — pipeline welding', context: 'API 1104 §11.1 covers radiographic acceptance for cross-country pipeline.' },
    { href: '/blog/ut-vs-rt-comparison', label: 'UT vs RT — blog deep-dive', context: 'When to skip RT entirely in favor of UT or PAUT.' },
    { href: '/free-tools/exclusion-zone-calculator', label: 'Radiation exclusion zone calculator', context: 'DR uses the same source as film — calculate the exclusion radius before any shot.' },
  ],
  citations: [
    { id: 'asme-v-art-2', source: 'ASME BPVC Section V, 2023, Article 2 — Radiographic Examination' },
    { id: 'asme-v-art-2-app-ix', source: 'ASME BPVC Section V, 2023, Article 2 Mandatory Appendix IX — Digital Detector Arrays' },
    { id: 'astm-e2698', source: 'ASTM E2698-20, Standard Practice for Radiographic Examination Using Digital Detector Arrays' },
    { id: 'astm-e2737', source: 'ASTM E2737-22, Standard Practice for Digital Detector Array Performance Evaluation and Long-Term Stability' },
    { id: 'iso-17636-2', source: 'ISO 17636-2:2022 NDT of welds — Radiographic testing using digital detectors' },
    { id: 'astm-e2339', source: 'ASTM E2339-15(2020), Standard Practice for Digital Imaging and Communication in Nondestructive Evaluation (DICONDE)' },
    { id: '10-cfr-34', source: '10 CFR Part 34 — Licenses for Industrial Radiography, U.S. NRC' },
    { id: 'asme-viii-uw-51', source: 'ASME BPVC Section VIII Div. 1, 2023, UW-51 Radiographic Examination of Welded Joints' },
  ],
};

export default comparison;
