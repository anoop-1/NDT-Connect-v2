// src/app/login/page.tsx
//
// Two-pane login layout. Left: dark blue brand panel with the white globe
// logo + value-prop bullets. Right: white card with the actual form.
//
// The previous version was a single-pane Card centred on the page; the live
// deployed site renders a two-pane layout with an empty white box where the
// brand mark should be. This rewrite uses the new <NdtConnectLogo variant="white">
// component so the mark scales cleanly and never renders as a placeholder rectangle.

import { LoginViewManager } from "@/components/auth/LoginViewManager";
import Link from "next/link";
import { Suspense } from "react";
import { Activity, Globe2, Zap, ShieldCheck } from "lucide-react";

// Logo is rendered as a plain <img> (not a React SVG component) so it never
// collapses under Tailwind preflight, never waits on hydration, and degrades
// to its alt text if the asset 404s. The /public/logo-white.svg file is the
// source of truth — see docs in PRODUCT-EXPANSION-NOTES.md.

export default function LoginPage() {
  return (
    <div className="-mx-4 -my-8 grid min-h-[calc(100vh-8rem)] grid-cols-1 lg:grid-cols-2">
      {/* Brand pane */}
      <aside
        className="relative flex flex-col justify-between overflow-hidden p-10 text-white lg:p-16"
        style={{ background: "linear-gradient(160deg, #0B1E33 0%, #003680 60%, #004AAD 100%)" }}
      >
        <div className="flex items-center">
          {/* Animated rotating globe — pure-CSS @keyframes inside the SVG.
              Loaded via <img> so it never blocks hydration. The CSS animation
              still runs in <img>-loaded SVGs in all modern browsers. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-globe-animated.svg"
            alt="NDT Connect"
            width={320}
            height={100}
            style={{ width: 320, height: 100, display: "block" }}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Welcome Back</h1>
            <p className="mt-3 max-w-md text-base text-white/80 md:text-lg">
              Access your NDT Connect dashboard to manage inspections, track requests, and connect with providers.
            </p>
          </div>

          <ul className="space-y-4 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Globe2 className="h-5 w-5" />
              </span>
              <span>75+ cities with certified inspectors</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Zap className="h-5 w-5" />
              </span>
              <span>Instant quotes and real-time tracking</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span>100% verified NDT providers</span>
            </li>
          </ul>
        </div>

        <p className="text-xs text-white/60">
          Free tools for NDT companies — equipment, calibration, and certificate management. All you need is a user ID.
        </p>
      </aside>

      {/* Form pane */}
      <section className="flex items-center justify-center bg-background px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">Login to NDT Connect</h2>
            <p className="mt-2 text-sm text-muted-foreground">Enter your credentials to access your account.</p>
          </div>

          <div className="mt-8">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-10">
                  <Activity className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
                </div>
              }
            >
              <LoginViewManager />
            </Suspense>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
