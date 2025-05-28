
// src/app/admin/manage-users/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";

export default function ManageUsersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/admin/manage-users");
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
            <Users className="mr-2 h-6 w-6 text-primary" />
            Manage Users
          </CardTitle>
          <CardDescription>
            This section will allow administrators to view, edit, and manage client and service provider accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            User management functionality is currently under development. 
            Future features will include:
          </p>
          <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
            <li>Viewing lists of all registered clients and providers.</li>
            <li>Activating/deactivating user accounts.</li>
            <li>Editing user profile information.</li>
            <li>Managing user roles and permissions.</li>
            <li>Verifying service provider credentials.</li>
          </ul>
          <div className="mt-6 p-6 border border-dashed rounded-lg text-center">
            [User Management Interface Placeholder]
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
