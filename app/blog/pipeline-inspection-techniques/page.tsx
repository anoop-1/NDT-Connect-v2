import { Metadata } from 'next';
import { BlogLayout, InfoBox, FeatureGrid, FeatureCard, CTASection } from '@/components/blog';
import { NDTConnectOrganizationSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
    title: 'Modern Pipeline Inspection Techniques You Need to Know | NDT Connect',
    description: 'From MFL to ILI, explore the latest technologies keeping pipelines safe and compliant.',
    keywords: ['pipeline inspection', 'MFL testing', 'inline inspection ILI', 'smart pigging'],
};

export default function PipelineInspectionArticle() {
    return (
        <>
            <NDTConnectOrganizationSchema />
            <BlogLayout
                title="Modern Pipeline Inspection Techniques You Need to Know"
                category="Techniques"
                date="December 20, 2023"
                readTime="10 min read"
                description="Advanced technologies ensuring pipeline integrity across thousands of miles of infrastructure."
            >
                <section>
                    <h2>The Challenge of Pipeline Integrity</h2>
                    <p>
                        The world&apos;s pipeline network spans millions of miles, transporting oil, gas, water, and
                        chemicals. These critical assets face constant threats from corrosion, third-party damage,
                        and material degradation.
                    </p>

                    <InfoBox title="Industry Statistic">
                        PHMSA data shows corrosion causes approximately 20% of
                        significant pipeline incidents. Effective inspection can prevent most failures.
                    </InfoBox>
                </section>

                <section>
                    <h2>In-Line Inspection (ILI) - Smart Pigging</h2>
                    <p>
                        In-line inspection tools (smart pigs) travel through the pipeline propelled by product flow,
                        collecting data on pipe condition without interrupting operations.
                    </p>

                    <h3>Magnetic Flux Leakage (MFL)</h3>
                    <p>
                        The most common ILI technology. Strong magnets saturate the pipe wall with magnetic flux.
                        Metal loss causes flux to &quot;leak&quot; and is detected by sensors.
                    </p>
                    <ul>
                        <li><strong>Detects:</strong> Internal/external metal loss, corrosion pits, gouges</li>
                        <li><strong>Accuracy:</strong> ±10% wall thickness, ±10mm sizing</li>
                    </ul>

                    <h3>Ultrasonic (UT) Pigs</h3>
                    <p>
                        Use ultrasonic sensors to directly measure wall thickness by timing the reflection from
                        inner and outer surfaces.
                    </p>
                    <ul>
                        <li><strong>Detects:</strong> Metal loss, laminations, inclusions</li>
                        <li><strong>Accuracy:</strong> ±0.4mm wall thickness</li>
                    </ul>

                    <h3>Geometry Pigs</h3>
                    <p>
                        Measure internal diameter variations to detect dents, ovality, buckles, and wrinkles from
                        mechanical damage or ground movement.
                    </p>
                </section>

                <section>
                    <h2>Emerging Technologies</h2>

                    <FeatureGrid>
                        <FeatureCard title="EMAT">
                            Generates ultrasonic waves without couplant, enabling inspection through coatings.
                        </FeatureCard>
                        <FeatureCard title="Long-Range UT (LRUT)">
                            Screens hundreds of feet of pipeline from a single access point.
                        </FeatureCard>
                        <FeatureCard title="Drone-Based Inspection">
                            UAVs equipped with cameras and thermal imagers for right-of-way patrol.
                        </FeatureCard>
                        <FeatureCard title="Fiber Optic Sensing">
                            Distributed acoustic and temperature sensing for real-time leak detection.
                        </FeatureCard>
                    </FeatureGrid>
                </section>

                <CTASection
                    title="Need Pipeline Inspection Services?"
                    description="Connect with certified pipeline inspection specialists through NDT Connect."
                    buttonText="Find Pipeline Inspectors"
                    buttonHref="/find-providers"
                />
            </BlogLayout>
        </>
    );
}
