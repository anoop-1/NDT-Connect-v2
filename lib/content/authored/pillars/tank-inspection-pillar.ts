import type { PillarHubContent } from '../types';

const pillar: PillarHubContent = {
  slug: 'tank-inspection-pillar',
  metaTitle: 'API 653 Tank Inspection Guide: Intervals, MFL, Settlement & Repair',
  metaDescription:
    'The complete aboveground storage tank inspection cluster — API 653 intervals, bottom MFL floor scanning, shell corrosion rates, API 653 Annex B settlement, and repair rules.',
  heroLede:
    'An aboveground storage tank is the one piece of fixed equipment in a facility whose failure mode is measured in barrels released to the environment, not pounds of steel. That is why the inspection of welded storage tanks is governed by its own dedicated code — API 653, Tank Inspection, Repair, Alteration, and Reconstruction — sitting on top of the API 650 construction code and feeding directly into the operator’s SPCC (Spill Prevention, Control, and Countermeasure) obligations under 40 CFR 112. A tank inspection is not a single event: it is a program that interleaves routine in-service external rounds, scheduled external UT, and the big-ticket internal inspection where the floor is exposed, magnetic-flux-leakage (MFL) scanned, and the next out-of-service interval is set. This hub maps the full storage-tank inspection cluster — the code framework, the methods that do the work, the calculations that set intervals, and the certification that authorizes the inspector.',
  topicOverview:
    'Storage-tank integrity work breaks into four inspection types defined by API 653. (1) Routine in-service external — visual rounds by operating staff, no certification required, looking for shell distortion, foundation washout, roof and seal condition, and leaks. (2) External inspection — by an API 653 certified inspector at intervals not exceeding 5 years (or RBI-derived), covering shell, foundation, appurtenances, and ultrasonic shell-thickness verification. (3) Ultrasonic thickness (UT) inspection — used to extend or set the external interval when corrosion rates are known. (4) Internal inspection — the out-of-service event where the floor is cleaned and 100% MFL floor-scanned with UT verification of indications, shell courses are thickness-mapped, the roof and internal appurtenances are assessed, and settlement is surveyed and evaluated against API 653 Annex B. The internal interval is the critical output: it is set by the measured bottom-plate corrosion rate and minimum-remaining-thickness criteria, capped at 20 years, and shortened wherever the data demands it. The cluster also covers the degradation mechanisms that drive all of this — soil-side and product-side bottom corrosion, shell CUI under insulation, brittle-fracture risk on older non-impact-tested steels, and edge settlement that distorts the shell-to-bottom junction.',
  subPages: [
    {
      href: '/certifications/api-653',
      label: 'API 653 Tank Inspector Certification',
      description:
        'Who is authorized to sign a tank inspection — the API ICP credential, the education-and-experience matrix, the 7.5-hour closed/open-book exam, and the 3-year recertification cycle.',
    },
    {
      href: '/methods/ultrasonic-testing',
      label: 'UT for Shell & Floor Thickness',
      description:
        'Shell-course thickness mapping and corrosion-rate trending, plus ultrasonic verification of MFL floor indications. The method that sets the numbers behind the interval.',
    },
    {
      href: '/methods/magnetic-particle-testing',
      label: 'MT for Welds & Shell Cracks',
      description:
        'Surface-crack detection on shell-to-bottom welds, nozzle reinforcing welds, and repair welds on ferritic tank steel under ASME Section V Article 7.',
    },
    {
      href: '/methods/visual-testing',
      label: 'Visual Inspection (In-Service Rounds)',
      description:
        'The routine in-service external round — shell distortion, foundation and ringwall condition, roof and seal integrity, and the first sign of a developing leak.',
    },
    {
      href: '/pillars/corrosion-monitoring-pillar',
      label: 'Corrosion Monitoring & RBI',
      description:
        'How corrosion rates, cathodic protection (API 651), and risk-based inspection feed the interval decision and connect tank work to the wider asset-integrity program.',
    },
    {
      href: '/certifications/api-510',
      label: 'API 510 (Related Fixed Equipment)',
      description:
        'The sister credential for pressure vessels — useful context for inspectors building a multi-code fixed-equipment portfolio across a refinery or terminal.',
    },
  ],
  expertCommentary:
    'The single most consequential number a tank inspector produces is the internal-inspection interval, and it is almost always governed by the floor, not the shell. MFL floor scanning is fast and finds the soil-side pitting that drives bottom integrity, but MFL is a screening tool: every actionable indication needs UT verification to convert a flux signal into a defensible remaining-thickness number. The second trap is settlement. Uniform settlement is mostly cosmetic; it is differential and edge settlement, evaluated against the cosine-curve and B.3 criteria of API 653 Annex B, that distorts the shell-to-bottom junction and can crack a weld or jam a floating roof. Inspectors who treat settlement as a formality and the floor as an afterthought are the ones who get surprised. Finally, brittle fracture: tanks built before the impact-testing rules to older API 12C / early API 650 editions can sit one cold-day hydrotest away from a through-shell fracture — the change-of-service and re-hydrotest evaluation in API 653 §10 exists precisely for these.',
  externalResources: [
    { label: 'API 653 — Tank Inspection, Repair, Alteration and Reconstruction', url: 'https://www.api.org/products-and-services/standards' },
    { label: 'API Individual Certification Programs (ICP) — API 653', url: 'https://www.api.org/products-and-services/individual-certification-programs/certifications' },
    { label: 'US EPA — SPCC Rule (40 CFR 112)', url: 'https://www.epa.gov/oil-spills-prevention-and-preparedness-regulations' },
  ],
  faqs: [
    {
      q: 'How often does an API 653 internal inspection have to be done?',
      a: 'The internal-inspection interval is set by the measured bottom-plate corrosion rate and minimum-remaining-thickness criteria, and may not exceed 20 years. When corrosion data is not available, API 653 limits the initial interval more conservatively, and any actionable settlement, leak history, or floor condition shortens it.',
    },
    {
      q: 'What is the external-inspection interval for a storage tank?',
      a: 'API 653 external inspections by a certified inspector are performed at intervals not exceeding 5 years, or as derived from a risk-based inspection (RBI) assessment. Routine in-service visual rounds by operating staff are far more frequent and do not require certification.',
    },
    {
      q: 'Why is magnetic flux leakage (MFL) used on tank floors?',
      a: 'MFL scans the tank bottom quickly — often hundreds of plates per shift — to locate soil-side and product-side pitting and general wall loss that visual inspection cannot quantify. It is a screening method: each significant indication is then verified with ultrasonic thickness measurement to produce a defensible remaining-thickness value.',
    },
    {
      q: 'What certification is required to inspect an aboveground storage tank?',
      a: 'An API 653 Authorized Aboveground Storage Tank Inspector certification, issued under API’s Individual Certification Program (ICP). It requires a qualifying education-and-experience combination, a passing score on the closed-book + open-book examination, and recertification every three years.',
    },
    {
      q: 'What is the difference between API 650 and API 653?',
      a: 'API 650 is the construction standard for new welded aboveground storage tanks; API 653 governs the in-service inspection, repair, alteration and reconstruction of those tanks once they are operating. New tanks are built to API 650, then maintained and re-certified under API 653 — and API 653 reaches back to API 650 acceptance criteria when evaluating repairs and reconstruction.',
    },
    {
      q: 'How is tank-floor corrosion rate and remaining life calculated?',
      a: 'From MFL floor-scan and follow-up UT data, the corrosion rate is the metal lost divided by the time in service, evaluated for both the topside (product-side) and underside (soil-side) of the floor plates. Remaining life is the metal above the API 653 minimum (or the alternative settlement/pitting criteria) divided by the governing rate. That number sets the next internal inspection interval, capped at 20 years or per a risk-based assessment.',
    },
  ],
  internalLinks: [
    { href: '/certifications/api-653', label: 'API 653 certification requirements', context: 'cert' },
    { href: '/certifications/api-510', label: 'API 510 pressure vessel inspector', context: 'cert' },
    { href: '/methods/ultrasonic-testing', label: 'Ultrasonic testing method', context: 'method' },
    { href: '/methods/magnetic-particle-testing', label: 'Magnetic particle testing', context: 'method' },
    { href: '/pillars/corrosion-monitoring-pillar', label: 'Corrosion monitoring hub', context: 'pillar' },
    { href: '/pillars/refinery-inspection-pillar', label: 'Refinery inspection hub', context: 'pillar' },
  ],
  citations: [
    { id: 'api-653', source: 'API 653, Tank Inspection, Repair, Alteration, and Reconstruction, 5th ed.', url: 'https://www.api.org/products-and-services/standards' },
    { id: 'api-650', source: 'API 650, Welded Tanks for Oil Storage', url: 'https://www.api.org/products-and-services/standards' },
    { id: 'api-651', source: 'API 651, Cathodic Protection of Aboveground Petroleum Storage Tanks' },
    { id: 'api-652', source: 'API 652, Lining of Aboveground Petroleum Storage Tank Bottoms' },
    { id: 'spcc', source: 'US EPA, 40 CFR 112 — Spill Prevention, Control, and Countermeasure (SPCC) Rule', url: 'https://www.epa.gov/oil-spills-prevention-and-preparedness-regulations' },
  ],
};

export default pillar;
