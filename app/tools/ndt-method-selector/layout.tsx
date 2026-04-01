import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDT Method Selector Tool — Find the Right Testing Method | NDT Connect',
  description: 'Use our free interactive tool to determine the best non-destructive testing method for your application. Answer a few questions and get expert NDT method recommendations.',
  keywords: ['NDT method selector', 'choose NDT method', 'testing method guide', 'which NDT method', 'NDT method comparison'],
  openGraph: {
    title: 'NDT Method Selector Tool | NDT Connect',
    description: 'Find the right NDT method for your application with our free interactive selector tool.',
    url: 'https://ndt-connect.com/tools/ndt-method-selector',
    type: 'website',
    siteName: 'NDT Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NDT Method Selector Tool | NDT Connect',
    description: 'Interactive tool to find the best NDT method for your needs.',
  },
  alternates: { canonical: 'https://ndt-connect.com/tools/ndt-method-selector' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
