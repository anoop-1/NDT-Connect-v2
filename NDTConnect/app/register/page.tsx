
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Globe, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] full-bleed -my-8">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-slate-800 relative overflow-hidden flex-col justify-center px-12 xl:px-16">
        <div className="absolute inset-0 hero-grid-bg opacity-5" />
        <div className="relative z-10">
          <Image src="/logo.png" alt="NDT Connect" width={180} height={45} className="h-10 w-auto mb-10 brightness-0 invert" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Join the NDT Marketplace
          </h2>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed">
            Whether you need NDT inspection services or want to grow your inspection business — NDT Connect has you covered.
          </p>
          <div className="space-y-5">
            {[
              { icon: CheckCircle, text: 'Free to join for both clients and providers' },
              { icon: Globe, text: 'Access certified inspectors in 75+ cities' },
              { icon: Zap, text: 'Get instant quotes within hours' },
              { icon: ShieldCheck, text: 'All providers verified and certified' },
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
        <div className="w-full max-w-2xl">
          <div className="lg:hidden mb-8 text-center">
            <Image src="/logo.png" alt="NDT Connect" width={140} height={35} className="h-8 w-auto mx-auto mb-4" />
          </div>
          <Card className="shadow-lg border-slate-200">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Create an Account</CardTitle>
              <CardDescription>Join NDT Connect to find or offer NDT services.</CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button variant="link" asChild className="p-0">
                  <Link href="/login">Login here</Link>
                </Button>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
