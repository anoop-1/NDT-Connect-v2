'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Diamond } from 'lucide-react';

// Approximate ASTM E140 correspondence for non-austenitic steel.
// Columns: HV, HB, HRC, HRB, tensile (MPa). null = scale not meaningful there.
type Row = { hv: number; hb: number | null; hrc: number | null; hrb: number | null; mpa: number | null };
const TABLE: Row[] = [
  { hv: 80, hb: 76, hrc: null, hrb: 36, mpa: 255 },
  { hv: 100, hb: 95, hrc: null, hrb: 56, mpa: 320 },
  { hv: 120, hb: 114, hrc: null, hrb: 67, mpa: 385 },
  { hv: 140, hb: 133, hrc: null, hrb: 76, mpa: 450 },
  { hv: 160, hb: 152, hrc: null, hrb: 83, mpa: 510 },
  { hv: 180, hb: 171, hrc: null, hrb: 88, mpa: 580 },
  { hv: 200, hb: 190, hrc: null, hrb: 92, mpa: 640 },
  { hv: 220, hb: 209, hrc: null, hrb: 96, mpa: 710 },
  { hv: 240, hb: 228, hrc: 20, hrb: 100, mpa: 770 },
  { hv: 260, hb: 247, hrc: 24, hrb: null, mpa: 830 },
  { hv: 280, hb: 266, hrc: 27, hrb: null, mpa: 890 },
  { hv: 300, hb: 285, hrc: 30, hrb: null, mpa: 950 },
  { hv: 320, hb: 304, hrc: 32, hrb: null, mpa: 1015 },
  { hv: 340, hb: 323, hrc: 34, hrb: null, mpa: 1080 },
  { hv: 360, hb: 342, hrc: 36, hrb: null, mpa: 1150 },
  { hv: 380, hb: 361, hrc: 39, hrb: null, mpa: 1220 },
  { hv: 400, hb: 380, hrc: 41, hrb: null, mpa: 1290 },
  { hv: 420, hb: 399, hrc: 42, hrb: null, mpa: 1360 },
  { hv: 440, hb: 418, hrc: 44, hrb: null, mpa: 1435 },
  { hv: 460, hb: 437, hrc: 46, hrb: null, mpa: 1510 },
  { hv: 480, hb: 456, hrc: 47, hrb: null, mpa: 1580 },
  { hv: 500, hb: 475, hrc: 49, hrb: null, mpa: 1650 },
  { hv: 540, hb: null, hrc: 51, hrb: null, mpa: 1800 },
  { hv: 600, hb: null, hrc: 55, hrb: null, mpa: 2030 },
  { hv: 650, hb: null, hrc: 58, hrb: null, mpa: null },
  { hv: 700, hb: null, hrc: 60, hrb: null, mpa: null },
  { hv: 800, hb: null, hrc: 64, hrb: null, mpa: null },
  { hv: 900, hb: null, hrc: 67, hrb: null, mpa: null },
];

type Key = 'hv' | 'hb' | 'hrc' | 'hrb';

// interpolate y(x) over pairs where both defined; clamp to range; null if outside
function interp(pairs: { x: number; y: number }[], x: number): number | null {
  if (pairs.length < 2) return null;
  if (x < pairs[0].x || x > pairs[pairs.length - 1].x) return null;
  for (let i = 0; i < pairs.length - 1; i++) {
    const a = pairs[i], b = pairs[i + 1];
    if (x >= a.x && x <= b.x) {
      const f = (x - a.x) / (b.x - a.x);
      return a.y + f * (b.y - a.y);
    }
  }
  return null;
}

function pairsFor(from: Key, to: keyof Row): { x: number; y: number }[] {
  return TABLE.filter((r) => r[from] != null && r[to] != null).map((r) => ({ x: r[from] as number, y: r[to] as number }));
}

export default function HardnessConversionCalculator() {
  const [scale, setScale] = useState<Key>('hrc');
  const [value, setValue] = useState('40');

  const r = useMemo(() => {
    const v = value === '' ? NaN : Number(value);
    if (Number.isNaN(v)) return null;
    // map input scale to HV first
    const hv = scale === 'hv' ? v : interp(pairsFor(scale, 'hv'), v);
    if (hv == null) return { out: null as null };
    const out = {
      hb: scale === 'hb' ? v : interp(pairsFor('hv', 'hb'), hv),
      hv: Math.round(hv),
      hrc: scale === 'hrc' ? v : interp(pairsFor('hv', 'hrc'), hv),
      hrb: scale === 'hrb' ? v : interp(pairsFor('hv', 'hrb'), hv),
      mpa: interp(pairsFor('hv', 'mpa'), hv),
    };
    return { out };
  }, [scale, value]);

  const cell = (label: string, val: number | null | undefined, fmt = (n: number) => Math.round(n).toString(), unit = '') => (
    <div>
      <div className="text-xs uppercase tracking-wide text-violet-700">{label}</div>
      <div className="text-2xl font-semibold text-violet-900">{val == null ? '—' : fmt(val) + unit}</div>
    </div>
  );

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Diamond className="h-5 w-5 text-violet-600" />
          Hardness Conversion (steel)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="scale" className="text-xs">Input scale</Label>
            <select id="scale" value={scale} onChange={(e) => setScale(e.target.value as Key)} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="hrc">Rockwell C (HRC)</option>
              <option value="hrb">Rockwell B (HRB)</option>
              <option value="hb">Brinell (HB)</option>
              <option value="hv">Vickers (HV)</option>
            </select>
          </div>
          <div>
            <Label htmlFor="value" className="text-xs">Hardness value</Label>
            <Input id="value" type="number" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} className="mt-1" />
          </div>
        </div>

        <div className="rounded-md border border-violet-200 bg-violet-50 p-4">
          {r && r.out ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {cell('Brinell HB', r.out.hb)}
              {cell('Vickers HV', r.out.hv)}
              {cell('Rockwell C', r.out.hrc, (n) => n.toFixed(0))}
              {cell('Rockwell B', r.out.hrb, (n) => n.toFixed(0))}
              {cell('Tensile', r.out.mpa, (n) => Math.round(n).toString(), ' MPa')}
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter a value in a valid range for the chosen scale (HRC ~20–67, HRB ~36–100).</div>
          )}
        </div>
        <p className="text-xs text-slate-500">Approximate, non-austenitic steel only, per ASTM E140. Not valid for stainless, aluminium or carbides. Tensile is an estimate — never a substitute for a tensile test.</p>
      </CardContent>
    </Card>
  );
}
