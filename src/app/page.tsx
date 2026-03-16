
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Search, Users, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

const DEFAULT_HOMEPAGE_IMAGE = "https://images.unsplash.com/photo-1632395627760-72e6eca7f9c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxN3x8ZWFydGh8ZW58MHx8fHwxNzQ4NDM3Mjc0fDA&ixlib=rb-4.1.0&q=80&w=1080";

export default function HomePage() {
  const [currentHomepageImage, setCurrentHomepageImage] = useState(DEFAULT_HOMEPAGE_IMAGE);

  useEffect(() => {
    // This code runs only on the client, after hydration
    const adminSetImageUrl = localStorage.getItem('customHomepageImageUrl');
    if (adminSetImageUrl) {
      setCurrentHomepageImage(adminSetImageUrl);
    } else {
      setCurrentHomepageImage(DEFAULT_HOMEPAGE_IMAGE); // Ensure default if nothing in localStorage
    }
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center py-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Welcome to NDT Connect
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted platform for Non-Destructive Testing services. Find expert providers or offer your specialized NDT skills.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/find-providers">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-semibold text-center mb-10">Why Choose NDT Connect?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Find Experts Easily</CardTitle>
              <CardDescription>Quickly locate qualified NDT service providers tailored to your specific needs and location.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Connect with Clients</CardTitle>
              <CardDescription>Service providers can reach a wider audience and manage service requests efficiently.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                 <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Reliable & Secure</CardTitle>
              <CardDescription>A secure platform ensuring reliable connections and transparent service processes.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Streamlined NDT Solutions</h2>
          <p className="text-muted-foreground mb-6">
            NDT Connect simplifies the process of finding and delivering Non-Destructive Testing services. From ultrasonic testing to radiographic inspections, connect with the right professionals.
          </p>
          <ul className="space-y-3 mb-6">
            {[
              "Intelligent provider recommendations",
              "Easy service request and scheduling",
              "Role-based interfaces for clients and providers",
              "Secure in-app communication channels (Coming Soon)"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Button asChild>
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </div>
        <div>
          <Image
            src={currentHomepageImage}
            alt="NDT Connect Platform"
            width={700}
            height={450}
            className="rounded-lg shadow-xl object-cover"
            data-ai-hint="NDT global connection"
            key={currentHomepageImage} // Add key to force re-render if URL changes
            priority // Added priority as it's likely a key visual element
          />
        </div>
      </section>
    </div>
  );
}
