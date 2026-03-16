
// src/app/admin/analytics/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, ArrowLeft } from "lucide-react";

export default function AnalyticsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/admin/analytics");
    } else if (!loading && user && user.role !== 'admin') {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" asChild>
        <Link href="/admin/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin Dashboard
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="mr-2 h-6 w-6 text-primary" />
            Platform Analytics
          </CardTitle>
          <CardDescription>
            This section will display key metrics and reports about NDT Connect platform usage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Analytics and reporting features are currently under development.
            Future insights will include:
          </p>
          <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
            <li>User registration trends (clients vs. providers).</li>
            <li>Service request volume and completion rates.</li>
            <li>Popular NDT services and specializations.</li>
            <li>Geographical distribution of users and services.</li>
            <li>Revenue and fee collection summaries (conceptual).</li>
            <li>Platform engagement metrics.</li>
          </ul>
          <div className="mt-6 p-6 border border-dashed rounded-lg text-center">
            [Analytics Dashboard Placeholder - Charts and Graphs]
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
