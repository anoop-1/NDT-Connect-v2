import type { PillarHubContent } from '../types';

const pillar: PillarHubContent = {
  slug: 'penetrant-testing-complete-guide',
  metaTitle: 'Liquid Penetrant Testing Hub: Methods, Codes, Sensitivity',
  metaDescription:
    'The full PT cluster — Type I fluorescent, Type II visible, Methods A/B/C/D. Codes, sensitivity levels, dwell time, and acceptance criteria.',
  heroLede:
    'Liquid penetrant is the most-used and most-abused surface method in field NDT. It works on any non-porous material — stainless, aluminum, titanium, nickel alloys, ceramics — and finds surface-breaking flaws down to 0.5 µm wide when run correctly. It also produces more invalid inspections than any other method because the dwell time was wrong, the remover was applied directly to the part, or the developer was clumped from humid storage. This hub maps every PT variant we publish: visible (red dye) versus fluorescent, water-washable versus post-emulsified versus solvent-removable, sensitivity Levels 1 through 4, and the procedure regime under ASME Section V Article 6 and ASTM E1417 for aerospace.',
  topicOverview:
    'PT divides on two axes: dye visibility (Type I fluorescent, Type II visible red) and removal method (Method A water-washable, Method B post-emulsified lipophilic, Method C solvent-removable, Method D post-emulsified hydrophilic). Type I fluorescent runs at one of four sensitivity levels (1 ultra-low through 4 ultra-high) and requires UV-A illumination ≥ 1,000 µW/cm² under ambient light ≤ 20 lux. Type II visible is daylight-readable and dominates field weld inspection on stainless and aluminum. Method C solvent-removable is the field default — three aerosol cans (cleaner, penetrant, developer) and no water source required — but is the lowest-sensitivity of the four methods. The cluster also covers dwell time (penetrant dwell 5-30 minutes, developer dwell 7-30 minutes per ASTM E1417 §7), surface temperature limits (typically 40-125°F per ASME Section V Article 6 T-652), and the pre- and post-cleaning regime that determines whether the inspection has any validity.',
  subPages: [
    {
      href: '/methods/liquid-penetrant-testing',
      label: 'PT Overview — Surface Flaw Detection',
      description:
        'The full method sequence: pre-clean, apply penetrant, dwell, remove excess, apply developer, evaluate, post-clean. Acceptance criteria under ASME Section V Article 6.',
    },
    {
      href: '/methods/visible-dye-penetrant',
      label: 'Visible Dye Penetrant (Type II)',
      description:
        'Red-dye visible PT — the field default for weld inspection on stainless and aluminum. Daylight-readable, no UV-A required, lower sensitivity than fluorescent.',
    },
    {
      href: '/methods/fluorescent-penetrant-testing',
      label: 'Fluorescent PT (Type I)',
      description:
        'Higher-sensitivity fluorescent technique under UV-A illumination. The aerospace standard for fatigue-critical components — sensitivity Levels 1 through 4 per AMS 2644.',
    },
    {
      href: '/methods/water-washable-penetrant',
      label: 'Water-Washable Method A',
      description:
        'Penetrant with built-in emulsifier — water rinse only. Production-line standard for high-volume work but tolerates less over-wash than post-emulsified.',
    },
    {
      href: '/methods/post-emulsified-penetrant',
      label: 'Post-Emulsified Methods B and D',
      description:
        'Highest-sensitivity removal regime — separate lipophilic (Method B) or hydrophilic (Method D) emulsifier applied after dwell. Used for aerospace and rotating-component fatigue inspection.',
    },
    {
      href: '/methods/solvent-removable-penetrant',
      label: 'Solvent-Removable Method C',
      description:
        'The aerosol three-can field default — no water source needed. Removal-step technique (wipe with dry cloth, then solvent-dampened cloth) determines inspection validity.',
    },
    {
      href: '/standards/asme-section-v-article-6',
      label: 'ASME Section V Article 6 — PT Examination',
      description:
        'The governing code article for PT on pressure equipment. Procedure qualification, dwell time minimums, and the acceptance pathway to Section VIII or B31.3.',
    },
    {
      href: '/standards/astm-e1417',
      label: 'ASTM E1417 — Standard Practice for Liquid Penetrant',
      description:
        'The practice standard for aerospace and critical-component PT — stricter than Section V on system qualification, sensitivity verification with TAM panels, and process control.',
    },
    {
      href: '/standards/ams-2644',
      label: 'AMS 2644 — Inspection Material, Penetrant',
      description:
        'The materials qualification spec — defines penetrant sensitivity Levels ½ (ultra-low) through 4 (ultra-high) and the QPL listings primes accept.',
    },
    {
      href: '/learn/pt-dwell-time-selection',
      label: 'PT Dwell Time Selection',
      description:
        'Penetrant dwell and developer dwell by material, defect type, and temperature. The most common ASME Section V audit finding is dwell time below the minimum specified in T-672.',
    },
    {
      href: '/tools/pt-temperature-correction-tool',
      label: 'PT Temperature Correction Tool',
      description:
        'Adjust dwell time for surface temperatures outside the 50-100°F default window — extended dwell required below 50°F per ASTM E1417 §9.',
    },
    {
      href: '/industries/aerospace',
      label: 'PT in Aerospace Component Overhaul',
      description:
        'Type I fluorescent PT with sensitivity Level 3 or 4 for landing gear, engine forgings, and rotating components — the prime-specific procedures and the FAA AC 43-3B framework.',
    },
    {
      href: '/compare/pt-vs-mt',
      label: 'PT vs MT — Which Surface Method',
      description:
        'Side-by-side selection: PT on non-ferromagnetic and on smooth machined surfaces, MT on ferromagnetic and on rough as-welded surfaces with subsurface reach.',
    },
    {
      href: '/case-studies/pt-find-rate-titanium-fan-blades',
      label: 'Case Study: PT on Titanium Fan Blades',
      description:
        'A 6-month overhaul population of titanium fan blades inspected with Level 4 hydrophilic post-emulsified Type I PT — find rate by service hours and the blend-and-return rate.',
    },
  ],
  expertCommentary:
    'PT is taught as procedure-driven and practiced as habit-driven, and the gap shows up in find rate. The first thing that goes wrong in field PT is the removal step on solvent-removable Method C. The standard sequence — apply penetrant, dwell, wipe excess with a dry lint-free cloth, then wipe with a solvent-dampened cloth — is routinely shortcut to "spray the solvent on the part, wipe off everything." Spraying solvent on the part flushes penetrant out of the very flaws you are trying to find, and the inspection becomes worthless. The procedure language must be explicit and the training must enforce it. The second failure mode is dwell time. ASME Section V Article 6 T-672 sets 5 minutes minimum penetrant dwell on welds and 10 minutes for castings and forgings, with longer dwells required for tight cracks. Field crews routinely run 90-second penetrant dwell to keep pace with weld-out crews, and the resulting inspection misses tight surface cracks every time. The third issue is temperature. Below 50°F, penetrant viscosity rises and tight cracks no longer fill in the standard dwell time. ASTM E1417 §9 mandates a qualified extended-dwell procedure or a heated surface — neither of which gets done in winter field work. The cumulative effect: a typical PT inspection record from a winter shutdown has roughly 60% of the find rate of the same crew\'s summer work on identical parts. Build a winter-procedure annex, train to the removal step, log every dwell time, and PT delivers what it is supposed to deliver.',
  externalResources: [
    {
      label: 'ASNT — Liquid Penetrant Testing Method',
      url: 'https://www.asnt.org/learn/the-nde-technician/ndt-methods/penetrant-testing',
    },
    {
      label: 'ASTM E165 — Standard Practice for Liquid Penetrant Examination',
      url: 'https://www.astm.org/e0165_e0165m-23.html',
    },
    {
      label: 'ASTM E1417 — Standard Practice for Liquid Penetrant',
      url: 'https://www.astm.org/e1417_e1417m-21.html',
    },
    {
      label: 'SAE AMS 2644 — Inspection Material, Penetrant',
      url: 'https://www.sae.org/standards/content/ams2644/',
    },
    {
      label: 'FAA Advisory Circular 43-3B — Nondestructive Testing in Aircraft',
      url: 'https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentid/22579',
    },
  ],
  faqs: [
    {
      q: 'When do I choose visible PT versus fluorescent PT?',
      a: 'Visible PT (Type II) is daylight-readable and the field default for weld inspection on stainless, aluminum, and exotic alloys. It is lower sensitivity — typically equivalent to Level 1 fluorescent — and ASME Section V Article 6 accepts either type for pressure equipment construction. Fluorescent PT (Type I) is required when sensitivity Level 2 or higher is specified, which covers aerospace fatigue-critical parts, rotating components in pumps and turbines, and most pressure vessel work to ASME Section VIII Div. 2. Type I requires a UV-A lamp, controlled ambient white light ≤ 20 lux, and a darkened inspection booth — none of which is practical for outdoor field weld inspection.',
    },
    {
      q: 'What is the minimum dwell time for tight surface cracks?',
      a: 'ASME Section V Article 6 T-672 sets 5 minutes penetrant dwell as the absolute minimum for welds, 10 minutes for castings and forgings. Tight fatigue cracks and stress corrosion cracks require longer dwells — 20-30 minutes is typical, and the procedure should specify the dwell based on the flaw mechanism. Developer dwell runs 7-30 minutes per ASTM E1417 §10 and must be at least equal to the penetrant dwell. At surface temperatures below 50°F, dwell times double or the part must be heated to the procedure-qualified range. Drying time between water-wash and developer application is its own separate parameter — typically 5-10 minutes air-dry or per the procedure.',
    },
    {
      q: 'Can I use PT on as-welded surfaces or do I need to grind first?',
      a: 'Code-allowed but technique-dependent. ASME Section V Article 6 T-642 requires the surface to be free of scale, slag, paint, oil, and contaminants that would mask indications — but does not require grinding to a specific finish. In practice, smoke and rough as-welded surfaces with weld spatter trap penetrant and produce false indications under developer. A wire-brush cleanup is the field minimum; grinding the weld toe smooth gives the highest-confidence inspection. For aerospace work under ASTM E1417, the surface finish is typically specified at Ra ≤ 6.3 µm and the surface is etched (chemical or electropolish) to remove smeared metal that masks tight flaws.',
    },
    {
      q: 'What is the difference between Methods A, B, C, and D?',
      a: 'All four are removal methods. Method A is water-washable — penetrant contains a built-in emulsifier and is rinsed with water only. Production-line standard for high-volume parts; tolerates less over-wash than post-emulsified. Method B is post-emulsified lipophilic — separate oil-based emulsifier applied after dwell, then water rinse. Higher sensitivity, more complex process control. Method C is solvent-removable — wipe with solvent-damp cloth, no water source needed. Field default for site weld inspection. Method D is post-emulsified hydrophilic — water-based emulsifier, the highest-sensitivity production process. The aerospace high-sensitivity standard for fatigue inspection of high-cycle rotating components.',
    },
  ],
  internalLinks: [
    {
      href: '/learn/pt-pre-cleaning-techniques',
      label: 'PT Pre-Cleaning Techniques',
      context: 'Solvent wipe, vapor degrease, alkaline clean, etch — the preconditions that determine whether penetrant enters the flaw.',
    },
    {
      href: '/learn/tam-panel-sensitivity-verification',
      label: 'TAM Panel Sensitivity Verification',
      context: 'The aerospace process-control test piece — chromed steel with controlled cracks — used daily under ASTM E1417 §8 to verify system sensitivity.',
    },
    {
      href: '/equipment/magnaflux-spotcheck-skl-sp2',
      label: 'Magnaflux Spotcheck SKL-SP2',
      context: 'The dominant aerosol Method C kit in field service — the three-can cleaner-penetrant-developer system most procedures qualify against.',
    },
    {
      href: '/equipment/magnaflux-zyglo-zl-67b',
      label: 'Magnaflux Zyglo ZL-67B',
      context: 'The Level 2 fluorescent penetrant most commonly listed on AMS 2644 QPL — system qualification notes and process control.',
    },
    {
      href: '/standards/iso-3452-1',
      label: 'ISO 3452-1 — PT General Principles',
      context: 'The European/international equivalent to ASTM E165, referenced in EN-spec procurement contracts.',
    },
    {
      href: '/case-studies/pt-misapplication-causing-rework',
      label: 'Case Study: PT Misapplication Causing $400K Rework',
      context: 'A solvent-spray removal shortcut on stainless steel piping resulted in undetected lack-of-fusion in 18 welds, found only at hydrotest.',
    },
    {
      href: '/learn/pt-on-porous-and-rough-surfaces',
      label: 'PT on Porous and Rough Surfaces',
      context: 'Why castings, sintered parts, and rough as-welded surfaces produce false indications and the workarounds that recover validity.',
    },
    {
      href: '/tools/pt-developer-dwell-calculator',
      label: 'PT Developer Dwell Calculator',
      context: 'Compute the minimum developer dwell from penetrant dwell, surface temperature, and the flaw type expected.',
    },
  ],
  citations: [
    {
      id: 'asme-v-art-6',
      source: 'ASME BPVC Section V, 2023 ed., Article 6 — Liquid Penetrant Examination',
    },
    {
      id: 'astm-e165',
      source: 'ASTM E165/E165M-23, Standard Practice for Liquid Penetrant Examination',
    },
    {
      id: 'astm-e1417',
      source: 'ASTM E1417/E1417M-21, Standard Practice for Liquid Penetrant Testing',
    },
    {
      id: 'ams-2644',
      source: 'SAE AMS 2644L (2019), Inspection Material, Penetrant',
    },
    {
      id: 'iso-3452-1',
      source: 'ISO 3452-1:2021, Non-destructive Testing — Penetrant Testing — Part 1: General Principles',
    },
  ],
};

export default pillar;
