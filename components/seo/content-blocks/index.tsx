// components/seo/content-blocks/index.tsx
//
// V2 content-block components for the city × method SEO surface. Each block
// is a thin React component that takes the per-block slice of the
// `GeneratedContent` object built by lib/seo/generate-page-content.ts.
//
// Layout philosophy
// -----------------
//   - Every block renders inside a Card with the same vertical rhythm so
//     /cost-guide and /ndt-services share a consistent look.
//   - Blocks are individually exported so route files can omit blocks they
//     do not need (e.g. cost-guide already has its own pricing hero band).
//   - `<CityMethodContentBlocksV2>` is the convenience renderer that drops
//     all seven in the canonical order.

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CheckCircle, MapPin, Scale, FileText, ShieldCheck,
  Wrench, Award, ArrowRight, Building2,
} from 'lucide-react';
import type { GeneratedContent } from '@/lib/seo/generate-page-content';

// ----------------------------------------------------------------------------
// 1. LocalMarketOverview
// ----------------------------------------------------------------------------

export function LocalMarketOverview({
  paragraphs,
  cityName,
}: {
  paragraphs: string[];
  cityName: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-primary" />
          Local market overview — {cityName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-sm text-slate-700 leading-relaxed mb-3 last:mb-0">
            {p}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------------
// 2. RegionalCodeContext
// ----------------------------------------------------------------------------

export function RegionalCodeContext({
  paragraph,
  codes,
  cityName,
  methodCode,
}: {
  paragraph: string;
  codes: string[];
  cityName: string;
  methodCode: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Scale className="h-5 w-5 text-primary" />
          Regional code context — {methodCode} in {cityName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-700 leading-relaxed mb-3">{paragraph}</p>
        {codes.length > 0 && (
          <ul className="mt-3 space-y-2">
            {codes.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------------
// 3. LocalPricingBreakdown
// ----------------------------------------------------------------------------

export function LocalPricingBreakdown({
  data,
  cityName,
  methodCode,
}: {
  data: GeneratedContent['localPricingBreakdown'];
  cityName: string;
  methodCode: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-primary" />
          Local pricing breakdown — {methodCode} in {cityName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">{data.paragraph}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase text-slate-500">
                <th className="py-2 pr-2">Line item</th>
                <th className="py-2 pr-2">Rate</th>
                <th className="py-2">Detail</th>
              </tr>
            </thead>
            <tbody>
              {data.table.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-b-0">
                  <td className="py-2 pr-2 font-medium text-slate-800">{row.label}</td>
                  <td className="py-2 pr-2 font-bold text-primary whitespace-nowrap">{row.value}</td>
                  <td className="py-2 text-xs text-slate-600">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Effective multiplier vs national base: ×{data.multiplier.toFixed(2)} ·
          transport surcharge band: {data.surchargeBand}.
        </p>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------------
// 4. TopLocalProviders
// ----------------------------------------------------------------------------

export function TopLocalProviders({
  data,
  cityName,
  methodCode,
}: {
  data: GeneratedContent['topLocalProviders'];
  cityName: string;
  methodCode: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Top local providers — {methodCode} in {cityName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">{data.paragraph}</p>
        {data.employerHighlights.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase text-slate-500 mb-2">
              Major regional clients served
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {data.employerHighlights.map((e, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-2 text-sm text-slate-800"
                >
                  <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link
          href={data.ctaHref}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
        >
          {data.ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------------
// 5. MethodInThisCity (most-unique block)
// ----------------------------------------------------------------------------

export function MethodInThisCity({
  paragraphs,
  cityName,
  methodCode,
}: {
  paragraphs: string[];
  cityName: string;
  methodCode: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wrench className="h-5 w-5 text-primary" />
          {methodCode} in {cityName} — local applications
        </CardTitle>
      </CardHeader>
      <CardContent>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-sm text-slate-700 leading-relaxed mb-3 last:mb-0">
            {p}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------------
// 6. LocalCertificationPath
// ----------------------------------------------------------------------------

export function LocalCertificationPath({
  data,
  cityName,
}: {
  data: GeneratedContent['localCertificationPath'];
  cityName: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-primary" />
          Local certification path — {cityName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-700 leading-relaxed mb-3">{data.paragraph}</p>
        <ul className="mt-3 space-y-2 text-sm">
          {data.asntChapter && (
            <li className="flex items-start gap-2 text-slate-700">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                <span className="font-semibold">ASNT chapter: </span>
                {data.asntChapter}
              </span>
            </li>
          )}
          {data.awsSection && (
            <li className="flex items-start gap-2 text-slate-700">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                <span className="font-semibold">AWS section: </span>
                {data.awsSection}
              </span>
            </li>
          )}
          <li className="flex items-start gap-2 text-slate-700">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <span>
              <span className="font-semibold">API exam centre: </span>
              {data.apiExamCenter ? 'hosted locally' : 'access via nearest regional centre'}
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------------
// 7. CityFAQ
// ----------------------------------------------------------------------------

export function CityFAQ({
  faqs,
  cityName,
  methodCode,
}: {
  faqs: GeneratedContent['cityFAQ'];
  cityName: string;
  methodCode: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {methodCode} in {cityName} — frequently asked questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="rounded-lg border border-slate-200 bg-white p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer text-sm font-semibold text-primary">
                {f.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.answer}</p>
            </details>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------------
// Composite renderer — drops all seven in canonical order. Use this in route
// files that want the full v2 stack; reach for the named exports above for
// a-la-carte assembly.
// ----------------------------------------------------------------------------

export function CityMethodContentBlocksV2({ content }: { content: GeneratedContent }) {
  return (
    <div className="space-y-6">
      <LocalMarketOverview
        paragraphs={content.localMarketOverview}
        cityName={content.cityName}
      />
      <RegionalCodeContext
        paragraph={content.regionalCodeContext.paragraph}
        codes={content.regionalCodeContext.codes}
        cityName={content.cityName}
        methodCode={content.methodCode}
      />
      <LocalPricingBreakdown
        data={content.localPricingBreakdown}
        cityName={content.cityName}
        methodCode={content.methodCode}
      />
      <TopLocalProviders
        data={content.topLocalProviders}
        cityName={content.cityName}
        methodCode={content.methodCode}
      />
      <MethodInThisCity
        paragraphs={content.methodInThisCity}
        cityName={content.cityName}
        methodCode={content.methodCode}
      />
      <LocalCertificationPath
        data={content.localCertificationPath}
        cityName={content.cityName}
      />
      <CityFAQ
        faqs={content.cityFAQ}
        cityName={content.cityName}
        methodCode={content.methodCode}
      />
    </div>
  );
}
