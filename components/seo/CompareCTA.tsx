/**
 * CompareCTA — terminal CTA block for /compare/[a-vs-b] pages.
 *
 * Diagnosis 2026-05-30: the /compare family ranks pos 12 with 0% CTR
 * even after the title rewrite in c9a1319. Live-page audit found zero
 * mentions of "quote" or "request" in body — users reach the end of
 * the comparison and have nothing actionable to do. This block closes
 * that gap with two parallel CTAs (one per method) plus a "both" option.
 */
import Link from 'next/link';
import { ArrowRight, MessageSquare, Layers } from 'lucide-react';

interface CompareCTAProps {
  method1Name: string;     // e.g. "Radiographic Testing"
  method1Abbr: string;     // e.g. "RT"
  method1Slug: string;     // e.g. "radiographic-testing"
  method2Name: string;
  method2Abbr: string;
  method2Slug: string;
}

export function CompareCTA({
  method1Name, method1Abbr, method1Slug,
  method2Name, method2Abbr, method2Slug,
}: CompareCTAProps) {
  return (
    <section
      className="mt-12 mb-10 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-accent/5 p-6 sm:p-8"
      aria-labelledby="compare-cta-heading"
    >
      <div className="text-center mb-6">
        <h2 id="compare-cta-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          Ready to scope {method1Abbr} or {method2Abbr} inspection?
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          Browse certified providers in your area, compare hourly rates, and request quotes — no signup required. Most providers respond within 24 hours.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Link
          href={`/services/${method1Slug}`}
          className="group flex flex-col items-center text-center gap-2 rounded-lg border border-slate-200 bg-white p-4 hover:border-primary hover:shadow-md transition"
        >
          <MessageSquare className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold text-slate-900 group-hover:text-primary">
            Get {method1Abbr} quotes
          </span>
          <span className="text-xs text-slate-600 leading-snug">
            Certified {method1Name} inspectors in your area
          </span>
          <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Link>

        <Link
          href={`/services/${method2Slug}`}
          className="group flex flex-col items-center text-center gap-2 rounded-lg border border-slate-200 bg-white p-4 hover:border-primary hover:shadow-md transition"
        >
          <MessageSquare className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold text-slate-900 group-hover:text-primary">
            Get {method2Abbr} quotes
          </span>
          <span className="text-xs text-slate-600 leading-snug">
            Certified {method2Name} inspectors in your area
          </span>
          <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Link>

        <Link
          href="/find-providers"
          className="group flex flex-col items-center text-center gap-2 rounded-lg border-2 border-primary bg-primary/5 p-4 hover:bg-primary/10 hover:shadow-md transition"
        >
          <Layers className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold text-primary">
            Need both methods?
          </span>
          <span className="text-xs text-slate-700 leading-snug">
            Find providers certified in {method1Abbr} <strong>and</strong> {method2Abbr} on the same scope
          </span>
          <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Link>
      </div>

      <p className="mt-5 text-xs text-center text-slate-500">
        Free to browse · No signup to view rates · Provider profiles verified against ASNT &amp; API rosters.
      </p>
    </section>
  );
}

export default CompareCTA;
