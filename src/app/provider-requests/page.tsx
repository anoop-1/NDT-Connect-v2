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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChatWindow } from "@/components/shared/chat/ChatWindow";
import { MOCK_PROVIDER_REQUESTS } from "@/lib/mockData";

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
  const [chattingWithRequest, setChattingWithRequest] = useState<ServiceRequest | null>(null);

  const fetchRequests = useCallback(async (userId: string) => {
    setIsLoading(true);

    if (user?.isDemo) {
        setRequests(MOCK_PROVIDER_REQUESTS);
        setIsLoading(false);
        return;
    }
    
    try {
      const requestsCollectionRef = collection(db, "serviceRequests");
      // Query for requests specifically assigned to this provider
      const qAssigned = query(requestsCollectionRef, where("providerId", "==", userId), orderBy("createdAt", "desc"));
      // Query for all pending requests that are not yet assigned
      const qPending = query(requestsCollectionRef, where("status", "==", "Pending"), where("providerId", "==", undefined), orderBy("createdAt", "desc"));
      
      const [assignedSnapshot, pendingSnapshot] = await Promise.all([getDocs(qAssigned), getDocs(qPending)]);

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
      
      processSnapshot(assignedSnapshot);
      processSnapshot(pendingSnapshot);

      // Sort to have provider's own requests first, then pending.
      fetchedRequests.sort((a, b) => {
        if (a.providerId === userId && b.providerId !== userId) return -1;
        if (a.providerId !== userId && b.providerId === userId) return 1;
        // For items in the same category, sort by creation date
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
        return dateB.getTime() - dateA.getTime();
      });

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
  }, [toast, user]);


  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/provider-requests");
    } else if (user && user.role !== 'provider') {
      router.push("/dashboard");
    } else if (user) {
      fetchRequests(user.id);
    }
  }, [user, loading, router, fetchRequests]);

  const handleUpdateRequest = async (requestId: string, newStatus: ServiceRequest['status']) => {
    if (user?.isDemo) {
        toast({ title: "Demo Mode", description: "Actions are disabled in demo mode."});
        return;
    }

    const request = requests.find(r => r.id === requestId);
    if (!request || !user) return;

    try {
        const requestDocRef = doc(db, "serviceRequests", requestId);
        // If accepting, assign the providerId
        const updateData: any = { status: newStatus };
        if (newStatus === 'Confirmed' && !request.providerId) {
            updateData.providerId = user.id;
            updateData.providerName = user.name || user.email;
        }

        await updateDoc(requestDocRef, updateData);
        // Refresh the list to show the change
        fetchRequests(user.id);
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
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Incoming Service Requests</h1>
          <p className="text-muted-foreground">
            Manage and respond to NDT service requests from clients.
            {user.isDemo && <span className="font-semibold text-primary ml-2">(Demo Mode)</span>}
          </p>
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
                  <CardDescription>Location: {request.location} | Client: {request.clientName || 'N/A'}</CardDescription>
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
                      <Button size="sm" variant="default" onClick={() => handleUpdateRequest(request.id, 'Confirmed')} disabled={user.isDemo}>
                        <Check className="h-4 w-4 mr-2" /> Accept
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleUpdateRequest(request.id, 'Cancelled')} disabled={user.isDemo}>
                        <X className="h-4 w-4 mr-2" /> Decline
                      </Button>
                    </>
                  )}
                  {request.status === 'Confirmed' && (
                      <>
                        <Button size="sm" onClick={() => handleUpdateRequest(request.id, 'In Progress')} disabled={user.isDemo}>
                            <Activity className="h-4 w-4 mr-2" /> Start Work
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setChattingWithRequest(request)}>
                          <MessageSquare className="h-4 w-4 mr-2" /> Chat with Client
                        </Button>
                      </>
                  )}
                  {request.status === 'In Progress' && (
                      <Button size="sm" onClick={() => handleUpdateRequest(request.id, 'Completed')} disabled={user.isDemo}>
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

      <Dialog open={!!chattingWithRequest} onOpenChange={(isOpen) => { if (!isOpen) setChattingWithRequest(null); }}>
          <DialogContent className="max-w-lg h-[70vh] flex flex-col p-0 gap-0">
            {chattingWithRequest && user && (
              <>
                <DialogHeader className="p-4 border-b">
                  <DialogTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    Chat with {chattingWithRequest.clientName || "Client"}
                  </DialogTitle>
                </DialogHeader>
                <ChatWindow
                  currentUser={user}
                  otherPartyName={chattingWithRequest.clientName || "Client"}
                  otherPartyRole="client"
                  requestId={chattingWithRequest.id}
                />
              </>
            )}
          </DialogContent>
        </Dialog>
    </>
  );
}
