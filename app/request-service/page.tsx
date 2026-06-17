// src/app/request-service/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Activity, Send, DollarSign, UserCheck, UploadCloud } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import type { ServiceRequest } from "@/lib/types";

const NDT_SERVICES = [
  "Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)",
  "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)",
  "Leak Testing (LT)", "Acoustic Emission Testing (AET)", "Phased Array UT (PAUT)",
  "Time-of-Flight Diffraction (TOFD)", "Other", "General Inquiry"
];

const ACCEPTED_FILE_TYPES = "application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpeg,image/png,text/plain,.doc,.docx";


function RequestServiceFormContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState((user as any)?.clientProfile?.primaryLocation || "");
  const [description, setDescription] = useState("");
  const [requestedDate, setRequestedDate] = useState<Date | undefined>(new Date());
  const [providerId, setProviderId] = useState<string | null>(null);
  const [providerName, setProviderName] = useState<string | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      const redirectPath = `/request-service${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;
      router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
    } else if (user && user.role !== 'client') {
      router.push("/dashboard");
    } else if (user) {
        setLocation((user as any).clientProfile?.primaryLocation || "");
    }

    const queryProviderId = searchParams?.get("providerId");
    const queryProviderName = searchParams?.get("providerName");
    const queryServiceType = searchParams?.get("serviceType");
    const queryBaseRate = searchParams?.get("baseRate");
    const queryAiRecommendationId = searchParams?.get("aiRecommendationId");

    if (queryProviderId) setProviderId(queryProviderId);
    if (queryProviderName) setProviderName(queryProviderName);
    if (queryServiceType) setServiceType(queryServiceType);
    if (queryBaseRate) {
      const rate = parseFloat(queryBaseRate);
      if (!isNaN(rate)) {
        // Retrieve commission from localStorage or use default
        const commissionRate = parseFloat(localStorage.getItem('clientCommissionRate') || '15') / 100;
        setEstimatedCost(parseFloat((rate * (1 + commissionRate)).toFixed(2)));
      }
    } else if (queryAiRecommendationId && !queryBaseRate) {
        // Placeholder for AI recs without explicit base rate
    }

  }, [user, loading, router, searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
        toast({ title: "Not Logged In", description: "You must be logged in to make a request.", variant: "destructive" });
        return;
    }
    setIsLoading(true);

    if (!serviceType || !location || !description || !requestedDate) {
      toast({ title: "Missing Information", description: "Please fill out all required fields.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    let fileAttachmentUrl = "";
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("folder", `service-requests/${user.id}`);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          fileAttachmentUrl = uploadData.url;
        } else {
          console.warn("File upload failed, proceeding without attachment:", uploadData.error);
        }
      } catch (uploadErr) {
        console.warn("File upload error, proceeding without attachment:", uploadErr);
      }
    }

    const newRequest: Omit<ServiceRequest, 'id'> = {
        clientId: user.id,
        clientName: user.name || user.email,
        clientEmail: user.email,
        providerId: providerId || null,
        providerName: providerName || null,
        serviceType,
        location,
        description,
        requestedDate,
        status: 'Pending',
        estimatedCost: estimatedCost ?? null,
        fileAttachmentUrl: fileAttachmentUrl || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    try {
        const res = await fetch("/api/service-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRequest),
        });
        const result = await res.json();
        if (!result.success) throw new Error(result.error || "Failed to create request");
        const docRef = { id: result.data.id };
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', { service_type: serviceType, location });
        }

        // Send email notification to provider
        if (providerId && providerName) {
          try {
            await fetch("/api/notify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "new-request",
                providerEmail: "", // Will be looked up server-side if needed
                providerName,
                serviceType,
                location,
                description,
                clientName: user.name || user.email,
                requestId: docRef.id,
              }),
            });
          } catch (notifyErr) {
            console.warn("Email notification failed (non-blocking):", notifyErr);
          }
        }

        toast({
            title: "Service Request Submitted",
            description: `Your request has been successfully submitted. ${providerName ? providerName + ' has been notified.' : 'Providers will be able to view your open request.'}`,
        });
        router.push(`/track-request/${docRef.id}`);
    } catch (error: any) {
        console.error("Error adding document: ", error);
        toast({
            title: "Submission Failed",
            description: "Could not save your service request to the database.",
            variant: "destructive",
        });
        setIsLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-20rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading form...</span></div>;
  }

  if (!user || user.role !== 'client') {
    return <div className="text-center py-10">Access Denied. This page is for clients.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Request NDT Service</CardTitle>
          <CardDescription>Fill out the form below to submit your service request.
            {providerName && ` You've selected ${providerName}.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {providerName && (
              <div className="p-3 bg-accent/20 rounded-md border border-accent">
                <Label className="flex items-center text-primary font-semibold">
                  <UserCheck className="h-5 w-5 mr-2"/> Selected Provider: {providerName}
                </Label>
              </div>
            )}

            <div>
              <Label htmlFor="serviceType">Service Type</Label>
              <Select value={serviceType} onValueChange={setServiceType} required>
                <SelectTrigger id="serviceType">
                  <SelectValue placeholder="Select NDT Service" />
                </SelectTrigger>
                <SelectContent>
                  {NDT_SERVICES.map(service => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location of Service</Label>
              <Input id="location" placeholder="e.g., Main Plant, Section B or Full Address" value={location} onChange={(e) => setLocation(e.target.value)} required />
               <p className="text-xs text-muted-foreground mt-1">Defaults to your primary location if set in profile.</p>
            </div>

            <div>
              <Label htmlFor="requestedDate">Preferred Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !requestedDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {requestedDate ? format(requestedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={requestedDate} onSelect={setRequestedDate} autoFocus disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))} />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="description">Description of Work / Scope</Label>
              <Textarea id="description" placeholder="Provide details about the inspection needed, materials, components, standards, urgency etc." value={description} onChange={(e) => setDescription(e.target.value)} rows={5} required />
            </div>
            
            <div>
              <Label htmlFor="fileUpload" className="flex items-center"><UploadCloud className="h-4 w-4 mr-2 text-muted-foreground"/> Attach Drawings/Documents (Optional)</Label>
              <Input id="fileUpload" type="file" onChange={handleFileChange} accept={ACCEPTED_FILE_TYPES} className="mt-1" />
              <p className="text-xs text-muted-foreground mt-1">Accepted: PDF, Excel, Word, JPG, PNG. Max 10MB.</p>
            </div>

            {estimatedCost !== null && (
              <div className="p-3 bg-primary/10 rounded-md border border-primary/30">
                <Label className="flex items-center text-primary font-semibold"><DollarSign className="h-5 w-5 mr-2"/> Estimated Cost</Label>
                <p className="text-lg font-bold text-primary">${estimatedCost.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">(Includes conceptual service commission. Final price may vary.)</p>
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <> <Activity className="mr-2 h-4 w-4 animate-spin" /> Submitting... </> : <> <Send className="mr-2 h-4 w-4" /> Submit Request </>}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function RequestServicePage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-[calc(100vh-20rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading...</span></div>}>
      <RequestServiceFormContent />
    </Suspense>
  );
}
