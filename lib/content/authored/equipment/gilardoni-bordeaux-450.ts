import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'gilardoni-bordeaux-450',
  make: 'Gilardoni',
  model: 'Bordeaux RX 450',
  category: 'other',
  metaTitle: 'Gilardoni Bordeaux 450 Review: 450 kV X-ray Generator',
  metaDescription:
    'Gilardoni Bordeaux 450 review — 450 kV constant potential X-ray unit for industrial RT up to 80 mm steel, ASME V/ISO 17636-1, ~$85k MSRP.',
  heroLede:
    'The Gilardoni Bordeaux RX 450 is an Italian-made 450 kV constant-potential industrial X-ray generator built for pressure-vessel and pipeline weld radiography on steel thicknesses up to roughly 80 mm. Compared to the more common 300 kV class units (Baltograph, Yxlon MU 300), the Bordeaux 450 extends practical RT into thick-wall vessel work and heavy structural welds without forcing a switch to Co-60 gamma sources. Constant-potential (CP) generation produces a cleaner X-ray spectrum than older self-rectified units, which translates to better image contrast on slag and porosity defects per the ASME V Article 2 and ISO 17636-1 sensitivity requirements [1].',
  msrpUSD: 85000,
  rentalPerWeekUSD: 3200,
  specs: {
    caption: 'Gilardoni Bordeaux RX 450 — key specs (manufacturer datasheet, 2022) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['kV range', '90 – 450 kV (constant potential)'],
      ['Tube current', '1 – 10 mA continuous'],
      ['Focal spot (nominal)', '3.0 × 3.0 mm (per EN 12543)'],
      ['Beam angle', '40° conical'],
      ['Steel penetration capability', '~80 mm (3.1 in) practical maximum'],
      ['Cooling', 'Forced oil + air (closed loop)'],
      ['Duty cycle (450 kV / 10 mA)', '100% continuous at rated conditions'],
      ['Generator weight', '~280 kg (head + tank assembly)'],
      ['Control unit', 'Microprocessor with kV/mA/time set, exposure presets'],
      ['Power supply', '230 VAC single-phase, 16 A; or 400 VAC three-phase'],
      ['Operating temperature', '–5 °C to +40 °C'],
      ['Safety', 'Dual-redundant exposure interlock, last-meter dose monitor'],
      ['Compliance', 'EN 12679, IEC 61010, ASME V Article 2 compatible'],
    ],
  },
  pros: [
    'Constant-potential generation produces cleaner spectrum and better image contrast than pulsed or self-rectified units of similar kV.',
    '100% duty cycle at rated 450 kV / 10 mA — designed for high-volume production radiography, not just spot shots.',
    '80 mm steel penetration capability covers most pressure vessel and structural weld thicknesses without resorting to Co-60.',
    'Microprocessor-controlled exposure parameters with stored presets — repeatable shot-to-shot output for procedure qualification.',
    'Solid Italian engineering with strong build quality — Gilardoni equipment regularly stays in service 15+ years.',
    'Lower personnel-radiation risk profile than equivalent gamma source for vault-based shop RT (X-ray off when not energized).',
  ],
  cons: [
    'Cost: $85k MSRP for the generator plus $30-50k for vault shielding and accessories. Total turnkey shop RT install $130-180k.',
    'Generator weight (~280 kg) makes the unit semi-portable at best — not a field unit. Permanent or semi-permanent vault installation.',
    'Italy-based service — North American service support routes through Gilardoni partners or back to Italy. Plan service intervals carefully.',
    '450 kV is below the ~1.25 MeV equivalent of Co-60 gamma — for steel above 80 mm or in field conditions without vault, gamma is still required.',
    'Smaller North American installed base than Yxlon, Comet, or older GE / Eresco units — fewer trained operators familiar with Bordeaux UI.',
    'Power supply requirements (230 VAC / 16 A or 400 VAC three-phase) need a dedicated circuit — not plug-and-play to a standard 120 VAC outlet.',
  ],
  bestFor: [
    'High-volume pressure vessel fabrication shops doing RT on 25-80 mm steel welds in a permanent vault.',
    'Pipe spool fabrication for power, petrochemical, and refinery projects where 100% RT is the contractual requirement.',
    'Inspection contractors building dedicated RT vaults serving multiple client fabrication scopes.',
    'Programs migrating away from Co-60 gamma to reduce regulatory and personnel-radiation overhead — Bordeaux 450 covers the thickness range Co-60 used to handle.',
  ],
  notIdealFor: [
    'Field radiography on remote pipelines or offshore platforms — not portable enough; use Ir-192 or Se-75 portable sources instead.',
    'Very thin material (sub-3 mm aluminum, brazed assemblies) — kV does not go low enough for optimal contrast; use lower-kV X-ray cabinet.',
    'Steel thicknesses above 80 mm — Co-60 gamma or megavolt X-ray (linacs) are the right tool above that range.',
    'Small jobs that do not justify vault infrastructure — gamma source with crawler is cheaper for occasional field work.',
  ],
  alternatives: [
    { make: 'Yxlon (Comet)', model: 'MU60 / MU 320', reason: 'German alternative with comparable kV range, stronger North American service network — but newer pulsed-CP designs may have slightly more complex maintenance.' },
    { make: 'Comet', model: 'IOX 225', reason: 'Lower-kV (225 kV) but compact and portable — better for small-bore pipe weld RT under 25 mm steel.' },
    { make: 'Ir-192 source (e.g. SENTINEL 880 Delta)', model: 'gamma alternative', reason: 'Portable gamma for field RT on steel up to ~75 mm — different regulatory profile, less controlled spectrum but no power supply needed.' },
  ],
  certificationCompatibility: [
    'ASME BPVC Section V, Article 2 — radiographic examination of welds',
    'ASME B31.1 / B31.3 — power and process piping RT requirements',
    'AWS D1.1 — structural welding code RT inspection',
    'API 1104 — pipeline girth weld RT',
    'EN ISO 17636-1 — radiographic testing of welded joints with X-ray films',
    'EN ISO 17636-2 — RT with digital detectors (DDA/CR)',
    'EN 12543 — X-ray tube focal spot characterization',
    'IEC 61010 — safety requirements for electrical equipment for measurement / control / lab use',
  ],
  faqs: [
    {
      q: 'Why choose 450 kV X-ray over Co-60 gamma for thick-wall vessel RT?',
      a: 'Three reasons. First, X-ray produces a more controllable spectrum with better contrast on small defects (porosity, fine cracks) than Co-60 gamma at equivalent penetration. Second, X-ray is off when not energized — no radiation source to secure when the shift ends, far simpler radiation safety officer (RSO) workload. Third, 450 kV X-ray sensitivity per ISO 17636-1 Class B is achievable on 25-80 mm steel, while Co-60 typically only meets Class A. Tradeoff: 450 kV X-ray requires vault infrastructure ($30-50k), Co-60 is portable. For shop-based high-volume RT, the 450 kV X-ray pays back fast. For occasional field work, gamma still wins on portability [1][2].',
    },
    {
      q: 'What vault and shielding requirements does a Bordeaux 450 install need?',
      a: 'Per NRC and US Department of Health and Human Services guidance for industrial X-ray at 450 kV / 10 mA, primary barriers typically require 6-8 inches of lead-equivalent concrete or 1.5-2 inches of solid lead. Secondary barriers (skyshine, scatter) need 2-3 inches lead equivalent. Vault interlocks must be dual-redundant per ANSI N43.3. A typical 3 m × 4 m × 3 m vault with 6-inch lead-lined concrete walls runs $30k-$50k turnkey including interlocks, warning lights, and dose-rate monitoring. State radiation control programs (most states have agreement-state authority) review the vault design before commissioning. Plan 8-12 weeks from order to operational commissioning [3][4].',
    },
    {
      q: 'What is the realistic shot time for a typical RT exposure with the Bordeaux 450?',
      a: 'Shot time depends on steel thickness, kV setting, source-to-film distance (SFD), and film/DDA system used. For a 25 mm carbon steel weld at 320 kV / 5 mA with 700 mm SFD using Class C-5 industrial film, expect ~2 minutes exposure. For 50 mm steel at 400 kV / 8 mA, ~4 minutes. For 80 mm steel at 450 kV / 10 mA, ~8-12 minutes. With a digital detector array (DDA), shot times drop to 30-90 seconds for equivalent thicknesses due to higher detector efficiency — that workflow productivity gain is a major reason DDA is replacing film in pressure-vessel shops. Always run a procedure-qualification exposure on a representative test block before production RT [1][2].',
    },
    {
      q: 'What is the total cost of ownership for a Bordeaux 450 over 10 years?',
      a: 'Initial install: $85k generator + $40k vault + $15k DDA or film processor = $140k. Annual electricity: ~$2,500 at moderate duty. Annual EN 12543 focal spot verification: $1,500. Annual interlock and dose monitor calibration: $2,000. X-ray tube replacement at year 7-10: ~$25k. Operator dosimetry, NRC licensing, RSO fees: $5,000/year. Total 10-year TCO: roughly $230k-$270k for a high-utilization shop. Throughput: a single Bordeaux 450 vault can handle 800-1,500 RT shots per year at 100% duty. Cost per shot: ~$170-$330, well below the $400-$600 per shot of contracted field RT. Payback is typically 3-5 years for shops with >500 RT shots/year demand [1].',
    },
  ],
  internalLinks: [
    { href: '/methods/radiographic-testing', label: 'Radiographic testing overview', context: 'Method overview — when X-ray vs gamma is the right choice.' },
    { href: '/equipment/yxlon-mu60', label: 'Yxlon MU60', context: 'Competing European X-ray generator in similar kV class.' },
    { href: '/equipment/comet-iox-225', label: 'Comet IOX 225', context: 'Lower-kV alternative for thin-wall and small-bore pipe RT.' },
    { href: '/equipment/ir-192-source', label: 'Ir-192 gamma source', context: 'Portable gamma alternative for field RT.' },
    { href: '/equipment/co-60-source', label: 'Co-60 gamma source', context: 'Gamma alternative for thick-wall RT above 80 mm.' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'Bordeaux 450 is compliant with Article 2 RT requirements.' },
    { href: '/standards/iso-17636', label: 'ISO 17636 radiographic testing of welds', context: 'European RT standard supported by the Bordeaux 450.' },
    { href: '/learn/rt-vault-design', label: 'RT vault design considerations', context: 'Vault shielding and interlocks required for Bordeaux 450 installation.' },
  ],
  citations: [
    { id: 'gilardoni-bordeaux-datasheet', source: 'Gilardoni S.p.A., Bordeaux RX 450 Constant-Potential X-Ray Generator datasheet, Rev. 2022', url: 'https://gilardoni.it/en/ndt' },
    { id: 'iso-17636-1', source: 'EN ISO 17636-1:2022, Non-destructive testing of welds — Radiographic testing — Part 1: X- and gamma-ray techniques with film' },
    { id: 'ansi-n43-3', source: 'ANSI N43.3-2008, General Radiation Safety — Installations Using Non-Medical X-Ray and Sealed Gamma-Ray Sources, Energies up to 10 MeV' },
    { id: 'nrc-10-cfr-20', source: 'US NRC 10 CFR Part 20, Standards for Protection Against Radiation' },
    { id: 'asme-v-art-2', source: 'ASME BPVC Section V, Article 2 (2023), Radiographic Examination' },
  ],
};

export default equipment;
