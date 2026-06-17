import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCareerBySlug, getAllCareerSlugs, careerRoles } from '@/lib/careers-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { CheckCircle, DollarSign, Briefcase, Award, Users, TrendingUp, ArrowRight } from 'lucide-react';

interface Props {
  params: { slug: string };
}

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllCareerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const role = getCareerBySlug(params.slug);
  if (!role) return {};

  const sMin = (role.salaryRange.min / 1000).toFixed(0);
  const sMax = (role.salaryRange.max / 1000).toFixed(0);
  const title = `${role.title} Salary & Jobs [2026]: $${sMin}K–$${sMax}K`;
  const description = `${role.title} salary in 2026: $${sMin}K–$${sMax}K. See required certifications, how to get hired, and create a free NDT Connect profile so employers and clients find you directly. ${role.description}`;

  return {
    title,
    description,
    keywords: [
      role.title.toLowerCase(),
      'NDT career',
      'NDT job',
      `NDT ${role.title}`,
      'NDT salary',
      ...role.certifications,
      ...role.skills.slice(0, 5),
    ],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/careers/${role.slug}`,
    },
    alternates: { canonical: `https://ndt-connect.com/careers/${role.slug}` },
  };
}

export default function CareerRolePage({ params }: Props) {
  const role = getCareerBySlug(params.slug);
  if (!role) notFound();

  const relatedRoles = careerRoles.filter(
    (r) =>
      r.slug !== role.slug &&
      Math.abs(r.experience - role.experience) <= 3 &&
      r.certifications.some((c) => role.certifications.includes(c) || c.includes('NDT') || c.includes('ASNT'))
  ).slice(0, 3);

  // Stable build-time date so SSG output is deterministic. validThrough = +90 days.
  const buildDate = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1));
  const datePosted = buildDate.toISOString().slice(0, 10);
  const validThrough = new Date(buildDate.getTime() + 90 * 24 * 3600 * 1000).toISOString().slice(0, 10);

  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: role.title,
    description: role.longDescription || role.description,
    datePosted,
    validThrough,
    employmentType: 'FULL_TIME',
    directApply: false,
    identifier: {
      '@type': 'PropertyValue',
      name: 'NDT Connect',
      value: `ndtc-role-${role.slug}`,
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: 'NDT Connect Marketplace',
      sameAs: 'https://ndt-connect.com',
      logo: 'https://ndt-connect.com/logo.png',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
      },
    },
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'United States',
    },
    jobLocationType: 'TELECOMMUTE',
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        minValue: role.salaryRange.min,
        maxValue: role.salaryRange.max,
        unitText: 'YEAR',
      },
    },
    qualifications: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: role.certifications.join(', '),
      },
    },
    experienceRequirements: {
      '@type': 'OccupationalExperienceRequirements',
      monthsOfExperience: role.experience * 12,
    },
  };

  const experienceLevel = role.experience === 0 ? 'Entry Level' : role.experience <= 5 ? 'Intermediate' : 'Senior';
  const competitivenessBenchmark = (role.salaryRange.max / 150000) * 100;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://ndt-connect.com' },
        { name: 'Careers', url: 'https://ndt-connect.com/careers' },
        { name: role.title, url: `https://ndt-connect.com/careers/${role.slug}` },
      ]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }} />

      <div className="max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/careers" className="hover:text-primary">Careers</Link>
          <span>/</span>
          <span className="text-foreground">{role.title}</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 mb-10">
          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <div>
              <Badge className="mb-3">{experienceLevel}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-primary">{role.title}</h1>
            </div>
            <TrendingUp className="h-12 w-12 text-primary opacity-20" />
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mb-8">{role.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/50 rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Salary Range</div>
              <div className="font-bold text-primary text-lg">
                ${(role.salaryRange.min / 1000).toFixed(0)}K-${(role.salaryRange.max / 1000).toFixed(0)}K
              </div>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Experience</div>
              <div className="font-bold text-primary text-lg">{role.experience}+ Years</div>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Demand</div>
              <div className="font-bold text-primary text-lg">High</div>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Job Growth</div>
              <div className="font-bold text-primary text-lg">Growing</div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            {role.longDescription && (
              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">About This Role</h2>
                <p className="text-muted-foreground leading-relaxed">{role.longDescription}</p>
              </section>
            )}

            {/* Key Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                Key Responsibilities
              </h2>
              <div className="space-y-3">
                {role.responsibilities.map((resp, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{resp}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Required Skills */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Award className="h-6 w-6" />
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {role.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-sm py-2 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Award className="h-6 w-6" />
                Required Certifications
              </h2>
              <div className="space-y-2">
                {role.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{cert}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button size="sm" asChild className="mt-4">
                <Link href="/certifications">View Certification Guide</Link>
              </Button>
            </section>

            {/* Career Growth */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Career Growth Potential
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-2">Current Level: {role.title}</div>
                      <div className="text-xs text-muted-foreground">Experience: {role.experience}+ years</div>
                      <div className="text-xs text-muted-foreground">Salary: ${(role.salaryRange.min / 1000).toFixed(0)}K-${(role.salaryRange.max / 1000).toFixed(0)}K</div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="text-xs font-semibold text-primary mb-2">Typical Advancement Path:</div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Gain specialized expertise in industry-specific methods</li>
                        <li>• Pursue advanced certifications (Level 3, API certifications)</li>
                        <li>• Transition to specialized roles or management</li>
                        <li>• Develop subject matter expertise in niche areas</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-1">SALARY RANGE</div>
                  <div className="text-xl font-bold text-primary">
                    ${(role.salaryRange.min / 1000).toFixed(0)}K-${(role.salaryRange.max / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Avg: ${(((role.salaryRange.min + role.salaryRange.max) / 2) / 1000).toFixed(0)}K/year
                  </div>
                  <Link href="/learn/ndt-inspector-salary-guide" className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-2">
                    Full NDT salary guide <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="border-t pt-4">
                  <div className="text-xs font-semibold text-muted-foreground mb-2">EXPERIENCE REQUIRED</div>
                  <div className="text-lg font-bold text-foreground">{role.experience}+ Years</div>
                </div>

                <div className="border-t pt-4">
                  <div className="text-xs font-semibold text-muted-foreground mb-2">CERTIFICATIONS</div>
                  <div className="text-sm font-semibold text-foreground">{role.certifications.length} Required</div>
                </div>

                <div className="border-t pt-4">
                  <div className="text-xs font-semibold text-muted-foreground mb-2">INDUSTRY DEMAND</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded ${i < 4 ? 'bg-primary' : 'bg-muted'}`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">High</div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/certifications">Get Certified</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/find-providers">Find Training</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/request-service">Search Jobs</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Related Roles */}
            {relatedRoles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Roles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatedRoles.map((relRole) => (
                    <Link
                      key={relRole.slug}
                      href={`/careers/roles/${relRole.slug}`}
                      className="block p-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <div className="font-semibold text-sm text-foreground hover:text-primary transition-colors">
                        {relRole.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ${(relRole.salaryRange.min / 1000).toFixed(0)}K-${(relRole.salaryRange.max / 1000).toFixed(0)}K
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center">
          <h2 className="text-2xl font-bold mb-4">Get found by companies hiring NDT inspectors</h2>
          <p className="mb-8 opacity-90 max-w-lg mx-auto">
            Create a free NDT Connect profile, showcase your certifications, and let employers and clients reach you directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register?role=provider">Create your free profile</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/certifications">View Certifications</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
