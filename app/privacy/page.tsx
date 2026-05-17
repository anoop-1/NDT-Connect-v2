import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'NDT Connect privacy policy. Learn how we collect, use, and protect your personal information on our NDT inspection marketplace.',
  openGraph: {
    title: 'Privacy Policy',
    description: 'Learn how NDT Connect collects, uses, and protects your personal information.',
    url: 'https://ndt-connect.com/privacy',
    type: 'website',
    siteName: 'NDT Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy',
    description: 'Learn how NDT Connect collects, uses, and protects your personal information.',
  },
  alternates: {
    canonical: 'https://ndt-connect.com/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: April 8, 2026</p>

      <div className="prose prose-slate max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            NDT Connect (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), operated by Atlantis NDT, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ndt-connect.com and use our non-destructive testing marketplace platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
          <h3 className="text-xl font-medium mb-2">Personal Information</h3>
          <p className="text-muted-foreground leading-relaxed">
            When you register for an account, request an inspection, or list your services, we may collect: your name, email address, phone number, company name, business address, professional certifications, and payment information.
          </p>
          <h3 className="text-xl font-medium mb-2 mt-4">Usage Data</h3>
          <p className="text-muted-foreground leading-relaxed">
            We automatically collect information about your device and how you interact with our platform, including IP address, browser type, pages visited, time spent on pages, and referring URLs. We use Google Analytics to help analyze this data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use collected information to: operate and maintain our marketplace platform; match clients with qualified NDT service providers; process transactions and send related information; send administrative updates, security alerts, and support messages; improve our platform, products, and user experience; comply with legal obligations and enforce our terms of service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Information Sharing</h2>
          <p className="text-muted-foreground leading-relaxed">
            We do not sell your personal information. We may share information with: NDT service providers or clients as necessary to facilitate inspection requests; third-party service providers who assist in operating our platform (payment processors, analytics providers, hosting services); law enforcement or regulatory agencies when required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement industry-standard security measures including encryption, secure servers, and access controls to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Cookies and Tracking</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed">
            Depending on your jurisdiction, you may have the right to: access, correct, or delete your personal data; opt out of marketing communications; request a copy of your data in a portable format; withdraw consent for data processing. To exercise these rights, contact us at info@ndt-connect.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Third-Party Links</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Children&apos;s Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions about this Privacy Policy, please contact us at:
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
