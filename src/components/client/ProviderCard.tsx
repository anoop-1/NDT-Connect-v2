
// src/components/client/ProviderCard.tsx
"use client";

import Image from 'next/image';
import type { ServiceProvider } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, CheckSquare, DollarSign, ShieldCheck, Award, Users2, Briefcase, BookOpen, FileQuestion } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from 'react';

interface ProviderCardProps {
  provider: ServiceProvider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [finalImageUrl, setFinalImageUrl] = useState(provider.imageUrl || '');
  const [imageHint, setImageHint] = useState(provider.dataAiHint || "company building");

  useEffect(() => {
    let determinedImageUrl = provider.imageUrl;
    let determinedHint = provider.dataAiHint || "company building";

    if (!determinedImageUrl) {
      const adminSetDefaultProviderUrl = typeof window !== 'undefined' ? localStorage.getItem('defaultProviderImageUrl') : null;
      if (adminSetDefaultProviderUrl) {
        determinedImageUrl = adminSetDefaultProviderUrl;
        determinedHint = "default provider logo";
      } else {
        // Use the new user-provided image as the default fallback
        determinedImageUrl = '/images/new-default-provider-image.png'; 
        determinedHint = "NDT Connect default provider";
      }
    }
    setFinalImageUrl(determinedImageUrl);
    setImageHint(determinedHint);
  }, [provider.imageUrl, provider.dataAiHint]);


  const handleRequestService = () => {
    const queryParams = new URLSearchParams({
      providerId: provider.id,
      providerName: "NDT Service Provider", // Mask name initially
      serviceType: provider.services.length > 0 && provider.services[0].name ? provider.services[0].name : "General Inquiry",
    });
    // Use the first service's rate if available, otherwise provider's baseRate
    const primaryServiceRate = provider.services.length > 0 && provider.services[0].rate ? 
                                parseFloat(provider.services[0].rate.toString()) : 
                                provider.baseRate;

    if (primaryServiceRate && !isNaN(primaryServiceRate)) {
      queryParams.append("baseRate", primaryServiceRate.toString());
    }
    router.push(`/request-service?${queryParams.toString()}`);
  };

  const handleRequestDocuments = () => {
    toast({
      title: "Document Request Sent",
      description: `Your request for technical documents from ${"a listed provider"} has been noted. The provider will be notified.`,
    });
  };

  // Calculate client price based on the first service's rate or general base rate
  const displayRate = provider.services.length > 0 && provider.services[0].rate 
                      ? provider.services[0].rate 
                      : provider.baseRate;
  
  const clientPrice = displayRate && !isNaN(parseFloat(displayRate.toString())) ? (parseFloat(displayRate.toString()) * 1.15).toFixed(2) : null;
  const displayUnit = provider.services.length > 0 && provider.services[0].unit 
                      ? provider.services[0].unit 
                      : (displayRate ? "per hour (default)" : null);

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative w-full h-48 bg-muted">
        {finalImageUrl && (
          <Image
            src={finalImageUrl}
            alt={"NDT Service Provider: " + provider.specialization} // Generic alt
            fill={true}
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            data-ai-hint={imageHint}
            className="rounded-t-lg"
            key={finalImageUrl}
            onError={() => { // Fallback if the determinedImageUrl itself errors
              setFinalImageUrl('/images/new-default-provider-image.png');
              setImageHint("NDT Connect default provider");
            }}
          />
        )}
        {provider.isVerified && (
          <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white">
            <ShieldCheck className="h-4 w-4 mr-1" /> Verified
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">NDT Provider: {provider.specialization}</CardTitle>
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

        {clientPrice && displayUnit && (
          <div className="flex items-center font-semibold">
            <DollarSign className="h-5 w-5 text-primary mr-1" />
            Est. Rate: ${clientPrice} {displayUnit}
          </div>
        )}

        {provider.description && <p className="text-sm text-muted-foreground line-clamp-2">{provider.description}</p>}

        <div>
          <h4 className="text-sm font-semibold mb-1 flex items-center"><CheckSquare className="h-4 w-4 mr-1 text-primary"/>Key Services:</h4>
          <div className="flex flex-wrap gap-1">
            {provider.services.slice(0, 3).map((service) => (
              <Badge key={service.id || service.name} variant="outline" className="text-xs">{service.name}</Badge>
            ))}
            {provider.services.length > 3 && <Badge variant="outline" className="text-xs">...</Badge>}
          </div>
        </div>

        {provider.certifications && provider.certifications.length > 0 && (
           <div>
            <h4 className="text-sm font-semibold mb-1 flex items-center"><Award className="h-4 w-4 mr-1 text-primary"/>Company Certs:</h4>
            <div className="flex flex-wrap gap-1">
              {provider.certifications.slice(0, 2).map((cert) => (
                <Badge key={cert.id} variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">{cert.name}</Badge>
              ))}
              {provider.certifications.length > 2 && <Badge variant="outline" className="text-xs">...</Badge>}
            </div>
          </div>
        )}

        {provider.personnelQualifications && provider.personnelQualifications.length > 0 && (
           <div>
            <h4 className="text-sm font-semibold mb-1 flex items-center"><Users2 className="h-4 w-4 mr-1 text-primary"/>Personnel:</h4>
            <div className="flex flex-wrap gap-1">
              {provider.personnelQualifications.slice(0, 1).map((qual) => (
                <Badge key={qual.id} variant="outline" className="text-xs bg-indigo-50 border-indigo-200 text-indigo-700">
                  {qual.quantity}x {qual.certificationBody} {qual.level}
                </Badge>
              ))}
              {provider.personnelQualifications.length > 1 && <Badge variant="outline" className="text-xs">...</Badge>}
            </div>
          </div>
        )}

        {provider.availableDocuments && provider.availableDocuments.length > 0 && (
           <div>
            <h4 className="text-sm font-semibold mb-1 flex items-center"><BookOpen className="h-4 w-4 mr-1 text-primary"/>Docs Available:</h4>
            <div className="flex flex-wrap gap-1">
              {provider.availableDocuments.slice(0, 2).map((doc) => (
                <Badge key={doc} variant="outline" className="text-xs bg-teal-50 border-teal-200 text-teal-700">{doc}</Badge>
              ))}
              {provider.availableDocuments.length > 2 && <Badge variant="outline" className="text-xs">...</Badge>}
            </div>
          </div>
        )}

      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:justify-end items-stretch sm:items-center gap-2 pt-4 border-t">
        {(provider.availableDocuments && provider.availableDocuments.length > 0) || provider.isVerified ? (
            <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleRequestDocuments}>
              <FileQuestion className="h-4 w-4 mr-2" /> Request Documents
            </Button>
        ) : null}
        <Button size="sm" className="w-full sm:w-auto" onClick={handleRequestService}>
          <Briefcase className="h-4 w-4 mr-2" /> Request Service
        </Button>
      </CardFooter>
    </Card>
  );
}
