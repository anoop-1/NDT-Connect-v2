import { Metadata } from 'next';
import { BlogLayout, InfoBox, FeatureGrid, FeatureCard, CTASection } from '@/components/blog';
import { NDTConnectOrganizationSchema, FAQSchema , ArticleSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Complete Guide to Weld Inspection: NDT Methods & Standards | NDT Connect',
  description: 'Comprehensive weld inspection guide covering all NDT methods, acceptance criteria, common weld defects, applicable codes (AWS D1.1, ASME IX), and best practices.',
  keywords: ['weld inspection', 'weld NDT', 'weld testing', 'weld defects', 'AWS D1.1', 'ASME IX', 'weld quality', 'welding inspection'],
  openGraph: { title: 'Complete Weld Inspection Guide | NDT Connect', description: 'Everything about weld inspection NDT methods, codes, and best practices.', url: 'https://ndt-connect.com/blog/weld-inspection-complete-guide' },
  alternates: { canonical: 'https://ndt-connect.com/blog/weld-inspection-complete-guide' },
};

export default function WeldInspectionGuide() {
  const faqs = [
    { question: 'What NDT methods are used for weld inspection?', answer: 'Common weld inspection NDT methods include Visual Testing (VT), Ultrasonic Testing (UT), Radiographic Testing (RT), Magnetic Particle Testing (MT), Liquid Penetrant Testing (PT), Phased Array UT (PAUT), and TOFD. Method selection depends on the weld type, material, code requirements, and defect types of concern.' },
    { question: 'What are the most common weld defects?', answer: 'Common weld defects include porosity, lack of fusion, incomplete penetration, slag inclusions, undercut, cracks (hot and cold), excessive reinforcement, burn-through, and distortion. Each has specific causes and NDT detection methods.' },
    { question: 'When is weld inspection required?', answer: 'Weld inspection is required by virtually all fabrication and construction codes including AWS D1.1, ASME BPVC, API 1104, and EN 1090. The extent of inspection (percentage of welds tested) depends on the joint category, service conditions, and code requirements.' },
  ];

  return (
    <>
            <ArticleSchema title="Weld Inspection Complete Guide" description="Complete guide to weld inspection methods, codes, and best practices." url="https://ndt-connect.com/blog/weld-inspection-complete-guide" datePublished="2026-03-01" category="Techniques" />
      <NDTConnectOrganizationSchema />
      <FAQSchema questions={faqs} />
      <BlogLayout
        title="The Complete Guide to Weld Inspection: NDT Methods, Standards & Best Practices"
        category="Techniques"
        date="March 1, 2026"
        readTime="16 min read"
        description="Everything you need to know about weld inspection - from pre-weld checks to final acceptance. NDT methods, common defects, applicable codes, and how to ensure weld quality."
      >
        <nav className="bg-muted/50 rounded-lg p-5 mb-8 not-prose">
          <h2 className="font-semibold text-foreground mb-3">Table of Contents</h2>
          <ul className="space-y-1 text-sm text-primary">
            <li><a href="#why-inspect" className="hover:underline">1. Why Weld Inspection Matters</a></li>
            <li><a href="#defects" className="hover:underline">2. Common Weld Defects</a></li>
            <li><a href="#ndt-methods" className="hover:underline">3. NDT Methods for Welds</a></li>
            <li><a href="#codes" className="hover:underline">4. Applicable Codes & Standards</a></li>
            <li><a href="#stages" className="hover:underline">5. Stages of Weld Inspection</a></li>
            <li><a href="#choosing-method" className="hover:underline">6. Choosing the Right Method</a></li>
          </ul>
        </nav>

        <section id="why-inspect">
          <h2>1. Why Weld Inspection Matters</h2>
          <p>
            Welding is the primary joining process for metallic structures across all industries. From pressure
            vessels and pipelines to bridges and aircraft, the integrity of welded joints directly determines the
            safety and service life of the structure. Weld inspection using NDT methods is the primary means of
            verifying that welds meet the required quality standards.
          </p>
          <p>
            Weld defects that go undetected can lead to catastrophic failures. The collapse of structures, rupture
            of pressure equipment, and failure of critical components have all been traced back to welding defects
            that should have been caught during inspection. This is why fabrication codes universally require NDT
            inspection of welds, with the extent and methods specified based on the criticality of the joint.
          </p>
          <InfoBox title="Industry Fact">
            Studies show that approximately 75% of all structural failures in welded constructions originate from
            welding defects. Proper NDT inspection is the primary defense against these failures.
          </InfoBox>
        </section>

        <section id="defects">
          <h2>2. Common Weld Defects</h2>
          <p>Understanding weld defects is essential for effective inspection:</p>

          <h3>Surface Defects</h3>
          <ul>
            <li><strong>Undercut:</strong> A groove melted into the base metal adjacent to the weld toe that creates a stress concentration. Caused by excessive current or improper electrode angle.</li>
            <li><strong>Overlap:</strong> Weld metal that rolls over onto the base metal surface without fusing. Creates a notch-like defect at the weld toe.</li>
            <li><strong>Surface Cracks:</strong> Linear discontinuities on the weld surface caused by thermal stresses, hydrogen embrittlement, or material susceptibility. Always rejectable.</li>
            <li><strong>Excessive Reinforcement:</strong> Weld cap height exceeding code limits. While not always harmful, excessive reinforcement creates stress concentrations at weld toes.</li>
            <li><strong>Surface Porosity:</strong> Gas pockets that break through the weld surface. Indicates shielding gas issues, contamination, or excessive moisture.</li>
          </ul>

          <h3>Internal Defects</h3>
          <ul>
            <li><strong>Lack of Fusion (LOF):</strong> Failure of the weld metal to fuse with the base metal or previous weld passes. One of the most critical defects due to its crack-like nature.</li>
            <li><strong>Incomplete Penetration:</strong> The weld root does not fully penetrate the joint. Particularly critical in single-sided welds and pipe girth welds.</li>
            <li><strong>Slag Inclusions:</strong> Non-metallic particles trapped within the weld metal, typically from flux-based welding processes (SMAW, FCAW, SAW).</li>
            <li><strong>Internal Porosity:</strong> Scattered or clustered gas pockets within the weld metal. Caused by contamination, moisture, or improper welding parameters.</li>
            <li><strong>Internal Cracks:</strong> Cracks within the weld metal or heat-affected zone not visible from the surface. May be longitudinal, transverse, or crater cracks.</li>
          </ul>
        </section>

        <section id="ndt-methods">
          <h2>3. NDT Methods for Weld Inspection</h2>

          <FeatureGrid>
            <FeatureCard title="Visual Testing (VT)">
              <p>The first and most fundamental inspection. Required for 100% of welds by all codes. Checks alignment, profile, surface defects, and dimensional compliance. Cost: lowest.</p>
            </FeatureCard>
            <FeatureCard title="Ultrasonic Testing (UT)">
              <p>Detects internal defects including lack of fusion, cracks, and inclusions. Excellent for thick sections and planar defects. Provides depth and size information. Most common volumetric method.</p>
            </FeatureCard>
            <FeatureCard title="Radiographic Testing (RT)">
              <p>Creates a permanent image of the weld interior. Excellent for detecting porosity, slag, and incomplete penetration. Required by many codes for qualification welds and critical joints.</p>
            </FeatureCard>
            <FeatureCard title="Magnetic Particle (MT)">
              <p>Fast, sensitive surface and near-surface crack detection for ferromagnetic materials. Commonly used on fillet welds, structural welds, and weld toes. Low cost and immediate results.</p>
            </FeatureCard>
            <FeatureCard title="Penetrant Testing (PT)">
              <p>Surface crack detection on non-magnetic materials (stainless steel, aluminum, titanium). Used when MT cannot be applied. Simple and portable.</p>
            </FeatureCard>
            <FeatureCard title="PAUT &amp; TOFD">
              <p>Advanced ultrasonic methods providing superior imaging and accurate defect sizing. Increasingly specified for critical welds in lieu of or in addition to RT. Provides permanent digital records.</p>
            </FeatureCard>
          </FeatureGrid>
        </section>

        <section id="codes">
          <h2>4. Applicable Codes &amp; Standards</h2>
          <p>Key codes governing weld inspection include:</p>
          <ul>
            <li><strong>AWS D1.1:</strong> Structural Welding Code for Steel. Defines inspection requirements, acceptance criteria, and NDE methods for structural steel welding.</li>
            <li><strong>ASME BPVC Section V:</strong> Nondestructive Examination. Provides NDE methodology requirements referenced by Sections I, VIII, and other construction codes.</li>
            <li><strong>ASME BPVC Section IX:</strong> Welding, Brazing, and Fusing Qualifications. Defines welder and procedure qualification requirements.</li>
            <li><strong>API 1104:</strong> Welding of Pipelines and Related Facilities. Governs field welding of cross-country pipelines including NDE requirements.</li>
            <li><strong>EN 1090:</strong> Execution of Steel Structures. European standard specifying inspection requirements for steel construction.</li>
            <li><strong>ASME B31.3:</strong> Process Piping. Defines NDE requirements for process plant piping based on fluid service category.</li>
          </ul>
          <InfoBox title="Code Selection">
            The applicable code is determined by the type of construction, service conditions, and jurisdiction.
            Always verify which code governs your project before specifying inspection requirements.
          </InfoBox>
        </section>

        <section id="stages">
          <h2>5. Stages of Weld Inspection</h2>
          <p>Comprehensive weld inspection occurs in three stages:</p>

          <h3>Pre-Weld Inspection</h3>
          <ul>
            <li>Review of Welding Procedure Specifications (WPS) and Procedure Qualification Records (PQR)</li>
            <li>Verification of welder qualifications and certifications</li>
            <li>Joint fit-up and alignment verification</li>
            <li>Base material verification and condition check</li>
            <li>Preheat temperature verification (if required)</li>
            <li>Consumable verification (electrode type, shielding gas, flux)</li>
          </ul>

          <h3>During-Weld Inspection</h3>
          <ul>
            <li>Interpass temperature monitoring</li>
            <li>Visual inspection of each weld pass</li>
            <li>Root pass inspection (especially critical for single-sided welds)</li>
            <li>Monitoring welding parameters (voltage, amperage, travel speed)</li>
          </ul>

          <h3>Post-Weld Inspection</h3>
          <ul>
            <li>Visual inspection of completed weld</li>
            <li>Dimensional checks (reinforcement height, weld width, undercut)</li>
            <li>NDE per code requirements (UT, RT, MT, PT as applicable)</li>
            <li>Post-weld heat treatment verification (if required)</li>
            <li>Documentation and reporting</li>
          </ul>
        </section>

        <section id="choosing-method">
          <h2>6. Choosing the Right NDT Method for Weld Inspection</h2>
          <p>
            Selecting the appropriate NDT method depends on several factors:
          </p>
          <ul>
            <li><strong>Code requirements:</strong> Always comply with the minimum NDE requirements specified by the governing code.</li>
            <li><strong>Defect types of concern:</strong> Surface methods (VT, MT, PT) for surface cracks; volumetric methods (UT, RT) for internal defects.</li>
            <li><strong>Material type:</strong> MT only for ferromagnetic materials; PT for non-magnetic materials; UT and RT for any material.</li>
            <li><strong>Joint geometry:</strong> Butt welds suit UT and RT well; fillet welds are better inspected with MT/PT and UT.</li>
            <li><strong>Access:</strong> Single-sided access favors UT; two-sided access enables RT. PAUT provides maximum information from one side.</li>
            <li><strong>Permanent record needed:</strong> RT and PAUT/TOFD provide permanent records; conventional UT and MT/PT do not.</li>
          </ul>
          <p>
            For critical applications, many operators specify a combination of methods - for example, VT + MT for
            surface inspection combined with PAUT + TOFD for volumetric inspection, providing comprehensive coverage
            of all defect types.
          </p>
        </section>

        <CTASection
          title="Need Weld Inspection Services?"
          description="Find certified weld inspectors and CWI-qualified personnel through NDT Connect. All major NDT methods available with instant quotes."
          buttonText="Find Weld Inspectors"
          buttonHref="/find-providers"
        />
      </BlogLayout>
    </>
  );
}
