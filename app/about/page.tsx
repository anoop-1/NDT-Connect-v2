// src/app/about/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Eye, CheckCircle } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';

export const metadata: Metadata = {
  // Title rewrite (SEO sprint 2026-05-15): added concrete proof points
  // (180+ cities, certified providers, founded year) so the snippet earns
  // the click instead of just describing the page. Was 1.47% CTR.
  title: 'About NDT Connect — 180+ Cities, Certified Providers, Free Quotes in 24h',
  description: 'NDT Connect is the marketplace where asset owners hire certified NDT inspectors in 180+ cities. UT, RT, MT, PT, PAUT, TOFD providers — free quotes in 24h, no signup to browse rates.',
  keywords: ['about NDT Connect', 'NDT marketplace', 'NDT platform', 'non-destructive testing marketplace', 'NDT service provider platform'],
  openGraph: {
    title: 'About NDT Connect — 180+ Cities, Certified Providers, Free Quotes in 24h',
    description: 'The marketplace where asset owners hire certified NDT inspectors in 180+ cities. Free quotes in 24h.',
    url: 'https://ndt-connect.com/about',
    type: 'website',
    siteName: 'NDT Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About NDT Connect — 180+ Cities, Certified Providers, Free Quotes in 24h',
    description: 'Hire certified NDT inspectors in 180+ cities. Free quotes in 24h, no signup to browse rates.',
  },
  alternates: { canonical: 'https://ndt-connect.com/about' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NDT Connect',
  url: 'https://ndt-connect.com',
  logo: 'https://ndt-connect.com/logo.png',
  description: 'The world\'s first and only marketplace for non-destructive testing (NDT) inspection services. Connecting asset owners with certified NDT inspectors worldwide.',
  foundingDate: '2024',
  contactPoint: [
    { '@type': 'ContactPoint', telephone: '+1-281-840-8969', contactType: 'customer service', email: 'support@ndt-connect.com', availableLanguage: 'English' },
    { '@type': 'ContactPoint', telephone: '+1-281-840-8969', contactType: 'sales', email: 'partnerships@ndt-connect.com', availableLanguage: 'English' },
  ],
  address: { '@type': 'PostalAddress', addressLocality: 'Houston', addressRegion: 'TX', addressCountry: 'US' },
  sameAs: ['https://www.linkedin.com/company/ndt-connect'],
  areaServed: { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: 29.7604, longitude: -95.3698 }, geoRadius: '50000' },
  knowsAbout: ['Non-Destructive Testing', 'Ultrasonic Testing', 'Radiographic Testing', 'Magnetic Particle Testing', 'Liquid Penetrant Testing', 'NDT Inspection Services'],
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <PageHero
        title="About NDT Connect"
        description="Facilitating seamless connections between Non-Destructive Testing (NDT) service providers and clients who require specialized inspection services."
        breadcrumbs={[{ label: 'About' }]}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
            At NDT Connect, our mission is to revolutionize how NDT services are sourced and delivered. We aim to provide a reliable, efficient, and intelligent platform that empowers both clients and service providers. By leveraging technology, including AI-driven recommendations, we strive to ensure that every NDT requirement is met with the highest standards of quality and professionalism.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-2 bg-primary/10 rounded-full mr-4 shrink-0">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Efficiency</h3>
                <p className="text-muted-foreground text-sm">Streamlining the process of finding and scheduling NDT services.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 bg-primary/10 rounded-full mr-4 shrink-0">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Connectivity</h3>
                <p className="text-muted-foreground text-sm">Building a strong network of qualified NDT professionals and discerning clients.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 bg-primary/10 rounded-full mr-4 shrink-0">
                 <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Quality Assurance</h3>
                <p className="text-muted-foreground text-sm">Promoting high standards in NDT inspections through verified providers and transparent processes.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://placehold.co/500x500.png"
            alt="Team Collaboration"
            width={500}
            height={500}
            className="rounded-lg shadow-xl object-cover"
            data-ai-hint="team meeting"
          />
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-semibold text-center mb-10">Our Vision for the Future</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
          We envision NDT Connect as the leading global hub for all Non-Destructive Testing needs. A future where finding specialized NDT expertise is just a few clicks away, supported by intelligent tools that ensure optimal matches, project management ease, and continuous quality improvement across industries.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Eye className="h-10 w-10 text-primary mx-auto mb-2" />
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Continuously integrating cutting-edge technology to enhance user experience and service delivery.</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Users className="h-10 w-10 text-primary mx-auto mb-2" />
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Fostering a collaborative community of NDT professionals and industry stakeholders.</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
               <Target className="h-10 w-10 text-primary mx-auto mb-2" />
              <CardTitle>Global Reach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Expanding our network to connect expertise and needs across geographical boundaries.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
