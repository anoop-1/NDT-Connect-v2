import { Metadata } from 'next';
import Link from 'next/link';
import { PUBLISHABLE_CITIES, REGIONS, COUNTRIES } from '@/data/cities';
import { BreadcrumbListSchema } from '@/components/seo/SchemaMarkup';
import { MapPin, ArrowRight, Waves, Atom, Activity, Eye, Radar, Search } from 'lucide-react';

// ============================================================================
// /ndt-services — global hub.
//
// Existed only as the parent slug of dynamic city/method routes. With 1080
// child pages (180 cities × 6 methods) below this URL and nothing linking
// them together at the root, Google's crawl budget kept burning on the
// homepage and skipping the city tail. This page is the static internal-
// link hub that surfaces every publishable city + method + region + country
// in one indexable document.
// ============================================================================

export const metadata: Metadata = {
  title: 'NDT Inspection Services — UT, RT, MT, PT, PAUT in 180+ Cities',
  description:
    'Find certified NDT inspection services in 180+ cities worldwide. UT, RT, MT, PT, PAUT, TOFD — parallel quotes from verified providers, no signup to browse.',
  keywords: [
    'NDT inspection services', 'NDT services near me', 'NDT testing companies',
    'ultrasonic testing services', 'radiographic testing services',
    'magnetic particle testing services', 'liquid penetrant testing services',
    'phased array UT services', 'NDT inspection providers',
    'NDT services by city', 'NDT services by country',
  ],
  alternates: { canonical: 'https://ndt-connect.com/ndt-services' },
  openGraph: {
    title: 'NDT Inspection Services — UT, RT, MT, PT, PAUT in 180+ Cities',
    description: 'Find certified NDT inspection services worldwide. Parallel quotes from verified providers.',
    url: 'https://ndt-connect.com/ndt-services',
    type: 'website',
    siteName: 'NDT Connect',
  },
};

const METHODS = [
  { slug: 'ultrasonic-testing', name: 'Ultrasonic Testing', abbr: 'UT', icon: Waves,
    desc: 'High-frequency sound-wave inspection for wall thickness, weld integrity, and internal flaws.' },
  { slug: 'radiographic-testing', name: 'Radiographic Testing', abbr: 'RT', icon: Atom,
    desc: 'X-ray and gamma-ray imaging for internal defect detection in welds and castings.' },
  { slug: 'magnetic-particle-testing', name: 'Magnetic Particle Testing', abbr: 'MT', icon: Activity,
    desc: 'Surface and near-surface crack detection in ferromagnetic materials.' },
  { slug: 'penetrant-testing', name: 'Liquid Penetrant Testing', abbr: 'PT', icon: Eye,
    desc: 'Capillary-action surface flaw detection on non-porous materials.' },
  { slug: 'phased-array-ut', name: 'Phased Array UT', abbr: 'PAUT', icon: Radar,
    desc: 'Multi-element ultrasonic imaging with electronic beam steering.' },
  { slug: 'visual-testing', name: 'Visual Testing', abbr: 'VT', icon: Search,
    desc: 'Direct and remote visual examination — code-required first step on every inspection.' },
];

function citiesByCountry() {
  const map = new Map<string, typeof PUBLISHABLE_CITIES>();
  for (const c of PUBLISHABLE_CITIES) {
    const arr = map.get(c.country) ?? [];
    arr.push(c);
    map.set(c.country, arr);
  }
  return map;
}

function citiesByRegion() {
  const map = new Map<string, typeof PUBLISHABLE_CITIES>();
  for (const c of PUBLISHABLE_CITIES) {
    const arr = map.get(c.region) ?? [];
    arr.push(c);
    map.set(c.region, arr);
  }
  return map;
}

