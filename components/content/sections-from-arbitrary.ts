// Helper for mapping author-content shapes into the generic Section[] the
// ContentPage shell renders. Specific routes use this when their typed
// payload includes named fields (e.g. MethodContent has physicsPrimer,
// procedure[], equipment[]) that need to be flattened into the linear
// Section[] the shell understands.

import type {
  Section,
  MethodContent,
  IndustryContent,
  StandardContent,
  StateGuideContent,
  CareerContent,
  EquipmentContent,
  CaseStudyContent,
  ComparisonContent,
  LearnArticleContent,
  GlossaryLongFormContent,
  PillarHubContent,
  ToolMeta,
} from '@/lib/content/authored/types';

function p(text: string): { heading: string; level: 2; paragraphs: string[] } {
  return { heading: '', level: 2, paragraphs: [text] };
}

export function methodSections(m: MethodContent): Section[] {
  const out: Section[] = [];
  out.push({ heading: 'How the physics works', level: 2, paragraphs: [m.physicsPrimer] });
  out.push({
    heading: 'When to choose this method',
    level: 2,
    paragraphs: [m.whenToChoose, m.whenNotToChoose],
    list: { title: 'Defects you can find', items: m.detectableDefects },
  });
  out.push({
    heading: 'Materials & geometries',
    level: 2,
    paragraphs: ['Method coverage depends on couplant, surface, and section thickness. Compatible forms include:'],
    list: { items: m.materialsAndForms },
  });
  out.push({ heading: 'Procedure', level: 2, paragraphs: [], }); // placeholder
  for (const sec of m.procedure) out.push(sec);
  out.push({ heading: 'Equipment', level: 2, paragraphs: [] });
  for (const sec of m.equipment) out.push(sec);
  out.push({
    heading: 'Codes & standards that govern this method',
    level: 2,
    paragraphs: ['Procedures and acceptance criteria are anchored in published codes:'],
    list: { items: m.codesAndStandards.map((c) => c.source) },
  });
  out.push({ heading: 'Acceptance criteria', level: 2, paragraphs: [m.acceptanceCriteria] });
  out.push({
    heading: 'How this compares to other methods',
    level: 2,
    paragraphs: ['Choosing between methods is rarely about capability alone — cost, throughput, and code coverage all weigh in:'],
    table: {
      headers: ['vs Method', 'Tradeoff'],
      rows: m.comparisonAgainst.map((c) => [c.method, c.tradeoff]),
    },
  });
  out.push({
    heading: 'Cost range',
    level: 2,
    paragraphs: [
      `Typical ${m.abbreviation} pricing in the US market runs $${m.costRange.low}–$${m.costRange.high} ${m.costRange.unit}, with most jobs landing around $${m.costRange.mid} ${m.costRange.unit}. Mobilisation, access, and certification level shift the band.`,
    ],
  });
  return out.filter((s) => s.heading); // drop placeholder empties
}

export function industrySections(i: IndustryContent): Section[] {
  return [
    { heading: 'Market context', level: 2, paragraphs: [i.marketContext] },
    {
      heading: 'Common assets that get inspected',
      level: 2,
      paragraphs: ['The asset inventory drives method selection:'],
      list: { items: i.commonAssets },
    },
    {
      heading: 'Dominant defect mechanisms',
      level: 2,
      paragraphs: ['Knowing the failure mode comes before specifying the method:'],
    },
    ...i.dominantDefectMechanisms.map<Section>((d) => ({
      heading: d.mechanism,
      level: 3,
      paragraphs: [d.explanation],
    })),
    {
      heading: 'Methods most-used in this sector',
      level: 2,
      paragraphs: ['NDT method selection mirrors the dominant damage mechanisms:'],
      table: {
        headers: ['Method', 'Why this sector uses it'],
        rows: i.methodsUsed.map((m) => [m.method, m.reason]),
      },
    },
    {
      heading: 'Regulatory framework',
      level: 2,
      paragraphs: ['Inspection scope is set by code, not preference:'],
      list: { items: i.regulatoryFramework.map((c) => c.source) },
    },
    {
      heading: 'Representative scenarios',
      level: 2,
      paragraphs: ['Drawn from field experience:'],
    },
    ...i.caseScenarios.map<Section>((c) => ({
      heading: c.title,
      level: 3,
      paragraphs: [c.body],
    })),
    {
      heading: 'Cost drivers',
      level: 2,
      paragraphs: ['What pushes inspection budget up or down:'],
      list: { items: i.costDrivers },
    },
    { heading: 'Selecting a vendor', level: 2, paragraphs: [i.vendorSelection] },
  ];
}

