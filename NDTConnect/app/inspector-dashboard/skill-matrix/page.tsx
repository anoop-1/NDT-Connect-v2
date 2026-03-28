// app/inspector-dashboard/skill-matrix/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Activity, Zap } from "lucide-react";

export default function SkillMatrixPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/inspector-dashboard/skill-matrix");
    } else if (!authLoading && user && user.role !== 'inspector') {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading...</span></div>;
  }

  if (!user || user.role !== 'inspector') {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/inspector-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inspector Dashboard
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-6 w-6 text-primary" />
            Skill Matrix
          </CardTitle>
          <CardDescription>Track your expertise in different NDT methods and inspection types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg font-medium mb-2">Skill Matrix</p>
            <p className="text-sm">This feature is coming soon. You'll be able to track your expertise in various NDT methods and inspection categories.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
