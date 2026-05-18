'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Droplet, Eye, EyeOff } from 'lucide-react';

// ASTM E165 Table 2 (simplified)
const DWELL_TABLE: Record<string, Record<string, number>> = {
  Casting: { Porosity: 5, 'Cold shut': 5, 'Fatigue crack': 30, 'Stress corrosion': 60 },
  Forging: { Porosity: 10, Lap: 10, 'Fatigue crack': 20, 'Stress corrosion': 30 },
  Weld: { Porosity: 10, 'Lack of fusion': 10, 'Fatigue crack': 15, 'Stress corrosion': 60 },
  'Wrought metal': { Porosity: 5, Lap: 5, 'Fatigue crack': 10, 'Stress corrosion': 30 },
};

export default function PtDwellTimeCalculator() {
  const [temperature, setTemperature] = useState<number>(70);
  const [surface, setSurface] = useState<string>('Weld');
  const [defect, setDefect] = useState<string>('Fatigue crack');
  const [showFormula, setShowFormula] = useState(false);

  const result = useMemo(() => {
    const base = DWELL_TABLE[surface]?.[defect];
    if (!base || !Number.isFinite(temperature)) return null;
    let factor = 1.0;
    let warn: string | null = null;
    if (temperature < 50) {
      factor = 2.0;
      warn = 'Below 50 °F — procedure must be re-qualified per ASTM E165 §6.4.';
    } else if (temperature > 125) {
      factor = 1.3;
      warn = 'Above 125 °F — qualification required.';
    } else if (temperature < 60) {
      factor = 1.5;
    }
    const penetrant = Math.ceil(base * factor);
    const developer = Math.max(7, Math.round(penetrant / 2));
    return { penetrant, developer, warn };
  }, [temperature, surface, defect]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Droplet className="h-5 w-5 text-pink-600" />
          PT Dwell Time
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <Label htmlFor="t">Surface temp (°F)</Label>
            <Input id="t" type="number" step={1} value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} className="mt-1" />
          </div>
          <div>
            <Label>Material form</Label>
            <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={surface} onChange={(e) => setSurface(e.target.value)}>
              {Object.keys(DWELL_TABLE).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <Label>Defect type</Label>
            <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={defect} onChange={(e) => setDefect(e.target.value)}>
              {Object.keys(DWELL_TABLE[surface] ?? {}).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>

        <div className="rounded-md border border-pink-200 bg-pink-50 p-4">
          {result ? (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-pink-700">Penetrant dwell</div>
                  <div className="text-3xl font-semibold text-pink-900">{result.penetrant} min</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-pink-700">Developer dwell</div>
                  <div className="text-3xl font-semibold text-pink-900">{result.developer} min</div>
                </div>
              </div>
              {result.warn && <div className="rounded bg-amber-100 p-2 text-sm text-amber-800">{result.warn}</div>}
            </div>
          ) : (
            <div className="text-sm text-slate-600">Choose a valid combination.</div>
          )}
        </div>

        <button type="button" onClick={() => setShowFormula((s) => !s)} className="inline-flex items-center gap-2 text-sm font-medium text-pink-700 hover:text-pink-900">
          {showFormula ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showFormula ? 'Hide formula' : 'Show formula'}
        </button>
        {showFormula && (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
            dwell = ASTM E165 Table 2 (form × defect) × temperature factor
            <br />developer = max(7 min, penetrant / 2) per ASME V T-672
          </div>
        )}
      </CardContent>
    </Card>
  );
}
