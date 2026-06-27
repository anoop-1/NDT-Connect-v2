import { Metadata } from 'next';
import Link from 'next/link';
import { getCityBySlug } from '@/lib/seo-data';
import { PUBLISHABLE_CITIES, findPublishableCity } from '@/data/cities';
import { shouldIndexCity, robotsFor } from '@/lib/seo/indexability';
import {
  toCityView,
  trainingProviderProse,
  trainingCoursesForCity,
  whoHiresAfter,
  accreditationPath,
  cityFaqs,
  methodsForIndustries,
} from '@/lib/content/city-content';
import { FAQSchema } from '@/components/seo/SchemaMarkup';
import { ChevronRight, MapPin, Award, Users, BookOpen, Briefcase, HelpCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

export async function generateStaticParams() {
  return PUBLISHABLE_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const canonical = findPublishableCity(citySlug);
  const legacy = canonical ? null : getCityBySlug(citySlug);
  if (!canonical && !legacy) return { title: 'Training Not Found' };
  const name = canonical?.name ?? legacy!.name;
  const region = canonical?.state ?? legacy!.region;

  const title = `NDT Training Courses in ${name}: ASNT Level I–III, $900–$5,500 [2026]`;
  const description = `NDT certification courses in ${name}, ${region} — UT, RT, MT, PT, PAUT, ASNT Level I/II/III. Fees ~$900–$5,500, schedules and certified instructors. Free cost guide.`;

  return {
    title,
    description,
    keywords: [
      `NDT training ${name}`,
      `NDT certification ${name}`,
      `NDT courses ${region}`,
      `ASNT certification ${name}`,
      `non-destructive testing training`,
      `NDT Level II certification`,
      `NDT Level III training`,
    ],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/training/${citySlug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://ndt-connect.com/training/${citySlug}`,
    },
    robots: robotsFor(shouldIndexCity(citySlug, 'training')),
  };
}

export default async function TrainingPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const canonical = findPublishableCity(citySlug);
  const legacy = canonical ? null : getCityBySlug(citySlug);

  if (!canonical && !legacy) {
    return (
      <div className="container py-12">
        <h1 className="text-2xl font-bold text-red-600">Training Program Not Found</h1>
        <p className="text-muted-foreground mt-2">The training program for this city does not exist.</p>
        <Link href="/" className="text-brand hover:underline mt-4 block">
          Return to Home
        </Link>
      </div>
    );
  }

  const view = toCityView(canonical ?? legacy);
  const courses = trainingCoursesForCity(view);
  const providerProse = trainingProviderProse(view);
  const hires = whoHiresAfter(view);
  const path = accreditationPath(view);
  const faqs = cityFaqs(view, 'training');
  const methods = methodsForIndustries(view.industries);

  // EducationEvent + Course schema rooted in the city.
  const eduSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: `NDT Training and Certification in ${view.name}`,
    description: `Professional Non-Destructive Testing (NDT) training and certification programs in ${view.name}`,
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: view.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: view.name,
        addressRegion: view.state,
        addressCountry: view.country || 'US',
      },
    },
    provider: { '@type': 'Organization', name: 'NDT Connect', url: 'https://ndt-connect.com' },
  };

  // Course schema with a real fee band so Google can surface "From $900" — no
  // fabricated review ratings (those would violate structured-data policy).
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `NDT (ASNT Level I–III) Certification Training in ${view.name}`,
    description: `UT, RT, MT, PT and PAUT training and ASNT Level I/II/III certification preparation in ${view.name}, ${view.state}.`,
    provider: { '@type': 'Organization', name: 'NDT Connect', url: 'https://ndt-connect.com' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '900',
      highPrice: '5500',
      offerCount: '5',
      category: 'Professional certification training',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['onsite', 'blended'],
      location: { '@type': 'Place', name: view.name, address: { '@type': 'PostalAddress', addressLocality: view.name, addressRegion: view.state, addressCountry: view.country || 'US' } },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eduSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <FAQSchema questions={faqs.map(f => ({ question: f.q, answer: f.a }))} />

      <div className="space-y-12 max-w-6xl mx-auto py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-brand hover:text-brand-dark font-medium">Home</Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <Link href="/training" className="text-brand hover:text-brand-dark font-medium">Training</Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">{view.name}</span>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden py-16 px-6 rounded-2xl bg-gradient-to-br from-brand/10 to-brand-dark/5">
          <div className="max-w-4xl">
            <div className="inline-block mb-4 px-4 py-2 rounded-full text-xs font-medium border border-brand/40 bg-white/40">
              NDT Training &amp; Certification
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              NDT Training Courses in {view.name}, {view.state}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{providerProse}</p>
          </div>
        </section>

        {/* Course catalogue derived from city industries */}
        <section className="px-6">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-brand" /> Available courses in {view.name}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 border">Course</th>
                  <th className="text-left p-3 border">Hours</th>
                  <th className="text-left p-3 border">Typical Fee</th>
                  <th className="text-left p-3 border">Prerequisite</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.code} className="hover:bg-muted/30">
                    <td className="p-3 border">
                      <div className="font-semibold text-foreground">{c.title}</div>
                      <div className="text-xs text-muted-foreground">Code: {c.code}</div>
                    </td>
                    <td className="p-3 border whitespace-nowrap">{c.hours} h</td>
                    <td className="p-3 border whitespace-nowrap">${c.fee.toLocaleString()}</td>
                    <td className="p-3 border text-muted-foreground">{c.prereq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Fees are 2026 ballparks based on national survey averages adjusted for local market conditions; ask the provider for the current schedule.
          </p>
        </section>

        {/* Methods most-used in this city */}
        {methods.length > 0 && (
          <section className="px-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-brand" /> Methods most-used by {view.name} employers
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Local job ads in {view.name} most commonly call for: {methods.slice(0, 8).join('; ')}. Course selection should follow the methods you intend to chase work with first.
            </p>
          </section>
        )}

        {/* Accreditation path */}
        <section className="px-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-brand" /> Local accreditation pathway
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">{path}</p>
        </section>

        {/* Who hires after training */}
        <section className="px-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-brand" /> Who hires after this training
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">{hires}</p>
        </section>

        {/* FAQ */}
        <section className="px-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-brand" /> Training FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border-l-4 border-brand/40 pl-4">
                <p className="font-semibold mb-1">{f.q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <section className="grid md:grid-cols-2 gap-4 px-6">
          <Link href={`/careers/${view.slug}`} className="block p-6 rounded-xl border hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-2 text-brand font-semibold">
              <MapPin className="w-5 h-5" /> NDT Jobs in {view.name}
            </div>
            <p className="text-sm text-muted-foreground">Salary bands, certifications and the local employer roster.</p>
          </Link>
          <Link href={`/ndt-services/${view.slug}`} className="block p-6 rounded-xl border hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-2 text-brand font-semibold">
              <BookOpen className="w-5 h-5" /> NDT Services in {view.name}
            </div>
            <p className="text-sm text-muted-foreground">The companies that may sponsor your training and pay your wages.</p>
          </Link>
        </section>
      </div>
    </>
  );
}
