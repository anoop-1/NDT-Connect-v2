'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Flame } from 'lucide-react';

const EFF: Record<string, number> = {
  'SMAW (0.65)': 0.65,
  'GMAW (0.90)': 0.90,
  'FCAW (0.85)': 0.85,
  'SAW (0.95)': 0.95,
};
const NUM = (v: string) => (v === '' ? NaN : Number(v));
const DENSITY = 7.85e-6; // kg per mm³ (carbon steel)

export default function WeldMetalWeightCalculator() {
  const [joint, setJoint] = useState('Single-V butt');
  const [thickness, setThickness] = useState('12');
  const [angle, setAngle] = useState('60');
  const [rootGap, setRootGap] = useState('2');
  const [length, setLength] = useState('1000');
  const [process, setProcess] = useState('GMAW (0.90)');

  const r = useMemo(() => {
    const t = NUM(thickness), a = NUM(angle), g = NUM(rootGap), L = NUM(length);
    if ([t, L].some(Number.isNaN) || t <= 0 || L <= 0) return null;
    let area: number;
    if (joint === 'Fillet') {
      area = 0.5 * t * t * 1.1; // leg², +10% convexity
    } else {
      if (Number.isNaN(a) || Number.isNaN(g)) return null;
      const groove = t * t * Math.tan((a / 2) * Math.PI / 180);
      const reinforcement = 0.08 * (2 * t * Math.tan((a / 2) * Math.PI / 180) + g); // ~ small cap
      area = g * t + groove + Math.max(reinforcement, 0);
    }
    const deposit = area * L * DENSITY;
    const eff = EFF[process] ?? 0.9;
    return { area, deposit, filler: deposit / eff };
  }, [joint, thickness, angle, rootGap, length, process]);

  const isFillet = joint === 'Fillet';

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Flame className="h-5 w-5 text-orange-600" />
          Weld Metal Weight & Filler
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Label htmlFor="joint" className="text-xs">Joint type</Label>
            <select id="joint" value={joint} onChange={(e) => setJoint(e.target.value)} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option>Single-V butt</option>
              <option>Fillet</option>
            </select>
          </div>
          <div>
            <Label htmlFor="thickness" className="text-xs">{isFillet ? 'Fillet leg (mm)' : 'Plate thickness (mm)'}</Label>
            <Input id="thickness" type="number" inputMode="decimal" value={thickness} onChange={(e) => setThickness(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="angle" className="text-xs">Included angle (°)</Label>
            <Input id="angle" type="number" inputMode="decimal" value={angle} onChange={(e) => setAngle(e.target.value)} disabled={isFillet} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="root" className="text-xs">Root gap (mm)</Label>
            <Input id="root" type="number" inputMode="decimal" value={rootGap} onChange={(e) => setRootGap(e.target.value)} disabled={isFillet} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="length" className="text-xs">Weld length (mm)</Label>
            <Input id="length" type="number" inputMode="decimal" value={length} onChange={(e) => setLength(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="process" className="text-xs">Process (efficiency)</Label>
            <select id="process" value={process} onChange={(e) => setProcess(e.target.value)} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              {Object.keys(EFF).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>

        <div className="rounded-md border border-orange-200 bg-orange-50 p-4">
          {r ? (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-orange-700">Cross-section</div>
                <div className="text-xl font-semibold text-orange-900">{r.area.toFixed(0)} mm²</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-orange-700">Deposited</div>
                <div className="text-xl font-semibold text-orange-900">{r.deposit.toFixed(2)} kg</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-orange-700">Filler to buy</div>
                <div className="text-xl font-semibold text-orange-900">{r.filler.toFixed(2)} kg</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter the joint geometry and length.</div>
          )}
        </div>
        <p className="text-xs text-slate-500">Carbon steel (7.85 g/cm³). Idealised geometry — allow for fit-up, tacks and repair. Single-V and fillet only.</p>
      </CardContent>
    </Card>
  );
}
