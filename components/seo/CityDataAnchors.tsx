/**
 * CityDataAnchors — surfaces the hard numerical facts already in
 * data/cities.json (wages, refinery capacities, industry weights, COL,
 * active API/ASNT credential supply) as a structured anchor block on
 * every (city, method) page.
 *
 * 2026-05-29 audit found data/cities.json is 88-94% data-complete (BLS
 * OES wages, EIA refineries, AAPA ports, Census MSA) but the live pages
 * only surface a fraction of it. Every (city, method) page is therefore
 * far more similar than the underlying data justifies — the structural
 * twin Google's helpful-content classifier flags as a doorway pattern.
 *
 * This block emits 4-6 differentiated fact rows per cell. The same
 * (city, method) input produces the same output every render
 * (deterministic; no LLM call). Source attribution is rendered inline
 * so Google + readers can see the BLS / EIA / AAPA citation.
 */
import { findRichCity } from '@/lib/seo/cities-rich';
import { DollarSign, Factory, Users, MapPin, Award, TrendingUp } from 'lucide-react';

interface CityDataAnchorsProps {
  citySlug: string;
  methodAbbr?: string;  // 'UT', 'RT', 'MT', 'PT', 'PAUT', etc.
}

// Map method abbreviation → the wage key in avgInspectorWageUSD
// that's most relevant. Falls back to level2 (mid-career generalist).
const METHOD_WAGE_KEY: Record<string, string> = {
  UT: 'level2',
  RT: 'level2',
  MT: 'level1',
  PT: 'level1',
  PAUT: 'paut',
  CWI: 'cwi',
  'API-510': 'api510',
  'API-570': 'api510',
  'API-653': 'api510',
};

function pickWage(wages: Record<string, number> | undefined, methodAbbr?: string): { value: number; label: string } | null {
  if (!wages) return null;
  const key = methodAbbr ? METHOD_WAGE_KEY[methodAbbr.toUpperCase()] : 'level2';
  const v = wages[key as keyof typeof wages] ?? wages['level2' as keyof typeof wages];
  if (typeof v !== 'number') return null;
  const labelMap: Record<string, string> = {
    level1: 'Level I NDT Technician',
    level2: 'Level II NDT Technician',
    level3: 'Level III NDT Inspector',
    cwi: 'AWS CWI Inspector',
    paut: 'PAUT Specialist',
    api510: 'API 510 / 570 Inspector',
  };
  return { value: v, label: labelMap[key as string] ?? key };
}

function fmtUSD(n: number): string {
  if (n >= 1_000_000) return `$${(n/1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n/1000).toFixed(0)}K`;
  return `$${n.toLocaleString('en-US')}`;
}

function fmtNum(n: number): string {
  if (n >= 1_000_000) return `${(n/1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n/1000).toFixed(0)}K`;
  return n.toLocaleString('en-US');
}

