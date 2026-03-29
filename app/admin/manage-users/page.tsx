// src/app/admin/manage-users/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Users, ArrowLeft, CheckCircle, XCircle, Shield, Trash2, Eye } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ManageUsersPage() {
  const { user: currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setAllUsers(data);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users.",
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
      const response = await fetch(`/api/admin/users/${userToUpdate._id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: newStatus }),
      });
      
      if (!response.ok) throw new Error('Failed to update status');

      setAllUsers(prevUsers => 
        prevUsers.map(u => u._id === userToUpdate._id ? { ...u, isActive: newStatus } : u)
      );

      toast({
        title: "Status Updated",
        description: `${userToUpdate.name}'s account is now ${newStatus ? 'active' : 'inactive'}.`,
      });
    } catch (error: any) {
      console.error("Error toggling user status:", error);
      toast({
        title: "Update Failed",
        description: "Could not update user status.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete user');

      setAllUsers(prevUsers => prevUsers.filter(u => u._id !== userId));

      toast({
        title: "User Deleted",
        description: "User has been permanently removed.",
      });
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "Deletion Failed",
        description: "Could not delete user.",
        variant: "destructive",
      });
    }
  };

  const filterUsersByRole = (role: string) => {
    return allUsers.filter(u => u.role === role);
  };

  if (authLoading || isLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
    </div>;
  }

  if (!currentUser || currentUser.role !== 'admin') {
    return null; // Redirect will happen automatically
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
          <TableRow>
            <TableCell colSpan={4} className="text-center text-muted-foreground">
              No {userType}s found
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name || 'N/A'}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.isActive !== false ? "default" : "destructive"}>
                  {user.isActive !== false ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSelectedUser(user);
                    setViewDialogOpen(true);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                
                {user.isActive === false ? (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleToggleUserStatus(user)}
                  >
                    Enable
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleUserStatus(user)}
                  >
                    Disable
                  </Button>
                )}

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete {user.name || 'this user'}. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteUser(user._id)}
                        className={buttonVariants({ variant: "destructive" })}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Button variant="outline" asChild>
        <Link href="/admin/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-6 w-6 text-primary" />
            Manage Users
          </CardTitle>
          <CardDescription>
            View and manage all user accounts in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="providers">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="providers">Providers</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="inspectors">Inspectors</TabsTrigger>
            </TabsList>
            
            <TabsContent value="providers" className="mt-4">
              {renderUserTable(filterUsersByRole('provider'), 'provider')}
            </TabsContent>
            
            <TabsContent value="clients" className="mt-4">
              {renderUserTable(filterUsersByRole('client'), 'client')}
            </TabsContent>
            
            <TabsContent value="inspectors" className="mt-4">
              {renderUserTable(filterUsersByRole('inspector'), 'inspector')}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View User Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[625px]" style={{ maxHeight: '90vh', overflow: 'auto' }}>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Name:</span>
                <span className="col-span-3">{selectedUser.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Email:</span>
                <span className="col-span-3">{selectedUser.email}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Role:</span>
                <span className="col-span-3 capitalize">{selectedUser.role}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Status:</span>
                <span className="col-span-3">
                  <Badge variant={selectedUser.isActive !== false ? "default" : "destructive"}>
                    {selectedUser.isActive !== false ? 'Active' : 'Inactive'}
                  </Badge>
                </span>
              </div>
              {selectedUser.profileData && (
                <>
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-sm font-medium mb-2">Profile Details</h4>
                    <pre className="text-sm bg-muted p-4 rounded-md overflow-auto max-h-60">
                      {JSON.stringify(selectedUser.profileData, null, 2)}
                    </pre>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
