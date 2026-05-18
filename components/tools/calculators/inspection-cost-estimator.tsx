'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DollarSign, Eye, EyeOff } from 'lucide-react';

const METHOD_RATES: Record<string, { dayRate: number; coverage_m2: number; perM2: number }> = {
  'UT (conventional)': { dayRate: 1200, coverage_m2: 40, perM2: 30 },
  'UT thickness gauging': { dayRate: 1000, coverage_m2: 80, perM2: 15 },
  PAUT: { dayRate: 2400, coverage_m2: 25, perM2: 75 },
  TOFD: { dayRate: 2200, coverage_m2: 30, perM2: 65 },
  RT: { dayRate: 1800, coverage_m2: 15, perM2: 110 },
  MT: { dayRate: 1100, coverage_m2: 60, perM2: 20 },
  PT: { dayRate: 1000, coverage_m2: 50, perM2: 22 },
  ECA: { dayRate: 1900, coverage_m2: 35, perM2: 55 },
};

const ACCESS_FACTOR: Record<string, number> = {
  'Ground level': 1.0,
  Scaffold: 1.5,
  'Confined space': 2.0,
  'Rope access': 2.5,
  Underwater: 4.0,
};

export default function InspectionCostEstimatorCalculator() {
  const [method, setMethod] = useState<string>('PAUT');
  const [area, setArea] = useState<number>(200);
  const [access, setAccess] = useState<string>('Scaffold');
  const [travel, setTravel] = useState<number>(50);
  const [showFormula, setShowFormula] = useState(false);

  const result = useMemo(() => {
    const m = METHOD_RATES[method];
    const accessF = ACCESS_FACTOR[access] ?? 1.0;
    if (!m || !Number.isFinite(area) || area <= 0 || !Number.isFinite(travel) || travel < 0) return null;
    const days = Math.max(1, Math.ceil(area / m.coverage_m2) + 1);
    const labour = m.dayRate * days;
    const perArea = m.perM2 * area;
    const subtotal = (labour + perArea) * accessF;
    const travelCost = travel < 300 ? travel * 1.5 + 200 : travel * 1.5 + 1800;
    const mid = subtotal + travelCost;
    return { low: Math.round(mid * 0.82), mid: Math.round(mid), high: Math.round(mid * 1.25), days };
  }, [method, area, access, travel]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <DollarSign className="h-5 w-5 text-green-600" />
          Inspection Cost Estimator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>NDT method</Label>
            <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={method} onChange={(e) => setMethod(e.target.value)}>
              {Object.keys(METHOD_RATES).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="area">Area (m²)</Label>
            <Input id="area" type="number" min={0} step={1} value={area} onChange={(e) => setArea(parseFloat(e.target.value))} className="mt-1" />
          </div>
          <div>
            <Label>Access</Label>
            <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={access} onChange={(e) => setAccess(e.target.value)}>
              {Object.keys(ACCESS_FACTOR).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="t">Travel (miles)</Label>
            <Input id="t" type="number" min={0} step={1} value={travel} onChange={(e) => setTravel(parseFloat(e.target.value))} className="mt-1" />
          </div>
        </div>

        <div className="rounded-md border border-green-200 bg-green-50 p-4">
          {result ? (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-xs uppercase tracking-wide text-green-700">Low</div>
                  <div className="text-2xl font-semibold text-green-900">${result.low.toLocaleString()}</div>
                </div>
                <div className="border-l border-r border-green-200">
                  <div className="text-xs uppercase tracking-wide text-green-700">Mid</div>
                  <div className="text-2xl font-semibold text-green-900">${result.mid.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-green-700">High</div>
                  <div className="text-2xl font-semibold text-green-900">${result.high.toLocaleString()}</div>
                </div>
              </div>
              <div className="text-sm text-green-800">Estimated duration: {result.days} days</div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter positive area and non-negative travel.</div>
          )}
        </div>

        <button type="button" onClick={() => setShowFormula((s) => !s)} className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900">
          {showFormula ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showFormula ? 'Hide formula' : 'Show formula'}
        </button>
        {showFormula && (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
            cost = (day_rate × days + per_m² × area) × access_factor + travel
          </div>
        )}
      </CardContent>
    </Card>
  );
}
