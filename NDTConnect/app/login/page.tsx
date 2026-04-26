
import { LoginViewManager } from "@/components/auth/LoginViewManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from 'react';
import { Activity, CheckCircle, Globe, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] full-bleed -my-8">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-800 relative overflow-hidden flex-col justify-center px-12 xl:px-16">
        <div className="absolute inset-0 hero-grid-bg opacity-5" />
        <div className="relative z-10">
          <img src="/logo-globe-animated.svg" alt="NDT Connect" className="h-24 w-auto mb-8" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome Back
          </h2>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed">
            Access your NDT Connect dashboard to manage inspections, track requests, and connect with providers.
          </p>
          <div className="space-y-5">
            {[
              { icon: Globe, text: '75+ cities with certified inspectors' },
              { icon: Zap, text: 'Instant quotes and real-time tracking' },
              { icon: ShieldCheck, text: '100% verified NDT providers' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-4.5 w-4.5 text-blue-400" />
                </div>
                <span className="text-slate-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Image src="/logo.png" alt="NDT Connect" width={140} height={35} className="h-8 w-auto mx-auto mb-4" />
          </div>
          <Card className="shadow-lg border-slate-200">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Login to NDT Connect</CardTitle>
              <CardDescription>Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div className="flex justify-center items-center py-10"><Activity className="h-6 w-6 animate-spin text-primary" /> <span className="ml-2 text-sm text-muted-foreground">Loading...</span></div>}>
                <LoginViewManager />
              </Suspense>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Button variant="link" asChild className="p-0">
                  <Link href="/register">Register here</Link>
                </Button>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
