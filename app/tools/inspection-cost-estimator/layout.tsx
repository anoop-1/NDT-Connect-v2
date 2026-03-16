import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDT Inspection Cost Estimator — Get Instant Quotes | NDT Connect',
  description: 'Estimate the cost of your NDT inspection project with our free cost calculator. Get pricing estimates for UT, RT, MT, PT, PAUT, TOFD, and more.',
  keywords: ['NDT cost estimator', 'inspection cost', 'NDT pricing', 'NDT quote', 'inspection estimate'],
  openGraph: {
    title: 'NDT Inspection Cost Estimator | NDT Connect',
    description: 'Get instant cost estimates for your NDT inspection project. Free online calculator.',
    url: 'https://ndt-connect.com/tools/inspection-cost-estimator',
  },
  alternates: { canonical: 'https://ndt-connect.com/tools/inspection-cost-estimator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
