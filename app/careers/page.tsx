import { Metadata } from 'next';
import Link from 'next/link';
import { careerRoles } from '@/lib/careers-data';
import { cities } from '@/lib/seo-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, TrendingUp, Users, Award } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'NDT Career Paths & Salary Guide | NDT Jobs & Opportunities | NDT Connect',
  description: 'Explore NDT career paths, salary ranges, and job opportunities. Learn about NDT technician roles, certifications, and industry demand.',
  keywords: [
    'NDT careers', 'NDT technician jobs', 'NDT salary', 'NDT Level 1', 'NDT Level 2', 'NDT Level 3',
    'NDT inspector', 'ultrasonic technician', 'radiographic technician', 'welding inspector',
    'pipeline inspector', 'aerospace NDT specialist', 'NDT training'
  ],
  openGraph: {
    title: 'NDT Career Paths & Salary Guide | NDT Connect',
    description: 'Explore NDT career paths, salary ranges, and job opportunities',
    url: 'https://ndt-connect.com/careers',
    type: 'website',
    siteName: 'NDT Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NDT Career Paths & Salary Guide | NDT Connect',
    description: 'Explore NDT career paths, salary ranges, and job opportunities.',
  },
  alternates: { canonical: 'https://ndt-connect.com/careers' },
};

// Top 20 cities by industry size/demand
const topCities = cities.slice(0, 20);

