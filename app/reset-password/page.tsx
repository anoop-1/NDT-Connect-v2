"use client";

import { Suspense } from "react";
import Image from "next/image";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
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
          <h1 className="text-3xl font-extrabold tracking-tight">Set Your Password</h1>
          <p className="max-w-md text-base text-white/80">
            Choose a strong password to secure your NDT Connect account.
          </p>
        </div>
        <p className="text-xs text-white/60">NDT Connect — The NDT Marketplace</p>
      </aside>

      <section className="flex items-center justify-center bg-background px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          <Suspense fallback={<div className="text-center text-muted-foreground">Loading…</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
