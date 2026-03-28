
// src/components/client/RecommendationResults.tsx
import type { Recommendation } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Info, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

interface RecommendationResultsProps {
  recommendations: Recommendation[];
}

export function RecommendationResults({ recommendations }: RecommendationResultsProps) {
  const router = useRouter();

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <Info className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground">No recommendations available based on your criteria.</p>
        <p className="text-sm text-muted-foreground">Try adjusting your search parameters.</p>
      </div>
    );
  }

  const handleRequestServiceFromRecommendation = (rec: Recommendation) => {
    const queryParams = new URLSearchParams({
      providerName: rec.providerName, 
      serviceType: rec.description.substring(0, 50) + "...",
      aiRecommendationId: rec.referenceId, 
    });
    // If AI provided a numeric rating that could be used as a base rate proxy:
    // if (rec.rating && !isNaN(rec.rating)) {
    //   queryParams.append("baseRate", rec.rating.toString()); // Example: using rating as a placeholder for a rate
    // }
    router.push(`/request-service?${queryParams.toString()}`);
  };


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">AI Recommended Service Providers</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {recommendations.map((rec) => (
          <Card key={rec.referenceId} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{rec.providerName}</CardTitle> 
              <CardDescription className="flex items-center text-sm text-muted-foreground">
                Ref: {rec.referenceId}
              </CardDescription>
              <div className="flex items-center text-sm text-muted-foreground pt-1">
                <Star className="h-4 w-4 mr-1 text-yellow-400" /> {rec.rating.toFixed(1)} Estimated Rating
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
              <Badge variant="secondary">AI Generated Profile</Badge>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row items-stretch sm:items-center sm:justify-end gap-2">
              <Button size="sm" className="w-full sm:w-auto" onClick={() => handleRequestServiceFromRecommendation(rec)}>
                <Briefcase className="h-4 w-4 mr-2"/> Request Service
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <p className="text-xs text-muted-foreground text-center">
        Note: AI recommendations are based on the information you provide. Company names and contact details are revealed upon initiating a service request.
      </p>
    </div>
  );
}
