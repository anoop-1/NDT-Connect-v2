
// src/app/admin/platform-settings/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Settings, ArrowLeft, DollarSign, Percent, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_CLIENT_COMMISSION_RATE = 15;
const DEFAULT_PROVIDER_PLATFORM_FEE = 10;

export default function PlatformSettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [clientCommissionRate, setClientCommissionRate] = useState<number>(DEFAULT_CLIENT_COMMISSION_RATE);
  const [providerPlatformFee, setProviderPlatformFee] = useState<number>(DEFAULT_PROVIDER_PLATFORM_FEE);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/admin/platform-settings");
    } else if (!loading && user && user.role !== 'admin') {
      router.push("/dashboard");
    } else if (!loading && user && user.role === 'admin') {
      // Load rates from localStorage
      const storedClientRate = localStorage.getItem('clientCommissionRate');
      if (storedClientRate) {
        setClientCommissionRate(parseFloat(storedClientRate));
      }
      const storedProviderFee = localStorage.getItem('providerPlatformFee');
      if (storedProviderFee) {
        setProviderPlatformFee(parseFloat(storedProviderFee));
      }
    }
  }, [user, loading, router]);

  const handleSaveClientCommission = () => {
    localStorage.setItem('clientCommissionRate', clientCommissionRate.toString());
    toast({ title: "Client Commission Updated", description: "The new rate has been saved locally." });
  };

  const handleSaveProviderFee = () => {
    localStorage.setItem('providerPlatformFee', providerPlatformFee.toString());
    toast({ title: "Provider Platform Fee Updated", description: "The new fee has been saved locally." });
  };


  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
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
            Configure global settings and fee structures for NDT Connect. Rates saved here are stored locally in your browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-primary" />
                Fee Structure Management
              </CardTitle>
              <CardDescription>
                Set platform fees and commissions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3 p-4 border rounded-md">
                <h4 className="font-semibold flex items-center">
                  <Percent className="mr-1 h-4 w-4 text-green-600" /> Client-Facing Service Commission
                </h4>
                <p className="text-sm text-muted-foreground">
                  A commission of <span className="font-bold text-primary">{clientCommissionRate}%</span> is conceptually added to the service provider's rate when displaying the estimated cost to clients.
                </p>
                <div className="flex items-end gap-3">
                    <div className="flex-grow">
                        <Label htmlFor="clientCommissionRate">New Commission Rate (%)</Label>
                        <Input 
                            id="clientCommissionRate"
                            type="number"
                            value={clientCommissionRate}
                            onChange={(e) => setClientCommissionRate(parseFloat(e.target.value) || 0)}
                            placeholder="e.g., 15"
                        />
                    </div>
                    <Button onClick={handleSaveClientCommission} size="sm">
                        <Save className="mr-2 h-4 w-4"/>Save Rate
                    </Button>
                </div>
                 <p className="text-xs text-muted-foreground italic">
                  Example: If a provider's base rate is $100 and commission is {clientCommissionRate}%, the client sees an estimated cost of ${ (100 * (1 + clientCommissionRate/100)).toFixed(2) }.
                </p>
              </div>

              <div className="space-y-3 p-4 border rounded-md">
                <h4 className="font-semibold flex items-center">
                   <Percent className="mr-1 h-4 w-4 text-red-600" /> Service Provider Platform Fee
                </h4>
                <p className="text-sm text-muted-foreground">
                  A platform fee of <span className="font-bold text-primary">{providerPlatformFee}%</span> is conceptually applied to the service provider's earnings from completed services.
                </p>
                 <div className="flex items-end gap-3">
                    <div className="flex-grow">
                        <Label htmlFor="providerPlatformFee">New Platform Fee (%)</Label>
                        <Input 
                            id="providerPlatformFee"
                            type="number"
                            value={providerPlatformFee}
                            onChange={(e) => setProviderPlatformFee(parseFloat(e.target.value) || 0)}
                            placeholder="e.g., 10"
                        />
                    </div>
                    <Button onClick={handleSaveProviderFee} size="sm">
                        <Save className="mr-2 h-4 w-4"/>Save Fee
                    </Button>
                </div>
                 <p className="text-xs text-muted-foreground italic">
                  Example: If a service is completed for $100 (provider's rate) and platform fee is {providerPlatformFee}%, the provider conceptually receives ${ (100 * (1 - providerPlatformFee/100)).toFixed(2) }.
                </p>
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-lg font-semibold mb-2">Future Settings</h3>
            <p className="text-muted-foreground">
              Additional platform settings management is currently under development. 
              Future features will include:
            </p>
            <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
              <li>Registration Fees: Configuring initial registration fees for clients and providers.</li>
              <li>Content Management: Default images, site-wide announcements, email templates.</li>
              <li>API Key Management: For services like Google Maps, AI models, etc.</li>
              <li>Terms of Service and Privacy Policy updates.</li>
            </ul>
            <div className="mt-6 p-6 border border-dashed rounded-lg text-center">
              [Platform Settings Interface Placeholder for Other Editable Fields]
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
