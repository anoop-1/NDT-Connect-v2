
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import AdSenseScript from '@/components/ads/AdSenseScript';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';


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
    url: 'https://ndt-connect.com',
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
    canonical: 'https://ndt-connect.com',
  },
  verification: {
    google: 'afbI_z9kdB5yg6Sm11tqhvzz0M2iOo7Fb7jYCkgB460',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <AdSenseScript />
        <GoogleAnalytics />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-2 focus:left-2 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md">
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-grow layout-wrapper py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
