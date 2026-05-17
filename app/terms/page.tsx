import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'NDT Connect terms of service. Read the terms and conditions governing use of our NDT inspection marketplace platform.',
  openGraph: {
    title: 'Terms of Service',
    description: 'Terms and conditions governing use of the NDT Connect marketplace platform.',
    url: 'https://ndt-connect.com/terms',
    type: 'website',
    siteName: 'NDT Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service',
    description: 'Terms and conditions governing use of the NDT Connect marketplace platform.',
  },
  alternates: {
    canonical: 'https://ndt-connect.com/terms',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: April 8, 2026</p>

      <div className="prose prose-slate max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using NDT Connect (ndt-connect.com), operated by Atlantis NDT, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
          <p className="text-muted-foreground leading-relaxed">
            NDT Connect is an online marketplace that connects asset owners and clients with certified non-destructive testing (NDT) service providers and freelance inspectors. We facilitate the discovery, communication, and booking of NDT inspection services but do not perform inspections ourselves.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
          <p className="text-muted-foreground leading-relaxed">
            To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. User Types and Responsibilities</h2>
          <h3 className="text-xl font-medium mb-2">Clients (Asset Owners)</h3>
          <p className="text-muted-foreground leading-relaxed">
            Clients may post inspection requests, browse service providers, request quotes, and book inspections. Clients are responsible for providing accurate project details and making timely payments for services rendered.
          </p>
          <h3 className="text-xl font-medium mb-2 mt-4">Service Providers</h3>
          <p className="text-muted-foreground leading-relaxed">
            Service providers may create profiles, list their services and certifications, respond to inspection requests, and submit quotes. Providers are responsible for maintaining valid certifications, delivering services as agreed, and complying with all applicable industry standards and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Certification Verification</h2>
          <p className="text-muted-foreground leading-relaxed">
            While NDT Connect makes reasonable efforts to verify provider certifications, we do not guarantee the accuracy, completeness, or validity of any certifications or qualifications listed on the platform. Clients should independently verify provider credentials for safety-critical inspections.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Payments and Fees</h2>
          <p className="text-muted-foreground leading-relaxed">
            NDT Connect may charge service fees for transactions facilitated through the platform. All fees will be clearly disclosed before any transaction is completed. Payment terms and conditions will be specified at the time of booking.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            NDT Connect acts as a marketplace facilitator and is not a party to the agreements between clients and service providers. We are not liable for the quality, safety, legality, or timeliness of inspection services provided through our platform. Our liability is limited to the maximum extent permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            All content on NDT Connect, including text, graphics, logos, and software, is the property of Atlantis NDT or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Prohibited Conduct</h2>
          <p className="text-muted-foreground leading-relaxed">
            Users may not: use the platform for any unlawful purpose; impersonate any person or entity; submit false or misleading information; interfere with the proper working of the platform; attempt to gain unauthorized access to any systems or data; use automated means to scrape or collect data from the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our sole discretion. Upon termination, your right to use the platform ceases immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">11. Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed">
            These Terms of Service are governed by and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">12. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify these Terms of Service at any time. We will notify users of material changes by posting the updated terms on this page. Continued use of the platform after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">13. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions about these Terms of Service, please contact us at:
          </p>
          <div className="mt-2 text-muted-foreground">
            <p><strong>NDT Connect by Atlantis NDT</strong></p>
            <p>Houston, TX, USA</p>
            <p>Email: info@ndt-connect.com</p>
            <p>Phone: +1-281-840-8969</p>
          </div>
        </section>
      </div>
    </div>
  );
}
