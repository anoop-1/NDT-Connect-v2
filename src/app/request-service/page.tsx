
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

const NDT_SERVICES = [
  "Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)",
  "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)",
  "Leak Testing (LT)", "Acoustic Emission Testing (AET)", "Phased Array UT (PAUT)",
  "Time-of-Flight Diffraction (TOFD)", "Other", "General Inquiry"
];

const ACCEPTED_FILE_TYPES = "application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpeg,image/png";

function RequestServiceFormContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState(user?.clientProfile?.primaryLocation || "");
  const [description, setDescription] = useState("");
  const [requestedDate, setRequestedDate] = useState<Date | undefined>(new Date());
  const [providerId, setProviderId] = useState<string | null>(null);
  const [providerName, setProviderName] = useState<string | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  useEffect(() => {
    if (!loading && !user) {
      const redirectPath = `/request-service${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
    } else if (user && user.role !== 'client') {
      router.push("/dashboard");
    } else if (user) {
        setLocation(user.clientProfile?.primaryLocation || "");
    }

    const queryProviderId = searchParams.get("providerId");
    const queryProviderName = searchParams.get("providerName");
    const queryServiceType = searchParams.get("serviceType");
    const queryBaseRate = searchParams.get("baseRate");
    const queryAiRecommendationId = searchParams.get("aiRecommendationId");

    if (queryProviderId) setProviderId(queryProviderId);
    if (queryProviderName) setProviderName(queryProviderName);
    if (queryServiceType) setServiceType(queryServiceType);
    if (queryBaseRate) {
      const rate = parseFloat(queryBaseRate);
      if (!isNaN(rate)) {
        setEstimatedCost(parseFloat((rate * 1.15).toFixed(2)));
      }
    } else if (queryAiRecommendationId && !queryBaseRate) {
        // Placeholder for AI recs without explicit base rate
    }

  }, [user, loading, router, searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Basic file type validation (optional, browser does some with `accept`)
      // const file = e.target.files[0];
      // if (file.size > 5 * 1024 * 1024) { // Example: 5MB limit
      //   toast({ title: "File too large", description: "Please select a file smaller than 5MB.", variant: "destructive" });
      //   setSelectedFile(null);
      //   e.target.value = ""; // Reset file input
      //   return;
      // }
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!serviceType || !location || !description || !requestedDate) {
      toast({ title: "Missing Information", description: "Please fill out all fields.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    // Simulate API call for service request
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newRequestId = `req-${Date.now()}`;

    let fileDetailsMessage = "";
    if (selectedFile) {
      console.log("Selected file details:", {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
      });
      fileDetailsMessage = ` File attached: ${selectedFile.name}`;
    }

    toast({
      title: "Service Request Submitted",
      description: `Your request for ${serviceType} has been submitted. ${providerName ? `Provider ${providerName} will be notified.` : 'We will find a suitable provider.'}${fileDetailsMessage}`,
    });

    router.push(`/my-requests`);
    setIsLoading(false);
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
              <Input
                id="location"
                placeholder="e.g., Main Plant, Section B or Full Address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
               <p className="text-xs text-muted-foreground mt-1">Defaults to your primary location if set in profile.</p>
            </div>

            <div>
              <Label htmlFor="requestedDate">Preferred Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !requestedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {requestedDate ? format(requestedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={requestedDate}
                    onSelect={setRequestedDate}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="description">Description of Work / Scope</Label>
              <Textarea
                id="description"
                placeholder="Provide details about the inspection needed, materials, components, standards, urgency etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="fileUpload" className="flex items-center">
                <UploadCloud className="h-4 w-4 mr-2 text-muted-foreground"/> Attach Drawings/Documents (Optional)
              </Label>
              <Input
                id="fileUpload"
                type="file"
                onChange={handleFileChange}
                accept={ACCEPTED_FILE_TYPES}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">Accepted: PDF, Excel, JPG, PNG. Max 5MB (conceptual).</p>
              {selectedFile && (
                <div className="mt-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded-md flex items-center justify-between">
                  <span>
                    Selected: {selectedFile.name} ({ (selectedFile.size / 1024).toFixed(2) } KB)
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSelectedFile(null);
                      // Reset the file input visually
                      const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
                      if (fileInput) fileInput.value = "";
                    }} 
                    className="text-xs h-auto p-1"
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>


            {estimatedCost !== null && (
              <div className="p-3 bg-primary/10 rounded-md border border-primary/30">
                <Label className="flex items-center text-primary font-semibold">
                  <DollarSign className="h-5 w-5 mr-2"/> Estimated Cost
                </Label>
                <p className="text-lg font-bold text-primary">${estimatedCost.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">(Final price may vary based on final scope)</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <> <Activity className="mr-2 h-4 w-4 animate-spin" /> Submitting... </>
              ) : (
                <> <Send className="mr-2 h-4 w-4" /> Submit Request </>
              )}
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
