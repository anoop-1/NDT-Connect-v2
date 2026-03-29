
// src/components/client/ProviderCard.tsx
"use client";

import Image from 'next/image';
import type { ServiceProvider } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, CheckSquare, DollarSign, ShieldCheck, Award, Users2, Briefcase, BookOpen, FileQuestion, Building2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from 'react';

const DEFAULT_COMPANY_IMAGE_URL = "https://images.unsplash.com/photo-1582489853490-cd3a53eb4530?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8aW5kdXN0cnl8ZW58MHx8fHwxNzQ4NDM3Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080";
const DEFAULT_INSPECTOR_IMAGE_URL = "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTI1NjI4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const DEFAULT_COMPANY_IMAGE_HINT = "industrial site";
const DEFAULT_INSPECTOR_IMAGE_HINT = "professional portrait";

interface ProviderCardProps {
  provider: ServiceProvider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [finalImageUrl, setFinalImageUrl] = useState('');
  const [imageHint, setImageHint] = useState('');
  const [clientPrice, setClientPrice] = useState<string | null>(null);

  useEffect(() => {
    // This logic now runs on the client to safely access localStorage
    let determinedImageUrl = provider.imageUrl;
    let determinedHint = provider.dataAiHint || (provider.isCompany ? DEFAULT_COMPANY_IMAGE_HINT : DEFAULT_INSPECTOR_IMAGE_HINT);

    if (!determinedImageUrl) {
      if (provider.isCompany) {
        const adminSetDefaultProviderUrl = localStorage.getItem('defaultProviderImageUrl');
        determinedImageUrl = adminSetDefaultProviderUrl || DEFAULT_COMPANY_IMAGE_URL;
        determinedHint = adminSetDefaultProviderUrl ? "default provider logo" : DEFAULT_COMPANY_IMAGE_HINT;
      } else { // Is an inspector
        determinedImageUrl = DEFAULT_INSPECTOR_IMAGE_URL;
        determinedHint = DEFAULT_INSPECTOR_IMAGE_HINT;
      }
    }
    setFinalImageUrl(determinedImageUrl);
    setImageHint(determinedHint);
  }, [provider]);

  const displayRate = provider.services.length > 0 && provider.services[0].rate
    ? provider.services[0].rate
    : provider.baseRate;
  
  useEffect(() => {
    if (displayRate && !isNaN(parseFloat(displayRate.toString()))) {
      const commissionRate = parseFloat(localStorage.getItem('clientCommissionRate') || '15') / 100;
      const price = (parseFloat(displayRate.toString()) * (1 + commissionRate)).toFixed(2);
      setClientPrice(price);
    } else {
      setClientPrice(null);
    }
  }, [displayRate]);


  const handleRequestService = () => {
    const queryParams = new URLSearchParams({
      providerId: provider.id,
      providerName: provider.name,
      serviceType: provider.services.length > 0 && provider.services[0].name ? provider.services[0].name : "General Inquiry",
    });
    const primaryServiceRate = provider.services.length > 0 && provider.services[0].rate 
                                ? parseFloat(provider.services[0].rate.toString()) 
                                : (provider.baseRate || 0);

    if (primaryServiceRate && !isNaN(primaryServiceRate)) {
      queryParams.append("baseRate", primaryServiceRate.toString());
    }
    router.push(`/request-service?${queryParams.toString()}`);
  };

  const handleRequestDocuments = () => {
    toast({
      title: "Document Request Noted",
      description: `A request for technical documents from ${provider.name} has been noted. The provider will be notified upon service engagement.`,
    });
  };

  const displayUnit = provider.services.length > 0 && provider.services[0].unit 
                      ? provider.services[0].unit 
                      : (displayRate ? "per hour (default)" : null);

