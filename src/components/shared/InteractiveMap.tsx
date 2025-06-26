// src/components/shared/InteractiveMap.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { ServiceProvider } from '@/lib/types';
import { useEffect } from 'react';

// A default center (e.g., center of the US)
const defaultCenter: L.LatLngExpression = [39.8283, -98.5795];
const defaultZoom = 4;

// This component programmatically updates the map view when props change.
function MapUpdater({ providers }: { providers: ServiceProvider[] }) {
  const map = useMap();

  useEffect(() => {
    if (providers && providers.length > 0) {
      const providerWithCoords = providers.find(p => p.lat && p.lng);
      if (providerWithCoords) {
        // Fly to the first provider in the list.
        map.flyTo([providerWithCoords.lat!, providerWithCoords.lng!], 8);
      }
    } else {
        // If no providers, fly back to the default view.
        map.flyTo(defaultCenter, defaultZoom);
    }
  }, [providers, map]);

  return null; // This component does not render anything itself.
}

interface InteractiveMapProps {
  providers: ServiceProvider[];
}

export function InteractiveMap({ providers }: InteractiveMapProps) {
  const mapProviders = providers.filter(p => p.lat && p.lng);

  // By keeping center and zoom props static on MapContainer, we prevent it from re-initializing.
  // The MapUpdater component handles dynamic view changes.
  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom} scrollWheelZoom={true} style={{ height: '450px', width: '100%', borderRadius: '0.5rem', zIndex: 0 }}>
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
      <MapUpdater providers={mapProviders} />
    </MapContainer>
  );
}
