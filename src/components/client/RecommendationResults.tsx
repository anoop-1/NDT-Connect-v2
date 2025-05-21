// src/components/client/RecommendationResults.tsx
import type { Recommendation } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Star, Info } from "lucide-react";

interface RecommendationResultsProps {
  recommendations: Recommendation[];
}

export function RecommendationResults({ recommendations }: RecommendationResultsProps) {
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <Info className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground">No recommendations available based on your criteria.</p>
        <p className="text-sm text-muted-foreground">Try adjusting your search parameters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Recommended Service Providers</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{rec.providerName}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="h-4 w-4 mr-1 text-yellow-400" /> {rec.rating.toFixed(1)} Rating
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
              <Badge variant="secondary">AI Recommended</Badge>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-2">
               <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Phone className="h-4 w-4 mr-2" /> {rec.contactInfo}
              </Button>
              <Button size="sm" className="w-full sm:w-auto" onClick={() => alert(`Contacting ${rec.providerName}`)}>Contact Provider</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}