// src/app/track-request/[id]/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Phone, Activity, CheckCircle, Clock, AlertTriangle, CalendarDays, MapPinIcon, FileTextIcon } from "lucide-react";
import type { ServiceRequest } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

// Extended mock data to simulate finding a specific request
const mockRequests: ServiceRequest[] = [
  { id: 'req1', clientId: 'user1', providerId: 'prov1', serviceType: 'Ultrasonic Testing', location: 'Main Plant, Area 5', description: 'Inspect critical weld points on pressure vessel. Ensure all safety protocols are followed. Report needed by end of week.', requestedDate: '2024-08-15', status: 'Confirmed' },
  { id: 'req2', clientId: 'user1', serviceType: 'Magnetic Particle Testing', location: 'Storage Tank 3B', description: 'Surface crack detection on tank shell, focusing on welded seams. Provide photographic evidence.', requestedDate: '2024-08-20', status: 'Pending' },
  { id: 'req3', clientId: 'user1', providerId: 'prov2', serviceType: 'Radiographic Testing', location: 'Fabrication Shop, Bay 2', description: 'Full weld inspection for new pipeline section. Compliance with ASME Section IX required.', requestedDate: '2024-07-10', status: 'Completed' },
  { id: 'req4', clientId: 'user1', serviceType: 'Visual Testing', location: 'Bridge Section A1', description: 'Routine visual checkup of structural integrity. Look for corrosion or damage.', requestedDate: '2024-08-01', status: 'In Progress' },
];


const StatusTimelineStep = ({ status, isActive, isCompleted, title, description }: { status: string, isActive: boolean, isCompleted: boolean, title: string, description: string }) => {
  let IconComponent = Clock;
  if (isCompleted || isActive) IconComponent = CheckCircle;
  if (status === 'Cancelled' && isActive) IconComponent = AlertTriangle;

  return (
    <li className="mb-6 ms-6">            
      <span className={cn(
        "absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-4 ring-background",
        isActive || isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
        status === 'Cancelled' && isActive && "bg-destructive text-destructive-foreground"
      )}>
        <IconComponent className="w-3 h-3" />
      </span>
      <h3 className={cn("font-semibold", isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground")}>{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </li>
  );
};


export default function TrackRequestPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const requestId = params.id as string;
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/track-request/${requestId}`);
    } else if (user && user.role !== 'client') {
      router.push("/dashboard");
    }
  }, [user, loading, router, requestId]);

  useEffect(() => {
    if (user && requestId) {
      // Simulate fetching the specific request
      const foundRequest = mockRequests.find(r => r.id === requestId && (r.clientId === user.id || true)); // Allow any client for mock
      if (foundRequest) {
        setRequest(foundRequest);
      } else {
        setFetchError("Service request not found or access denied.");
      }
    }
  }, [user, requestId]);

  if (loading || (!request && !fetchError)) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading request details...</span></div>;
  }

  if (fetchError) {
    return (
      <div className="text-center py-10">
        <AlertTriangle className="h-12 w-12 mx-auto text-destructive mb-4" />
        <p className="text-xl text-destructive">{fetchError}</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/my-requests">Go back to My Requests</Link>
        </Button>
      </div>
    );
  }
  
  if (!user || user.role !== 'client') {
     return <div className="text-center py-10">Access Denied.</div>;
  }
  
  if (!request) return null; // Should be covered by loading/error states

  const statuses: ServiceRequest['status'][] = ['Pending', 'Confirmed', 'In Progress', 'Completed'];
  const currentStatusIndex = statuses.indexOf(request.status);
  const isCancelled = request.status === 'Cancelled';

  const timelineDescriptions = {
    'Pending': 'Your request has been submitted and is awaiting provider confirmation.',
    'Confirmed': 'A service provider has confirmed your request and will contact you shortly.',
    'In Progress': 'The NDT service is currently being performed by the assigned provider.',
    'Completed': 'The service has been completed. Check for reports or follow-ups.',
    'Cancelled': 'This service request has been cancelled.',
  };


  return (
    <div className="space-y-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to My Requests
      </Button>

      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <CardTitle className="text-2xl md:text-3xl mb-2 sm:mb-0">Request Details: {request.serviceType}</CardTitle>
            <Badge variant={isCancelled ? "destructive" : "default"} className="text-base px-3 py-1">
              Status: {request.status}
            </Badge>
          </div>
          <CardDescription>Request ID: {request.id}</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground flex items-center"><MapPinIcon className="h-4 w-4 mr-2"/>Location</h4>
              <p>{request.location}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground flex items-center"><CalendarDays className="h-4 w-4 mr-2"/>Requested Date</h4>
              <p>{new Date(request.requestedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground flex items-center"><FileTextIcon className="h-4 w-4 mr-2"/>Description</h4>
              <p className="text-sm whitespace-pre-wrap">{request.description}</p>
            </div>
            {request.providerId && (
               <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Assigned Provider ID</h4>
                <p>{request.providerId} (Contact details placeholder)</p>
              </div>
            )}
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
          <Button variant="outline" onClick={() => alert('Contact support placeholder')}>
            <MessageSquare className="h-4 w-4 mr-2" /> Contact Support
          </Button>
          {request.providerId && !isCancelled && request.status !== 'Completed' && (
            <Button onClick={() => alert(`Contacting provider ${request.providerId}`)}>
              <Phone className="h-4 w-4 mr-2" /> Contact Provider
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
