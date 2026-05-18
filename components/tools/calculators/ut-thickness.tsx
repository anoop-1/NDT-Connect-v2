'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calculator, Eye, EyeOff } from 'lucide-react';

const VELOCITY_PRESETS: Record<string, number> = {
  'Carbon steel': 5920,
  'Aluminum 6061': 6320,
  'Stainless 304/316': 5790,
  Copper: 4660,
  'Titanium Gr. 2': 6100,
  Inconel: 5700,
  'Cast iron': 4600,
  Brass: 4430,
  Acrylic: 2730,
  Water: 1480,
};

export default function UtThicknessCalculator() {
  const [velocity, setVelocity] = useState<number>(5920);
  const [tof, setTof] = useState<number>(6.76);
  const [showFormula, setShowFormula] = useState<boolean>(false);

  const result = useMemo(() => {
    if (!Number.isFinite(velocity) || !Number.isFinite(tof) || velocity <= 0 || tof <= 0) {
      return null;
    }
    const tofSec = tof * 1e-6;
    const thicknessMeters = (velocity * tofSec) / 2;
    const thicknessMm = thicknessMeters * 1000;
    const thicknessIn = thicknessMm / 25.4;
    return { thicknessMm, thicknessIn };
  }, [velocity, tof]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Calculator className="h-5 w-5 text-blue-600" />
          UT Thickness Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="material">Material preset</Label>
            <select
              id="material"
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              onChange={(e) => setVelocity(VELOCITY_PRESETS[e.target.value] ?? velocity)}
              defaultValue="Carbon steel"
            >
              {Object.keys(VELOCITY_PRESETS).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="velocity">Sound velocity (m/s)</Label>
            <Input
              id="velocity"
              type="number"
              min={500}
              max={15000}
              step={1}
              value={velocity}
              onChange={(e) => setVelocity(parseFloat(e.target.value))}
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="tof">Time of flight (μs)</Label>
            <Input
              id="tof"
              type="number"
              min={0}
              step={0.01}
              value={tof}
              onChange={(e) => setTof(parseFloat(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>

        <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
          {result ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-blue-700">Thickness (mm)</div>
                <div className="text-3xl font-semibold text-blue-900">{result.thicknessMm.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-blue-700">Thickness (in)</div>
                <div className="text-3xl font-semibold text-blue-900">{result.thicknessIn.toFixed(3)}</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter velocity and time-of-flight greater than zero.</div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowFormula((s) => !s)}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
        >
          {showFormula ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showFormula ? 'Hide formula' : 'Show formula'}
        </button>

        {showFormula && (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
            t = (v × Δt) / 2
            <div className="mt-2 text-xs text-slate-600">
              v in m/s, Δt in seconds (μs × 10⁻⁶), output in metres → ×1000 for mm.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
