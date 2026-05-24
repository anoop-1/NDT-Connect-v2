// src/app/track-request/[id]/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Phone, Activity, CheckCircle, Clock, AlertTriangle, CalendarDays, MapPinIcon, FileTextIcon, ShieldCheck, FileArchive, BookOpen, MessageSquare, Download } from "lucide-react";
import type { ServiceRequest, User } from "@/lib/types"; 
import { Badge } from "@/components/ui/badge";
import { ChatWindow } from "@/components/shared/chat/ChatWindow";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const requestId = params?.id as string;
  
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [providerDetails, setProviderDetails] = useState<any>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);

  const fetchRequestAndProvider = useCallback(async (reqId: string) => {
    setIsLoading(true);
    setFetchError(null);
    
    // DEMO MODE LOGIC
    if (user?.isDemo) {
        setFetchError("Request tracking is not available in demo mode.");
        setIsLoading(false);
        return;
    }

    try {
        // Fetch request from API
        const res = await fetch(`/api/service-requests/${reqId}`);
        const result = await res.json();
        if (!result.success) throw new Error(result.error || "Service request not found.");

        const requestData = result.data;
        if (requestData.clientId !== user?.id) {
          throw new Error("You do not have permission to view this request.");
        }
        setRequest(requestData);

        // Fetch provider details if assigned
        if (requestData.providerId) {
          try {
            const provRes = await fetch(`/api/users/${requestData.providerId}`);
            const provResult = await provRes.json();
            if (provResult.success) {
              setProviderDetails(provResult.data);
            }
          } catch (e: any) {
            console.warn("Could not fetch provider details:", e);
          }
        }
    } catch (error: any) {
        console.error("Error fetching request:", error);
        setFetchError(error.message || "Failed to load request details from the database.");
    } finally {
        setIsLoading(false);
    }
  }, [user]);


  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=/track-request/${requestId}`);
    } else if (user && user.role !== 'client') {
      router.push("/dashboard");
    } else if (user && requestId) {
        fetchRequestAndProvider(requestId);
    }
  }, [user, authLoading, router, requestId, fetchRequestAndProvider]);

  if (isLoading || authLoading) { 
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading request details...</span></div>;
  }
  
  if (!user || user.role !== 'client') {
     return <div className="text-center py-10">Access Denied. This page is for clients.</div>;
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
  
  if (!request) return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">No request data found.</div>;

  const statuses: ServiceRequest['status'][] = ['Pending', 'Confirmed', 'In Progress', 'Completed'];
  const currentStatusIndex = statuses.indexOf(request.status);
  const isCancelled = request.status === 'Cancelled';
  const canChat = (request.status === 'Confirmed' || request.status === 'In Progress') && providerDetails;
  
  const displayDate = request.requestedDate ? new Date(request.requestedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';

  const timelineDescriptions = {
    'Pending': 'Your request has been submitted and is awaiting provider confirmation.',
    'Confirmed': `Provider ${request.providerName || 'N/A'} has confirmed. They will contact you.`,
    'In Progress': 'The NDT service is currently being performed.',
    'Completed': 'The service has been completed. Check for reports or follow-ups.',
    'Cancelled': 'This service request has been cancelled.',
  };
  
  const providerDocs = providerDetails?.providerProfile?.availableDocuments;

  return (
    <>
      <div className="space-y-8">
        <Button variant="outline" onClick={() => router.push('/my-requests')} className="mb-6">
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
            <CardDescription>
              Request ID: {request.id}
              {user.isDemo && <span className="font-semibold text-primary ml-2">(Demo Mode)</span>}
              </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground flex items-center mb-1"><MapPinIcon className="h-4 w-4 mr-2"/>Location</h4>
                <p>{request.location}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground flex items-center mb-1"><CalendarDays className="h-4 w-4 mr-2"/>Requested Date</h4>
                <p>{displayDate}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground flex items-center mb-1"><FileTextIcon className="h-4 w-4 mr-2"/>Description</h4>
                <p className="text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded-md">{request.description}</p>
              </div>
              {providerDetails && (
                 <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Assigned Provider</h4>
                  <p className="font-medium">{providerDetails.name}</p>
                  {providerDetails.providerProfile?.isVerified && (
                    <Badge variant="default" className="mt-1 bg-green-100 text-green-700 border-green-300">
                      <ShieldCheck className="h-4 w-4 mr-1"/> Verified Provider
                    </Badge>
                  )}
                </div>
              )}
              {request.fileAttachmentUrl && (
                   <div className="p-3 border border-dashed rounded-md bg-blue-50 text-blue-700">
                      <h5 className="font-semibold text-sm flex items-center mb-2"><Download className="h-4 w-4 mr-2"/>Your Attached Document</h5>
                      <p className="text-xs truncate">{request.fileAttachmentUrl.split('/').pop()}</p>
                   </div>
              )}
              {providerDocs && providerDocs.length > 0 && (
                <div className="p-3 border border-dashed rounded-md bg-blue-50 text-blue-700">
                  <h5 className="font-semibold text-sm flex items-center mb-2"><BookOpen className="h-4 w-4 mr-2"/>Technical Documents from Provider</h5>
                  <ul className="list-disc list-inside text-xs space-y-1">
                      {providerDocs.map((doc: any) => <li key={doc}>{doc}</li>)}
                  </ul>
                  <p className="text-xs mt-2 italic">(These documents are notionally shared. In a full system, download links or viewable documents would appear here.)</p>
                </div>
              )}
               {providerDetails?.providerProfile?.isVerified && request.status !== 'Pending' && request.status !== 'Cancelled' && (
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
            <Button variant="outline" onClick={() => alert('Feature under development: Contact NDT Connect Support.')}>
              <MessageSquare className="h-4 w-4 mr-2" /> Contact Support
            </Button>
            {providerDetails && !isCancelled && request.status !== 'Completed' && (
              <Button onClick={() => alert(`Feature under development: Contact Provider ${providerDetails.name}.`)}>
                <Phone className="h-4 w-4 mr-2" /> Contact Provider
              </Button>
            )}
            {canChat && (
              <Button onClick={() => setShowChat(true)} variant="default">
                <MessageSquare className="h-4 w-4 mr-2" /> Chat with Provider
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <Dialog open={showChat} onOpenChange={setShowChat}>
        <DialogContent className="max-w-lg h-[70vh] flex flex-col p-0 gap-0">
          {canChat && providerDetails && user && (
            <>
              <DialogHeader className="p-4 border-b">
                <DialogTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                  Chat with {providerDetails.name || "Provider"}
                </DialogTitle>
              </DialogHeader>
              <ChatWindow
                currentUser={user}
                otherPartyName={providerDetails.name || "Provider"}
                otherPartyRole="provider"
                requestId={request.id}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
