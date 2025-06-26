
// src/app/settings/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SettingsIcon, ArrowLeft, Activity, Save, User, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { User as UserType } from "@/lib/types";

export default function SettingsPage() {
  const { user, updateUser, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/settings");
    } else if (user) {
      setDisplayName(user.name || "");
      if (user.role === 'client' && user.clientProfile) {
        setContactNumber(user.clientProfile.contactNumber || "");
      } else if (user.role === 'provider' && user.providerProfile) {
        setContactNumber(user.providerProfile.contactNumber || "");
      }
    }
  }, [user, loading, router]);

  const handleSaveSettings = async () => {
    if (!user) return;
    setIsSubmitting(true);

    const updatedUser: UserType = { 
      ...user, 
      name: displayName 
    };

    if (user.role === 'client') {
      updatedUser.clientProfile = {
        ...(user.clientProfile || {}),
        contactNumber: contactNumber,
      };
    } else if (user.role === 'provider') {
      updatedUser.providerProfile = {
        ...(user.providerProfile || {}),
        contactNumber: contactNumber,
      };
    }

    try {
        await updateUser(updatedUser);
        toast({
            title: "Settings Saved",
            description: "Your account details have been updated in the database.",
        });
    } catch (error) {
        toast({
            title: "Error Saving Settings",
            description: "Could not save settings to the database.",
            variant: "destructive",
        });
        console.error("Error saving settings to Firestore:", error);
    } finally {
        setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading settings...</span></div>;
  }

  if (!user || user.role === 'admin') {
    return <div className="text-center py-10">Access Denied or Redirecting...</div>;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
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
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName" className="flex items-center"><User className="mr-2 h-4 w-4 text-muted-foreground"/>Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber" className="flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground"/>Contact Number</Label>
            <Input
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Your contact number"
            />
          </div>

          <Button onClick={handleSaveSettings} disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? (
                <> <Activity className="mr-2 h-4 w-4 animate-spin" /> Saving... </>
            ) : (
                <> <Save className="mr-2 h-4 w-4" /> Save Settings </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
