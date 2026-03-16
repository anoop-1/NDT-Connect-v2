
// src/app/admin/manage-services/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, ArrowLeft } from "lucide-react";

export default function ManageServicesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/admin/manage-services");
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
            <Briefcase className="mr-2 h-6 w-6 text-primary" />
            Manage Services & Categories
          </CardTitle>
          <CardDescription>
            This section will allow administrators to oversee NDT service categories, approve new service types, and manage quality standards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Service management functionality is currently under development.
            Future features will include:
          </p>
          <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
            <li>Defining and managing NDT service categories (e.g., UT, MT, RT).</li>
            <li>Reviewing and approving custom services proposed by providers.</li>
            <li>Setting platform-wide quality guidelines or requirements for services.</li>
            <li>Managing lists of recognized certifications and standards.</li>
          </ul>
          <div className="mt-6 p-6 border border-dashed rounded-lg text-center">
            [Service Management Interface Placeholder]
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
