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
import { CalendarIcon, Activity, Send, DollarSign, UserCheck, UploadCloud, FileCheck2, AlertTriangle, CheckCircle, Edit, PlusCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import type { ServiceRequest, CompareDocumentsOutput } from "@/lib/types";
import { compareDocuments } from "@/ai/flows/compare-documents-flow";
import { FormDescription } from "@/components/ui/form";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";


const NDT_SERVICES = [
  "Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)",
  "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)",
  "Leak Testing (LT)", "Acoustic Emission Testing (AET)", "Phased Array UT (PAUT)",
  "Time-of-Flight Diffraction (TOFD)", "Other", "General Inquiry"
];

const ACCEPTED_FILE_TYPES = "application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpeg,image/png,text/plain,.doc,.docx";

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
  });
};


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

  // State for AI Document Reader
  const [clientReqFile, setClientReqFile] = useState<File | null>(null);
  const [providerProcFile, setProviderProcFile] = useState<File | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<CompareDocumentsOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);


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

  const handleAnalyze = async () => {
      if (!clientReqFile || !providerProcFile) {
          toast({ title: "Missing Documents", description: "Please upload both documents to start the analysis.", variant: "destructive" });
          return;
      }
      setIsAnalyzing(true);
      setAnalysisError(null);
      setAiAnalysis(null);
      try {
          const [clientRequirementDataUri, providerProcedureDataUri] = await Promise.all([
              readFileAsDataURL(clientReqFile),
              readFileAsDataURL(providerProcFile),
          ]);
          const result = await compareDocuments({ clientRequirementDataUri, providerProcedureDataUri });
          setAiAnalysis(result);
          toast({ title: "Analysis Complete", description: "AI review results are displayed below." });
      } catch (error) {
          console.error("AI Analysis Error:", error);
          setAnalysisError("Failed to analyze documents. The AI may be busy or an error occurred. Please try again.");
          toast({ title: "Analysis Failed", variant: "destructive" });
      } finally {
          setIsAnalyzing(false);
      }
  };

  const addRevisionsToDescription = () => {
      if (!aiAnalysis || aiAnalysis.discrepancies.length === 0) return;
      const revisionsText = aiAnalysis.discrepancies.map((d, i) => 
          `Revision Suggestion ${i + 1}:\n- Client Requirement: ${d.clientRequirement}\n- Provider's Clause to be Revised: ${d.providerClause}\n- Suggested New Clause: ${d.suggestedRevision}`
      ).join('\n\n');

      const header = "\n\n--- AI-Suggested Revisions for Provider ---\n";
      setDescription(prev => prev.trim() + header + revisionsText);
      toast({ title: "Revisions Added", description: "Suggested revisions have been appended to the service description." });
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
        fileAttachmentUrl = `uploads/placeholder/${selectedFile.name}`;
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

    // Remove fileAttachmentUrl if it's null, as an empty field is cleaner.
    if (!newRequest.fileAttachmentUrl) {
      delete newRequest.fileAttachmentUrl;
    }

    try {
        const docRef = await addDoc(collection(db, "serviceRequests"), newRequest);
        
        if (providerId && providerName) {
            console.log(`--- SIMULATING EMAIL NOTIFICATION TO VENDOR ---`);
            console.log(`To: Email address of ${providerName} (ID: ${providerId})`);
            console.log(`--- END SIMULATION ---`);
        }

        toast({
            title: "Service Request Submitted",
            description: `Your request has been successfully submitted. ${providerName ? providerName + ' has been notified.' : 'Providers will be able to view your open request.'}`,
        });
        router.push(`/track-request/${docRef.id}`);
    } catch (error) {
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
                  <Calendar mode="single" selected={requestedDate} onSelect={setRequestedDate} initialFocus disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))} />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="description">Description of Work / Scope</Label>
              <Textarea id="description" placeholder="Provide details about the inspection needed, materials, components, standards, urgency etc." value={description} onChange={(e) => setDescription(e.target.value)} rows={5} required />
            </div>
            
            <div>
              <Label htmlFor="fileUpload" className="flex items-center"><UploadCloud className="h-4 w-4 mr-2 text-muted-foreground"/> Attach General Drawings/Documents (Conceptual)</Label>
              <Input id="fileUpload" type="file" onChange={handleFileChange} accept={ACCEPTED_FILE_TYPES} className="mt-1" />
              <p className="text-xs text-muted-foreground mt-1">Accepted: PDF, Excel, JPG, PNG. Note: File is not actually uploaded in this demo.</p>
            </div>

            {estimatedCost !== null && (
              <div className="p-3 bg-primary/10 rounded-md border border-primary/30">
                <Label className="flex items-center text-primary font-semibold"><DollarSign className="h-5 w-5 mr-2"/> Estimated Cost</Label>
                <p className="text-lg font-bold text-primary">${estimatedCost.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">(Includes conceptual service commission. Final price may vary.)</p>
              </div>
            )}
            
            {/* AI DOCUMENT READER */}
            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="flex items-center text-xl"><FileCheck2 className="h-6 w-6 mr-2 text-primary"/>AI Document Reader</CardTitle>
                    <CardDescription>Verify provider procedures against your requirements before submitting the request.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="clientReqFile" className="text-sm">1. Your Requirement Doc</Label>
                            <Input id="clientReqFile" type="file" onChange={(e) => setClientReqFile(e.target.files?.[0] || null)} accept={ACCEPTED_FILE_TYPES} className="mt-1 bg-background" />
                        </div>
                        <div>
                            <Label htmlFor="providerProcFile" className="text-sm">2. Provider's Procedure Doc</Label>
                            <Input id="providerProcFile" type="file" onChange={(e) => setProviderProcFile(e.target.files?.[0] || null)} accept={ACCEPTED_FILE_TYPES} className="mt-1 bg-background" />
                        </div>
                    </div>
                    <FormDescription>Upload both documents to enable the analysis. You may need to download the provider's procedure from their website or other sources.</FormDescription>
                    <Button type="button" onClick={handleAnalyze} disabled={!clientReqFile || !providerProcFile || isAnalyzing}>
                        {isAnalyzing ? <><Activity className="mr-2 h-4 w-4 animate-spin"/>Analyzing...</> : 'Analyze Documents with AI'}
                    </Button>
                    
                    {analysisError && <Alert variant="destructive"><AlertTriangle className="h-4 w-4" /><AlertTitle>Analysis Error</AlertTitle><AlertDescription>{analysisError}</AlertDescription></Alert>}

                    {aiAnalysis && (
                      <div className="space-y-4 pt-4">
                        {aiAnalysis.isCompliant ? (
                          <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
                            <CheckCircle className="h-4 w-4 !text-green-600"/>
                            <AlertTitle>Compliance Confirmed</AlertTitle>
                            <AlertDescription>{aiAnalysis.summary}</AlertDescription>
                          </Alert>
                        ) : (
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4"/>
                            <AlertTitle>Discrepancies Found</AlertTitle>
                            <AlertDescription>{aiAnalysis.summary}</AlertDescription>
                          </Alert>
                        )}

                        {aiAnalysis.discrepancies.length > 0 && (
                          <div className="space-y-4">
                             <h4 className="font-semibold">Suggested Revisions:</h4>
                             {aiAnalysis.discrepancies.map((d, i) => (
                               <div key={i} className="p-3 border rounded-md bg-background text-sm">
                                 <p><strong className="text-primary">Client Requirement:</strong> {d.clientRequirement}</p>
                                 <p className="mt-1"><strong className="text-destructive">Provider Clause:</strong> {d.providerClause}</p>
                                 <p className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md"><strong className="text-green-700">Suggested Revision:</strong> {d.suggestedRevision}</p>
                               </div>
                             ))}
                             <Button type="button" size="sm" variant="outline" onClick={addRevisionsToDescription}><PlusCircle className="mr-2 h-4 w-4"/>Add Revisions to Request</Button>
                          </div>
                        )}
                      </div>
                    )}
                </CardContent>
            </Card>

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
