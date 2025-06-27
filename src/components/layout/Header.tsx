
// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, LogIn, LogOut, UserPlus, LayoutDashboard, Search, Sparkles, Briefcase, Settings, Shield, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

export function Header() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navLinkClasses = (path: string) => 
    cn(
      "text-sm font-medium transition-colors hover:text-primary",
      pathname === path ? "text-primary" : "text-muted-foreground"
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="NDT Connect Home">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className={navLinkClasses("/")}>
            <Home className="h-4 w-4 inline-block mr-1" /> Home
          </Link>
          {user?.role === 'client' && (
            <>
              <Link href="/find-providers" className={navLinkClasses("/find-providers")}>
                <Search className="h-4 w-4 inline-block mr-1" /> Find Providers
              </Link>
              <Link href="/recommendations" className={navLinkClasses("/recommendations")}>
                <Sparkles className="h-4 w-4 inline-block mr-1" /> Get Recommendations
              </Link>
               <Link href="/my-requests" className={navLinkClasses("/my-requests")}>
                <Briefcase className="h-4 w-4 inline-block mr-1" /> My Requests
              </Link>
            </>
          )}
           {user?.role === 'provider' && (
            <>
              <Link href="/provider-dashboard" className={navLinkClasses("/provider-dashboard")}>
                <LayoutDashboard className="h-4 w-4 inline-block mr-1" /> Provider Dashboard
              </Link>
            </>
          )}
           {user?.role === 'admin' && (
            <>
              <Link href="/admin/dashboard" className={navLinkClasses("/admin/dashboard")}>
                <Shield className="h-4 w-4 inline-block mr-1" /> Admin Dashboard
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {loading ? (
             <div className="h-8 w-20 animate-pulse rounded-md bg-muted"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profileImageUrl || "https://placehold.co/40x40.png"} alt={user.name ?? 'User'} data-ai-hint="user avatar" />
                    <AvatarFallback>{user.name?.[0].toUpperCase() ?? 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name ?? user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email} ({user.role})
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === 'admin' ? (
                  <DropdownMenuItem onClick={() => router.push('/admin/dashboard')}>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                )}
                
                {user.role === 'provider' && (
                    <DropdownMenuItem onClick={() => router.push('/provider-profile')}>
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                    </DropdownMenuItem>
                )}

                {user.role !== 'admin' && (
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/register">
                  <UserPlus className="mr-2 h-4 w-4" /> Register
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
