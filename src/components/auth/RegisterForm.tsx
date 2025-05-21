
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

const ALL_NDT_SERVICES = [
  "Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)", 
  "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)", 
  "Leak Testing (LT)", "Acoustic Emission Testing (AET)", "Phased Array UT (PAUT)", "Time-of-Flight Diffraction (TOFD)"
];

const baseSchema = z.object({
  name: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
  role: z.enum(["client", "provider"], { required_error: "You must select a role." }),
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
  pricingDetails: z.string().min(10, { message: "Pricing details are required." }),
  procedureInfo: z.string().min(10, { message: "Procedure information is required." }),
  acceptanceCriteriaInfo: z.string().min(10, { message: "Acceptance criteria are required." }),
});

// Combined schema using refine for conditional validation
const formSchema = z.union([clientSchema, providerSchema])
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(data => { // Ensure role-specific fields are present
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
    // No specific path, general error or could try to target 'role'
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
      };
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    login({
      email: values.email,
      role: values.role,
      name: values.name,
      profileData: profileData
    });
    
    toast({
      title: "Registration Successful",
      description: `Welcome, ${values.name}! Your account as a ${values.role} has been created.`,
    });
    router.push("/dashboard");
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
                    // Optional: Reset other role's fields when role changes to ensure clean state
                    // form.reset({...form.getValues(), companyName: "", industry: "", ... etc.}); // Be careful with this
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
                name="servicesOffered"
                render={() => (
                    <FormItem>
                    <div className="mb-4">
                        <FormLabel className="text-base">Services Offered</FormLabel>
                        <FormDescription>
                        Select all NDT services you provide.
                        </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2 border rounded-md">
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
              name="pricingDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pricing Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your pricing structure, e.g., per hour, per inspection, etc." {...field} />
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
                    <Textarea placeholder="Briefly describe your general procedures or link to detailed documents." {...field} />
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
                    <Textarea placeholder="General acceptance criteria you adhere to or common standards used." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Registering..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}

