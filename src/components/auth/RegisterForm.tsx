// src/components/auth/RegisterForm.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useCallback } from "react";
import type { ClientProfileData, ProviderProfileData, ServiceOffering, PersonnelQualification, CompanyCertification, InspectorProfileData } from "@/lib/types";
import { ListChecks, PlusCircle, Trash2, Award, Users2, FileText, Activity, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';

// --- ZOD SCHEMAS ---

const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const baseSchema = z.object({
  name: z.string().min(2, { message: "Full name or Company Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions." }),
});

const serviceOfferingSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Service name is required."),
  unit: z.string().min(1, "Unit is required."),
  rate: z.string().refine(val => val === '' || !isNaN(parseFloat(val)), { message: "Rate must be a number or empty." }),
  isCustom: z.boolean().optional(),
});

const personnelQualificationSchema = z.object({
  id: z.string(),
  quantity: z.preprocess(val => parseInt(String(val), 10), z.number().min(1, "Min 1")),
  certificationBody: z.string().min(1, "Body is required."),
  level: z.string().min(1, "Level is required."),
});

const companyCertificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certification name is required."),
  category: z.string().optional(),
});

const clientSchema = baseSchema.extend({
  role: z.literal("client"),
  companyName: z.string().min(2, { message: "Company name is required." }),
  industry: z.string().min(2, { message: "Industry is required." }),
  primaryLocation: z.string().min(2, { message: "Primary location is required." }),
  contactNumberClient: z.string().min(7, { message: "Contact number is required." }),
});

const providerSchema = baseSchema.extend({
  role: z.literal("provider"),
  locationProvider: z.string().min(2, { message: "Location is required." }),
  contactNumberProvider: z.string().min(7, { message: "Contact number is required." }),
  servicesOffered: z.array(serviceOfferingSchema).min(1, "At least one service is required."),
  personnelQualifications: z.array(personnelQualificationSchema).min(1, "At least one qualification is required."),
  certifications: z.array(companyCertificationSchema).optional(),
  procedureInfoUrl: z.string().url().or(z.literal("")).optional(),
  companyLogoUrl: z.string().url().or(z.literal("")).optional(),
});

const inspectorSchema = baseSchema.extend({
  role: z.literal("inspector"),
  locationInspector: z.string().min(2, { message: "Your location is required." }),
  contactNumberInspector: z.string().min(7, { message: "Contact number is required." }),
  servicesOfferedInspector: z.array(serviceOfferingSchema).min(1, "At least one service is required."),
  personnelQualificationsInspector: z.array(personnelQualificationSchema.omit({ quantity: true })).min(1, "At least one qualification is required."),
  bio: z.string().optional(),
  profileImageUrl: z.string().url().or(z.literal("")).optional(),
});

const formSchema = z.discriminatedUnion("role", [clientSchema, providerSchema, inspectorSchema])
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof formSchema>;

const defaultServiceOfferingRow = (isCustom: boolean = false): ServiceOffering => ({
  id: generateUniqueId(), name: "", rate: '', unit: "", isCustom,
});
const defaultPersonnelQualificationRow = (): PersonnelQualification => ({
  id: generateUniqueId(), quantity: 1, certificationBody: "", level: ""
});
const defaultCompanyCertificationRow = (): CompanyCertification => ({
  id: generateUniqueId(), name: "", category: ""
});

const agreementTexts = {
  client: "Welcome to NDT Connect! By registering as a Client, you agree that NDT Connect is a facilitator platform. You are solely responsible for your due diligence, selection of, and agreements with Service Providers.",
  provider: "Welcome to NDT Connect! By registering as a Service Provider, you agree to provide accurate information in your profile and to fulfill client requirements professionally. NDT Connect is a facilitator and does not guarantee work.",
  inspector: "Welcome to NDT Connect! By registering as an NDT Inspector, you affirm that you are an independent contractor. You agree to represent your skills and qualifications accurately and to perform work with professional diligence."
};

interface PredefinedLists {
    providerNdtServices: string[];
    serviceUnits: string[];
    qualificationBodies: string[];
    qualificationLevels: string[];
    companyCertifications: string[];
}

// --- SUB-COMPONENTS FOR EACH ROLE ---

