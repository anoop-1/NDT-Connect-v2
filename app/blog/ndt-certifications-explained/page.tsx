import { Metadata } from 'next';
import { BlogLayout, InfoBox, CTASection } from '@/components/blog';
import { NDTConnectOrganizationSchema , ArticleSchema, BreadcrumbListSchema, FAQSchema } from '@/components/seo/SchemaMarkup';

const FAQS = [
  { question: 'What is ASNT certification?', answer: 'ASNT (American Society for Nondestructive Testing) publishes SNT-TC-1A, the recommended practice under which most US employers certify NDT personnel as Level I, II or III in each method. ASNT also runs the central ACCP and the ASNT NDT Level III certification examinations.' },
  { question: 'What is the difference between SNT-TC-1A and ISO 9712?', answer: 'SNT-TC-1A is an employer-based recommended practice: the employer certifies personnel against a written practice. ISO 9712 is a third-party (central) certification scheme where an accredited body certifies the individual, so the certification is portable between employers. PCN (UK) and many European schemes follow the ISO 9712 model.' },
  { question: 'What is PCN certification?', answer: 'PCN (Personnel Certification in Non-Destructive Testing), administered by BINDT in the UK, is a third-party certification scheme compliant with ISO 9712. It is widely recognised internationally, especially in oil and gas.' },
  { question: 'How long does it take to become a Level II inspector?', answer: 'It depends on method and prior education, but SNT-TC-1A and ISO 9712 set minimum classroom training hours plus documented on-the-job experience for each method (for example, Level II UT commonly requires substantial training hours plus several months of experience). The employer or certification body verifies the hours and a passing exam.' },
  { question: 'Which NDT certification is best?', answer: 'There is no single best — it depends on where and for whom you work. ASNT SNT-TC-1A dominates the US; ISO 9712 / PCN are preferred internationally and for portability; NAS 410 governs aerospace. Many inspectors hold more than one to maximise marketability.' },
];

export const metadata: Metadata = {
    title: 'NDT Certifications Explained: ASNT, ISO 9712, and More',
    description: 'Understanding the different certification bodies and levels in non-destructive testing.',
    openGraph: {
      title: 'NDT Certifications Explained: ASNT, ISO 9712, and More',
      description: 'Understanding the different certification bodies and levels in non-destructive testing.',
      url: 'https://ndt-connect.com/blog/ndt-certifications-explained',
      type: 'article',
      siteName: 'NDT Connect',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'NDT Certifications Explained: ASNT, ISO 9712, and More',
      description: 'Understanding the different certification bodies and levels in non-destructive testing.',
    },
    alternates: { canonical: 'https://ndt-connect.com/blog/ndt-certifications-explained' },
    keywords: ['NDT certifications', 'ASNT certification', 'ISO 9712', 'NDT Level I II III'],
};

export default function NDTCertificationsArticle() {
    return (
        <>
            <ArticleSchema title="NDT Certifications Explained: ASNT, ISO 9712, PCN, and More" description="Understanding NDT certifications including ASNT, ISO 9712, PCN, and more." url="https://ndt-connect.com/blog/ndt-certifications-explained" datePublished="2023-12-15" category="Certifications" />
            <BreadcrumbListSchema items={[
                { name: 'Home', url: 'https://ndt-connect.com' },
                { name: 'Blog', url: 'https://ndt-connect.com/blog' },
                { name: 'NDT Certifications Explained: ASNT, ISO 9712, and More', url: 'https://ndt-connect.com/blog/ndt-certifications-explained' },
            ]} />
            <NDTConnectOrganizationSchema />
            <FAQSchema questions={FAQS} />
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

                <section>
                    <h2>Frequently Asked Questions</h2>
                    {FAQS.map((f) => (
                        <div key={f.question} className="mb-4">
                            <h3 className="font-semibold text-foreground">{f.question}</h3>
                            <p className="text-muted-foreground">{f.answer}</p>
                        </div>
                    ))}
                </section>

                <section>
                    <h2>Sources</h2>
                    <ul>
                        <li><a href="https://www.asnt.org/certification" target="_blank" rel="noopener noreferrer">ASNT — Certification (SNT-TC-1A, ACCP, NDT Level III)</a></li>
                        <li><a href="https://www.iso.org/standard/57037.html" target="_blank" rel="noopener noreferrer">ISO 9712 — Qualification and certification of NDT personnel</a></li>
                        <li><a href="https://www.bindt.org/Certification/pcn-certification/" target="_blank" rel="noopener noreferrer">BINDT — PCN certification</a></li>
                        <li><a href="https://www.nadcap.eu/" target="_blank" rel="noopener noreferrer">NAS 410 / Nadcap — aerospace NDT qualification</a></li>
                    </ul>
                    <p className="text-sm text-muted-foreground">Last reviewed: June 2026.</p>
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
