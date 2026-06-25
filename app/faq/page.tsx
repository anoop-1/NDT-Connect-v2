import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FAQSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description: 'Get answers to common questions about NDT Connect, non-destructive testing services, booking inspections, NDT certifications, and how our marketplace works.',
  keywords: ['NDT FAQ', 'NDT questions', 'non-destructive testing FAQ', 'NDT inspection questions', 'NDT Connect help'],
  openGraph: { 
    title: 'FAQ', 
    description: 'Answers to common questions about NDT Connect and NDT services.', 
    url: 'https://ndt-connect.com/faq',
    type: 'website',
    siteName: 'NDT Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ',
    description: 'Answers to common questions about NDT Connect and NDT services.',
  },
  alternates: { canonical: 'https://ndt-connect.com/faq' },
};

const FAQ_GROUPS = [
  {
    category: 'Using NDT Connect',
    items: [
      { question: 'What is NDT Connect?', answer: 'NDT Connect is a marketplace connecting asset owners with certified non-destructive testing (NDT) service providers and freelance inspectors. Browse and compare providers, post a job, and receive quotes — free to use.' },
      { question: 'How do I book an NDT inspection?', answer: 'Create a free account, post a service request with your scope, or browse the provider directory by location and method. Providers respond with quotes and availability, usually within 24 hours.' },
      { question: 'Is NDT Connect free?', answer: 'Yes — browsing providers, posting jobs, listing a provider/inspector profile, and the calculators and reference content are all free. There is no subscription or listing fee. See the pricing page for details.' },
      { question: 'How do I become a provider on NDT Connect?', answer: 'Register a free account, set up your profile with certifications, methods and service areas, and start receiving inspection requests. Listing is free.' },
      { question: 'Is NDT Connect available worldwide?', answer: 'Yes — providers are registered across the Americas, Europe, Middle East, India, Asia-Pacific, Africa and Oceania, with content for 220+ cities.' },
      { question: 'How does real-time inspection tracking work?', answer: 'You can track inspection requests from booking through completion — inspector dispatch, on-site progress, and digital report delivery — through the platform.' },
    ],
  },
  {
    category: 'NDT methods',
    items: [
      { question: 'What NDT methods are available?', answer: 'All major methods: Ultrasonic (UT), Radiographic (RT), Magnetic Particle (MT), Liquid Penetrant (PT), Eddy Current (ET), Visual (VT), plus advanced Phased Array UT (PAUT), TOFD, Guided Wave and MFL. See the methods hub for guides on each.' },
      { question: 'What is the difference between UT and RT?', answer: 'Ultrasonic (UT) uses sound waves and needs single-sided access; Radiographic (RT) uses X-/gamma rays and usually needs two-sided access. UT excels at thickness and crack sizing; RT gives a permanent image of internal/volumetric defects.' },
      { question: 'What is Phased Array Ultrasonic Testing (PAUT)?', answer: 'PAUT uses multi-element transducers that electronically steer and focus the beam, giving superior imaging, faster coverage and better defect characterisation than conventional UT — and no radiation exclusion zone.' },
      { question: 'Which NDT method should I use?', answer: 'It depends on the defect (surface vs volumetric vs wall loss), material, access and governing code. Surface cracks → MT or PT; buried flaws → RT/UT/PAUT/TOFD; wall loss → UT thickness/MFL. See the "how to choose an NDT method" guide.' },
      { question: 'What is the difference between MT and PT?', answer: 'Magnetic particle (MT) detects surface and slightly sub-surface flaws in ferromagnetic steel; penetrant (PT) detects surface-breaking flaws on any non-porous material including stainless and aluminium.' },
    ],
  },
  {
    category: 'Certifications & training',
    items: [
      { question: 'Are the providers on NDT Connect certified?', answer: 'Providers verify their certifications (ASNT, ISO 9712, PCN, API, etc.) and qualifications. Look for the Verified badge, which means the credentials were checked against the relevant rosters.' },
      { question: 'Do I need to be certified to perform NDT?', answer: 'Yes. NDT personnel are certified to recognised standards such as ASNT SNT-TC-1A, ASNT ACCP, ISO 9712 or PCN. The specific requirement depends on industry, location and the applicable code.' },
      { question: 'What is the difference between ASNT SNT-TC-1A and ISO 9712?', answer: 'SNT-TC-1A is an employer-based recommended practice (the employer certifies personnel). ISO 9712 / PCN are third-party central schemes where an accredited body certifies the individual, making the certification portable between employers.' },
      { question: 'How long does it take to become a Level II inspector?', answer: 'It varies by method and prior education, but the standards set minimum classroom training hours plus documented on-the-job experience per method, followed by a passing examination.' },
      { question: 'Where can I get NDT training?', answer: 'See the training hub for NDT training and certification (Level I-III) across major US and international inspection hubs, with local providers and exam-prep paths.' },
    ],
  },
  {
    category: 'Cost & hiring',
    items: [
      { question: 'How much does NDT inspection cost?', answer: 'Cost depends on method, scope, location, access and urgency — roughly $125-$375/hr for visual up to $400-$1,300/hr for phased array. Use the cost estimator or see the inspection cost index, or post a job for real quotes.' },
      { question: 'How do I choose the right NDT provider?', answer: 'Verify accreditations (ISO/IEC 17020, API Q1 where applicable), personnel certifications, calibrated equipment with traceable records, and adequate insurance. Quote the same scope to 2-3 providers and compare on price basis, certification and availability.' },
      { question: 'How fast can I get quotes?', answer: 'For a clearly defined scope, vetted providers typically quote within 24-48 hours.' },
      { question: 'What industries does NDT Connect serve?', answer: 'Oil & gas, aerospace, power generation, manufacturing, marine & offshore, construction, mining, automotive and more. See the industries section for method and code detail per sector.' },
      { question: 'What insurance should an NDT provider carry?', answer: 'Expect general liability (commonly $1-2M), professional indemnity, and workers compensation; for radiography, a radioactive-materials licence and radiation-liability coverage. Request current certificates before mobilisation.' },
    ],
  },
];

const faqs = FAQ_GROUPS.flatMap((g) => g.items);

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

        <div className="space-y-10 mb-12">
          {FAQ_GROUPS.map((group) => (
            <section key={group.category}>
              <h2 className="text-xl font-bold text-foreground mb-4">{group.category}</h2>
              <div className="space-y-4">
                {group.items.map((faq, i) => (
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
            </section>
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
