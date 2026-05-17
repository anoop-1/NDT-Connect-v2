import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your NDT Connect account to manage inspection requests, connect with providers, and track NDT services.',
  alternates: { canonical: 'https://ndt-connect.com/login' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
