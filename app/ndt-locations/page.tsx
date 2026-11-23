import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { allLocationsByCountry, CITY_HUBS } from '@/lib/content/city-hubs';

export const metadata: Metadata = {
  title: 'NDT Services by City: Inspection Companies, Training & Jobs Worldwide',
  description: 'Find NDT inspection companies, training and jobs in 300+ industrial cities across the USA, Middle East, India, Asia, the Americas, Europe and Africa.',
  alternates: { canonical: 'https://ndt-connect.com/ndt-locations' },
};

export default function LocationsPage() {
  const groups = allLocationsByCountry();
  const total = groups.reduce((n, g) => n + g.cities.length, 0);
  return (
    <div className="mx-auto max-w-6xl py-8">
      <nav className="mb-4 text-sm text-muted-foreground"><Link href="/" className="hover:underline">Home</Link> / <span className="text-foreground">NDT Locations</span></nav>
      <h1 className="text-3xl font-bold md:text-4xl">NDT services by city</h1>
      <p className="mt-3 max-w-3xl text-lg text-slate-700">NDT-Connect covers {total} industrial cities in {groups.length} countries, wherever refineries, pipelines, shipyards, power plants and aerospace plants need inspection. Pick a city to see local industries, codes, rates, training and certified providers.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button asChild size="lg"><Link href="/request-service">Request an inspection quote <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        <Button asChild size="lg" variant="outline"><Link href="/claim">List your company free</Link></Button>
      </div>
      <div className="mt-8 flex flex-wrap gap-2 text-sm">{groups.map(g => <a key={g.slug} href={`#${g.slug}`} className="rounded-full border px-3 py-1 text-slate-600 hover:border-brand hover:text-brand">{g.country} ({g.cities.length})</a>)}</div>
      <div className="mt-10 space-y-10">
        {groups.map(g => (
          <section key={g.slug} id={g.slug} className="scroll-mt-24">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold"><MapPin className="h-5 w-5 text-brand" />NDT services in {g.country}</h2>
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {g.cities.map(c => <li key={c.slug}><Link href={`/ndt-services/${c.slug}`} className="text-slate-700 hover:text-brand hover:underline">{c.name}</Link>{c.isNew && <span className="ml-1.5 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-brand">Guide</span>}</li>)}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-12 text-sm text-muted-foreground">{CITY_HUBS.length} cities have full local guides (marked "Guide") with cited industry, code, rate and training detail. More are added every week.</p>
    </div>
  );
}
