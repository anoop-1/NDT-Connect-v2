// src/components/shared/InteractiveMap.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { ServiceProvider } from '@/lib/types';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { Activity } from 'lucide-react';

// Import marker icons. These are static assets.
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// A default center for the map
const defaultCenter: L.LatLngExpression = [39.8283, -98.5795];
const defaultZoom = 4;

// This helper component updates the map's view without re-initializing it.
function MapUpdater({ providers }: { providers: ServiceProvider[] }) {
  const map = useMap();
  useEffect(() => {
    const mapProviders = providers.filter(p => p.lat && p.lng);
    if (mapProviders.length > 0) {
      const providerWithCoords = mapProviders[0];
      map.flyTo([providerWithCoords.lat!, providerWithCoords.lng!], 8, {
        animate: true,
        duration: 1.5
      });
    } else {
      map.flyTo(defaultCenter, defaultZoom, {
        animate: true,
        duration: 1.5
      });
    }
  }, [providers, map]);

  return null; // This component does not render anything.
}

interface InteractiveMapProps {
  providers: ServiceProvider[];
}

export function InteractiveMap({ providers }: InteractiveMapProps) {
  const [isClient, setIsClient] = useState(false);

  // This effect runs only on the client, after the initial render.
  useEffect(() => {
    // This is the one-time setup for Leaflet's icons.
    // It corrects the path to the icon images.
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: iconRetina.src,
      iconUrl: icon.src,
      shadowUrl: iconShadow.src,
    });
    
    // Set a flag to indicate that we are now on the client.
    setIsClient(true);
  }, []);

  // Filter providers that have valid coordinates.
  const mapProviders = providers.filter(p => p.lat && p.lng);
  
  // This is the crucial part:
  // Render the map *only* after the useEffect has run and confirmed we're on the client.
  // This avoids the server-side rendering issues and the Strict Mode double-initialization problem.
  return isClient ? (
    <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        scrollWheelZoom={true} 
        style={{ height: '450px', width: '100%', borderRadius: '0.5rem', zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {mapProviders.map((provider) => (
        <Marker key={provider.id} position={[provider.lat!, provider.lng!]}>
          <Popup>
            <div className="font-sans">
              <h4 className="font-bold text-base">{provider.name}</h4>
              <p className="text-sm text-muted-foreground">{provider.location}</p>
              <p className="text-xs mt-1">Specialization: {provider.specialization}</p>
              <p className="text-xs">Rating: {provider.rating.toFixed(1)} ★</p>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {/* This component handles smooth transitions when the provider list changes. */}
      <MapUpdater providers={providers} />
    </MapContainer>
  ) : (
    // Render a placeholder on the server and during the initial client render.
    <div className="flex justify-center items-center h-[450px] w-full rounded-lg bg-muted">
      <Activity className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Initializing Map...</span>
    </div>
  );
}
