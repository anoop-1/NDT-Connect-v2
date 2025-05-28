
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
import { useState } from "react";
import type { ClientProfileData, ProviderProfileData, ServiceOffering, PersonnelQualification } from "@/lib/types";
import { ImageIcon, DollarSign, FileText, Award, Users2, BookOpen, ListChecks, PlusCircle, Trash2, CalendarIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";


const PREDEFINED_NDT_SERVICES_TABLE = [
  "Radiographic Testing", "Ultrasonic Testing", "Magnetic Particle Testing",
  "Liquid Penetrant Testing", "Visual Testing", "Eddy Current Testing",
  "Magnetic Flux Leakage", "Internal Rotary Inspection System",
  "Surface Eddy Current Testing", "Pulsed Eddy Current Testing",
  "Phased Array Ultrasonic Testing", "Long Range Ultrasonic Testing",
  "Vacuum Box Testing"
];

const SERVICE_UNITS_REGISTER = [
  "per hour", "per day", "per month", "per meter", "per mm of thickness", "per inch of thickness"
];

const QUALIFICATION_BODIES_REGISTER = [
  "ASNT (American Society for Nondestructive Testing)", "PCN (Personnel Certification in Non-Destructive Testing)",
  "ISO 9712", "CSWIP (Certification Scheme for Welding Inspection Personnel)",
  "CGSB (Canadian General Standards Board)", "AWS (American Welding Society)", "CWI (Certified Welding Inspector)",
  "ISNT (Indian Society for Non-Destructive Testing)", "AINDT (Australian Institute for NDT)", "BINDT (British Institute of Non-Destructive Testing)", "Other"
];

const QUALIFICATION_LEVELS_REGISTER = ["Level I", "Level II", "Level III", "Technician", "Inspector", "Engineer", "Assistant", "Senior", "Other"];

const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const defaultServiceOfferingRow = (isCustom: boolean = false): ServiceOffering => ({
  id: generateUniqueId(),
  name: isCustom ? "" : PREDEFINED_NDT_SERVICES_TABLE[0],
  rate: '',
  unit: isCustom ? "" : SERVICE_UNITS_REGISTER[0],
  isCustom: isCustom,
});

const defaultPersonnelQualificationRow = (): PersonnelQualification => ({
  id: generateUniqueId(),
  quantity: 1,
  certificationBody: QUALIFICATION_BODIES_REGISTER[0],
  level: QUALIFICATION_LEVELS_REGISTER[0],
  expiryDate: undefined,
});


const CLIENT_AGREEMENT_TEXT = `
Terms of Service for Clients

Welcome to NDT Connect!

NDT Connect ("Platform", "we", "us", "our") provides a platform to connect clients seeking Non-Destructive Testing (NDT) services with NDT service providers ("Service Providers"). By registering an account as a Client on NDT Connect, you ("Client", "you", "your") agree to these Terms of Service.

1. Role of NDT Connect:
NDT Connect acts SOLELY AS A FACILITATOR to help Clients find and connect with Service Providers. We are not a party to any agreement, contract, or transaction between you and any Service Provider.

2. Client Responsibilities:
   a. Due Diligence: You are solely responsible for conducting your own due diligence and for selecting an appropriate Service Provider. This includes verifying the Service Provider's qualifications, certifications, insurance, experience, and suitability for your specific NDT requirements.
   b. Service Agreement: Any work engagement or service agreement is strictly between you and the Service Provider. You are responsible for negotiating the terms of service, including scope, deliverables, timelines, and payment, directly with the Service Provider.
   c. Requirements Definition: You are responsible for clearly defining your NDT service requirements, including any specific procedures, acceptance criteria, and applicable industry standards or client-specific requirements that the Service Provider must adhere to.
   d. Fulfillment and Disputes: NDT Connect is not responsible for the quality, legality, or outcome of services provided by Service Providers. Any disputes, issues, or claims related to the services must be resolved directly between you and the Service Provider.

3. No Endorsement or Guarantee:
NDT Connect does not endorse, recommend, or guarantee any Service Provider or their services. Information about Service Providers on the Platform is provided by the Service Providers themselves or gathered from publicly available sources and is for informational purposes only.

4. Limitation of Liability:
To the fullest extent permitted by law, NDT Connect shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Platform; (ii) any conduct or content of any Service Provider or third party on the Platform; or (iii) any services provided by a Service Provider.

5. Acceptance of Terms:
By checking the "I agree" box and completing the registration process, you affirm that you have read, understood, and agree to be bound by these Terms of Service.
`;

const PROVIDER_AGREEMENT_TEXT = `
Terms of Service for Service Providers

Welcome to NDT Connect!

NDT Connect ("Platform", "we", "us", "our") provides a platform to connect NDT service providers ("Service Provider", "you", "your") with clients seeking Non-Destructive Testing (NDT) services ("Clients"). By registering an account as a Service Provider on NDT Connect, you agree to these Terms of Service.

1. Account and Profile Information:
   a. Accuracy: You are responsible for providing accurate, current, and complete information in your profile, including but not limited to your business details, location, services offered, qualifications, certifications, available technical documents, contact information, pricing indications, procedure outlines, and acceptance criteria information.
   b. Updates: You agree to maintain and promptly update your profile information to keep it accurate, current, and complete.

2. Service Provision and Responsibilities:
   a. Fulfillment of Requirements: You commit to fulfilling all agreed-upon client requirements to the best of your ability. This includes strict adherence to any client-specific procedures, acceptance criteria, and qualification standards communicated by the Client.
   b. Professional Standards: You will conduct all NDT services in a professional manner and in accordance with recognized industry standards (e.g., SNT-TC-1A for personnel qualification, relevant ASME, API, ISO, or other applicable codes and standards for testing procedures and acceptance criteria), or any other client-specified requirements which may be more stringent.
   c. Qualification: You warrant that you and your personnel possess the necessary qualifications, certifications (e.g., SNT-TC-1A, ISO 9712, or equivalent), and experience to perform the NDT services you offer and undertake.
   d. Document Availability: You agree to make available, upon reasonable request from a client with whom you are engaged or discussing an engagement, copies of relevant technical documents as listed in your profile, such as procedures, certifications, and qualification records. The mechanism and timing of sharing will be agreed upon directly with the client.
   e. Direct Agreements: Any service agreement or contract is strictly between you and the Client. NDT Connect is not a party to such agreements. You are responsible for negotiating terms, scope, deliverables, and payment directly with the Client.

3. Role of NDT Connect:
NDT Connect acts SOLELY AS A FACILITATOR platform. We do not guarantee work, projects, or income. We are not responsible for Client actions, payment failures, or disputes.

4. Service Fees:
NDT Connect may charge a service fee for utilizing the Platform or for successful engagements facilitated through the Platform. Any applicable fees (such as commission or conceptual fee) and payment terms will be communicated to you separately or as part of specific feature usage.

5. Limitation of Liability:
To the fullest extent permitted by law, NDT Connect shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform, interactions with Clients, or the provision of your services.

6. Acceptance of Terms:
By checking the "I agree" box and completing the registration process, you affirm that you have read, understood, and agree to be bound by these Terms of Service.
`;


const baseSchema = z.object({
  name: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
  role: z.enum(["client", "provider"], { required_error: "You must select a role." }),
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
  rate: z.string()
    .refine(val => val === '' || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), {
      message: "Rate must be a non-negative number or empty.",
    }),
  unit: z.string().min(1, "Unit is required."),
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


const providerSchema = baseSchema.extend({
  locationProvider: z.string().min(2, { message: "Location is required." }),
  servicesOffered: z.array(serviceOfferingSchema).min(1, "At least one service must be offered."),
  contactNumberProvider: z.string().min(7, {message: "Contact number is required."}),
  personnelQualifications: z.array(personnelQualificationSchema).min(1, "At least one personnel qualification must be listed."),
  pricingDetails: z.string().min(10, { message: "Pricing details (text description) are required." }).max(500, {message: "Pricing details cannot exceed 500 characters."}),
  procedureInfo: z.string().min(10, { message: "Procedure information is required." }).max(500, {message: "Procedure information cannot exceed 500 characters."}),
  acceptanceCriteriaInfo: z.string().min(10, { message: "Acceptance criteria are required." }).max(500, {message: "Acceptance criteria cannot exceed 500 characters."}),
  companyLogoUrl: z.string().url({ message: "Please enter a valid URL for the company logo." }).optional().or(z.literal("")),
  baseRate: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(String(val))),
    z.number({ invalid_type_error: "Base rate must be a number." }).min(0, "Base rate cannot be negative.").optional()
  ),
  certificationsText: z.string().optional(),
  availableDocumentsText: z.string().optional(),
});

