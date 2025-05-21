
// src/app/track-request/[id]/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Phone, Activity, CheckCircle, Clock, AlertTriangle, CalendarDays, MapPinIcon, FileTextIcon, ShieldCheck, FileArchive, BookOpen } from "lucide-react";
import type { ServiceRequest, ServiceProvider } from "@/lib/types"; 
import { Badge } from "@/components/ui/badge";

const mockRequests: ServiceRequest[] = [
  { id: 'req1', clientId: 'user1', providerId: 'prov1', providerName: 'Advanced NDT Solutions', serviceType: 'Ultrasonic Testing', location: 'Main Plant, Area 5', description: 'Inspect critical weld points on pressure vessel. Ensure all safety protocols are followed. Report needed by end of week.', requestedDate: '2024-08-15', status: 'Confirmed' },
  { id: 'req2', clientId: 'user1', serviceType: 'Magnetic Particle Testing', location: 'Storage Tank 3B', description: 'Surface crack detection on tank shell, focusing on welded seams. Provide photographic evidence.', requestedDate: '2024-08-20', status: 'Pending' },
  { id: 'req3', clientId: 'user1', providerId: 'prov2', providerName: 'Precision Inspections Inc.', serviceType: 'Radiographic Testing', location: 'Fabrication Shop, Bay 2', description: 'Full weld inspection for new pipeline section. Compliance with ASME Section IX required.', requestedDate: '2024-07-10', status: 'Completed' },
  { id: 'req4', clientId: 'user1', serviceType: 'Visual Testing', location: 'Bridge Section A1', description: 'Routine visual checkup of structural integrity. Look for corrosion or damage.', requestedDate: '2024-08-01', status: 'In Progress', providerId: 'prov1', providerName: 'Advanced NDT Solutions' },
];

const mockProvidersDB: ServiceProvider[] = [
    { id: 'prov1', name: 'Advanced NDT Solutions', location: 'Houston, TX', services: ['Ultrasonic Testing'], specialization: 'Oil & Gas', rating: 4.8, contactInfo: '(111) 222-3333', isVerified: true, certifications: ["ISO 9001", "API Monogram"], personnelQualifications: ["ASNT Level III", "PCN Level II"], availableDocuments: ["General Procedures Manual", "ISO 9001 Certificate", "Sample Technician Level III Cert"] },
    { id: 'prov2', name: 'Precision Inspections Inc.', location: 'Los Angeles, CA', services: ['Radiographic Testing'], specialization: 'Aerospace', rating: 4.5, contactInfo: '(444) 555-6666', isVerified: true, certifications: ["Nadcap", "AS9100"], personnelQualifications: ["NAS 410 Level III"], availableDocuments: ["Nadcap Approval Documents", "Safety Plan"] },
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
  const [providerDetails, setProviderDetails] = useState<ServiceProvider | null>(null);
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
      const foundRequest = mockRequests.find(r => r.id === requestId && (r.clientId === user.id || true)); 
      if (foundRequest) {
        setRequest(foundRequest);
        if (foundRequest.providerId) {
          const foundProvider = mockProvidersDB.find(p => p.id === foundRequest.providerId);
          setProviderDetails(foundProvider || null);
        } else {
          setProviderDetails(null); // Ensure providerDetails is null if no providerId
        }
      } else {
        setFetchError("Service request not found or access denied.");
      }
    }
  }, [user, requestId]);

  if (loading || (!request && !fetchError)) { // Simplified loading condition
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
  
  if (!request) return null; 

  const statuses: ServiceRequest['status'][] = ['Pending', 'Confirmed', 'In Progress', 'Completed'];
  const currentStatusIndex = statuses.indexOf(request.status);
  const isCancelled = request.status === 'Cancelled';

  const timelineDescriptions = {
    'Pending': 'Your request has been submitted and is awaiting provider confirmation.',
    'Confirmed': `Service Provider ${request.providerName || providerDetails?.name || 'N/A'} has confirmed. They will contact you.`,
    'In Progress': 'The NDT service is currently being performed.',
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
            <CardTitle className="text-2xl md:text-3xl mb-2 sm:mb-0">Request: {request.serviceType}</CardTitle>
            <Badge variant={isCancelled ? "destructive" : "default"} className="text-base px-3 py-1">
              Status: {request.status}
            </Badge>
          </div>
          <CardDescription>Request ID: {request.id}</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground flex items-center mb-1"><MapPinIcon className="h-4 w-4 mr-2"/>Location</h4>
              <p>{request.location}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground flex items-center mb-1"><CalendarDays className="h-4 w-4 mr-2"/>Requested Date</h4>
              <p>{new Date(request.requestedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground flex items-center mb-1"><FileTextIcon className="h-4 w-4 mr-2"/>Description</h4>
              <p className="text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded-md">{request.description}</p>
            </div>
            {providerDetails && (
               <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Assigned Provider</h4>
                <p className="font-medium">{providerDetails.name}</p>
                {providerDetails.isVerified && (
                  <Badge variant="default" className="mt-1 bg-green-100 text-green-700 border-green-300">
                    <ShieldCheck className="h-4 w-4 mr-1"/> Verified Provider
                  </Badge>
                )}
              </div>
            )}
            {(request.status === 'Confirmed' || request.status === 'In Progress') && providerDetails?.availableDocuments && providerDetails.availableDocuments.length > 0 && (
              <div className="p-3 border border-dashed rounded-md bg-blue-50 text-blue-700">
                <h5 className="font-semibold text-sm flex items-center mb-2"><BookOpen className="h-4 w-4 mr-2"/>Technical Documents from Provider</h5>
                <ul className="list-disc list-inside text-xs space-y-1">
                    {providerDetails.availableDocuments.map(doc => <li key={doc}>{doc}</li>)}
                </ul>
                <p className="text-xs mt-2 italic">(These documents are notionally shared. In a full system, download links or viewable documents would appear here.)</p>
              </div>
            )}
             {request.providerId && providerDetails && providerDetails.isVerified && request.status !== 'Pending' && request.status !== 'Cancelled' && (
              <div className="p-3 border border-dashed rounded-md bg-green-50 text-green-700 mt-2">
                <h5 className="font-semibold text-sm flex items-center mb-1"><FileArchive className="h-4 w-4 mr-2"/>Provider Documentation Note</h5>
                <p className="text-xs">
                  As this is a verified provider and the request is active, relevant company approvals, procedures, and technician qualification certifications are notionally considered submitted/available for this engagement.
                </p>
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
          {providerDetails && !isCancelled && request.status !== 'Completed' && (
            <Button onClick={() => alert(`Contacting provider ${providerDetails.name} via ${providerDetails.contactInfo}`)}>
              <Phone className="h-4 w-4 mr-2" /> Contact Provider
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
