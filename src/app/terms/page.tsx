// src/app/terms/page.tsx
// /terms — placeholder Terms of Service pending legal review.
// Server component (no "use client"). Self-canonical metadata.

import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/free-tools/StructuredData";

const SITE = "https://ndt-connect.com";
const URL = `${SITE}/terms`;
const LAST_UPDATED = "2026-04-26";

export const metadata: Metadata = {
  title: "Terms of Service — NDT Connect",
  description:
    "Terms governing use of NDT Connect — free tools, marketplace conduct rules, provider and client responsibilities, disclaimers, limitation of liability, and Delaware governing law.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Terms of Service — NDT Connect",
    description:
      "Terms governing use of NDT Connect — free tools, marketplace, provider and client responsibilities, disclaimers, and governing law.",
    url: URL,
    siteName: "NDT Connect",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service — NDT Connect",
    description: "Terms governing use of NDT Connect.",
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Terms of Service", item: URL },
    ],
  };
  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service — NDT Connect",
    url: URL,
    inLanguage: "en",
    dateModified: LAST_UPDATED,
    isPartOf: { "@id": `${SITE}/#website` },
    publisher: { "@id": `${SITE}/#organization` },
  };

  return (
    <article className="space-y-10 max-w-4xl mx-auto">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={termsSchema} />

      <header className="text-center py-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
          Last updated {LAST_UPDATED}
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "#004aad" }}>
          Terms of Service
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          The agreement between you and NDT Connect when you use our marketplace and free tools.
        </p>
      </header>

      <section
        className="container p-6 rounded-lg border"
        style={{ borderColor: "#F0B429", backgroundColor: "#FFF8E5" }}
      >
        <p className="text-sm" style={{ color: "#0B1E33" }}>
          <strong>Notice:</strong> This is a placeholder pending legal review. Last updated {LAST_UPDATED}.
          The text below is provided for transparency while our counsel finalises production terms. For specific
          questions, contact{" "}
          <a href="mailto:info@ndtconnect.com" style={{ color: "#004aad" }}>info@ndtconnect.com</a>.
        </p>
      </section>

      <nav className="container p-6 rounded-lg border bg-card" aria-label="Table of contents">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Table of contents
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li><a href="#acceptance" style={{ color: "#004aad" }}>Acceptance of terms</a></li>
          <li><a href="#account-registration" style={{ color: "#004aad" }}>Account registration</a></li>
          <li><a href="#free-tools" style={{ color: "#004aad" }}>Free tools (equipment, calibration, certifications)</a></li>
          <li><a href="#marketplace-conduct" style={{ color: "#004aad" }}>Marketplace conduct rules</a></li>
          <li><a href="#provider-responsibilities" style={{ color: "#004aad" }}>Provider responsibilities</a></li>
          <li><a href="#client-responsibilities" style={{ color: "#004aad" }}>Client responsibilities</a></li>
          <li><a href="#intellectual-property" style={{ color: "#004aad" }}>Intellectual property</a></li>
          <li><a href="#disclaimers" style={{ color: "#004aad" }}>Disclaimers</a></li>
          <li><a href="#limitation-of-liability" style={{ color: "#004aad" }}>Limitation of liability</a></li>
          <li><a href="#indemnification" style={{ color: "#004aad" }}>Indemnification</a></li>
          <li><a href="#governing-law" style={{ color: "#004aad" }}>Governing law</a></li>
          <li><a href="#contact" style={{ color: "#004aad" }}>Contact</a></li>
        </ol>
      </nav>

      <section className="container space-y-4">
        <h2 id="acceptance" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          1. Acceptance of terms
        </h2>
        <p>
          These Terms of Service (the &ldquo;Terms&rdquo;) form a binding agreement between you (whether acting on your
          own behalf or on behalf of an organisation) and NDT Connect. By creating an account, accessing the website,
          or using any of our free tools or marketplace features, you confirm that you have read, understood, and
          agree to be bound by these Terms and our{" "}
          <Link href="/privacy" style={{ color: "#004aad" }}>Privacy Policy</Link>. If you do not agree, do not use
          NDT Connect. If you accept these Terms on behalf of a company, you represent that you have authority to
          bind that company.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="account-registration" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          2. Account registration
        </h2>
        <p>
          You must be at least 18 years old and capable of forming a binding contract to register. You agree to
          provide accurate, current, and complete information and to keep it up to date. You are responsible for all
          activity that occurs under your account, including the actions of personnel you invite to your company
          workspace. You must keep credentials confidential and notify us immediately of any unauthorised use. We may
          suspend or terminate accounts that we reasonably believe are fraudulent, abusive, or in violation of these
          Terms or applicable law.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="free-tools" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          3. Free tools (equipment, calibration, certifications) — what&apos;s free, what&apos;s not
        </h2>
        <p>
          Our equipment registry, calibration tracker, and personnel-and-company certificate manager are free to use
          for individual NDT professionals and inspection companies, with no credit card required and no trial expiry.
          &ldquo;Free&rdquo; means we do not charge a per-seat or subscription fee for the core features as they are
          described on our marketing pages on the access date. Free does not mean unmetered: we may impose reasonable
          fair-use limits (file size, item count, API request rate) to protect platform stability, and we will publish
          those limits in product when they apply. Optional premium add-ons such as accredited calibration-lab booking,
          ERP integrations, advanced analytics, custom branding, single sign-on, or priority support may be paid; pricing
          will be disclosed before you incur any charge. We reserve the right to change which features are free, with
          at least 30 days&rsquo; advance notice for any feature you actively use.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="marketplace-conduct" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          4. Marketplace conduct rules
        </h2>
        <p>
          When using the marketplace to find or offer inspection services, you agree not to: (a) post false, misleading,
          or fraudulent information about your services, qualifications, or certifications; (b) circumvent platform
          messaging to evade fees on chargeable transactions; (c) harass, threaten, or discriminate against other users;
          (d) post content that infringes intellectual-property rights or violates confidentiality obligations; (e) use
          the platform to facilitate illegal work or work that violates the codes of practice (ASNT, ISO 9712, API,
          ASME, AWS, CWB, etc.) you claim to follow; or (f) attempt to scrape, reverse-engineer, or overload the
          platform. Violations may result in content removal, account suspension, or permanent termination.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="provider-responsibilities" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          5. Provider responsibilities
        </h2>
        <p>
          If you offer inspection services through NDT Connect, you are an independent contractor. You are solely
          responsible for: holding all licenses, certifications, and insurance required by your jurisdiction and by the
          applicable code of practice; maintaining current ASNT SNT-TC-1A, CP-189, ISO 9712, CWB, API, or equivalent
          credentials for the methods you advertise; calibrating instruments per your written practice; producing
          legally compliant inspection reports; complying with site safety, environmental, and labour laws; collecting
          and remitting any taxes; and resolving any quality, scope, or payment disputes with the client. NDT Connect
          does not employ providers and does not supervise the technical work.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="client-responsibilities" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          6. Client responsibilities
        </h2>
        <p>
          If you engage an inspection provider through the marketplace, you are responsible for: independently verifying
          the provider&apos;s qualifications and insurance for your specific scope; defining the work clearly (codes,
          acceptance criteria, deliverables, schedule); providing safe site access and any required permits; supplying
          accurate technical information about the asset to be inspected; reviewing inspection deliverables and
          escalating concerns through documented channels; and paying any agreed fees promptly. NDT Connect is a
          venue for finding providers; the contract for services is directly between you and the provider.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="intellectual-property" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          7. Intellectual property
        </h2>
        <p>
          NDT Connect, including its software, design, copy, logos, and aggregated data, is owned by NDT Connect or
          its licensors and is protected by intellectual-property laws. We grant you a limited, non-exclusive,
          non-transferable, revocable license to use the platform for its intended purpose. You retain all rights to
          the data you upload (your equipment lists, calibration records, certificates, reports) and grant NDT Connect
          a limited license to host, process, and display that data solely to provide the services to you. You may
          not copy, modify, distribute, sell, or create derivative works of the platform itself.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="disclaimers" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          8. Disclaimers
        </h2>
        <p>
          The platform is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties
          of any kind, express or implied, including merchantability, fitness for a particular purpose, and
          non-infringement. <strong>NDT Connect is a software platform and a venue for connecting parties; it is not
          a warranty for the quality, accuracy, completeness, or code-compliance of any inspection performed by a
          provider listed on the platform.</strong> Calibration reminders, certificate-expiry alerts, and similar
          notifications are convenience tools; you remain responsible for your own compliance under your written
          practice and the applicable code. We do not guarantee that the platform will be uninterrupted, error-free,
          or secure against every conceivable threat.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="limitation-of-liability" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          9. Limitation of liability
        </h2>
        <p>
          To the maximum extent permitted by law, NDT Connect, its officers, directors, employees, and agents shall
          not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, including
          loss of profits, revenue, data, goodwill, or business opportunity, arising out of or in connection with your
          use of the platform, even if advised of the possibility of such damages. Our aggregate liability for any
          claim arising from these Terms or your use of the platform shall not exceed the greater of (a) the amount
          you paid to NDT Connect in the twelve months preceding the claim, or (b) one hundred US dollars (USD 100).
          Some jurisdictions do not allow these limitations; in such jurisdictions our liability is limited to the
          smallest amount permitted by law.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="indemnification" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          10. Indemnification
        </h2>
        <p>
          You agree to defend, indemnify, and hold harmless NDT Connect and its affiliates from and against any
          third-party claims, damages, liabilities, losses, costs, and expenses (including reasonable legal fees)
          arising from: your breach of these Terms; your violation of any law or third-party right; your inspection
          work or the deliverables you produce; any content you upload; and any dispute between you and another
          platform user. We reserve the right to assume the exclusive defence of any matter for which you owe
          indemnification, in which case you will cooperate with us at your expense.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="governing-law" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          11. Governing law
        </h2>
        <p>
          These Terms are governed by the laws of the State of Delaware, USA, without regard to its conflict-of-laws
          principles. The state and federal courts located in Delaware shall have exclusive jurisdiction over any
          dispute arising from these Terms or your use of the platform, and you consent to personal jurisdiction in
          those courts. The United Nations Convention on Contracts for the International Sale of Goods does not apply.
          If any provision of these Terms is held unenforceable, the remaining provisions remain in full force.
        </p>
      </section>

      <section className="container space-y-4">
        <h2 id="contact" className="text-2xl md:text-3xl font-semibold scroll-mt-24" style={{ color: "#0B1E33" }}>
          12. Contact
        </h2>
        <p>
          Questions about these Terms? Email{" "}
          <a href="mailto:info@ndtconnect.com" style={{ color: "#004aad" }}>info@ndtconnect.com</a>. For
          information about how we handle your data, see our{" "}
          <Link href="/privacy" style={{ color: "#004aad" }}>Privacy Policy</Link>.
        </p>
      </section>
    </article>
  );
}
