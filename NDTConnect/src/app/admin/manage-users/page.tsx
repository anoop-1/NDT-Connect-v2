// src/app/admin/manage-users/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Users, ArrowLeft, CheckCircle, XCircle, Shield, Trash2, AlertTriangle, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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

export default function ManageUsersPage() {
  const { user: currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setAllUsers(data);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users from the database.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!authLoading) {
      if (!currentUser) {
        router.push("/login?redirect=/admin/manage-users");
      } else if (currentUser.role !== 'admin') {
        router.push("/dashboard");
      } else {
        fetchUsers();
      }
    }
  }, [currentUser, authLoading, router, fetchUsers]);

  const handleToggleUserStatus = async (userToUpdate: any) => {
    const newStatus = !userToUpdate.isActive;
    try {
      const response = await fetch(`/api/users/${userToUpdate.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: newStatus }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) throw new Error('Network response was not ok');

      setAllUsers(prevUsers => 
        prevUsers.map(u => u.id === userToUpdate.id ? { ...u, isActive: newStatus } : u)
      );

      toast({
        title: "User Status Updated",
        description: `${userToUpdate.name || userToUpdate.email}'s status changed to ${newStatus ? 'Active' : 'Inactive'}.`,
      });
    } catch (error: any) {
      console.error("Error toggling user status:", error);
      toast({
        title: "Update Failed",
        description: "Could not update user status in the database.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
     try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setAllUsers(prevUsers => prevUsers.filter(u => u.id !== userId));

      toast({
        title: "User Deleted",
        description: `${userName} has been permanently removed from the database.`,
      });
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "Deletion Failed",
        description: "Could not delete user from the database.",
        variant: "destructive",
      });
    }
  };

  const filterUsersByRole = (role: string) => {
    return allUsers.filter(u => u.role === role);
  };

  if (authLoading || isLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading user data...</span></div>;
  }

  if (!currentUser || currentUser.role !== 'admin') {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  const renderUserTable = (users: any[], userType: string) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">No {userType}s found.</TableCell></TableRow>
        ) : (
          users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.name || 'N/A'}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <Badge variant={u.isActive ? "default" : "outline"} className={u.isActive ? 'bg-green-500 hover:bg-green-600 text-white' : ''}>
                  {u.isActive ? <CheckCircle className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
                  {u.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                {u.id !== currentUser.id && (
                  <>
                    <Button variant={u.isActive ? "outline" : "default"} size="sm" onClick={() => handleToggleUserStatus(u)}>
                      {u.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm"><Trash2 className="mr-1 h-4 w-4" /> Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the user {u.name || u.email}. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteUser(u.id, u.name || u.email)} className={buttonVariants({variant: "destructive"})}>Yes, delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
                {u.id === currentUser.id && <Badge variant="secondary">Current Admin</Badge>}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <Button variant="outline" asChild><Link href="/admin/dashboard"><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link></Button>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Users className="mr-2 h-6 w-6 text-primary" />Manage Users</CardTitle>
          <CardDescription>View, activate, deactivate, or delete user accounts from the Firestore database.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="providers" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="providers">Service Providers</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="admins">Administrators</TabsTrigger>
            </TabsList>
            <TabsContent value="providers" className="mt-4"><Card><CardHeader><CardTitle>Service Providers</CardTitle></CardHeader><CardContent>{renderUserTable(filterUsersByRole('provider'), 'provider')}</CardContent></Card></TabsContent>
            <TabsContent value="clients" className="mt-4"><Card><CardHeader><CardTitle>Clients</CardTitle></CardHeader><CardContent>{renderUserTable(filterUsersByRole('client'), 'client')}</CardContent></Card></TabsContent>
            <TabsContent value="admins" className="mt-4"><Card><CardHeader><CardTitle className="flex items-center"><Shield className="mr-2 h-5 w-5 text-destructive"/>Administrators</CardTitle></CardHeader><CardContent>{renderUserTable(filterUsersByRole('admin'), 'admin')}</CardContent></Card></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

