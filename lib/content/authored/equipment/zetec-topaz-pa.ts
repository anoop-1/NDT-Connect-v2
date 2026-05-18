import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'zetec-topaz-pa',
  make: 'Zetec (Eddyfi Group)',
  model: 'TOPAZ Phased Array',
  category: 'phased-array',
  metaTitle: 'Zetec TOPAZ PA Review: 32/64-Channel Nuclear-Grade PAUT',
  metaDescription:
    'Zetec TOPAZ PA review — 32:128 or 64:128 PA, ASME V, ASME XI nuclear, ~$55-80k. Strongest in power generation and forensic FMC/TFM workflows.',
  heroLede:
    'Zetec\'s TOPAZ family is the phased-array instrument most often specified in US nuclear power inspection and high-end forensic UT work. Now part of Eddyfi Group, Zetec has a longer heritage in heavy-industry and ASME XI nuclear in-service inspection than either Olympus or Sonatest, and the TOPAZ16 / TOPAZ32 / TOPAZ64 hardware platform shows it — robust mil-spec packaging, deep TomoView post-processing software, and code-traceable acquisition logs that nuclear ISI engineers depend on. Where the OmniScan X3 prioritizes UI polish and the Veo+ prioritizes price, the TOPAZ prioritizes acquisition rigor, FMC/TFM signal quality, and nuclear pedigree. Pricing is comparable to OmniScan X3 — $55k-$80k delivered depending on configuration [1].',
  msrpUSD: 68000,
  rentalPerWeekUSD: 2200,
  specs: {
    caption: 'Zetec TOPAZ32 / TOPAZ64 — key specs (Eddyfi/Zetec datasheet, 2023) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['PA channels', '16:64, 32:128, or 64:128 (model dependent)'],
      ['UT (conventional) channels', '4 (TOFD pitch-catch and pulse-echo)'],
      ['Frequency range', '0.5 – 18 MHz (–3 dB)'],
      ['Display', '10.4 in sunlight-readable touchscreen'],
      ['Pulser voltage', '40 – 100 V (bipolar)'],
      ['Imaging modes', 'A, S, L, C, B, TFM (live + offline), FMC, TOFD'],
      ['Weight', '5.0 kg (11 lb) with battery'],
      ['IP rating', 'IP65'],
      ['Battery life', '~7 hr typical (Li-ion)'],
      ['Operating temperature', '–10 °C to +45 °C'],
      ['Storage', '64 GB internal SSD + USB 3.0 + Ethernet streaming'],
      ['Connectivity', 'WiFi, Ethernet Gigabit, USB 3.0, HDMI'],
      ['Encoder inputs', '2-axis quadrature with quadrature decoding'],
      ['Software', 'UltraVision Touch (acquisition), TomoView (post)'],
    ],
  },
  pros: [
    'Strongest nuclear-industry pedigree of the three major PA brands — most ASME XI / Section XI ISI procedures reference Zetec equipment by class.',
    'TomoView post-processing is the gold-standard FMC/TFM analysis software — wider feature set than UltraVision PC or OmniPC.',
    '4 conventional UT channels (vs 2 on X3 and Veo+) means simultaneous TOFD + 2 pulse-echo + PA in one scan pass.',
    'Acquisition logging is forensically traceable — every shot logged with timestamp and channel state, critical for nuclear ISI submittal packages.',
    '64:128 configuration is the most channel-dense in portable PA — best for thick-wall vessel and dissimilar metal weld scans.',
    'Mil-spec packaging — the TOPAZ16 survives drop tests competitors do not pass.',
  ],
  cons: [
    'UI is functional but less polished than OmniScan X3 — feels engineered for engineers, not for fast field operation by Level II techs.',
    'Battery life of ~7 hr is the shortest of the three major PA boxes — plan two batteries minimum per shift.',
    'Smaller installed base outside nuclear and power gen — fewer trained operators in the general refinery labor market.',
    'TomoView post-processing has a steep learning curve — typically 40+ hours of training to reach productive Level II analyst output.',
    'AWS D1.5 and ASME B31.3 code packages are unlocked separately, similar to OmniScan X3.',
    'Service ecosystem is concentrated at Zetec US (Snoqualmie WA) and France — fewer regional service centers than Olympus.',
  ],
  bestFor: [
    'ASME XI / Section XI nuclear in-service inspection where forensic acquisition logging and qualification pedigree matter.',
    'Power generation HRSG, turbine, and dissimilar metal weld inspection where 64-channel aperture is needed for thick sections.',
    'Forensic and root-cause investigation work where TomoView FMC/TFM post-analysis is the binding workflow requirement.',
    'Heavy industrial fabrication of high-pressure vessels and reactor components where acquisition rigor outweighs UI speed.',
  ],
  notIdealFor: [
    'Fast-paced refinery turnaround weld inspection where instrument UI speed and operator familiarity are the productivity driver.',
    'Inspection contractors with Olympus-standardized fleets — adding Zetec creates training and spares fragmentation.',
    'Pure corrosion mapping at high tech-count where Veo+ value proposition wins.',
    'Operations needing fastest possible cloud workflow — TomoView is desktop-first, not cloud-native.',
  ],
  alternatives: [
    { make: 'Olympus (Evident)', model: 'OmniScan X3 64', reason: 'More polished UI, larger US refinery installed base, native real-time TFM on instrument — but slightly less rigorous acquisition logging for nuclear ISI.' },
    { make: 'Sonatest', model: 'Veo+', reason: 'Mid-budget PA at 25-40% lower cost — but no nuclear pedigree and offline-only FMC.' },
    { make: 'M2M / Eddyfi', model: 'Gekko / Mantis', reason: 'Sister-brand Eddyfi instruments with strong FMC/TFM heritage. Gekko is the high-end forensic PA, Mantis is lighter portable PA.' },
  ],
  certificationCompatibility: [
    'ASME BPVC Section V, Article 4 — PA (Mandatory Appendix IV) and TOFD (Appendix III)',
    'ASME BPVC Section XI — Nuclear in-service inspection (ISI), incl. Performance Demonstration Initiative (PDI)',
    'ASME B31.1 / B31.3 — power and process piping',
    'EN ISO 13588 — automated PA UT of welds',
    'EN ISO 10863 — TOFD of welds',
    'EN 16018 — UT terminology, phased array',
    'ASTM E2700 — PA contact UT',
    'ASTM E2491 — PA instrument performance evaluation',
  ],
  faqs: [
    {
      q: 'Why is Zetec dominant in US nuclear inspection but less common in refinery work?',
      a: 'Zetec built its US business on Westinghouse and GE BWR/PWR steam generator tubing inspection in the 1980s-2000s, with deep involvement in EPRI Performance Demonstration Initiative (PDI) procedure qualifications. That heritage means many nuclear plant ISI procedures explicitly reference Zetec-class equipment, and ASME Section XI Mandatory Appendix VIII PDI test sets were developed alongside Zetec hardware. In contrast, Olympus dominated the refinery PA market through aggressive marketing of the OmniScan MX/MX2 in the 2000s-2010s, becoming the default refinery choice. Both ecosystems are technically code-compliant for both industries — the split is historical, not capability-driven [1][2].',
    },
    {
      q: 'How does TomoView FMC/TFM post-processing compare to OmniPC and UltraVision PC?',
      a: 'TomoView is generally regarded as the most flexible FMC/TFM analysis software in the industry. It supports a wider range of wave modes (LL, LT-LT, TT, TLT, mode-converted) on offline reconstruction, finer pixel-grid control, and more sophisticated calibration reconstruction workflows than OmniPC (Olympus) or UltraVision PC (Sonatest). For forensic root-cause work where the analyst is reconstructing the same scan data under multiple imaging hypotheses, TomoView is the right tool. For routine production scans where the goal is fast acceptance/rejection on AWS or ASME criteria, OmniPC is faster. Many large inspection houses run both: TOPAZ + TomoView for forensic, OmniScan + OmniPC for production [1][3].',
    },
    {
      q: 'Is the TOPAZ family qualified for ASME XI nuclear in-service inspection?',
      a: 'The hardware platform meets the equipment requirements of ASME BPVC Section XI and is supported by procedures qualified under EPRI Performance Demonstration Initiative (PDI). Qualification under Mandatory Appendix VIII is procedure-specific, not instrument-specific in a global sense — a TOPAZ-based procedure must be qualified on the specific test set for the component class (e.g., dissimilar metal weld in BWR, austenitic stainless piping). Zetec maintains a library of pre-qualified procedures referencing TOPAZ acquisition parameters, which gives buyers a faster route to ISI deployment than starting from scratch with a different hardware family [2][4].',
    },
    {
      q: 'What does a TOPAZ32 or TOPAZ64 cost delivered with full kit?',
      a: 'A TOPAZ32 instrument lands around $55k-$65k delivered, plus probes ($8k-$15k for a typical refinery probe kit), scanner ($6k-$12k for HydroFORM or Phoenix scanners), and TomoView license ($8k-$12k separately). Total refinery-grade kit at $80k-$105k. TOPAZ64 adds roughly $15k-$20k for the higher channel count. Nuclear-grade qualified kits with procedure documentation can land at $130k-$180k. Used-market TOPAZ32 units trade at 50-60% of new MSRP after 3-4 years, comparable to OmniScan retention [1].',
    },
  ],
  internalLinks: [
    { href: '/methods/phased-array-ultrasonic-testing', label: 'Phased array UT method', context: 'PA method overview — when to choose TOPAZ-class instruments.' },
    { href: '/equipment/olympus-omniscan-x3', label: 'Olympus OmniScan X3', context: 'Closest competitor to TOPAZ, more polished UI.' },
    { href: '/equipment/sonatest-veo-plus', label: 'Sonatest Veo+', context: 'Mid-budget PA alternative.' },
    { href: '/equipment/eddyfi-mantis', label: 'Eddyfi Mantis', context: 'Sister-brand portable PA from same parent group (Eddyfi).' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'TOPAZ is compliant with Article 4 Appendix III and IV.' },
    { href: '/standards/asme-bpvc-section-xi', label: 'ASME BPVC Section XI', context: 'TOPAZ is the leading instrument for Section XI nuclear ISI.' },
    { href: '/methods/tofd', label: 'TOFD overview', context: 'TOPAZ has 4 conventional channels for TOFD pitch-catch.' },
    { href: '/learn/paut-scan-plan', label: 'PAUT scan plan template', context: 'Scan-plan template usable with UltraVision Touch / TomoView.' },
  ],
  citations: [
    { id: 'zetec-topaz-datasheet', source: 'Eddyfi / Zetec, TOPAZ Phased Array Ultrasonic Inspection System datasheet, Rev. 2023', url: 'https://www.zetec.com/products/ultrasound/topaz/' },
    { id: 'asme-xi', source: 'ASME BPVC Section XI (2023), Rules for Inservice Inspection of Nuclear Power Plant Components, Mandatory Appendix VIII' },
    { id: 'tomoview-manual', source: 'Eddyfi/Zetec, TomoView Post-Processing Software User Manual, Rev. 2022' },
    { id: 'epri-pdi', source: 'EPRI Performance Demonstration Initiative (PDI), Program Description and Generic Procedure Index, 2023' },
    { id: 'iso-13588', source: 'EN ISO 13588:2019, NDT of welds — Ultrasonic testing — Use of automated phased array technology' },
  ],
};

export default equipment;
