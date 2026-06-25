import { Metadata } from 'next';
import { BlogLayout, InfoBox, FeatureGrid, FeatureCard, CTASection } from '@/components/blog';
import { NDTConnectOrganizationSchema, FAQSchema, ArticleSchema, BreadcrumbListSchema } from '@/components/seo/SchemaMarkup';

// Title rewrite (SEO sprint 2026-05-15): added concrete benefit numbers
// (vs UT, equipment cost) and CTA-style trailer. Was 612 impr @ 0.16% CTR
// at pos 50 — generic "Complete Technical Guide" gave readers no reason
// to choose this over a dozen identical SERP results.
export const metadata: Metadata = {
  title: 'PAUT (Phased Array UT) Guide [2026]: How It Works, Cost vs Conventional UT',
  description: 'PAUT explained: principles, equipment cost, advantages over conventional UT, code coverage (ASME V, ISO 13588), and how to hire certified PAUT inspectors. 2026 buyer & technician guide.',
  keywords: ['phased array ultrasonic testing', 'PAUT', 'phased array UT', 'PAUT inspection', 'advanced UT techniques', 'PAUT vs UT', 'PAUT cost'],
  openGraph: {
    title: 'PAUT (Phased Array UT) Guide [2026]: How It Works, Cost vs Conventional UT',
    description: 'PAUT explained: principles, equipment cost, advantages over conventional UT, code coverage, and how to hire certified PAUT inspectors. 2026 guide.',
    url: 'https://ndt-connect.com/blog/phased-array-ultrasonic-testing-guide',
    type: 'article',
    siteName: 'NDT Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PAUT Complete Guide — How It Works, Cost, vs Conventional UT (2026)',
    description: 'PAUT explained: principles, cost, advantages over conventional UT, code coverage, and how to hire certified inspectors.',
  },
  // Cannibalization fix: this older blog (GSC pos ~45) competes with the deeper
  // /pillars/phased-array-complete-guide + /methods/phased-array-ut. Canonicalize
  // to the cornerstone so ranking signal consolidates there.
  alternates: { canonical: 'https://ndt-connect.com/pillars/phased-array-complete-guide' },
};

