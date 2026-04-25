// app/find-providers/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find NDT Inspection Providers Near You | NDT Connect',
  description: 'Search verified NDT service providers by location, method, and certification. Find ultrasonic testing, radiographic testing, and all NDT inspection companies near you.',
  keywords: ['find NDT providers', 'NDT inspection near me', 'NDT service companies', 'find NDT inspector', 'NDT testing companies near me', 'hire NDT inspector'],
  openGraph: {
    title: 'Find NDT Providers | NDT Connect',
    description: 'Search verified NDT service providers by location, method, and certification.',
    url: 'https://ndt-connect.com/find-providers',
    type: 'website',
    siteName: 'NDT Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find NDT Providers | NDT Connect',
    description: 'Search verified NDT service providers by location, method, and certification.',
  },
  alternates: { canonical: 'https://ndt-connect.com/find-providers' },
};

export default function FindProvidersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
