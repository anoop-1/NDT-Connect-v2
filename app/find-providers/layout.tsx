// app/find-providers/layout.tsx
import { Metadata } from 'next';
import { BreadcrumbListSchema, FAQSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Find NDT Inspection Providers Near You',
  description: 'Search verified NDT service providers by location, method, and certification. Find ultrasonic testing, radiographic testing, and all NDT inspection companies near you.',
  keywords: ['find NDT providers', 'NDT inspection near me', 'NDT service companies', 'find NDT inspector', 'NDT testing companies near me', 'hire NDT inspector'],
  openGraph: {
    title: 'Find NDT Providers',
    description: 'Search verified NDT service providers by location, method, and certification.',
    url: 'https://ndt-connect.com/find-providers',
    type: 'website',
    siteName: 'NDT Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find NDT Providers',
    description: 'Search verified NDT service providers by location, method, and certification.',
  },
  alternates: { canonical: 'https://ndt-connect.com/find-providers' },
};

// FAQ — answers the high-impression "near me" / "how do I find" queries
// that surface in GSC for /find-providers without producing clicks. Schema
// is page-level (server-rendered via layout) so search engines see it
// regardless of the auth-gated client-side UI.
const findProviderFaqs = [
  {
    question: 'How do I find a certified NDT inspection company near me?',
    answer:
      'Use NDT Connect to search the verified provider directory by city, country, NDT method, and personnel certification (ASNT, ISO 9712, PCN, CGSB). Results filter to companies with current ISO/IEC 17020 or 17025 accreditation and Level II / III technicians on-roster. Post a scope and receive parallel quotes from certified providers within 24–72 hours.',
  },
  {
    question: 'What certifications should an NDT service provider hold?',
    answer:
      'Look for company-level accreditation under ISO/IEC 17020 (inspection bodies) or ISO/IEC 17025 (testing labs), plus quality management under ISO 9001 or API Q1. For aerospace work, Nadcap and AS9100 are essential. Personnel should be qualified to ASNT SNT-TC-1A, NAS 410, or ISO 9712 Level II / III in the methods they perform.',
  },
  {
    question: 'How fast can NDT inspectors mobilise to my site?',
    answer:
      'Routine NDT scopes posted on NDT Connect are typically picked up within 24–72 hours of the request. Turnaround and outage windows are negotiated against contractor crew rotation. Remote sites add a per-trip mobilisation charge; metro and Gulf Coast jobs usually see same-week response.',
  },
  {
    question: 'Are providers on NDT Connect verified?',
    answer:
      'Yes. Every provider profile on NDT Connect carries verified company accreditation, personnel certification status, and service-method coverage. Verified-only filtering is one click on the Find Providers page so procurement teams can short-list against their qualified-vendor list before posting a scope.',
  },
  {
    question: 'Do I need to register to compare NDT providers?',
    answer:
      'You can browse verified providers and read company profiles without an account. Posting a job request — required to receive quotes — needs a free user ID so providers can route their response back to you and so any follow-up correspondence stays inside the platform.',
  },
  {
    question: 'Which NDT methods can I source through NDT Connect?',
    answer:
      'All major and advanced methods: ultrasonic (UT), radiographic (RT), magnetic particle (MT), liquid penetrant (PT), eddy current (ECT), visual (VT), phased array (PAUT), TOFD, guided wave (GWT/LRUT), magnetic flux leakage (MFL), acoustic emission (AET), thermography (IRT), and ACFM. Filter by method on the Find Providers page.',
  },
];

export default function FindProvidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: 'https://ndt-connect.com' },
          { name: 'Find Providers', url: 'https://ndt-connect.com/find-providers' },
        ]}
      />
      <FAQSchema questions={findProviderFaqs} />
      {children}
    </>
  );
}
