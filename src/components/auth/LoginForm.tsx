
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
import type { ClientProfileData, ProviderProfileData, ServiceOffering, PersonnelQualification, CompanyCertification } from "@/lib/types";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["client", "provider"], { required_error: "You must select a role." }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const ALL_NDT_SERVICES_DEMO: ServiceOffering[] = [ // Define for demo provider
  { id: "s1", name: "Ultrasonic Testing (UT)", rate: "120", unit: "per hour" },
  { id: "s2", name: "Magnetic Particle Testing (MT)", rate: "110", unit: "per hour" },
  { id: "s3", name: "Liquid Penetrant Testing (PT)", rate: "100", unit: "per hour" },
  { id: "s4", name: "Radiographic Testing (RT)", rate: "180", unit: "per film" },
  { id: "s5", name: "Eddy Current Testing (ET)", rate: "150", unit: "per hour" },
  { id: "s6", name: "Visual Testing (VT)", rate: "90", unit: "per hour" },
  { id: "s7", name: "Leak Testing (LT)", rate: "130", unit: "per location" },
  { id: "s8", name: "Acoustic Emission Testing (AET)", rate: "200", unit: "per setup" },
  { id: "s9", name: "Phased Array UT (PAUT)", rate: "250", unit: "per hour" },
  { id: "s10", name: "Time-of-Flight Diffraction (TOFD)", rate: "280", unit: "per hour" }
];

const DEMO_PROVIDER_QUALIFICATIONS: PersonnelQualification[] = [
  { id: "pq1", quantity: 5, certificationBody: "ASNT (American Society for Nondestructive Testing)", level: "Level II", expiryDate: new Date("2026-12-31") },
  { id: "pq2", quantity: 2, certificationBody: "PCN (Personnel Certification in Non-Destructive Testing)", level: "Level III", expiryDate: new Date("2027-06-30") }
];

const DEMO_PROVIDER_CERTIFICATIONS: CompanyCertification[] = [
  { id: "cc1", name: "ISO 9001", category: "Quality Management", expiryDate: new Date("2025-08-01") },
  { id: "cc2", name: "API Q1", category: "Oil & Gas Specific", expiryDate: new Date("2026-01-15") }
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
        name: "Anoop R", 
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
        name: values.email.split('@')[0], // Placeholder name
        isDemo: false, 
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
        isDemo: true, 
        profileData: clientProfile
      };
    } else { 
      const providerProfile: ProviderProfileData = {
        location: "Houston, TX", lat: 29.7604, lng: -95.3698,
        servicesOffered: ALL_NDT_SERVICES_DEMO,
        contactNumber: "(713) 555-PROVIDER",
        procedureInfoUrl: "https://example.com/ndt-procedures.pdf",
        companyLogoUrl: "https://placehold.co/150x50.png", 
        certifications: DEMO_PROVIDER_CERTIFICATIONS,
        personnelQualifications: DEMO_PROVIDER_QUALIFICATIONS,
        isVerified: true,
        availableDocuments: ["General NDT Procedures Manual", "ISO 9001 Certificate PDF", "Sample Technician Certs"],
        baseRate: 95, 
      };
      demoUserDetails = {
        email: "provider.houston.demo@example.com",
        role: "provider" as const,
        name: "Houston NDT Experts (Demo)",
        isDemo: true, 
        profileData: providerProfile
      };
    }

    login(demoUserDetails);
    toast({
      title: "Demo Login Successful",
      description: role === 'provider' ? "Logged in as Demo Vendor." : `Logged in as ${demoUserDetails.name}.`,
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
          {isLoading ? "Loading..." : "Login as Demo Vendor"}
        </Button>
      </div>
    </>
  );
}
