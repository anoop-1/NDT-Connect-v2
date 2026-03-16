// src/components/auth/LoginForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type FormSchemaType = z.infer<typeof formSchema>;

// Admin credentials (for mock purposes)
const ADMIN_EMAIL = "anoop@atlantisinspection.com";
const ADMIN_PASSWORD = "Atlantis9$";

export function LoginForm() {
  const { register, loginWithEmail, loginAsDemoUser } = useAuth();
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
    
    // Admin login is a special case that still uses the database
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

    // Regular user login (non-demo)
    try {
        const user = await loginWithEmail(values.email);
        if (user) {
            toast({ title: "Login Successful", description: `Welcome back, ${user.name || user.email}!` });
            router.push("/dashboard");
        } else {
            toast({ title: "Login Failed", description: "User not found or password incorrect. Please register if you don't have an account.", variant: "destructive" });
        }
    } catch (error: any) {
        toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    }
    
    setIsLoading(false);
  }

  const handleDemoLogin = (role: 'client' | 'provider') => {
    setIsLoading(true);
    try {
      loginAsDemoUser(role);
      toast({ title: "Demo Login Successful", description: `Logged in as Demo ${role.charAt(0).toUpperCase() + role.slice(1)}.` });
      router.push("/dashboard");
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
                <FormDescription>Password checked for admin users.</FormDescription>
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
