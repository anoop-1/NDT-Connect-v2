import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'eddyfi-mantis',
  make: 'Eddyfi Technologies',
  model: 'Mantis',
  category: 'phased-array',
  metaTitle: 'Eddyfi Mantis Review: 16:64 PA + TOFD Portable Flaw Detector',
  metaDescription:
    'Eddyfi Mantis review — 16:64 PA + TOFD + conventional UT in 3.2 kg portable, ASME V/AWS D1.1, ~$40k MSRP. Best lightweight PA in class.',
  heroLede:
    'The Eddyfi Mantis is the lightest fully code-compliant phased-array flaw detector in the 16:64 channel class — 3.2 kg with battery, 9.4 inch sunlight-readable touchscreen, and native TOFD plus 4 conventional UT channels. Positioned between the budget Sonatest Veo+ and the high-end OmniScan X3, the Mantis is the instrument of choice for inspection contractors who need a single portable that handles PA weld inspection, TOFD, corrosion mapping, and conventional UT without changing boxes. Eddyfi (Quebec) is part of the same group as Zetec (PA) and Reddy/Ectane (eddy current), giving the Mantis an unusually deep multi-method software stack via the Capture software platform [1].',
  msrpUSD: 42000,
  rentalPerWeekUSD: 1650,
  specs: {
    caption: 'Eddyfi Mantis — key specs (manufacturer datasheet, 2023) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['PA channels', '16:64 parallel (single configuration)'],
      ['UT (conventional) channels', '4 (TOFD pitch-catch + 2 pulse-echo)'],
      ['Frequency range', '0.5 – 20 MHz (–3 dB)'],
      ['Display', '9.4 in sunlight-readable touchscreen, 1280 × 800'],
      ['Pulser voltage', '50 – 100 V (bipolar)'],
      ['Imaging modes', 'A, S, L, C, B, TFM, TOFD'],
      ['Weight', '3.2 kg (7.0 lb) with battery'],
      ['IP rating', 'IP65'],
      ['Battery life', '~10 hr typical (Li-ion, hot-swap)'],
      ['Operating temperature', '–10 °C to +45 °C'],
      ['Storage', '128 GB internal SSD'],
      ['Connectivity', 'WiFi, Ethernet Gigabit, USB 3.0, HDMI'],
      ['Encoder inputs', '2-axis quadrature'],
      ['Software', 'Capture (acquisition + post-processing unified)'],
    ],
  },
  pros: [
    '3.2 kg is genuinely portable — 2 kg lighter than OmniScan X3 (5.5 kg), big difference on 10-hour scan shifts.',
    '10-hour battery life beats OmniScan X3 (8 hr) and TOPAZ (7 hr) — fewer battery swaps per shift.',
    'Capture software is unified acquisition + post-processing — no separate desktop app required like OmniPC or TomoView.',
    '4 conventional UT channels matches the TOPAZ — supports simultaneous TOFD + PA + 2 pulse-echo in one encoded pass.',
    'Sister-brand Eddyfi multi-method ecosystem (Reddy ECA, Ectane PEC) is unified under Capture — strong for inspection houses that run multiple methods.',
    'TFM is supported on the instrument with reasonable real-time performance for 16:64 channel PA.',
  ],
  cons: [
    'Limited to 16:64 PA channels — for thick-wall vessels and dissimilar metal welds where 64-channel aperture matters, you need TOPAZ64 or X3 64.',
    'US installed base is smaller than Olympus — fewer trained Mantis operators in the labor market.',
    'Capture software is functional but younger than OmniPC and TomoView — some power-user features still maturing.',
    'No AWS D1.5 bridge-welding code package as polished as Olympus offering — D1.5 work needs more manual report tuning.',
    'Resale value retention is mid-pack; 3-year units trade at ~55-65% of new.',
    'Service ecosystem is concentrated in Eddyfi Quebec and Texas centers — fewer regional partners than Olympus.',
  ],
  bestFor: [
    'Inspection contractors who need a single instrument that handles PA, TOFD, and conventional UT with minimum weight.',
    'Rope-access and offshore PA work where the 3.2 kg weight saves field-tech fatigue versus 5.5 kg competitors.',
    'Multi-method inspection houses already running Eddyfi Reddy or Ectane — unified Capture workflow is the productivity win.',
    'Mid-budget operators who need 16:64 PA and TOFD code compliance without stepping to OmniScan X3 pricing.',
  ],
  notIdealFor: [
    '64-channel PA work on thick-wall vessels or dissimilar metal welds — channel count is binding.',
    'Olympus-standardized fleets where mixing OEMs creates training and spare-parts complexity.',
    'Nuclear ISI work that explicitly references Zetec TOPAZ class instruments in qualified procedures.',
    'Operations that already standardized on TomoView or UltraVision post-processing — Capture is a different workflow.',
  ],
  alternatives: [
    { make: 'Olympus (Evident)', model: 'OmniScan X3', reason: '32:128 PA, real-time TFM, more polished UI, larger US installed base — but heavier (5.5 kg) and pricier (~$60k+).' },
    { make: 'Sonatest', model: 'Veo+', reason: '16:64 or 32:128 PA at lower price — but heavier and offline-only FMC/TFM.' },
    { make: 'Eddyfi', model: 'Gekko', reason: 'Eddyfi flagship PA with deeper FMC/TFM capability and TomoView-class post-processing — heavier and more expensive.' },
  ],
  certificationCompatibility: [
    'ASME BPVC Section V, Article 4 — PA (Appendix IV) and TOFD (Appendix III)',
    'AWS D1.1/D1.1M — structural welding code PA inspection',
    'API 1104 — pipeline girth weld AUT/PA',
    'API 5UE — pipe imperfection UT',
    'EN ISO 13588 — automated PA UT of welds',
    'EN ISO 10863 — TOFD of welds',
    'ASTM E2700 — PA contact UT',
    'EN 12668-1 — UT instrument characterization',
  ],
  faqs: [
    {
      q: 'How does the Mantis compare to the Olympus OmniScan X3 for refinery turnaround work?',
      a: 'The Mantis wins on weight (3.2 kg vs 5.5 kg) and battery life (10 hr vs 8 hr), which matter for manual hand-scanning shifts. The X3 wins on channel count (32:128 or 64:128 vs Mantis 16:64), UI polish, and US refinery installed base. For weld thicknesses under 25 mm with standard groove geometries, the Mantis 16:64 covers the scope adequately. For thick-wall reactor or dissimilar metal welds where 64-channel aperture matters, the X3 64 is the right call. Pricing is comparable — $40k-$50k for Mantis kit vs $60k-$80k for X3 kit. The Mantis is the right pick for inspection houses prioritizing portability and value; X3 is the right pick where customers spec it by name [1][2].',
    },
    {
      q: 'What is the Capture software platform and how does it differ from OmniPC?',
      a: 'Capture is Eddyfi\'s unified acquisition + post-processing software running on both the Mantis instrument (for acquisition) and on desktop PCs (for review and reporting). Unlike Olympus where OmniScan acquires on-instrument and OmniPC analyzes on desktop as two separate workflows with file imports, Capture treats acquisition and review as the same workspace — a tech can pull a scan from the instrument over Ethernet and continue analysis on a laptop without import friction. Capture also handles eddy current array (Reddy) and pulsed eddy current (Ectane) data, giving multi-method inspection houses a unified review environment. Tradeoff: smaller third-party tutorial ecosystem than OmniPC [1][3].',
    },
    {
      q: 'Does the Mantis do real-time TFM like the OmniScan X3?',
      a: 'Yes, the Mantis supports real-time TFM imaging on the 16:64 PA channel architecture, with up to 2 simultaneous envelopes (vs 4 on X3 64). For typical weld forensic work — confirming a 1.5-3 mm sub-surface indication on a 25 mm groove weld — the Mantis TFM performance is sufficient. For deep-section TFM on 50+ mm thick walls or multi-mode wave-set analysis (LL, TT, LT-LT simultaneously), the X3 64 has more headroom. Both instruments can also acquire FMC data for offline reconstruction in their respective post-processing software (Capture for Mantis, OmniPC for X3) [1][4].',
    },
    {
      q: 'Is Eddyfi service and support strong enough in North America for the Mantis?',
      a: 'Eddyfi operates direct service centers in Quebec (HQ), Houston Texas, and Calgary, with annual calibration turnaround of 5-10 business days. Spare PA probes for the Mantis (5L64, 7.5L32, 10L16) are stocked in Houston and Quebec. Training courses run quarterly in Houston and on customer site. The main support gap versus Olympus is the smaller third-party calibration ecosystem — fewer independent labs handle Eddyfi, so OEM service is more often the only practical route. For inspection houses with central depots and predictable cal cycles, this is acceptable; for distributed field crews who lose instruments in the field, Olympus or Waygate may offer faster local recovery [1].',
    },
  ],
  internalLinks: [
    { href: '/methods/phased-array-ultrasonic-testing', label: 'Phased array UT method', context: 'PA method overview — when 16:64 channel PA like Mantis is enough vs 64:128.' },
    { href: '/methods/tofd', label: 'TOFD overview', context: 'Mantis runs PA + TOFD + 2 pulse-echo on one encoded pass.' },
    { href: '/equipment/olympus-omniscan-x3', label: 'Olympus OmniScan X3', context: 'Higher-channel-count competitor to the Mantis.' },
    { href: '/equipment/sonatest-veo-plus', label: 'Sonatest Veo+', context: 'Mid-budget PA alternative at similar price point.' },
    { href: '/equipment/zetec-topaz-pa', label: 'Zetec TOPAZ PA', context: 'Sister-brand Eddyfi instrument with higher nuclear pedigree.' },
    { href: '/equipment/eddyfi-reddy', label: 'Eddyfi Reddy ECA', context: 'Eddy current array sister-brand instrument — same Capture software.' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'Mantis is compliant with Article 4 Appendix III and IV.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1', context: 'Mantis supports AWS D1.1 PA inspection per Annex K.' },
  ],
  citations: [
    { id: 'eddyfi-mantis-datasheet', source: 'Eddyfi Technologies, Mantis Portable PA + TOFD + UT Flaw Detector datasheet, Rev. 2023', url: 'https://www.eddyfi.com/en/product/mantis-ut-pa-tofd' },
    { id: 'olympus-x3-comparison', source: 'Evident (Olympus), OmniScan X3 datasheet, Rev. 2023-09 (comparative spec)' },
    { id: 'capture-software', source: 'Eddyfi Technologies, Capture Software Platform User Documentation, Rev. 2023' },
    { id: 'asme-v-app-iv', source: 'ASME BPVC Section V, Article 4, Mandatory Appendix IV (2023), Phased Array UT' },
    { id: 'iso-13588', source: 'EN ISO 13588:2019, NDT of welds — UT — Use of automated PA technology' },
  ],
};

export default equipment;
