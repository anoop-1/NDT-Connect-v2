// src/app/privacy/page.tsx
// /privacy — placeholder Privacy Policy page pending legal review.
// Server component (no "use client"). Self-canonical metadata.

import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/free-tools/StructuredData";

const SITE = "https://ndt-connect.com";
const URL = `${SITE}/privacy`;
const LAST_UPDATED = "2026-04-26";

export const metadata: Metadata = {
  title: "Privacy Policy — NDT Connect",
  description:
    "How NDT Connect collects, uses, and protects your data. Covers cookies, third-party services (Mapbox, Stripe, Pusher, Firebase), GDPR and CCPA rights, retention, and contact details.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Privacy Policy — NDT Connect",
    description:
      "How NDT Connect collects, uses, and protects your data. Covers cookies, GDPR, CCPA, third-party services, retention, and contact details.",
    url: URL,
    siteName: "NDT Connect",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy — NDT Connect",
    description: "How NDT Connect collects, uses, and protects your data.",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: URL },
    ],
  };
  const policySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy — NDT Connect",
    url: URL,
    inLanguage: "en",
    dateModified: LAST_UPDATED,
    isPartOf: { "@id": `${SITE}/#website` },
    publisher: { "@id": `${SITE}/#organization` },
  };

  return (
    <article className="space-y-10 max-w-4xl mx-auto">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={policySchema} />

      <header className="text-center py-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
          Last updated {LAST_UPDATED}
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "#004aad" }}>
          Privacy Policy
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          How NDT Connect collects, uses, and safeguards information when you use our website and free tools.
        </p>
      </header>

      <section
        className="container p-6 rounded-lg border"
        style={{ borderColor: "#F0B429", backgroundColor: "#FFF8E5" }}
      >
        <p className="text-sm" style={{ color: "#0B1E33" }}>
          <strong>Notice:</strong> This is a placeholder pending legal review. Last updated {LAST_UPDATED}.
          The text below is provided for transparency while our counsel finalises the production policy.
          For specific questions about your data, contact{" "}
          <a href="mailto:info@ndtconnect.com" style={{ color: "#004aad" }}>info@ndtconnect.com</a>.
        </p>
      </section>

      <nav className="container p-6 rounded-lg border bg-card" aria-label="Table of contents">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Table of contents
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li><a href="#information-we-collect" style={{ color: "#004aad" }}>Information we collect</a></li>
          <li><a href="#how-we-use-it" style={{ color: "#004aad" }}>How we use it</a></li>
          <li><a href="#cookies-local-storage" style={{ color: "#004aad" }}>Cookies and local storage</a></li>
          <li><a href="#third-party-services" style={{ color: "#004aad" }}>Third-party services</a></li>
          <li><a href="#your-rights" style={{ color: "#004aad" }}>Your rights (GDPR, CCPA, etc.)</a></li>
          <li><a href="#data-retention" style={{ color: "#004aad" }}>Data retention</a></li>
          <li><a href="#childrens-privacy" style={{ color: "#004aad" }}>Children&apos;s privacy</a></li>
          <li><a href="#changes-to-this-policy" style={{ color: "#004aad" }}>Changes to this policy</a></li>
          <li><a href="#contact-us" style={{ color: "#004aad" }}>Contact us</a></li>
        </ol>
      </nav>

      <section className="container space-y-4">
        <h2 id="information-we-collect" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          1. Information we collect
        </h2>
        <p>
          NDT Connect collects information you provide directly to us, information generated automatically when you
          use our services, and information from third-party providers necessary to deliver our marketplace and free
          tools. Account information includes your name, business email, company name, phone number, region, and the
          credentials and certifications you choose to upload (for example, ASNT Level II/III, ISO 9712, CWB, or API
          inspector certificates). When you list equipment, calibrations, or personnel records inside our free tools,
          that data is stored under your account and treated as confidential business data.
        </p>
        <p>
          Usage information is collected automatically and includes IP address, device type, browser, operating system,
          referring URL, pages viewed, search terms entered into our find-providers search, time-on-page, and approximate
          geolocation derived from your IP. When you contact a provider through the marketplace, we log the message
          metadata (sender, recipient, timestamp) and the message body. When you upload files to your equipment registry,
          calibration tracker, or certificate manager, we store the file in encrypted object storage along with file
          metadata such as filename, size, MIME type, and upload timestamp.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="how-we-use-it" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          2. How we use it
        </h2>
        <p>
          We use the information we collect to operate, maintain, and improve NDT Connect; to authenticate you and
          protect your account; to deliver calibration and certificate-expiry notifications you have configured; to
          surface inspection providers in response to your search queries; to facilitate payments for paid services
          where applicable; to detect and prevent fraud and abuse; to analyse aggregate usage patterns so we can improve
          our user experience; and to communicate with you about service updates, security incidents, and (with your
          consent) marketing messages. We do not sell personal information. We do not use your equipment, calibration,
          or personnel records to train any machine-learning model that is shared outside your account.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="cookies-local-storage" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          3. Cookies and local storage
        </h2>
        <p>
          We use first-party cookies, browser local storage, and session storage to keep you signed in, remember your
          preferences (such as units of measurement), and maintain shopping or messaging state during a session. We use
          a small number of strictly-necessary third-party cookies for analytics (Google Analytics 4) and for fraud
          prevention. You can control cookies through your browser settings; disabling them may break sign-in, the map,
          and the messaging features. We do not use cross-site advertising cookies or pixels at this time.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="third-party-services" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          4. Third-party services
        </h2>
        <p>
          We rely on a small set of trusted sub-processors to deliver core functionality. Each is contractually bound
          to confidentiality and data-protection terms.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Mapbox</strong> — renders the provider-search map and resolves geocoding queries. Mapbox sees your IP and approximate location.</li>
          <li><strong>Stripe</strong> — processes payments for any paid services. Card data is sent directly to Stripe and never touches our servers.</li>
          <li><strong>Pusher</strong> — powers real-time messaging and presence in the marketplace. Pusher sees the message channel ID and payload during transit.</li>
          <li><strong>Firebase</strong> — used for push notifications, file storage, and selected authentication flows. Firebase is operated by Google LLC.</li>
          <li><strong>Google Analytics 4</strong> — measures aggregate site usage. IPs are anonymised before storage.</li>
          <li><strong>Cloud hosting providers</strong> — our application and database are hosted on commercial cloud infrastructure with industry-standard physical and network security.</li>
        </ul>
      </section>

      <section className="container space-y-4">
        <h2 id="your-rights" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          5. Your rights (GDPR, CCPA, etc.)
        </h2>
        <p>
          If you are located in the European Economic Area, the United Kingdom, or Switzerland, the General Data
          Protection Regulation (GDPR) gives you the right to access, rectify, erase, restrict processing of, and port
          your personal data, as well as to object to processing and to withdraw consent. If you are a California
          resident, the California Consumer Privacy Act (CCPA) and CPRA give you the right to know what personal
          information we collect, to delete it, to correct it, to opt out of any sale or sharing of personal information
          (we do not sell or share), and to non-discrimination for exercising these rights. Residents of Virginia,
          Colorado, Connecticut, and other US states with comprehensive privacy laws have substantially similar rights.
        </p>
        <p>
          To exercise any right, email{" "}
          <a href="mailto:info@ndtconnect.com" style={{ color: "#004aad" }}>info@ndtconnect.com</a> from the address
          associated with your account. We will respond within the statutory window (30 days under GDPR, 45 days under
          CCPA). We may need to verify your identity before completing the request.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="data-retention" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          6. Data retention
        </h2>
        <p>
          We retain account data for as long as your account is active, plus a reasonable wind-down period after closure
          for legal, accounting, and dispute-resolution purposes (typically up to seven years for transactional records).
          Equipment, calibration, and certificate records remain in your account until you delete them or close the
          account. Backups are rotated on a 30-day cycle, except for long-term off-site backups that are retained
          indefinitely for disaster-recovery purposes; these are encrypted at rest and not actively queried. You may
          request expedited deletion at any time via the contact address below.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="childrens-privacy" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          7. Children&apos;s privacy
        </h2>
        <p>
          NDT Connect is a business-to-business platform for inspection professionals and companies. It is not directed
          to children under 16, and we do not knowingly collect personal information from anyone under 16. If you
          believe a minor has provided us with personal information, contact us and we will delete it promptly.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="changes-to-this-policy" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          8. Changes to this policy
        </h2>
        <p>
          We may update this policy from time to time to reflect changes in our practices, technology, legal
          requirements, or other factors. Material changes will be announced by email to the address on your account
          and by an in-product notice at least 14 days before they take effect. The &ldquo;last updated&rdquo; date at
          the top of this page always reflects the most recent revision.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="contact-us" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          9. Contact us
        </h2>
        <p>
          For privacy questions, data-subject requests, or to designate an authorised agent under CCPA, email{" "}
          <a href="mailto:info@ndtconnect.com" style={{ color: "#004aad" }}>info@ndtconnect.com</a>. You may also
          review our <Link href="/terms" style={{ color: "#004aad" }}>Terms of Service</Link> for additional information
          about your use of NDT Connect.
        </p>
      </section>
    </article>
  );
}
