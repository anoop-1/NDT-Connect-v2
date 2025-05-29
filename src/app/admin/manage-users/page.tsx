
// src/app/admin/manage-users/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, ArrowLeft, CheckCircle, XCircle, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const initialMockClients: User[] = [
  { id: 'client1', name: 'Client Alpha Corp', email: 'alpha@example.com', role: 'client', isActive: true, clientProfile: { companyName: 'Alpha Corp', industry: 'Manufacturing', primaryLocation: 'New York, NY' } },
  { id: 'client2', name: 'Client Beta LLC', email: 'beta@example.com', role: 'client', isActive: true, clientProfile: { companyName: 'Beta LLC', industry: 'Construction', primaryLocation: 'Chicago, IL' } },
  { id: 'client3', name: 'Client Gamma Inc', email: 'gamma@example.com', role: 'client', isActive: false, clientProfile: { companyName: 'Gamma Inc', industry: 'Energy', primaryLocation: 'Houston, TX' } },
];

const initialMockProviders: User[] = [
  { id: 'prov1', name: 'NDT Solutions Pro', email: 'solutions@example.com', role: 'provider', isActive: true, providerProfile: { location: 'Houston, TX' } },
  { id: 'prov2', name: 'Inspection Experts Ltd', email: 'experts@example.com', role: 'provider', isActive: true, providerProfile: { location: 'Dallas, TX' } },
  { id: 'prov3', name: 'Advanced Testing Co', email: 'advanced@example.com', role: 'provider', isActive: false, providerProfile: { location: 'Austin, TX' } },
];

const initialMockAdmins: User[] = [
  { id: 'admin1', name: 'Anoop R', email: 'anoop@atlantisinspection.com', role: 'admin', isActive: true },
  { id: 'admin2', name: 'Support Admin', email: 'support@ndtconnect.com', role: 'admin', isActive: true },
];


export default function ManageUsersPage() {
  const { user: currentUser, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [clients, setClients] = useState<User[]>(initialMockClients);
  const [providers, setProviders] = useState<User[]>(initialMockProviders);
  const [admins, setAdmins] = useState<User[]>(initialMockAdmins);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login?redirect=/admin/manage-users");
    } else if (!loading && currentUser && currentUser.role !== 'admin') {
      router.push("/dashboard");
    }
  }, [currentUser, loading, router]);

  const toggleUserStatus = (userId: string, userType: 'client' | 'provider' | 'admin') => {
    let userListUpdater;
    let userList;

    if (userType === 'client') {
      userList = clients;
      userListUpdater = setClients;
    } else if (userType === 'provider') {
      userList = providers;
      userListUpdater = setProviders;
    } else {
      userList = admins;
      userListUpdater = setAdmins;
    }

    const updatedList = userList.map(u =>
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    );
    userListUpdater(updatedList);
    
    const targetUser = updatedList.find(u => u.id === userId);
    toast({
      title: "User Status Updated",
      description: `${targetUser?.name || targetUser?.email}'s status changed to ${targetUser?.isActive ? 'Active' : 'Inactive'}.`,
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!currentUser || currentUser.role !== 'admin') {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  const renderUserTable = (users: User[], userType: 'client' | 'provider' | 'admin') => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((u) => (
          <TableRow key={u.id}>
            <TableCell>{u.name || 'N/A'}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell><Badge variant={u.role === 'admin' ? "destructive" : "secondary" } className="capitalize">{u.role}</Badge></TableCell>
            <TableCell>
              <Badge variant={u.isActive ? "default" : "outline"} className={u.isActive ? 'bg-green-500 hover:bg-green-600 text-white' : ''}>
                {u.isActive ? <CheckCircle className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
                {u.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {/* Prevent current admin from deactivating themselves, unless it's another admin */}
              {!(u.role === 'admin' && u.id === currentUser.id && admins.filter(a => a.isActive).length <=1 ) ? (
                <Button
                  variant={u.isActive ? "destructive" : "default"}
                  size="sm"
                  onClick={() => toggleUserStatus(u.id, userType)}
                >
                  {u.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              ) : (
                <Button variant="outline" size="sm" disabled>Locked</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

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
            <Users className="mr-2 h-6 w-6 text-primary" />
            Manage Users
          </CardTitle>
          <CardDescription>
            View, activate, or deactivate client, service provider, and admin accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="providers" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="providers">Service Providers</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="admins">Administrators</TabsTrigger>
            </TabsList>
            <TabsContent value="providers" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-xl">Service Providers</CardTitle></CardHeader>
                <CardContent>{renderUserTable(providers, 'provider')}</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="clients" className="mt-4">
               <Card>
                <CardHeader><CardTitle className="text-xl">Clients</CardTitle></CardHeader>
                <CardContent>{renderUserTable(clients, 'client')}</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="admins" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center"><Shield className="mr-2 h-5 w-5 text-destructive"/>Administrators</CardTitle></CardHeader>
                <CardContent>{renderUserTable(admins, 'admin')}</CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="mt-6 p-4 border border-dashed rounded-lg text-center text-sm text-muted-foreground">
            Note: User data and status changes are part of a mock implementation and will reset on page refresh.
            Full user management requires backend integration.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
