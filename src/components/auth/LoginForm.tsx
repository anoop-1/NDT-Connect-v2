
// src/components/auth/LoginForm.tsx
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import type { ClientProfileData, ProviderProfileData } from "@/lib/types";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["client", "provider"], { required_error: "You must select a role." }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const ALL_NDT_SERVICES_DEMO = [ // Define for demo provider
  "Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)",
  "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)",
  "Leak Testing (LT)", "Acoustic Emission Testing (AET)", "Phased Array UT (PAUT)", "Time-of-Flight Diffraction (TOFD)"
];

// Admin credentials (for mock purposes)
const ADMIN_EMAIL = "anoop@atlantisinspection.com";
const ADMIN_PASSWORD = "Atlantis9$";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "client",
    },
  });
  
  const watchEmail = form.watch("email"); // Watch email field for changes

  async function onSubmit(values: FormSchemaType) {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (values.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && values.password === ADMIN_PASSWORD) {
      login({ 
        email: values.email, 
        role: 'admin', 
        name: "Admin User",
        isDemo: false,
      });
      toast({
        title: "Admin Login Successful",
        description: "Welcome, Administrator!",
      });
      router.push("/admin/dashboard");
    } else {
      login({ 
        email: values.email, 
        role: values.role, 
        name: values.email.split('@')[0], 
        isDemo: false, // Regular login is not a demo user
        profileData: {} 
      });
      toast({
        title: "Login Successful",
        description: `Welcome back, ${values.email}!`,
      });
      router.push("/dashboard");
    }
    setIsLoading(false);
  }

  const handleDemoLogin = async (role: 'client' | 'provider') => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); 

    let demoUserDetails;

    if (role === 'client') {
      const clientProfile: ClientProfileData = {
        companyName: "Demo Client Innovations",
        industry: "Technology & R&D",
        primaryLocation: "Austin, TX",
        contactNumber: "(555) 123-CLIENT"
      };
      demoUserDetails = {
        email: "client.demo@example.com",
        role: "client" as const,
        name: "Demo Client User",
        isDemo: true, // Mark as demo user
        profileData: clientProfile
      };
    } else { 
      const providerProfile: ProviderProfileData = {
        location: "Houston, TX", lat: 29.7604, lng: -95.3698,
        servicesOffered: ALL_NDT_SERVICES_DEMO,
        contactNumber: "(713) 555-PROVIDER",
        pricingDetails: "Competitive rates for all listed NDT services. Bulk project discounts available. Contact for detailed quotes.",
        procedureInfo: "All NDT procedures adhere strictly to ASNT SNT-TC-1A, ASME, API, and other relevant industry standards. Client-specific procedures can be developed and followed upon request.",
        acceptanceCriteriaInfo: "Standard industry acceptance criteria (e.g., API 1104, ASME B31.3, AWS D1.1) are applied unless specific client requirements dictate otherwise.",
        companyLogoUrl: "https://placehold.co/150x50.png", 
        baseRate: 95, 
        certifications: ["ISO 9001:2015", "API Q1"],
        personnelQualifications: ["ASNT NDT Level III (Multiple Methods)", "AWS CWI"],
        isVerified: true,
        availableDocuments: ["General NDT Procedures Manual", "ISO 9001 Certificate PDF", "Sample Technician Certs"],
      };
      demoUserDetails = {
        email: "provider.houston.demo@example.com",
        role: "provider" as const,
        name: "Houston NDT Experts (Demo)",
        isDemo: true, // Mark as demo user
        profileData: providerProfile
      };
    }

    login(demoUserDetails);
    toast({
      title: "Demo Login Successful",
      description: `Logged in as ${demoUserDetails.name}.`,
    });
    router.push("/dashboard");
    setIsLoading(false);
  };


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
          {watchEmail.toLowerCase() !== ADMIN_EMAIL.toLowerCase() && (
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Login as</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="client" id="role-client" />
                        </FormControl>
                        <Label htmlFor="role-client" className="font-normal">Client</Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="provider" id="role-provider" />
                        </FormControl>
                        <Label htmlFor="role-provider" className="font-normal">Service Provider</Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>

      <Separator className="my-6" />
      
      <div className="space-y-3">
        <p className="text-center text-sm text-muted-foreground">Or try a quick demo:</p>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => handleDemoLogin('client')}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login as Demo Client"}
        </Button>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => handleDemoLogin('provider')}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login as Demo Provider (Houston)"}
        </Button>
      </div>
    </>
  );
}
