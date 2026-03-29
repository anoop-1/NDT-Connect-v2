import { Metadata } from 'next';
import { BlogLayout, InfoBox, FeatureGrid, FeatureCard, CTASection } from '@/components/blog';
import { NDTConnectOrganizationSchema , ArticleSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
    title: 'Risk-Based Inspection (RBI): Complete Guide for Asset Owners | NDT Connect',
    description: 'Implement RBI strategies to prioritize inspections, reduce costs, and ensure asset integrity.',
    alternates: { canonical: 'https://ndt-connect.com/blog/rbi-corrosion-management' },
    keywords: ['risk-based inspection', 'RBI methodology', 'asset integrity', 'API 580'],
};

export default function RBIGuideArticle() {
    return (
        <>
            <ArticleSchema title="Risk-Based Inspection and Corrosion Management" description="Comprehensive guide to risk-based inspection and corrosion management for industrial assets." url="https://ndt-connect.com/blog/rbi-corrosion-management" datePublished="2024-01-05" category="Industry" />
            <NDTConnectOrganizationSchema />
            <BlogLayout
                title="Risk-Based Inspection (RBI): A Complete Guide for Asset Owners"
                category="Strategy"
                date="January 5, 2024"
                readTime="15 min read"
                description="Move from time-based to risk-based inspection strategies and optimize your maintenance spending."
            >
                <section>
                    <h2>What is Risk-Based Inspection?</h2>
                    <p>
                        Risk-Based Inspection (RBI) is a systematic methodology for prioritizing and planning
                        inspections based on risk rather than fixed time intervals. It focuses inspection resources
                        on equipment with the highest risk of failure.
                    </p>
                    <p>
                        The fundamental principle: <strong>Risk = Probability of Failure × Consequence of Failure</strong>
                    </p>

                    <InfoBox title="Industry Standard">
                        RBI is codified in API 580 (Risk-Based Inspection) and
                        API 581 (Risk-Based Inspection Methodology), adopted globally.
                    </InfoBox>
                </section>

                <section>
                    <h2>Why Move from Time-Based to Risk-Based?</h2>

                    <h3>Problems with Time-Based Inspection</h3>
                    <ul>
                        <li>Inspects low-risk equipment too frequently, wasting resources</li>
                        <li>May miss high-risk equipment that needs more attention</li>
                        <li>Doesn&apos;t account for actual operating conditions</li>
                        <li>Results in unnecessary shutdowns</li>
                    </ul>

                    <h3>Benefits of RBI</h3>
                    <FeatureGrid>
                        <FeatureCard title="20-50% reduction">in overall inspection costs</FeatureCard>
                        <FeatureCard title="25-40% decrease">in unplanned shutdowns</FeatureCard>
                        <FeatureCard title="50-70% reduction">in unnecessary inspections</FeatureCard>
                        <FeatureCard title="Improved safety">by focusing on real risks</FeatureCard>
                    </FeatureGrid>
                </section>

                <section>
                    <h2>The RBI Methodology: Step by Step</h2>

                    <h3>Step 1: Define Scope and Objectives</h3>
                    <p>
                        Identify which equipment and systems will be included. Typically includes
                        pressure vessels, piping, tankage, and rotating equipment.
                    </p>

                    <h3>Step 2: Collect Data</h3>
                    <p>Gather essential information:</p>
                    <ul>
                        <li>Design specifications and materials of construction</li>
                        <li>Operating conditions (temperature, pressure, flow)</li>
                        <li>Historical inspection data and findings</li>
                        <li>Maintenance and repair history</li>
                    </ul>

                    <h3>Step 3: Identify Damage Mechanisms</h3>
                    <p>Determine what degradation mechanisms can affect each piece of equipment:</p>
                    <ul>
                        <li><strong>Internal corrosion:</strong> Uniform, pitting, erosion-corrosion</li>
                        <li><strong>External corrosion:</strong> Under insulation, atmospheric</li>
                        <li><strong>Stress corrosion cracking:</strong> Chloride SCC, caustic SCC</li>
                        <li><strong>High-temperature mechanisms:</strong> Creep, oxidation</li>
                    </ul>

                    <h3>Step 4: Assess Probability and Consequence</h3>
                    <p>Calculate likelihood of failure and evaluate impact across safety, environmental, and production dimensions.</p>

                    <h3>Step 5: Develop Inspection Plans</h3>
                    <p>Create tailored inspection plans specifying techniques, coverage, intervals, and acceptance criteria.</p>
                </section>

                <CTASection
                    title="Implement RBI with Expert Inspectors"
                    description="NDT Connect provides certified inspectors experienced in RBI-driven inspection programs."
                    buttonText="Find RBI Specialists"
                    buttonHref="/find-providers"
                />
            </BlogLayout>
        </>
    );
}
