import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'baker-hughes-mentor-ut',
  make: 'Baker Hughes / Waygate Technologies',
  model: 'Mentor UT',
  category: 'phased-array',
  metaTitle: 'Waygate Mentor UT Review: Cloud-Connected PAUT Flaw Detector',
  metaDescription:
    'Mentor UT review — 16:64 PA + TOFD + conventional UT in a touchscreen instrument with native cloud sync, ASME V/AWS D1.1, ~$35k MSRP.',
  heroLede:
    'The Waygate Mentor UT is Baker Hughes\' answer to the OmniScan X3 in the cloud-connected PAUT category. 16:64 phased-array channels, native TOFD, conventional UT, and the same InspectionWorks cloud platform that ships with the Mentor EM eddy current and Mentor Visual iQ borescope — a unified inspection data ecosystem. It sits a tier below the OmniScan X3 64 in raw channel count (16:64 vs 64:128) but matches it on code compliance (ASME V, AWS D1.1, EN ISO 13588) and beats it on cloud workflow integration. The Mentor UT is the right choice when the inspection program values data infrastructure as much as raw acquisition specs [1].',
  msrpUSD: 36000,
  rentalPerWeekUSD: 1450,
  specs: {
    caption: 'Waygate Mentor UT — key specs (manufacturer datasheet, 2023) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['PA channels', '16:64 parallel'],
      ['UT (conventional) channels', '2 (TOFD pitch-catch or pulse-echo)'],
      ['Frequency range', '0.5 – 20 MHz (–3 dB)'],
      ['Display', '8.4 in capacitive touchscreen, 1024 × 768'],
      ['Pulser voltage', '50 – 100 V'],
      ['Imaging modes', 'A, S, L, C, B, TOFD'],
      ['Weight', '3.8 kg (8.4 lb) with battery'],
      ['IP rating', 'IP65'],
      ['Battery life', '~8 hr typical (Li-ion, hot-swap)'],
      ['Operating temperature', '–10 °C to +45 °C'],
      ['Storage', '64 GB internal + USB 3.0'],
      ['Connectivity', 'WiFi (InspectionWorks), Ethernet, USB, HDMI'],
      ['Encoder inputs', '2-axis quadrature'],
      ['Software', 'Mentor UT (acquisition), InspectionWorks (cloud)'],
    ],
  },
  pros: [
    'Native InspectionWorks cloud sync — same ecosystem as Mentor EM and Mentor Visual iQ, unified inspection data infrastructure.',
    'Lighter than OmniScan X3 (3.8 kg vs 5.5 kg) — easier on multi-hour scan shifts.',
    'Modern capacitive touchscreen with gesture-based controls — onboarding for new techs is faster than X3 button-driven UI.',
    'Code-compliant on ASME V, AWS D1.1, EN ISO 13588 — covers the majority of US refinery and structural weld PA scopes.',
    'Mentor UT integrates with Mentor Create (procedure-authoring software) for auditable inspection procedure version control.',
    'WiFi-driven workflow means inspection records reach engineering review during the scan, not at end of shift.',
  ],
  cons: [
    '16:64 PA channels is half the count of X3 64 (64:128) — for thick-wall vessel work and dissimilar metal welds, channel count is binding.',
    'No real-time TFM on instrument — FMC capture is supported but reconstruction is offline.',
    'Smaller US installed base than Olympus OmniScan family — fewer trained Mentor UT operators in the labor market.',
    'InspectionWorks cloud subscription is a recurring cost — full features run $2-3k/year per instrument.',
    'Cloud workflow assumes connectivity — offshore and remote pipeline jobs lose the value proposition.',
    'Probe and wedge ecosystem is smaller than Olympus — third-party probe options more limited.',
  ],
  bestFor: [
    'Inspection programs standardized on the Waygate Mentor ecosystem (UT + EM + Visual iQ) for unified data infrastructure.',
    'Refinery and pipeline operators investing in cloud-first inspection programs with engineering review at headquarters.',
    'High-volume weld PA inspection where the sub-X3 weight and instant report sync make a productivity difference.',
    'Programs needing auditable procedure version control via Mentor Create — pharma, nuclear-adjacent, aerospace.',
  ],
  notIdealFor: [
    'Thick-wall vessel and dissimilar metal weld PA where 64:128 channel architecture is needed.',
    'Real-time TFM forensic work — needs OmniScan X3 with on-instrument TFM reconstruction.',
    'Remote offshore work without reliable WiFi for cloud sync.',
    'Inspection houses already standardized on Olympus or Sonatest — adding Waygate creates fragmentation.',
  ],
  alternatives: [
    { make: 'Olympus (Evident)', model: 'OmniScan X3 64', reason: 'Higher channel count (64:128), real-time TFM, larger US installed base — but heavier and no native cloud sync without WeldSight add-on.' },
    { make: 'Eddyfi', model: 'Mantis', reason: 'Same 16:64 class, lighter (3.2 kg), excellent multi-method Capture software — competing cloud workflow.' },
    { make: 'Sonatest', model: 'Veo+', reason: 'Mid-budget alternative with 16:64 or 32:128 PA at lower price — but no cloud workflow.' },
  ],
  certificationCompatibility: [
    'ASME BPVC Section V, Article 4 — PA (Appendix IV) and TOFD (Appendix III)',
    'AWS D1.1/D1.1M — structural welding code PA inspection',
    'API 1104 — pipeline girth weld AUT/PA',
    'API 5UE — pipe imperfection UT',
    'EN ISO 13588 — automated PA UT of welds',
    'EN ISO 10863 — TOFD of welds',
    'ASTM E2700 — PA contact UT',
    'EN 12668-1 — UT instrument characterization',
  ],
  faqs: [
    {
      q: 'How does Mentor UT compare to OmniScan X3 for fleet standardization?',
      a: 'Mentor UT is the right choice when your inspection program already runs Waygate Mentor EM, Mentor Visual iQ, or Mentor Create — the unified InspectionWorks cloud data flow is the binding value. OmniScan X3 is the right choice when you need 32:128 or 64:128 PA channels, native real-time TFM, or you have a long-standing Olympus probe and wedge inventory. Both meet the same ASME V, AWS D1.1, and EN ISO 13588 code requirements. Pricing is comparable when X3 32 is the comparison ($35k Mentor UT vs $40-50k X3 32) — X3 64 at $60-80k is meaningfully more expensive. For a greenfield program with no existing OEM bias, Mentor UT wins on workflow integration if your customers accept it [1][2].',
    },
    {
      q: 'Does the Mentor UT do TOFD?',
      a: 'Yes. The Mentor UT has 2 conventional UT channels supporting TOFD pitch-catch operation, with native EN ISO 10863-compliant TOFD imaging including lateral wave and back-wall tracking. Combined PA + TOFD encoded scans per ASME V Article 4 Appendices III and IV run on a single instrument and a single scanner pass, with both data sets synced to InspectionWorks for engineering review. The TOFD probe kit is sold separately (~$3.5k for a 5 MHz pitch-catch pair plus wedges) and is largely interchangeable with TOFD kits from other Waygate UT instruments [1][3].',
    },
    {
      q: 'What is InspectionWorks Connect and how does it work with the Mentor UT?',
      a: 'InspectionWorks Connect is the cloud-based collaboration tier of the InspectionWorks platform. When a Mentor UT instrument is paired to an InspectionWorks workspace, every scan can be marked for engineering review, and the responsible engineer sees the scan data and notes in real time on a web dashboard. For multi-site inspection programs (e.g. a pipeline operator with PA crews on 6 simultaneous projects), Connect lets one central PA Level III sign off on indications without flying to each site. The platform supports inspection record audit trail, probe certification tracking, and operator qualification linkage — features that matter for FAA Part 145 or refinery framework compliance [1][2].',
    },
    {
      q: 'What is realistic delivered cost for a Mentor UT kit?',
      a: 'A typical refinery PA + TOFD Mentor UT kit lands around $48k-$58k delivered: $36k instrument, $7k-$10k probe and wedge kit (5L64 PA, 7.5L32 PA, 5 MHz TOFD pair), $5k-$8k scanner (HydroFORM-class or custom). Add InspectionWorks Connect subscription at $2,500/year. Compare to a comparable OmniScan X3 32 + WeldSight kit at $60k-$75k. The Mentor UT kit saves roughly $15k upfront, with comparable annual subscription cost. The decision drivers are channel count requirement (X3 64 wins if 64-channel needed) and ecosystem fit (Mentor UT wins if other Waygate Mentor instruments already in fleet) [1].',
    },
  ],
  internalLinks: [
    { href: '/methods/phased-array-ultrasonic-testing', label: 'Phased array UT overview', context: 'PA method overview — when 16:64 PA is enough vs 32:128 or 64:128.' },
    { href: '/methods/tofd', label: 'TOFD overview', context: 'Mentor UT supports TOFD on 2 conventional UT channels.' },
    { href: '/equipment/olympus-omniscan-x3', label: 'Olympus OmniScan X3', context: 'Closest competitor with higher channel count option.' },
    { href: '/equipment/eddyfi-mantis', label: 'Eddyfi Mantis', context: 'Similar weight class and capability, competing cloud workflow.' },
    { href: '/equipment/baker-hughes-mentor-em', label: 'Waygate Mentor EM', context: 'Sister-brand ET instrument with same InspectionWorks cloud platform.' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'Mentor UT is compliant with Article 4 Appendix III and IV.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1', context: 'AWS D1.1 PA inspection per Annex K supported.' },
    { href: '/learn/paut-scan-plan', label: 'PAUT scan plan template', context: 'Scan-plan template usable with Mentor UT.' },
  ],
  citations: [
    { id: 'waygate-mentor-ut-datasheet', source: 'Baker Hughes / Waygate Technologies, Mentor UT Phased Array Flaw Detector datasheet, Rev. 2023', url: 'https://www.bakerhughes.com/waygate-technologies/ndt-equipment' },
    { id: 'inspectionworks-connect', source: 'Baker Hughes / Waygate, InspectionWorks Connect Service Description, Rev. 2023', url: 'https://www.bakerhughes.com/inspectionworks' },
    { id: 'iso-10863', source: 'EN ISO 10863:2020, NDT of welds — UT — TOFD' },
    { id: 'asme-v-app-iv', source: 'ASME BPVC Section V, Article 4, Mandatory Appendix IV (2023), Phased Array UT' },
    { id: 'iso-13588', source: 'EN ISO 13588:2019, NDT of welds — UT — Use of automated PA technology' },
  ],
};

export default equipment;
