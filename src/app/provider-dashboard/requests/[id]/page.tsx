
// src/app/provider-dashboard/requests/[id]/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Phone, Activity, CheckCircle, Clock, AlertTriangle, CalendarDays, MapPinIcon, FileTextIcon, UserCircle, MessageSquare } from "lucide-react";
import type { ServiceRequest, User } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ChatWindow } from "@/components/shared/chat/ChatWindow";

const mockProviderRequests: ServiceRequest[] = [
  { id: 'req1_prov', clientId: 'clientA', providerId: 'thisProvider', serviceType: 'Ultrasonic Testing', location: 'Main Plant, Area 5', description: 'Inspect critical weld points on pressure vessel. Client needs report by EOW.', requestedDate: '2024-08-15', status: 'Confirmed' },
  { id: 'req2_prov', clientId: 'clientB', providerId: 'thisProvider', serviceType: 'Visual Testing', location: 'Assembly Line 2', description: 'Urgent visual inspection of 50 units. High priority.', requestedDate: '2024-08-10', status: 'Pending' },
  { id: 'req3_prov', clientId: 'clientC', providerId: 'thisProvider', serviceType: 'Magnetic Particle Testing', location: 'Warehouse Sector D', description: 'Surface crack detection for large components.', requestedDate: '2024-08-22', status: 'Pending' },
];

// Mock client data for chat purposes
const mockClientsDB: Partial<User>[] = [
  { id: 'clientA', name: 'Client Alpha Corp', email: 'alpha@example.com', role: 'client' },
  { id: 'clientB', name: 'Client Beta LLC', email: 'beta@example.com', role: 'client' },
  { id: 'clientC', name: 'Client Gamma Inc', email: 'gamma@example.com', role: 'client' },
];


const StatusTimelineStep = ({ status, isActive, isCompleted, title, description }: { status: string, isActive: boolean, isCompleted: boolean, title: string, description: string }) => {
  let IconComponent = Clock;
  if (isCompleted || isActive) IconComponent = CheckCircle;
  if (status === 'Cancelled' && isActive) IconComponent = AlertTriangle;

  return (
    <li className="mb-6 ms-6">
      <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-4 ring-background ${isActive || isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} ${status === 'Cancelled' && isActive && "bg-destructive text-destructive-foreground"}`}>
        <IconComponent className="w-3 h-3" />
      </span>
      <h3 className={`font-semibold ${isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"}`}>{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </li>
  );
};


export default function ProviderRequestDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const requestId = params.id as string;
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [clientDetails, setClientDetails] = useState<Partial<User> | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/provider-dashboard/requests/${requestId}`);
    } else if (user && user.role !== 'provider') {
      router.push("/dashboard");
    }
  }, [user, loading, router, requestId]);

  useEffect(() => {
    if (user && user.role === 'provider' && requestId) {
      const foundRequest = mockProviderRequests.find(r => r.id === requestId && (r.providerId === user.id || true)); // `|| true` for demo vendor
      if (foundRequest) {
        setRequest(foundRequest);
        if (foundRequest.clientId) {
          const foundClient = mockClientsDB.find(c => c.id === foundRequest.clientId);
          setClientDetails(foundClient || null);
        }
      } else {
        setFetchError("Service request not found or not assigned to you.");
      }
    }
  }, [user, requestId]);

  if (loading || (!request && !fetchError && !user)) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading request details...</span></div>;
  }

  if (!user || user.role !== 'provider') {
     return <div className="text-center py-10">Access Denied. This page is for providers.</div>;
  }

  if (fetchError) {
    return (
      <div className="text-center py-10">
        <AlertTriangle className="h-12 w-12 mx-auto text-destructive mb-4" />
        <p className="text-xl text-destructive">{fetchError}</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/provider-requests">Go back to All Requests</Link>
        </Button>
      </div>
    );
  }

  if (!request) return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">No request data found.</div>;

  const statuses: ServiceRequest['status'][] = ['Pending', 'Confirmed', 'In Progress', 'Completed'];
  const currentStatusIndex = statuses.indexOf(request.status);
  const isCancelled = request.status === 'Cancelled';
  const canChat = (request.status === 'Confirmed' || request.status === 'In Progress') && clientDetails;

  const timelineDescriptions = {
    'Pending': `Request submitted by Client ${clientDetails?.name || request.clientId}. Awaiting your confirmation.`,
    'Confirmed': `You have confirmed this request. Client ${clientDetails?.name || request.clientId} has been notified.`,
    'In Progress': `The NDT service is currently being performed for Client ${clientDetails?.name || request.clientId}.`,
    'Completed': `The service for Client ${clientDetails?.name || request.clientId} has been completed.`,
    'Cancelled': 'This service request has been cancelled.',
  };

  return (
    <div className="space-y-8">
      <Button variant="outline" onClick={() => router.push('/provider-requests')} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Requests
      </Button>

      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <CardTitle className="text-2xl md:text-3xl mb-2 sm:mb-0">Request: {request.serviceType}</CardTitle>
            <Badge variant={isCancelled ? "destructive" : "default"} className="text-base px-3 py-1">
              Status: {request.status}
            </Badge>
          </div>
          <CardDescription>Request ID: {request.id}</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-4">
             {clientDetails && (
               <div>
                <h4 className="font-semibold text-sm text-muted-foreground flex items-center mb-1"><UserCircle className="h-4 w-4 mr-2"/>Client</h4>
                <p className="font-medium">{clientDetails.name || request.clientId}</p>
                {clientDetails.email && <p className="text-xs text-muted-foreground">{clientDetails.email}</p>}
              </div>
            )}
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground flex items-center mb-1"><MapPinIcon className="h-4 w-4 mr-2"/>Location</h4>
              <p>{request.location}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground flex items-center mb-1"><CalendarDays className="h-4 w-4 mr-2"/>Requested Date</h4>
              <p>{new Date(request.requestedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground flex items-center mb-1"><FileTextIcon className="h-4 w-4 mr-2"/>Description from Client</h4>
              <p className="text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded-md">{request.description}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3">Request Timeline</h4>
            <ol className="relative border-s border-border ms-3">
              {isCancelled ? (
                 <StatusTimelineStep status="Cancelled" isActive={true} isCompleted={false} title="Cancelled" description={timelineDescriptions['Cancelled']} />
              ) : (
                statuses.map((status, index) => (
                  <StatusTimelineStep
                    key={status}
                    status={status}
                    isActive={index === currentStatusIndex}
                    isCompleted={index < currentStatusIndex}
                    title={status}
                    description={timelineDescriptions[status as keyof typeof timelineDescriptions] || "Status details unavailable."}
                  />
                ))
              )}
            </ol>
          </div>
        </CardContent>
         <CardFooter className="flex flex-col sm:flex-row gap-2 justify-end pt-6 border-t">
          {canChat && (
            <Button onClick={() => setShowChat(prev => !prev)} variant={showChat ? "secondary" : "default"}>
              <MessageSquare className="h-4 w-4 mr-2" /> {showChat ? "Hide Chat" : "Chat with Client"}
            </Button>
          )}
           {/* Add other provider actions here, e.g., mark as in-progress, complete */}
        </CardFooter>
      </Card>

      {canChat && showChat && clientDetails && (
        <ChatWindow
          currentUser={user}
          otherPartyName={clientDetails.name || "Client"}
          otherPartyRole="client"
          requestId={request.id}
        />
      )}
    </div>
  );
}

    