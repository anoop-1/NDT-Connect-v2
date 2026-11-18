import { Building2, FileText, Briefcase, Clock, ClipboardCheck, Receipt, ShoppingCart, Wallet, PackageCheck, Wrench, Users, Truck, PieChart, LayoutDashboard, Settings, Award, CalendarClock, FileSignature, LucideIcon } from 'lucide-react';

export const ERP_ICONS: Record<string, LucideIcon> = {
  Building2, FileText, Briefcase, Clock, ClipboardCheck, Receipt, ShoppingCart, Wallet, PackageCheck, Wrench, Users, Truck, PieChart,
  LayoutDashboard, Settings, Award, CalendarClock, FileSignature,
};
export function ErpIcon({ name, className }: { name: string; className?: string }) {
  const I = ERP_ICONS[name] ?? FileText;
  return <I className={className} />;
}
