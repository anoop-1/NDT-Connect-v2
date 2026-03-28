import { Metadata } from 'next';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getTermsByAlphabet, getGlossaryTermsByCategory } from '@/lib/glossary-data';
import { Search, BookOpen, Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NDT Glossary | Complete NDT Terminology Database | NDT Connect',
  description: 'Comprehensive NDT glossary with 200+ terms covering ultrasonic testing, radiography, magnetic particle, penetrant testing, and all NDT methods. Search and browse NDT terminology by category.',
  keywords: ['NDT glossary', 'non-destructive testing terminology', 'UT terms', 'RT terms', 'MT terms', 'PT terms', 'NDT definitions', 'NDT terms'],
  openGraph: {
    title: 'NDT Glossary | Complete Terminology Database',
    description: 'Browse and search 200+ NDT terms with detailed definitions and related information.',
    url: 'https://ndt-connect.com/glossary',
    type: 'website',
  },
  alternates: {
    canonical: 'https://ndt-connect.com/glossary',
  },
};

const categories = [
  { slug: 'methods', name: 'NDT Methods', icon: '🔧' },
  { slug: 'equipment', name: 'Equipment', icon: '⚙️' },
  { slug: 'defects', name: 'Defects & Flaws', icon: '⚠️' },
  { slug: 'standards', name: 'Standards', icon: '📋' },
  { slug: 'materials', name: 'Materials', icon: '🏗️' },
  { slug: 'physics', name: 'Physics Principles', icon: '⚛️' },
  { slug: 'certifications', name: 'Certifications', icon: '🎓' },
  { slug: 'safety', name: 'Safety', icon: '🛡️' },
];

export default function GlossaryPage() {
  const termsAlphabetical = getTermsByAlphabet();
  const alphabet = Object.keys(termsAlphabetical).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-4">
            <BookOpen className="h-4 w-4" />
            NDT Knowledge Base
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            NDT Glossary
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Comprehensive database of 200+ non-destructive testing terms, definitions, and technical explanations. Search by term or browse by category to master NDT terminology.
          </p>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search glossary terms..."
              className="pl-12 h-12 text-base rounded-lg border-2 border-primary/20 focus:border-primary focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold text-primary">Browse by Category</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const categoryTerms = getGlossaryTermsByCategory(category.slug as any);
              return (
                <Link
                  key={category.slug}
                  href={`#${category.slug}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h3 className="text-lg font-semibold text-primary mb-2 group-hover:underline">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {categoryTerms.length} terms
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Alphabetical Index */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-8">Browse Alphabetically</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2">
            {alphabet.map((letter) => (
              <Link
                key={letter}
                href={`#letter-${letter}`}
                className="group"
              >
                <div className="p-3 bg-white rounded-lg border-2 border-primary/10 hover:border-primary hover:bg-primary/5 transition-all text-center font-semibold text-primary group-hover:shadow-md">
                  {letter}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Terms by Alphabet */}
        <div className="space-y-12">
          {alphabet.map((letter) => (
            <section key={letter} id={`letter-${letter}`} className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-primary mb-6 pb-4 border-b-2 border-primary/20">
                {letter}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {termsAlphabetical[letter]
                  .sort((a, b) => a.term.localeCompare(b.term))
                  .map((term) => (
                    <Link
                      key={term.slug}
                      href={`/glossary/${term.slug}`}
                      className="group"
                    >
                      <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 hover:bg-primary/5">
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-primary mb-2 group-hover:underline">
                            {term.term}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {term.definition}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-primary/70 bg-primary/10 px-2 py-1 rounded">
                              {term.category}
                            </span>
                            <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-primary mb-2">📚 Learn More</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore detailed NDT method pages and training resources.
              </p>
              <Link href="/ndt-methods" className="text-sm font-medium text-primary hover:underline">
                Browse NDT Methods →
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-primary mb-2">🏢 Standards & Codes</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Review industry standards and inspection requirements.
              </p>
              <Link href="/standards" className="text-sm font-medium text-primary hover:underline">
                View Standards →
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-primary mb-2">🎓 Get Certified</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore NDT certification programs and training.
              </p>
              <Link href="/training" className="text-sm font-medium text-primary hover:underline">
                View Training →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'NDT Glossary',
            description: 'Comprehensive database of NDT terminology and definitions',
            url: 'https://ndt-connect.com/glossary',
          }),
        }}
      />
    </div>
  );
}
