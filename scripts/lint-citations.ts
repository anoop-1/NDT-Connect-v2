/* eslint-disable no-console */
/**
 * lint-citations.ts
 *
 * Advisory (non-blocking) scan for unsupported claim phrases — "studies show",
 * "experts agree", "research has shown", "it is well known" — that lack an
 * adjacent reference link or a standards citation like ASME / ASTM / ISO / ASNT
 * followed by a number.
 *
 * Output: warnings only. Always exits 0 so it doesn't block CI.
 * Run:  npm run lint-citations
 *
 * Scans:
 *   - All .md / .mdx under content/  (if the directory exists)
 *   - String literals inside data/cities.ts, data/cities-tier2.ts, data/cities-tier3-4.ts
 */

import { promises as fs } from 'node:fs';
import * as path from 'node:path';

const ROOT = path.resolve(__dirname, '..');

// Detect "studies show", "experts agree", "research has shown", "it is well known"
const CLAIM_RX = /\b(studies show|experts agree|research has shown|it is well known)\b/i;

// Reference proximity check — same line OR line above/below.
// A reference is any markdown link, raw URL, or standards code (ASME / ASTM / ISO / ASNT / API)
// followed by at least one digit somewhere in the immediate context.
const REF_RX = /(\]\(https?:\/\/|https?:\/\/|(?:ASME|ASTM|ISO|ASNT|API)\s*[A-Z0-9\-./]*\d)/i;

const CONTENT_DIRS = ['content'];
const DATA_FILES = ['data/cities.ts', 'data/cities-tier2.ts', 'data/cities-tier3-4.ts'];

interface Warning {
  file: string;
  line: number;
  phrase: string;
  context: string;
}

async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function walkMarkdown(dir: string): Promise<string[]> {
  const out: string[] = [];
  let entries: import('node:fs').Dirent[];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      out.push(...(await walkMarkdown(full)));
    } else if (ent.isFile() && (ent.name.endsWith('.md') || ent.name.endsWith('.mdx'))) {
      out.push(full);
    }
  }
  return out;
}

function scanLines(file: string, lines: string[]): Warning[] {
  const out: Warning[] = [];
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    const m = ln.match(CLAIM_RX);
    if (!m) continue;
    // Build a 3-line context window for reference detection.
    const window = [lines[i - 1] ?? '', ln, lines[i + 1] ?? ''].join(' ');
    if (REF_RX.test(window)) continue; // claim is supported nearby → skip
    out.push({
      file,
      line: i + 1,
      phrase: m[0],
      context: ln.trim().slice(0, 160),
    });
  }
  return out;
}

async function lintMarkdownTree(): Promise<Warning[]> {
  const all: Warning[] = [];
  for (const d of CONTENT_DIRS) {
    const full = path.join(ROOT, d);
    if (!(await exists(full))) continue;
    const files = await walkMarkdown(full);
    for (const f of files) {
      const text = await fs.readFile(f, 'utf8');
      const rel = path.relative(ROOT, f).replace(/\\/g, '/');
      all.push(...scanLines(rel, text.split(/\r?\n/)));
    }
  }
  return all;
}

async function lintDataFiles(): Promise<Warning[]> {
  const all: Warning[] = [];
  for (const rel of DATA_FILES) {
    const full = path.join(ROOT, rel);
    if (!(await exists(full))) continue;
    const text = await fs.readFile(full, 'utf8');
    // We deliberately scan the raw source. The CLAIM_RX is specific enough
    // (multi-word phrases) that scanning literally is fine — it will only
    // ever match inside string literals or comments.
    all.push(...scanLines(rel, text.split(/\r?\n/)));
  }
  return all;
}

async function main(): Promise<void> {
  console.log('[citations] Scanning content/ and data/ for unsupported-claim phrases…');

  const [md, data] = await Promise.all([lintMarkdownTree(), lintDataFiles()]);
  const warnings = [...md, ...data];

  if (warnings.length === 0) {
    console.log('[citations] OK — 0 warnings. (Advisory check.)');
    return;
  }

  console.log(`[citations] ${warnings.length} advisory warning(s):\n`);
  for (const w of warnings) {
    console.log(`  ${w.file}:${w.line}  "${w.phrase}"`);
    console.log(`    → ${w.context}`);
  }
  console.log(
    '\n[citations] Hint: add an inline link or a standards reference ' +
      '(e.g. "ASME B31.3", "ISO 9712", "ASTM E1444") near the claim ' +
      'within the same paragraph to silence the warning.',
  );
  console.log('[citations] Advisory only — not failing the build.');
}

main().catch((err) => {
  console.error('[citations] Scanner crashed:', err);
  // Still exit 0 — advisory only.
  process.exit(0);
});
