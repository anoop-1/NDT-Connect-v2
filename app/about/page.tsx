// src/app/about/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Eye, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About NDT Connect | The Leading NDT Inspection Marketplace',
  description: 'NDT Connect is the world\'s leading marketplace for non-destructive testing services. We connect asset owners with certified NDT inspectors for UT, RT, MT, PT, and more.',
  keywords: ['about NDT Connect', 'NDT marketplace', 'NDT platform', 'non-destructive testing marketplace', 'NDT service provider platform'],
  openGraph: {
    title: 'About NDT Connect',
    description: 'The leading marketplace connecting asset owners with certified NDT inspectors worldwide.',
    url: 'https://ndt-connect.com/about',
  },
  alternates: { canonical: 'https://ndt-connect.com/about' },
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg shadow-sm">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            About NDT Connect
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Facilitating seamless connections between Non-Destructive Testing (NDT) service providers and clients who require specialized inspection services.
          </p>
        </div>
      </section>

      <section className="container grid md:grid-cols-2 gap-12 items-center">
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

      <section className="container py-12">
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