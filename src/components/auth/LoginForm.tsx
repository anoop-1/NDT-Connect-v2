
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
import type { ClientProfileData, ProviderProfileData, ServiceOffering, PersonnelQualification, CompanyCertification, User } from "@/lib/types";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }), // Simplified for demo
});

type FormSchemaType = z.infer<typeof formSchema>;

const ALL_NDT_SERVICES_DEMO: ServiceOffering[] = [ // Define for demo provider
  { id: "s1", name: "Ultrasonic Testing (UT)", rate: "120", unit: "per hour" },
  { id: "s2", name: "Magnetic Particle Testing (MT)", rate: "110", unit: "per hour" },
  { id: "s3", name: "Liquid Penetrant Testing (PT)", rate: "100", unit: "per hour" },
  { id: "s4", name: "Radiographic Testing (RT)", rate: "180", unit: "per film" },
  { id: "s5", name: "Eddy Current Testing (ET)", rate: "150", unit: "per hour" },
  { id: "s6", name: "Visual Testing (VT)", rate: "90", unit: "per hour" },
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
  const { register, loginWithEmail } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  async function onSubmit(values: FormSchemaType) {
    setIsLoading(true);
    
    // Admin login is a special case
    if (values.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && values.password === ADMIN_PASSWORD) {
      try {
        let adminUser = await loginWithEmail(values.email);
        if (!adminUser) {
           adminUser = await register({ email: values.email, role: 'admin', name: 'Anoop R'});
        }
        if (adminUser) {
            toast({ title: "Admin Login Successful", description: "Welcome, Administrator!" });
            router.push("/admin/dashboard");
        }
      } catch (error: any) {
        toast({ title: "Admin Login Failed", description: error.message, variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Regular user login
    try {
        const user = await loginWithEmail(values.email);
        if (user) {
            toast({ title: "Login Successful", description: `Welcome back, ${user.name || user.email}!` });
            router.push("/dashboard");
        } else {
            toast({ title: "Login Failed", description: "User not found. Please register an account.", variant: "destructive" });
        }
    } catch (error: any) {
        toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    }
    
    setIsLoading(false);
  }

  const handleDemoLogin = async (role: 'client' | 'provider') => {
    setIsLoading(true);
    
    const clientProfile: ClientProfileData = {
        companyName: "Demo Client Innovations", industry: "Technology & R&D", primaryLocation: "Austin, TX", contactNumber: "(555) 123-CLIENT"
    };
    const providerProfile: ProviderProfileData = {
        location: "Houston, TX", servicesOffered: ALL_NDT_SERVICES_DEMO, contactNumber: "(713) 555-PROVIDER", certifications: DEMO_PROVIDER_CERTIFICATIONS, personnelQualifications: DEMO_PROVIDER_QUALIFICATIONS, isVerified: true, availableDocuments: ["General NDT Procedures", "ISO 9001 Cert"], baseRate: 95
    };

    const demoUserDetails = role === 'client' 
      ? { email: "client.demo@example.com", role: "client" as const, name: "Demo Client User", isDemo: true, profileData: clientProfile }
      : { email: "provider.demo@example.com", role: "provider" as const, name: "Demo NDT Experts", isDemo: true, profileData: providerProfile };

    try {
      let user = await loginWithEmail(demoUserDetails.email);
      if (!user) {
        console.log(`Creating demo ${role} user...`);
        user = await register(demoUserDetails);
      }
      
      if(user) {
        toast({ title: "Demo Login Successful", description: `Logged in as ${user.name}.` });
        router.push("/dashboard");
      } else {
        throw new Error("Could not log in or create demo user.");
      }
    } catch (error: any) {
      toast({ title: "Demo Login Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
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
                <FormDescription>Password not checked for non-admin/demo users.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
