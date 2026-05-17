import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NDT Case Studies | Real Inspection Success Stories',
  description: 'See how NDT Connect helps asset owners find certified inspectors and complete NDT inspections efficiently. Real-world case studies from oil & gas, aerospace, and more.',
  keywords: ['NDT case studies', 'NDT success stories', 'inspection case study', 'NDT Connect examples'],
  openGraph: { title: 'NDT Case Studies', description: 'Real-world NDT inspection success stories.', url: 'https://ndt-connect.com/case-studies' },
  alternates: { canonical: 'https://ndt-connect.com/case-studies' },
};

const caseStudies = [
  {
    title: 'Refinery Turnaround Inspection - 200+ Weld Joints in 5 Days',
    industry: 'Oil & Gas',
    location: 'Houston, TX',
    methods: ['PAUT', 'TOFD', 'MT'],
    challenge: 'A major Gulf Coast refinery needed 200+ weld joints inspected during a 5-day turnaround window. Traditional sourcing would take weeks to arrange qualified inspectors.',
    solution: 'Using NDT Connect, the refinery posted a service request and received responses from 8 qualified PAUT/TOFD teams within 24 hours. They selected 3 teams based on certifications, pricing, and availability.',
    results: ['All 200+ joints inspected within the 5-day window', '35% cost savings vs. traditional contractor sourcing', 'Real-time tracking enabled project managers to monitor progress', 'Digital reports delivered same-day'],
    timeToBook: '24 hours',
  },
  {
    title: 'Offshore Platform Structural Assessment',
    industry: 'Marine & Offshore',
    location: 'North Sea, Aberdeen',
    methods: ['UT', 'MT', 'VT', 'Corrosion Mapping'],
    challenge: 'An aging North Sea platform required comprehensive structural integrity assessment including underwater inspections. Finding multiple specialized teams in Aberdeen for a tight weather window was critical.',
    solution: 'NDT Connect matched the operator with 5 local Aberdeen-based providers experienced in offshore work. The platform could compare qualifications, insurance, and offshore certifications side-by-side.',
    results: ['Full structural assessment completed in one weather window', 'Multi-disciplinary team coordinated through single platform', 'Comprehensive corrosion mapping delivered digitally', 'Reduced mobilization costs with local providers'],
    timeToBook: '48 hours',
  },
  {
    title: 'Pipeline Integrity Program - 500km Cross-Country',
    industry: 'Pipeline',
    location: 'Calgary, Alberta',
    methods: ['GWT', 'UT', 'PAUT'],
    challenge: 'A pipeline operator needed guided wave screening across 500km of cross-country pipeline including road crossings and river crossings, followed by detailed UT on flagged areas.',
    solution: 'Through NDT Connect, the operator sourced a specialized GWT team for the initial screening and separate PAUT teams for follow-up detailed inspection, all coordinated through the platform.',
    results: ['500km pipeline screened in 6 weeks', '45 areas flagged for detailed follow-up', 'Seamless handoff between screening and detailed inspection teams', 'Complete digital audit trail for regulatory compliance'],
    timeToBook: '3 days',
  },
  {
    title: 'Aerospace Component Manufacturing QA',
    industry: 'Aerospace',
    location: 'Seattle, WA',
    methods: ['UT', 'ET', 'PT'],
    challenge: 'An aerospace manufacturer needed additional certified NDT personnel to handle a surge in production without the lengthy process of hiring and certifying in-house staff.',
    solution: 'NDT Connect provided access to pre-certified Level II inspectors with NAS 410 qualifications who could be mobilized within days rather than the months required for in-house certification.',
    results: ['Production bottleneck eliminated within one week', 'All inspectors pre-verified with NAS 410 certifications', 'Flexible staffing scaled up and down with demand', 'Zero quality escapes maintained throughout surge'],
    timeToBook: '48 hours',
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-foreground">Case Studies</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">NDT Connect Case Studies</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        See how asset owners and industrial operators use NDT Connect to find certified inspectors, reduce costs, and complete inspections faster.
      </p>

      <div className="space-y-8 mb-12">
        {caseStudies.map((cs, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <Badge>{cs.industry}</Badge>
                <span className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3 w-3" /> {cs.location}</span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-3 w-3" /> Booked in {cs.timeToBook}</span>
              </div>
              <CardTitle className="text-xl">{cs.title}</CardTitle>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {cs.methods.map((m, j) => <Badge key={j} variant="outline" className="text-xs">{m}</Badge>)}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-sm mb-2 text-amber-600">Challenge</h3>
                  <p className="text-sm text-muted-foreground">{cs.challenge}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-2 text-blue-600">Solution</h3>
                  <p className="text-sm text-muted-foreground">{cs.solution}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-2 text-green-600">Results</h3>
                  <ul className="space-y-2">
                    {cs.results.map((r, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center">
        <h2 className="text-2xl font-bold mb-4">Ready for Your Own Success Story?</h2>
        <p className="mb-6 opacity-90 max-w-lg mx-auto">Join NDT Connect and experience faster, more efficient NDT service sourcing.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" asChild><Link href="/register">Get Started Free</Link></Button>
          <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild><Link href="/find-providers">Find Inspectors</Link></Button>
        </div>
      </section>
    </div>
  );
}
