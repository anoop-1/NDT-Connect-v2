// src/app/provider-dashboard/ai-procedure-writer/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, FileSignature, Activity, AlertTriangle, Printer, Copy, MessageSquare, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateProcedure, GenerateProcedureInputSchema, GenerateProcedureOutput } from "@/ai/flows/generate-procedure-flow";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const formSchema = GenerateProcedureInputSchema;

const NDT_METHODS = ["Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)", "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)"];
const PERSONNEL_QUALS = ["SNT-TC-1A", "ISO 9712", "NAS 410", "EN 4179"];
const ACCEPTANCE_CRITERIA_STANDARDS = ["API 1104", "ASME Section V", "ASME B31.3", "AWS D1.1", "Client Specification"];

function AIProcedureWriterPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedProcedure, setGeneratedProcedure] = useState<GenerateProcedureOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      testMethod: "",
      scope: "",
      equipment: "",
      consumables: "",
      personnelQualification: "",
      acceptanceCriteria: "",
    },
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/provider-dashboard/ai-procedure-writer");
    } else if (user && user.role !== 'provider') {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    setError(null);
    setGeneratedProcedure(null);
    try {
      const result = await generateProcedure(values);
      setGeneratedProcedure(result);
      toast({ title: "Procedure Generated Successfully", description: "Review the procedure below. You can now print or copy it." });
    } catch (e) {
      console.error("Error generating procedure:", e);
      setError("Failed to generate procedure. The AI might be busy or an error occurred. Please try again.");
      toast({ title: "Generation Failed", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyToClipboard = () => {
    if (generatedProcedure?.procedureMarkdown) {
      navigator.clipboard.writeText(generatedProcedure.procedureMarkdown);
      toast({ title: "Copied to Clipboard", description: "The procedure markdown has been copied." });
    }
  };

  if (authLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading...</span></div>;
  }
  if (!user || user.role !== 'provider') {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  return (
    <div className="space-y-6 printable-area">
      <div className="no-print">
        <Button variant="outline" asChild>
          <Link href="/provider-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Provider Dashboard
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center no-print">
            <FileSignature className="mr-2 h-6 w-6 text-primary" />
            AI Procedure Writer
          </CardTitle>
          <CardDescription className="no-print">
            Provide the key details and the AI will generate a comprehensive NDT procedure for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 no-print">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="testMethod" render={({ field }) => (<FormItem><FormLabel>NDT Method</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a method..." /></SelectTrigger></FormControl><SelectContent>{NDT_METHODS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="personnelQualification" render={({ field }) => (<FormItem><FormLabel>Personnel Qualification</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a standard..." /></SelectTrigger></FormControl><SelectContent>{PERSONNEL_QUALS.map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
              </div>
              <FormField control={form.control} name="acceptanceCriteria" render={({ field }) => (<FormItem><FormLabel>Acceptance Criteria</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select or type a standard..." /></SelectTrigger></FormControl><SelectContent>{ACCEPTANCE_CRITERIA_STANDARDS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select><Input className="mt-2" placeholder="Or type a custom standard..." onChange={(e) => field.onChange(e.target.value)} value={field.value} /><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="scope" render={({ field }) => (<FormItem><FormLabel>Scope of Work</FormLabel><FormControl><Textarea placeholder="e.g., Perform UT thickness gauging on all accessible primary pipelines..." {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="equipment" render={({ field }) => (<FormItem><FormLabel>Equipment List</FormLabel><FormControl><Textarea placeholder="e.g., Olympus EPOCH 650, Krautkramer D-70 probe..." {...field} /></FormControl><FormDescription>List main equipment, make, and model. One per line.</FormDescription><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="consumables" render={({ field }) => (<FormItem><FormLabel>Consumables List</FormLabel><FormControl><Textarea placeholder="e.g., Ultragel II Couplant, Calibration Blocks..." {...field} /></FormControl><FormDescription>List all necessary consumables. One per line.</FormDescription><FormMessage /></FormItem>)} />
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? <><Activity className="mr-2 h-4 w-4 animate-spin"/> Generating...</> : <><FileSignature className="mr-2 h-4 w-4"/> Generate Procedure</>}
              </Button>
            </form>
          </Form>
          
          {error && <div className="mt-6 text-destructive text-center"><AlertTriangle className="inline-block mr-2"/> {error}</div>}

          {generatedProcedure && (
            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between items-center no-print">
                <h3 className="text-xl font-semibold">Generated Procedure</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyToClipboard}><Copy className="mr-2 h-4 w-4"/>Copy</Button>
                  <Button variant="outline" size="sm" onClick={handlePrint}><Printer className="mr-2 h-4 w-4"/>Print</Button>
                  <Button variant="outline" size="sm" onClick={() => toast({title: "Feature in development"})}><MessageSquare className="mr-2 h-4 w-4"/>Send</Button>
                </div>
              </div>
              <Card className="mt-4 prose dark:prose-invert max-w-none p-6">
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {generatedProcedure.procedureMarkdown}
                 </ReactMarkdown>
              </Card>
            </div>
          )}

        </CardContent>
      </Card>
      
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-area, .printable-area * {
            visibility: visible;
          }
          .printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default AIProcedureWriterPage;
