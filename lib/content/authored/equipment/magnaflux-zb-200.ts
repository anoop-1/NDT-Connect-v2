import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'magnaflux-zb-200',
  make: 'Magnaflux',
  model: 'ZB-200 / 14HF Fluorescent MP Bath Concentrate',
  category: 'pt-kit',
  metaTitle: 'Magnaflux 14HF / ZB-200 Fluorescent MP Bath Review',
  metaDescription:
    'Magnaflux 14HF / ZB-200 wet fluorescent magnetic particle bath review — AMS 3044 / ASTM E1444 compliant, ~$95 per gallon concentrate.',
  heroLede:
    'Magnaflux 14HF (often supplied as ZB-200 concentrate or 7HF dry concentrate) is the wet fluorescent magnetic particle bath used for high-sensitivity MT on aerospace structural components, finished welds in pressure vessels, and forged crankshafts and turbine disks. Unlike dry-method MT with a yoke and visible powder (Y-6 + ZB-200 dry), wet fluorescent MT (WFMP) uses a magnetized bench unit, a fluorescent-particle oil or water suspension, and UV-A illumination in a dark booth to reveal indications by green-yellow fluorescence. This is the most sensitive MT technique available — capable of detecting cracks 0.025 mm wide in critical aerospace parts per AMS 3044 [1].',
  msrpUSD: 95,
  specs: {
    caption: 'Magnaflux 14HF concentrate (typical wet fluorescent particle) — key specs (Magnaflux TDS, 2023) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['Concentrate form', 'Liquid concentrate for oil-based or water-based bath'],
      ['Particle size (median)', '~3-8 µm fluorescent magnetic oxide'],
      ['Fluorescent color', 'Green-yellow (peak emission ~520 nm)'],
      ['Excitation wavelength', '320-400 nm UV-A (peak 365 nm)'],
      ['Suspension', 'Oil (e.g. Magnaflux Carrier II) or water + conditioner'],
      ['Recommended bath concentration', '0.1 – 0.4 mL settling volume per 100 mL bath (oil)'],
      ['Settling test method', 'ASTM E1444 §6.2 (centrifuge tube)'],
      ['Coverage rate', '~1 gal concentrate per 100 gal mixed bath'],
      ['Shelf life (unopened concentrate)', '24 months from manufacture'],
      ['Compatibility', 'AMS 3044 Type 1 / ASTM E1444 / EN ISO 9934-2'],
      ['Operating temperature', '+10 °C to +40 °C bath temperature'],
      ['Disposal class', 'Non-hazardous; check local for waste-oil regulations'],
    ],
  },
  pros: [
    'Highest-sensitivity MT method available — detects 0.025 mm wide cracks per AMS 3044, far below the ~0.1 mm visible-MT detection threshold.',
    'Green-yellow fluorescence at 520 nm is well-matched to dark-adapted human vision — indications "pop" against the UV-illuminated dark background.',
    'Industry-standard product specified by AMS 3044 Type 1, ASTM E1444, EN ISO 9934-2 — accepted by most aerospace OEM material certifications.',
    'Compatible with both oil-based and water-based carrier baths — water option for facilities with waste-oil disposal constraints.',
    'Long shelf life (24 months) for unopened concentrate — supports inventory buffers for low-utilization aerospace shops.',
    'Coverage of ~100 gal mixed bath per gallon of concentrate keeps consumable cost reasonable for high-volume MT lines.',
  ],
  cons: [
    'Requires UV-A booth (5-10 W/cm² minimum at part surface per ASTM E3024) — significant capital infrastructure ($8k-$25k for UV booth + magnetizing bench).',
    'Requires dark-adapted vision — inspector must be in subdued ambient for 5+ minutes before reading per ASTM E1444 §6.6.',
    'Bath monitoring (settling test, contamination check, particle concentration) is daily and adds workflow overhead.',
    'Carrier oil disposal subject to local environmental regulations — typically managed as oily waste.',
    'Not portable — bench-method only; cannot be done with a hand-held yoke in field. For field WFMP, you need a portable spray bottle workflow (uncommon).',
    'Skin contact and inhalation cautions on concentrate — requires PPE handling per SDS.',
  ],
  bestFor: [
    'Aerospace structural part inspection — crankshafts, landing gear, turbine disks, rotor blades — where AMS 3044 fluorescent MT is mandatory.',
    'High-sensitivity finished-weld MT on pressure vessels and reactors where visible MT does not have the sensitivity margin.',
    'Forging and casting in-process MT on critical components — fatigue-cracked surfaces and grinding burn detection.',
    'In-process inspection at manufacturing where the UV booth and bench infrastructure is already installed.',
  ],
  notIdealFor: [
    'Field MT on remote pipelines, tank shells, or offshore platforms — bench-method only.',
    'Visible-MT-acceptable scopes — ZB-200 dry powder is cheaper and faster for general structural weld work.',
    'Outdoor work — UV booth and dark-room requirements rule out outdoor execution.',
    'Quick low-cost spot-check on a single weld — overkill versus dry-method visible MT.',
  ],
  alternatives: [
    { make: 'Magnaflux', model: 'ZB-200 dry visible powder', reason: 'Dry visible MT consumable for yoke-based field work — much lower sensitivity but no UV booth needed.' },
    { make: 'Magnaflux', model: '8A red visible particle suspension', reason: 'Wet visible MT bath for shop work without UV — better than dry powder, simpler than fluorescent.' },
    { make: 'Sherwin', model: 'Du-Bri DBO-22', reason: 'Competing wet fluorescent particle concentrate from Sherwin (Casco) — similar spec profile to 14HF, sometimes lower delivered cost.' },
  ],
  certificationCompatibility: [
    'AMS 3044 — Type 1 Fluorescent Wet Magnetic Particle Inspection Material',
    'ASTM E1444 — practice for magnetic particle testing',
    'ASTM E709 — guide for MT',
    'ASTM E3024 — practice for MT in aerospace',
    'EN ISO 9934-2 — non-destructive testing — Magnetic particle testing — Detection media',
    'Boeing Process Specifications BAC 5424 — MT requirements for aircraft structure',
    'Rolls-Royce / Pratt & Whitney engine maintenance MT requirements',
    'Aviation Maintenance Technician Handbook FAA-H-8083-31 (reference) — MT principles for AMT',
  ],
  faqs: [
    {
      q: 'Why is wet fluorescent MT more sensitive than dry visible MT?',
      a: 'Three factors compound. First, the fluorescent particle size (~3-8 µm) is finer than typical dry visible powder (~20-50 µm), so smaller magnetic flux leakage fields can collect enough particles to produce a visible indication. Second, the oil or water bath wets the part surface uniformly, ensuring particles can move into very tight cracks; dry powder relies on air mobility and skips fine cracks. Third, the green-yellow fluorescence against a UV-illuminated dark background produces ~10× the visual contrast of black or red dry powder against bare metal. Combined, wet fluorescent MT can detect cracks an order of magnitude tighter than dry visible MT — 0.025 mm wide vs ~0.25 mm threshold for visible [1][2].',
    },
    {
      q: 'What UV-A intensity and ambient light limits apply to wet fluorescent MT?',
      a: 'ASTM E1444 §6.6 and ASTM E3024 §7.4 require UV-A intensity of at least 1,000 µW/cm² at the inspection surface (some procedures specify 1,500 µW/cm²), measured with a calibrated radiometer at the part position. Ambient white light at the part must be ≤20 lux (≤2 foot-candles) per E1444 §6.6 — this is achieved in a darkened booth with light-trap entry. Inspector vision must be dark-adapted for at least 5 minutes before reading. UV bulb performance degrades over time — bulb output should be verified weekly with the radiometer and bulbs replaced when output drops below the specified threshold. A typical 100 W black-light meets the intensity requirement at ~12-15 inches from the part [2][3].',
    },
    {
      q: 'How do I monitor the wet fluorescent bath for production use?',
      a: 'Daily monitoring per ASTM E1444 §6.2-6.5 requires three checks. First: settling test using a centrifuge tube (typically 100 mL bath sample, 30-minute settle, read sediment volume — should fall in 0.1-0.4 mL band for oil bath, 0.2-0.5 mL for water bath). Second: contamination check — visually inspect for fluorescent particle clumping, dirt, or color change indicating oil contamination. Third: a known-defect part (KSDP — "known surface defect part") run as a system functional check — verify the bath plus magnetizer plus UV booth combination reveals the reference defect every shift. Any failed check requires bath adjustment or full bath replacement before further production [2].',
    },
    {
      q: 'What does a wet fluorescent MT setup cost to install at an aerospace shop?',
      a: 'Magnetizing bench with horizontal coil + headstock (typically 1,000-3,000 A capacity): $25k-$60k. UV booth or hood with calibrated black lights: $8k-$20k. Bath circulation pump, settling tank, and filtration: $3k-$8k. Initial concentrate and carrier inventory: $500-$1,500. Radiometer, magnetic field indicators (gauss meters and Berthold strips): $1,500-$3,000. Operator training to aerospace Level II MT (per NAS 410 or SNT-TC-1A): $3k-$5k per inspector. Total turnkey for a small aerospace MT cell: $40k-$95k. Annual consumable plus maintenance cost: $5k-$10k for moderate utilization. Pays back versus subcontracting if you do more than ~$50k/year of WFMP work [1][4].',
    },
  ],
  internalLinks: [
    { href: '/methods/magnetic-particle-testing', label: 'Magnetic particle testing overview', context: 'Method overview — wet fluorescent vs dry visible decision.' },
    { href: '/equipment/parker-y8-yoke', label: 'Parker B310PDC yoke', context: 'Yoke for dry-method MT — different workflow.' },
    { href: '/equipment/magnaflux-y6-yoke', label: 'Magnaflux Y-6 cordless', context: 'Field MT yoke alternative.' },
    { href: '/equipment/sherwin-spotcheck-spd', label: 'Sherwin Spotcheck SPD', context: 'Visible PT developer for comparison.' },
    { href: '/equipment/sherwin-dubl-chek-d100', label: 'Sherwin Dubl-Chek D100', context: 'PT alternative for surface-crack detection.' },
    { href: '/industries/aerospace', label: 'Aerospace NDT inspection', context: 'WFMP is heavily used in aerospace structural inspection.' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'WFMP per Article 7 with appropriate procedure.' },
    { href: '/learn/mt-procedure-writing', label: 'MT procedure writing', context: 'Procedure template referencing wet fluorescent technique.' },
  ],
  citations: [
    { id: 'magnaflux-14hf-tds', source: 'Magnaflux Corporation, 14HF Fluorescent Magnetic Particle Concentrate Technical Data Sheet, Rev. 2023', url: 'https://www.magnaflux.com/' },
    { id: 'astm-e1444', source: 'ASTM E1444/E1444M-22, Standard Practice for Magnetic Particle Testing' },
    { id: 'astm-e3024', source: 'ASTM E3024/E3024M-21, Standard Practice for Magnetic Particle Testing for General Industry' },
    { id: 'ams-3044', source: 'SAE AMS 3044L, Magnetic Particles, Fluorescent Wet Method, Oil Vehicle, Ready-To-Use' },
    { id: 'iso-9934-2', source: 'EN ISO 9934-2:2015, NDT — Magnetic particle testing — Detection media' },
  ],
};

export default equipment;
