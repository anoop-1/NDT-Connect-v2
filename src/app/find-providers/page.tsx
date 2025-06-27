
// src/app/find-providers/page.tsx
"use client";

import { ProviderCard } from "@/components/client/ProviderCard";
import type { ServiceProvider, User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ShieldCheck, AlertTriangle, Activity } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { MOCK_PROVIDERS } from "@/lib/mockData";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PREDEFINED_NDT_SERVICES = [
  "Acoustic Emission Testing (AET)",
  "Alternating Current Field Measurement (ACFM)",
  "Borescope Inspection",
  "Eddy Current Testing (ECT)",
  "Guided Wave Testing (GWT) / LRUT",
  "Laser Testing Methods (LM)",
  "Leak Testing (LT)",
  "Liquid Penetrant Testing (PT)",
  "Magnetic Flux Leakage (MFL)",
  "Magnetic Particle Testing (MT)",
  "Neutron Radiographic Testing (NR)",
  "Phased Array Ultrasonic Testing (PAUT)",
  "Radiographic Testing (RT)",
  "Remote Field Testing (RFT)",
  "Thermal/Infrared Testing (IRT)",
  "Time-of-Flight Diffraction (TOFD)",
  "Ultrasonic Testing (UT)",
  "Vibration Analysis (VA)",
  "Visual Testing (VT)",
];

const PREDEFINED_CERTIFICATIONS = [
  "AS9100",
  "IACS - American Bureau of Shipping (ABS)",
  "IACS - Bureau Veritas (BV)",
  "IACS - China Classification Society (CCS)",
  "IACS - Croatian Register of Shipping (CRS)",
  "IACS - DNV",
  "IACS - Indian Register of Shipping (IRS)",
  "IACS - Korean Register of Shipping (KR)",
  "IACS - Lloyd's Register (LR)",
  "IACS - Nippon Kaiji Kyokai (ClassNK)",
  "IACS - Polski Rejestr Statków (PRS)",
  "IACS - RINA Services (RINA)",
  "IACS - Russian Maritime Register of Shipping (RS)",
  "ISO 9001",
  "ISO/IEC 17025",
  "ISO 45001",
  "Nadcap",
  "NAS 410",
  "API Q1",
];

const PREDEFINED_PERSONNEL_CERTS = [
  "ACCP",
  "ASNT",
  "CGSB",
  "CSWIP",
  "EN 4179",
  "ISO 9712",
  "NAS 410",
  "PCN",
  "SNT-TC-1A",
];

