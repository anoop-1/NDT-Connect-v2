import type { StandardContent } from '../types';

const standard: StandardContent = {
  code: 'API 571',
  fullTitle: 'Damage Mechanisms Affecting Fixed Equipment in the Refining Industry',
  organization: 'American Petroleum Institute',
  edition: '3rd Edition, March 2020',
  slug: 'api-571',
  metaTitle: 'API 571 Damage Mechanisms: 67 Modes, Inspection Targets, Citations',
  metaDescription: 'API 571 3rd ed. (2020) catalogs 67 damage mechanisms for refining and petrochemical equipment. Critical inputs to API 510/570/653/580/581 programs.',
  heroLede:
    'You cannot write a credible API 510, API 570, API 653, or RBI program without anchoring every Condition Monitoring Location to a specific damage mechanism — and that mechanism is named, described, and parameterized in API 571. The 3rd edition (March 2020) catalogs 67 distinct damage mechanisms organized into nine categories: mechanical and metallurgical, uniform or localized corrosion, high-temperature corrosion, environment-assisted cracking, hydrogen-assisted damage, refinery-specific damage in upstream/downstream units, and others. Each mechanism gets a fact sheet: description, affected materials, critical factors, appearance and morphology, prevention and mitigation, inspection methods, and example. CMLs that are not justified by a §X.X reference to API 571 fail audits across the US refining industry.',
  scope:
    'API 571 covers damage mechanisms encountered in fixed pressure equipment (vessels, piping, exchangers, tanks, fired heaters) in petroleum refining, petrochemical, and chemical processing. The 3rd edition expanded coverage for several mechanisms (HTHA, MIC, naphthenic acid corrosion, polythionic SCC) and added clarifications on inspection effectiveness. It does not cover rotating equipment, electrical equipment, or offshore-specific mechanisms beyond cross-listed corrosion modes (CUI, atmospheric corrosion, marine corrosion). It is structurally a recommended practice, not an enforceable standard — but it is invoked by every enforceable in-service inspection code, making compliance mandatory in practice.',
  whoMustComply: [
    'Inspection engineers and corrosion engineers writing or auditing API 510, 570, 653, and RBI programs',
    'Owner-operators of PSM-covered equipment under OSHA 29 CFR 1910.119',
    'API Authorized Inspectors required to recognize and report on damage mechanisms during in-service inspections',
    'EPC firms performing materials selection for new refining or petrochemical units',
    'Insurance loss control engineers evaluating mechanical integrity programs',
    'Damage mechanism review facilitators on multi-disciplinary corrosion review teams',
  ],
  keyRequirements: [
    {
      heading: 'Mechanism categories and fact-sheet structure',
      level: 2,
      paragraphs: [
        'Each mechanism is documented as a standardized fact sheet with these elements: description, affected materials, critical factors, affected units/equipment, appearance and morphology, prevention/mitigation, and inspection and monitoring. The 67 mechanisms are organized into nine categories. Category 3 (uniform or localized loss in thickness) contains 18 mechanisms including atmospheric corrosion, CUI, galvanic corrosion, microbiologically influenced corrosion (MIC), CO2 corrosion, and naphthenic acid corrosion. Category 4 (high-temperature corrosion >400°F) contains sulfidation, oxidation, carburization, decarburization, metal dusting, and others.',
        'Category 5 (environment-assisted cracking) covers chloride SCC, caustic SCC, polythionic acid SCC, amine SCC, sour cracking, ammonia cracking, and others. Category 6 (hydrogen-assisted) covers hydrogen blistering, HIC, SOHIC, sulfide stress cracking (SSC), and high-temperature hydrogen attack (HTHA). Each fact sheet identifies the affected materials with specificity — for example, polythionic SCC in §5.1.2.1 lists austenitic stainless steels (300 series) sensitized to chromium carbide precipitation during stress relief or service.',
      ],
    },
    {
      heading: 'Sulfidation and HTHA — the high-stakes mechanisms',
      level: 2,
      paragraphs: [
        'Sulfidation per §4.4.2 affects carbon steel, low-alloy steels, and chromium-molybdenum steels in any service above 500°F with sulfur compounds. The corrosion rate depends on temperature, sulfur concentration, and material chromium content — the McConomy curves (originally developed by Shell in the 1960s, revised in API 581) predict rates from these inputs. Sulfidation drove the fatal 2012 Chevron Richmond refinery fire when a carbon steel sidecut piping line thinned faster than predicted due to low silicon content — a vulnerability now codified in industry guidance.',
        'HTHA per §5.1.3.1 affects carbon and low-alloy steels in hydrogen-bearing service above approximately 400°F. The Nelson curves from API 941 set screening boundaries; the 3rd edition added time-temperature-pressure-dependent modeling for cases where Nelson screening is inconclusive. HTHA caused the 2010 Tesoro Anacortes fatal accident in a heat exchanger. The 2020 edition expanded inspection guidance to require AUBT (advanced ultrasonic backscatter), TOFD with proper sizing, or microstructural sampling — simple thickness UT does not detect HTHA.',
      ],
      callout: {
        kind: 'warn',
        title: 'HTHA inspection requires the right method',
        body: 'Thickness UT alone is "not effective" for HTHA per Annex 2.C of API 581. Use AUBT (Olympus AVE-2 or equivalent), high-resolution TOFD, or in-situ metallography. Inspection programs that claim "Highly Effective" coverage for HTHA using thickness gauging fail audit.',
      },
    },
    {
      heading: 'CUI — the most frequent finding',
      level: 2,
      paragraphs: [
        'CUI per §3.4 affects carbon steel and 300 series stainless under insulation in the vulnerability temperature range — typically 25°F to 350°F for carbon steel, where condensation can form and where chloride concentrates from insulation, paint, or atmospheric sources. For 300-series stainless, the range is broader because chloride SCC can occur at higher temperatures. CUI is statistically the most common damage mechanism cited at refinery audits — it causes more piping leaks and more vessel external corrosion than any other mechanism.',
        'Inspection for CUI follows API 583 (Corrosion Under Insulation and Fireproofing). Methods range from screening (visual inspection of weather barrier, infrared thermography for damp insulation, electromagnetic eddy current for CUI under thin coating) to confirmatory inspection (insulation removal with visual + UT, pulsed eddy current for profile, real-time radiography). Programs that rely solely on temperature surveys typically rate only Fairly Effective and do not unlock interval extension.',
      ],
    },
    {
      heading: 'Damage mechanism review process',
      level: 2,
      paragraphs: [
        'A damage mechanism review (DMR) for a process unit is conducted by the corrosion engineer or RBI facilitator using API 571 as the catalog. Each piping circuit, each vessel, each exchanger is mapped against the API 571 mechanisms based on materials, operating conditions, process composition, and service history. The DMR output is documented and feeds directly into API 580/581 damage factor calculations and CML placement. The 3rd edition recommends DMR refresh every 5 years or whenever MOC events change operating envelope or feed composition.',
        'A common audit gap is "DMR done once at commissioning and never updated". Operating envelope creep, feed composition changes, and equipment modifications all shift active mechanisms — a hydrotreater that started on light naphtha and now processes heavy diesel has very different damage mechanism severity even though the equipment is unchanged. The DMR must reflect actual current service, not design service.',
      ],
    },
  ],
  relatedStandards: [
    { code: 'API 510', relation: 'Vessel inspection code requiring CML placement based on API 571 mechanisms' },
    { code: 'API 570', relation: 'Piping inspection code requiring damage mechanism-driven inspection planning' },
    { code: 'API 580/581', relation: 'RBI methodology requiring damage mechanism review per API 571 as input' },
    { code: 'API 941', relation: 'Nelson curves for HTHA screening, referenced from API 571 §5.1.3.1' },
    { code: 'API 583', relation: 'CUI and fireproofing corrosion inspection, paired with API 571 §3.4 CUI mechanism' },
  ],
  commonAuditFindings: [
    'Damage mechanism review missing or older than 5 years with envelope changes intervening. Citation: §1.4.',
    'CMLs placed on generic grid pattern with no API 571 mechanism reference per circuit. Citation: API 510 §6.3.',
    'HTHA inspection using UT thickness only, claimed Highly Effective. Citation: §5.1.3.1.',
    'Sulfidation rate predicted using carbon steel curve when material is actually low-silicon (post-Chevron Richmond clarification). Citation: §4.4.2.',
    'CUI excluded from inspection plan on insulated piping in vulnerability temperature range. Citation: §3.4.',
    'Polythionic SCC potential ignored on 300-series stainless during shutdown wash conditions. Citation: §5.1.2.1.',
    'MIC potential ignored on buried piping or storage tank bottoms in wet service. Citation: §3.5.',
    'Naphthenic acid corrosion (TAN-driven) susceptibility not flagged on crude unit hot pumparounds. Citation: §4.4.3.',
  ],
  faqs: [
    {
      q: 'Why is API 571 a Recommended Practice rather than a Standard?',
      a: 'API distinguishes Standards (enforceable when adopted by jurisdiction), Recommended Practices (industry consensus best practice), and Bulletins. API 571 is RP because it catalogs phenomena rather than prescribing procedures — there is no compliance test for "knowing damage mechanisms". But it becomes practically mandatory because API 510, 570, 653, 580, and 581 all reference it as the required input to inspection planning. If your CMLs are not justified by API 571 mechanisms, the inspection program fails audit under the enforceable codes that depend on it.',
    },
    {
      q: 'How did the Chevron Richmond accident change API 571?',
      a: 'The August 2012 Chevron Richmond crude unit fire was caused by a piping rupture in low-silicon carbon steel under sulfidation attack. The accident exposed that the McConomy curves used at the time did not adequately distinguish between low-silicon (Si < 0.10%) and standard silicon carbon steel — low-silicon material corrodes 5-10× faster in sulfidation service. The 3rd edition of API 571 (2020) and the corresponding API 939-C guideline strengthened material verification requirements and added explicit recommendations for replacing low-silicon piping in sulfidation service. The CSB investigation report (2015) is required reading for refinery inspection engineers.',
    },
    {
      q: 'Does API 571 apply outside refining and petrochemical?',
      a: 'The standard title says "refining industry" but most mechanisms generalize to any process industry — chemical, fertilizer, gas processing, pulp and paper, power generation. Mechanism-specific guidance (sulfidation, naphthenic acid) is refinery-centric, but corrosion, cracking, and damage categories apply broadly. Power industry uses parallel guidance from EPRI; chemical industry layers on ChemTRA-style mechanism libraries for specialty chemicals. The framework — fact sheets, critical factors, inspection guidance — is widely adopted regardless of industry.',
    },
    {
      q: 'How often should a damage mechanism review be updated?',
      a: 'The 3rd edition recommends a full DMR refresh every 5 years or whenever an MOC event changes operating envelope, feed composition, materials, or equipment configuration in a way that could activate or deactivate a mechanism. Most refineries align DMR refresh with the RBI reassessment cadence (5 years for active programs). The DMR is a living document that should be referenced and updated at every turnaround inspection planning meeting, not a one-time deliverable. Best practice is a DMR appendix to each inspection plan that captures mechanism-specific scope and CML rationale.',
    },
  ],
  internalLinks: [
    { href: '/standards/api-510', label: 'API 510 inspection planning', context: 'Code requiring CMLs justified by API 571 mechanisms.' },
    { href: '/standards/api-570', label: 'API 570 piping inspection', context: 'Piping code referencing API 571 for mechanism review.' },
    { href: '/standards/api-580', label: 'API 580 RBI framework', context: 'Requires damage mechanism review as foundational input.' },
    { href: '/standards/api-581', label: 'API 581 RBI methodology', context: 'Quantitative damage factor depends on API 571 mechanism.' },
    { href: '/standards/api-579', label: 'API 579 FFS', context: 'FFS Part selection driven by API 571 mechanism identification.' },
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT for corrosion mapping', context: 'Effective for many API 571 thinning mechanisms.' },
    { href: '/industries/oil-gas-refining', label: 'Refining damage mechanism programs', context: 'Industry where API 571 review is mandatory under PSM.' },
    { href: '/find-providers', label: 'Find corrosion engineering services', context: 'Engage corrosion engineers for DMR facilitation.' },
  ],
  citations: [
    { id: 'api-571-cover', source: 'API 571, Damage Mechanisms Affecting Fixed Equipment in the Refining Industry, 3rd ed., March 2020', url: 'https://www.api.org/products-and-services/standards' },
    { id: 'api-571-3-4', source: 'API 571 §3.4 — Corrosion Under Insulation (CUI)' },
    { id: 'api-571-4-4-2', source: 'API 571 §4.4.2 — Sulfidation' },
    { id: 'api-571-4-4-3', source: 'API 571 §4.4.3 — Naphthenic acid corrosion' },
    { id: 'api-571-5-1-2-1', source: 'API 571 §5.1.2.1 — Polythionic acid SCC' },
    { id: 'api-571-5-1-3-1', source: 'API 571 §5.1.3.1 — High-temperature hydrogen attack (HTHA)' },
    { id: 'api-941', source: 'API 941, Steels for Hydrogen Service at Elevated Temperatures and Pressures, 8th ed. (2016)' },
    { id: 'api-939-c', source: 'API 939-C, Guidelines for Avoiding Sulfidation Corrosion Failures (2009)' },
    { id: 'csb-chevron', source: 'US CSB Final Investigation Report: Chevron Richmond Refinery Fire, August 6, 2012 (Report No. 2012-03-I-CA)' },
    { id: 'csb-tesoro', source: 'US CSB Final Investigation Report: Tesoro Anacortes Refinery, April 2010' },
    { id: 'api-510-571', source: 'API 510 §6.3 — Inspection planning and CMLs' },
    { id: 'api-580-571', source: 'API 580, Risk-Based Inspection, 4th ed. (2023)' },
    { id: 'api-583', source: 'API 583, Corrosion Under Insulation and Fireproofing, 1st ed. (2014)' },
  ],
};

export default standard;
