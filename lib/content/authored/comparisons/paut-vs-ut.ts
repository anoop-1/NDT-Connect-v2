import type { ComparisonContent } from '../types';

const comparison: ComparisonContent = {
  slug: 'paut-vs-ut',
  methodA: { abbreviation: 'PAUT', name: 'Phased Array Ultrasonic Testing' },
  methodB: { abbreviation: 'UT', name: 'Conventional Ultrasonic Testing' },
  metaTitle: 'PAUT vs Conventional UT: When the Extra Cost Pays Back',
  metaDescription: 'PAUT vs conventional ultrasonic testing on welds, vessels, and corrosion mapping. Throughput, cost per weld, ASME V Article 4 mandatory appendices.',
  heroLede:
    "Spec'd PAUT on a job that conventional UT could have handled, and the bill came in 3x? The cost gap between conventional manual UT and encoded phased-array UT is real, but so are the throughput and archival-data advantages. Both methods qualify under ASME Section V Article 4 — conventional UT under T-451 and PAUT under Mandatory Appendix IV. The split is on three axes: weld count (PAUT amortizes setup), geometry complexity (PAUT scans more angles per pass), and whether the customer demands an encoded data file that survives a future failure investigation.",
  sideBySide: {
    caption: 'PAUT vs conventional UT — by attribute',
    headers: ['Attribute', 'PAUT', 'Conventional UT'],
    rows: [
      ['Beam coverage', 'Multiple angles (typ. 40-70°) in one pass via electronic steering', 'Single angle per probe — change wedge for each angle'],
      ['Defect sensitivity', '0.5-1% of wall thickness on calibrated demo block', '1-2% of wall thickness with single angle beam'],
      ['Probe element count', '16, 32, 64, 128 elements per array', 'Single element (typically 1/4" or 1/2" crystal)'],
      ['Encoded data', 'Yes — full A/S/C-scan files saved as DICONDE or vendor binary', 'No native encoding; manual logbook records'],
      ['Cost per linear foot of weld', '$12-$25 PAUT (incl. encoder)', '$3-$8 manual UT'],
      ['Throughput rate', '60-120 ft/hr encoded; faster on long runs', '20-40 ft/hr manual angle beam'],
      ['Certification required', 'ASNT Level II UT + PAUT-specific endorsement (typ. 80 hr training)', 'ASNT Level II UT (SNT-TC-1A or CP-189)'],
      ['Code coverage', 'ASME V Art. 4 Mand. App. IV, V, IX; ASME VIII §7.5.5; API 1104 Annex A', 'ASME V Art. 4 T-451; AWS D1.1 §6.20; API 1104 §11.3'],
      ['Training time to certification', '40 hr UT + 80 hr PAUT + qualification on test piece', '40 hr classroom + 360 hr OJT to Level II'],
      ['Equipment cost', '$45,000-$95,000 flaw detector + scanner + wedges', '$3,500-$12,000 flaw detector + probes'],
      ['Setup time per weld', '15-30 min including calibration and scan plan', '5-10 min with pre-calibrated probe'],
      ['Defect sizing accuracy', '±1 mm with TOFD pairing; ±2 mm PAUT alone', '±3-5 mm with 6 dB drop or DAC sizing'],
    ],
  },
  whenAWins: [
    {
      scenario: 'Long-run pipeline or vessel circ welds where data archival is contractual',
      reason:
        'PAUT produces an encoded data file that auditors, owners, and forensic investigators can re-interpret years later. On a $400M LNG terminal project, the storage tank and process piping welds typically require DICONDE archives for 25-40 years. Conventional UT records — handwritten logbooks and isolated paper reports — fail this contractual test. PAUT pays back in archival defensibility alone, before throughput math enters.',
    },
    {
      scenario: 'High-throughput inspection where shift cost dominates the inspection bill',
      reason:
        'Encoded PAUT clears 60-120 ft/hr of weld; manual UT clears 20-40 ft/hr. On a typical refinery turnaround with 800-1200 critical welds, PAUT finishes 3 days faster than conventional UT, which directly shortens the unit outage. At $1.5M-$3M per day of outage on a major catcracker, the PAUT premium pays back in a single shift.',
    },
    {
      scenario: 'Heavy-wall vessels (above 50 mm) where multiple beam angles are required',
      reason:
        'ASME V Art. 4 T-471.1 requires beam coverage from 0° through the full weld volume. On a 75 mm wall, this means at least 3 angles (45°, 60°, 70°) plus a 0° straight beam for laminar checks. Conventional UT requires 4 probe-wedge swaps; PAUT does it in one electronic sector scan. The probe-swap time alone makes PAUT 4-5x faster on heavy wall.',
    },
    {
      scenario: 'Complex geometry — nozzles, pipe T-joints, branch connections',
      reason:
        'Set-on and set-through nozzles in pressure vessels create variable wall and curvature that single-angle UT struggles with. PAUT lets the inspector pre-program a wedge curvature and scan plan that accounts for the geometry, with the scan plan reviewed and approved in advance. ASME VIII Div. 2 §7.5.5 explicitly recognizes PAUT scan-plan documentation as evidence of inspection coverage on nozzle welds.',
    },
  ],
  whenBWins: [
    {
      scenario: 'Single-weld repair inspection or one-off field call',
      reason:
        'PAUT setup overhead (calibration block, scan plan, encoder fitting, baseline scan) runs 30-45 minutes before the first weld scans. On a single weld repair callout, manual UT with a pre-calibrated angle beam probe takes 10-15 minutes total. For one-off field work, conventional UT is faster and cheaper by a factor of 5-10.',
    },
    {
      scenario: 'Thickness gauging for corrosion monitoring on tank shells and piping',
      reason:
        'Routine UT thickness surveys under API 510 §6.4 and API 653 §6 use a dual-element 2.25 MHz or 5 MHz thickness gauge. PAUT corrosion mapping has its place for detailed wall-loss profiling, but for a 5-year external thickness survey at 50 CMLs per tank, a $500 thickness gauge and a Level II tech beats a $90K PAUT spread by an order of magnitude.',
    },
    {
      scenario: 'Small-bore piping below 50 mm OD where curvature defeats PAUT wedges',
      reason:
        'Standard PAUT wedges are sized for flat or large-radius surfaces. Small-bore piping (NPS 2 and below) needs custom wedge contours that often don\'t exist for unusual diameters. A small footprint conventional UT angle-beam probe (5/16" or 3/8" element) handles small-bore socket welds and stub-on connections that PAUT can\'t couple to.',
    },
    {
      scenario: 'Cost-sensitive non-critical service where ASME V T-451 single-angle is sufficient',
      reason:
        'ASME B31.3 §344.6 normal fluid service piping accepts single-angle UT at 100% coverage for class-rated welds. Spec\'ing PAUT on Category D fluid service piping is over-specification — the owner pays a 4x premium for no incremental risk reduction. Conventional UT meets the code minimum and delivers the same defect detection probability for these service classes.',
    },
  ],
  whenEitherWorks: [
    {
      scenario: 'Carbon steel butt weld 25 mm wall under ASME B31.3 normal service — pick on volume and access',
      pick: 'A',
    },
    {
      scenario: 'AWS D1.1 structural fillet weld — either method qualifies under §6.20, pick on cost',
      pick: 'B',
    },
  ],
  costDifference:
    "Per linear foot of weld, PAUT runs $12-$25 versus conventional UT at $3-$8 — a 3-4x premium at the line-item level. But the relevant question is per-project, not per-foot. PAUT amortizes its setup cost across volume: a single field-spread day at $4,500 (technician + equipment + scanner) clears 60-100 welds; conventional UT at $1,800 per day clears 40-60 welds. At ~80 welds per day, PAUT delivers comparable per-weld economics with vastly better data quality. Capital cost is the other gap — a PAUT flaw detector with scanner, wedges, and laptop runs $45K-$95K; a conventional UT flaw detector with a wedge kit is $3.5K-$12K. NDT service providers price PAUT 3x higher partly to recover that capital. For owners specifying inspection, the rule of thumb: above 100 welds in a single mob, PAUT is competitive; below 30 welds, conventional UT wins on bottom line.",
  speedDifference:
    "Encoded PAUT with a motorized scanner clears 60-120 ft of weld per hour once setup is complete. A skilled manual UT technician using a 5 MHz 60° angle-beam probe with a wedge clears 20-40 ft per hour, gated by manual scan pattern and indication sizing. The PAUT advantage compounds on heavy wall: a 100 mm vessel weld that takes manual UT 12 minutes per linear foot (3 angles × 4 minutes each) takes PAUT 2 minutes per foot in one sector scan. Setup is where conventional UT wins back time — a 5-minute calibration on a V1 block versus 25-30 minutes for a PAUT focal law check, sensitivity verification on side-drilled holes, and scan plan upload to the flaw detector. The crossover point sits around 8-12 welds per mob: below that, conventional UT finishes first; above it, PAUT pulls ahead by 30-60% on total clock time.",
  certificationDifference:
    "Conventional UT Level II under ASNT SNT-TC-1A requires 40 hours of classroom training plus 360 hours of on-the-job time, capped with a written, specific, and practical exam (typically 80 questions, ≥70% pass each portion). PAUT certification builds on that base: most employer written practices require Level II UT first, then add an 80-hour PAUT-specific course covering electronic beam forming, focal law construction, sectorial vs linear scan, calibration on side-drilled holes and notches, and scan plan documentation. The PAUT practical exam includes a qualification scan on a flawed test piece with documented detection of all reportable flaws. For API-1104 Annex A automated UT on pipeline, the technician needs additional zonal discrimination qualification per the project procedure. Aerospace PAUT (ASTM E2700) adds NAS 410 endorsement and procedure qualification on production hardware. Bottom line: PAUT certification is roughly 6-9 months of additional preparation beyond conventional UT Level II for an experienced UT technician.",
  faqs: [
    {
      q: 'Does PAUT replace RT for code compliance?',
      a: 'In many situations, yes. ASME VIII Division 2 §7.5.5 and Code Case 2235 (Division 1) permit PAUT — usually paired with TOFD — to substitute for RT on full-penetration butt welds when the procedure is demonstrated to match RT sensitivity on a representative flawed test piece. API 1104 Annex A qualifies automated UT (zonal PAUT) as the primary volumetric method for cross-country pipeline. The qualification requires a demonstration block with embedded flaws (porosity, slag, LOF, cracks) and a documented procedure showing PAUT detects them at or above RT sensitivity. Once qualified, PAUT becomes the contractual primary method; RT becomes the backup or arbitration method.',
    },
    {
      q: 'Why is PAUT so much more accurate at sizing?',
      a: 'PAUT collects an S-scan (sectorial view) and a C-scan (top-down view) plus the conventional A-scan, all encoded to position. Combined with a TOFD pair on either side of the weld, the indication is triangulated in three views. Sizing accuracy lands at ±1 mm on a properly calibrated setup, versus ±3-5 mm for conventional UT relying on 6 dB drop or DAC amplitude comparison. The improvement matters for ASME B31.3 §K344 (high-pressure piping) and API 579 fitness-for-service evaluations, where the difference between a 4 mm and 6 mm crack determines whether you repair or run.',
    },
    {
      q: 'Can I use my conventional UT calibration block for PAUT?',
      a: 'Partially. The standard ASTM E164 V1/V2 calibration blocks work for PAUT velocity and wedge delay calibration. But PAUT sensitivity calibration requires either side-drilled holes (SDHs) at known depths or a flat-bottom hole (FBH) block matched to the wall thickness being inspected — ASME V Art. 4 Mand. App. IV T-IV-431 mandates this. Most PAUT providers carry a dedicated multi-depth SDH block for each major wall thickness range (12 mm, 25 mm, 50 mm, 75 mm). Reusing a conventional UT block for PAUT sensitivity calibration fails procedure qualification.',
    },
    {
      q: 'Is encoded data really worth the cost?',
      a: 'Yes for high-consequence service, no for commodity inspection. Encoded PAUT data files (DICONDE format) can be re-interpreted by a different inspector years later, audited against the original procedure, and used as forensic evidence in failure investigations. For nuclear, refinery hydrogen service, and offshore platform welds, the data file is now a contractual requirement. For non-critical structural welds or small-bore utility piping, the data file adds cost without proportional value — owners increasingly accept conventional UT records there. The trend across major operators (ExxonMobil, Shell, Equinor) is toward mandatory encoded data on all pressure-containing welds above 25 mm wall.',
    },
    {
      q: 'How does TOFD relate to PAUT?',
      a: 'TOFD (Time-of-Flight Diffraction) is a complementary UT technique that pairs with PAUT to improve sizing accuracy and through-wall flaw detection. PAUT excels at lateral position and length; TOFD excels at depth and through-thickness extent. A typical procedure pairs PAUT on both sides of the weld with a single TOFD pair straddling the weld centerline — together they produce a 3D defect characterization that approaches RT detail without radiation. ASME V Art. 4 Mand. App. III covers TOFD specifically; most modern PAUT procedures for vessel and pipeline include a TOFD channel as standard.',
    },
  ],
  internalLinks: [
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT method overview', context: 'Phased array beam forming, focal laws, and sector scans are explained in our PAUT method deep-dive.' },
    { href: '/methods/ultrasonic-testing', label: 'Conventional Ultrasonic Testing', context: 'Manual angle-beam UT and thickness gauging fundamentals live in our UT method deep-dive.' },
    { href: '/methods/tofd', label: 'Time-of-Flight Diffraction (TOFD)', context: 'TOFD is the high-sensitivity UT technique routinely paired with PAUT on heavy wall welds.' },
    { href: '/methods/radiographic-testing', label: 'Radiographic Testing', context: 'Compare PAUT data quality to RT film and digital RT for code-qualified substitution.' },
    { href: '/standards/asme-section-v', label: 'ASME Section V — NDE methods', context: 'PAUT mandatory appendices (IV, V, IX) live in ASME Section V Article 4.' },
    { href: '/standards/api-1104', label: 'API 1104 — pipeline welding', context: 'API 1104 Annex A qualifies automated PAUT (zonal discrimination) for cross-country pipeline.' },
    { href: '/blog/phased-array-ultrasonic-testing-guide', label: 'PAUT complete guide', context: 'Scan plan design, wedge selection, and focal law construction walked through with examples.' },
    { href: '/free-tools/ndt-cost-calculator', label: 'NDT cost calculator', context: 'Compare PAUT vs conventional UT cost for your weld count and wall thickness range.' },
  ],
  citations: [
    { id: 'asme-v-art-4-app-iv', source: 'ASME BPVC Section V, 2023, Article 4 Mandatory Appendix IV — Phased Array Manual Raster' },
    { id: 'asme-v-art-4-app-v', source: 'ASME BPVC Section V, 2023, Article 4 Mandatory Appendix V — Phased Array Linear Scan' },
    { id: 'asme-viii-div2-7-5-5', source: 'ASME BPVC Section VIII Div. 2, 2023, §7.5.5 Ultrasonic in lieu of Radiographic Examination' },
    { id: 'asme-cc-2235', source: 'ASME Code Case 2235-13, Use of UT in Lieu of RT for Section VIII Div. 1 and Div. 2' },
    { id: 'api-1104-annex-a', source: 'API Standard 1104, 22nd ed., 2021, Annex A — Alternative Acceptance Standards for Girth Welds Using Automated UT' },
    { id: 'astm-e2700', source: 'ASTM E2700-22, Standard Practice for Contact Ultrasonic Testing of Welds Using Phased Arrays' },
    { id: 'astm-e164', source: 'ASTM E164-19, Standard Practice for Contact Ultrasonic Testing of Weldments' },
    { id: 'iso-13588', source: 'ISO 13588:2019 Non-destructive testing of welds — Ultrasonic testing — Use of automated phased array technology' },
  ],
};

export default comparison;
