import { Metadata } from 'next';
import { BlogLayout, InfoBox, FeatureGrid, FeatureCard, CTASection } from '@/components/blog';
import { NDTConnectOrganizationSchema, FAQSchema, ArticleSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Phased Array Ultrasonic Testing (PAUT): Complete Technical Guide | NDT Connect',
  description: 'Comprehensive guide to phased array ultrasonic testing technology. Learn PAUT principles, advantages over conventional UT, applications, codes, and how to find PAUT service providers.',
  keywords: ['phased array ultrasonic testing', 'PAUT', 'phased array UT', 'PAUT inspection', 'advanced UT techniques'],
  openGraph: {
    title: 'Phased Array Ultrasonic Testing (PAUT): Complete Technical Guide | NDT Connect',
    description: 'Comprehensive guide to phased array ultrasonic testing technology. Learn PAUT principles, advantages over conventional UT, applications, codes, and how to find PAUT service providers.',
    url: 'https://ndt-connect.com/blog/phased-array-ultrasonic-testing-guide',
    type: 'article',
    siteName: 'NDT Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phased Array Ultrasonic Testing (PAUT): Complete Technical Guide | NDT Connect',
    description: 'Comprehensive guide to phased array ultrasonic testing technology. Learn PAUT principles, advantages over conventional UT, applications, codes, and how to find PAUT service providers.',
  },
  alternates: { canonical: 'https://ndt-connect.com/blog/phased-array-ultrasonic-testing-guide' },
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
      <p>Phased array ultrasonic testing uses probes containing multiple small ultrasonic elements (typically 16 to 128) that can be individually controlled. By varying the timing (phasing) of the excitation pulses to each element, the system can electronically steer the beam to different angles, focus at different depths, and scan across the probe aperture. This produces sector scans (S-scans), linear scans, and compound scans that provide detailed cross-sectional images of the test piece.</p>

      <h2>PAUT vs Conventional UT</h2>
      <p>While conventional UT uses a single element probe that produces one beam at a fixed angle, PAUT can sweep through multiple angles simultaneously. This means a single PAUT scan can replace multiple conventional UT scans with different angle probes. The result is faster inspection, better coverage, improved probability of detection, and more accurate defect sizing. PAUT also produces permanent image records that can be reviewed and re-analyzed after the inspection.</p>

      <h2>PAUT Applications</h2>
      <p>PAUT has become the preferred inspection method for many applications including pipeline girth weld inspection (replacing radiography in many cases), pressure vessel weld examination, turbine and generator rotor inspection, composite material testing in aerospace, and corrosion mapping. The method is particularly valuable where conventional UT would require multiple probe angles or where comprehensive coverage documentation is required.</p>

      <h2>Finding PAUT Service Providers</h2>
      <p>PAUT requires specialized equipment and highly trained technicians, typically certified to ASNT Level II or III with specific PAUT training. When selecting a PAUT service provider, verify their technicians hold appropriate certifications, their equipment is properly calibrated, and they have experience with your specific application. NDT Connect lists certified PAUT providers worldwide — use the Find Providers feature to search by location and method.</p>


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
