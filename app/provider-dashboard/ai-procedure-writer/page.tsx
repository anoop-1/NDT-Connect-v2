// src/app/provider-dashboard/ai-procedure-writer/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, FileSignature, Activity, Wrench } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


function AIProcedureWriterPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/provider-dashboard/ai-procedure-writer");
    } else if (user && user.role !== 'provider') {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading...</span></div>;
  }
  if (!user || user.role !== 'provider') {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="outline" asChild>
          <Link href="/provider-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Provider Dashboard
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileSignature className="mr-2 h-6 w-6 text-primary" />
            AI Procedure Writer
          </CardTitle>
          <CardDescription>
            Provide the key details and the AI will generate a comprehensive NDT procedure for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Alert variant="default" className="bg-yellow-50 border-yellow-200 text-yellow-800">
              <Wrench className="h-4 w-4 !text-yellow-600"/>
              <AlertTitle>Feature Temporarily Disabled</AlertTitle>
              <AlertDescription>
                The AI Procedure Writer is currently undergoing maintenance to resolve build issues. 
                We apologize for the inconvenience and are working to restore this feature soon.
              </AlertDescription>
            </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

export default AIProcedureWriterPage;
