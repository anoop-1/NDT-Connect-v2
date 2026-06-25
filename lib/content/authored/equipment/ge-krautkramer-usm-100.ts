import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'ge-krautkramer-usm-100',
  make: 'Baker Hughes / Waygate Technologies (formerly GE / Krautkramer)',
  model: 'USM 100',
  category: 'flaw-detector',
  metaTitle: 'Krautkramer USM 100 Review, Specs & Price (UT Flaw Detector)',
  metaDescription:
    'USM 100 review: 7 in touchscreen UT flaw detector, 0.2-26 MHz, IP67, ASME V / AWS D1.1, ~$12k MSRP. Modern UI alternative to EPOCH 650.',
  heroLede:
    'The Waygate USM 100 is the modern touchscreen successor in the Krautkramer conventional UT line, positioned head-to-head against the Olympus EPOCH 650. Where the EPOCH 650 inherits 2014-era menu-tree UX, the USM 100 brings a 7-inch capacitive touchscreen, gesture-based controls, and a markedly steeper modernization of the workflow — closer to using a tablet than a 1990s flaw detector. Spec sheet is comparable: 0.2-26 MHz pulser, EN 12668-1 compliant, ASME V Article 4 ready, AWS D1.1 software, IP67 ruggedization. Where the USM 100 wins: UI speed for new techs and modern data connectivity. Where it loses: smaller US installed base and slightly thinner third-party probe ecosystem than the Olympus / Evident world [1].',
  msrpUSD: 12500,
  rentalPerWeekUSD: 550,
  specs: {
    caption: 'Waygate USM 100 — key specs (Baker Hughes datasheet, 2023) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['Frequency range (pulser)', '0.2 – 26 MHz (–3 dB)'],
      ['Pulser type', 'Square wave, 50/200/400 V'],
      ['Pulse repetition frequency', '15 – 2000 Hz'],
      ['Gain range', '0 – 110 dB (0.1 / 0.2 / 0.5 / 1.0 / 2.0 / 6.0 dB steps)'],
      ['Display', '7 in (178 mm) capacitive touchscreen, 800 × 480 transflective'],
      ['Weight', '1.5 kg (3.3 lb)'],
      ['Dimensions', '226 × 159 × 56 mm'],
      ['IP rating', 'IP67'],
      ['Battery life', '~9 hr typical (Li-ion, hot-swap)'],
      ['Operating temperature', '–10 °C to +55 °C'],
      ['Storage', '32 GB internal + SD card'],
      ['Connectivity', 'WiFi, Ethernet, USB, HDMI'],
      ['Compliance', 'EN 12668-1, ASTM E317, ASTM E164, AWS D1.1'],
      ['Curve types', 'DAC, TCG, DGS/AVG, up to 8 stored'],
    ],
  },
  pros: [
    '7-inch touchscreen with gesture control — closest thing to "using a tablet for UT" in the conventional category. New techs onboard in ~4 hours vs ~8 hr on EPOCH 650.',
    'Native WiFi and Ethernet — directly pushes inspection reports to a network folder or cloud bucket without USB intermediary.',
    'IP67 rating exceeds EPOCH 650 (IP66) — better for marine and offshore splash exposure.',
    '0.2 MHz low-end pulser is the lowest in the conventional category — handles coarse-grain austenitic stainless and weld overlay survey work.',
    '8 stored DAC/TCG/DGS curves — more than EPOCH 650 (6) and USM Go+ (4), useful for multi-thickness vessel inspections.',
    'Hot-swap battery with 9 hr life — combined with modern UI, less productivity drag than EPOCH 650 for new operators.',
  ],
  cons: [
    'US installed base is smaller than EPOCH 650 — fewer trained operators in the labor market and fewer rental units available.',
    'Capacitive touchscreen does not respond well to thick winter gloves — outside North Sea winter ops, plan for thin-glove operation.',
    'Battery life of 9 hr is shorter than EPOCH 650 (15.5 hr) — surprising given the more modern design.',
    'Third-party calibration service ecosystem is thinner than Olympus — most service routes back to Waygate centers.',
    'Resale value retention is solid but not class-leading; 3-year units trade at ~55-65% of new.',
    'No native phased-array — strictly conventional A-scan like EPOCH 650 and USM Go+.',
  ],
  bestFor: [
    'Inspection contractors modernizing fleets and prioritizing operator UX and data connectivity over installed-base familiarity.',
    'Power generation and nuclear inspection where Waygate has deeper historical relationships and certifications.',
    'Bench-shop fab inspection where the 7-inch screen and modern UI win productivity over the EPOCH 650 menu tree.',
    'Refinery turnarounds standardizing on a Baker Hughes / Waygate vendor ecosystem (Mentor UT, USM 100, etc.).',
  ],
  notIdealFor: [
    'Phased-array, TOFD, or encoded scanning — single-channel conventional UT only.',
    'Rope-access and rigging work where 1.5 kg is still too heavy — use the USM Go+ (0.9 kg) instead.',
    'Shops standardized on Olympus/Evident — mixing OEMs adds training and spares cost.',
    'Sub-zero outdoor work where the touchscreen response with thick gloves matters.',
  ],
  alternatives: [
    { make: 'Olympus (Evident)', model: 'EPOCH 650', reason: 'Longer battery life, larger US installed base — but older menu UI and slightly larger physical footprint.' },
    { make: 'Baker Hughes / Waygate', model: 'USM Go+', reason: 'Same Waygate family but pocket-form, half the weight — better for high-reach and rope-access work.' },
    { make: 'Sonatest', model: 'Masterscan D-70', reason: 'UK alternative with mid-weight conventional UT and strong DAC/AVG suite at competitive price.' },
  ],
  certificationCompatibility: [
    'EN 12668-1:2010 — UT instrument characterization',
    'ASME BPVC Section V, Article 4 — manual ultrasonic examination of welds',
    'ASME BPVC Section V, Article 5 — UT of materials other than welds',
    'AWS D1.1/D1.1M — structural welding code UT inspection',
    'API 5UE — pipe imperfection UT evaluation',
    'ASTM E164 — contact UT of weldments',
    'ASTM E317 — UT pulse-echo system performance evaluation',
    'ASTM E797 — contact pulse-echo thickness gauging',
  ],
  faqs: [
    {
      q: 'Is the USM 100 worth the price premium over the EPOCH 650?',
      a: 'Street prices are within $1,000 of each other — USM 100 typically $12k-$13.5k, EPOCH 650 $11k-$12.5k — so the price gap is small. The real decision is ecosystem and UX. If your crew has 10 years of EPOCH muscle memory and your customers spec Olympus by name, the EPOCH 650 is the safer choice. If you are building a fleet from scratch with new techs and want modern UI, WiFi sync, and Waygate Mentor ecosystem alignment, the USM 100 is the better forward-looking pick. Both meet the same codes. Most large refinery contractors run both because customers spec different models on different framework contracts [1][2].',
    },
    {
      q: 'How does the USM 100 touchscreen work in real-world field conditions?',
      a: 'The 7-inch capacitive touchscreen is bright (transflective, sunlight-readable) and gesture-based controls (pinch-to-zoom on waveforms, swipe between modes) feel intuitive. Limitation: capacitive technology does not respond well to thick gloves. In summer field conditions or with thin nitrile gloves, no issue. In North Sea winter with thick insulated work gloves, technicians often pull a glove finger off to operate the screen — annoying but not blocking. There is no resistive option. For very cold environments where thick gloves are mandatory, the EPOCH 650 joypad navigation is faster [1].',
    },
    {
      q: 'Does the USM 100 support TOFD or phased array probes?',
      a: 'No. The USM 100 is a single-channel conventional pulse-echo flaw detector — same architecture class as EPOCH 650 and USM Go+. For TOFD you need pitch-catch electronics with synchronized acquisition, and for PA you need multi-element pulser/receiver electronics. Neither is in the USM 100. If you need TOFD or PA on a Waygate ecosystem, you step up to the Mentor UT or the Phasor XS / Phasor DM lineage. For pure A-scan conventional UT meeting ASME V Article 4 manual requirements, the USM 100 is fully fit for purpose [1][3].',
    },
    {
      q: 'What is the typical service interval and calibration cost for a USM 100?',
      a: 'Waygate recommends annual EN 12668-1 verification calibration, which runs $450-$650 at a Waygate service center or authorized partner. Most refinery framework contracts require 6-month calibration intervals, doubling that cost. Probe calibration on V1 / V2 blocks is daily per ASME V Article 4 — that is operator-level, no service cost. The USM 100 has no required preventive maintenance beyond battery replacement (~2-3 years of daily use, $400 replacement battery). Typical 5-year TCO for an instrument running 5 days/week: ~$3,500 in service plus ~$800 in batteries on top of the original $12,500 purchase [1][4].',
    },
  ],
  internalLinks: [
    { href: '/methods/ultrasonic-testing', label: 'Ultrasonic testing overview', context: 'When conventional UT (USM 100 class) is the right method choice.' },
    { href: '/equipment/olympus-epoch-650', label: 'Olympus EPOCH 650', context: 'Closest competitor to the USM 100 — comparison guide.' },
    { href: '/equipment/ge-krautkramer-usm-go-plus', label: 'Krautkramer USM Go+', context: 'Same Waygate family, smaller pocket form.' },
    { href: '/equipment/iiw-v1-block', label: 'IIW V1 calibration block', context: 'Standard reference block for USM 100 angle calibration.' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'USM 100 is fully compliant with Article 4 manual UT.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1 structural welding', context: 'AWS D1.1 native scoring software on USM 100.' },
    { href: '/learn/ut-calibration-procedure', label: 'UT calibration procedure', context: 'Step-by-step calibration walkthrough on USM 100.' },
    { href: '/tools/ut-thickness-calculator', label: 'UT thickness calculator', context: 'Cross-check thickness readings against minimum allowable wall.' },
  ],
  citations: [
    { id: 'waygate-usm-100-datasheet', source: 'Baker Hughes / Waygate Technologies, USM 100 Ultrasonic Flaw Detector datasheet, Rev. 2023', url: 'https://www.bakerhughes.com/waygate-technologies/ndt-equipment' },
    { id: 'olympus-epoch-650-datasheet', source: 'Evident (Olympus), EPOCH 650 datasheet, Rev. 2023-04' },
    { id: 'asme-v-art-4', source: 'ASME BPVC Section V, Article 4 (2023), Ultrasonic Examination Methods for Welds' },
    { id: 'en-12668-1', source: 'EN 12668-1:2010, NDT — Characterization and verification of UT equipment — Instruments' },
    { id: 'aws-d1-1', source: 'AWS D1.1/D1.1M:2020, Structural Welding Code — Steel, Section 6 Inspection' },
  ],
};

export default equipment;
