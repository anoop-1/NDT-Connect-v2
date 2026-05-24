import type { Metadata } from 'next';
import Link from 'next/link';
import AuthorByline from '@/components/AuthorByline';
import ProcedureGeneratorClient from './ProcedureGeneratorClient';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Free AI NDT Procedure Generator — ASME / ASNT / AWS Compliant',
  description:
    'Generate ultrasonic, radiographic, magnetic-particle and other NDT procedures in 60 seconds. Trusted by ASNT Level III inspectors. Free signup unlocks unlimited downloads.',
  alternates: { canonical: 'https://ndt-connect.com/tools/ndt-procedure-generator' },
  openGraph: {
    title: 'Free AI NDT Procedure Generator — ASME / ASNT / AWS Compliant',
    description:
      'Generate ultrasonic, radiographic, magnetic-particle and other NDT procedures in 60 seconds.',
    url: 'https://ndt-connect.com/tools/ndt-procedure-generator',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function ProcedureGeneratorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://ndt-connect.com/' },
          { name: 'Tools', url: 'https://ndt-connect.com/tools' },
          {
            name: 'AI Procedure Generator',
            url: 'https://ndt-connect.com/tools/ndt-procedure-generator',
          },
        ]}
      />

      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-foreground">AI Procedure Generator</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Free AI NDT Procedure Generator
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          Generate ASME-, ASNT- and AWS-compliant NDT written procedures in under a minute.
          Pick a method, describe the scope, and we&apos;ll draft a structured procedure you can
          review, save, and download.
        </p>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Anonymous preview: 1 generation per 24 hours.{' '}
          <Link href="/register?redirect=/tools/ndt-procedure-generator" className="font-semibold text-blue-600 underline">
            Sign up free
          </Link>{' '}
          for 5 generations per day and PDF downloads.
        </p>
      </header>

      <ProcedureGeneratorClient />

      <div className="mt-6">
        <AuthorByline
          publishedDate="2026-05-01"
          updatedDate={new Date().toISOString().slice(0, 10)}
        />
      </div>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="prose prose-slate mt-12 max-w-none">
        <h2>How it works</h2>
        <ol>
          <li>
            <strong>Pick a method.</strong> UT, RT, MT, PT, VT, PAUT, TOFD, or ECT — covering the
            full breadth of ASNT-recognised NDT methods.
          </li>
          <li>
            <strong>Describe the scope.</strong> Tell us what you&apos;re inspecting (e.g.
            &quot;ASME B31.3 process piping girth welds, 6&quot; Sch 80 carbon steel&quot;).
          </li>
          <li>
            <strong>Select the standard.</strong> ASME Section V, ASME B31.3, API 510 / 570 / 653 /
            1104, AWS D1.1, ISO 9712, ASTM E165, EN ISO 17640 — and more.
          </li>
          <li>
            <strong>Generate.</strong> The model drafts an 11-section procedure including
            personnel qualification, calibration, scanning technique, and acceptance criteria.
          </li>
          <li>
            <strong>Review and download.</strong> Sign up to save the draft, download as PDF, and
            request a Level III review from a certified inspector via NDT Connect.
          </li>
        </ol>

        <h2>What standards we support</h2>
        <p>
          The generator references the codes and recommended practices most commonly cited in
          industrial inspection contracts:
        </p>
        <ul>
          <li><strong>ASME Boiler &amp; Pressure Vessel Code</strong> — Section V (Articles 2, 4, 6, 7, 23, 24) and Section VIII Division 1 &amp; 2 referencing rules.</li>
          <li><strong>ASME B31.1 / B31.3 / B31.4 / B31.8</strong> — power piping, process piping, liquid &amp; gas pipelines.</li>
          <li><strong>API Inspection Codes</strong> — API 510 (pressure vessels), API 570 (in-service piping), API 653 (storage tanks), API 1104 (pipeline welding), API 579 (fitness-for-service), API 580/581 (RBI).</li>
          <li><strong>AWS</strong> — D1.1 (structural steel), D1.5 (bridges), D1.6 (stainless), D1.8 (seismic supplement).</li>
          <li><strong>ASTM</strong> — E165 (PT), E709 (MT), E1444 (aerospace MT), E317 (UT system performance), E2375 (wrought products UT).</li>
          <li><strong>ISO / EN</strong> — ISO 9712 (personnel), ISO 17640 (UT of welds), ISO 17636 (RT of welds), ISO 23279 (UT discontinuity characterisation), EN 4179 (aerospace).</li>
          <li><strong>ASNT Recommended Practices</strong> — SNT-TC-1A and CP-189 for personnel qualification.</li>
        </ul>

        <h2>Sample outputs</h2>
        <p>
          Browse{' '}
          <Link href="/tools/ndt-procedure-generator/examples">
            ten reference procedures
          </Link>{' '}
          covering UT, RT, MT, PT, PAUT, TOFD, and VT across pressure vessels, pipelines, storage
          tanks, structural steel, aerospace, and castings.
        </p>

        <h2>Limitations &amp; honest caveats</h2>
        <p>
          Every generated procedure is a <strong>working draft</strong>. AI assistance accelerates
          the boilerplate but does not replace a Level III reviewer. Before any procedure is
          released for production examination it must be:
        </p>
        <ul>
          <li>Reviewed and approved by a Level III certified per <strong>ASNT SNT-TC-1A</strong>, <strong>CP-189</strong>, or <strong>EN 4179</strong> as applicable to your written practice.</li>
          <li>Demonstrated / qualified per the governing construction or maintenance code (e.g. ASME Section V Article 1 T-150, AWS D1.1 procedure qualification).</li>
          <li>Cross-checked against the latest revision of the cited standards — codes update frequently and the AI may reference superseded clauses.</li>
          <li>Validated against site-specific safety, radiation, and quality-management requirements.</li>
        </ul>
        <p>
          NDT Connect provides this tool as a productivity aid for qualified inspection
          professionals. Outputs are not certified procedures and carry no warranty of code
          compliance. Use at your own discretion.
        </p>

        <h2>Need a Level III review?</h2>
        <p>
          <Link href="/find-providers" className="font-semibold">
            Connect with certified inspectors
          </Link>{' '}
          on NDT Connect to have your procedure formally qualified and signed off.
        </p>
      </section>
    </div>
  );
}
