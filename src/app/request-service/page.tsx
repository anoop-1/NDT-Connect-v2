// src/app/request-service/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Activity, Send } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const NDT_SERVICES = [
  "Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)", 
  "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)", "Other"
];


export default function RequestServicePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requestedDate, setRequestedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/request-service");
    } else if (user && user.role !== 'client') {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!serviceType || !location || !description || !requestedDate) {
      toast({ title: "Missing Information", description: "Please fill out all fields.", variant: "destructive" });
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Service Request Submitted",
      description: "Your NDT service request has been successfully submitted. We will notify you once a provider is assigned.",
    });
    // Reset form or redirect
    // setServiceType(""); setLocation(""); setDescription(""); setRequestedDate(new Date());
    router.push("/my-requests"); 
    setIsLoading(false);
  };
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading form...</span></div>;
  }

  if (!user || user.role !== 'client') {
    return <div className="text-center py-10">Access Denied. This page is for clients.</div>;
  }


  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Request NDT Service</CardTitle>
          <CardDescription>Fill out the form below to submit your service request. We&apos;ll help you find a qualified provider.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="serviceType">Service Type</Label>
              <Select value={serviceType} onValueChange={setServiceType}>
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
              <Label htmlFor="description">Description of Work</Label>
              <Textarea 
                id="description" 
                placeholder="Provide details about the inspection needed, materials, components, standards, etc." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
              />
            </div>
            
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