import type { LearnArticleContent } from '../types';

const article: LearnArticleContent = {
  slug: 'how-to-interpret-radiograph-weld-defects',
  category: 'how-to',
  metaTitle: 'How to Interpret Radiographs for Weld Defects (ASME V Art. 2)',
  metaDescription:
    'Identify porosity, slag, lack of fusion, cracks, undercut, and incomplete penetration on radiographs. Density windows, IQI verification, and acceptance per ASME and API.',
  heroLede:
    "The radiograph hits your viewing table and you have 90 seconds before the welder asks. Half the call is film quality (density 2.0-4.0, IQI 2-2T visible, no fogging), the other half is geometry (what defect looks like which shape, in which orientation). Below is the visual cue, the geometry clue, and the ASME B31.3 or API 1104 acceptance call for the eight defect types that account for ~95% of weld rejects.",
  audience:
    'Level II RT technicians interpreting radiographs of carbon and stainless steel butt and fillet welds per ASME V Art. 2, ASME B31.3, and API 1104 Section 9.',
  prerequisiteKnowledge: [
    'ASNT Level II in RT (interpretation responsibilities)',
    'Working knowledge of densitometer, IQI placement, and film viewing per ASME V Art. 2',
    'Reading the WPS (weld bevel, root configuration, multi-pass sequence)',
    'Familiarity with ASME B31.3 §344.5 or API 1104 §9 acceptance criteria',
  ],
  sections: [
    {
      heading: 'Film quality check before any defect call',
      level: 2,
      paragraphs: [
        'Density: measure with a calibrated densitometer at the area of interest. ASME V Art. 2 §T-282 requires 1.8 minimum and 4.0 maximum on single-film exposures (X-ray) and 2.0 to 4.0 on gamma exposures.[1] Density outside the window invalidates the film — reshoot.',
        'IQI sensitivity: locate the penetrameter (wire or hole-type). For ASME work, the 2-2T hole on a plaque IQI must be visible — meaning the 2T-diameter hole on the IQI of designation matching 2% of part thickness. For API 1104, the smallest wire of the wire-type IQI of designated diameter must be visible across the full weld length.[2][3]',
        'Background fogging: look for uniform haze across non-weld areas. Acceptable base fog is typically < 0.3 density units above the film base. Higher fog indicates expired film, light leakage, or chemical fogging during processing — fail the film and reshoot.',
      ],
      callout: {
        kind: 'spec',
        title: 'No-go conditions',
        body: 'Reject the film without interpretation if any of these are true: density outside 1.8-4.0, required IQI not visible, identification numbers not legible, location markers not visible, or surface artifacts cross the weld image. The interpretation only starts on a passing film.',
      },
    },
    {
      heading: 'Porosity — round dark spots, scattered or clustered',
      level: 2,
      paragraphs: [
        'Porosity appears as round or slightly elongated dark spots, 0.5-3 mm typical diameter. Scattered porosity is distributed; clustered porosity groups in one location; linear porosity aligns along the weld axis (often at the root or between passes).',
        'Geometry clue: porosity is volumetric — the spots appear at the same density regardless of viewing angle, and the shadows are smooth-edged spheres. Compare to slag (which has irregular edges) and tungsten inclusions in GTAW (which appear as bright white spots, the opposite contrast).',
        'ASME B31.3 §344.5 normal fluid service permits scattered porosity up to 1.5 mm individual size and total area not exceeding 1.5 mm² per 150 mm of weld for thinner welds; tighter limits for severe cyclic and Cat. M fluid service.[4] API 1104 Table 9-1 permits cluster porosity within size limits but disallows piping porosity (linear root porosity).[3]',
      ],
    },
    {
      heading: 'Slag inclusion — dark irregular shapes between passes',
      level: 2,
      paragraphs: [
        'Slag appears as dark irregular shapes, often elongated, located at the fusion line between weld passes (interpass slag) or at the toe of the weld (HAZ slag). The edges are jagged, not smooth, distinguishing it from porosity.',
        'Geometry clue: interpass slag aligns parallel to the weld axis at the interpass boundary; HAZ slag sits at the weld edge in the parent metal. The shadow has variable density across its area — solid silicate slag is denser than pure flux residue.',
        'Acceptance: ASME B31.3 normal fluid service permits individual slag length up to T/3 (T = thickness) with max 6 mm and total slag length per 12T not to exceed T per ASME B31.3 Table 341.3.2.[4] API 1104 §9.3.6 sets specific limits on elongated slag inclusion length and total length per pipe diameter category.',
      ],
    },
    {
      heading: 'Lack of fusion (LoF) and incomplete penetration (IP)',
      level: 2,
      paragraphs: [
        'LoF appears as a straight dark line parallel to the weld bevel, typically at the bevel face or between passes. The line is sharp-edged and follows the fusion line geometry — distinguishing it from undercut (which appears at the cap toe, not the bevel) and from cracks (which are irregular and often branching).',
        'IP appears as a straight dark line at the root, parallel to the weld axis, with sharp edges and consistent width along its length. On a butt weld with backing, IP shows as a discontinuity between the weld metal and the backing strip; on open-root welds, it appears as a clear gap at the root centerline.',
        'Acceptance: both LoF and IP are planar defects — ASME B31.3 §344.5 disallows any LoF or IP in severe cyclic and Category M fluid service.[4] API 1104 §9.3.4 permits limited IP length in cross-country pipeline normal service but disallows it under high-stress and offshore service. The defect type call drives the disposition; do not call LoF when you mean slag — the acceptance changes.',
      ],
      list: {
        title: 'Quick visual cues — LoF vs IP vs slag vs crack',
        items: [
          'LoF: straight dark line along bevel face, between passes',
          'IP: straight dark line at root centerline, consistent width',
          'Slag: irregular dark shape, jagged edges, between passes or at HAZ',
          'Crack: irregular dark line, often branching, can cross weld axis or run with it',
          'Undercut: dark groove at cap toe in parent metal, parallel to weld',
        ],
      },
    },
    {
      heading: 'Cracks — branching, irregular, often near HAZ',
      level: 2,
      paragraphs: [
        'Cracks appear as fine, irregular dark lines. Transverse cracks run perpendicular to the weld axis; longitudinal cracks run with the weld axis; crater cracks appear at the end of a weld pass as a star or branching pattern.',
        'Geometry clue: cracks are tighter than LoF (sub-millimeter width on the radiograph), often have variable density along their length (deeper in the middle, fading at the ends), and frequently branch. Heat-affected zone (HAZ) cracks sit just outside the weld cap on the parent-metal side, parallel to the weld axis.',
        'Acceptance: cracks are non-acceptable under every common code — ASME B31.3 §344.5, API 1104 §9.3.1, ASME VIII Div. 1 Appendix 4 all disallow any crack regardless of length.[4][3][5] When a crack is suspected, switch to higher-resolution imaging (PAUT or computed radiography at 4-line-pair/mm or better) for confirmation before the welder grinds out the suspect area.',
      ],
    },
    {
      heading: 'Undercut, concavity, and excess penetration',
      level: 2,
      paragraphs: [
        'Undercut appears as a dark groove at the toe of the cap, parallel to the weld axis, in the parent metal. The shadow is darker than the surrounding parent metal because the groove represents missing material. Length and depth drive the acceptance call.',
        'Root concavity (suck-back) appears as a dark band along the root centerline, wider than the bevel image and with smooth edges. Excess penetration appears as a lighter band at the root with a smooth, rounded profile.',
        'Acceptance: ASME B31.3 §344.5 limits undercut depth to 1 mm or 0.25T (whichever is less) with length restrictions; API 1104 Table 9-1 limits external undercut to 0.8 mm depth or 12.5% of pipe wall, whichever is less.[4][3] Root concavity is generally acceptable in normal service if depth is less than the procedure-specified limit (typically 0.8 mm or 10% of wall) and the actual remaining wall meets minimum design thickness.',
      ],
    },
  ],
  commonMistakes: [
    'Calling porosity when the indication is tungsten inclusion. Tungsten from a GTAW process shows up white (bright on the film) because tungsten attenuates X-rays more than steel — opposite contrast to a void. Mistaking it for porosity leads to wrong-direction repair calls. Check the welding process and the contrast direction before calling.',
    'Reading density at the wrong location. Density is measured at the area of interest — the weld and HAZ — not at the IQI placement zone. A film that reads 2.5 at the IQI may read 1.6 at the weld root if penetration was uneven. Spot-check density at three locations along the weld before interpretation.',
    'Mistaking film-handling marks for cracks. Bend marks, pressure marks from cassette springs, and chemical streaks from poor processing all produce thin dark lines that resemble cracks. Compare the suspect line to known artifact patterns and check the same location on a duplicate film (if shot) before flagging as a crack.',
    'Skipping the geometric unsharpness check. ASME V Art. 2 §T-274 limits Ug to 0.020 inches (0.51 mm) for thicknesses < 50 mm and 0.030 inches (0.76 mm) for 50-100 mm. Films shot with too-short SFD or too-large source size produce blurred edges that hide real defects. Verify SFD and source size before calling the film acceptable.',
  ],
  relatedFaqs: [
    {
      q: 'How do I distinguish slag inclusion from porosity on a radiograph?',
      a: 'Porosity is rounded with smooth edges — gas voids freeze as spheres in the weld pool. Slag is irregular with jagged or angular edges because it is solid silicate matter trapped between passes. Density also differs — porosity is uniformly dark (full void); slag has variable density within its shadow because silicate slag has lower attenuation than weld metal but more than air. Position helps too: porosity scatters anywhere in the weld; slag concentrates at interpass boundaries and at the cap-to-parent metal toe. When in doubt, the acceptance call typically permits more porosity than slag — call the more conservative type if the visual cues overlap.',
    },
    {
      q: 'What is the difference between lack of fusion at the sidewall and lack of penetration?',
      a: 'Lack of fusion (LoF) at the sidewall is a planar defect between the weld metal and the bevel face — it appears as a straight dark line running parallel to the bevel angle, typically in the middle or upper passes of a multi-pass weld. Lack of penetration (LoP) or incomplete penetration (IP) is at the weld root — a planar gap at the centerline of the root pass. LoF can occur at any pass; LoP is specifically a root-pass defect. Both are planar and both are categorically rejected under ASME B31.3 severe cyclic service and Cat. M fluid service. The location of the dark line on the radiograph (along the bevel vs at the root centerline) drives the correct defect-type call.',
    },
    {
      q: 'Why does my radiograph show a bright spot in the weld area?',
      a: 'A bright spot — lower density than the surrounding weld metal — usually means a high-attenuation inclusion. Tungsten inclusions from GTAW are the most common cause; they appear bright because tungsten\'s density (19.3 g/cm³) is much higher than steel\'s (7.85 g/cm³), so X-rays attenuate more strongly. Other causes: copper backing residue, oxide film inclusions, or in rare cases, a non-fused filler particle. The acceptance call is process-dependent — ASME B31.3 limits tungsten inclusions by size and density, and API 1104 §9.3.7 sets specific tungsten inclusion criteria. Always identify the welding process before calling a bright indication.',
    },
    {
      q: 'How do I report a borderline indication that may or may not exceed the acceptance limit?',
      a: 'First, re-measure the indication length and width using a calibrated film viewer with a built-in scale and the appropriate magnification (typically 5x for detail work). Second, compute the actual size accounting for radiographic magnification (M = SFD / (SFD - OFD), where OFD is object-to-film distance). Third, compare the actual size to the acceptance limit and apply the procedure-specified tolerance. If the call remains within ±10% of the limit, log it as "marginal" and request a Level III review. Do not split-call ("looks like 3.1 mm but I\'ll record 2.9 mm") — record the measurement and let the Level III adjudicate. Borderline reports protect the inspector if the weld later fails.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/radiographic-testing',
      label: 'Radiographic Testing method overview',
      context: 'Full RT method context including source selection, exposure technique, and film handling.',
    },
    {
      href: '/standards/asme-v',
      label: 'ASME Section V Article 2',
      context: 'Article 2 governs the radiographic technique and film quality requirements.',
    },
    {
      href: '/learn/how-to-perform-iqi-selection-radiography',
      label: 'IQI selection for radiography',
      context: 'IQI sensitivity is the first film-quality check before any defect interpretation.',
    },
    {
      href: '/learn/faq-defect-types-in-welds',
      label: 'Weld defect types FAQ',
      context: 'Comprehensive list of weld defects with mechanism and detection method.',
    },
    {
      href: '/learn/faq-acceptance-criteria-api-1104',
      label: 'API 1104 acceptance criteria',
      context: 'Pipeline radiography acceptance per API 1104 Section 9.',
    },
    {
      href: '/learn/faq-acceptance-criteria-asme-b31-3',
      label: 'ASME B31.3 acceptance criteria',
      context: 'Process piping weld acceptance for normal and severe cyclic service.',
    },
    {
      href: '/learn/troubleshooting-rt-film-fogging',
      label: 'Troubleshooting RT film fogging',
      context: 'Fogging mimics defect indications — diagnostic walkthrough.',
    },
    {
      href: '/methods/phased-array-ultrasonic-testing',
      label: 'PAUT method overview',
      context: 'PAUT is the standard follow-up when radiography indicates planar defects requiring sizing.',
    },
  ],
  citations: [
    {
      id: 'asme-v-art-2',
      source: 'ASME BPVC Section V, Article 2, 2023 edition — Radiographic Examination, §T-282 Density and §T-276 IQI Selection',
    },
    {
      id: 'astm-e747',
      source: 'ASTM E747-18 — Standard Practice for Design, Manufacture and Material Grouping Classification of Wire IQIs Used for Radiology',
    },
    {
      id: 'api-1104',
      source: 'API 1104, 22nd ed. (2021) — Welding of Pipelines and Related Facilities, §9 Acceptance Standards for NDT',
    },
    {
      id: 'asme-b31-3',
      source: 'ASME B31.3-2022 — Process Piping, §344.5 Radiographic Examination Acceptance',
    },
    {
      id: 'asme-viii',
      source: 'ASME BPVC Section VIII, Division 1, 2023 edition — Mandatory Appendix 4 Rounded Indications Charts',
    },
  ],
};

export default article;
