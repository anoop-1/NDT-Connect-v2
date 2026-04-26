// src/lib/blog.ts
// Server-only helpers for reading markdown blog posts from src/content/blog.
// Inline frontmatter parser — no gray-matter dependency.
//
// Usage from a server component:
//   import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog";
//
// Frontmatter shape (all required strings except tags which is a YAML list):
//   ---
//   title: "..."
//   slug: "..."
//   description: "..."
//   publishedAt: "YYYY-MM-DD"
//   updatedAt: "YYYY-MM-DD"
//   author: "..."
//   tags: ["a", "b"]
//   ---

import fs from "fs";
import path from "path";

export interface BlogFrontmatter {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
}

export interface BlogPostMeta extends BlogFrontmatter {
  readingTime: number; // in whole minutes, min 1
  wordCount: number;
}

export interface BlogPost extends BlogPostMeta {
  body: string; // markdown body without frontmatter
}

const POSTS_DIR = path.join(process.cwd(), "src", "content", "blog");

/**
 * Parse a YAML scalar value. Strips matched single/double quotes and trims.
 */
function parseScalar(raw: string): string {
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

/**
 * Parse a YAML inline list like ["a", "b", 'c', d].
 */
function parseInlineList(raw: string): string[] {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
    return [];
  }
  const inner = trimmed.slice(1, -1);
  if (!inner.trim()) return [];
  // Split on commas not inside quotes.
  const items: string[] = [];
  let cur = "";
  let inQuote: '"' | "'" | null = null;
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (inQuote) {
      if (ch === inQuote) {
        inQuote = null;
      }
      cur += ch;
    } else if (ch === '"' || ch === "'") {
      inQuote = ch;
      cur += ch;
    } else if (ch === ",") {
      items.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) items.push(cur);
  return items.map(parseScalar).filter(Boolean);
}

/**
 * Minimal YAML frontmatter parser. Supports flat key: value pairs where value
 * is a quoted/unquoted scalar or an inline JSON-style list.
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const fmMatch = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!fmMatch) {
    return { data: {}, body: raw };
  }
  const yamlBlock = fmMatch[1];
  const body = fmMatch[2] ?? "";
  const data: Record<string, unknown> = {};
  for (const line of yamlBlock.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (value.startsWith("[")) {
      data[key] = parseInlineList(value);
    } else {
      data[key] = parseScalar(value);
    }
  }
  return { data, body };
}

function toFrontmatter(data: Record<string, unknown>, fallbackSlug: string): BlogFrontmatter {
  const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];
  return {
    title: typeof data.title === "string" ? data.title : "Untitled",
    slug: typeof data.slug === "string" ? data.slug : fallbackSlug,
    description: typeof data.description === "string" ? data.description : "",
    publishedAt: typeof data.publishedAt === "string" ? data.publishedAt : "",
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : "",
    author: typeof data.author === "string" ? data.author : "NDT Connect Editorial",
    tags,
  };
}

function countWords(markdown: string): number {
  // Strip code fences and inline code, then split on whitespace.
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#*_>\-\[\]\(\)]/g, " ");
  const tokens = stripped.split(/\s+/).filter(Boolean);
  return tokens.length;
}

function readingMinutes(wordCount: number): number {
  // 220 wpm — typical adult reading rate for technical content.
  return Math.max(1, Math.round(wordCount / 220));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, body } = parseFrontmatter(raw);
  const fm = toFrontmatter(data, slug);
  const wordCount = countWords(body);
  return {
    ...fm,
    body,
    wordCount,
    readingTime: readingMinutes(wordCount),
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      // Strip body for meta-only consumers.
      const { body: _body, ...meta } = post;
      void _body;
      return meta;
    })
    .filter((p): p is BlogPostMeta => p !== null)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}
