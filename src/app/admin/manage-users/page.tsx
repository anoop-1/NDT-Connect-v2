
// src/app/admin/manage-users/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, ArrowLeft, CheckCircle, XCircle, Shield, Trash2, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

const LOCALSTORAGE_KEY_CLIENTS = "adminManaged_clients";
const LOCALSTORAGE_KEY_PROVIDERS = "adminManaged_providers";
const LOCALSTORAGE_KEY_ADMINS = "adminManaged_admins";


export default function ManageUsersPage() {
  const { user: currentUser, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [clients, setClients] = useState<User[]>([]);
  const [providers, setProviders] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);

  // Load users from localStorage or use initial mocks
  useEffect(() => {
    const loadUsers = <T extends User>(key: string, defaultUsers: T[]): T[] => {
      try {
        const storedUsers = localStorage.getItem(key);
        if (storedUsers) {
          const parsed = JSON.parse(storedUsers);
          if (Array.isArray(parsed) && parsed.every(u => u.id && u.email && u.role)) {
            return parsed;
          }
        }
      } catch (e) {
        console.error(`Error loading users from localStorage key ${key}:`, e);
      }
      localStorage.setItem(key, JSON.stringify(defaultUsers)); // Seed if empty or error
      return defaultUsers;
    };

    setClients(loadUsers(LOCALSTORAGE_KEY_CLIENTS, initialMockClients));
    setProviders(loadUsers(LOCALSTORAGE_KEY_PROVIDERS, initialMockProviders));
    setAdmins(loadUsers(LOCALSTORAGE_KEY_ADMINS, initialMockAdmins));
  }, []);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login?redirect=/admin/manage-users");
    } else if (!loading && currentUser && currentUser.role !== 'admin') {
      router.push("/dashboard");
    }
  }, [currentUser, loading, router]);

  const saveUsersToLocalStorage = <T extends User>(key: string, users: T[]) => {
    try {
      localStorage.setItem(key, JSON.stringify(users));
    } catch (e) {
      console.error(`Error saving users to localStorage key ${key}:`, e);
      toast({
        title: "Storage Error",
        description: "Could not save user changes to local storage.",
        variant: "destructive",
      });
    }
  };

  const toggleUserStatus = (userId: string, userType: 'client' | 'provider' | 'admin') => {
    let userList: User[];
    let userListUpdater: React.Dispatch<React.SetStateAction<User[]>>;
    let storageKey: string;

    if (userType === 'client') {
      userList = clients;
      userListUpdater = setClients;
      storageKey = LOCALSTORAGE_KEY_CLIENTS;
    } else if (userType === 'provider') {
      userList = providers;
      userListUpdater = setProviders;
      storageKey = LOCALSTORAGE_KEY_PROVIDERS;
    } else {
      userList = admins;
      userListUpdater = setAdmins;
      storageKey = LOCALSTORAGE_KEY_ADMINS;
    }

    const updatedList = userList.map(u =>
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    );
    userListUpdater(updatedList);
    saveUsersToLocalStorage(storageKey, updatedList);
    
    const targetUser = updatedList.find(u => u.id === userId);
    toast({
      title: "User Status Updated",
      description: `${targetUser?.name || targetUser?.email}'s status changed to ${targetUser?.isActive ? 'Active' : 'Inactive'}.`,
    });
  };

  const deleteUser = (userId: string, userType: 'client' | 'provider' | 'admin') => {
    let userList: User[];
    let userListUpdater: React.Dispatch<React.SetStateAction<User[]>>;
    let storageKey: string;

    if (userType === 'client') {
      userList = clients;
      userListUpdater = setClients;
      storageKey = LOCALSTORAGE_KEY_CLIENTS;
    } else if (userType === 'provider') {
      userList = providers;
      userListUpdater = setProviders;
      storageKey = LOCALSTORAGE_KEY_PROVIDERS;
    } else {
      userList = admins;
      userListUpdater = setAdmins;
      storageKey = LOCALSTORAGE_KEY_ADMINS;
    }

    const targetUser = userList.find(u => u.id === userId);
    if (!targetUser) return;

    // Prevent deletion of the current admin if they are the only active admin
    if (userType === 'admin' && targetUser.id === currentUser?.id && admins.filter(a => a.isActive && a.id !== targetUser.id).length === 0) {
      toast({
        title: "Action Not Allowed",
        description: "Cannot delete the last active administrator.",
        variant: "destructive",
      });
      return;
    }


    const updatedList = userList.filter(u => u.id !== userId);
    userListUpdater(updatedList);
    saveUsersToLocalStorage(storageKey, updatedList);

    toast({
      title: "User Deleted",
      description: `${targetUser.name || targetUser.email} has been removed.`,
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
            <TableCell className="text-right space-x-2">
              {!(u.role === 'admin' && u.id === currentUser.id && admins.filter(a => a.isActive).length <=1 ) ? (
                <Button
                  variant={u.isActive ? "outline" : "default"}
                  size="sm"
                  onClick={() => toggleUserStatus(u.id, userType)}
                  className={u.isActive ? 'border-yellow-500 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800' : ''}
                >
                  {u.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              ) : (
                <Button variant="outline" size="sm" disabled>Locked</Button>
              )}
               <AlertDialog>
                <AlertDialogTrigger asChild>
                   {!(u.role === 'admin' && u.id === currentUser.id && admins.length <=1 ) ? (
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-1 h-4 w-4" /> Delete
                    </Button>
                   ) : (
                     <Button variant="outline" size="sm" disabled>Locked</Button>
                   )}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center"><AlertTriangle className="mr-2 h-5 w-5 text-destructive"/>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the user 
                      <span className="font-semibold"> {u.name || u.email}</span> and remove their data from local storage.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteUser(u.id, userType)} className={buttonVariants({variant: "destructive"})}>
                      Yes, delete user
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
            View, activate, deactivate, or delete client, service provider, and admin accounts. Changes are saved to your browser's local storage.
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
            User data and status changes are persisted in your browser's local storage.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

