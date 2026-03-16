"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListChecks, ArrowLeft, AlertTriangle, PlusCircle, Trash2, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface PredefinedList {
  id: string;
  name: string;
  items: string[];
  lastUpdated?: Date;
}

const listConfigurations = [
  { id: "clientNdtServices", name: "NDT Service Types (Client Request & AI)", itemTypeName: "Service Type", placeholder: "e.g., Neutron Radiography" },
  { id: "providerNdtServices", name: "NDT Service Types (Provider Profile)", itemTypeName: "Service Type", placeholder: "e.g., Guided Wave Testing" },
  { id: "serviceUnits", name: "Service Units", itemTypeName: "Service Unit", placeholder: "e.g., per item" },
  { id: "companyCertifications", name: "Company Certifications", itemTypeName: "Certification", placeholder: "e.g., API Monogram" },
  { id: "personnelQualificationBodies", name: "Personnel Qualification Bodies", itemTypeName: "Body", placeholder: "e.g., ACCP" },
  { id: "personnelQualificationLevels", name: "Personnel Qualification Levels", itemTypeName: "Level", placeholder: "e.g., Trainee" },
  { id: "currency", name: "Currency", itemTypeName: "Currency", placeholder: "e.g., USD" },
];

export default function ManagePredefinedListsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [lists, setLists] = useState<Record<string, PredefinedList>>({});
  const [newItems, setNewItems] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLists = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/predefined-lists');
      console.log(response);
      if (!response.ok) throw new Error('Failed to fetch lists');
      const data = await response.json();
      console.log(data);
      
      const fetchedLists: Record<string, PredefinedList> = {};
      data.forEach((list: any) => {
        fetchedLists[list.id] = {
          id: list.id,
          name: list.name,
          items: list.items,
          lastUpdated: list.lastUpdated ? new Date(list.lastUpdated) : undefined
        };
      });
      
      setLists(fetchedLists);
    } catch (e) {
      console.error("Error fetching predefined lists:", e);
      setError("Failed to load lists from server");
      toast({
        title: "Server Error",
        description: "Could not fetch predefined lists",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/admin/manage-predefined-lists");
    } else if (!authLoading && user && user.role !== 'admin') {
      router.push("/dashboard");
    } else if (user) {
      fetchLists();
    }
  }, [user, authLoading, router, fetchLists]);

  const handleAddItem = async (listId: string) => {
    const newItemText = newItems[listId]?.trim();
    const listConfig = listConfigurations.find(lc => lc.id === listId);

    if (!newItemText) {
      toast({ 
        title: "Item required", 
        description: "Please enter an item to add", 
        variant: "destructive" 
      });
      return;
    }

    try {
      const response = await fetch('/api/admin/predefined-lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listId,
          item: newItemText
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add item');
      }

      setLists(prev => ({
        ...prev,
        [listId]: {
          ...prev[listId],
          items: data.items,
          lastUpdated: data.lastUpdated ? new Date(data.lastUpdated) : undefined
        }
      }));

      setNewItems(prev => ({ ...prev, [listId]: "" }));

      toast({
        title: "Item Added",
        description: `"${newItemText}" added to ${listConfig?.name || 'list'}`,
      });
    } catch (e) {
      console.error("Error adding item:", e);
      toast({
        title: "Add Failed",
        description: e.message || "Could not add item to list",
        variant: "destructive",
      });
    }
  };

  const handleRemoveItem = async (listId: string, item: string) => {
    try {
      const response = await fetch('/api/admin/predefined-lists', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listId,
          item
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove item');
      }

      setLists(prev => ({
        ...prev,
        [listId]: {
          ...prev[listId],
          items: data.items,
          lastUpdated: data.lastUpdated ? new Date(data.lastUpdated) : undefined
        }
      }));

      toast({
        title: "Item Removed",
        description: `"${item}" removed from list`,
      });
    } catch (e) {
      console.error("Error removing item:", e);
      toast({
        title: "Remove Failed",
        description: e.message || `Could not remove "${item}"`,
        variant: "destructive",
      });
    }
  };
  
  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Activity className="h-8 w-8 animate-spin text-primary" /> 
        <span className="ml-2">Loading list data...</span>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }
  
  const renderEditableList = (listConfig: typeof listConfigurations[0]) => {
    const list = lists[listConfig.id] || { id: listConfig.id, name: listConfig.name, items: [] };
    const newItemText = newItems[listConfig.id] || "";
    const setNewItemText = (text: string) => setNewItems(prev => ({...prev, [listConfig.id]: text}));
    
    return (
      <Card key={list.id} className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-xl">{listConfig.name}</CardTitle>
          <CardDescription>
            {list.lastUpdated && `Last updated: ${list.lastUpdated.toLocaleString()}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="font-semibold">Current Items:</Label>
            {list.items.length > 0 ? (
              <ul className="list-disc list-inside pl-4 space-y-1 text-sm">
                {list.items.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{item}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveItem(list.id, item)} 
                      className="text-destructive hover:text-destructive"
                    >
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
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem(list.id)}
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
            Add or remove items from system predefined lists
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="p-4 border border-amber-500 bg-amber-50 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 mr-3 text-amber-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-amber-700">Admin Controls</h4>
                <p className="text-sm text-amber-600">
                  Changes made here will affect all users. Add or remove items carefully.
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
