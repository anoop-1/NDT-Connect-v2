import type { LearnArticleContent } from '../types';

const article: LearnArticleContent = {
  slug: 'how-to-perform-dac-curve-construction',
  category: 'how-to',
  metaTitle: 'How to Build a DAC Curve for UT Weld Inspection (ASME V Art. 4)',
  metaDescription:
    'Step-by-step DAC curve construction on side-drilled holes in a basic calibration block. Primary reference, scanning sensitivity, and 50%/20% reference lines.',
  heroLede:
    "Your DAC curve is the reference your entire shift hangs on — every indication you flag, every weld you call defective, every report you sign gets cross-checked against the three or four points you mark on the screen right now. Here is the exact construction sequence for a code-compliant DAC, the gain settings that actually work on 25 mm CS plate, and the 50% / 20% reference lines that separate reportable defects from acceptable indications.",
  audience:
    'Level II UT technicians performing manual angle-beam weld inspection per ASME V Article 4, AWS D1.1 Clause 8, or equivalent code requiring a Distance-Amplitude Correction curve.',
  prerequisiteKnowledge: [
    'Completed instrument calibration (velocity, zero, refraction angle, exit point)',
    'Identification of side-drilled hole positions on the basic calibration block',
    'Working knowledge of gain control and amplitude reading in % FSH',
    'Reading procedure-specific reference reflector requirements',
  ],
  sections: [
    {
      heading: 'Block selection and reflector identification',
      level: 2,
      paragraphs: [
        'Pull the basic calibration block matching your production thickness ±25% per ASME V Art. 4 §T-434.2.1. For a 25 mm thick weld, the block is typically 25 mm thick with side-drilled holes at 1/4T (6.25 mm), 1/2T (12.5 mm), and 3/4T (18.75 mm) depths.[1]',
        'Verify the SDH diameter matches the procedure call-out. ASME V Art. 4 uses a 1.6 mm (1/16 inch) SDH for materials up to 25 mm thick, 3.2 mm (1/8 inch) for 25-50 mm, and 4.8 mm (3/16 inch) for 50-100 mm. Wrong SDH size invalidates the DAC.',
        'Inspect the block face under raking light. Surface scratches deeper than 0.25 mm, pitting, or any corrosion changes the transfer signal and skews every DAC amplitude reading. If the block is degraded, swap it before starting.',
      ],
      callout: {
        kind: 'spec',
        title: 'Block thickness rule',
        body: 'The cal block must be within ±25% of production thickness. A 30 mm block cannot calibrate a 50 mm weld — the half-V and full-V paths fall outside the block depth range.',
      },
    },
    {
      heading: 'Step 1: Find and peak the closest SDH (1/4T)',
      level: 2,
      paragraphs: [
        'Couple the angle-beam probe to the block face and slide forward/back over the 1/4T SDH location. Set range to twice the expected half-V path — for a 45° probe on 25 mm thick block, the 3/4T half-V path is ~26.5 mm sound path, so set range to 60 mm.',
        'Peak the signal by moving the probe in small steps until the SDH echo reaches maximum amplitude. Set gain so the peak sits at exactly 80% FSH. This is the primary reference gain — write it on the cal sheet, typically 38-44 dB for a 2.25 MHz 45° probe on carbon steel.[2]',
        'Mark a dot at the 1/4T position on the screen at 80% FSH. This is the first DAC point.',
      ],
    },
    {
      heading: 'Step 2: Map the 1/2T and 3/4T SDH amplitudes',
      level: 2,
      paragraphs: [
        'Without changing gain, slide the probe back to peak the 1/2T SDH. Mark the amplitude — typically 50-65% FSH depending on beam spread and attenuation. Note the sound-path on the time-of-flight cursor.',
        'Continue to the 3/4T SDH, peak, and mark. Typical 3/4T amplitude on a 25 mm block with the same 2.25 MHz 45° probe sits around 30-45% FSH. Three points are now on the screen.',
        'Draw the DAC curve through the three marks. Most digital flaw detectors (Olympus EPOCH, Sonatest Veo+, GE Phasor) auto-fit a smooth curve through the three points. On older analog units, draw freehand with a grease pencil.',
      ],
      list: {
        title: 'Typical DAC amplitudes on 25 mm CS block, 2.25 MHz 45° probe',
        items: [
          '1/4T SDH (6.25 mm depth, ~9 mm SP): 80% FSH at 40 dB',
          '1/2T SDH (12.5 mm depth, ~18 mm SP): 55-65% FSH at same gain',
          '3/4T SDH (18.75 mm depth, ~26.5 mm SP): 35-45% FSH at same gain',
          'Curve shape: monotonic decay, smooth through three points',
        ],
      },
    },
    {
      heading: 'Step 3: Add the 50% DAC and 20% DAC reference lines',
      level: 2,
      paragraphs: [
        'Most modern flaw detectors generate the 50% DAC and 20% DAC reference curves automatically. The 50% line is the threshold for reportable indications under many procedures (ASME B31.3 §344.6 references DAC-based acceptance).[3] The 20% line is the threshold for recording all indications during scan.',
        'On older units without auto-DAC, draw the 50% line by halving each marked amplitude (40%, 27.5%, 17.5% FSH respectively) and the 20% line by taking 20% of each (16%, 11%, 7% FSH). Connect with smooth curves.',
        'Some procedures (Saudi Aramco SAES-W-012, Shell DEP 30.10.60.18) require additional reference lines at 100% DAC and 20% DAC. Follow the procedure call-out, not the default flaw detector settings.',
      ],
    },
    {
      heading: 'Step 4: Apply scanning gain (transfer correction + procedure boost)',
      level: 2,
      paragraphs: [
        'Take the primary reference gain and add scanning gain per the procedure. ASME V Art. 4 §T-462.4 requires +6 dB for transfer correction (cal block to production surface) when the production surface roughness exceeds 250 µin (6.3 µm) — most as-welded surfaces fall in this category.[1]',
        'AWS D1.1 Clause 8 adds another fixed +14 dB on top of primary reference for the standard scanning level. ASME V Art. 4 typically uses primary reference + 6 dB for scan with no additional procedural boost unless the procedure says otherwise.[4]',
        'For weld surface condition that is unusually rough (e.g., as-cast HAZ, rough grind marks), perform an empirical transfer correction: measure the back-wall echo from the cal block at known gain, repeat on a clean part of the production surface, and add the difference in dB to scanning gain. Document the empirical correction on the cal sheet.',
      ],
    },
    {
      heading: 'Step 5: DAC verification triggers and re-builds',
      level: 2,
      paragraphs: [
        'Verify the DAC at the start of every shift, every 4 hours of continuous use, after probe or cable change, after power cycle, and at end of shift per ASME V Art. 4 §T-467.[1] Verification means re-peaking each reference SDH and checking the amplitude against the marked DAC points.',
        'A reflector that drifts more than 20% in amplitude or more than 10% in sound-path position triggers a full DAC rebuild. Every weld scanned since the last good DAC verification must be re-scanned with the new DAC. There is no shortcut around this — log it on the calibration record and notify the Level III.',
        'After re-build, photograph or A-scan capture the new DAC and append to the calibration record. The audit trail is the difference between a defensible inspection and a re-do.',
      ],
    },
  ],
  commonMistakes: [
    'Building DAC with the gain control on auto. Auto-gain features adjust amplitude dynamically — useful for scanning, fatal for DAC construction. Lock the gain manually at the primary reference value before mapping the next two points.',
    'Setting primary reference on a worn or pitted 1/4T SDH. A degraded reflector pulls the entire DAC up by 2-4 dB, hiding real defects below the 50% line. Inspect the block under raking light before every shift.',
    'Forgetting to apply scanning gain on top of primary reference. The DAC reference points sit at primary reference; scanning happens at primary reference + 6 dB (ASME V) or +14 dB (AWS D1.1). Scanning at the primary reference dB underscans the part by 6-14 dB of real coverage.',
    'Drawing a DAC through only two points. ASME V Art. 4 §T-462.2 requires at least three reflectors at distinct sound-paths. Two points let you fit any line — three points constrain the curve to the real beam-spread characteristic.',
  ],
  relatedFaqs: [
    {
      q: 'What is the difference between DAC and TCG?',
      a: 'DAC (Distance-Amplitude Correction) is a graphical curve drawn on the screen — the amplitude of each reflector at increasing sound-path distance. The technician compares indication amplitudes to the curve manually. TCG (Time Corrected Gain) is the same data applied as a gain compensation — the receiver automatically increases gain as sound-path increases, so all reference reflectors appear at the same amplitude (typically 80% FSH) regardless of distance. TCG is standard on PAUT and on newer conventional units; DAC remains common on older equipment and is explicitly permitted by ASME V Art. 4. Both reference the same set of SDHs and produce equivalent acceptance decisions when correctly applied.',
    },
    {
      q: 'Can I use a custom-built calibration block instead of an IIW or ASME basic cal block?',
      a: 'Only if the custom block meets every requirement of ASME V Art. 4 §T-434 (or the equivalent code section) and is documented in the procedure. Required: material matching the production part (acoustic impedance within 5%), thickness within ±25% of production, SDHs at the procedure-specified depths and diameters, surface finish equivalent to the production part, and traceability to a national lab. Many owners write custom blocks for nozzle attachments, T-joints, or thick-wall specials — these are acceptable when documented. Picking up a "close enough" block from another job is not.',
    },
    {
      q: 'Why does my DAC curve droop more than the textbook?',
      a: 'Beam attenuation is the difference between textbook and real. Three drivers: (1) Material attenuation — coarser-grain steels (cast, forged with rough HAZ) attenuate 2-6 dB more than fine-grain rolled plate at 2.25 MHz. (2) Probe damping and bandwidth — a heavily damped probe gives a steeper DAC. (3) Couplant transfer loss — viscous gels transfer 1-3 dB less than water at the same frequency. If your DAC drops more than 20 dB across the depth range expected, validate transfer on the production surface and consider dropping frequency from 5 MHz to 2.25 MHz for coarser materials.',
    },
    {
      q: 'How do I evaluate an indication that exceeds the DAC?',
      a: 'Three steps. First, confirm the indication is from a real reflector — check the time-of-flight position against the weld geometry and run the 6 dB drop sizing technique to confirm the reflector is in the weld volume, not surface noise. Second, peak the indication and record the amplitude as % DAC (e.g., 105% DAC). Third, apply the procedure-specific acceptance criteria — ASME B31.3 §344.6 disallows any planar indication, sizes volumetric indications against length and depth, and considers DAC amplitude as one input. Always evaluate length, depth, and amplitude together — DAC amplitude alone is not the acceptance test.',
    },
    {
      q: 'When does the procedure require DTL (Distance Time Loci) instead of DAC?',
      a: 'DTL is a sizing curve, not a sensitivity curve — it maps the relationship between indication time-of-flight and the depth of the actual flaw, used for crack tip diffraction sizing. Most ASME and API procedures use DAC for sensitivity calibration and reference a separate sizing technique (6 dB drop, 20 dB drop, or tip diffraction) for size determination. DTL appears in procedures that require explicit depth sizing for fitness-for-service evaluation — typically API 579 FFS work or fracture-mechanics-based assessments. If your procedure references API 579, expect DTL plus DAC, not DAC alone.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/ultrasonic-testing',
      label: 'Ultrasonic Testing method overview',
      context: 'Full method context including physics, equipment, and code coverage.',
    },
    {
      href: '/learn/how-to-calibrate-ut-flaw-detector',
      label: 'How to calibrate a UT flaw detector',
      context: 'Velocity, zero, and refraction angle calibration must complete before DAC construction.',
    },
    {
      href: '/learn/how-to-perform-6db-drop-sizing',
      label: '6 dB drop sizing technique',
      context: 'Once DAC is built, the 6 dB drop method sizes indications against the DAC reference.',
    },
    {
      href: '/learn/how-to-perform-defect-characterization-ut',
      label: 'Defect characterization with UT',
      context: 'DAC amplitude is one input; defect type drives the acceptance decision.',
    },
    {
      href: '/standards/asme-v',
      label: 'ASME Section V Article 4',
      context: 'Article 4 §T-434 and §T-462 govern DAC construction requirements.',
    },
    {
      href: '/standards/asme-b31-3',
      label: 'ASME B31.3 process piping code',
      context: 'B31.3 §344.6 references DAC amplitude in the UT acceptance criteria.',
    },
    {
      href: '/free-tools/ut-calibration-calculator',
      label: 'UT calibration block selection tool',
      context: 'Confirm the cal block thickness and SDH depth before building DAC.',
    },
    {
      href: '/learn/troubleshooting-ut-no-back-wall-echo',
      label: 'Troubleshooting: no back-wall echo',
      context: 'Lost back-wall during DAC verification is a coupling or probe-degradation issue.',
    },
  ],
  citations: [
    {
      id: 'asme-v-art-4',
      source: 'ASME BPVC Section V, Article 4, 2023 edition — §T-434.2 Basic Calibration Blocks and §T-462 Calibration',
    },
    {
      id: 'astm-e164',
      source: 'ASTM E164-19 — Standard Practice for Contact Ultrasonic Testing of Weldments',
    },
    {
      id: 'asme-b31-3',
      source: 'ASME B31.3-2022 — Process Piping, §344.6 Ultrasonic Examination',
    },
    {
      id: 'aws-d1-1',
      source: 'AWS D1.1/D1.1M:2020 — Structural Welding Code — Steel, Clause 8.21 Calibration of UT Equipment',
    },
    {
      id: 'asnt-l3-rp',
      source: 'ASNT Recommended Practice No. SNT-TC-1A:2020 — Personnel Qualification and Certification',
    },
  ],
};

export default article;
