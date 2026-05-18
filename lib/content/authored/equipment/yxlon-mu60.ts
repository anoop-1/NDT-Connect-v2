import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'yxlon-mu60',
  make: 'Yxlon (Comet Group)',
  model: 'SMART EVO 200/300 (formerly MU60-SE class)',
  category: 'other',
  metaTitle: 'Yxlon MU60 / SMART EVO X-ray Generator Review',
  metaDescription:
    'Yxlon MU60-class portable X-ray review: 300 kV constant-potential X-ray for field pipe RT up to 50 mm steel, ASME V / ISO 17636-1, ~$55k MSRP.',
  heroLede:
    'The Yxlon MU60 (now superseded by the SMART EVO 200 and SMART EVO 300 in current Yxlon catalogs) is a 300 kV class constant-potential portable X-ray unit, used worldwide for field pipeline and pressure-vessel weld radiography on steel up to ~50 mm. Where the Gilardoni Bordeaux 450 targets fixed-vault thick-wall work, the MU60/SMART EVO class is the portable workhorse — designed to roll up to a pipe spool yard, plug into a generator, and shoot. Yxlon is part of the Comet Group, with strong service infrastructure in North America (Yxlon USA, Akron OH) [1]. For field RT crews wanting X-ray-quality images without dragging an Ir-192 source through state regulations, this is the dominant choice [2].',
  msrpUSD: 55000,
  rentalPerWeekUSD: 2400,
  specs: {
    caption: 'Yxlon SMART EVO 300 (MU60-class) — key specs (Yxlon datasheet, 2023) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['kV range', '50 – 300 kV (constant potential)'],
      ['Tube current', '0.5 – 8 mA'],
      ['Focal spot (nominal)', '2.5 × 2.5 mm'],
      ['Beam angle', '40° conical (omni-directional option available)'],
      ['Steel penetration', '~50 mm (2 in) practical maximum'],
      ['Generator weight', '~28 kg head + 25 kg control unit'],
      ['Cooling', 'Air-cooled (forced)'],
      ['Duty cycle', '100% at rated conditions'],
      ['Power supply', '110/230 VAC, single-phase'],
      ['Operating temperature', '–20 °C to +50 °C (with cold-start kit)'],
      ['IP rating', 'IP54 (head), IP41 (control unit)'],
      ['Safety', 'Dual-circuit exposure interlock, key-lock, dose monitoring'],
      ['Compliance', 'EN 12679, ASME V Article 2, ISO 17636-1'],
      ['Cable lengths (head to control)', 'Standard 20 m, optional up to 50 m'],
    ],
  },
  pros: [
    '28 kg head is genuinely portable — two-person carry into pipeline ROW or refinery scaffolding without specialized rigging.',
    'Constant-potential generation gives 30-50% better contrast on porosity defects than equivalent-kV pulsed units.',
    '–20 °C cold-start capability with optional kit — operates in Canadian winter and North Slope conditions.',
    'Yxlon USA service (Akron, OH) provides 5-day cal turnaround and stocks spare tubes domestically — strong North American support.',
    'Wide kV range (50-300) covers thin aluminum brazing to 50 mm steel welds on the same unit.',
    'Omni-directional beam option (panoramic head) allows single-shot 360° pipe weld coverage — major productivity win on pipeline projects.',
  ],
  cons: [
    '300 kV ceiling limits steel penetration to ~50 mm — for thick-wall pressure vessels, you need the Bordeaux 450 or megavolt class.',
    'Cost: $55k MSRP for generator + $5-10k for safety enclosure + $10-15k for DDA = $70-80k field kit cost.',
    'Field RT regulatory burden: state radiation control authority registration, RSO certification, operator dosimetry per 10 CFR 20.',
    'Power supply needs a stable 110/230 VAC source — small jobsite generators with poor voltage regulation can damage the unit.',
    'Older MU60 units pre-SMART EVO have less polished UI and require manual exposure calculations — newer SMART EVO has stored presets.',
    'Yxlon discontinued the original MU60 model line in 2020; if buying new, you are buying SMART EVO; used MU60 units have limited parts support.',
  ],
  bestFor: [
    'Field pipeline weld radiography on 6-50 mm carbon steel where X-ray sensitivity is required over Ir-192 gamma.',
    'Pressure vessel field shop RT where vault infrastructure is not justified but pulsed shots on 20-50 mm steel are routine.',
    'Pipe spool fabrication shops doing semi-portable RT in temporary shielded enclosures.',
    'Aerospace and structural fab where X-ray contrast matters and material thickness is under 50 mm.',
  ],
  notIdealFor: [
    'Steel thickness above 50 mm — needs Bordeaux 450 or Co-60.',
    'Very small bore pipe (<2 inch) where panoramic Ir-192 source-crawler systems are still more productive.',
    'Remote field work with no reliable power generator — gamma source is the answer.',
    'High-volume vault-based shop RT — the Bordeaux 450 or larger 450 kV class is more productive.',
  ],
  alternatives: [
    { make: 'Gilardoni', model: 'Bordeaux RX 450', reason: 'Higher kV (450) and steel penetration (~80 mm) — but vault-based, not portable.' },
    { make: 'Comet', model: 'IOX 225', reason: 'Smaller, lighter, lower kV (225) — best for thin-wall <25 mm pipe work.' },
    { make: 'Ir-192 source (SENTINEL 880 Delta)', model: 'gamma alternative', reason: 'Portable gamma covers similar steel thickness range, no power needed — but tighter regulatory profile.' },
  ],
  certificationCompatibility: [
    'ASME BPVC Section V, Article 2 — radiographic examination of welds',
    'API 1104 — pipeline girth weld RT',
    'AWS D1.1 — structural welding code RT',
    'ASME B31.3 — process piping RT requirements',
    'EN ISO 17636-1 — RT with X-ray films',
    'EN ISO 17636-2 — RT with digital detector arrays',
    'EN 12679 — X-ray apparatus characterization',
    'IEC 61010 — safety requirements for electrical measurement equipment',
  ],
  faqs: [
    {
      q: 'Is the Yxlon MU60 still available, or has it been replaced?',
      a: 'Yxlon discontinued the MU60-SE model line in 2020 and replaced it with the SMART EVO 200 and SMART EVO 300, which share the same constant-potential generator architecture but add a modern microprocessor control unit with stored exposure presets, USB connectivity, and improved cooling. Used MU60 units remain in service worldwide and Yxlon USA still provides tube replacement and service support, but spare boards for the original analog control unit are harder to source. If buying new in 2026, you are buying SMART EVO. Used MU60 units typically trade at $20k-$35k depending on age and tube hours — verify the tube is under 2,000 hours and the control unit boards are still serviceable [1].',
    },
    {
      q: 'How does Yxlon SMART EVO 300 compare to Gilardoni Bordeaux 450 for fab-shop RT?',
      a: 'The Bordeaux 450 is a 450 kV vault-based generator with ~80 mm steel penetration; the SMART EVO 300 is a 300 kV portable with ~50 mm penetration. For high-volume vault-based RT on thick pressure vessels, the Bordeaux 450 is the right choice — more steel coverage and 100% duty cycle for continuous production. For field, semi-portable, or pipe spool RT under 50 mm steel, the SMART EVO 300 is the right choice — portable, faster setup, lower power requirements. Many large fab shops run both: Bordeaux 450 in a fixed vault for thick welds, SMART EVO 300 wheeled out to specific pipe spool jobs [1][2].',
    },
    {
      q: 'What does a SMART EVO 300 field RT kit cost delivered?',
      a: 'A typical field RT kit lands $70k-$95k delivered: $55k generator, $8k-$12k portable safety enclosure or shielded panels, $15k-$25k DDA detector and laptop, $3k-$5k tripod and cabling, plus a portable diesel generator if site power is unreliable. Used kits from auction sources or resellers run $35k-$55k for SMART EVO 300 units 2-4 years old with verified tube hours. Operating costs are minimal — tube life is typically 1,500-3,000 hours under normal use, tube replacement is ~$15k. Annual EN 12679 verification calibration runs $1,200-$1,800 [1].',
    },
    {
      q: 'What licensing and operator qualifications are needed to use a SMART EVO 300?',
      a: 'X-ray generators above 30 kV are subject to state radiation control regulations in all 50 US states (delegated under agreement-state authority from NRC). Owners must register the unit with the state radiation control program, designate a Radiation Safety Officer (RSO) with formal training, and have operators complete radiation safety training plus dosimetry. NDT inspectors operating the unit also need RT certification per SNT-TC-1A or CP-189 at Level II minimum for production work. Operator dosimetry badges must be reviewed quarterly and personnel doses kept ALARA below 5 rem/year occupational limit per 10 CFR 20. Initial state licensing typically takes 8-16 weeks and costs $500-$2,000 in fees [3][4].',
    },
  ],
  internalLinks: [
    { href: '/methods/radiographic-testing', label: 'Radiographic testing overview', context: 'Method overview — when X-ray vs gamma is appropriate.' },
    { href: '/equipment/gilardoni-bordeaux-450', label: 'Gilardoni Bordeaux 450', context: 'Higher-kV vault-based competitor.' },
    { href: '/equipment/comet-iox-225', label: 'Comet IOX 225', context: 'Lower-kV alternative for thin-wall pipe RT.' },
    { href: '/equipment/ir-192-source', label: 'Ir-192 gamma source', context: 'Portable gamma alternative.' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'SMART EVO is compliant with Article 2 RT requirements.' },
    { href: '/standards/api-1104', label: 'API 1104 pipeline welding', context: 'Pipeline RT under API 1104 supported.' },
    { href: '/learn/rt-exposure-calculation', label: 'RT exposure calculation', context: 'Step-by-step exposure calculation walkthrough.' },
    { href: '/learn/rt-vault-design', label: 'RT vault design considerations', context: 'For semi-permanent vault installs of SMART EVO 300.' },
  ],
  citations: [
    { id: 'yxlon-smart-evo-datasheet', source: 'Yxlon International / Comet, SMART EVO 200 / SMART EVO 300 Portable X-Ray Generator datasheet, Rev. 2023', url: 'https://www.yxlon.com/en' },
    { id: 'iso-17636-1', source: 'EN ISO 17636-1:2022, NDT of welds — Radiographic testing with film' },
    { id: 'nrc-10-cfr-20', source: 'US NRC 10 CFR Part 20, Standards for Protection Against Radiation' },
    { id: 'snt-tc-1a', source: 'ASNT SNT-TC-1A (2020), Recommended Practice for NDT Personnel Qualification' },
    { id: 'asme-v-art-2', source: 'ASME BPVC Section V, Article 2 (2023), Radiographic Examination' },
  ],
};

export default equipment;
