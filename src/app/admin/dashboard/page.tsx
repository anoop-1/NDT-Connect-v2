
// src/app/admin/dashboard/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Briefcase, Settings, Shield, Activity, BarChart } from "lucide-react";

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/admin/dashboard");
    } else if (!loading && user && user.role !== 'admin') {
      router.push("/dashboard"); // Redirect non-admins
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading Admin Dashboard...</span></div>;
  }

  if (!user || user.role !== 'admin') {
    // This case should ideally be handled by the useEffect redirect,
    // but as a fallback:
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
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminActionCard
          title="Manage Users"
          description="View and manage client and service provider accounts."
          href="/admin/manage-users" // Placeholder
          icon={<Users className="h-8 w-8 text-primary" />}
        />
        <AdminActionCard
          title="Manage Services"
          description="Oversee service categories, approvals, and quality standards."
          href="/admin/manage-services" // Placeholder
          icon={<Briefcase className="h-8 w-8 text-primary" />}
        />
        <AdminActionCard
          title="Platform Settings"
          description="Configure global settings, fees, and platform parameters."
          href="/admin/platform-settings" // Placeholder
          icon={<Settings className="h-8 w-8 text-primary" />}
        />
        <AdminActionCard
          title="View Analytics"
          description="Access platform usage statistics and reports."
          href="/admin/analytics" // Placeholder
          icon={<BarChart className="h-8 w-8 text-primary" />}
        />
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

