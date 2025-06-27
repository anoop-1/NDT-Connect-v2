// src/components/auth/RegisterForm.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { ImageIcon, DollarSign, FileText, Award, Users2, BookOpen, ListChecks, PlusCircle, Trash2, CalendarIcon, Link as LinkIcon, Activity, AlertCircle, User as UserIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';


const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const defaultServiceOfferingRow = (isCustom: boolean = false): ServiceOffering => ({
  id: generateUniqueId(),
  name: isCustom ? "" : "",
  rate: '',
  unit: "",
  isCustom: isCustom,
});

const defaultPersonnelQualificationRow = (): PersonnelQualification => ({
  id: generateUniqueId(),
  quantity: 1,
  certificationBody: "",
  level: "",
  expiryDate: undefined,
});

const defaultCompanyCertificationRow = (): CompanyCertification => ({
  id: generateUniqueId(),
  name: "",
  category: "",
  expiryDate: undefined,
});


const baseSchema = z.object({
  name: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
  role: z.enum(["client", "provider", "inspector"], { required_error: "You must select a role." }),
  acceptTerms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions to register." }),
});

const clientSchema = baseSchema.extend({
  companyName: z.string().min(2, { message: "Company name is required." }),
  industry: z.string().min(2, { message: "Industry is required." }),
  primaryLocation: z.string().min(2, { message: "Primary location is required." }),
  contactNumberClient: z.string().min(7, {message: "Contact number is required."}),
});

const serviceOfferingSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Service name is required."),
  unit: z.string().min(1, "Unit is required."),
  rate: z.string()
    .refine(val => val === '' || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), {
      message: "Rate must be a non-negative number or empty.",
    }),
  isCustom: z.boolean().optional(),
});

const personnelQualificationSchema = z.object({
  id: z.string(),
  quantity: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? 0 : parseInt(String(val), 10)),
    z.number({invalid_type_error: "Quantity must be a number."}).min(1, "Quantity must be at least 1.")
  ),
  certificationBody: z.string().min(1, "Certification body is required."),
  level: z.string().min(1, "Level is required."),
  expiryDate: z.date().optional(),
});

const companyCertificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certification name is required."),
  category: z.string().optional(),
  expiryDate: z.date().optional(),
});


const providerSchema = baseSchema.extend({
  locationProvider: z.string().min(2, { message: "Location is required." }),
  servicesOffered: z.array(serviceOfferingSchema).min(1, "At least one service must be offered."),
  contactNumberProvider: z.string().min(7, {message: "Contact number is required."}),
  personnelQualifications: z.array(personnelQualificationSchema).min(1, "At least one personnel qualification must be listed."),
  certifications: z.array(companyCertificationSchema).optional(),
  procedureInfoUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  companyLogoUrl: z.string().url({ message: "Please enter a valid URL for the company logo." }).optional().or(z.literal("")),
});

const inspectorSchema = baseSchema.extend({
    locationInspector: z.string().min(2, { message: "Your location is required." }),
    servicesOfferedInspector: z.array(serviceOfferingSchema).min(1, "At least one service must be offered."),
    contactNumberInspector: z.string().min(7, { message: "Contact number is required." }),
    personnelQualificationsInspector: z.array(personnelQualificationSchema).min(1, "At least one personnel qualification must be listed."),
    bio: z.string().optional(),
    profileImageUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
});

const formSchema = z.union([clientSchema, providerSchema, inspectorSchema])
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(data => {
    if (data.role === 'client') {
        return 'companyName' in data && data.companyName &&
               'industry' in data && data.industry &&
               'primaryLocation' in data && data.primaryLocation &&
               'contactNumberClient' in data && data.contactNumberClient;
    }
    if (data.role === 'provider') {
        return 'locationProvider' in data && data.locationProvider &&
               'servicesOffered' in data && data.servicesOffered.length > 0 &&
               'contactNumberProvider' in data && data.contactNumberProvider &&
               'personnelQualifications' in data && data.personnelQualifications && data.personnelQualifications.length > 0;
    }
    if (data.role === 'inspector') {
        return 'locationInspector' in data && data.locationInspector &&
               'servicesOfferedInspector' in data && data.servicesOfferedInspector.length > 0 &&
               'contactNumberInspector' in data && data.contactNumberInspector &&
               'personnelQualificationsInspector' in data && data.personnelQualificationsInspector && data.personnelQualificationsInspector.length > 0;
    }
    return true;
  }, {
    message: "Please fill all required fields for your role.",
    path: ["role"],
  });


