import type { ComparisonContent } from '../types';

const comparison: ComparisonContent = {
  slug: 'ut-vs-paut',
  methodA: { abbreviation: 'UT', name: 'Conventional Ultrasonic Testing' },
  methodB: { abbreviation: 'PAUT', name: 'Phased Array Ultrasonic Testing' },
  metaTitle: 'Conventional UT vs PAUT: When Manual Beats Phased Array',
  metaDescription: 'Conventional UT vs PAUT decision matrix. Setup overhead, defect sizing, cost per weld, ASME V Article 4 coverage, and when single-angle manual UT wins.',
  heroLede:
    "Spec'd PAUT for a 6-weld emergency repair and the contractor showed up with a manual UT spread because PAUT setup would eat the day? Conventional manual UT remains the right answer more often than the PAUT marketing material admits. The decision pivots on three factors: weld count (PAUT needs volume to amortize setup), data archival requirements (PAUT files vs manual logbook), and wall thickness with geometry complexity. Both methods qualify under ASME V Article 4 — conventional UT under T-451 and PAUT under Mandatory Appendices IV/V — and both meet AWS D1.1 §6.20 acceptance criteria. Pick by economics, not by hype.",
  sideBySide: {
    caption: 'Conventional UT vs PAUT — by attribute',
    headers: ['Attribute', 'Conventional UT', 'PAUT'],
    rows: [
      ['Beam coverage', 'Single angle per probe — multiple wedges for multi-angle', 'Multiple angles (typ. 40-70°) in one electronic sector scan'],
      ['Defect sensitivity', '1-2% of wall thickness with calibrated 5 MHz angle beam', '0.5-1% of wall thickness with calibrated SDH block'],
      ['Defect types detected', 'Planar and volumetric — same physics as PAUT', 'Same defect types; better characterization with C-scan view'],
      ['Cost per linear foot', '$3-$8 manual UT', '$12-$25 PAUT with encoder'],
      ['Setup time per mob', '5-10 min calibration on V1/V2 block', '25-40 min scan plan, focal law check, SDH calibration'],
      ['Throughput rate', '20-40 ft/hr manual angle beam', '60-120 ft/hr encoded sector scan'],
      ['Certification required', 'ASNT Level II UT (~400 hr training + OJT)', 'Level II UT + PAUT endorsement (~80 hr additional)'],
      ['Code coverage', 'ASME V Art. 4 T-451; ASME VIII UW-53; AWS D1.1 §6.20; API 1104 §11.3', 'ASME V Art. 4 Mand. App. IV/V/IX; ASME VIII §7.5.5; API 1104 Annex A'],
      ['Encoded data archive', 'No native encoding — handwritten logbook', 'Yes — DICONDE or vendor binary file'],
      ['Equipment cost', '$3,500-$12,000 flaw detector + probes', '$45,000-$95,000 flaw detector + scanner + wedges'],
      ['Defect sizing accuracy', '±3-5 mm using 6 dB drop or DAC', '±1-2 mm with TOFD pairing; ±2-3 mm PAUT alone'],
      ['Field portability', 'Excellent — handheld unit, 5 lb total kit', 'Good — laptop-class flaw detector + cabled scanner'],
    ],
  },
  whenAWins: [
    {
      scenario: 'Emergency repair inspection — single weld callout',
      reason:
        'Conventional UT setup is 5-10 minutes: connect cable to flaw detector, calibrate on V1 block, position angle-beam probe. PAUT setup runs 25-40 minutes including focal law verification and SDH block calibration. For a single emergency repair weld, conventional UT delivers accept/reject 30-45 minutes earlier than PAUT. Same code coverage, same defect sensitivity for the indication in question.',
    },
    {
      scenario: 'Routine UT thickness gauging for corrosion monitoring',
      reason:
        'API 510 §6.4 and API 653 §6 require periodic UT thickness surveys at established CMLs (corrosion monitoring locations) — typically 50-200 readings per tank or vessel. A $500 dual-element thickness gauge handles this; deploying a $90K PAUT spread is over-equipment. PAUT corrosion mapping has its place for detailed wall-loss profiling, but routine CML surveys are conventional UT\'s home turf.',
    },
    {
      scenario: 'Small-bore piping inspection below NPS 2',
      reason:
        'PAUT wedges target flat or large-radius surfaces. Small-bore piping (NPS 1, NPS 1.5) presents tight radii that off-the-shelf PAUT wedges cannot conform to without custom machining. A 5/16" or 3/8" angle-beam probe handles small-bore weldments and socket welds that PAUT can\'t couple to. ASME B31.3 §344.6 accepts conventional UT for socket and slip-on welds where PAUT wedges fail geometrically.',
    },
    {
      scenario: 'Non-critical service welds where ASME V T-451 single-angle is sufficient',
      reason:
        'ASME B31.3 Category D fluid service piping and ASME VIII Div. 1 non-lethal service welds accept single-angle UT at 100% coverage. Spec\'ing PAUT on these welds adds 3-4x cost without incremental defect detection probability. For non-critical service, conventional UT meets the code minimum and matches PAUT\'s defect sensitivity for the relevant flaw populations.',
    },
  ],
  whenBWins: [
    {
      scenario: 'Long-run vessel or pipeline welds with archival data requirements',
      reason:
        'PAUT produces an encoded DICONDE file that auditors and forensic investigators can re-interpret years later. For a $400M LNG terminal project with 25-40 year archive retention, conventional UT logbook records fail the spec. Once owner specs require encoded data (Shell, ExxonMobil, Equinor, Saudi Aramco — all major LNG operators), PAUT becomes the contractual default regardless of throughput.',
    },
    {
      scenario: 'High-throughput weld inspection where shift cost dominates',
      reason:
        'Encoded PAUT clears 60-120 ft/hr of weld; manual UT clears 20-40 ft/hr. On a typical refinery turnaround with 800-1,200 critical welds, PAUT finishes 3-4 days faster. At $1.5M-$3M per day of catcracker outage, the PAUT premium pays back in a single shift. Throughput math always favors PAUT above 100 welds in a single mob.',
    },
    {
      scenario: 'Heavy-wall vessels above 50 mm wall where multiple beam angles are mandatory',
      reason:
        'ASME V Art. 4 T-471.1 requires multi-angle beam coverage on heavy wall. On 75 mm wall, conventional UT needs 4 probe-wedge swaps (45°, 60°, 70°, 0°) per weld; PAUT covers all angles in one sector scan. The probe-swap time alone makes PAUT 4-5x faster on heavy wall. ASME VIII Div. 2 §7.5.5 substitution of UT for RT explicitly requires PAUT or equivalent multi-angle coverage.',
    },
    {
      scenario: 'Complex geometry — nozzle welds, branch connections, T-joints',
      reason:
        'Set-on and set-through nozzles in pressure vessels create variable wall and curvature that single-angle conventional UT can\'t adequately cover. PAUT scan plans pre-program wedge curvature and beam angles to account for geometry, with the scan plan reviewed and approved in advance. ASME VIII Div. 2 §7.5.5 explicitly recognizes PAUT scan-plan documentation as evidence of inspection coverage on nozzle welds.',
    },
  ],
  whenEitherWorks: [
    {
      scenario: 'Carbon steel butt weld 25 mm wall, normal fluid service piping under ASME B31.3 — both methods qualified, pick on volume',
      pick: 'A',
    },
    {
      scenario: 'AWS D1.1 structural fillet weld on a low-volume non-cyclical structural project — conventional UT meets §6.20 at lower cost',
      pick: 'A',
    },
  ],
  costDifference:
    "Per linear foot of weld, conventional UT runs $3-$8 versus PAUT at $12-$25 — a clean 3-4x premium at the line item. The per-project picture flips with volume: PAUT amortizes its 25-40 minute per-weld setup across volume, so on a 100+ weld mob the per-weld delta shrinks to 1.5-2x. Below 20 welds per mob, the setup overhead crushes PAUT economics and conventional UT wins on bottom line. Capital cost is the other gap — a conventional UT flaw detector with wedge kit is $3.5K-$12K; a PAUT spread runs $45K-$95K. NDT service providers price PAUT 3x higher partly to recover capital. The cost rule of thumb: above 100 welds in a single mob with multi-angle coverage required, PAUT competes on bottom line and wins on data archival. Below 30 welds, conventional UT wins on cash cost. Between 30-100 welds, decision pivots on data archive requirements, not on inspection cost.",
  speedDifference:
    "Setup time is where conventional UT pulls ahead per-weld: 5-10 minutes versus PAUT\'s 25-40 minutes. Once setup is complete, PAUT wins on linear scan rate — 60-120 ft/hr versus 20-40 ft/hr. The crossover sits around 8-12 welds per mob. For a single weld, conventional UT finishes 30-45 minutes faster. For 20+ welds, PAUT pulls ahead by 30-60% on total clock time. On heavy wall (above 50 mm) requiring multi-angle coverage, PAUT\'s sector scan eliminates 3-4 probe-wedge swaps per weld that conventional UT must do sequentially — PAUT pulls ahead even at lower weld counts. For thickness gauging (no welds, just CML surveys) conventional UT thickness gauges clear 30-60 readings/hour with point-and-press workflow; PAUT corrosion mapping clears 5-10 sq ft of mapped wall per hour but produces a continuous wall-thickness profile that point gauging cannot.",
  certificationDifference:
    "Conventional UT Level II under ASNT SNT-TC-1A requires 40 hours of classroom training plus 360 hours of OJT, capped with a written/specific/practical exam at ≥70% each portion. The practical exam includes calibration on a V1 or IIW block, angle-beam scan of a known flawed plate, and indication sizing using 6 dB drop or DAC. PAUT certification builds on the Level II UT base with an additional 80-hour PAUT-specific course covering electronic beam forming, focal law construction, sector vs linear scans, SDH calibration per ASME V Mand. App. IV, and scan plan documentation. The PAUT practical exam includes a qualification scan on a flawed test piece with documented detection of all reportable flaws. Most employer written practices require Level II UT first, then add the PAUT endorsement. For API 1104 Annex A automated UT on pipeline, the technician needs additional zonal discrimination qualification per the project procedure. Aerospace PAUT (ASTM E2700) adds NAS 410 endorsement.",
  faqs: [
    {
      q: 'Does conventional UT detect the same defects as PAUT?',
      a: 'Yes — the underlying physics is identical. Conventional UT and PAUT both use angle-beam shear wave or longitudinal wave at 2-10 MHz center frequency, both detect planar and volumetric defects by amplitude reflection, and both can size indications via 6 dB drop or DAC. The differences are in coverage efficiency (PAUT covers multiple angles in one pass) and data archival (PAUT encodes A/S/C-scans to position). For a single weld with a single beam angle requirement, conventional UT and PAUT have equivalent probability of detection on planar defects above 1.5 mm equivalent flaw size. For multi-angle coverage on heavy wall or for archival-data spec work, PAUT is the procedural requirement.',
    },
    {
      q: 'When is the PAUT premium worth paying?',
      a: 'Three triggers: (1) weld count above 100 per mob — throughput math favors PAUT; (2) wall thickness above 50 mm requiring multi-angle coverage — PAUT sector scan eliminates probe swaps; (3) owner spec requires DICONDE encoded data archive — PAUT is the contractual requirement. If none of those three apply, conventional UT meets code at lower cost. Below 20 welds per mob with single-angle requirements and no archive spec, PAUT is over-specified and pays back nothing.',
    },
    {
      q: 'Can I switch from PAUT to conventional UT mid-project?',
      a: 'Procedurally, yes — both methods qualify under ASME V Article 4 and are typically covered by the same written practice. Practically, the owner spec usually defaults to one or the other and a switch requires procedure revision, AI approval, and (depending on the contract) an amendment. Most projects qualify both procedures upfront so the contractor can default to PAUT for high-volume runs and switch to conventional UT for isolated repair welds or small-bore connections where PAUT wedges don\'t fit. The flexibility costs roughly 8-16 hours of procedure writing at the project kickoff.',
    },
    {
      q: 'Do I need an ASNT Level III to qualify a PAUT procedure?',
      a: 'Yes — under ASNT SNT-TC-1A and the ASME Code, the Level III is responsible for writing and approving the inspection procedure. The Level III certifies that the procedure meets the applicable code (ASME V Mand. App. IV, V, or IX for PAUT; T-451 for conventional UT), reviews the qualification scan results, and signs the procedure for production use. Level III certification requires 1,920 hours of method-specific OJT at Level II, plus the general/specific/practical exam at the Level III level. Many small NDT contractors carry one Level III on staff who covers all UT methods (conventional, PAUT, TOFD) under a single endorsement.',
    },
    {
      q: 'Is PAUT becoming the default for all weld inspection?',
      a: 'For new construction code-quality welds in major operator portfolios (Shell, ExxonMobil, Equinor, Saudi Aramco, ADNOC, Petrobras), yes — owner specs increasingly default to PAUT with conventional UT reserved for repair scans, small-bore piping, and isolated CML thickness checks. For structural welds under AWS D1.1, conventional UT remains the default; PAUT is allowed but rarely required. For maintenance NDE on aging infrastructure (refineries, chemical plants), conventional UT is still the workhorse because most CML surveys, thickness checks, and isolated weld repairs don\'t benefit from PAUT\'s data archive features.',
    },
  ],
  internalLinks: [
    { href: '/methods/ultrasonic-testing', label: 'Ultrasonic Testing method overview', context: 'Conventional UT angle-beam fundamentals and probe selection in our UT method deep-dive.' },
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT method overview', context: 'Phased array beam forming and focal law construction in our PAUT method deep-dive.' },
    { href: '/methods/tofd', label: 'Time-of-Flight Diffraction (TOFD)', context: 'TOFD pairs with PAUT for high-sensitivity heavy-wall weld inspection.' },
    { href: '/methods/radiographic-testing', label: 'Radiographic Testing', context: 'RT is the volumetric alternative to UT for code-quality weld coverage.' },
    { href: '/standards/asme-section-v', label: 'ASME Section V — NDE methods', context: 'Both conventional UT (T-451) and PAUT (Mand. App. IV/V) live in ASME V Article 4.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1 Structural Welding Code', context: 'AWS D1.1 §6.20 covers UT acceptance for structural welds — both conventional and PAUT qualify.' },
    { href: '/blog/ultimate-guide-ultrasonic-testing', label: 'Ultimate guide to UT', context: 'Field decision examples on conventional UT vs PAUT walked through with case studies.' },
    { href: '/free-tools/ndt-cost-calculator', label: 'NDT cost calculator', context: 'Run a conventional UT vs PAUT cost comparison for your weld count and wall thickness range.' },
  ],
  citations: [
    { id: 'asme-v-art-4', source: 'ASME BPVC Section V, 2023, Article 4 — Ultrasonic Examination Methods for Welds' },
    { id: 'asme-v-art-4-app-iv', source: 'ASME BPVC Section V, 2023, Article 4 Mandatory Appendix IV — Phased Array Manual Raster' },
    { id: 'asme-v-art-4-app-v', source: 'ASME BPVC Section V, 2023, Article 4 Mandatory Appendix V — Phased Array Linear Scan' },
    { id: 'asme-viii-uw-53', source: 'ASME BPVC Section VIII Div. 1, 2023, UW-53 Ultrasonic Examination of Welded Joints' },
    { id: 'asme-viii-div2-7-5-5', source: 'ASME BPVC Section VIII Div. 2, 2023, §7.5.5 Ultrasonic in lieu of Radiographic Examination' },
    { id: 'aws-d11-6-20', source: 'AWS D1.1/D1.1M:2020 Structural Welding Code — Steel, §6.20 Ultrasonic Examination' },
    { id: 'api-1104', source: 'API Standard 1104, 22nd ed., 2021, §11.3 (Ultrasonic) and Annex A (Automated UT)' },
    { id: 'astm-e164', source: 'ASTM E164-19, Standard Practice for Contact Ultrasonic Testing of Weldments' },
    { id: 'asnt-cp-189', source: 'ASNT CP-189-2020 Standard for Qualification and Certification of NDT Personnel' },
  ],
};

export default comparison;
