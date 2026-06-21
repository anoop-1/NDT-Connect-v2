"use client";

import { ProviderCard } from "@/components/client/ProviderCard";
import type { ServiceProvider } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ShieldCheck, AlertTriangle, Activity } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PREDEFINED_NDT_SERVICES = [
  "Acoustic Emission Testing (AET)", "Alternating Current Field Measurement (ACFM)", "Borescope Inspection",
  "Eddy Current Testing (ECT)", "Guided Wave Testing (GWT) / LRUT", "Laser Testing Methods (LM)", "Leak Testing (LT)",
  "Liquid Penetrant Testing (PT)", "Magnetic Flux Leakage (MFL)", "Magnetic Particle Testing (MT)", "Neutron Radiographic Testing (NR)",
  "Phased Array Ultrasonic Testing (PAUT)", "Radiographic Testing (RT)", "Remote Field Testing (RFT)", "Thermal/Infrared Testing (IRT)",
  "Time-of-Flight Diffraction (TOFD)", "Ultrasonic Testing (UT)", "Vibration Analysis (VA)", "Visual Testing (VT)",
];
const PREDEFINED_CERTIFICATIONS = [
  "API Q1", "AS9100", "IACS - American Bureau of Shipping (ABS)", "IACS - Bureau Veritas (BV)",
  "IACS - DNV", "IACS - Lloyd's Register (LR)", "ISO 9001", "ISO 14001", "ISO 45001",
  "ISO/IEC 17020", "ISO/IEC 17024", "ISO/IEC 17025", "Nadcap", "NAS 410",
];
const PREDEFINED_PERSONNEL_CERTS = ["ACCP", "ASNT", "CGSB", "CSWIP", "EN 4179", "ISO 9712", "NAS 410", "PCN", "SNT-TC-1A"];

