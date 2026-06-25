import { NextResponse } from 'next/server';

// Public CSV export of the NDT Inspection Cost Index — method rates + regional
// tier multipliers behind /learn/ndt-inspection-cost-index. Kept in sync with
// that page's tables.
export const dynamic = 'force-static';

const METHOD_RATES: [string, string, string][] = [
  // method, hourly range (USD), typical 8h day rate (USD)
  ['Visual (VT)', '125-375', '1700'],
  ['Liquid Penetrant (PT)', '175-525', '2300'],
  ['Magnetic Particle (MT)', '175-550', '2400'],
  ['Ultrasonic (UT)', '225-700', '3200'],
  ['Eddy Current (ET)', '240-780', '3400'],
  ['Radiographic (RT)', '400-1200', '5400'],
  ['Phased Array (PAUT)', '400-1300', '5650'],
];
const TIER_MULT: [string, string, string][] = [
  ['Tier 1 (premium)', 'Houston, Baton Rouge, LA Basin', '1.18'],
  ['Tier 2 (mainstream)', 'Tulsa, Pittsburgh, Mobile', '1.00'],
  ['Tier 3 (value)', 'smaller metros', '0.92'],
  ['Tier 4 (frontier)', 'remote / emerging', '0.85'],
];

export async function GET() {
  const lines: string[] = [];
  lines.push('section,key,detail,value');
  for (const [m, hr, day] of METHOD_RATES) {
    lines.push(`method_rate,"${m}","hourly_usd ${hr}",${day}`);
  }
  for (const [tier, ex, mult] of TIER_MULT) {
    lines.push(`regional_multiplier,"${tier}","${ex}",${mult}`);
  }
  return new NextResponse(lines.join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="ndt-inspection-cost-index-2026.csv"',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
