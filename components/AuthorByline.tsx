import { Linkedin } from 'lucide-react';

export interface AuthorBylineProps {
  /** Author display name. */
  name?: string;
  /** Author title / credentials. */
  title?: string;
  /** LinkedIn profile URL (verify or replace placeholder). */
  linkedIn?: string;
  /** Avatar image src (placeholder allowed — file does not need to exist yet). */
  avatarSrc?: string;
  /** ISO date string the article / page was first published. */
  publishedDate?: string;
  /** ISO date string the article / page was last reviewed / updated. */
  updatedDate?: string;
  /** Optional compact mode (default true) — adds vertical padding when false. */
  compact?: boolean;
}

const DEFAULT_NAME = 'Anoop Rayavarapu';
const DEFAULT_TITLE = 'ASNT NDT Level III, Founder & CEO of Atlantis NDT';
// Placeholder — verify the actual public LinkedIn URL before launch.
const DEFAULT_LINKEDIN = 'https://www.linkedin.com/in/anoop-rayavarapu';
const DEFAULT_AVATAR = '/authors/anoop.jpg';

function formatDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return iso;
  }
}

/**
 * AuthorByline
 *
 * Renders a small E-E-A-T author block (avatar, name, credentials, dates) with
 * embedded schema.org Person JSON-LD pointing at LinkedIn for `sameAs`.
 *
 * Defaults to Anoop Rayavarapu (Founder/CEO, Atlantis NDT). Override props
 * per-page if needed — the schema regenerates from props.
 */
export default function AuthorByline({
  name = DEFAULT_NAME,
  title = DEFAULT_TITLE,
  linkedIn = DEFAULT_LINKEDIN,
  avatarSrc = DEFAULT_AVATAR,
  publishedDate,
  updatedDate,
  compact = true,
}: AuthorBylineProps) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: title,
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Atlantis NDT',
        url: 'https://atlantisndt.com',
      },
      {
        '@type': 'Organization',
        name: 'NDT Connect',
        url: 'https://ndt-connect.com',
      },
    ],
    sameAs: linkedIn ? [linkedIn] : undefined,
    image: avatarSrc,
  };

  const published = formatDate(publishedDate);
  const updated = formatDate(updatedDate);

  return (
    <aside
      className={
        'not-prose flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 ' +
        (compact ? '' : 'py-6 ')
      }
      aria-label={`About the author: ${name}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Avatar — uses next/image so we get optimised sizing even with a
          placeholder src. File at avatarSrc is referenced only; safe if absent
          during build (404 at runtime only). */}
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-200 ring-2 ring-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc}
          alt={name}
          width={48}
          height={48}
          className="h-12 w-12 object-cover"
          loading="lazy"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold text-slate-900">{name}</span>
          {linkedIn ? (
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#0a66c2] hover:underline"
              aria-label={`${name} on LinkedIn`}
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden />
              <span className="sr-only">LinkedIn</span>
            </a>
          ) : null}
        </div>

        <p className="mt-0.5 text-xs leading-snug text-slate-600">{title}</p>

        {(published || updated) && (
          <p className="mt-1 text-[11px] leading-tight text-slate-500">
            {published && (
              <>
                Published <time dateTime={publishedDate}>{published}</time>
              </>
            )}
            {published && updated && <span className="mx-1.5 text-slate-300">·</span>}
            {updated && (
              <>
                Updated <time dateTime={updatedDate}>{updated}</time>
              </>
            )}
          </p>
        )}
      </div>
    </aside>
  );
}
