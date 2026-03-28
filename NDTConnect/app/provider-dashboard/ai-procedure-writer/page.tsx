// app/provider-dashboard/ai-procedure-writer/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, FileSignature, Activity, Download, Copy, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const NDT_METHODS = [
  "Ultrasonic Testing (UT)",
  "Radiographic Testing (RT)",
  "Magnetic Particle Testing (MT)",
  "Liquid Penetrant Testing (PT)",
  "Visual Testing (VT)",
  "Eddy Current Testing (ET)",
  "Acoustic Emission Testing (AE)",
  "Time of Flight Diffraction (TOFD)",
  "Phased Array Ultrasonic Testing (PAUT)",
  "Leak Testing (LT)",
  "Thermographic Testing (TT)",
  "Computed Tomography (CT)",
];

const APPLICABLE_STANDARDS = [
  "ASME Section V",
  "ASME B31.3",
  "AWS D1.1",
  "API 650",
  "API 653",
  "API 570",
  "API 510",
  "ASTM E164",
  "ASTM E709",
  "ASTM E1444",
  "ASTM E165",
  "ISO 17640",
  "ISO 3452",
  "EN 1714",
  "Other (specify in notes)",
];

function AIProcedureWriterPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [testMethod, setTestMethod] = useState("");
  const [scopeOfWork, setScopeOfWork] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [applicableStandard, setApplicableStandard] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [generatedProcedure, setGeneratedProcedure] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/provider-dashboard/ai-procedure-writer");
    } else if (user && user.role !== 'provider' && user.role !== 'inspector') {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleGenerate = async () => {
    if (!testMethod || !scopeOfWork) {
      toast({
        title: "Missing Fields",
        description: "Please select a test method and enter the scope of work.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedProcedure("");

    try {
      const response = await fetch("/api/ai/generate-procedure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testMethod,
          scopeOfWork,
          materialType,
          applicableStandard,
          acceptanceCriteria,
          additionalNotes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate procedure.");
      }

      setGeneratedProcedure(data.procedure);
      toast({ title: "Procedure Generated", description: "Your NDT procedure has been generated successfully." });
    } catch (error: any) {
      toast({
        title: "Generation Failed",
        description: error.message || "An error occurred while generating the procedure.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedProcedure);
    setCopied(true);
    toast({ title: "Copied", description: "Procedure copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedProcedure], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `NDT_Procedure_${testMethod.replace(/[^a-zA-Z0-9]/g, "_")}_${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (authLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading...</span></div>;
  }
  if (!user || (user.role !== 'provider' && user.role !== 'inspector')) {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="outline" asChild>
          <Link href="/provider-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Provider Dashboard
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileSignature className="mr-2 h-6 w-6 text-primary" />
            AI Procedure Writer
          </CardTitle>
          <CardDescription>
            Provide the key details and AI will generate a comprehensive, code-compliant NDT procedure for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="testMethod">NDT Method *</Label>
              <Select value={testMethod} onValueChange={setTestMethod}>
                <SelectTrigger id="testMethod">
                  <SelectValue placeholder="Select NDT method..." />
                </SelectTrigger>
                <SelectContent>
                  {NDT_METHODS.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicableStandard">Applicable Standard/Code</Label>
              <Select value={applicableStandard} onValueChange={setApplicableStandard}>
                <SelectTrigger id="applicableStandard">
                  <SelectValue placeholder="Select standard..." />
                </SelectTrigger>
                <SelectContent>
                  {APPLICABLE_STANDARDS.map((std) => (
                    <SelectItem key={std} value={std}>
                      {std}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="materialType">Material Type</Label>
              <Input
                id="materialType"
                placeholder="e.g., Carbon Steel, Stainless Steel, Aluminum..."
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="acceptanceCriteria">Acceptance Criteria</Label>
              <Input
                id="acceptanceCriteria"
                placeholder="e.g., Per ASME Section VIII Div. 1, Appendix 12..."
                value={acceptanceCriteria}
                onChange={(e) => setAcceptanceCriteria(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scopeOfWork">Scope of Work *</Label>
            <Textarea
              id="scopeOfWork"
              placeholder="Describe the inspection scope — e.g., Ultrasonic thickness measurement of carbon steel piping in a refinery unit, NPS 4 to 24, schedule 40 to 80..."
              value={scopeOfWork}
              onChange={(e) => setScopeOfWork(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              placeholder="Any additional requirements, special considerations, client-specific requirements..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              rows={3}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !testMethod || !scopeOfWork}
            className="w-full md:w-auto"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-spin" />
                Generating Procedure...
              </>
            ) : (
              <>
                <FileSignature className="mr-2 h-4 w-4" />
                Generate Procedure
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Procedure Output */}
      {generatedProcedure && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Procedure</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert bg-muted/50 p-6 rounded-lg border whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {generatedProcedure}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AIProcedureWriterPage;
