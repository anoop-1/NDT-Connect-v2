import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'sonatest-veo-plus',
  make: 'Sonatest',
  model: 'Veo+',
  category: 'phased-array',
  metaTitle: 'Sonatest Veo+ Review: 16:64 / 32:128 PA Flaw Detector',
  metaDescription:
    'Sonatest Veo+ honest review — 16:64 or 32:128 PA + TOFD, ASME V compliant, ~$28-45k street, lighter than OmniScan X3. Where it wins, where it loses.',
  heroLede:
    'The Sonatest Veo+ is the best mid-budget phased-array instrument on the US market — 16:64 or 32:128 channel architecture, native TOFD, AWS and ASME V code-compliant software, and a street price typically $20-30k below an OmniScan X3 64. Sonatest is a UK manufacturer with strong third-party support in North America via Sonatest Inc. (Houston). The Veo+ is the box specified by inspection contractors who do high-volume conventional PA weld and corrosion-mapping work but do not need native real-time TFM. If you have to outfit a 6-tech turnaround crew with PA in 2026, the Veo+ buys you four boxes for the price of three X3 64s without losing code compliance [1].',
  msrpUSD: 42000,
  rentalPerWeekUSD: 1650,
  specs: {
    caption: 'Sonatest Veo+ — key specs (manufacturer technical brochure, 2023) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['PA channels', '16:64 or 32:128 (model dependent)'],
      ['UT (conventional) channels', '2 (TOFD or pulse-echo pitch-catch)'],
      ['Frequency range', '0.5 – 18 MHz (–3 dB)'],
      ['Display', '10.4 in sunlight-readable touchscreen, 800 × 600'],
      ['Pulser voltage', '50 – 100 V (bipolar)'],
      ['Imaging modes', 'A, S, L, C, B-scan, TOFD, encoded mapping'],
      ['Weight', '4.5 kg (9.9 lb) with battery'],
      ['IP rating', 'IP65'],
      ['Battery life', '8 hr typical (Li-ion)'],
      ['Operating temperature', '–10 °C to +45 °C'],
      ['Storage', '64 GB internal SSD + SD'],
      ['Connectivity', 'WiFi, Gigabit Ethernet, USB 3.0, VGA'],
      ['Encoder inputs', '2-axis quadrature'],
      ['Code packages', 'AWS D1.1/D1.5, ASME V, EN 13588, API 5UE'],
    ],
  },
  pros: [
    '25-40% lower delivered cost than equivalent-channel-count OmniScan X3 — significant when outfitting fleets.',
    '4.5 kg weight is genuinely lighter than the 5.5 kg X3 — matters for 10-hour hand-scanning shifts.',
    'UltraVision PC software (post-processing) is included with the instrument — competitors charge $3-5k separately.',
    'Strong TOFD performance, including back-wall tracking and lateral wave gain, comparable to X3 within EN ISO 10863 tolerance.',
    'AWS D1.5 bridge-welding software is fully unlocked on most configurations — X3 charges separately for this license.',
    'Sonatest North America (Houston) provides 5-day turnaround calibration service — faster than most Evident service center cycles.',
  ],
  cons: [
    'No real-time TFM — Full Matrix Capture acquisition is supported but reconstruction is offline in UltraVision software, not on the instrument.',
    'Smaller installed base in US means fewer trained Veo+ operators in the labor market vs OmniScan veterans.',
    'Resale value: 3-year-old Veo+ trades at 55-65% of new MSRP, somewhat below X3 retention.',
    'Touchscreen response is slightly laggier than the X3 — noticeable when scrolling through 200-weld scan files.',
    'Software UI is functional but less polished than OmniScan; weld report templates need more manual tuning.',
    'WiFi cloud sync exists but is less mature than Evident WeldSight ecosystem.',
  ],
  bestFor: [
    'Mid-budget inspection contractors fielding 4-8 PA instruments who need ASME V / AWS compliance without the X3 sticker.',
    'TOFD-heavy workflows on pressure vessel and pipeline girth welds where the TOFD performance is the primary driver.',
    'Encoded corrosion mapping on tank shells and vessel walls using linear scanner integration.',
    'Inspection companies that do offline data review anyway — TFM offline in UltraVision is no productivity loss for their process.',
  ],
  notIdealFor: [
    'Real-time TFM forensic work where on-scaffold image reconstruction is the binding requirement.',
    'Operators standardized on Olympus/Evident fleets where mixing OEMs creates training and spares complexity.',
    'Sub-zero outdoor work below –10 °C without supplemental heating.',
    'High-temperature scanning above 150 °C — needs HT probe kit and is not a Veo+ optimization focus.',
  ],
  alternatives: [
    { make: 'Olympus (Evident)', model: 'OmniScan X3 64', reason: 'More polished UI, native TFM, larger US installed base — but 30-50% more expensive delivered.' },
    { make: 'Zetec', model: 'Topaz PA', reason: 'Similar 32:128 PA spec, similar price point, strong in nuclear/power generation segment — slightly heavier and less corrosion-mapping focused.' },
    { make: 'Baker Hughes / Waygate', model: 'Mentor UT', reason: 'IoT-first PA instrument with cloud workflow — best for inspection programs prioritizing data infrastructure over channel count.' },
  ],
  certificationCompatibility: [
    'ASME BPVC Section V, Article 4 — Mandatory Appendix IV (PA) and III (TOFD)',
    'AWS D1.1/D1.5 — structural and bridge welding code PA inspection',
    'API 1104 — pipeline girth weld AUT/PA inspection',
    'API 5UE — pipe imperfection ultrasonic evaluation',
    'EN ISO 13588 — automated PA UT of welds',
    'EN ISO 10863 — TOFD of welds',
    'EN 12668-1 — UT instrument characterization (manufacturer self-certified)',
    'ASTM E2700 — PA contact UT practice',
  ],
  faqs: [
    {
      q: 'Should I buy a Sonatest Veo+ or an Olympus OmniScan X3?',
      a: 'Buy the X3 if (a) you need real-time TFM on the instrument, (b) you already have an Olympus fleet and want spares/training consistency, or (c) your customers explicitly spec the X3 by name (some refinery framework contracts do this). Buy the Veo+ if (a) you need to maximize PA channels per dollar across a fleet, (b) you can live with offline FMC reconstruction in UltraVision, (c) TOFD performance is at least as important as PA in your scope mix. Net delivered cost gap is typically $20-30k per instrument — meaningful across a 6-instrument fleet. Both meet ASME V and AWS D1.1 compliance, so the choice is workflow and ecosystem, not code [1][2].',
    },
    {
      q: 'How does Veo+ handle TOFD compared to dedicated TOFD instruments?',
      a: 'The Veo+ runs TOFD on its 2 conventional UT channels using a pitch-catch probe pair, and produces a parallel-scan B-scan with lateral wave and back-wall tracking per EN ISO 10863. Sonatest has a long TOFD heritage from the Sonatest Masterscan series, and the Veo+ inherits that signal processing. For 90% of pipe girth weld and pressure vessel scopes, the Veo+ TOFD output is indistinguishable from a dedicated TOFD instrument like the Sonatest Masterscan D70. The only edge dedicated TOFD boxes still hold is on very long weld scans (multi-pass with stitch) where dedicated boxes have more streamlined acquisition memory. For combined PA+TOFD compliance work, the Veo+ is the right tool [3].',
    },
    {
      q: 'What does a full Veo+ kit cost delivered with probes, wedges, and scanner?',
      a: 'A typical refinery turnaround Veo+ kit lands around $60k-$75k delivered: $42k for the 32:128 instrument, $8k-$12k for a probe and wedge set (5L64 plus 7.5L32 plus TOFD pair, with appropriate wedges for OD coverage), $6k-$10k for a HydroFORM or Sonatest WheelProbe scanner, and the rest for cables, cases, and spare batteries. If you only need PA without TOFD or scanner, you can land at $48k-$52k. Compare to a fully-loaded X3 64 kit at $90k-$110k delivered with comparable accessories — the Veo+ kit saves roughly $30k per technician [1].',
    },
    {
      q: 'Is Sonatest service and support strong enough in North America?',
      a: 'Sonatest Inc. operates from Houston, Texas and provides direct calibration, repair, and training to North American customers. Typical calibration turnaround is 3-5 business days for an EN 12668-1 verification, faster than most Evident centers. Spare PA probes (5L64, 7.5L32, 10L16) are stocked in Houston and ship same-day for in-stock items. Training courses run quarterly in Houston and at customer sites on request. The main weakness vs Olympus is the smaller third-party service ecosystem — fewer independent calibration labs handle Sonatest, so for remote sites OEM service is more often the only option [1].',
    },
  ],
  internalLinks: [
    { href: '/methods/phased-array-ultrasonic-testing', label: 'Phased array UT method', context: 'PA method overview — when to spec the Veo+ for PA work.' },
    { href: '/methods/tofd', label: 'TOFD method overview', context: 'The Veo+ is strong at TOFD — see method guide for technique selection.' },
    { href: '/equipment/olympus-omniscan-x3', label: 'Olympus OmniScan X3', context: 'Closest direct competitor to the Veo+.' },
    { href: '/equipment/zetec-topaz-pa', label: 'Zetec Topaz PA', context: 'Another mid-price PA alternative, strong in nuclear segment.' },
    { href: '/equipment/olympus-epoch-650', label: 'Olympus EPOCH 650', context: 'Conventional UT alternative for shops not yet needing PA.' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'The Veo+ is compliant with Article 4 Appendix III and IV.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1 structural welding', context: 'AWS D1.1 PA inspection per Annex K is supported.' },
    { href: '/learn/paut-scan-plan', label: 'PAUT scan plan template', context: 'Scan-plan workflow tested against Veo+ software.' },
  ],
  citations: [
    { id: 'sonatest-veo-plus-brochure', source: 'Sonatest Ltd, Veo+ Phased Array Flaw Detector technical brochure, Rev. 2023', url: 'https://sonatest.com/products/flaw-detectors/veoplus' },
    { id: 'olympus-x3-comparison', source: 'Evident (Olympus), OmniScan X3 64 datasheet, Rev. 2023-09 (for comparative spec context)' },
    { id: 'iso-10863-tofd', source: 'EN ISO 10863:2020, Non-destructive testing of welds — TOFD ultrasonic testing' },
    { id: 'asme-v-app-iv', source: 'ASME BPVC Section V, Article 4, Mandatory Appendix IV (2023), Phased Array UT' },
    { id: 'iso-13588', source: 'EN ISO 13588:2019, NDT of welds — UT — Use of automated phased array technology' },
  ],
};

export default equipment;
