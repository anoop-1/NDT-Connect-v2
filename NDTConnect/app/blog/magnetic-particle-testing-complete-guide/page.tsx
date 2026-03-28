import { Metadata } from 'next';
import { BlogLayout, InfoBox, FeatureGrid, FeatureCard, CTASection } from '@/components/blog';
import { NDTConnectOrganizationSchema, FAQSchema, ArticleSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Magnetic Particle Testing (MT): The Complete Guide | NDT Connect',
  description: 'Everything you need to know about magnetic particle testing. Methods, equipment, procedures, standards, applications, and how to find certified MT inspectors.',
  keywords: ['magnetic particle testing', 'MPI', 'MT inspection', 'magnetic particle inspection', 'magnetic testing NDT'],
  alternates: { canonical: 'https://ndt-connect.com/blog/magnetic-particle-testing-complete-guide' },
};

export default function Page() {
  const faqs = [
    { question: 'What is magnetic particle testing?', answer: 'Magnetic particle testing (MT/MPI) is a non-destructive testing method used to detect surface and near-surface discontinuities in ferromagnetic materials. It works by magnetizing the test piece and applying ferromagnetic particles that accumulate at locations where the magnetic field is disrupted by defects.' },
    { question: 'What defects can magnetic particle testing find?', answer: 'MT can detect surface-breaking and near-surface cracks, laps, seams, inclusions, and other discontinuities in ferromagnetic materials like carbon steel, low alloy steel, and some stainless steels. It is particularly effective at finding cracks in welds, castings, and forgings.' },
    { question: 'What is the difference between wet and dry MT?', answer: 'Dry MT uses dry ferromagnetic powder applied directly to the test surface and is typically used outdoors or on rough surfaces. Wet MT uses particles suspended in a liquid carrier (water or oil-based) and provides greater sensitivity for detecting fine cracks, especially when using fluorescent particles under UV light.' },
    { question: 'What materials can be tested with MT?', answer: 'MT can only be used on ferromagnetic materials — primarily carbon steel, low alloy steel, and some grades of stainless steel (martensitic and some duplex grades). It cannot be used on austenitic stainless steel, aluminum, copper, titanium, or other non-ferromagnetic materials.' },
  ];

  return (
    <>
      <ArticleSchema title="Magnetic Particle Testing (MT): The Complete Guide" description="Everything you need to know about magnetic particle testing. Methods, equipment, procedures, standards, applications, and how to find certified MT inspectors." url="https://ndt-connect.com/blog/magnetic-particle-testing-complete-guide" datePublished="2026-03-03" category="Techniques" />
      <NDTConnectOrganizationSchema />
      <FAQSchema questions={faqs} />
      <BlogLayout
        title="Magnetic Particle Testing (MT): The Complete Guide"
        category="Techniques"
        date="March 3, 2026"
        readTime="13 min read"
        description="Everything you need to know about magnetic particle testing. Methods, equipment, procedures, standards, applications, and how to find certified MT inspectors."
      >

      <h2>How Magnetic Particle Testing Works</h2>
      <p>Magnetic particle testing operates on a simple but effective principle. When a ferromagnetic material is magnetized, discontinuities that lie in a direction generally transverse to the magnetic field will cause a leakage field at the surface. Ferromagnetic particles applied to the surface are attracted to and cluster at the leakage field, forming visible indications that can be interpreted by the inspector. The sensitivity of the method depends on the strength and direction of the magnetizing field relative to the defect orientation.</p>

      <h2>MT Equipment and Techniques</h2>
      <p>MT can be performed using several magnetization techniques. Yoke magnetization uses an electromagnet placed on the surface and is the most portable method. Prods apply current directly through the test piece via contact electrodes. Coils and central conductors are used for circumferential magnetization of cylindrical parts. For comprehensive coverage, inspections typically use two magnetization directions approximately 90 degrees apart. Equipment ranges from portable yokes ($500-$2,000) to bench units for production testing ($10,000-$50,000+).</p>

      <h2>MT Codes and Acceptance Criteria</h2>
      <p>Major codes governing MT include ASTM E709 (standard guide), ASME Section V Article 7 (examination requirements), and specific acceptance criteria in fabrication codes like AWS D1.1, ASME Section VIII, and API standards. Acceptance criteria specify allowable indication sizes — typically based on linear and rounded indication dimensions. Understanding the applicable code and its acceptance criteria is essential for making proper accept/reject decisions.</p>

      <h2>Applications Across Industries</h2>
      <p>MT is widely used across industries for weld inspection, casting examination, in-service crack detection, and maintenance inspection. In the oil and gas sector, MT is commonly used for inspecting pipeline welds, pressure vessel welds, and structural connections. In manufacturing, it is used for quality control of castings, forgings, and machined components. In construction, MT inspects structural steel welds per AWS D1.1. Find certified MT inspectors on NDT Connect for your next project.</p>


      <InfoBox title="Find the Right NDT Method">
        <p>Not sure which testing method you need? Use the <a href="https://ndt-connect.com/tools/ndt-method-selector">NDT Method Selector</a> tool on NDT Connect to get expert recommendations for your application.</p>
      </InfoBox>

      <h2>Frequently Asked Questions</h2>

        <details className="border rounded-lg p-4 mb-3">
          <summary className="font-medium cursor-pointer">What is magnetic particle testing?</summary>
          <p className="mt-3 text-muted-foreground text-sm">Magnetic particle testing (MT/MPI) is a non-destructive testing method used to detect surface and near-surface discontinuities in ferromagnetic materials. It works by magnetizing the test piece and applying ferromagnetic particles that accumulate at locations where the magnetic field is disrupted by defects.</p>
        </details>
        <details className="border rounded-lg p-4 mb-3">
          <summary className="font-medium cursor-pointer">What defects can magnetic particle testing find?</summary>
          <p className="mt-3 text-muted-foreground text-sm">MT can detect surface-breaking and near-surface cracks, laps, seams, inclusions, and other discontinuities in ferromagnetic materials like carbon steel, low alloy steel, and some stainless steels. It is particularly effective at finding cracks in welds, castings, and forgings.</p>
        </details>
        <details className="border rounded-lg p-4 mb-3">
          <summary className="font-medium cursor-pointer">What is the difference between wet and dry MT?</summary>
          <p className="mt-3 text-muted-foreground text-sm">Dry MT uses dry ferromagnetic powder applied directly to the test surface and is typically used outdoors or on rough surfaces. Wet MT uses particles suspended in a liquid carrier (water or oil-based) and provides greater sensitivity for detecting fine cracks, especially when using fluorescent particles under UV light.</p>
        </details>
        <details className="border rounded-lg p-4 mb-3">
          <summary className="font-medium cursor-pointer">What materials can be tested with MT?</summary>
          <p className="mt-3 text-muted-foreground text-sm">MT can only be used on ferromagnetic materials — primarily carbon steel, low alloy steel, and some grades of stainless steel (martensitic and some duplex grades). It cannot be used on austenitic stainless steel, aluminum, copper, titanium, or other non-ferromagnetic materials.</p>
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
