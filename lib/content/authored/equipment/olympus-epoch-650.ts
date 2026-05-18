import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'olympus-epoch-650',
  make: 'Olympus (Evident)',
  model: 'EPOCH 650',
  category: 'flaw-detector',
  metaTitle: 'Olympus EPOCH 650 Review: Mid-Range UT Flaw Detector',
  metaDescription:
    'In-depth EPOCH 650 review: 0.25-25 MHz range, AWS D1.1 software, 15.5-hour battery, ~$11k MSRP. Real specs, honest limits, where it beats the USM Go+.',
  heroLede:
    'The EPOCH 650 is Olympus (Evident) mid-range conventional UT flaw detector aimed squarely at fabrication-shop weld inspection and field thickness/flaw-survey work. It hits the AWS D1.1, ASME V, and EN 12668-1 baseline with a 0.25-25 MHz pulser range, two color LCD options (full VGA or sunlight-readable transflective), and 15.5 hours of field battery life. It does not do phased-array — if you need PA, look at the OmniScan X3 or Zetec Topaz PA. For straight conventional pulse-echo with AWS D1.1 scoring built in, the EPOCH 650 is still the most-specified mid-range box on US fab-shop floors a decade after launch [1].',
  msrpUSD: 11500,
  rentalPerWeekUSD: 525,
  specs: {
    caption: 'Olympus EPOCH 650 — key specs (manufacturer datasheet, 2023 revision) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['Frequency range (pulser)', '0.25 – 25 MHz (–3 dB)'],
      ['Pulser type', 'Tunable square wave, 100/200/400 V'],
      ['Pulse repetition frequency', '10 – 2000 Hz (auto or manual)'],
      ['Gain range', '0 – 110 dB (0.1 dB resolution)'],
      ['Display', '5.7 in (145 mm) full-VGA color LCD (640 × 480), 60 Hz refresh'],
      ['Material velocity range', '635 – 15240 m/s (0.0250 – 0.6000 in/µs)'],
      ['Weight (with battery)', '1.7 kg (3.7 lb)'],
      ['Dimensions (W × H × D)', '236 × 167 × 70 mm (9.3 × 6.6 × 2.8 in)'],
      ['IP rating', 'IP66 dust/water (sealed for outdoor refinery use)'],
      ['Battery life', '15.5 hr typical (Li-ion, hot-swappable)'],
      ['Operating temperature', '–10 °C to +50 °C (+14 °F to +122 °F)'],
      ['Data storage', '2 GB internal + SD card slot, ~100,000 IDs'],
      ['Connectivity', 'USB 2.0, RS-232, VGA out, audio'],
      ['Compliance', 'EN 12668-1:2010, ASTM E317, ASTM E164 software-supported'],
    ],
  },
  pros: [
    'AWS D1.1 weld-rating software built in — auto-calculates A, B, C, D values and produces a defect indication rating without a separate spreadsheet.',
    '15.5-hour battery life with hot-swap means a full 12-hour refinery shutdown shift never needs a wall outlet — competitive USM Go+ runs ~8 hr.',
    'IP66 rating is genuine: technicians regularly hose these off after offshore deck work without seal failure (verified in field reports from North Sea operators).',
    '0.25 MHz low-end pulser handles coarse-grain stainless and Inconel cladding survey work that 0.5 MHz minimum on cheaper boxes cannot resolve.',
    'DAC/TCG/DGS curves all native, with up to six curves stored per setup — covers EN 583-2 and ASME V Article 4 Appendix N requirements without firmware add-ons.',
    'Strong used-market resale: a 4-year-old EPOCH 650 still trades around $6,500-$7,500, the highest residual in the mid-range conventional UT category.',
  ],
  cons: [
    'No phased-array. For weld coverage with a single setup or corrosion mapping, you need a separate PA box (OmniScan X3, Topaz PA) — call it a $35k+ adder.',
    'Software UI is a 2014-era menu tree — fast once memorized, but new techs need ~8 hours of bench time to get comfortable. Newer USM 100 has a more modern touchscreen.',
    'Replacement battery list price is ~$425 each — two-battery kit for full-shift redundancy adds ~$850 to TCO.',
    'No built-in WiFi or Bluetooth. Data transfer is USB or SD card. For real-time cloud sync workflows you have to wrap it with a tablet or separate gateway.',
    'Encoder input is single-axis only. C-scan mapping requires the EPOCH 1000i or a PA unit — EPOCH 650 is strictly A-scan.',
    'Discontinued in some configurations as of late 2024; Evident is steering buyers to the newer EPOCH 6LT and OmniScan X3 — parts and service are still solid but spec the box you order carefully.',
  ],
  bestFor: [
    'Fabrication-shop AWS D1.1 / D1.5 weld inspection where the inspector needs a portable A-scan with scoring software and zero phased-array overhead.',
    'Field thickness surveys and corrosion-under-insulation (CUI) checks where IP66 ruggedness and 15+ hour battery life matter more than scan area.',
    'Refinery turnaround crews running ASME V Article 4 manual UT on piping welds — DGS/DAC native, fast calibration, hot-swap battery covers double shifts.',
    'Training fleets at Level II certification schools — robust hardware, predictable menus, large used-market inventory for spare units.',
  ],
  notIdealFor: [
    'Corrosion mapping or weld-coverage scanning — A-scan only, no encoded C-scan capability.',
    'Phased-array or TOFD inspections — no PA pulser, no FMC/TFM capability.',
    'Composite or coarse-grain forging volumetric where TFM or low-frequency PA is needed.',
    'Cloud-first inspection workflows where real-time data streaming to a dashboard is mandatory — no native wireless.',
  ],
  alternatives: [
    { make: 'GE / Baker Hughes', model: 'Krautkramer USM Go+', reason: 'Lighter (0.9 kg) and smaller pocket form factor, good for rope-access and high-reach work, but shorter battery life and slightly less software depth on AWS D1.1.' },
    { make: 'Sonatest', model: 'Veo+ (PA)', reason: 'If you can stretch budget to ~$28k MSRP you get 16:64 phased-array plus conventional UT in one box — better long-term value for weld-heavy shops.' },
    { make: 'GE / Baker Hughes', model: 'Krautkramer USM 100', reason: 'Modern touchscreen UI, similar spec class, often $1-2k cheaper street price — main tradeoff is smaller installed base and slightly thinner third-party setup library.' },
  ],
  certificationCompatibility: [
    'EN 12668-1:2010 — conformity of UT instruments (manufacturer self-certified with test report)',
    'ASME BPVC Section V, Article 4 — ultrasonic examination of welds in pressure vessels',
    'ASME BPVC Section V, Article 5 — ultrasonic examination of materials other than welds',
    'AWS D1.1/D1.1M Structural Welding Code — Steel (Section 6 UT)',
    'API 5UE — recommended practice for ultrasonic evaluation of pipe imperfections',
    'ASTM E164 — practice for contact UT examination of weldments',
    'ASTM E317 — evaluating performance characteristics of UT pulse-echo systems',
    'ISO 22232-1 — UT equipment characterization (with appropriate calibration block set)',
  ],
  faqs: [
    {
      q: 'Is the EPOCH 650 still in production in 2026?',
      a: 'Evident (formerly Olympus Scientific Solutions) lists the EPOCH 650 as a current-production model but is actively positioning the EPOCH 6LT and the OmniScan X3 64 as successors for new buyers. Spare parts, calibration services, and firmware updates are still supported through Evident service centers and authorized partners worldwide, and dealer stock is generally available with 4-6 week lead times. If you are buying new in 2026, confirm with your local Evident representative whether the configuration you need (e.g. transflective vs full-VGA display, optional encoder, AWS D1.1 software) is still orderable or whether you are looking at end-of-life inventory [1].',
    },
    {
      q: 'How does the EPOCH 650 compare to the Krautkramer USM Go+ for fabrication-shop weld inspection?',
      a: 'Both are 0.5-20 MHz class conventional flaw detectors and both meet EN 12668-1 and ASME V. The EPOCH 650 wins on battery life (15.5 hr vs ~8 hr), display size (5.7 in vs 3.5 in), and software depth — its AWS D1.1 scoring and DAC/TCG/DGS suite are more granular than the USM Go+. The USM Go+ wins on weight (0.9 kg vs 1.7 kg) and pocket-form portability, which matters for rope-access and tank-roof work. For a fab-shop bench or a refinery turnaround cart, the EPOCH 650 is the more productive tool. For wind-turbine blade inspection at 80 m height in harness, the USM Go+ is the right pick [1][2].',
    },
    {
      q: 'Can the EPOCH 650 run TOFD or phased-array probes?',
      a: 'No. The EPOCH 650 is a single-channel conventional pulse-echo flaw detector. It cannot drive multi-element PA probes or run TOFD (which requires synchronized pitch-catch electronics and dedicated software). For TOFD you need an OmniScan MX2 or X3, a Sonatest Veo+, or a Zetec Topaz PA. The EPOCH 650 will work with TOFD probes as conventional single-element probes (one tx, one rx), but you lose the parallel-scan TOFD imaging that makes the technique valuable for weld root inspection [3].',
    },
    {
      q: 'What calibration blocks should I buy with an EPOCH 650 for ASME V weld inspection?',
      a: 'For ASME BPVC Section V, Article 4 manual UT on welds, the standard reference set is an IIW V1 block (ISO 2400 / EN 12223 geometry) for angle and velocity calibration plus a basic ASME calibration block matching the production thickness, with side-drilled holes per Article 4 T-434.2. For thin-wall piping (under 1 inch) the IIW V2 (ISO 7963) block is more practical at site. Budget around $850-$1,200 for a V1 carbon steel block from Sonatest or PH Tool, plus $400-$600 for the V2. If you also do AWS D1.1 work, add a Type DSC (Distance/Sensitivity Calibration) block [4][5].',
    },
    {
      q: 'What is realistic delivered MSRP and used-market price for an EPOCH 650 in 2026?',
      a: 'New from Evident or an authorized dealer, the EPOCH 650 typically delivers between $10,500 and $12,500 USD depending on configuration (display type, AWS D1.1 software, encoder kit, second battery, hard transit case). The OEM list price is around $11,500 for the standard kit. Used-market pricing through resellers like ETSS, GageMaker, or eBay business sellers ranges $5,500-$8,500 for 3-6 year old units in working condition with calibration certificate. A unit at $6,500 with a recent EN 12668 verification cert is a fair number — below $5,000 expect screen wear or battery replacement cost.',
    },
  ],
  internalLinks: [
    { href: '/methods/ultrasonic-testing', label: 'Ultrasonic testing method overview', context: 'The EPOCH 650 is a conventional pulse-echo instrument; see our ultrasonic testing method overview for technique selection.' },
    { href: '/equipment/olympus-omniscan-x3', label: 'Olympus OmniScan X3 review', context: 'If you need phased-array on the same fleet, the OmniScan X3 is the natural step up from the EPOCH 650.' },
    { href: '/equipment/ge-krautkramer-usm-go-plus', label: 'GE Krautkramer USM Go+ review', context: 'The main competitor in the mid-range conventional UT category; lighter but less software depth.' },
    { href: '/equipment/iiw-v1-block', label: 'IIW V1 calibration block', context: 'Standard reference block for angle and velocity calibration on the EPOCH 650.' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'The EPOCH 650 is fully compliant with ASME V Article 4 manual UT requirements.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1 structural welding code', context: 'The EPOCH 650 includes native AWS D1.1 scoring software for structural weld inspection.' },
    { href: '/learn/ut-calibration-procedure', label: 'UT calibration step-by-step', context: 'Walkthrough of EPOCH 650 calibration on a V1 block before a weld inspection shift.' },
    { href: '/tools/ut-thickness-calculator', label: 'UT thickness calculator', context: 'Cross-check EPOCH 650 thickness readings against minimum allowable wall.' },
    { href: '/methods/phased-array-ultrasonic-testing', label: 'Phased array UT', context: 'When EPOCH 650 A-scan is not enough — when to move to PAUT.' },
  ],
  citations: [
    { id: 'olympus-epoch-650-datasheet', source: 'Evident (Olympus), EPOCH 650 Ultrasonic Flaw Detector datasheet, Rev. 2023-04', url: 'https://www.olympus-ims.com/en/ut-flaw-detectors/epoch650/' },
    { id: 'olympus-usm-go-plus-datasheet', source: 'Baker Hughes / Waygate Technologies, USM Go+ Ultrasonic Flaw Detector technical specification, Rev. 2022', url: 'https://www.bakerhughes.com/waygate-technologies' },
    { id: 'en-12668-1', source: 'EN 12668-1:2010, Non-destructive testing — Characterization and verification of ultrasonic examination equipment — Part 1: Instruments' },
    { id: 'asme-bpvc-v-art-4', source: 'ASME BPVC Section V, Article 4 (2023), Ultrasonic Examination Methods for Welds' },
    { id: 'aws-d1-1', source: 'AWS D1.1/D1.1M:2020, Structural Welding Code — Steel, Section 6 Inspection (Part F, UT)' },
    { id: 'astm-e164', source: 'ASTM E164-19, Standard Practice for Contact Ultrasonic Testing of Weldments' },
  ],
};

export default equipment;
