'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { SlidersHorizontal } from 'lucide-react';

export default function UtDecibelGainCalculator() {
  const [amp1, setAmp1] = useState<number>(80);
  const [amp2, setAmp2] = useState<number>(40);

  const result = useMemo(() => {
    if (!amp1 || !amp2 || amp1 <= 0 || amp2 <= 0) return null;
    const dbDiff = 20 * Math.log10(amp1 / amp2);
    const gainTo80 = 20 * Math.log10(80 / amp2);
    return { dbDiff, gainTo80 };
  }, [amp1, amp2]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <SlidersHorizontal className="h-5 w-5 text-teal-600" />
          UT Decibel (dB) Amplitude
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="amp1">Reference amplitude (% FSH)</Label>
            <input id="amp1" type="number" min={0} max={100} step={1} value={amp1}
              onChange={(e) => setAmp1(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <Label htmlFor="amp2">Measured amplitude (% FSH)</Label>
            <input id="amp2" type="number" min={0} max={100} step={1} value={amp2}
              onChange={(e) => setAmp2(parseFloat(e.target.value))}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="rounded-md border border-teal-200 bg-teal-50 p-4">
          {result ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-teal-700">Difference</div>
                <div className="text-3xl font-semibold text-teal-900">
                  {result.dbDiff > 0 ? '+' : ''}{result.dbDiff.toFixed(1)} dB
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  measured is {Math.abs(result.dbDiff).toFixed(1)} dB {result.dbDiff >= 0 ? 'below' : 'above'} reference
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-teal-700">Gain to 80% FSH</div>
                <div className="text-3xl font-semibold text-teal-900">
                  {result.gainTo80 > 0 ? '+' : ''}{result.gainTo80.toFixed(1)} dB
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter positive amplitudes (20–80% FSH for best linearity).</div>
          )}
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
          ΔdB = 20 · log₁₀(A₁ / A₂)
          <div className="mt-2 font-sans text-xs text-slate-600">Amplitude ratio uses 20·log (not 10·log). 2× = 6 dB, 10× = 20 dB.</div>
        </div>
      </CardContent>
    </Card>
  );
}
