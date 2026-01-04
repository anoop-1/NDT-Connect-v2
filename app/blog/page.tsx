import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { FAQSchema, NDTConnectOrganizationSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
    title: 'NDT Inspection Blog | Industry Insights & Best Practices | NDT Connect',
    description: 'Expert articles on non-destructive testing, inspection techniques, RBI strategies, and industry best practices.',
    keywords: ['NDT blog', 'non-destructive testing articles', 'inspection best practices'],
};

const blogPosts = [
    {
        slug: 'ultimate-guide-ultrasonic-testing',
        title: 'The Ultimate Guide to Ultrasonic Testing (UT) in 2024',
        excerpt: 'Learn everything about ultrasonic testing - from basic principles to advanced techniques like PAUT and TOFD.',
        category: 'Techniques',
        date: 'Jan 15, 2024',
        readTime: '12 min',
    },
    {
        slug: 'real-time-inspection-tracking',
        title: 'How Real-Time Tracking is Revolutionizing NDT Inspections',
        excerpt: 'Discover how platforms like NDT Connect use GPS, H3 indexing, and live updates to transform workflows.',
        category: 'Technology',
        date: 'Jan 10, 2024',
        readTime: '8 min',
    },
    {
        slug: 'rbi-corrosion-management',
        title: 'Risk-Based Inspection (RBI): A Complete Guide for Asset Owners',
        excerpt: 'Implement RBI strategies to prioritize inspections, reduce costs, and ensure asset integrity.',
        category: 'Strategy',
        date: 'Jan 5, 2024',
        readTime: '15 min',
    },
    {
        slug: 'choosing-ndt-service-provider',
        title: 'How to Choose the Right NDT Service Provider',
        excerpt: 'Key factors to consider when selecting an NDT company: certifications, experience, and equipment.',
        category: 'Guides',
        date: 'Dec 28, 2023',
        readTime: '6 min',
    },
    {
        slug: 'pipeline-inspection-techniques',
        title: 'Modern Pipeline Inspection Techniques You Need to Know',
        excerpt: 'From MFL to ILI, explore the latest technologies keeping pipelines safe and compliant.',
        category: 'Techniques',
        date: 'Dec 20, 2023',
        readTime: '10 min',
    },
    {
        slug: 'ndt-certifications-explained',
        title: 'NDT Certifications Explained: ASNT, ISO 9712, and More',
        excerpt: 'Understanding the different certification bodies and levels in non-destructive testing.',
        category: 'Careers',
        date: 'Dec 15, 2023',
        readTime: '9 min',
    },
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

            <div className="max-w-5xl mx-auto px-4 space-y-16">
                {/* Header */}
                <div className="text-center pt-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-5">
                        <BookOpen className="h-7 w-7 text-primary" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        NDT Insights & Resources
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                        Expert articles on non-destructive testing techniques, best practices,
                        and the latest innovations.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post) => (
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
