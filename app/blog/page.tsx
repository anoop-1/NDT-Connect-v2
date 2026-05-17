import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { FAQSchema, NDTConnectOrganizationSchema } from '@/components/seo/SchemaMarkup';
import { PageHero } from '@/components/shared/PageHero';

export const metadata: Metadata = {
    title: 'NDT Inspection Blog | Industry Insights & Best Practices',
    description: 'Expert articles on non-destructive testing methods, inspection techniques, RBI strategies, certification guides, and industry best practices from NDT Connect.',
    keywords: ['NDT blog', 'non-destructive testing articles', 'inspection best practices', 'NDT guides', 'NDT industry insights', 'NDT certification guides', 'ultrasonic testing articles', 'radiographic testing guides'],
    openGraph: {
        title: 'NDT Inspection Blog | Industry Insights & Best Practices',
        description: 'Expert articles on NDT methods, inspection techniques, certification guides, and industry best practices.',
        url: 'https://ndt-connect.com/blog',
        type: 'website',
        siteName: 'NDT Connect',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'NDT Inspection Blog',
        description: 'Expert articles on NDT methods, certification guides, and industry best practices.',
    },
    alternates: { canonical: 'https://ndt-connect.com/blog' },
};

const blogPosts = [
    { slug: 'what-is-ndt-testing', title: 'What is NDT Testing? A Beginner\'s Complete Guide', excerpt: 'Learn what non-destructive testing is, how it works, the main methods used, and why it matters for industrial safety.', category: 'Education', date: 'Mar 7, 2026', readTime: '8 min' },
    { slug: 'ndt-inspection-cost-guide', title: 'NDT Inspection Costs: Complete Pricing Guide for 2026', excerpt: 'Detailed breakdown of NDT inspection costs by method, industry, and location. Budget effectively for your next project.', category: 'Guide', date: 'Mar 5, 2026', readTime: '10 min' },
    { slug: 'magnetic-particle-testing-complete-guide', title: 'Magnetic Particle Testing (MT): The Complete Guide', excerpt: 'Everything about MT inspection - methods, equipment, procedures, standards, and applications.', category: 'Techniques', date: 'Mar 3, 2026', readTime: '13 min' },
    { slug: 'weld-inspection-complete-guide', title: 'Complete Guide to Weld Inspection: NDT Methods & Standards', excerpt: 'Everything about weld inspection - NDT methods, common defects, applicable codes (AWS D1.1, ASME IX), and best practices.', category: 'Techniques', date: 'Mar 1, 2026', readTime: '16 min' },
    { slug: 'ndt-vs-destructive-testing', title: 'NDT vs Destructive Testing: When to Use Each Method', excerpt: 'Comprehensive comparison of non-destructive vs destructive testing. Advantages, limitations, and when to use each.', category: 'Education', date: 'Feb 25, 2026', readTime: '9 min' },
    { slug: 'api-510-exam-preparation-guide', title: 'API 510 Exam Preparation: Complete Study Guide for 2026', excerpt: 'Everything you need to pass the API 510 Pressure Vessel Inspector exam. Study topics, format, and strategies.', category: 'Certifications', date: 'Feb 20, 2026', readTime: '15 min' },
    { slug: 'ndt-digital-twins-guide', title: 'Digital Twins in NDT: Revolutionizing Asset Integrity Management', excerpt: 'How digital twin technology transforms NDT inspection data into actionable predictive maintenance strategies.', category: 'Technology', date: 'Feb 15, 2026', readTime: '10 min' },
    { slug: 'phased-array-ultrasonic-testing-guide', title: 'Phased Array Ultrasonic Testing (PAUT): Complete Technical Guide', excerpt: 'Comprehensive PAUT guide covering principles, advantages over conventional UT, applications, and codes.', category: 'Techniques', date: 'Feb 10, 2026', readTime: '14 min' },
    { slug: 'ndt-career-guide-2026', title: 'NDT Career Guide 2026: Salaries, Certifications & Growth', excerpt: 'Complete career guide for NDT professionals. Salary ranges, certification pathways, and industry demand outlook.', category: 'Careers', date: 'Feb 1, 2026', readTime: '12 min' },
    { slug: 'corrosion-under-insulation-guide', title: 'Corrosion Under Insulation (CUI): Detection & Prevention Guide', excerpt: 'Complete CUI guide covering detection methods, NDT techniques, prevention strategies for insulated piping and equipment.', category: 'Techniques', date: 'Jan 20, 2026', readTime: '14 min' },
    { slug: 'ut-vs-rt-comparison', title: 'UT vs RT: Ultrasonic Testing vs Radiographic Testing Compared', excerpt: 'Detailed comparison of ultrasonic and radiographic testing methods. When to use UT, when to use RT, and how to choose.', category: 'Guides', date: 'Jan 10, 2026', readTime: '11 min' },
    { slug: 'ndt-industry-statistics', title: 'NDT Industry Statistics & Market Outlook 2026', excerpt: 'Latest NDT market data, growth projections, workforce statistics, and emerging technology trends.', category: 'Industry', date: 'Jan 5, 2026', readTime: '9 min' },
    { slug: 'ultimate-guide-ultrasonic-testing', title: 'The Ultimate Guide to Ultrasonic Testing (UT)', excerpt: 'Learn everything about ultrasonic testing - from basic principles to advanced techniques like PAUT and TOFD.', category: 'Techniques', date: 'Dec 15, 2025', readTime: '12 min' },
    { slug: 'real-time-inspection-tracking', title: 'How Real-Time Tracking is Revolutionizing NDT Inspections', excerpt: 'Discover how platforms like NDT Connect use GPS, H3 indexing, and live updates to transform workflows.', category: 'Technology', date: 'Dec 10, 2025', readTime: '8 min' },
    { slug: 'rbi-corrosion-management', title: 'Risk-Based Inspection (RBI): A Complete Guide for Asset Owners', excerpt: 'Implement RBI strategies to prioritize inspections, reduce costs, and ensure asset integrity.', category: 'Strategy', date: 'Dec 5, 2025', readTime: '15 min' },
    { slug: 'choosing-ndt-service-provider', title: 'How to Choose the Right NDT Service Provider', excerpt: 'Key factors to consider when selecting an NDT company: certifications, experience, and equipment.', category: 'Guides', date: 'Nov 28, 2025', readTime: '6 min' },
    { slug: 'pipeline-inspection-techniques', title: 'Modern Pipeline Inspection Techniques You Need to Know', excerpt: 'From MFL to ILI, explore the latest technologies keeping pipelines safe and compliant.', category: 'Techniques', date: 'Nov 20, 2025', readTime: '10 min' },
    { slug: 'ndt-certifications-explained', title: 'NDT Certifications Explained: ASNT, ISO 9712, and More', excerpt: 'Understanding the different certification bodies and levels in non-destructive testing.', category: 'Careers', date: 'Nov 15, 2025', readTime: '9 min' },
];

