import { Breadcrumbs } from './Breadcrumbs';

interface PageHeroProps {
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  children?: React.ReactNode;
}

export function PageHero({ title, description, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="relative bg-slate-50 border-b border-slate-200 full-bleed pt-6 pb-12 mb-10">
      <div className="layout-wrapper"><div className="max-w-5xl">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          {description}
        </p>
        {children && <div className="mt-6">{children}</div>}
      </div></div>
    </section>
  );
}