const ClientFields = ({ form }: { form: UseFormReturn<FormSchemaType> }) => (
  <div className="space-y-4">
    <FormField control={form.control} name="companyName" render={({ field }) => (<FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="Client Inc." {...field} /></FormControl><FormMessage /></FormItem>)} />
    <FormField control={form.control} name="industry" render={({ field }) => (<FormItem><FormLabel>Industry</FormLabel><FormControl><Input placeholder="e.g., Manufacturing, Energy" {...field} /></FormControl><FormMessage /></FormItem>)} />
    <FormField control={form.control} name="primaryLocation" render={({ field }) => (<FormItem><FormLabel>Primary Location</FormLabel><FormControl><Input placeholder="City, State" {...field} /></FormControl><FormMessage /></FormItem>)} />
    <FormField control={form.control} name="contactNumberClient" render={({ field }) => (<FormItem><FormLabel>Contact Number</FormLabel><FormControl><Input placeholder="(555) 123-4567" {...field} /></FormControl><FormMessage /></FormItem>)} />
  </div>
);

const ProviderFields = ({ form, lists }: { form: UseFormReturn<FormSchemaType>, lists: PredefinedLists }) => {
    const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({ control: form.control, name: "servicesOffered" as any });
    const { fields: personnelFields, append: appendPersonnel, remove: removePersonnel } = useFieldArray({ control: form.control, name: "personnelQualifications" as any });
    const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({ control: form.control, name: "certifications" as any });

    return (
        <div className="space-y-6">
            <FormField control={form.control} name="locationProvider" render={({ field }) => (<FormItem><FormLabel>Business Location</FormLabel><FormControl><Input placeholder="City, State" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="contactNumberProvider" render={({ field }) => (<FormItem><FormLabel>Contact Number</FormLabel><FormControl><Input placeholder="(555) 987-6543" {...field} /></FormControl><FormMessage /></FormItem>)} />
            
            <Card><CardHeader><CardTitle className="flex items-center text-lg"><ListChecks className="h-5 w-5 mr-2 text-primary"/>Services Offered</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    {serviceFields.map((item, index) => (
                        <div key={item.id} className="flex gap-2 items-start">
                            <div className="grid flex-grow grid-cols-1 md:grid-cols-3 gap-2">
                                <FormField control={form.control} name={`servicesOffered.${index}.name`} render={({ field }) => (<FormItem>{(item as ServiceOffering).isCustom ? <FormControl><Input placeholder="Custom service name" {...field}/></FormControl> : <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select service"/></SelectTrigger></FormControl><SelectContent>{lists.providerNdtServices.map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>}<FormMessage/></FormItem>)} />
                                <FormField control={form.control} name={`servicesOffered.${index}.unit`} render={({ field }) => (<FormItem><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select unit"/></SelectTrigger></FormControl><SelectContent>{lists.serviceUnits.map(u=><SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>)} />
                                <FormField control={form.control} name={`servicesOffered.${index}.rate`} render={({ field }) => (<FormItem><FormControl><Input placeholder="e.g. 100" {...field} /></FormControl><FormMessage/></FormItem>)} />
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeService(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                        </div>
                    ))}
                    <div className="flex gap-2"><Button type="button" variant="outline" size="sm" onClick={() => appendService(defaultServiceOfferingRow(false))}><PlusCircle className="mr-2 h-4 w-4"/>Add Service</Button><Button type="button" variant="outline" size="sm" onClick={() => appendService(defaultServiceOfferingRow(true))}><PlusCircle className="mr-2 h-4 w-4"/>Add Custom</Button></div>
                </CardContent>
            </Card>

            <Card><CardHeader><CardTitle className="flex items-center text-lg"><Users2 className="h-5 w-5 mr-2 text-primary"/>Personnel Qualifications</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    {personnelFields.map((item, index) => (
                        <div key={item.id} className="flex gap-2 items-start">
                            <div className="grid flex-grow grid-cols-1 md:grid-cols-3 gap-2">
                                <FormField control={form.control} name={`personnelQualifications.${index}.quantity`} render={({ field }) => (<FormItem><FormControl><Input type="number" placeholder="Qty" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}/></FormControl><FormMessage/></FormItem>)} />
                                <FormField control={form.control} name={`personnelQualifications.${index}.certificationBody`} render={({ field }) => (<FormItem><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Cert Body"/></SelectTrigger></FormControl><SelectContent>{lists.qualificationBodies.map(b=><SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>)} />
                                <FormField control={form.control} name={`personnelQualifications.${index}.level`} render={({ field }) => (<FormItem><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Cert Level"/></SelectTrigger></FormControl><SelectContent>{lists.qualificationLevels.map(l=><SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>)} />
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removePersonnel(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendPersonnel(defaultPersonnelQualificationRow())}><PlusCircle className="mr-2 h-4 w-4"/>Add Qualification</Button>
                </CardContent>
            </Card>

            <Card><CardHeader><CardTitle className="flex items-center text-lg"><Award className="h-5 w-5 mr-2 text-primary"/>Company Certifications (Optional)</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    {certFields.map((item, index) => (
                        <div key={item.id} className="flex gap-2 items-start">
                            <div className="grid flex-grow grid-cols-1 md:grid-cols-2 gap-2">
                                <FormField control={form.control} name={`certifications.${index}.name`} render={({ field }) => (<FormItem><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Cert Name"/></SelectTrigger></FormControl><SelectContent>{lists.companyCertifications.map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>)} />
                                <FormField control={form.control} name={`certifications.${index}.category`} render={({ field }) => (<FormItem><FormControl><Input placeholder="e.g. Quality Mgmt" {...field}/></FormControl><FormMessage/></FormItem>)} />
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeCert(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendCert(defaultCompanyCertificationRow())}><PlusCircle className="mr-2 h-4 w-4"/>Add Certification</Button>
                </CardContent>
            </Card>
            
            <FormField control={form.control} name="procedureInfoUrl" render={({ field }) => (<FormItem><FormLabel>Procedures/Bio URL (Optional)</FormLabel><FormControl><Input placeholder="https://example.com/about" {...field} /></FormControl><FormMessage/></FormItem>)} />
            <FormField control={form.control} name="companyLogoUrl" render={({ field }) => (<FormItem><FormLabel>Company Logo URL (Optional)</FormLabel><FormControl><Input placeholder="https://example.com/logo.png" {...field} /></FormControl><FormMessage/></FormItem>)} />
        </div>
    );
}

const InspectorFields = ({ form, lists }: { form: UseFormReturn<FormSchemaType>, lists: PredefinedLists }) => {
    const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({ control: form.control, name: "servicesOfferedInspector" as any });
    const { fields: personnelFields, append: appendPersonnel, remove: removePersonnel } = useFieldArray({ control: form.control, name: "personnelQualificationsInspector" as any });

    return (
        <div className="space-y-6">
            <FormField control={form.control} name="locationInspector" render={({ field }) => (<FormItem><FormLabel>Your Location</FormLabel><FormControl><Input placeholder="City, State" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="contactNumberInspector" render={({ field }) => (<FormItem><FormLabel>Contact Number</FormLabel><FormControl><Input placeholder="(555) 555-5555" {...field} /></FormControl><FormMessage /></FormItem>)} />
            
            <Card><CardHeader><CardTitle className="flex items-center text-lg"><ListChecks className="h-5 w-5 mr-2 text-primary"/>Services You Offer</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    {serviceFields.map((item, index) => (
                        <div key={item.id} className="flex gap-2 items-start">
                            <div className="grid flex-grow grid-cols-1 md:grid-cols-3 gap-2">
                                <FormField control={form.control} name={`servicesOfferedInspector.${index}.name`} render={({ field }) => (<FormItem>{(item as ServiceOffering).isCustom ? <FormControl><Input placeholder="Custom service name" {...field}/></FormControl> : <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select service"/></SelectTrigger></FormControl><SelectContent>{lists.providerNdtServices.map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>}<FormMessage/></FormItem>)} />
                                <FormField control={form.control} name={`servicesOfferedInspector.${index}.unit`} render={({ field }) => (<FormItem><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select unit"/></SelectTrigger></FormControl><SelectContent>{lists.serviceUnits.map(u=><SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>)} />
                                <FormField control={form.control} name={`servicesOfferedInspector.${index}.rate`} render={({ field }) => (<FormItem><FormControl><Input placeholder="e.g. 100" {...field} /></FormControl><FormMessage/></FormItem>)} />
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeService(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                        </div>
                    ))}
                    <div className="flex gap-2"><Button type="button" variant="outline" size="sm" onClick={() => appendService(defaultServiceOfferingRow(false))}><PlusCircle className="mr-2 h-4 w-4"/>Add Service</Button><Button type="button" variant="outline" size="sm" onClick={() => appendService(defaultServiceOfferingRow(true))}><PlusCircle className="mr-2 h-4 w-4"/>Add Custom</Button></div>
                </CardContent>
            </Card>

            <Card><CardHeader><CardTitle className="flex items-center text-lg"><Award className="h-5 w-5 mr-2 text-primary"/>Your Qualifications</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    {personnelFields.map((item, index) => (
                         <div key={item.id} className="flex gap-2 items-start">
                            <div className="grid flex-grow grid-cols-1 md:grid-cols-2 gap-2">
                                <FormField control={form.control} name={`personnelQualificationsInspector.${index}.certificationBody`} render={({ field }) => (<FormItem><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Cert Body"/></SelectTrigger></FormControl><SelectContent>{lists.qualificationBodies.map(b=><SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>)} />
                                <FormField control={form.control} name={`personnelQualificationsInspector.${index}.level`} render={({ field }) => (<FormItem><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Cert Level"/></SelectTrigger></FormControl><SelectContent>{lists.qualificationLevels.map(l=><SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>)} />
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removePersonnel(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendPersonnel({ id: generateUniqueId(), certificationBody: '', level: '' })}><PlusCircle className="mr-2 h-4 w-4"/>Add Qualification</Button>
                </CardContent>
            </Card>

            <FormField control={form.control} name="bio" render={({ field }) => (<FormItem><FormLabel>Bio (Optional)</FormLabel><FormControl><Textarea placeholder="Briefly describe your experience and expertise." {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="profileImageUrl" render={({ field }) => (<FormItem><FormLabel>Profile Photo URL (Optional)</FormLabel><FormControl><Input placeholder="https://example.com/your-photo.png" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
    );
};


// --- MAIN FORM COMPONENT ---

export function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLists, setIsLoadingLists] = useState(false);
  const [listsError, setListsError] = useState<string | null>(null);
  const [predefinedLists, setPredefinedLists] = useState<PredefinedLists>({
    providerNdtServices: [], serviceUnits: [], qualificationBodies: [], qualificationLevels: [], companyCertifications: []
  });

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { role: "client", name: "", email: "", password: "", confirmPassword: "", acceptTerms: false, companyName: "", industry: "", primaryLocation: "", contactNumberClient: "" },
    mode: "onBlur"
  });

  const currentRole = form.watch("role");

  const fetchPredefinedLists = useCallback(async () => {
    if (currentRole === 'client') return;
    setIsLoadingLists(true);
    setListsError(null);
    try {
        const listIds = ["providerNdtServices", "serviceUnits", "personnelQualificationBodies", "personnelQualificationLevels", "companyCertifications"];
        const listSnapshots = await Promise.all(listIds.map(id => getDoc(doc(db, "predefinedLists", id))));
        const newLists: any = {};
        listSnapshots.forEach((snap, index) => {
            const id = listIds[index];
            newLists[id] = snap.exists() && Array.isArray(snap.data().items) ? snap.data().items : [];
        });
        setPredefinedLists(newLists);
    } catch (error) {
      console.error("Error fetching predefined lists:", error);
      setListsError("Failed to load registration options. Please try again later.");
    } finally {
      setIsLoadingLists(false);
    }
  }, [currentRole]);

  const getInitialValues = useCallback((role: 'client' | 'provider' | 'inspector') => {
      const base = { name: form.getValues('name'), email: form.getValues('email'), password: form.getValues('password'), confirmPassword: form.getValues('confirmPassword'), acceptTerms: form.getValues('acceptTerms') };
      switch (role) {
          case "client": return { ...base, role, companyName: "", industry: "", primaryLocation: "", contactNumberClient: "" };
          case "provider": return { ...base, role, locationProvider: "", contactNumberProvider: "", servicesOffered: [defaultServiceOfferingRow()], personnelQualifications: [defaultPersonnelQualificationRow()], certifications: [defaultCompanyCertificationRow()], procedureInfoUrl: "", companyLogoUrl: "" };
          case "inspector": return { ...base, role, locationInspector: "", contactNumberInspector: "", servicesOfferedInspector: [defaultServiceOfferingRow()], personnelQualificationsInspector: [{ id: generateUniqueId(), certificationBody: '', level: '' }], bio: "", profileImageUrl: "" };
          default: return { ...base, role: 'client' };
      }
  },[form]);


  useEffect(() => {
    fetchPredefinedLists();
    form.reset(getInitialValues(currentRole));
  }, [currentRole, fetchPredefinedLists, form, getInitialValues]);


  async function onSubmit(values: FormSchemaType) {
    setIsLoading(true);
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", values.email), where("isActive", "==", true));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        toast({ title: "Registration Failed", description: "An active account with this email already exists.", variant: "destructive" });
        setIsLoading(false);
        return;
    }
    
    let profileData: Partial<ClientProfileData & ProviderProfileData & InspectorProfileData> = {};
    if (values.role === "client") profileData = { companyName: values.companyName, industry: values.industry, primaryLocation: values.primaryLocation, contactNumber: values.contactNumberClient };
    if (values.role === "provider") profileData = { location: values.locationProvider, contactNumber: values.contactNumberProvider, servicesOffered: values.servicesOffered, personnelQualifications: values.personnelQualifications, certifications: values.certifications, procedureInfoUrl: values.procedureInfoUrl, companyLogoUrl: values.companyLogoUrl };
    if (values.role === "inspector") profileData = { location: values.locationInspector, contactNumber: values.contactNumberInspector, servicesOffered: values.servicesOfferedInspector, personnelQualifications: values.personnelQualificationsInspector.map(p => ({ ...p, quantity: 1 })), bio: values.bio, profileImageUrl: values.profileImageUrl };
    
    const registeredUser = await register({ email: values.email, role: values.role, name: values.name, profileData });
    if (registeredUser) {
        toast({ title: "Registration Successful!", description: `Please 'verify' your email on the login page for ${values.email}.`, duration: 7000 });
        router.push(`/login?status=verification_pending&email=${encodeURIComponent(values.email)}`);
    } else {
        toast({ title: "Registration Failed", description: "Could not create user account.", variant: "destructive" });
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormField control={form.control} name="name" render={({ field }) => ( <FormItem><FormLabel>Full Name / Company Name</FormLabel><FormControl><Input placeholder="John Doe or Acme Inc." {...field} /></FormControl><FormMessage/></FormItem> )} />
             <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Work Email</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage/></FormItem> )} />
             <FormField control={form.control} name="password" render={({ field }) => ( <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage/></FormItem> )} />
             <FormField control={form.control} name="confirmPassword" render={({ field }) => ( <FormItem><FormLabel>Confirm Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage/></FormItem> )} />
        </div>
        
        <FormField control={form.control} name="role" render={({ field }) => (
            <FormItem className="space-y-2 pt-2"><FormLabel>Register as</FormLabel>
                <FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap gap-x-4 gap-y-2">
                    <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="client"/></FormControl><Label className="font-normal">Client</Label></FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="provider"/></FormControl><Label className="font-normal">Service Provider</Label></FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="inspector"/></FormControl><Label className="font-normal">NDT Inspector (Freelancer)</Label></FormItem>
                </RadioGroup></FormControl><FormMessage/>
            </FormItem>
        )}/>

        {currentRole === "client" && <ClientFields form={form} />}
        {currentRole === "provider" && (isLoadingLists ? <Activity className="animate-spin"/> : listsError ? <p className="text-destructive">{listsError}</p> : <ProviderFields form={form} lists={predefinedLists} />)}
        {currentRole === "inspector" && (isLoadingLists ? <Activity className="animate-spin"/> : listsError ? <p className="text-destructive">{listsError}</p> : <InspectorFields form={form} lists={predefinedLists} />)}

        <div className="space-y-3 pt-4">
            <Label className="text-lg font-semibold flex items-center"><FileText className="mr-2 h-5 w-5 text-primary" />Agreement</Label>
            <ScrollArea className="h-24 w-full rounded-md border p-3 text-sm bg-muted/30"><pre className="whitespace-pre-wrap font-sans">{agreementTexts[currentRole]}</pre></ScrollArea>
            <FormField control={form.control} name="acceptTerms" render={({ field }) => ( <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange}/></FormControl><div className="space-y-1 leading-none"><FormLabel className="font-normal">I have read and agree to the User Agreement.</FormLabel><FormMessage/></div></FormItem> )} />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || isLoadingLists}>
          {isLoading ? "Registering..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
