import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDT Provider Map — Find Inspectors Near You',
  description: 'Interactive map to find certified NDT inspection providers near your location. View provider profiles, certifications, and service areas.',
  alternates: { canonical: 'https://ndt-connect.com/find-providers/map' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
