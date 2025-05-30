
// src/app/settings/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SettingsIcon, ArrowLeft, Activity } from "lucide-react";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/settings");
    } else if (!loading && user && user.role === 'admin') {
      router.push("/admin/dashboard"); // Admins have their own settings potentially
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading settings...</span></div>;
  }

  if (!user || user.role === 'admin') {
    // Admins are redirected, other non-users will be caught by useEffect to /login
    return <div className="text-center py-10">Access Denied or Redirecting...</div>;
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" asChild>
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <SettingsIcon className="mr-2 h-6 w-6 text-primary" />
            Account Settings
          </CardTitle>
          <CardDescription>
            Manage your account preferences and details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Account settings and notification preferences are currently under development.
            Future features will include:
          </p>
          <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
            <li>Updating your email or password.</li>
            <li>Managing notification preferences for service requests and platform updates.</li>
            <li>Privacy settings.</li>
            <li>Deleting your account.</li>
          </ul>
          <div className="mt-6 p-6 border border-dashed rounded-lg text-center">
            [Account Settings Interface Placeholder]
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
