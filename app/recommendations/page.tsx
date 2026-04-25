// src/app/recommendations/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Activity, Sparkles, Search, Star, ShieldCheck, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const SERVICE_TYPES = [
  "Ultrasonic Testing (UT)",
  "Radiographic Testing (RT)",
  "Magnetic Particle Testing (MT)",
  "Liquid Penetrant Testing (PT)",
  "Visual Testing (VT)",
  "Eddy Current Testing (ECT)",
  "Phased Array Ultrasonic Testing (PAUT)",
  "Time-of-Flight Diffraction (TOFD)",
  "Acoustic Emission Testing (AET)",
  "Leak Testing (LT)",
  "Thermal/Infrared Testing (IRT)",
  "Guided Wave Testing (GWT)",
];

interface Recommendation {
  referenceId: string;
  providerName: string;
  description: string;
  rating: number;
  location?: string;
  isVerified?: boolean;
}

export default function RecommendationsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [location, setLocation] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [standard, setStandard] = useState("");
  const [assetToBeInspected, setAssetToBeInspected] = useState("");

  const [results, setResults] = useState<Recommendation[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/recommendations");
    } else if (user && user.role !== "client" && user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Activity className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading recommendations...</span>
      </div>
    );
  }

  if (user && user.role !== "client" && user.role !== "admin") {
    return <div className="text-center py-10">Access denied. This page is for clients.</div>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!serviceType && !location && !specialization) {
      toast({ title: "Add a search criteria", description: "Enter at least a location, service type, or specialization.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    setHasSearched(true);
    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, serviceType, specialization, standard, assetToBeInspected }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Failed to fetch recommendations");
      setResults(json.data || []);
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to load recommendations", variant: "destructive" });
      setResults([]);
    } finally {
      setSubmitting(false);
    }
  }

  function renderStars(rating: number) {
    const full = Math.floor(rating);
    const hasHalf = rating - full >= 0.5;
    return (
      <span className="flex items-center gap-0.5 text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < full ? "fill-amber-500" : i === full && hasHalf ? "fill-amber-300" : "fill-none"}`}
          />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(1)}</span>
      </span>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center">
            <Sparkles className="mr-2 h-7 w-7 text-primary" />
            AI-Powered Provider Recommendations
          </CardTitle>
          <CardDescription>
            Tell us your needs, and we'll match you with the best NDT service providers from our verified network.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location <span className="text-destructive">*</span></Label>
              <Input
                id="location"
                placeholder="e.g. Houston, TX"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type <span className="text-destructive">*</span></Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger id="serviceType">
                  <SelectValue placeholder="Select NDT service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_TYPES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                placeholder="e.g. Pipeline integrity"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="standard">Standard <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input
                id="standard"
                placeholder="e.g. ASME, API 510, ISO 9712"
                value={standard}
                onChange={(e) => setStandard(e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="asset">Asset to be inspected <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input
                id="asset"
                placeholder="e.g. Pressure vessel, storage tank, pipeline weld"
                value={assetToBeInspected}
                onChange={(e) => setAssetToBeInspected(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={submitting} className="w-full md:w-auto">
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                Find Recommendations
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {hasSearched && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {submitting
              ? "Finding the best providers..."
              : `${results.length} provider${results.length === 1 ? "" : "s"} matched`}
          </h2>
          {!submitting && results.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <p>No providers matched your criteria. Try broadening the location or service type.</p>
              </CardContent>
            </Card>
          )}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((r) => (
              <Card key={r.referenceId} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">{r.providerName}</CardTitle>
                    {r.isVerified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                      </Badge>
                    )}
                  </div>
                  {r.location && (
                    <CardDescription className="text-xs">{r.location}</CardDescription>
                  )}
                  <div>{renderStars(r.rating)}</div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground line-clamp-4 flex-1">{r.description}</p>
                  <div className="mt-4">
                    <Button asChild className="w-full">
                      <Link href={`/request-service?providerId=${r.referenceId}`}>
                        Request Service
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
