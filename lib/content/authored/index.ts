// Lazy registry of all authored content modules. Each loader returns the
// module's default export (typed). Used by dynamic route templates so we can
// add a new content page just by dropping a file into the right folder.
//
// Note: dynamic import is used so that build-time slug generation (in
// generateStaticParams) can enumerate files via fs at build time. Each route
// reads its own folder.

import { readdirSync } from 'fs';
import path from 'path';

const BASE = path.join(process.cwd(), 'lib', 'content', 'authored');

export function listSlugs(bucket: string): string[] {
  try {
    const dir = path.join(BASE, bucket);
    return readdirSync(dir)
      .filter((f) => f.endsWith('.ts') && !f.startsWith('_'))
      .map((f) => f.replace(/\.ts$/, ''));
  } catch {
    return [];
  }
}

// Per-bucket dynamic loader. Each route imports its own loader.
// Use `await import(...)` so Next.js bundles them per-page.

export async function loadMethod(slug: string) {
  try {
    const mod = await import(`./methods/${slug}`);
    return mod.default;
  } catch {
    return null;
  }
}
export async function loadIndustry(slug: string) {
  try {
    const mod = await import(`./industries/${slug}`);
    return mod.default;
  } catch {
    return null;
  }
}
export async function loadStandard(slug: string) {
  try {
    const mod = await import(`./standards/${slug}`);
    return mod.default;
  } catch {
    return null;
  }
}
export async function loadState(slug: string) {
  try {
    const mod = await import(`./states/${slug}`);
    return mod.default;
  } catch {
    return null;
  }
}
export async function loadCareer(slug: string) {
  try {
    const mod = await import(`./careers/${slug}`);
    return mod.default;
  } catch {
    return null;
  }
}
export async function loadEquipment(slug: string) {
  try {
    const mod = await import(`./equipment/${slug}`);
    return mod.default;
  } catch {
    return null;
  }
}
export async function loadCaseStudy(slug: string) {
  try {
    const mod = await import(`./case-studies/${slug}`);
    return mod.default;
  } catch {
    return null;
  }
}
export async function loadComparison(slug: string) {
  try {
    const mod = await import(`./comparisons/${slug}`);
    return mod.default;
  } catch {
    return null;
  }
}
export async function loadLearn(slug: string) {
  try {
    const mod = await import(`./learn/${slug}`);
    return mod.default;
  } catch {
    return null;
  }
}
export async function loadGlossary(slug: string) {
  try {
    const mod = await import(`./glossary/${slug}`);
    return mod.default;
  } catch {
    return null;
  }
}
export async function loadPillar(slug: string) {
  try {
    const mod = await import(`./pillars/${slug}`);
    return mod.default;
  } catch {
    return null;
  }
}
export async function loadTool(slug: string) {
  try {
    const mod = await import(`./tools/${slug}`);
    return mod.default;
  } catch {
    return null;
  }
}
export async function loadTopic(slug: string) {
  try {
    const mod = await import(`./topics/${slug}`);
    return mod.default;
  } catch {
    return null;
  }
}
