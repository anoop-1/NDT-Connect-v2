'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { GitBranch, Eye, EyeOff } from 'lucide-react';

const MATERIALS = ['Carbon steel', 'Low-alloy steel', 'Austenitic stainless', 'Aluminum', 'Copper / brass', 'Titanium', 'Composite (CFRP/GFRP)'];
const DEFECTS = ['Surface crack', 'Sub-surface crack', 'Porosity / volumetric', 'Lack of fusion', 'Wall thinning / corrosion', 'Lamination', 'Pitting'];
const ACCESS = ['Two-sided', 'One-sided', 'Internal only', 'Immersion possible'];

function recommend(material: string, defect: string, access: string, thickness: number): { primary: string; secondary: string; rationale: string } {
  const ferro = ['Carbon steel', 'Low-alloy steel'].includes(material);

  // Surface defects
  if (defect === 'Surface crack') {
    if (ferro) return { primary: 'MT (wet fluorescent)', secondary: 'PT or ECA', rationale: 'Ferromagnetic substrate — MT is the highest-sensitivity surface method.' };
    if (material === 'Composite (CFRP/GFRP)') return { primary: 'VT + tap test', secondary: 'UT (PE / TOFD)', rationale: 'Composites are non-conductive and non-magnetic.' };
    return { primary: 'PT (Type II — fluorescent)', secondary: 'ECA', rationale: 'Non-ferromagnetic surface — PT is the standard, ECA for through-coat scans.' };
  }

  // Sub-surface / volumetric
  if (defect === 'Sub-surface crack' || defect === 'Lack of fusion') {
    if (thickness >= 6 && thickness <= 75) return { primary: 'PAUT (Phased Array UT)', secondary: 'RT or TOFD', rationale: 'Planar defect, wall in PAUT sweet spot. PAUT preferred over RT — no radiation boundary.' };
    if (thickness > 75) return { primary: 'TOFD + PAUT combo', secondary: 'RT (Co-60 / X-ray crawler)', rationale: 'Thick section — TOFD covers mid-wall, PAUT covers root and cap.' };
    return { primary: 'UT (angle beam, 45/60/70°)', secondary: 'RT (Ir-192)', rationale: 'Thin section — conventional UT or RT both work.' };
  }

  if (defect === 'Porosity / volumetric') {
    return { primary: 'RT (Ir-192 or X-ray)', secondary: 'PAUT', rationale: 'Volumetric defect — RT remains the gold standard for porosity and slag.' };
  }

  if (defect === 'Wall thinning / corrosion') {
    if (access === 'Internal only') return { primary: 'IRIS or RFT (in-tube)', secondary: 'Guided wave UT', rationale: 'Internal access only — tube-internal methods.' };
    return { primary: 'UT thickness gauging', secondary: 'PAUT corrosion mapping', rationale: 'External UT for general thinning, PAUT for pit mapping.' };
  }

  if (defect === 'Lamination') {
    return { primary: 'UT (straight beam)', secondary: 'PAUT', rationale: 'Lamination is parallel to surface — straight-beam UT detects easily.' };
  }

  if (defect === 'Pitting') {
    if (ferro) return { primary: 'PAUT corrosion mapping', secondary: 'MT (residual)', rationale: 'Corrosion pitting in steel — PAUT C-scan captures depth and distribution.' };
    return { primary: 'ECA (eddy current array)', secondary: 'PAUT', rationale: 'Non-ferro pitting — ECA scans large areas at sensor speed.' };
  }

  return { primary: 'Consult Level III', secondary: '—', rationale: 'No standard match — needs custom procedure.' };
}

export default function NdtMethodSelectorCalculator() {
  const [material, setMaterial] = useState<string>('Carbon steel');
  const [defect, setDefect] = useState<string>('Surface crack');
  const [access, setAccess] = useState<string>('One-sided');
  const [thickness, setThickness] = useState<number>(25);
  const [showFormula, setShowFormula] = useState(false);

  const result = useMemo(() => {
    if (!Number.isFinite(thickness) || thickness <= 0) return null;
    return recommend(material, defect, access, thickness);
  }, [material, defect, access, thickness]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
          <GitBranch className="h-5 w-5 text-emerald-600" />
          NDT Method Selector
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Material</Label>
            <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={material} onChange={(e) => setMaterial(e.target.value)}>
              {MATERIALS.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <Label>Defect type</Label>
            <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={defect} onChange={(e) => setDefect(e.target.value)}>
              {DEFECTS.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <Label>Access</Label>
            <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={access} onChange={(e) => setAccess(e.target.value)}>
              {ACCESS.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="th">Wall thickness (mm)</Label>
            <Input id="th" type="number" min={0} step={0.5} value={thickness} onChange={(e) => setThickness(parseFloat(e.target.value))} className="mt-1" />
          </div>
        </div>

        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4">
          {result ? (
            <div className="space-y-2">
              <div>
                <div className="text-xs uppercase tracking-wide text-emerald-700">Primary method</div>
                <div className="text-2xl font-semibold text-emerald-900">{result.primary}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-emerald-700">Secondary / confirmatory</div>
                <div className="text-lg text-emerald-900">{result.secondary}</div>
              </div>
              <div className="border-t border-emerald-200 pt-2 text-sm text-emerald-800">{result.rationale}</div>
            </div>
          ) : (
            <div className="text-sm text-slate-600">Enter a wall thickness &gt; 0.</div>
          )}
        </div>

        <button type="button" onClick={() => setShowFormula((s) => !s)} className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900">
          {showFormula ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showFormula ? 'Hide logic' : 'Show logic'}
        </button>
        {showFormula && (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
            Decision tree: material → ferromagnetic test → defect category (surface / sub-surface / volumetric) → access → thickness threshold. Returns ASNT-recommended primary + secondary method per Handbook Vols. 3–6.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
