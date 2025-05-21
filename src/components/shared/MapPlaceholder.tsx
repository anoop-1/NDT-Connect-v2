
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
           {/* Conceptual pins - purely visual */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 450">
            <circle cx="200" cy="150" r="8" fill="hsl(var(--primary))" opacity="0.7" />
            <circle cx="210" cy="160" r="4" fill="hsl(var(--primary-foreground))" opacity="0.9" />
            <circle cx="400" cy="225" r="8" fill="hsl(var(--primary))" opacity="0.7" />
            <circle cx="410" cy="235" r="4" fill="hsl(var(--primary-foreground))" opacity="0.9" />
            <circle cx="600" cy="300" r="8" fill="hsl(var(--primary))" opacity="0.7" />
            <circle cx="610" cy="310" r="4" fill="hsl(var(--primary-foreground))" opacity="0.9" />
             <circle cx="300" cy="350" r="8" fill="hsl(var(--accent))" opacity="0.7" />
            <circle cx="310" cy="360" r="4" fill="hsl(var(--accent-foreground))" opacity="0.9" />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          This area will display an interactive map showing provider locations.
          For now, please use the list view and search filters to find providers.
        </p>
      </CardContent>
    </Card>
  );
}
