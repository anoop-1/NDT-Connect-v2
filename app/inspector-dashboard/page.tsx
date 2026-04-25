// app/inspector-dashboard/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Activity, Briefcase, Award, Wrench, CalendarClock, FileSignature, Zap, Settings, UserCircle } from "lucide-react";

export default function InspectorDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/inspector-dashboard");
    } else if (!loading && user && user.role !== 'inspector') {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading inspector dashboard...</span></div>;
  }

  if (!user || user.role !== 'inspector') {
    return <div className="text-center py-10">Access Denied. This page is for NDT inspectors. Redirecting...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Inspector Dashboard</CardTitle>
          <CardDescription>Manage your qualifications, equipment, and inspection assignments.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Welcome, {user.name || user.email}! Here you can track your certifications, equipment, and available inspection jobs.</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardActionCard
          title="My Qualifications"
          description="View and manage your NDT certifications and qualifications."
          href="/provider-dashboard/certifications"
          icon={<Award className="h-8 w-8 text-primary" />}
        />
        <DashboardActionCard
          title="Skill Matrix"
          description="Track your expertise in different NDT methods."
          href="/inspector-dashboard/skill-matrix"
          icon={<Zap className="h-8 w-8 text-primary" />}
        />
        <DashboardActionCard
          title="Equipment"
          description="Manage your NDT equipment inventory and status."
          href="/provider-dashboard/equipment"
          icon={<Wrench className="h-8 w-8 text-primary" />}
        />
        <DashboardActionCard
          title="Calibration Alerts"
          description="Monitor equipment calibration due dates."
          href="/provider-dashboard/calibration"
          icon={<CalendarClock className="h-8 w-8 text-primary" />}
        />
        <DashboardActionCard
          title="Available Jobs"
          description="Browse and accept available inspection assignments."
          href="/inspector-dashboard/jobs"
          icon={<Briefcase className="h-8 w-8 text-primary" />}
        />
        <DashboardActionCard
          title="My Assignments"
          description="View your current and past inspection assignments."
          href="/inspector-dashboard/assignments"
          icon={<FileSignature className="h-8 w-8 text-primary" />}
        />
        <DashboardActionCard
          title="My Profile"
          description="View and update your public inspector profile visible to clients."
          href="/provider-profile"
          icon={<UserCircle className="h-8 w-8 text-primary" />}
        />
        <DashboardActionCard
          title="AI Procedure Writer"
          description="Generate NDT procedures using AI assistance."
          href="/provider-dashboard/ai-procedure-writer"
          icon={<FileSignature className="h-8 w-8 text-primary" />}
        />
        <DashboardActionCard
          title="Account Settings"
          description="Manage your profile and account preferences."
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
  external?: boolean;
}

function DashboardActionCard({ title, description, href, icon, external = false }: DashboardActionCardProps) {
  const linkProps = external ? {
    as: 'a',
    href: href,
    target: '_blank',
    rel: 'noopener noreferrer'
  } : undefined;

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
        {external ? (
          <Button asChild>
            <a href={href} target="_blank" rel="noopener noreferrer">{title}</a>
          </Button>
        ) : (
          <Button asChild>
            <Link href={href}>{title}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
