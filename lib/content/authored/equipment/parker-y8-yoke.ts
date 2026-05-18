import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'parker-y8-yoke',
  make: 'Parker Research',
  model: 'B310PDC (commonly the "Y-8" successor)',
  category: 'mt-yoke',
  metaTitle: 'Parker B310PDC / Y-8 MT Yoke Review: AC/DC Dual-Mode',
  metaDescription:
    'Parker B310PDC magnetic particle yoke review — AC + DC half-wave dual mode, 10 lb (4.5 kg) lift, ASTM E709 / ASME V compliant, ~$1,500 MSRP.',
  heroLede:
    'The Parker Research B310PDC (the successor lineage of the historically-named "Y-8") is the most-specified portable magnetic particle yoke in North American refinery and structural-weld MT — AC for fine surface-crack detection plus half-wave DC for slightly sub-surface indications, all in a single 7.7 lb (3.5 kg) hand-held tool. ASTM E709 lifting tests certify the AC mode at 10 lb (4.5 kg) and DC mode at 30 lb (13.6 kg) of dead-weight lift across the 4-6 inch leg span — well above the 10 lb ASME V Article 7 minimum for AC and 40 lb for DC requirements. For ASME B&PV pressure vessel and AWS D1.1 structural weld MT, this is the workhorse [1].',
  msrpUSD: 1500,
  rentalPerWeekUSD: 95,
  specs: {
    caption: 'Parker B310PDC magnetic particle yoke — key specs (Parker Research datasheet, 2022) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['Output modes', 'AC (60 Hz) and half-wave DC (HWDC)'],
      ['AC lift capability', '10 lb (4.5 kg) per ASTM E709, 4-6 in leg spread'],
      ['DC lift capability', '30+ lb (13.6+ kg) per ASTM E709'],
      ['Leg span (articulated)', '0 – 12 in (0 – 305 mm)'],
      ['Weight', '7.7 lb (3.5 kg)'],
      ['Power supply', '115 VAC, 60 Hz, 5 A'],
      ['Duty cycle', '6 minutes ON / 6 minutes OFF (intermittent rated)'],
      ['Cord length (standard)', '8 ft (2.4 m); extensions available to 50 ft'],
      ['Operating temperature', '–10 °C to +50 °C'],
      ['IP rating', 'IP41 (industrial use, dry environments)'],
      ['Articulated legs', 'Yes, ball-joint with locking thumbscrews'],
      ['Lift handle', 'Top-mounted ergonomic trigger'],
      ['Compliance', 'ASTM E709, ASTM E1444, ASME V Article 7, AWS D1.1'],
      ['Certification', 'Calibration with documented lift-test certificate'],
    ],
  },
  pros: [
    'Dual AC/HWDC modes in a single yoke — AC for fine surface cracks, DC for slightly subsurface or coated work; saves carrying two tools.',
    '10 lb AC and 30 lb DC lift exceed minimum code requirements with margin — passes annual lift tests reliably even after years of use.',
    'Lightweight 7.7 lb makes overhead and confined-space MT manageable for an 8-hour shift.',
    'Articulated ball-joint legs adjust to weld toe, fillet, and curved-surface geometry without modification.',
    'Decade-plus service life in normal use — Parker yokes from 2008-2010 are still in active US refinery service.',
    'Replacement legs and trigger switches available — yoke is rebuildable rather than disposable when one component fails.',
  ],
  cons: [
    'AC mode has limited subsurface depth — for cracks more than ~0.5 mm below coated surface, you need DC or wet fluorescent technique.',
    '6 min on / 6 min off duty cycle constrains high-volume scanning — for non-stop MT a Parker B310S (continuous duty) is the better pick.',
    'Cord-bound — no battery option. Long extension cords introduce voltage drop on jobsites with weak power.',
    'No built-in field-indicator (Berthold or pie gauge) — must verify field strength with a separate indicator per ASTM E709.',
    'IP41 rating is dry-environment only — outdoor wet weather use requires waterproof storage.',
    'Legs can wear and develop sloppy fit after thousands of cycles; replacement leg cost is ~$120/pair.',
  ],
  bestFor: [
    'Pressure vessel and pipe weld MT per ASME V Article 7 — covers AC fine-crack detection and DC subsurface in one tool.',
    'AWS D1.1 / D1.5 structural weld MT inspection in fabrication shops and on field structural work.',
    'Field MT on tanks, pipelines, and offshore platform welds where dual AC/DC capability is required by procedure.',
    'Training fleets at NDT Level II schools — robust, well-known, replaceable parts, predictable behavior.',
  ],
  notIdealFor: [
    'Continuous high-volume production MT — duty cycle constrains throughput; use Parker B310S or coil systems.',
    'Battery / cordless operation requirements — needs Magnaflux Y-6 cordless or similar.',
    'Wet outdoor environments without enclosure — IP41 rating is the limit.',
    'Fine post-weld MT on aerospace components where wet fluorescent magnetic particle (WFMP) is specified — needs bath unit + UV lamp + dark area, not yoke.',
  ],
  alternatives: [
    { make: 'Magnaflux', model: 'Y-6 (cordless)', reason: 'Battery-powered AC yoke for cordless work — best for field locations with no convenient power.' },
    { make: 'Magnaflux', model: 'Y-7 (AC only, higher lift)', reason: 'AC-only yoke with 15 lb lift — better fine-crack sensitivity than B310PDC AC mode, but no DC capability.' },
    { make: 'Parker', model: 'B310S (continuous duty AC)', reason: 'Same form factor with continuous-duty AC operation — for high-volume MT lines where duty cycle is the constraint.' },
  ],
  certificationCompatibility: [
    'ASTM E709 — guide for magnetic particle examination',
    'ASTM E1444 — practice for magnetic particle examination for general industry',
    'ASTM E3024 — practice for MT in aerospace (with appropriate dry-method procedure)',
    'ASME BPVC Section V, Article 7 — magnetic particle examination',
    'ASME BPVC Section VIII, Div. 1 — pressure vessel MT requirements',
    'AWS D1.1/D1.1M — structural welding code MT (Annex L)',
    'AWS D1.5 — bridge welding code MT',
    'API 1104 — pipeline weld inspection MT',
  ],
  faqs: [
    {
      q: 'When do I use the AC mode versus the DC mode on the B310PDC?',
      a: 'Use AC mode for surface and very near-surface crack detection on bare or lightly painted ferromagnetic material. The 60 Hz AC field creates strong skin-effect concentration of magnetic flux at the surface (within ~0.5 mm), giving high sensitivity to tight surface cracks. Use HWDC mode for indications that may be slightly subsurface (under coatings up to ~1.5 mm, under light corrosion, or for forging laps and seams that propagate from a few mm below). DC penetrates deeper but with lower surface sensitivity. ASME V Article 7 and ASTM E709 both accept either mode for production work, but most procedures specify AC for finished welds and DC for forgings and castings. Many inspectors run both modes on critical welds [1][2].',
    },
    {
      q: 'How often do I need to lift-test the B310PDC?',
      a: 'ASTM E709 §6.4 and E1444 §6.4 require lift-test verification: at minimum, daily before first use, after any drop or impact, after any service, and within 12 months of last calibration. Field practice is to lift-test at the start of each shift using a calibrated 10 lb (AC) and 40 lb (DC) test weight. A formal annual calibration with documented certificate runs $75-$125 per yoke at most NDT calibration labs. Most refinery framework contracts require quarterly calibration. If the yoke fails a lift test, take it out of service immediately — typically the cause is worn legs or a failing trigger switch, both replaceable [1][3].',
    },
    {
      q: 'Is the B310PDC the same product as the legacy "Y-8" yoke?',
      a: 'Yes, in practical terms. The "Y-8" naming traces back to older Parker Research catalog numbers that were retired in the early 2000s. The current B310PDC is the direct lineage successor with the same AC+HWDC dual-mode architecture, similar form factor, and similar lift performance. Many veteran inspectors still call any Parker AC/DC yoke a "Y-8" by habit. When ordering new from Parker Research or distributors (e.g. Magnaflux, Spectronics, Parker direct), specify B310PDC. Used market listings may use either name — verify the unit lift-tests to 10 lb AC / 40 lb DC regardless of model number [1].',
    },
    {
      q: 'How does the B310PDC compare to the Magnaflux Y-6 for field MT?',
      a: 'The B310PDC is corded with both AC and HWDC modes; the Y-6 is cordless (battery) with AC only. For shop-bench and refinery turnaround MT where 120 VAC is available, the B310PDC is more capable (dual mode) and never needs battery management. For remote pipeline ROW, tank-top, or rope-access work where dragging a cord is impractical, the Y-6 is the only sensible choice. Most large inspection contractors run both: Y-6 fleet for field walk-downs, B310PDC fleet for shop bench MT. Pricing: B310PDC ~$1,500 new, Y-6 ~$1,800 new (battery and charger included) [1][4].',
    },
  ],
  internalLinks: [
    { href: '/methods/magnetic-particle-testing', label: 'Magnetic particle testing overview', context: 'Method overview — when AC yoke MT vs DC vs WFMP is the right call.' },
    { href: '/equipment/magnaflux-y6-yoke', label: 'Magnaflux Y-6 cordless yoke', context: 'Cordless competitor for field MT.' },
    { href: '/equipment/magnaflux-zb-200', label: 'Magnaflux ZB-200 dry powder', context: 'MT particle consumable used with the B310PDC.' },
    { href: '/equipment/sherwin-dubl-chek-d100', label: 'Sherwin Dubl-Chek D100', context: 'Wet visible MT bath option — needs different equipment.' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'B310PDC is compliant with Article 7 MT requirements.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1 structural welding', context: 'AWS D1.1 Annex L MT inspection supported.' },
    { href: '/learn/mt-procedure-writing', label: 'Writing an MT procedure', context: 'Procedure template referencing yoke lift-test requirements.' },
    { href: '/learn/mt-calibration-checks', label: 'MT calibration checks', context: 'Daily lift-test workflow for B310PDC.' },
  ],
  citations: [
    { id: 'parker-b310pdc-datasheet', source: 'Parker Research Corp., B310PDC Magnetic Particle Yoke datasheet, Rev. 2022', url: 'https://www.parker-ndt.com/' },
    { id: 'astm-e709', source: 'ASTM E709-22, Standard Guide for Magnetic Particle Testing' },
    { id: 'astm-e1444', source: 'ASTM E1444/E1444M-22, Standard Practice for Magnetic Particle Testing' },
    { id: 'magnaflux-y6-datasheet', source: 'Magnaflux Corp., Y-6 Cordless AC Yoke datasheet (for comparative context), Rev. 2022' },
    { id: 'asme-v-art-7', source: 'ASME BPVC Section V, Article 7 (2023), Magnetic Particle Examination' },
  ],
};

export default equipment;
