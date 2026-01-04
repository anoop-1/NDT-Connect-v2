import { Metadata } from 'next';
import { BlogLayout, InfoBox, CTASection } from '@/components/blog';
import { NDTConnectOrganizationSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
    title: 'NDT Certifications Explained: ASNT, ISO 9712, and More | NDT Connect',
    description: 'Understanding the different certification bodies and levels in non-destructive testing.',
    keywords: ['NDT certifications', 'ASNT certification', 'ISO 9712', 'NDT Level I II III'],
};

export default function NDTCertificationsArticle() {
    return (
        <>
            <NDTConnectOrganizationSchema />
            <BlogLayout
                title="NDT Certifications Explained: ASNT, ISO 9712, and More"
                category="Careers"
                date="December 15, 2023"
                readTime="9 min read"
                description="Navigate the alphabet soup of NDT credentials and understand what qualifications matter."
            >
                <section>
                    <h2>Why NDT Certification Matters</h2>
                    <p>
                        Non-destructive testing is a safety-critical activity. The interpretation of inspection
                        results directly affects decisions about asset integrity and public safety.
                    </p>
                    <p>
                        The industry relies on certification schemes that verify an individual has the required
                        training, experience, and examination performance to perform inspections competently.
                    </p>
                </section>

                <section>
                    <h2>Understanding Certification Levels</h2>
                    <p>Most NDT certification programs use a three-level structure:</p>

                    <InfoBox title="Level I - Technician">
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Performs inspections under supervision</li>
                            <li>Sets up equipment per written procedure</li>
                            <li>Records and classifies results per written criteria</li>
                        </ul>
                    </InfoBox>

                    <InfoBox title="Level II - Practitioner">
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Sets up and calibrates equipment</li>
                            <li>Interprets and evaluates results per codes</li>
                            <li>Prepares written inspection procedures</li>
                            <li>Supervises and trains Level I personnel</li>
                        </ul>
                    </InfoBox>

                    <InfoBox title="Level III - Expert">
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Develops, qualifies, and approves procedures</li>
                            <li>Interprets codes, standards, and specifications</li>
                            <li>Administers certification programs</li>
                            <li>Provides technical guidance and training</li>
                        </ul>
                    </InfoBox>
                </section>

                <section>
                    <h2>Major Certification Programs</h2>

                    <h3>ASNT SNT-TC-1A (Employer-Based)</h3>
                    <p>
                        The most widely used scheme in North America. Employer certifies their own personnel
                        per written practice. Flexible but not portable between employers.
                    </p>

                    <h3>ASNT Central Certification (ACCP)</h3>
                    <p>
                        ASNT&apos;s portable, third-party certification. Valid 5 years with recertification.
                    </p>

                    <h3>ISO 9712 / EN ISO 9712</h3>
                    <p>
                        International standard for NDT personnel qualification. Third-party certification
                        with global recognition.
                    </p>

                    <h3>PCN (Personnel Certification in NDT)</h3>
                    <p>
                        UK-based certification administered by BINDT. Follows ISO 9712, widely recognized internationally.
                    </p>
                </section>

                <section>
                    <h2>How to Get Certified</h2>
                    <ol>
                        <li><strong>Choose your methods:</strong> Common starting points are UT Level I or MT/PT Level II</li>
                        <li><strong>Complete training:</strong> 40-80 hours classroom training per method/level</li>
                        <li><strong>Gain experience:</strong> Work under certified supervision</li>
                        <li><strong>Pass examinations:</strong> General, specific, and practical exams</li>
                        <li><strong>Maintain certification:</strong> Continue working, recertify on schedule</li>
                    </ol>
                </section>

                <CTASection
                    title="Join NDT Connect as a Certified Inspector"
                    description="Put your certifications to work. Connect with clients seeking qualified NDT professionals."
                    buttonText="Register as Inspector"
                    buttonHref="/register"
                />
            </BlogLayout>
        </>
    );
}
