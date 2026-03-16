'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlogLayoutProps {
    children: React.ReactNode;
    title: string;
    category: string;
    date: string;
    readTime: string;
    description: string;
}

export function BlogLayout({
    children,
    title,
    category,
    date,
    readTime,
    description,
}: BlogLayoutProps) {
    return (
        <div className="max-w-3xl mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link href="/" className="hover:text-primary transition-colors">
                    Home
                </Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-primary transition-colors">
                    Blog
                </Link>
                <span>/</span>
                <span className="text-foreground truncate max-w-[180px]">
                    {title.split(':')[0]}
                </span>
            </nav>

            {/* Back Button */}
            <Button variant="ghost" size="sm" asChild className="mb-8 -ml-3">
                <Link href="/blog">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                </Link>
            </Button>

            {/* Article Header */}
            <header className="mb-10">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                    <Badge variant="secondary">
                        <Tag className="h-3 w-3 mr-1" />
                        {category}
                    </Badge>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {readTime}
                        </span>
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-5">
                    {title}
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </header>

            {/* Divider */}
            <div className="border-b mb-10"></div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none
        prose-headings:text-primary prose-headings:font-bold
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
        prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-5
        prose-li:text-muted-foreground prose-li:mb-2
        prose-strong:text-foreground prose-strong:font-semibold
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-ul:my-5 prose-ol:my-5 prose-ul:pl-6 prose-ol:pl-6
      ">
                {children}
            </article>

            {/* Footer */}
            <div className="mt-16 pt-10 border-t text-center">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                    Explore More Articles
                </h3>
                <p className="text-muted-foreground mb-6">
                    Discover more insights on NDT techniques and best practices.
                </p>
                <Button asChild>
                    <Link href="/blog">View All Articles</Link>
                </Button>
            </div>
        </div>
    );
}

// Reusable components for blog content
export function InfoBox({
    title,
    children
}: {
    title?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-primary/5 border-l-4 border-primary p-5 my-8 rounded-r-lg not-prose">
            {title && <p className="font-semibold text-foreground mb-2">{title}</p>}
            <div className="text-muted-foreground text-base leading-relaxed">{children}</div>
        </div>
    );
}

export function FeatureGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid sm:grid-cols-2 gap-5 my-10 not-prose">
            {children}
        </div>
    );
}

export function FeatureCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <h4 className="font-semibold text-primary mb-3 text-lg">{title}</h4>
            <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
        </div>
    );
}

export function CTASection({
    title,
    description,
    buttonText,
    buttonHref,
}: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
}) {
    return (
        <div className="bg-primary rounded-2xl p-10 text-primary-foreground text-center my-12 not-prose">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="mb-8 opacity-90 max-w-md mx-auto">{description}</p>
            <Button asChild size="lg" variant="secondary">
                <Link href={buttonHref}>{buttonText}</Link>
            </Button>
        </div>
    );
}