const formSchema = z.union([clientSchema, providerSchema])
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
               'servicesOffered' in data && data.servicesOffered && data.servicesOffered.length > 0 &&
               'contactNumberProvider' in data && data.contactNumberProvider &&
               'personnelQualifications' in data && data.personnelQualifications && data.personnelQualifications.length > 0 &&
               'pricingDetails' in data && data.pricingDetails &&
               'procedureInfo' in data && data.procedureInfo &&
               'acceptanceCriteriaInfo' in data && data.acceptanceCriteriaInfo;
    }
    return true;
  }, {
    message: "Please fill all required fields for your role.",
    path: ["role"],
  });


type FormSchemaType = z.infer<typeof formSchema>;

export function RegisterForm() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "client",
      acceptTerms: false,
      // Client fields
      companyName: "",
      industry: "",
      primaryLocation: "",
      contactNumberClient: "",
      // Provider fields
      locationProvider: "",
      servicesOffered: [defaultServiceOfferingRow()],
      contactNumberProvider: "",
      personnelQualifications: [defaultPersonnelQualificationRow()],
      pricingDetails: "",
      procedureInfo: "",
      acceptanceCriteriaInfo: "",
      companyLogoUrl: "",
      baseRate: undefined,
      certificationsText: "",
      availableDocumentsText: "",
    },
  });

  const currentRole = form.watch("role");

  const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({
    control: form.control,
    name: "servicesOffered" as any, 
  });

  const { fields: personnelFields, append: appendPersonnel, remove: removePersonnel } = useFieldArray({
    control: form.control,
    name: "personnelQualifications" as any, 
  });

  
  const previousRole = React.useRef(currentRole);
  React.useEffect(() => {
    if (previousRole.current !== currentRole) {
      if (currentRole === 'provider') {
        form.setValue('servicesOffered' as any, [defaultServiceOfferingRow()]);
        form.setValue('personnelQualifications' as any, [defaultPersonnelQualificationRow()]);
      } else { 
         form.setValue('servicesOffered' as any, []);
         form.setValue('personnelQualifications' as any, []);
         form.setValue('locationProvider', '');
         form.setValue('contactNumberProvider', '');
         form.setValue('pricingDetails', '');
         form.setValue('procedureInfo', '');
         form.setValue('acceptanceCriteriaInfo', '');
         form.setValue('companyLogoUrl', '');
         form.setValue('baseRate', undefined);
         form.setValue('certificationsText', '');
         form.setValue('availableDocumentsText', '');
      }
      previousRole.current = currentRole;
    }
  }, [currentRole, form]);


  async function onSubmit(values: FormSchemaType) {
    setIsLoading(true);

    let profileData: Partial<ClientProfileData & ProviderProfileData> = {};

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
        servicesOffered: providerValues.servicesOffered.map(s => ({
            ...s,
            rate: s.rate === '' ? '0' : s.rate, 
            isCustom: s.isCustom || false,
        })),
        personnelQualifications: providerValues.personnelQualifications.map(pq => ({
            ...pq,
            quantity: typeof pq.quantity === 'string' ? parseInt(pq.quantity, 10) || 1 : pq.quantity,
            expiryDate: pq.expiryDate,
        })),
        contactNumber: providerValues.contactNumberProvider,
        pricingDetails: providerValues.pricingDetails,
        procedureInfo: providerValues.procedureInfo,
        acceptanceCriteriaInfo: providerValues.acceptanceCriteriaInfo,
        companyLogoUrl: providerValues.companyLogoUrl,
        baseRate: providerValues.baseRate,
        certifications: providerValues.certificationsText?.split(',').map(s => s.trim()).filter(Boolean) || [],
        availableDocuments: providerValues.availableDocumentsText?.split(',').map(s => s.trim()).filter(Boolean) || [],
        isVerified: false,
      };
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    login({
      email: values.email,
      role: values.role,
      name: values.name,
      isDemo: false,
      profileData: profileData
    });

    toast({
      title: "Registration Successful!",
      description: `Please 'verify' your email on the login page to activate your account for ${values.email}.`,
      duration: 7000,
    });
    router.push(`/login?status=verification_pending&email=${encodeURIComponent(values.email)}`);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Register as</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="client" id="role-client-reg" />
                    </FormControl>
                    <Label htmlFor="role-client-reg" className="font-normal">Client</Label>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="provider" id="role-provider-reg" />
                    </FormControl>
                    <Label htmlFor="role-provider-reg" className="font-normal">Service Provider</Label>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {currentRole === "client" && (
          <>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Client Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Manufacturing, Energy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="primaryLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="contactNumberClient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {currentRole === "provider" && (
          <>
            <FormField
              control={form.control}
              name="locationProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Business Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyLogoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><ImageIcon className="h-4 w-4 mr-2 text-muted-foreground"/>Company Logo URL (Optional)</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://example.com/logo.png" {...field} />
                  </FormControl>
                  <FormDescription>Direct link to an image of your company logo.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><ListChecks className="h-5 w-5 mr-2 text-primary"/>Services Offered & Pricing</CardTitle>
                <FormDescription>Define each NDT service you provide.</FormDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {serviceFields.map((item, index) => (
                  <Card key={item.id} className="p-3 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                      <FormField
                        control={form.control}
                        name={`servicesOffered.${index}.name` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Name</FormLabel>
                            {(item as ServiceOffering).isCustom ? (
                              <FormControl>
                                <Input placeholder="Enter custom service name" {...field} />
                              </FormControl>
                            ) : (
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger><SelectValue placeholder="Select Service" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {PREDEFINED_NDT_SERVICES_TABLE.map(service => (
                                    <SelectItem key={service} value={service}>{service}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`servicesOffered.${index}.unit` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit</FormLabel>
                             {(item as ServiceOffering).isCustom ? (
                              <FormControl>
                                <Input placeholder="Enter custom unit" {...field} />
                              </FormControl>
                            ) : (
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger><SelectValue placeholder="Select Unit" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {SERVICE_UNITS_REGISTER.map(unit => (
                                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`servicesOffered.${index}.rate` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rate</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="e.g., 100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {serviceFields.length > 1 && (
                      <div className="mt-2 text-right">
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeService(index)} className="text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button type="button" variant="outline" onClick={() => appendService(defaultServiceOfferingRow(false))} className="w-full sm:w-auto">
                    <PlusCircle className="h-4 w-4 mr-2"/> Add Predefined Service
                  </Button>
                  <Button type="button" variant="outline" onClick={() => appendService(defaultServiceOfferingRow(true))} className="w-full sm:w-auto">
                    <PlusCircle className="h-4 w-4 mr-2"/> Add Custom Service
                  </Button>
                </div>
                <FormMessage>{form.formState.errors.servicesOffered?.root?.message || form.formState.errors.servicesOffered?.message}</FormMessage>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Users2 className="h-5 w-5 mr-2 text-primary"/>Personnel Qualifications</CardTitle>
                <FormDescription>List your technical personnel's qualifications.</FormDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Qty</TableHead>
                      <TableHead className="w-[200px]">Cert. Body</TableHead>
                      <TableHead className="w-[150px]">Level</TableHead>
                      <TableHead>Expiry Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {personnelFields.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`personnelQualifications.${index}.quantity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input type="number" placeholder="1" {...field} onChange={e => field.onChange(parseInt(e.target.value,10) || 0)} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`personnelQualifications.${index}.certificationBody`}
                            render={({ field }) => (
                              <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select Body" /></SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {QUALIFICATION_BODIES_REGISTER.map(body => <SelectItem key={body} value={body}>{body}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`personnelQualifications.${index}.level`}
                            render={({ field }) => (
                              <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select Level" /></SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {QUALIFICATION_LEVELS_REGISTER.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`personnelQualifications.${index}.expiryDate`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => date < new Date("1900-01-01")}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button type="button" variant="outline" onClick={() => appendPersonnel(defaultPersonnelQualificationRow())} className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2"/> Add Personnel Qualification
                </Button>
                 <FormMessage>{form.formState.errors.personnelQualifications?.root?.message || form.formState.errors.personnelQualifications?.message}</FormMessage>
              </CardContent>
            </Card>


            <FormField
              control={form.control}
              name="contactNumberProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 987-6543" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="certificationsText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Award className="h-4 w-4 mr-2 text-muted-foreground"/>Company Certifications (comma-separated)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., ISO 9001, DNV Approval" {...field} rows={2}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="availableDocumentsText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><BookOpen className="h-4 w-4 mr-2 text-muted-foreground"/>Available Docs (comma-separated)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Procedures Manual, ISO Cert" {...field} rows={2}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="baseRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><DollarSign className="h-4 w-4 mr-2 text-muted-foreground"/>General Base Rate (e.g., per hour, optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="75" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pricingDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>General Pricing Overview</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your general pricing structure..." {...field} rows={3}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="procedureInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>General Procedure Overview</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Briefly describe your general procedures..." {...field} rows={3}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="acceptanceCriteriaInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>General Acceptance Criteria Overview</FormLabel>
                  <FormControl>
                    <Textarea placeholder="General acceptance criteria you adhere to..." {...field} rows={3}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {(currentRole === "client" || currentRole === "provider") && (
          <div className="space-y-3 pt-4">
            <Label className="text-lg font-semibold flex items-center"><FileText className="mr-2 h-5 w-5 text-primary" />NDT Connect User Agreement</Label>
            <ScrollArea className="h-48 w-full rounded-md border p-4 text-sm bg-muted/30">
              <pre className="whitespace-pre-wrap font-sans">
                {currentRole === "client" ? CLIENT_AGREEMENT_TEXT : PROVIDER_AGREEMENT_TEXT}
              </pre>
            </ScrollArea>
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm bg-background">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal">
                      I have read and agree to the NDT Connect User Agreement.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isValid}>
          {isLoading ? "Registering..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}

