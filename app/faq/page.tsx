import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FAQSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | NDT Connect',
  description: 'Get answers to common questions about NDT Connect, non-destructive testing services, booking inspections, NDT certifications, and how our marketplace works.',
  keywords: ['NDT FAQ', 'NDT questions', 'non-destructive testing FAQ', 'NDT inspection questions', 'NDT Connect help'],
  openGraph: { title: 'FAQ | NDT Connect', description: 'Answers to common questions about NDT Connect and NDT services.', url: 'https://ndt-connect.com/faq' },
  alternates: { canonical: 'https://ndt-connect.com/faq' },
};

const faqs = [
  { question: 'What is NDT Connect?', answer: 'NDT Connect is the leading online marketplace connecting asset owners with certified non-destructive testing (NDT) service providers. Our platform enables you to find, compare, and book NDT inspection services online with real-time tracking and instant quotes.' },
  { question: 'How do I book an NDT inspection?', answer: 'You can book an NDT inspection by creating a free account, posting a service request with your requirements, or browsing our provider directory to find inspectors by location and method. Providers will respond with quotes and availability.' },
  { question: 'What NDT methods are available on NDT Connect?', answer: 'NDT Connect supports all major testing methods including Ultrasonic Testing (UT), Radiographic Testing (RT), Magnetic Particle Testing (MT), Liquid Penetrant Testing (PT), Eddy Current Testing (ET), Visual Testing (VT), and advanced methods like Phased Array UT (PAUT), TOFD, Guided Wave Testing, and more.' },
  { question: 'Are the NDT providers on NDT Connect certified?', answer: 'Yes, all providers on NDT Connect must verify their certifications (ASNT, ISO 9712, PCN, API, etc.) and qualifications. We verify credentials to ensure you are connected with properly qualified inspectors.' },
  { question: 'What industries does NDT Connect serve?', answer: 'NDT Connect serves all major industries including Oil & Gas, Aerospace, Power Generation, Manufacturing, Marine & Offshore, Construction, Mining, Automotive, and more.' },
  { question: 'How much does NDT inspection cost?', answer: 'NDT inspection costs vary depending on the testing method, scope of work, location, accessibility, and urgency. Use our Cost Estimator tool for a rough estimate, or post a service request to get quotes from multiple providers.' },
  { question: 'Is NDT Connect available worldwide?', answer: 'Yes, NDT Connect operates globally. We have providers registered across the Americas, Europe, Middle East, Asia-Pacific, Africa, and Oceania. You can find NDT services in any major industrial hub.' },
  { question: 'How do I become a provider on NDT Connect?', answer: 'NDT service providers can register for a free account, set up their profile with certifications, services, and service areas, and start receiving inspection requests from clients worldwide.' },
  { question: 'What is the difference between UT and RT?', answer: 'Ultrasonic Testing (UT) uses high-frequency sound waves and requires single-sided access, while Radiographic Testing (RT) uses X-rays or gamma rays and typically needs two-sided access. UT is better for thickness measurement and crack sizing, while RT provides a permanent visual record of internal defects.' },
  { question: 'Do I need to be certified to perform NDT?', answer: 'Yes, NDT personnel must be certified according to recognized standards such as ASNT SNT-TC-1A, ASNT ACCP, ISO 9712, or PCN. The specific certification required depends on the industry, location, and applicable codes.' },
  { question: 'What is Phased Array Ultrasonic Testing (PAUT)?', answer: 'PAUT is an advanced ultrasonic technique using multi-element transducers that can electronically steer and focus beams. It provides superior imaging, faster inspection, and better defect characterization compared to conventional UT.' },
  { question: 'How does real-time inspection tracking work?', answer: 'NDT Connect provides real-time tracking of your inspection requests from booking through completion. You can monitor inspector dispatch, on-site progress, and receive reports digitally through the platform.' },
];

export default function FAQPage() {
  return (
    <>
      <FAQSchema questions={faqs} />
      <div className="max-w-3xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-foreground">FAQ</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-10">Everything you need to know about NDT Connect and non-destructive testing services.</p>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, i) => (
            <details key={i} className="group border rounded-lg">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-medium hover:bg-muted/50 transition-colors">
                {faq.question}
                <span className="ml-4 text-primary group-open:rotate-180 transition-transform">&#9662;</span>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="mb-6 opacity-90">Contact our team or start exploring NDT Connect today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
