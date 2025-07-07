"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Users, User, Building2, Shield } from 'lucide-react';

interface SafeUser {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'provider' | 'inspector' | 'admin';
  createdAt: string;
  updatedAt: string;
}

interface UsersResponse {
  users: SafeUser[];
  total: number;
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'client':
      return <Building2 className="h-4 w-4" />;
    case 'provider':
      return <Users className="h-4 w-4" />;
    case 'inspector':
      return <Shield className="h-4 w-4" />;
    case 'admin':
      return <User className="h-4 w-4" />;
    default:
      return <User className="h-4 w-4" />;
  }
};

const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case 'client':
      return 'default';
    case 'provider':
      return 'secondary';
    case 'inspector':
      return 'outline';
    case 'admin':
      return 'destructive';
    default:
      return 'default';
  }
};

export default function ViewUsersPage() {
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data: UsersResponse = await response.json();
      setUsers(data.users);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const groupedUsers = {
    client: users.filter(user => user.role === 'client'),
    provider: users.filter(user => user.role === 'provider'),
    inspector: users.filter(user => user.role === 'inspector'),
    admin: users.filter(user => user.role === 'admin'),
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <RefreshCw className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading users...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-red-200">
          <CardContent className="p-6">
            <div className="text-red-600">
              <h3 className="font-semibold mb-2">Error loading users</h3>
              <p>{error}</p>
              <Button 
                onClick={fetchUsers} 
                className="mt-4"
                variant="outline"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Registered Users</h1>
          <p className="text-muted-foreground">
            Total users in database: {total}
          </p>
        </div>
        <Button onClick={fetchUsers} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clients</p>
                <p className="text-2xl font-bold">{groupedUsers.client.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Providers</p>
                <p className="text-2xl font-bold">{groupedUsers.provider.length}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inspectors</p>
                <p className="text-2xl font-bold">{groupedUsers.inspector.length}</p>
              </div>
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Admins</p>
                <p className="text-2xl font-bold">{groupedUsers.admin.length}</p>
              </div>
              <User className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No users found in the database</p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(user.role)}
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Created: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ID: {user.id}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
