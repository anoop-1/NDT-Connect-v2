import type { ComparisonContent } from '../types';

const comparison: ComparisonContent = {
  slug: 'tofd-vs-paut',
  methodA: { abbreviation: 'TOFD', name: 'Time-of-Flight Diffraction' },
  methodB: { abbreviation: 'PAUT', name: 'Phased Array Ultrasonic Testing' },
  metaTitle: 'TOFD vs PAUT: Why Most Heavy-Wall Welds Need Both',
  metaDescription: 'TOFD vs PAUT for vessel and pipeline welds. Sensitivity, sizing accuracy, dead zones, ASME V Art. 4 Mand. App. III vs IV, and why they pair up.',
  heroLede:
    "Spec'd TOFD on a 50 mm vessel circ weld and the inspector keeps asking for an additional PAUT pass? That's not over-specification — TOFD and PAUT are complementary, not competing techniques. TOFD nails the middle of the wall with extraordinary through-wall sizing accuracy but has a 5-10 mm dead zone at the OD and ID surfaces. PAUT covers the dead zones and adds lateral defect characterization. Most code-quality procedures above 25 mm wall now run both, and ASME V Article 4 Mandatory Appendices III (TOFD) and IV (PAUT) explicitly recognize the pairing.",
  sideBySide: {
    caption: 'TOFD vs PAUT — by attribute',
    headers: ['Attribute', 'TOFD', 'PAUT'],
    rows: [
      ['Primary defect detection', 'Mid-wall planar flaws — diffracted tip signals from crack edges', 'Surface, mid-wall, and near-surface flaws via reflected beam'],
      ['Through-wall sizing accuracy', '±0.5-1 mm — best of any UT technique', '±1-2 mm without TOFD pairing'],
      ['Lateral defect length sizing', 'Poor — overestimates length by 5-15 mm', 'Excellent — within ±2 mm via encoded scan'],
      ['Surface and near-surface dead zone', '5-10 mm at OD; 3-5 mm at ID — significant blind spot', 'No dead zone — first half-wave coupled through wedge'],
      ['Probe configuration', 'Pitch-catch pair (two probes) straddling the weld', 'Single array per side; 16-128 elements'],
      ['Defect type detected', 'Planar (cracks, LOF, LOP) excellently; volumetric weakly', 'All defect types including porosity and slag'],
      ['Cost per linear foot', '$8-$15 standalone TOFD; $18-$30 paired with PAUT', '$12-$25 PAUT alone with encoder'],
      ['Throughput rate', '100-200 ft/hr standalone — fastest UT technique', '60-120 ft/hr encoded PAUT'],
      ['Certification required', 'Level II UT + TOFD-specific endorsement (~40 hr)', 'Level II UT + PAUT endorsement (~80 hr)'],
      ['Code coverage', 'ASME V Art. 4 Mand. App. III; ISO 10863; API 1104 Annex A', 'ASME V Art. 4 Mand. App. IV/V; ASME VIII §7.5.5; API 1104 Annex A'],
      ['Equipment cost', '$30K-$60K dedicated TOFD system; built into PAUT flaw detectors', '$45K-$95K PAUT flaw detector + scanner + wedges'],
      ['Recommended wall thickness', '20-300 mm — best above 25 mm', '6-300+ mm'],
    ],
  },
  whenAWins: [
    {
      scenario: 'Through-wall sizing of a known indication before fitness-for-service evaluation',
      reason:
        'TOFD\'s diffracted tip signal arrives at the exact through-wall position of the crack tip. With a calibrated lateral wave reference, through-wall extent measures within ±0.5 mm — better than any other UT technique. For an API 579 Level 2 fitness-for-service assessment, where the difference between a 4 mm and 6 mm through-wall crack determines run-versus-repair, TOFD is the only UT method that gives the required sizing precision.',
    },
    {
      scenario: 'High-throughput screening of long-seam welds on pressure vessels',
      reason:
        'TOFD with a motorized scanner clears 100-200 ft of weld per hour because a single pitch-catch pair covers the full wall thickness in one pass. PAUT with sector scans clears 60-120 ft/hr for comparable coverage. On a 100-foot long-seam shell weld, TOFD shaves 2-3 hours off the inspection clock. Most long-seam procedures qualify TOFD as the primary screen, with PAUT used only to characterize indications TOFD picks up.',
    },
    {
      scenario: 'Heavy-wall reactor or thick-section forging where multiple PAUT angles would be required',
      reason:
        'On 75-200 mm wall, PAUT needs 3-5 sector scans (30°-70° sweep, plus 0°) to cover the volume. TOFD covers the same volume with one pitch-catch geometry because the diffracted signal is independent of beam angle relative to the flaw. ASME V Art. 4 Mand. App. III is the standard procedure for heavy-wall TOFD; most refinery hydrocracker reactor weld inspection procedures pair TOFD as the primary volumetric screen with PAUT on the dead-zone regions.',
    },
    {
      scenario: 'Detection of mid-wall planar flaws missed by amplitude-based PAUT',
      reason:
        'Tight planar flaws oriented vertically in the wall produce a weak amplitude reflection on conventional PAUT but a strong diffracted signal on TOFD. The diffracted tip signal isn\'t amplitude-dependent in the same way — even a fine, tight crack produces detectable tip signals at both ends. For hydrogen-induced cracking and stress corrosion cracking in pressure vessels (NACE MR0103 sour service), TOFD often catches what PAUT misses.',
    },
  ],
  whenBWins: [
    {
      scenario: 'Surface and near-surface defect inspection — toe cracks, root cracks, undercut',
      reason:
        'TOFD has a 5-10 mm dead zone at the OD surface from the lateral wave timing and a 3-5 mm dead zone at the ID from the back-wall echo. Anything in those zones is invisible to TOFD. PAUT angle-beam covers the surface and near-surface volume completely. On a 25 mm vessel weld, that\'s 30-50% of the wall TOFD can\'t see — PAUT is the only choice for full coverage.',
    },
    {
      scenario: 'Lateral defect sizing for acceptance against length-based criteria',
      reason:
        'ASME VIII UW-53 and ASME B31.3 §344.5 use indication length as a primary acceptance variable (length × depth criteria). TOFD overestimates length by 5-15 mm because diffracted signals beam-spread from the crack tips. PAUT C-scans size indications laterally within ±2 mm via encoded position. For acceptance work, PAUT length sizing is the procedure of record.',
    },
    {
      scenario: 'Volumetric defects — porosity clusters, slag inclusions',
      reason:
        'Porosity produces a scattered echo on PAUT at 0° straight beam that\'s easy to identify. On TOFD, porosity scatters the lateral wave into incoherent noise that doesn\'t produce a clear diffracted signal pattern. PAUT with a dedicated 0° channel handles volumetric defects; TOFD does not. For procedures qualified to substitute for RT under ASME VIII §7.5.5, the PAUT side carries the volumetric detection burden.',
    },
    {
      scenario: 'Complex geometry — nozzle welds, branch connections, T-joints',
      reason:
        'TOFD geometry requires a flat or large-radius surface to maintain the pitch-catch beam path. Nozzle welds, set-on connections, and T-joints with reinforcing pads break the geometry. PAUT with custom wedge contours adapts to these joints; ASME V Art. 4 Mand. App. IV explicitly covers nozzle-weld scan plans. On any joint with geometry transitions, PAUT is the practical primary method.',
    },
  ],
  whenEitherWorks: [
    {
      scenario: 'Carbon steel butt weld 25-50 mm wall, straight pipe geometry — both methods qualified, pick on what equipment is on truck',
      pick: 'A',
    },
    {
      scenario: 'Long-seam vessel shell weld 30 mm wall — TOFD primary screen, PAUT for indication characterization is standard',
      pick: 'A',
    },
  ],
  costDifference:
    "TOFD standalone runs $8-$15 per linear foot of weld — cheaper than PAUT because the equipment is simpler (a pitch-catch probe pair on a scanner) and the data interpretation is faster (D-scan strip chart per probe pair). PAUT alone is $12-$25 per foot. The paired TOFD+PAUT procedure that most code-quality work runs costs $18-$30 per foot, which is roughly 1.5-2x TOFD alone but with the dead-zone coverage and lateral sizing PAUT brings. For long-seam vessel shells where TOFD primary screening is appropriate, the paired procedure typically nets out the same cost as PAUT alone because TOFD\'s 2x faster screening offsets the second-pass cost. Capital is shared on modern equipment — most current PAUT flaw detectors (Olympus OmniScan X3, Eddyfi M2M Gekko, Sonatest VEO+) include built-in TOFD channels and dual-probe wiring. The $45K-$95K PAUT system covers both techniques without a separate purchase.",
  speedDifference:
    "TOFD is materially the fastest weld inspection technique in the UT family at 100-200 ft/hr because one pitch-catch pair covers the full wall in one pass. PAUT runs 60-120 ft/hr with sector scans covering the same wall. The paired TOFD+PAUT scan slows to 50-80 ft/hr because the two scans run sequentially on a single-pass setup, or simultaneously with a multi-probe scanner at 60-90 ft/hr. Setup time is comparable — both techniques use the same encoder, the same calibration block (with TOFD-specific lateral wave timing verification), and the same scan plan documentation. Where TOFD wins on cycle time: long-seam vessel shell welds 50-100 feet long where the linear geometry suits a one-pass scan. Where PAUT pulls ahead: short welds with complex geometry (nozzles, branch connections, fillet welds) where TOFD\'s pitch-catch geometry breaks down.",
  certificationDifference:
    "Both methods build on a Level II UT base under ASNT SNT-TC-1A. TOFD-specific endorsement is typically a 40-hour course covering pitch-catch geometry, lateral wave identification, back-wall echo positioning, calibration on a TOFD block per ISO 10863, and D-scan strip chart interpretation. PAUT-specific endorsement runs 80 hours and covers electronic beam steering, focal law construction, sector vs linear scans, side-drilled hole calibration per ASME V Mand. App. IV, and scan plan documentation. Many employers cross-certify: a technician with PAUT endorsement gets TOFD endorsement with an additional 16-24 hours of training because the underlying UT principles overlap. For API 1104 Annex A automated UT on cross-country pipeline, both techniques require qualification on a project-specific demonstration block witnessed by the AI. CWB Canada has separate TOFD and PAUT endorsements under CSA W178.2 with similar training hour requirements.",
  faqs: [
    {
      q: 'Why does TOFD have a dead zone?',
      a: 'TOFD operates by detecting the diffracted ultrasonic signal at the tip of a planar flaw. The receiving probe also picks up the lateral wave that travels along the OD surface from transmitter to receiver — this signal arrives first and saturates the receiver for the first 5-10 microseconds, which translates to a 5-10 mm depth blind spot at the OD surface. Similarly, the back-wall echo at the ID arrives late and the time gate between the lateral wave end and back-wall echo defines the usable inspection volume. The ID dead zone is 3-5 mm. Compensating dead zones requires either a second TOFD pair at different probe separation (rare) or PAUT angle-beam coverage in the dead zone regions — the standard pairing.',
    },
    {
      q: 'Can TOFD substitute for RT under ASME?',
      a: 'TOFD alone cannot substitute for RT under ASME VIII §7.5.5 — the substitution requires PAUT (or TOFD + PAUT) qualified on a representative flawed test piece. TOFD covers mid-wall planar defects with excellent sensitivity but misses surface defects and volumetric porosity. Most qualified procedures pair TOFD with PAUT and a 0° straight beam to match RT detection across all defect types. ASME V Article 4 Mandatory Appendix III qualifies TOFD as a stand-alone method for specific applications (high-temperature hydrogen attack monitoring, in-service crack growth surveillance) but not as an RT substitute for new construction code work.',
    },
    {
      q: 'What is the lateral wave on a TOFD D-scan?',
      a: 'The lateral wave is the surface-traveling longitudinal wave that propagates along the OD between the TOFD transmitter and receiver probes. It arrives first because the surface path is shorter than any sub-surface path, and it appears as a strong, time-stable signal at the top of every D-scan strip. The lateral wave serves as the time reference for through-wall sizing — every diffracted indication is measured in delay from the lateral wave. A discontinuity in the lateral wave (a sharp interruption) typically indicates a surface-breaking flaw at the OD; this is one of the few ways TOFD can detect surface defects, though sizing accuracy in this mode is poor.',
    },
    {
      q: 'Do I need TOFD if I have PAUT?',
      a: 'For wall thickness above 25 mm where through-wall sizing matters, yes. PAUT alone sizes through-wall extent to ±1-2 mm; TOFD pushes that to ±0.5-1 mm. For fitness-for-service evaluation under API 579, the sizing precision difference determines repair-versus-run decisions. For new construction code work where pass/fail acceptance is amplitude-based (DAC or amplitude-based ASME criteria), PAUT alone is sufficient on many procedures. The owner spec usually decides: ExxonMobil, Shell, and Saudi Aramco specs explicitly require paired TOFD+PAUT for vessel welds above 25 mm; AWS D1.1 structural welds accept PAUT alone.',
    },
    {
      q: 'How fast is TOFD on a long-seam vessel shell?',
      a: 'A single TOFD pair on a motorized linear scanner clears 100-200 linear feet of long-seam weld per hour, depending on scan resolution and acquisition rate. The scanner moves at 50-100 mm/s along the weld with the probe pair fixed at a calibrated separation. Setup runs 20-30 minutes per shell course including encoder calibration, lateral wave verification on a block, and back-wall echo positioning. For a 100-foot long-seam shell, total inspection clock is 90-120 minutes including setup. Compare that to manual angle-beam UT at 20-40 ft/hr — TOFD is the highest-throughput weld inspection technique in production.',
    },
  ],
  internalLinks: [
    { href: '/methods/tofd', label: 'Time-of-Flight Diffraction method overview', context: 'TOFD physics, lateral wave, and pitch-catch geometry are covered in our TOFD deep-dive.' },
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT method overview', context: 'PAUT focal laws, sector scans, and scan plans live in our PAUT deep-dive.' },
    { href: '/methods/ultrasonic-testing', label: 'Conventional Ultrasonic Testing', context: 'Conventional UT is the building block underlying both TOFD and PAUT certifications.' },
    { href: '/methods/radiographic-testing', label: 'Radiographic Testing', context: 'RT is the substitution method that paired TOFD+PAUT replaces under ASME VIII §7.5.5.' },
    { href: '/standards/asme-section-v', label: 'ASME Section V — NDE methods', context: 'TOFD (Mand. App. III) and PAUT (Mand. App. IV/V) both live in ASME Section V Article 4.' },
    { href: '/standards/iso-10863', label: 'ISO 10863 — TOFD of welds', context: 'ISO 10863 is the international procedural standard for TOFD on welded joints.' },
    { href: '/blog/phased-array-ultrasonic-testing-guide', label: 'PAUT complete guide', context: 'Scan plan design and TOFD pairing walked through with field examples.' },
    { href: '/free-tools/ndt-cost-calculator', label: 'NDT cost calculator', context: 'Run a TOFD vs paired TOFD+PAUT cost comparison for your weld scope.' },
  ],
  citations: [
    { id: 'asme-v-art-4-app-iii', source: 'ASME BPVC Section V, 2023, Article 4 Mandatory Appendix III — Time of Flight Diffraction (TOFD)' },
    { id: 'asme-v-art-4-app-iv', source: 'ASME BPVC Section V, 2023, Article 4 Mandatory Appendix IV — Phased Array Manual Raster' },
    { id: 'iso-10863', source: 'ISO 10863:2020 NDT of welds — Ultrasonic testing — Use of TOFD technique' },
    { id: 'asme-viii-div2-7-5-5', source: 'ASME BPVC Section VIII Div. 2, 2023, §7.5.5 Ultrasonic in lieu of Radiographic Examination' },
    { id: 'api-1104-annex-a', source: 'API Standard 1104, 22nd ed., 2021, Annex A — Alternative Acceptance Standards for Girth Welds Using Automated UT' },
    { id: 'api-579', source: 'API 579-1/ASME FFS-1, 2021, Fitness-For-Service, Part 9 Crack-Like Flaws' },
    { id: 'iso-13588', source: 'ISO 13588:2019 NDT of welds — Ultrasonic testing using automated phased array' },
    { id: 'nace-mr0103', source: 'NACE MR0103/ISO 17945:2015 Materials resistant to sulfide stress cracking' },
  ],
};

export default comparison;
