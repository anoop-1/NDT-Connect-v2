
// src/app/find-providers/page.tsx
"use client";

import { ProviderCard } from "@/components/client/ProviderCard";
import type { ServiceProvider } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ShieldCheck, List, Map as MapIcon, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { InteractiveMap } from "@/components/shared/InteractiveMap";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const mockProviders: ServiceProvider[] = [
  { id: '1', name: 'Advanced NDT Solutions', location: 'Houston, TX', lat: 29.7604, lng: -95.3698, services: ['Ultrasonic Testing', 'Magnetic Particle Testing', 'Radiographic Testing'], specialization: 'Oil & Gas Pipelines', rating: 4.8, contactInfo: '(123) 456-7890', description: 'Leading provider of NDT services for the energy sector.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "industrial site", baseRate: 85, certifications: ["ISO 9001", "API Q1"], personnelQualifications: ["ASNT NDT Level III UT, MT, PT", "AWS CWI"], isVerified: true, availableDocuments: ["General Procedures Manual", "ISO 9001 Certificate", "Technician Level III Certs"] },
  { id: '2', name: 'Precision Inspections Inc.', location: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437, services: ['Eddy Current Testing', 'Liquid Penetrant Testing'], specialization: 'Aerospace Components', rating: 4.5, contactInfo: '(987) 654-3210', description: 'Specialized in high-precision aerospace inspections.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "factory interior", baseRate: 120, certifications: ["Nadcap NDT", "AS9100"], personnelQualifications: ["NAS 410 Level II ET, PT"], isVerified: true, availableDocuments: ["Nadcap Approval Docs", "AS9100 Cert", "Safety Manual"] },
  { id: '3', name: 'InfraTest Group', location: 'New York, NY', lat: 40.7128, lng: -74.0060, services: ['Visual Testing', 'Leak Testing', 'Acoustic Emission Testing'], specialization: 'Civil Infrastructure', rating: 4.2, contactInfo: '(555) 123-4567', description: 'Ensuring the safety and integrity of critical infrastructure.', imageUrl: "", dataAiHint: "bridge structure", baseRate: 70, certifications: ["ISO/IEC 17025"], personnelQualifications: ["ASNT NDT Level II VT"], isVerified: false, availableDocuments: ["Sample VT Procedure"] },
  { id: '4', name: 'TechScan NDT', location: 'Chicago, IL', lat: 41.8781, lng: -87.6298, services: ['Phased Array UT', 'Time-of-Flight Diffraction'], specialization: 'Manufacturing Quality Control', rating: 4.9, contactInfo: '(312) 555-0011', description: 'Cutting-edge NDT for manufacturing excellence.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "modern factory", baseRate: 110, certifications: ["ISO 9001"], personnelQualifications: ["ASNT NDT Level III PAUT, TOFD"], isVerified: true, availableDocuments: ["PAUT Procedure Example", "Level III Cert (PAUT)"] },
  { id: '5', name: 'Coastal Integrity Checks', location: 'Houston, TX', lat: 29.749907, lng: -95.358421, services: ['Magnetic Particle Testing', 'Visual Testing'], specialization: 'Maritime & Offshore', rating: 4.3, contactInfo: '(281) 555-9000', description: 'Specialized NDT for offshore structures and vessels.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "offshore platform", baseRate: 95, certifications: ["DNV Approved", "ABS Certified"], personnelQualifications: ["ASNT NDT Level II MT, VT", "API QUTE"], isVerified: false, availableDocuments: [] },
];

// Smaller, distinct list for registered (non-demo) users
const registeredUserMockProviders: ServiceProvider[] = [
  { id: 'reg1', name: 'Registered NDT Premium', location: 'Dallas, TX', lat: 32.7767, lng: -96.7970, services: ['Advanced UT', 'Thermography'], specialization: 'Power Generation', rating: 4.9, contactInfo: '(REG) 555-0001', description: 'Premium NDT services for registered clients.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "power plant", baseRate: 150, certifications: ["ISO 17025", "EPRI Certified"], personnelQualifications: ["ASNT NDT Level III (UT, IR)"], isVerified: true, availableDocuments: ["Premium Service Brochure", "EPRI Cert Copy"] },
  { id: 'reg2', name: 'Specialized Inspection Co.', location: 'Atlanta, GA', lat: 33.7490, lng: -84.3880, services: ['Eddy Current Array', 'Laser Shearography'], specialization: 'Composite Materials', rating: 4.7, contactInfo: '(REG) 555-0002', description: 'High-tech inspections for advanced materials.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "composite material", baseRate: 180, certifications: ["Nadcap Composites", "AS9100"], personnelQualifications: ["NAS 410 Level III (ET)"], isVerified: true, availableDocuments: ["Composite Inspection Manual", "Nadcap Cert"] },
];


type ViewMode = "list" | "map";

export default function FindProvidersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [displayedProviders, setDisplayedProviders] = useState<ServiceProvider[]>([]);
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
    let currentProviderList: ServiceProvider[];
    if (user?.isDemo) {
      currentProviderList = mockProviders;
    } else {
      currentProviderList = registeredUserMockProviders;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    setDisplayedProviders(
      currentProviderList.filter(provider => {
        const matchesSearchTerm =
          provider.name.toLowerCase().includes(lowerSearchTerm) ||
          provider.location.toLowerCase().includes(lowerSearchTerm) ||
          provider.specialization.toLowerCase().includes(lowerSearchTerm) ||
          provider.services.some(service => service.toLowerCase().includes(lowerSearchTerm)) ||
          (provider.certifications || []).some(cert => cert.toLowerCase().includes(lowerSearchTerm)) ||
          (provider.personnelQualifications || []).some(qual => qual.toLowerCase().includes(lowerSearchTerm)) ||
          (provider.availableDocuments || []).some(doc => doc.toLowerCase().includes(lowerSearchTerm));
        
        const matchesVerificationFilter = filterVerifiedOnly ? provider.isVerified === true : true;

        return matchesSearchTerm && matchesVerificationFilter;
      })
    );
  }, [searchTerm, filterVerifiedOnly, user]);

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
          {user?.isDemo ? " (Showing Demo Provider List)" : " (Showing Registered Provider List)"}
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, location, service, specialization, certification, documents..."
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
        displayedProviders.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No providers found matching your criteria.</p>
            <p className="text-sm text-muted-foreground">
              {user?.isDemo ? "Try adjusting your search for demo providers." : "Try adjusting your search or check back later for more registered providers."}
            </p>
          </div>
        )
      )}

      {viewMode === "map" && (
        <div className="space-y-6">
          <InteractiveMap providers={displayedProviders} />
          {displayedProviders.length > 0 ? (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-4">Filtered Providers ({displayedProviders.length}) visible on map</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedProviders.slice(0, 4).map((provider) => ( 
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
              {displayedProviders.length > 4 && <p className="text-sm text-muted-foreground mt-2">And {displayedProviders.length - 4} more providers shown as markers on the map.</p>}
            </div>
          ) : (
             <div className="text-center py-10">
              <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">No providers found matching your criteria to display on map.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
