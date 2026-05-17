// src/app/free-tools/ai-procedure-generator/page.tsx
// AI-powered NDT Procedure Generator (sign-in gated landing).
// Marketing landing only — generation flow lives at /tools/ndt-procedure-generator
// once signed in. Server component, SEO-optimised.

import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/free-tools/StructuredData";
import { BreadcrumbListSchema } from "@/components/seo/SchemaMarkup";

const SITE = "https://ndt-connect.com";
const URL = `${SITE}/free-tools/ai-procedure-generator`;

const TITLE =
  "AI NDT Procedure Generator — ASME Section V, API 510/570/653, AWS D1.1";
const DESCRIPTION =
  "AI-generated NDT procedures for ASME Section V, API 510/570/653 and AWS D1.1. Pick method, material, thickness, code and acceptance criteria. Free with sign-in.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "NDT Connect",
    type: "website",
    images: [`${SITE}/og/free-tools-ai-procedure-generator.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI NDT Procedure Generator",
    description:
      "ASME Section V / API 510/570/653 / AWS D1.1 procedures in 60 seconds. Free with sign-in.",
    images: [`${SITE}/og/free-tools-ai-procedure-generator.png`],
  },
  keywords: [
    "ndt procedure generator",
    "free ndt procedure template",
    "ai weld inspection procedure",
    "asme section v procedure generator",
    "api 510 inspection procedure",
    "aws d1.1 ut procedure",
  ],
};

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Why is sign-in required?",
    a: "AI procedure generation is compute-intensive and the generated procedure is attached to your account so you can revise, version-control and re-export it. A free account also gives us a way to deduplicate abuse and protect free-tier capacity for legitimate users. Sign-up is one click — email, password, done.",
  },
  {
    q: "Which codes and standards does the generator follow?",
    a: "ASME BPVC Section V (UT, RT, MT, PT, ET, VT, LT articles), ASME Section VIII Division 1 and 2 acceptance criteria, ASME B31.1, B31.3 and B31.8 piping, API 510 (Pressure Vessel Inspection Code), API 570 (Piping Inspection Code), API 653 (ASTs), API RP 1169 (pipeline construction), AWS D1.1 (structural steel) and D1.5 (bridges), ISO 17640 / 17638 / 3452 / 9934, EN 13018 / 12668. The generator cites the exact paragraph used for each acceptance criterion in the output.",
  },
  {
    q: "What inputs does the generator take?",
    a: "Method (UT / RT / MT / PT / VT / PAUT / TOFD / ECT), material grade (carbon steel, stainless, aluminium, titanium, Inconel, duplex, super duplex), thickness range, joint geometry (butt, fillet, tee, branch, nozzle), governing code (ASME / API / AWS / ISO), acceptance criteria (workmanship vs. fitness-for-service), surface temperature, ambient conditions, and any client-specific overrides (e.g. NORSOK M-101 supplementary requirements).",
  },
  {
    q: "Is the output ready to submit to a customer or AI?",
    a: "The output is a structured draft procedure suitable for review by your Level III. It includes scope, applicable codes, equipment, calibration, scanning technique, recording, evaluation, acceptance criteria, reporting and revision history. Your Level III must review, sign and approve it before use — the generator does not replace human qualification per ASNT SNT-TC-1A or your written practice.",
  },
  {
    q: "Can I revise and re-generate?",
    a: "Yes. Every generation is saved to your account. Edit any section in the procedure editor, add a custom clause, or re-run with different inputs. Version history is preserved.",
  },
  {
    q: "What does the procedure look like — PDF, Word, both?",
    a: "Export as PDF (signature-ready, with revision-history table), Word (.docx, fully editable), or HTML for inclusion in a customer pre-job package. The free tier includes all three formats.",
  },
  {
    q: "Is there a per-procedure fee?",
    a: "No. The free tier covers a generous monthly generation cap suitable for solo Level III consultants and small inspection houses. Paid plans on NDT Connect lift the cap and add bulk procedure libraries, customer-branded templates and audit-controlled approvals.",
  },
];

const SOFTWARE_APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NDT Connect — AI Procedure Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web (any modern browser)",
  description: DESCRIPTION,
  url: URL,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  publisher: { "@type": "Organization", name: "NDT Connect", url: SITE },
  featureList: [
    "ASME Section V Article 4/5/6/7/8/9/10 procedure generation",
    "API 510 / 570 / 653 / 1169 in-service inspection procedures",
    "AWS D1.1 / D1.5 structural-steel weld procedures",
    "ISO 17640 / 17638 / 3452 / 9934 international procedures",
    "PAUT and TOFD scanning technique sheets",
    "PDF, Word (.docx) and HTML export",
    "Sign-in gated, free monthly generation cap",
    "Version history per procedure",
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AiProcedureGeneratorPage() {
  return (
    <article className="space-y-12">
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: SITE },
          { name: "Free Tools", url: `${SITE}/free-tools` },
          { name: "AI Procedure Generator", url: URL },
        ]}
      />
      <StructuredData data={SOFTWARE_APP_SCHEMA} />
      <StructuredData data={FAQ_SCHEMA} />

      <header className="text-center py-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
          Sign-in gated · Free monthly generation cap · No credit card
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "#004aad" }}>
          AI NDT Procedure Generator
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Generate ASME Section V, API 510 / 570 / 653 and AWS D1.1-compliant NDT procedures in
          under a minute. Pick the method, material, thickness, governing code and acceptance
          criteria. We draft the procedure for your Level III to review and sign.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/register?redirect=/tools/ndt-procedure-generator"
            className="inline-block px-6 py-3 text-white text-base font-medium rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#004aad" }}
          >
            Sign up free to generate
          </Link>
          <Link
            href="/login?redirect=/tools/ndt-procedure-generator"
            className="inline-block px-6 py-3 text-base font-medium rounded-lg border hover:opacity-90 transition-colors"
            style={{ color: "#004aad", borderColor: "#004aad" }}
          >
            Sign in
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          No card. No trial expiry. Sign-in gated to protect free-tier capacity.
        </p>
      </header>

      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: "#0B1E33" }}>
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold mb-2" style={{ color: "#004aad" }}>1</div>
            <h3 className="font-semibold mb-2">Describe the inspection</h3>
            <p className="text-sm text-muted-foreground">
              Pick the NDT method (UT, RT, MT, PT, PAUT, TOFD, ET, VT). Enter the material,
              thickness range, joint geometry, governing code, and acceptance criteria.
              Add any client overrides (NORSOK, Shell DEP, customer spec).
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold mb-2" style={{ color: "#004aad" }}>2</div>
            <h3 className="font-semibold mb-2">AI drafts the procedure</h3>
            <p className="text-sm text-muted-foreground">
              The model produces a structured procedure: scope, applicable codes,
              personnel qualification, equipment, calibration, scanning technique,
              recording, evaluation, acceptance, reporting. Citations to the exact
              code paragraph used.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold mb-2" style={{ color: "#004aad" }}>3</div>
            <h3 className="font-semibold mb-2">Level III review and sign</h3>
            <p className="text-sm text-muted-foreground">
              Edit any section in the procedure editor. Export to PDF, Word or HTML.
              Your Level III reviews and signs per your written practice. Version
              history is preserved on every revision.
            </p>
          </div>
        </div>
      </section>

      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#0B1E33" }}>
          Features
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { t: "Every major code on day one", d: "ASME Section V (Articles 4 through 10), Section VIII Div 1 & 2, B31.1/3/8, API 510/570/653/1169, AWS D1.1/D1.5, ISO 17640/17638/3452/9934. Each procedure cites the paragraph used." },
            { t: "Materials and joints", d: "Carbon, stainless, duplex, super duplex, aluminium, titanium, Inconel. Butt, fillet, tee, branch, nozzle, set-on, set-in, partial-pen joints. Thickness ranges supported from 1 mm to >100 mm." },
            { t: "PAUT and TOFD technique sheets", d: "Phased-array sectorial and linear scans with focal-law rationale. TOFD setup with PCS, mode-conversion handling and dead-zone treatment. AUT scan plans for pipeline girth welds." },
            { t: "Three export formats", d: "PDF for signature, Word .docx for client-template branding, HTML for inclusion in a digital pre-job package. Free tier covers all three." },
            { t: "Sign-in gated only", d: "Free generation, no card. Sign-in protects free-tier capacity from abuse and ties every procedure to your account for version history." },
            { t: "Roadmap: customer-branded templates", d: "Paid plans add customer-branded procedure libraries, multi-Level-III approval workflow, and direct push into the NDT Connect ERP for job-specific procedure issue." },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2" style={{ color: "#004aad" }}>{f.t}</h3>
              <p className="text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#0B1E33" }}>
          Frequently asked questions
        </h2>
        <div className="space-y-6">
          {FAQS.map((f, i) => (
            <div key={i}>
              <h3 className="font-semibold mb-2" style={{ color: "#0B1E33" }}>{f.q}</h3>
              <p className="text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#0B1E33" }}>
          Related reading
        </h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <ul className="space-y-2">
            <li><a href="https://weld-inspection-pro.com/asme-section-ix" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>ASME Section IX guide →</a></li>
            <li><a href="https://weld-inspection-pro.com/aws-d1-1-guide" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>AWS D1.1 guide →</a></li>
            <li><a href="https://ndt-standards-reference.com/api-510" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>API 510 reference →</a></li>
          </ul>
          <ul className="space-y-2">
            <li><Link href="/services/ultrasonic-testing" className="hover:underline" style={{ color: "#004aad" }}>UT inspection services →</Link></li>
            <li><Link href="/services/radiographic-testing" className="hover:underline" style={{ color: "#004aad" }}>RT inspection services →</Link></li>
          </ul>
          <ul className="space-y-2">
            <li><a href="https://atlantisndt.com/ndt-certifications" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>Atlantis NDT certifications →</a></li>
            <li><Link href="/tools/ndt-procedure-generator/examples" className="hover:underline" style={{ color: "#004aad" }}>See example outputs →</Link></li>
          </ul>
        </div>
      </section>

      <section className="container text-center py-12 rounded-lg" style={{ backgroundColor: "#F5F7FA" }}>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#004aad" }}>
          Ready to draft your first procedure?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Sign up free in 60 seconds. Generate your first ASME / API / AWS procedure today.
          Paid NDT Connect plans add customer-branded templates, multi-Level-III approval and
          direct push into the ERP for job-specific procedure issue.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/register?redirect=/tools/ndt-procedure-generator"
            className="inline-block px-6 py-3 text-white text-base font-medium rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#004aad" }}
          >
            Sign up free
          </Link>
          <Link
            href="/pricing"
            className="inline-block px-6 py-3 text-base font-medium rounded-lg border hover:opacity-90 transition-colors"
            style={{ color: "#004aad", borderColor: "#004aad" }}
          >
            See paid plans
          </Link>
        </div>
      </section>
    </article>
  );
}
