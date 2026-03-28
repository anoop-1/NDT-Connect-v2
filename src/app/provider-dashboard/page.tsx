// src/app/provider-dashboard/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, UserCircle, Settings, Activity, FileSignature, Wrench, CalendarClock, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


export default function ProviderDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/provider-dashboard");
    } else if (user && user.role !== 'provider') {
      // If user is not a provider (e.g., client or admin), redirect to their main dashboard
      router.push("/dashboard"); 
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading provider dashboard...</span></div>;
  }

  // This condition handles the case where the user is loaded but is not a provider.
  // The useEffect above should handle the redirect, but this is a fallback.
  if (!user || user.role !== 'provider') {
    return <div className="text-center py-10">Access Denied. This page is for service providers. Redirecting...</div>;
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Provider Dashboard</CardTitle>
          <CardDescription>Manage your NDT services and client requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Welcome, {user.name || user.email}! Here you can manage your profile, view service requests, and more.</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardActionCard
          title="Service Requests"
          description="View and manage incoming service requests from clients."
          href="/provider-requests"
          icon={<Briefcase className="h-8 w-8 text-primary" />}
        />
        <DashboardActionCard
          title="AI Procedure Writer"
          description="Use Claude AI to generate comprehensive NDT procedures."
          href="/provider-dashboard/ai-procedure-writer"
          icon={<FileSignature className="h-8 w-8 text-primary" />}
        />
        <DashboardActionCard
          title="Certifications"
          description="Manage NDT Level I/II/III and company certifications with expiry tracking."
          href="/provider-dashboard/certifications"
          icon={<Award className="h-8 w-8 text-primary" />}
        />
        <DashboardActionCard
          title="Equipment Management"
          description="Track your NDT equipment inventory, serial numbers, and status."
          href="/provider-dashboard/equipment"
          icon={<Wrench className="h-8 w-8 text-primary" />}
        />
        <DashboardActionCard
          title="Calibration Alerts"
          description="Monitor calibration due dates and set up email reminders."
          href="/provider-dashboard/calibration"
          icon={<CalendarClock className="h-8 w-8 text-primary" />}
        />
        <DashboardActionCard
          title="Manage Profile"
          description="Update your company details, services offered, and availability."
          href="/provider-profile"
          icon={<UserCircle className="h-8 w-8 text-primary" />}
        />
        <DashboardActionCard
          title="Account Settings"
          description="Manage your NDT Connect account settings and preferences."
          href="/settings"
          icon={<Settings className="h-8 w-8 text-primary" />}
        />
      </div>
    </div>
  );
}

interface DashboardActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

function DashboardActionCard({ title, description, href, icon }: DashboardActionCardProps) {
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
        <Button asChild>
          <Link href={href}>{title}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
