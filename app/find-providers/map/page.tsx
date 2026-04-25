// app/find-providers/map/page.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowLeft, MapPin, ShieldCheck, List, Map as MapIcon } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  location: string;
  specialization: string;
  rating: number;
  description?: string;
  isVerified?: boolean;
  imageUrl?: string;
}

interface GeocodedProvider extends Provider {
  lat: number;
  lng: number;
}

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function loadCss(href: string) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
    if (existing) {
      if ((existing as any)._loaded) return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load " + src)));
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => {
      (s as any)._loaded = true;
      resolve();
    };
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.body.appendChild(s);
  });
}

async function geocode(query: string): Promise<{ lat: number; lng: number } | null> {
  if (!query) return null;
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`,
      { headers: { Accept: "application/json" } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    return null;
  } catch {
    return null;
  }
}

export default function ProvidersMapPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});

  const [providers, setProviders] = useState<GeocodedProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [leafletReady, setLeafletReady] = useState(false);

  // Auth guard: client OR admin only
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/find-providers/map");
    } else if (user && user.role !== "client" && user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  // Load Leaflet CSS+JS
  useEffect(() => {
    let cancelled = false;
    loadCss(LEAFLET_CSS);
    loadScript(LEAFLET_JS)
      .then(() => {
        if (!cancelled) setLeafletReady(true);
      })
      .catch((err) => console.error("Leaflet load failed:", err));
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch + geocode providers
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/providers");
        const json = await res.json();
        if (!json.success) throw new Error(json.error);
        const list: Provider[] = json.data || [];

        const geocoded: GeocodedProvider[] = [];
        for (const p of list) {
          if (!p.location || p.location.toLowerCase().includes("not set")) continue;
          const coords = await geocode(p.location);
          if (coords) geocoded.push({ ...p, ...coords });
          await new Promise((r) => setTimeout(r, 1100)); // Nominatim rate limit (1 req/sec)
          if (cancelled) return;
        }
        if (!cancelled) setProviders(geocoded);
      } catch (err) {
        console.error("Failed to load providers:", err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Init map
  useEffect(() => {
    if (!leafletReady || !mapElRef.current || mapRef.current) return;
    const L = (window as any).L;
    if (!L) return;
    const map = L.map(mapElRef.current, { scrollWheelZoom: true }).setView([29.7604, -95.3698], 3);
    L.tileLayer(TILE_URL, { attribution: TILE_ATTR, maxZoom: 19 }).addTo(map);
    mapRef.current = map;
  }, [leafletReady]);

  // Add markers when providers change
  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapRef.current) return;

    Object.values(markersRef.current).forEach((m: any) => m.remove());
    markersRef.current = {};

    const bounds: [number, number][] = [];
    for (const p of providers) {
      const marker = L.marker([p.lat, p.lng]).addTo(mapRef.current);
      marker.bindPopup(
        `<strong>${p.name}</strong><br/>${p.location}<br/><span style="color:#f59e0b">★ ${p.rating.toFixed(1)}</span>`
      );
      marker.on("click", () => setActiveId(p.id));
      markersRef.current[p.id] = marker;
      bounds.push([p.lat, p.lng]);
    }

    if (bounds.length > 0) {
      mapRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
    }
  }, [providers]);

  const handleCardClick = useCallback((p: GeocodedProvider) => {
    setActiveId(p.id);
    setMobileView("map");
    if (mapRef.current) {
      mapRef.current.setView([p.lat, p.lng], 11, { animate: true });
      const marker = markersRef.current[p.id];
      if (marker) marker.openPopup();
    }
  }, []);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Activity className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }
  if (!user || (user.role !== "client" && user.role !== "admin")) {
    return <div className="text-center py-10">Access denied. Redirecting...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <Button variant="outline" asChild>
          <Link href="/find-providers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Providers
          </Link>
        </Button>
        <div className="md:hidden flex gap-2">
          <Button
            size="sm"
            variant={mobileView === "list" ? "default" : "outline"}
            onClick={() => setMobileView("list")}
          >
            <List className="h-4 w-4 mr-1" /> List
          </Button>
          <Button
            size="sm"
            variant={mobileView === "map" ? "default" : "outline"}
            onClick={() => setMobileView("map")}
          >
            <MapIcon className="h-4 w-4 mr-1" /> Map
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-[calc(100vh-12rem)] min-h-[600px]">
        {/* List 40% */}
        <div
          className={`md:col-span-2 overflow-y-auto pr-2 ${mobileView === "list" ? "block" : "hidden"} md:block`}
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Activity className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : providers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <p>No providers with mappable locations.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {providers.map((p) => {
                const isActive = p.id === activeId;
                return (
                  <Card
                    key={p.id}
                    onClick={() => handleCardClick(p)}
                    className={`cursor-pointer transition ${isActive ? "ring-2 ring-primary shadow-md" : "hover:shadow-sm"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{p.name}</h3>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {p.location}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{p.specialization}</p>
                        </div>
                        {p.isVerified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                            <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-amber-500 text-sm">★ {p.rating.toFixed(1)}</span>
                        <Button asChild size="sm" variant="ghost" onClick={(e) => e.stopPropagation()}>
                          <Link href={`/request-service?providerId=${p.id}`}>Request</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Map 60% */}
        <div className={`md:col-span-3 ${mobileView === "map" ? "block" : "hidden"} md:block`}>
          <div
            ref={mapElRef}
            className="w-full h-full rounded-lg border bg-muted"
            style={{ minHeight: "600px" }}
          />
        </div>
      </div>
    </div>
  );
}
