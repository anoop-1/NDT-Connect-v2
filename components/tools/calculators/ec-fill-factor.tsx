'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CircleDot } from 'lucide-react';

const NUM = (v: string) => (v === '' ? NaN : Number(v));

export default function EcFillFactorCalculator() {
  const [coil, setCoil] = useState('14.0');
  const [tube, setTube] = useState('15.4');

  const r = useMemo(() => {
    const d = NUM(coil), D = NUM(tube);
    if ([d, D].some(Number.isNaN) || D <= 0 || d <= 0 || d > D) return null;
    const eta = (d / D) ** 2;
    let band = 'good';
    if (eta < 0.7) band = 'low';
    else if (eta > 0.9) band = 'tight';
    return { eta, pct: eta * 100, band };
  }, [coil, tube]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <CircleDot className="h-5 w-5 text-indigo-600" />
          Eddy Current Fill Factor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="coil" className="text-xs">Bobbin coil outer diameter (mm)</Label>
            <Input id="coil" type="number" inputMode="decimal" value={coil} onChange={(e) => setCoil(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="tube" className="text-xs">Tube inner diameter (mm)</Label>
            <Input id="tube" type="number" inputMode="decimal" value={tube} onChange={(e) => setTube(e.target.value)} className="mt-1" />
          </div>
        </div>

        <div className="rounded-md border border-indigo-200 bg-indigo-50 p-4">
          {r ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-indigo-700">Fill factor η</div>
                <div className="text-3xl font-semibold text-indigo-900">{r.eta.toFixed(3)}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-indigo-700">Fill factor</div>
                <div className="text-3xl font-semibold text-indigo-900">{r.pct.toFixed(1)} %</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter coil and tube diameters (coil must be ≤ tube ID).</div>
          )}
          {r && (
            <p className="mt-3 text-xs text-slate-600">
              {r.band === 'good' && 'In the typical good-practice band (0.70–0.85): strong sensitivity, passes freely.'}
              {r.band === 'low' && 'Low fill factor (<0.70): weak coupling — may miss shallow pitting and gradual wall loss.'}
              {r.band === 'tight' && 'High fill factor (>0.90): risk of probe sticking, wear and false indications from minor geometry.'}
            </p>
          )}
        </div>
        <p className="text-xs text-slate-500">η = (coil diameter / tube ID)². Tube ID = OD − 2 × wall. Allow for ovality and deposits.</p>
      </CardContent>
    </Card>
  );
}
