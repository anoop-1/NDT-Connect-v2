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
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function LoginForm() {
  const { loginWithEmail, loginAsDemoUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const registrationSuccess = searchParams.get('registered');
  const userEmail = searchParams.get('email');

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: userEmail || "",
      password: "",
    },
  });
  
  async function onSubmit(values: FormSchemaType) {
    setIsLoading(true);
    try {
      const user = await loginWithEmail(values.email, values.password);
      if (user) {
        if (!user.emailVerified) {
          toast({ 
            title: "Verification Required", 
            description: "Please check your email to verify your account before logging in.",
            variant: "destructive",
            duration: 10000,
          });
          // Note: The onAuthStateChanged listener might still log the user in briefly.
          // Depending on security rules, this might be acceptable, or you might need to
          // explicitly sign them out here after showing the toast.
        } else {
          toast({ title: "Login Successful", description: `Welcome back!` });
          // The dashboard redirect logic is handled by the AuthProvider's useEffect
          router.push('/dashboard'); 
        }
      } else {
        toast({ title: "Login Failed", description: "Invalid email or password.", variant: "destructive" });
      }
    } catch (error: any) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
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
      {registrationSuccess && (
         <Alert variant="default" className="mb-4 bg-green-50 border-green-200 text-green-800">
            <CheckCircle className="h-4 w-4 !text-green-600"/>
            <AlertTitle>Registration Successful!</AlertTitle>
            <AlertDescription>
                A verification link has been sent to your email address. Please verify your account before logging in.
            </AlertDescription>
         </Alert>
      )}
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
