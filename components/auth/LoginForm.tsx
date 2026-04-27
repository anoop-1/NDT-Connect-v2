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
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function LoginForm() {
  const { loginWithEmail } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [setupEmailSent, setSetupEmailSent] = useState(false);
  const [setupEmail, setSetupEmail] = useState("");

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormSchemaType) {
    setIsLoading(true);
    try {
      const user = await loginWithEmail(values.email, values.password);
      if (user) {
        toast({ title: "Login Successful", description: `Welcome back, ${user.name || user.email}!` });
        if (user.role === 'admin') {
          router.push("/admin/dashboard");
        } else if (user.role === 'provider') {
          router.push("/provider-dashboard");
        } else if (user.role === 'inspector') {
          router.push("/inspector-dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error: any) {
      if (error?.requiresPasswordSetup) {
        setSetupEmail(values.email);
        setSetupEmailSent(true);
      } else {
        toast({ title: "Login Failed", description: error.message || "Invalid credentials", variant: "destructive" });
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (setupEmailSent) {
    return (
      <Alert className="bg-blue-50 border-blue-200">
        <MailCheck className="h-5 w-5 text-blue-600" />
        <AlertDescription className="text-blue-800 text-sm">
          <strong>Check your email!</strong> We sent a password setup link to <strong>{setupEmail}</strong>. Click the link in the email to set your password and access your account.
        </AlertDescription>
      </Alert>
    );
  }

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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        <a href="/forgot-password" className="font-medium text-primary hover:underline">Forgot password?</a>
      </p>
    </>
  );
}
