'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Zap, Eye, EyeOff } from 'lucide-react';

// σ in S/m, μ_r (relative permeability)
const MATERIALS: Record<string, { sigma: number; mu_r: number }> = {
  'Aluminum 6061': { sigma: 24e6, mu_r: 1 },
  'Aluminum 2024': { sigma: 17e6, mu_r: 1 },
  Copper: { sigma: 58e6, mu_r: 1 },
  Brass: { sigma: 15e6, mu_r: 1 },
  'Carbon steel': { sigma: 7e6, mu_r: 100 },
  'Stainless 304 (non-mag)': { sigma: 1.4e6, mu_r: 1 },
  'Stainless 410 (mag)': { sigma: 2e6, mu_r: 100 },
  Titanium: { sigma: 2.4e6, mu_r: 1 },
  Inconel: { sigma: 1e6, mu_r: 1 },
};

const MU_0 = 4 * Math.PI * 1e-7;

export default function EcFrequencyCalculator() {
  const [material, setMaterial] = useState<string>('Aluminum 6061');
  const [targetDepth, setTargetDepth] = useState<number>(1.0);
  const [showFormula, setShowFormula] = useState(false);

  const result = useMemo(() => {
    const m = MATERIALS[material];
    if (!m || !Number.isFinite(targetDepth) || targetDepth <= 0) return null;
    const mu = MU_0 * m.mu_r;
    const delta_m = targetDepth / 1000;
    const f = 1 / (Math.PI * delta_m * delta_m * mu * m.sigma);
    const fKHz = f / 1000;
    return { fKHz, skinDepth: targetDepth };
  }, [material, targetDepth]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Zap className="h-5 w-5 text-yellow-600" />
          Eddy Current Frequency
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Material</Label>
            <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={material} onChange={(e) => setMaterial(e.target.value)}>
              {Object.keys(MATERIALS).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="d">Target depth δ (mm)</Label>
            <Input id="d" type="number" min={0} step={0.1} value={targetDepth} onChange={(e) => setTargetDepth(parseFloat(e.target.value))} className="mt-1" />
          </div>
        </div>

        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
          {result ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-yellow-700">Test frequency</div>
                <div className="text-3xl font-semibold text-yellow-900">{result.fKHz < 1 ? `${(result.fKHz * 1000).toFixed(1)} Hz` : result.fKHz < 1000 ? `${result.fKHz.toFixed(1)} kHz` : `${(result.fKHz / 1000).toFixed(2)} MHz`}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-yellow-700">Skin depth δ</div>
                <div className="text-3xl font-semibold text-yellow-900">{result.skinDepth.toFixed(2)} mm</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter a target depth &gt; 0.</div>
          )}
        </div>

        <button type="button" onClick={() => setShowFormula((s) => !s)} className="inline-flex items-center gap-2 text-sm font-medium text-yellow-700 hover:text-yellow-900">
          {showFormula ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showFormula ? 'Hide formula' : 'Show formula'}
        </button>
        {showFormula && (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
            δ = 1 / sqrt(π × f × μ × σ)
            <br />f = 1 / (π × δ² × μ × σ)
            <div className="mt-2 text-xs text-slate-600">μ = μ₀ × μ_r ; μ₀ = 4π × 10⁻⁷ H/m</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
