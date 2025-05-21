// src/app/recommendations/page.tsx
"use client";

import { useState, useEffect } from "react";
import { RecommendationForm } from "@/components/client/RecommendationForm";
import { RecommendationResults } from "@/components/client/RecommendationResults";
import { optimizeServiceProviderRecommendations } from "@/ai/flows/optimize-service-provider-recommendations";
import type { OptimizeServiceProviderRecommendationsInput } from "@/ai/flows/optimize-service-provider-recommendations";
import type { Recommendation } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Activity } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

 useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/recommendations");
    } else if (user && user.role !== 'client') {
      router.push("/dashboard"); 
    }
  }, [user, authLoading, router]);


  const handleSubmit = async (data: OptimizeServiceProviderRecommendationsInput) => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const result = await optimizeServiceProviderRecommendations(data);
      if (result && result.providerRecommendations) {
        // The AI returns a stringified JSON, so we need to parse it.
        const parsedRecommendations: Recommendation[] = JSON.parse(result.providerRecommendations);
        setRecommendations(parsedRecommendations);
      } else {
        setError("The AI did not return any recommendations. Please try again.");
      }
    } catch (e) {
      console.error("Error fetching recommendations:", e);
      setError("Failed to get recommendations. The AI might be unavailable or there was an issue with your request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (authLoading || (!user && !authLoading)) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading recommendations...</span></div>;
  }
  
  if (user && user.role !== 'client') {
    return <div className="text-center py-10">Access denied. This page is for clients.</div>;
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">AI-Powered Provider Recommendations</CardTitle>
          <CardDescription>
            Tell us your needs, and our intelligent system will suggest the best NDT service providers for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecommendationForm onSubmit={handleSubmit} isLoading={isLoading} />
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading && !error && (
         <div className="text-center py-10">
          <Activity className="h-12 w-12 mx-auto text-primary animate-spin mb-4" />
          <p className="text-lg">Fetching recommendations, please wait...</p>
        </div>
      )}

      {!isLoading && !error && recommendations.length > 0 && (
        <RecommendationResults recommendations={recommendations} />
      )}
      
      {!isLoading && !error && recommendations.length === 0 && !error && (
        <div className="text-center py-8 mt-4 border border-dashed rounded-lg p-8 bg-muted/50">
           <p className="text-muted-foreground">Enter your requirements above to get started.</p>
        </div>
      )}
    </div>
  );
}