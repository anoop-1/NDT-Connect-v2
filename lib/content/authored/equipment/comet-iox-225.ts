import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'comet-iox-225',
  make: 'Comet',
  model: 'IXS / IOX 225',
  category: 'other',
  metaTitle: 'Comet IOX 225 X-ray Generator Review: Compact Portable RT',
  metaDescription:
    'Comet IOX 225 review: 225 kV portable constant-potential X-ray generator for pipe RT up to 25 mm steel, ASME V / ISO 17636-1, ~$40k MSRP.',
  heroLede:
    'The Comet IOX 225 is the compact-portable end of the Comet Group X-ray range — 225 kV constant-potential generator, lightweight head, and built for field RT on thin-wall pipe and small-bore weld inspection where the bigger 300/450 kV class units are overkill. Comet (Swiss parent of Yxlon) targets the same field-RT contractor market as Ir-192 gamma source crawlers but with X-ray contrast and no transportable radioactive material headaches. Steel penetration capability is ~25 mm — making this the right pick for small-bore process pipe, thin-wall pressure vessel headers, and aerospace structural welds [1].',
  msrpUSD: 40000,
  rentalPerWeekUSD: 1850,
  specs: {
    caption: 'Comet IOX 225 — key specs (Comet datasheet, 2023) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['kV range', '40 – 225 kV (constant potential)'],
      ['Tube current', '0.5 – 5 mA'],
      ['Focal spot (nominal)', '1.5 × 1.5 mm (per EN 12543)'],
      ['Beam angle', '40° conical (panoramic option available)'],
      ['Steel penetration', '~25 mm (1 in) practical maximum'],
      ['Generator head weight', '~16 kg'],
      ['Control unit weight', '~12 kg'],
      ['Cooling', 'Air-cooled (forced)'],
      ['Duty cycle', '100% at rated conditions'],
      ['Power supply', '110/230 VAC, single-phase, 10 A'],
      ['Operating temperature', '–10 °C to +45 °C'],
      ['IP rating', 'IP54'],
      ['Safety', 'Dual-circuit exposure interlock, dose-rate monitor'],
      ['Compliance', 'EN 12679, ASME V Article 2, ISO 17636-1, IEC 61010'],
    ],
  },
  pros: [
    '16 kg head weight is the lightest in the portable industrial X-ray class — one-person handling on most jobsites.',
    '1.5 mm focal spot is finer than the SMART EVO 300 (2.5 mm) — better resolution on small defects in thin-wall pipe.',
    'Constant-potential output gives clean spectrum and high contrast for ISO 17636-1 Class B sensitivity on thin sections.',
    'Wide kV range from 40 kV — covers brazed aerospace assemblies and thin aluminum welds where 300 kV units cannot get low enough.',
    'Comet/Yxlon US service (Akron OH) provides domestic spare parts and 5-day cal turnaround.',
    'Lower cost than the SMART EVO 300 ($40k vs $55k) — better budget fit for shops doing only thin-wall RT.',
  ],
  cons: [
    '225 kV ceiling limits practical steel penetration to ~25 mm — for thicker pipe and vessels, need SMART EVO 300 or Bordeaux 450.',
    'Tube current limited to 5 mA — slower shot times than 8-10 mA generators on equivalent thickness.',
    'IP54 rating is the floor for outdoor field RT — survives splash but not heavy rain. Most jobs need a tarped enclosure.',
    'Smaller installed base than SMART EVO 300 — fewer used units on the resale market.',
    'Same regulatory profile as larger X-ray units (state registration, RSO, dosimetry) — no simpler than SMART EVO from compliance perspective.',
    'Field crews who already own SMART EVO 300 rarely justify a second IOX 225 just for thin work — single instrument covers both ranges.',
  ],
  bestFor: [
    'Aerospace MRO and structural inspection on thin-wall aluminum and steel welds under 25 mm.',
    'Small-bore process piping fabrication (under 4 inch nominal) where 25 mm steel coverage is sufficient.',
    'Field RT crews specializing in thin-wall pressure vessel headers, tube sheets, and instrument piping.',
    'Programs replacing Se-75 selenium gamma sources with X-ray equivalent for thin-section regulatory simplification.',
  ],
  notIdealFor: [
    'Steel thickness above 25 mm — use SMART EVO 300 or Bordeaux 450.',
    'High-volume vault-based shop RT — IOX 225 has no productivity edge over larger units in fixed install.',
    'Large-diameter pipeline RT where panoramic Ir-192 source crawlers cover faster.',
    'Programs that already have SMART EVO 300 — IOX 225 capability overlaps with SMART EVO\'s low-kV range.',
  ],
  alternatives: [
    { make: 'Yxlon', model: 'SMART EVO 300', reason: 'Same Comet Group family, higher kV (300) and steel range (~50 mm) — but heavier and pricier.' },
    { make: 'Baltograph', model: 'CLD 250', reason: 'Older Bal-Tec / Andrex design at similar kV class; legacy units common in older fab shops.' },
    { make: 'Se-75 source', model: 'gamma alternative', reason: 'Portable Se-75 gamma covers 5-40 mm steel range with no power requirement — but different regulatory and image quality profile.' },
  ],
  certificationCompatibility: [
    'ASME BPVC Section V, Article 2 — radiographic examination of welds',
    'AWS D1.1 — structural welding code RT (thin sections)',
    'ASME B31.3 — process piping RT requirements',
    'ASTM E1742 — radiographic examination practice using industrial radiographic film',
    'EN ISO 17636-1 — RT of welded joints with X-ray film',
    'EN ISO 17636-2 — RT of welded joints with DDA/CR',
    'EN 12679 — X-ray apparatus characterization',
    'IEC 61010 — safety of electrical equipment for measurement',
  ],
  faqs: [
    {
      q: 'When does the IOX 225 make sense over the SMART EVO 300?',
      a: 'Buy the IOX 225 if your scope is exclusively thin-wall (under 25 mm steel) work and you value head weight (16 kg vs 28 kg) for genuinely portable field deployment. Aerospace MRO inspectors and small-bore process pipe shops are the typical buyers. Buy the SMART EVO 300 if your scope spans 5-50 mm steel — the SMART EVO covers all the IOX 225 capability plus thicker material on a single instrument, eliminating the need for two generators. For an inspection contractor outfitting from scratch and doing mixed-thickness work, the SMART EVO 300 is the better single-instrument choice. For a specialized thin-wall RT contractor, the IOX 225 saves weight and ~$15k upfront [1][2].',
    },
    {
      q: 'Can the IOX 225 meet ASME V Article 2 sensitivity requirements on thin pipe?',
      a: 'Yes. ASME BPVC Section V, Article 2 sensitivity requirements (typically 2-2T or equivalent IQI for ASME B&PV work) are achievable with the IOX 225 across its full kV range on appropriate thicknesses. For 6 mm carbon steel pipe at 130 kV / 4 mA with 600 mm SFD using Class C-5 film, expect a clear 2-2T IQI image with ~30-60 second shot time. For 20 mm steel at 200 kV / 5 mA, ~90-150 seconds. The 1.5 mm focal spot is particularly helpful on thin sections where geometric unsharpness budget is tight — ISO 17636-1 Class B sensitivity is consistently achievable [1][3].',
    },
    {
      q: 'What is the realistic delivered cost and operating cost of an IOX 225 field kit?',
      a: 'Generator: $40k. Tripod and cabling: $3k-$5k. Shielded enclosure or warning system: $5k-$8k. Portable DDA detector (smaller than what SMART EVO uses): $10k-$18k. Total kit delivered: $58k-$71k. Operating costs: tube life ~2,000-4,000 hours, tube replacement ~$10k. Annual EN 12679 verification: $1,000-$1,500. State licensing and RSO costs identical to SMART EVO. Total 5-year operating cost (excluding tube): $8k-$10k. With one mid-life tube replacement, 5-year TCO is roughly $80k-$90k including initial purchase [1].',
    },
    {
      q: 'Is Comet/Yxlon US service strong enough for a small contractor running one IOX 225?',
      a: 'Yes. Yxlon USA (Akron, OH) provides direct calibration, repair, and tube replacement service to North American customers, with typical 5-7 business day turnaround for in-shop service. Replacement tubes for the IOX 225 are stocked domestically. Phone and on-site technical support is reasonable for a small fleet — Yxlon assigns named account contacts even for single-instrument customers. The Comet/Yxlon installed base in North American RT is large enough that third-party support shops (e.g. in Houston and Edmonton) also service IOX 225 units, though OEM service is the most reliable route. For remote sites, swap-out service via a second loaner unit is available on enterprise contracts [1].',
    },
  ],
  internalLinks: [
    { href: '/methods/radiographic-testing', label: 'Radiographic testing overview', context: 'Method overview — when 225 kV class is the right pick.' },
    { href: '/equipment/yxlon-mu60', label: 'Yxlon SMART EVO 300', context: 'Higher-kV sibling for thicker material RT.' },
    { href: '/equipment/gilardoni-bordeaux-450', label: 'Gilardoni Bordeaux 450', context: 'High-kV vault-based RT for thick-wall vessels.' },
    { href: '/equipment/se-75-source', label: 'Se-75 selenium gamma source', context: 'Gamma alternative for thin-wall pipe RT.' },
    { href: '/equipment/ir-192-source', label: 'Ir-192 gamma source', context: 'Higher-energy gamma alternative.' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'IOX 225 is compliant with Article 2 RT requirements.' },
    { href: '/standards/iso-17636', label: 'ISO 17636 radiographic testing', context: 'European RT standard supported.' },
    { href: '/industries/aerospace', label: 'Aerospace NDT inspection', context: 'IOX 225 is heavily used in aerospace thin-section RT.' },
  ],
  citations: [
    { id: 'comet-iox-225-datasheet', source: 'Comet Group, IOX 225 Portable X-Ray Generator datasheet, Rev. 2023', url: 'https://www.comet-group.com/en/' },
    { id: 'yxlon-smart-evo', source: 'Yxlon International / Comet, SMART EVO 200/300 datasheet (for comparative context), Rev. 2023' },
    { id: 'iso-17636-1', source: 'EN ISO 17636-1:2022, NDT of welds — Radiographic testing with film' },
    { id: 'astm-e1742', source: 'ASTM E1742/E1742M-23, Standard Practice for Radiographic Examination' },
    { id: 'asme-v-art-2', source: 'ASME BPVC Section V, Article 2 (2023), Radiographic Examination' },
  ],
};

export default equipment;
