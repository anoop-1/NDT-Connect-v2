import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find NDT Providers — Certified Inspectors Worldwide | NDT Connect',
  description: 'Search and connect with certified NDT inspection providers worldwide. Filter by location, testing method, industry, and certifications. Get quotes instantly.',
  keywords: ['find NDT providers', 'NDT inspectors near me', 'NDT service providers', 'certified NDT inspectors', 'book NDT inspection'],
  openGraph: {
    title: 'Find NDT Providers | NDT Connect',
    description: 'Search certified NDT providers worldwide. Filter by method, location, and certification.',
    url: 'https://ndt-connect.com/find-providers',
  },
  alternates: { canonical: 'https://ndt-connect.com/find-providers' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
