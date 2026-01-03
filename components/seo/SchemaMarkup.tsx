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
            url="https://ndtconnect.com"
            logo="https://ndtconnect.com/logo.png"
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
