import { Metadata } from 'next';
import { BlogLayout, InfoBox, CTASection } from '@/components/blog';
import { NDTConnectOrganizationSchema , ArticleSchema, BreadcrumbListSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
    title: 'How to Choose the Right NDT Service Provider',
    description: 'Key factors to consider when selecting an NDT company: certifications, experience, equipment, insurance.',
    openGraph: {
      title: 'How to Choose the Right NDT Service Provider',
      description: 'Key factors to consider when selecting an NDT company: certifications, experience, equipment, insurance.',
      url: 'https://ndt-connect.com/blog/choosing-ndt-service-provider',
      type: 'article',
      siteName: 'NDT Connect',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'How to Choose the Right NDT Service Provider',
      description: 'Key factors to consider when selecting an NDT company: certifications, experience, equipment, insurance.',
    },
    alternates: { canonical: 'https://ndt-connect.com/blog/choosing-ndt-service-provider' },
    keywords: ['choose NDT provider', 'NDT company selection', 'certified NDT company'],
};

export default function ChoosingNDTProviderArticle() {
    return (
        <>
            <ArticleSchema title="How to Choose the Right NDT Service Provider" description="How to choose the right NDT service provider for your inspection needs." url="https://ndt-connect.com/blog/choosing-ndt-service-provider" datePublished="2023-12-28" category="Guide" />
            <BreadcrumbListSchema items={[
                { name: 'Home', url: 'https://ndt-connect.com' },
                { name: 'Blog', url: 'https://ndt-connect.com/blog' },
                { name: 'How to Choose the Right NDT Service Provider', url: 'https://ndt-connect.com/blog/choosing-ndt-service-provider' },
            ]} />
            <NDTConnectOrganizationSchema />
            <BlogLayout
                title="How to Choose the Right NDT Service Provider"
                category="Guides"
                date="December 28, 2023"
                readTime="6 min read"
                description="A practical checklist for asset owners evaluating NDT inspection companies."
            >
                <section>
                    <h2>Why Provider Selection Matters</h2>
                    <p>
                        The quality of your NDT inspections directly impacts asset safety, regulatory compliance,
                        and maintenance decisions. Investing time in selecting the right provider pays dividends.
                    </p>
                </section>

                <section>
                    <h2>Essential Selection Criteria</h2>

                    <h3>1. Certifications and Accreditations</h3>
                    <ul>
                        <li><strong>Personnel certifications:</strong> ASNT SNT-TC-1A, ACCP, ISO 9712, PCN</li>
                        <li><strong>Company accreditation:</strong> ISO 17025 for testing labs, NADCAP for aerospace</li>
                        <li><strong>Industry-specific:</strong> API 510/570/653 for pressure equipment</li>
                    </ul>

                    <h3>2. Relevant Experience</h3>
                    <ul>
                        <li>Years in business and track record</li>
                        <li>Experience with your specific industry</li>
                        <li>Familiarity with your equipment types</li>
                        <li>References from similar projects</li>
                    </ul>

                    <h3>3. Equipment and Technology</h3>
                    <ul>
                        <li>Modern, well-maintained inspection equipment</li>
                        <li>Current calibration certificates</li>
                        <li>Advanced capabilities (PAUT, TOFD) if needed</li>
                    </ul>

                    <h3>4. Safety Record</h3>
                    <ul>
                        <li>EMR (Experience Modification Rate) below 1.0</li>
                        <li>Drug and alcohol testing program</li>
                        <li>Safety training records</li>
                    </ul>

                    <h3>5. Insurance Coverage</h3>
                    <ul>
                        <li>General liability insurance (minimum $1-2M)</li>
                        <li>Professional liability/errors &amp; omissions</li>
                        <li>Workers&apos; compensation coverage</li>
                    </ul>
                </section>

                <section>
                    <h2>Red Flags to Watch For</h2>
                    <InfoBox title="Warning Signs">
                        <ul className="space-y-1">
                            <li>⚠️ Cannot provide certification documentation</li>
                            <li>⚠️ Significantly cheaper than all competitors</li>
                            <li>⚠️ No written procedures or quality system</li>
                            <li>⚠️ Reluctant to provide references</li>
                            <li>⚠️ Cannot demonstrate calibrated equipment</li>
                        </ul>
                    </InfoBox>
                </section>

                <CTASection
                    title="Find Pre-Vetted NDT Providers"
                    description="NDT Connect verifies certifications, insurance, and safety records for all providers."
                    buttonText="Browse Verified Providers"
                    buttonHref="/find-providers"
                />
            </BlogLayout>
        </>
    );
}
