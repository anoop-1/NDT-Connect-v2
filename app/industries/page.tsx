import { Metadata } from 'next';
import Link from 'next/link';
import { industries } from '@/lib/seo-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { PageHero } from '@/components/shared/PageHero';

const industryFaqs = [
  { question: 'Which industries require NDT inspections?', answer: 'NDT inspections are required in oil and gas, aerospace, power generation, manufacturing, marine and offshore, construction, and mining industries. Any industry where structural integrity and safety are critical relies on NDT.' },
  { question: 'What NDT methods are most common in oil and gas?', answer: 'Oil and gas primarily uses Ultrasonic Testing (UT), Radiographic Testing (RT), Magnetic Particle Testing (MT), and advanced methods like PAUT and TOFD for pipeline, pressure vessel, and storage tank inspections.' },
  { question: 'Is NDT required by law for certain industries?', answer: 'Yes, many industries have regulatory requirements for NDT inspections. For example, ASME codes mandate NDT for pressure equipment, FAA requires NDT for aerospace components, and API standards govern oil and gas inspections.' },
  { question: 'How do I find NDT inspectors specialized in my industry?', answer: 'NDT Connect lets you filter providers by industry specialization, ensuring you find inspectors with relevant certifications and experience in your specific sector.' },
];

export const metadata: Metadata = {
  title: 'Industries We Serve | Oil & Gas, Aerospace, Power Gen NDT | NDT Connect',
  description: 'NDT Connect serves all major industries: oil & gas, aerospace, power generation, manufacturing, marine, construction, and mining. Find industry-specialized NDT inspectors.',
  keywords: ['NDT industries', 'oil and gas NDT', 'aerospace NDT', 'power generation NDT', 'manufacturing NDT', 'marine NDT', 'construction NDT', 'mining NDT'],
  openGraph: { title: 'Industries We Serve | NDT Connect', description: 'NDT inspection services for all major industries worldwide.', url: 'https://ndt-connect.com/industries' },
  alternates: { canonical: 'https://ndt-connect.com/industries' },
};

export default function IndustriesPage() {
  return (
    <>
    <FAQSchema questions={industryFaqs} />
    <BreadcrumbSchema items={[{ name: 'Home', url: 'https://ndt-connect.com' }, { name: 'Industries', url: 'https://ndt-connect.com/industries' }]} />
    <div className="max-w-5xl mx-auto">
      <PageHero
        title="Industries We Serve"
        description="NDT Connect provides specialized non-destructive testing services across all major industries worldwide."
        breadcrumbs={[{ label: 'Industries' }]}
      />

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {industries.map((industry) => (
          <Card key={industry.slug} className="hover:shadow-lg transition-shadow group">
            <CardHeader>
              <CardTitle className="text-xl">{industry.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">{industry.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {industry.commonMethods.slice(0, 4).map((m, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{m}</Badge>
                ))}
              </div>
              <Link href={`/industries/${industry.slug}`} className="text-sm text-primary font-medium flex items-center group-hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-8 text-center text-slate-900">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {industryFaqs.map((faq, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600 text-sm">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center">
        <h2 className="text-2xl font-bold mb-4">Need Industry-Specialized NDT?</h2>
        <p className="mb-6 opacity-90 max-w-lg mx-auto">Find certified inspectors with deep expertise in your industry.</p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/find-providers">Find Inspectors</Link>
        </Button>
      </section>
    </div>
    </>
  );
}
