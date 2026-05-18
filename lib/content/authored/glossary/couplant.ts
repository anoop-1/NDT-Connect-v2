import type { GlossaryLongFormContent } from '../types';

const term: GlossaryLongFormContent = {
  slug: 'couplant',
  term: 'Couplant',
  category: 'Ultrasonic Testing',
  metaTitle: 'UT Couplant: Types, Selection, Temperature Limits & Compatibility',
  metaDescription:
    'Couplant is the medium that transmits ultrasound from probe to component. Compare glycerin, gel, water, and high-temp pastes — impedance matching, surface effects, and code rules.',
  heroLede:
    'Couplant is the liquid or gel layer placed between an ultrasonic transducer and the test surface to displace air and let acoustic energy cross the interface. Without it, ~99.95% of the ultrasonic energy reflects off the probe-to-air interface and the inspection fails before it starts. Pick the wrong couplant and you contaminate the component, fail an austenitic chloride limit, or stop transmitting at 200 °C — couplant choice is a specification, not an afterthought.',
  preciseDefinition:
    'A couplant is a fluid medium used between an ultrasonic transducer and the test surface to facilitate the transmission of ultrasonic energy by displacing air from the interface.[1]',
  alternateNames: ['Coupling medium', 'UT gel', 'Coupling fluid', 'Acoustic couplant', 'Contact medium'],
  history:
    'Water was the first couplant — used in 1928 by Sokolov for the earliest transmission-mode UT experiments. Glycerin entered service in WW2 sonar work for its higher acoustic impedance and surface-tension behaviour. Modern formulated couplants (Sonotech Ultragel II, Magnaflux Sonotrace, Krautkramer ZG-F) appeared in the 1970s with surfactants and rheology modifiers tuned for vertical surfaces and high-temperature applications. The first ASTM compatibility standard for nuclear use, NACE TM0284 / ASTM E1316, was published in the 1980s after stress corrosion incidents on austenitic vessels traced to chloride and sulphur in field couplants.',
  technicalDetail: [
    {
      heading: 'Acoustic impedance matching',
      level: 2,
      paragraphs: [
        'Reflection at a probe-air-steel interface is given by R = ((Z₂−Z₁)/(Z₂+Z₁))². Acoustic impedance of air ≈ 0.0004 MRayl; steel ≈ 45 MRayl. That mismatch reflects 99.95% of energy. Insert a couplant of impedance Z_c between probe and steel and the energy gets two interface reflections; the net transmitted amplitude is maximised when Z_c approaches √(Z_probe × Z_steel).',
        'Water (Z = 1.5 MRayl) is the cheapest fluid and adequate for immersion UT. Glycerin (Z = 2.5 MRayl) is preferred for contact UT because higher impedance reduces the impedance jump at the probe wear face. Heavy gel couplants (Z up to 3-4 MRayl) approach the theoretical optimum for steel and aluminium.[2]',
        'High-temperature couplants based on silicone and polymer compounds maintain coupling up to 400-500 °C but trade impedance for thermal stability — Z values typically 1.5-2.0 MRayl. The signal-to-noise penalty is real and is built into hot-service calibration.',
      ],
    },
    {
      heading: 'Compatibility with the test material',
      level: 2,
      paragraphs: [
        'Chloride content matters on austenitic stainless and nickel alloys. ASTM E165 (penetrant testing) and EPRI guidelines for nuclear pressure boundary work set a 250 ppm (by weight) chloride limit on contact materials, including UT couplant. ASTM E1316 echoes this for UT in nuclear-service vessels. Trace chlorides can initiate transgranular stress corrosion cracking in service at elevated temperature. Use certified low-halide couplants on austenitic and Inconel — Magnaflux Sonotrace 70CL, Sonotech Soundsafe NF, etc.[3]',
        'Sulphur and titanium nitride limits apply on titanium and nickel-alloy parts: NACE MR0175 / ISO 15156 imposes process-side sulphur and free-elemental sulphur restrictions; couplant must be sulphur-free for sour-service inspection. Tube manufacturers (PCC Energy, Sandvik) require couplant certificates of analysis with every shipment.',
        'Food-grade and pharma applications need couplants compliant with FDA 21 CFR 178.3570 (incidental food contact). Available from Sonotech and Magnaflux but at 3-5× the cost of standard glycerin gel.',
      ],
    },
    {
      heading: 'Temperature and surface effects',
      level: 2,
      paragraphs: [
        'Standard glycerin/water gel works from 0 °C to ~60 °C surface temperature. Above 60 °C it boils off too fast to maintain a film. Use a water-soluble glycol+CMC formulation up to 100 °C, a high-temp silicone paste up to 300 °C, and ceramic-loaded compounds for 400-500 °C work (boiler tube wall surveys, hot reformer outlet pipework).',
        'Cold-temperature inspection (below 0 °C) needs propylene-glycol or methanol-based fluids — pure water freezes and breaks the film. Arctic pipeline inspection in winter routinely runs at −20 to −40 °C surface temperature with specialist couplants.',
        'Surface finish affects coupling: Ra > 12.5 µm causes air entrapment that no quantity of standard gel will displace. Wire-brush or grit-blast the inspection area to Ra ≤ 6.3 µm where possible. For very rough cast surfaces, a thick paste couplant or a stand-off wedge with water-jet coupling outperforms gel.',
      ],
    },
  ],
  workedExample: {
    setup:
      'In-service UT thickness survey on a 304L stainless steel hot-oil piping system at 180 °C process temperature, surface insulation removed for inspection. Required: NRC-compliant chloride-controlled couplant.',
    calculation:
      'Surface temp at probe location: 178 °C (skin temperature). Standard glycerin gel rated to 60 °C — unusable; will boil and decouple within seconds. Standard high-temp couplants flagged for chloride content > 500 ppm — fails the 250 ppm austenitic limit. Selected: Sonotech Soundsafe NF (Cl⁻ < 50 ppm certified), rated to 200 °C with intermittent contact. Probe protected by a 3 mm sacrificial delay line to manage probe-face temperature; couplant reapplied every reading.',
    result:
      'Inspection completed. Chloride compliance documented per ASTM E165 / EPRI 1009650 with batch CoA filed in the inspection record. Probe and delay line discarded after the shift — high-temp gel is single-use and probe face wears rapidly.',
  },
  whereItAppears: [
    {
      context: 'Contact UT thickness gauging on refinery piping at a turnaround',
      explanation:
        'A Level II technician walks a 200-CML thickness survey on a heater outlet line. Couplant choice — glycerin-based gel for the 80 °C cooled-down lines, silicone high-temp paste for the still-warm sections — directly affects how many readings can be repeated and how much surface contamination the next maintenance shift has to clean. Documented in the procedure as part of the equipment list under ASME V Article 4 T-422.',
    },
    {
      context: 'Nuclear pressure boundary austenitic weld inspection',
      explanation:
        'Every UT couplant batch on a nuclear plant must carry a certificate of analysis showing chloride, fluoride, and sulphur content. The bottle label is photographed and attached to the inspection report. Trace contamination has been linked to documented IGSCC failures, and the QA audit trail starts at the couplant tube.',
    },
    {
      context: 'Immersion UT inspection of aerospace forgings',
      explanation:
        'For immersion inspection of titanium and nickel-alloy forgings, the entire couplant is the water bath itself — degassed, filtered, and chemically controlled to suppress bubble nucleation. Wetting agents are added at known concentration; the tank water is tested weekly for total dissolved solids and pH per AMS 2630.',
    },
  ],
  relatedTerms: [
    { term: 'A-Scan', slug: 'a-scan' },
    { term: 'Calibration Block', slug: 'calibration-block' },
    { term: 'Dual Element Probe', slug: 'dual-element-probe' },
    { term: 'Immersion Testing', slug: 'immersion-testing' },
  ],
  faqs: [
    {
      q: 'Why does couplant matter so much — can I not just press harder to get coupling?',
      a: 'No, and trying is the fastest way to produce a bad inspection. The air gap between probe and surface reflects 99.95% of the ultrasonic energy because the impedance jump from steel (45 MRayl) to air (0.0004 MRayl) is enormous. Mechanical pressure cannot squeeze that gap below the acoustic wavelength on a real surface — surface roughness leaves micron-scale voids that air fills. Liquid couplant fills those voids with a medium of similar impedance to the probe wear face, transmitting 60-90% of the energy across the interface. Pressing harder past a thin couplant film just deforms the probe and operator wrist; it does not compensate for missing couplant.',
    },
    {
      q: 'Can I use vegetable oil or water as couplant in a pinch?',
      a: 'Plain water works as couplant — it is the impedance reference used in immersion UT — but it runs off vertical and overhead surfaces in seconds and gives variable contact. For overhead, wallpaper paste or cellulose-thickened water keeps the film on the surface long enough to scan. Vegetable oil works acoustically but contaminates the part for any subsequent welding or painting, and is banned on most petrochemical and aerospace sites for fire and chemical-compatibility reasons. The cost difference between makeshift couplant and a $35/gallon commercial gel is trivial against an inspection re-do, so most spec procedures call out the couplant brand and grade explicitly under ASME V Article 4 T-422.',
    },
    {
      q: 'What is the chloride limit for couplant on stainless steel?',
      a: 'The widely cited limit is 250 ppm by weight for halides (chloride + fluoride combined), per EPRI 1009650 and ASTM E165 / E1316. The concern is chloride stress corrosion cracking (Cl-SCC) of austenitic stainless and high-nickel alloys in service. Suppliers of low-halide couplants — Sonotech Soundsafe NF, Magnaflux Sonotrace 70CL — certify chloride below 50 ppm and sulphur below 200 ppm on each batch. For nuclear pressure boundary work, the EPRI specification is more conservative (< 200 ppm Cl⁻) and most utility QA programs default to < 50 ppm couplant on austenitic surfaces. Always request a CoA with each shipment and file it with the inspection record.',
    },
    {
      q: 'How much couplant should I actually apply to a probe?',
      a: 'Enough to form a continuous film on the surface, no more. A common Level I error is to flood the surface — extra couplant runs off, drags grit, and does not improve coupling. Practical technique: dispense a 25-50 mm bead of gel on the surface, spread it lightly with the probe, then drag the probe through it while watching the A-scan back-wall amplitude. Back-wall echo at 80% FSH means coupling is good; if it drops 6 dB or more as you move, recoat. On vertical surfaces, apply to the surface (not the probe face) so gravity does not strip it. On hot surfaces, reapply every reading — high-temp paste burns off in 5-10 seconds at 250 °C.',
    },
  ],
  internalLinks: [
    {
      href: '/services/ultrasonic-testing',
      label: 'Ultrasonic Testing',
      context: 'Couplant is the consumable that enables every contact UT inspection',
    },
    {
      href: '/services/phased-array-ut',
      label: 'Phased Array UT',
      context: 'PAUT wedges use both bulk couplant and surface conformance to maintain coupling',
    },
    {
      href: '/glossary/a-scan',
      label: 'A-scan',
      context: 'Loss of back-wall echo on the A-scan is the first sign of couplant failure',
    },
    {
      href: '/glossary/attenuation',
      label: 'attenuation',
      context: 'Poor couplant manifests as elevated apparent attenuation along the scan path',
    },
    {
      href: '/glossary/immersion-testing',
      label: 'immersion testing',
      context: 'In immersion UT the water bath itself is the couplant — managed for impurity content',
    },
    {
      href: '/standards/asme-bpvc-section-v',
      label: 'ASME BPVC Section V',
      context: 'Article 4 T-422 requires couplant identification on the inspection procedure',
    },
    {
      href: '/standards/api-510',
      label: 'API 510 vessel inspection',
      context: 'API 510 thickness survey procedures specify couplant grade for in-service vessels',
    },
    {
      href: '/free-tools/ai-procedure-generator',
      label: 'NDT procedure generator',
      context: 'Auto-generate UT procedures that specify couplant grade by service temperature',
    },
    {
      href: '/industries/oil-and-gas',
      label: 'oil and gas',
      context: 'Refinery couplant selection turns on temperature, chloride, and austenitic compatibility',
    },
  ],
  citations: [
    {
      id: 'astm-e1316-c',
      source: 'ASTM E1316-23, Standard Terminology for Nondestructive Examinations — Couplant definition',
      url: 'https://www.astm.org/e1316-23.html',
    },
    {
      id: 'asme-v-t422',
      source: 'ASME BPVC Section V, 2023 Edition, Article 4, T-422 — Written procedure requirements (couplant identification)',
    },
    {
      id: 'epri-1009650',
      source: 'EPRI Technical Report 1009650, Guideline for the Selection and Use of Ultrasonic Couplants on Nuclear Plant Components',
    },
    {
      id: 'astm-e165',
      source: 'ASTM E165/E165M-18, Standard Practice for Liquid Penetrant Testing — contaminant control on austenitic stainless',
    },
    {
      id: 'nace-mr0175',
      source: 'NACE MR0175 / ISO 15156, Petroleum and natural gas industries — Materials for use in H2S-containing environments — Free-sulphur restrictions',
    },
  ],
};

export default term;
