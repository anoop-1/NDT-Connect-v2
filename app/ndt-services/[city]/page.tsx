import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PUBLISHABLE_CITIES,
  findPublishableCity,
  type City,
} from '@/data/cities';
import { nearestCities, buildCityAlternates } from '@/lib/seo-helpers';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Building2,
  Search,
  ArrowRight,
  Shield,
  CheckCircle,
  Clock,
  Users,
  Zap,
  Globe,
  TrendingUp,
} from 'lucide-react';
import { ServiceSchema, BreadcrumbListSchema } from '@/components/seo/SchemaMarkup';
import AuthorByline from '@/components/AuthorByline';

// ============================================================================
// /ndt-services/[city]
//
// 180-city programmatic SEO route, gated by the data/cities.ts quality bar.
// Only cities returning `true` from isCityPublishable get a page — keeps the
// thin-content cull at the data layer rather than at render time.
// ============================================================================

interface Props {
  params: Promise<{ city: string }>;
}

const METHODS_FOR_CITY_GRID: { slug: string; abbr: string; name: string; blurb: string }[] = [
  {
    slug: 'ultrasonic-testing',
    abbr: 'UT',
    name: 'Ultrasonic Testing',
    blurb:
      'Wall-thickness, weld and pressure-equipment inspection per ASME Section V and API 510/570/653.',
  },
  {
    slug: 'radiographic-testing',
    abbr: 'RT',
    name: 'Radiographic Testing',
    blurb:
      'Film and digital RT for new construction and in-service welds per ASME Section V and API 1104.',
  },
  {
    slug: 'magnetic-particle-testing',
    abbr: 'MT',
    name: 'Magnetic Particle Testing',
    blurb:
      'Surface and near-surface crack detection on ferromagnetic welds per ASTM E709 / E1444.',
  },
  {
    slug: 'penetrant-testing',
    abbr: 'PT',
    name: 'Liquid Penetrant Testing',
    blurb:
      'Surface-breaking flaw detection on non-porous materials per ASTM E165 / E1417.',
  },
  {
    slug: 'visual-testing',
    abbr: 'VT',
    name: 'Visual Testing',
    blurb:
      'Code-required visual inspection per AWS D1.1, ASME Section V and API 510 / 570 / 653.',
  },
  {
    slug: 'phased-array-ut',
    abbr: 'PAUT',
    name: 'Phased Array Ultrasonic Testing',
    blurb:
      'Encoded, imaged weld inspection per ISO 13588 and ASME Section V Mandatory Appendix.',
  },
];

