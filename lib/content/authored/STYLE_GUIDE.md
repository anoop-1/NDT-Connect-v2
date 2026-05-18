# NDT Connect — Authored Content Style Guide

Single source of truth for every hand-authored long-form page. Every parallel agent must follow this. Pages that do not meet this bar are blocked from sitemap.

## Voice

- **Authoritative but practical.** Written by working inspectors for working inspectors and the people who hire them.
- **No corporate-speak.** No "we are pleased to", "in today's fast-paced world", "leveraging cutting-edge solutions".
- **No AI tells.** Banned phrases: "delve into", "in conclusion", "it is important to note", "comprehensive overview", "explore the world of", "navigate the complexities".
- **Specific numbers always beat adjectives.** "API 510 §6.4.1 mandates 5-year external visual" beats "regular inspections are essential".
- **Cite, don't claim.** Every technical assertion gets a citation (ASME, API, ASTM, ISO, ASNT, NACE). Citations live in the `citations` array and are referenced by ID in body text.

## Audience

Three reader personas — every page must serve at least one explicitly:

1. **Inspection engineer** (decision-maker) — needs to know what to spec, when to call which method, what a procedure must contain.
2. **NDT technician** (field user) — needs procedure detail, equipment ranges, acceptance criteria, troubleshooting.
3. **Asset owner / buyer** (commercial) — needs cost ranges, vendor selection, scope writing, code compliance.

State the primary audience at the top of every content module (`audience` field where present, or in `heroLede` for others).

## Word count targets

| Page type | Min words | Target | Hard cap |
|---|---|---|---|
| Method deep-dive | 2,500 | 3,500 | 5,000 |
| Industry guide | 2,000 | 3,000 | 4,500 |
| Standard explainer | 1,800 | 2,500 | 3,500 |
| State guide | 2,000 | 2,800 | 4,000 |
| Career deep-dive | 1,500 | 2,200 | 3,000 |
| Equipment review | 1,200 | 1,800 | 2,500 |
| Case study | 1,200 | 1,800 | 2,500 |
| Method comparison | 1,500 | 2,200 | 3,000 |
| Learn / how-to | 1,000 | 1,600 | 2,500 |
| Glossary long-form | 800 | 1,400 | 2,000 |
| Pillar hub | 1,200 | 1,800 | 2,500 |
| Tool landing | 600 | 1,000 | 1,500 (+ interactive widget) |

Word count = sum of paragraphs across all sections. Lists and tables don't count toward the floor.

## Structure (every content module)

Every page renders the same skeleton, driven by data:

1. H1 (page title, ≤ 65 chars)
2. Hero lede (1-2 paragraphs, the "above-the-fold" answer)
3. TOC (auto-generated from sections)
4. Body sections (H2s with optional H3 children)
5. FAQ (≥ 4 questions, schema.org FAQPage)
6. Internal links (≥ 8 contextual)
7. Citations (numbered footnotes)
8. Author byline + last-updated stamp

## Citations

- Every standards/code mention: cite the document + section. Example: `{ id: "api-510-6-4-1", source: "API 510, 11th ed. (2022), §6.4.1 Inspection Plan" }`.
- Reference in body text as `[1]`, `[2]` style superscripts (template handles rendering).
- Minimum citations per page type:
  - Method: 8
  - Standard: 12
  - Industry: 6
  - State: 4
  - Case study: 4
  - All others: 3

## Internal links

Each page must internally link to **≥ 8** other authored pages on the site. Distribution:
- 2 method pages
- 2 related industry/state pages
- 2 tool/calculator pages
- 2 standard/learn pages

Internal links live in `internalLinks` array as `{ href, label, context }`. Context = the surrounding sentence the link sits inside.

## Banned content patterns

