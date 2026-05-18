import type { StandardContent } from '../types';

const standard: StandardContent = {
  code: 'ASME Section V',
  fullTitle: 'BPVC Section V — Nondestructive Examination',
  organization: 'American Society of Mechanical Engineers',
  edition: '2023 Edition',
  slug: 'asme-section-v',
  metaTitle: 'ASME Section V: NDE Articles, Required References, Audit Gotchas',
  metaDescription: 'ASME Section V 2023 sets NDE requirements referenced by every BPVC construction code. Articles for RT, UT, MT, PT, ET, VT — procedure writing and audit pitfalls.',
  heroLede:
    'ASME Section V is the procedure standard every BPVC construction code points to whenever NDE is required. ASME Section VIII §UW-51 says radiographic examination shall be performed in accordance with Article 2 of Section V; B31.3 §344.3 says ultrasonic examination shall be performed in accordance with Article 4. The 2023 edition of Section V is organized into Subsection A (General Requirements — Article 1) and Subsection B (Documents Adopted by Section V — including referenced ASTM standards), with method-specific Articles 2 through 23 covering radiographic, ultrasonic, liquid penetrant, magnetic particle, eddy current, leak testing, acoustic emission, and visual examination. It is the procedure-writing manual for every ASME BPVC project in the US — and the source of more "your procedure does not meet code" audit findings than any other single document.',
  scope:
    'ASME Section V covers the methods and requirements for nondestructive examination as referenced by other BPVC sections and construction codes. It does not apply on its own — it is always invoked by a construction code (Section VIII, Section I, Section III, B31.1, B31.3, etc.) that specifies which Articles and acceptance criteria apply. Article 1 sets general requirements (procedure qualification, personnel qualification through SNT-TC-1A or CP-189, written procedure content). Articles 2-23 cover method-specific requirements. Mandatory and non-mandatory appendices supplement specific techniques (e.g., Article 4 has nine mandatory appendices for phased array, time-of-flight diffraction, encoded UT, and more).',
  whoMustComply: [
    'Fabricators of ASME BPVC pressure equipment performing NDE during construction',
    'NDE service contractors writing procedures used on ASME construction projects',
    'Authorized Inspectors (AIA-supplied) reviewing and accepting NDE procedures and results during fabrication',
    'NDE Level III personnel responsible for procedure approval per Article 1 and SNT-TC-1A',
    'EPC firms and engineering specifications writers invoking Section V articles in project NDE plans',
    'Equipment owner-users referencing Section V articles in in-service inspection procedures via API 510/570/653',
  ],
  keyRequirements: [
    {
      heading: 'Article 1 — General Requirements',
      level: 2,
      paragraphs: [
        'Article 1 (Subsection A) is mandatory for any Section V invocation. It requires written procedures for every NDE method, qualification of those procedures through demonstration or by use of approved standard procedures, personnel qualification per SNT-TC-1A (or CP-189 by contract), and procedure approval by a Level III. The 2023 edition aligned procedure content requirements explicitly with ASNT CP-189 essential variables — the written procedure must address each essential variable.',
        'Section T-150 specifies what must be in the written procedure: scope, applicable codes, personnel qualifications, equipment and materials, calibration, technique, examination sequence, recording requirements, acceptance criteria reference, reporting format. Missing any of these is a procedure deficiency at audit. T-180 requires procedure qualification by demonstration on a representative test piece with known reflectors — most procedures qualify through demonstration unless the procedure is explicitly listed as "standard" in the referenced ASTM document.',
      ],
    },
    {
      heading: 'Article 2 — Radiographic Examination',
      level: 2,
      paragraphs: [
        'Article 2 covers RT with X-ray and gamma-ray sources. Mandatory requirements include source-to-film distance (geometric unsharpness control via formulae in T-274), IQI (Image Quality Indicator) selection and placement (T-276, with ASTM E747 for wire IQIs and ASTM E1025 for hole-type), film system class per ASTM E1815 (typically Class I or Class II for code work), density range (1.8 to 4.0 for X-ray, 2.0 to 4.0 for gamma per T-282), and backscatter check (lead letter "B" on film back).',
        'Digital radiography (CR — computed radiography, DR — direct radiography) follows Article 2 with method-specific appendices. Mandatory Appendix III covers in-motion radiography. Mandatory Appendix V covers digital image acquisition with CR phosphor plates. Mandatory Appendix VII covers radiographic examination using radiometric line-scan technology. The 2023 edition tightened image quality requirements for digital methods to match the resolution achievable with film.',
      ],
      callout: {
        kind: 'spec',
        title: 'Density range is non-negotiable',
        body: 'A radiograph outside the density range in T-282 fails Article 2 regardless of how good the indications look. Density measurement at the area of interest with a calibrated densitometer is required documentation.',
      },
    },
    {
      heading: 'Article 4 — Ultrasonic Examination of Welds',
      level: 2,
      paragraphs: [
        'Article 4 covers manual ultrasonic examination of welds for thickness above 0.5 inches (per Section VIII UW-53). The article specifies calibration block requirements (basic calibration block with side-drilled holes per Figure T-434.2.1), distance-amplitude correction curves (DAC) construction, scanning patterns, indication evaluation criteria, and reporting. T-434.1 references SE-164 and SE-1316 (now ASTM E164 and ASTM E1316) for general practice and terminology.',
        'Article 4 has nine mandatory appendices. Mandatory Appendix IV covers PAUT for welds — the most-used appendix in modern construction. Appendix VIII covers manual TOFD. Appendix XI covers encoded UT for hydrogen-induced cracking. Appendix III covers in-service piping examination. The 2023 edition strengthened Appendix IV procedure qualification requirements for PAUT — beam simulation, focal law verification, and demonstration on test pieces with side-drilled holes plus EDM notches representing the relevant flaw types.',
      ],
    },
    {
      heading: 'Articles 6 and 7 — Penetrant and Magnetic Particle',
      level: 2,
      paragraphs: [
        'Article 6 covers liquid penetrant examination, referencing ASTM E165 for practice and ASTM E1417 for procedure qualification (used in aerospace). The procedure must address penetrant family (visible Type II, fluorescent Type I), penetrant level (1 through 4 for sensitivity), surface preparation, dwell times, developer application, viewing conditions (white light level for visible, UV-A irradiance and white-light limit for fluorescent), and acceptance criteria reference. Article 6 is technically simple but generates many audit findings on dwell time documentation and UV-A irradiance verification.',
        'Article 7 covers magnetic particle examination, referencing ASTM E709. Yoke and prod techniques are most common in fabrication shops; coil, central conductor, and direct contact (head-shot) are used for specific geometries. The 2023 edition aligned with ASTM E709 on lift-test requirements (10 lb yoke, 40 lb DC yoke), particle suspension concentration, and field strength verification using artificial-flaw test pieces (Pie gauge or QQI shim).',
      ],
    },
  ],
  relatedStandards: [
    { code: 'ASME BPVC Section VIII', relation: 'Pressure vessel construction code that references Section V Articles for NDE during fabrication' },
    { code: 'ASME B31.3', relation: 'Process piping construction code referencing Section V Article 2 (RT) and Article 4 (UT)' },
    { code: 'ASTM E165', relation: 'Liquid penetrant practice referenced from Section V Article 6' },
    { code: 'ASTM E709', relation: 'Magnetic particle practice referenced from Section V Article 7' },
    { code: 'ASNT SNT-TC-1A', relation: 'Personnel qualification recommended practice required by Section V Article 1' },
  ],
  commonAuditFindings: [
    'Written procedure missing one or more essential variables required by T-150. Citation: Article 1.',
    'Procedure not qualified by demonstration on representative test piece. Citation: T-180.',
    'Radiograph density outside 1.8-4.0 range at area of interest. Citation: T-282.',
    'IQI hole-type vs wire-type confused, or wrong essential hole identified. Citation: T-276 + ASTM E1025.',
    'PAUT focal law verification not documented in procedure qualification record. Citation: Article 4 Mandatory Appendix IV.',
    'PT dwell time exceeded maximum allowed for the penetrant family. Citation: Article 6.',
    'MT yoke lift-test not performed at start of shift. Citation: Article 7.',
    'Level III procedure approval signature missing or post-dated relative to examination dates. Citation: Article 1.',
  ],
  faqs: [
    {
      q: 'When do I use Section V versus an ASTM standard directly?',
      a: 'It depends on the governing construction code. If you are working on ASME BPVC equipment (Section VIII vessels, B31.3 piping, B31.1 power piping, Section I boilers, Section III nuclear), the construction code points you to Section V Articles, and Section V is the procedural authority. If you are working on commercial structures (AWS D1.1 building structural welds, ASTM A53 for ASTM-grade pipe), the relevant code typically references ASTM standards directly. Aerospace work follows ASTM E1417 and NAS 410 rather than Section V. Industrial customers sometimes specify Section V even for non-ASME work because the article structure is well-defined and audit-friendly.',
    },
    {
      q: 'How does Section V interact with ASNT SNT-TC-1A?',
      a: 'Section V Article 1 §T-120 requires personnel performing NDE to be qualified in accordance with the employer\'s written practice based on SNT-TC-1A or ASNT CP-189 unless the contract specifies otherwise. The 2023 edition explicitly recognizes both. The employer\'s written practice is the binding document — Section V tells you that you need one and what minimum standards it must meet. The actual examination is performed by Level II personnel under the written practice; procedures are approved by Level III; Level I performs basic data collection under direct Level II supervision.',
    },
    {
      q: 'Why does ASME publish a new Section V edition every two years?',
      a: 'BPVC follows a two-year edition cycle (2019, 2021, 2023, 2025) with code cases issued between editions for urgent updates. Section V is updated alongside the construction codes to incorporate new techniques (phased array, TOFD, digital radiography), tighten requirements based on field experience, and align with ASTM revisions. The construction code (Section VIII, B31.3, etc.) specifies which Section V edition applies — typically the edition in force when the equipment construction contract was signed, with the option to update to a current edition under owner-user agreement. Always check which Section V edition the construction code references; cross-edition mismatches are a common audit finding.',
    },
    {
      q: 'Can a PAUT procedure qualified under Article 4 Appendix IV replace traditional RT?',
      a: 'Yes — Section VIII UW-51 allows PAUT in lieu of RT for welds with thickness 0.5 inches and above, provided the PAUT procedure is qualified per Section V Article 4 Mandatory Appendix IV with demonstration of flaw detection equivalent to or better than RT. The procedure qualification record must include the test piece geometry, the planted reflectors (side-drilled holes plus EDM notches), the focal laws used, and the demonstrated detection capability. Many modern fabricators have switched from RT to PAUT for thick-wall vessels because of speed (no radiation exclusion zones, no film processing), but the qualification burden is significant — typically a 2-4 week qualification campaign before production starts.',
    },
  ],
  internalLinks: [
    { href: '/methods/radiographic-testing', label: 'Radiographic testing fundamentals', context: 'Method covered by Section V Article 2.' },
    { href: '/ultrasonic-testing', label: 'Ultrasonic testing of welds', context: 'Method covered by Section V Article 4.' },
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT for code work', context: 'Modern PAUT under Article 4 Appendix IV.' },
    { href: '/methods/penetrant-testing', label: 'Penetrant testing', context: 'Covered by Section V Article 6.' },
    { href: '/methods/magnetic-particle-testing', label: 'Magnetic particle testing', context: 'Covered by Section V Article 7.' },
    { href: '/standards/asme-bpvc', label: 'ASME BPVC overall', context: 'Code system that references Section V for NDE.' },
    { href: '/standards/asnt-snt-tc-1a', label: 'ASNT SNT-TC-1A personnel qualification', context: 'Required by Section V Article 1.' },
    { href: '/find-providers', label: 'Find Section V-qualified NDE contractors', context: 'Engage NDE providers with procedure qualification under Section V.' },
  ],
  citations: [
    { id: 'asme-v-cover', source: 'ASME Boiler and Pressure Vessel Code, Section V — Nondestructive Examination, 2023 edition', url: 'https://www.asme.org/codes-standards/bpvc-standards' },
    { id: 'asme-v-article-1', source: 'ASME Section V Article 1 — General Requirements (T-110 through T-198)' },
    { id: 'asme-v-article-2', source: 'ASME Section V Article 2 — Radiographic Examination' },
    { id: 'asme-v-article-4', source: 'ASME Section V Article 4 — Ultrasonic Examination of Welds' },
    { id: 'asme-v-art-4-app-iv', source: 'ASME Section V Article 4 Mandatory Appendix IV — PAUT of Welds' },
    { id: 'asme-v-article-6', source: 'ASME Section V Article 6 — Liquid Penetrant Examination' },
    { id: 'asme-v-article-7', source: 'ASME Section V Article 7 — Magnetic Particle Examination' },
    { id: 'asme-v-article-9', source: 'ASME Section V Article 9 — Visual Examination' },
    { id: 'astm-e165-v', source: 'ASTM E165/E165M-23, Standard Practice for Liquid Penetrant Testing' },
    { id: 'astm-e709-v', source: 'ASTM E709-21, Standard Guide for Magnetic Particle Testing' },
    { id: 'astm-e1025', source: 'ASTM E1025-18, Standard Practice for Design, Manufacture, and Material Grouping Classification of Hole-Type Image Quality Indicators' },
    { id: 'asnt-snt-tc-1a-v', source: 'ASNT SNT-TC-1A-2020, Recommended Practice for Personnel Qualification and Certification in NDT' },
    { id: 'asme-viii-v', source: 'ASME BPVC Section VIII Division 1 (2023)' },
    { id: 'asme-b31-3-v', source: 'ASME B31.3-2022, Process Piping' },
  ],
};

export default standard;
