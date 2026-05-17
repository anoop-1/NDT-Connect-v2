// components/seo/CityMethodContent.tsx
//
// JSX renderer for the unique per-(city, method) content blocks built by
// lib/content/city-method.ts. Lives outside both route files so the
// /cost-guide and /ndt-services pages share the same prose surface — that
// keeps Jaccard similarity within sibling pages low (which is the point of
// the rebuild) while letting the two routes layer their own surrounding
// chrome around it.
//
// Important: this component MUST NOT introduce client-side state. Every
// render path is deterministic on the (city, method) input so that Google
// crawls always see the same body — content churn between crawls is the
// fastest way to lose ranking on a programmatic SEO surface.

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText, MapPin, Scale, ShieldCheck, Wrench } from 'lucide-react';
import type { City } from '@/data/cities';
import {
  composeCityMethodContent,
  type CityMethodContent as ContentShape,
  type MethodProfile,
} from '@/lib/content/city-method';

interface Props {
  city: City;
  method: MethodProfile;
  /**
   * If a caller has already composed the content (e.g. to also render a
   * separate FAQ JSON-LD block from the same source), it can be passed in
   * here to avoid recomputing. Same hash key, same result either way.
   */
  prebuilt?: ContentShape;
  /**
   * `compact` strips the section headings and outer card padding. Used by
   * the cost-guide route which already wraps each section in its own Card.
   * The /ndt-services route renders the full version with headings.
   */
  variant?: 'full' | 'compact';
}

export function CityMethodContentBlocks({ city, method, prebuilt, variant = 'full' }: Props) {
  const content = prebuilt ?? composeCityMethodContent(city, method);
  const compact = variant === 'compact';

  return (
    <div className={compact ? 'space-y-6' : 'space-y-8'}>
      <BlockSection
        icon={<MapPin className="h-5 w-5 text-primary" />}
        block={content.localMarketOverview}
        compact={compact}
      />

      <BlockSection
        icon={<Wrench className="h-5 w-5 text-primary" />}
        block={content.whyMethodMatters}
        compact={compact}
      />

      <BlockSection
        icon={<Scale className="h-5 w-5 text-primary" />}
        block={content.regionalCodeReqs}
        compact={compact}
      />

      {/* Pricing block — special-cased to render the line-item rate card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            {content.pricingBreakdown.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {content.pricingBreakdown.paragraphs.map((p, i) => (
            <p key={i} className="text-sm text-slate-700 leading-relaxed mb-3">
              {p}
            </p>
          ))}
          {content.pricingBreakdown.lines && (
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {content.pricingBreakdown.lines.map((line, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-xs font-semibold text-slate-700">{line.label}</span>
                    <span className="text-sm font-bold text-primary">{line.amount}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{line.detail}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <BlockSection
        icon={<ShieldCheck className="h-5 w-5 text-primary" />}
        block={content.localProviders}
        compact={compact}
      />

      <BlockSection
        icon={<CheckCircle className="h-5 w-5 text-primary" />}
        block={content.certificationPath}
        compact={compact}
      />

      <BlockSection
        icon={<FileText className="h-5 w-5 text-primary" />}
        block={content.caseStudy}
        compact={compact}
      />

      {/* FAQs — kept here so both routes share the same answers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {method.code} in {city.name} — frequently asked questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {content.faqs.map((f, i) => (
              <details
                key={i}
                className="rounded-lg border border-slate-200 bg-white p-4 open:shadow-sm"
              >
                <summary className="cursor-pointer text-sm font-semibold text-primary">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Render a single content block. Keeps the title + paragraphs + bullets
 * pattern in one place so the seven non-pricing blocks all look consistent.
 */
function BlockSection({
  icon,
  block,
  compact,
}: {
  icon: React.ReactNode;
  block: { title: string; paragraphs: string[]; bullets?: string[] };
  compact: boolean;
}) {
  void compact;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {block.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {block.paragraphs.map((p, i) => (
          <p key={i} className="text-sm text-slate-700 leading-relaxed mb-3">
            {p}
          </p>
        ))}
        {block.bullets && block.bullets.length > 0 && (
          <ul className="mt-3 space-y-2">
            {block.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
