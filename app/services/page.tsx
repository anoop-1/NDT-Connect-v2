import { Metadata } from 'next';
import Link from 'next/link';
import { methods } from '@/lib/seo-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { PageHero } from '@/components/shared/PageHero';

const serviceFaqs = [
  { question: 'What are the main types of NDT testing methods?', answer: 'The six primary NDT methods are Ultrasonic Testing (UT), Radiographic Testing (RT), Magnetic Particle Testing (MT), Liquid Penetrant Testing (PT), Eddy Current Testing (ET), and Visual Testing (VT). Advanced methods include PAUT, TOFD, and Guided Wave Testing.' },
  { question: 'How do I choose the right NDT method for my application?', answer: 'The right NDT method depends on the material type, defect type you are looking for, geometry of the component, and applicable codes/standards. Use our free NDT Method Selector tool or consult with certified inspectors on NDT Connect.' },
  { question: 'How much does NDT testing cost?', answer: 'NDT testing costs vary by method, location, and complexity. Ultrasonic testing typically ranges from $300-$1,500 per inspection, while radiographic testing can range from $500-$3,000. Get instant quotes from multiple providers on NDT Connect.' },
  { question: 'What certifications should an NDT inspector have?', answer: 'NDT inspectors should hold certifications such as ASNT SNT-TC-1A or ACCP (USA), ISO 9712 (international), PCN (UK/Europe), or API certifications for specific equipment types. All NDT Connect providers are verified and certified.' },
  { question: 'Can I book NDT inspections online?', answer: 'Yes, NDT Connect allows you to search for certified NDT providers, compare quotes, and book inspections online with real-time tracking for any NDT method worldwide.' },
];

export const metadata: Metadata = {
  title: 'NDT Testing Services | UT RT MT PT ET VT PAUT TOFD | NDT Connect',
  description: 'Complete range of non-destructive testing services. Book UT, RT, MT, PT, ET, VT, PAUT, TOFD, and advanced NDT inspections online. Certified inspectors worldwide.',
  keywords: [
    'NDT services', 'non-destructive testing services', 'ultrasonic testing', 'radiographic testing',
    'magnetic particle testing', 'penetrant testing', 'eddy current testing', 'visual testing',
    'phased array ultrasonic testing', 'TOFD testing', 'NDT inspection services', 'book NDT online',
  ],
  openGraph: {
    title: 'NDT Testing Services | NDT Connect',
    description: 'Book any NDT inspection method online. Certified inspectors worldwide.',
    url: 'https://ndt-connect.com/services',
    type: 'website',
    siteName: 'NDT Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NDT Testing Services | UT RT MT PT ET VT PAUT TOFD',
    description: 'Book any NDT inspection method online. Certified inspectors worldwide.',
  },
  alternates: { canonical: 'https://ndt-connect.com/services' },
};

export default function ServicesPage() {
  const primaryMethods = methods.filter(m => ['ultrasonic-testing', 'radiographic-testing', 'magnetic-particle-testing', 'penetrant-testing', 'eddy-current-testing', 'visual-testing'].includes(m.slug));
  const advancedMethods = methods.filter(m => !['ultrasonic-testing', 'radiographic-testing', 'magnetic-particle-testing', 'penetrant-testing', 'eddy-current-testing', 'visual-testing'].includes(m.slug));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'NDT Testing Services',
    description: 'Complete range of non-destructive testing services available through NDT Connect',
    itemListElement: methods.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: `${m.name} (${m.abbreviation})`,
        description: m.description,
        url: `https://ndt-connect.com/services/${m.slug}`,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <FAQSchema questions={serviceFaqs} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://ndt-connect.com' }, { name: 'NDT Services', url: 'https://ndt-connect.com/services' }]} />

      <div className="max-w-5xl mx-auto">
        <PageHero
          title="Non-Destructive Testing Services"
          description="Book any NDT inspection method through NDT Connect. Access certified inspectors for all major testing methods worldwide."
          breadcrumbs={[{ label: 'NDT Services' }]}
        >
          <Button size="lg" asChild>
            <Link href="/find-providers">
              <Search className="h-4 w-4 mr-2" />
              Find NDT Inspectors
            </Link>
          </Button>
        </PageHero>

        {/* Primary Methods */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-2 text-slate-900">Primary NDT Methods</h2>
          <p className="text-slate-600 mb-8">The six fundamental non-destructive testing methods used across all industries.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {primaryMethods.map((method) => (
              <Card key={method.slug} className="hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <Badge className="w-fit mb-2">{method.abbreviation}</Badge>
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{method.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {method.industries.slice(0, 3).map((ind, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{ind}</Badge>
                    ))}
                  </div>
                  <Link href={`/services/${method.slug}`} className="text-sm text-primary font-medium flex items-center group-hover:underline">
                    Learn more about {method.abbreviation} <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Advanced Methods */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-2">Advanced NDT Methods</h2>
          <p className="text-muted-foreground mb-8">Specialized techniques for complex inspection requirements and advanced imaging capabilities.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedMethods.map((method) => (
              <Card key={method.slug} className="hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{method.abbreviation}</Badge>
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{method.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {method.industries.slice(0, 3).map((ind, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{ind}</Badge>
                    ))}
                  </div>
                  <Link href={`/services/${method.slug}`} className="text-sm text-primary font-medium flex items-center group-hover:underline">
                    Learn more about {method.abbreviation} <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">Frequently Asked Questions About NDT Services</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {serviceFaqs.map((faq, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center">
          <h2 className="text-2xl font-bold mb-4">Not Sure Which NDT Method You Need?</h2>
          <p className="mb-6 opacity-90 max-w-lg mx-auto">
            Use our NDT Method Selector tool to find the right testing method for your application, or post a service request and let our experts recommend the best approach.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/tools/ndt-method-selector">NDT Method Selector</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/request-service">Request a Service</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
