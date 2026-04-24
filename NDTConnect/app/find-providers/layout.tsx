import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find NDT Providers — Certified Inspectors Worldwide | NDT Connect',
  description: 'Search and connect with certified NDT inspection providers worldwide. Filter by location, testing method, industry, and certifications. Get quotes instantly on NDT Connect.',
  keywords: ['find NDT providers', 'NDT inspectors near me', 'NDT service providers', 'certified NDT inspectors', 'book NDT inspection', 'NDT companies near me', 'hire NDT inspector', 'NDT testing companies'],
  openGraph: {
    title: 'Find NDT Providers | Certified Inspectors Worldwide',
    description: 'Search and connect with certified NDT providers worldwide. Filter by method, location, and certification. Get instant quotes.',
    url: 'https://ndt-connect.com/find-providers',
    type: 'website',
    siteName: 'NDT Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find NDT Providers | NDT Connect',
    description: 'Search certified NDT providers worldwide. Get instant quotes.',
  },
  alternates: { canonical: 'https://ndt-connect.com/find-providers' },
};

const searchActionSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Find NDT Providers',
  url: 'https://ndt-connect.com/find-providers',
  description: 'Search and connect with certified NDT inspection providers worldwide.',
  mainEntity: {
    '@type': 'ItemList',
    name: 'NDT Service Providers Directory',
    description: 'Directory of verified and certified NDT inspection service providers',
    itemListElement: [],
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://ndt-connect.com/find-providers?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(searchActionSchema) }} />
      {children}
    </>
  );
}