export default function Page() {
  const faqs = [
    { question: 'What is phased array ultrasonic testing?', answer: 'Phased array ultrasonic testing (PAUT) is an advanced NDT technique that uses multiple ultrasonic elements pulsed independently to steer and focus sound beams electronically. This allows a single probe to generate multiple angles and focal depths without mechanical movement, providing faster and more comprehensive inspection than conventional UT.' },
    { question: 'What are the advantages of PAUT over conventional UT?', answer: 'PAUT offers faster inspection speeds (up to 10x), better defect detection and sizing accuracy, real-time imaging (S-scans and B-scans), electronic beam steering eliminating the need for multiple probes, improved coverage verification, and permanent digital records for traceability.' },
    { question: 'How much does PAUT inspection cost?', answer: 'PAUT inspection typically costs $1,500 to $5,000 per day depending on the application complexity, probe requirements, and location. While more expensive than conventional UT, PAUT often provides better value due to faster inspection speeds and improved reliability.' },
  ];

  return (
    <>
      <ArticleSchema title="Phased Array Ultrasonic Testing (PAUT): Complete Technical Guide" description="Comprehensive guide to phased array ultrasonic testing technology. Learn PAUT principles, advantages over conventional UT, applications, codes, and how to find PAUT service providers." url="https://ndt-connect.com/blog/phased-array-ultrasonic-testing-guide" datePublished="2026-02-10" category="Techniques" />
      <BreadcrumbListSchema items={[
        { name: 'Home', url: 'https://ndt-connect.com' },
        { name: 'Blog', url: 'https://ndt-connect.com/blog' },
        { name: 'Phased Array Ultrasonic Testing (PAUT): Complete Technical Guide', url: 'https://ndt-connect.com/blog/phased-array-ultrasonic-testing-guide' },
      ]} />
      <NDTConnectOrganizationSchema />
      <FAQSchema questions={faqs} />
      <BlogLayout
        title="Phased Array Ultrasonic Testing (PAUT): Complete Technical Guide"
        category="Techniques"
        date="February 10, 2026"
        readTime="14 min read"
        description="Comprehensive guide to phased array ultrasonic testing technology. Learn PAUT principles, advantages over conventional UT, applications, codes, and how to find PAUT service providers."
      >

      <h2>PAUT Technology Explained</h2>
      <p>Phased array ultrasonic testing uses probes containing multiple small ultrasonic elements (typically 16 to 128) that can be individually controlled. By varying the timing (phasing) of the excitation pulses to each element, the system can electronically steer the beam to different angles, focus at different depths, and scan across the probe aperture. This produces sector scans (S-scans), linear scans, and compound scans that provide detailed cross-sectional images of the test piece. The <a href="https://ut-testing-academy.vercel.app/ut-phased-array-intro">UT Testing Academy phased-array primer</a> walks through beam-forming maths and probe geometry in more depth for technicians moving from conventional UT to PAUT.</p>

      <h2>PAUT vs Conventional UT</h2>
      <p>While conventional UT uses a single element probe that produces one beam at a fixed angle, PAUT can sweep through multiple angles simultaneously. This means a single PAUT scan can replace multiple conventional UT scans with different angle probes. The result is faster inspection, better coverage, improved probability of detection, and more accurate defect sizing. PAUT also produces permanent image records that can be reviewed and re-analyzed after the inspection. Where the choice is between PAUT and radiography on a weld scope, our <a href="https://ndt-connect.com/blog/ut-vs-rt-comparison">UT vs RT comparison</a> walks through the practical trade-offs and the <a href="https://rt-testing-hub.vercel.app/rt-vs-other-methods">RT Testing Hub method-vs-method breakdown</a> covers the radiography side in detail.</p>

      <h2>PAUT Applications</h2>
      <p>PAUT has become the preferred inspection method for many applications including pipeline girth weld inspection (replacing radiography in many cases), pressure vessel weld examination, turbine and generator rotor inspection, composite material testing in aerospace, and corrosion mapping. The method is particularly valuable where conventional UT would require multiple probe angles or where comprehensive coverage documentation is required. Code-driven weld scopes — AWS D1.1, ASME Section VIII, ISO 13588 — are explored in the <a href="https://weld-inspection-pro.vercel.app/weld-ut-inspection">Weld Inspection Pro UT-on-welds reference</a>, which maps PAUT acceptance criteria onto the joint types most procurement teams have to deal with.</p>

      <h2>Finding PAUT Service Providers</h2>
      <p>PAUT requires specialized equipment and highly trained technicians, typically certified to ASNT Level II or III with specific PAUT training. When selecting a PAUT service provider, verify their technicians hold appropriate certifications, their equipment is properly calibrated, and they have experience with your specific application. NDT Connect lists certified PAUT providers worldwide — use <a href="https://ndt-connect.com/find-providers">Find Providers</a> to search by location and method, or jump straight to a city page like <a href="https://ndt-connect.com/ndt-services/houston/phased-array-ut">PAUT in Houston</a> for refinery and petrochemical scopes. For a budget anchor before you post the scope, the <a href="https://ndt-connect.com/cost-guide/houston/phased-array-ut">Houston PAUT cost guide</a> sets the field-anchored hourly band.</p>


      <InfoBox title="Find the Right NDT Method">
        <p>Not sure which testing method you need? Use the <a href="https://ndt-connect.com/tools/ndt-method-selector">NDT Method Selector</a> tool on NDT Connect to get expert recommendations for your application.</p>
      </InfoBox>

      <h2>Frequently Asked Questions</h2>

        <details className="border rounded-lg p-4 mb-3">
          <summary className="font-medium cursor-pointer">What is phased array ultrasonic testing?</summary>
          <p className="mt-3 text-muted-foreground text-sm">Phased array ultrasonic testing (PAUT) is an advanced NDT technique that uses multiple ultrasonic elements pulsed independently to steer and focus sound beams electronically. This allows a single probe to generate multiple angles and focal depths without mechanical movement, providing faster and more comprehensive inspection than conventional UT.</p>
        </details>
        <details className="border rounded-lg p-4 mb-3">
          <summary className="font-medium cursor-pointer">What are the advantages of PAUT over conventional UT?</summary>
          <p className="mt-3 text-muted-foreground text-sm">PAUT offers faster inspection speeds (up to 10x), better defect detection and sizing accuracy, real-time imaging (S-scans and B-scans), electronic beam steering eliminating the need for multiple probes, improved coverage verification, and permanent digital records for traceability.</p>
        </details>
        <details className="border rounded-lg p-4 mb-3">
          <summary className="font-medium cursor-pointer">How much does PAUT inspection cost?</summary>
          <p className="mt-3 text-muted-foreground text-sm">PAUT inspection typically costs $1,500 to $5,000 per day depending on the application complexity, probe requirements, and location. While more expensive than conventional UT, PAUT often provides better value due to faster inspection speeds and improved reliability.</p>
        </details>

      <CTASection
        title="Need NDT Inspection Services?"
        description="Connect with certified NDT providers worldwide on NDT Connect — the #1 marketplace for non-destructive testing."
        buttonText="Find NDT Providers"
        buttonHref="https://ndt-connect.com/find-providers"
      />
      </BlogLayout>
    </>
  );
}
