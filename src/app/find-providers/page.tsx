// src/app/find-providers/page.tsx
"use client";

import { ProviderCard } from "@/components/client/ProviderCard";
import type { ServiceProvider } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const mockProviders: ServiceProvider[] = [
  { id: '1', name: 'Advanced NDT Solutions', location: 'Houston, TX', services: ['Ultrasonic Testing', 'Magnetic Particle Testing', 'Radiographic Testing'], specialization: 'Oil & Gas Pipelines', rating: 4.8, contactInfo: '(123) 456-7890', description: 'Leading provider of NDT services for the energy sector.', imageUrl: 'https://placehold.co/600x400.png?text=Advanced+NDT' , dataAihint: "industrial site" },
  { id: '2', name: 'Precision Inspections Inc.', location: 'Los Angeles, CA', services: ['Eddy Current Testing', 'Liquid Penetrant Testing'], specialization: 'Aerospace Components', rating: 4.5, contactInfo: '(987) 654-3210', description: 'Specialized in high-precision aerospace inspections.', imageUrl: 'https://placehold.co/600x400.png?text=Precision+Insp', dataAihint: "factory interior" },
  { id: '3', name: 'InfraTest Group', location: 'New York, NY', services: ['Visual Testing', 'Leak Testing', 'Acoustic Emission Testing'], specialization: 'Civil Infrastructure', rating: 4.2, contactInfo: '(555) 123-4567', description: 'Ensuring the safety and integrity of critical infrastructure.', imageUrl: 'https://placehold.co/600x400.png?text=InfraTest', dataAihint: "bridge structure" },
  { id: '4', name: 'TechScan NDT', location: 'Chicago, IL', services: ['Phased Array UT', 'Time-of-Flight Diffraction'], specialization: 'Manufacturing Quality Control', rating: 4.9, contactInfo: '(312) 555-0011', description: 'Cutting-edge NDT for manufacturing excellence.' , dataAihint: "modern factory"},
];

export default function FindProvidersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>(mockProviders);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/find-providers");
    } else if (user && user.role !== 'client') {
      // If user is a provider, redirect to their dashboard or home
      router.push("/dashboard"); 
    }
  }, [user, loading, router]);

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    setFilteredProviders(
      mockProviders.filter(provider =>
        provider.name.toLowerCase().includes(lowerSearchTerm) ||
        provider.location.toLowerCase().includes(lowerSearchTerm) ||
        provider.specialization.toLowerCase().includes(lowerSearchTerm) ||
        provider.services.some(service => service.toLowerCase().includes(lowerSearchTerm))
      )
    );
  }, [searchTerm]);

  if (loading || (!user && !loading)) { // Show loading if auth is loading or if redirect hasn't happened yet
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">Loading...</div>;
  }
  
  if (user && user.role !== 'client') {
    return <div className="text-center py-10">Access denied. This page is for clients.</div>;
  }


  return (
    <div className="space-y-8">
      <section className="bg-card p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-2">Find NDT Service Providers</h1>
        <p className="text-muted-foreground mb-6">
          Browse and connect with qualified Non-Destructive Testing professionals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, location, service, or specialization..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>
      </section>

      {filteredProviders.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No providers found matching your criteria.</p>
        </div>
      