
// src/app/find-providers/page.tsx
"use client";

import { ProviderCard } from "@/components/client/ProviderCard";
import type { ServiceProvider, User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ShieldCheck, List, Map as MapIcon, AlertTriangle, Activity } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import dynamic from 'next/dynamic';
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { MOCK_PROVIDERS } from "@/lib/mockData";
import { cn } from "@/lib/utils";


type ViewMode = "list" | "map";

// This is the correct way to dynamically load a client-side component.
const InteractiveMap = dynamic(
    () => import('@/components/shared/InteractiveMap').then((mod) => mod.InteractiveMap),
    { 
      loading: () => <div className="flex justify-center items-center h-[450px] w-full rounded-lg bg-muted"><Activity className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Loading Map...</span></div>,
      ssr: false // This is crucial to prevent server-side rendering
    }
  );

export default function FindProvidersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [displayedProviders, setDisplayedProviders] = useState<ServiceProvider[]>([]);
  const [allProviders, setAllProviders] = useState<ServiceProvider[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // The Leaflet icon setup has been moved into the InteractiveMap component
  // to ensure it only runs on the client.

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
    const filtered = allProviders.filter(provider => {
      const matchesSearchTerm =
        provider.name.toLowerCase().includes(lowerSearchTerm) ||
        provider.location.toLowerCase().includes(lowerSearchTerm) ||
        provider.specialization.toLowerCase().includes(lowerSearchTerm) ||
        (provider.description || "").toLowerCase().includes(lowerSearchTerm) ||
        provider.services.some(service => service.name.toLowerCase().includes(lowerSearchTerm)) || 
        (provider.certifications || []).some(cert => cert.name.toLowerCase().includes(lowerSearchTerm) || (cert.category || "").toLowerCase().includes(lowerSearchTerm)) ||
        (provider.personnelQualifications || []).some(qual => 
          `${qual.quantity} ${qual.certificationBody} ${qual.level}`.toLowerCase().includes(lowerSearchTerm)
        ) ||
        (provider.availableDocuments || []).some(doc => doc.toLowerCase().includes(lowerSearchTerm));
      
      const matchesVerificationFilter = filterVerifiedOnly ? provider.isVerified === true : true;

      return matchesSearchTerm && matchesVerificationFilter;
    });
    setDisplayedProviders(filtered);
  }, [searchTerm, filterVerifiedOnly, allProviders]);

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
      <p className="text-sm text-muted-foreground">Try adjusting your search terms.</p>
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

      {/* --- LIST VIEW --- */}
      <div className={cn({ 'hidden': viewMode !== 'list' })}>
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

      {/* --- MAP VIEW --- */}
      <div className={cn('space-y-6', { 'hidden': viewMode !== 'map' })}>
        <InteractiveMap providers={displayedProviders} />
      </div>
    </div>
  );
}
