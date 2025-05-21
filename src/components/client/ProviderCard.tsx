
// src/components/client/ProviderCard.tsx
"use client";

import Image from 'next/image';
import type { ServiceProvider } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, CheckSquare, DollarSign, ShieldCheck, Award, Users2, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation'; 

interface ProviderCardProps {
  provider: ServiceProvider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const router = useRouter(); 

  const handleRequestService = () => {
    const queryParams = new URLSearchParams({
      providerId: provider.id,
      providerName: provider.name,
      serviceType: provider.services.length > 0 ? provider.services[0] : "General Inquiry", 
    });
    if (provider.baseRate) {
      queryParams.append("baseRate", provider.baseRate.toString());
    }
    router.push(`/request-service?${queryParams.toString()}`);
  };

  const clientPrice = provider.baseRate ? (provider.baseRate * 1.15).toFixed(2) : null;
  const fallbackImageSrc = '/images/default-provider-graphic.png';

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative w-full h-48 bg-muted">
        <Image
          src={provider.imageUrl || fallbackImageSrc}
          alt={provider.specialization || "NDT Provider"} 
          fill={true}
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          data-ai-hint={provider.imageUrl ? (provider.dataAiHint || "company building") : "NDT Connect"}
          className="rounded-t-lg"
        />
        {provider.isVerified && (
          <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white">
            <ShieldCheck className="h-4 w-4 mr-1" /> Verified
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{provider.specialization} Specialist</CardTitle> 
        <CardDescription className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" /> {provider.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="font-semibold">{provider.rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground ml-1">(Rating)</span>
        </div>

        {clientPrice && (
          <div className="flex items-center font-semibold">
            <DollarSign className="h-5 w-5 text-primary mr-1" />
            Est. Rate: ${clientPrice}
            <span className="text-xs text-muted-foreground ml-1">(incl. 15% fee)</span>
          </div>
        )}

        {provider.description && <p className="text-sm text-muted-foreground line-clamp-2">{provider.description}</p>}
        
        <div>
          <h4 className="text-sm font-semibold mb-1 flex items-center"><CheckSquare className="h-4 w-4 mr-1 text-primary"/>Services:</h4>
          <div className="flex flex-wrap gap-1">
            {provider.services.slice(0, 3).map((service) => (
              <Badge key={service} variant="outline" className="text-xs">{service}</Badge>
            ))}
            {provider.services.length > 3 && <Badge variant="outline" className="text-xs">...</Badge>}
          </div>
        </div>
        
        {provider.certifications && provider.certifications.length > 0 && (
           <div>
            <h4 className="text-sm font-semibold mb-1 flex items-center"><Award className="h-4 w-4 mr-1 text-primary"/>Certifications:</h4>
            <div className="flex flex-wrap gap-1">
              {provider.certifications.slice(0, 2).map((cert) => (
                <Badge key={cert} variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">{cert}</Badge>
              ))}
              {provider.certifications.length > 2 && <Badge variant="outline" className="text-xs">...</Badge>}
            </div>
          </div>
        )}

        {provider.personnelQualifications && provider.personnelQualifications.length > 0 && (
           <div>
            <h4 className="text-sm font-semibold mb-1 flex items-center"><Users2 className="h-4 w-4 mr-1 text-primary"/>Personnel:</h4>
            <div className="flex flex-wrap gap-1">
              {provider.personnelQualifications.slice(0, 2).map((qual) => (
                <Badge key={qual} variant="outline" className="text-xs bg-indigo-50 border-indigo-200 text-indigo-700">{qual}</Badge>
              ))}
              {provider.personnelQualifications.length > 2 && <Badge variant="outline" className="text-xs">...</Badge>}
            </div>
          </div>
        )}

      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:justify-end items-stretch sm:items-center gap-2 pt-4 border-t">
        <Button size="sm" className="w-full sm:w-auto" onClick={handleRequestService}>
          <Briefcase className="h-4 w-4 mr-2" /> Request Service
        </Button>
      </CardFooter>
    </Card>
  );
}
