// src/app/recommendations/page.tsx
"use client";

import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Activity, Wrench } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function RecommendationsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

 useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/recommendations");
    } else if (user && user.role !== 'client') {
      router.push("/dashboard"); 
    }
  }, [user, authLoading, router]);

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
            <Alert variant="default" className="bg-yellow-50 border-yellow-200 text-yellow-800">
              <Wrench className="h-4 w-4 !text-yellow-600"/>
              <AlertTitle>Feature Temporarily Disabled</AlertTitle>
              <AlertDescription>
                The AI recommendations feature is currently undergoing maintenance to resolve build issues. 
                We apologize for the inconvenience. Please use the "Find Providers" page to search for professionals directly.
              </AlertDescription>
            </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
