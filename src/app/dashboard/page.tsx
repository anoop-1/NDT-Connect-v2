// src/app/dashboard/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Activity, Briefcase, Search, Sparkles, UserCircle } from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading dashboard...</span></div>;
  }

  if (!user) {
    // This case should ideally be handled by the useEffect redirect,
    // but as a fallback:
    return <div className="text-center py-10">Redirecting to login...</div>;
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to your Dashboard, {user.name || user.email}!</CardTitle>
          <CardDescription>You are logged in as a <span className="font-semibold text-primary">{user.role}</span>.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is your central hub for NDT Connect. Use the navigation to access features relevant to your role.</p>
        </CardContent>
      </Card>

      {user.role === 'client' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardActionCard
            title="Find Providers"
            description="Search for NDT service providers based on location and expertise."
            href="/find-providers"
            icon={<Search className="h-8 w-8 text-primary" />}
          />
          <DashboardActionCard
            title="Get Recommendations"
            description="Use our AI tool to find the best provider for your needs."
            href="/recommendations"
            icon={<Sparkles className="h-8 w-8 text-primary" />}
          />
          <DashboardActionCard
            title="My Service Requests"
            description="Track the status of your ongoing and past service requests."
            href="/my-requests"
            icon={<Briefcase className="h-8 w-8 text-primary" />}
          />
        </div>
      )}

      {user.role === 'provider' && (
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardActionCard
            title="View Service Requests"
            description="Manage incoming service requests from clients."
            href="/provider-requests" // Will be a placeholder page
            icon={<Briefcase className="h-8 w-8 text-primary" />}
          />
          <DashboardActionCard
            title="Manage Profile"
            description="Update your service offerings and company details."
            href="/provider-profile" // Placeholder
            icon={<UserCircle className="h-8 w-8 text-primary" />}
          />
        </div>
      )}
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
          <Link href={href}>Go to {title}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}