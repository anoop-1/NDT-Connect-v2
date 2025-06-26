// src/app/provider-requests/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, Eye, Check, X, Activity, Users, MessageSquare } from "lucide-react";
import type { ServiceRequest } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc, orderBy } from "firebase/firestore";


const mockProviderRequests: ServiceRequest[] = [
  { id: 'req1_prov', clientId: 'clientA', providerId: 'provider.demo@example.com', serviceType: 'Ultrasonic Testing', location: 'Main Plant, Area 5', description: 'Inspect critical weld points on pressure vessel. Client needs report by EOW.', requestedDate: '2024-08-15', status: 'Confirmed' },
  { id: 'req2_prov', clientId: 'clientB', providerId: 'provider.demo@example.com', serviceType: 'Visual Testing', location: 'Assembly Line 2', description: 'Urgent visual inspection of 50 units. High priority.', requestedDate: '2024-08-10', status: 'Pending' },
  { id: 'req3_prov', clientId: 'clientC', providerId: 'provider.demo@example.com', serviceType: 'Magnetic Particle Testing', location: 'Warehouse Sector D', description: 'Surface crack detection for large components.', requestedDate: '2024-08-22', status: 'Pending' },
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
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = useCallback(async (userId: string, isDemo: boolean) => {
    setIsLoading(true);
    // For demo vendor, we show the mock requests to ensure they have content to see.
    if (isDemo) {
      setRequests(mockProviderRequests);
      setIsLoading(false);
      return;
    }
    
    try {
      const requestsCollectionRef = collection(db, "serviceRequests");
      // This query finds requests assigned to the provider OR requests that are pending with no provider assigned yet.
      // A more complex system might have a separate "bidding" status.
      const q = query(
        requestsCollectionRef, 
        where("status", "==", "Pending"),
        // where("providerId", "in", [null, userId]), // Firestore doesn't support 'in' with null. Requires two queries.
        orderBy("createdAt", "desc")
      );
      // For simplicity, we'll fetch all pending for now. A real app would need more robust logic.
      // And a separate query for already assigned requests.
      const qAssigned = query(requestsCollectionRef, where("providerId", "==", userId), orderBy("createdAt", "desc"));
      
      const [pendingSnapshot, assignedSnapshot] = await Promise.all([getDocs(q), getDocs(qAssigned)]);

      const fetchedRequests: ServiceRequest[] = [];
      const seenIds = new Set<string>();

      const processSnapshot = (snapshot: any) => {
         snapshot.forEach((doc: any) => {
          if (!seenIds.has(doc.id)) {
            const data = doc.data();
            const requestedDate = data.requestedDate?.toDate ? data.requestedDate.toDate().toISOString() : data.requestedDate;
            fetchedRequests.push({ id: doc.id, ...data, requestedDate } as ServiceRequest);
            seenIds.add(doc.id);
          }
        });
      };
      
      processSnapshot(pendingSnapshot);
      processSnapshot(assignedSnapshot);

      setRequests(fetchedRequests);

    } catch (error) {
      console.error("Error fetching service requests:", error);
      toast({
        title: "Error",
        description: "Failed to fetch service requests from the database.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);


  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/provider-requests");
    } else if (user && user.role !== 'provider') {
      router.push("/dashboard");
    } else if (user) {
      fetchRequests(user.id, user.isDemo || false);
    }
  }, [user, loading, router, fetchRequests]);

  const handleUpdateRequest = async (requestId: string, newStatus: ServiceRequest['status']) => {
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    if (user && user.isDemo) {
        // Handle mock data update for demo user
        setRequests(prev => prev.map(r => r.id === requestId ? {...r, status: newStatus} : r));
        toast({ title: `Request Status Updated (Demo)`, description: `Status changed to ${newStatus}.` });
        return;
    }

    try {
        const requestDocRef = doc(db, "serviceRequests", requestId);
        // If accepting, assign the providerId
        const updateData: any = { status: newStatus };
        if (newStatus === 'Confirmed' && !request.providerId && user) {
            updateData.providerId = user.id;
            updateData.providerName = user.name || user.email;
        }

        await updateDoc(requestDocRef, updateData);
        setRequests(prev => prev.map(r => r.id === requestId ? {...r, status: newStatus, providerId: user?.id, providerName: user?.name || user?.email } : r));
        toast({
            title: `Request Status Updated`,
            description: `Status changed to ${newStatus}. Client will be notified.`,
        });
    } catch (error) {
        console.error("Error updating request:", error);
        toast({ title: "Update Failed", description: "Could not update the request in the database.", variant: "destructive" });
    }
  };

  if (loading || isLoading) {
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
                <CardDescription>Location: {request.location} | Client: {request.clientName || request.clientId}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-3">{request.description}</p>
                <p className="text-xs text-muted-foreground">Requested Date: {new Date(request.requestedDate).toLocaleDateString()}</p>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/provider-dashboard/requests/${request.id}`}>
                    <Eye className="h-4 w-4 mr-2" /> View Details
                  </Link>
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
                    <>
                      <Button size="sm" onClick={() => handleUpdateRequest(request.id, 'In Progress')}>
                          <Activity className="h-4 w-4 mr-2" /> Start Work
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/provider-dashboard/requests/${request.id}`}>
                          <MessageSquare className="h-4 w-4 mr-2" /> Chat with Client
                        </Link>
                      </Button>
                    </>
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
