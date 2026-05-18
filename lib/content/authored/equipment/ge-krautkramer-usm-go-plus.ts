import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'ge-krautkramer-usm-go-plus',
  make: 'Baker Hughes / Waygate Technologies (formerly GE / Krautkramer)',
  model: 'USM Go+',
  category: 'flaw-detector',
  metaTitle: 'Krautkramer USM Go+ Review: Pocket UT Flaw Detector',
  metaDescription:
    'USM Go+ review: 0.5-20 MHz portable UT, 0.9 kg pocket form, IP67, AWS D1.1, ~$9k MSRP. Where it beats the EPOCH 650 and where it does not.',
  heroLede:
    'The Krautkramer USM Go+ (now sold under the Waygate Technologies / Baker Hughes brand) is the pocket-form conventional UT flaw detector specified by rope-access technicians, wind-blade inspectors, and refinery rigging crews who cannot afford the bulk of an EPOCH 650. At 0.9 kg with 8-hour battery life, it is one of the lightest fully code-compliant A-scan instruments on the market — EN 12668-1, ASME V, AWS D1.1, ASTM E164 all supported. Tradeoff: smaller 3.5 in display, shorter battery life than EPOCH 650, slightly thinner DAC/TCG software depth. For inspectors who carry the instrument in harness for hours, the weight savings dominates [1].',
  msrpUSD: 9200,
  rentalPerWeekUSD: 425,
  specs: {
    caption: 'Waygate USM Go+ — key specs (Baker Hughes datasheet, 2022) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['Frequency range (pulser)', '0.5 – 20 MHz (–3 dB)'],
      ['Pulser type', 'Square wave, 50/120/350 V'],
      ['Pulse repetition frequency', '15 – 1000 Hz'],
      ['Gain range', '0 – 110 dB (0.1 dB steps)'],
      ['Display', '3.5 in (89 mm) color LCD, 320 × 240, transflective'],
      ['Weight (with battery)', '0.9 kg (2.0 lb)'],
      ['Dimensions', '171 × 121 × 51 mm'],
      ['IP rating', 'IP67 dust/water'],
      ['Battery life', '~8 hr typical (Li-ion)'],
      ['Operating temperature', '–10 °C to +55 °C'],
      ['Storage', '500 MB internal + micro-SD'],
      ['Connectivity', 'USB, RS-232'],
      ['Material velocity', '1000 – 15000 m/s'],
      ['Compliance', 'EN 12668-1, ASTM E317, ASTM E164'],
    ],
  },
  pros: [
    '0.9 kg pocket form factor — half the weight of EPOCH 650, transformative for rope-access and high-reach work.',
    'IP67 rating exceeds EPOCH 650 (IP66) — survives full submersion briefly, valid for marine and splash-zone work.',
    'AWS D1.1 scoring software included as standard — auto-rates indications without external spreadsheet.',
    'DGS/AVG and DAC curves native, with up to 4 curves stored — sufficient for ASME V Article 4 work.',
    'Transflective display works in direct sunlight without sunshade — practical advantage for tank-top and pipeline work.',
    'Operating temperature range extends to +55 °C — verified usable in Saudi Aramco summer field conditions.',
  ],
  cons: [
    '3.5 in display is small for detailed waveform analysis — older techs with bifocals find it harder to read than EPOCH 650.',
    'Battery life of 8 hr requires a swap for full 12-hour shift — slightly worse than EPOCH 650 at 15.5 hr.',
    'Single-channel only, no PA, no TOFD, no encoder — pure A-scan instrument.',
    'Software UI uses joypad navigation, no touchscreen — fast for veterans but counter-intuitive for newer techs trained on touchscreens.',
    'Limited internal storage (~500 MB) versus EPOCH 650 (2 GB) — files fill fast on high-volume weld inspection days.',
    'Resale market is thinner than EPOCH 650; expect 50-60% retention at 3 years.',
  ],
  bestFor: [
    'Rope-access and wind-turbine blade inspection where weight in harness is the binding constraint.',
    'Refinery shutdown crews needing a backup or supplementary instrument to a primary EPOCH 650 fleet.',
    'Field thickness gauging and CUI surveys where the inspector walks miles of pipe per shift.',
    'Aerospace MRO line work where AWS D17.1 / ASTM E114 conventional UT on small components fits the screen size.',
  ],
  notIdealFor: [
    'Code-compliant phased-array or TOFD weld inspection — single-channel A-scan only.',
    'Forensic indication review where large display real estate matters — EPOCH 650 or X3 are better for that.',
    'High-volume shop-bench weld inspection where battery life and display size matter more than weight.',
    'Cloud-first inspection programs — no native WiFi.',
  ],
  alternatives: [
    { make: 'Olympus (Evident)', model: 'EPOCH 650', reason: 'Larger display, longer battery, deeper software — but nearly 2× the weight. Better for bench/shop, worse for rope-access.' },
    { make: 'Baker Hughes / Waygate', model: 'USM 100', reason: 'Same Waygate family with larger touchscreen, modern UI — heavier (1.5 kg) and pricier but better for fab-shop bench use.' },
    { make: 'Sonatest', model: 'Masterscan D-70', reason: 'UK alternative conventional UT with strong DAC suite, mid-weight (~1.2 kg), competitive price.' },
  ],
  certificationCompatibility: [
    'EN 12668-1:2010 — UT instrument characterization',
    'ASME BPVC Section V, Article 4 — manual ultrasonic examination of welds',
    'ASME BPVC Section V, Article 5 — UT of materials other than welds',
    'AWS D1.1/D1.1M — structural welding code UT (Section 6)',
    'ASTM E164 — contact UT of weldments',
    'ASTM E317 — UT pulse-echo system performance evaluation',
    'ASTM E797 — UT thickness gauging using contact pulse-echo',
    'API 5UE — pipe imperfection UT evaluation',
  ],
  faqs: [
    {
      q: 'Is the USM Go+ still being produced under Waygate / Baker Hughes branding?',
      a: 'Yes. After the 2017 GE Oil & Gas spin-off and the subsequent renaming under Baker Hughes, the Krautkramer NDT product line is now sold under the Waygate Technologies brand. The USM Go+ remains a current-production model with full firmware support, calibration services, and probe ecosystem availability through Waygate authorized partners. New units typically ship in 4-6 weeks from Houston or Hürth (Germany) warehouses. If you see "GE Krautkramer USM Go+" branding on a used unit, that is the same hardware sold pre-2018 — Waygate honors firmware updates back to the original release [1].',
    },
    {
      q: 'How does the USM Go+ compare to the EPOCH 650 for AWS D1.1 fab-shop weld inspection?',
      a: 'Both meet AWS D1.1 Section 6 requirements and both include native scoring software. The EPOCH 650 has a larger display (5.7 in vs 3.5 in), longer battery (15.5 hr vs 8 hr), and slightly deeper DAC/TCG curve storage (6 vs 4). The USM Go+ is half the weight and IP67 versus IP66. For a fab-shop bench inspector who sits at a station, the EPOCH 650 is the more productive tool. For an outside-fit-up inspector who walks the entire structure with the instrument in hand, the USM Go+ weight savings is decisive. Many shops run mixed fleets — EPOCH 650 at the bench, USM Go+ for field walk-downs [1][2].',
    },
    {
      q: 'Can the USM Go+ do thickness gauging accurately enough for API 510 / API 570 inspection records?',
      a: 'Yes, when paired with a dual-element thickness probe (e.g. Krautkramer DA-301 0.5 in dia, 5 MHz) and properly calibrated to ASTM E797, the USM Go+ produces thickness readings accurate to ±0.025 mm on carbon steel, well within API 510 and API 570 record-keeping tolerance. Calibration on a step block per ASTM E797 takes 2 minutes. For corrosion-mapping C-scans, you need a separate encoded thickness gauge or a PA box, but for spot-thickness surveys at TML (thickness monitoring locations) per API 570 §6.3, the USM Go+ is fully fit for purpose [3][4].',
    },
    {
      q: 'What is the realistic delivered cost of a new USM Go+ kit in 2026?',
      a: 'A new USM Go+ kit with the instrument, two batteries, charger, hard transit case, and one calibration certificate typically delivers at $9,000-$10,500 USD from a Waygate dealer in North America. Add a 5 MHz, 12 mm single-element angle probe set (45°, 60°, 70° with wedges) for $1,800-$2,400. Add a dual-element thickness probe for $650-$900. A working starter kit lands around $11,500-$13,500. Used-market pricing through resellers ranges $5,500-$7,000 for 3-5 year old units with current calibration [1].',
    },
  ],
  internalLinks: [
    { href: '/methods/ultrasonic-testing', label: 'Ultrasonic testing overview', context: 'Method overview — when conventional UT (USM Go+ class) is the right call vs PA.' },
    { href: '/equipment/olympus-epoch-650', label: 'Olympus EPOCH 650', context: 'Heavier alternative with bigger display and longer battery — direct competitor.' },
    { href: '/equipment/iiw-v1-block', label: 'IIW V1 calibration block', context: 'Standard calibration block for USM Go+ angle calibration.' },
    { href: '/equipment/iiw-v2-block', label: 'IIW V2 calibration block', context: 'Smaller V2 block for site calibration with USM Go+.' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'The USM Go+ is fully compliant with ASME V Article 4 manual UT.' },
    { href: '/standards/api-510', label: 'API 510 pressure vessel inspection', context: 'API 510 thickness monitoring procedures supported on USM Go+.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1 structural welding code', context: 'USM Go+ has native AWS D1.1 scoring software.' },
    { href: '/learn/ut-calibration-procedure', label: 'UT calibration procedure', context: 'Step-by-step calibration on USM Go+.' },
  ],
  citations: [
    { id: 'waygate-usm-go-plus-datasheet', source: 'Baker Hughes / Waygate Technologies, USM Go+ Ultrasonic Flaw Detector datasheet, Rev. 2022', url: 'https://www.bakerhughes.com/waygate-technologies/ndt-equipment' },
    { id: 'olympus-epoch-650-datasheet', source: 'Evident (Olympus), EPOCH 650 datasheet, Rev. 2023-04 (for comparative spec context)' },
    { id: 'astm-e797', source: 'ASTM E797/E797M-21, Standard Practice for Measuring Thickness by Manual Ultrasonic Pulse-Echo Contact Method' },
    { id: 'api-570', source: 'API 570, 5th ed. (2023), Piping Inspection Code, §6.3 Thickness Measurement Locations' },
    { id: 'en-12668-1', source: 'EN 12668-1:2010, NDT — Characterization and verification of UT equipment — Part 1: Instruments' },
  ],
};

export default equipment;
