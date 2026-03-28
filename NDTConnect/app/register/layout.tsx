import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Free Account | NDT Connect — The #1 NDT Marketplace',
  description: 'Join NDT Connect for free. Create your account as an asset owner to find NDT providers, or as a service provider to grow your inspection business.',
  keywords: ['NDT Connect register', 'NDT account', 'join NDT marketplace', 'NDT provider signup'],
  alternates: { canonical: 'https://ndt-connect.com/register' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
