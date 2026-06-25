/**
 * Schema.org JSON-LD Structured Data Components
 * For SEO-optimized service, organization, and review markup
 */

import React from 'react';

interface ServiceSchemaProps {
    serviceName: string;
    description: string;
    provider: string;
    areaServed: string;
    priceRange?: string;
}

export function ServiceSchema({
    serviceName,
    description,
    provider,
    areaServed,
    priceRange,
}: ServiceSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: serviceName,
        description,
        provider: {
            '@type': 'Organization',
            name: provider,
        },
        areaServed,
        priceRange,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface LocalBusinessSchemaProps {
    name: string;
    description: string;
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    phone: string;
    email?: string;
    url: string;
    image?: string;
    priceRange?: string;
    rating?: { value: number; count: number };
}

export function LocalBusinessSchema({
    name,
    description,
    address,
    phone,
    email,
    url,
    image,
    priceRange,
    rating,
}: LocalBusinessSchemaProps) {
    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': url,
        name,
        description,
        address: {
            '@type': 'PostalAddress',
            streetAddress: address.street,
            addressLocality: address.city,
            addressRegion: address.state,
            postalCode: address.postalCode,
            addressCountry: address.country,
        },
        telephone: phone,
        url,
        image,
        priceRange,
    };

    if (email) schema.email = email;
    if (rating) {
        schema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: rating.value,
            reviewCount: rating.count,
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface ReviewSchemaProps {
    itemReviewed: string;
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
}

export function ReviewSchema({
    itemReviewed,
    author,
    rating,
    reviewBody,
    datePublished,
}: ReviewSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Review',
        itemReviewed: {
            '@type': 'Service',
            name: itemReviewed,
        },
        author: {
            '@type': 'Person',
            name: author,
        },
        reviewRating: {
            '@type': 'Rating',
            ratingValue: rating,
            bestRating: 5,
        },
        reviewBody,
        datePublished,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface OrganizationSchemaProps {
    name: string;
    url: string;
    logo: string;
    description: string;
    sameAs?: string[];
    contactPoint?: {
        telephone: string;
        contactType: string;
    };
}

export function OrganizationSchema({
    name,
    url,
    logo,
    description,
    sameAs,
    contactPoint,
}: OrganizationSchemaProps) {
    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        url,
        logo,
        description,
        sameAs,
    };

    if (contactPoint) {
        schema.contactPoint = {
            '@type': 'ContactPoint',
            ...contactPoint,
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// NDT Connect platform-wide organization schema
export function NDTConnectOrganizationSchema() {
    return (
        <OrganizationSchema
            name="NDT Connect"
            url="https://ndt-connect.com"
            logo="https://ndt-connect.com/logo.png"
            description="NDT Connect is the leading marketplace connecting industrial asset owners with certified NDT service providers and freelance inspectors for real-time inspection services."
            sameAs={[
                'https://www.linkedin.com/company/ndtconnect',
                'https://twitter.com/ndtconnect',
            ]}
            contactPoint={{
                telephone: '+1-800-NDT-CONNECT',
                contactType: 'customer service',
            }}
        />
    );
}

// Article schema for blog posts — essential for rich snippets
interface ArticleSchemaProps {
    title: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified?: string;
    category?: string;
    wordCount?: number;
    image?: string;
    author?: string;
}

export function ArticleSchema({ title, description, url, datePublished, dateModified, category, wordCount, image, author }: ArticleSchemaProps) {
    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url,
        datePublished,
        dateModified: dateModified || datePublished,
        author: author
            ? { '@type': 'Person', name: author }
            : { '@type': 'Organization', name: 'NDT Connect', url: 'https://ndt-connect.com' },
        publisher: {
            '@type': 'Organization',
            name: 'NDT Connect',
            url: 'https://ndt-connect.com',
            logo: { '@type': 'ImageObject', url: 'https://ndt-connect.com/logo.png' },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        image: image ?? `${url.split('/blog/')[0]}/opengraph-image`,
        ...(category && { articleSection: category }),
        ...(wordCount && { wordCount }),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// BreadcrumbList schema for navigation rich snippets
interface BreadcrumbSchemaProps {
    items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// FAQPage schema for SEO
interface FAQSchemaProps {
    questions: Array<{ question: string; answer: string }>;
}

export function FAQSchema({ questions }: FAQSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// FAQPage schema — alias used by some city pages
interface FAQPageSchemaProps {
    questions: Array<{ question: string; answer: string }>;
}

export function FAQPageSchema({ questions }: FAQPageSchemaProps) {
    return <FAQSchema questions={questions} />;
}

// BreadcrumbList schema (canonical name per schema.org)
// Same shape as BreadcrumbSchema but exported under the schema.org type name.
interface BreadcrumbListSchemaProps {
    items: Array<{ name: string; url: string }>;
}

export function BreadcrumbListSchema({ items }: BreadcrumbListSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// SoftwareApplication schema — for free-tool feature pages and other SaaS pages.
interface SoftwareApplicationSchemaProps {
    name: string;
    description: string;
    applicationCategory: string;
    operatingSystem?: string;
    price?: string; // string form per schema.org Offer.price
    priceCurrency?: string;
    url?: string;
    ratingValue?: number;
    reviewCount?: number;
}

export function SoftwareApplicationSchema({
    name,
    description,
    applicationCategory,
    operatingSystem = 'Web, iOS, Android',
    price = '0',
    priceCurrency = 'USD',
    url,
    ratingValue,
    reviewCount,
}: SoftwareApplicationSchemaProps) {
    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name,
        description,
        applicationCategory,
        operatingSystem,
        offers: {
            '@type': 'Offer',
            price,
            priceCurrency,
            availability: 'https://schema.org/InStock',
        },
    };

    if (url) schema.url = url;
    if (typeof ratingValue === 'number' && typeof reviewCount === 'number') {
        schema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue,
            reviewCount,
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// HowTo schema — for procedural / step-by-step content (NDT procedures, tools).
interface HowToSchemaProps {
    name: string;
    description: string;
    steps: Array<{ name: string; text: string; url?: string; image?: string }>;
    supply?: string[];
    tool?: string[];
    totalTime?: string; // ISO 8601 duration, e.g. "PT30M"
    image?: string;
}

export function HowToSchema({
    name,
    description,
    steps,
    supply,
    tool,
    totalTime,
    image,
}: HowToSchemaProps) {
    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        step: steps.map((s, i) => {
            const step: Record<string, unknown> = {
                '@type': 'HowToStep',
                position: i + 1,
                name: s.name,
                text: s.text,
            };
            if (s.url) step.url = s.url;
            if (s.image) step.image = s.image;
            return step;
        }),
    };

    if (supply && supply.length) {
        schema.supply = supply.map((s) => ({ '@type': 'HowToSupply', name: s }));
    }
    if (tool && tool.length) {
        schema.tool = tool.map((t) => ({ '@type': 'HowToTool', name: t }));
    }
    if (totalTime) schema.totalTime = totalTime;
    if (image) schema.image = image;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Dataset rich result + AI-citation signal for data studies (salary, cost
// index, industry statistics). Reusable so each study doesn't inline boilerplate.
export function DatasetSchema({
    name,
    description,
    url,
    keywords = [],
    spatialCoverage = 'Worldwide',
    temporalCoverage = String(new Date().getUTCFullYear()),
    distributionUrl,
    distributionFormat = 'text/csv',
}: {
    name: string;
    description: string;
    url: string;
    keywords?: string[];
    spatialCoverage?: string;
    temporalCoverage?: string;
    distributionUrl?: string;
    distributionFormat?: string;
}) {
    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name,
        description,
        url,
        creator: { '@type': 'Organization', name: 'NDT Connect', url: 'https://ndt-connect.com' },
        publisher: { '@type': 'Organization', name: 'NDT Connect', url: 'https://ndt-connect.com' },
        license: 'https://creativecommons.org/licenses/by/4.0/',
        spatialCoverage,
        temporalCoverage,
        keywords,
        dateModified: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)).toISOString().slice(0, 10),
    };
    if (distributionUrl) {
        schema.distribution = [{
            '@type': 'DataDownload',
            encodingFormat: distributionFormat,
            contentUrl: distributionUrl,
        }];
    }
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    );
}
