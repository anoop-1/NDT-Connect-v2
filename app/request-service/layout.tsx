import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request NDT Inspection Service',
  description: 'Submit an NDT inspection service request and get matched with certified providers. Specify your testing method, location, and requirements.',
  alternates: { canonical: 'https://ndt-connect.com/request-service' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
