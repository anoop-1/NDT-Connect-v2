/**
 * CornerstoneLinks — internal-link footer that pulls indexed-page authority
 * over to the high-value authored cornerstones.
 *
 * Diagnosis 2026-05-29: ~50% of sampled URLs are "URL is unknown to Google"
 * and most authored pillars / methods are "Discovered - currently not
 * indexed". The fix is internal-link reinforcement: every indexed
 * cost-guide / city-method / compare page links to 5 topically-matched
 * cornerstones, so Google sees the cornerstones as part of the linked
 * graph and prioritises crawl + index.
 *
 * Usage:
 *   <CornerstoneLinks methodAbbr="UT" />
 *   <CornerstoneLinks methodAbbr="RT" topicHints={["tank","api-653"]} />
 *   <CornerstoneLinks topicHints={["weld"]} />
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Cornerstone = {
  url: string;
  title: string;
  blurb: string;
  tags: string[];
};

const CORNERSTONES: Cornerstone[] = [
  // Pillars (highest authority — 1,500+ word mega-guides)
  { url: '/pillars/ultrasonic-testing-complete-guide', title: 'Ultrasonic Testing — Complete Guide',
    blurb: 'Physics, calibration, codes, equipment, applications.', tags: ['ut','ultrasonic'] },
  { url: '/pillars/radiographic-testing-complete-guide', title: 'Radiographic Testing — Complete Guide',
    blurb: 'Sources, exposure, IQIs, ASME V, digital RT.', tags: ['rt','radiographic'] },
  { url: '/pillars/magnetic-particle-complete-guide', title: 'Magnetic Particle Testing — Complete Guide',
    blurb: 'AC/DC field, wet/dry methods, ASTM E709, yoke.', tags: ['mt','magnetic-particle'] },
  { url: '/pillars/penetrant-testing-complete-guide', title: 'Penetrant Testing — Complete Guide',
    blurb: 'Visible vs fluorescent, ASTM E165, dwell times.', tags: ['pt','penetrant'] },
  { url: '/pillars/phased-array-complete-guide', title: 'Phased Array UT (PAUT) — Complete Guide',
    blurb: 'Beam steering, focal laws, scan plans, ISO 13588.', tags: ['paut','phased-array','ut','ultrasonic'] },
  { url: '/pillars/tank-inspection-pillar', title: 'Storage Tank Inspection — API 653',
    blurb: 'Floor scanning, shell UT, settlement surveys.', tags: ['tank','api-653','storage','floor'] },
  { url: '/pillars/pipeline-inspection-pillar', title: 'Pipeline Integrity Inspection',
    blurb: 'MFL, ILI, API 1163, corrosion monitoring.', tags: ['pipeline','mfl','api-1163','ili'] },
  { url: '/pillars/mfl-pipeline-inspection-pillar', title: 'MFL Pipeline Inspection — Complete Guide',
    blurb: 'ILI tool physics, triaxial vs single-axis, API 1163 validation, per-mile cost.', tags: ['mfl','pipeline','ili','api-1163','triaxial','tfi','metal-loss'] },
  { url: '/pillars/weld-inspection-pillar', title: 'Weld Inspection — Complete Guide',
    blurb: 'UT/RT/MT/PT on welds, AWS D1.1, ASME IX.', tags: ['weld','wps','aws','aws-d1-1','welder'] },
  { url: '/pillars/cwi-certification-pillar', title: 'AWS CWI Certification — Full Guide',
    blurb: 'QC1, 3-part exam, 25% pass rate, prep paths, $1,065 fee, 9-yr recert.', tags: ['cwi','aws-cwi','aws-d1-1','weld','welder','aws','certification'] },
  { url: '/pillars/heat-exchanger-tube-inspection-pillar', title: 'Heat Exchanger Tube Inspection',
    blurb: 'Eddy current, IRIS, RFT/NFT, tube grading.', tags: ['eddy-current','ec','tube','heat-exchanger','iris'] },
  { url: '/pillars/refinery-inspection-pillar', title: 'Refinery Inspection — RBI / FFS',
    blurb: 'API 510/570/579/580/581, inspection planning.', tags: ['refinery','rbi','ffs','api-510','api-570','api-579'] },
  { url: '/pillars/offshore-inspection-pillar', title: 'Offshore NDT Inspection',
    blurb: 'Riser, jacket, splash-zone, DNV codes.', tags: ['offshore','marine','dnv','riser'] },
  { url: '/pillars/corrosion-monitoring-pillar', title: 'Corrosion Monitoring — CUI / RBI',
    blurb: 'CUI surveys, thickness mapping, API 583.', tags: ['corrosion','cui','rbi','thickness'] },
  // Authored methods (medium authority — focused method pages)
  { url: '/methods/ultrasonic-testing', title: 'Ultrasonic Testing Method',
    blurb: 'Method-level overview, equipment, standards.', tags: ['ut','ultrasonic'] },
  { url: '/methods/radiographic-testing', title: 'Radiographic Testing Method',
    blurb: 'Method-level overview, sources, films, sensors.', tags: ['rt','radiographic'] },
  { url: '/methods/phased-array-ut', title: 'Phased Array UT Method',
    blurb: 'Method-level PAUT page — beam control & probes.', tags: ['paut','phased-array','ut'] },
  { url: '/methods/eddy-current-testing', title: 'Eddy Current Testing Method',
    blurb: 'Method-level EC page — coils, lift-off, signals.', tags: ['eddy-current','ec'] },
  { url: '/methods/tofd-testing', title: 'TOFD Testing Method',
    blurb: 'Time-of-Flight Diffraction — weld imaging.', tags: ['tofd','ut','weld'] },
  // Authored learn how-tos (procedural authority)
  { url: '/learn/how-to-calibrate-ut-flaw-detector', title: 'How to Calibrate a UT Flaw Detector',
    blurb: 'Step-by-step DAC, sensitivity, gate setup.', tags: ['ut','ultrasonic','calibration'] },
  { url: '/learn/how-to-interpret-radiograph-weld-defects', title: 'How to Interpret Radiograph Weld Defects',
    blurb: 'Identify slag, porosity, LOF on RT film.', tags: ['rt','radiographic','weld'] },
  { url: '/learn/how-to-perform-thickness-survey-piping', title: 'How to Perform Thickness Survey on Piping',
    blurb: 'UT scan plan, CMLs, API 570 grid.', tags: ['ut','ultrasonic','thickness','piping','api-570'] },
  // Salary/career cornerstone (link-worthy data asset)
  { url: '/learn/ndt-inspector-salary-guide', title: 'NDT Inspector Salary Guide [2026]',
    blurb: 'US pay by certification level, method & industry — and how to earn more.',
    tags: ['salary','career','cwi','certification','aws-cwi','weld','ut','rt'] },
  { url: '/learn/ndt-inspection-cost-index', title: 'NDT Inspection Cost Index [2026]',
    blurb: 'US inspection rates by method & region, and what moves the price.',
    tags: ['cost','price','rate','ut','rt','paut','mt','pt','budget'] },
];

function pickCornerstones(tags: string[], count = 5): Cornerstone[] {
  if (tags.length === 0) {
    // Fallback: 5 highest-authority general cornerstones
    return CORNERSTONES.slice(0, 5);
  }
  // Score each cornerstone by tag overlap; ties broken by list order
  const scored = CORNERSTONES.map((c, idx) => {
    const overlap = c.tags.filter(t => tags.includes(t)).length;
    return { c, score: overlap, idx };
  });
  scored.sort((a, b) => b.score - a.score || a.idx - b.idx);
  // Take top `count` that have at least 1 overlap if possible; pad with
  // general top picks otherwise
  const matched = scored.filter(s => s.score > 0).map(s => s.c);
  const remaining = scored.filter(s => s.score === 0).map(s => s.c);
  return [...matched, ...remaining].slice(0, count);
}

export interface CornerstoneLinksProps {
  /** Method abbreviation (UT, RT, MT, PT, PAUT, EC, TOFD, MFL). Adds appropriate tags. */
  methodAbbr?: string;
  /** Extra topic hints — e.g. ["weld"], ["tank","api-653"], ["pipeline"]. */
  topicHints?: string[];
  /** How many links to surface (default 5). */
  count?: number;
}

