
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

const SITE = 'https://ndt-connect.com';

const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const fontMono = Roboto_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

// Default metadata used by routes that DO NOT export their own
// generateMetadata. Per-route exports override these field-by-field.
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'NDT Connect — Free Tools + Marketplace for NDT Companies',
    template: '%s | NDT Connect',
  },
  description:
    'Free equipment, calibration & certificate management for NDT companies. Plus a marketplace to find or offer inspection services. User ID only.',
  alternates: { canonical: SITE },
  openGraph: {
    type: 'website',
    siteName: 'NDT Connect',
    url: SITE,
    title: 'NDT Connect — Free Tools + Marketplace for NDT Companies',
    description:
      'Free equipment, calibration & certificate management for NDT companies. Plus a marketplace to find or offer inspection services.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NDT Connect',
    description: 'Free tools + marketplace for NDT inspection companies.',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  robots: { index: true, follow: true },
};

// Site-wide JSON-LD: Organization + WebSite (with SearchAction).
// Rendered once in the root layout so every page inherits it.
const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'NDT Connect',
      url: SITE,
      logo: `${SITE}/logo.png`,
      sameAs: [
        'https://atlantisndt.com',
      ],
      description:
        'NDT Connect is a marketplace and free SaaS platform for non-destructive testing companies — equipment management, calibration alerts, and personnel + company certification tracking.',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: 'NDT Connect',
      publisher: { '@id': `${SITE}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE}/find-providers?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning={true}
      >
        <GoogleAnalytics />
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
