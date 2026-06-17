'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Activity } from 'lucide-react';

// Resistivity (µΩ·cm) and relative permeability per material.
const MATERIALS: Record<string, { rho: number; mu: number }> = {
  'Copper (1.72 µΩ·cm)': { rho: 1.72, mu: 1 },
  'Aluminium (2.82 µΩ·cm)': { rho: 2.82, mu: 1 },
  'Brass (6.2 µΩ·cm)': { rho: 6.2, mu: 1 },
  'Titanium (42 µΩ·cm)': { rho: 42, mu: 1 },
  'Stainless 304/316 (72 µΩ·cm)': { rho: 72, mu: 1 },
  'Inconel 600 (103 µΩ·cm)': { rho: 103, mu: 1 },
  'Carbon steel (16 µΩ·cm, µr≈100)': { rho: 16, mu: 100 },
};

export default function EcSkinDepthCalculator() {
  const [material, setMaterial] = useState<string>('Aluminium (2.82 µΩ·cm)');
  const [frequency, setFrequency] = useState<number>(100); // kHz

  const result = useMemo(() => {
    const m = MATERIALS[material];
    if (!m || !frequency || frequency <= 0) return null;
    const fHz = frequency * 1000;
    const delta = 50 * Math.sqrt(m.rho / (m.mu * fHz)); // mm
    return { delta, eff: delta * 3 };
  }, [material, frequency]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Activity className="h-5 w-5 text-indigo-600" />
          Eddy Current Skin Depth
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="material">Material</Label>
            <select id="material" value={material} onChange={(e) => setMaterial(e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              {Object.keys(MATERIALS).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="frequency">Frequency (kHz)</Label>
            <input id="frequency" type="number" min={0} step={1} value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="rounded-md border border-indigo-200 bg-indigo-50 p-4">
          {result ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-indigo-700">Standard depth δ</div>
                <div className="text-3xl font-semibold text-indigo-900">{result.delta.toFixed(3)} mm</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-indigo-700">Effective depth (~3δ)</div>
                <div className="text-3xl font-semibold text-indigo-900">{result.eff.toFixed(2)} mm</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Select a material and a positive frequency.</div>
          )}
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
          δ(mm) ≈ 50·√( ρ[µΩ·cm] / (µr · f[Hz]) )
          <div className="mt-2 font-sans text-xs text-slate-600">Target flaw depth within ~1–2 δ. Ferrous (high µr) → very shallow; mostly surface cracks.</div>
        </div>
      </CardContent>
    </Card>
  );
}
