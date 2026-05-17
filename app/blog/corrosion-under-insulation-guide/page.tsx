import { Metadata } from 'next';
import { BlogLayout, InfoBox, FeatureGrid, FeatureCard, CTASection } from '@/components/blog';
import { NDTConnectOrganizationSchema, FAQSchema , ArticleSchema, BreadcrumbListSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Corrosion Under Insulation (CUI): Detection & Prevention Guide',
  description: 'Complete guide to Corrosion Under Insulation. Learn CUI detection methods, NDT techniques, prevention strategies, and inspection best practices for insulated piping and equipment.',
  keywords: ['corrosion under insulation', 'CUI detection', 'CUI NDT', 'CUI inspection', 'insulated pipe corrosion', 'CUI prevention'],
  openGraph: { title: 'Corrosion Under Insulation Guide', description: 'Complete CUI detection and prevention guide for industrial assets.', url: 'https://ndt-connect.com/blog/corrosion-under-insulation-guide', type: 'article', siteName: 'NDT Connect' },
  twitter: {
    card: 'summary_large_image',
    title: 'Corrosion Under Insulation (CUI): Detection & Prevention Guide',
    description: 'Complete guide to Corrosion Under Insulation. Learn CUI detection methods, NDT techniques, prevention strategies, and inspection best practices for insulated piping and equipment.',
  },
  alternates: { canonical: 'https://ndt-connect.com/blog/corrosion-under-insulation-guide' },
};

