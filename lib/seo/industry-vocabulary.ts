// lib/seo/industry-vocabulary.ts
//
// Industry-specific vocabulary banks. Every (city, method) page picks its
// dominant industry (from data/cities.json `industries[]` weighted) and
// pulls vocabulary from the matching bank. This is the primary lever that
// pushes per-method-across-cities Jaccard similarity below 20%.
//
// Why a vocab map (not just templates)
// -----------------------------------
// Two pages for the same method but different cities (e.g. PAUT in Houston
// vs PAUT in Wichita) share 80%+ of their underlying technical content
// (codes, equipment, defect classes). What MUST diverge is the surrounding
// trade-language: a refinery city talks about turnarounds, fitness-for-
// service, B31.3, hot-bolting; an aerospace city talks about composites,
// lap-joints, FOD, NAS 410, AS9100. Pulling from these banks deterministically
// per page seeds the lexical variation Google's helpful-content classifier
// expects from real local trade content.

export interface IndustryVocab {
  /** Trade-specific terms of art. Sprinkled across opener, application, and FAQ blocks. */
  termsOfArt: string[];
  /** Industry-specific code/standard handles used in code-context block. */
  codeShorthand: string[];
  /** Common scope verbs — what crews actually do on these jobs. */
  scopeVerbs: string[];
  /** Asset-class nouns — what the inspection target tends to be. */
  assetClasses: string[];
  /** Failure mechanisms / defect modes that recur in this industry. */
  failureModes: string[];
  /** Regulatory / customer authorities typical for this industry. */
  authorities: string[];
}