export function standardSections(s: StandardContent): Section[] {
  const out: Section[] = [
    { heading: 'Scope', level: 2, paragraphs: [s.scope] },
    {
      heading: 'Who must comply',
      level: 2,
      paragraphs: ['Scope of applicability:'],
      list: { items: s.whoMustComply },
    },
    { heading: 'Key requirements', level: 2, paragraphs: [] },
    ...s.keyRequirements,
  ];
  if (s.inspectionIntervals) {
    out.push({
      heading: 'Inspection intervals',
      level: 2,
      paragraphs: ['Code-mandated intervals are the floor — risk-based may shorten:'],
      table: s.inspectionIntervals,
    });
  }
  if (s.acceptanceCriteria) {
    out.push({
      heading: 'Acceptance criteria',
      level: 2,
      paragraphs: ['Indications evaluated against:'],
      table: s.acceptanceCriteria,
    });
  }
  out.push({
    heading: 'Related standards',
    level: 2,
    paragraphs: ['This standard does not stand alone:'],
    list: { items: s.relatedStandards.map((r) => `${r.code} — ${r.relation}`) },
  });
  out.push({
    heading: 'Common audit findings',
    level: 2,
    paragraphs: ['Recurring gaps we see in third-party audits:'],
    list: { items: s.commonAuditFindings },
  });
  return out.filter((sec) => sec.heading);
}

export function stateSections(s: StateGuideContent): Section[] {
  return [
    { heading: 'Industry mix in this state', level: 2, paragraphs: [s.industryMix] },
    {
      heading: 'Top metros for NDT demand',
      level: 2,
      paragraphs: ['Where work concentrates:'],
      list: { items: s.topMetros.map((m) => m.name) },
    },
    {
      heading: 'Regulatory notes',
      level: 2,
      paragraphs: ['State-level regulators that touch inspection scope:'],
      list: { items: s.regulatoryNotes.map((c) => c.source) },
    },
    {
      heading: 'Major asset owners',
      level: 2,
      paragraphs: ['Largest local NDT buyers (asset operators, not service shops):'],
      table: {
        headers: ['Operator', 'Sector'],
        rows: s.majorAssetOwners.map((a) => [a.name, a.sector]),
      },
    },
    {
      heading: 'Method demand profile',
      level: 2,
      paragraphs: ['What gets called out most:'],
      table: {
        headers: ['Method', 'Demand', 'Why'],
        rows: s.methodDemand.map((m) => [m.method, m.demandLevel, m.reason]),
      },
    },
    {
      heading: 'Certification availability locally',
      level: 2,
      paragraphs: [s.certificationAvailability],
    },
    {
      heading: 'Salary bands',
      level: 2,
      paragraphs: ['2024-2026 ranges across common roles:'],
      table: {
        headers: ['Role', 'Low (USD)', 'High (USD)'],
        rows: s.salaryBands.map((b) => [b.role, `$${b.low.toLocaleString()}`, `$${b.high.toLocaleString()}`]),
      },
    },
    { heading: 'Hiring seasons', level: 2, paragraphs: [s.hiringSeasons] },
  ];
}

