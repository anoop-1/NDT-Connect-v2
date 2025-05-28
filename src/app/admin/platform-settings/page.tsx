
// src/app/admin/platform-settings/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Settings, ArrowLeft, DollarSign, Percent } from "lucide-react";

export default function PlatformSettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/admin/platform-settings");
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
            <Settings className="mr-2 h-6 w-6 text-primary" />
            Platform Settings
          </CardTitle>
          <CardDescription>
            This section will allow administrators to configure global settings for NDT Connect.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Platform settings management is currently under development. 
            Future features will include:
          </p>
          <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
            <li>
                <DollarSign className="inline h-4 w-4 mr-1" />
                Fee Management: Setting commission rates for client services and provider service fees.
            </li>
            <li>
                <Percent className="inline h-4 w-4 mr-1" />
                Registration Fees: Configuring initial registration fees for clients and providers.
            </li>
            <li>Content Management: Default images, site-wide announcements, email templates.</li>
            <li>API Key Management: For services like Google Maps, AI models, etc.</li>
            <li>Terms of Service and Privacy Policy updates.</li>
          </ul>
          <div className="mt-6 p-6 border border-dashed rounded-lg text-center">
            [Platform Settings Interface Placeholder]
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
