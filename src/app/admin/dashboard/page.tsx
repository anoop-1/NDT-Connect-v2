
// src/app/admin/dashboard/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Briefcase, Settings, Shield, Activity, BarChart, Image as ImageIcon, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [homepageImageUrl, setHomepageImageUrl] = useState("");
  const [defaultProviderImageUrl, setDefaultProviderImageUrl] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/admin/dashboard");
    } else if (!loading && user && user.role !== 'admin') {
      router.push("/dashboard");
    } else {
      // Load URLs from localStorage on client-side
      const storedHomepageImg = localStorage.getItem('customHomepageImageUrl');
      if (storedHomepageImg) setHomepageImageUrl(storedHomepageImg);
      const storedDefaultProviderImg = localStorage.getItem('defaultProviderImageUrl');
      if (storedDefaultProviderImg) setDefaultProviderImageUrl(storedDefaultProviderImg);
    }
  }, [user, loading, router]);

  const handleSaveHomepageImage = () => {
    localStorage.setItem('customHomepageImageUrl', homepageImageUrl);
    toast({ title: "Homepage Image Updated", description: "The new URL has been saved locally." });
  };

  const handleSaveDefaultProviderImage = () => {
    localStorage.setItem('defaultProviderImageUrl', defaultProviderImageUrl);
    toast({ title: "Default Provider Image Updated", description: "The new URL has been saved locally." });
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading Admin Dashboard...</span></div>;
  }

  if (!user || user.role !== 'admin') {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="text-3xl text-primary">Administrator Dashboard</CardTitle>
              <CardDescription>Master control panel for NDT Connect.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p>Welcome, {user.name || user.email}! Use this panel to manage the platform.</p>
          <p className="text-xs text-muted-foreground mt-1">Note: Image URL changes are saved locally in your browser.</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminActionCard
          title="Manage Users"
          description="View and manage client and service provider accounts."
          href="/admin/manage-users"
          icon={<Users className="h-8 w-8 text-primary" />}
        />
        <AdminActionCard
          title="Manage Services"
          description="Oversee service categories, approvals, and quality standards."
          href="/admin/manage-services"
          icon={<Briefcase className="h-8 w-8 text-primary" />}
        />
        <AdminActionCard
          title="Platform Settings"
          description="Configure global settings, fees, and platform parameters."
          href="/admin/platform-settings"
          icon={<Settings className="h-8 w-8 text-primary" />}
        />
        <AdminActionCard
          title="View Analytics"
          description="Access platform usage statistics and reports."
          href="/admin/analytics"
          icon={<BarChart className="h-8 w-8 text-primary" />}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><ImageIcon className="mr-2 h-5 w-5"/>Manage Homepage Image</CardTitle>
            <CardDescription>Set a custom image URL for the main homepage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="homepageImageUrl">Homepage Image URL</Label>
              <Input 
                id="homepageImageUrl"
                type="url"
                placeholder="https://example.com/your-image.png"
                value={homepageImageUrl}
                onChange={(e) => setHomepageImageUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleSaveHomepageImage} size="sm">
              <Save className="mr-2 h-4 w-4"/>Save Homepage Image
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><ImageIcon className="mr-2 h-5 w-5"/>Manage Default Provider Image</CardTitle>
            <CardDescription>Set a default image URL for providers without their own logo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="defaultProviderImageUrl">Default Provider Image URL</Label>
              <Input 
                id="defaultProviderImageUrl"
                type="url"
                placeholder="https://example.com/default-provider.png"
                value={defaultProviderImageUrl}
                onChange={(e) => setDefaultProviderImageUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleSaveDefaultProviderImage} size="sm">
              <Save className="mr-2 h-4 w-4"/>Save Default Provider Image
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Overview (Placeholder)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This area will display key metrics such as total users, active service requests,
            revenue figures, and system health status.
          </p>
          <div className="mt-4 p-6 border border-dashed rounded-lg text-center">
            [Dashboard Widgets and Charts Will Appear Here]
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface AdminActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

function AdminActionCard({ title, description, href, icon }: AdminActionCardProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center text-center">
        <div className="p-3 bg-primary/10 rounded-full mb-3">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button asChild variant="outline">
          <Link href={href}>Go to {title}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
