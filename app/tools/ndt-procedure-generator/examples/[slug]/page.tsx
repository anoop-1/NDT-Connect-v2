import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { procedureExamples, getExampleBySlug } from '@/data/procedure-examples';
import {
  BreadcrumbSchema,
  HowToSchema,
} from '@/components/seo/SchemaMarkup';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return procedureExamples.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const ex = getExampleBySlug(params.slug);
  if (!ex) return { title: 'Procedure not found — NDT Connect' };

  const url = `https://ndtconnect.com/tools/ndt-procedure-generator/examples/${ex.slug}`;
  return {
    title: `${ex.title} — NDT Connect`,
    description: ex.summary,
    alternates: { canonical: url },
    openGraph: {
      title: ex.title,
      description: ex.summary,
      url,
      type: 'article',
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Extract H2 / numbered-section headings from a Markdown body to feed HowTo
 * schema. Returns at least one step so schema validates even when body is a
 * stub.
 */
function extractSteps(body: string, fallbackName: string) {
  if (!body.trim()) {
    return [
      {
        name: 'Procedure body coming soon',
        text: `This ${fallbackName} reference is being authored by a certified Level III. Use the generator to draft a similar procedure now.`,
      },
    ];
  }
  const lines = body.split('\n');
  const steps: { name: string; text: string }[] = [];
  let current: { name: string; text: string } | null = null;
  for (const line of lines) {
    const heading = line.match(/^##\s+(.+)/);
    if (heading) {
      if (current) steps.push(current);
      current = { name: heading[1]!.trim(), text: '' };
    } else if (current) {
      current.text += (current.text ? '\n' : '') + line.trim();
    }
  }
  if (current) steps.push(current);
  return steps.length > 0
    ? steps.map((s) => ({ name: s.name, text: s.text || s.name }))
    : [{ name: fallbackName, text: body.slice(0, 400) }];
}

export default function ExampleDetailPage({ params }: PageProps) {
  const ex = getExampleBySlug(params.slug);
  if (!ex) return notFound();

  const steps = extractSteps(ex.body, ex.title);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://ndtconnect.com/' },
          { name: 'AI Procedure Generator', url: 'https://ndtconnect.com/tools/ndt-procedure-generator' },
          { name: 'Examples', url: 'https://ndtconnect.com/tools/ndt-procedure-generator/examples' },
          { name: ex.title, url: `https://ndtconnect.com/tools/ndt-procedure-generator/examples/${ex.slug}` },
        ]}
      />

      <HowToSchema
        name={ex.title}
        description={ex.summary}
        steps={steps}
        tool={[ex.method]}
      />

      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/tools/ndt-procedure-generator" className="hover:text-primary">
          AI Procedure Generator
        </Link>
        <span>/</span>
        <Link href="/tools/ndt-procedure-generator/examples" className="hover:text-primary">
          Examples
        </Link>
        <span>/</span>
        <span className="text-foreground">{ex.method}</span>
      </nav>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
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
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{ex.title}</h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{ex.summary}</p>
      </header>

      <article className="prose prose-slate max-w-none">
        {ex.body.trim() ? (
          // Render markdown body as plain pre for now (no markdown renderer wired here).
          // The data file expects ReactMarkdown-compatible content.
          <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 p-5 text-sm leading-relaxed text-slate-800">
            {ex.body}
          </pre>
        ) : (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 not-prose">
            <h2 className="text-base font-semibold text-amber-900">
              Full procedure body coming soon
            </h2>
            <p className="mt-2 text-sm text-amber-800">
              This reference is currently being authored and reviewed by a certified ASNT Level III
              inspector. Want a procedure for your scope right now?{' '}
              <Link
                href="/tools/ndt-procedure-generator"
                className="font-semibold underline"
              >
                Generate one in 60 seconds →
              </Link>
            </p>
          </div>
        )}
      </article>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Need a procedure tailored to your job?
        </h2>
        <p className="mt-1.5 text-sm text-slate-600">
          The free AI generator drafts a complete {ex.method} procedure for your specific scope and
          asset class.
        </p>
        <Link
          href={`/tools/ndt-procedure-generator?method=${encodeURIComponent(ex.method)}&standard=${encodeURIComponent(ex.standard)}`}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Try the generator →
        </Link>
      </div>
    </div>
  );
}
