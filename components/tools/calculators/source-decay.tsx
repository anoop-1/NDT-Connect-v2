'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Radiation, Eye, EyeOff } from 'lucide-react';

const HALF_LIFE_DAYS: Record<string, number> = {
  'Ir-192': 73.83,
  'Co-60': 1925.28,
  'Se-75': 119.78,
  'Cs-137': 10970,
  'Yb-169': 32.02,
};

export default function SourceDecayCalculator() {
  const [initialActivity, setInitialActivity] = useState<number>(100);
  const [isotope, setIsotope] = useState<string>('Ir-192');
  const [daysElapsed, setDaysElapsed] = useState<number>(75);
  const [showFormula, setShowFormula] = useState(false);

  const result = useMemo(() => {
    const tHalf = HALF_LIFE_DAYS[isotope];
    if (!tHalf || !Number.isFinite(initialActivity) || !Number.isFinite(daysElapsed) || initialActivity <= 0 || daysElapsed < 0) return null;
    const lambda = Math.log(2) / tHalf;
    const A = initialActivity * Math.exp(-lambda * daysElapsed);
    const pct = (A / initialActivity) * 100;
    return { A, pct };
  }, [initialActivity, isotope, daysElapsed]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Radiation className="h-5 w-5 text-amber-600" />
          Source Activity Decay
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="iso">Isotope</Label>
            <select id="iso" className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={isotope} onChange={(e) => setIsotope(e.target.value)}>
              {Object.keys(HALF_LIFE_DAYS).map((k) => (
                <option key={k} value={k}>
                  {k} (T½ = {HALF_LIFE_DAYS[k].toFixed(1)} d)
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="A0">Initial activity (Ci)</Label>
            <Input id="A0" type="number" min={0} step={0.1} value={initialActivity} onChange={(e) => setInitialActivity(parseFloat(e.target.value))} className="mt-1" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="days">Days elapsed since calibration</Label>
            <Input id="days" type="number" min={0} step={1} value={daysElapsed} onChange={(e) => setDaysElapsed(parseFloat(e.target.value))} className="mt-1" />
          </div>
        </div>

        <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
          {result ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-amber-700">Current activity</div>
                <div className="text-3xl font-semibold text-amber-900">{result.A.toFixed(2)} Ci</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-amber-700">Remaining</div>
                <div className="text-3xl font-semibold text-amber-900">{result.pct.toFixed(1)}%</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter activity &gt; 0 and elapsed days ≥ 0.</div>
          )}
        </div>

        <button type="button" onClick={() => setShowFormula((s) => !s)} className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-900">
          {showFormula ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showFormula ? 'Hide formula' : 'Show formula'}
        </button>
        {showFormula && (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
            A(t) = A₀ × exp(-λ × t) ; λ = ln(2) / T½
          </div>
        )}
      </CardContent>
    </Card>
  );
}
