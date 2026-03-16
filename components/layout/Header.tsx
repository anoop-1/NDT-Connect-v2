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
      "text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg relative",
      pathname === path
        ? "text-[#004aad] bg-[#004aad]/5 font-semibold"
        : "text-muted-foreground hover:text-[#004aad] hover:bg-[#004aad]/5"
    );

  return (
    <header className="sticky top-0 z-50 w-full glass-strong shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="NDT Connect Home">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
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
          <a href="https://dt.atlantisndt.com" target="_blank" rel="noopener noreferrer" className={navLinkClasses("reporting")}>
            Reporting
          </a>

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
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#004aad]/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-[#004aad]" /> : <Menu className="h-5 w-5" />}
          </button>

          {loading ? (
            <div className="h-8 w-20 animate-pulse rounded-lg bg-[#004aad]/10"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-[#004aad]/20 hover:ring-[#004aad]/40 transition-all">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.profileImageUrl || "https://placehold.co/40x40.png"} alt={user.name ?? 'User'} data-ai-hint="user avatar" />
                    <AvatarFallback className="bg-[#004aad]/10 text-[#004aad] font-semibold">{user.name?.[0].toUpperCase() ?? 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-xl border-[#004aad]/10 shadow-xl" align="end" forceMount>
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
                    <Shield className="mr-2 h-4 w-4 text-[#004aad]" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => router.push('/dashboard')} className="rounded-lg">
                    <LayoutDashboard className="mr-2 h-4 w-4 text-[#004aad]" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                )}
                {user.role === 'provider' && (
                  <DropdownMenuItem onClick={() => router.push('/provider-profile')} className="rounded-lg">
                    <UserCircle className="mr-2 h-4 w-4 text-[#004aad]" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                )}
                {user.role !== 'admin' && (
                  <DropdownMenuItem onClick={() => router.push('/settings')} className="rounded-lg">
                    <Settings className="mr-2 h-4 w-4 text-[#004aad]" />
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
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex rounded-lg hover:text-[#004aad] hover:bg-[#004aad]/5">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="rounded-lg bg-[#004aad] hover:bg-[#003a8c] text-white shadow-md shadow-[#004aad]/20">
                <Link href="/register" className="text-white">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu - Glass morphism slide-down */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#004aad]/10 glass-strong animate-in slide-in-from-top-2">
          <div className="container py-4 space-y-1">
            {[
              { href: '/services', label: 'Services' },
              { href: '/industries', label: 'Industries' },
              { href: '/find-providers', label: 'Find Providers' },
              { href: '/blog', label: 'Blog' },
              { href: '/tools/ndt-method-selector', label: 'Tools' },
              { href: 'https://dt.atlantisndt.com', label: 'Reporting', external: true },
              { href: '/careers', label: 'Careers' },
              { href: '/glossary', label: 'Glossary' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "block py-3 px-4 text-sm font-medium rounded-lg transition-all text-foreground hover:text-[#004aad] hover:bg-[#004aad]/5"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block py-3 px-4 text-sm font-medium rounded-lg transition-all",
                    pathname === link.href
                      ? "text-[#004aad] bg-[#004aad]/5 font-semibold"
                      : "text-foreground hover:text-[#004aad] hover:bg-[#004aad]/5"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}

            {!user && (
              <div className="flex gap-3 pt-4 mt-3 border-t border-[#004aad]/10">
                <Button variant="outline" size="sm" asChild className="flex-1 rounded-lg border-[#004aad]/20">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                </Button>
                <Button size="sm" asChild className="flex-1 rounded-lg bg-[#004aad] hover:bg-[#003a8c] text-white">
                  <Link href="/register" className="text-white" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
