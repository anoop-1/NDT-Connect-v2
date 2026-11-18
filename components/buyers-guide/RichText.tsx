import { Fragment } from 'react';

/** Renders guide text: **bold** and [n] citation markers (linked to #ref-n). No HTML injection. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[\d+\])/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        const cite = p.match(/^\[(\d+)\]$/);
        if (cite) return <sup key={i}><a href={`#ref-${cite[1]}`} className="text-brand hover:underline" aria-label={`Reference ${cite[1]}`}>[{cite[1]}]</a></sup>;
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}
