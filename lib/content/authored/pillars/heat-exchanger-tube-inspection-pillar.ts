import type { PillarHubContent } from '../types';

const pillar: PillarHubContent = {
  slug: 'heat-exchanger-tube-inspection-pillar',
  metaTitle: 'Heat Exchanger Tube Inspection: ECT, RFT, NFT, MFL & IRIS Guide',
  metaDescription:
    'How to inspect heat-exchanger and condenser tubing — eddy current (ECT), remote field (RFT), near field (NFT), MFL, and IRIS ultrasonic. Method selection by tube material.',
  heroLede:
    'A shell-and-tube heat exchanger can hold anywhere from a few hundred to several thousand thin-wall tubes, and a single through-wall tube failure can cross-contaminate process streams, force an unplanned shutdown, or release hydrocarbon to cooling water. Tube inspection is therefore one of the highest-value tasks in a refinery or power-plant turnaround — and the single most important decision the inspector makes is which method to use, because that is dictated almost entirely by the tube material. Non-ferromagnetic tubes (admiralty brass, 90-10 and 70-30 copper-nickel, titanium, austenitic stainless, Inconel) are inspected with conventional eddy current (ECT); ferromagnetic tubes (carbon steel, ferritic stainless, duplex) defeat conventional ECT and require remote-field testing (RFT), near-field testing (NFT) for fin-fan air-cooler tubes, or magnetic flux leakage (MFL). When quantitative wall thickness is required — or to calibrate and verify an electromagnetic survey — the inspector turns to IRIS, the ultrasonic internal rotary inspection system. This hub maps the full tube-inspection cluster: the methods, the material-driven selection logic, the defect mechanisms, and the codes that govern the work.',
  topicOverview:
    'Heat-exchanger tube inspection breaks into a method-selection decision followed by an execution-and-sizing workflow. Method selection by tube metallurgy: (1) Conventional eddy current (ECT) — the workhorse for non-ferromagnetic tubing, run with differential and absolute bobbin probes at 800-1000 tubes per shift, governed by ASME Section V Article 8; array probes add 360-degree circumferential coverage for axial cracks bobbins miss. (2) Remote-field testing (RFT) — for ferromagnetic carbon-steel tubes where ECT cannot penetrate the wall; RFT reads through-wall and is roughly equally sensitive to ID and OD wall loss. (3) Near-field testing (NFT) — optimised for the ID-pitting and ammonium-salt corrosion typical of carbon-steel fin-fan air-cooler tubes. (4) Magnetic flux leakage (MFL) — fast screening of ferromagnetic tubes for general and pitting wall loss. (5) IRIS (internal rotary inspection system) — an ultrasonic method that gives a quantitative wall-thickness map of any tube material; it is slow and water-coupled, so it is typically run on a sample of tubes to calibrate and confirm the electromagnetic survey rather than 100 percent. Execution covers reference-standard calibration (tubes with through-wall and flat-bottom holes and circumferential grooves), tube-sheet mapping, percentage-of-bundle scope, and defect sizing to a percent-wall basis for the fitness-for-service and re-tubing decision. Heat exchangers are also pressure equipment, so this work ties back to the API 510 inspection program for the vessel itself.',
  subPages: [
    {
      href: '/methods/eddy-current-testing',
      label: 'Eddy Current Testing (ECT)',
      description:
        'The core method for non-ferromagnetic tubing. Bobbin and array probes, ASME V Article 8 calibration, impedance-plane signal interpretation, and frequency selection.',
    },
    {
      href: '/methods/ultrasonic-testing',
      label: 'Ultrasonic Testing & IRIS',
      description:
        'Quantitative wall-thickness mapping with the ultrasonic internal rotary inspection system (IRIS) — the reference method used to verify and calibrate electromagnetic tube surveys.',
    },
    {
      href: '/pillars/corrosion-monitoring-pillar',
      label: 'Corrosion Monitoring & RBI',
      description:
        'Tube degradation mechanisms — pitting, under-deposit and ID corrosion, baffle fretting, erosion, IGA/IGSCC — and how the data feeds risk-based inspection intervals.',
    },
    {
      href: '/pillars/refinery-inspection-pillar',
      label: 'Refinery Inspection Hub',
      description:
        'Where tube inspection sits in the turnaround: exchanger bundles pulled, cleaned, and inspected against the unit critical path before the vessel is re-certified.',
    },
    {
      href: '/certifications/asnt-certification',
      label: 'ASNT Certification (ET)',
      description:
        'The ASNT Level II/III credential in electromagnetic methods (ET) that qualifies an inspector to set up, run, and interpret tube-inspection surveys.',
    },
    {
      href: '/certifications/api-510',
      label: 'API 510 (Exchanger as Pressure Vessel)',
      description:
        'A shell-and-tube exchanger is a pressure vessel under API 510 — the tube survey feeds the vessel inspection plan, remaining-life, and re-rating decision.',
    },
  ],
  expertCommentary:
    'The mistake that ends inspection careers on tube work is running the wrong method for the metallurgy. Conventional eddy current on carbon-steel tubes produces signals that look clean and mean nothing — the permeability variation swamps the defect response, and good tubes and badly-wasted tubes can read alike. Confirm the tube material from the exchanger datasheet before you mobilise, and match the method: ECT for non-ferrous, RFT or NFT or MFL for ferromagnetic, and IRIS when a number is needed. The second discipline is calibration honesty: an electromagnetic survey only sizes defects relative to the machined holes in the reference tube, so the reference standard must be the same material, OD, and wall as the bundle. The third is sampling logic for IRIS — because it is slow, it is run on a sample, but the sample has to be chosen to bracket the worst-expected condition (bottom rows, inlet ends, known fouling zones), not just a convenient random draw. Get those three right and the tube map is defensible; get them wrong and you either pull good bundles or, far worse, leave a wasted one in service.',
  externalResources: [
    { label: 'ASME BPVC Section V, Article 8 — Eddy Current Examination of Tubular Products', url: 'https://www.asme.org/codes-standards' },
    { label: 'ASTM E2096 — Practice for In-Situ Examination of Ferromagnetic Heat-Exchanger Tubes Using Remote Field Testing', url: 'https://www.astm.org' },
    { label: 'TEMA — Standards of the Tubular Exchanger Manufacturers Association', url: 'https://www.tema.org' },
  ],
  faqs: [
    {
      q: 'Which tube-inspection method should I use — ECT, RFT, NFT or MFL?',
      a: 'It is decided by tube material. Use conventional eddy current (ECT) for non-ferromagnetic tubes (brass, copper-nickel, titanium, stainless, Inconel). For ferromagnetic carbon-steel tubes, ECT does not work — use remote-field testing (RFT) for general inspection, near-field testing (NFT) for fin-fan air-cooler ID corrosion, or magnetic flux leakage (MFL) for fast pitting/wall-loss screening.',
    },
    {
      q: 'What is IRIS and when is it used?',
      a: 'IRIS (internal rotary inspection system) is an ultrasonic method that produces a quantitative wall-thickness map and works on any tube material. It is slow and water-coupled, so it is usually run on a representative sample of tubes to calibrate and confirm a faster electromagnetic (ECT/RFT) survey rather than on the whole bundle.',
    },
    {
      q: 'How many tubes in a bundle get inspected?',
      a: 'It depends on the inspection plan and risk. Electromagnetic methods are fast enough to inspect 100 percent of accessible tubes in a shift or two; IRIS, being slower, is run on a sample sized to bracket the worst-expected condition. The scope is set by the exchanger criticality, history, and the owner-user inspection program.',
    },
    {
      q: 'What defects does tube inspection find?',
      a: 'Pitting (general and isolated), uniform and localised wall loss, baffle/support-plate fretting wear, inlet-end erosion, under-deposit and ID corrosion, and — with array ECT — axially-oriented cracking such as inter-granular attack and stress-corrosion cracking that bobbin coils can miss.',
    },
  ],
  internalLinks: [
    { href: '/methods/eddy-current-testing', label: 'Eddy current testing method', context: 'method' },
    { href: '/methods/ultrasonic-testing', label: 'Ultrasonic testing (IRIS)', context: 'method' },
    { href: '/pillars/corrosion-monitoring-pillar', label: 'Corrosion monitoring hub', context: 'pillar' },
    { href: '/pillars/refinery-inspection-pillar', label: 'Refinery inspection hub', context: 'pillar' },
    { href: '/certifications/asnt-certification', label: 'ASNT ET certification', context: 'cert' },
    { href: '/certifications/api-510', label: 'API 510 pressure vessel inspector', context: 'cert' },
  ],
  citations: [
    { id: 'asme-v-art8', source: 'ASME BPVC Section V, Article 8 — Eddy Current Examination of Tubular Products', url: 'https://www.asme.org/codes-standards' },
    { id: 'astm-e2096', source: 'ASTM E2096 — In-Situ Remote Field Examination of Ferromagnetic Heat-Exchanger Tubes', url: 'https://www.astm.org' },
    { id: 'astm-e571', source: 'ASTM E571 — Electromagnetic (Eddy Current) Examination of Nickel and Nickel Alloy Tubular Products' },
    { id: 'tema', source: 'TEMA, Standards of the Tubular Exchanger Manufacturers Association, 10th ed.', url: 'https://www.tema.org' },
  ],
};

export default pillar;
