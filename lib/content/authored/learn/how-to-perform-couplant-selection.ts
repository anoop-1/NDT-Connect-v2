import type { LearnArticleContent } from '../types';

const article: LearnArticleContent = {
  slug: 'how-to-perform-couplant-selection',
  category: 'how-to',
  metaTitle: 'How to Select UT Couplant: Glycerin, Gel, Water (ASTM E1316)',
  metaDescription:
    'Couplant selection by temperature, surface roughness, orientation, and material. Glycerin vs propylene-glycol gel vs water vs grease per ASTM E1316.',
  heroLede:
    "You walk up to a 90°C overhead pipe weld with 320 µin surface roughness and the morning bottle of water-based gel runs straight off before you can land a probe. Couplant choice is not optional — wrong couplant changes transfer correction by 4-8 dB and invalidates the DAC. Below is the selection matrix by temperature, orientation, and surface condition, with the exact couplant grades that hold contact and stay neutral against painted, galvanized, and stainless surfaces.",
  audience:
    'Level II UT technicians selecting couplant for manual contact UT, plus QA engineers writing couplant specifications into procedures.',
  prerequisiteKnowledge: [
    'UT calibration sequence including DAC construction',
    'Surface preparation requirements per ASME V and ASTM E165',
    'Familiarity with couplant acoustic impedance and transfer correction',
    'Reading procedure-specific couplant requirements',
  ],
  sections: [
    {
      heading: 'What couplant does and why it matters',
      level: 2,
      paragraphs: [
        'Couplant fills the air gap between the probe wedge and the part surface. Without it, the impedance mismatch at the air interface reflects 99.95% of the sound energy — the receiver gets nothing. ASTM E1316 §10 defines couplant performance characteristics: acoustic impedance match, wetting ability, viscosity, temperature range, and chemical compatibility with the part material.[1]',
        'Acoustic impedance match matters most. Water (1.48 MRayl), glycerin (2.42 MRayl), and propylene-glycol gel (~2.0 MRayl) all couple efficiently into carbon steel (46 MRayl) — the mismatch is on the wedge side, not the couplant side. The wedge-couplant-part stack transfers ~95% of incident energy when properly coupled.',
        'Procedure compliance: ASME V Art. 4 §T-433 requires couplant to be identified and used consistently between calibration and production scan.[2] Switching couplant mid-shift invalidates the DAC by 1-8 dB.',
      ],
    },
    {
      heading: 'Couplant selection by temperature',
      level: 2,
      paragraphs: [
        'Below 5°C: water-based couplants freeze or thicken below freezing. Use glycerin (freezing point -17.8°C) or propylene-glycol blends rated to -20°C. Verify the couplant data sheet — generic "all-temperature" gel often fails below 0°C.',
        '5°C to 50°C: standard water-based gels work, including methyl cellulose gel and propylene-glycol gel. Most field weld inspection runs in this range. Glycerin works too but is more viscous and slower to apply.',
        '50°C to 150°C: switch to high-temperature couplant — typically a silicone-based gel or a high-temp grease. Standard water-based couplants boil off in seconds at 100°C+. Silicone couplants rated to 150°C exist (e.g., Sonotech Sonotrace 150) but acoustic transfer is 2-3 dB lower than water.[1]',
        'Above 150°C: dry coupling (Inconel foil layer with high-temp grease) or wheel-coupled probes. Direct contact scanning at high temperature is rare and procedure-specific.',
      ],
      table: {
        caption: 'Couplant selection by temperature and orientation',
        headers: ['Temperature', 'Orientation', 'Recommended couplant', 'Notes'],
        rows: [
          ['< 5°C', 'Any', 'Glycerin or PG blend (-20°C rated)', 'Water-based gels freeze'],
          ['5°C to 50°C', 'Flat or vertical', 'Methyl cellulose gel', 'Standard field choice'],
          ['5°C to 50°C', 'Overhead', 'Heavy propylene-glycol gel', 'Stays on overhead surface'],
          ['50°C to 100°C', 'Any', 'Silicone gel (high-temp)', '2-3 dB transfer loss vs water'],
          ['100°C to 150°C', 'Any', 'High-temp grease (Sonotrace 150)', 'Recal at production temp'],
          ['> 150°C', 'Any', 'Dry coupling or wheel probe', 'Specialty applications'],
        ],
      },
    },
    {
      heading: 'Material compatibility',
      level: 2,
      paragraphs: [
        'Stainless steel and nickel alloys: avoid sulfur and chlorine in the couplant. Standard glycerin and propylene-glycol gels are sulfur/chlorine-free. Read the data sheet — some industrial couplants contain trace halides that cause stress-corrosion cracking on austenitic stainless at temperature.[3]',
        'Painted surfaces: water-based gels do not damage cured epoxy or polyurethane paint. Solvent-based couplants attack some paint systems — verify before use. After inspection, wipe the surface clean to prevent paint degradation under prolonged contact.',
        'Galvanized surfaces: standard couplants are compatible with zinc galvanizing. Heavy-duty greases can hold onto galvanized zinc and require solvent cleanup.',
        'Food-contact or pharmaceutical equipment: use FDA-approved or USP-grade couplants (typically food-grade glycerin or USP propylene glycol). Generic industrial gel is not acceptable on equipment that contacts product.',
      ],
    },
    {
      heading: 'Viscosity selection by orientation and surface roughness',
      level: 2,
      paragraphs: [
        'Flat scanning, smooth surface (< 100 µin Ra): thin water-based gel or glycerin. Spreads evenly under the probe, maintains contact, allows easy probe movement.',
        'Vertical or overhead scanning: heavy propylene-glycol gel or grease. Thin couplant runs off vertical surfaces in seconds, breaking contact and dropping the back-wall echo. Heavy gel stays in place for 5-10 minutes of scanning.',
        'Rough surface (200-400 µin Ra, typical as-welded): heavier couplant fills surface valleys and maintains contact. Thin water-based couplant on rough as-welded surface leaks air gaps under the wedge, dropping signal by 4-10 dB.',
        'Verify couplant choice on a transfer-correction test before scanning the part — measure the back-wall echo from the cal block, repeat on a clean area of the production surface with the working couplant, and document the difference in dB.',
      ],
      list: {
        title: 'Couplant selection rules of thumb',
        items: [
          'Same couplant calibration to scan — never switch mid-shift',
          'Verify temperature compatibility against the data sheet',
          'Stainless and nickel alloys: sulfur < 50 ppm, chlorine < 50 ppm',
          'Vertical and overhead: viscosity > 5000 cP',
          'Rough surface: viscosity > 10000 cP and fill surface valleys',
          'Document brand, lot, and batch on the calibration sheet',
        ],
      },
    },
    {
      heading: 'Couplant verification and cleanup',
      level: 2,
      paragraphs: [
        'Transfer correction check: before scanning a new lot of parts or after changing couplant, run the empirical transfer correction test. Place the probe on the cal block, peak the back-wall echo, note gain at 80% FSH. Repeat on a clean area of the production part. Difference in dB is the transfer correction — apply it to the scanning gain. Procedure-defined transfer correction is +6 dB minimum under ASME V Art. 4 §T-462.4.[2]',
        'Cleanup: wipe excess couplant from the part with a clean rag. Water-based gels wash off with water; petroleum and silicone bases need solvent. Couplant left on hot piping can carbonize, leaving a black film that interferes with the next inspection cycle.',
        'Document the couplant brand, lot number, and concentration (if mixed on-site) on the calibration record. Many owner specs require couplant lot traceability for 5 years post-inspection.',
      ],
    },
  ],
  commonMistakes: [
    'Switching couplant brands mid-shift to "use up the bottle." Transfer correction shifts 1-8 dB between brands even within the same generic chemistry. Stick with one brand from calibration through scan completion.',
    'Using leftover gel from yesterday\'s shift. Water-based gels grow microbes after 24-48 hours unopened in summer heat — the contamination changes viscosity and transfer characteristics. Discard opened bottles after 72 hours.',
    'Applying high-temperature couplant on a cold surface "for consistency." Silicone-based high-temp couplants are 2-3 dB less efficient than water-based at room temperature. Use the right couplant for the actual surface temperature, even if the part will heat up later.',
    'Skipping the cleanup step on painted process equipment. Couplant left on paint for 24+ hours can lift the paint surface, especially on solvent-sensitive coatings. Wipe clean within 1 hour of inspection completion.',
  ],
  relatedFaqs: [
    {
      q: 'Why does my DAC drift after switching from gel to water?',
      a: 'Water and glycerin have different acoustic impedances — water at 1.48 MRayl, glycerin at 2.42 MRayl. The reflection coefficient at the wedge-couplant interface changes by ~3 dB between them, and the wetting characteristics differ enough that the actual contact area under the wedge varies by another 1-3 dB. Total transfer change can be 4-8 dB. Because the DAC is anchored to a specific amplitude on the cal block under specific couplant conditions, switching couplants invalidates the DAC. ASME V Art. 4 §T-433 requires the couplant identified in the procedure be used through calibration and scan; switching is procedurally non-conforming and a routine audit finding.',
    },
    {
      q: 'Can I use motor oil or grease as couplant in a pinch?',
      a: 'Technically yes, the acoustic impedance is in range, but no for production work. Motor oil and grease are not characterized for acoustic transfer, they vary batch to batch, they contain additives that can corrode some materials, and they are not listed in any code-compliant procedure. Use them only as last-resort field troubleshooting (e.g., a leak-detection scan during a callout) and document explicitly that the inspection is preliminary and a code-compliant re-scan with qualified couplant is required. ASME V Art. 4 acceptance work requires couplant identified in the procedure — motor oil does not qualify.',
    },
    {
      q: 'How do I couple to a rough as-welded surface without grinding?',
      a: 'Use a high-viscosity gel rated for rough surfaces (typically 10000-15000 cP). The thick gel fills surface valleys, displaces air, and maintains uniform contact under the wedge. Verify with the transfer correction test — measure back-wall on a smooth area of the cal block, then on a representative rough area of the production part. Difference > 6 dB means coupling is inadequate; add a thin layer of grease under the gel or grind a smooth patch for scanning. Some owner specs (Shell DEP, Saudi Aramco SAES-W-012) require local grinding to 125 µin Ra at scan path to ensure repeatable coupling regardless of couplant viscosity.',
    },
    {
      q: 'Are food-grade couplants required for refinery work?',
      a: 'Refinery process equipment generally does not require food-grade couplant since the inspection surface is external. The exception is dairy, brewery, pharmaceutical, and food-processing piping where the inspection target may be a process-contact surface and trace couplant residue could migrate. For those applications, USP-grade glycerin or FDA-approved food-grade gel is required. Refinery and oil/gas typically run on industrial-grade gel with sulfur and chlorine content below 50 ppm to prevent SCC on stainless. Verify against the customer\'s specific consumables specification; some refinery operators apply pharma-grade requirements to their owned chemical-cleaning systems.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/ultrasonic-testing',
      label: 'Ultrasonic Testing method overview',
      context: 'Couplant choice is one input to the full UT method workflow.',
    },
    {
      href: '/standards/asme-v',
      label: 'ASME Section V Article 4',
      context: 'Article 4 §T-433 governs couplant identification and consistency.',
    },
    {
      href: '/learn/how-to-calibrate-ut-flaw-detector',
      label: 'How to calibrate a UT flaw detector',
      context: 'Couplant choice directly affects calibration and DAC reference values.',
    },
    {
      href: '/learn/how-to-perform-dac-curve-construction',
      label: 'DAC curve construction',
      context: 'DAC is anchored to a specific couplant; switching invalidates the curve.',
    },
    {
      href: '/learn/troubleshooting-couplant-failure',
      label: 'Troubleshooting couplant failure',
      context: 'Diagnose lost coupling, transfer drift, and gel breakdown mid-shift.',
    },
    {
      href: '/learn/troubleshooting-ut-no-back-wall-echo',
      label: 'Troubleshooting: no back-wall echo',
      context: 'Lost back-wall echo is often a couplant or coupling problem.',
    },
    {
      href: '/learn/how-to-perform-thickness-survey-piping',
      label: 'Piping thickness survey procedure',
      context: 'Thickness surveys on piping require consistent couplant across hundreds of readings.',
    },
    {
      href: '/methods/phased-array-ultrasonic-testing',
      label: 'PAUT method overview',
      context: 'PAUT requires the same couplant discipline as conventional UT.',
    },
  ],
  citations: [
    {
      id: 'astm-e1316',
      source: 'ASTM E1316-23 — Standard Terminology for Nondestructive Examinations',
    },
    {
      id: 'asme-v-art-4',
      source: 'ASME BPVC Section V, Article 4, 2023 edition — §T-433 Couplants and §T-462.4 Transfer Correction',
    },
    {
      id: 'astm-a380',
      source: 'ASTM A380/A380M-17 — Standard Practice for Cleaning, Descaling, and Passivation of Stainless Steel Parts',
    },
    {
      id: 'aws-d1-1',
      source: 'AWS D1.1/D1.1M:2020 — Structural Welding Code — Steel, Clause 8.19 Couplant Material',
    },
  ],
};

export default article;
