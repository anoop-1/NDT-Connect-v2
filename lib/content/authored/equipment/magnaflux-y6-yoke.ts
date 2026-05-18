import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'magnaflux-y6-yoke',
  make: 'Magnaflux',
  model: 'Y-6 Cordless AC Yoke',
  category: 'mt-yoke',
  metaTitle: 'Magnaflux Y-6 Cordless Yoke Review: Field MT Workhorse',
  metaDescription:
    'Magnaflux Y-6 cordless AC magnetic particle yoke review — battery-powered, 10 lb lift, ASTM E709 / ASME V compliant, ~$1,800 MSRP.',
  heroLede:
    'The Magnaflux Y-6 is the cordless AC magnetic particle yoke specified by every inspection crew that walks pipelines, climbs offshore platforms, or works tank tops where dragging a 50 ft extension cord is impractical. Battery-powered, 10 lb (4.5 kg) AC lift capability per ASTM E709, and rugged enough to survive being dropped from a scaffold — the Y-6 is the de facto cordless field MT yoke for refinery turnaround, pipeline ROW, and structural inspection. Magnaflux (Illinois Tool Works) has manufactured this design lineage for decades and the product is a fixed reference in MT procurement specs across US refining and pipeline operators [1].',
  msrpUSD: 1800,
  rentalPerWeekUSD: 110,
  specs: {
    caption: 'Magnaflux Y-6 cordless AC yoke — key specs (Magnaflux datasheet, 2022) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['Output mode', 'AC (60 Hz simulated via inverter)'],
      ['AC lift capability', '10 lb (4.5 kg) per ASTM E709'],
      ['Leg span (articulated)', '0 – 12 in (0 – 305 mm)'],
      ['Weight (with battery)', '6.0 lb (2.7 kg)'],
      ['Battery type', '18 V Li-ion (replaceable, hot-swap)'],
      ['Battery life', '~200 lifts per charge (typical)'],
      ['Charger', '120 VAC input, ~3 hr full charge'],
      ['Duty cycle', '6 minutes ON / 6 minutes OFF (intermittent)'],
      ['Operating temperature', '–10 °C to +50 °C'],
      ['IP rating', 'IP41'],
      ['Articulated legs', 'Yes, ball-joint with locking thumbscrews'],
      ['Compliance', 'ASTM E709, ASTM E1444, ASME V Article 7, AWS D1.1'],
      ['Certification', 'Annual lift-test certificate provided'],
      ['Spare battery', 'Sold separately, ~$250'],
    ],
  },
  pros: [
    'Cordless operation — eliminates the trip-hazard and reach-limit of corded yokes on field jobsites.',
    '6.0 lb total weight (with battery) is lighter than the corded Parker B310PDC (7.7 lb).',
    'Hot-swap 18V Li-ion battery — keep a charged spare in the vest pocket for full-shift coverage.',
    '~200 lifts per charge handles a typical 6-hour shift of refinery turnaround weld MT before battery swap.',
    'Magnaflux brand recognition in refinery procurement — most refinery framework contracts list the Y-6 by name as an approved yoke.',
    'Industry-standard design with decade-plus service life and full replaceable-parts support.',
  ],
  cons: [
    'AC mode only — no DC capability for slightly subsurface defects or coated work. If procedure requires HWDC, you need a Parker B310PDC.',
    'Battery management overhead — must track charge state, replace 18V batteries every 2-3 years (~$250 each).',
    'Cordless inverter electronics make the unit more complex than a pure corded yoke; failure modes include inverter board, not just legs/switch.',
    'Slightly weaker AC field than corded yokes at peak — 10 lb lift is at the spec floor, less margin for worn-leg drift than the Parker B310PDC.',
    'IP41 rating is dry-environment only — wet outdoor weather use needs a waterproof carry pouch when not in operation.',
    'Higher cost than corded equivalents — $1,800 vs Parker B310PDC at $1,500.',
  ],
  bestFor: [
    'Refinery turnaround MT on pipe and vessel welds where the inspector walks long distances between welds.',
    'Pipeline ROW and offshore platform MT where AC power is unavailable or impractical.',
    'Tank-top and rope-access MT inspection where harness work plus cord becomes a safety hazard.',
    'Structural inspection field work — bridge welds, building structural welds, crane and lifting equipment.',
  ],
  notIdealFor: [
    'Procedures that require DC mode for subsurface defect detection — use Parker B310PDC dual-mode.',
    'High-volume shop-bench MT where AC power is right there — corded yokes are simpler, cheaper, and avoid battery management.',
    'Wet environments — IP41 rating limits exposure.',
    'Aerospace WFMP work — yoke is for dry-method continuous and is not configured for fluorescent bath workflow.',
  ],
  alternatives: [
    { make: 'Parker Research', model: 'B310PDC (corded AC/DC)', reason: 'Corded with dual AC+HWDC modes — better capability for shop bench, cord is the only disadvantage.' },
    { make: 'Magnaflux', model: 'Y-7 (corded AC, 15 lb lift)', reason: 'Higher-lift AC-only corded yoke — best for high-sensitivity fine-crack detection on bench work.' },
    { make: 'Parker', model: 'DA-200 (cordless rechargeable)', reason: 'Competing cordless yoke with similar specs — newer design, less established brand recognition.' },
  ],
  certificationCompatibility: [
    'ASTM E709 — guide for magnetic particle examination',
    'ASTM E1444 — practice for magnetic particle examination general industry',
    'ASME BPVC Section V, Article 7 — magnetic particle examination',
    'ASME BPVC Section VIII, Div. 1 — pressure vessel MT requirements',
    'AWS D1.1/D1.1M — structural welding code MT (Annex L)',
    'AWS D1.5 — bridge welding code MT',
    'API 570 — piping inspection MT requirements',
    'API 1104 — pipeline weld MT',
  ],
  faqs: [
    {
      q: 'How long does the Y-6 battery actually last per charge in field conditions?',
      a: 'Magnaflux rates the Y-6 at "approximately 200 lifts per charge" under controlled conditions. Real-world refinery turnaround crews report 150-250 lifts depending on lift duration per energization (longer holds drain faster), ambient temperature (cold reduces capacity 20-30%), and battery age. A 2-year-old battery typically delivers 60-70% of new capacity. Standard practice: every inspector carries one spare battery and swaps mid-shift on long days. The 18V Li-ion replacement is straightforward — slide latch, swap, lock — about 5 seconds. Full charge from low takes ~3 hours on the OEM charger. For a 12-hour double-shift, plan two spare batteries per yoke [1][2].',
    },
    {
      q: 'Can the Y-6 pass the same ASTM E709 lift test as a corded yoke?',
      a: 'Yes. The Y-6 is rated for 10 lb (4.5 kg) lift per ASTM E709 §6.4, which is the AC minimum requirement under both ASTM E709 and ASME V Article 7. In annual calibration tests, the Y-6 typically lifts 11-13 lb when battery is fresh, dropping to 10-11 lb on a moderately discharged battery. Standard field practice is to lift-test at the start of each shift with a calibrated 10 lb test weight and with a battery known to be at >50% charge. If the yoke fails the lift test with a fresh battery, the cause is usually inverter board degradation or worn legs — return to Magnaflux service. Calibration certificate cost is $85-$125 per yoke per year [1][3].',
    },
    {
      q: 'Is the Y-6 worth $300 more than the corded Parker B310PDC?',
      a: 'Depends on the work mix. If 80%+ of your MT is field walk-down on pipelines, tanks, or scaffolds where extension cords are impractical, the Y-6 saves so much time and frustration that the $300 premium is irrelevant on the first project. If you do mostly bench-shop MT where power is right there, the corded B310PDC is the more capable tool (adds DC mode) at lower cost. Many inspection contractors run mixed fleets — 60% Y-6 cordless for field, 40% B310PDC corded for shop and dual-mode procedure work. The Y-6 also avoids the cord-management overhead on high-volume daily use, which has hidden time cost [1][4].',
    },
    {
      q: 'What spare parts and accessories should I stock for a Y-6 fleet?',
      a: 'For a 5-yoke fleet, stock: 5 spare 18V batteries ($1,250 total) so every yoke has a charged backup; 2 spare charger units ($300 total) in case primary fails; 2 sets of replacement articulated legs ($240 per pair); 1 spare trigger switch assembly ($80); and the calibrated 10 lb test weight ($60) for daily lift-test. Total spares inventory: about $2,000 for a 5-yoke fleet, ensuring uptime through normal wear and battery aging cycles. Plan to replace batteries on a 24-month rotating schedule and replace legs at 18-30 months depending on use intensity. Most refinery contractors track yoke serial numbers and battery cycle counts in a CMMS [1].',
    },
  ],
  internalLinks: [
    { href: '/methods/magnetic-particle-testing', label: 'Magnetic particle testing overview', context: 'Method overview — AC vs DC yoke selection.' },
    { href: '/equipment/parker-y8-yoke', label: 'Parker B310PDC (Y-8) yoke', context: 'Corded AC+DC dual-mode alternative.' },
    { href: '/equipment/magnaflux-zb-200', label: 'Magnaflux ZB-200 dry powder', context: 'MT consumable used with Y-6 yoke.' },
    { href: '/equipment/sherwin-spotcheck-spd', label: 'Sherwin Spotcheck SPD developer', context: 'Comparison consumable for PT method.' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'Y-6 is compliant with Article 7 MT requirements.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1', context: 'AWS D1.1 Annex L MT inspection supported.' },
    { href: '/learn/mt-procedure-writing', label: 'MT procedure writing guide', context: 'Procedure template referencing yoke selection.' },
    { href: '/learn/mt-calibration-checks', label: 'MT calibration checks', context: 'Daily lift-test workflow for Y-6.' },
  ],
  citations: [
    { id: 'magnaflux-y6-datasheet', source: 'Magnaflux Corporation (ITW), Y-6 Cordless AC Magnetic Particle Yoke datasheet, Rev. 2022', url: 'https://www.magnaflux.com/' },
    { id: 'astm-e709', source: 'ASTM E709-22, Standard Guide for Magnetic Particle Testing' },
    { id: 'astm-e1444', source: 'ASTM E1444/E1444M-22, Standard Practice for Magnetic Particle Testing' },
    { id: 'parker-b310pdc', source: 'Parker Research Corp., B310PDC datasheet (comparative context), Rev. 2022' },
    { id: 'asme-v-art-7', source: 'ASME BPVC Section V, Article 7 (2023), Magnetic Particle Examination' },
  ],
};

export default equipment;