export default function CareersPage() {
  const salaryStats = {
    averageSalary: Math.round(careerRoles.reduce((sum, r) => sum + (r.salaryRange.min + r.salaryRange.max) / 2, 0) / careerRoles.length),
    minSalary: Math.min(...careerRoles.map(r => r.salaryRange.min)),
    maxSalary: Math.max(...careerRoles.map(r => r.salaryRange.max)),
  };

  const entryLevelRoles = careerRoles.filter(r => r.experience === 0);
  const seniorRoles = careerRoles.filter(r => r.experience >= 8);

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://ndt-connect.com' },
        { name: 'Careers', url: 'https://ndt-connect.com/careers' }
      ]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'NDT Careers and Jobs',
          description: 'Comprehensive guide to NDT career paths, salary information, and job opportunities',
          url: 'https://ndt-connect.com/careers',
        })
      }} />

      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-foreground">Careers</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-10 md:p-14 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">NDT Career Paths & Opportunities</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            Explore rewarding careers in non-destructive testing. From entry-level technicians to senior specialists, discover roles, salary ranges, and growth opportunities.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/50 rounded-lg p-3">
              <div className="font-semibold text-primary">{careerRoles.length}+</div>
              <div className="text-muted-foreground">Career Roles</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="font-semibold text-primary">${(salaryStats.minSalary / 1000).toFixed(0)}K-${(salaryStats.maxSalary / 1000).toFixed(0)}K</div>
              <div className="text-muted-foreground">Salary Range</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="font-semibold text-primary">${(salaryStats.averageSalary / 1000).toFixed(0)}K</div>
              <div className="text-muted-foreground">Average Salary</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="font-semibold text-primary">Growing</div>
              <div className="text-muted-foreground">Market Demand</div>
            </div>
          </div>
        </section>

        {/* Career Path Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8">Career Progression Paths</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            The NDT industry offers multiple career progression paths. Start as an entry-level technician and advance to senior technical expert, management, or specialized roles.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Entry Level */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <Badge>Entry Level</Badge>
                </div>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Perfect for those new to NDT. Get certified and gain practical experience.
                </p>
                <div className="space-y-2 mb-4">
                  {entryLevelRoles.map(role => (
                    <div key={role.slug} className="text-sm">
                      <Link href={`/careers/roles/${role.slug}`} className="text-primary hover:underline font-medium">
                        {role.title}
                      </Link>
                      <div className="text-xs text-muted-foreground">${(role.salaryRange.min / 1000).toFixed(0)}K-${(role.salaryRange.max / 1000).toFixed(0)}K</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/certifications">Get Certified</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Intermediate Level */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <Badge>Professional</Badge>
                </div>
                <CardTitle>Advanced Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Develop specialized skills and take on higher-responsibility roles.
                </p>
                <div className="space-y-2 mb-4">
                  {careerRoles.filter(r => r.experience > 2 && r.experience < 8).slice(0, 4).map(role => (
                    <div key={role.slug} className="text-sm">
                      <Link href={`/careers/roles/${role.slug}`} className="text-primary hover:underline font-medium">
                        {role.title}
                      </Link>
                      <div className="text-xs text-muted-foreground">${(role.salaryRange.min / 1000).toFixed(0)}K-${(role.salaryRange.max / 1000).toFixed(0)}K</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/certifications">Advanced Certifications</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Senior Level */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-primary" />
                  <Badge>Leadership</Badge>
                </div>
                <CardTitle>Executive Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Lead teams, manage programs, and shape industry standards.
                </p>
                <div className="space-y-2 mb-4">
                  {seniorRoles.slice(0, 4).map(role => (
                    <div key={role.slug} className="text-sm">
                      <Link href={`/careers/roles/${role.slug}`} className="text-primary hover:underline font-medium">
                        {role.title}
                      </Link>
                      <div className="text-xs text-muted-foreground">${(role.salaryRange.min / 1000).toFixed(0)}K-${(role.salaryRange.max / 1000).toFixed(0)}K</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/register">Register as Expert</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* All Career Roles */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8">All NDT Career Roles</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerRoles.map((role) => (
              <Card key={role.slug} className="hover:shadow-lg transition-shadow group flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="outline">{role.experience === 0 ? 'Entry' : role.experience <= 5 ? 'Mid' : 'Senior'}</Badge>
                    <Badge className="text-xs whitespace-nowrap">{role.experience}+ yrs</Badge>
                  </div>
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{role.description}</p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-1">Salary Range</div>
                      <div className="text-sm font-bold text-primary">
                        ${(role.salaryRange.min / 1000).toFixed(0)}K - ${(role.salaryRange.max / 1000).toFixed(0)}K
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-1">Key Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {role.skills.slice(0, 3).map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                        {role.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">+{role.skills.length - 3}</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/careers/roles/${role.slug}`}
                    className="text-sm text-primary font-medium flex items-center group-hover:underline"
                  >
                    View Details <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Explore Careers by City */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">Explore NDT Careers by City</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            See regional salary variations and local industry opportunities. NDT salary ranges vary by city based on local cost of living and industry concentration.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                href={`/careers/${city.slug}`}
                className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{city.name}</div>
                <div className="text-xs text-muted-foreground">{city.region}</div>
                <div className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                  Explore <ArrowRight className="h-3 w-3 ml-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">Plus {cities.length - topCities.length} additional cities with NDT opportunities</p>
            <div className="inline-block">
              <Link href="/services" className="text-sm text-primary hover:underline font-medium flex items-center justify-center">
                Browse All Cities <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Specializations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8">Popular Specializations</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Pipeline Integrity',
                description: 'Specialize in pipeline inspection and corrosion management. High demand in oil and gas.',
                roles: ['Pipeline Inspector', 'Corrosion Engineer'],
              },
              {
                title: 'Aerospace & Aviation',
                description: 'Work on aircraft and engine components with zero-defect requirements.',
                roles: ['Aerospace NDT Specialist', 'Composite Inspector'],
              },
              {
                title: 'Offshore & Marine',
                description: 'Inspect offshore platforms, vessels, and subsea infrastructure in challenging environments.',
                roles: ['Offshore NDT Technician', 'Subsea Inspector'],
              },
              {
                title: 'Manufacturing Quality',
                description: 'Ensure quality in manufacturing through NDT inspection and welding verification.',
                roles: ['Welding Inspector', 'Quality Assurance Manager'],
              },
            ].map((spec, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{spec.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{spec.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {spec.roles.map((role, j) => (
                      <Badge key={j} variant="secondary" className="text-xs">{role}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your NDT Career?</h2>
          <p className="mb-8 opacity-90 max-w-lg mx-auto">
            Get certified, find job opportunities, and connect with employers and training providers through NDT Connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/certifications">View Certifications</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Register as Provider</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
