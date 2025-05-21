
// src/app/request-service/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation"; // Added useSearchParams
import { useEffect, useState, Suspense } from "react"; // Added Suspense
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Activity, Send, DollarSign, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const NDT_SERVICES = [
  "Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)",
  "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)",
  "Leak Testing (LT)", "Acoustic Emission Testing (AET)", "Phased Array UT (PAUT)",
  "Time-of-Flight Diffraction (TOFD)", "Other", "General Inquiry"
];

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


  useEffect(() => {
    if (!loading && !user) {
      const redirectPath = `/request-service${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
    } else if (user && user.role !== 'client') {
      router.push("/dashboard");
    } else if (user) {
        setLocation(user.clientProfile?.primaryLocation || "");
    }

    // Pre-fill from query parameters
    const queryProviderId = searchParams.get("providerId");
    const queryProviderName = searchParams.get("providerName");
    const queryServiceType = searchParams.get("serviceType");
    const queryBaseRate = searchParams.get("baseRate");
    const queryAiRecommendationId = searchParams.get("aiRecommendationId"); // Check for AI rec

    if (queryProviderId) setProviderId(queryProviderId);
    if (queryProviderName) setProviderName(queryProviderName);
    if (queryServiceType) setServiceType(queryServiceType);
    if (queryBaseRate) {
      const rate = parseFloat(queryBaseRate);
      if (!isNaN(rate)) {
        setEstimatedCost(parseFloat((rate * 1.15).toFixed(2)));
      }
    } else if (queryAiRecommendationId && !queryBaseRate) { // AI Rec might not have base rate initially
        // If it's an AI rec and no base rate, we might not show cost, or a placeholder
        // For now, let's assume AI recs pre-selected from /recommendations might not have a queryBaseRate
        // unless the Recommendation type and flow are updated to include it.
        // If AI recs *should* have a cost, the AI flow/data needs to provide that.
    }


  }, [user, loading, router, searchParams]);


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

    toast({
      title: "Service Request Submitted",
      description: `Your request for ${serviceType} has been submitted. ${providerName ? `Provider ${providerName} will be notified.` : 'We will find a suitable provider.'}`,
    });

    router.push(`/my-requests`); // Redirect to a page where they can see this new request
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
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))} // Disable past dates
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

