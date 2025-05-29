
// src/app/admin/manage-predefined-lists/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListChecks, ArrowLeft, AlertTriangle } from "lucide-react";

// These are for display purposes only on this page
const PREDEFINED_LISTS_INFO = [
  { 
    name: "NDT Service Types (for Provider Profile & Registration)", 
    details: "Radiographic Testing, Ultrasonic Testing, Magnetic Particle Testing, Liquid Penetrant Testing, Visual Testing, Eddy Current Testing, Magnetic Flux Leakage, Internal Rotary Inspection System, Surface Eddy Current Testing, Pulsed Eddy Current Testing, Phased Array Ultrasonic Testing, Long Range Ultrasonic Testing, Vacuum Box Testing."
  },
  { 
    name: "NDT Service Types (for Client Request Forms & AI Recommendations)", 
    details: "Ultrasonic Testing (UT), Magnetic Particle Testing (MT), Liquid Penetrant Testing (PT), Radiographic Testing (RT), Eddy Current Testing (ET), Visual Testing (VT), Leak Testing (LT), Acoustic Emission Testing (AET), Phased Array UT (PAUT), Time-of-Flight Diffraction (TOFD), Other."
  },
  {
    name: "Service Units (for Provider Profile & Registration)",
    details: "per hour, per day, per month, per meter, per mm of thickness, per inch of thickness."
  },
  {
    name: "Company Certifications (for Provider Profile & Registration)",
    details: "ISO 9001, ISO 14001, ISO 17020, ISO 17024, ISO 17025, ISO 45001, ABS, DNV, LR, BV, NKK, IRS, RINA, CCS, KR, Other."
  },
  {
    name: "Personnel Qualification Bodies (for Provider Profile & Registration)",
    details: "ASNT, PCN, ISO 9712, CSWIP, CGSB, AWS, CWI, ISNT, AINDT, BINDT, Other."
  },
  {
    name: "Personnel Qualification Levels (for Provider Profile & Registration)",
    details: "Level I, Level II, Level III, Technician, Inspector, Engineer, Assistant, Senior, Other."
  },
];


export default function ManagePredefinedListsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/admin/manage-predefined-lists");
    } else if (!loading && user && user.role !== 'admin') {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" asChild>
        <Link href="/admin/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin Dashboard
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ListChecks className="mr-2 h-6 w-6 text-primary" />
            Manage Predefined Lists
          </CardTitle>
          <CardDescription>
            This section outlines the various predefined lists used across the NDT Connect platform for dropdowns, selections, and categorizations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 border border-amber-500 bg-amber-50 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 mr-3 text-amber-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-amber-700">Feature Under Development</h4>
                <p className="text-sm text-amber-600">
                  Currently, these lists are hardcoded within the application. Direct management (add, remove, edit) of these lists via this UI is a planned future enhancement that would typically require backend integration for persistence and broader application updates. Changes now require code modification.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold">Current Predefined Lists:</h3>
          <div className="space-y-4">
            {PREDEFINED_LISTS_INFO.map((list) => (
              <Card key={list.name} className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-lg">{list.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{list.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-6 border border-dashed rounded-lg text-center">
            [Future UI for adding/editing/removing list items will appear here]
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
