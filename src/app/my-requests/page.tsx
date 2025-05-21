// src/app/my-requests/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, PlusCircle, FileText, Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import type { ServiceRequest } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const mockRequests: ServiceRequest[] = [
  { id: 'req1', clientId: 'user1', providerId: 'prov1', serviceType: 'Ultrasonic Testing', location: 'Main Plant, Area 5', description: 'Inspect critical weld points on pressure vessel.', requestedDate: '2024-08-15', status: 'Confirmed' },
  { id: 'req2', clientId: 'user1', serviceType: 'Magnetic Particle Testing', location: 'Storage Tank 3B', description: 'Surface crack detection on tank shell.', requestedDate: '2024-08-20', status: 'Pending' },
  { id: 'req3', clientId: 'user1', providerId: 'prov2', serviceType: 'Radiographic Testing', location: 'Fabrication Shop, Bay 2', description: 'Full weld inspection for new pipeline section.', requestedDate: '2024-07-10', status: 'Completed' },
  { id: 'req4', clientId: 'user1', serviceType: 'Visual Testing', location: 'Bridge Section A1', description: 'Routine visual checkup.', requestedDate: '2024-08-01', status: 'In Progress' },
];


const StatusBadge = ({ status }: { status: ServiceRequest['status'] }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  let icon = <Activity className="h-3 w-3 mr-1" />;

  switch (status) {
    case 'Pending':
      variant = 'outline';
      icon = <Clock className="h-3 w-3 mr-1" />;
      break;
    case 'Confirmed':
      variant = 'default';
      icon = <CheckCircle className="h-3 w-3 mr-1 text-green-500" />; // Custom color here
      break;
    case 'In Progress':
      variant = 'secondary';
      icon = <Activity className="h-3 w-3 mr-1 animate-pulse" />;
      break;
    case 'Completed':
      variant = 'default'; // Or a specific 'success' variant if defined
      icon = <CheckCircle className="h-3 w-3 mr-1" />;
      break;
    case 'Cancelled':
      variant = 'destructive';
      icon = <AlertTriangle className="h-3 w-3 mr-1" />;
      break;
  }
  // For CheckCircle with green color on Confirmed, Tailwind classes won't directly apply to Lucide icons within Badge.
  // A slight workaround for 'Confirmed' or custom styling might be needed if strict theme adherence is required.
  // For now, this setup should work.
  
  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      {status}
    </Badge>
  );
};


export default function MyRequestsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/my-requests");
    } else if (user && user.role !== 'client') {
      router.push("/dashboard");
    } else if (user) {
      // Simulate fetching user-specific requests
      setRequests(mockRequests.filter(req => req.clientId === user.id || mockRequests)); // Fallback to all mock if ID mismatch
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading your requests...</span></div>;
  }

  if (!user || user.role !== 'client') {
    return <div className="text-center py-10">Access Denied. This page is for clients.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Service Requests</h1>
          <p className="text-muted-foreground">Track and manage all your NDT service requests here.</p>
        </div>
        <Button asChild>
          <Link href="/request-service">
            <PlusCircle className="h-4 w-4 mr-2" /> New Service Request
          </Link>
        </Button>
      </div>

      {requests.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {requests.map(request => (
            <Card key={request.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{request.serviceType}</CardTitle>
                  <StatusBadge status={request.status} />
                </div>
                <CardDescription>Location: {request.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{request.description}</p>
                <p className="text-xs text-muted-foreground">Requested Date: {new Date(request.requestedDate).toLocaleDateString()}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/track-request/${request.id}`}>
                    <FileText className="h-4 w-4 mr-2" /> View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent className="flex flex-col items-center gap-4">
            <Briefcase className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">No service requests yet.</h3>
            <p className="text-muted-foreground">Ready to get started? Make your first service request now.</p>
            <Button asChild>
              <Link href="/request-service">
                <PlusCircle className="h-4 w-4 mr-2" /> Request a Service
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}