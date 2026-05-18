import type { GlossaryLongFormContent } from '../types';

const term: GlossaryLongFormContent = {
  slug: 'iqi',
  term: 'IQI (Image Quality Indicator)',
  category: 'Radiographic Testing',
  metaTitle: 'IQI Penetrameter: Wire, Hole, Sensitivity Levels for ASME & EN',
  metaDescription:
    'IQI (penetrameter) verifies RT image quality. Compare ASME hole-type vs. EN wire IQIs, sensitivity levels, and placement rules — with a Level II worked example.',
  heroLede:
    'An IQI (Image Quality Indicator), historically called a penetrameter, is a small reference object placed on the source side of a radiographic shot that proves the resulting image is sensitive enough to find a flaw of practical size. No IQI visible at the required sensitivity = no inspection record. ASME, EN, and ISO all build acceptance around IQI image quality before any flaw evaluation can begin.',
  preciseDefinition:
    'An IQI is a device of specified form and dimensions placed on the source side of an inspection object during radiographic exposure to indicate the contrast and definition obtained on the resulting radiograph, expressed as a sensitivity level.[1]',
  alternateNames: ['Penetrameter', 'Image Quality Indicator', 'Image Definition Indicator', 'IDI', 'Sensitivity gauge'],
  history:
    'Penetrameter use began with US Navy radiography in the 1940s. ASTM E142 standardised hole-type plaque IQIs in 1958 — the design still used in ASME Section V Article 2 today. The European wire IQI (DIN 54109, then EN 462-1) emerged in the 1960s and was adopted by ISO 19232-1 in 2004 as the global wire standard. "IQI" replaced "penetrameter" as ASTM\'s preferred term in the 1980s; the older word survives in field shop talk.',
  technicalDetail: [
    {
      heading: 'ASME hole-type IQIs',
      level: 2,
      paragraphs: [
        'Hole-type IQIs are thin rectangular plaques (e.g. 1.4 mm × 38 mm × 75 mm) with three drilled holes of diameter 1T, 2T, and 4T where T is the IQI thickness. ASME Section V Article 2 T-276 tabulates IQI thickness vs. source-side material thickness — a Type 25 IQI (T = 0.025 in) is required for steel 1.5-2 in (38-50 mm) thick. Sensitivity level is identified by which hole is visible: "2-1T" = Type 2 IQI, 1T hole visible = 2T thickness ≈ 1.27% sensitivity.[2]',
        'The IQI is laser-etched with its identification (material number, type) and the holes are drilled to ±0.001 in tolerance. Placement is on the source-side surface of the part, away from the area of interest but inside the area covered by the film, with the lead-marker shimming if necessary to match part thickness.',
        'Image acceptance: 2-2T sensitivity (the 2T hole visible, and the IQI body distinguishable from the part) is the ASME default. Stringent specifications call for 2-1T (the smaller hole visible) — typically required on aerospace and nuclear pressure boundary work.',
      ],
    },
    {
      heading: 'EN/ISO wire IQIs',
      level: 2,
      paragraphs: [
        'Wire IQIs are sets of 7 wires of diameters from 0.1 to 3.2 mm, mounted in a sealed plastic envelope with identification stamped on the lead frame. ISO 19232-1 defines four sensitivity levels (A, B, C, D) — Level A is the most stringent. Sensitivity is reported by the smallest wire visible at the required image quality level.',
        'The wire IQI is placed perpendicular to the weld direction so wires cross the weld at an angle. The thinnest wire visible across the weld length determines image quality — discontinuous wire image disqualifies the radiograph if the wire is finer than the spec\'s minimum.[3]',
        'EN ISO 17636-1 sets the wire-IQI requirements for weld RT. For a 25 mm steel butt weld, Class B (improved) image quality requires wire W10 (0.25 mm) to be visible. Class A (basic) accepts W12 (0.16 mm) on thicker walls.',
      ],
    },
    {
      heading: 'Step-hole and duplex wire (definition) IQIs',
      level: 2,
      paragraphs: [
        'Step-hole IQIs combine plaque steps of varying thickness, each with a drilled hole. They are common in European and Asian specifications and serve the same purpose as ASME hole-type plus wire IQIs combined.',
        'Duplex wire IQIs (per ISO 19232-5) measure image unsharpness (definition) rather than sensitivity. Pairs of platinum wires at decreasing spacing — D1 (0.05 mm) to D13 (0.8 mm) — show the smallest pair still resolved as two distinct lines. Required for digital radiography acceptance under ASME V Article 2 Mandatory Appendix VII because digital sensors must demonstrate spatial resolution comparable to film.',
        'Lead screens and intensifying screens at the IQI location can change the apparent IQI sensitivity by 0.5-1 grade. The procedure must specify screen type and thickness so the IQI choice gives a comparable image quality.',
      ],
    },
  ],
  workedExample: {
    setup:
      'Pipeline butt-weld radiography on 18 mm wall carbon steel, Ir-192 source-side technique. Required spec: ASME B31.3 Process Piping Code with 2-2T IQI sensitivity per ASME V Article 2.',
    calculation:
      'Source-side material thickness = 18 mm = 0.71 in. ASME V Article 2 T-276 Table T-276 specifies: for thickness over 0.625 in and through 0.75 in, source-side IQI designation = 17. Type 17 hole-type IQI thickness T = 0.017 in (0.43 mm); essential hole = 2T = 0.034 in (0.86 mm). Place IQI on the source side of the pipe near the area of interest. Develop and verify: the 2T hole is clearly visible AND the IQI identification numbers are readable.',
    result:
      'IQI image confirmed at 2-2T sensitivity. The radiograph is acceptable for flaw evaluation. Any subsequent acceptance/rejection of weld indications can proceed against the ASME B31.3 criteria. If the 2T hole had not been visible, the radiograph would be rejected and re-shot with higher kV, longer exposure, or finer-grain film before any flaw call could be made.',
  },
  whereItAppears: [
    {
      context: 'ASME B31.3 process piping weld radiography',
      explanation:
        'Every panoramic or single-wall exposure on process-piping welds carries one IQI per film cassette, on the source side, with the IQI thickness chosen against the wall thickness table in ASME V T-276. The IQI image is the first thing the Level II RT interpreter checks; if the required hole or wire is not visible, the film is rejected before the inspector even looks at the weld.',
    },
    {
      context: 'Nuclear pressure boundary radiography under ASME III',
      explanation:
        'Nuclear-class welds (Section III, Class 1/2/3) require 2-1T sensitivity — the most stringent IQI grade. Multiple IQIs are placed in shot to verify uniform image quality across the film. Every shot is interpreted twice (Level II + Level III review) and the IQI calls are part of the QA hold-point release.',
    },
    {
      context: 'Digital radiography acceptance per ASME V Article 2 Appendix VII',
      explanation:
        'Digital detector arrays (DDA) and computed radiography (CR) require both a wire/hole IQI for sensitivity AND a duplex-wire IQI for spatial resolution. The duplex pair grade combined with the hole/wire visibility characterises the digital image\'s diagnostic quality and is recorded as part of the DICOM/DICONDE metadata.',
    },
  ],
  relatedTerms: [
    { term: 'Iridium-192', slug: 'iridium-192' },
    { term: 'Cobalt-60', slug: 'cobalt-60' },
    { term: 'Selenium-75', slug: 'selenium-75' },
    { term: 'Half-Value Layer', slug: 'half-value-layer' },
  ],
  faqs: [
    {
      q: 'What is the difference between a hole-type IQI and a wire-type IQI?',
      a: 'Hole-type plaque IQIs (ASME, ASTM E1025) use a flat plaque with three drilled holes of 1T, 2T, and 4T diameter and assess image quality by which hole is visible. They measure subject-to-image contrast and unsharpness in a single integrated indicator. Wire-type IQIs (EN ISO 19232-1, formerly DIN 54109) use a set of progressively thinner wires sealed in a plastic envelope and assess image quality by the smallest wire visible across the area of interest. Wires assess primarily geometric unsharpness and small-feature contrast; holes assess area-contrast sensitivity. The two systems give roughly equivalent results at matched sensitivity grades but the underlying physics differ — ASME accepts both with conversion tables per V Article 2 T-276.5.',
    },
    {
      q: 'Why must the IQI be on the source side, not the film side?',
      a: 'Image sensitivity in RT is degraded by geometric unsharpness, which grows with source-to-IQI distance. An IQI on the source side is exposed to the full beam unsharpness budget — if it images at the required sensitivity, the part itself (also source-side surface) will image at at least equivalent quality. An IQI on the film side sees less unsharpness because it is closer to the film, and would falsely indicate better image quality than the part actually has. ASME V T-275 allows film-side placement only in specific double-wall-double-image (DWDI) pipeline configurations and requires a 15% sensitivity penalty correction in those cases. Source-side IQI placement is the rule; film-side is the documented, infrequent exception.',
    },
    {
      q: 'How is the correct IQI selected for a given part thickness?',
      a: 'ASME V Article 2 T-276 provides Table T-276 (Source Side IQI Selection): a lookup of IQI type number against source-side material thickness range. For example, 12-19 mm steel uses IQI Type 17 (T = 0.43 mm); 25-32 mm uses Type 25 (T = 0.64 mm); 38-50 mm uses Type 35 (T = 0.89 mm). Wire IQI selection per ISO 19232-1 follows a similar table where wire diameter set is chosen by total radiographic thickness. The general principle: IQI thickness should be ~2% of the part thickness for hole-type. The hole at 2T (4% of part thickness) is what the radiograph must resolve at the standard sensitivity grade. Stringent specs (aerospace, nuclear) require 1T hole resolution — equivalent to 2% sensitivity, twice as demanding.',
    },
    {
      q: 'Can a digital radiograph use the same IQI as a film radiograph?',
      a: 'The contrast IQI (hole-type or wire) is identical between film and digital, and the sensitivity grade is achieved the same way. But ASME V Article 2 Mandatory Appendix VII for DDA and Mandatory Appendix V for CR add a duplex-wire IQI requirement (per ISO 19232-5) to measure spatial resolution that the contrast IQI cannot fully characterise. Digital detectors can produce excellent contrast (high SNR) while having poor spatial resolution (large effective pixel) — the duplex IQI catches that mismatch. Practically, digital RT shots carry two IQIs in every exposure: one wire/hole IQI for contrast sensitivity and one duplex-wire IQI for unsharpness. Both are reported in the DICONDE metadata so any future audit can verify both axes of image quality.',
    },
  ],
  internalLinks: [
    {
      href: '/services/radiographic-testing',
      label: 'Radiographic Testing',
      context: 'IQI image is the gatekeeper for every RT inspection record',
    },
    {
      href: '/glossary/half-value-layer',
      label: 'half-value layer',
      context: 'IQI selection ties together part thickness, source energy, and HVL/penetration',
    },
    {
      href: '/glossary/iridium-192',
      label: 'Iridium-192',
      context: 'Ir-192 spectrum drives IQI sensitivity achievable on 5-50 mm steel',
    },
    {
      href: '/glossary/cobalt-60',
      label: 'Cobalt-60',
      context: 'Co-60 RT uses higher-T IQIs because of its harder beam and longer exposure',
    },
    {
      href: '/glossary/selenium-75',
      label: 'Selenium-75',
      context: 'Se-75 supports finer IQI sensitivity on thin-wall pipework',
    },
    {
      href: '/standards/asme-bpvc-section-v',
      label: 'ASME BPVC Section V',
      context: 'Article 2 T-276 sets IQI selection tables for RT image quality',
    },
    {
      href: '/standards/iso-17636',
      label: 'ISO 17636',
      context: 'ISO 17636-1 specifies wire-IQI image quality classes A and B for weld RT',
    },
    {
      href: '/free-tools/ai-procedure-generator',
      label: 'NDT procedure generator',
      context: 'Generate RT procedures that list the correct IQI per thickness automatically',
    },
    {
      href: '/industries/oil-and-gas',
      label: 'oil and gas',
      context: 'Pipeline and process piping RT runs IQI checks on every shot per ASME B31.3 / B31.8',
    },
  ],
  citations: [
    {
      id: 'astm-e1025',
      source: 'ASTM E1025-22, Standard Practice for Design, Manufacture, and Material Grouping Classification of Hole-Type Image Quality Indicators',
      url: 'https://www.astm.org/e1025-22.html',
    },
    {
      id: 'iso-19232-1',
      source: 'ISO 19232-1:2013, Non-destructive testing — Image quality of radiographs — Part 1: Determination of the image quality value using wire-type IQIs',
    },
    {
      id: 'asme-v-art-2',
      source: 'ASME BPVC Section V, 2023 Edition, Article 2, T-276 — IQI selection and placement',
    },
    {
      id: 'iso-17636-1',
      source: 'ISO 17636-1:2022, Non-destructive testing of welds — Radiographic testing — Part 1: X- and gamma-ray techniques with film',
    },
    {
      id: 'astm-e1316-iqi',
      source: 'ASTM E1316-23, Standard Terminology for Nondestructive Examinations — Image Quality Indicator',
    },
  ],
};

export default term;