type FormSchemaType = z.infer<typeof formSchema>;

const CLIENT_AGREEMENT_TEXT = `
Terms of Service for Clients

Welcome to NDT Connect! By registering as a Client, you agree that NDT Connect is a facilitator platform. You are solely responsible for your due diligence, selection of, and agreements with Service Providers. NDT Connect is not a party to your transactions and is not liable for the services provided.
`;

const PROVIDER_AGREEMENT_TEXT = `
Terms of Service for Service Providers

Welcome to NDT Connect! By registering as a Service Provider, you agree to provide accurate information in your profile and to fulfill client requirements professionally and in accordance with industry standards. NDT Connect is a facilitator and does not guarantee work. You are responsible for your agreements with clients.
`;

const INSPECTOR_AGREEMENT_TEXT = `
Terms of Service for NDT Inspectors (Freelancers)

Welcome to NDT Connect! By registering as an NDT Inspector, you affirm that you are an independent contractor. You agree to represent your skills and qualifications accurately and to perform work with professional diligence. NDT Connect is a platform to connect you with opportunities and is not your employer.
`;

export function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLists, setIsLoadingLists] = useState(false);
  const [listsError, setListsError] = useState<string | null>(null);

  // State for predefined lists fetched from Firestore
  const [providerNdtServices, setProviderNdtServices] = useState<string[]>([]);
  const [serviceUnits, setServiceUnits] = useState<string[]>([]);
  const [qualificationBodies, setQualificationBodies] = useState<string[]>([]);
  const [qualificationLevels, setQualificationLevels] = useState<string[]>([]);
  const [companyCertifications, setCompanyCertifications] = useState<string[]>([]);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "client",
      acceptTerms: false,
      // Client
      companyName: "",
      industry: "",
      primaryLocation: "",
      contactNumberClient: "",
      // Provider
      locationProvider: "",
      servicesOffered: [defaultServiceOfferingRow()],
      contactNumberProvider: "",
      personnelQualifications: [defaultPersonnelQualificationRow()],
      certifications: [defaultCompanyCertificationRow()],
      procedureInfoUrl: "",
      companyLogoUrl: "",
      // Inspector
      locationInspector: "",
      servicesOfferedInspector: [defaultServiceOfferingRow()],
      contactNumberInspector: "",
      personnelQualificationsInspector: [defaultPersonnelQualificationRow()],
      bio: "",
      profileImageUrl: "",
    },
  });

  const currentRole = form.watch("role");

  const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({
    control: form.control,
    name: "servicesOffered" as any,
  });
  
  const { fields: serviceInspectorFields, append: appendInspectorService, remove: removeInspectorService } = useFieldArray({
    control: form.control,
    name: "servicesOfferedInspector" as any,
  });

  const { fields: personnelFields, append: appendPersonnel, remove: removePersonnel } = useFieldArray({
    control: form.control,
    name: "personnelQualifications" as any,
  });
  
  const { fields: personnelInspectorFields, append: appendInspectorPersonnel, remove: removeInspectorPersonnel } = useFieldArray({
    control: form.control,
    name: "personnelQualificationsInspector" as any,
  });

  const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({
    control: form.control,
    name: "certifications" as any,
  });

  const fetchPredefinedLists = useCallback(async () => {
    if (currentRole === 'client') return;
    setIsLoadingLists(true);
    setListsError(null);
    try {
      const listIds = [
        "providerNdtServices", "serviceUnits", "personnelQualificationBodies", 
        "personnelQualificationLevels", "companyCertifications"
      ];
      const listPromises = listIds.map(id => getDoc(doc(db, "predefinedLists", id)));
      const listSnapshots = await Promise.all(listPromises);

      const setters: Record<string, React.Dispatch<React.SetStateAction<string[]>>> = {
        providerNdtServices: setProviderNdtServices,
        serviceUnits: setServiceUnits,
        personnelQualificationBodies: setQualificationBodies,
        personnelQualificationLevels: setQualificationLevels,
        companyCertifications: setCompanyCertifications,
      };

      listSnapshots.forEach((snapshot, index) => {
        const id = listIds[index];
        if (snapshot.exists() && Array.isArray(snapshot.data().items)) {
          setters[id](snapshot.data().items);
        } else {
          console.warn(`Document '${id}' not found or invalid in 'predefinedLists'. An empty list will be used.`);
          setters[id]([]);
        }
      });
    } catch (error) {
      console.error("Error fetching predefined lists:", error);
      setListsError("Failed to load registration options. Please try again later.");
    } finally {
      setIsLoadingLists(false);
    }
  }, [currentRole]);

  useEffect(() => {
    fetchPredefinedLists();
  }, [fetchPredefinedLists]);

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

    if (values.role === "client" && "companyName" in values) {
      profileData = {
        companyName: values.companyName,
        industry: values.industry,
        primaryLocation: values.primaryLocation,
        contactNumber: values.contactNumberClient,
      };
    } else if (values.role === "provider" && "locationProvider" in values) {
      const providerValues = values as Extract<FormSchemaType, { role: 'provider' }>;
      profileData = {
        location: providerValues.locationProvider,
        servicesOffered: providerValues.servicesOffered,
        personnelQualifications: providerValues.personnelQualifications,
        certifications: providerValues.certifications,
        contactNumber: providerValues.contactNumberProvider,
        procedureInfoUrl: providerValues.procedureInfoUrl,
        companyLogoUrl: providerValues.companyLogoUrl,
      };
    } else if (values.role === "inspector" && "locationInspector" in values) {
      const inspectorValues = values as Extract<FormSchemaType, { role: 'inspector' }>;
      profileData = {
          location: inspectorValues.locationInspector,
          servicesOffered: inspectorValues.servicesOfferedInspector,
          personnelQualifications: inspectorValues.personnelQualificationsInspector,
          contactNumber: inspectorValues.contactNumberInspector,
          bio: inspectorValues.bio,
          profileImageUrl: inspectorValues.profileImageUrl,
      };
    }
    
    const registeredUser = await register({
      email: values.email,
      role: values.role,
      name: values.name,
      profileData: profileData
    });

    if (registeredUser) {
        toast({
        title: "Registration Successful!",
        description: `Please 'verify' your email on the login page to activate your account for ${values.email}.`,
        duration: 7000,
        });
        router.push(`/login?status=verification_pending&email=${encodeURIComponent(values.email)}`);
    } else {
        toast({ title: "Registration Failed", description: "Could not create user account. Please try again.", variant: "destructive" });
    }

    setIsLoading(false);
  }

  const getAgreementText = () => {
    switch (currentRole) {
        case 'client': return CLIENT_AGREEMENT_TEXT;
        case 'provider': return PROVIDER_AGREEMENT_TEXT;
        case 'inspector': return INSPECTOR_AGREEMENT_TEXT;
        default: return '';
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Basic Info Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Full Name / Company Name</FormLabel> <FormControl><Input placeholder="John Doe or Acme Inc." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
             <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Work Email</FormLabel> <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
             <FormField control={form.control} name="password" render={({ field }) => ( <FormItem> <FormLabel>Password</FormLabel> <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
             <FormField control={form.control} name="confirmPassword" render={({ field }) => ( <FormItem> <FormLabel>Confirm Password</FormLabel> <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-2 pt-2">
              <FormLabel>Register as</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap space-x-4">
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl><RadioGroupItem value="client" id="role-client-reg" /></FormControl>
                    <Label htmlFor="role-client-reg" className="font-normal">Client</Label>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl><RadioGroupItem value="provider" id="role-provider-reg" /></FormControl>
                    <Label htmlFor="role-provider-reg" className="font-normal">Service Provider</Label>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl><RadioGroupItem value="inspector" id="role-inspector-reg" /></FormControl>
                    <Label htmlFor="role-inspector-reg" className="font-normal">NDT Inspector (Freelancer)</Label>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {currentRole === "client" && (
            <div className="space-y-4">
                <FormField control={form.control} name="companyName" render={({ field }) => (<FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="Client Inc." {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="industry" render={({ field }) => (<FormItem><FormLabel>Industry</FormLabel><FormControl><Input placeholder="e.g., Manufacturing, Energy" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="primaryLocation" render={({ field }) => (<FormItem><FormLabel>Primary Location</FormLabel><FormControl><Input placeholder="City, State" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="contactNumberClient" render={({ field }) => (<FormItem><FormLabel>Contact Number</FormLabel><FormControl><Input placeholder="(555) 123-4567" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
        )}

        {currentRole === "provider" && (
          <div className="space-y-6">
            {isLoadingLists && ( <div className="flex items-center justify-center p-4 text-muted-foreground"><Activity className="mr-2 h-4 w-4 animate-spin"/>Loading registration options...</div> )}
            {listsError && ( <div className="flex items-center justify-center p-4 text-destructive bg-destructive/10 rounded-md"><AlertCircle className="mr-2 h-4 w-4"/>{listsError}</div> )}
            
            {!isLoadingLists && !listsError && (
              <>
                <FormField control={form.control} name="locationProvider" render={({ field }) => (<FormItem><FormLabel>Your Business Location</FormLabel><FormControl><Input placeholder="City, State" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="contactNumberProvider" render={({ field }) => (<FormItem><FormLabel>Contact Number</FormLabel><FormControl><Input placeholder="(555) 987-6543" {...field} /></FormControl><FormMessage /></FormItem>)} />
                
                {/* Services Offered */}
                <Card>
                  <CardHeader><CardTitle className="flex items-center text-lg font-semibold"><ListChecks className="h-5 w-5 mr-2 text-primary"/>Services Offered</CardTitle><FormDescription>Define each NDT service you provide.</FormDescription></CardHeader>
                  <CardContent className="space-y-4">
                    {serviceFields.map((item, index) => (
                      <div key={item.id} className="grid grid-cols-[1fr_auto] gap-2 items-start">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                           {/* Service Name, Unit, Rate fields */}
                           <FormField control={form.control} name={`servicesOffered.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Service</FormLabel>{(item as ServiceOffering).isCustom ? (<FormControl><Input placeholder="Custom service" {...field} /></FormControl>) : (<Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a service"/></SelectTrigger></FormControl><SelectContent>{providerNdtServices.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>)}<FormMessage/></FormItem>)} />
                           <FormField control={form.control} name={`servicesOffered.${index}.unit`} render={({ field }) => (<FormItem><FormLabel>Unit</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a unit"/></SelectTrigger></FormControl><SelectContent>{serviceUnits.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>)} />
                           <FormField control={form.control} name={`servicesOffered.${index}.rate`} render={({ field }) => (<FormItem><FormLabel>Rate</FormLabel><FormControl><Input placeholder="100" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        </div>
                        <div className="pt-8">
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeService(index)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2"><Button type="button" variant="outline" onClick={() => appendService(defaultServiceOfferingRow(false))}><PlusCircle className="h-4 w-4 mr-2"/>Add Service</Button><Button type="button" variant="outline" onClick={() => appendService(defaultServiceOfferingRow(true))}><PlusCircle className="h-4 w-4 mr-2"/>Add Custom</Button></div>
                  </CardContent>
                </Card>

                {/* Personnel Qualifications */}
                <Card>
                    <CardHeader><CardTitle className="flex items-center text-lg font-semibold"><Users2 className="h-5 w-5 mr-2 text-primary"/>Personnel Qualifications</CardTitle></CardHeader>
                    <CardContent>
                        {personnelFields.map((item, index) => (
                            <div key={item.id} className="grid grid-cols-[1fr_auto] gap-2 items-start mb-2">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    <FormField control={form.control} name={`personnelQualifications.${index}.quantity`} render={({ field }) => (<FormItem><FormLabel>Qty</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}/></FormControl><FormMessage/></FormItem>)}/>
                                    <FormField control={form.control} name={`personnelQualifications.${index}.certificationBody`} render={({ field }) => (<FormItem><FormLabel>Body</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a body"/></SelectTrigger></FormControl><SelectContent>{qualificationBodies.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>)}/>
                                    <FormField control={form.control} name={`personnelQualifications.${index}.level`} render={({ field }) => (<FormItem><FormLabel>Level</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a level"/></SelectTrigger></FormControl><SelectContent>{qualificationLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>)}/>
                                </div>
                                <div className="pt-8"><Button type="button" variant="ghost" size="icon" onClick={() => removePersonnel(index)} className="text-destructive"><Trash2 className="h-4 w-4"/></Button></div>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => appendPersonnel(defaultPersonnelQualificationRow())} className="mt-2"><PlusCircle className="h-4 w-4 mr-2"/>Add Qualification</Button>
                    </CardContent>
                </Card>

                 {/* Company Certifications */}
                <Card>
                    <CardHeader><CardTitle className="flex items-center text-lg font-semibold"><Award className="h-5 w-5 mr-2 text-primary"/>Company Certifications (Optional)</CardTitle></CardHeader>
                    <CardContent>
                        {certificationFields.map((item, index) => (
                            <div key={item.id} className="grid grid-cols-[1fr_auto] gap-2 items-start mb-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <FormField control={form.control} name={`certifications.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Cert. Name</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a certification"/></SelectTrigger></FormControl><SelectContent>{companyCertifications.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>)}/>
                                    <FormField control={form.control} name={`certifications.${index}.category`} render={({ field }) => (<FormItem><FormLabel>Category/Ref</FormLabel><FormControl><Input placeholder="e.g., Quality Mgmt" {...field} /></FormControl><FormMessage/></FormItem>)}/>
                                </div>
                                <div className="pt-8"><Button type="button" variant="ghost" size="icon" onClick={() => removeCertification(index)} className="text-destructive"><Trash2 className="h-4 w-4"/></Button></div>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => appendCertification(defaultCompanyCertificationRow())} className="mt-2"><PlusCircle className="h-4 w-4 mr-2"/>Add Certification</Button>
                    </CardContent>
                </Card>

                <FormField control={form.control} name="procedureInfoUrl" render={({ field }) => (<FormItem><FormLabel>Bio / Procedures URL (Optional)</FormLabel><FormControl><Input placeholder="https://example.com/about-us" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="companyLogoUrl" render={({ field }) => (<FormItem><FormLabel>Company Logo URL (Optional)</FormLabel><FormControl><Input placeholder="https://example.com/logo.png" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </>
            )}
          </div>
        )}
        
        {currentRole === "inspector" && (
            <div className="space-y-6">
                {isLoadingLists && ( <div className="flex items-center justify-center p-4 text-muted-foreground"><Activity className="mr-2 h-4 w-4 animate-spin"/>Loading registration options...</div> )}
                {listsError && ( <div className="flex items-center justify-center p-4 text-destructive bg-destructive/10 rounded-md"><AlertCircle className="mr-2 h-4 w-4"/>{listsError}</div> )}

                {!isLoadingLists && !listsError && (
                    <>
                        <FormField control={form.control} name="locationInspector" render={({ field }) => (<FormItem><FormLabel>Your Location</FormLabel><FormControl><Input placeholder="City, State" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="contactNumberInspector" render={({ field }) => (<FormItem><FormLabel>Contact Number</FormLabel><FormControl><Input placeholder="(555) 555-5555" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        
                        {/* Services Offered */}
                        <Card>
                          <CardHeader><CardTitle className="flex items-center text-lg font-semibold"><ListChecks className="h-5 w-5 mr-2 text-primary"/>Services Offered</CardTitle></CardHeader>
                          <CardContent className="space-y-4">
                            {serviceInspectorFields.map((item, index) => (
                              <div key={item.id} className="grid grid-cols-[1fr_auto] gap-2 items-start">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                   <FormField control={form.control} name={`servicesOfferedInspector.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Service</FormLabel>{(item as ServiceOffering).isCustom ? (<FormControl><Input placeholder="Custom service" {...field} /></FormControl>) : (<Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a service"/></SelectTrigger></FormControl><SelectContent>{providerNdtServices.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>)}<FormMessage/></FormItem>)} />
                                   <FormField control={form.control} name={`servicesOfferedInspector.${index}.unit`} render={({ field }) => (<FormItem><FormLabel>Unit</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a unit"/></SelectTrigger></FormControl><SelectContent>{serviceUnits.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>)} />
                                   <FormField control={form.control} name={`servicesOfferedInspector.${index}.rate`} render={({ field }) => (<FormItem><FormLabel>Rate</FormLabel><FormControl><Input placeholder="100" {...field} /></FormControl><FormMessage/></FormItem>)} />
                                </div>
                                <div className="pt-8">
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeInspectorService(index)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                </div>
                              </div>
                            ))}
                            <div className="flex gap-2"><Button type="button" variant="outline" onClick={() => appendInspectorService(defaultServiceOfferingRow(false))}><PlusCircle className="h-4 w-4 mr-2"/>Add Service</Button><Button type="button" variant="outline" onClick={() => appendInspectorService(defaultServiceOfferingRow(true))}><PlusCircle className="h-4 w-4 mr-2"/>Add Custom</Button></div>
                          </CardContent>
                        </Card>

                        {/* Personnel Qualifications */}
                        <Card>
                            <CardHeader><CardTitle className="flex items-center text-lg font-semibold"><Users2 className="h-5 w-5 mr-2 text-primary"/>Your Qualifications</CardTitle></CardHeader>
                            <CardContent>
                                {personnelInspectorFields.map((item, index) => (
                                    <div key={item.id} className="grid grid-cols-[1fr_auto] gap-2 items-start mb-2">
                                        <div> {/* Wrapper for all fields */}
                                            <input type="hidden" {...form.register(`personnelQualificationsInspector.${index}.quantity`)} value={1} />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <FormField control={form.control} name={`personnelQualificationsInspector.${index}.certificationBody`} render={({ field }) => (<FormItem><FormLabel>Body</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a body"/></SelectTrigger></FormControl><SelectContent>{qualificationBodies.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>)}/>
                                                <FormField control={form.control} name={`personnelQualificationsInspector.${index}.level`} render={({ field }) => (<FormItem><FormLabel>Level</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a level"/></SelectTrigger></FormControl><SelectContent>{qualificationLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>)}/>
                                            </div>
                                        </div>
                                        <div className="pt-8"><Button type="button" variant="ghost" size="icon" onClick={() => removeInspectorPersonnel(index)} className="text-destructive"><Trash2 className="h-4 w-4"/></Button></div>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={() => appendInspectorPersonnel(defaultPersonnelQualificationRow())} className="mt-2"><PlusCircle className="h-4 w-4 mr-2"/>Add Qualification</Button>
                            </CardContent>
                        </Card>

                        <FormField control={form.control} name="bio" render={({ field }) => (<FormItem><FormLabel>Bio (Optional)</FormLabel><FormControl><Textarea placeholder="Briefly describe your experience and expertise." {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="profileImageUrl" render={({ field }) => (<FormItem><FormLabel>Profile Photo URL (Optional)</FormLabel><FormControl><Input placeholder="https://example.com/your-photo.png" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </>
                )}
            </div>
        )}

        {/* Terms and Agreement */}
        <div className="space-y-3 pt-4">
            <Label className="text-lg font-semibold flex items-center"><FileText className="mr-2 h-5 w-5 text-primary" />NDT Connect User Agreement</Label>
            <ScrollArea className="h-40 w-full rounded-md border p-3 text-sm bg-muted/30">
                <pre className="whitespace-pre-wrap font-sans">
                  {getAgreementText()}
                </pre>
            </ScrollArea>
            <FormField control={form.control} name="acceptTerms" render={({ field }) => ( <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm"> <FormControl> <Checkbox checked={field.value} onCheckedChange={field.onChange} /> </FormControl> <div className="space-y-1 leading-none"> <FormLabel className="font-normal"> I have read and agree to the User Agreement. </FormLabel> <FormMessage /> </div> </FormItem> )} />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || (currentRole !== 'client' && isLoadingLists)}>
          {isLoading ? "Registering..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
