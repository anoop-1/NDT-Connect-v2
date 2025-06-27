// src/components/shared/InteractiveMap.tsx
"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { type LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { ServiceProvider } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Activity } from 'lucide-react';

// Fix for default icon paths in Next.js
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

interface InteractiveMapProps {
  providers: ServiceProvider[];
  center?: LatLngExpression;
  zoom?: number;
}

// MapUpdater component to dynamically change the map's view
function MapUpdater({ center, zoom }: { center: LatLngExpression, zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

export default function InteractiveMap({ providers, center, zoom = 5 }: InteractiveMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // This effect runs only once on the client, preventing icon path issues.
    const defaultIcon = L.icon({
      iconRetinaUrl: iconRetina.src,
      iconUrl: icon.src,
      shadowUrl: iconShadow.src,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  const validProviders = providers.filter(p => p.lat != null && p.lng != null);
  
  const defaultCenter: LatLngExpression = [39.8283, -98.5795]; // Default to center of US

  // Determine map center: Use provided center, or first provider's location, or default
  const mapCenter: LatLngExpression = center || (validProviders.length > 0
    ? [validProviders[0].lat!, validProviders[0].lng!]
    : defaultCenter);
  
  const mapZoom = validProviders.length > 0 ? 8 : 4;

  // This check prevents the "Map container is already initialized" error
  if (!isClient) {
    return (
      <div style={{ height: '100%', width: '100%' }} className="flex items-center justify-center bg-muted rounded-lg">
        <Activity className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading Map...</span>
      </div>
    );
  }

  return (
    <MapContainer 
      center={mapCenter} 
      zoom={mapZoom} 
      scrollWheelZoom={true} 
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem', zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={mapCenter} zoom={mapZoom} />
      {validProviders.map(provider => (
        <Marker key={provider.id} position={[provider.lat!, provider.lng!]}>
          <Popup>
            <div className="font-semibold">{provider.name}</div>
            <p className="text-xs text-muted-foreground">{provider.location}</p>
            <Button asChild size="sm" className="mt-2 w-full">
              <Link href={`/request-service?providerId=${provider.id}&providerName=${encodeURIComponent(provider.name)}&serviceType=${encodeURIComponent(provider.services[0]?.name || 'General Inquiry')}`}>
                Request Service
              </Link>
            </Button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
