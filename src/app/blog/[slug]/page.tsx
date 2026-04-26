// src/app/blog/[slug]/page.tsx
// /blog/[slug] — dynamic blog post page. Server component (no "use client").
// Reads the markdown file at build time, renders it via react-markdown + remark-gfm.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { StructuredData } from "@/components/free-tools/StructuredData";
import {
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
  type BlogPost,
  type BlogPostMeta,
} from "@/lib/blog";

const SITE = "https://ndt-connect.com";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: "Post not found — NDT Connect Blog" };
  }
  const url = `${SITE}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "NDT Connect",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    robots: { index: true, follow: true },
  };
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

/**
 * Deterministic-ish "random" pick of N posts other than `excludeSlug`.
 * Uses a hash of the excluded slug as a seed so output is stable per page.
 */
function pickRelated(all: BlogPostMeta[], excludeSlug: string, n: number): BlogPostMeta[] {
  const others = all.filter((p) => p.slug !== excludeSlug);
  if (others.length <= n) return others;
  let seed = 0;
  for (let i = 0; i < excludeSlug.length; i++) {
    seed = (seed * 31 + excludeSlug.charCodeAt(i)) >>> 0;
  }
  // Lehmer LCG for a cheap deterministic shuffle.
  const sorted = [...others];
  for (let i = sorted.length - 1; i > 0; i--) {
    seed = (seed * 48271) % 0x7fffffff;
    const j = seed % (i + 1);
    [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
  }
  return sorted.slice(0, n);
}

export default function BlogPostPage({ params }: PageProps) {
  const post: BlogPost | null = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const url = `${SITE}/blog/${post.slug}`;
  const heroImage = `${SITE}/og-blog-default.png`;
  const all = getAllPosts();
  const related = pickRelated(all, post.slug, 3);

  const authorEntity =
    post.author === "NDT Connect Editorial"
      ? {
          "@type": "Organization",
          name: "NDT Connect Editorial",
          url: SITE,
        }
      : {
          "@type": "Person",
          name: post.author,
        };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": ["BlogPosting", "Article"],
    "@id": `${url}#post`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: authorEntity,
    publisher: {
      "@type": "Organization",
      name: "NDT Connect",
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/logo.png`,
      },
    },
    image: heroImage,
    keywords: post.tags.join(", "),
    inLanguage: "en",
    isPartOf: { "@id": `${SITE}/blog#blog` },
    wordCount: post.wordCount,
    articleSection: post.tags[0] || "NDT",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <div className="space-y-12">
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10 max-w-6xl mx-auto">
        <article className="min-w-0">
          <nav className="text-sm mb-6" aria-label="Breadcrumb">
            <Link href="/" style={{ color: "#004aad" }}>Home</Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <Link href="/blog" style={{ color: "#004aad" }}>Blog</Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-muted-foreground">{post.title}</span>
          </nav>

          <header className="mb-10 pb-8 border-b">
            <h1
              className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4"
              style={{ color: "#0B1E33" }}
            >
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{post.description}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span>By <strong style={{ color: "#0B1E33" }}>{post.author}</strong></span>
              <span aria-hidden>•</span>
              <time dateTime={post.publishedAt}>Published {formatDate(post.publishedAt)}</time>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <>
                  <span aria-hidden>•</span>
                  <time dateTime={post.updatedAt}>Updated {formatDate(post.updatedAt)}</time>
                </>
              )}
              <span aria-hidden>•</span>
              <span>{post.readingTime} min read</span>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block text-xs px-2 py-1 rounded"
                    style={{ backgroundColor: "#E5EEF8", color: "#004aad" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div
            className="
              prose prose-slate max-w-none
              prose-headings:font-semibold prose-headings:tracking-tight
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-a:underline-offset-2
              prose-strong:text-slate-900
              prose-code:before:content-none prose-code:after:content-none
              prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-slate-900 prose-pre:text-slate-100
              prose-img:rounded-lg
            "
            style={{
              // Headings + links inherit brand color via inline overrides on the wrapper.
              ['--tw-prose-headings' as string]: "#0B1E33",
              ['--tw-prose-links' as string]: "#004aad",
              ['--tw-prose-bold' as string]: "#0B1E33",
              ['--tw-prose-bullets' as string]: "#004aad",
              ['--tw-prose-counters' as string]: "#004aad",
              ['--tw-prose-quote-borders' as string]: "#004aad",
            } as React.CSSProperties}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>

          <footer className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Written by <strong style={{ color: "#0B1E33" }}>{post.author}</strong>
              {post.updatedAt ? <> — Last updated {formatDate(post.updatedAt)}</> : null}
            </p>
          </footer>

          <section
            className="mt-12 text-center py-12 rounded-lg"
            style={{ backgroundColor: "#F5F7FA" }}
          >
            <h2
              className="text-2xl md:text-3xl font-semibold mb-4"
              style={{ color: "#004aad" }}
            >
              Try it free
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Equipment registry, calibration alerts, and personnel + company certificate tracking — free
              for NDT companies. User ID only, no credit card.
            </p>
            <Link
              href="/free-tools"
              className="inline-block px-6 py-3 text-white text-base font-medium rounded-lg hover:opacity-90 transition-colors"
              style={{ backgroundColor: "#004aad" }}
            >
              See all free tools
            </Link>
          </section>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
          <div className="p-6 rounded-lg border bg-card">
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "#0B1E33" }}
            >
              Related posts
            </h2>
            <ul className="space-y-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`} className="block group">
                    <p
                      className="text-sm font-medium group-hover:underline"
                      style={{ color: "#004aad" }}
                    >
                      {r.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(r.publishedAt)} · {r.readingTime} min read
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <h2
              className="text-lg font-semibold mb-2"
              style={{ color: "#0B1E33" }}
            >
              Free tools for inspection companies
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Stop tracking equipment in spreadsheets. Calibration alerts, certificates,
              and registry — free.
            </p>
            <Link
              href="/free-tools"
              className="inline-block text-sm font-medium"
              style={{ color: "#004aad" }}
            >
              Explore free tools →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
