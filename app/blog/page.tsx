import { Metadata } from 'next';
import Link from 'next/link';
import { FAQSchema, NDTConnectOrganizationSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
    title: 'NDT Inspection Blog | Industry Insights & Best Practices | NDT Connect',
    description: 'Expert articles on non-destructive testing, inspection techniques, RBI strategies, and industry best practices. Stay updated with the latest NDT trends.',
    keywords: [
        'NDT blog',
        'non-destructive testing articles',
        'inspection best practices',
        'ultrasonic testing guide',
        'radiographic testing tips',
        'RBI inspection strategy',
    ],
};

const blogPosts = [
    {
        slug: 'ultimate-guide-ultrasonic-testing',
        title: 'The Ultimate Guide to Ultrasonic Testing (UT) in 2024',
        excerpt: 'Learn everything about ultrasonic testing - from basic principles to advanced techniques like PAUT and TOFD.',
        category: 'Techniques',
        date: '2024-01-15',
        readTime: '12 min read',
    },
    {
        slug: 'real-time-inspection-tracking',
        title: 'How Real-Time Tracking is Revolutionizing NDT Inspections',
        excerpt: 'Discover how platforms like NDT Connect use GPS, H3 indexing, and live updates to transform inspection workflows.',
        category: 'Technology',
        date: '2024-01-10',
        readTime: '8 min read',
    },
    {
        slug: 'rbi-corrosion-management',
        title: 'Risk-Based Inspection (RBI): A Complete Guide for Asset Owners',
        excerpt: 'Implement RBI strategies to prioritize inspections, reduce costs, and ensure asset integrity.',
        category: 'Strategy',
        date: '2024-01-05',
        readTime: '15 min read',
    },
    {
        slug: 'choosing-ndt-service-provider',
        title: 'How to Choose the Right NDT Service Provider',
        excerpt: 'Key factors to consider when selecting an NDT company: certifications, experience, equipment, and more.',
        category: 'Guides',
        date: '2023-12-28',
        readTime: '6 min read',
    },
    {
        slug: 'pipeline-inspection-techniques',
        title: 'Modern Pipeline Inspection Techniques You Need to Know',
        excerpt: 'From MFL to ILI, explore the latest technologies keeping pipelines safe and compliant.',
        category: 'Techniques',
        date: '2023-12-20',
        readTime: '10 min read',
    },
    {
        slug: 'ndt-certifications-explained',
        title: 'NDT Certifications Explained: ASNT, ISO 9712, and More',
        excerpt: 'Understanding the different certification bodies and levels in non-destructive testing.',
        category: 'Careers',
        date: '2023-12-15',
        readTime: '9 min read',
    },
];

const faqData = [
    {
        question: 'What is non-destructive testing (NDT)?',
        answer: 'Non-destructive testing (NDT) is a group of analysis techniques used to evaluate the properties of materials, components, or systems without causing damage. Common methods include ultrasonic testing (UT), radiographic testing (RT), magnetic particle testing (MT), and dye penetrant testing (PT).',
    },
    {
        question: 'How do I book an NDT inspection online?',
        answer: 'With NDT Connect, you can book an inspection in minutes. Simply create an account, describe your inspection needs, choose from our network of verified providers, and track your inspector in real-time.',
    },
    {
        question: 'How much does an NDT inspection cost?',
        answer: 'NDT inspection costs vary based on the type of test, asset complexity, and location. NDT Connect provides instant quotes from multiple providers so you can compare prices and choose the best option.',
    },
];

export default function BlogPage() {
    return (
        <>
            <NDTConnectOrganizationSchema />
            <FAQSchema questions={faqData} />

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        NDT Inspection Insights & Resources
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Expert articles on non-destructive testing techniques, industry best practices,
                        and the latest innovations in inspection technology.
                    </p>
                </header>

                {/* Categories */}
                <nav className="flex flex-wrap justify-center gap-2 mb-12">
                    {['All', 'Techniques', 'Technology', 'Strategy', 'Guides', 'Careers'].map((cat) => (
                        <button
                            key={cat}
                            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 transition-colors"
                        >
                            {cat}
                        </button>
                    ))}
                </nav>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {blogPosts.map((post) => (
                        <article
                            key={post.slug}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700" />
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                        {post.category}
                                    </span>
                                    <span>{post.date}</span>
                                    <span>· {post.readTime}</span>
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* FAQ Section */}
                <section className="bg-gray-50 rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {faqData.map((faq, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center mt-16 py-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready to Book Your NDT Inspection?</h2>
                    <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                        Connect with certified NDT providers in minutes. Real-time tracking, instant quotes, verified experts.
                    </p>
                    <Link
                        href="/find-providers"
                        className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Find Providers Now
                    </Link>
                </section>
            </div>
        </>
    );
}
