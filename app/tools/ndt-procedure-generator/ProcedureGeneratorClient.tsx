'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, AlertCircle, CheckCircle2, FileDown, Sparkles } from 'lucide-react';

const METHODS = [
  { value: 'Ultrasonic Testing (UT)', label: 'Ultrasonic Testing (UT)' },
  { value: 'Radiographic Testing (RT)', label: 'Radiographic Testing (RT)' },
  { value: 'Magnetic Particle Testing (MT)', label: 'Magnetic Particle (MT)' },
  { value: 'Liquid Penetrant Testing (PT)', label: 'Liquid Penetrant (PT)' },
  { value: 'Visual Testing (VT)', label: 'Visual Testing (VT)' },
  { value: 'Phased Array UT (PAUT)', label: 'Phased Array UT (PAUT)' },
  { value: 'Time-of-Flight Diffraction (TOFD)', label: 'TOFD' },
  { value: 'Eddy Current Testing (ECT)', label: 'Eddy Current (ECT)' },
];

const STANDARDS = [
  'ASME Section V',
  'ASME B31.3',
  'ASME B31.1',
  'API 510',
  'API 570',
  'API 653',
  'API 1104',
  'AWS D1.1',
  'AWS D1.5',
  'ASTM E165 (PT)',
  'ASTM E709 (MT)',
  'ISO 9712',
  'ISO 17640',
  'EN 4179',
  'Other / Multiple',
];

interface GenerateResponse {
  success?: boolean;
  draftId?: string;
  procedure?: string;
  source?: string;
  remaining?: { daily: number; monthly?: number; resetAt: string };
  message?: string;
  error?: string;
  resetAt?: string;
}

export default function ProcedureGeneratorClient() {
  const [testMethod, setTestMethod] = useState(METHODS[0]!.value);
  const [scopeOfWork, setScopeOfWork] = useState('');
  const [applicableStandard, setApplicableStandard] = useState(STANDARDS[0]!);
  const [acceptanceCriteria, setAcceptanceCriteria] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [rateLimited, setRateLimited] = useState<{ message: string; resetAt?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setRateLimited(null);
    setError(null);

    try {
      const res = await fetch('/api/ai/generate-procedure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testMethod,
          scopeOfWork,
          applicableStandard,
          acceptanceCriteria,
          materialType,
          additionalNotes,
        }),
      });

      const data: GenerateResponse = await res.json();

      if (res.status === 429) {
        setRateLimited({
          message: data.message || 'Daily limit reached.',
          resetAt: data.resetAt,
        });
        return;
      }
      if (!res.ok) {
        setError(data.message || data.error || `Request failed (HTTP ${res.status})`);
        return;
      }

      setResult(data);
    } catch (err: any) {
      setError(err?.message || 'Network error — please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-1">
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              NDT Method <span className="text-red-500">*</span>
            </label>
            <select
              value={testMethod}
              onChange={(e) => setTestMethod(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {METHODS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Applicable Standard <span className="text-red-500">*</span>
            </label>
            <select
              value={applicableStandard}
              onChange={(e) => setApplicableStandard(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {STANDARDS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Scope of Work <span className="text-red-500">*</span>
            </label>
            <textarea
              value={scopeOfWork}
              onChange={(e) => setScopeOfWork(e.target.value)}
              required
              rows={3}
              placeholder='e.g. "Full-penetration girth welds on 6" Sch 80 carbon-steel ASME B31.3 process piping, RT inaccessible due to internal coating."'
              className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="md:col-span-1">
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Material Type
            </label>
            <input
              type="text"
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
              placeholder="e.g. SA-106 Gr B carbon steel"
              className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="md:col-span-1">
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Acceptance Criteria
            </label>
            <input
              type="text"
              value={acceptanceCriteria}
              onChange={(e) => setAcceptanceCriteria(e.target.value)}
              placeholder='e.g. "Per ASME B31.3 Table 341.3.2 Normal Fluid Service"'
              className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Asset / Additional Notes (optional)
            </label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              rows={2}
              placeholder="Geometry, access constraints, in-service vs. new construction, site conditions, etc."
              className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            By generating, you acknowledge outputs are drafts requiring Level III review.
          </p>
          <button
            type="submit"
            disabled={loading || !scopeOfWork.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Procedure
              </>
            )}
          </button>
        </div>
      </form>

      {/* ── 429 — rate limited ─────────────────────────────────────────── */}
      {rateLimited && (
        <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900">{rateLimited.message}</h3>
              {rateLimited.resetAt && (
                <p className="mt-1 text-sm text-amber-800">
                  Resets at{' '}
                  <time dateTime={rateLimited.resetAt}>
                    {new Date(rateLimited.resetAt).toLocaleString()}
                  </time>
                  .
                </p>
              )}
              <Link
                href="/register?redirect=/tools/ndt-procedure-generator"
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
              >
                Sign up free for 5 generations / day →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── generic error ──────────────────────────────────────────────── */}
      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* ── success — render output ────────────────────────────────────── */}
      {result?.success && result.procedure && (
        <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-slate-900">Procedure draft generated</h3>
            </div>
            {result.remaining && (
              <span className="text-xs text-slate-500">
                {result.remaining.daily} generations remaining today
              </span>
            )}
          </div>

          <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-800">
            {result.procedure}
          </pre>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={`/register?redirect=/tools/ndt-procedure-generator&pendingProcedure=${encodeURIComponent(result.draftId || '')}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <FileDown className="h-4 w-4" />
              Save / download / customize — Sign up free →
            </Link>
            <button
              type="button"
              onClick={() => {
                if (result.procedure) {
                  navigator.clipboard.writeText(result.procedure).catch(() => undefined);
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Copy to clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
