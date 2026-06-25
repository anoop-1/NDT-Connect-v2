import { NextResponse } from 'next/server';
import citiesJson from '@/data/cities.json';

// Public CSV export of NDT inspector wage bands by city — the unique, citable
// dataset behind /learn/ndt-inspector-salary-guide and the salary-by-city pages.
export const dynamic = 'force-static';

function csvCell(v: unknown): string {
  const s = v == null ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET() {
  const raw = citiesJson as Record<string, any>;
  const headers = ['slug', 'city', 'state', 'country', 'region', 'tier', 'metro_population', 'wage_level1_usd', 'wage_level2_usd', 'wage_level3_usd', 'wage_source'];
  const lines: string[] = [headers.join(',')];

  for (const [slug, v] of Object.entries(raw)) {
    if (slug.startsWith('_') || !v || typeof v !== 'object') continue;
    const w = v.avgInspectorWageUSD || {};
    if (w.level2 == null) continue; // only rows with real wage data
    lines.push([
      slug, v.displayName ?? '', v.state ?? '', v.country ?? '', v.region ?? '', v.tier ?? '',
      v.metroPopulation ?? '', w.level1 ?? '', w.level2 ?? '', w.level3 ?? '', v.wageBandSource ?? '',
    ].map(csvCell).join(','));
  }

  return new NextResponse(lines.join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="ndt-inspector-wages-by-city-2026.csv"',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
