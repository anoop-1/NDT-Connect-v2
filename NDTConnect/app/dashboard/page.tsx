
// src/app/dashboard/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Activity, Briefcase, Search, Sparkles, UserCircle, Shield, Settings, FileBarChart } from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/dashboard");
    } else if (!loading && user) {
      if (user.role === 'admin') {
        router.push("/admin/dashboard");
      } else if (user.role === 'provider') {
        router.push("/provider-dashboard");
      } else if (user.role === 'inspector') {
        router.push("/inspector-dashboard");
      }
      // Clients will remain on this page
    }
  }, [user, loading, router]);

  if (loading || (!user && !loading)) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading dashboard...</span></div>;
  }

  // If user is not a client at this point (e.g. admin/provider still rendering before redirect effect fully processes), show a generic loading or access denied.
  // Or, more specifically, ensure this content only shows for clients.
  if (!user || user.role !== 'client') {
    // This message might briefly appear for admin/provider before redirect.
    // Or, if redirect logic is robust, it might only appear if user somehow gets here without a role.
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Accessing dashboard...</span></div>;
  }
  
  // Content below is now only for clients
  return (
    <div className="max-w-7xl mx-auto space-y-8">
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
          <DashboardActionCard
            title="View Reports"
            description="Access and download your NDT inspection reports."
            href="https://dt.atlantisndt.com"
            icon={<FileBarChart className="h-8 w-8 text-primary" />}
            external={true}
          />
           <DashboardActionCard
            title="Account Settings"
            description="Manage your account details and preferences."
            href="/settings"
            icon={<Settings className="h-8 w-8 text-primary" />}
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
  external?: boolean;
}

function DashboardActionCard({ title, description, href, icon, external = false }: DashboardActionCardProps) {
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
            <a href={href} target="_blank" rel="noopener noreferrer">Go to {title}</a>
          </Button>
        ) : (
          <Button asChild>
            <Link href={href}>Go to {title}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
