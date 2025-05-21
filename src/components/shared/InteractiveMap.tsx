// src/components/shared/InteractiveMap.tsx
"use client";

import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import type { ServiceProvider } from '@/lib/types';
import { useState, useCallback } from 'react';
import { Pin } from 'lucide-react'; // Using Pin as a generic marker icon

const containerStyle = {
  width: '100%',
  height: '450px', // Or use aspect-video in parent for responsive height
  borderRadius: '0.5rem',
};

// A default center (e.g., center of the US)
const defaultCenter = {
  lat: 39.8283,
  lng: -98.5795,
};

interface InteractiveMapProps {
  providers: ServiceProvider[];
}

export function InteractiveMap({ providers }: InteractiveMapProps) {
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const mapCenter = providers.length > 0 && providers[0].lat && providers[0].lng
    ? { lat: providers[0].lat, lng: providers[0].lng }
    : defaultCenter;
  
  const zoomLevel = providers.length > 0 ? 8 : 5;

  const onMarkerClick = useCallback((provider: ServiceProvider) => {
    // For now, clicking a marker doesn't do much.
    // In a future version, this could open an InfoWindow or trigger another action.
    // console.log("Marker clicked:", provider.name);
    setSelectedProvider(provider); // Basic selection for potential InfoWindow
  }, []);


  if (!apiKey) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-destructive/10 text-destructive h-[450px]">
        <h3 className="text-lg font-semibold">Google Maps API Key Missing</h3>
        <p className="text-sm text-center">
          The Google Maps API key is not configured. Please set the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.
        </p>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['marker']}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoomLevel}
        options={{ 
          streetViewControl: false, 
          mapTypeControl: false,
          fullscreenControl: false,
           // You can add more map styling options here
           styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }] // Hide points of interest
            },
            {
              featureType: "transit",
              elementType: "labels",
              stylers: [{ visibility: "off" }] // Hide transit stations
            },
            {
              featureType: "road.highway",
              elementType: "labels",
              stylers: [{ visibility: "simplified"}]
            }
           ]
        }}
      >
        {providers.map((provider) => {
          if (provider.lat && provider.lng) {
            return (
              <MarkerF
                key={provider.id}
                position={{ lat: provider.lat, lng: provider.lng }}
                onClick={() => onMarkerClick(provider)}
                // title={provider.name} // Title appears on hover, respect privacy rule for now
                // Icon prop can be used for custom markers:
                // icon={{
                //   url: '/path/to/custom-marker-icon.svg',
                //   scaledSize: new window.google.maps.Size(30, 30),
                // }}
              />
            );
          }
          return null;
        })}
        {/* 
          // Example of InfoWindow, currently commented out to respect name/contact privacy
          {selectedProvider && selectedProvider.lat && selectedProvider.lng && (
            <InfoWindowF
              position={{ lat: selectedProvider.lat, lng: selectedProvider.lng }}
              onCloseClick={() => setSelectedProvider(null)}
            >
              <div>
                <h4>{selectedProvider.specialization}</h4>
                <p>Services: {selectedProvider.services.slice(0,2).join(', ')}...</p>
                <p>Rating: {selectedProvider.rating}</p>
              </div>
            </InfoWindowF>
          )}
        */}
      </GoogleMap>
    </LoadScript>
  );
}
