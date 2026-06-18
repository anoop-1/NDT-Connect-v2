'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Ruler } from 'lucide-react';

export default function SkipDistanceCalculator() {
  const [thickness, setThickness] = useState<number>(20);
  const [angle, setAngle] = useState<number>(60);

  const result = useMemo(() => {
    if (!thickness || thickness <= 0 || !angle || angle <= 0 || angle >= 90) return null;
    const rad = (angle * Math.PI) / 180;
    const tan = Math.tan(rad);
    const cos = Math.cos(rad);
    return {
      half: thickness * tan,
      full: 2 * thickness * tan,
      halfPath: thickness / cos,
      fullPath: (2 * thickness) / cos,
    };
  }, [thickness, angle]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Ruler className="h-5 w-5 text-cyan-600" />
          UT Skip Distance (Angle Beam)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="thickness">Wall thickness T (mm)</Label>
            <input id="thickness" type="number" min={0} step={0.5} value={thickness}
              onChange={(e) => setThickness(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <Label htmlFor="angle">Refracted angle θ (°)</Label>
            <select id="angle" value={angle} onChange={(e) => setAngle(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              {[45, 60, 70].map((a) => <option key={a} value={a}>{a}°</option>)}
            </select>
          </div>
        </div>

        <div className="rounded-md border border-cyan-200 bg-cyan-50 p-4">
          {result ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-cyan-700">Half-skip (½V) surface</div>
                <div className="text-2xl font-semibold text-cyan-900">{result.half.toFixed(1)} mm</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-cyan-700">Full-skip (V) surface</div>
                <div className="text-2xl font-semibold text-cyan-900">{result.full.toFixed(1)} mm</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-cyan-700">½V beam path</div>
                <div className="text-2xl font-semibold text-cyan-900">{result.halfPath.toFixed(1)} mm</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-cyan-700">Full-V beam path</div>
                <div className="text-2xl font-semibold text-cyan-900">{result.fullPath.toFixed(1)} mm</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter a positive thickness and angle (0–90°).</div>
          )}
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
          ½-skip = T·tanθ · full-skip = 2T·tanθ · path = T/cosθ
          <div className="mt-2 font-sans text-xs text-slate-600">Measure surface distance from the beam index (exit) point, not the housing.</div>
        </div>
      </CardContent>
    </Card>
  );
}
