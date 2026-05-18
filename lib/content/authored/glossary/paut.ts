import type { GlossaryLongFormContent } from '../types';

const term: GlossaryLongFormContent = {
  slug: 'paut',
  term: 'PAUT (Phased Array Ultrasonic Testing)',
  category: 'Ultrasonic Testing',
  metaTitle: 'PAUT: Phased Array UT Defined — Probes, Wedges, Codes',
  metaDescription:
    'PAUT uses electronic beam steering across multi-element probes for fast weld and corrosion inspection. Learn focal laws, sector vs. linear scans, and ASME V Appendix XI rules.',
  heroLede:
    'Phased Array Ultrasonic Testing (PAUT) uses a multi-element transducer (16, 32, 64, or 128 elements) and computer-controlled timing of element pulses to electronically steer and focus an ultrasonic beam without mechanical movement of the probe. The technique replaces the time-consuming raster of conventional UT with a single sweeping electronic beam, cuts weld inspection time by 60-80%, and produces high-resolution sector/linear images that survive code-grade flaw sizing under ASME V Mandatory Appendix XI.',
  preciseDefinition:
    'Phased Array UT is an ultrasonic technique using a transducer assembly composed of multiple piezoelectric elements that are pulsed individually with precise time delays (focal laws) to electronically steer, focus, and sweep an ultrasonic beam through a volume of material.[1]',
  alternateNames: ['Phased Array UT', 'PA-UT', 'Phased array ultrasonics', 'Electronic beam steering UT'],
  history:
    'Phased array techniques developed in radar (1950s) and medical ultrasound (1970s) reached industrial NDT in the late 1990s. Olympus/R/D Tech released the first commercial portable PAUT instrument (Tomoscan FOCUS) in 1999; ASME approved PAUT for code-grade inspections in 2006 (Section V Mandatory Appendix XI). Adoption accelerated after 2010 with TFM (Total Focusing Method) algorithms and dual-matrix arrays that handled clad and austenitic welds previously considered unscannable.',
  technicalDetail: [
    {
      heading: 'Element arrays, focal laws, and beam geometry',
      level: 2,
      paragraphs: [
        'A PAUT probe is a linear or matrix array of piezoelectric elements. Standard 1D linear arrays carry 16-128 elements at 0.3-1.0 mm pitch; 2D matrix arrays (8×8, 16×4) and dual-matrix arrays use additional element rows for advanced imaging. Total aperture (number of active elements × pitch) sets the focal depth and beam width.',
        'A "focal law" is a table of element-by-element transmit and receive time delays that produces a beam at a specified angle, depth, and focal point. The instrument cycles through hundreds of focal laws per acquisition, producing one acoustic shot per law. For a 64-element probe doing a 40°-70° sector scan in 1° steps, that\'s 31 focal laws × pulse-echo per probe position = 31 A-scans displayed as a colour-mapped sectorial image.[2]',
        'Wedge: a refracting solid (Rexolite or PEEK) bonded to the probe face provides angle generation and surface conformance. Wedge angle (e.g. 36° for nominal 60° shear in steel) plus electronic steering give the full angular range. Wedge selection per ASME V Appendix XI must match probe frequency, element count, and intended beam steer range.',
      ],
    },
    {
      heading: 'Scan modes — sector, linear, and TFM',
      level: 2,
      paragraphs: [
        'Sectorial scan (S-scan): single-aperture probe position with beams sweeping through angle range (typically 40°-70° for shear weld inspection). Output is a fan-shaped image of the cross-section. Used for weld inspection and complex geometry.',
        'Linear scan (L-scan): all beams at constant angle, swept across the probe length by electronic aperture translation. Output is a rectangular B-scan image. Standard for corrosion mapping and parallel-walled component scanning.',
        'TFM (Total Focusing Method) acquires every transmit-receive element pair (Full Matrix Capture, FMC) and reconstructs an image with focus at every pixel in the inspection volume. Computationally intensive but gives the highest spatial resolution and is now the dominant technique for thick-wall austenitic, dissimilar-metal, and clad weld inspection. Acquired by Olympus AcoustoCAM, Sonatest VEO+, Eddyfi Mantis with TFM module.[3]',
      ],
    },
    {
      heading: 'Code recognition and qualification',
      level: 2,
      paragraphs: [
        'ASME V Mandatory Appendix XI (2021 update) defines PAUT procedure requirements: probe characterization, focal law verification on demonstration blocks with EDM notches and SDH, encoded scanning with positional accuracy ≤ 5 mm or 10% of reportable flaw length, and amplitude calibration using DAC, TCG, or ACG (Angle Corrected Gain).',
        'PAUT can be used as an alternative to RT for many ASME B31.3 piping welds (per Code Case 181) and ASME VIII Div 2 vessels — see B31.3 Para 344.6.2 acceptance criteria for ECA (Engineering Critical Assessment) sizing.',
        'API 1104 21st edition (2018) adopted PAUT for pipeline girth weld inspection with mandatory procedure qualification by demonstration on PQR blocks containing planted reference reflectors. Operator qualification requires Level II UT plus PAUT-specific training of 40 hours minimum per ASNT CP-189 Supplement.',
      ],
    },
  ],
  workedExample: {
    setup:
      'PAUT inspection of a 28 mm thick carbon steel butt weld, ASME B31.3 Process Piping. Probe: 5 MHz 64-element 1 mm pitch linear array on a 55° shear wedge. Encoded scan along 600 mm weld length at 1 mm sample step. Sector scan: 40°-70° in 1° steps.',
    calculation:
      'Focal laws: 31 angles × 1 PAUT shot per position = 31 A-scans per probe step. Scan length 600 mm at 1 mm encoded steps = 600 positions. Total A-scans captured = 600 × 31 = 18,600 waveforms in ~3 minutes of scanning at 200 mm/s probe travel. Compared to conventional UT: same weld with 60° shear angle beam at 50 mm scan increments and ±15° probe yaw = 36 manual probe positions × ~30 seconds operator-evaluated per position = ~18 minutes. Time saving: ~83%.',
    result:
      'PAUT sectorial scan, B-scan side view, and C-scan top-view captured in encoded record. Two indications above DAC at root-pass position located at positions 320 mm and 410 mm along the weld; sizing by 6 dB drop technique gives lengths 8 mm and 12 mm. Through-wall extent measured from S-scan: 3 mm and 5 mm. Both indications below B31.3 acceptance criterion (volumetric flaws ≤ 6 mm length and ≤ ¼ wall depth). Weld accepted; full data file archived as the inspection deliverable.',
  },
  whereItAppears: [
    {
      context: 'Refinery turnaround weld inspection',
      explanation:
        'PAUT crews on a 30-day turnaround can inspect 4-5× more welds per shift than conventional UT crews. The encoded data file replaces sketches and probe-by-probe written reports; a single PAUT scan produces sectorial, B-scan, and C-scan views in one acquisition. Owner integrity engineers run the .OPD or .NDE file through fitness-for-service software to assess any indications against ECA limits.',
    },
    {
      context: 'Pipeline construction girth weld inspection',
      explanation:
        'Modern mainline pipeline projects (X65/X70 carbon steel, 12-65 mm wall) often specify automated ultrasonic testing (AUT) — PAUT mounted on a girth scanner that traverses the pipe circumference in 90 seconds, replacing 8-15 minutes of Ir-192 RT per weld. ECA-based zonal acceptance under API 1104 Annex A and DNV-ST-F101 makes PAUT the dominant method for offshore and high-volume onshore work.',
    },
    {
      context: 'Aerospace and naval composite/metal bond inspection',
      explanation:
        'PAUT linear arrays with TFM imaging are the technique of choice for inspecting bonded composite and metal-composite joints in aerospace and submarine pressure-hull applications. Multi-element arrays cover large areas quickly and detect disbonds, kissing bonds, and resin starvation that conventional UT misses due to weak amplitude signals.',
    },
  ],
  relatedTerms: [
    { term: 'TOFD', slug: 'tofd' },
    { term: 'A-Scan', slug: 'a-scan' },
    { term: 'B-Scan', slug: 'b-scan' },
    { term: 'C-Scan', slug: 'c-scan' },
    { term: 'Angle Beam', slug: 'angle-beam' },
  ],
  faqs: [
    {
      q: 'How does PAUT differ from conventional UT in inspection speed and reliability?',
      a: 'Two structural advantages drive 60-85% time reduction on weld inspection. First, PAUT covers a full range of beam angles from a single probe position (40°-70° sector scan = equivalent of multiple conventional probes), eliminating the need to swap probes and wedges mid-inspection. Second, the encoded data acquisition captures every A-scan with position information; defects can be reanalyzed offline rather than requiring real-time operator evaluation. The reliability benefit comes from repeatability — two PAUT operators scanning the same weld produce nearly identical datasets, while two conventional UT operators may produce different flaw call rates because manual probe manipulation introduces operator skill variability. PAUT studies in API 1163 (in-line inspection) and ECA validation programs (DNV, Petrobras) show probability-of-detection (POD) improvements of 15-25% for planar flaws.',
    },
    {
      q: 'Can PAUT replace radiography for code-grade weld inspection?',
      a: 'Yes, for many code regimes, with caveats. ASME V Mandatory Appendix XI and ASME B31.3 Code Case 181 explicitly allow PAUT as a substitute for RT on process piping welds; ASME VIII Div 2 Part 7 accepts PAUT under engineering-critical-assessment approach. API 1104 21st ed. allows AUT (PAUT-based) for pipeline girth welds. The cases where RT still wins: very thin-wall (< 5 mm) welds where PAUT geometry suffers; small-diameter pipe (< 2 inch NPS) where probe footprint is too large; and any specification that explicitly mandates film radiography (some legacy nuclear and military specs). For mainstream pipeline, vessel, and structural weld inspection, PAUT is increasingly the default and RT is the exception.',
    },
    {
      q: 'What is TFM and how does it compare with sectorial/linear PAUT scans?',
      a: 'TFM (Total Focusing Method) is a post-processing algorithm built on Full Matrix Capture (FMC). FMC records every possible transmit-receive element pair as a separate A-scan — for a 64-element probe, that\'s 64 × 64 = 4,096 waveforms per probe position. The TFM algorithm reconstructs an image where every pixel in the inspection plane is independently focused, giving spatial resolution at every depth that conventional fixed-focus PAUT cannot match. Standard sector and linear scans focus at one depth per focal law; TFM focuses everywhere simultaneously. The cost: 100-1,000× more data and computation. Practical instruments (Olympus AcoustoCAM, Sonatest VEO+, Eddyfi Mantis) handle this in firmware. TFM is the preferred technique for thick-section austenitic stainless welds, clad walls, and complex geometry where conventional PAUT focal-law sets cannot adapt to material variability.',
    },
    {
      q: 'What certifications does a PAUT operator need?',
      a: 'Most code regimes require Level II UT certification per ASNT SNT-TC-1A or ISO 9712 plus PAUT-specific training and procedure qualification. ASNT CP-189 (2024) lists 40 hours minimum classroom + 480 hours practical experience for Level II PAUT. ISO 9712:2021 specifies similar PAUT-method training durations. Beyond certification, each project usually requires procedure-specific qualification: the operator demonstrates the procedure on a written-practice block containing planted reference reflectors (EDM notches, SDH), with documented detection rates above the spec\'s acceptance threshold. API 1104 21st ed. Annex A formalizes this as performance demonstration for AUT pipeline welds. Owner-witnessed procedure qualification on a representative mock-up is the universal final step before any code-grade PAUT inspection.',
    },
  ],
  internalLinks: [
    {
      href: '/services/phased-array-ut',
      label: 'Phased Array UT service',
      context: 'PAUT is the modern code-recognized alternative to conventional UT and film RT',
    },
    {
      href: '/services/ultrasonic-testing',
      label: 'conventional Ultrasonic Testing',
      context: 'Conventional UT remains the baseline against which PAUT throughput is measured',
    },
    {
      href: '/services/tofd-testing',
      label: 'TOFD',
      context: 'TOFD and PAUT are commonly combined in modern automated ultrasonic testing (AUT)',
    },
    {
      href: '/glossary/a-scan',
      label: 'A-scan',
      context: 'PAUT sector and linear scans are built from underlying focal-law A-scans',
    },
    {
      href: '/glossary/b-scan',
      label: 'B-scan',
      context: 'PAUT scans produce native B-scan side views alongside the sectorial display',
    },
    {
      href: '/glossary/c-scan',
      label: 'C-scan',
      context: 'PAUT linear arrays produce native C-scan top views for corrosion mapping',
    },
    {
      href: '/glossary/dac-curve',
      label: 'DAC curve',
      context: 'PAUT uses ACG (Angle Corrected Gain), a multi-angle generalisation of conventional DAC',
    },
    {
      href: '/standards/asme-bpvc-section-v',
      label: 'ASME BPVC Section V',
      context: 'Mandatory Appendix XI governs PAUT procedure qualification for code-grade work',
    },
    {
      href: '/free-tools/ai-procedure-generator',
      label: 'NDT procedure generator',
      context: 'Auto-generate PAUT procedures with focal laws and scan plans pre-configured',
    },
  ],
  citations: [
    {
      id: 'asme-v-app-xi',
      source: 'ASME BPVC Section V, 2023 Edition, Article 4 Mandatory Appendix XI — Phased Array Manual Raster Examination Techniques',
    },
    {
      id: 'api-1104-21',
      source: 'API 1104 Welding of Pipelines and Related Facilities, 21st Edition (2018), Annex A — Alternative acceptance criteria using AUT',
    },
    {
      id: 'iso-13588',
      source: 'ISO 13588:2019, Non-destructive testing of welds — Ultrasonic testing — Use of automated phased array technology',
    },
    {
      id: 'astm-e2700',
      source: 'ASTM E2700-14 (2021), Standard Practice for Contact Ultrasonic Testing of Welds Using Phased Arrays',
      url: 'https://www.astm.org/e2700-14r21.html',
    },
    {
      id: 'asnt-cp-189',
      source: 'ASNT CP-189:2024 (Recommended Practice for Personnel Qualification and Certification in NDT) — PAUT supplement',
    },
  ],
};

export default term;