export function careerSections(c: CareerContent): Section[] {
  return [
    { heading: 'What you actually do', level: 2, paragraphs: [c.whatYouDo] },
    {
      heading: 'A typical day',
      level: 2,
      paragraphs: ['Field reality, not job-description fiction:'],
      list: { items: c.typicalDay },
    },
    {
      heading: 'Responsibilities',
      level: 2,
      paragraphs: ['Core duties:'],
      list: { items: c.responsibilities },
    },
    {
      heading: 'Path to entry',
      level: 2,
      paragraphs: ['Step-by-step from zero to working in this role:'],
    },
    ...c.pathToEntry.map<Section>((s) => ({
      heading: `Step ${s.step}: ${s.title}`,
      level: 3,
      paragraphs: [s.body],
    })),
    {
      heading: 'Required certifications',
      level: 2,
      paragraphs: ['What you need on paper:'],
      table: {
        headers: ['Certification', 'Mandatory?', 'Why'],
        rows: c.certificationsRequired.map((r) => [r.name, r.mandatory ? 'Yes' : 'No', r.reason]),
      },
    },
    {
      heading: 'Salary by experience',
      level: 2,
      paragraphs: ['US ranges, 2024-2026:'],
      table: {
        headers: ['Experience', 'Low', 'Median', 'High'],
        rows: c.salaryByExperience.map((s) => [
          s.years,
          `$${s.min.toLocaleString()}`,
          `$${s.median.toLocaleString()}`,
          `$${s.max.toLocaleString()}`,
        ]),
      },
    },
    {
      heading: 'Industries employing this role',
      level: 2,
      paragraphs: ['Where the hiring happens:'],
      table: {
        headers: ['Industry', 'Demand'],
        rows: c.industriesEmploying.map((i) => [i.industry, i.demand]),
      },
    },
    { heading: 'Advancement path', level: 2, paragraphs: [c.advancementPath] },
    {
      heading: 'Risk factors',
      level: 2,
      paragraphs: ['Less glamorous side of the job:'],
      list: { items: c.riskFactors },
    },
  ];
}

export function equipmentSections(e: EquipmentContent): Section[] {
  return [
    {
      heading: `Specs at a glance — ${e.make} ${e.model}`,
      level: 2,
      paragraphs: [],
      table: e.specs,
    },
    {
      heading: 'What this is good for',
      level: 2,
      paragraphs: ['Buyer matches use case to capability:'],
      list: { items: e.bestFor },
    },
    {
      heading: 'Where it falls short',
      level: 2,
      paragraphs: ['Honest tradeoffs:'],
      list: { items: e.notIdealFor },
    },
    {
      heading: 'Pros',
      level: 2,
      paragraphs: [],
      list: { items: e.pros },
    },
    {
      heading: 'Cons',
      level: 2,
      paragraphs: [],
      list: { items: e.cons },
    },
    {
      heading: 'Alternatives to consider',
      level: 2,
      paragraphs: ['If this unit does not fit:'],
      table: {
        headers: ['Make/Model', 'Why consider it'],
        rows: e.alternatives.map((a) => [`${a.make} ${a.model}`, a.reason]),
      },
    },
    {
      heading: 'Certification & code compatibility',
      level: 2,
      paragraphs: ['Documented use under:'],
      list: { items: e.certificationCompatibility },
    },
  ];
}

export function caseStudySections(cs: CaseStudyContent): Section[] {
  return [
    {
      heading: 'Asset & context',
      level: 2,
      paragraphs: [`${cs.industry} — ${cs.regionLabel}. ${cs.assetType}. Crew of ${cs.techniciansDeployed} for ${cs.durationDays} days.`],
    },
    { heading: 'The challenge', level: 2, paragraphs: [cs.challenge] },
    { heading: 'Approach', level: 2, paragraphs: [] },
    ...cs.approach,
    {
      heading: 'Methods deployed',
      level: 2,
      paragraphs: [],
      list: { items: cs.methodsUsed },
    },
    {
      heading: 'Defects found',
      level: 2,
      paragraphs: [],
      list: { items: cs.defectsFound },
    },
    { heading: 'Outcome', level: 2, paragraphs: [cs.outcome] },
    cs.costAvoidance
      ? { heading: 'Cost avoidance', level: 2, paragraphs: [cs.costAvoidance] }
      : null,
    {
      heading: 'Certifications required',
      level: 2,
      paragraphs: ['Crew qualifications:'],
      list: { items: cs.certificationsNeeded },
    },
  ].filter(Boolean) as Section[];
}

