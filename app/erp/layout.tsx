import type { Metadata } from 'next';
import ErpShell from '@/components/erp/ErpShell';

export const metadata: Metadata = {
  title: 'NDT ERP — Free business software for inspection companies',
  robots: { index: false, follow: false },
};

export default function ErpLayout({ children }: { children: React.ReactNode }) {
  return <ErpShell>{children}</ErpShell>;
}
