import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import { listSlugs, loadCaseStudy } from '@/lib/content/authored';

export const metadata: Metadata = {
  title: 'NDT Case Studies | Real Inspection Findings & Methods (2026)',
  description:
    'In-depth NDT inspection case studies — PAUT, TOFD, MFL and corrosion-mapping findings on refineries, pipelines, LNG tanks, offshore platforms and nuclear plants. Real assets, real defects, real method selection.',
  keywords: ['NDT case studies', 'inspection case study', 'PAUT case study', 'MFL tank floor', 'TOFD weld inspection', 'CUI discovery', 'pipeline integrity case study'],
  openGraph: { title: 'NDT Case Studies — Real Inspection Findings', description: 'In-depth NDT inspection case studies across refining, pipelines, LNG, offshore and nuclear.', url: 'https://ndt-connect.com/case-studies', type: 'website' },
  alternates: { canonical: 'https://ndt-connect.com/case-studies' },
};

// Marketplace outcome highlights (platform success stories — kept above the
// authored technical library).
const outcomes = [
  { title: 'Refinery turnaround: 200+ weld joints in 5 days', industry: 'Oil & Gas', methods: ['PAUT', 'TOFD', 'MT'], blurb: '8 qualified PAUT/TOFD teams quoted within 24 hours; all joints inspected in the turnaround window at ~35% cost saving.' },
  { title: 'Offshore platform structural assessment', industry: 'Marine & Offshore', methods: ['UT', 'MT', 'Corrosion Mapping'], blurb: '5 local Aberdeen providers compared on offshore certs and insurance; full assessment in one weather window.' },
  { title: 'Pipeline integrity — 500km cross-country', industry: 'Pipeline', methods: ['GWT', 'UT', 'PAUT'], blurb: 'GWT screening plus follow-up PAUT coordinated through one platform; complete digital audit trail.' },
];

export default async function CaseStudiesPage() {
  const slugs = listSlugs('case-studies');
  const studies = (await Promise.all(slugs.map(async (slug) => {
    const c = await loadCaseStudy(slug);
    return c ? { slug, metaTitle: c.metaTitle as string, metaDescription: c.metaDescription as string, industry: c.industry as string, assetType: c.assetType as string } : null;
  }))).filter(Boolean) as { slug: string; metaTitle: string; metaDescription: string; industry: string; assetType: string }[];

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'NDT Inspection Case Studies',
    itemListElement: studies.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://ndt-connect.com/case-studies/${s.slug}`,
      name: s.metaTitle,
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ndt-connect.com' },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://ndt-connect.com/case-studies' },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-foreground">Case Studies</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">NDT Inspection Case Studies</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Detailed, method-level case studies — the asset, the degradation mechanism, the technique chosen, and the findings.
        Plus marketplace outcomes from operators who sourced certified inspectors through NDT Connect.
      </p>

      {/* Authored technical case-study library (the indexable depth) */}
      <h2 className="text-2xl font-bold text-foreground mb-1">Technical case studies</h2>
      <p className="text-sm text-muted-foreground mb-6">Real assets, real defects, real method selection — written to method and code depth.</p>
      <div className="grid md:grid-cols-2 gap-5 mb-14">
        {studies.map((s) => (
          <Link key={s.slug} href={`/case-studies/${s.slug}`} className="group">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs"><FileText className="h-3 w-3 mr-1" />{s.industry}</Badge>
                </div>
                <CardTitle className="text-lg leading-snug group-hover:text-primary">{s.metaTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{s.metaDescription}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium">Read case study <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Marketplace outcomes */}
      <h2 className="text-2xl font-bold text-foreground mb-6">Marketplace outcomes</h2>
      <div className="grid md:grid-cols-3 gap-5 mb-12">
        {outcomes.map((o, i) => (
          <Card key={i} className="h-full">
            <CardHeader>
              <Badge className="w-fit mb-2">{o.industry}</Badge>
              <CardTitle className="text-base leading-snug">{o.title}</CardTitle>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {o.methods.map((m, j) => <Badge key={j} variant="outline" className="text-xs">{m}</Badge>)}
              </div>
            </CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">{o.blurb}</p></CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center">
        <h2 className="text-2xl font-bold mb-4">Ready for Your Own Success Story?</h2>
        <p className="mb-6 opacity-90 max-w-lg mx-auto">Join NDT Connect and experience faster, more efficient NDT service sourcing.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" asChild><Link href="/register">Get Started Free</Link></Button>
          <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild><Link href="/find-providers">Find Inspectors</Link></Button>
        </div>
      </section>
    </div>
  );
}
