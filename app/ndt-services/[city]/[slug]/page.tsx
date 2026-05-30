import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PUBLISHABLE_CITIES,
  findPublishableCity,
  type City,
} from '@/data/cities';
import { nearestCities } from '@/lib/seo-helpers';
import { Badge } from '@/components/ui/badge';
import { BreadcrumbListSchema } from '@/components/seo/SchemaMarkup';
import { CornerstoneLinks } from '@/components/seo/CornerstoneLinks';
import { CityDataAnchors } from '@/components/seo/CityDataAnchors';
import {
  ChevronRight,
  CheckCircle,
  Zap,
  Target,
  MapPin,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { CityMethodContentBlocks } from '@/components/seo/CityMethodContent';
import {
  composeCityMethodContent,
  findMethodProfile,
} from '@/lib/content/city-method';
// V2 SEO content stack — see lib/seo/generate-page-content.ts. Returns null
// when the city/method are not yet present in data/cities.json or
// data/methods.json; the v1 composer above carries the page in that case.
import { generateCityMethodContent } from '@/lib/seo/generate-page-content';
import { CityMethodContentBlocksV2 } from '@/components/seo/content-blocks';

// ============================================================================
// /ndt-services/[city]/[slug]
//
// City × method. Static-generated from PUBLISHABLE_CITIES × METHODS.
// 180 cities × 6 methods = 1080 pages. Each renders 700+ words of unique,
// locally-grounded content: method overview, city-specific application,
// named facilities, code authorities, FAQ, and nearest-city links.
//
// We dropped the previous "industry" mode of this route — industries don't
// have their own data shape in data/cities.ts, and city-level industry
// content already lives on /ndt-services/[city]. Keeping a second branch
// here was generating duplicate URLs that competed with the city page.
// ============================================================================

interface PageProps {
  params: Promise<{ city: string; slug: string }>;
}

interface MethodSpec {
  slug: string;
  name: string;
  abbreviation: string;
  shortDescription: string;
  principle: string;
  standards: string[];
  applications: string[];
  advantages: string[];
  limitations: string[];
}

const METHODS: MethodSpec[] = [
  {
    slug: 'ultrasonic-testing',
    name: 'Ultrasonic Testing',
    abbreviation: 'UT',
    shortDescription:
      'High-frequency sound-wave inspection for wall thickness, weld integrity and internal flaw detection.',
    principle:
      'Piezoelectric transducers transmit and receive 0.5–25 MHz longitudinal or shear waves through the test article. Discontinuities reflect or diffract the wavefront; time-of-flight and amplitude analysis reveal flaw depth, size and through-wall position.',
    standards: ['ASME Section V', 'ASTM E164', 'ASTM E2375', 'ISO 16810', 'AWS D1.1', 'API 510 / 570 / 653'],
    applications: [
      'Wall-thickness surveys on in-service pressure piping (API 570)',
      'Pre- and in-service weld inspection on pressure vessels (ASME Section VIII)',
      'Corrosion mapping on storage tank shells and floors (API 653)',
      'Forging and casting volumetric inspection',
      'Bond-line inspection on composite laminates',
    ],
    advantages: [
      'Single-sided access — no need to enter or open the asset',
      'Quantitative thickness and flaw-depth data, not just go/no-go',
      'Immediate result — no film processing latency',
      'No ionising radiation; minimal exclusion zone',
    ],
    limitations: [
      'Operator-dependent; requires ASNT Level II / III currency',
      'Couplant required, complicating overhead or remote access',
      'Coarse-grained austenitic welds reduce signal-to-noise ratio',
    ],
  },
  {
    slug: 'radiographic-testing',
    name: 'Radiographic Testing',
    abbreviation: 'RT',
    shortDescription:
      'Ionising-radiation imaging (X-ray or gamma) of internal weld structure on film or digital detector.',
    principle:
      'A radiation source (X-ray tube, Ir-192 or Co-60) projects through the test piece onto a film or DDA. Differential absorption maps internal density variations — porosity, slag, cracks, lack of fusion — onto the recorded image.',
    standards: ['ASME Section V', 'ASTM E94', 'ASTM E1032', 'ISO 17636', 'API 1104'],
    applications: [
      'Pipeline girth-weld inspection per API 1104',
      'Pressure-vessel longitudinal and circumferential welds per ASME Section VIII',
      'Casting volumetric inspection on safety-critical components',
      'Corrosion-under-insulation profile imaging',
    ],
    advantages: [
      'Permanent imaging record for audit retention',
      'Excellent at volumetric defects (porosity, inclusions)',
      'Less operator-dependent than UT',
    ],
    limitations: [
      'Exclusion zones disrupt other site work',
      'Two-sided access typically required',
      'Source licensing under NRC / state regulators or international equivalents',
      'Planar defects parallel to the beam can be missed',
    ],
  },
  {
    slug: 'magnetic-particle-testing',
    name: 'Magnetic Particle Testing',
    abbreviation: 'MT',
    shortDescription:
      'Surface and near-surface crack detection on ferromagnetic materials via magnetic flux leakage.',
    principle:
      'The test piece is magnetised by yoke, prod or coil. Discontinuities disturb the magnetic flux; visible or fluorescent ferromagnetic particles applied to the surface concentrate at the leakage field, outlining the defect.',
    standards: ['ASTM E709', 'ASTM E1444', 'ASME Section V', 'ISO 9934', 'AWS D1.1'],
    applications: [
      'Structural weld inspection per AWS D1.1',
      'Forging and casting surface examination',
      'In-service fatigue-crack detection on rotating equipment',
      'Drill-pipe and tubular surface inspection',
    ],
    advantages: [
      'Rapid surface coverage with minimal preparation',
      'Effective through thin non-conductive coatings',
      'Low equipment cost relative to other methods',
    ],
    limitations: [
      'Ferromagnetic materials only — no austenitic stainless, no aluminium',
      'Detects surface and near-surface only',
      'Demagnetisation required post-inspection on machined parts',
    ],
  },
  {
    slug: 'penetrant-testing',
    name: 'Liquid Penetrant Testing',
    abbreviation: 'PT',
    shortDescription:
      'Capillary-action surface flaw detection on any non-porous material using dye or fluorescent penetrant.',
    principle:
      'A liquid penetrant is applied to the surface and allowed to dwell. Excess is removed and a developer applied; the developer draws penetrant from any surface-breaking discontinuity, producing a visible or fluorescent indication.',
    standards: ['ASTM E165', 'ASTM E1417', 'ASME Section V', 'ISO 3452', 'AMS 2644'],
    applications: [
      'Weld surface examination on austenitic stainless piping',
      'Aerospace and aero-engine component inspection',
      'Casting and forging surface examination',
      'Leak-path verification on finished components',
    ],
    advantages: [
      'Material-agnostic — works on any non-porous substrate',
      'Low equipment cost, highly portable',
      'High sensitivity in fluorescent mode',
    ],
    limitations: [
      'Detects surface-breaking defects only',
      'Surface cleanliness is critical; multi-step process',
      'Temperature window typically 10–52 °C',
    ],
  },
  {
    slug: 'visual-testing',
    name: 'Visual Testing',
    abbreviation: 'VT',
    shortDescription:
      'Code-required direct or remote visual examination of as-fabricated and in-service surfaces.',
    principle:
      'Direct or aided observation (borescope, drone, camera) of surfaces against acceptance criteria for weld profile, surface condition, dimensional compliance and alignment. Required as a pre-step by virtually every other NDT method.',
    standards: ['AWS D1.1', 'ASME Section V', 'API 510 / 570 / 653', 'ISO 17637'],
    applications: [
      'Pre-weld fit-up and post-weld acceptance per AWS D1.1',
      'In-service external corrosion and coating condition surveys',
      'Internal tank inspection via remote visual (borescope, RVI drone)',
      'Pressure-vessel inspection program kickoff per API 510',
    ],
    advantages: [
      'Lowest-cost NDT method; always part of an inspection plan',
      'No special equipment required for direct VT',
      'Code-required first step before more advanced methods',
    ],
    limitations: [
      'Surface conditions only',
      'Inspector vision acuity and lighting drive reliability',
      'Subjective interpretation requires clear acceptance criteria',
    ],
  },
  {
    slug: 'phased-array-ut',
    name: 'Phased Array Ultrasonic Testing',
    abbreviation: 'PAUT',
    shortDescription:
      'Multi-element ultrasonic imaging with electronic beam steering for advanced weld and corrosion mapping.',
    principle:
      'A 16- to 128-element transducer is fired with controlled time delays to steer and focus the ultrasonic beam electronically. Sectorial (S-scan) and linear (L-scan) imaging produce real-time cross-sections; encoded scanning produces permanent digital records.',
    standards: ['ASME Section V', 'ISO 13588', 'ISO 19285', 'ASTM E2491', 'DNV-ST-F101'],
    applications: [
      'Code-case substitute for RT on pipeline girth welds',
      'Critical-weld inspection on pressure vessels and piping',
      'Corrosion mapping with C-scan visualisation',
      'Component-thickness and flaw-sizing on composites',
    ],
    advantages: [
      'Permanent encoded digital record for audit retention',
      'Higher probability of detection vs conventional UT',
      'Replaces RT on many scopes — no radiation exclusion zone',
      'Real-time S-scan and C-scan visualisation',
    ],
    limitations: [
      'Higher equipment cost than conventional UT',
      'Requires Level II PAUT certification plus base UT currency',
      'Procedure development and qualification overhead',
    ],
  },
];

function findMethod(slug: string): MethodSpec | undefined {
  return METHODS.find((m) => m.slug === slug);
}

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: Array<{ city: string; slug: string }> = [];
  for (const city of PUBLISHABLE_CITIES) {
    for (const method of METHODS) {
      params.push({ city: city.slug, slug: method.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, slug } = await params;
  const city = findPublishableCity(citySlug);
  const method = findMethod(slug);
  if (!city || !method) return { title: 'Not Found' };

  const stateLabel = city.country === 'US' || city.country === 'CA' ? city.state : city.country;
  // Title rewrite (SEO sprint 2026-05-15): lead with user intent (free quote,
  // mobilisation window, certified providers) so the SERP snippet reads as a
  // service offering rather than a generic method label. 90d GSC: pages like
  // /ndt-services/houston/radiographic-testing rank pos 13 with 96 impr at
  // 0% CTR — title was descriptive but had no action verb to click on.
  // Title rewrite (2026-05-29): drop 'Free Quotes in 24h' (May-15 added it,
  // CTR fell); year bracket + 'Local' to match geo-intent queries.
  const title = `${method.abbreviation} Inspection ${city.name} [${new Date().getFullYear()}] — Local Certified Providers`;
  const description =
    `${city.name}, ${stateLabel} certified ${method.name} (${method.abbreviation}) inspectors: ${method.standards.slice(0, 2).join(' / ')} compliant, ` +
    `mobilisation 24–72 h, ${city.industries.slice(0, 2).join(' & ')} sites covered. Get quotes from local providers.`;

  return {
    title,
    description,
    keywords: [
      `${method.name} ${city.name}`,
      `${method.abbreviation} ${city.name}`,
      `${method.abbreviation} inspection ${city.name}`,
      `NDT ${method.abbreviation} ${city.name}, ${city.state}`,
      `${city.industries[0]} ${method.abbreviation}`,
      `${method.name} ${city.region.replace(/-/g, ' ')}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/ndt-services/${citySlug}/${slug}`,
      type: 'website',
      siteName: 'NDT Connect',
      images: ['https://ndt-connect.com/opengraph-image'],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['https://ndt-connect.com/opengraph-image'] },
    alternates: {
      canonical: `https://ndt-connect.com/ndt-services/${citySlug}/${slug}`,
    },
  };
}

function buildMethodInCityCopy(city: City, method: MethodSpec): string {
  const fac1 = city.namedFacilities[0];
  const fac2 = city.namedFacilities[1];
  const code = city.codeAuthorities[0];
  return (
    `${method.name} in ${city.name} is most often pulled into scope when ${city.industries[0].toLowerCase()} ` +
    `or ${city.industries[1]?.toLowerCase() ?? 'pressure-equipment'} operators need ${code}-grade evidence ` +
    `that an asset is fit for continued service. The recurring sites — ${fac1?.name ?? 'major local operators'} ` +
    `${fac2 ? `and ${fac2.name}` : ''} — write ${method.abbreviation} into pre-job inspection plans because ` +
    `${method.shortDescription.toLowerCase()} Local contractors mobilise calibrated equipment, current ASNT ` +
    `Level II / III credentials, and procedure packages tied to ${method.standards.slice(0, 2).join(' and ')}.`
  );
}

function buildFaqs(city: City, method: MethodSpec): { q: string; a: string }[] {
  const fac1 = city.namedFacilities[0]?.name ?? 'major local operators';
  return [
    {
      q: `When is ${method.abbreviation} the right method in ${city.name}?`,
      a:
        `${method.abbreviation} is selected when ${method.applications[0].toLowerCase()}. ` +
        `In ${city.name}, this is the everyday scope at sites like ${fac1}, where ${city.codeAuthorities[0]} ` +
        `acceptance criteria drive method selection.`,
    },
    {
      q: `Which standards govern ${method.abbreviation} work in ${city.name}?`,
      a:
        `${method.name} inspections in ${city.name} reference ${method.standards.join(', ')}. ` +
        `Procedure qualification typically rolls up to ${city.codeAuthorities[0]}.`,
    },
    {
      q: `What are the limitations of ${method.abbreviation} I should plan for?`,
      a: method.limitations.join('. ') + '.',
    },
    {
      q: `Do ${city.name} providers offer encoded / digital ${method.abbreviation} records?`,
      a:
        `Yes. The NDT Connect provider pool serving ${city.name} delivers ${method.abbreviation} packages ` +
        `with encoded scans (where applicable), instrument-level calibration certificates, and Level II/III ` +
        `sign-off — sized to survive ${city.codeAuthorities[0]} audit retention.`,
    },
    {
      q: `How fast can ${method.abbreviation} crews mobilise in ${city.name}?`,
      a:
        `Routine ${method.abbreviation} scopes in ${city.name} are typically picked up within 24–72 hours ` +
        `of a posted request. Turnaround and outage support is negotiated against crew rotation — post the ` +
        `scope to NDT Connect to receive parallel quotes from certified ${city.name} providers.`,
    },
  ];
}

export default async function CitySlugPage({ params }: PageProps) {
  const { city: citySlug, slug } = await params;
  const city = findPublishableCity(citySlug);
  if (!city) notFound();
  const method = findMethod(slug);
  if (!method) notFound();

  const stateLabel = city.country === 'US' || city.country === 'CA' ? city.state : city.country;
  const methodInCityCopy = buildMethodInCityCopy(city, method);
  const nearby = nearestCities(city.slug, 5);
  const otherMethodsHere = METHODS.filter((m) => m.slug !== method.slug).slice(0, 4);

  // Per-(city, method) unique content body. Same composer used by the
  // /cost-guide route — see lib/content/city-method.ts. The composer's FAQs
  // become the page-level FAQ schema source so JSON-LD always reflects what
  // the user actually sees in the rendered accordion.
  const methodProfile = findMethodProfile(method.slug);
  const uniqueContent = methodProfile ? composeCityMethodContent(city, methodProfile) : null;

  // V2 content stack — preferred when both city and method are present in
  // the rich datasets. The FAQ source priority used by the JSON-LD schema
  // is: v2 rich-data > v1 composer > legacy static.
  const v2Content = generateCityMethodContent(city.slug, method.slug);
  const faqs = v2Content
    ? v2Content.cityFAQ.map((f) => ({ q: f.question, a: f.answer }))
    : uniqueContent
    ? uniqueContent.faqs
    : buildFaqs(city, method);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${method.name} in ${city.name}`,
    description: `${method.abbreviation} inspection services in ${city.name}, ${stateLabel}`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'AdministrativeArea', name: stateLabel },
    },
    provider: { '@type': 'Organization', name: 'NDT Connect', url: 'https://ndt-connect.com' },
    serviceType: method.name,
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
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: 'https://ndt-connect.com' },
          { name: 'NDT Services', url: 'https://ndt-connect.com/ndt-services' },
          { name: city.name, url: `https://ndt-connect.com/ndt-services/${city.slug}` },
          {
            name: method.name,
            url: `https://ndt-connect.com/ndt-services/${city.slug}/${method.slug}`,
          },
        ]}
      />

      <div className="space-y-16">
        {/* Breadcrumb */}
        <div className="bg-white/95 py-4 px-0 sticky top-0 z-40 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="container">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-primary hover:text-primary/80 font-medium transition">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <Link
                href={`/ndt-services/${city.slug}`}
                className="text-primary hover:text-primary/80 font-medium transition"
              >
                {city.name}
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <Link
                href={`/services/${method.slug}`}
                className="text-primary hover:text-primary/80 font-medium transition"
              >
                {method.name}
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500">
                {method.abbreviation} in {city.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden pt-20 pb-20 bg-gradient-to-br from-[#003680] via-[#004aad] to-[#0066ff]">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          ></div>
          <div className="container relative z-10">
            <div className="max-w-4xl">
              <div className="inline-block mb-6 px-4 py-2 bg-white/15 rounded-full text-sm font-semibold text-white border border-white/30 backdrop-blur-sm">
                {method.abbreviation} services in {city.name}, {stateLabel}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white drop-shadow-md">
                {method.name} in {city.name}
              </h1>
              <p className="text-xl text-white/95 mb-6 leading-relaxed max-w-3xl">
                {method.shortDescription}
              </p>
              <blockquote className="border-l-4 border-white/60 pl-4 italic text-white/90 max-w-3xl mb-8">
                {city.localPainQuote}
              </blockquote>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/request-service"
                  className="px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-slate-100 transition text-center shadow-lg"
                >
                  Request a {method.abbreviation} quote
                </Link>
                <Link
                  href={`/services/${method.slug}`}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/20 text-white border border-white/40 transition text-center"
                >
                  Method reference: {method.abbreviation}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stat strip — visual anchor under hero */}
        <section className="container -mt-8 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="text-center border-r border-slate-100 last:border-r-0 md:border-r">
              <div className="text-3xl font-extrabold text-primary">{city.industries.length}</div>
              <div className="text-xs font-medium text-slate-600 uppercase tracking-wide mt-1">Local industries</div>
            </div>
            <div className="text-center border-r border-slate-100 last:border-r-0 md:border-r">
              <div className="text-3xl font-extrabold text-primary">{city.namedFacilities.length}+</div>
              <div className="text-xs font-medium text-slate-600 uppercase tracking-wide mt-1">Named facilities</div>
            </div>
            <div className="text-center border-r border-slate-100 last:border-r-0 md:border-r">
              <div className="text-3xl font-extrabold text-primary">T{city.tier}</div>
              <div className="text-xs font-medium text-slate-600 uppercase tracking-wide mt-1">Labour band</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-primary">{city.codeAuthorities.length}</div>
              <div className="text-xs font-medium text-slate-600 uppercase tracking-wide mt-1">Code authorities</div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Method overview */}
        <section className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold mb-6 text-primary">
                How {method.name} works
              </h2>
              <p className="text-base text-slate-700 mb-6 leading-relaxed">{method.principle}</p>
              <h3 className="text-2xl font-bold mb-4 text-primary">
                {method.abbreviation} in {city.name}
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">{methodInCityCopy}</p>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-8 h-fit border border-primary/20">
              <h3 className="font-bold mb-6 flex items-center text-xl text-primary">
                <Zap className="w-6 h-6 mr-3" />
                Quick facts
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-800">
                    <strong className="text-primary">Method:</strong> {method.abbreviation} —{' '}
                    {method.name}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-800">
                    <strong className="text-primary">Service area:</strong> {city.name}, {stateLabel}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-800">
                    <strong className="text-primary">Primary industries:</strong>{' '}
                    {city.industries.slice(0, 2).join(', ')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-800">
                    <strong className="text-primary">Key standards:</strong>{' '}
                    {method.standards.slice(0, 2).join(', ')}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Local applications */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 text-primary text-center">
            Where {method.abbreviation} shows up on {city.name} jobs
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold mb-4 flex items-center text-primary">
                <Target className="w-6 h-6 mr-3" />
                Industry relevance
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                {city.industries.slice(0, 2).join(' and ')} operators in {city.name} pull{' '}
                {method.abbreviation} into routine and turnaround scopes. The named recurring sites
                include {city.namedFacilities.slice(0, 2).map((f) => f.name).join(' and ')}.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Acceptance criteria are written against {city.codeAuthorities[0]} and ratified at
                Level III sign-off for procedure qualification.
              </p>
            </div>
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold mb-4 flex items-center text-primary">
                <Shield className="w-6 h-6 mr-3" />
                Compliance and safety
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                {method.name} inspections in {city.name} reference{' '}
                {method.standards.slice(0, 3).join(', ')}. Site-specific qualification matrices add
                operator-specific requirements on top.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Working with NDT Connect-listed providers ensures Level II/III currency,
                instrument-level calibration traceability, and digital record packages that survive
                audit retention demands.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Named facilities */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 text-primary text-center">
            Named {city.name} facilities served
          </h2>
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
            <p className="text-slate-700 mb-8 leading-relaxed text-lg">
              {method.name} scopes in {city.name} recur at the following operators and sites.
              Local contractors are pre-qualified at most of these gates.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {city.namedFacilities.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-start p-4 bg-white rounded-xl border border-slate-200 shadow-sm"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">{f.name}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {f.type} — {method.abbreviation} scope routine
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Applicable standards */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 text-primary text-center">
            Applicable standards and codes
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-center text-lg">
            {method.name} inspections in {city.name} are written and accepted against:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {method.standards.map((s) => (
              <div
                key={s}
                className="bg-white rounded-xl p-5 border border-primary/20 shadow-sm flex items-center gap-3"
              >
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="font-semibold text-sm text-slate-900">{s}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-3 text-primary text-center">
              Local code authorities
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {city.codeAuthorities.map((c, i) => (
                <Badge
                  key={i}
                  className="border border-primary/30 bg-primary/10 text-primary font-medium py-2 px-4"
                >
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Advantages + applications */}
        <section className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Why {method.abbreviation} is chosen
              </h2>
              <ul className="space-y-3">
                {method.advantages.map((a, i) => (
                  <li
                    key={i}
                    className="flex items-start p-4 bg-white rounded-xl border border-slate-200 shadow-sm"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-800">{a}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Typical applications
              </h2>
              <ul className="space-y-3">
                {method.applications.map((a, i) => (
                  <li
                    key={i}
                    className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-sm text-slate-800 flex items-start gap-3"
                  >
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Unique per-(city, method) content body. V2 stack (rich datasets in
            data/cities.json + data/methods.json) is preferred; v1 composer
            (lib/content/city-method.ts) is the fallback when those entries
            are not yet present. Both render their own FAQ accordion as the
            final block, so the standalone FAQ further down only renders in
            the legacy fallback path. */}
        {v2Content ? (
          <section className="container">
            <CityMethodContentBlocksV2 content={v2Content} />
          </section>
        ) : uniqueContent && methodProfile ? (
          <section className="container">
            <CityMethodContentBlocks
              city={city}
              method={methodProfile}
              prebuilt={uniqueContent}
              variant="full"
            />
          </section>
        ) : (
          <section className="container">
            <h2 className="text-4xl font-bold mb-12 text-primary text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
                >
                  <h3 className="font-bold text-lg mb-3 text-primary">{f.q}</h3>
                  <p className="text-slate-700 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="section-divider"></div>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-3xl p-12 md:p-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/30 via-transparent to-[#004aad]/10"></div>
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Ready for {method.abbreviation} inspection in {city.name}?
            </h2>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              Connect with certified {method.abbreviation} providers in {city.name}. Parallel
              quotes, traceable calibration, audit-grade records.
            </p>
            <Link
              href="/request-service"
              className="px-10 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition shadow-lg inline-block"
            >
              Get a free quote today
            </Link>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Other methods in this city */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8 text-primary text-center">
            Other NDT methods in {city.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {otherMethodsHere.map((m) => (
              <Link
                key={m.slug}
                href={`/ndt-services/${city.slug}/${m.slug}`}
                className="bg-white rounded-2xl p-6 border border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all group block"
              >
                <h3 className="font-bold text-xl mb-2 text-primary group-hover:text-emerald-600 transition">
                  {m.name}
                </h3>
                <p className="text-sm text-slate-600 mb-3">{m.abbreviation}</p>
                <p className="text-sm text-slate-700 leading-relaxed">{m.shortDescription}</p>
                <div className="mt-4 flex items-center gap-2 text-primary text-sm font-semibold">
                  {m.abbreviation} in {city.name} <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {nearby.length > 0 && <div className="section-divider"></div>}

        {/* Same method, nearest cities */}
        {nearby.length > 0 && (
          <section className="container">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">
              {method.name} in nearby cities
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  href={`/ndt-services/${c.slug}/${method.slug}`}
                  className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col items-center gap-2 text-center text-sm"
                >
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground group-hover:text-primary transition">
                    {method.abbreviation} in {c.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    {c.country === 'US' || c.country === 'CA' ? c.state : c.country}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <CityDataAnchors citySlug={citySlug} methodAbbr={method.abbreviation} />
        <CornerstoneLinks methodAbbr={method.abbreviation} />
      </div>
    </>
  );
}




