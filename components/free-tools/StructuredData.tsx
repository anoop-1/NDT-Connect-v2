// src/components/free-tools/StructuredData.tsx
// Server-only JSON-LD emitter. Renders a <script type="application/ld+json">
// directly into the page; no client JS needed. Use one component per schema
// graph type so that Search Console attributes them cleanly.

import React from "react";

interface Props {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function StructuredData({ data }: Props) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