export async function generateStaticParams() {
  return PUBLISHABLE_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = findPublishableCity(citySlug);
  if (!city) return { title: 'Not Found' };

  const stateLabel = city.country === 'US' || city.country === 'CA' ? city.state : city.country;
  const title = `NDT Services in ${city.name}, ${stateLabel} | NDT Connect`;
  const description =
    `${city.name} NDT inspection services — UT, RT, MT, PT, VT, PAUT — for ${city.industries.slice(0, 2).join(' and ').toLowerCase()} operators. ` +
    `Compliant with ${city.codeAuthorities.slice(0, 2).join(' and ')}.`;

  return {
    title,
    description,
    keywords: [
      `NDT services ${city.name}`,
      `NDT inspection ${city.name}`,
      `non-destructive testing ${city.name}`,
      `ultrasonic testing ${city.name}`,
      `radiographic testing ${city.name}`,
      `${city.industries[0]} inspection ${city.name}`,
      `NDT company ${city.name}, ${city.state}`,
      `${city.name} ASNT Level II`,
    ],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/ndt-services/${city.slug}`,
      type: 'website',
      siteName: 'NDT Connect',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: buildCityAlternates(city.slug, '/ndt-services'),
  };
}

function buildIntroParagraphs(city: City): string[] {
  const stateLabel = city.country === 'US' || city.country === 'CA' ? city.state : city.country;
  const facilityNames = city.namedFacilities.slice(0, 3).map((f) => f.name);
  const codeAuth = city.codeAuthorities.slice(0, 3).join(', ');
  const industryList = city.industries.slice(0, 4).join(', ').toLowerCase();
  return [
    `Operators in ${city.name}, ${stateLabel} run NDT scopes against a tight set of compliance ` +
      `expectations. The industrial mix here — ${industryList} — pulls inspection work toward ${codeAuth}, ` +
      `which means a contractor needs documented Level II/III currency, traceable instrument calibration, ` +
      `and on-call ASNT-recognised method coverage before the first survey starts.`,
    `${city.localPainQuote}`,
    `On the ground in ${city.name}, that translates into recurring scopes at ${facilityNames.join(', ')} ` +
      `and the surrounding plant fence-line. NDT Connect surfaces certified ${city.name} inspection ` +
      `providers who already work to ${city.codeAuthorities[0]} acceptance criteria, have current calibration ` +
      `chains-of-custody on their UT thickness gauges and PAUT units, and can mobilise within the ` +
      `${city.region.replace(/-/g, ' ')} turnaround window.`,
  ];
}

function buildIndustryContextBlocks(city: City): { industry: string; copy: string }[] {
  const facilitiesByType = city.namedFacilities;
  return city.industries.slice(0, 4).map((industry, idx) => {
    const fac = facilitiesByType[idx] || facilitiesByType[0];
    const copy =
      `${industry} work in ${city.name} centres on assets like ${fac.name} (${fac.type}). ` +
      `Inspection cadence here is driven by ${city.codeAuthorities[0]} and reinforced by site-specific ` +
      `pre-job qualification matrices — keeping NDT records audit-ready is a continuous, not annual, exercise.`;
    return { industry, copy };
  });
}

function buildFaqs(city: City): { q: string; a: string }[] {
  const stateLabel = city.country === 'US' || city.country === 'CA' ? city.state : city.country;
  const fac1 = city.namedFacilities[0]?.name ?? 'major local operators';
  const fac2 = city.namedFacilities[1]?.name ?? 'regional contractors';
  return [
    {
      q: `Which NDT methods are most in demand in ${city.name}?`,
      a:
        `${city.industries.slice(0, 2).join(' and ')} operators in ${city.name} drive demand for ultrasonic ` +
        `testing (UT), phased array UT (PAUT), radiographic testing (RT) and magnetic particle testing (MT). ` +
        `Method selection at sites like ${fac1} is dictated by ${city.codeAuthorities[0]} acceptance criteria.`,
    },
    {
      q: `What certifications should NDT inspectors in ${city.name} hold?`,
      a:
        `At minimum, ASNT SNT-TC-1A Level II in the requested method, with a Level III on file for procedure ` +
        `qualification. Contractors working at ${fac2} typically also need site-specific safety induction and ` +
        `documented currency under ${city.codeAuthorities.slice(0, 2).join(' / ')}.`,
    },
    {
      q: `How fast can I get an NDT crew on site in ${city.name}?`,
      a:
        `Local providers in ${city.name}, ${stateLabel} can typically mobilise within 24–72 hours for ` +
        `routine in-service inspections. Turnaround windows, emergency call-outs, and outage support are ` +
        `negotiated against current crew rotation — post the scope to NDT Connect to receive parallel quotes.`,
    },
    {
      q: `Which codes and standards apply to NDT work in ${city.name}?`,
      a:
        `Work in ${city.name} most often references ${city.codeAuthorities.join('; ')}. Method-level acceptance ` +
        `criteria are pulled from ASME Section V, ASTM E-series (E165, E709, E1444), and AWS D1.1 depending on ` +
        `the asset and service.`,
    },
    {
      q: `Do inspectors in ${city.name} cover advanced methods like PAUT and TOFD?`,
      a:
        `Yes. The ${city.region.replace(/-/g, ' ')} contractor pool serving ${city.name} includes providers ` +
        `with phased-array ultrasonic testing (PAUT) and time-of-flight diffraction (TOFD) capability for ` +
        `critical weld scopes — both encoded and compliant with ISO 13588 / ISO 10863.`,
    },
    {
      q: `How are NDT inspection records handled in ${city.name}?`,
      a:
        `Audit-grade record-keeping is the operational pain in ${city.name}. NDT Connect providers issue ` +
        `instrument-level calibration certificates, traceable Level II/III sign-off, and digital scan packages ` +
        `that survive ${city.codeAuthorities[0]} audit cycles.`,
    },
  ];
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = findPublishableCity(citySlug);
  if (!city) notFound();

  const stateLabel = city.country === 'US' || city.country === 'CA' ? city.state : city.country;
  const introParagraphs = buildIntroParagraphs(city);
  const industryBlocks = buildIndustryContextBlocks(city);
  const faqs = buildFaqs(city);
  const nearby = nearestCities(city.slug, 5);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `NDT Services in ${city.name}`,
    description: `Non-destructive testing and inspection services in ${city.name}, ${stateLabel}`,
    provider: {
      '@type': 'Organization',
      name: 'NDT Connect',
      url: 'https://ndt-connect.com',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': city.country === 'US' || city.country === 'CA' ? 'State' : 'Country',
        name: stateLabel,
      },
    },
    serviceType: 'Non-Destructive Testing',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NDT Services',
      itemListElement: METHODS_FOR_CITY_GRID.map((m) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${m.name} in ${city.name}`,
        },
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServiceSchema
        serviceName={`NDT Inspection Services in ${city.name}`}
        description={`Certified non-destructive testing services in ${city.name}, ${stateLabel}. UT, RT, MT, PT, VT and PAUT for ${city.industries.slice(0, 2).join(' and ').toLowerCase()} operators.`}
        provider="NDT Connect"
        areaServed={`${city.name}, ${stateLabel}`}
      />
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: 'https://ndt-connect.com' },
          { name: 'NDT Services', url: 'https://ndt-connect.com/ndt-services' },
          { name: city.name, url: `https://ndt-connect.com/ndt-services/${city.slug}` },
        ]}
      />

      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 mb-8 px-4 md:px-0">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-primary/40">/</span>
          <Link href="/services" className="hover:text-primary transition-colors">
            NDT Services
          </Link>
          <span className="text-primary/40">/</span>
          <span className="text-primary font-medium">{city.name}</span>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-2xl mb-12 px-4 md:px-0">
          <div className="relative z-10 rounded-2xl p-8 md:p-12 bg-gradient-to-br from-[#003680] via-[#004aad] to-[#0066ff] text-white shadow-xl">
            <div
              className="absolute inset-0 opacity-10 rounded-2xl"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            ></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-white/15 border border-white/30 text-white font-medium">
                  <MapPin className="h-3 w-3 mr-1.5" />
                  {city.region.replace(/-/g, ' ')} · {city.country}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-md">
                NDT Services in {city.name}, {stateLabel}
              </h1>
              <p className="text-lg text-white/95 max-w-3xl mb-4 leading-relaxed">
                {introParagraphs[0]}
              </p>
              <blockquote className="border-l-4 border-white/60 pl-4 italic text-white/90 max-w-3xl mb-6">
                {city.localPainQuote}
              </blockquote>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 shadow-lg" asChild>
                  <Link href="/find-providers">
                    <Search className="h-4 w-4 mr-2" />
                    Find Inspectors in {city.name}
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20"
                  asChild
                >
                  <Link href="/request-service">
                    <Zap className="h-4 w-4 mr-2" />
                    Post a Service Request
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stat strip — visual anchor under hero */}
        <section className="-mt-6 mb-12 px-4 md:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="text-center md:border-r border-slate-100">
              <div className="text-3xl font-extrabold text-primary">{city.industries.length}</div>
              <div className="text-xs font-medium text-slate-600 uppercase tracking-wide mt-1">Industries</div>
            </div>
            <div className="text-center md:border-r border-slate-100">
              <div className="text-3xl font-extrabold text-primary">{city.namedFacilities.length}+</div>
              <div className="text-xs font-medium text-slate-600 uppercase tracking-wide mt-1">Named facilities</div>
            </div>
            <div className="text-center md:border-r border-slate-100">
              <div className="text-3xl font-extrabold text-primary">T{city.tier}</div>
              <div className="text-xs font-medium text-slate-600 uppercase tracking-wide mt-1">Labour band</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-primary">{city.codeAuthorities.length}</div>
              <div className="text-xs font-medium text-slate-600 uppercase tracking-wide mt-1">Code authorities</div>
            </div>
          </div>
        </section>

        <div className="section-divider my-10"></div>

        {/* Local context */}
        <section className="mb-16 px-4 md:px-0">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Local NDT context in {city.name}
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-4">{introParagraphs[2]}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <Users className="h-8 w-8 text-primary mb-3" />
              <p className="font-semibold text-slate-900 mb-1">Verified inspectors</p>
              <p className="text-sm text-slate-600">
                ASNT Level II / III on file before mobilisation
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <Clock className="h-8 w-8 text-primary mb-3" />
              <p className="font-semibold text-slate-900 mb-1">Parallel quotes</p>
              <p className="text-sm text-slate-600">
                Post a scope, receive quotes in hours not days
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <Shield className="h-8 w-8 text-primary mb-3" />
              <p className="font-semibold text-slate-900 mb-1">Code coverage</p>
              <p className="text-sm text-slate-600">
                {city.codeAuthorities.slice(0, 2).join(' · ')}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <Globe className="h-8 w-8 text-primary mb-3" />
              <p className="font-semibold text-slate-900 mb-1">Local crews</p>
              <p className="text-sm text-slate-600">
                Based in {city.name} and the wider {city.region.replace(/-/g, ' ')}
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider my-10"></div>

        {/* Industries + named facilities */}
        <section className="mb-16 px-4 md:px-0">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Industries we cover in {city.name}
          </h2>
          <p className="text-slate-600 mb-8">
            {city.name}&apos;s industrial substrate is the reason NDT contractors here run
            multi-method programs rather than single-discipline benches. Each block below maps an
            industry to a named local asset so you can see how the scope actually shows up on a
            site.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {industryBlocks.map(({ industry, copy }, i) => (
              <div
                key={i}
                className="bg-primary/5 rounded-xl p-5 border border-primary/20 hover:border-primary/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-white border border-primary/20 rounded-lg shadow-sm">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">{industry}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground">
              Named operators and facilities served
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {city.namedFacilities.map((f, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">{f.name}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{f.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider my-10"></div>

        {/* Code authorities */}
        <section className="mb-16 px-4 md:px-0">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Codes, standards and regulators that drive NDT in {city.name}
          </h2>
          <p className="text-slate-600 mb-6">
            Method selection, acceptance criteria, and audit retention in {city.name} are written
            against the following authorities. Inspectors mobilising here should expect to be
            checked against each of them.
          </p>
          <div className="flex flex-wrap gap-3">
            {city.codeAuthorities.map((code, i) => (
              <Badge
                key={i}
                className="border border-primary/30 bg-primary/10 text-primary font-medium py-2 px-4 text-sm"
              >
                {code}
              </Badge>
            ))}
          </div>
        </section>

        <div className="section-divider my-10"></div>

        {/* NDT methods grid */}
        <section className="mb-16 px-4 md:px-0">
          <h2 className="text-3xl font-bold text-primary mb-4">
            NDT methods available in {city.name}
          </h2>
          <p className="text-slate-600 mb-8">
            Each method links to the city-specific technique brief. All listed inspectors on NDT
            Connect work to ASNT SNT-TC-1A as a baseline and reference ASME Section V for
            procedural acceptance.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {METHODS_FOR_CITY_GRID.map((m, i) => (
              <Link
                key={m.slug}
                href={`/ndt-services/${city.slug}/${m.slug}`}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30 transition-all group block p-6 relative"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-3">
                  <Badge className="border border-primary/30 bg-primary/10 text-primary font-bold text-xs">
                    {m.abbr}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {m.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{m.blurb}</p>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                  {m.abbr} in {city.name}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" size="lg" className="bg-white border-primary/30 text-primary hover:bg-primary/5" asChild>
              <Link href="/services" className="flex items-center gap-2">
                View all NDT methods <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <div className="section-divider my-10"></div>

        {/* FAQ */}
        <section className="mb-16 px-4 md:px-0">
          <h2 className="text-3xl font-bold text-primary mb-8">
            Frequently asked questions — NDT in {city.name}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <h3 className="font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {faq.q}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider my-10"></div>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-2xl mb-16 px-4 md:px-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#004aad] to-[#003a8a] rounded-2xl opacity-90"></div>
          <div className="relative z-10 p-8 md:p-12 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to book NDT services in {city.name}?
            </h2>
            <p className="text-lg opacity-95 max-w-2xl mx-auto mb-10 leading-relaxed">
              Post a scope to NDT Connect and receive parallel quotes from certified {city.name}{' '}
              inspection providers within hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-slate-100 font-semibold"
                asChild
              >
                <Link href="/find-providers">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Find inspectors
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10 font-semibold"
                asChild
              >
                <Link href="/register">
                  <Zap className="h-4 w-4 mr-2" />
                  Join as provider
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="section-divider my-10"></div>

        {/* Nearest cities via Haversine */}
        {nearby.length > 0 && (
          <section className="px-4 md:px-0 mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Also serving nearby cities
            </h2>
            <p className="text-slate-600 mb-6">
              The same {city.name}-based providers routinely mobilise to neighbouring industrial
              corridors. Click through for the local NDT brief.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  href={`/ndt-services/${c.slug}`}
                  className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 group flex flex-col items-center gap-2 text-center text-sm transition-all"
                >
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    NDT in {c.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    {c.country === 'US' || c.country === 'CA' ? c.state : c.country}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Author byline — E-E-A-T signal (Person schema embedded) */}
        <section className="mt-12 mb-8 px-4 md:px-0">
          <AuthorByline />
        </section>
      </div>
    </>
  );
}