export default function CUIGuide() {
  const faqs = [
    { question: 'What is Corrosion Under Insulation (CUI)?', answer: 'Corrosion Under Insulation is external corrosion that occurs on piping and equipment surfaces beneath thermal insulation. Moisture ingress through damaged insulation creates a trapped corrosive environment that cannot be visually detected without insulation removal.' },
    { question: 'What NDT methods detect CUI?', answer: 'CUI can be detected using profile radiography, pulsed eddy current testing, guided wave ultrasonic testing, infrared thermography, and neutron backscatter techniques without removing insulation. Conventional UT and VT can be used after insulation removal.' },
    { question: 'What temperature range is most susceptible to CUI?', answer: 'Carbon steel operating between -4°C and 175°C (25°F to 350°F) is most susceptible to CUI. Stainless steel is susceptible to chloride stress corrosion cracking under insulation between 50°C and 175°C (120°F to 350°F).' },
  ];

  return (
    <>
            <ArticleSchema title="Corrosion Under Insulation: Detection and Prevention Guide" description="Complete guide to CUI detection and prevention for industrial assets." url="https://ndt-connect.com/blog/corrosion-under-insulation-guide" datePublished="2026-01-20" category="Techniques" />
      <BreadcrumbListSchema items={[
        { name: 'Home', url: 'https://ndt-connect.com' },
        { name: 'Blog', url: 'https://ndt-connect.com/blog' },
        { name: 'Corrosion Under Insulation (CUI): The Complete Detection & Prevention Guide', url: 'https://ndt-connect.com/blog/corrosion-under-insulation-guide' },
      ]} />
      <NDTConnectOrganizationSchema />
      <FAQSchema questions={faqs} />
      <BlogLayout
        title="Corrosion Under Insulation (CUI): The Complete Detection & Prevention Guide"
        category="Techniques"
        date="January 20, 2026"
        readTime="14 min read"
        description="Everything you need to know about CUI - the hidden corrosion threat costing the petrochemical industry billions annually. Detection methods, NDT techniques, and prevention strategies."
      >
        <nav className="bg-muted/50 rounded-lg p-5 mb-8 not-prose">
          <h2 className="font-semibold text-foreground mb-3">Table of Contents</h2>
          <ul className="space-y-1 text-sm text-primary">
            <li><a href="#what-is-cui" className="hover:underline">1. What is CUI?</a></li>
            <li><a href="#why-dangerous" className="hover:underline">2. Why CUI is So Dangerous</a></li>
            <li><a href="#susceptible" className="hover:underline">3. What Makes Equipment Susceptible</a></li>
            <li><a href="#detection" className="hover:underline">4. NDT Detection Methods</a></li>
            <li><a href="#prevention" className="hover:underline">5. Prevention Strategies</a></li>
            <li><a href="#inspection-program" className="hover:underline">6. Building a CUI Inspection Program</a></li>
          </ul>
        </nav>

        <section id="what-is-cui">
          <h2>1. What is Corrosion Under Insulation?</h2>
          <p>
            Corrosion Under Insulation (CUI) is one of the most insidious forms of degradation affecting industrial
            assets. It occurs when moisture penetrates thermal insulation and becomes trapped against the metal
            surface, creating a persistent corrosive environment hidden from view. Unlike external corrosion that
            can be spotted visually, CUI progresses silently until it causes leaks, structural failures, or
            catastrophic releases.
          </p>
          <p>
            The petrochemical and refining industries estimate that CUI accounts for 40-60% of all piping
            maintenance costs. In the United States alone, CUI-related damage costs the industry an estimated
            $2.7 billion annually. Despite this enormous impact, CUI remains one of the most challenging
            degradation mechanisms to manage because traditional visual inspection is impossible without
            removing insulation. The <a href="https://corrosion-engineering-guide.vercel.app/">Corrosion Engineering Guide</a> covers the underlying electrochemistry and material-selection levers that drive CUI rates; the <a href="https://industrial-coating-inspection.vercel.app/">Industrial Coating Inspection</a> reference walks through coating-specification choices that change the CUI risk profile from day one.
          </p>
          <InfoBox title="Industry Impact">
            CUI is responsible for approximately 81% of corrosion failures in refinery piping systems operating
            within the susceptible temperature range. API 570 and API 571 identify CUI as one of the top damage
            mechanisms requiring specific inspection strategies.
          </InfoBox>
        </section>

        <section id="why-dangerous">
          <h2>2. Why CUI is So Dangerous</h2>
          <p>Several factors make CUI particularly hazardous:</p>
          <ul>
            <li><strong>Hidden from View:</strong> Corrosion develops beneath insulation where it cannot be seen during routine walkdowns or visual inspections.</li>
            <li><strong>Accelerated Rates:</strong> Trapped moisture creates a constantly wet environment, accelerating corrosion far beyond normal atmospheric rates.</li>
            <li><strong>Widespread Occurrence:</strong> CUI can affect large areas of piping simultaneously, creating the risk of multiple failures.</li>
            <li><strong>Difficult to Predict:</strong> Corrosion rates vary dramatically based on local conditions - moisture ingress points, insulation damage, and microclimate effects.</li>
            <li><strong>Catastrophic Consequences:</strong> Undetected CUI can lead to loss-of-containment events, fires, environmental releases, and injuries.</li>
          </ul>

          <h3>CUI on Carbon Steel</h3>
          <p>
            Carbon steel piping and equipment experience general and localized corrosion under wet insulation.
            The corrosion rate depends on temperature, moisture exposure time, and the corrosiveness of any
            contaminants in the moisture (chlorides, sulfur compounds, etc.). Rates can exceed 1mm/year in severe cases.
          </p>

          <h3>CUI on Stainless Steel</h3>
          <p>
            Austenitic stainless steels (304, 316) are susceptible to chloride stress corrosion cracking (Cl-SCC)
            under insulation. This form of CUI produces branching cracks that can lead to sudden, brittle failure
            with little warning. Chlorides may come from insulation materials, coastal environments, or process leaks.
          </p>
        </section>

        <section id="susceptible">
          <h2>3. What Makes Equipment Susceptible</h2>
          <p>Key risk factors for CUI include:</p>

          <FeatureGrid>
            <FeatureCard title="Temperature Range">
              <p>Carbon steel: -4°C to 175°C is the highest risk zone. Stainless steel: 50°C to 175°C for Cl-SCC. Equipment that cycles through the dew point is especially vulnerable.</p>
            </FeatureCard>
            <FeatureCard title="Insulation Condition">
              <p>Damaged caulking, missing jacketing, cracked insulation, and areas where insulation terminates are primary moisture ingress points.</p>
            </FeatureCard>
            <FeatureCard title="Climate &amp; Location">
              <p>High-humidity environments, coastal locations (salt-laden air), and areas with frequent rainfall dramatically increase CUI risk.</p>
            </FeatureCard>
            <FeatureCard title="Design Features">
              <p>Dead legs, penetrations, pipe supports, steam tracing connections, and areas where water can pool on horizontal runs are high-risk locations.</p>
            </FeatureCard>
          </FeatureGrid>
        </section>

        <section id="detection">
          <h2>4. NDT Detection Methods for CUI</h2>
          <p>
            Several NDT methods can detect CUI, each with different capabilities for inspecting through insulation
            without removal:
          </p>

          <h3>Profile Radiography (RT)</h3>
          <p>
            Tangential radiographic shots through insulated pipe reveal wall loss as changes in the pipe wall
            profile. This method can detect significant wall thinning without insulation removal but requires
            radiation safety precautions and provides limited coverage per exposure.
          </p>

          <h3>Pulsed Eddy Current (PEC)</h3>
          <p>
            PEC can measure average wall thickness through insulation, weather jacketing, and even
            aluminum cladding up to 150mm total thickness. It provides a screening tool to identify areas
            of concern for follow-up with more precise methods. PEC is fast and does not require insulation removal.
          </p>

          <h3>Guided Wave Testing (GWT)</h3>
          <p>
            GWT can screen long sections of insulated piping from a single probe position. While it requires
            a small section of insulation to be removed for probe attachment, a single test can screen 30-50
            meters in each direction, identifying areas of wall loss that require detailed follow-up inspection.
            For detailed scopes and budget anchors, <a href="https://ndt-connect.com/cost-guide/houston/ultrasonic-testing">Houston UT cost guide</a> sets the field rate and the <a href="https://ndt-connect.com/find-providers">find-providers directory</a> filters by GWT capability and refinery experience. CUI on pressure vessels and storage tanks specifically is covered in our <a href="https://ndt-connect.com/blog/rbi-corrosion-management">risk-based inspection guide</a>.
          </p>

          <h3>Infrared Thermography</h3>
          <p>
            Thermal imaging can identify areas where moisture has saturated insulation, as wet insulation has
            different thermal characteristics. While this method does not directly detect corrosion, it identifies
            moisture ingress areas where CUI is most likely developing.
          </p>

          <h3>Neutron Backscatter</h3>
          <p>
            This technique detects moisture within insulation by measuring the backscatter of neutrons from
            hydrogen atoms in water. It provides a quantitative map of moisture content, identifying exactly
            where water is present beneath the insulation.
          </p>

          <h3>Conventional UT (After Insulation Removal)</h3>
          <p>
            When screening methods identify suspect areas, targeted insulation removal followed by conventional
            ultrasonic thickness measurement provides the most accurate assessment of remaining wall thickness
            and corrosion severity.
          </p>
        </section>

        <section id="prevention">
          <h2>5. Prevention Strategies</h2>
          <p>The most effective CUI management combines prevention with inspection:</p>
          <ul>
            <li><strong>Protective Coatings:</strong> Apply high-quality coatings (TSA, epoxy, or silicone-based) to metal surfaces before insulating. This is the single most effective prevention measure.</li>
            <li><strong>Insulation Selection:</strong> Use closed-cell insulation materials that resist moisture absorption. Avoid chloride-containing materials near stainless steel.</li>
            <li><strong>Quality Jacketing:</strong> Ensure weather jacketing is properly sealed with adequate overlap, and caulking is maintained at all penetrations and terminations.</li>
            <li><strong>Design Improvements:</strong> Eliminate water traps, ensure proper drainage slopes, and minimize penetrations through insulation.</li>
            <li><strong>Maintenance Programs:</strong> Regular visual inspection of insulation condition, prompt repair of jacketing damage, and re-caulking of joints.</li>
          </ul>
        </section>

        <section id="inspection-program">
          <h2>6. Building a CUI Inspection Program</h2>
          <p>
            An effective CUI inspection program follows a risk-based approach aligned with API 570 and API 583
            guidelines:
          </p>
          <ol>
            <li><strong>Risk Ranking:</strong> Identify and rank all insulated piping and equipment based on operating temperature, insulation condition, age, coating condition, and environmental exposure.</li>
            <li><strong>Screening Inspection:</strong> Use non-intrusive methods (PEC, GWT, thermography) to screen high-risk circuits without insulation removal.</li>
            <li><strong>Targeted Stripping:</strong> Remove insulation at locations identified by screening or at pre-determined high-risk locations for detailed UT measurement.</li>
            <li><strong>Condition Assessment:</strong> Evaluate coating condition, measure wall thickness, and determine corrosion rates at stripped locations.</li>
            <li><strong>Remediation:</strong> Repair or replace corroded sections, apply or repair protective coatings, and re-insulate with improved materials and jacketing.</li>
            <li><strong>Documentation:</strong> Record all findings in an inspection database to support trending and future risk assessments.</li>
          </ol>

          <InfoBox title="Best Practice">
            API 583 recommends a systematic CUI management program that integrates risk assessment, screening
            inspection, targeted detailed inspection, and remediation into a continuous improvement cycle.
          </InfoBox>
        </section>

        <CTASection
          title="Need CUI Inspection Services?"
          description="Find certified NDT providers experienced in CUI detection and assessment. Get quotes from specialists with PEC, GWT, and conventional inspection capabilities."
          buttonText="Find CUI Inspectors"
          buttonHref="/find-providers"
        />
      </BlogLayout>
    </>
  );
}
