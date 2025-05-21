
// src/app/provider-requests/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, Eye, Check, X, Activity, Users } from "lucide-react";
import type { ServiceRequest } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const mockProviderRequests: ServiceRequest[] = [
  { id: 'req1_prov', clientId: 'clientA', providerId: 'thisProvider', serviceType: 'Ultrasonic Testing', location: 'Main Plant, Area 5', description: 'Inspect critical weld points on pressure vessel. Client needs report by EOW.', requestedDate: '2024-08-15', status: 'Confirmed' },
  { id: 'req2_prov', clientId: 'clientB', providerId: 'thisProvider', serviceType: 'Visual Testing', location: 'Assembly Line 2', description: 'Urgent visual inspection of 50 units. High priority.', requestedDate: '2024-08-10', status: 'Pending' },
  { id: 'req3_prov', clientId: 'clientC', providerId: 'thisProvider', serviceType: 'Magnetic Particle Testing', location: 'Warehouse Sector D', description: 'Surface crack detection for large components.', requestedDate: '2024-08-22', status: 'Pending' },
];

const StatusBadge = ({ status }: { status: ServiceRequest['status'] }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  switch (status) {
    case 'Pending': variant = 'outline'; break;
    case 'Confirmed': variant = 'default'; break; 
    case 'In Progress': variant = 'secondary'; break;
    case 'Completed': variant = 'default'; break; 
    case 'Cancelled': variant = 'destructive'; break;
  }
  return <Badge variant={variant}>{status}</Badge>;
};

export default function ProviderRequestsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/provider-requests");
    } else if (user && user.role !== 'provider') {
      router.push("/dashboard");
    } else if (user) {
      setRequests(mockProviderRequests.filter(req => req.providerId === user.id || mockProviderRequests)); 
    }
  }, [user, loading, router]);

  const handleUpdateRequest = (requestId: string, newStatus: ServiceRequest['status']) => {
    setRequests(prev => prev.map(r => r.id === requestId ? {...r, status: newStatus} : r));
    toast({
      title: `Request ${requestId} Status Updated`,
      description: `Status changed to ${newStatus}.`,
    });

    if (newStatus === 'Confirmed' || newStatus === 'In Progress') {
        const currentRequest = requests.find(r => r.id === requestId);
        toast({
            title: "Client Notified",
            description: `Client ${currentRequest?.clientId || 'N/A'} has been notified. Technical documents (if available and applicable) are now notionally shared.`,
            duration: 5000,
        });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading service requests...</span></div>;
  }

  if (!user || user.role !== 'provider') {
    return <div className="text-center py-10">Access Denied. This page is for service providers.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Incoming Service Requests</h1>
        <p className="text-muted-foreground">Manage and respond to NDT service requests from clients.</p>
      </div>

      {requests.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {requests.map(request => (
            <Card key={request.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{request.serviceType}</CardTitle>
                  <StatusBadge status={request.status} />
                </div>
                <CardDescription>Location: {request.location} | Client ID: {request.clientId}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-3">{request.description}</p>
                <p className="text-xs text-muted-foreground">Requested Date: {new Date(request.requestedDate).toLocaleDateString()}</p>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => alert(`Viewing details for ${request.id}`)}>
                  <Eye className="h-4 w-4 mr-2" /> View Details
                </Button>
                {request.status === 'Pending' && (
                  <>
                    <Button size="sm" variant="default" onClick={() => handleUpdateRequest(request.id, 'Confirmed')}>
                      <Check className="h-4 w-4 mr-2" /> Accept
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleUpdateRequest(request.id, 'Cancelled')}>
                      <X className="h-4 w-4 mr-2" /> Decline
                    </Button>
                  </>
                )}
                 {request.status === 'Confirmed' && (
                     <Button size="sm" onClick={() => handleUpdateRequest(request.id, 'In Progress')}>
                        <Activity className="h-4 w-4 mr-2" /> Start Work
                    </Button>
                 )}
                 {request.status === 'In Progress' && (
                     <Button size="sm" onClick={() => handleUpdateRequest(request.id, 'Completed')}>
                        <Check className="h-4 w-4 mr-2" /> Mark Completed
                    </Button>
                 )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent className="flex flex-col items-center gap-4">
            <Briefcase className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">No active service requests.</h3>
            <p className="text-muted-foreground">Keep an eye on this page for new client requests.</p>
            <Button variant="outline" asChild>
              <Link href="/provider-profile">
                <Users className="h-4 w-4 mr-2" /> Update Availability
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
