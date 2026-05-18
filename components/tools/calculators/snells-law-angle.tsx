'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calculator, Eye, EyeOff } from 'lucide-react';

const WEDGE_PRESETS: Record<string, number> = {
  'Rexolite (2,330 m/s)': 2330,
  'Acrylic / Plexiglas (2,730 m/s)': 2730,
  'Polystyrene (2,400 m/s)': 2400,
};

const TARGET_PRESETS: Record<string, number> = {
  'Carbon steel — shear (3,240 m/s)': 3240,
  'Aluminum — shear (3,130 m/s)': 3130,
  'Stainless 304 — shear (3,100 m/s)': 3100,
  'Copper — shear (2,260 m/s)': 2260,
  'Titanium — shear (3,120 m/s)': 3120,
};

export default function SnellsLawAngleCalculator() {
  const [theta1, setTheta1] = useState<number>(36.2);
  const [v1, setV1] = useState<number>(2330);
  const [v2, setV2] = useState<number>(3240);
  const [showFormula, setShowFormula] = useState(false);

  const result = useMemo(() => {
    if (![theta1, v1, v2].every(Number.isFinite) || v1 <= 0 || v2 <= 0 || theta1 < 0 || theta1 >= 90) {
      return null;
    }
    const sinTheta2 = (Math.sin((theta1 * Math.PI) / 180) * v2) / v1;
    if (sinTheta2 > 1 || sinTheta2 < -1) {
      return { theta2: NaN, critical: (Math.asin(v1 / v2) * 180) / Math.PI, totalInternal: true };
    }
    const theta2 = (Math.asin(sinTheta2) * 180) / Math.PI;
    const critical = (Math.asin(v1 / v2) * 180) / Math.PI;
    return { theta2, critical, totalInternal: false };
  }, [theta1, v1, v2]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Calculator className="h-5 w-5 text-blue-600" />
          Snell&apos;s Law Refracted Angle
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Wedge material</Label>
            <select
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              onChange={(e) => setV1(WEDGE_PRESETS[e.target.value] ?? v1)}
              defaultValue="Rexolite (2,330 m/s)"
            >
              {Object.keys(WEDGE_PRESETS).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Test piece</Label>
            <select
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              onChange={(e) => setV2(TARGET_PRESETS[e.target.value] ?? v2)}
              defaultValue="Carbon steel — shear (3,240 m/s)"
            >
              {Object.keys(TARGET_PRESETS).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="theta1">Incident angle θ₁ (°)</Label>
            <Input id="theta1" type="number" min={0} max={89} step={0.1} value={theta1} onChange={(e) => setTheta1(parseFloat(e.target.value))} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="v1">Wedge velocity v₁ (m/s)</Label>
            <Input id="v1" type="number" min={500} step={1} value={v1} onChange={(e) => setV1(parseFloat(e.target.value))} className="mt-1" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="v2">Test-piece velocity v₂ (m/s)</Label>
            <Input id="v2" type="number" min={500} step={1} value={v2} onChange={(e) => setV2(parseFloat(e.target.value))} className="mt-1" />
          </div>
        </div>

        <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
          {result ? (
            result.totalInternal ? (
              <div className="text-sm text-red-700">Total internal reflection — incidence angle exceeds the first critical angle ({result.critical.toFixed(1)}°). Use a lower θ₁.</div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-blue-700">Refracted angle θ₂</div>
                  <div className="text-3xl font-semibold text-blue-900">{result.theta2.toFixed(1)}°</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-blue-700">First critical angle</div>
                  <div className="text-3xl font-semibold text-blue-900">{result.critical.toFixed(1)}°</div>
                </div>
              </div>
            )
          ) : (
            <div className="text-sm text-slate-600">Enter valid values (0 ≤ θ₁ &lt; 90°, velocities &gt; 0).</div>
          )}
        </div>

        <button type="button" onClick={() => setShowFormula((s) => !s)} className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900">
          {showFormula ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showFormula ? 'Hide formula' : 'Show formula'}
        </button>
        {showFormula && (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
            sin(θ₁) / v₁ = sin(θ₂) / v₂
            <div className="mt-2 text-xs text-slate-600">Critical angle: θc = arcsin(v₁ / v₂)</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
