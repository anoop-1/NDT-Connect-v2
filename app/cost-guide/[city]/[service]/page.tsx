import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cities, methods, getCityBySlug, getCityMethodBySlug } from '@/lib/seo-data';
import { DollarSign, TrendingUp, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface Props {
  params: {
    city: string;
    service: string;
  };
}

export async function generateStaticParams() {
  const params = [];
  const citySlugs = cities.map(c => c.slug);
  const methodSlugs = methods.map(m => m.slug);

  for (const city of citySlugs) {
    for (const service of methodSlugs) {
      params.push({ city, service });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  const method = methods.find(m => m.slug === params.service);

  if (!city || !method) {
    return {};
  }

  const title = `${method.name} Cost in ${city.name} | NDT Pricing Guide | NDT Connect`;
  const description = `Discover typical ${method.name} inspection costs in ${city.name}. Learn what factors affect pricing and how to get the best value for ${method.abbreviation} testing services.`;

  return {
    title,
    description,
    keywords: [
      `${method.abbreviation} cost in ${city.name}`,
      `${method.name} pricing`,
      `${method.abbreviation} inspection cost`,
      `NDT cost`,
      `${city.name} NDT services`,
    ],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/cost-guide/${params.city}/${params.service}`,
      type: 'article',
    },
    alternates: {
      canonical: `https://ndt-connect.com/cost-guide/${params.city}/${params.service}`,
    },
  };
}

// Cost ranges based on method and typical market conditions
const getCostRanges = (method: string, city: string) => {
  const baseCosts: Record<string, { low: number; mid: number; high: number; unit: string }> = {
    'ultrasonic-testing': { low: 250, mid: 450, high: 750, unit: 'per hour' },
    'radiographic-testing': { low: 400, mid: 700, high: 1200, unit: 'per hour' },
    'magnetic-particle-testing': { low: 200, mid: 350, high: 600, unit: 'per hour' },
    'penetrant-testing': { low: 200, mid: 350, high: 550, unit: 'per hour' },
    'eddy-current-testing': { low: 300, mid: 500, high: 800, unit: 'per hour' },
    'visual-testing': { low: 150, mid: 250, high: 400, unit: 'per hour' },
    'phased-array-ut': { low: 400, mid: 750, high: 1400, unit: 'per hour' },
    'tofd-testing': { low: 500, mid: 850, high: 1500, unit: 'per hour' },
    'guided-wave-testing': { low: 600, mid: 1000, high: 1800, unit: 'per day' },
  };

  const cityMultipliers: Record<string, number> = {
    'houston': 1.1,
    'los-angeles': 1.2,
    'new-orleans': 1.15,
    'denver': 0.95,
    'chicago': 1.05,
    'seattle': 1.15,
    'dallas': 1.0,
    'phoenix': 0.95,
    'philadelphia': 1.05,
    'san-francisco': 1.25,
    'detroit': 0.95,
    'pittsburgh': 0.9,
    'default': 1.0,
  };

  const multiplier = cityMultipliers[city] || cityMultipliers['default'];
  const baseCost = baseCosts[method] || baseCosts['ultrasonic-testing'];

  return {
    low: Math.round(baseCost.low * multiplier),
    mid: Math.round(baseCost.mid * multiplier),
    high: Math.round(baseCost.high * multiplier),
    unit: baseCost.unit,
  };
};

export default function CostGuidePage({ params }: Props) {
  const city = getCityBySlug(params.city);
  const method = methods.find(m => m.slug === params.service);

  if (!city || !method) {
    notFound();
  }

  const costs = getCostRanges(params.service, params.city);

  const factorsAffectingCost = [
    { factor: 'Component Size & Complexity', description: 'Larger or more complex parts require more time and expertise' },
    { factor: 'Access Requirements', description: 'Difficult-to-reach areas increase inspection time and cost' },
    { factor: 'Acceptance Criteria', description: 'Stricter standards (aerospace vs. general manufacturing) require more scrutiny' },
    { factor: 'Equipment Requirements', description: 'Advanced equipment like PAUT or TOFD costs more than basic methods' },
    { factor: 'Certification Requirements', description: 'Higher-level certifications command premium rates' },
    { factor: 'Travel Distance', description: 'Remote locations in ' + city.name + ' may add travel and logistics costs' },
    { factor: 'Volume of Work', description: 'Larger inspection projects often have reduced per-unit costs' },
    { factor: 'Timeline Urgency', description: 'Rush inspections typically have premium pricing' },
  ];

  const costSavingTips = [
    'Plan inspections well in advance to avoid rush fees',
    'Batch multiple components for more efficient testing',
    'Provide clear specifications and accessibility information',
    'Develop long-term partnerships for better pricing',
    'Consider less critical equipment for initial screening with lower-cost methods',
    'Maintain proper equipment condition to reduce rework',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 sm:py-12 lg:py-16">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/cost-guide" className="hover:text-primary">Cost Guide</Link>
          <span>/</span>
          <Link href={`/cost-guide/${params.city}`} className="hover:text-primary">{city.name}</Link>
          <span>/</span>
          <span>{method.name}</span>
        </div>

        {/* Header */}
        <div className="mb-8 rounded-lg bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <DollarSign className="h-3 w-3" />
              Pricing Guide
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {city.name}, {city.region}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            {method.name} Cost in {city.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Comprehensive pricing guide for {method.abbreviation} ({method.name}) inspection services in {city.name}. Understand typical costs, factors affecting pricing, and how to optimize your NDT investment.
          </p>

          {/* Quick Cost Summary */}
          <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-primary/10">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Budget Range</p>
              <p className="text-2xl font-bold text-primary">${costs.low} - ${costs.high}</p>
              <p className="text-xs text-muted-foreground">{costs.unit}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Typical Cost</p>
              <p className="text-2xl font-bold text-primary">${costs.mid}</p>
              <p className="text-xs text-muted-foreground">{costs.unit}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Demand Level</p>
              <p className="text-2xl font-bold text-primary">High</p>
              <p className="text-xs text-muted-foreground">in {city.name}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Method Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{method.abbreviation} Overview</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="mb-4">{method.description}</p>
                <p className="text-muted-foreground text-sm">{method.longDescription}</p>
              </CardContent>
            </Card>

            {/* Factors Affecting Cost */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Factors Affecting {method.abbreviation} Costs in {city.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {factorsAffectingCost.map((factor, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">{factor.factor}</h4>
                      <p className="text-sm text-muted-foreground">{factor.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* City-Specific Market Context */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{city.name} Market Context</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">{city.description}</p>
                <div className="mb-4">
                  <p className="font-semibold text-primary mb-3">Key Industries Requiring {method.abbreviation}:</p>
                  <div className="flex flex-wrap gap-2">
                    {city.industries.map((industry) => (
                      <span key={industry} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Major Facilities:</strong> {city.keyFacilities.join(', ')}
                </p>
              </CardContent>
            </Card>

            {/* Cost Saving Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  How to Get the Best Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {costSavingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-primary font-bold shrink-0">{idx + 1}.</span>
                      <span className="text-sm text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Method Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Reference</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Method</p>
                  <p className="font-semibold text-primary">{method.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Abbreviation</p>
                  <p className="font-semibold text-primary">{method.abbreviation}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Typical Duration</p>
                  <p className="text-sm text-muted-foreground">1-8 hours depending on scope</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Equipment Cost</p>
                  <p className="text-sm text-muted-foreground">Included in service pricing</p>
                </div>
              </CardContent>
            </Card>

            {/* Typical Applications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Typical Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {method.applications.slice(0, 5).map((app, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary shrink-0">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Request Quote CTA */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-primary mb-3">Ready to Get Started?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a customized quote for {method.abbreviation} inspection services in {city.name}.
                </p>
                <Link
                  href={`/request-inspection?city=${params.city}&service=${params.service}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  Request a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-900 text-sm mb-1">Important Note</p>
                    <p className="text-xs text-amber-800">
                      Prices are estimates based on typical market conditions. Actual costs vary based on specific requirements, complexity, and current demand. Always request detailed quotes for accurate pricing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Related {method.abbreviation} Services in {city.name}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {method.industries.slice(0, 3).map((industry) => (
              <Card key={industry} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-2">{industry}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {method.abbreviation} inspection services tailored for {industry} applications
                  </p>
                  <Link
                    href={`/cost-guide/${params.city}/${params.service}#${industry.toLowerCase()}`}
                    className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-2"
                  >
                    Learn More <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              price: costs.mid.toString(),
              description: `${method.name} (${method.abbreviation}) cost in ${city.name}`,
              url: `https://ndt-connect.com/cost-guide/${params.city}/${params.service}`,
            }),
          }}
        />
      </div>
    </div>
  );
}