export default function FindProvidersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allProviders, setAllProviders] = useState<ServiceProvider[]>([]);
  const [displayedProviders, setDisplayedProviders] = useState<ServiceProvider[]>([]);
  
  // Filter states
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [filterCompanyName, setFilterCompanyName] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterService, setFilterService] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [filterCertification, setFilterCertification] = useState('');
  const [filterPersonnelCert, setFilterPersonnelCert] = useState('');
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);
  
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/find-providers");
    } else if (user && user.role !== 'client') {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const fetchProviders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    if (user?.isDemo) {
      setAllProviders(MOCK_PROVIDERS);
      setIsLoading(false);
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("role", "==", "provider"), where("isActive", "==", true));
      const querySnapshot = await getDocs(q);
      const fetchedUsers: User[] = [];
      querySnapshot.forEach((doc) => {
        fetchedUsers.push({ id: doc.id, ...doc.data() } as User);
      });

      const providersData: ServiceProvider[] = fetchedUsers.map(u => ({
        id: u.id,
        name: u.name || "Unnamed Provider",
        location: u.providerProfile?.location || "Location not set",
        lat: u.providerProfile?.lat,
        lng: u.providerProfile?.lng,
        services: u.providerProfile?.servicesOffered || [],
        specialization: u.providerProfile?.specialization || "General NDT Services",
        rating: u.providerProfile?.rating || 4.0,
        description: u.providerProfile?.description || "No description available.",
        imageUrl: u.providerProfile?.companyLogoUrl,
        dataAiHint: u.providerProfile?.dataAiHint,
        baseRate: u.providerProfile?.baseRate,
        certifications: u.providerProfile?.certifications,
        personnelQualifications: u.providerProfile?.personnelQualifications,
        isVerified: u.providerProfile?.isVerified,
        availableDocuments: u.providerProfile?.availableDocuments,
      }));
      
      setAllProviders(providersData);

    } catch (e) {
      console.error("Error fetching providers:", e);
      setError("Failed to load providers from the database. Please check your connection and try again.");
      toast({
        title: "Database Error",
        description: "Could not fetch service providers.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, user]);

  useEffect(() => {
    if (user) {
      fetchProviders();
    }
  }, [user, fetchProviders]);
  
  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const lowerCompanyName = filterCompanyName.toLowerCase();
    const lowerLocation = filterLocation.toLowerCase();
    const lowerService = filterService.toLowerCase();
    const lowerSpecialization = filterSpecialization.toLowerCase();
    const lowerCertification = filterCertification.toLowerCase();
    const lowerPersonnelCert = filterPersonnelCert.toLowerCase();

    const filtered = allProviders.filter(provider => {
      // General keyword search from the main search bar
      const matchesSearchTerm = !searchTerm || (
        provider.name.toLowerCase().includes(lowerSearchTerm) ||
        provider.location.toLowerCase().includes(lowerSearchTerm) ||
        provider.specialization.toLowerCase().includes(lowerSearchTerm) ||
        (provider.description || "").toLowerCase().includes(lowerSearchTerm)
      );

      // Specific filters from the popover
      const matchesCompanyName = !filterCompanyName || provider.name.toLowerCase().includes(lowerCompanyName);
      const matchesLocation = !filterLocation || provider.location.toLowerCase().includes(lowerLocation);
      const matchesService = !filterService || provider.services.some(service => service.name.toLowerCase() === lowerService);
      const matchesSpecialization = !filterSpecialization || provider.specialization.toLowerCase().includes(lowerSpecialization);
      const matchesCertification = !filterCertification || (provider.certifications || []).some(cert => cert.name.toLowerCase() === lowerCertification);
      const matchesPersonnelCert = !filterPersonnelCert || (provider.personnelQualifications || []).some(qual => qual.certificationBody.toLowerCase() === lowerPersonnelCert);
      const matchesVerificationFilter = !filterVerifiedOnly || provider.isVerified === true;

      return matchesSearchTerm && matchesCompanyName && matchesLocation && matchesService && matchesSpecialization && matchesCertification && matchesPersonnelCert && matchesVerificationFilter;
    });
    setDisplayedProviders(filtered);

    // Update the indicator for active filters
    setIsFiltersApplied(
      !!filterCompanyName || !!filterLocation || !!filterService || !!filterSpecialization || !!filterCertification || !!filterPersonnelCert || filterVerifiedOnly
    );

  }, [searchTerm, filterCompanyName, filterLocation, filterService, filterSpecialization, filterCertification, filterPersonnelCert, filterVerifiedOnly, allProviders]);

  const handleClearFilters = () => {
    setFilterCompanyName('');
    setFilterLocation('');
    setFilterService('');
    setFilterSpecialization('');
    setFilterCertification('');
    setFilterPersonnelCert('');
    setFilterVerifiedOnly(false);
  };

  if (authLoading || (!user && !authLoading)) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Loading...</span></div>;
  }

  if (user && user.role !== 'client') {
    return <div className="text-center py-10">Access denied. This page is for clients.</div>;
  }

  const noProvidersFound = (
    <div className="text-center py-10">
      <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <p className="text-xl text-muted-foreground">No providers found matching your criteria.</p>
      <p className="text-sm text-muted-foreground">Try adjusting your search terms or filters.</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <section className="bg-card p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-2">Find NDT Service Providers</h1>
        <p className="text-muted-foreground mb-6">
          Browse and connect with qualified Non-Destructive Testing professionals from our network.
          {user?.isDemo && <span className="font-semibold text-primary ml-2">(Demo Mode)</span>}
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by keyword..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto"> 
                <Filter className="h-4 w-4 mr-2" /> Filters
                {isFiltersApplied && <span className="h-2 w-2 rounded-full bg-primary ml-2 animate-pulse"></span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <h4 className="font-medium leading-none">Advanced Filters</h4>
                    <p className="text-sm text-muted-foreground">Refine your search.</p>
                  </div>
                  <div className="grid gap-y-3">
                    <div>
                      <Label htmlFor="companyNameFilter">Company Name</Label>
                      <Input id="companyNameFilter" value={filterCompanyName} onChange={(e) => setFilterCompanyName(e.target.value)} placeholder="e.g., Global Inspection" />
                    </div>
                    <div>
                      <Label htmlFor="locationFilter">Location</Label>
                      <Input id="locationFilter" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} placeholder="City, Country, Region" />
                    </div>
                    <div>
                      <Label htmlFor="serviceFilter">NDT Service</Label>
                      <Select 
                        value={filterService} 
                        onValueChange={(value) => setFilterService(value === 'any-service' ? '' : value)}
                      >
                        <SelectTrigger id="serviceFilter">
                          <SelectValue placeholder="Any Service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any-service">Any Service</SelectItem>
                          {PREDEFINED_NDT_SERVICES.sort().map(service => <SelectItem key={service} value={service.toLowerCase()}>{service}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                     <div>
                      <Label htmlFor="specializationFilter">Specialization</Label>
                      <Input id="specializationFilter" value={filterSpecialization} onChange={(e) => setFilterSpecialization(e.target.value)} placeholder="e.g., Aerospace" />
                    </div>
                    <div>
                      <Label htmlFor="certificationFilter">Company Certification</Label>
                      <Select 
                        value={filterCertification} 
                        onValueChange={(value) => setFilterCertification(value === 'any-certification' ? '' : value)}
                      >
                        <SelectTrigger id="certificationFilter">
                          <SelectValue placeholder="Any Certification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any-certification">Any Certification</SelectItem>
                          {PREDEFINED_CERTIFICATIONS.sort().map(cert => <SelectItem key={cert} value={cert.toLowerCase()}>{cert}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="personnelCertFilter">Personnel Certification</Label>
                      <Select 
                        value={filterPersonnelCert} 
                        onValueChange={(value) => setFilterPersonnelCert(value === 'any-personnel-cert' ? '' : value)}
                      >
                        <SelectTrigger id="personnelCertFilter">
                          <SelectValue placeholder="Any Personnel Cert" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any-personnel-cert">Any Personnel Cert</SelectItem>
                          {PREDEFINED_PERSONNEL_CERTS.sort().map(cert => <SelectItem key={cert} value={cert.toLowerCase()}>{cert}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleClearFilters}>Clear Filters</Button>
                </div>
            </PopoverContent>
          </Popover>
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

      <div>
        {isLoading && (
            <div className="flex justify-center items-center py-10">
                <Activity className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading providers...</span>
            </div>
        )}
        {error && (
            <div className="text-center py-10 bg-destructive/10 text-destructive border border-destructive rounded-lg p-4">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
                <p className="text-xl font-semibold">Error Loading Providers</p>
                <p className="text-sm">{error}</p>
            </div>
        )}
        {!isLoading && !error && (
            displayedProviders.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedProviders.map((provider) => (
                        <ProviderCard key={provider.id} provider={provider} />
                    ))}
                </div>
            ) : (
                noProvidersFound
            )
        )}
      </div>
    </div>
  );
}

    