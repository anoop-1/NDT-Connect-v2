// src/components/client/ProviderCard.tsx
import Image from 'next/image';
import type { ServiceProvider } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Star, CheckSquare } from 'lucide-react';

interface ProviderCardProps {
  provider: ServiceProvider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative w-full h-48">
        <Image
          src={provider.imageUrl || `https://placehold.co/600x400.png?text=${encodeURIComponent(provider.name)}`}
          alt={provider.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint="company building"
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
        {provider.description && <p className="text-sm text-muted-foreground mb-3">{provider.description}</p>}
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
      <CardFooter className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-2 pt-4">
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Phone className="h-4 w-4 mr-2" /> {provider.contactInfo}
        </Button>
        <Button size="sm" className="w-full sm:w-auto" onClick={() => alert(`Requesting service from ${provider.name}`)}>
          Request Service
        </Button>
      </CardFooter>
    </Card>
  );
}