export default function NDTServicesHubPage() {
  const byCountry = citiesByCountry();
  const byRegion = citiesByRegion();
  const countryEntries = COUNTRIES
    .map((c) => ({ ...c, cities: (byCountry.get(c.code) ?? []) }))
    .filter((c) => c.cities.length > 0)
    .sort((a, b) => b.cities.length - a.cities.length);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'NDT Inspection Services by City',
    numberOfItems: PUBLISHABLE_CITIES.length,
    itemListElement: PUBLISHABLE_CITIES.slice(0, 50).map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://ndt-connect.com/ndt-services/${c.slug}`,
      name: `NDT Services in ${c.name}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: 'https://ndt-connect.com' },
          { name: 'NDT Services', url: 'https://ndt-connect.com/ndt-services' },
        ]}
      />

      <div className="space-y-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 bg-gradient-to-br from-[#003680] via-[#004aad] to-[#0066ff] rounded-3xl">
          <div className="container relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white drop-shadow-md">
              NDT Inspection Services in {PUBLISHABLE_CITIES.length}+ Cities
            </h1>
            <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed mb-8">
              Certified non-destructive testing providers worldwide. Post a job, get parallel
              quotes from verified UT, RT, MT, PT, PAUT, and TOFD contractors — no signup to browse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-service" className="px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-slate-100 transition shadow-lg">
                Request a free quote
              </Link>
              <Link href="/find-providers" className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/20 text-white border border-white/40 transition">
                Browse providers
              </Link>
            </div>
          </div>
        </section>

        {/* Methods */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-4 text-primary text-center">NDT methods we cover</h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            Every method below maps to a code-anchored service: ASME Section V, API 510/570/653,
            AWS D1.1, ASTM, ISO. Click through for the full method reference or jump straight to
            your city.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {METHODS.map((m) => {
              const Icon = m.icon;
              return (
                <Link key={m.slug} href={`/services/${m.slug}`}
                  className="bg-white rounded-2xl p-6 border border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all group block">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-primary group-hover:text-emerald-600 transition">
                        {m.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold">{m.abbr}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{m.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-primary text-sm font-semibold">
                    Method reference <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* By country */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-4 text-primary text-center">NDT services by country</h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            Every city below has a dedicated service page with named local facilities,
            applicable code authorities, and certified providers.
          </p>
          <div className="space-y-10">
            {countryEntries.map((c) => (
              <div key={c.code} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <h3 className="text-2xl font-bold text-primary">
                    NDT Inspection Services in {c.name}
                  </h3>
                  <span className="text-sm font-semibold text-slate-500 bg-slate-100 rounded-full px-3 py-1">
                    {c.cities.length} {c.cities.length === 1 ? 'city' : 'cities'}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {c.cities.map((city) => (
                    <Link key={city.slug} href={`/ndt-services/${city.slug}`}
                      className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-primary/5 rounded-lg border border-slate-100 hover:border-primary/30 transition text-sm">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-medium text-slate-800 truncate">{city.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* By US region */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 text-primary text-center">US regions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONS.map((r) => {
              const cities = byRegion.get(r.slug) ?? [];
              if (cities.length === 0) return null;
              return (
                <div key={r.slug} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-lg text-primary mb-3">{r.name}</h3>
                  <p className="text-xs text-slate-500 mb-3">{cities.length} cities</p>
                  <ul className="space-y-1.5">
                    {cities.slice(0, 8).map((city) => (
                      <li key={city.slug}>
                        <Link href={`/ndt-services/${city.slug}`}
                          className="text-sm text-slate-700 hover:text-primary hover:underline">
                          NDT services in {city.name}
                        </Link>
                      </li>
                    ))}
                    {cities.length > 8 && (
                      <li className="text-xs text-slate-400 pt-1">+{cities.length - 8} more</li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="container">
          <div className="relative overflow-hidden rounded-3xl p-12 md:p-20 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 border border-primary/20">
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                Need an NDT inspector now?
              </h2>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                Post your scope, code reference, and location. Receive parallel quotes from
                certified providers within 24–72 hours. No signup to browse rates.
              </p>
              <Link href="/request-service"
                className="px-10 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition shadow-lg inline-block">
                Request a free quote
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
