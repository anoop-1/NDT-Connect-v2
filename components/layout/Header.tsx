// components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, Settings, Shield, UserCircle, Menu, X } from 'lucide-react';
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
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/shared/Logo';
import { NotificationBell } from '@/components/shared/NotificationBell';
import { DefaultAvatar } from '@/components/shared/DefaultAvatar';

const navLinks = [
  { label: 'Free Tools', href: '/free-tools', badge: 'FREE' as const },
  { label: 'Find Providers', href: '/find-providers' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-strong shadow-sm">
      <div className="layout-wrapper flex h-20 sm:h-22 lg:h-24 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="NDT Connect Home">
          <Logo size="sm" />
        </Link>

        {/* Desktop: Free Tools quick-access link */}
        <Link
          href="/free-tools"
          className="hidden md:inline-flex items-center gap-2 ml-6 mr-auto px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-brand hover:bg-brand/5 transition-colors"
        >
          Free Tools
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 tracking-wide">
            FREE
          </span>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-8 w-20 animate-pulse rounded-lg bg-brand/10"></div>
          ) : user ? (
            <>
              <NotificationBell />
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-brand/20 hover:ring-brand/40 transition-all p-0" aria-label="User menu">
                  {user.profileImageUrl ? (
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.profileImageUrl} alt={user.name ?? 'User'} data-ai-hint="user avatar" />
                      <AvatarFallback className="bg-brand/10 text-brand">
                        <UserCircle className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <DefaultAvatar name={user.name} size={36} />
                  )}
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
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex rounded-lg hover:text-brand hover:bg-brand/5">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="hidden sm:inline-flex rounded-lg bg-brand hover:bg-brand-dark text-white shadow-md shadow-brand/20">
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}

          {/* Mobile hamburger menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden h-11 w-11 p-0" aria-label="Open menu">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-slate-200">
                  <Logo />
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-brand transition-colors"
                      >
                        <span>{link.label}</span>
                        {'badge' in link && link.badge && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 tracking-wide">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                {!user && (
                  <div className="p-4 border-t border-slate-200 space-y-2">
                    <SheetClose asChild>
                      <Button asChild className="w-full bg-brand hover:bg-brand-dark text-white">
                        <Link href="/register">Get Started</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/login">Login</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
