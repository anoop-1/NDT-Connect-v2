// src/app/my-requests/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, PlusCircle, FileText, Activity, AlertTriangle, CheckCircle, Clock, MessageSquare } from "lucide-react";
import type { ServiceRequest } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ChatWindow } from "@/components/shared/chat/ChatWindow"; // Import ChatWindow

const mockRequests: ServiceRequest[] = [
  { id: 'req1', clientId: 'user1', providerId: 'prov1', providerName: 'Advanced NDT Solutions', serviceType: 'Ultrasonic Testing', location: 'Main Plant, Area 5', description: 'Inspect critical weld points on pressure vessel.', requestedDate: '2024-08-15', status: 'Confirmed' },
  { id: 'req2', clientId: 'user1', serviceType: 'Magnetic Particle Testing', location: 'Storage Tank 3B', description: 'Surface crack detection on tank shell.', requestedDate: '2024-08-20', status: 'Pending' },
  { id: 'req3', clientId: 'user1', providerId: 'prov2', providerName: 'Precision Inspections Inc.', serviceType: 'Radiographic Testing', location: 'Fabrication Shop, Bay 2', description: 'Full weld inspection for new pipeline section.', requestedDate: '2024-07-10', status: 'Completed' },
  { id: 'req4', clientId: 'user1', providerId: 'prov1', providerName: 'Advanced NDT Solutions', serviceType: 'Visual Testing', location: 'Bridge Section A1', description: 'Routine visual checkup.', requestedDate: '2024-08-01', status: 'In Progress' },
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
  const { user, loading } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [selectedChatRequestId, setSelectedChatRequestId] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/my-requests");
    } else if (user && user.role !== 'client') {
      router.push("/dashboard");
    } else if (user) {
      // Simulate fetching user-specific requests
      // For demo, ensure the demo client (client.demo@example.com) can see these requests.
      // Typically, you'd filter by user.id. For the demo user, we might show all or a specific set.
      if (user.isDemo) {
        // Assuming demo client should see all mockRequests for now
        setRequests(mockRequests.map(r => ({...r, clientId: user.id }))); // Assign demo client id for consistency
      } else {
         setRequests(mockRequests.filter(req => req.clientId === user.id));
      }
    }
  }, [user, loading, router]);

  const handleToggleChat = (requestId: string) => {
    if (selectedChatRequestId === requestId && showChat) {
      setShowChat(false); // Toggle off if same chat is already open
    } else {
      setSelectedChatRequestId(requestId);
      setShowChat(true);
    }
  };
  
  const getSelectedRequestForChat = () => {
    return requests.find(r => r.id === selectedChatRequestId);
  };


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
          {requests.map(request => {
            const canChat = request.providerId && request.providerName && (request.status === 'Confirmed' || request.status === 'In Progress');
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
                  <p className="text-xs text-muted-foreground">Requested Date: {new Date(request.requestedDate).toLocaleDateString()}</p>
                  {request.providerName && <p className="text-xs text-muted-foreground mt-1">Provider: {request.providerName}</p>}
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/track-request/${request.id}`}>
                      <FileText className="h-4 w-4 mr-2" /> View Details
                    </Link>
                  </Button>
                  {canChat && (
                    <Button variant="default" size="sm" onClick={() => handleToggleChat(request.id)}>
                      <MessageSquare className="h-4 w-4 mr-2" /> 
                      {showChat && selectedChatRequestId === request.id ? "Hide Chat" : "Chat with Provider"}
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
            <p className="text-muted-foreground">Ready to get started? Make your first service request now.</p>
            <Button asChild>
              <Link href="/request-service">
                <PlusCircle className="h-4 w-4 mr-2" /> Request a Service
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {showChat && selectedChatRequestId && getSelectedRequestForChat() && user && (
        <div className="mt-8">
          <ChatWindow
            currentUser={user}
            otherPartyName={getSelectedRequestForChat()?.providerName || "Provider"}
            otherPartyRole="provider"
            requestId={selectedChatRequestId}
          />
        </div>
      )}
    </div>
  );
}
