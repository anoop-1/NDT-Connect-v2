'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Activity, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';

type Reflector = { depth: number; dB: number };

export default function DacTcgCalculator() {
  const [reflectors, setReflectors] = useState<Reflector[]>([
    { depth: 12, dB: 78 },
    { depth: 25, dB: 72 },
    { depth: 50, dB: 64 },
  ]);
  const [queryDepth, setQueryDepth] = useState<number>(35);
  const [showFormula, setShowFormula] = useState(false);

  const result = useMemo(() => {
    const valid = reflectors.filter((r) => Number.isFinite(r.depth) && Number.isFinite(r.dB) && r.depth >= 0).sort((a, b) => a.depth - b.depth);
    if (valid.length < 2) return null;
    const maxDB = Math.max(...valid.map((r) => r.dB));
    const tcg = valid.map((r) => ({ depth: r.depth, gain: maxDB - r.dB }));

    // Linear interp at queryDepth
    let dacAtQuery: number | null = null;
    for (let i = 0; i < valid.length - 1; i++) {
      const a = valid[i];
      const b = valid[i + 1];
      if (queryDepth >= a.depth && queryDepth <= b.depth) {
        const f = (queryDepth - a.depth) / (b.depth - a.depth);
        dacAtQuery = a.dB + f * (b.dB - a.dB);
        break;
      }
    }
    if (dacAtQuery == null) {
      if (queryDepth < valid[0].depth) dacAtQuery = valid[0].dB;
      else dacAtQuery = valid[valid.length - 1].dB;
    }
    return { dac: valid, tcg, dacAtQuery, tcgAtQuery: maxDB - dacAtQuery, maxDB };
  }, [reflectors, queryDepth]);

  const addReflector = () => setReflectors([...reflectors, { depth: 0, dB: 0 }]);
  const removeReflector = (i: number) => setReflectors(reflectors.filter((_, idx) => idx !== i));
  const updateReflector = (i: number, field: 'depth' | 'dB', v: number) => {
    const copy = [...reflectors];
    copy[i] = { ...copy[i], [field]: v };
    setReflectors(copy);
  };

  // SVG curve
  const svgWidth = 360;
  const svgHeight = 180;
  const padding = 30;
  const sorted = [...reflectors].sort((a, b) => a.depth - b.depth);
  const maxDepth = Math.max(...sorted.map((r) => r.depth), 1);
  const minDB = Math.min(...sorted.map((r) => r.dB), 0);
  const maxDB = Math.max(...sorted.map((r) => r.dB), 1);
  const dbRange = Math.max(maxDB - minDB, 1);
  const pts = sorted.map((r) => {
    const x = padding + ((r.depth / maxDepth) * (svgWidth - 2 * padding));
    const y = svgHeight - padding - ((r.dB - minDB) / dbRange) * (svgHeight - 2 * padding);
    return { x, y, depth: r.depth, dB: r.dB };
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <Activity className="h-5 w-5 text-blue-600" />
          DAC / TCG Curve Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div>
          <Label className="mb-2 block">Reference reflectors (≥ 3)</Label>
          <div className="space-y-2">
            {reflectors.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input type="number" step={0.1} placeholder="Depth (mm)" value={r.depth} onChange={(e) => updateReflector(i, 'depth', parseFloat(e.target.value))} />
                <Input type="number" step={0.1} placeholder="dB" value={r.dB} onChange={(e) => updateReflector(i, 'dB', parseFloat(e.target.value))} />
                <button type="button" onClick={() => removeReflector(i)} className="rounded-md border border-slate-200 p-2 hover:bg-slate-50" disabled={reflectors.length <= 2}>
                  <Trash2 className="h-4 w-4 text-slate-500" />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addReflector} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-900">
            <Plus className="h-4 w-4" /> Add reflector
          </button>
        </div>

        <div className="rounded-md border border-slate-200 p-4">
          <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">DAC curve</div>
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full">
            <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#cbd5e1" />
            <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="#cbd5e1" />
            <path d={path} fill="none" stroke="#2563eb" strokeWidth={2} />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={4} fill="#2563eb" />
            ))}
            <text x={svgWidth / 2} y={svgHeight - 6} textAnchor="middle" fontSize={10} fill="#64748b">Depth (mm)</text>
            <text x={10} y={svgHeight / 2} textAnchor="middle" fontSize={10} fill="#64748b" transform={`rotate(-90 10 ${svgHeight / 2})`}>dB</text>
          </svg>
        </div>

        <div>
          <Label htmlFor="qd">Query depth (mm)</Label>
          <Input id="qd" type="number" min={0} step={0.5} value={queryDepth} onChange={(e) => setQueryDepth(parseFloat(e.target.value))} className="mt-1" />
        </div>

        <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
          {result ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-blue-700">DAC at {queryDepth} mm</div>
                <div className="text-3xl font-semibold text-blue-900">{result.dacAtQuery.toFixed(1)} dB</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-blue-700">TCG gain</div>
                <div className="text-3xl font-semibold text-blue-900">+{result.tcgAtQuery.toFixed(1)} dB</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter at least two valid reflectors.</div>
          )}
        </div>

        <button type="button" onClick={() => setShowFormula((s) => !s)} className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900">
          {showFormula ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showFormula ? 'Hide formula' : 'Show formula'}
        </button>
        {showFormula && (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
            DAC(z) = interpolated peak amplitude vs depth
            <br />TCG(z) = max(DAC) − DAC(z)
          </div>
        )}
      </CardContent>
    </Card>
  );
}