// Public provider directory search — no auth required (anyone can browse before
// signing up; /api/providers GET is public). Powers the SEO /find-providers hub.
export default function ProviderSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allProviders, setAllProviders] = useState<ServiceProvider[]>([]);
  const [displayedProviders, setDisplayedProviders] = useState<ServiceProvider[]>([]);

  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [filterCompanyName, setFilterCompanyName] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterService, setFilterService] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [filterCertification, setFilterCertification] = useState('');
  const [filterPersonnelCert, setFilterPersonnelCert] = useState('');
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/providers");
      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      setAllProviders(result.data);
    } catch (e: any) {
      console.error("Error fetching providers:", e);
      setError("Could not load providers right now. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchProviders(); }, [fetchProviders]);

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const lowerCompanyName = filterCompanyName.toLowerCase();
    const lowerLocation = filterLocation.toLowerCase();
    const lowerService = filterService.toLowerCase();
    const lowerSpecialization = filterSpecialization.toLowerCase();
    const lowerCertification = filterCertification.toLowerCase();
    const lowerPersonnelCert = filterPersonnelCert.toLowerCase();

    const filtered = allProviders.filter(provider => {
      const matchesSearchTerm = !searchTerm || (
        provider.name.toLowerCase().includes(lowerSearchTerm) ||
        provider.location.toLowerCase().includes(lowerSearchTerm) ||
        provider.specialization.toLowerCase().includes(lowerSearchTerm) ||
        (provider.description || "").toLowerCase().includes(lowerSearchTerm)
      );
      const matchesCompanyName = !filterCompanyName || provider.name.toLowerCase().includes(lowerCompanyName);
      const matchesLocation = !filterLocation || provider.location.toLowerCase().includes(lowerLocation);
      const matchesService = !filterService || provider.services.some(s => s.name.toLowerCase() === lowerService);
      const matchesSpecialization = !filterSpecialization || provider.specialization.toLowerCase().includes(lowerSpecialization);
      const matchesCertification = !filterCertification || (provider.certifications || []).some(c => c.name.toLowerCase() === lowerCertification);
      const matchesPersonnelCert = !filterPersonnelCert || (provider.personnelQualifications || []).some(q => q.certificationBody.toLowerCase() === lowerPersonnelCert);
      const matchesVerificationFilter = !filterVerifiedOnly || provider.isVerified === true;
      return matchesSearchTerm && matchesCompanyName && matchesLocation && matchesService && matchesSpecialization && matchesCertification && matchesPersonnelCert && matchesVerificationFilter;
    });
    setDisplayedProviders(filtered);
    setIsFiltersApplied(!!filterCompanyName || !!filterLocation || !!filterService || !!filterSpecialization || !!filterCertification || !!filterPersonnelCert || filterVerifiedOnly);
  }, [searchTerm, filterCompanyName, filterLocation, filterService, filterSpecialization, filterCertification, filterPersonnelCert, filterVerifiedOnly, allProviders]);

  const handleClearFilters = () => {
    setFilterCompanyName(''); setFilterLocation(''); setFilterService(''); setFilterSpecialization('');
    setFilterCertification(''); setFilterPersonnelCert(''); setFilterVerifiedOnly(false);
  };

  return (
    <div className="space-y-8">
      <section className="bg-card p-6 rounded-lg shadow border border-border">
        <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search by company, city, or service…" className="pl-10 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                <div className="space-y-1"><h4 className="font-medium leading-none">Advanced Filters</h4><p className="text-sm text-muted-foreground">Refine your search.</p></div>
                <div className="grid gap-y-3">
                  <div><Label htmlFor="companyNameFilter">Company / Inspector Name</Label><Input id="companyNameFilter" value={filterCompanyName} onChange={(e) => setFilterCompanyName(e.target.value)} placeholder="e.g., Global Inspection" /></div>
                  <div><Label htmlFor="locationFilter">Location</Label><Input id="locationFilter" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} placeholder="City, Country, Region" /></div>
                  <div><Label htmlFor="serviceFilter">NDT Service</Label><Select value={filterService} onValueChange={(v) => setFilterService(v === 'any-service' ? '' : v)}><SelectTrigger id="serviceFilter"><SelectValue placeholder="Any Service" /></SelectTrigger><SelectContent><SelectItem value="any-service">Any Service</SelectItem>{PREDEFINED_NDT_SERVICES.sort().map(s => <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>)}</SelectContent></Select></div>
                  <div><Label htmlFor="specializationFilter">Specialization</Label><Input id="specializationFilter" value={filterSpecialization} onChange={(e) => setFilterSpecialization(e.target.value)} placeholder="e.g., Aerospace" /></div>
                  <div><Label htmlFor="certificationFilter">Company Certification</Label><Select value={filterCertification} onValueChange={(v) => setFilterCertification(v === 'any-certification' ? '' : v)}><SelectTrigger id="certificationFilter"><SelectValue placeholder="Any Certification" /></SelectTrigger><SelectContent><SelectItem value="any-certification">Any Certification</SelectItem>{PREDEFINED_CERTIFICATIONS.sort().map(c => <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>)}</SelectContent></Select></div>
                  <div><Label htmlFor="personnelCertFilter">Personnel Certification</Label><Select value={filterPersonnelCert} onValueChange={(v) => setFilterPersonnelCert(v === 'any-personnel-cert' ? '' : v)}><SelectTrigger id="personnelCertFilter"><SelectValue placeholder="Any Personnel Cert" /></SelectTrigger><SelectContent><SelectItem value="any-personnel-cert">Any Personnel Cert</SelectItem>{PREDEFINED_PERSONNEL_CERTS.sort().map(c => <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>)}</SelectContent></Select></div>
                </div>
                <Button variant="outline" onClick={handleClearFilters}>Clear Filters</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="verifiedOnly" checked={filterVerifiedOnly} onCheckedChange={(checked) => setFilterVerifiedOnly(checked as boolean)} />
          <Label htmlFor="verifiedOnly" className="flex items-center text-sm font-medium"><ShieldCheck className="h-4 w-4 mr-1 text-green-600" /> Show Verified Only</Label>
        </div>
      </section>

      <div>
        {isLoading && (<div className="flex justify-center items-center py-10"><Activity className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Loading professionals…</span></div>)}
        {error && (<div className="text-center py-10 bg-destructive/10 text-destructive border border-destructive rounded-lg p-4"><AlertTriangle className="h-12 w-12 mx-auto mb-4" /><p className="text-xl font-semibold">Error Loading Providers</p><p className="text-sm">{error}</p></div>)}
        {!isLoading && !error && (displayedProviders.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{displayedProviders.map((p) => (<ProviderCard key={p.id} provider={p} />))}</div>
        ) : (
          <div className="text-center py-10"><AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No providers match your criteria yet.</p>
            <p className="text-sm text-muted-foreground">Try a broader search — or list your company free.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
