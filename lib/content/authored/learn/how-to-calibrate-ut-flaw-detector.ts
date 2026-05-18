import type { LearnArticleContent } from '../types';

const article: LearnArticleContent = {
  slug: 'how-to-calibrate-ut-flaw-detector',
  category: 'how-to',
  metaTitle: 'How to Calibrate a UT Flaw Detector (ASME V Article 4)',
  metaDescription:
    'Step-by-step UT flaw detector calibration per ASME V Article 4 and ASTM E317. Velocity, zero, gain, DAC, and TCG with concrete settings.',
  heroLede:
    "Your shift starts at 06:00 and the inspection foreman wants the first weld scanned by 07:00. Before you touch the part, the flaw detector has to be calibrated end-to-end against an IIW V1 block on the same probe, cable, and couplant you will use all day. Skip that and every indication you log is unverifiable. This walk-through is the exact sequence ASME V Article 4 §T-462 and ASTM E317 require, plus the gain and reference settings that survive a Level III audit.",
  audience:
    'Level II UT technicians performing manual contact pulse-echo weld inspection per ASME V Article 4, and Level III auditors verifying procedure compliance.',
  prerequisiteKnowledge: [
    'Working knowledge of pulse-echo UT and screen interpretation',
    'Familiarity with IIW V1 and V2 calibration blocks',
    'Understanding of dB gain, range, and delay controls',
    'Reading procedures written to ASME Section V or AWS D1.1',
  ],
  sections: [
    {
      heading: 'Equipment and reference standards required',
      level: 2,
      paragraphs: [
        'Pull the flaw detector, probe, cable, and a calibration block that matches the material you will scan. For carbon-steel weld work, that is an IIW Type 1 (V1) block per ISO 2400. For curved or thin-wall pipe, swap to a V2 block (ISO 7963) or a procedure-specific basic calibration block (BCB) per ASME V Art. 4 §T-434.[1][2]',
        'The probe must carry a current calibration certificate (typically 6 months for piezo, 12 months for the instrument body). The instrument itself needs a documented annual linearity check per ASTM E317 covering vertical, horizontal, and amplitude linearity within ±5%, ±2%, and ±20% respectively.[3]',
        'Couplant must match the procedure — typically glycerin or a propylene-glycol gel for carbon steel between 5°C and 50°C. Avoid switching couplants mid-calibration; transfer correction values shift up to 6 dB between water and gel.',
      ],
      callout: {
        kind: 'spec',
        title: 'Block traceability',
        body: 'IIW V1 blocks must be traceable to NIST or equivalent national lab. Reject any block without a current cert sticker — uncertified blocks invalidate the calibration and the inspection report.',
      },
    },
    {
      heading: 'Step 1: Velocity and zero on a 0° straight beam',
      level: 2,
      paragraphs: [
        'Couple a 2.25 or 5 MHz straight-beam probe to the 25 mm step of the V1 block. Set range to 100 mm, gain to 40 dB, and pulse-repetition frequency to auto. Adjust velocity until the first back-wall echo lands at 25 mm and the second multiple at 50 mm on the screen.',
        'Now adjust the zero (delay) so the front-surface reflection sits at exactly 0 mm. Re-check both back-wall multiples — they should fall at 25, 50, 75, and 100 mm within ±0.5 mm. If they drift, repeat zero, then velocity. For carbon steel, velocity should land at 5920 ± 30 m/s; deviations beyond that point to a coupling problem or a worn wear-plate.[4]',
        'Document the screen photo or A-scan capture. ASME V Art. 4 §T-462.2 requires the calibration record to show the actual A-scan, not just typed values.',
      ],
    },
    {
      heading: 'Step 2: Angle beam refraction angle and exit point',
      level: 2,
      paragraphs: [
        'Switch to your angle-beam probe — typically 45°, 60°, or 70° for weld work. Place the probe on the 100 mm radius of the V1 block and slide forward/back until the radius reflector peaks. The center of the probe at peak amplitude is the exit point; mark it on the wedge with a fine permanent marker. Acceptable drift from the engraved exit point is ±1 mm.',
        'Next, measure refraction angle on the V1 5 mm side-drilled hole (SDH) or the 50 mm circle. Slide the probe until the SDH echo peaks, then read the angle off the engraved scale. Acceptable variance is ±2° from the nominal probe angle per ASME V Art. 4 §T-464.1.[1]',
        'If angle drifts beyond ±2°, the wedge is worn — either replace it or recalculate skip distance and beam path using the measured angle, not the nominal. Log the measured value on the calibration sheet.',
      ],
    },
    {
      heading: 'Step 3: DAC or TCG construction with reference reflectors',
      level: 2,
      paragraphs: [
        'For weld inspection per ASME V Art. 4, build a DAC (Distance-Amplitude Correction) curve on a basic calibration block with side-drilled holes at 1/4T, 1/2T, and 3/4T. Set the gain so the closest reflector peaks at 80% full-screen height (FSH). Mark that point. Move to each subsequent SDH without changing gain, peak the signal, and mark amplitude vs sound-path.',
        'Draw the DAC through the three points. The primary reference level is the gain at which the closest SDH reads 80% FSH — log this value. Typical primary reference for a 2.25 MHz 45° probe on 25 mm CS plate sits around 38-44 dB, depending on couplant and surface condition.[5]',
        'Add scanning gain per the procedure — usually +6 dB for code work, +14 dB if the procedure follows AWS D1.1 Section 6.[6] Record the final scan-level gain. Re-check the DAC at end of shift and after every break longer than 30 minutes.',
      ],
      list: {
        title: 'DAC reflector positions on a basic cal block (ASME V Art. 4 Fig. T-434.2.1)',
        items: [
          '1/4T side-drilled hole — closest reference, sets primary gain',
          '1/2T side-drilled hole — mid-range reference',
          '3/4T side-drilled hole — far reference, validates beam spread',
          'Notch on opposite face — optional, used for surface-breaking validation',
        ],
      },
    },
    {
      heading: 'Step 4: System linearity verification (daily and weekly)',
      level: 2,
      paragraphs: [
        'Daily check: place the probe so the back-wall echo from a 25 mm step sits at 80% FSH. Drop gain by 6 dB — the echo must fall to 40% FSH ±2%. Add 6 dB back — return to 80% FSH ±2%. Drop by 12 dB — should sit at 20% FSH ±2%. Failure here means the receiver is non-linear and the unit goes out of service until repaired.[3]',
        'Weekly: run the full ASTM E317 linearity protocol — vertical (amplitude) linearity at 20%, 40%, 60%, 80% FSH steps, horizontal (sweep) linearity using V1 multiples, and amplitude control linearity at -6, -12, -18, -24 dB steps. Document on the linearity log; retain for 5 years per most owner specs.',
        'A common failure mode: the receiver attenuator clicks but the screen amplitude does not drop proportionally. This usually means a stuck attenuator relay — flag the unit, do not finish the shift on it.',
      ],
    },
    {
      heading: 'Step 5: Recalibration triggers during the shift',
      level: 2,
      paragraphs: [
        'Recalibrate any time the probe is changed, the cable is changed, the couplant is changed, the power is cycled, or 4 hours have elapsed — whichever comes first. ASME V Art. 4 §T-467 lists these triggers explicitly.[1]',
        'Also recalibrate immediately if a reference reflector drifts more than 20% in amplitude or more than 10% in sound-path position. If a reflector drifts beyond those thresholds during the shift, every weld scanned since the last good calibration check must be re-scanned. There is no shortcut around this — record it on the calibration sheet and notify the Level III.',
      ],
    },
  ],
  commonMistakes: [
    'Calibrating with one couplant and scanning with another — transfer correction can be 6 dB or more between water and glycerin gel; the DAC becomes meaningless. Always use the same couplant for cal and scan.',
    'Marking the exit point with a thick Sharpie and trusting it for the rest of the shift. The wedge wears under load; re-check exit point after every break and re-mark with a fine point.',
    'Skipping the linearity drop test "because the unit is new." A factory-fresh unit can fail vertical linearity if the receiver board took a shock in shipping. Always run the daily check before the first scan.',
    'Setting primary reference gain on a corroded or pitted SDH. If the reflector is degraded, the DAC sits too high and real indications get missed. Inspect the cal block face under raking light before every shift.',
  ],
  relatedFaqs: [
    {
      q: 'How often must a UT flaw detector be linearity-checked under ASME Section V?',
      a: 'ASME V Article 4 §T-461 and §T-462 require system linearity verification at the start of each examination, when any probe or cable is changed, every 4 hours of continuous use, and at the end of each shift. The annual full-protocol ASTM E317 linearity check (vertical, horizontal, amplitude control) is separate — that one goes in the instrument calibration file and gets stickered onto the unit. Most procedures also require an extra mid-shift check after a power cycle or any drop, even if no damage is visible.',
    },
    {
      q: 'What is the difference between primary reference gain and scanning gain?',
      a: 'Primary reference gain is the dB value at which the closest reference reflector (typically the 1/4T side-drilled hole) reaches 80% full-screen height. It is the anchor for the DAC curve and the value reported on the calibration sheet. Scanning gain is the working gain you actually use during inspection — typically the primary reference plus 6 to 14 dB, depending on whether you are following ASME V (Art. 4 specifies +6 dB for transfer plus procedure-defined scanning sensitivity) or AWS D1.1 (often +14 dB). The scanning gain compensates for surface condition, beam spread, and attenuation between the cal block and the actual weld.',
    },
    {
      q: 'Why must I recalibrate after a couplant change?',
      a: 'Different couplants have different acoustic impedances and wet-out behavior. Switching from water to glycerin can change transfer signal amplitude by 4 to 8 dB on the same surface; switching from glycerin to a propylene-glycol gel can move it another 2 to 3 dB. Because the DAC curve is anchored to a specific signal amplitude on the cal block, any couplant change invalidates the reference. The procedure requires a fresh velocity, zero, and DAC build with the production couplant — short-cutting this is one of the top three audit findings from third-party Level IIIs on ASME pressure-vessel work.',
    },
    {
      q: 'Can I use the same calibration for a 25 mm and a 50 mm thick weld?',
      a: 'Only if the procedure-required calibration block covers both thicknesses with reference reflectors. ASME V Art. 4 §T-434.2.1 requires the basic calibration block to be within ±25% of the production part thickness, or to bracket the production thickness with reference reflectors at 1/4T, 1/2T, and 3/4T of the thinner part. For a 25 mm and a 50 mm scan, you either use a 38 mm cal block (within ±25% of both) or you build two separate calibrations. Mixing thicknesses on one cal sheet is an audit fail.',
    },
    {
      q: 'How do I document a failed linearity check?',
      a: 'Log the date, time, instrument serial number, probe ID, the failing parameter (e.g., "vertical linearity at 40% FSH read 36%, outside ±2% tolerance"), and the corrective action (typically: unit removed from service, sent for repair, replacement unit re-calibrated). Every weld scanned since the previous valid linearity check must be re-scanned with a verified instrument. Keep the failed-check record for 5 years minimum — many owner specs (Shell DEP, Saudi Aramco SAES-W-012) require it for the life of the asset.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/ultrasonic-testing',
      label: 'Ultrasonic Testing (UT) method overview',
      context: 'The full method overview covers physics, equipment ranges, and code coverage beyond calibration.',
    },
    {
      href: '/standards/asme-v',
      label: 'ASME Section V Article 4 explainer',
      context: 'Article 4 governs the calibration requirements referenced throughout this procedure.',
    },
    {
      href: '/free-tools/ut-calibration-calculator',
      label: 'UT calibration block selection tool',
      context: 'Pick the correct block thickness and SDH depth before you start setup.',
    },
    {
      href: '/learn/how-to-perform-dac-curve-construction',
      label: 'How to build a DAC curve',
      context: 'Detailed walk-through for the three-point DAC construction referenced in Step 3.',
    },
    {
      href: '/learn/how-to-perform-skip-distance-calc',
      label: 'Skip distance calculation for angle-beam UT',
      context: 'Use the verified refraction angle from Step 2 to compute skip distances for your scan plan.',
    },
    {
      href: '/learn/troubleshooting-ut-no-back-wall-echo',
      label: 'Troubleshooting: no back-wall echo',
      context: 'If the back-wall drops during calibration, this troubleshooting guide isolates the cause.',
    },
    {
      href: '/learn/how-to-perform-couplant-selection',
      label: 'Couplant selection for UT',
      context: 'Couplant choice drives transfer correction and DAC stability across the shift.',
    },
    {
      href: '/learn/how-to-perform-6db-drop-sizing',
      label: '6 dB drop sizing technique',
      context: 'Once calibration is locked, the 6 dB drop method sizes indications against the DAC reference.',
    },
    {
      href: '/methods/phased-array-ultrasonic-testing',
      label: 'PAUT method overview',
      context: 'PAUT uses a different calibration sequence — scan plan, focal law verification, sensitivity calibration.',
    },
  ],
  citations: [
    {
      id: 'asme-v-art-4',
      source: 'ASME BPVC Section V, Article 4, 2023 edition — Ultrasonic Examination Methods for Welds, §T-461 through §T-467',
    },
    {
      id: 'iso-2400',
      source: 'ISO 2400:2012 — Non-destructive testing — Ultrasonic testing — Specification for calibration block No. 1',
    },
    {
      id: 'astm-e317',
      source: 'ASTM E317-21 — Standard Practice for Evaluating Performance Characteristics of Ultrasonic Pulse-Echo Testing Instruments and Systems',
    },
    {
      id: 'astm-e114',
      source: 'ASTM E114-15 — Standard Practice for Ultrasonic Pulse-Echo Straight-Beam Contact Testing',
    },
    {
      id: 'asnt-snt-tc-1a',
      source: 'ASNT SNT-TC-1A:2020 — Recommended Practice for Personnel Qualification and Certification in Nondestructive Testing',
    },
    {
      id: 'aws-d1-1',
      source: 'AWS D1.1/D1.1M:2020 — Structural Welding Code — Steel, Clause 8 (UT of Statically Loaded Connections)',
    },
  ],
};

export default article;
