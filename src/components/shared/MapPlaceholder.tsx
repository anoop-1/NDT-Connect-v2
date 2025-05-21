// src/components/shared/MapPlaceholder.tsx
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export function MapPlaceholder() {
  return (
    <Card className="shadow-lg w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-6 w-6 mr-2 text-primary" />
          Provider Map View (Conceptual)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative overflow-hidden">
          <Image
            src="https://placehold.co/800x450.png"
            alt="Conceptual map view of service providers"
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="map interface providers"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <p className="text-xl font-semibold text-white text-center p-4">
              Interactive Map Feature Coming Soon!
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          This area will display an interactive map showing provider locations.
          For now, please use the list view and search filters to find providers.
        </p>
      </CardContent>
    </Card>
  );
}