export function comparisonSections(c: ComparisonContent): Section[] {
  return [
    { heading: `${c.methodA.abbreviation} vs ${c.methodB.abbreviation} at a glance`, level: 2, paragraphs: [], table: c.sideBySide },
    {
      heading: `When ${c.methodA.abbreviation} wins`,
      level: 2,
      paragraphs: ['Scenarios where method A is the better call:'],
      table: {
        headers: ['Scenario', 'Why'],
        rows: c.whenAWins.map((w) => [w.scenario, w.reason]),
      },
    },
    {
      heading: `When ${c.methodB.abbreviation} wins`,
      level: 2,
      paragraphs: ['Scenarios where method B is the better call:'],
      table: {
        headers: ['Scenario', 'Why'],
        rows: c.whenBWins.map((w) => [w.scenario, w.reason]),
      },
    },
    {
      heading: 'When either works',
      level: 2,
      paragraphs: ['Cases where the decision is more commercial than technical:'],
      table: {
        headers: ['Scenario', 'Lean toward'],
        rows: c.whenEitherWorks.map((w) => [w.scenario, w.pick === 'A' ? c.methodA.abbreviation : c.methodB.abbreviation]),
      },
    },
    { heading: 'Cost difference', level: 2, paragraphs: [c.costDifference] },
    { heading: 'Speed difference', level: 2, paragraphs: [c.speedDifference] },
    { heading: 'Certification difference', level: 2, paragraphs: [c.certificationDifference] },
  ];
}

export function learnSections(l: LearnArticleContent): Section[] {
  const out: Section[] = [...l.sections];
  if (l.commonMistakes && l.commonMistakes.length) {
    out.push({
      heading: 'Common mistakes',
      level: 2,
      paragraphs: ['Recurring errors that lead to failed inspections:'],
      list: { items: l.commonMistakes },
    });
  }
  return out;
}

export function glossarySections(g: GlossaryLongFormContent): Section[] {
  const out: Section[] = [
    { heading: 'Precise definition', level: 2, paragraphs: [g.preciseDefinition] },
  ];
  if (g.alternateNames.length) {
    out.push({
      heading: 'Also known as',
      level: 2,
      paragraphs: [],
      list: { items: g.alternateNames },
    });
  }
  if (g.history) out.push({ heading: 'History', level: 2, paragraphs: [g.history] });
  out.push({ heading: 'Technical detail', level: 2, paragraphs: [] });
  for (const s of g.technicalDetail) out.push(s);
  if (g.workedExample) {
    out.push({
      heading: 'Worked example',
      level: 2,
      paragraphs: [g.workedExample.setup, g.workedExample.calculation, `Result: ${g.workedExample.result}`],
    });
  }
  out.push({
    heading: 'Where it appears in practice',
    level: 2,
    paragraphs: ['Real-world contexts you will see this term:'],
  });
  for (const w of g.whereItAppears) {
    out.push({ heading: w.context, level: 3, paragraphs: [w.explanation] });
  }
  return out.filter((s) => s.heading);
}

export function pillarSections(p: PillarHubContent): Section[] {
  return [
    { heading: 'Topic overview', level: 2, paragraphs: [p.topicOverview] },
    {
      heading: 'Supporting articles in this cluster',
      level: 2,
      paragraphs: ['The full set of authored pages under this topic:'],
      list: { items: p.subPages.map((s) => `${s.label} — ${s.description}`) },
    },
    { heading: 'Expert commentary', level: 2, paragraphs: [p.expertCommentary] },
    {
      heading: 'External authoritative resources',
      level: 2,
      paragraphs: ['Cited bodies and reference documents:'],
      list: { items: p.externalResources.map((r) => r.label) },
    },
  ];
}

export function toolSections(t: ToolMeta): Section[] {
  return [
    { heading: 'How it works', level: 2, paragraphs: [t.howItWorks] },
    t.formula
      ? { heading: 'Formula', level: 2, paragraphs: [t.formula], code: { lang: 'text', body: t.formula } }
      : null,
    {
      heading: 'Worked example',
      level: 2,
      paragraphs: [t.workedExample.explanation],
      table: {
        headers: ['Variable', 'Value'],
        rows: [
          ...Object.entries(t.workedExample.inputs).map(([k, v]) => [`input: ${k}`, String(v)]),
          ...Object.entries(t.workedExample.outputs).map(([k, v]) => [`output: ${k}`, String(v)]),
        ],
      },
    },
    { heading: 'When to use this tool', level: 2, paragraphs: [t.whenToUse] },
    {
      heading: 'Limitations',
      level: 2,
      paragraphs: ['Where this calculator stops being accurate:'],
      list: { items: t.limitations },
    },
  ].filter(Boolean) as Section[];
}
