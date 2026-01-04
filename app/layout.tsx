
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';

const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const fontMono = Roboto_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NDT Connect - Real-Time NDT Inspection Services Platform',
  description: 'Book NDT inspection online. Connect with certified NDT service providers and freelance inspectors for UT, RT, PT, MT testing. Real-time tracking, instant quotes, and verified experts.',
  keywords: [
    'NDT services platform',
    'book NDT inspection online',
    'non-destructive testing marketplace',
    'real-time NDT inspection tracking',
    'UT RT PT inspection services',
    'ultrasonic testing services',
    'radiographic testing',
    'magnetic particle testing',
    'dye penetrant testing',
    'NDT inspector near me',
    'industrial inspection services',
    'pipeline inspection',
    'weld inspection',
    'corrosion mapping',
  ],
  authors: [{ name: 'NDT Connect' }],
  creator: 'NDT Connect',
  publisher: 'NDT Connect',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ndtconnect.com',
    siteName: 'NDT Connect',
    title: 'NDT Connect - Real-Time NDT Inspection Services Platform',
    description: 'Book NDT inspection online. Connect with certified NDT service providers and freelance inspectors. Real-time tracking and instant quotes.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NDT Connect - Industrial Inspection Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NDT Connect - Real-Time NDT Inspection Services',
    description: 'Book NDT inspection online. Connect with certified inspectors for UT, RT, PT, MT testing.',
    images: ['/twitter-image.jpg'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://ndtconnect.com',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <Header />
          <main className="flex-grow container py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
