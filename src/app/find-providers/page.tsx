
// src/app/find-providers/page.tsx
"use client";

import { ProviderCard } from "@/components/client/ProviderCard";
import type { ServiceProvider } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ShieldCheck, List, Map as MapIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MapPlaceholder } from "@/components/shared/MapPlaceholder";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const mockProviders: ServiceProvider[] = [
  { id: '1', name: 'Advanced NDT Solutions', location: 'Houston, TX', services: ['Ultrasonic Testing', 'Magnetic Particle Testing', 'Radiographic Testing'], specialization: 'Oil & Gas Pipelines', rating: 4.8, contactInfo: '(123) 456-7890', description: 'Leading provider of NDT services for the energy sector.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "industrial site", baseRate: 85, certifications: ["ISO 9001", "API Q1"], personnelQualifications: ["ASNT NDT Level III UT, MT, PT", "AWS CWI"], isVerified: true },
  { id: '2', name: 'Precision Inspections Inc.', location: 'Los Angeles, CA', services: ['Eddy Current Testing', 'Liquid Penetrant Testing'], specialization: 'Aerospace Components', rating: 4.5, contactInfo: '(987) 654-3210', description: 'Specialized in high-precision aerospace inspections.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "factory interior", baseRate: 120, certifications: ["Nadcap NDT", "AS9100"], personnelQualifications: ["NAS 410 Level II ET, PT"], isVerified: true },
  { id: '3', name: 'InfraTest Group', location: 'New York, NY', services: ['Visual Testing', 'Leak Testing', 'Acoustic Emission Testing'], specialization: 'Civil Infrastructure', rating: 4.2, contactInfo: '(555) 123-4567', description: 'Ensuring the safety and integrity of critical infrastructure.', imageUrl: "", dataAiHint: "bridge structure", baseRate: 70, certifications: ["ISO/IEC 17025"], personnelQualifications: ["ASNT NDT Level II VT"], isVerified: false },
  { id: '4', name: 'TechScan NDT', location: 'Chicago, IL', services: ['Phased Array UT', 'Time-of-Flight Diffraction'], specialization: 'Manufacturing Quality Control', rating: 4.9, contactInfo: '(312) 555-0011', description: 'Cutting-edge NDT for manufacturing excellence.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "modern factory", baseRate: 110, certifications: ["ISO 9001"], personnelQualifications: ["ASNT NDT Level III PAUT, TOFD"], isVerified: true},
  { id: '5', name: 'Coastal Integrity Checks', location: 'Houston, TX', services: ['Magnetic Particle Testing', 'Visual Testing'], specialization: 'Maritime & Offshore', rating: 4.3, contactInfo: '(281) 555-9000', description: 'Specialized NDT for offshore structures and vessels.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "offshore platform", baseRate: 95, certifications: ["DNV Approved", "ABS Certified"], personnelQualifications: ["ASNT NDT Level II MT, VT", "API QUTE"], isVerified: false },
];

type ViewMode = "list" | "map";

export default function FindProvidersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>(mockProviders);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/find-providers");
    } else if (user && user.role !== 'client') {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    setFilteredProviders(
      mockProviders.filter(provider => {
        const matchesSearchTerm =
          provider.name.toLowerCase().includes(lowerSearchTerm) ||
          provider.location.toLowerCase().includes(lowerSearchTerm) ||
          provider.specialization.toLowerCase().includes(lowerSearchTerm) ||
          provider.services.some(service => service.toLowerCase().includes(lowerSearchTerm)) ||
          (provider.certifications || []).some(cert => cert.toLowerCase().includes(lowerSearchTerm)) ||
          (provider.personnelQualifications || []).some(qual => qual.toLowerCase().includes(lowerSearchTerm));
        
        const matchesVerificationFilter = filterVerifiedOnly ? provider.isVerified === true : true;

        return matchesSearchTerm && matchesVerificationFilter;
      })
    );
  }, [searchTerm, filterVerifiedOnly]);

  if (loading || (!user && !loading)) {
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
        <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, location, service, specialization, certification..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline"> 
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
            <ToggleGroup 
              type="single" 
              value={viewMode} 
              onValueChange={(value: ViewMode) => { if (value) setViewMode(value);}}
              aria-label="View mode"
            >
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="h-4 w-4 mr-2" /> List
              </ToggleGroupItem>
              <ToggleGroupItem value="map" aria-label="Map view">
                <MapIcon className="h-4 w-4 mr-2" /> Map
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="verifiedOnly" 
            checked={filterVerifiedOnly} 
            onCheckedChange={(checked) => setFilterVerifiedOnly(checked as boolean)}
          />
          <Label htmlFor="verifiedOnly" className="flex items-center text-sm font-medium">
            <ShieldCheck className="h-4 w-4 mr-1 text-green-600" /> Show Verified Providers Only
          </Label>
        </div>
      </section>

      {viewMode === "list" && (
        filteredProviders.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No providers found matching your criteria.</p>
          </div>
        )
      )}

      {viewMode === "map" && (
        <div className="space-y-6">
          <MapPlaceholder />
          {filteredProviders.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Filtered Providers ({filteredProviders.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProviders.slice(0, 4).map((provider) => ( 
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
              {filteredProviders.length > 4 && <p className="text-sm text-muted-foreground mt-2">And {filteredProviders.length - 4} more providers...</p>}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-muted-foreground">No providers found matching your criteria to display on map.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
