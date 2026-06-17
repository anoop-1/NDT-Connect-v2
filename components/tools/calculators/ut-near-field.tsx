'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Waves } from 'lucide-react';

// Longitudinal velocity in mm/µs (= km/s) for common materials.
const VELOCITY: Record<string, number> = {
  'Steel (5900 m/s)': 5.9,
  'Aluminium (6320 m/s)': 6.32,
  'Stainless 316 (5790 m/s)': 5.79,
  'Copper (4700 m/s)': 4.7,
  'Cast iron (4600 m/s)': 4.6,
  'Water (1480 m/s)': 1.48,
  'Acrylic/wedge (2730 m/s)': 2.73,
};

export default function UtNearFieldCalculator() {
  const [diameter, setDiameter] = useState<number>(12.7);
  const [frequency, setFrequency] = useState<number>(5);
  const [material, setMaterial] = useState<string>('Steel (5900 m/s)');

  const result = useMemo(() => {
    const v = VELOCITY[material];
    if (!v || !diameter || !frequency || diameter <= 0 || frequency <= 0) return null;
    const lambda = v / frequency; // mm
    const N = (diameter * diameter) / (4 * lambda); // mm
    return { N, lambda };
  }, [diameter, frequency, material]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Waves className="h-5 w-5 text-blue-600" />
          UT Near-Field (Fresnel Zone)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <Label htmlFor="diameter">Element diameter (mm)</Label>
            <input id="diameter" type="number" min={0} step={0.1} value={diameter}
              onChange={(e) => setDiameter(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <Label htmlFor="frequency">Frequency (MHz)</Label>
            <input id="frequency" type="number" min={0} step={0.1} value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <Label htmlFor="material">Material</Label>
            <select id="material" value={material} onChange={(e) => setMaterial(e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              {Object.keys(VELOCITY).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>

        <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
          {result ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-blue-700">Near-field length N</div>
                <div className="text-3xl font-semibold text-blue-900">{result.N.toFixed(1)} mm</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-blue-700">Wavelength λ</div>
                <div className="text-3xl font-semibold text-blue-900">{result.lambda.toFixed(2)} mm</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter a positive diameter and frequency.</div>
          )}
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
          N = D² / (4λ),  λ = v / f
          <div className="mt-2 font-sans text-xs text-slate-600">
            Calibrate reference reflectors at or beyond N — amplitude sizing is unreliable in the near field.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
