'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Thermometer } from 'lucide-react';

// % apparent-thickness change per 100°C (velocity-temperature coefficient)
const COEFF: Record<string, number> = {
  'Carbon steel': 1.9,
  'Stainless steel (austenitic)': 1.5,
  'Aluminum': 2.4,
  'Copper / brass': 2.0,
  'Custom (carbon-steel default)': 1.9,
};

const NUM = (v: string) => (v === '' ? NaN : Number(v));

export default function UtTemperatureCorrectionCalculator() {
  const [measured, setMeasured] = useState('12.0');
  const [tCal, setTCal] = useState('20');
  const [tOp, setTOp] = useState('300');
  const [material, setMaterial] = useState('Carbon steel');

  const r = useMemo(() => {
    const m = NUM(measured), c = NUM(tCal), o = NUM(tOp);
    if ([m, c, o].some(Number.isNaN) || m <= 0) return null;
    const k = COEFF[material] ?? 1.9;
    const factor = 1 + (k / 100) * (o - c) / 100;
    if (factor <= 0) return null;
    const corrected = m / factor;
    const errorPct = ((m - corrected) / corrected) * 100;
    return { corrected, errorPct, factor };
  }, [measured, tCal, tOp, material]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Thermometer className="h-5 w-5 text-rose-600" />
          UT Thickness Temperature Correction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="measured" className="text-xs">Measured thickness (mm)</Label>
            <Input id="measured" type="number" inputMode="decimal" value={measured} onChange={(e) => setMeasured(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="material" className="text-xs">Material</Label>
            <select id="material" value={material} onChange={(e) => setMaterial(e.target.value)} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              {Object.keys(COEFF).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="tcal" className="text-xs">Calibration temp (°C)</Label>
            <Input id="tcal" type="number" inputMode="decimal" value={tCal} onChange={(e) => setTCal(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="top" className="text-xs">Operating / surface temp (°C)</Label>
            <Input id="top" type="number" inputMode="decimal" value={tOp} onChange={(e) => setTOp(e.target.value)} className="mt-1" />
          </div>
        </div>

        <div className="rounded-md border border-rose-200 bg-rose-50 p-4">
          {r ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-rose-700">Corrected thickness</div>
                <div className="text-3xl font-semibold text-rose-900">{r.corrected.toFixed(2)} mm</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-rose-700">Uncorrected error</div>
                <div className="text-3xl font-semibold text-rose-900">{r.errorPct >= 0 ? '+' : ''}{r.errorPct.toFixed(1)} %</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter the reading and temperatures.</div>
          )}
          {r && (
            <p className="mt-3 text-xs text-slate-600">{r.errorPct >= 0 ? 'Hot surface — gauge over-reads; corrected value is lower.' : 'Cold surface — gauge under-reads; corrected value is higher.'} Or calibrate on a block at the operating temperature to avoid the correction.</p>
          )}
        </div>
        <p className="text-xs text-slate-500">~1% per 55°C for carbon steel. Use a manufacturer hot-block calibration for critical work and high-temp probes/couplant above ~150°C.</p>
      </CardContent>
    </Card>
  );
}
