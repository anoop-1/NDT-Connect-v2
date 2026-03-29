// app/inspector-dashboard/jobs/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Activity, Briefcase, MapPin, FileText, Calendar, Loader2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface ServiceRequest {
  _id: string;
  clientId: string;
  clientName?: string;
  clientEmail?: string;
  serviceType: string;
  location: string;
  description: string;
  requestedDate?: string;
  status: string;
  estimatedCost?: number;
}

export default function InspectorJobsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [jobs, setJobs] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/inspector-dashboard/jobs");
    } else if (!authLoading && user && user.role !== 'inspector') {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && user.id) {
      fetchAvailableJobs();
    }
  }, [user]);

  const fetchAvailableJobs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/service-requests?status=Pending&includeOpen=true');
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const result = await response.json();
      if (result.success) {
        setJobs(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load available jobs",
        variant: "destructive"
      });
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptJob = async (jobId: string) => {
    if (!user || !user.id) return;

    try {
      setAcceptingId(jobId);
      const response = await fetch(`/api/service-requests/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerId: user.id,
          providerName: user.name || user.email,
          status: 'Confirmed'
        })
      });

      if (!response.ok) throw new Error('Failed to accept job');

      toast({
        title: "Success",
        description: "Job accepted! Check your assignments for more details."
      });

      await fetchAvailableJobs();
    } catch (error) {
      console.error('Error accepting job:', error);
      toast({
        title: "Error",
        description: "Failed to accept job",
        variant: "destructive"
      });
    } finally {
      setAcceptingId(null);
    }
  };

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
            <Briefcase className="mr-2 h-6 w-6 text-primary" />
            Available Inspection Jobs
          </CardTitle>
          <CardDescription>Browse and accept service requests that match your qualifications</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No available jobs</p>
              <p className="text-sm">Check back later for new inspection requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job._id} className="border hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{job.serviceType}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                        </div>
                        <Badge>{job.status}</Badge>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-foreground">{job.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {job.requestedDate && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(job.requestedDate).toLocaleDateString()}
                          </div>
                        )}
                        {job.estimatedCost && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            Est. ${job.estimatedCost.toLocaleString()}
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t">
                        <Button
                          onClick={() => handleAcceptJob(job._id)}
                          disabled={acceptingId === job._id}
                          className="w-full"
                        >
                          {acceptingId === job._id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Accepting...
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Accept Job
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
