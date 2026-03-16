// src/app/admin/manage-predefined-lists/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListChecks, ArrowLeft, AlertTriangle, PlusCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface PredefinedList {
  id: string;
  name: string;
  items: string[];
}

const listConfigurations = [
  { id: "clientNdtServices", name: "NDT Service Types (Client Request & AI)", itemTypeName: "Service Type", placeholder: "e.g., Neutron Radiography" },
  { id: "providerNdtServices", name: "NDT Service Types (Provider Profile)", itemTypeName: "Service Type", placeholder: "e.g., Guided Wave Testing" },
  { id: "serviceUnits", name: "Service Units", itemTypeName: "Service Unit", placeholder: "e.g., per item" },
  { id: "companyCertifications", name: "Company Certifications", itemTypeName: "Certification", placeholder: "e.g., API Monogram" },
  { id: "personnelQualificationBodies", name: "Personnel Qualification Bodies", itemTypeName: "Body", placeholder: "e.g., ACCP" },
  { id: "personnelQualificationLevels", name: "Personnel Qualification Levels", itemTypeName: "Level", placeholder: "e.g., Trainee" },
];

const BUILT_IN_DEFAULTS: Record<string, string[]> = {
  clientNdtServices: ["Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)", "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)"],
  providerNdtServices: ["Radiographic Testing", "Ultrasonic Testing", "Magnetic Particle Testing", "Liquid Penetrant Testing", "Visual Testing", "Eddy Current Testing", "Leak Testing", "Acoustic Emission"],
  serviceUnits: ["per hour", "per day", "per project", "per item", "per foot", "per weld"],
  companyCertifications: [
    "API Q1",
    "AS9100",
    "IACS - American Bureau of Shipping (ABS)",
    "IACS - Bureau Veritas (BV)",
    "IACS - China Classification Society (CCS)",
    "IACS - Croatian Register of Shipping (CRS)",
    "IACS - DNV",
    "IACS - Indian Register of Shipping (IRS)",
    "IACS - Korean Register of Shipping (KR)",
    "IACS - Lloyd's Register (LR)",
    "IACS - Nippon Kaiji Kyokai (ClassNK)",
    "IACS - Polski Rejestr Statków (PRS)",
    "IACS - RINA Services (RINA)",
    "IACS - Russian Maritime Register of Shipping (RS)",
    "ISO 9001",
    "ISO 14001",
    "ISO 45001",
    "ISO/IEC 17020",
    "ISO/IEC 17024",
    "ISO/IEC 17025",
    "Nadcap",
    "NAS 410",
  ],
  personnelQualificationBodies: ["ASNT", "PCN", "ISO 9712", "CSWIP", "ACCP", "NAS 410"],
  personnelQualificationLevels: ["Level I", "Level II", "Level III", "Technician", "Trainee"],
};

export default function ManagePredefinedListsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [lists, setLists] = useState<Record<string, PredefinedList>>(() => {
    const initialLists: Record<string, PredefinedList> = {};
    listConfigurations.forEach(config => {
      initialLists[config.id] = {
        id: config.id,
        name: config.name,
        items: BUILT_IN_DEFAULTS[config.id] || []
      };
    });
    return initialLists;
  });

  const [newItems, setNewItems] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/admin/manage-predefined-lists");
    } else if (!authLoading && user && user.role !== 'admin') {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleUpdateList = (listId: string, updatedItems: string[]) => {
    const listConfig = listConfigurations.find(lc => lc.id === listId);
    if (!listConfig) return;

    setLists(prev => ({
      ...prev,
      [listId]: { ...prev[listId], items: updatedItems },
    }));
    toast({
      title: "List Updated",
      description: `"${listConfig.name}" list has been updated.`,
    });
  };

  const handleAddItem = (listId: string) => {
    const newItemText = newItems[listId]?.trim();
    const currentList = lists[listId]?.items || [];
    const listConfig = listConfigurations.find(lc => lc.id === listId);

    if (!newItemText) {
      toast({ title: `Cannot Add Empty ${listConfig?.itemTypeName || "Item"}`, variant: "destructive" });
      return;
    }
    if (currentList.map(i => i.toLowerCase()).includes(newItemText.toLowerCase())) {
      toast({ title: `${listConfig?.itemTypeName || "Item"} Already Exists`, description: `${newItemText} is already in the list.`, variant: "destructive" });
      return;
    }
    handleUpdateList(listId, [...currentList, newItemText]);
    setNewItems(prev => ({ ...prev, [listId]: "" }));
  };

  const handleRemoveItem = (listId: string, itemToRemove: string) => {
    const currentList = lists[listId]?.items || [];
    const updatedList = currentList.filter(item => item !== itemToRemove);
    handleUpdateList(listId, updatedList);
  };

  if (!user || user.role !== 'admin') {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  const renderEditableList = (listConfig: typeof listConfigurations[0]) => {
    const list = lists[listConfig.id];
    const newItemText = newItems[listConfig.id] || "";
    const setNewItemText = (text: string) => setNewItems(prev => ({...prev, [listConfig.id]: text}));
    
    return (
      <Card key={list.id} className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-xl">{listConfig.name}</CardTitle>
          <CardDescription>Admin can add or remove items from this list.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="font-semibold">Current Items:</Label>
            {list.items.length > 0 ? (
              <ul className="list-disc list-inside pl-4 space-y-1 text-sm">
                {list.items.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{item}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(list.id, item)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No items in this list yet. Add one below.</p>
            )}
          </div>
          <div className="flex gap-2 items-end">
            <div className="flex-grow">
              <Label htmlFor={`new-${list.id}`}>{`Add New ${listConfig.itemTypeName}`}</Label>
              <Input
                id={`new-${list.id}`}
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder={listConfig.placeholder}
              />
            </div>
            <Button onClick={() => handleAddItem(list.id)} size="sm">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

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
            This section allows management of predefined lists used across NDT Connect.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="p-4 border border-amber-500 bg-amber-50 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 mr-3 text-amber-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-amber-700">List Management</h4>
                <p className="text-sm text-amber-600">
                  Changes made here are stored locally for demonstration purposes. In a production environment, these would be saved to a database.
                </p>
              </div>
            </div>
          </div>
          
          {error && <p className="text-destructive text-center">{error}</p>}

          {listConfigurations.map(renderEditableList)}
          
        </CardContent>
      </Card>
    </div>
  );
}
