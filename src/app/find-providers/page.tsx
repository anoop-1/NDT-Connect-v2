
// src/app/find-providers/page.tsx
"use client";

import { ProviderCard } from "@/components/client/ProviderCard";
import type { ServiceProvider, ServiceOffering, PersonnelQualification, CompanyCertification } from "@/lib/types";
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

const mockDemoServices: ServiceOffering[] = [
    { id: "UT", name: "Ultrasonic Testing", rate: "100", unit: "per hour" },
    { id: "MT", name: "Magnetic Particle Testing", rate: "90", unit: "per hour" },
    { id: "RT", name: "Radiographic Testing", rate: "150", unit: "per film" },
];
const mockDemoPersonnel: PersonnelQualification[] = [
    { id: "p1", quantity: 5, certificationBody: "ASNT", level: "Level II" },
    { id: "p2", quantity: 2, certificationBody: "PCN", level: "Level III (UT, MT)" },
];

const mockDemoCompanyCertifications: CompanyCertification[] = [
  { id: "cert1", name: "ISO 9001", category: "Quality Management" },
  { id: "cert2", name: "API Q1", category: "Oil & Gas Specific" }
];

const mockProviders: ServiceProvider[] = [
  { id: '1', name: 'Advanced NDT Solutions', location: 'Houston, TX', lat: 29.7604, lng: -95.3698, services: mockDemoServices, specialization: 'Oil & Gas Pipelines', rating: 4.8, contactInfo: '(123) 456-7890', description: 'Leading provider of NDT services for the energy sector.', imageUrl: 'https://images.unsplash.com/photo-1582489853490-cd3a53eb4530?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8aW5kdXN0cnl8ZW58MHx8fHwxNzQ4NDM3Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: "industrial site", baseRate: 85, certifications: mockDemoCompanyCertifications, personnelQualifications: mockDemoPersonnel, isVerified: true, availableDocuments: ["General Procedures Manual", "ISO 9001 Certificate", "Technician Level III Certs"] },
  { id: '2', name: 'Precision Inspections Inc.', location: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437, services: [{id: "ET", name: 'Eddy Current Testing', rate: "120", unit: 'per hour'}, {id: "PT", name: 'Liquid Penetrant Testing', rate: "70", unit: 'per hour'}], specialization: 'Aerospace Components', rating: 4.5, contactInfo: '(987) 654-3210', description: 'Specialized in high-precision aerospace inspections.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "factory interior", baseRate: 120, certifications: [{id: "c3", name:"Nadcap NDT"}, {id: "c4", name:"AS9100"}], personnelQualifications: [{id:"p3", quantity:3, certificationBody: "NAS 410", level: "Level II ET, PT"}], isVerified: true, availableDocuments: ["Nadcap Approval Docs", "AS9100 Cert", "Safety Manual"] },
  { id: '3', name: 'InfraTest Group', location: 'New York, NY', lat: 40.7128, lng: -74.0060, services: [{id:"VT", name:'Visual Testing', rate: "60", unit:'per hour'}], specialization: 'Civil Infrastructure', rating: 4.2, contactInfo: '(555) 123-4567', description: 'Ensuring the safety and integrity of critical infrastructure.', imageUrl: "", dataAiHint: "bridge structure", baseRate: 70, certifications: [{id: "c5", name:"ISO/IEC 17025"}], personnelQualifications: [{id:"p4", quantity:4, certificationBody: "ASNT", level:"Level II VT"}], isVerified: false, availableDocuments: ["Sample VT Procedure"] },
  { id: '4', name: 'TechScan NDT', location: 'Chicago, IL', lat: 41.8781, lng: -87.6298, services: [{id:"PAUT", name:'Phased Array UT', rate:"180", unit:'per hour'}], specialization: 'Manufacturing Quality Control', rating: 4.9, contactInfo: '(312) 555-0011', description: 'Cutting-edge NDT for manufacturing excellence.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "modern factory", baseRate: 110, certifications: [{id:"c6", name:"ISO 9001"}], personnelQualifications: [{id:"p5", quantity:2, certificationBody:"ASNT", level:"Level III PAUT, TOFD"}], isVerified: true, availableDocuments: ["PAUT Procedure Example", "Level III Cert (PAUT)"] },
  { id: '5', name: 'Coastal Integrity Checks', location: 'Houston, TX', lat: 29.749907, lng: -95.358421, services: [{id:"MT-offshore", name:'Magnetic Particle Testing', rate: "100", unit:'per hour'}], specialization: 'Maritime & Offshore', rating: 4.3, contactInfo: '(281) 555-9000', description: 'Specialized NDT for offshore structures and vessels.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "offshore platform", baseRate: 95, certifications: [{id:"c7", name:"DNV Approved"}, {id:"c8", name:"ABS Certified"}], personnelQualifications: [{id:"p6", quantity:6, certificationBody:"ASNT", level:"Level II MT, VT"}, {id:"p7", quantity:1, certificationBody:"API", level:"QUTE"}], isVerified: false, availableDocuments: [] },
];

const registeredUserMockProviders: ServiceProvider[] = [
  { id: 'reg1', name: 'Registered NDT Premium', location: 'Dallas, TX', lat: 32.7767, lng: -96.7970, services: [{id:"AdvUT",name:'Advanced UT', rate:"160", unit:'per hour'}, {id:"Thermo", name:'Thermography', rate:"140", unit:'per hour'}], specialization: 'Power Generation', rating: 4.9, contactInfo: '(REG) 555-0001', description: 'Premium NDT services for registered clients.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "power plant", baseRate: 150, certifications: [{id:"cReg1", name:"ISO 17025"}, {id:"cReg2", name:"EPRI Certified"}], personnelQualifications: [{id:"pReg1", quantity:3, certificationBody:"ASNT", level:"Level III (UT, IR)"}], isVerified: true, availableDocuments: ["Premium Service Brochure", "EPRI Cert Copy"] },
  { id: 'reg2', name: 'Specialized Inspection Co.', location: 'Atlanta, GA', lat: 33.7490, lng: -84.3880, services: [{id:"ECA", name:'Eddy Current Array', rate:"200", unit:'per project'}, {id:"Laser", name:'Laser Shearography', rate:"250", unit:'per project'}], specialization: 'Composite Materials', rating: 4.7, contactInfo: '(REG) 555-0002', description: 'High-tech inspections for advanced materials.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: "composite material", baseRate: 180, certifications: [{id:"cReg3", name:"Nadcap Composites"}, {id:"cReg4", name:"AS9100"}], personnelQualifications: [{id:"pReg2", quantity:2, certificationBody:"NAS 410", level:"Level III (ET)"}], isVerified: true, availableDocuments: ["Composite Inspection Manual", "Nadcap Cert"] },
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
          provider.services.some(service => service.name.toLowerCase().includes(lowerSearchTerm)) || 
          (provider.certifications || []).some(cert => cert.name.toLowerCase().includes(lowerSearchTerm)) ||
          (provider.personnelQualifications || []).some(qual => 
            `${qual.quantity} ${qual.certificationBody} ${qual.level}`.toLowerCase().includes(lowerSearchTerm)
          ) ||
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