// Every map key must be lowercase and substring-matchable against
// city.industries[].name.toLowerCase(). Do NOT require exact equality —
// "Petrochemical Refining" must hit the "refining" bank.
export const INDUSTRY_VOCAB: Record<string, IndustryVocab> = {
  refining: {
    termsOfArt: [
      'turnaround (TAR)', 'fitness-for-service', 'hot-bolting', 'creep damage',
      'high-temperature hydrogen attack', 'sour-service piping', 'reformer catalyst tubes',
      'fired-heater coils', 'coker drum cycle', 'FCC unit', 'amine sweetening',
      'sulfidation corrosion', 'naphthenic acid corrosion', 'CUI (corrosion under insulation)',
    ],
    codeShorthand: [
      'API 510', 'API 570', 'API 653', 'API 579-1 / ASME FFS-1', 'ASME B31.3',
      'NACE SP0472', 'NBIC NB-23',
    ],
    scopeVerbs: [
      'shutdown scope', 'reactor outage walkdown', 'piping circuit thickness sweep',
      'tank floor MFL plus UT confirmation', 'bypass spool fitness-for-service review',
      'PWHT verification on a hot-tap pad',
    ],
    assetClasses: [
      'distillation tower', 'fired heater', 'coker drum', 'reactor vessel',
      'amine contactor', 'crude column', 'sour-service pipe spool', 'storage tank shell',
    ],
    failureModes: [
      'sulfidation thinning', 'HTHA', 'naphthenic-acid attack', 'CUI under cold-box insulation',
      'coker-drum bulging', 'creep cavitation in heater tubes', 'amine-induced cracking',
    ],
    authorities: ['API', 'PHMSA (downstream pipelines)', 'state boiler & PV inspector', 'OSHA PSM'],
  },

  petrochemical: {
    termsOfArt: [
      'cracker turnaround', 'olefins furnace coil', 'transfer-line exchanger',
      'ethylene unit decoke', 'hydrogen attack screening', 'high-pressure hydrogen service',
      'autoclave', 'reactor coolant system',
    ],
    codeShorthand: ['ASME Section VIII Div 2', 'API 579', 'API 578', 'B31.3'],
    scopeVerbs: [
      'cracker furnace coil scoping', 'reactor longitudinal-seam PAUT',
      'compressor-train baseline AUT', 'polymer-line CUI mapping',
    ],
    assetClasses: ['ethylene cracker', 'reactor', 'olefins furnace', 'reformer', 'autoclave'],
    failureModes: ['HTHA', 'coke deposition', 'thermal fatigue at coil bends', 'creep'],
    authorities: ['EPA', 'state environmental authority', 'API', 'OSHA PSM'],
  },

  pipeline: {
    termsOfArt: [
      'girth weld', 'mainline AUT', 'inline inspection (ILI)', 'caliper run', 'MFL pig',
      'integrity verification process', 'class location', 'high-consequence area (HCA)',
      'crack ILI (EMAT)', 'B31.4 / B31.8 piping',
    ],
    codeShorthand: ['API 1104', 'ASME B31.4', 'ASME B31.8', 'PHMSA 49 CFR Part 192/195', 'CSA Z662'],
    scopeVerbs: [
      'girth-weld AUT spread', 'tie-in radiography', 'pig-trap fitness check',
      'HCA verification dig', 'cathodic-protection survey support',
    ],
    assetClasses: ['mainline pipe', 'girth weld', 'pig trap', 'compressor station piping', 'tie-in spool'],
    failureModes: ['SCC', 'external corrosion under coating disbondment', 'mechanical damage', 'dent-and-gouge'],
    authorities: ['PHMSA', 'state pipeline regulator', 'CSA / NEB (Canada)', 'API'],
  },

  upstream: {
    termsOfArt: [
      'rig count', 'BOP recertification', 'drill-pipe API 5DP inspection', 'casing string integrity',
      'wellhead pressure test', 'rod-pump string', 'frac stack',
    ],
    codeShorthand: ['API 5CT', 'API 5DP', 'API RP 7G-2', 'API 16A (BOPs)', 'NACE MR0175'],
    scopeVerbs: [
      'rig-up integrity verification', 'BOP shop teardown NDT',
      'drill-collar fatigue MPI', 'tubing OCTG pre-run inspection',
    ],
    assetClasses: ['drill pipe', 'casing string', 'BOP stack', 'wellhead', 'frac tree'],
    failureModes: ['fatigue crack at drill-pipe upset', 'sulfide stress cracking', 'galling on tool joints'],
    authorities: ['BSEE (offshore)', 'state oil & gas commission', 'API'],
  },

  aerospace: {
    termsOfArt: [
      'composite delamination', 'lap-joint corrosion', 'foreign object damage (FOD)',
      'TS 16949 supplier qual (legacy)', 'AS9100 quality system', 'fastener-hole crack',
      'engine disc inspection', 'turbine blade root', 'C-scan immersion tank',
      'NAS 410 certification', 'EN 4179 (Europe)',
    ],
    codeShorthand: ['NAS 410', 'EN 4179', 'AMS 2644', 'AS9100', 'OEM Boeing/Airbus/Embraer process specs'],
    scopeVerbs: [
      'lap-joint ECA scan', 'engine disc fluorescent PT line', 'fastener-hole bolt-hole eddy current',
      'composite skin C-scan', 'wing-skin TWA inspection',
    ],
    assetClasses: ['airframe lap joint', 'engine disc', 'turbine blade', 'composite skin', 'landing-gear forging'],
    failureModes: ['fatigue crack at fastener hole', 'composite delamination after impact', 'corrosion under sealant'],
    authorities: ['FAA', 'EASA', 'OEM (Boeing, Airbus, GE Aviation)', 'DCMA (defence)'],
  },

  shipbuilding: {
    termsOfArt: [
      'hull integrity', 'class survey', 'DNV approval', 'ABS class society', 'Lloyd\'s Register',
      'cofferdam inspection', 'ballast-tank UT thickness grid', 'rudder-stock MPI',
    ],
    codeShorthand: ['ABS Rules', 'DNV-OS / DNV-CG', 'Lloyd\'s Register Rules', 'IACS UR W', 'NAVSEA T9074'],
    scopeVerbs: [
      'ballast-tank thickness grid', 'shell-plate ultrasonic survey',
      'rudder-bearing MPI', 'class survey support inspection',
    ],
    assetClasses: ['hull plate', 'ballast tank', 'rudder stock', 'shaft', 'pressure hull'],
    failureModes: ['plate corrosion', 'fatigue at frame intersections', 'pitting in ballast tanks'],
    authorities: ['ABS', 'DNV', 'Lloyd\'s Register', 'USCG', 'NAVSEA'],
  },

  shipyard: {
    termsOfArt: [
      'class survey', 'DNV approval', 'ABS', 'Lloyd\'s Register', 'rudder stock', 'shaft alignment',
      'ballast-tank UT', 'cargo-hold survey',
    ],
    codeShorthand: ['ABS Rules', 'DNV-OS', 'IACS UR W', 'NAVSEA T9074-AS-GIB-010/271'],
    scopeVerbs: [
      'class survey UT thickness sweep', 'rudder MPI on dry-dock',
      'shaft fluorescent PT', 'ballast-tank pitting map',
    ],
    assetClasses: ['hull plate', 'ballast tank', 'rudder stock', 'main shaft'],
    failureModes: ['pitting corrosion', 'fatigue at chocks', 'galvanic loss'],
    authorities: ['ABS', 'DNV', 'USCG', 'NAVSEA'],
  },

  power: {
    termsOfArt: [
      'boiler tube leak', 'header creep', 'steam-drum inspection', 'condenser tube ECT',
      'HRSG outage', 'turbine blade inspection', 'main-steam-line creep',
      'reheater tube ID-OD wastage', 'flow-accelerated corrosion (FAC)',
    ],
    codeShorthand: ['ASME Section I', 'ASME B31.1', 'NB-23 (NBIC)', 'EPRI guidelines'],
    scopeVerbs: [
      'condenser tube ECT bundle scope', 'HRSG outage UT thickness sweep',
      'main-steam header creep mapping', 'boiler tube replication',
    ],
    assetClasses: ['boiler tube', 'steam header', 'turbine rotor', 'condenser bundle', 'HRSG'],
    failureModes: ['creep cavitation', 'flow-accelerated corrosion', 'thermal fatigue'],
    authorities: ['NRC (nuclear)', 'state utility regulator', 'NBIC inspectors', 'EPRI'],
  },

  nuclear: {
    termsOfArt: [
      'ISI interval', 'ASME Section XI inspection', 'reactor vessel weld scan', 'PDI qualification',
      'examination authorisation procedure', 'leak-before-break',
    ],
    codeShorthand: ['ASME Section XI', '10 CFR 50 Appendix B', 'PDI program', 'NRC RG 1.150'],
    scopeVerbs: [
      'ISI examination of vessel weld', 'PDI-qualified procedure execution',
      'control-rod-drive housing scan', 'feed-water-line scan',
    ],
    assetClasses: ['reactor pressure vessel', 'CRD housing', 'main steam line', 'feedwater nozzle'],
    failureModes: ['IGSCC', 'thermal fatigue', 'PWSCC at dissimilar-metal welds'],
    authorities: ['NRC', 'INPO', 'EPRI'],
  },

  lng: {
    termsOfArt: [
      'cryogenic service', 'LNG liquefaction train', 'cold-box inspection',
      'cryogenic-piping fitness check', '9% nickel steel', 'spiral-wound exchanger',
    ],
    codeShorthand: ['ASME B31.3 cryogenic', 'API 625 (refrigerated tanks)', 'NFPA 59A', 'DNV-OS-F101'],
    scopeVerbs: [
      'liquefaction train weld AUT', 'cold-box leak survey',
      'cryogenic spool fluorescent PT', '9Ni weld phased-array scan',
    ],
    assetClasses: ['LNG storage tank', 'cold box', 'liquefaction train', 'jetty loading arm'],
    failureModes: ['cryogenic embrittlement at weld HAZ', 'fatigue at jetty loading-arm bearings'],
    authorities: ['PHMSA (LNG facilities)', 'USCG', 'FERC', 'state fire marshal'],
  },

  port: {
    termsOfArt: [
      'mooring-bollard load test', 'crane structural inspection', 'jetty sheet-pile UT',
      'gantry crane fatigue scan', 'fender system UT',
    ],
    codeShorthand: ['ASCE 61-14 (waterfront)', 'AWS D1.1', 'OCIMF MEG4'],
    scopeVerbs: [
      'gantry crane MT/UT scope', 'jetty sheet-pile thickness sweep',
      'mooring bollard pull-test support', 'fendering structural integrity check',
    ],
    assetClasses: ['STS gantry crane', 'jetty sheet pile', 'mooring bollard', 'fender frame'],
    failureModes: ['fatigue at crane gusset', 'corrosion at splash-zone', 'pitting under cathodic-protection drop-out'],
    authorities: ['USCG', 'AAPA', 'state port authority'],
  },

  manufacturing: {
    termsOfArt: [
      'production weld inspection', 'fab-shop QA', 'first-article inspection',
      'press-brake forming acceptance', 'jig-and-fixture verification',
    ],
    codeShorthand: ['AWS D1.1', 'AWS D1.6 (stainless)', 'AWS D1.2 (aluminum)', 'AISC code'],
    scopeVerbs: [
      'fab-shop weld VT/MT', 'first-article CMM plus PT',
      'press-brake-formed seam UT', 'production-line ECT screening',
    ],
    assetClasses: ['structural beam', 'fab-shop weldment', 'pressure component spool'],
    failureModes: ['weld lack-of-fusion', 'porosity', 'undercut'],
    authorities: ['AWS', 'AISC', 'state DOT (bridge fab)'],
  },

  automotive: {
    termsOfArt: [
      'IATF 16949', 'spot-weld pull test', 'BIW assembly inspection', 'casting porosity',
      'cylinder-head crack', 'crankshaft MPI line',
    ],
    codeShorthand: ['IATF 16949', 'AIAG CQI-12 (NDT process audit)', 'AIAG CQI-15 (welding)'],
    scopeVerbs: [
      'crankshaft MPI line monitoring', 'cylinder-head fluorescent PT',
      'BIW spot-weld peel test', 'casting porosity X-ray sampling',
    ],
    assetClasses: ['crankshaft', 'cylinder head', 'BIW spot weld', 'casting'],
    failureModes: ['fatigue at crankshaft fillet', 'casting porosity', 'spot-weld nugget undersize'],
    authorities: ['IATF', 'OEM supplier-quality (Ford Q1, FCA, GM)', 'NHTSA'],
  },

  bridge: {
    termsOfArt: [
      'fracture-critical member (FCM)', 'biennial bridge inspection', 'fatigue category',
      'cover plate weld', 'pin-and-link inspection', 'gusset plate UT',
    ],
    codeShorthand: ['AASHTO', 'AWS D1.5 (bridge welding)', 'FHWA NBIS', 'state DOT manual'],
    scopeVerbs: [
      'fracture-critical UT scope', 'cover-plate end MT', 'pin-and-link MPI',
      'gusset-plate dye penetrant',
    ],
    assetClasses: ['girder weld', 'cover plate end', 'pin and link', 'gusset plate'],
    failureModes: ['fatigue crack at cover-plate termination', 'corrosion section loss', 'distortion-induced fatigue'],
    authorities: ['FHWA', 'state DOT', 'AASHTO'],
  },

  defense: {
    termsOfArt: [
      'NAVSEA technical publication', 'submarine pressure-hull weld', 'naval gun-tube inspection',
      'armoured vehicle hull crack', 'weapons-system structural NDT',
    ],
    codeShorthand: ['NAVSEA T9074-AS-GIB-010/271', 'MIL-STD-2154', 'MIL-STD-1949', 'AMS 2644'],
    scopeVerbs: [
      'submarine pressure-hull AUT', 'gun-tube fluorescent PT',
      'armour-plate MPI line', 'naval-vessel keel weld scope',
    ],
    assetClasses: ['submarine pressure hull', 'gun tube', 'armour plate', 'naval-ship hull weld'],
    failureModes: ['fatigue at hull penetration', 'thermal fatigue in gun tubes', 'corrosion at coating breach'],
    authorities: ['NAVSEA', 'DCMA', 'NSWC'],
  },
};

