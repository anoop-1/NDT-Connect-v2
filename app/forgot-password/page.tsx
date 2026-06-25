"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    // Always show success (prevent enumeration)
    setStatus("sent");
  }

  return (
    <div className="-mx-4 -my-8 grid min-h-[calc(100vh-8rem)] grid-cols-1 lg:grid-cols-2">
      <aside
        className="relative flex flex-col justify-between overflow-hidden p-10 text-white lg:p-16"
        style={{ background: "linear-gradient(160deg, #0B1E33 0%, #003680 60%, #004AAD 100%)" }}
      >
        <div className="flex items-center">
          <Image src="/logo-globe-animated.svg" alt="NDT Connect" width={320} height={100} priority className="block" />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight">Forgot your password?</h1>
          <p className="max-w-md text-base text-white/80">
            Enter your email and we&apos;ll send you a reset link. You&apos;ll be back in seconds.
          </p>
        </div>
        <p className="text-xs text-white/60">NDT Connect — The NDT Marketplace</p>
      </aside>

      <section className="flex items-center justify-center bg-background px-6 py-12 lg:px-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">Reset your password</h2>
            <p className="mt-2 text-sm text-muted-foreground">We&apos;ll send a reset link to your email.</p>
          </div>

          {status === "sent" ? (
            <Alert className="bg-blue-50 border-blue-200">
              <MailCheck className="h-5 w-5 text-blue-600" />
              <AlertDescription className="text-blue-800">
                If an account exists for <strong>{email}</strong>, a reset link has been sent. Check your inbox.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Send Reset Link"}
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground">
            <Link href="/login" className="font-medium text-primary hover:underline">Back to login</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
