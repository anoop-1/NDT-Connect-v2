'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScanLine } from 'lucide-react';

// ASME V Article 2 Ug limits by thickness (mm -> max Ug mm)
function ugLimit(thicknessMm: number): number {
  if (thicknessMm < 50.8) return 0.51;
  if (thicknessMm < 76.2) return 0.76;
  if (thicknessMm < 101.6) return 1.02;
  return 1.78;
}

export default function RtGeometricUnsharpnessCalculator() {
  const [focalSpot, setFocalSpot] = useState<number>(3);
  const [sod, setSod] = useState<number>(600);
  const [ofd, setOfd] = useState<number>(25);
  const [thickness, setThickness] = useState<number>(25);

  const result = useMemo(() => {
    if (!sod || sod <= 0 || focalSpot < 0 || ofd < 0) return null;
    const ug = (focalSpot * ofd) / sod;
    const limit = ugLimit(thickness);
    return { ug, limit, pass: ug <= limit };
  }, [focalSpot, sod, ofd, thickness]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <ScanLine className="h-5 w-5 text-violet-600" />
          RT Geometric Unsharpness
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="focalSpot">Focal-spot size F (mm)</Label>
            <input id="focalSpot" type="number" min={0} step={0.1} value={focalSpot}
              onChange={(e) => setFocalSpot(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <Label htmlFor="sod">Source-to-object SOD (mm)</Label>
            <input id="sod" type="number" min={0} step={1} value={sod}
              onChange={(e) => setSod(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <Label htmlFor="ofd">Object-to-film OFD (mm)</Label>
            <input id="ofd" type="number" min={0} step={1} value={ofd}
              onChange={(e) => setOfd(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <Label htmlFor="thickness">Material thickness (mm)</Label>
            <input id="thickness" type="number" min={0} step={1} value={thickness}
              onChange={(e) => setThickness(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
        </div>

        <div className={`rounded-md border p-4 ${result?.pass ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          {result ? (
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-600">Geometric unsharpness Ug</div>
                <div className="text-3xl font-semibold text-slate-900">{result.ug.toFixed(3)} mm</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wide text-slate-600">ASME V limit</div>
                <div className="text-lg font-semibold text-slate-900">{result.limit.toFixed(2)} mm</div>
                <div className={`text-sm font-bold ${result.pass ? 'text-green-700' : 'text-red-700'}`}>
                  {result.pass ? 'PASS' : 'FAIL — increase SOD'}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter a positive source-to-object distance.</div>
          )}
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
          Ug = F × OFD / SOD
          <div className="mt-2 font-sans text-xs text-slate-600">ASME BPVC Section V, Article 2 — limit banded by thickness.</div>
        </div>
      </CardContent>
    </Card>
  );
}