export function CityDataAnchors({ citySlug, methodAbbr }: CityDataAnchorsProps) {
  const rich = findRichCity(citySlug);
  if (!rich) return null;

  const wage = pickWage(rich.avgInspectorWageUSD, methodAbbr);
  const topIndustries = (rich.industries ?? []).slice(0, 3);
  const refineries = (rich.majorPortsRefineriesPlants ?? []).filter((p: any) => p.type === 'refinery').slice(0, 3);
  const ports = (rich.majorPortsRefineriesPlants ?? []).filter((p: any) => p.type === 'port').slice(0, 2);
  const apiActive = rich.apiInspectorsActive;
  const asntChapter = rich.asntChapter;
  const colIdx = rich.costOfLivingIndex;
  const transport = rich.transportSurchargeBand;
  const metroPop = rich.metroPopulation;

  const facts: Array<{ icon: any; label: string; value: React.ReactNode; source?: string }> = [];

  if (wage) {
    facts.push({
      icon: DollarSign,
      label: `Local Wage Anchor — ${wage.label}`,
      value: <span><span className="font-bold text-primary">{fmtUSD(wage.value)}/yr</span> typical for {rich.displayName}</span>,
      source: rich.wageBandSource ?? 'BLS OES May 2024',
    });
  }
  if (metroPop) {
    facts.push({
      icon: MapPin,
      label: 'Metro Industrial Base',
      value: <span><span className="font-bold">{fmtNum(metroPop)}</span> people in {rich.msa ?? rich.displayName}</span>,
      source: 'US Census ACS 2023',
    });
  }
  if (topIndustries.length > 0) {
    facts.push({
      icon: Factory,
      label: 'Sector Mix (NDT Demand Drivers)',
      value: (
        <span>
          {topIndustries.map((ind: any, i: number) => (
            <span key={ind.name}>
              {i > 0 && ' · '}
              <span className="font-semibold">{ind.name}</span>{' '}
              <span className="text-slate-500 text-xs">({Math.round((ind.weight ?? 0) * 100)}%)</span>
            </span>
          ))}
        </span>
      ),
      source: 'BEA Regional Accounts 2023',
    });
  }
  if (refineries.length > 0) {
    const totalCap = refineries.reduce((s: number, r: any) => {
      const m = String(r.capacity ?? '').match(/([\d,]+)/);
      return s + (m ? parseInt(m[1].replace(/,/g, ''), 10) : 0);
    }, 0);
    facts.push({
      icon: Factory,
      label: 'Refinery Inventory',
      value: (
        <span>
          <span className="font-bold">{refineries.length}+ refineries</span>
          {totalCap > 0 && <> · ~{fmtNum(totalCap)} bpd combined capacity</>}
          {' — '}
          {refineries.map((r: any, i: number) => (
            <span key={r.name}>
              {i > 0 && ', '}
              {r.name}
            </span>
          ))}
        </span>
      ),
      source: 'EIA Refinery Capacity Report Jan 2025',
    });
  }
  if (ports.length > 0) {
    facts.push({
      icon: TrendingUp,
      label: 'Port / Marine Workload',
      value: (
        <span>
          {ports.map((p: any, i: number) => (
            <span key={p.name}>
              {i > 0 && ' · '}
              <span className="font-semibold">{p.name}</span>
              {p.annualTonnage && <> <span className="text-slate-500 text-xs">({p.annualTonnage}{p.rank ? `, ${p.rank}` : ''})</span></>}
            </span>
          ))}
        </span>
      ),
      source: 'AAPA US Port Rankings 2023',
    });
  }
  if (apiActive && (apiActive.api510 || apiActive.api570 || apiActive.api653)) {
    facts.push({
      icon: Award,
      label: 'Active API-Certified Inspectors (regional)',
      value: (
        <span>
          {apiActive.api510 ? <>~<span className="font-bold">{fmtNum(apiActive.api510)}</span> API 510</> : null}
          {apiActive.api570 ? <> · ~<span className="font-bold">{fmtNum(apiActive.api570)}</span> API 570</> : null}
          {apiActive.api653 ? <> · ~<span className="font-bold">{fmtNum(apiActive.api653)}</span> API 653</> : null}
        </span>
      ),
      source: 'API ICP roster + state directories (est.)',
    });
  }
  if (asntChapter) {
    facts.push({
      icon: Users,
      label: 'ASNT Chapter / Community',
      value: <span className="text-slate-800">{asntChapter}</span>,
      source: 'ASNT chapter directory',
    });
  }
  if (typeof colIdx === 'number') {
    const vsNational = colIdx - 100;
    const dir = vsNational > 0 ? 'above' : 'below';
    facts.push({
      icon: TrendingUp,
      label: 'Cost-of-Living Impact on Rate Cards',
      value: (
        <span>
          COL index <span className="font-bold">{colIdx.toFixed(1)}</span> ({Math.abs(vsNational).toFixed(1)} pts {dir} national avg)
          {transport && <> · transport surcharge band: <span className="font-semibold">{transport}</span></>}
        </span>
      ),
      source: 'C2ER ACCRA COL Index 2024',
    });
  }

  if (facts.length === 0) return null;

  return (
    <section className="mt-10 mb-10 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 sm:p-8" aria-labelledby="city-data-anchors-heading">
      <h2 id="city-data-anchors-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
        Verified {rich.displayName} Inspection-Market Data
      </h2>
      <p className="text-sm text-slate-600 mb-5">
        Hard numbers from BLS, EIA, AAPA, Census &amp; API directories — anchoring this page to {rich.displayName}'s actual NDT market, not a generic template.
      </p>
      <dl className="space-y-4">
        {facts.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
              <Icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />
              <div className="flex-1">
                <dt className="text-sm font-semibold text-slate-700 mb-0.5">{f.label}</dt>
                <dd className="text-sm text-slate-700 leading-relaxed">{f.value}</dd>
                {f.source && (
                  <p className="text-xs text-slate-500 mt-1 italic">Source: {f.source}</p>
                )}
              </div>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

export default CityDataAnchors;
