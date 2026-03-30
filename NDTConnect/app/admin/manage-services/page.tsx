
// src/app/admin/manage-services/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, ArrowLeft, AlertTriangle, PlusCircle, Trash2, Activity, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ServiceList {
  id: string;
  name: string;
  items: string[];
  lastUpdated?: Date;
}

const serviceListConfigs = [
  { id: "clientNdtServices", name: "NDT Services (Client Request & AI Matching)", description: "Services available for clients to select when creating inspection requests. These are also used by the AI matching engine.", itemTypeName: "Service", placeholder: "e.g., Neutron Radiography" },
  { id: "providerNdtServices", name: "NDT Services (Provider Profile)", description: "Services that providers can list on their profiles to indicate capabilities.", itemTypeName: "Service", placeholder: "e.g., Guided Wave Testing" },
];

export default function ManageServicesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [lists, setLists] = useState<Record<string, ServiceList>>({});
  const [newItems, setNewItems] = useState<Record<string, string>>({});
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLists = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/predefined-lists');
      if (!response.ok) throw new Error('Failed to fetch lists');
      const data = await response.json();

      const fetchedLists: Record<string, ServiceList> = {};
      data.forEach((list: any) => {
        // Only keep service-related lists
        if (list.id === 'clientNdtServices' || list.id === 'providerNdtServices') {
          fetchedLists[list.id] = {
            id: list.id,
            name: list.name,
            items: list.items,
            lastUpdated: list.lastUpdated ? new Date(list.lastUpdated) : undefined
          };
        }
      });

      setLists(fetchedLists);
    } catch (e: any) {
      console.error("Error fetching service lists:", e);
      setError("Failed to load service lists from server");
      toast({
        title: "Server Error",
        description: "Could not fetch service lists",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/admin/manage-services");
    } else if (!authLoading && user && user.role !== 'admin') {
      router.push("/dashboard");
    } else if (user) {
      fetchLists();
    }
  }, [user, authLoading, router, fetchLists]);

  const handleAddItem = async (listId: string) => {
    const newItemText = newItems[listId]?.trim();
    const listConfig = serviceListConfigs.find(lc => lc.id === listId);

    if (!newItemText) {
      toast({
        title: "Service name required",
        description: "Please enter a service name to add",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('/api/admin/predefined-lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listId, item: newItemText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add service');
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
        title: "Service Added",
        description: `"${newItemText}" added to ${listConfig?.name || 'list'}`,
      });
    } catch (e: any) {
      console.error("Error adding service:", e);
      toast({
        title: "Add Failed",
        description: e.message || "Could not add service",
        variant: "destructive",
      });
    }
  };

  const handleRemoveItem = async (listId: string, item: string) => {
    try {
      const response = await fetch('/api/admin/predefined-lists', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listId, item }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove service');
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
        title: "Service Removed",
        description: `"${item}" removed from list`,
      });
    } catch (e: any) {
      console.error("Error removing service:", e);
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
        <span className="ml-2">Loading service data...</span>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  const renderServiceList = (config: typeof serviceListConfigs[0]) => {
    const list = lists[config.id] || { id: config.id, name: config.name, items: [] };
    const newItemText = newItems[config.id] || "";
    const searchTerm = searchTerms[config.id] || "";
    const setNewItemText = (text: string) => setNewItems(prev => ({ ...prev, [config.id]: text }));
    const setSearchTerm = (text: string) => setSearchTerms(prev => ({ ...prev, [config.id]: text }));

    const filteredItems = searchTerm
      ? list.items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
      : list.items;

    return (
      <div key={config.id} className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{config.description}</p>
            {list.lastUpdated && (
              <p className="text-xs text-muted-foreground mt-1">Last updated: {list.lastUpdated.toLocaleString()}</p>
            )}
          </div>
          <Badge variant="secondary">{list.items.length} services</Badge>
        </div>

        {/* Add new service */}
        <div className="flex gap-2 items-end p-4 bg-primary/5 rounded-lg border">
          <div className="flex-grow">
            <Label htmlFor={`new-${config.id}`} className="font-semibold">Add New {config.itemTypeName}</Label>
            <Input
              id={`new-${config.id}`}
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder={config.placeholder}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem(config.id)}
              className="mt-1"
            />
          </div>
          <Button onClick={() => handleAddItem(config.id)} className="shrink-0">
            <PlusCircle className="h-4 w-4 mr-2" /> Add Service
          </Button>
        </div>

        {/* Search filter */}
        {list.items.length > 5 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter services..."
              className="pl-9"
            />
          </div>
        )}

        {/* Service items list */}
        <div className="border rounded-lg divide-y max-h-[400px] overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between px-4 py-2.5 hover:bg-muted/50 transition-colors">
                <span className="text-sm">{item}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveItem(config.id, item)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-muted-foreground text-sm">
              {searchTerm ? 'No services match your filter' : 'No services configured yet. Add one above.'}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Button variant="outline" asChild>
        <Link href="/admin/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin Dashboard
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="mr-2 h-6 w-6 text-primary" />
            Manage Services & Categories
          </CardTitle>
          <CardDescription>
            Add, remove, and organize NDT inspection services available on the platform.
            Changes here affect service options across the entire platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 border border-amber-500 bg-amber-50 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 mr-3 text-amber-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-amber-700">Admin Controls</h4>
                <p className="text-sm text-amber-600">
                  Changes to services will affect all users immediately. Client services are used for request forms and AI matching. Provider services appear on provider profile setup.
                </p>
              </div>
            </div>
          </div>

          {error && <p className="text-destructive text-center">{error}</p>}

          <Tabs defaultValue="clientNdtServices">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="clientNdtServices">Client & AI Services</TabsTrigger>
              <TabsTrigger value="providerNdtServices">Provider Services</TabsTrigger>
            </TabsList>

            {serviceListConfigs.map(config => (
              <TabsContent key={config.id} value={config.id} className="mt-6">
                {renderServiceList(config)}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
