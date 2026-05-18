'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Radiation, Eye, EyeOff } from 'lucide-react';

// HVL in millimetres (NCRP 49 / ANSI N43.3 reference tables, narrow-beam)
const HVL_TABLE: Record<string, Record<string, number>> = {
  'Ir-192': { Lead: 4.8, Steel: 13.0, Tungsten: 3.3, Concrete: 41.0 },
  'Co-60': { Lead: 12.0, Steel: 21.6, Tungsten: 7.6, Concrete: 60.5 },
  'Se-75': { Lead: 2.0, Steel: 9.0, Tungsten: 1.5, Concrete: 35.0 },
  'Cs-137': { Lead: 6.5, Steel: 15.9, Tungsten: 4.6, Concrete: 48.0 },
  'X-ray (200 kVp)': { Lead: 0.52, Steel: 1.6, Tungsten: 0.3, Concrete: 21.0 },
};

export default function HalfValueLayerCalculator() {
  const [source, setSource] = useState<string>('Ir-192');
  const [material, setMaterial] = useState<string>('Lead');
  const [showFormula, setShowFormula] = useState(false);

  const result = useMemo(() => {
    const hvl = HVL_TABLE[source]?.[material];
    if (!hvl) return null;
    return { hvl, tvl: hvl * (Math.log(10) / Math.log(2)) };
  }, [source, material]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Radiation className="h-5 w-5 text-amber-600" />
          Half-Value Layer (HVL)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="source">Radiation source</Label>
            <select
              id="source"
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              {Object.keys(HVL_TABLE).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="material">Shielding material</Label>
            <select
              id="material"
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              {Object.keys(HVL_TABLE[source] ?? {}).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
          {result ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-amber-700">HVL</div>
                <div className="text-3xl font-semibold text-amber-900">{result.hvl.toFixed(1)} mm</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-amber-700">TVL</div>
                <div className="text-3xl font-semibold text-amber-900">{result.tvl.toFixed(1)} mm</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Select a source and shielding material.</div>
          )}
        </div>

        <button type="button" onClick={() => setShowFormula((s) => !s)} className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-900">
          {showFormula ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showFormula ? 'Hide formula' : 'Show formula'}
        </button>
        {showFormula && (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
            HVL = ln(2) / μ ; TVL = ln(10) / μ
            <div className="mt-2 text-xs text-slate-600">Values are narrow-beam, mono-energetic. Apply buildup factors for broad-beam geometry.</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
