// src/app/my-requests/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, PlusCircle, FileText, Activity, AlertTriangle, CheckCircle, Clock, MessageSquare } from "lucide-react";
import type { ServiceRequest } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ChatWindow } from "@/components/shared/chat/ChatWindow";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock data remains for demo purposes, but the page will try to fetch from Firestore first.
const mockRequests: ServiceRequest[] = [
  { id: 'req1', clientId: 'client.demo@example.com', providerId: 'prov1', providerName: 'Advanced NDT Solutions', serviceType: 'Ultrasonic Testing', location: 'Main Plant, Area 5', description: 'Inspect critical weld points on pressure vessel.', requestedDate: '2024-08-15', status: 'Confirmed' },
  { id: 'req2', clientId: 'client.demo@example.com', serviceType: 'Magnetic Particle Testing', location: 'Storage Tank 3B', description: 'Surface crack detection on tank shell.', requestedDate: '2024-08-20', status: 'Pending' },
  { id: 'req3', clientId: 'client.demo@example.com', providerId: 'prov2', providerName: 'Precision Inspections Inc.', serviceType: 'Radiographic Testing', location: 'Fabrication Shop, Bay 2', description: 'Full weld inspection for new pipeline section.', requestedDate: '2024-07-10', status: 'Completed' },
  { id: 'req4', clientId: 'client.demo@example.com', providerId: 'prov1', providerName: 'Advanced NDT Solutions', serviceType: 'Visual Testing', location: 'Bridge Section A1', description: 'Routine visual checkup.', requestedDate: '2024-08-01', status: 'In Progress' },
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
      icon = <CheckCircle className="h-3 w-3 mr-1 text-green-500" />;
      break;
    case 'In Progress':
      variant = 'secondary';
      icon = <Activity className="h-3 w-3 mr-1 animate-pulse" />;
      break;
    case 'Completed':
      variant = 'default'; 
      icon = <CheckCircle className="h-3 w-3 mr-1" />;
      break;
    case 'Cancelled':
      variant = 'destructive';
      icon = <AlertTriangle className="h-3 w-3 mr-1" />;
      break;
  }
  
  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      {status}
    </Badge>
  );
};


export default function MyRequestsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chattingWithRequest, setChattingWithRequest] = useState<ServiceRequest | null>(null);

  const fetchRequests = useCallback(async (userId: string, isDemo: boolean) => {
    setIsLoading(true);
    // For demo user, we show the mock requests to ensure they have content to see.
    if (isDemo) {
      setRequests(mockRequests);
      setIsLoading(false);
      return;
    }
    
    try {
      const requestsCollectionRef = collection(db, "serviceRequests");
      const q = query(requestsCollectionRef, where("clientId", "==", userId), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedRequests: ServiceRequest[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Convert Firestore Timestamps to strings for state compatibility
        const requestedDate = data.requestedDate?.toDate ? data.requestedDate.toDate().toISOString() : data.requestedDate;
        fetchedRequests.push({ id: doc.id, ...data, requestedDate } as ServiceRequest);
      });
      setRequests(fetchedRequests);
    } catch (error) {
      console.error("Error fetching service requests:", error);
      toast({
        title: "Error",
        description: "Failed to fetch your service requests from the database.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/my-requests");
    } else if (user && user.role !== 'client') {
      router.push("/dashboard");
    } else if (user) {
      fetchRequests(user.id, user.isDemo || false);
    }
  }, [user, authLoading, router, fetchRequests]);

  if (authLoading || isLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading your requests...</span></div>;
  }

  if (!user || user.role !== 'client') {
    return <div className="text-center py-10">Access Denied. This page is for clients.</div>;
  }

  return (
    <>
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
            {requests.map(request => {
              const canChat = request.providerId && request.providerName && (request.status === 'Confirmed' || request.status === 'In Progress');
              const displayDate = request.requestedDate ? new Date(request.requestedDate).toLocaleDateString() : "Date not set";
              return (
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
                    <p className="text-xs text-muted-foreground">Requested Date: {displayDate}</p>
                    {request.providerName && <p className="text-xs text-muted-foreground mt-1">Provider: {request.providerName}</p>}
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2 justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/track-request/${request.id}`}>
                        <FileText className="h-4 w-4 mr-2" /> View Details
                      </Link>
                    </Button>
                    {canChat && (
                      <Button variant="default" size="sm" onClick={() => setChattingWithRequest(request)}>
                        <MessageSquare className="h-4 w-4 mr-2" /> 
                        Chat with Provider
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent className="flex flex-col items-center gap-4">
              <Briefcase className="h-16 w-16 text-muted-foreground" />
              <h3 className="text-xl font-semibold">No service requests yet.</h3>
              <p className="text-muted-foreground">Make your first request to see it here.</p>
              <Button asChild>
                <Link href="/request-service">
                  <PlusCircle className="h-4 w-4 mr-2" /> Request a Service
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
                  Chat with {chattingWithRequest.providerName || "Provider"}
                </DialogTitle>
              </DialogHeader>
              <ChatWindow
                currentUser={user}
                otherPartyName={chattingWithRequest.providerName || "Provider"}
                otherPartyRole="provider"
                requestId={chattingWithRequest.id}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
