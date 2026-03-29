import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCertificationBySlug, getAllCertificationSlugs, certifications } from '@/lib/seo-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, BookOpen, Clock, Award, ArrowRight } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllCertificationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cert = getCertificationBySlug(params.slug);
  if (!cert) return {};

  const title = `${cert.name} (${cert.abbreviation}) Guide | NDT Certification | NDT Connect`;
  const description = `Complete guide to ${cert.name}. Learn about requirements, exam topics, levels, and how to get certified. ${cert.description}`;

  return {
    title,
    description,
    keywords: [
      cert.name.toLowerCase(), `${cert.abbreviation} certification`, `${cert.abbreviation} exam`,
      `${cert.abbreviation} requirements`, 'NDT certification', 'NDT certification guide',
    ],
    openGraph: { title, description, url: `https://ndt-connect.com/certifications/${cert.slug}` },
    alternates: { canonical: `https://ndt-connect.com/certifications/${cert.slug}` },
  };
}

export default function CertificationPage({ params }: Props) {
  const cert = getCertificationBySlug(params.slug);
  if (!cert) notFound();

  const otherCerts = certifications.filter(c => c.slug !== cert.slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    name: cert.name,
    description: cert.longDescription,
    credentialCategory: 'Professional Certification',
    recognizedBy: { '@type': 'Organization', name: cert.issuingBody },
    validFor: cert.validityPeriod,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-4xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/certifications" className="hover:text-primary">Certifications</Link>
          <span>/</span>
          <span className="text-foreground">{cert.abbreviation}</span>
        </nav>

        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 md:p-12 mb-10">
          <Badge className="mb-4">{cert.abbreviation}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{cert.name}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-4">{cert.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Award className="h-4 w-4" /> {cert.issuingBody}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Valid: {cert.validityPeriod}</span>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">About {cert.abbreviation} Certification</h2>
          <p className="text-muted-foreground leading-relaxed">{cert.longDescription}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Certification Levels</h2>
          <div className="space-y-4">
            {cert.levels.map((level, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-card border rounded-lg">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">{i + 1}</span>
                <p className="text-sm text-muted-foreground">{level}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Requirements</h2>
          <ul className="space-y-3">
            {cert.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{req}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Exam Topics</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {cert.examTopics.map((topic, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-card border rounded-lg">
                <BookOpen className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm">{topic}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Applicable NDT Methods</h2>
          <div className="flex flex-wrap gap-2">
            {cert.relevantMethods.map((m, i) => (
              <Badge key={i} variant="outline" className="py-1.5 px-3">{m}</Badge>
            ))}
          </div>
        </section>

        <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Have {cert.abbreviation} Certification?</h2>
          <p className="mb-6 opacity-90 max-w-lg mx-auto">
            Join NDT Connect as a certified provider and connect with clients looking for {cert.abbreviation}-qualified inspectors.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Register as Provider</Link>
          </Button>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Other NDT Certifications</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCerts.map((c) => (
              <Link key={c.slug} href={`/certifications/${c.slug}`} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Badge className="mb-2">{c.abbreviation}</Badge>
                <h3 className="font-semibold text-sm mb-1">{c.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{c.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
