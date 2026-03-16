// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, Settings, Shield, UserCircle } from 'lucide-react';
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

export function Header() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-strong shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="NDT Connect Home">
          <Logo />
        </Link>

        {/* Right Side Actions - Minimal: Get Started + Login (or Avatar when logged in) */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-8 w-20 animate-pulse rounded-lg bg-brand/10"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-brand/20 hover:ring-brand/40 transition-all">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.profileImageUrl || "https://placehold.co/40x40.png"} alt={user.name ?? 'User'} data-ai-hint="user avatar" />
                    <AvatarFallback className="bg-brand/10 text-brand font-semibold">{user.name?.[0].toUpperCase() ?? 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-xl border-brand/10 shadow-xl" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">{user.name ?? user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email} ({user.role})
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === 'admin' ? (
                  <DropdownMenuItem onClick={() => router.push('/admin/dashboard')} className="rounded-lg">
                    <Shield className="mr-2 h-4 w-4 text-brand" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => router.push('/dashboard')} className="rounded-lg">
                    <LayoutDashboard className="mr-2 h-4 w-4 text-brand" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                )}
                {user.role === 'provider' && (
                  <DropdownMenuItem onClick={() => router.push('/provider-profile')} className="rounded-lg">
                    <UserCircle className="mr-2 h-4 w-4 text-brand" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                )}
                {user.role === 'client' && (
                  <>
                    <DropdownMenuItem onClick={() => router.push('/recommendations')} className="rounded-lg">
                      <LayoutDashboard className="mr-2 h-4 w-4 text-brand" />
                      <span>Recommendations</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/my-requests')} className="rounded-lg">
                      <LayoutDashboard className="mr-2 h-4 w-4 text-brand" />
                      <span>My Requests</span>
                    </DropdownMenuItem>
                  </>
                )}
                {user.role !== 'admin' && (
                  <DropdownMenuItem onClick={() => router.push('/settings')} className="rounded-lg">
                    <Settings className="mr-2 h-4 w-4 text-brand" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="rounded-lg">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="rounded-lg hover:text-brand hover:bg-brand/5">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="rounded-lg bg-brand hover:bg-brand-dark text-white shadow-md shadow-brand/20">
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