const faqData = [
    {
        question: 'What is non-destructive testing (NDT)?',
        answer: 'Non-destructive testing is a group of analysis techniques used to evaluate materials without causing damage.',
    },
    {
        question: 'How do I book an NDT inspection online?',
        answer: 'With NDT Connect, create an account, describe your needs, and choose from verified providers.',
    },
    {
        question: 'How much does an NDT inspection cost?',
        answer: 'Costs vary based on the test type and location. NDT Connect provides instant quotes from multiple providers.',
    },
];

export default function BlogPage() {
    return (
        <>
            <NDTConnectOrganizationSchema />
            <FAQSchema questions={faqData} />

            <div className="max-w-5xl mx-auto space-y-16">
                {/* Header */}
                <PageHero
                    title="NDT Insights & Resources"
                    description="Expert articles on non-destructive testing techniques, best practices, and the latest innovations."
                    breadcrumbs={[{ label: 'Blog' }]}
                />

                {/* Featured Post */}
                <Link href={`/blog/${blogPosts[0].slug}`} className="block group">
                    <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white hover:shadow-lg transition-shadow">
                        <div className="p-5 sm:p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-4">
                                <Badge className="bg-brand text-white">{blogPosts[0].category}</Badge>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" />{blogPosts[0].readTime}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />{blogPosts[0].date}
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-3">
                                {blogPosts[0].title}
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-4 max-w-3xl">
                                {blogPosts[0].excerpt}
                            </p>
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                                Read full article <ArrowRight className="h-4 w-4" />
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.slice(1).map((post) => (
                        <Card
                            key={post.slug}
                            className="group hover:shadow-xl transition-all duration-300"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge variant="secondary" className="text-xs">
                                        {post.category}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {post.readTime}
                                    </span>
                                </div>

                                <h2 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="text-muted-foreground text-sm line-clamp-2 mb-5">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {post.date}
                                    </span>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline group-hover:gap-2 transition-all"
                                    >
                                        Read
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* FAQ Section */}
                <section className="bg-muted/50 rounded-2xl p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-primary mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-2xl mx-auto space-y-4">
                        {faqData.map((faq, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-5">
                                    <h3 className="font-semibold text-foreground mb-2">
                                        {faq.question}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        {faq.answer}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center py-12 px-8 bg-primary rounded-2xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                        Ready to Book Your NDT Inspection?
                    </h2>
                    <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
                        Connect with certified NDT providers. Real-time tracking, instant quotes.
                    </p>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/find-providers">Find Providers</Link>
                    </Button>
                </section>
            </div>
        </>
    );
}
