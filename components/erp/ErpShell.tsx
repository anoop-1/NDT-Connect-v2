'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Activity, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { MODULES, GROUP_ORDER } from '@/lib/erp/modules';
import { ErpIcon } from './icons';

const EXISTING = [  // tools that already live in the provider dashboard
  { href: '/provider-dashboard/certifications', label: 'Certifications', icon: 'Award' },
  { href: '/provider-dashboard/equipment', label: 'Equipment', icon: 'Wrench' },
  { href: '/provider-dashboard/calibration', label: 'Calibration Alerts', icon: 'CalendarClock' },
  { href: '/provider-dashboard/ai-procedure-writer', label: 'Procedure Writer', icon: 'FileSignature' },
];

export default function ErpShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter(); const path = usePathname() || '';
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!loading && !user) router.push(`/login?redirect=${encodeURIComponent(path)}`); }, [loading, user, router, path]);
  useEffect(() => setOpen(false), [path]);
  if (path.startsWith('/erp/print/')) return <>{children}</>;
  if (loading || !user) return <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground"><Activity className="mr-2 h-5 w-5 animate-spin" />Loading your ERP…</div>;

  const item = (href: string, label: string, icon: string) => {
    const active = href === '/erp' ? path === '/erp' : path.startsWith(href);
    return (
      <Link key={href} href={href} className={`flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors ${active ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:bg-muted'}`}>
        <ErpIcon name={icon} className="h-4 w-4 shrink-0" />{label}
      </Link>
    );
  };
  const nav = (
    <nav className="space-y-5">
      <div className="space-y-0.5">{item('/erp', 'Overview', 'LayoutDashboard')}</div>
      {GROUP_ORDER.map(g => (
        <div key={g}>
          <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{g}</p>
          <div className="space-y-0.5">
            {MODULES.filter(m => m.group === g).map(m => item(`/erp/${m.key}`, m.label, m.icon))}
            {g === 'Assets' && EXISTING.slice(1, 3).map(e => item(e.href, e.label, e.icon))}
            {g === 'People' && item(EXISTING[0].href, EXISTING[0].label, EXISTING[0].icon)}
            {g === 'Operations' && item(EXISTING[3].href, EXISTING[3].label, EXISTING[3].icon)}
            {g === 'Setup' && item('/erp/settings', 'Company & Letterhead', 'Settings')}
          </div>
        </div>
      ))}
    </nav>
  );
  return (
    <div className="mx-auto flex max-w-[1400px] gap-6">
      <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-60 shrink-0 overflow-y-auto border-r pr-4 lg:block">
        <div className="mb-4 px-3"><p className="text-lg font-bold">NDT ERP</p><p className="text-xs text-muted-foreground">Free for NDT-Connect members</p></div>
        {nav}
      </aside>
      <div className="min-w-0 flex-1">
        <button onClick={() => setOpen(true)} className="mb-4 inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm lg:hidden"><Menu className="h-4 w-4" />ERP menu</button>
        {open && (
          <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setOpen(false)}>
            <div className="h-full w-72 overflow-y-auto bg-background p-4" onClick={e => e.stopPropagation()}>
              <button onClick={() => setOpen(false)} className="mb-3 ml-auto flex" aria-label="Close menu"><X className="h-5 w-5" /></button>{nav}
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
