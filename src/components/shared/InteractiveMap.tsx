
// src/components/shared/InteractiveMap.tsx
"use client";

import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { ServiceProvider } from '@/lib/types';
import { useEffect } from 'react';

// --- LEAFLET ICON FIX ---
// This is a common workaround for a known issue with Leaflet and Webpack/Next.js
// where the default marker icons do not appear correctly.
// We are manually importing the icon images and setting them on Leaflet's default icon prototype.
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  iconRetinaUrl: iconRetina.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

// A default center (e.g., center of the US)
const defaultCenter: L.LatLngExpression = [39.8283, -98.5795];

interface InteractiveMapProps {
  providers: ServiceProvider[];
}

export function InteractiveMap({ providers }: InteractiveMapProps) {
  
  // This effect ensures the default icon is set on the client side.
  useEffect(() => {
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  const mapProviders = providers.filter(p => p.lat && p.lng);

  const mapCenter = mapProviders.length > 0 && mapProviders[0].lat && mapProviders[0].lng
    ? [mapProviders[0].lat, mapProviders[0].lng] as L.LatLngExpression
    : defaultCenter;
  
  const zoomLevel = mapProviders.length > 0 ? 8 : 4;
  
  return (
    <MapContainer center={mapCenter} zoom={zoomLevel} scrollWheelZoom={true} style={{ height: '450px', width: '100%', borderRadius: '0.5rem', zIndex: 0 }}>
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
    </MapContainer>
  );
}
