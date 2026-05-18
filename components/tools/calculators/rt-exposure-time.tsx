'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Radiation, Eye, EyeOff } from 'lucide-react';

// ASTM E94 exposure-factor table for Ir-192 on steel, density 2.0 on D5
// units: Ci·min / in² per inch of steel (simplified empirical curve)
function exposureFactor(thicknessIn: number): number {
  // Curve fit: approx E = 0.05 × 10^(thickness × 0.55) for Ir-192 / D5
  return 0.05 * Math.pow(10, thicknessIn * 0.55);
}

const FILM_FACTOR: Record<string, number> = {
  'D3 (Class I — slow)': 2.0,
  'D5 (Class II)': 1.0,
  'D7 (Class III — fast)': 0.45,
  'D8 (Class III — very fast)': 0.3,
};

export default function RtExposureTimeCalculator() {
  const [activity, setActivity] = useState<number>(60);
  const [sfd, setSfd] = useState<number>(36);
  const [thickness, setThickness] = useState<number>(1.0);
  const [film, setFilm] = useState<string>('D5 (Class II)');
  const [showFormula, setShowFormula] = useState(false);

  const result = useMemo(() => {
    if ([activity, sfd, thickness].some((v) => !Number.isFinite(v) || v <= 0)) return null;
    const E = exposureFactor(thickness);
    const factor = FILM_FACTOR[film] ?? 1.0;
    const tMin = (E * sfd * sfd * factor) / (activity * 144); // normalized — SFD in inches, E per in²
    const tSec = tMin * 60;
    return { tSec, tMin };
  }, [activity, sfd, thickness, film]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Radiation className="h-5 w-5 text-amber-600" />
          RT Exposure Time (Ir-192)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="A">Source activity (Ci)</Label>
            <Input id="A" type="number" min={0} step={0.1} value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="sfd">SFD (in)</Label>
            <Input id="sfd" type="number" min={0} step={0.5} value={sfd} onChange={(e) => setSfd(parseFloat(e.target.value))} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="t">Steel thickness (in)</Label>
            <Input id="t" type="number" min={0} step={0.05} value={thickness} onChange={(e) => setThickness(parseFloat(e.target.value))} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="film">Film class</Label>
            <select id="film" className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={film} onChange={(e) => setFilm(e.target.value)}>
              {Object.keys(FILM_FACTOR).map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
          {result ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-amber-700">Exposure (min)</div>
                <div className="text-3xl font-semibold text-amber-900">{result.tMin.toFixed(1)}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-amber-700">Exposure (s)</div>
                <div className="text-3xl font-semibold text-amber-900">{result.tSec.toFixed(0)}</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter positive values for all inputs.</div>
          )}
        </div>

        <button type="button" onClick={() => setShowFormula((s) => !s)} className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-900">
          {showFormula ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showFormula ? 'Hide formula' : 'Show formula'}
        </button>
        {showFormula && (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
            t = (E × SFD²) / (A × FilmFactor)
            <div className="mt-2 text-xs text-slate-600">E from ASTM E94 Table A1.1 (Ir-192 / D5 / steel / density 2.0). Validate against site procedure.</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
