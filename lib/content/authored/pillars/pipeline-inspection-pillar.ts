import type { PillarHubContent } from '../types';

const pillar: PillarHubContent = {
  slug: 'pipeline-inspection-pillar',
  metaTitle: 'Pipeline Inspection Hub: ILI, AUT, Direct Assessment, ECA',
  metaDescription:
    'The full pipeline inspection cluster — new construction AUT, ILI MFL/UT crack tools, direct assessment, ECA, integrity management under 49 CFR 192/195.',
  heroLede:
    'Pipeline integrity management is the only inspection discipline regulated as a closed-loop program by federal law — 49 CFR Part 192 for gas, Part 195 for hazardous liquid — and the only one where the inspection result triggers a documented response within a defined time window. This hub maps the full pipeline inspection cluster: construction-phase weld inspection (manual UT, AUT, RT), in-line inspection (ILI) with MFL and UT crack-detection tools, direct assessment for unpiggable lines (ECDA, ICDA, SCCDA), engineering critical assessment for fitness-for-service, and the integrity management program structure under ASME B31.8S and API 1160.',
  topicOverview:
    'The pipeline cluster splits into three phases. (1) New construction — girth weld inspection by manual UT, RT, or encoded AUT/PAUT-TOFD combo under API 1104 §11 or Annex A; coating inspection (jeeping); hydrotest under 49 CFR §192.505 or §195.300; pre-commissioning cleaning and gauging. (2) Operating-phase inspection — ILI with magnetic flux leakage (MFL) tools for metal loss, ultrasonic crack-detection tools (UT-CD) for stress corrosion cracking and seam cracks, inertial mapping units for geometry and strain, and electromagnetic acoustic transducer (EMAT) tools for top-of-line and stress corrosion cracking. (3) Direct assessment — external corrosion direct assessment (ECDA) for unpiggable lines per NACE SP0502, internal corrosion direct assessment (ICDA), stress corrosion cracking direct assessment (SCCDA). The cluster also covers engineering critical assessment under API 579-1/ASME FFS-1 and BS 7910, the response criteria under 49 CFR §192.933 and §195.452, and the regulatory framework administered by PHMSA.',
  subPages: [
    {
      href: '/methods/automated-ultrasonic-testing',
      label: 'Automated UT for Pipeline Girth Welds',
      description:
        'The encoded PAUT/TOFD combination scanner workflow for new construction girth welds — the AUT acceptance under API 1104 Annex A with engineering critical assessment.',
    },
    {
      href: '/methods/inline-inspection',
      label: 'In-Line Inspection (ILI) Overview',
      description:
        'The smart pig fleet — MFL, ultrasonic crack detection, inertial mapping, EMAT, and high-resolution geometry. Tool selection by threat and the run cycle.',
    },
    {
      href: '/methods/mfl-pigging',
      label: 'Magnetic Flux Leakage (MFL) ILI',
      description:
        'The dominant metal-loss ILI technology. Axial-field tools for general corrosion and transverse-field tools for axial slotting and seam-weld anomalies.',
    },
    {
      href: '/methods/ultrasonic-ili',
      label: 'Ultrasonic ILI (UT and UT-CD)',
      description:
        'Liquid-coupled UT tools for wall thickness on liquid lines and ultrasonic crack detection (UT-CD) tools for stress corrosion cracking and seam-weld cracks.',
    },
    {
      href: '/methods/direct-assessment',
      label: 'Direct Assessment (ECDA/ICDA/SCCDA)',
      description:
        'The four-step direct assessment process for unpiggable lines per NACE SP0502 (ECDA), SP0206 (ICDA), and SP0204 (SCCDA).',
    },
    {
      href: '/standards/api-1104',
      label: 'API 1104 — Welding of Pipelines',
      description:
        'The pipeline construction welding and inspection code. Section 9 conventional acceptance, Section 11 inspection methods, Annex A alternative acceptance with AUT.',
    },
    {
      href: '/standards/49-cfr-192',
      label: '49 CFR Part 192 — Gas Pipeline Safety',
      description:
        'The federal regulation for natural gas transmission and distribution. Subpart O integrity management program, inspection assessment intervals, and response criteria.',
    },
    {
      href: '/standards/49-cfr-195',
      label: '49 CFR Part 195 — Hazardous Liquid Pipeline Safety',
      description:
        'The federal regulation for hazardous liquid pipelines. Integrity management under §195.452, assessment intervals, and the high-consequence area framework.',
    },
    {
      href: '/standards/asme-b31-8s',
      label: 'ASME B31.8S — Managing System Integrity',
      description:
        'The integrity management supplement to ASME B31.8 gas transmission piping code. The risk-based framework that 49 CFR Part 192 Subpart O references.',
    },
    {
      href: '/standards/api-1160',
      label: 'API 1160 — Managing Pipeline System Integrity',
      description:
        'The hazardous liquid pipeline integrity management framework that 49 CFR Part 195 §195.452 references for risk-based assessment.',
    },
    {
      href: '/learn/eca-for-pipeline-girth-welds',
      label: 'Engineering Critical Assessment for Girth Welds',
      description:
        'The fitness-for-service procedure that justifies AUT acceptance under API 1104 Annex A — fracture toughness testing, finite element flaw assessment, and the resulting tolerable flaw size table.',
    },
    {
      href: '/tools/eca-flaw-tolerance-calculator',
      label: 'ECA Tolerable Flaw Calculator',
      description:
        'Compute tolerable surface and embedded flaw dimensions for a given pipe geometry, material toughness, and loading per BS 7910.',
    },
    {
      href: '/industries/pipeline',
      label: 'Pipeline Industry Overview',
      description:
        'Industry sizing, regulatory framework, operator categories (transmission, distribution, gathering, midstream), and the inspection spend profile across the asset life cycle.',
    },
    {
      href: '/case-studies/aut-girth-weld-deep-water-lay-barge',
      label: 'Case Study: AUT on a Deep-Water Lay Barge',
      description:
        'A fully encoded AUT spread handled 14 girth welds per day on a 32-inch gas line at 1,400 m water depth — crew composition, weld rejection rate, and schedule outcome.',
    },
  ],
  expertCommentary:
    'AUT for pipeline girth welds is sold as a faster RT replacement. It is faster, but only after roughly 200 girth welds — below that the ECA setup cost (mechanical testing, fracture toughness, weld procedure qualification per BS 7910 or API 579-1) does not amortize, and manual UT or RT under API 1104 §9 conventional acceptance is the right answer. The economic threshold flips when you account for the schedule risk of RT — night-shift work, area control, and weather-driven exposure rework — but the threshold is the threshold and the project economics analysis must be done before committing. Second, on ILI: the biggest mistake operators make is running a single-technology tool when the threat universe requires two. MFL handles metal loss well and catches almost nothing of axial cracking; UT-CD handles cracks well and is blind to general corrosion in many tool configurations. A combo run with MFL plus UT-CD on the same pipeline within the same outage window is twice the cost and four times the threat coverage. PHMSA-prescribed assessment under 49 CFR §192.937 explicitly permits the combo and the leading operators do it. Third, direct assessment is the right answer when ILI cannot run, but it is misapplied as a cheaper substitute for ILI on piggable lines. ECDA\'s four-step process (pre-assessment, indirect inspection, direct examination, post-assessment) is procedurally robust only when the pipe is genuinely unpiggable — bend radius too tight, no launcher/receiver, or low-flow gathering that cannot drive a tool. On a piggable line, ECDA misses corrosion that ILI would catch routinely, and the regulatory assessment will fail. Pick the assessment technology for the threat, not for the cost line item.',
  externalResources: [
    {
      label: 'PHMSA — Pipeline Safety Regulations',
      url: 'https://www.phmsa.dot.gov/regulations',
    },
    {
      label: 'API 1104 — Welding of Pipelines and Related Facilities',
      url: 'https://www.api.org/products-and-services/standards/important-standards-announcements/standard-1104',
    },
    {
      label: 'ASME B31.8S — Managing System Integrity of Gas Pipelines',
      url: 'https://www.asme.org/codes-standards/find-codes-standards/b31-8s-managing-system-integrity-gas-pipelines',
    },
    {
      label: 'NACE SP0502 — External Corrosion Direct Assessment',
      url: 'https://store.ampp.org/sp0502-pipeline-external-corrosion-direct-assessment-methodology',
    },
    {
      label: 'BS 7910 — Acceptance of Flaws in Metallic Structures (ECA)',
      url: 'https://knowledge.bsigroup.com/products/guide-to-methods-for-assessing-the-acceptability-of-flaws-in-metallic-structures',
    },
  ],
  faqs: [
    {
      q: 'When does AUT replace RT for pipeline girth welds?',
      a: 'The economic threshold is roughly 200 girth welds — below that, the engineering critical assessment setup cost (mechanical testing, fracture toughness CTOD testing, weld procedure qualification) does not amortize against the per-weld AUT cost premium over manual UT or RT under conventional acceptance. The technical threshold is set by API 1104 Annex A: AUT acceptance requires an ECA-derived tolerable flaw size table specific to the project material, geometry, and loading. AUT also wins on schedule for offshore lay-barge work — RT requires source approvals, vessel posting, and night shooting that AUT does not, and AUT can run at the pace of the welding crew (typically 1 weld per 30-45 minutes).',
    },
    {
      q: 'What are MFL and UT-CD ILI tools good for, respectively?',
      a: 'MFL (magnetic flux leakage) is the volumetric metal-loss workhorse. Axial-field MFL resolves general corrosion, isolated pitting, and gouge-type defects with sizing accuracy of roughly ±10% of wall thickness on a typical 16-inch crude line. Transverse-field MFL (or circumferential MFL) is added for axial slotting, long-seam anomalies, and mechanical damage. UT-CD (ultrasonic crack detection) is required for stress corrosion cracking, fatigue cracks, and seam-weld toe cracks — MFL is largely blind to crack-like axial flaws because the leakage field is parallel to the flaw. The two technologies are complementary, not redundant.',
    },
    {
      q: 'What is the PHMSA assessment interval for HCA segments?',
      a: 'Under 49 CFR §195.452 for hazardous liquid pipelines, integrity assessments on segments that could affect a high-consequence area must be performed at intervals not exceeding 5 years from the date of the last assessment. The reassessment interval may be extended only through a documented engineering analysis that justifies the extended interval based on the threats present, the assessment effectiveness, and the corrosion growth rate. For gas transmission under 49 CFR §192.939, the interval is 7 years for HCA segments. The interval clock starts at the previous assessment completion date, not at any anomaly response date.',
    },
    {
      q: 'When is direct assessment acceptable instead of ILI?',
      a: 'Direct assessment under NACE SP0502 (ECDA), SP0206 (ICDA), or SP0204 (SCCDA) is acceptable under 49 CFR §192.937 and §195.452 when the line is genuinely unpiggable — no launcher/receiver, bend radius too tight, or flow regime that will not drive an inspection tool. The four-step process must be executed fully (pre-assessment, indirect inspection, direct examination, post-assessment) and the post-assessment must validate the tool/method effectiveness by comparison to direct examination results. The largest pitfall is over-relying on indirect inspection (CIPS, DCVG, ACVG) without enough direct examinations — typical guidance is 3-5 direct examination digs per segment minimum, with more for high-threat lines.',
    },
  ],
  internalLinks: [
    {
      href: '/learn/ili-tool-selection-by-threat',
      label: 'ILI Tool Selection by Threat',
      context: 'The threat-to-tool mapping for the 22 PHMSA-defined pipeline threat categories.',
    },
    {
      href: '/learn/aut-procedure-qualification-eca',
      label: 'AUT Procedure Qualification with ECA',
      context: 'Step-by-step qualification of an encoded AUT procedure under API 1104 Annex A — required test pieces, flaw geometries, sizing accuracy.',
    },
    {
      href: '/learn/pipeline-coating-inspection',
      label: 'Pipeline Coating Inspection (Jeeping)',
      context: 'Holiday detection on FBE and three-layer coatings — voltage settings, jeep speeds, and the inspection record requirements.',
    },
    {
      href: '/standards/asme-b31-4',
      label: 'ASME B31.4 — Hazardous Liquid Pipeline Code',
      context: 'The construction code companion to 49 CFR Part 195 — material, design, fabrication, and inspection.',
    },
    {
      href: '/standards/asme-b31-8',
      label: 'ASME B31.8 — Gas Transmission and Distribution',
      context: 'The construction code companion to 49 CFR Part 192 — material, design, fabrication, hydrotest, and operating limits.',
    },
    {
      href: '/case-studies/ili-cracking-detection-with-emat',
      label: 'Case Study: EMAT ILI for Top-of-Line Stress Corrosion',
      context: 'A gas transmission line where MFL alone missed near-neutral pH stress corrosion cracking that EMAT detected on a follow-up run.',
    },
    {
      href: '/tools/hydrotest-pressure-calculator',
      label: 'Hydrotest Pressure Calculator',
      context: 'Compute hydrotest pressure for a pipe segment per 49 CFR §192.505 or §195.300 with the appropriate test factor.',
    },
    {
      href: '/careers/pipeline-integrity-engineer',
      label: 'Pipeline Integrity Engineer Career',
      context: 'The career path into pipeline integrity engineering — typical entry from civil/mechanical engineering with corrosion training.',
    },
  ],
  citations: [
    {
      id: 'api-1104',
      source: 'API 1104, 22nd ed., 2021, Welding of Pipelines and Related Facilities',
    },
    {
      id: '49-cfr-192',
      source: '49 CFR Part 192, Transportation of Natural and Other Gas by Pipeline: Minimum Federal Safety Standards',
    },
    {
      id: '49-cfr-195',
      source: '49 CFR Part 195, Transportation of Hazardous Liquids by Pipeline',
    },
    {
      id: 'asme-b31-8s',
      source: 'ASME B31.8S-2022, Managing System Integrity of Gas Pipelines',
    },
    {
      id: 'nace-sp0502',
      source: 'NACE SP0502-2010, Pipeline External Corrosion Direct Assessment Methodology',
    },
  ],
};

export default pillar;
