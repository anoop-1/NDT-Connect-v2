import type { Metadata } from 'next';
import Link from 'next/link';
import ProviderSearch from '@/components/client/ProviderSearch';
import { BreadcrumbSchema, FAQSchema } from '@/components/seo/SchemaMarkup';
import JoinCTA from '@/components/seo/JoinCTA';
import { Search, ShieldCheck, MessageSquare, MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Find NDT Inspection Companies & Providers Near You [2026]',
  description:
    'Search and hire vetted NDT inspection companies and freelance inspectors — filter by method (UT, PAUT, RT, MT, PT, ET), certification (ASNT, API, ISO 17020), and location. Free to browse; most providers quote within 24 hours.',
  alternates: { canonical: 'https://ndt-connect.com/find-providers' },
  openGraph: {
    title: 'Find NDT Inspection Companies & Providers Near You [2026]',
    description: 'Search vetted NDT companies and freelance inspectors by method, certification, and location. Free to browse, quotes in ~24h.',
    url: 'https://ndt-connect.com/find-providers',
    type: 'website',
  },
};

const FAQS = [
  { q: 'How do I find an NDT inspection company near me?', a: 'Search the NDT Connect directory by city, method, and certification. Browsing is free and requires no signup. Filter to verified providers, then request a quote — most respond within 24 hours. You can also browse by city from the NDT services pages.' },
  { q: 'How do I verify an NDT provider\'s certifications?', a: 'Each profile lists company certifications (API Q1, ISO 17020/17025, Nadcap, IACS class society) and personnel qualifications (ASNT SNT-TC-1A, ISO 9712/PCN, CSWIP, NAS 410). Look for the "Verified" badge, which means NDT Connect has checked the credentials against the relevant rosters.' },
  { q: 'What does NDT inspection cost?', a: 'US field rates run from about $125–$375/hr for visual testing up to $400–$1,300/hr for phased array, with region, certification level, and shift moving the price. See the NDT inspection cost index and per-city cost guides for detail, or request quotes to compare real numbers.' },
  { q: 'How fast can I get quotes?', a: 'Post your scope or contact providers directly and most respond within 24 hours. Quoting identical scope to 2–3 vetted providers gives you a defensible comparison on price, basis (hourly vs day vs per-weld), and certification level.' },
  { q: 'Is NDT Connect free to use?', a: 'Yes — browsing providers and inspectors is free with no signup, and posting a job to receive quotes is free for clients. Providers and inspectors list a profile free as well.' },
];

const TOP_CITIES = [
  ['houston-tx', 'Houston'], ['los-angeles-ca', 'Los Angeles'], ['new-york-ny', 'New York'],
  ['chicago-il', 'Chicago'], ['london-uk', 'London'], ['dubai-ae', 'Dubai'],
  ['singapore-sg', 'Singapore'], ['perth-au', 'Perth'], ['mumbai-in', 'Mumbai'], ['aberdeen-uk', 'Aberdeen'],
];
const METHODS = [
  ['ultrasonic-testing', 'Ultrasonic (UT)'], ['phased-array-ut', 'Phased Array (PAUT)'],
  ['radiographic-testing', 'Radiographic (RT)'], ['magnetic-particle-testing', 'Magnetic Particle (MT)'],
  ['penetrant-testing', 'Penetrant (PT)'], ['eddy-current-testing', 'Eddy Current (ET)'],
];

export default function FindProvidersPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Find NDT Inspection Companies & Providers',
    description: metadata.description,
    url: 'https://ndt-connect.com/find-providers',
    about: { '@type': 'Service', serviceType: 'Non-Destructive Testing Inspection', provider: { '@type': 'Organization', name: 'NDT Connect' } },
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://ndt-connect.com' },
        { name: 'Find Providers', url: 'https://ndt-connect.com/find-providers' },
      ]} />
      <FAQSchema questions={FAQS.map(f => ({ question: f.q, answer: f.a }))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <div className="max-w-7xl mx-auto py-8 px-4 space-y-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-primary">Home</Link><span>/</span>
          <span className="text-foreground">Find Providers</span>
        </nav>

        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Find NDT Inspection Companies &amp; Providers Near You</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Search vetted NDT inspection companies and freelance inspectors across the US, UK, Gulf, India, and beyond —
            filter by method, certification, and location. Free to browse, no signup; most providers quote within 24 hours.
          </p>
        </header>

        {/* Live, searchable directory (client widget) */}
        <ProviderSearch />

        {/* How it works */}
        <section className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Search, title: 'Search & filter', body: 'By NDT method (UT, PAUT, RT, MT, PT, ET), company & personnel certification, and location.' },
            { icon: ShieldCheck, title: 'Vet credentials', body: 'See ASNT, API, ISO 17020/17025, Nadcap and class-society certs. Filter to Verified providers.' },
            { icon: MessageSquare, title: 'Request quotes', body: 'Contact providers or post your scope free — most respond within 24 hours.' },
          ].map((s) => (
            <div key={s.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <s.icon className="h-6 w-6 text-primary mb-2" />
              <h2 className="text-base font-semibold text-slate-900">{s.title}</h2>
              <p className="text-sm text-slate-600 mt-1">{s.body}</p>
            </div>
          ))}
        </section>

        {/* Browse by city + method (internal links) */}
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> NDT services by city</h2>
            <div className="grid grid-cols-2 gap-2">
              {TOP_CITIES.map(([slug, name]) => (
                <Link key={slug} href={`/ndt-services/${slug}`} className="text-sm text-slate-700 hover:text-primary inline-flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" /> NDT services in {name}
                </Link>
              ))}
            </div>
            <Link href="/ndt-services" className="text-sm text-primary underline mt-3 inline-block">All cities →</Link>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Providers by method</h2>
            <div className="grid grid-cols-2 gap-2">
              {METHODS.map(([slug, name]) => (
                <Link key={slug} href={`/services/${slug}`} className="text-sm text-slate-700 hover:text-primary inline-flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" /> {name}
                </Link>
              ))}
            </div>
            <Link href="/cost-guide" className="text-sm text-primary underline mt-3 inline-block">NDT inspection cost guides →</Link>
          </div>
        </section>

        {/* FAQ (visible + schema) */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How to find &amp; hire an NDT company</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="border-l-4 border-primary/30 pl-4">
                <p className="font-semibold text-slate-900 mb-1">{f.q}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <JoinCTA context="List your NDT company or inspector profile free and get found by clients searching here." />
      </div>
    </>
  );
}
