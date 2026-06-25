'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Gauge } from 'lucide-react';

const NUM = (v: string) => (v === '' ? NaN : Number(v));

export default function CorrosionRateRemainingLifeCalculator() {
  const [ti, setTi] = useState('12.7');
  const [tp, setTp] = useState('11.0');
  const [ta, setTa] = useState('10.2');
  const [tr, setTr] = useState('6.4');
  const [yl, setYl] = useState('15');
  const [ys, setYs] = useState('5');

  const r = useMemo(() => {
    const tI = NUM(ti), tP = NUM(tp), tA = NUM(ta), tR = NUM(tr), yL = NUM(yl), yS = NUM(ys);
    if ([tI, tA, tR, yL].some(Number.isNaN) || yL <= 0) return null;
    const crLong = (tI - tA) / yL;
    const crShort = !Number.isNaN(tP) && !Number.isNaN(yS) && yS > 0 ? (tP - tA) / yS : NaN;
    const crGov = Math.max(crLong, Number.isNaN(crShort) ? -Infinity : crShort);
    const valid = crGov > 0;
    const remaining = valid ? (tA - tR) / crGov : Infinity;
    const next = valid ? remaining / 2 : Infinity;
    return { crLong, crShort, crGov, remaining, next, valid };
  }, [ti, tp, ta, tr, yl, ys]);

  const fld = (id: string, label: string, val: string, set: (v: string) => void) => (
    <div>
      <Label htmlFor={id} className="text-xs">{label}</Label>
      <Input id={id} type="number" inputMode="decimal" value={val} onChange={(e) => set(e.target.value)} className="mt-1" />
    </div>
  );

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Gauge className="h-5 w-5 text-emerald-600" />
          Corrosion Rate & Remaining Life
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fld('ti', 'Initial thickness (mm)', ti, setTi)}
          {fld('tp', 'Previous thickness (mm)', tp, setTp)}
          {fld('ta', 'Current thickness (mm)', ta, setTa)}
          {fld('tr', 'Required min. thickness (mm)', tr, setTr)}
          {fld('yl', 'Years: initial → now', yl, setYl)}
          {fld('ys', 'Years: previous → now', ys, setYs)}
        </div>

        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4">
          {r ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-emerald-700">Long-term CR</div>
                <div className="text-xl font-semibold text-emerald-900">{r.crLong.toFixed(3)} mm/yr</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-emerald-700">Short-term CR</div>
                <div className="text-xl font-semibold text-emerald-900">{Number.isNaN(r.crShort) ? '—' : r.crShort.toFixed(3) + ' mm/yr'}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-emerald-700">Remaining life</div>
                <div className="text-xl font-semibold text-emerald-900">{r.valid ? r.remaining.toFixed(1) + ' yr' : '—'}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-emerald-700">Next insp. (½ life)</div>
                <div className="text-xl font-semibold text-emerald-900">{r.valid ? r.next.toFixed(1) + ' yr' : '—'}</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter thicknesses and the time periods.</div>
          )}
          {r && !r.valid && (
            <p className="mt-3 text-xs text-amber-700">Corrosion rate is zero or negative — re-grid and re-measure at the same CML; do not report infinite life.</p>
          )}
          {r && r.valid && (
            <p className="mt-3 text-xs text-slate-600">Governing rate = {r.crGov.toFixed(3)} mm/yr (the larger of long/short term). Cap the interval at the code maximum (API 510: 10 yr vessels; API 570: 5–10 yr piping; API 653: per RBI / 20 yr tanks).</p>
          )}
        </div>
        <p className="text-xs text-slate-500">Required minimum thickness comes from the construction code (ASME VIII, B31.3, API 650). Assumes a linear corrosion rate.</p>
      </CardContent>
    </Card>
  );
}
