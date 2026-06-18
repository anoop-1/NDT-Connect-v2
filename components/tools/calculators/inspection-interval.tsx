'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CalendarClock } from 'lucide-react';

const CODE_MAX: Record<string, number> = {
  'API 510 (pressure vessel)': 10,
  'API 570 (piping)': 10,
  'API 653 (storage tank, internal)': 20,
};

export default function InspectionIntervalCalculator() {
  const [tActual, setTActual] = useState<number>(12);
  const [tMin, setTMin] = useState<number>(6);
  const [corrosionRate, setCorrosionRate] = useState<number>(0.25);
  const [code, setCode] = useState<string>('API 510 (pressure vessel)');

  const result = useMemo(() => {
    if (corrosionRate <= 0 || tActual <= tMin) return null;
    const rl = (tActual - tMin) / corrosionRate;
    const cap = CODE_MAX[code];
    const next = Math.min(rl / 2, cap);
    return { rl, next, capped: rl / 2 > cap };
  }, [tActual, tMin, corrosionRate, code]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <CalendarClock className="h-5 w-5 text-emerald-600" />
          Inspection Interval & Remaining Life
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="tActual">Current thickness (mm)</Label>
            <input id="tActual" type="number" min={0} step={0.1} value={tActual}
              onChange={(e) => setTActual(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <Label htmlFor="tMin">Minimum required t (mm)</Label>
            <input id="tMin" type="number" min={0} step={0.1} value={tMin}
              onChange={(e) => setTMin(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <Label htmlFor="cr">Corrosion rate (mm/yr)</Label>
            <input id="cr" type="number" min={0} step={0.01} value={corrosionRate}
              onChange={(e) => setCorrosionRate(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <Label htmlFor="code">Governing code</Label>
            <select id="code" value={code} onChange={(e) => setCode(e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              {Object.keys(CODE_MAX).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>

        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4">
          {result ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-emerald-700">Remaining life</div>
                <div className="text-3xl font-semibold text-emerald-900">{result.rl.toFixed(1)} yr</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-emerald-700">Next inspection</div>
                <div className="text-3xl font-semibold text-emerald-900">{result.next.toFixed(1)} yr</div>
                {result.capped && <div className="text-xs text-emerald-700 mt-1">capped by code maximum</div>}
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Current thickness must exceed t_min and corrosion rate &gt; 0.</div>
          )}
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
          RL = (t − t_min)/CR · next = min(RL/2, code max)
          <div className="mt-2 font-sans text-xs text-slate-600">General corrosion only. Use governing (greater) corrosion rate. Localised damage → API 579 FFS.</div>
        </div>
      </CardContent>
    </Card>
  );
}
