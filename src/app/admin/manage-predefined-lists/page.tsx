
// src/app/admin/manage-predefined-lists/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListChecks, ArrowLeft, AlertTriangle, PlusCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_NDT_SERVICE_TYPES_CLIENT_FORM = [
  "Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)",
  "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)",
  "Leak Testing (LT)", "Acoustic Emission Testing (AET)", "Phased Array UT (PAUT)",
  "Time-of-Flight Diffraction (TOFD)", "Other"
];

const OTHER_PREDEFINED_LISTS_INFO = [
  {
    name: "NDT Service Types (for Provider Profile & Registration - Currently Hardcoded)",
    details: "Radiographic Testing, Ultrasonic Testing, Magnetic Particle Testing, Liquid Penetrant Testing, Visual Testing, Eddy Current Testing, Magnetic Flux Leakage, Internal Rotary Inspection System, Surface Eddy Current Testing, Pulsed Eddy Current Testing, Phased Array Ultrasonic Testing, Long Range Ultrasonic Testing, Vacuum Box Testing."
  },
  {
    name: "Service Units (for Provider Profile & Registration - Currently Hardcoded)",
    details: "per hour, per day, per month, per meter, per mm of thickness, per inch of thickness."
  },
  {
    name: "Company Certifications (for Provider Profile & Registration - Currently Hardcoded)",
    details: "ISO 9001, ISO 14001, ISO 17020, ISO 17024, ISO 17025, ISO 45001, ABS, DNV, LR, BV, NKK, IRS, RINA, CCS, KR, Other."
  },
  {
    name: "Personnel Qualification Bodies (for Provider Profile & Registration - Currently Hardcoded)",
    details: "ASNT, PCN, ISO 9712, CSWIP, CGSB, AWS, CWI, ISNT, AINDT, BINDT, Other."
  },
  {
    name: "Personnel Qualification Levels (for Provider Profile & Registration - Currently Hardcoded)",
    details: "Level I, Level II, Level III, Technician, Inspector, Engineer, Assistant, Senior, Other."
  },
];

const LOCALSTORAGE_KEY_CLIENT_NDT_SERVICES = "adminManaged_clientNdtServices";

export default function ManagePredefinedListsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [clientNdtServices, setClientNdtServices] = useState<string[]>(DEFAULT_NDT_SERVICE_TYPES_CLIENT_FORM);
  const [newItemText, setNewItemText] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/admin/manage-predefined-lists");
    } else if (!loading && user && user.role !== 'admin') {
      router.push("/dashboard");
    } else {
      const storedServices = localStorage.getItem(LOCALSTORAGE_KEY_CLIENT_NDT_SERVICES);
      if (storedServices) {
        try {
          const parsedServices = JSON.parse(storedServices);
          if (Array.isArray(parsedServices) && parsedServices.every(item => typeof item === 'string')) {
            setClientNdtServices(parsedServices);
          } else {
            setClientNdtServices(DEFAULT_NDT_SERVICE_TYPES_CLIENT_FORM); // Fallback if stored data is malformed
          }
        } catch (e) {
          console.error("Error parsing stored client NDT services:", e);
          setClientNdtServices(DEFAULT_NDT_SERVICE_TYPES_CLIENT_FORM); // Fallback on error
        }
      } else {
        setClientNdtServices(DEFAULT_NDT_SERVICE_TYPES_CLIENT_FORM); // Initialize if nothing in localStorage
      }
    }
  }, [user, loading, router]);

  const saveClientNdtServices = (services: string[]) => {
    localStorage.setItem(LOCALSTORAGE_KEY_CLIENT_NDT_SERVICES, JSON.stringify(services));
    setClientNdtServices(services);
    toast({ title: "List Updated", description: "Client NDT Service Types list saved locally." });
  };

  const handleAddItem = () => {
    if (newItemText.trim() === "") {
      toast({ title: "Cannot Add Empty Item", variant: "destructive" });
      return;
    }
    if (clientNdtServices.includes(newItemText.trim())) {
      toast({ title: "Item Already Exists", description: `${newItemText.trim()} is already in the list.`, variant: "destructive" });
      return;
    }
    const updatedServices = [...clientNdtServices, newItemText.trim()];
    saveClientNdtServices(updatedServices);
    setNewItemText("");
  };

  const handleRemoveItem = (itemToRemove: string) => {
    const updatedServices = clientNdtServices.filter(item => item !== itemToRemove);
    saveClientNdtServices(updatedServices);
  };


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
            This section outlines predefined lists used across NDT Connect. 
            Some lists below are hardcoded; edits to the "Client NDT Services" list are stored in your browser and do not affect other users or forms directly without code changes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="p-4 border border-amber-500 bg-amber-50 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 mr-3 text-amber-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-amber-700">Important Note on Editing</h4>
                <p className="text-sm text-amber-600">
                  Changes made to the "NDT Service Types (for Client Request Forms & AI Recommendations)" list below are saved only in **your current browser's local storage**.
                  They demonstrate how an admin might manage these lists. However, these local changes **do not automatically update the dropdowns or selections used in actual client forms or AI recommendations across the application for all users.**
                  Modifying the globally used lists still requires code changes.
                </p>
              </div>
            </div>
          </div>

          {/* Editable List Example */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-xl">NDT Service Types (for Client Request Forms & AI Recommendations)</CardTitle>
              <CardDescription>Admin can add or remove items from this list (changes stored locally).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-semibold">Current Items:</Label>
                {clientNdtServices.length > 0 ? (
                  <ul className="list-disc list-inside pl-4 space-y-1 text-sm">
                    {clientNdtServices.map((item, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span>{item}</span>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item)} className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No items in the list.</p>
                )}
              </div>
              <div className="flex gap-2 items-end">
                <div className="flex-grow">
                  <Label htmlFor="newItemText">Add New Service Type</Label>
                  <Input
                    id="newItemText"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="e.g., Neutron Radiography"
                  />
                </div>
                <Button onClick={handleAddItem} size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Item
                </Button>
              </div>
            </CardContent>
          </Card>

          <hr/>
          <h3 className="text-xl font-semibold pt-4">Other Predefined Lists (Currently Display-Only):</h3>
          <div className="space-y-4">
            {OTHER_PREDEFINED_LISTS_INFO.map((list) => (
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
            [Full UI for managing all lists (add/edit/remove) is a future enhancement that would typically require backend integration for global application updates.]
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    