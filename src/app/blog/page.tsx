// src/app/blog/page.tsx
// /blog — index of all blog posts. Server component (no "use client").
// Reads markdown files from src/content/blog/ at build time and renders a grid.

import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/free-tools/StructuredData";
import { getAllPosts } from "@/lib/blog";

const SITE = "https://ndt-connect.com";
const URL = `${SITE}/blog`;

export const metadata: Metadata = {
  title: "NDT Connect Blog — Free Resources for Inspection Companies",
  description:
    "Free guides on ultrasonic testing, NDT certifications, calibration intervals, RBI corrosion management, and more. Written for NDT inspection contractors.",
  alternates: { canonical: URL },
  openGraph: {
    title: "NDT Connect Blog — Free Resources for Inspection Companies",
    description:
      "Free guides on ultrasonic testing, NDT certifications, calibration intervals, RBI corrosion management, and more. Written for NDT inspection contractors.",
    url: URL,
    siteName: "NDT Connect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NDT Connect Blog",
    description: "Free guides for NDT inspection contractors.",
  },
  robots: { index: true, follow: true },
};

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

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: URL },
    ],
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${URL}#blog`,
    name: "NDT Connect Blog",
    description:
      "Free guides on ultrasonic testing, NDT certifications, calibration intervals, RBI corrosion management, and more.",
    url: URL,
    inLanguage: "en",
    publisher: { "@id": `${SITE}/#organization` },
    isPartOf: { "@id": `${SITE}/#website` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE}/blog/${p.slug}#post`,
      headline: p.title,
      description: p.description,
      url: `${SITE}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt,
      author: { "@type": "Organization", name: p.author },
    })),
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NDT Connect Blog Posts",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}/blog/${p.slug}`,
      name: p.title,
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${URL}#website-ref`,
    url: SITE,
    name: "NDT Connect",
    publisher: { "@id": `${SITE}/#organization` },
  };

  return (
    <article className="space-y-12">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={blogSchema} />
      <StructuredData data={itemListSchema} />
      <StructuredData data={websiteSchema} />

      <header className="text-center py-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
          Free resources for the inspection industry
        </p>
        <h1
          className="text-3xl md:text-5xl font-bold tracking-tight"
          style={{ color: "#004aad" }}
        >
          NDT Connect Blog
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Free guides on ultrasonic testing, NDT certifications, calibration intervals, RBI
          corrosion management, and more. Written for NDT inspection contractors.
        </p>
      </header>

      <section className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                <span aria-hidden>•</span>
                <span>{p.readingTime} min read</span>
              </div>
              <h2
                className="text-xl font-semibold mb-2 leading-snug"
                style={{ color: "#004aad" }}
              >
                {p.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {p.description}
              </p>
              {p.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block text-xs px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: "#E5EEF8",
                        color: "#004aad",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <span
                className="text-sm font-medium mt-auto"
                style={{ color: "#004aad" }}
              >
                Read article →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="container text-center py-12 rounded-lg"
        style={{ backgroundColor: "#F5F7FA" }}
      >
        <h2
          className="text-2xl md:text-3xl font-semibold mb-4"
          style={{ color: "#004aad" }}
        >
          Try the free tools
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Equipment registry, calibration alerts, and personnel + company certificate tracking — free
          for NDT companies. User ID only.
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
  );
}
