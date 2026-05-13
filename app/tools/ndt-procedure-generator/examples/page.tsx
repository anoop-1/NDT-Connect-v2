import type { Metadata } from 'next';
import Link from 'next/link';
import { procedureExamples } from '@/data/procedure-examples';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'NDT Procedure Examples — ASME, API, AWS, ASTM, ISO',
  description:
    'Browse example NDT written procedures: UT, RT, MT, PT, PAUT, TOFD, and VT across pressure vessels, pipelines, storage tanks, structural steel, aerospace, and castings.',
  alternates: { canonical: 'https://ndtconnect.com/tools/ndt-procedure-generator/examples' },
  openGraph: {
    title: 'NDT Procedure Examples — ASME, API, AWS, ASTM, ISO',
    description:
      'Reference NDT procedures covering UT, RT, MT, PT, PAUT, TOFD, and VT methods.',
    url: 'https://ndtconnect.com/tools/ndt-procedure-generator/examples',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function ExamplesIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://ndtconnect.com/' },
          { name: 'AI Procedure Generator', url: 'https://ndtconnect.com/tools/ndt-procedure-generator' },
          { name: 'Examples', url: 'https://ndtconnect.com/tools/ndt-procedure-generator/examples' },
        ]}
      />

      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/tools/ndt-procedure-generator" className="hover:text-primary">
          AI Procedure Generator
        </Link>
        <span>/</span>
        <span className="text-foreground">Examples</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          NDT Procedure Examples
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          Reference NDT written procedures spanning eight methods and the major construction
          codes. Each example illustrates the section structure, calibration approach, and
          acceptance criteria expected by an ASNT Level III reviewer.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {procedureExamples.map((ex) => (
          <li key={ex.slug}>
            <Link
              href={`/tools/ndt-procedure-generator/examples/${ex.slug}`}
              className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-semibold text-blue-700">
                  {ex.method}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-700">
                  {ex.industry}
                </span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-emerald-700">
                  {ex.standard}
                </span>
              </div>
              <h2 className="text-base font-semibold text-slate-900">{ex.title}</h2>
              <p className="mt-1.5 text-sm leading-snug text-slate-600">{ex.summary}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50/50 p-6">
        <h2 className="text-xl font-semibold text-slate-900">Need a procedure right now?</h2>
        <p className="mt-2 text-sm text-slate-700">
          Generate a procedure tailored to your scope in under 60 seconds with the free AI
          procedure writer.
        </p>
        <Link
          href="/tools/ndt-procedure-generator"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Try the generator →
        </Link>
      </div>
    </div>
  );
}
