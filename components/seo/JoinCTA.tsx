/**
 * JoinCTA — signup conversion block for high-traffic informational pages
 * (free tools, careers, cost guides).
 *
 * Diagnosis 2026-06-05: organic traffic is ramping fast (clicks 8→23→96→235/mo)
 * but real signups were ~0 — auth was broken (Atlas outage, fixed 2026-06-05)
 * AND the top entry pages (tools, careers) had no path into the product. Top
 * audiences are NDT techs/job-seekers (→ become Providers/Inspectors) and
 * cost researchers (→ become Clients). This block gives both a clear next step.
 */
import Link from 'next/link';
import { ArrowRight, Building2, HardHat, ClipboardList } from 'lucide-react';

interface JoinCTAProps {
  /** Optional context line tailored to the host page. */
  context?: string;
}

export function JoinCTA({ context }: JoinCTAProps) {
  return (
    <section
      className="mt-10 mb-8 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-accent/5 p-6 sm:p-8"
      aria-labelledby="join-cta-heading"
    >
      <div className="text-center mb-6">
        <h2 id="join-cta-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          Join NDT Connect — free
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          {context ??
            'The free marketplace for the NDT industry — connect inspectors and the companies that need them.'}
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Link
          href="/register?role=provider"
          className="group flex flex-col items-center text-center gap-2 rounded-lg border-2 border-primary bg-primary/5 p-5 hover:bg-primary/10 hover:shadow-md transition"
        >
          <Building2 className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold text-primary">
            NDT service provider
          </span>
          <span className="text-xs text-slate-700 leading-snug">
            List your company free, showcase certifications, and win inspection jobs from clients in your area.
          </span>
          <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Link>

        <Link
          href="/register?role=inspector"
          className="group flex flex-col items-center text-center gap-2 rounded-lg border-2 border-primary bg-primary/5 p-5 hover:bg-primary/10 hover:shadow-md transition"
        >
          <HardHat className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold text-primary">
            Freelance inspector
          </span>
          <span className="text-xs text-slate-700 leading-snug">
            Any level (I, II, III). Build a free profile and get hired directly by companies and clients.
          </span>
          <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Link>

        <Link
          href="/register?role=client"
          className="group flex flex-col items-center text-center gap-2 rounded-lg border border-slate-200 bg-white p-5 hover:border-primary hover:shadow-md transition"
        >
          <ClipboardList className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold text-slate-900 group-hover:text-primary">
            I need an inspection
          </span>
          <span className="text-xs text-slate-600 leading-snug">
            Post your job free and get quotes from vetted NDT providers — most respond within 24 hours.
          </span>
          <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Link>
      </div>

      <p className="mt-5 text-xs text-center text-slate-500">
        Free to join · No credit card · Provider profiles verified against ASNT &amp; API rosters ·{' '}
        <Link href="/find-providers" className="underline hover:text-primary">Browse providers</Link>
      </p>
    </section>
  );
}

export default JoinCTA;