// Aliases — substring keys that route to the canonical bank.
const ALIASES: Array<[string, string]> = [
  ['refining', 'refining'], ['refinery', 'refining'], ['oil refining', 'refining'],
  ['petrochemical', 'petrochemical'], ['petchem', 'petrochemical'], ['chemical', 'petrochemical'],
  ['pipeline', 'pipeline'], ['midstream', 'pipeline'], ['gas transmission', 'pipeline'],
  ['offshore', 'upstream'], ['oil and gas', 'upstream'], ['oilfield', 'upstream'], ['upstream', 'upstream'],
  ['shale', 'upstream'], ['drilling', 'upstream'], ['rig', 'upstream'],
  ['aerospace', 'aerospace'], ['aviation', 'aerospace'], ['aircraft', 'aerospace'],
  ['shipyard', 'shipyard'], ['shipbuilding', 'shipbuilding'], ['marine', 'shipyard'], ['naval', 'shipyard'],
  ['power', 'power'], ['utility', 'power'], ['generation', 'power'], ['boiler', 'power'],
  ['nuclear', 'nuclear'],
  ['lng', 'lng'], ['liquefied natural gas', 'lng'], ['cryogenic', 'lng'],
  ['port', 'port'], ['terminal', 'port'], ['marine terminal', 'port'],
  ['manufacturing', 'manufacturing'], ['fabrication', 'manufacturing'], ['heavy manufacturing', 'manufacturing'],
  ['automotive', 'automotive'], ['auto', 'automotive'], ['vehicle', 'automotive'],
  ['bridge', 'bridge'], ['infrastructure', 'bridge'], ['highway', 'bridge'],
  ['defense', 'defense'], ['defence', 'defense'], ['military', 'defense'],
];

/**
 * Resolve a city industry name to one of the canonical vocabulary bank keys.
 * Returns the bank if a substring match is found; null otherwise so the
 * caller can fall through to a generic block.
 */
export function vocabFor(industryName: string): IndustryVocab | null {
  const needle = industryName.toLowerCase();
  for (const [pattern, target] of ALIASES) {
    if (needle.includes(pattern)) return INDUSTRY_VOCAB[target] ?? null;
  }
  return null;
}

/**
 * Pick a representative item from a vocab bank using an external seed (so
 * the same (city, method) page picks the same word every render).
 */
export function pickFromVocab<T>(seed: number, list: T[]): T | undefined {
  if (!list || list.length === 0) return undefined;
  return list[seed % list.length];
}
