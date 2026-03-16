import { Metadata } from 'next';
import Link from 'next/link';
import { certifications } from '@/lib/seo-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Clock } from 'lucide-react';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

const certFaqs = [
  { question: 'What NDT certifications are most recognized worldwide?', answer: 'The most recognized NDT certifications are ASNT SNT-TC-1A and ACCP (USA), ISO 9712 (international), PCN (UK/Europe), and API certifications (510, 570, 653) for specific equipment inspections.' },
  { question: 'How long does it take to get NDT certified?', answer: 'NDT Level I certification typically takes 1-3 months including training and experience hours. Level II requires 6-18 months, and Level III can take 3-5+ years of experience depending on the certification body.' },
  { question: 'How much does NDT certification cost?', answer: 'Costs vary by certification. ASNT Level I/II exams cost $200-$500, ISO 9712 exams range $300-$800, and API certifications cost $500-$1,000. Training courses are additional, ranging from $1,000-$5,000.' },
  { question: 'Do NDT certifications expire?', answer: 'Yes, most NDT certifications require renewal every 3-5 years. ASNT certifications are valid for 5 years, ISO 9712 for 5 years, and API certifications for 3 years. Continuing education or re-examination is typically required.' },
  { question: 'Can I use my NDT certification in different countries?', answer: 'It depends on the certification. ISO 9712 is internationally recognized across many countries. ASNT is primarily for the USA but accepted in many regions. PCN is recognized across Europe and the Commonwealth. Check specific country requirements.' },
];

export const metadata: Metadata = {
  title: 'NDT Certifications Guide | ASNT, ISO 9712, API, PCN | NDT Connect',
  description: 'Complete guide to NDT certifications. Learn about ASNT, ISO 9712, API 510/570/653, and PCN certification requirements, levels, and exam preparation.',
  keywords: ['NDT certification', 'ASNT certification', 'ISO 9712', 'API 510', 'API 570', 'API 653', 'PCN certification', 'NDT qualification'],
  openGraph: { title: 'NDT Certifications Guide | NDT Connect', description: 'Complete guide to NDT certifications worldwide.', url: 'https://ndt-connect.com/certifications' },
  alternates: { canonical: 'https://ndt-connect.com/certifications' },
};

export default function CertificationsPage() {
  return (
    <>
    <FAQSchema questions={certFaqs} />
    <BreadcrumbSchema items={[{ name: 'Home', url: 'https://ndt-connect.com' }, { name: 'Certifications', url: 'https://ndt-connect.com/certifications' }]} />
    <div className="max-w-5xl mx-auto">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-foreground">Certifications</span>
      </nav>

      <section className="text-center py-12 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">NDT Certification Guide</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comprehensive guide to NDT certifications and qualifications recognized worldwide. Understand requirements, levels, and career pathways.
        </p>
      </section>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {certifications.map((cert) => (
          <Card key={cert.slug} className="hover:shadow-lg transition-shadow group">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Badge>{cert.abbreviation}</Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {cert.validityPeriod}</span>
              </div>
              <CardTitle className="text-lg">{cert.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Award className="h-3 w-3" />
                <span>{cert.issuingBody}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {cert.relevantMethods.slice(0, 5).map((m, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{m}</Badge>
                ))}
              </div>
              <Link href={`/certifications/${cert.slug}`} className="text-sm text-primary font-medium flex items-center group-hover:underline">
                Full {cert.abbreviation} guide <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-8 text-center">Frequently Asked Questions About NDT Certifications</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {certFaqs.map((faq, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center">
        <h2 className="text-2xl font-bold mb-4">Already Certified?</h2>
        <p className="mb-6 opacity-90 max-w-lg mx-auto">Join NDT Connect as a provider and showcase your certifications to potential clients.</p>
        <Button size="lg" variant="secondary" asChild><Link href="/register">Register as Provider</Link></Button>
      </section>
    </div>
    </>
  );
}
