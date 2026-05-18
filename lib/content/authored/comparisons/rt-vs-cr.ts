import type { ComparisonContent } from '../types';

const comparison: ComparisonContent = {
  slug: 'rt-vs-cr',
  methodA: { abbreviation: 'RT (Film)', name: 'Film Radiographic Testing' },
  methodB: { abbreviation: 'CR', name: 'Computed Radiography' },
  metaTitle: 'Film RT vs Computed Radiography: Switching to Digital',
  metaDescription: 'Film RT vs Computed Radiography on welds and castings. Image quality, IQI sensitivity, ASME V Article 2, cost per shot, archive and DICONDE workflow.',
  heroLede:
    "Got a quote that pegs film RT 30% cheaper than CR and the procurement team is asking why you specified CR? Bottom-line cost on a single shot does favor film. The case for CR is in throughput, archive management, and image quality on thick wall — the same place where film starts failing. ASME V Article 2 covers both: T-274 for film and Mandatory Appendix VIII for digital image acquisition. The substitution requires demonstrated IQI sensitivity on a representative weldment and procedure qualification with the owner-user. Pick the older technology when shot volume is low and the customer audits with a light box. Pick CR when shot volume exceeds 30/day or archive policy demands DICONDE.",
  sideBySide: {
    caption: 'Film RT vs Computed Radiography — by attribute',
    headers: ['Attribute', 'Film RT', 'CR (Computed Radiography)'],
    rows: [
      ['Image acquisition medium', 'Silver-halide film, exposed and chemically processed', 'Phosphor-coated imaging plate (IP), scanned by laser reader'],
      ['IQI sensitivity', '2-2T per ASME V T-275 with proper exposure', '2-2T per ASME V Mand. App. VIII; equivalent or better with optimized parameters'],
      ['Image resolution', '50-100 µm equivalent depending on film class', '50-100 µm with high-resolution IP; lower-res for production work'],
      ['Dynamic range (bit depth)', '~1.5 OD usable; narrow latitude per film type', '16-bit (65,536 levels); ~4x wider latitude than film'],
      ['Cost per shot', '$35-$70 (film + chemistry + processing)', '$45-$90 (IP rental + reader access)'],
      ['Throughput rate', '8-15 shots/hr including processing', '20-40 shots/hr — IP read in 60-120 seconds'],
      ['Certification required', 'Level II RT + RSO under 10 CFR 34', 'Same Level II RT + RSO; CR-specific endorsement under ASNT'],
      ['Code coverage', 'ASME V Art. 2 T-274; AWS D1.1 §6.17', 'ASME V Art. 2 Mand. App. VIII; ASTM E2033; ISO 17636-2'],
      ['Training time to certification', '~280 hr classroom + OJT to Level II RT', 'Same RT base + 16-24 hr CR endorsement'],
      ['Archive format and retention', 'Film stored physically; 25-40 year retention requires controlled environment', 'DICONDE digital files; archived per ASTM E2339; cloud or local storage'],
      ['Source compatibility', 'Ir-192, Co-60, X-ray cabinet', 'Same — IP physics matches film for energy response'],
      ['Re-exposure / retake rate', '10-15% retakes typical from exposure errors', '2-5% retakes — wider latitude forgives exposure variation'],
    ],
  },
  whenAWins: [
    {
      scenario: 'Low-volume one-off field shots where a portable lightbox interpretation is required',
      reason:
        'Film handed to a Level II radiographer at a lightbox is a workflow every refinery and pipeline inspector knows. No laptop, no software license, no IP reader on the truck. For a single repair shot on a remote pipeline section, film is faster end-to-end than mobilizing a CR reader. Many state pipeline inspectors still prefer film for arbitration shots — the lightbox interpretation is the same one they\'ve done for 30 years.',
    },
    {
      scenario: 'Sub-contractor scope where the inspection contract specifies film',
      reason:
        'EPC contracts written in the last 10-15 years still default to film unless the spec was updated. Substituting CR mid-project requires a procedure revision, qualification on the project material, AI re-approval, and often a contract amendment. For short-duration projects (under 30 days) the substitution overhead exceeds the throughput savings. Film keeps the schedule when the contract is film-locked.',
    },
    {
      scenario: 'Cost-sensitive bid where total shot count is below 200',
      reason:
        'CR amortizes its higher per-shot cost (IP rental, reader access) across volume. Below ~200 shots per project, film\'s lower marginal cost wins. A 50-shot tank bottom job at $40/shot film is $2,000; the same job at $65/shot CR is $3,250 plus IP setup. The break-even sits around 200-300 shots depending on local IP and chemistry pricing.',
    },
    {
      scenario: 'Archive policy that requires physical media for legal defensibility',
      reason:
        'Some legal jurisdictions and older insurance contracts (Lloyd\'s syndicates pre-2010) still require physical film as the archive record. Digital files are accepted as supplemental but not primary. For projects under those legacy contracts, film is contractually mandatory. The trend is reversing — most current Lloyd\'s, AEGIS, and Munich Re contracts now accept DICONDE as primary — but legacy contracts persist.',
    },
  ],
  whenBWins: [
    {
      scenario: 'High-volume new construction with shot counts above 500 per project',
      reason:
        'CR throughput is 2-3x film because the IP is read in 60-120 seconds versus 45-60 minutes of darkroom chemistry. On a 1,200-shot vessel fabrication scope, CR finishes 4-6 days ahead of film with the same crew. The wider dynamic range also drops retakes from 12% to 3-4%, saving another 5-10% of shot count. Total project clock saving: 12-18%, which often more than compensates for the higher per-shot list price.',
    },
    {
      scenario: 'Variable wall-thickness welds where film exposure latitude is tight',
      reason:
        'Film has a usable density range of ~1.5 OD; outside that band, the image is overexposed or underexposed and unreadable. A weld with a 25 mm chamfered cap over a 12 mm base wall exceeds film latitude and requires two shots at different kV settings. CR\'s 16-bit dynamic range captures both regions in one exposure. Variable wall, dissimilar metal welds, and nozzle reinforcement pad welds are CR\'s sweet spot.',
    },
    {
      scenario: 'Owner spec requires DICONDE digital archive',
      reason:
        'Major operators (Shell, ExxonMobil, Equinor, Saudi Aramco) have updated specs in the last 5-10 years to require DICONDE digital archive for 25-40 year retention. Film no longer satisfies the spec without scanning every frame to DICONDE separately — a workflow that doubles processing cost. CR produces DICONDE natively. For any owner running this spec, CR is the contractual requirement.',
    },
    {
      scenario: 'Field RT in cold or humid conditions where film chemistry fails',
      reason:
        'Film chemistry (developer, fixer, wash) must run between 65-75°F to produce repeatable density. In Gulf Coast humidity or Alaska winter, field darkrooms struggle to hold temperature, and processing variability drives retake rates to 20-30%. CR has no wet chemistry — the IP reads identically at any ambient temperature. For pipeline integrity work in extreme climates, CR\'s temperature stability alone justifies the switch.',
    },
  ],
  whenEitherWorks: [
    {
      scenario: 'Carbon steel butt weld 12 mm wall on a 30-shot vessel scope — pick on what equipment the contractor has on truck',
      pick: 'A',
    },
    {
      scenario: 'Cross-country pipeline panoramic shot on NPS 24 carbon steel — both qualified, CR pulls ahead above 100 shots/day',
      pick: 'B',
    },
  ],
  costDifference:
    "Per-shot list price favors film at $35-$70 (film stock + chemistry + processing) versus CR at $45-$90 (IP rental + reader access + DICONDE workstation). The math flips when you factor retake rate and throughput. Film retakes typically run 10-15% of shots; CR retakes run 2-5% because the wider dynamic range catches exposure errors that would fail on film. On a 1,000-shot project at 12% film retake versus 4% CR retake, film actually re-exposes 120 shots versus 40 for CR — that\'s 80 shots of saved chemistry, source time, and crew hours. Throughput-driven savings (CR clears 3x more shots per day) compound on top. Capital cost: a film RT spread runs $15-$30K (source, shielding, processing tank, dosimetry). A CR system adds $25K-$60K for the reader and laptop workstation. Across a typical contractor\'s annual project volume, CR amortizes in 18-30 months on equipment cost alone, before any project-level throughput savings.",
  speedDifference:
    "Film RT throughput is gated by chemistry: 45-60 minutes from exposure end to wet film density read, batched. Field darkrooms typically process 4-8 films per cycle, so a 30-shot day means 4-6 chemistry cycles — call it 12-15 shots per hour as the practical ceiling. CR reads each IP in 60-120 seconds in the reader, and the next IP can be exposed while the previous one reads. Practical CR throughput is 20-40 shots per hour, gated only by source positioning and exposure time. On a panoramic shot pattern around a vessel circ weld, CR clears the full ring in 25-35 minutes; film clears the same ring in 75-90 minutes including chemistry. Setup time is comparable for both — same source, same shielding, same exclusion zone calculations. The throughput difference is downstream of the exposure.",
  certificationDifference:
    "Both methods build on ASNT SNT-TC-1A Level II RT certification (typically 280 hours classroom + OJT plus a written, specific, and practical exam). The radiation safety officer for either method needs a 40-hour RSO course under 10 CFR 34.43, state-specific licensure (Texas DSHS, Louisiana DEQ), and annual dosimetry/source leak testing. CR adds a method-specific endorsement of 16-24 hours covering IP exposure latitude, laser reader calibration, image processing parameters (window/level, edge enhancement), and DICONDE export. ASTM E2033 and ASTM E2445 are the standard references for CR procedure qualification. For owner-spec work, the CR procedure must be qualified on a representative weld coupon with embedded flaws and witnessed by the AI before first production scan. Many employers cross-certify experienced film radiographers into CR with 8-16 hours of practical training given the underlying source physics is unchanged.",
  faqs: [
    {
      q: 'Does CR meet ASME Section V sensitivity requirements?',
      a: 'Yes. ASME Section V Article 2 Mandatory Appendix VIII covers digital radiography (CR and DR) and requires the same 2-2T IQI sensitivity as film RT under T-275. The image plate must demonstrate sensitivity on a step-wedge or wire-type IQI placed source-side per T-277. Procedure qualification requires a representative weld coupon with documented exposure parameters, source-to-detector distance, kV/exposure time, and IP scan parameters. Once qualified, CR is fully code-compliant under ASME V, ASME VIII UW-51 (radiography requirements), ASME B31.3 §344, and AWS D1.1 §6.17.',
    },
    {
      q: 'Why does CR have lower retake rates than film?',
      a: 'CR\'s 16-bit dynamic range captures roughly 4x the exposure latitude of film. An exposure that\'s 50% over- or under-target on film falls outside the usable density window (1.8-3.5 OD per ASME V T-282) and fails the IQI sensitivity check, requiring a retake. The same exposure on CR sits comfortably within the IP\'s dynamic range; window/level adjustment in post-processing recovers the image. Field crews report 10-15% film retake rates dropping to 2-5% on CR with the same source and geometry. Over a 1,000-shot project, that retake delta saves 80-100 hours of crew time and reduces total source exposure dose.',
    },
    {
      q: 'How long do CR image plates last?',
      a: 'A high-quality phosphor IP rated for industrial RT typically delivers 500-2,000 exposure cycles before image quality degrades. Scratches, ghost images from incomplete erasure, and phosphor wear are the failure modes. ASTM E2445 specifies the IP quality verification protocol — periodic exposure of a known IQI step-wedge and comparison to baseline density. Most field operations rotate IPs through a quality check every 50-100 cycles and retire plates that fail the wedge step verification. IP cost is $300-$800 per plate depending on size and resolution class, so the per-shot consumable cost is roughly comparable to film over the IP service life.',
    },
    {
      q: 'Can I scan old film archives into DICONDE for digital storage?',
      a: 'Yes, but the scanned image is a secondary record, not equivalent to a CR-acquired DICONDE file. ASTM E2339 covers DICONDE file structure and metadata requirements; the scanned film must carry exposure parameters, IQI sensitivity, and original radiographer credentials in the DICONDE header. Many operators digitize archives for searchability and remote audit but retain the original film as the legal primary record. Pure-digital archives (where the original is born digital from CR or DR) are increasingly the spec for new construction. Mixed archives (film for legacy, DICONDE for new) are common during the transition period.',
    },
    {
      q: 'Is CR the same as DR (digital radiography)?',
      a: 'No — CR uses an offline phosphor imaging plate that\'s carried to a laser reader after exposure. DR uses a flat-panel detector that produces the image directly in the field within seconds, no reader required. CR is closer to film in workflow (expose, then process) but with shorter processing time. DR is real-time imaging suitable for in-process welding visualization. CR equipment costs $25-$60K; DR equipment costs $80-$200K. Image quality and dynamic range are comparable; the workflow and capital cost are the differentiators. Many contractors carry both — DR for high-throughput shop work and CR for field portability.',
    },
  ],
  internalLinks: [
    { href: '/methods/radiographic-testing', label: 'Radiographic Testing method overview', context: 'RT source selection, IQI sensitivity, and procedure qualification live in our RT method deep-dive.' },
    { href: '/methods/computed-radiography', label: 'Computed Radiography (CR)', context: 'CR image plates, laser readers, and DICONDE workflow are covered in our CR method page.' },
    { href: '/methods/digital-radiography', label: 'Digital Radiography (DR)', context: 'DR flat-panel detectors are the real-time digital alternative to CR.' },
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT', context: 'PAUT is the modern substitute for RT entirely under ASME VIII §7.5.5.' },
    { href: '/standards/asme-section-v', label: 'ASME Section V — NDE methods', context: 'Film RT (T-274) and CR (Mand. App. VIII) both live in ASME V Article 2.' },
    { href: '/standards/api-1104', label: 'API 1104 — pipeline welding', context: 'API 1104 §11.1 covers radiographic acceptance for cross-country pipeline.' },
    { href: '/blog/ut-vs-rt-comparison', label: 'UT vs RT — blog deep-dive', context: 'When to skip RT entirely in favor of UT or PAUT for code-quality weld inspection.' },
    { href: '/free-tools/exclusion-zone-calculator', label: 'Radiation exclusion zone calculator', context: 'Both film and CR use the same source — calculate the radiation exclusion radius before shooting.' },
  ],
  citations: [
    { id: 'asme-v-art-2', source: 'ASME BPVC Section V, 2023, Article 2 — Radiographic Examination' },
    { id: 'asme-v-art-2-app-viii', source: 'ASME BPVC Section V, 2023, Article 2 Mandatory Appendix VIII — Radiography Using Phosphor Imaging Plate' },
    { id: 'astm-e2033', source: 'ASTM E2033-99(2018), Standard Practice for Computed Radiology' },
    { id: 'astm-e2445', source: 'ASTM E2445/E2445M-22, Standard Practice for Performance Evaluation and Long-Term Stability of Computed Radiography Systems' },
    { id: 'astm-e2339', source: 'ASTM E2339-15(2020), Standard Practice for Digital Imaging and Communication in Nondestructive Evaluation (DICONDE)' },
    { id: 'iso-17636-2', source: 'ISO 17636-2:2022 NDT of welds — Radiographic testing using digital detectors' },
    { id: '10-cfr-34', source: '10 CFR Part 34 — Licenses for Industrial Radiography, U.S. NRC' },
    { id: 'api-1104', source: 'API Standard 1104, 22nd ed., 2021, §11.1 Radiographic Inspection' },
  ],
};

export default comparison;