- Generic CTAs ("Contact us today!", "Get started now!"). Use specific ones: "Get a quote for this scope in 24h", "Run the cost calculator for your project".
- Filler intros ("In the world of NDT…", "As industry evolves…"). Open with a specific fact or a specific reader problem.
- Adjective stacks ("comprehensive, reliable, world-class"). Strip to the noun.
- Repeating the page title in the first sentence. Use a sharper hook.
- Listicles without explanation. Every bullet gets a sentence of why.

## Schema requirements (per page type)

- Method: `Article` + `HowTo` (if procedure)
- Industry: `Article` + `FAQPage`
- Standard: `Article` + `TechArticle`
- State: `Article` + `FAQPage` + `Place`
- Career: `Article` + `JobPosting` (with required fields incl. datePosted, validThrough, hiringOrganization, jobLocation)
- Equipment: `Product` + `Review`
- Case study: `Article` + `Review` (if outcomes quantified)
- Comparison: `Article` + `FAQPage`
- Learn: `Article` + (`HowTo` for how-to category)
- Glossary: `DefinedTerm` + `Article`
- Tool: `SoftwareApplication` + `HowTo`

Page templates inject schema automatically from the content module — agents only need to provide the data.

## Author attribution

Default author: `PRIMARY_AUTHOR` from `lib/content/authored/types.ts` (Anoop Rayavarapu, ASNT Level III). Every page module imports and uses this constant. Custom authors only with explicit `author: { ... }` override.

## Last-updated stamp

Page templates display `Last reviewed: {current month, current year}`. Triggered automatically — agents don't set this.

## Folder layout

```
lib/content/authored/
  types.ts              ← interfaces + PRIMARY_AUTHOR (shared)
  STYLE_GUIDE.md        ← this file
  methods/[slug].ts     ← one MethodContent per NDT method
  industries/[slug].ts  ← one IndustryContent per industry
  standards/[slug].ts   ← one StandardContent per top standard
  states/[slug].ts      ← one StateGuideContent per US state
  careers/[slug].ts     ← one CareerContent per role
  equipment/[slug].ts   ← one EquipmentContent per model
  case-studies/[slug].ts ← one CaseStudyContent per scenario
  comparisons/[slug].ts ← one ComparisonContent per pair
  learn/[slug].ts       ← one LearnArticleContent per how-to/concept
  glossary/[slug].ts    ← one GlossaryLongFormContent per term (top 25 only)
  pillars/[slug].ts     ← one PillarHubContent per hub
  tools/[slug].ts       ← one ToolMeta per calculator (interactive widget lives in components/tools/calculators/[slug].tsx)
  index.ts              ← named exports for each bucket
```

## Quality checklist (agent self-verify before exporting)

- [ ] Word count meets minimum for page type
- [ ] At least 8 internal links populated
- [ ] At least N citations populated (per type minimum)
- [ ] No banned filler phrases in body
- [ ] Hero lede opens with a concrete fact or reader problem
- [ ] FAQ has ≥ 4 questions, each answer ≥ 60 words with specifics
- [ ] All numeric claims have a citation
- [ ] Meta title ≤ 65 chars, no trailing brand suffix
- [ ] Meta description 130-160 chars

## Examples

### GOOD opening

> Hydrotreater reactor walls in Gulf Coast refineries fail from the inside out — high-temperature H₂S attack thinning the cladding before any external sign shows. API 510 (11th ed., §6.4.1) requires a 5-year external visual plus an internal thickness survey at each turnaround. UT thickness with a 2.25 MHz dual-element probe handles the survey; PAUT corrosion mapping resolves the wall pattern when isolated pits are suspected.

### BAD opening (do not write this)

> Ultrasonic testing is a comprehensive, non-destructive technique used widely across various industries. In today's fast-paced industrial landscape, ensuring asset integrity is more important than ever. Let's explore how UT can help your business stay compliant.

## When in doubt

- Pick the more specific number, the more specific standard, the more specific defect mechanism.
- Cut adjectives.
- Add a citation.
- Link to the most useful authored page on the same topic.
