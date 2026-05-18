import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'baker-hughes-mentor-em',
  make: 'Baker Hughes / Waygate Technologies',
  model: 'Mentor EM',
  category: 'eddy-current',
  metaTitle: 'Waygate Mentor EM Review: Cloud-First Eddy Current Instrument',
  metaDescription:
    'Mentor EM review: portable eddy current with native cloud sync, IP54 touchscreen, ASTM E215/E309 compliant, ~$18k MSRP. Modern ECA workflow.',
  heroLede:
    'The Waygate Mentor EM is the cloud-first portable eddy current instrument from Baker Hughes Waygate Technologies, replacing the older GE Phasor-CV / Phasor EC platforms with a modern Android-based touchscreen UI and native InspectionWorks cloud integration. Aimed at aerospace tube and bolt-hole inspection, heat-exchanger tube inspection, and surface-crack detection on aircraft skins, the Mentor EM differentiates from Olympus Nortec and Eddyfi Reddy on workflow integration rather than raw probe performance — inspections push automatically to a cloud dashboard for engineering review, with traceable audit logs that aerospace OEMs increasingly require [1].',
  msrpUSD: 18500,
  rentalPerWeekUSD: 850,
  specs: {
    caption: 'Waygate Mentor EM — key specs (manufacturer datasheet, 2022) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['Frequency range', '10 Hz – 12 MHz'],
      ['Display', '6 in capacitive touchscreen, 1280 × 720'],
      ['Channels', '2 simultaneous (dual frequency)'],
      ['Sweep rate', 'Up to 25,000 samples/s per channel'],
      ['Gain range', '0 – 100 dB (0.1 dB steps)'],
      ['Weight', '1.0 kg (2.2 lb) with battery'],
      ['IP rating', 'IP54'],
      ['Battery life', '~8 hr typical (Li-ion)'],
      ['Operating temperature', '–10 °C to +50 °C'],
      ['Storage', '32 GB internal + USB'],
      ['Connectivity', 'WiFi (cloud), USB, Bluetooth'],
      ['Imaging modes', 'Impedance plane, time-base, mix channel'],
      ['Probe compatibility', 'Waygate ECT probe library + 3rd party via adapter'],
    ],
  },
  pros: [
    'Native InspectionWorks cloud sync — inspection records push to engineering review automatically, full audit trail.',
    '1.0 kg pocket form factor — lighter than Nortec 600 (1.5 kg) and matches Reddy weight class.',
    'Touchscreen UI with Android-like gesture controls — modern feel, faster onboarding than legacy Nortec 500 menu tree.',
    'Dual-frequency operation native — mix-channel for surface-crack discrimination through coatings is straightforward.',
    'Strong aerospace pedigree — Waygate / GE Aviation MRO has been the dominant ECT supplier to commercial aerospace for decades.',
    'Bluetooth probe support reduces cable-management hassle on rotating-bolt-hole inspections.',
  ],
  cons: [
    'IP54 rating is the lowest of the major portable ECT class — Nortec 600 (IP66) and Reddy (IP65) are more rugged for refinery environments.',
    'Cloud-first workflow is great when there is connectivity; offshore platform and remote pipeline work it can frustrate.',
    'Smaller installed base in the US refinery and oil-and-gas market than Olympus Nortec — most refinery techs trained on Nortec.',
    'Probe library is large but heavily Waygate-branded — third-party probes need adapter cables, often custom.',
    'Cloud subscription (InspectionWorks) is a recurring cost — typically $1,200-$2,400/year per instrument for full features.',
    'No native ECA (array) capability — Mentor EM is single/dual-channel ET, not phased eddy current array.',
  ],
  bestFor: [
    'Aerospace MRO line operations where InspectionWorks cloud audit trail is the binding compliance requirement.',
    'Heat-exchanger tube inspection in industrial plants with reliable WiFi and centralized engineering review.',
    'Surface-crack detection on aircraft skins, fastener-hole, and rotating engine components.',
    'Inspection programs standardized on the Waygate Mentor ecosystem (Mentor UT, Mentor Visual iQ borescope, Mentor EM) for unified data flow.',
  ],
  notIdealFor: [
    'Eddy current array (ECA) inspection — single/dual-channel only, no array support.',
    'Remote offshore or pipeline work without reliable network connectivity for cloud sync.',
    'Refinery teams already standardized on Olympus Nortec — adding Mentor EM creates probe and training fragmentation.',
    'Operations where IP66+ ruggedization is mandatory for outdoor wet environments.',
  ],
  alternatives: [
    { make: 'Olympus (Evident)', model: 'Nortec 600', reason: 'Larger US refinery and aerospace installed base, IP66 rating, well-established Nortec probe ecosystem — but older non-cloud workflow.' },
    { make: 'Eddyfi', model: 'Reddy', reason: 'Strong ECT and ECA (array) capable, slightly heavier but more refinery-rugged — best multi-method choice if you need ECA later.' },
    { make: 'Rohmann', model: 'Elotest PL600', reason: 'High-end European ECT used in aerospace and rotating-component inspection — strong rotating drive support.' },
  ],
  certificationCompatibility: [
    'ASTM E215 — standardizing equipment for electromagnetic testing of seamless aluminum-alloy tube',
    'ASTM E309 — eddy current examination of steel tubular products',
    'ASTM E243 — electromagnetic (eddy current) testing of seamless copper and copper-alloy tubes',
    'ASTM E426 — eddy current testing of seamless and welded tubular products, austenitic stainless',
    'ASME BPVC Section V, Article 8 — eddy current examination of tubing',
    'NAS 410 — NDT personnel qualification (aerospace)',
    'EN 1330-5 — NDT terminology, eddy current',
    'EN 12084 — characteristics and verification of ET equipment',
  ],
  faqs: [
    {
      q: 'What does InspectionWorks cloud sync actually do for the Mentor EM workflow?',
      a: 'When an inspection is captured on the Mentor EM, the impedance-plane trace, instrument settings, probe ID, and operator certificate metadata push automatically over WiFi to the InspectionWorks cloud workspace. Engineering reviewers see the inspection record within minutes, can mark it accepted or flagged, and the audit trail is preserved with timestamp and reviewer ID. For aerospace MRO operations subject to FAA Part 145 and EASA Part 145 audit, this replaces the older workflow of USB transfer, manual logging, and PDF report assembly. Typical productivity gain reported by Waygate customers is 20-40% on records-keeping effort. The cloud subscription is required to unlock full sync features [1][2].',
    },
    {
      q: 'How does Mentor EM compare to Olympus Nortec 600 for heat exchanger tube inspection?',
      a: 'Both instruments meet ASTM E309 and ASME V Article 8 requirements for tube ET. The Nortec 600 has the larger US refinery installed base and a wider third-party probe ecosystem, particularly bobbin and array probes from MultiECT and other vendors. The Mentor EM has the cloud workflow advantage and slightly more modern UI. For pure technical performance on a 19 mm OD stainless tube bundle inspection, both produce equivalent results. The choice is workflow ecosystem: Olympus is the safe choice for refinery contractor crews with existing Nortec training; Mentor EM is the forward-looking choice for programs investing in unified cloud audit trails [1][3].',
    },
    {
      q: 'Can the Mentor EM run eddy current array (ECA) probes?',
      a: 'No. The Mentor EM is a single/dual-channel ET instrument, not an array instrument. For ECA inspection (32-channel or 64-channel arrays used for fast weld crack screening or composite inspection), you need the Eddyfi Reddy or Ectane 2, or the Olympus OmniScan ECA. Waygate offers separate array-capable instruments in the Mentor family roadmap, but as of 2026 the Mentor EM itself is conventional single/dual-channel ET. If your scope includes ECA, plan to either buy the right instrument first or budget for a separate ECA box [1][4].',
    },
    {
      q: 'What is the total cost of ownership for a Mentor EM over 5 years?',
      a: 'Instrument purchase: $18,500 typical. Probes: $3,000-$5,000 for a starter aerospace or heat-exchanger probe kit. InspectionWorks cloud subscription: $1,500/year typical = $7,500 over 5 years. Annual EN 12084 calibration: $400-$600/year = $2,500. Battery replacement at year 3: $350. Total 5-year TCO: roughly $32,000-$35,000. Compare to a Nortec 600 at $14k purchase + $400/year cal + $200 battery = ~$17,000 5-year TCO without cloud. The Mentor EM cloud advantage costs about $15k extra over 5 years — worth it for aerospace MRO programs, often not worth it for refinery ET work [1].',
    },
  ],
  internalLinks: [
    { href: '/methods/eddy-current-testing', label: 'Eddy current testing overview', context: 'Method overview — when ET (Mentor EM class) is the right call.' },
    { href: '/equipment/eddyfi-reddy', label: 'Eddyfi Reddy', context: 'Direct competitor with ECA capability.' },
    { href: '/equipment/eddyfi-ectane-2', label: 'Eddyfi Ectane 2', context: 'Higher-end multi-method ET / ECA / PEC platform.' },
    { href: '/equipment/baker-hughes-mentor-ut', label: 'Waygate Mentor UT', context: 'Sister-brand UT instrument with same InspectionWorks cloud workflow.' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'Mentor EM is compliant with Section V Article 8 tube ET.' },
    { href: '/industries/aerospace', label: 'Aerospace NDT inspection', context: 'Mentor EM is heavily used in aerospace MRO line work.' },
    { href: '/learn/eddy-current-calibration', label: 'Eddy current calibration', context: 'Calibration workflow on Mentor EM.' },
    { href: '/standards/nas-410', label: 'NAS 410 NDT personnel', context: 'Aerospace personnel qualification requirements for ET operators.' },
  ],
  citations: [
    { id: 'waygate-mentor-em-datasheet', source: 'Baker Hughes / Waygate Technologies, Mentor EM Eddy Current Instrument datasheet, Rev. 2022', url: 'https://www.bakerhughes.com/waygate-technologies/ndt-equipment' },
    { id: 'inspectionworks', source: 'Baker Hughes / Waygate, InspectionWorks Cloud Platform — Service Overview, 2023', url: 'https://www.bakerhughes.com/inspectionworks' },
    { id: 'astm-e309', source: 'ASTM E309-16, Standard Practice for Eddy-Current Examination of Steel Tubular Products' },
    { id: 'asme-v-art-8', source: 'ASME BPVC Section V, Article 8 (2023), Eddy Current Examination of Tubular Products' },
    { id: 'en-12084', source: 'EN 12084:2001, NDT — Eddy current testing — General principles' },
  ],
};

export default equipment;
