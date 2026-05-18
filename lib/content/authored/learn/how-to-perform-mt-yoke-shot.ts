import type { LearnArticleContent } from '../types';

const article: LearnArticleContent = {
  slug: 'how-to-perform-mt-yoke-shot',
  category: 'how-to',
  metaTitle: 'How to Perform an MT Yoke Shot (Wet Fluorescent, ASTM E709)',
  metaDescription:
    'Step-by-step MT yoke procedure: lift test, AC vs DC, wet vs dry, particle application, indication evaluation per ASTM E709 and ASME V Article 7.',
  heroLede:
    "The fillet weld is hot, the part is too thick for AC alone, and the inspector wants surface and near-surface crack coverage in the next 20 minutes. A proper MT yoke shot — lift-tested, two-direction, particle-applied during current — finds surface cracks down to 0.025 mm wide. Skip the lift test or shoot in one direction only and you miss half the relevant indication orientations. Below is the ASTM E709 / ASME V Art. 7 sequence with the current, dwell, and lighting numbers that hold up to audit.",
  audience:
    'Level II MT technicians performing yoke magnetic particle examination on ferromagnetic welds and castings per ASTM E709, ASME V Article 7, and AWS D1.1 Clause 6.',
  prerequisiteKnowledge: [
    'ASNT Level II MT certification per SNT-TC-1A',
    'Yoke operation (AC and DC modes) and lift-test procedure',
    'Particle types (wet fluorescent vs dry visible) and application methods',
    'Reading procedure-specific acceptance criteria (ASME B31.3, AWS D1.1, API 1104)',
  ],
  sections: [
    {
      heading: 'Equipment, surface prep, and lift test',
      level: 2,
      paragraphs: [
        'Yoke: ASME V Art. 7 §T-762.1 requires the yoke to lift 4.5 kg (10 lb) in AC mode and 18 kg (40 lb) in DC mode at the maximum pole spacing used during the exam.[1] Perform the lift test daily and document on the cal sheet — yoke serial number, lift weight, pole spacing, date, technician.',
        'Surface prep: remove paint, scale, dirt, and oil. ASTM E709 §6.2 limits surface roughness to a level that does not mask indications — practical limit is 12 µm Ra for visible wet, 6 µm Ra for fluorescent.[2] Tightly adherent mill scale is permissible if the procedure allows; loose scale must come off (wire brush or grinder).',
        'Temperature: particle bath temperature range 5°C to 50°C for water-based wet baths, -10°C to 60°C for petroleum distillate. Outside that range, the carrier viscosity changes and particle mobility degrades.',
      ],
      callout: {
        kind: 'spec',
        title: 'Lift-test frequency',
        body: 'Lift test daily and after any drop or damage. A yoke that passes lift test at start-of-shift can fail mid-shift after impact damage. Re-lift after any incident.',
      },
    },
    {
      heading: 'Step 1: Pole spacing, current type, and demagnetization check',
      level: 2,
      paragraphs: [
        'Pole spacing: ASME V Art. 7 §T-762.1.4 limits pole spacing to 75-200 mm (3-8 inches) for yokes.[1] Closer than 75 mm and the magnetic field saturates the area locally without spreading into the bevel; wider than 200 mm and field strength drops below the threshold for indication formation.',
        'Current selection: AC for surface defects only (skin depth ~0.1-0.3 mm in CS at 60 Hz), DC for surface plus near-surface defects to ~3-5 mm depth. Most weld inspection runs AC because the targets are surface-breaking cracks; near-surface lack-of-fusion in fillet welds runs DC.',
        'Check residual magnetism on the part before starting. Use a Hall-effect probe or a residual-magnetism gauge — ASME V Art. 7 §T-762.3 requires the field strength prior to MT to be below 3 gauss (0.3 mT) at the test surface.[1] Higher residual magnetism distorts indications and biases formation toward one direction.',
      ],
    },
    {
      heading: 'Step 2: Particle application and dwell',
      level: 2,
      paragraphs: [
        'Wet fluorescent particle bath: apply by spraying or flowing across the surface during current application. Particle concentration: 0.1 to 0.4 mL/100 mL (settling test in a centrifuge tube) per ASTM E709 §10.4.[2] Higher concentration buries indications; lower concentration fails to form indications.',
        'Apply particles during current, not before — particles that settle before the magnetic field is on cannot migrate to leakage fields. Hold current for at least 0.5 to 1 second after particle application stops; this allows particles to align with the flux pattern.',
        'For dry visible: dust the area lightly with the bulb applicator during current application. Excess dry powder forms a non-uniform background that obscures real indications. Particle size 1-10 µm typical for visible, 0.5-5 µm for fluorescent.',
      ],
      list: {
        title: 'Application sequence summary (wet fluorescent yoke shot)',
        items: [
          'Verify daily lift test passed (45 N AC or 178 N DC)',
          'Surface preparation: clean, dry, no loose scale or paint',
          'Pole spacing 75-200 mm, parallel to expected crack orientation perpendicular to first shot',
          'Apply low-pressure particle stream while current is on',
          'Hold current 0.5-1 s after application stops',
          'Inspect under UV-A (1000 µW/cm² minimum at part surface) with ambient < 20 lux',
          'Repeat orthogonal shot at 90° to first shot orientation',
        ],
      },
    },
    {
      heading: 'Step 3: Two-direction shot for full coverage',
      level: 2,
      paragraphs: [
        'A single yoke shot generates a linear magnetic field between the poles. Cracks aligned parallel to that field axis do not produce indications because the flux runs along the crack, not across it. Mandatory: shoot the area in two orientations 90° apart to catch cracks in both axes.',
        'For a circumferential weld: first shot with poles aligned along the weld axis (detects transverse cracks), second shot with poles across the weld (detects longitudinal cracks and toe cracks). For a longitudinal seam weld: first shot across the weld, second shot along the weld.',
        'Document both shots on the inspection record — orientation, pole spacing, current type, particle batch, and any indication found. Single-direction MT is non-conforming under ASME V Art. 7 and AWS D1.1 Clause 6.[1][3]',
      ],
    },
    {
      heading: 'Step 4: Indication evaluation and interpretation',
      level: 2,
      paragraphs: [
        'Inspect under UV-A black light (365 nm wavelength) for fluorescent particles, white light for visible. UV-A intensity at part surface must be ≥ 1000 µW/cm² with ambient white light < 20 lux per ASTM E709 §8.5.[2] Allow eyes to dark-adapt for at least 1 minute before evaluation.',
        'Linear indications: any indication with length ≥ 3x its width. Relevant if length ≥ 1.6 mm for typical weld acceptance. Crack-like indications are evaluated against the procedure — ASME B31.3 §344.3 disallows any crack-like indication regardless of length.[4]',
        'Non-relevant indications: dimensional change indications (e.g., at thickness transitions or weld toe), magnetic-write indications (from adjacent magnetized parts), residual magnetism from prior MT shots. Demagnetize and re-shoot if non-relevant indications mask the area.',
      ],
    },
    {
      heading: 'Step 5: Post-MT cleanup and demagnetization',
      level: 2,
      paragraphs: [
        'Clean particle residue with a clean cloth and a residue remover compatible with the carrier (water-based bath cleans with water rinse; petroleum carrier cleans with a solvent wipe). Residue left on the part can corrode painted surfaces and interfere with subsequent welding.',
        'Demagnetize the part if residual magnetism exceeds 3 gauss at the surface, especially for parts going to subsequent machining (residual magnetism attracts chips), welding (residual field deflects the arc), or assembly with magnetic components.',
        'Document on the MT report: yoke ID, lift-test date, particle batch and concentration, pole spacing, current type, two shot directions, indications with length and orientation, Level III review signature for any reportable indication, and the final acceptance call.',
      ],
    },
  ],
  commonMistakes: [
    'Skipping the lift test "because the yoke worked yesterday." Lift strength can drop after a drop or after long shifts at high duty cycle — daily lift verification catches it. Document the lift weight and pole spacing every shift.',
    'Applying particles before the current is on. Particles that settle on the surface before the magnetic field is established cannot migrate to leakage fields and indications fail to form. Always apply during current, not before.',
    'Single-direction shot only. A weld inspected in one orientation misses cracks aligned parallel to the magnetic field. Two-direction coverage is mandatory under ASME V Art. 7 — skipping the second shot is an audit fail.',
    'UV-A intensity verification with an uncalibrated radiometer or no verification at all. UV-A bulbs degrade — a 6-month-old bulb may read 60% of original intensity. Verify daily with a calibrated radiometer and replace the bulb when it drops below 1000 µW/cm² at the part surface.',
  ],
  relatedFaqs: [
    {
      q: 'When do I use AC vs DC mode on an MT yoke?',
      a: 'AC mode produces a surface-only field — the AC skin effect limits flux penetration to roughly 0.1-0.3 mm depth in carbon steel at 60 Hz. AC is the right choice for surface-breaking crack detection on welds, castings, and finished machined surfaces. DC mode (rectified half-wave or full-wave) penetrates 3-5 mm into the part, detecting both surface and shallow subsurface defects — useful for fillet weld near-surface lack-of-fusion and for thick-section castings with subsurface porosity. The yoke lift-test rating differs by mode: 4.5 kg (10 lb) at maximum pole spacing for AC, 18 kg (40 lb) for DC per ASME V Art. 7 §T-762.1.',
    },
    {
      q: 'Why must I shoot in two directions 90° apart?',
      a: 'The magnetic field between yoke poles runs in a straight line. Cracks oriented parallel to the field do not produce flux leakage because the flux runs along the crack instead of across it, so no particle indication forms. Shooting in a second orientation 90° apart catches cracks the first shot missed. ASME V Art. 7 §T-743 and AWS D1.1 Clause 6.7.5 require two perpendicular orientations on every part. The first shot typically aligns with the weld axis (detecting transverse cracks), the second across the weld axis (detecting longitudinal cracks and toe cracks). Single-direction MT is a procedural failure regardless of how clean the first shot looks.',
    },
    {
      q: 'What is the difference between wet fluorescent and dry visible particles?',
      a: 'Wet fluorescent uses fluorescent-coated particles suspended in a water-based or petroleum carrier. Inspection runs under UV-A black light with low ambient white light. Sensitivity is highest of the four MT variants — detects cracks down to ~0.025 mm wide. Suited for finished surfaces and high-acceptance-bar work like aerospace and pressure-vessel weld inspection. Dry visible uses dry colored particles (typically red or gray) dusted directly onto the part. Inspection runs under white light. Sensitivity is lower (~0.05-0.1 mm minimum crack width detectable) but the technique tolerates rough surfaces and high temperatures (up to 315°C with high-temp particles) where wet baths boil off. Choose by surface condition, temperature, and required sensitivity.',
    },
    {
      q: 'How do I demagnetize a part after MT?',
      a: 'Two common methods. AC decay: pass the part slowly through an AC coil while reducing field strength continuously, or use an AC yoke and slowly withdraw it from the part while energized. AC field reverses 60 times per second and the gradual reduction shrinks the magnetic domains back toward random orientation. DC step-down: cycle current direction repeatedly while reducing magnitude — used for very large parts where AC coils cannot accommodate the geometry. Verify with a residual magnetism gauge — ASME V Art. 7 §T-762.3 requires < 3 gauss at the surface for parts going to subsequent processing. Smaller residual targets (1 gauss or less) apply on aerospace and high-precision machining work.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/magnetic-particle-testing',
      label: 'Magnetic Particle Testing method overview',
      context: 'Full MT method context including physics, equipment variants, and code framework.',
    },
    {
      href: '/standards/asme-v',
      label: 'ASME Section V Article 7',
      context: 'Article 7 governs the yoke lift test, pole spacing, and indication evaluation requirements.',
    },
    {
      href: '/learn/troubleshooting-mt-false-indications',
      label: 'Troubleshooting MT false indications',
      context: 'Magnetic-write and dimensional indications mimic real cracks — diagnostic walkthrough.',
    },
    {
      href: '/learn/faq-defect-types-in-welds',
      label: 'Weld defect types FAQ',
      context: 'Surface cracks, toe cracks, and HAZ cracks are the primary MT targets on welds.',
    },
    {
      href: '/methods/penetrant-testing',
      label: 'Liquid Penetrant Testing method overview',
      context: 'PT is the non-magnetic alternative for stainless steel and aluminum surface inspection.',
    },
    {
      href: '/learn/how-to-perform-pt-development',
      label: 'PT development procedure',
      context: 'PT covers stainless welds where MT cannot be used.',
    },
    {
      href: '/standards/asme-b31-3',
      label: 'ASME B31.3 process piping code',
      context: 'B31.3 §344.3 sets MT acceptance criteria for piping welds.',
    },
    {
      href: '/free-tools/mt-yoke-lift-test-tracker',
      label: 'MT yoke lift-test tracker',
      context: 'Log daily lift-test records and yoke calibration history for audit.',
    },
  ],
  citations: [
    {
      id: 'asme-v-art-7',
      source: 'ASME BPVC Section V, Article 7, 2023 edition — Magnetic Particle Examination, §T-762 and §T-743',
    },
    {
      id: 'astm-e709',
      source: 'ASTM E709-21 — Standard Guide for Magnetic Particle Testing',
    },
    {
      id: 'aws-d1-1',
      source: 'AWS D1.1/D1.1M:2020 — Structural Welding Code — Steel, Clause 6.7 Magnetic Particle Testing',
    },
    {
      id: 'asme-b31-3',
      source: 'ASME B31.3-2022 — Process Piping, §344.3 Magnetic Particle Examination',
    },
    {
      id: 'iso-9934',
      source: 'ISO 9934-1:2016 — Non-destructive testing — Magnetic particle testing — Part 1: General principles',
    },
  ],
};

export default article;
