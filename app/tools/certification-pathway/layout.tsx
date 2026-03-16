import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDT Certification Pathway Planner — Plan Your NDT Career | NDT Connect',
  description: 'Plan your NDT certification journey with our free interactive tool. Get personalized recommendations for ASNT, ISO 9712, PCN, API, and AWS certifications based on your goals.',
  keywords: ['NDT certification pathway', 'NDT certification guide', 'ASNT certification', 'ISO 9712', 'NDT career planning'],
  openGraph: {
    title: 'NDT Certification Pathway Planner | NDT Connect',
    description: 'Plan your NDT certification journey. Get personalized certification recommendations.',
    url: 'https://ndt-connect.com/tools/certification-pathway',
  },
  alternates: { canonical: 'https://ndt-connect.com/tools/certification-pathway' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
