'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Magnet } from 'lucide-react';

const FILL = ['Low fill (part < 10% of coil)', 'High fill (cable-wrap / part ≥ 10%)'];

export default function MtCoilAmperageCalculator() {
  const [length, setLength] = useState<number>(300);
  const [diameter, setDiameter] = useState<number>(50);
  const [turns, setTurns] = useState<number>(5);
  const [fill, setFill] = useState<string>(FILL[0]);

  const result = useMemo(() => {
    if (!length || !diameter || !turns || diameter <= 0 || turns <= 0) return null;
    let ld = length / diameter;
    const warn = ld < 2 || ld > 15;
    ld = Math.max(2, Math.min(15, ld)); // E1444 valid window
    const ni = fill.startsWith('Low') ? 45000 / ld : 35000 / (ld + 2);
    return { ld: length / diameter, ni, current: ni / turns, warn };
  }, [length, diameter, turns, fill]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Magnet className="h-5 w-5 text-rose-600" />
          MT Coil Amperage (Ampere-Turns)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="length">Part length L (mm)</Label>
            <input id="length" type="number" min={0} step={1} value={length}
              onChange={(e) => setLength(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <Label htmlFor="diameter">Part diameter D (mm)</Label>
            <input id="diameter" type="number" min={0} step={1} value={diameter}
              onChange={(e) => setDiameter(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <Label htmlFor="turns">Coil turns N</Label>
            <input id="turns" type="number" min={1} step={1} value={turns}
              onChange={(e) => setTurns(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <Label htmlFor="fill">Fill factor</Label>
            <select id="fill" value={fill} onChange={(e) => setFill(e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              {FILL.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>

        <div className="rounded-md border border-rose-200 bg-rose-50 p-4">
          {result ? (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-rose-700">L/D</div>
                  <div className="text-2xl font-semibold text-rose-900">{result.ld.toFixed(1)}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-rose-700">Ampere-turns</div>
                  <div className="text-2xl font-semibold text-rose-900">{Math.round(result.ni).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-rose-700">Current I</div>
                  <div className="text-2xl font-semibold text-rose-900">{Math.round(result.current).toLocaleString()} A</div>
                </div>
              </div>
              {result.warn && (
                <div className="mt-3 text-xs font-medium text-amber-700">
                  L/D outside the ASTM E1444 valid window (2–15) — clamped. Subdivide long parts or add pole pieces.
                </div>
              )}
            </>
          ) : (
            <div className="text-sm text-slate-600">Enter positive length, diameter, and turns.</div>
          )}
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
          Low fill: NI = 45000/(L/D) · High fill: NI = 35000/((L/D)+2) · I = NI/N
          <div className="mt-2 font-sans text-xs text-slate-600">ASTM E1444. Always verify field with a pie gauge / QQI / Hall probe.</div>
        </div>
      </CardContent>
    </Card>
  );
}
