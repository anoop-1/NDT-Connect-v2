import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, MessageSquare, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact NDT Connect | Get in Touch | NDT Marketplace Support',
  description: 'Contact NDT Connect for support, partnership inquiries, or questions about our NDT inspection marketplace. Available worldwide for asset owners and NDT service providers.',
  keywords: ['contact NDT Connect', 'NDT support', 'NDT marketplace contact', 'NDT inspection help'],
  openGraph: { title: 'Contact NDT Connect', description: 'Get in touch with NDT Connect.', url: 'https://ndt-connect.com/contact' },
  alternates: { canonical: 'https://ndt-connect.com/contact' },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-foreground">Contact</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Contact Us</h1>
      <p className="text-muted-foreground mb-10">
        Have questions about NDT Connect? We are here to help asset owners, NDT service providers, and anyone interested in our platform.
      </p>

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