export function CornerstoneLinks({ methodAbbr, topicHints = [], count = 5 }: CornerstoneLinksProps) {
  const methodTagMap: Record<string, string[]> = {
    UT: ['ut','ultrasonic'],
    RT: ['rt','radiographic'],
    MT: ['mt','magnetic-particle'],
    PT: ['pt','penetrant'],
    PAUT: ['paut','phased-array','ut'],
    EC: ['eddy-current','ec'],
    TOFD: ['tofd','ut'],
    MFL: ['mfl','pipeline'],
    VT: [],
  };
  const tags = [
    ...(methodAbbr ? methodTagMap[methodAbbr.toUpperCase()] ?? [] : []),
    ...topicHints.map(t => t.toLowerCase()),
  ];
  const picks = pickCornerstones(tags, count);

  return (
    <section className="mt-12 border-t border-slate-200 pt-8" aria-labelledby="cornerstone-links-heading">
      <h2 id="cornerstone-links-heading" className="text-xl font-bold text-slate-900 mb-2">
        Continue Reading — In-Depth Guides
      </h2>
      <p className="text-sm text-slate-600 mb-5">
        Authored by ASNT Level III inspectors. Real procedures, real numbers, real codes.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {picks.map((p) => (
          <li key={p.url}>
            <Link
              href={p.url}
              className="group flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 hover:border-primary hover:shadow-sm transition"
            >
              <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0 text-primary group-hover:translate-x-0.5 transition-transform" />
              <span className="flex-1">
                <span className="block text-sm font-semibold text-slate-900 group-hover:text-primary">
                  {p.title}
                </span>
                <span className="block text-xs text-slate-600 mt-0.5 leading-snug">
                  {p.blurb}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CornerstoneLinks;
