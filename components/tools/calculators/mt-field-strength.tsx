'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Magnet, Eye, EyeOff } from 'lucide-react';

export default function MtFieldStrengthCalculator() {
  const [mode, setMode] = useState<'solenoid' | 'yoke'>('solenoid');
  const [turns, setTurns] = useState<number>(5);
  const [current, setCurrent] = useState<number>(600);
  const [length, setLength] = useState<number>(300);
  const [yokeType, setYokeType] = useState<'AC' | 'DC'>('AC');
  const [showFormula, setShowFormula] = useState(false);

  const result = useMemo(() => {
    if (mode === 'solenoid') {
      if ([turns, current, length].some((v) => !Number.isFinite(v) || v <= 0)) return null;
      const Lm = length / 1000;
      const AmpPerM = (turns * current) / Lm;
      const Oe = AmpPerM / 79.58;
      const ampTurns = turns * current;
      const inSpec = Oe >= 40 && Oe <= 120;
      return { AmpPerM, Oe, ampTurns, inSpec };
    }
    return null;
  }, [mode, turns, current, length]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Magnet className="h-5 w-5 text-purple-600" />
          MT Field Strength
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div>
          <Label>Magnetization mode</Label>
          <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={mode} onChange={(e) => setMode(e.target.value as 'solenoid' | 'yoke')}>
            <option value="solenoid">Solenoid coil</option>
            <option value="yoke">Yoke (lift test)</option>
          </select>
        </div>

        {mode === 'solenoid' ? (
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="N">Turns (N)</Label>
              <Input id="N" type="number" min={1} step={1} value={turns} onChange={(e) => setTurns(parseFloat(e.target.value))} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="I">Current (A)</Label>
              <Input id="I" type="number" min={0} step={10} value={current} onChange={(e) => setCurrent(parseFloat(e.target.value))} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="L">Length (mm)</Label>
              <Input id="L" type="number" min={0} step={10} value={length} onChange={(e) => setLength(parseFloat(e.target.value))} className="mt-1" />
            </div>
          </div>
        ) : (
          <div>
            <Label>Yoke type</Label>
            <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={yokeType} onChange={(e) => setYokeType(e.target.value as 'AC' | 'DC')}>
              <option value="AC">AC yoke — must lift 4.5 kg (10 lb)</option>
              <option value="DC">DC yoke — must lift 18 kg (40 lb)</option>
            </select>
          </div>
        )}

        <div className="rounded-md border border-purple-200 bg-purple-50 p-4">
          {mode === 'solenoid' && result ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-purple-700">Field strength</div>
                  <div className="text-3xl font-semibold text-purple-900">{result.Oe.toFixed(0)} Oe</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-purple-700">SI units</div>
                  <div className="text-3xl font-semibold text-purple-900">{result.AmpPerM.toFixed(0)} A/m</div>
                </div>
              </div>
              <div className="text-sm text-purple-800">Amp-turns: {result.ampTurns.toLocaleString()} AT</div>
              <div className={`rounded p-2 text-sm font-medium ${result.inSpec ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {result.inSpec ? 'Within ASME V Art. 7 spec (40–120 Oe)' : 'Outside ASME V Art. 7 spec (40–120 Oe). Adjust current.'}
              </div>
            </div>
          ) : mode === 'yoke' ? (
            <div className="text-sm text-purple-800">
              Verify lift capacity daily per ASTM E1444 §7.4.4. {yokeType === 'AC' ? 'AC yoke must lift 4.5 kg (10 lb).' : 'DC yoke must lift 18 kg (40 lb).'} No formula calculation — field strength is empirical.
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter positive values.</div>
          )}
        </div>

        <button type="button" onClick={() => setShowFormula((s) => !s)} className="inline-flex items-center gap-2 text-sm font-medium text-purple-700 hover:text-purple-900">
          {showFormula ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showFormula ? 'Hide formula' : 'Show formula'}
        </button>
        {showFormula && (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
            H = (N × I) / L  (A/m, solenoid)
            <br />1 Oe = 79.58 A/m
          </div>
        )}
      </CardContent>
    </Card>
  );
}
