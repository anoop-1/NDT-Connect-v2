import type { GlossaryLongFormContent } from '../types';

const term: GlossaryLongFormContent = {
  slug: 'b-scan',
  term: 'B-Scan',
  category: 'Ultrasonic Testing',
  metaTitle: 'B-Scan: Cross-Section UT Imaging Defined for Inspectors',
  metaDescription:
    'B-Scan is the side-view UT cross-section image. Learn how it is built from stacked A-scans, where it is required (TOFD, corrosion mapping), and how to read it.',
  heroLede:
    'A B-scan is the cross-section view in ultrasonic testing — a side-on image of reflectors plotted as depth on the vertical axis and probe position along a scan line on the horizontal axis. It is the picture every corrosion-mapping engineer, TOFD operator, and PAUT technician relies on to understand how flaws or wall-loss are distributed along a weld or shell course, rather than just at one spot under the probe.',
  preciseDefinition:
    'B-scan is a UT display mode showing reflector depth vs. scan position along a single line, built by stacking many A-scan traces side by side with amplitude rendered as colour or brightness.[1]',
  alternateNames: ['Brightness scan', 'Cross-sectional scan', 'Side view', 'Profile scan'],
  history:
    'The B-scan format originated in medical ultrasound in the 1950s, where Wild and Reid demonstrated 2D imaging of soft tissue by mechanically translating a transducer and brightness-modulating the trace. Industrial UT adopted the format in the 1970s for corrosion mapping and in the 1990s for TOFD imaging. The "B" comes from "brightness", the way amplitude was originally encoded on a CRT.',
  technicalDetail: [
    {
      heading: 'How the image is constructed',
      level: 2,
      paragraphs: [
        'A B-scan requires position tracking. As the probe moves along a scan line, an encoder (wheel, magnetic strip, or linear scanner) reports its X position to the flaw detector. At each sample position the instrument fires a pulse, captures the returning A-scan waveform, and adds it as one vertical column of pixels to the image. Amplitude becomes colour or grey-shade: high amplitude = bright/red, low = dark/blue.',
        'The vertical axis is depth (or one-way metal path). The horizontal axis is scan distance along the encoded path. For a 600 mm long weld scanned at 1 mm sample spacing, the resulting B-scan is 600 columns wide; each column holds one A-scan. Resolution along the scan axis is set by the encoder sample interval; resolution in depth is set by the pulse bandwidth and digitiser sample rate.[2]',
        'Two B-scan flavours dominate in industrial practice: corrosion B-scan (single-element 0° probe sweeping along a line, mapping wall thickness as a profile) and TOFD B-scan (paired probes capturing tip-diffraction signals across the weld for through-wall flaw sizing per ASME V Article 4 Mandatory Appendix III).[3]',
      ],
    },
    {
      heading: 'Encoded vs. time-based B-scans',
      level: 2,
      paragraphs: [
        'An encoded B-scan plots position from a calibrated wheel — every column corresponds to a real scan-line millimetre, and the image dimensions are physically accurate. Required for ASME and API recordable inspections; without an encoder, you cannot reconstruct a flaw position later or compare runs.',
        'A time-based (or "free-run") B-scan plots the column index against time, not position. Useful for quick scouting on heat exchanger tubing (the IRIS rotating probe), but acceptance criteria that require a flaw to be located within ±X mm of a weld feature cannot be satisfied without a calibrated encoder.',
        'Top-view (planar) B-scans show length × position; side-view (depth) B-scans show depth × position. PAUT software typically generates both simultaneously from the same dataset, often alongside C-scans and sectorial scans.',
      ],
    },
    {
      heading: 'Sizing flaws from a B-scan',
      level: 2,
      paragraphs: [
        'Length is read directly from the horizontal axis using the 6 dB drop method: position the cursor at the upper and lower amplitude midpoints and measure the position difference. The encoder accuracy (typically ±1% of scan length) sets the lower bound of sizing precision.',
        'Through-wall height in a TOFD B-scan is measured by tip-diffraction: the upper-tip and lower-tip signals from a crack appear as two separate hyperbolas on the image, and their depth difference is the crack height. ASME V Mandatory Appendix III §III-440 requires through-wall sizing accuracy of ±1 mm or ±10% of flaw height, whichever is larger.[4]',
        'Wall remaining is read directly from a corrosion-map B-scan as the depth-axis position of the bright back-wall response. Bands of reduced thickness appear as upward excursions of the back-wall trace and are immediately visible to the eye, which is why API 510 §5.5.3 nominates corrosion B-scan as an acceptable thickness survey method.',
      ],
    },
  ],
  workedExample: {
    setup:
      'TOFD B-scan of a 25 mm thick butt weld using 5 MHz 60° longitudinal probes, PCS 70 mm, encoded scan along a 400 mm weld length at 0.5 mm sample step.',
    calculation:
      'The image shows a lateral wave at the top of the screen and a back-wall reflection at depth 25 mm. Between them, a crack indication produces two diffraction hyperbolas: upper tip at 8.0 mm depth (2-way time 6.7 µs) and lower tip at 16.5 mm depth. Crack height = 16.5 - 8.0 = 8.5 mm. The crack horizontal extent (6 dB drop on the indication amplitude) spans 38 mm along the scan axis.',
    result:
      'Flaw size: 38 mm long × 8.5 mm through-wall. Per ASME VIII Div 1 Appendix 12, a planar flaw of this size in a 25 mm wall exceeds the allowable height limit (a/t = 8.5/25 = 0.34 > 0.25 threshold for non-aligned planar flaws). Reject; mark for repair and re-NDE per UW-51.',
  },
  whereItAppears: [
    {
      context: 'TOFD scan of a longitudinal seam weld on a hydrocracker reactor',
      explanation:
        'The TOFD B-scan is the master image of the inspection record. Lateral wave traversal, back-wall reflection, and any diffracted tip signals from cracking or lack-of-fusion all appear as bands across the image. Operators sweep their cursor across the image, sizing length from the X-axis and through-wall extent from the Y-axis, and the entire B-scan file is archived as the inspection deliverable.',
    },
    {
      context: 'Corrosion mapping of a refinery tank shell course',
      explanation:
        'A single-element 0° probe is dragged across the shell on a magnetic-wheel scanner. The encoder feeds position to the flaw detector, which builds a depth-versus-position B-scan in real time. Localised pitting shows as a downward dip in the back-wall trace; an internal corrosion patch shows as a lighter shaded band. The B-scan is then converted to a C-scan (top-down) for API 653 reporting.',
    },
    {
      context: 'PAUT weld scan with combined S-scan + B-scan display',
      explanation:
        'During encoded PAUT weld inspection, the operator typically watches three views simultaneously: the sectorial (S-scan) showing current beam-angle response at one position, the side-view B-scan showing all positions stacked, and the live A-scan at the cursor. The B-scan is what reveals whether a flaw is a single point indication or a continuous line of porosity along the weld.',
    },
  ],
  relatedTerms: [
    { term: 'A-Scan', slug: 'a-scan' },
    { term: 'C-Scan', slug: 'c-scan' },
    { term: 'TOFD', slug: 'tofd' },
    { term: 'PAUT', slug: 'paut' },
  ],
  faqs: [
    {
      q: 'What is the difference between a B-scan and a C-scan?',
      a: 'A B-scan is a side-view cross-section showing depth (vertical) versus scan position (horizontal); a C-scan is a top-down planar map showing reflector position in two scan-axis dimensions (X-Y) at a chosen depth or depth range. The B-scan answers "how deep is the flaw and how does depth vary along the scan?"; the C-scan answers "what is the in-plane outline of the flaw?". For a corroded plate, the B-scan shows the wall-thickness profile along one line; the C-scan shows the corrosion patch outline over the whole inspected area. Modern data-acquisition software displays both views from the same recorded dataset side by side.',
    },
    {
      q: 'Do I need an encoder to record a B-scan?',
      a: 'For any code-compliant inspection record, yes. An encoded B-scan correlates each column of the image to a real scan-line distance, so a flaw\'s position is reproducible months or years later when the part is re-examined. ASME V Article 4 Mandatory Appendix V (encoded UT) explicitly requires positional accuracy of ±10% of the reportable flaw length or ±5 mm, whichever is smaller. A time-based "free-run" B-scan without an encoder is acceptable only for scouting or non-recorded screening — it gives you an image, but the X-axis is meaningless until you couple position data.',
    },
    {
      q: 'How is image resolution determined in a B-scan?',
      a: 'Two independent axes set resolution. Along-scan resolution is determined by the encoder sample interval — a sample every 0.5 mm gives a 0.5 mm pixel size along that axis, and the probe beam width (typically 6-15 mm) sets the practical lateral resolution. Depth-axis resolution is set by the pulse bandwidth: a wide-bandwidth, short-pulse probe at 5 MHz gives ~0.5 mm depth resolution in steel, while a narrow-band 2.25 MHz probe gives ~1.5 mm. Digitiser sample rate must satisfy Nyquist for the bandwidth used — 100 MHz sampling is standard, 200 MHz preferred for tip-diffraction sizing accuracy under 0.5 mm.',
    },
    {
      q: 'Can a B-scan be used as the only inspection record, without saving raw A-scans?',
      a: 'Codes differ. ASME V Article 4 T-491 records the requirement for raw A-scan data retention for nuclear-class examinations because every measurement traces back to a waveform. API 570 §5.5 and AWS D1.1 §6.25.1 are less prescriptive — a calibrated B-scan with cursor measurements and screen captures often suffices for piping and structural work. Best practice in commercial inspection is to retain the raw dataset (every A-scan that built the B-scan image) because rebuilding the image with different colour palettes or gates only works from raw data. Owners who fight a future repair contest are glad they kept the .OPD or .NDE files.',
    },
  ],
  internalLinks: [
    {
      href: '/services/ultrasonic-testing',
      label: 'Ultrasonic Testing',
      context: 'B-scans are an encoded record format for conventional UT inspections',
    },
    {
      href: '/services/tofd-testing',
      label: 'TOFD inspection',
      context: 'TOFD output is a B-scan image used for tip-diffraction sizing',
    },
    {
      href: '/services/phased-array-ut',
      label: 'Phased Array UT',
      context: 'PAUT inspection records typically include B-scan, C-scan, and sectorial views together',
    },
    {
      href: '/services/corrosion-mapping',
      label: 'Corrosion mapping',
      context: 'B-scans visualise wall-thickness variation along a scan path',
    },
    {
      href: '/glossary/a-scan',
      label: 'A-scan',
      context: 'A B-scan is constructed by stacking many A-scans encoded along a scan line',
    },
    {
      href: '/glossary/c-scan',
      label: 'C-scan',
      context: 'B-scans and C-scans are complementary depth and planar views of the same dataset',
    },
    {
      href: '/standards/asme-bpvc-section-v',
      label: 'ASME BPVC Section V',
      context: 'Article 4 Mandatory Appendix V sets encoded scan requirements for B-scans',
    },
    {
      href: '/free-tools/ai-procedure-generator',
      label: 'NDT procedure generator',
      context: 'Generate a TOFD/encoded UT procedure that specifies B-scan capture parameters',
    },
    {
      href: '/industries/oil-and-gas',
      label: 'Oil & gas inspection',
      context: 'B-scans are the standard format for refinery corrosion mapping and TOFD weld scans',
    },
  ],
  citations: [
    {
      id: 'astm-e1316-b',
      source: 'ASTM E1316-23, Standard Terminology for Nondestructive Examinations, Section B — B-scan definition',
      url: 'https://www.astm.org/e1316-23.html',
    },
    {
      id: 'asme-v-app-v',
      source: 'ASME BPVC Section V, 2023 Edition, Article 4 Mandatory Appendix V — Encoded scanning requirements',
    },
    {
      id: 'asme-v-app-iii',
      source: 'ASME BPVC Section V, 2023 Edition, Article 4 Mandatory Appendix III — Time-of-Flight Diffraction (TOFD)',
    },
    {
      id: 'iso-10863',
      source: 'ISO 10863:2020, Non-destructive testing of welds — Ultrasonic testing — Use of TOFD technique',
    },
    {
      id: 'asnt-l2-ut',
      source: 'ASNT Level II Study Guide: Ultrasonic Testing, 3rd ed., 2020 — Chapter on display formats and encoded scanning',
    },
  ],
};

export default term;
