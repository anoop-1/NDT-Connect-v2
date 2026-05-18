import type { PillarHubContent } from '../types';

const pillar: PillarHubContent = {
  slug: 'ultrasonic-testing-complete-guide',
  metaTitle: 'Ultrasonic Testing Hub: Methods, Codes, Equipment, Costs',
  metaDescription:
    'The full UT cluster on NDT Connect — straight-beam, PAUT, TOFD, AUT, immersion. Codes, procedures, costs, vendor selection, and field troubleshooting.',
  heroLede:
    'Ultrasonic testing is the workhorse method for the petrochemical, pipeline, and power industries — and the method most frequently misapplied. A 5 MHz dual-element probe on a corroded steam line gives one answer; a 0° PAUT 64-element wedge on the same line gives a wall map that reveals isolated pitting the dual missed. This hub covers every UT variant we publish — from manual contact UT under ASME Section V Article 4 to encoded TOFD inspections under ASME Section VIII Mandatory Appendix 12 — and routes you to the supporting articles that explain when each one earns its keep.',
  topicOverview:
    'Ultrasonic testing splits into roughly five families: conventional pulse-echo (thickness gauging and flaw detection), phased array (PAUT, including corrosion mapping and weld inspection), time-of-flight diffraction (TOFD), automated ultrasonic testing (AUT, primarily for pipeline girth welds), and specialty techniques like immersion UT for forgings and EMAT for high-temperature live-line inspection. Each family has a distinct sensitivity, coverage profile, qualification regime, and cost-per-foot or cost-per-weld. The cluster also covers UT calibration (DAC, TCG, AVG/DGS), reference blocks (IIW, NAVSHIPS, custom step wedges), and procedure qualification under ASME Section V Article 4 and ASNT SNT-TC-1A. Pricing, certification pathways, and recommended equipment models are broken out per method.',
  subPages: [
    {
      href: '/methods/ultrasonic-testing',
      label: 'Conventional UT (Pulse-Echo)',
      description:
        'Manual contact UT — the baseline. Covers thickness gauging with dual-element probes, A-scan flaw detection, calibration on IIW Type 1 blocks, and the DAC/TCG curves that ASME Section V Article 4 mandates for weld inspection.',
    },
    {
      href: '/methods/phased-array-ultrasonic-testing',
      label: 'Phased Array UT (PAUT)',
      description:
        'Electronic beam steering with 16-, 32-, 64-, and 128-element probes. Linear, sectorial, and TFM scans. Procedure qualification under ASME Section V Article 4 Mandatory Appendix VII for weld inspection and Appendix IV for thickness.',
    },
    {
      href: '/methods/time-of-flight-diffraction',
      label: 'TOFD',
      description:
        'Time-of-flight diffraction for full-volume weld inspection. The accepted technique for pressure vessel construction code cases under ASME Section VIII Mandatory Appendix 12 and Boiler Section I.',
    },
    {
      href: '/methods/automated-ultrasonic-testing',
      label: 'Automated UT (AUT)',
      description:
        'Encoded mechanized PAUT/TOFD combo scanners for pipeline girth welds. The default for offshore lay-barge and onshore mainline construction under API 1104 Annex A and DNV-ST-F101.',
    },
    {
      href: '/methods/long-range-ultrasonic-testing',
      label: 'Long-Range UT (Guided Wave)',
      description:
        'Low-frequency torsional and flexural guided waves for screening 30+ meters of pipe from a single ring location. The screening tool of choice for buried lines and pipe under insulation.',
    },
    {
      href: '/learn/ut-calibration-dac-tcg-avg',
      label: 'UT Calibration: DAC, TCG, AVG/DGS',
      description:
        'The three reference curve techniques and where each is mandated. DAC is the ASME default; TCG is preferred when reflector amplitude must be normalized for digital sizing; AVG/DGS is European-favored for forgings.',
    },
    {
      href: '/standards/asme-section-v-article-4',
      label: 'ASME Section V, Article 4 — UT Examination',
      description:
        'The governing code article for manual and automated UT of welds in pressure equipment. Covers procedure qualification, probe verification, sweep and sensitivity calibration, and reporting.',
    },
    {
      href: '/standards/api-1104-annex-a',
      label: 'API 1104 Annex A — UT for Pipeline Girth Welds',
      description:
        'The pipeline industry default acceptance code for manual UT, AUT, and PAUT of new construction girth welds. Engineering critical assessment (ECA) pathway under Annex A is the AUT entry point.',
    },
    {
      href: '/industries/oil-gas-refining',
      label: 'UT in Refinery Turnarounds',
      description:
        'How conventional UT, PAUT corrosion mapping, and TOFD slot into a typical 35-day refinery TA. Crew sizing, equipment manifest, and the order in which UT scopes are released.',
    },
    {
      href: '/industries/pipeline',
      label: 'UT for Pipeline Construction & Integrity',
      description:
        'Mainline AUT for new construction, manual UT for tie-in welds, and inline ultrasonic ILI for crack and corrosion screening of operating pipelines.',
    },
    {
      href: '/tools/ut-thickness-calculator',
      label: 'UT Thickness Calculator',
      description:
        'Convert time-of-flight to wall thickness for any material and probe frequency. Includes velocity reference table and temperature correction.',
    },
    {
      href: '/compare/paut-vs-rt',
      label: 'PAUT vs RT — When to Switch',
      description:
        'The radiography-to-PAUT migration is real but uneven. Where PAUT cleanly replaces RT, where RT still wins on porosity, and where both are required for AIA acceptance.',
    },
    {
      href: '/case-studies/paut-corrosion-mapping-fcc-feed-line',
      label: 'Case Study: PAUT on an FCC Feed Line',
      description:
        'Encoded corrosion mapping found a 38% wall loss patch the conventional UT survey missed at 10 cm grid density. Recoated and reinsulated rather than replaced — $1.2M avoided.',
    },
  ],
  expertCommentary:
    'PAUT is sold as a universal upgrade. It isn\'t. PAUT earns its premium on welds — sectorial scans across a single-V groove resolve crack-like flaws that conventional 45° and 60° angles can blur — and on corrosion mapping where you need a continuous wall image. For straight thickness on accessible pipe, a $4,000 Olympus 38DL Plus and a dual-element probe will outperform a $60,000 PAUT rig in cost per data point by an order of magnitude. The mistake we see most often in refinery TAs: PAUT specified blanket-wide for thickness work, then crews running it at the same grid density as conventional UT. That defeats both purposes — you pay PAUT rates for conventional coverage. The corollary is true on weld inspection. Specifying conventional UT for a 1-inch wall double-V weld with a 60° angle ignores beam coverage geometry — you will miss flaws in the fusion line on the opposite face, and RT or PAUT is the right answer. Pick the technique by the defect mechanism and the geometry, not by the calendar entry. And on AUT for pipelines: AUT is faster than RT, but the ECA setup cost (mechanical testing, fracture toughness, weld procedure qualification) means it only pays back above roughly 200 girth welds. Below that, you are better off with manual UT or RT and conventional acceptance under API 1104 §9.',
  externalResources: [
    {
      label: 'ASNT — Ultrasonic Testing Method',
      url: 'https://www.asnt.org/learn/the-nde-technician/ndt-methods/ultrasonic-testing',
    },
    {
      label: 'ASME BPVC Section V (Nondestructive Examination)',
      url: 'https://www.asme.org/codes-standards/find-codes-standards/bpvc-v-bpvc-section-v-nondestructive-examination',
    },
    {
      label: 'API 1104 — Welding of Pipelines and Related Facilities',
      url: 'https://www.api.org/products-and-services/standards/important-standards-announcements/standard-1104',
    },
    {
      label: 'ISO 17640 — UT of Welded Joints (Techniques, Testing Levels)',
      url: 'https://www.iso.org/standard/76069.html',
    },
    {
      label: 'NACE/AMPP SP0102 — In-line Inspection of Pipelines',
      url: 'https://store.ampp.org/sp0102-in-line-inspection-of-pipelines',
    },
  ],
  faqs: [
    {
      q: 'When should I specify PAUT instead of conventional UT?',
      a: 'Three trigger conditions: (1) weld geometry where a single fixed angle cannot achieve full volume coverage — double-V grooves above 25 mm, narrow-gap welds, nozzle-to-shell intersections; (2) corrosion mapping where you need a contiguous C-scan image rather than discrete thickness points; (3) any application where an encoded record is required for fitness-for-service or repeat-inspection trending. For straight thickness gauging on accessible pipe or vessel walls under 50 mm, conventional UT with a dual-element probe is faster and cheaper per data point. ASME Section V Article 4 Mandatory Appendix VII governs PAUT procedure qualification.',
    },
    {
      q: 'Can PAUT replace radiography for weld acceptance?',
      a: 'Yes, but only when the project specification incorporates code cases or annexes that authorize UT-only acceptance. ASME Section VIII Division 1 UW-51 historically required RT; Code Case 2235 (now incorporated into the code through editions) authorizes UT in lieu of RT for thicknesses ≥ 1/2 inch when procedures and personnel are qualified under Mandatory Appendix VIII. For pipelines, API 1104 Annex A allows AUT acceptance via engineering critical assessment. Porosity in thin sections still favors RT — UT undersizes round volumetric flaws relative to the area-based acceptance criteria.',
    },
    {
      q: 'What certification is required to perform UT for ASME Code work?',
      a: 'ASNT SNT-TC-1A or ANSI/ASNT CP-189 Level II as a minimum, with the certification scope explicitly covering the UT technique in use (general UT, thickness gauging, PAUT, or TOFD as separate endorsements in many employer programs). The employer\'s written practice must qualify the technician on the specific procedure and produce a qualification record. For nuclear work under ASME Section XI, additional performance demonstration under Appendix VIII is required — and PDI (Performance Demonstration Initiative) qualification is the practical industry standard.',
    },
    {
      q: 'How accurate is UT thickness measurement on corroded surfaces?',
      a: 'On a properly couplant-prepped and calibrated surface, a dual-element probe at 5 MHz resolves ±0.1 mm at thicknesses up to about 25 mm. The accuracy degrades sharply on rough or pitted surfaces because the dual probe averages over its footprint and biases toward the longer remaining wall. For mapping isolated pits or general internal corrosion, PAUT corrosion mapping at 7.5 MHz with a 0.5 mm encoder resolution gives a continuous image where the deepest pit can be picked out — typically resolving features as small as 3 mm in lateral extent.',
    },
    {
      q: 'What is TOFD\'s practical advantage over PAUT for weld inspection?',
      a: 'TOFD\'s strength is sizing flaws through-wall. A diffracted-tip technique resolves crack-tip positions to within ±0.5 mm in steel above 12 mm thick, which makes it the preferred technique for engineering critical assessment and fitness-for-service work. Its weakness is the dead zones at the surface (top and back wall) — those are typically covered by complementary PAUT line scans or surface methods. In practice TOFD and PAUT are run together on a single mechanized scanner for pressure vessel and pipeline girth welds, with PAUT covering the near-surface zones TOFD cannot resolve.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/ultrasonic-testing/probes-and-wedges',
      label: 'UT Probes and Wedges Reference',
      context: 'Frequency, element count, and wedge angle selection drive every UT result — the reference page maps probe spec to defect mechanism.',
    },
    {
      href: '/learn/dac-curve-construction',
      label: 'Building a DAC Curve from a Side-Drilled Hole Block',
      context: 'The DAC construction procedure step-by-step, with the calibration block geometry and the ASME Section V Article 4 reflector requirements.',
    },
    {
      href: '/learn/tofd-procedure-qualification',
      label: 'TOFD Procedure Qualification under ASME V',
      context: 'How to qualify a TOFD procedure for code work, including required test pieces, flaw geometries, and sizing accuracy demonstration.',
    },
    {
      href: '/equipment/olympus-omniscan-x3',
      label: 'Olympus OmniScan X3 64',
      context: 'The dominant 64-element PAUT/TOFD combined platform in the field — equipment review with sample procedure load-outs.',
    },
    {
      href: '/equipment/gekko-ndt-32-128',
      label: 'Eddyfi Gekko 32:128',
      context: 'The TFM-capable competitor to the OmniScan, with stronger performance on austenitic and dissimilar metal welds.',
    },
    {
      href: '/standards/asme-section-viii-mandatory-appendix-12',
      label: 'ASME Section VIII Mandatory Appendix 12',
      context: 'The TOFD acceptance pathway for pressure vessel construction.',
    },
    {
      href: '/compare/paut-vs-tofd',
      label: 'PAUT vs TOFD — Which One When',
      context: 'A side-by-side comparison of coverage profiles, sizing accuracy, and qualification cost.',
    },
    {
      href: '/tools/ut-beam-divergence-calculator',
      label: 'UT Beam Divergence Calculator',
      context: 'Calculate near-field and far-field beam spread for any probe frequency, element diameter, and material.',
    },
    {
      href: '/case-studies/aut-girth-weld-deep-water-lay-barge',
      label: 'Case Study: AUT on a Deep-Water Lay Barge',
      context: 'How a fully encoded AUT spread handled 14 girth welds per day on a 32-inch gas line at 1,400 m water depth.',
    },
  ],
  citations: [
    {
      id: 'asme-v-art-4',
      source: 'ASME BPVC Section V, 2023 ed., Article 4 — Ultrasonic Examination Methods for Welds',
    },
    {
      id: 'asme-v-art-4-app-vii',
      source: 'ASME BPVC Section V, 2023 ed., Article 4 Mandatory Appendix VII — Phased Array Manual Raster Examination',
    },
    {
      id: 'api-1104-annex-a',
      source: 'API 1104, 22nd ed., 2021, Annex A — Alternative Acceptance Standards for Girth Welds',
    },
    {
      id: 'asnt-snt-tc-1a',
      source: 'ASNT SNT-TC-1A (2020), Personnel Qualification and Certification in Nondestructive Testing',
    },
    {
      id: 'iso-17640',
      source: 'ISO 17640:2018, Non-destructive Testing of Welds — Ultrasonic Testing — Techniques, Testing Levels and Assessment',
    },
  ],
};

export default pillar;
