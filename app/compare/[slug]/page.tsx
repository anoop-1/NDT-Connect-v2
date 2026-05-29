import { Metadata } from 'next';
import Link from 'next/link';
import { methods, getMethodBySlug } from '@/lib/seo-data';
import { ChevronRight, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

function generateComparisonPairs() {
  const pairs: Array<{ slug: string; method1: string; method2: string; name: string }> = [];

  for (let i = 0; i < methods.length; i++) {
    for (let j = i + 1; j < methods.length; j++) {
      const slug = `${methods[i].slug}-vs-${methods[j].slug}`;
      const name = `${methods[i].name} vs ${methods[j].name}`;
      pairs.push({
        slug,
        method1: methods[i].slug,
        method2: methods[j].slug,
        name,
      });
    }
  }

  return pairs;
}

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

export async function generateStaticParams() {
  const pairs = generateComparisonPairs();
  return pairs.map((pair) => ({
    slug: pair.slug,
  }));
}

function parseComparisonSlug(slug: string) {
  const parts = slug.split('-vs-');
  if (parts.length !== 2) return null;

  const method1Slug = parts[0];
  const method2Slug = parts[1];

  const method1 = getMethodBySlug(method1Slug);
  const method2 = getMethodBySlug(method2Slug);

  return { method1, method2, method1Slug, method2Slug };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = parseComparisonSlug(slug);

  if (!comparison || !comparison.method1 || !comparison.method2) {
    return {
      title: 'Comparison Not Found',
    };
  }

  const { method1, method2 } = comparison;
  // Title rewrite (SEO sprint 2026-05-15): switched from descriptive label
  // ("X vs Y - NDT Method Comparison") to a click-worthy question that names
  // decision criteria (cost, speed, detection). Compare pages have ~300 impr
  // at 0% CTR despite pos 10 — title gave readers no reason to click.
  // Title rewrite (2026-05-29): drop 'Which to choose?' filler that was being
  // truncated by Google; year bracket + 'Decision Matrix' promise a tangible artifact.
  const title = `${method1.abbreviation} vs ${method2.abbreviation} [${new Date().getFullYear()}]: Cost, Speed, Detection — Decision Matrix`;
  const description = `${method1.name} (${method1.abbreviation}) vs ${method2.name} (${method2.abbreviation}) side-by-side: cost $/hour, scan speed, defect classes detected, ASME/API code coverage. Decision matrix tells you which fits your scope. Updated ${new Date().getFullYear()}.`;

  return {
    title,
    description,
    keywords: [
      `${method1.name} vs ${method2.name}`,
      `${method1.abbreviation} vs ${method2.abbreviation}`,
      'NDT comparison',
      `compare NDT methods`,
      `${method1.abbreviation} vs ${method2.abbreviation} differences`,
    ],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/compare/${slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://ndt-connect.com/compare/${slug}`,
    },
  };
}

function ComparisonSchema({ method1, method2 }: { method1: any; method2: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the difference between ${method1.name} and ${method2.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${method1.name} (${method1.abbreviation}) and ${method2.name} (${method2.abbreviation}) are different NDT methods with distinct capabilities. ${method1.abbreviation} is used for ${method1.applications[0]}, while ${method2.abbreviation} excels at ${method2.applications[0]}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Which is better: ${method1.abbreviation} or ${method2.abbreviation}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Neither method is universally better - it depends on your specific application. ${method1.abbreviation} offers advantages like ${method1.advantages[0]}, while ${method2.abbreviation} provides ${method2.advantages[0]}.`,
        },
      },
      {
        '@type': 'Question',
        name: `When should I use ${method1.abbreviation} instead of ${method2.abbreviation}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Use ${method1.abbreviation} when you need to ${method1.applications[0]}. Choose ${method2.abbreviation} when your priority is ${method2.applications[0]}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Can ${method1.abbreviation} and ${method2.abbreviation} be used together?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, ${method1.abbreviation} and ${method2.abbreviation} are often combined in comprehensive inspection programs to leverage the strengths of both methods.`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const ComparisonTable = ({ method1, method2 }: { method1: any; method2: any }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-muted/50">
          <th className="border p-4 text-left font-semibold">Aspect</th>
          <th className="border p-4 text-left font-semibold">{method1.name}</th>
          <th className="border p-4 text-left font-semibold">{method2.name}</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-muted/30">
          <td className="border p-4 font-medium">Abbreviation</td>
          <td className="border p-4">{method1.abbreviation}</td>
          <td className="border p-4">{method2.abbreviation}</td>
        </tr>
        <tr className="hover:bg-muted/30">
          <td className="border p-4 font-medium">Primary Principle</td>
          <td className="border p-4 text-sm">{method1.principles[0]}</td>
          <td className="border p-4 text-sm">{method2.principles[0]}</td>
        </tr>
        <tr className="hover:bg-muted/30">
          <td className="border p-4 font-medium">Detection Type</td>
          <td className="border p-4 text-sm">
            {method1.applications[0].includes('surface') || method1.applications[0].includes('crack') ? 'Surface & Near-Surface' : 'Subsurface & Internal'}
          </td>
          <td className="border p-4 text-sm">
            {method2.applications[0].includes('surface') || method2.applications[0].includes('crack') ? 'Surface & Near-Surface' : 'Subsurface & Internal'}
          </td>
        </tr>
        <tr className="hover:bg-muted/30">
          <td className="border p-4 font-medium">Equipment Cost</td>
          <td className="border p-4">
            {method1.abbreviation === 'VT' ? '$$' : method1.abbreviation === 'PT' ? '$$' : method1.abbreviation === 'MT' ? '$$$' : '$$$'}
          </td>
          <td className="border p-4">
            {method2.abbreviation === 'VT' ? '$$' : method2.abbreviation === 'PT' ? '$$' : method2.abbreviation === 'MT' ? '$$$' : '$$$'}
          </td>
        </tr>
        <tr className="hover:bg-muted/30">
          <td className="border p-4 font-medium">Material Compatibility</td>
          <td className="border p-4 text-sm">
            {method1.abbreviation === 'MT' ? 'Ferromagnetic only' : 'All Materials'}
          </td>
          <td className="border p-4 text-sm">
            {method2.abbreviation === 'MT' ? 'Ferromagnetic only' : 'All Materials'}
          </td>
        </tr>
        <tr className="hover:bg-muted/30">
          <td className="border p-4 font-medium">Preparation Required</td>
          <td className="border p-4">
            {method1.abbreviation === 'VT' ? 'Minimal' : method1.abbreviation === 'PT' ? 'Moderate' : 'Moderate to High'}
          </td>
          <td className="border p-4">
            {method2.abbreviation === 'VT' ? 'Minimal' : method2.abbreviation === 'PT' ? 'Moderate' : 'Moderate to High'}
          </td>
        </tr>
        <tr className="hover:bg-muted/30">
          <td className="border p-4 font-medium">Inspection Speed</td>
          <td className="border p-4">
            {method1.abbreviation === 'VT' ? 'Very Fast' : method1.abbreviation === 'MFL' ? 'Fast' : 'Moderate'}
          </td>
          <td className="border p-4">
            {method2.abbreviation === 'VT' ? 'Very Fast' : method2.abbreviation === 'MFL' ? 'Fast' : 'Moderate'}
          </td>
        </tr>
        <tr className="hover:bg-muted/30">
          <td className="border p-4 font-medium">Permanent Record</td>
          <td className="border p-4">{['RT', 'PAUT', 'TOFD', 'GWT'].includes(method1.abbreviation) ? 'Yes' : 'Limited'}</td>
          <td className="border p-4">{['RT', 'PAUT', 'TOFD', 'GWT'].includes(method2.abbreviation) ? 'Yes' : 'Limited'}</td>
        </tr>
        <tr className="hover:bg-muted/30">
          <td className="border p-4 font-medium">Safety Considerations</td>
          <td className="border p-4 text-sm">
            {method1.abbreviation === 'RT' ? 'Radiation Safety Required' : 'Standard Safety'}
          </td>
          <td className="border p-4 text-sm">
            {method2.abbreviation === 'RT' ? 'Radiation Safety Required' : 'Standard Safety'}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const ComparisonCategory = ({
  title,
  method1,
  method2,
  method1Items,
  method2Items,
}: {
  title: string;
  method1: any;
  method2: any;
  method1Items: string[];
  method2Items: string[];
}) => (
  <div className="border rounded-lg overflow-hidden">
    <div className="bg-muted/50 p-4 font-semibold">{title}</div>
    <div className="grid md:grid-cols-2 divide-x">
      <div className="p-6">
        <h3 className="font-semibold mb-4 text-primary">{method1.name}</h3>
        <ul className="space-y-2">
          {method1Items.map((item, idx) => (
            <li key={idx} className="flex items-start text-sm">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6">
        <h3 className="font-semibold mb-4 text-primary">{method2.name}</h3>
        <ul className="space-y-2">
          {method2Items.map((item, idx) => (
            <li key={idx} className="flex items-start text-sm">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = parseComparisonSlug(slug);

  if (!comparison || !comparison.method1 || !comparison.method2) {
    return (
      <div className="container py-12">
        <h1 className="text-2xl font-bold text-red-600">Comparison Not Found</h1>
        <p className="text-muted-foreground mt-2">The method comparison you requested does not exist.</p>
        <Link href="/" className="text-primary hover:underline mt-4 block">
          Return to Home
        </Link>
      </div>
    );
  }

  const { method1, method2 } = comparison;

  return (
    <>
      <ComparisonSchema method1={method1} method2={method2} />

      <div className="space-y-12">
        {/* Breadcrumbs */}
        <div className="bg-muted/50 py-4 px-0">
          <div className="container">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Comparison</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {method1.name} vs {method2.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
          <div className="container">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {method1.name} vs {method2.name} — Choosing Between {method1.abbreviation} and {method2.abbreviation}
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                A side-by-side look at {method1.abbreviation} ({method1.applications[0]?.toLowerCase() || 'flaw detection'}) and {method2.abbreviation} ({method2.applications[0]?.toLowerCase() || 'flaw detection'}): operating principles, code coverage ({method1.standards.slice(0, 2).join(', ')} vs {method2.standards.slice(0, 2).join(', ')}), cost, speed, and the situations where pairing both methods makes more sense than picking one.
              </p>
              <div className="flex gap-4">
                <Link
                  href={`/services/${comparison.method1Slug}`}
                  className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition"
                >
                  {method1.name} Details
                </Link>
                <Link
                  href={`/services/${comparison.method2Slug}`}
                  className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition"
                >
                  {method2.name} Details
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Quick Overview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-transparent">
              <h3 className="text-2xl font-bold mb-2">{method1.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">({method1.abbreviation})</p>
              <p className="text-muted-foreground leading-relaxed mb-6">{method1.description}</p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Primary Use:</span> {method1.applications[0]}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Key Advantage:</span> {method1.advantages[0]}
                </p>
              </div>
            </div>
            <div className="border rounded-lg p-6 bg-gradient-to-br from-green-50 to-transparent">
              <h3 className="text-2xl font-bold mb-2">{method2.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">({method2.abbreviation})</p>
              <p className="text-muted-foreground leading-relaxed mb-6">{method2.description}</p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Primary Use:</span> {method2.applications[0]}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Key Advantage:</span> {method2.advantages[0]}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Detailed Comparison</h2>
          <ComparisonTable method1={method1} method2={method2} />
        </section>

        {/* Principles Comparison */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Operating Principles</h2>
          <ComparisonCategory
            title="How Each Method Works"
            method1={method1}
            method2={method2}
            method1Items={method1.principles}
            method2Items={method2.principles}
          />
        </section>

        {/* Applications Comparison */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Applications</h2>
          <ComparisonCategory
            title="What Each Method is Used For"
            method1={method1}
            method2={method2}
            method1Items={method1.applications}
            method2Items={method2.applications}
          />
        </section>

        {/* Advantages Comparison */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Advantages</h2>
          <ComparisonCategory
            title="Benefits of Each Method"
            method1={method1}
            method2={method2}
            method1Items={method1.advantages}
            method2Items={method2.advantages}
          />
        </section>

        {/* Limitations Comparison */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Limitations</h2>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 p-4 font-semibold">Constraints & Limitations</div>
            <div className="grid md:grid-cols-2 divide-x">
              <div className="p-6">
                <h3 className="font-semibold mb-4 text-primary">{method1.name}</h3>
                <ul className="space-y-2">
                  {method1.limitations.map((limitation, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <AlertCircle className="w-4 h-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-4 text-primary">{method2.name}</h3>
                <ul className="space-y-2">
                  {method2.limitations.map((limitation, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <AlertCircle className="w-4 h-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Standards Comparison */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Applicable Standards</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">{method1.name} Standards</h3>
              <div className="space-y-2">
                {method1.standards.map((standard, idx) => (
                  <div key={idx} className="flex items-center p-2 bg-muted/50 rounded">
                    <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">{standard}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{method2.name} Standards</h3>
              <div className="space-y-2">
                {method2.standards.map((standard, idx) => (
                  <div key={idx} className="flex items-center p-2 bg-muted/50 rounded">
                    <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">{standard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industries Comparison */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Industries Using These Methods</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">{method1.name}</h3>
              <div className="flex flex-wrap gap-2">
                {method1.industries.map((industry, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{method2.name}</h3>
              <div className="flex flex-wrap gap-2">
                {method2.industries.map((industry, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* When to Use */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">When to Choose Each Method</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">Choose {method1.name}</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-blue-900">When you need {method1.applications[0]}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-blue-900">Working with {method1.industries[0]} or {method1.industries[1]}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-blue-900">Your priority is {method1.advantages[0]}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-blue-900">Complying with {method1.standards[0]}</span>
                </li>
              </ul>
            </div>
            <div className="border border-green-200 bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-900">Choose {method2.name}</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-green-900">When you need {method2.applications[0]}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-green-900">Working with {method2.industries[0]} or {method2.industries[1]}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-green-900">Your priority is {method2.advantages[0]}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-green-900">Complying with {method2.standards[0]}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Combined Use — derived per pair from each method's first principle/application/limitation */}
        <section className="container bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Pairing {method1.abbreviation} with {method2.abbreviation} on the Same Job</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            On scopes where {method1.name} ({method1.abbreviation.toLowerCase()}) is required for {method1.applications[0].toLowerCase()} but the procedure also calls for {method2.applications[0].toLowerCase()}, inspection contractors mobilise both methods together — {method1.abbreviation} compensates for {method2.limitations[0]?.toLowerCase() || `the limits of ${method2.abbreviation}`}, while {method2.abbreviation} addresses {method1.limitations[0]?.toLowerCase() || `the gap left by ${method1.abbreviation}`}.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Typical Workflow</h3>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="font-bold text-purple-600 mr-3">1.</span>
                  <span>Run {method1.abbreviation} first to {method1.applications[0].toLowerCase()} — its strength is {method1.advantages[0]?.toLowerCase()}.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-purple-600 mr-3">2.</span>
                  <span>Follow with {method2.abbreviation} to {method2.applications[0].toLowerCase()} where {method1.abbreviation} alone would be limited by {method1.limitations[0]?.toLowerCase() || 'its physical principle'}.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-purple-600 mr-3">3.</span>
                  <span>Cross-check the {method1.abbreviation} findings against {method2.abbreviation} signals — disagreements are the indicator that one method has hit a known limitation.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-purple-600 mr-3">4.</span>
                  <span>Document both data sets against the controlling code (typically {method1.standards[0] || 'ASME Section V'} for {method1.abbreviation}, {method2.standards[0] || 'the parent code'} for {method2.abbreviation}).</span>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Benefits of Combined Approach</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Enhanced probability of detection (POD)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Better defect characterization and sizing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reduced false indications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Improved decision-making for fitness-for-service</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">
                What is the difference between {method1.abbreviation} and {method2.abbreviation}?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The primary difference is that {method1.name} works by {method1.principles[0]}, while {method2.name} operates by {method2.principles[0]}. This fundamental difference affects their detection capabilities and applications.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">
                Is {method1.abbreviation} or {method2.abbreviation} more cost-effective for {method1.industries[0]?.toLowerCase() || 'industrial'} inspection?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {method1.name} brings {method1.advantages[0]?.toLowerCase()} but is held back by {method1.limitations[0]?.toLowerCase() || 'specific limitations'}; {method2.name} offers {method2.advantages[0]?.toLowerCase()} at the cost of {method2.limitations[0]?.toLowerCase() || 'its own constraints'}. The total cost on a real job depends on access, throughput, and which controlling code ({method1.standards[0] || 'ASME Section V'} vs {method2.standards[0] || 'the parent standard'}) the contract names.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">
                Can {method1.abbreviation} replace {method2.abbreviation} on a given inspection?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Substitution is only allowed where the controlling code permits it. {method1.abbreviation} is the natural choice when the priority is to {method1.applications[0].toLowerCase()}; {method2.abbreviation} is preferred when the scope demands {method2.applications[0].toLowerCase()}. The procedure (and any qualified-procedure substitution clause in {method1.standards[0] || 'the parent code'}) decides whether one can stand in for the other.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">
                Do inspectors qualified in {method1.abbreviation} also cover {method2.abbreviation}?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Not automatically. ASNT, ISO 9712, and NAS 410 schemes all certify by method, so a {method1.abbreviation} Level II is not endorsed to sign a {method2.abbreviation} report. Many inspectors hold qualifications in both — typical career paths in {method1.industries[0]?.toLowerCase() || 'this sector'} stack {method1.abbreviation} and {method2.abbreviation} together because the local job mix calls for both.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">
                Which method provides a permanent record?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {['RT', 'PAUT', 'TOFD', 'GWT'].includes(method1.abbreviation) && ['RT', 'PAUT', 'TOFD', 'GWT'].includes(method2.abbreviation)
                  ? `Both ${method1.abbreviation} and ${method2.abbreviation} provide digital records that serve as permanent documentation.`
                  : ['RT', 'PAUT', 'TOFD', 'GWT'].includes(method1.abbreviation)
                  ? `${method1.name} (${method1.abbreviation}) provides a permanent record, while ${method2.name} produces more limited documentation.`
                  : `${method2.name} (${method2.abbreviation}) provides a permanent record, while ${method1.name} produces more limited documentation.`}
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing the Right Method?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our certified NDT inspectors can help you determine which method (or combination of methods) is best for your specific inspection needs.
          </p>
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
            Contact an NDT Expert
          </button>
        </section>

        {/* Related Comparisons */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Other NDT Method Comparisons</h2>
          <p className="text-muted-foreground mb-6">
            Explore comparisons with other NDT methods to build a comprehensive understanding of when to use each technique.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {methods
              .filter(m => m.slug !== comparison.method1Slug && m.slug !== comparison.method2Slug)
              .slice(0, 4)
              .map((method) => (
                <Link
                  key={method.slug}
                  href={`/compare/${comparison.method1Slug}-vs-${method.slug}`}
                  className="border rounded-lg p-4 hover:shadow-lg hover:border-primary transition group"
                >
                  <p className="text-sm font-medium group-hover:text-primary transition">
                    {method1.name} vs {method.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Compare {method1.abbreviation} with {method.abbreviation}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