  const fallbackIcon = provider.isCompany 
    ? <Building2 className="w-12 h-12 text-muted-foreground" /> 
    : <User className="w-12 h-12 text-muted-foreground" />;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative w-full h-48 bg-muted">
        {finalImageUrl ? (
          <Image
            src={finalImageUrl} alt={`Image for ${provider.name}`} fill={true}
            style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false} data-ai-hint={imageHint} className="rounded-t-lg" key={finalImageUrl}
            onError={() => { setFinalImageUrl(''); }} // Graceful error handling
          />
        ) : ( <div className="w-full h-full flex items-center justify-center bg-secondary">{fallbackIcon}</div> )}
        {provider.isVerified && (
          <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white">
            <ShieldCheck className="h-4 w-4 mr-1" /> Verified
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{provider.name}</CardTitle>
        <CardDescription className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" /> {provider.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center"><Star className="h-5 w-5 text-yellow-400 mr-1" /><span className="font-semibold">{provider.rating.toFixed(1)}</span><span className="text-xs text-muted-foreground ml-1">(Rating)</span></div>
        {clientPrice && displayUnit && provider.isCompany ? (
          <div className="flex items-center font-semibold"><DollarSign className="h-5 w-5 text-primary mr-1" />Est. Rate: ${clientPrice} {displayUnit}</div>
        ) : provider.isCompany ? (
          <div className="flex items-center text-sm text-muted-foreground"><DollarSign className="h-5 w-5 mr-1" />Contact for pricing</div>
        ): null}

        <div className="text-sm"><span className="font-semibold">Specialization: </span><span className="text-muted-foreground">{provider.specialization}</span></div>
        {provider.description && <p className="text-sm text-muted-foreground line-clamp-2">{provider.description}</p>}
        {provider.services && provider.services.length > 0 && (
            <div><h4 className="text-sm font-semibold mb-1 flex items-center"><CheckSquare className="h-4 w-4 mr-1 text-primary"/>Key Services:</h4>
                <div className="flex flex-wrap gap-1">
                    {provider.services.slice(0, 3).map((service) => (<Badge key={service.id || service.name} variant="outline" className="text-xs">{service.name}</Badge>))}
                    {provider.services.length > 3 && <Badge variant="outline" className="text-xs">...</Badge>}
                </div>
            </div>
        )}
        {provider.certifications && provider.certifications.length > 0 && provider.isCompany && (
           <div><h4 className="text-sm font-semibold mb-1 flex items-center"><Award className="h-4 w-4 mr-1 text-primary"/>Company Certs:</h4>
            <div className="flex flex-wrap gap-1">
              {provider.certifications.slice(0, 2).map((cert) => (<Badge key={cert.id} variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">{cert.name}</Badge>))}
              {provider.certifications.length > 2 && <Badge variant="outline" className="text-xs">...</Badge>}
            </div>
          </div>
        )}
        {provider.personnelQualifications && provider.personnelQualifications.length > 0 && (
           <div><h4 className="text-sm font-semibold mb-1 flex items-center"><Users2 className="h-4 w-4 mr-1 text-primary"/>Personnel Certs:</h4>
            <div className="flex flex-wrap gap-1">
              {provider.personnelQualifications.slice(0, 2).map((qual) => (
                <Badge key={qual.id} variant="outline" className="text-xs bg-indigo-50 border-indigo-200 text-indigo-700">
                  {qual.quantity > 1 ? `${qual.quantity}x ` : ''}{qual.certificationBody} {qual.level}
                </Badge>
              ))}
              {provider.personnelQualifications.length > 2 && <Badge variant="outline" className="text-xs">...</Badge>}
            </div>
          </div>
        )}
        {provider.availableDocuments && provider.availableDocuments.length > 0 && (
           <div><h4 className="text-sm font-semibold mb-1 flex items-center"><BookOpen className="h-4 w-4 mr-1 text-primary"/>Docs Available:</h4>
            <div className="flex flex-wrap gap-1">
              {provider.availableDocuments.slice(0, 2).map((doc) => (<Badge key={doc} variant="outline" className="text-xs bg-teal-50 border-teal-200 text-teal-700">{doc}</Badge>))}
              {provider.availableDocuments.length > 2 && <Badge variant="outline" className="text-xs">...</Badge>}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:justify-end items-stretch sm:items-center gap-2 pt-4 border-t">
        {(provider.availableDocuments && provider.availableDocuments.length > 0) || provider.isVerified ? (
            <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleRequestDocuments}><FileQuestion className="h-4 w-4 mr-2" /> Request Docs</Button>
        ) : null}
        <Button size="sm" className="w-full sm:w-auto" onClick={handleRequestService}><Briefcase className="h-4 w-4 mr-2" /> Request Service</Button>
      </CardFooter>
    </Card>
  );
}
