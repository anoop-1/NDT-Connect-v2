
// src/components/client/ProviderCard.tsx
"use client";

import Image from 'next/image';
import type { ServiceProvider } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Star, CheckSquare, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import useRouter

interface ProviderCardProps {
  provider: ServiceProvider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const router = useRouter(); // Initialize router

  const handleRequestService = () => {
    // Navigate to the request service page with provider details
    const queryParams = new URLSearchParams({
      providerId: provider.id,
      providerName: provider.name,
      // Join services array, or handle selection more granularly if needed
      serviceType: provider.services.length > 0 ? provider.services[0] : "General Inquiry", 
    });
    if (provider.baseRate) {
      queryParams.append("baseRate", provider.baseRate.toString());
    }
    router.push(`/request-service?${queryParams.toString()}`);
  };

  const clientPrice = provider.baseRate ? (provider.baseRate * 1.15).toFixed(2) : null;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative w-full h-48 bg-muted">
        <Image
          src={provider.imageUrl || `https://placehold.co/600x400.png`}
          alt={provider.name}
          fill={true}
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          data-ai-hint={provider.dataAiHint || "company building"}
          className="rounded-t-lg"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{provider.name}</CardTitle>
        <CardDescription className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" /> {provider.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center mb-2">
          <Star className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="font-semibold">{provider.rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground ml-1">(Rating)</span>
        </div>

        {clientPrice && (
          <div className="flex items-center mb-3 font-semibold">
            <DollarSign className="h-5 w-5 text-primary mr-1" />
            Est. Rate: ${clientPrice}
            <span className="text-xs text-muted-foreground ml-1">(incl. 15% fee)</span>
          </div>
        )}

        {provider.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{provider.description}</p>}
        
        <div className="mb-3">
          <h4 className="text-sm font-semibold mb-1">Specialization:</h4>
          <Badge variant="secondary">{provider.specialization}</Badge>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-1">Services:</h4>
          <div className="flex flex-wrap gap-1">
            {provider.services.slice(0, 3).map((service) => (
              <Badge key={service} variant="outline" className="text-xs">
                <CheckSquare className="h-3 w-3 mr-1" />{service}
              </Badge>
            ))}
            {provider.services.length > 3 && <Badge variant="outline" className="text-xs">...</Badge>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-2 pt-4 border-t">
        <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
            <a href={`tel:${provider.contactInfo}`}> {/* Make phone number clickable */}
                <Phone className="h-4 w-4 mr-2" /> {provider.contactInfo}
            </a>
        </Button>
        <Button size="sm" className="w-full sm:w-auto" onClick={handleRequestService}>
          Request Service
        </Button>
      </CardFooter>
    </Card>
  );
}
