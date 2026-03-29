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
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MOCK_CLIENT_REQUESTS } from "@/lib/mockData";

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
  const [isShowingExamples, setIsShowingExamples] = useState(false);

  const fetchRequests = useCallback(async (userId: string) => {
    setIsLoading(true);
    setIsShowingExamples(false);

    if (user?.isDemo) {
      setRequests(MOCK_CLIENT_REQUESTS);
      setIsLoading(false);
      return;
    }
    
    try {
      // Mocked fetching logic
      const fetchedRequests = MOCK_CLIENT_REQUESTS.filter(request => request.clientId === userId);
      
      if (fetchedRequests.length === 0) {
        setRequests(MOCK_CLIENT_REQUESTS);
        setIsShowingExamples(true);
        toast({
          title: "Displaying Example Requests",
          description: "You have no active requests, so we're showing examples.",
        });
      } else {
        setRequests(fetchedRequests);
      }
    } catch (error: any) {
      console.error("Error fetching service requests:", error);
      toast({
        title: "Error",
        description: "Failed to fetch your service requests. Showing example data.",
        variant: "destructive",
      });
      setRequests(MOCK_CLIENT_REQUESTS);
      setIsShowingExamples(true);
    } finally {
      setIsLoading(false);
    }
  }, [toast, user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/my-requests");
    } else if (user && user.role !== 'client') {
      router.push("/dashboard");
    } else if (user) {
      fetchRequests(user.id);
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
            <p className="text-muted-foreground">
              Track and manage all your NDT service requests here.
              {user?.isDemo && <span className="font-semibold text-primary ml-2">(Demo Mode)</span>}
              {isShowingExamples && <span className="font-semibold text-primary ml-2">(Example Data)</span>}
            </p>
          </div>
          <Button asChild disabled={user?.isDemo}>
            <Link href="/request-service">
              <PlusCircle className="h-4 w-4 mr-2" /> New Service Request
            </Link>
          </Button>
           {user?.isDemo && <p className="text-xs text-muted-foreground">New requests are disabled in demo mode.</p>}
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
              <p className="text-muted-foreground">{isShowingExamples ? "The examples above show how your requests will appear." : "Make your first request to see it here."}</p>
              <Button asChild disabled={user?.isDemo}>
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
