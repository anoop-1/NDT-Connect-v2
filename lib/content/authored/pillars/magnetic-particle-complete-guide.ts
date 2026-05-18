import type { PillarHubContent } from '../types';

const pillar: PillarHubContent = {
  slug: 'magnetic-particle-complete-guide',
  metaTitle: 'Magnetic Particle Testing Hub: Methods, Codes, Equipment',
  metaDescription:
    'The full MT cluster — wet fluorescent, dry visible, AC/DC/HWDC yokes, central conductor, coil shots. Codes, demag, lighting, and acceptance criteria.',
  heroLede:
    'Magnetic particle testing finds surface and near-surface flaws in ferromagnetic material faster, cheaper, and with better operator-to-operator repeatability than any competing method. It also fails silently when the field is misoriented, the surface preparation is wrong, or the technician runs wet fluorescent particles under inadequate UV-A. This hub maps every MT variant we publish — wet fluorescent under a black light at 1,000 µW/cm², dry visible at sunlight, AC yoke versus DC yoke versus half-wave DC, prod method, central conductor, and coil shot — and routes you to the supporting articles that explain the field-strength math, the ASME Section V Article 7 procedure requirements, and the ASTM E709 practice that governs the technique.',
  topicOverview:
    'The MT cluster covers the seven technique families: yoke (the dominant field method for welds), prod (for thick castings where current penetration is required), central conductor (for hollow cylindrical parts inspected ID and OD with a single shot), coil (longitudinal magnetization of long parts), direct contact (head shot for fixed-station inspection of small parts), magnetic rubber inspection (silicone-based replica for blind holes and threaded sections), and induced current (rare, for non-contact applications). Within each technique, the cluster splits into wet fluorescent (the fluorescent bath under UV-A — highest sensitivity), wet visible (dye-based, daylight or white light), and dry powder (color contrast under white light, the field default for weld inspection). The cluster also covers AC vs DC vs half-wave rectified DC current selection, demagnetization procedure, lighting verification under ASTM E3022, and the qualification regime under ASNT SNT-TC-1A or ANSI/ASNT CP-189.',
  subPages: [
    {
      href: '/methods/magnetic-particle-testing',
      label: 'MT Overview — Surface and Near-Surface Inspection',
      description:
        'The baseline. Field generation, particle types, surface preparation, sequence (apply field, apply particles, evaluate, demagnetize), and acceptance criteria under ASME Section V Article 7.',
    },
    {
      href: '/methods/wet-fluorescent-mt',
      label: 'Wet Fluorescent MT (WFMT)',
      description:
        'Fluorescent particle bath under UV-A illumination ≥ 1,000 µW/cm² at the surface, ambient white light ≤ 20 lux. The highest-sensitivity MT technique — preferred for aerospace and pressure vessel work.',
    },
    {
      href: '/methods/dry-visible-mt',
      label: 'Dry Visible MT',
      description:
        'Color-contrast dry powder under white light ≥ 1,000 lux. The field default for weld inspection — robust on rough as-welded surfaces where wet techniques struggle.',
    },
    {
      href: '/methods/yoke-technique',
      label: 'Yoke Technique',
      description:
        'AC and DC electromagnetic yokes — the dominant field-application method for weld and casting inspection. Lift test (10 lb AC, 40 lb DC) and pole-spacing geometry rules.',
    },
    {
      href: '/methods/central-conductor-technique',
      label: 'Central Conductor Technique',
      description:
        'Pass a conductor through a hollow part to inspect ID and OD simultaneously. The standard for bolt-hole and bored cylinder inspection per ASTM E1444.',
    },
    {
      href: '/methods/prod-technique',
      label: 'Prod Technique',
      description:
        'Direct current contact through hand-held prods — used for thick castings where field penetration depth must be controlled. Burn marks and arc strikes are the technique\'s main field hazard.',
    },
    {
      href: '/methods/coil-magnetization',
      label: 'Coil Magnetization (Longitudinal)',
      description:
        'A current-carrying coil generates an axial field for longitudinal flaw detection in long bars and shafts. L/D ratio governs ampere-turns under ASTM E1444 5.3.2.',
    },
    {
      href: '/standards/asme-section-v-article-7',
      label: 'ASME Section V Article 7 — MT Examination',
      description:
        'The governing code article for MT in pressure equipment fabrication. Procedure qualification, field adequacy verification by pie gage or QQI, and the lighting verification record.',
    },
    {
      href: '/standards/astm-e709',
      label: 'ASTM E709 — Standard Guide for Magnetic Particle Testing',
      description:
        'The practice standard that ASME Section V references. Technique selection, equipment qualification, and the acceptance pathway for non-code work.',
    },
    {
      href: '/standards/astm-e1444',
      label: 'ASTM E1444 — Magnetic Particle Examination',
      description:
        'The standard for aerospace and critical-component MT — stricter than E709 on field-strength verification, particle quality, and post-emulsifier rinse for fluorescent technique.',
    },
    {
      href: '/learn/mt-demagnetization-procedure',
      label: 'Demagnetization Procedure',
      description:
        'Why and when to demag, AC field-decay versus DC reversing-step techniques, and the residual-field limits (typically ≤ 3 gauss) for parts that will see subsequent machining or assembly.',
    },
    {
      href: '/tools/mt-amperage-calculator',
      label: 'MT Amperage Calculator',
      description:
        'Compute required current for prod, coil, and central conductor techniques. Includes L/D ratio for coil shots and the cross-section area for prod-method work.',
    },
    {
      href: '/industries/aerospace',
      label: 'MT for Aerospace Components',
      description:
        'Wet fluorescent MT for landing gear, turbine disks, and high-cycle-fatigue critical parts under ASTM E1444 and primes-specific procedures (Boeing BAC, Airbus AIPI).',
    },
    {
      href: '/case-studies/mt-on-cracked-crane-hook',
      label: 'Case Study: MT on a Cracked Crane Hook',
      description:
        'A 25-ton offshore crane hook failed in service from a fatigue crack the previous WFMT inspection missed because UV-A intensity had degraded to 280 µW/cm² unnoticed.',
    },
  ],
  expertCommentary:
    'MT looks foolproof — apply field, dust particles, see the indication — and that is exactly why it produces the most false-negative inspection records in the industry. The single biggest field failure is field orientation. Magnetic flux lines run perpendicular to flaws to produce a leakage field, which means a longitudinal flaw needs a circumferential field and vice versa. ASME Section V Article 7 T-754 requires two perpendicular field directions on every inspection area, and the most common audit finding we issue is "single-direction field applied — circumferential examination omitted." On wet fluorescent work, the second failure mode is UV-A intensity. The ASTM E3022 requirement is ≥ 1,000 µW/cm² at the inspection surface, and bulbs degrade gradually — a lamp that read 1,400 µW/cm² in January often falls below the limit by July and crews never recheck. The procedure must require pre-shift UV-A and white-light verification with a logged reading, and ambient white light must be ≤ 20 lux for the technique to deliver its sensitivity. Third, demagnetization. Demag is treated as optional in field practice because it adds time, but downstream machining of a magnetized part collects chips at the cutting tool and ruins surface finish, and any electronic component installation downstream of an inspected weld will see EMI from residual fields above ~5 gauss. The procedure should require a residual-field check on every inspection record, and a 3-gauss limit is the practical cut-off. Get those three things right and MT is the most cost-effective surface method in the field; get any one wrong and the inspection record is worthless.',
  externalResources: [
    {
      label: 'ASNT — Magnetic Particle Testing Method',
      url: 'https://www.asnt.org/learn/the-nde-technician/ndt-methods/magnetic-particle-testing',
    },
    {
      label: 'ASTM E709 — Standard Guide for Magnetic Particle Testing',
      url: 'https://www.astm.org/e0709-21.html',
    },
    {
      label: 'ASTM E1444 — Standard Practice for Magnetic Particle Testing',
      url: 'https://www.astm.org/e1444_e1444m-22.html',
    },
    {
      label: 'NDT.net — Magnetic Particle Inspection Archive',
      url: 'https://www.ndt.net/search/docs.php3?MainSource=63',
    },
    {
      label: 'FAA Advisory Circular 43-3B — Nondestructive Testing in Aircraft',
      url: 'https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentid/22579',
    },
  ],
  faqs: [
    {
      q: 'When do I choose wet fluorescent over dry visible MT?',
      a: 'Wet fluorescent (WFMT) wins on sensitivity — finer particle size (typically 5-10 µm versus 50-200 µm for dry) means it resolves tighter, shallower flaws. The trade-offs: WFMT requires a UV-A source ≥ 1,000 µW/cm², ambient white light controlled to ≤ 20 lux, a controlled particle suspension (vehicle properties under ASTM E1444), and a smooth surface (Ra ≤ 6.3 µm typically). Dry visible runs under daylight or shop white light, tolerates rough as-welded surface, and is the practical default for in-process weld inspection. For aerospace fatigue-critical parts and pressure vessel fabrication of ASME Section VIII Div. 2 components, WFMT is typically mandated by spec.',
    },
    {
      q: 'How do I verify the magnetic field is strong enough on the part?',
      a: 'Three accepted methods under ASME Section V Article 7 T-764: (1) pie gage or magnetic flux indicator placed on the inspection surface — must show clear cross indications in two orientations; (2) artificial flaw shim (Quantitative Quality Indicator, QQI) with known notch depth — indications must form over the notches; (3) tangential field strength measurement with a Hall-effect gaussmeter — typically 30-60 gauss is the target on the surface. The pie gage is the field default for weld inspection; the QQI is preferred for procedure qualification and aerospace work where ASTM E1444 5.4.4 requires quantitative verification.',
    },
    {
      q: 'What residual magnetism is acceptable after MT?',
      a: 'Three gauss is the practical default for general industrial work — any higher and downstream machining picks up chips at cutting tools. For arc-welding work downstream of MT, the limit drops to ~2 gauss because arc blow becomes severe above that. Aerospace and rotating-component work routinely specify ≤ 1 gauss. The demagnetization technique depends on the magnetization method used: AC residual fields demag with an AC field decay (passing the part through a decaying-amplitude AC coil); DC residual fields require reversing-polarity step-down through a DC yoke or coil. Always verify with a residual-field meter, not by visual inspection of the part.',
    },
    {
      q: 'Can MT find subsurface flaws?',
      a: 'Yes, but only shallow ones, and the depth depends on the field direction and strength. Practical limits: tight surface-breaking cracks are resolved with high confidence; cracks 1-2 mm below the surface with broad opening (e.g., lack of fusion in a fillet weld toe) can be picked up with DC or HWDC field; anything deeper than 3 mm below the surface is unreliable and the inspection should move to UT or RT for volumetric coverage. The mistake we audit most often is specifying MT for subsurface lack-of-fusion in thick fillet welds where geometry hides the indication from a yoke positioned outside the joint — the right answer there is PAUT.',
    },
  ],
  internalLinks: [
    {
      href: '/learn/mt-surface-preparation',
      label: 'MT Surface Preparation Standards',
      context: 'Cleaning, descaling, and finish requirements for each MT technique — the precondition for any valid indication call.',
    },
    {
      href: '/equipment/magnaflux-y6',
      label: 'Magnaflux Y-6 AC/DC Yoke',
      context: 'The dominant field yoke in service worldwide — operational notes, lift-test verification, and pole-spacing guidance.',
    },
    {
      href: '/equipment/magnaflux-zb-200s',
      label: 'Magnaflux ZB-200S UV-A Lamp',
      context: 'The LED UV-A lamp that replaced mercury-vapor in most aerospace shops — output curve and verification interval.',
    },
    {
      href: '/standards/iso-9934-1',
      label: 'ISO 9934-1 — MT General Principles',
      context: 'The European/international equivalent to ASTM E709, referenced in many EN-spec procurement contracts.',
    },
    {
      href: '/compare/mt-vs-pt',
      label: 'MT vs PT — Which Surface Method',
      context: 'Side-by-side on sensitivity, cost, and applicability. MT wins on ferromagnetic material with subsurface reach; PT wins on non-ferromagnetic and on tight surface-only flaws.',
    },
    {
      href: '/tools/coil-shot-amperage-calculator',
      label: 'Coil Shot Amperage Calculator',
      context: 'Compute ampere-turns for low- and high-fill-factor coil shots under ASTM E1444 5.3.2.',
    },
    {
      href: '/case-studies/wfmt-find-rate-on-landing-gear-overhaul',
      label: 'Case Study: WFMT Find Rate on Landing Gear Overhaul',
      context: 'A 14-month aerospace overhaul population with WFMT find rates by location, contrasted with the previous dry-MT find rate.',
    },
    {
      href: '/learn/lighting-verification-for-mt-and-pt',
      label: 'Lighting Verification for MT and PT',
      context: 'Pre-shift UV-A and white-light readings — the procedure requirement most often missed in audit.',
    },
  ],
  citations: [
    {
      id: 'asme-v-art-7',
      source: 'ASME BPVC Section V, 2023 ed., Article 7 — Magnetic Particle Examination',
    },
    {
      id: 'astm-e709',
      source: 'ASTM E709-21, Standard Guide for Magnetic Particle Testing',
    },
    {
      id: 'astm-e1444',
      source: 'ASTM E1444/E1444M-22, Standard Practice for Magnetic Particle Testing',
    },
    {
      id: 'astm-e3022',
      source: 'ASTM E3022-18, Standard Practice for Measurement of Emission Characteristics and Requirements for LED UV-A Lamps Used in Fluorescent Penetrant and Magnetic Particle Testing',
    },
    {
      id: 'iso-9934-1',
      source: 'ISO 9934-1:2016, Non-destructive Testing — Magnetic Particle Testing — Part 1: General Principles',
    },
  ],
};

export default pillar;
