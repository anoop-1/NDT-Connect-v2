
// src/components/auth/RegisterForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import type { ClientProfileData, ProviderProfileData } from "@/lib/types";
import { ImageIcon, DollarSign, FileText, Award, Users2, BookOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const ALL_NDT_SERVICES = [
  "Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)",
  "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)",
  "Leak Testing (LT)", "Acoustic Emission Testing (AET)", "Phased Array UT (PAUT)", "Time-of-Flight Diffraction (TOFD)"
];

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
NDT Connect may charge a service fee for utilizing the Platform or for successful engagements facilitated through the Platform. Any applicable fees and payment terms will be communicated to you separately or as part of specific feature usage. (Note: This platform currently has a 15% commission on provider's rate shown to client, and a conceptual 10% fee to providers for facilitation).

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

const providerSchema = baseSchema.extend({
  locationProvider: z.string().min(2, { message: "Location is required." }),
  servicesOffered: z.array(z.string()).min(1, { message: "At least one service must be selected." }),
  contactNumberProvider: z.string().min(7, {message: "Contact number is required."}),
  pricingDetails: z.string().min(10, { message: "Pricing details (text description) are required." }).max(500, {message: "Pricing details cannot exceed 500 characters."}),
  procedureInfo: z.string().min(10, { message: "Procedure information is required." }).max(500, {message: "Procedure information cannot exceed 500 characters."}),
  acceptanceCriteriaInfo: z.string().min(10, { message: "Acceptance criteria are required." }).max(500, {message: "Acceptance criteria cannot exceed 500 characters."}),
  companyLogoUrl: z.string().url({ message: "Please enter a valid URL for the company logo." }).optional().or(z.literal("")),
  baseRate: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(String(val))),
    z.number({ invalid_type_error: "Base rate must be a number." }).min(0, "Base rate cannot be negative.").optional()
  ),
  certifications: z.string().optional(), // Textarea for comma-separated list
  personnelQualifications: z.string().optional(), // Textarea for comma-separated list
  availableDocuments: z.string().optional(), // Textarea for comma-separated list
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
               'pricingDetails' in data && data.pricingDetails &&
               'procedureInfo' in data && data.procedureInfo &&
               'acceptanceCriteriaInfo' in data && data.acceptanceCriteriaInfo;
    }
    return true;
  }, {
    message: "Please fill all required fields for your role.",
    // It's hard to point path to a specific conditional field with union schemas,
    // so this general message appears at the top or bottom of the form.
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
      servicesOffered: [],
      contactNumberProvider: "",
      pricingDetails: "",
      procedureInfo: "",
      acceptanceCriteriaInfo: "",
      companyLogoUrl: "",
      baseRate: undefined,
      certifications: "",
      personnelQualifications: "",
      availableDocuments: "",
    },
  });

  const currentRole = form.watch("role");

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
      profileData = {
        location: values.locationProvider,
        servicesOffered: values.servicesOffered,
        contactNumber: values.contactNumberProvider,
        pricingDetails: values.pricingDetails,
        procedureInfo: values.procedureInfo,
        acceptanceCriteriaInfo: values.acceptanceCriteriaInfo,
        companyLogoUrl: values.companyLogoUrl,
        baseRate: values.baseRate,
        certifications: values.certifications?.split(',').map(s => s.trim()).filter(Boolean) || [],
        personnelQualifications: values.personnelQualifications?.split(',').map(s => s.trim()).filter(Boolean) || [],
        availableDocuments: values.availableDocuments?.split(',').map(s => s.trim()).filter(Boolean) || [],
        isVerified: false, 
      };
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    login({
      email: values.email,
      role: values.role,
      name: values.name,
      isDemo: false, // Regular registration is not a demo user
      profileData: profileData
    });

    toast({
      title: "Registration Successful!",
      description: `Please 'verify' your email on the login page to activate your account for ${values.email}.`,
      duration: 7000, // Give user more time to read
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
            <FormField
                control={form.control}
                name="servicesOffered"
                render={() => (
                    <FormItem>
                    <div className="mb-1">
                        <FormLabel className="text-base">Services Offered</FormLabel>
                        <FormDescription>
                        Select all NDT services you provide.
                        </FormDescription>
                    </div>
                    <ScrollArea className="h-32 w-full rounded-md border p-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ALL_NDT_SERVICES.map((service) => (
                          <FormField
                          key={service}
                          control={form.control}
                          name="servicesOffered"
                          render={({ field }) => {
                              return (
                              <FormItem
                                  key={service}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                  <FormControl>
                                  <Checkbox
                                      checked={field.value?.includes(service)}
                                      onCheckedChange={(checked) => {
                                      return checked
                                          ? field.onChange([...(field.value || []), service])
                                          : field.onChange(
                                              (field.value || []).filter(
                                              (value) => value !== service
                                              )
                                          );
                                      }}
                                  />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                  {service}
                                  </FormLabel>
                              </FormItem>
                              );
                          }}
                          />
                      ))}
                      </div>
                    </ScrollArea>
                    <FormMessage />
                    </FormItem>
                )}
            />
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
              name="certifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Award className="h-4 w-4 mr-2 text-muted-foreground"/>Certifications & Accreditations</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., ISO 9001, DNV Approval, ABS Certified. Separate with commas." {...field} rows={2}/>
                  </FormControl>
                  <FormDescription>List company certifications. Separate multiple items with a comma.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personnelQualifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Users2 className="h-4 w-4 mr-2 text-muted-foreground"/>Personnel Qualifications</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., SNT-TC-1A Level II UT, NAS 410 Certified Inspectors. Separate with commas." {...field} rows={2}/>
                  </FormControl>
                  <FormDescription>List key personnel qualifications. Separate multiple items with a comma.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availableDocuments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><BookOpen className="h-4 w-4 mr-2 text-muted-foreground"/>Available Technical Documents</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., General NDT Procedures Manual, ISO 9001 Certificate, Sample Technician Cert. Separate with commas." {...field} rows={3}/>
                  </FormControl>
                  <FormDescription>List types of technical documents you can provide upon engagement (e.g., procedures, company certs, technician qualifications). Separate with commas.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="baseRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><DollarSign className="h-4 w-4 mr-2 text-muted-foreground"/>Base Rate (e.g., per hour, optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="75" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))} />
                  </FormControl>
                  <FormDescription>Enter a numeric base rate if applicable. Used for estimated pricing.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pricingDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pricing Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your pricing structure, e.g., per hour, per inspection, project-based estimates available upon request." {...field} rows={3}/>
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
                  <FormLabel>Procedure Information</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Briefly describe your general procedures or mention adherence to specific standards (e.g., ASNT, ISO)." {...field} rows={3}/>
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
                  <FormLabel>Acceptance Criteria</FormLabel>
                  <FormControl>
                    <Textarea placeholder="General acceptance criteria you adhere to or common standards used (e.g., API 1104, ASME B31.3)." {...field} rows={3}/>
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

    