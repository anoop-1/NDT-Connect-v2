// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { LogIn, LogOut, UserPlus, LayoutDashboard, Search, Sparkles, Briefcase, Settings, Shield, UserCircle, Menu, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navLinkClasses = (path: string) =>
    cn(
      "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
      pathname === path
        ? "text-primary bg-primary/5"
        : "text-muted-foreground hover:bg-muted/50"
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="NDT Connect Home">
          <Logo />
        </Link>

        {/* Desktop Navigation - Clean & Professional */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link href="/services" className={navLinkClasses("/services")}>
            Services
          </Link>
          <Link href="/industries" className={navLinkClasses("/industries")}>
            Industries
          </Link>
          <Link href="/find-providers" className={navLinkClasses("/find-providers")}>
            Find Providers
          </Link>
          <Link href="/blog" className={navLinkClasses("/blog")}>
            Blog
          </Link>
          <Link href="/tools/ndt-method-selector" className={navLinkClasses("/tools/ndt-method-selector")}>
            Tools
          </Link>

          {/* Logged-in user specific nav */}
          {user?.role === 'client' && (
            <>
              <Link href="/recommendations" className={navLinkClasses("/recommendations")}>
                Recommendations
              </Link>
              <Link href="/my-requests" className={navLinkClasses("/my-requests")}>
                My Requests
              </Link>
            </>
          )}
          {user?.role === 'provider' && (
            <Link href="/provider-dashboard" className={navLinkClasses("/provider-dashboard")}>
              Dashboard
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link href="/admin/dashboard" className={navLinkClasses("/admin/dashboard")}>
              Admin
            </Link>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {loading ? (
            <div className="h-8 w-20 animate-pulse rounded-md bg-muted"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
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
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu - Clean slide-down */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background animate-in slide-in-from-top-2">
          <div className="container py-4 space-y-1">
            <Link href="/services" className="block py-2.5 px-3 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link href="/industries" className="block py-2.5 px-3 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>Industries</Link>
            <Link href="/find-providers" className="block py-2.5 px-3 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>Find Providers</Link>
            <Link href="/blog" className="block py-2.5 px-3 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/tools/ndt-method-selector" className="block py-2.5 px-3 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>Tools</Link>
            <Link href="/careers" className="block py-2.5 px-3 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>Careers</Link>
            <Link href="/glossary" className="block py-2.5 px-3 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>Glossary</Link>
            <Link href="/contact" className="block py-2.5 px-3 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

            {!user && (
              <div className="flex gap-2 pt-3 mt-2 border-t">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                </Button>
                <Button size="sm" asChild className="flex-1">
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
