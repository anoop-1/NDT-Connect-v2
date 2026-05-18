import type { GlossaryLongFormContent } from '../types';

const term: GlossaryLongFormContent = {
  slug: 'c-scan',
  term: 'C-Scan',
  category: 'Ultrasonic Testing',
  metaTitle: 'C-Scan: Top-Down UT Imaging for Corrosion Mapping & Composites',
  metaDescription:
    'C-Scan is the plan-view UT image — colour-mapped amplitude or wall thickness across an inspected area. Read corrosion maps, composite bond scans, and PAUT outputs.',
  heroLede:
    'A C-scan is the top-down planar view in ultrasonic testing — a 2D map of the inspected area where each pixel\'s colour encodes either reflector amplitude or wall-remaining thickness at that X-Y position. It is the format an asset owner can hand to a fitness-for-service engineer without needing to read a single A-scan: corrosion patches show up as red zones, debonds in composite skins appear as cool-blue islands, and inclusions in forgings cluster as visible spots.',
  preciseDefinition:
    'C-scan is a UT display mode showing a planar (X-Y) image of reflector response across a scanned area, with amplitude or depth/thickness rendered as colour at each scan position.[1]',
  alternateNames: ['Plan view', 'Top-down scan', 'Planar UT map', 'Corrosion C-scan', 'Amplitude C-scan'],
  history:
    'C-scan emerged from the aerospace industry in the 1960s when bonded honeycomb sandwich panels needed bond-line verification. Sperry Products and Automation Industries built mechanical X-Y scanners over immersion tanks that produced black-and-white amplitude maps. The format moved to industrial corrosion inspection in the 1990s when encoded raster scanners and PAUT data acquisition made colour-mapped planar views standard.',
  technicalDetail: [
    {
      heading: 'Construction from raster or PAUT data',
      level: 2,
      paragraphs: [
        'A C-scan requires two-dimensional position tracking. Two encoders (one per axis) report the probe\'s X-Y location while it raster-scans the surface. At each grid point the instrument captures an A-scan, extracts a chosen metric (peak amplitude in a gate, depth of first peak, minimum back-wall depth = wall remaining), and writes that value to the X-Y pixel. Colour palettes map the value range — red high to blue low for amplitude, dark for thinned wall on a remaining-thickness scan.',
        'PAUT systems generate C-scans without a 2D raster: a linear array translated along one axis produces a 2D dataset where the array aperture itself supplies the second axis. Encoded mechanical scanners with PAUT (e.g. Olympus HydroFORM, Eddyfi RMS) produce square-pixel C-scans at 1 mm × 1 mm or finer over weld and shell areas.[2]',
        'The "projection" choice matters: a depth-projected C-scan collapses the full depth range into a single pixel value (e.g. minimum thickness anywhere through the wall); a gated C-scan reports only echoes inside a depth window (useful for isolating mid-wall flaws from surface noise).',
      ],
    },
    {
      heading: 'Amplitude vs. thickness C-scans',
      level: 2,
      paragraphs: [
        'Amplitude C-scans render the peak gate response — common in composite bond inspection, where loss of back-wall energy through a debond shows as a low-amplitude island, or in forging volumetric inspection where high-amplitude indications above DAC mark recordable inclusions.',
        'Thickness C-scans render the wall-remaining value — the depth of the back-wall echo measured from the surface entry. These are the deliverable for API 510 vessel surveys and API 653 tank shell scans. Each pixel literally reads "this much steel is left here". A 4 mm pit in an originally 12 mm wall appears as a pixel of 8 mm thickness inside an otherwise 12 mm field, and a colour gradient shows the pit shape.[3]',
        'Acceptance against a fitness-for-service limit (API 579/ASME FFS-1) is normally computed against the minimum-thickness pixel inside a region of interest, plus a t-min profile that follows the corrosion contour. A C-scan that exports to .csv or DICONDE format integrates directly with FFS analysis software.',
      ],
    },
    {
      heading: 'Resolution, sampling, and false reads',
      level: 2,
      paragraphs: [
        'Spatial resolution depends on probe beam size and sample step. A 9 mm diameter 5 MHz dual-element probe with 1 mm raster step gives sub-millimetre apparent pixel resolution but only ~6 mm physical lateral resolution — a 3 mm wide pit will image but with blurred edges. PAUT linear arrays with 0.6 mm element pitch sharpen this to under 1 mm effective resolution.',
        'False thinning reads come from coupling drop-outs (operator passes the probe over an air pocket and the system reads a "0 mm" pixel) and from internal flaws (mid-wall lamination triggers the thickness gate before the true back-wall, producing a false thinning band). Best-practice scans use dual-gate logic: report wall only if both the gate hit a real back-wall echo and the amplitude is above a sanity threshold.',
        'Sample step too coarse misses defects. A 10 mm raster step over a 5 mm wide pit will alias — the pit may not register in any single pixel. API 570 §5.5.4 recommends step ≤ 50% of expected minimum defect size; for general corrosion mapping, 1-2 mm raster is typical.',
      ],
    },
  ],
  workedExample: {
    setup:
      'Encoded PAUT corrosion C-scan of a 6 m × 1.2 m tank shell course (API 653 inspection). Probe: 5 MHz 64-element 1 mm pitch linear array, scanned at 1 mm × 1 mm pixels. Original nominal wall: 12.7 mm. Corrosion allowance per fitness-for-service evaluation: 1.5 mm. Minimum required wall: 11.2 mm.',
    calculation:
      'The thickness C-scan shows a 320 mm × 180 mm patch of generalised thinning with a hot spot inside it. Colour-cursor sampling: surrounding nominal field reads 12.6-12.7 mm (within mill tolerance). Patch average reads 11.4 mm. Hot-spot minimum reads 9.1 mm over a 28 mm × 22 mm area. Remaining wall at hot spot = 9.1 mm vs. 11.2 mm minimum allowable = 2.1 mm shortfall.',
    result:
      'Reject — the hot spot is below t-min. Per API 653 §6.4.2, run an API 579 Level 2 FFS assessment on the local thin area: characteristic length s = √(2 × Rt × tmm) sets the metallic loss envelope. Either repair (weld build-up or patch plate) or accept with a derated MAWP and a 1-year re-scan interval, documented on the next inspection record.',
  },
  whereItAppears: [
    {
      context: 'Composite bond-line inspection on aerospace honeycomb sandwich panel',
      explanation:
        'The technician immersion-scans a wing leading-edge panel in a pulse-echo tank. The C-scan is set to render the bond-line gate amplitude. A 25 mm circular dark island appears at coordinates (212, 88) — bond-line energy is dropping there. Cross-checked against the build record and reported as a Class B disbond per AMS 2638; the panel goes to repair-bond rework.',
    },
    {
      context: 'Refinery vessel head corrosion survey under API 510',
      explanation:
        'A magnetic-wheel scanner with a PAUT linear array sweeps the inside of a hydrotreater bottom head during turnaround. The thickness C-scan reveals a crescent of thinning along the weld toe of the skirt-to-head joint, suggesting CUI ingress from the skirt fireproofing. The image is exported as a .csv grid into the integrity engineer\'s FFS software and the re-inspection interval is shortened from 5 to 2 years.',
    },
    {
      context: 'Forging volumetric inspection per AMS 2630',
      explanation:
        'A rotor forging is raster-scanned with an immersion 10 MHz transducer. The amplitude C-scan, gated on the volumetric depth range, reveals three small high-amplitude indications clustered near the bore. Each is sized using A-scan amplitude and DGS curve, and the indication map (the C-scan with annotations) goes into the forging certification dossier.',
    },
  ],
  relatedTerms: [
    { term: 'A-Scan', slug: 'a-scan' },
    { term: 'B-Scan', slug: 'b-scan' },
    { term: 'PAUT', slug: 'paut' },
    { term: 'Calibration Block', slug: 'calibration-block' },
  ],
  faqs: [
    {
      q: 'Is a C-scan accurate enough for fitness-for-service evaluation?',
      a: 'Yes, when the scan is encoded, calibrated, and produced with appropriate sample step and probe beam size. API 579-1/ASME FFS-1 §5.3.3 explicitly accepts encoded UT thickness mapping (i.e. C-scans) as input for Level 2 and Level 3 local thin-area assessments. The acceptance hinges on: confirmed calibration against a step wedge before and after the scan; raster step ≤ 50% of the smallest defect of interest; documented operator certification (ASNT Level II at minimum); and a t-min profile exportable to the FFS calculation. Plug-and-play screen captures from an uncalibrated handheld gauge will not survive a regulatory audit.',
    },
    {
      q: 'Why do some pixels on a thickness C-scan read implausibly low or zero?',
      a: 'Three common causes. First, coupling drop-outs: the probe momentarily lost contact with the surface and the gate triggered on a noise spike or the surface entry, producing a zero or sub-mm pixel. Second, internal lamination: a horizontal flaw mid-wall reflected the beam before it could reach the back-wall, so the gate reports the lamination depth instead of true thickness. Third, gate set too tight: if the gate width does not span the full depth range of expected wall, a slightly thicker spot puts the back-wall outside the gate and the system reports zero. Use dual-gate sanity logic and inspect the underlying A-scans at any anomalously low pixel before reporting.',
    },
    {
      q: 'How does a C-scan differ from a radiographic film image of the same flaw?',
      a: 'Both are 2D projections, but they encode different physics and orient differently. Radiography projects radiation absorption through the entire wall onto film — flaws are integrated through-thickness and their depth is hidden unless stereo or DR multi-angle techniques are used. A C-scan projects ultrasonic reflectivity onto a plan view at chosen depth gates — depth is preserved and the operator can isolate flaws by depth window. RT is faster on porosity, slag, and dense inclusions; C-scan UT is the only practical option for planar flaws perpendicular to the surface (delaminations, debonds) and for through-wall thickness mapping. Many modern code regimes mandate UT C-scan over RT for thick wall (>50 mm) welds (ASME VIII Div 2 Mandatory Appendix 14).',
    },
    {
      q: 'Can a C-scan be performed without an encoder, by free-hand scanning?',
      a: 'Not for any recordable inspection. A C-scan by definition has X-Y axes calibrated to physical distance — free-hand "screen-grab" scans where the operator drags a probe over a surface and the screen shows a coloured pattern are not C-scans, they are operator-impression heat maps with no positional traceability. ASME V Mandatory Appendix V (encoded UT) requires positional accuracy of ±10% of reportable flaw length or ±5 mm. Practically: use a wheeled encoder or PAUT scanner with built-in positional encoders for any C-scan that will be used as an inspection deliverable, and reserve free-hand scans for initial scouting before mounting the encoder.',
    },
  ],
  internalLinks: [
    {
      href: '/services/ultrasonic-testing',
      label: 'Ultrasonic Testing',
      context: 'C-scans are the deliverable format for encoded UT corrosion surveys',
    },
    {
      href: '/services/phased-array-ut',
      label: 'Phased Array UT',
      context: 'PAUT linear arrays generate native C-scans during weld and corrosion scans',
    },
    {
      href: '/services/corrosion-mapping',
      label: 'Corrosion mapping',
      context: 'C-scans visualise wall-remaining thickness across vessel and pipe walls',
    },
    {
      href: '/glossary/a-scan',
      label: 'A-scan',
      context: 'Each C-scan pixel is derived from an underlying A-scan waveform',
    },
    {
      href: '/glossary/b-scan',
      label: 'B-scan',
      context: 'B-scan side views and C-scan plan views are produced from the same encoded dataset',
    },
    {
      href: '/standards/api-510',
      label: 'API 510 pressure vessel inspection',
      context: 'API 510 §5.5 nominates encoded UT C-scans as an acceptable thickness survey method',
    },
    {
      href: '/standards/asme-bpvc-section-v',
      label: 'ASME BPVC Section V',
      context: 'Mandatory Appendix V sets encoded scanning requirements for C-scans',
    },
    {
      href: '/free-tools/calibration-reminder',
      label: 'calibration reminder',
      context: 'Track instrument calibration windows so C-scan data remains audit-defensible',
    },
    {
      href: '/industries/aerospace',
      label: 'aerospace NDT',
      context: 'Aerospace composite bond inspection relies on immersion C-scans',
    },
  ],
  citations: [
    {
      id: 'astm-e1316-c',
      source: 'ASTM E1316-23, Standard Terminology for Nondestructive Examinations, Section B — C-scan definition',
      url: 'https://www.astm.org/e1316-23.html',
    },
    {
      id: 'asme-v-app-v',
      source: 'ASME BPVC Section V, 2023 Edition, Article 4 Mandatory Appendix V — Encoded scanning',
    },
    {
      id: 'api-579',
      source: 'API 579-1 / ASME FFS-1 (2021), §5.3.3 — Use of thickness data from UT scanning in Level 2 assessments',
    },
    {
      id: 'ams-2630',
      source: 'SAE AMS 2630E, Inspection of Wrought Metal Products, 2020 — Section on C-scan requirements for forgings',
    },
    {
      id: 'asnt-paut',
      source: 'ASNT Recommended Practice No. SNT-TC-1A (2024), Supplement on Phased Array UT — C-scan acquisition guidance',
    },
  ],
};

export default term;
