import type { PillarHubContent } from '../types';

const pillar: PillarHubContent = {
  slug: 'weld-inspection-pillar',
  metaTitle: 'Weld Inspection Hub: NDT Methods, Codes, Acceptance Criteria',
  metaDescription:
    'The full weld inspection cluster — VT, PT, MT, RT, UT, PAUT, TOFD. Codes (AWS D1.1, ASME IX, API 1104), acceptance criteria, and WPS qualification.',
  heroLede:
    'Weld inspection is the discipline NDT was invented to serve, and it remains the largest single line item in industrial inspection spend. Every pressure vessel, every pipeline, every structural connection, every refinery fitting carries a welded joint whose acceptance is governed by one of three code regimes — AWS D1.1 for structural steel, ASME Section IX and the construction code (Section VIII, B31.3, B31.1) for pressure equipment, and API 1104 for pipelines. This hub maps the full weld inspection cluster: visual inspection under AWS QC1 and CWI certification, surface methods (MT and PT) under ASME Section V Articles 6 and 7, volumetric methods (RT, UT, PAUT, TOFD), and the welding procedure qualification regime under ASME Section IX that ties NDT acceptance back to the welder qualification.',
  topicOverview:
    'The weld inspection cluster covers four phases in the welding life cycle. (1) Procedure qualification — WPS development under ASME Section IX, AWS D1.1 Clause 4, or API 1104 §5, with the supporting PQR test results. (2) Welder qualification — performance test welds under ASME Section IX QW-301 or AWS D1.1 Clause 4, with the resulting WPQ. (3) Production inspection — visual under AWS D1.1 §6 or AWS QC1 CWI procedures, surface NDT (MT for ferritic, PT for non-ferritic and stainless), and volumetric NDT (RT or UT/PAUT/TOFD) per the construction code\'s coverage requirement. (4) Acceptance and disposition — pass/fail under the construction code\'s acceptance criteria (ASME Section VIII UW-51 for full RT, UW-52 for spot RT, AWS D1.1 §6.12-6.13 for structural, API 1104 §9 conventional or Annex A AUT). Sub-articles cover specific weld types (butt, fillet, socket, branch, overlay), geometric configurations (single-V, double-V, J-groove, square butt, dissimilar metal), and the acceptance differences between static and dynamic loading.',
  subPages: [
    {
      href: '/methods/visual-inspection',
      label: 'Visual Inspection (VT)',
      description:
        'The first and most-cited NDT method. AWS QC1 CWI certification, AWS D1.1 §6 visual acceptance, and the inspection-stage workflow (root, hot pass, fill, cap, final).',
    },
    {
      href: '/methods/magnetic-particle-testing',
      label: 'MT for Weld Inspection',
      description:
        'Surface and near-surface flaw detection on ferritic welds. Yoke technique with two perpendicular field directions per ASME Section V Article 7 T-754.',
    },
    {
      href: '/methods/liquid-penetrant-testing',
      label: 'PT for Weld Inspection',
      description:
        'Surface flaw detection on stainless, aluminum, and non-ferromagnetic alloys. Visible Type II for field weld work, fluorescent Type I for high-sensitivity applications.',
    },
    {
      href: '/methods/radiographic-testing',
      label: 'RT for Weld Inspection',
      description:
        'Volumetric inspection of butt welds — the historical default under ASME Section VIII UW-51 and AWS D1.1 §6.20. Source selection, IQI placement, and acceptance.',
    },
    {
      href: '/methods/ultrasonic-testing',
      label: 'UT for Weld Inspection',
      description:
        'Conventional pulse-echo UT — manual scanning with single-angle 45°/60°/70° probes per ASME Section V Article 4. DAC curve construction and beam coverage.',
    },
    {
      href: '/methods/phased-array-ultrasonic-testing',
      label: 'PAUT for Weld Inspection',
      description:
        'Sectorial scans across single-V, double-V, and J-groove welds. The procedure-qualified replacement for RT under ASME Section VIII Mandatory Appendix 12.',
    },
    {
      href: '/methods/time-of-flight-diffraction',
      label: 'TOFD for Weld Inspection',
      description:
        'Through-wall sizing of weld flaws to ±0.5 mm. Run in combination with PAUT for full coverage under ASME Section V Article 4 Mandatory Appendix III.',
    },
    {
      href: '/standards/aws-d1-1',
      label: 'AWS D1.1 — Structural Welding Code (Steel)',
      description:
        'The structural steel welding code. Clause 4 procedure qualification, Clause 6 inspection, Clause 7 stud welding, and the cyclic-loaded vs statically-loaded acceptance criteria.',
    },
    {
      href: '/standards/asme-section-ix',
      label: 'ASME Section IX — Welding Qualification',
      description:
        'The welding procedure and welder qualification code. Variables (essential, supplementary essential, non-essential) and the WPS/PQR/WPQ structure.',
    },
    {
      href: '/standards/api-1104',
      label: 'API 1104 — Welding of Pipelines',
      description:
        'The pipeline welding and inspection code. Section 5 procedure qualification, Section 6 welder qualification, Sections 9 and 11 acceptance criteria.',
    },
    {
      href: '/learn/wps-pqr-wpq-relationship',
      label: 'WPS, PQR, and WPQ — How They Tie Together',
      description:
        'The procedure qualification record (PQR) supports the welding procedure specification (WPS), which then governs welder performance qualification (WPQ). The audit trail.',
    },
    {
      href: '/learn/aws-cwi-certification',
      label: 'AWS CWI Certification Path',
      description:
        'The Certified Welding Inspector pathway — exam structure, prerequisite experience, body of knowledge, and the renewal requirements.',
    },
    {
      href: '/tools/weld-rejection-rate-calculator',
      label: 'Weld Rejection Rate Calculator',
      description:
        'Compute and trend weld rejection rate by welder, procedure, and method — the leading indicator of welder qualification drift.',
    },
    {
      href: '/compare/rt-vs-paut-for-welds',
      label: 'RT vs PAUT for Weld Acceptance',
      description:
        'Where each method wins on cost, schedule, find rate, and code acceptance. The migration is real but uneven.',
    },
  ],
  expertCommentary:
    'The largest cost center we audit in industrial fabrication is not weld rejection — it is the rework that follows because the inspection was wrong, not the weld. Three patterns recur. First, conventional UT specified at 45° single-angle for full coverage of a double-V groove on plate above 25 mm. The 45° beam geometry does not reach the fusion line on the back face, and the typical lack-of-fusion at the second-side root is invisible. Either change the angle range to 45/60/70 with documented coverage, or use PAUT sectorial across the same range in one shot. Second, MT specified without the perpendicular-field direction requirement. ASME Section V Article 7 T-754 mandates two perpendicular field directions, and the most common audit finding we issue is single-direction-only inspection. The longitudinal cracks in the weld toe will not show under a yoke positioned to drive a longitudinal field. Third, PT performed on as-welded surfaces without the wire-brush cleanup. Slag remnants and weld smoke trap penetrant and produce indications that disposition as cracks under developer. The rework cost on a single misidentified indication on a stainless steel piping spool runs $800-1,500 by the time the joint is ground out and re-welded — and the original weld was acceptable. The fix is procedural: every weld inspection procedure should specify the NDT method by weld type and material, the acceptance criteria reference (UW-51, §6.12, §9.3), and the surface preparation requirement. A boilerplate "perform PT per ASME Section V Article 6" is not a procedure — it is an invitation to rework.',
  externalResources: [
    {
      label: 'AWS — American Welding Society Standards',
      url: 'https://www.aws.org/standards',
    },
    {
      label: 'ASME — BPVC Section IX, Welding Qualification',
      url: 'https://www.asme.org/codes-standards/find-codes-standards/bpvc-ix-bpvc-section-ix-welding-brazing-fusing-qualifications',
    },
    {
      label: 'API 1104 — Welding of Pipelines',
      url: 'https://www.api.org/products-and-services/standards/important-standards-announcements/standard-1104',
    },
    {
      label: 'ISO 5817 — Welding, Quality Levels for Imperfections',
      url: 'https://www.iso.org/standard/54952.html',
    },
    {
      label: 'AWS CWI — Certified Welding Inspector Program',
      url: 'https://www.aws.org/certification/certified-welding-inspector',
    },
  ],
  faqs: [
    {
      q: 'When do I use AWS D1.1 versus ASME for weld acceptance?',
      a: 'Application governs. AWS D1.1 covers structural steel welds — building frames, bridges, offshore platforms, crane runways — and ties to AISC for the design code. ASME Section VIII Division 1/2 and the B31 piping codes govern pressure-containing welds in process equipment and piping. API 1104 governs onshore and offshore pipeline construction. The acceptance criteria differ materially — AWS D1.1 §6.12 distinguishes statically vs cyclically loaded structures, ASME UW-51 uses linear-indication and rounded-indication limits keyed to thickness, and API 1104 §9 uses defect-type-specific limits. Specifying the wrong code as the acceptance reference is a frequent procurement-document error that surfaces at the first AIA audit.',
    },
    {
      q: 'What is required for an ASME Section IX WPS qualification?',
      a: 'A WPS (Welding Procedure Specification) must be supported by a PQR (Procedure Qualification Record) that documents the test weld results. The PQR test weld is welded by a qualified welder under the proposed WPS variables, then subjected to bend tests, tensile tests, and (for certain materials) impact tests per Section IX QW-451. The PQR fixes the essential variables (base metal P-Number, filler metal F-Number, position, preheat, postweld heat treatment, etc.) within the ranges set out in Section IX QW-401 through QW-410. The WPS may then be written within those variable ranges. Welder performance qualification (WPQ) is then performed against the WPS by each welder before they work to it.',
    },
    {
      q: 'When is full RT required versus spot RT under ASME VIII?',
      a: 'ASME Section VIII Division 1 UW-11 sets three RT categories: full radiography of all welds (UW-11(a)), spot radiography (UW-11(b)), or no radiography (UW-11(c)). Full RT is required when the joint efficiency credit E = 1.0 is taken in the wall thickness calculation; spot RT gives E = 0.85; no RT gives E = 0.70. The design economic choice — taking the full-RT efficiency credit reduces wall thickness and the cost of material — drives the inspection regime. Full RT typically covers 100% of Category A and B welds plus Category C welds at attachment to other welds, with the acceptance criteria of UW-51.',
    },
    {
      q: 'How does PAUT replace RT for code-required volumetric inspection?',
      a: 'ASME Code Case 2235 (now incorporated into Section VIII Division 1 through Mandatory Appendix 12 and Division 2 through Mandatory Appendix 9) authorizes PAUT or TOFD in lieu of RT when (1) the procedure is qualified per ASME Section V Article 4 Mandatory Appendices, (2) the personnel are demonstration-qualified, and (3) the acceptance criteria are met. For pipelines, API 1104 Annex A authorizes AUT (encoded PAUT + TOFD) with engineering critical assessment-derived acceptance. The owner specification still controls — many owner specs require RT regardless of code permission, and the project specification must explicitly authorize the PAUT substitution.',
    },
  ],
  internalLinks: [
    {
      href: '/learn/visual-inspection-checklist',
      label: 'Visual Inspection Checklist for Production Welds',
      context: 'The CWI shift-by-shift inspection routine — root pass, fill, cap, final — with the AWS D1.1 §6.9 acceptance call-outs.',
    },
    {
      href: '/learn/dac-curve-construction',
      label: 'Building a DAC Curve for Weld UT',
      context: 'The DAC procedure under ASME Section V Article 4 — block selection, reflector positions, and the 50% DRL recording level.',
    },
    {
      href: '/learn/preheat-and-pwht-requirements',
      label: 'Preheat and PWHT Requirements',
      context: 'The thermal-control variables that drive cold cracking and stress relief — referenced in WPS essential variables.',
    },
    {
      href: '/standards/asme-section-viii-div-1',
      label: 'ASME Section VIII Division 1',
      context: 'The pressure vessel construction code that the weld inspection regime feeds.',
    },
    {
      href: '/standards/aws-d1-5',
      label: 'AWS D1.5 — Bridge Welding Code',
      context: 'The DOT-specific bridge welding code with stricter acceptance criteria than D1.1 for cyclic loading.',
    },
    {
      href: '/case-studies/paut-replacing-rt-on-stainless-piping',
      label: 'Case Study: PAUT Replacing RT on Stainless Piping',
      context: 'A $14M stainless piping fabrication where PAUT acceptance under Mandatory Appendix 12 saved 22 night shifts of RT.',
    },
    {
      href: '/tools/joint-efficiency-calculator',
      label: 'Joint Efficiency Calculator',
      context: 'Compute weld joint efficiency under ASME Section VIII UW-12 by joint category and inspection regime.',
    },
    {
      href: '/careers/awscwi',
      label: 'AWS CWI Career Path',
      context: 'The Certified Welding Inspector role — typical entry, salary trajectory, and the renewal cycle.',
    },
  ],
  citations: [
    {
      id: 'aws-d1-1',
      source: 'AWS D1.1/D1.1M:2020, Structural Welding Code — Steel',
    },
    {
      id: 'asme-ix',
      source: 'ASME BPVC Section IX, 2023 ed., Welding, Brazing, and Fusing Qualifications',
    },
    {
      id: 'api-1104',
      source: 'API 1104, 22nd ed., 2021, Welding of Pipelines and Related Facilities',
    },
    {
      id: 'asme-viii-uw-51',
      source: 'ASME BPVC Section VIII Div. 1, 2023 ed., UW-51 — Radiographic Examination',
    },
    {
      id: 'iso-5817',
      source: 'ISO 5817:2023, Welding — Fusion-welded Joints in Steel, Nickel, Titanium and Their Alloys — Quality Levels for Imperfections',
    },
  ],
};

export default pillar;
