// src/app/find-providers/map/page.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { ServiceProvider, User } from '@/lib/types';
import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { MOCK_PROVIDERS } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { List } from 'lucide-react';
import Link from 'next/link';
import { Activity } from 'lucide-react';

// Dynamically import the map component to ensure it's client-side only
const InteractiveMap = dynamic(() => import('@/components/shared/InteractiveMap'), {
  ssr: false,
  loading: () => <div className="flex h-full w-full items-center justify-center bg-muted rounded-lg"><Activity className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Loading map...</span></div>,
});

export default function FindProvidersMapPage() {
  const [allProviders, setAllProviders] = useState<ServiceProvider[]>([]);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/find-providers/map");
    } else if (user && user.role !== 'client') {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const fetchProviders = useCallback(async () => {
    setIsLoading(true);

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
        isVerified: u.providerProfile?.isVerified,
      }));
      setAllProviders(providersData);
    } catch (e) {
      console.error("Error fetching providers for map:", e);
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
  
  return (
    <div className="relative h-[calc(100vh-10rem)] w-full">
      <div className="absolute top-4 left-4 z-[1000] space-x-2">
        <Button asChild variant="secondary" className="shadow-lg">
          <Link href="/find-providers">
            <List className="mr-2 h-4 w-4" />
            View as List
          </Link>
        </Button>
      </div>
       <InteractiveMap providers={allProviders} />
    </div>
  );
}
