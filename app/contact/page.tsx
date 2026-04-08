import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, MessageSquare, Clock } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';

export const metadata: Metadata = {
  title: 'Contact NDT Connect | Get in Touch | NDT Marketplace Support',
  description: 'Contact NDT Connect for support, partnership inquiries, or questions about our NDT inspection marketplace. Available worldwide for asset owners and NDT service providers.',
  keywords: ['contact NDT Connect', 'NDT support', 'NDT marketplace contact', 'NDT inspection help'],
  openGraph: { 
    title: 'Contact NDT Connect', 
    description: 'Get in touch with NDT Connect for support, partnership inquiries, or questions about our NDT inspection marketplace.', 
    url: 'https://ndt-connect.com/contact',
    type: 'website',
    siteName: 'NDT Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact NDT Connect | Get in Touch | NDT Marketplace Support',
    description: 'Contact NDT Connect for support, partnership inquiries, or questions about our NDT inspection marketplace.',
  },
  alternates: { canonical: 'https://ndt-connect.com/contact' },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact NDT Connect',
  url: 'https://ndt-connect.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'NDT Connect',
    url: 'https://ndt-connect.com',
    telephone: '+1-281-840-8969',
    email: 'support@ndt-connect.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Houston', addressRegion: 'TX', addressCountry: 'US' },
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+1-281-840-8969', contactType: 'customer service', email: 'support@ndt-connect.com', availableLanguage: 'English' },
      { '@type': 'ContactPoint', contactType: 'sales', email: 'partnerships@ndt-connect.com', availableLanguage: 'English' },
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <PageHero
        title="Contact Us"
        description="Have questions about NDT Connect? We are here to help asset owners, NDT service providers, and anyone interested in our platform."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Email</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-2">For general inquiries and support:</p>
            <p className="font-medium">support@ndt-connect.com</p>
            <p className="text-muted-foreground text-sm mt-3 mb-2">For partnership and business inquiries:</p>
            <p className="font-medium">partnerships@ndt-connect.com</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> Response Time</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-2">We aim to respond to all inquiries within:</p>
            <p className="font-medium">24 hours (business days)</p>
            <p className="text-muted-foreground text-sm mt-3">For urgent inspection needs, post a service request directly on the platform for fastest response from providers.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Global Coverage</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">NDT Connect operates globally with providers in:</p>
            <ul className="text-sm mt-2 space-y-1">
              <li>Americas (USA, Canada, Latin America)</li>
              <li>Europe (UK, Norway, Netherlands, Germany)</li>
              <li>Middle East (UAE, Saudi Arabia, Qatar)</li>
              <li>Asia-Pacific (India, Singapore, Australia)</li>
              <li>Africa (Nigeria, South Africa, Kenya)</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5" /> Quick Help</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">Common questions answered:</p>
            <div className="space-y-2">
              <Link href="/faq" className="block text-sm text-primary hover:underline">Frequently Asked Questions</Link>
              <Link href="/services" className="block text-sm text-primary hover:underline">Available NDT Services</Link>
              <Link href="/tools/ndt-method-selector" className="block text-sm text-primary hover:underline">NDT Method Selector Tool</Link>
              <Link href="/register" className="block text-sm text-primary hover:underline">Create an Account</Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" /> Our Headquarters
        </h2>
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443086.6618498599!2d-95.68145027500001!3d29.817178350000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="NDT Connect Houston Office Location"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-3">Houston, Texas, USA &mdash; Serving clients and providers worldwide</p>
      </section>

      <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6 opacity-90">Join the NDT Connect marketplace today. Free for asset owners and providers.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" asChild><Link href="/register">Sign Up Free</Link></Button>
          <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild><Link href="/find-providers">Browse Providers</Link></Button>
        </div>
      </section>
    </div>
  );
}
