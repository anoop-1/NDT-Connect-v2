'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Radiation, Eye, EyeOff } from 'lucide-react';

// Γ in R·m²/(h·Ci) per ANSI N43.3 Table 2
const GAMMA_CONSTANT: Record<string, number> = {
  'Ir-192': 0.5,
  'Co-60': 1.32,
  'Se-75': 0.2,
  'Cs-137': 0.33,
  'Yb-169': 0.13,
};

export default function RadiationSafeDistanceCalculator() {
  const [activity, setActivity] = useState<number>(100);
  const [source, setSource] = useState<string>('Ir-192');
  const [doseRate, setDoseRate] = useState<number>(2); // mR/h
  const [showFormula, setShowFormula] = useState(false);

  const result = useMemo(() => {
    const gamma = GAMMA_CONSTANT[source];
    if (!gamma || !Number.isFinite(activity) || !Number.isFinite(doseRate) || activity <= 0 || doseRate <= 0) {
      return null;
    }
    // gamma in R·m²/(h·Ci) → convert dose rate from mR/h to R/h
    const rateRh = doseRate / 1000;
    const distance_m = Math.sqrt((activity * gamma) / rateRh);
    const distance_ft = distance_m * 3.28084;
    return { distance_m, distance_ft };
  }, [activity, source, doseRate]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Radiation className="h-5 w-5 text-amber-600" />
          Radiation Safe Distance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="src">Source isotope</Label>
            <select
              id="src"
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              {Object.keys(GAMMA_CONSTANT).map((k) => (
                <option key={k} value={k}>
                  {k} (Γ = {GAMMA_CONSTANT[k]})
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="activity">Activity (Ci)</Label>
            <Input id="activity" type="number" min={0} step={0.1} value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))} className="mt-1" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="dose">Target dose rate at boundary (mR/h)</Label>
            <Input id="dose" type="number" min={0} step={0.1} value={doseRate} onChange={(e) => setDoseRate(parseFloat(e.target.value))} className="mt-1" />
            <div className="mt-1 text-xs text-slate-600">2 mR/h = public boundary · 100 mR/h = controlled-area limit</div>
          </div>
        </div>

        <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
          {result ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-amber-700">Distance (m)</div>
                <div className="text-3xl font-semibold text-amber-900">{result.distance_m.toFixed(1)}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-amber-700">Distance (ft)</div>
                <div className="text-3xl font-semibold text-amber-900">{result.distance_ft.toFixed(0)}</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter activity and dose-rate &gt; 0.</div>
          )}
        </div>

        <button type="button" onClick={() => setShowFormula((s) => !s)} className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-900">
          {showFormula ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showFormula ? 'Hide formula' : 'Show formula'}
        </button>
        {showFormula && (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
            D = sqrt(A × Γ / rate)
            <div className="mt-2 text-xs text-slate-600">Unshielded point source, inverse-square. Add HVL factors for shielded geometry.</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
