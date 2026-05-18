import type { PillarHubContent } from '../types';

const pillar: PillarHubContent = {
  slug: 'phased-array-complete-guide',
  metaTitle: 'Phased Array UT Hub: Probes, Procedures, Codes, TFM',
  metaDescription:
    'The full PAUT cluster — linear, sectorial, TFM, encoded corrosion mapping. Codes, procedure qualification, equipment, training paths, and costs.',
  heroLede:
    'PAUT is the only ultrasonic technique that solves the geometry problem and the imaging problem in one acquisition. Sixteen, 32, 64, or 128 elements firing with calculated delays sweep an angular range through the wall thickness without the operator moving the probe, and the result is an S-scan or E-scan that resolves where conventional UT only gets an A-scan tick. This hub maps the full PAUT cluster — probe selection, wedge angles, focal law math, encoded corrosion mapping, TFM total focusing method, and the qualification regime under ASME Section V Article 4 Mandatory Appendix VII and Mandatory Appendix V — and routes you to the supporting articles on procedure writing, training pathways, and equipment selection.',
  topicOverview:
    'The PAUT cluster covers three scan modalities (linear E-scan for parallel-to-surface coverage, sectorial S-scan for angular sweep across a weld, TFM/FMC for full-matrix capture with software reconstruction), the encoded variants (line scan, raster scan, helical scan for pipe), and the calibration regime (sensitivity by reference reflector or by ACG/TCG, wedge delay verification, focal law verification on a calibration block). It also covers probe-frequency selection by wall thickness, the practical limit of element count versus aperture for a given inspection, and the difference between manual PAUT (T-scan with handheld probe) and encoded PAUT (mechanical scanner with positional encoder producing a recorded C-scan). Procedure qualification under ASME Section V Article 4 Mandatory Appendix VII is broken into the supplementary qualification beyond a generic UT procedure, and the AIA acceptance pathway is mapped. Sub-articles cover the migration economics from RT to PAUT, the personnel certification regime (ASNT SNT-TC-1A Level II PAUT endorsement or CP-189 equivalent, plus performance demonstration for nuclear work under PDI), and the field workflow.',
  subPages: [
    {
      href: '/methods/phased-array-ultrasonic-testing',
      label: 'PAUT Overview',
      description:
        'The full method — beam forming, focal laws, scan modalities, calibration. The technique reference for procedure writing and audit.',
    },
    {
      href: '/methods/paut-linear-scan',
      label: 'PAUT Linear Scan (E-Scan)',
      description:
        'Electronic linear stepping at a fixed angle — the equivalent of moving a conventional probe along the part without physical motion. Used for thickness mapping and parallel weld coverage.',
    },
    {
      href: '/methods/paut-sectorial-scan',
      label: 'PAUT Sectorial Scan (S-Scan)',
      description:
        'Angular sweep through a range of angles at a single probe position. The default for weld inspection — covers fusion lines at multiple angles in a single shot.',
    },
    {
      href: '/methods/total-focusing-method-tfm',
      label: 'Total Focusing Method (TFM/FMC)',
      description:
        'Full matrix capture followed by post-processing reconstruction of every pixel in the inspection region. Higher resolution and sizing accuracy than conventional PAUT — emerging as the technique for fitness-for-service sizing.',
    },
    {
      href: '/methods/paut-corrosion-mapping',
      label: 'Encoded PAUT Corrosion Mapping',
      description:
        'Continuous encoded C-scan thickness mapping with sub-millimeter lateral resolution. Replaces grid-pattern conventional UT for in-service thickness work on corroded equipment.',
    },
    {
      href: '/methods/paut-weld-inspection',
      label: 'PAUT Weld Inspection',
      description:
        'Sectorial scans across a single-V, double-V, or J-groove weld. The procedure-qualified replacement for RT in many ASME Section VIII Code Case 2235 applications.',
    },
    {
      href: '/standards/asme-v-art-4-appendix-vii',
      label: 'ASME V Article 4 Mandatory Appendix VII — PAUT',
      description:
        'The PAUT procedure qualification appendix — what the procedure must contain beyond a generic UT procedure, including focal law verification and reference reflector requirements.',
    },
    {
      href: '/standards/asme-section-viii-mandatory-appendix-12',
      label: 'ASME Section VIII Mandatory Appendix 12',
      description:
        'The UT-in-lieu-of-RT acceptance pathway for pressure vessel construction. Defines the procedure qualification and personnel demonstration requirements.',
    },
    {
      href: '/standards/api-1104-annex-a',
      label: 'API 1104 Annex A — AUT for Pipeline Girth Welds',
      description:
        'The pipeline industry default acceptance pathway. Engineering critical assessment plus AUT (encoded PAUT + TOFD) is the alternative to manual UT/RT.',
    },
    {
      href: '/equipment/olympus-omniscan-x3',
      label: 'Olympus OmniScan X3 64',
      description:
        'The dominant 64-element PAUT/TOFD platform — equipment review, supported probe families, and a worked PAUT setup for a 25 mm weld.',
    },
    {
      href: '/equipment/eddyfi-gekko-32-128',
      label: 'Eddyfi Gekko 32:128',
      description:
        'The TFM-capable competitor with stronger performance on austenitic and dissimilar metal welds. Equipment review and TFM procedure load-out.',
    },
    {
      href: '/learn/paut-focal-law-design',
      label: 'PAUT Focal Law Design',
      description:
        'How focal laws are calculated, how to verify them on a calibration block, and the common procedure errors that produce off-axis beam steering.',
    },
    {
      href: '/tools/paut-aperture-calculator',
      label: 'PAUT Aperture Calculator',
      description:
        'Compute effective aperture, near field, and beam divergence for any probe element count, frequency, and wedge angle.',
    },
    {
      href: '/compare/paut-vs-rt',
      label: 'PAUT vs RT — Migration Economics',
      description:
        'Where PAUT cleanly replaces RT, where RT still wins (porosity), and the capex/training crossover point on a refinery TA.',
    },
    {
      href: '/case-studies/paut-corrosion-mapping-fcc-feed-line',
      label: 'Case Study: PAUT Mapping on an FCC Feed Line',
      description:
        'An encoded corrosion mapping survey found a 38% wall loss patch the conventional UT survey missed at 10 cm grid density — replaced with coating-and-reinsulate repair instead of replacement.',
    },
  ],
  expertCommentary:
    'PAUT becomes a money pit when the procurement decision is made before the procedure decision. A $60,000 OmniScan or Gekko earns its keep on three workloads — encoded weld inspection for code acceptance, corrosion mapping for fitness-for-service, and complex geometry like nozzle-to-shell intersections. Everything else is an expensive way to do conventional UT. The number we share with refinery clients planning a TA is roughly 15-20% of UT scope justifies PAUT on technical grounds; the rest is straight thickness or simple weld inspection where conventional UT runs at 3-4× the data rate per dollar. Where PAUT does earn its premium, the second mistake is running it manually. A handheld T-scan PAUT survey produces no recorded data — you have the operator\'s recollection and the procedure-required report. The point of PAUT is the encoded record: a permanent C-scan that the next inspection cycle compares against, with positional accuracy to 0.5 mm. Specify the inspection as encoded or do not buy PAUT. The third issue is procedure qualification depth. ASME Section V Article 4 Mandatory Appendix VII requires beam profile verification, focal law verification, and reference reflector demonstration — most field procedures we audit verify focal laws once at the start of the job and never again, even after a wedge change. The procedure must require verification at the start of each shift and after every probe or wedge swap. Get the workload-fit right, run it encoded, and verify the procedure on every shift change — PAUT delivers a 3-5× find-rate improvement over conventional UT on the right scope.',
  externalResources: [
    {
      label: 'ASNT — Phased Array Ultrasonic Testing Resource',
      url: 'https://www.asnt.org/learn/the-nde-technician/ndt-methods/ultrasonic-testing',
    },
    {
      label: 'ASME BPVC Section V (Nondestructive Examination)',
      url: 'https://www.asme.org/codes-standards/find-codes-standards/bpvc-v-bpvc-section-v-nondestructive-examination',
    },
    {
      label: 'ISO 13588 — Ultrasonic Testing of Welds, Automated PAUT',
      url: 'https://www.iso.org/standard/76070.html',
    },
    {
      label: 'Performance Demonstration Initiative (PDI) — Nuclear PAUT Qualification',
      url: 'https://pdiprogram.com/',
    },
    {
      label: 'EPRI — PAUT Application Guides',
      url: 'https://www.epri.com/',
    },
  ],
  faqs: [
    {
      q: 'What probe frequency and element count do I need?',
      a: 'Frequency follows wall thickness: 1.5-2.25 MHz for thick sections above 50 mm, 5 MHz for 10-50 mm general weld inspection, 7.5-10 MHz for thin sections and corrosion mapping. Element count follows aperture needs: 16 elements is fine for small welds and limited steering range; 32 or 64 is the field workhorse for pressure-vessel weld inspection; 128 elements is required for narrow-gap welds and for nozzle-to-shell geometry where you need both deep steering and a wide aperture. For corrosion mapping, a 64-element probe at 7.5 MHz with a 0° wedge is the default — gives a 32 mm scan width per pass with sub-millimeter lateral resolution at typical encoder speeds.',
    },
    {
      q: 'When is TFM worth the procedure-qualification effort over conventional PAUT?',
      a: 'TFM (total focusing method) is worth the effort when sizing accuracy is the deliverable — fitness-for-service work, weld repair-versus-replace decisions, and crack growth trending across inspection cycles. TFM\'s focal-everywhere reconstruction resolves crack-like flaws with ±0.3 mm through-wall sizing accuracy in good conditions, against ±1-2 mm for conventional PAUT sectorial scans. The trade-off is procedure complexity (FMC capture parameters, reconstruction algorithm choice) and acquisition speed — TFM is 3-10× slower than PAUT in production scanning. For pure detection and pass/fail under ASME UW-51 amplitude criteria, conventional PAUT is faster and meets the code requirement.',
    },
    {
      q: 'What certification do I need for PAUT on ASME Code work?',
      a: 'ASNT SNT-TC-1A or ANSI/ASNT CP-189 Level II with a PAUT endorsement — Level II UT certification alone is not sufficient for PAUT under most employer written practices. The procedure must qualify the technician on the specific PAUT procedure, including focal law verification, beam profile demonstration on a procedure-qualification block, and a practical examination on weld and/or thickness specimens. For nuclear work under ASME Section XI, additional Performance Demonstration Initiative (PDI) qualification is the practical industry standard — PDI offers PAUT-specific qualification protocols recognized by every major US nuclear operator.',
    },
    {
      q: 'How much does a PAUT inspection cost per weld compared to RT?',
      a: 'Order-of-magnitude in 2024 US Gulf Coast pricing: a single procedure-qualified PAUT scan on a 12-inch Schedule 80 carbon steel girth weld runs roughly $180-280 per weld including setup, with a fully equipped two-tech crew producing 25-35 welds per shift. The same weld inspected with Ir-192 RT runs $90-150 per weld but requires either night-shift work or area control during the day. The PAUT premium pays back when (a) day-shift work avoids OT, (b) the encoded record is required for future trending, or (c) Code Case 2235 acceptance avoids the RT-related schedule risk. Below those triggers, RT is still cheaper per weld.',
    },
  ],
  internalLinks: [
    {
      href: '/learn/paut-calibration-procedure',
      label: 'PAUT Calibration Procedure',
      context: 'Wedge delay, sensitivity, and TCG construction on an IIW Type 1 plus side-drilled hole block.',
    },
    {
      href: '/learn/encoded-vs-manual-paut',
      label: 'Encoded vs Manual PAUT — Which One When',
      context: 'When manual PAUT (T-scan) is acceptable and when encoded acquisition is the only valid record.',
    },
    {
      href: '/equipment/olympus-paut-probes',
      label: 'Olympus PAUT Probe Reference',
      context: 'Element count, frequency, and active aperture for the common Olympus probe families.',
    },
    {
      href: '/standards/iso-13588',
      label: 'ISO 13588 — Automated PAUT of Welds',
      context: 'The European/international counterpart to ASME Section V Article 4 Mandatory Appendix VII.',
    },
    {
      href: '/compare/paut-vs-tofd',
      label: 'PAUT vs TOFD — Which One When',
      context: 'Coverage profile, sizing accuracy, and qualification cost side-by-side.',
    },
    {
      href: '/case-studies/paut-nozzle-shell-intersection-inspection',
      label: 'Case Study: PAUT on a Nozzle-to-Shell Intersection',
      context: 'A complex-geometry inspection that conventional UT could not cover — focal law setup and the C-scan deliverable.',
    },
    {
      href: '/tools/paut-coverage-calculator',
      label: 'PAUT Coverage Calculator',
      context: 'Verify beam coverage of a weld geometry given probe spec, wedge angle range, and standoff distance.',
    },
    {
      href: '/careers/paut-technician',
      label: 'PAUT Technician Career Pathway',
      context: 'Training program, equipment time, and the salary trajectory from Level II UT to procedure-qualified PAUT operator.',
    },
  ],
  citations: [
    {
      id: 'asme-v-art-4-app-vii',
      source: 'ASME BPVC Section V, 2023 ed., Article 4 Mandatory Appendix VII — Phased Array Manual Raster Examination',
    },
    {
      id: 'asme-viii-app-12',
      source: 'ASME BPVC Section VIII Div. 1, 2023 ed., Mandatory Appendix 12 — UT Examination of Welded Joints',
    },
    {
      id: 'api-1104-annex-a',
      source: 'API 1104, 22nd ed., 2021, Annex A — Alternative Acceptance Standards for Girth Welds',
    },
    {
      id: 'iso-13588',
      source: 'ISO 13588:2019, Non-destructive Testing of Welds — Ultrasonic Testing — Use of Automated Phased Array Technology',
    },
    {
      id: 'asnt-cp-189',
      source: 'ANSI/ASNT CP-189-2020, Standard for Qualification and Certification of Nondestructive Testing Personnel',
    },
  ],
};

export default pillar;
