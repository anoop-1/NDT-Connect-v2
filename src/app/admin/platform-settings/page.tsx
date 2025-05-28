
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

  const clientCommissionRate = 15; // Conceptual rate
  const providerPlatformFee = 10; // Conceptual rate

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
            This section will allow administrators to configure global settings for NDT Connect. Currently, it displays conceptual fee structures.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-primary" />
                Fee Structure (Conceptual)
              </CardTitle>
              <CardDescription>
                Overview of how platform fees and commissions are structured. These are currently informational.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold flex items-center">
                  <Percent className="mr-1 h-4 w-4 text-green-600" /> Client-Facing Service Commission
                </h4>
                <p className="text-sm text-muted-foreground">
                  A commission of <span className="font-bold text-primary">{clientCommissionRate}%</span> is conceptually added to the service provider's rate when displaying the estimated cost to clients.
                </p>
                <p className="text-xs text-muted-foreground italic">
                  Example: If a provider's base rate is $100, the client sees an estimated cost of $115.
                </p>
              </div>
              <div>
                <h4 className="font-semibold flex items-center">
                   <Percent className="mr-1 h-4 w-4 text-red-600" /> Service Provider Platform Fee
                </h4>
                <p className="text-sm text-muted-foreground">
                  A platform fee of <span className="font-bold text-primary">{providerPlatformFee}%</span> is conceptually applied to the service provider's earnings from completed services.
                </p>
                 <p className="text-xs text-muted-foreground italic">
                  Example: If a service is completed for $100 (provider's rate), the provider conceptually receives $90.
                </p>
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-lg font-semibold mb-2">Future Settings</h3>
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
              [Platform Settings Interface Placeholder for Editable Fields]
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
