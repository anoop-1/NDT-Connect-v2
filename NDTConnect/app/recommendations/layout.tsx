import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDT Provider Recommendations | NDT Connect',
  description: 'Get AI-powered NDT provider recommendations based on your inspection requirements, location, and budget.',
  alternates: { canonical: 'https://ndt-connect.com/recommendations' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
