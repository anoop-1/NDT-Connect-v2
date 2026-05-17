import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Home, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found. Browse our NDT services, find providers, or explore our resources.',
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8">
        The page you are looking for might have been moved, deleted, or doesn&apos;t exist.
        Try browsing our NDT services or use the links below.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        <Button asChild>
          <Link href="/"><Home className="mr-2 h-4 w-4" /> Back to Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/find-providers"><Search className="mr-2 h-4 w-4" /> Find NDT Providers</Link>
        </Button>
      </div>

      <div className="text-left bg-muted/50 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Popular Pages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <Link href="/services" className="text-primary hover:underline flex items-center gap-1"><ArrowRight className="h-3 w-3" /> NDT Services</Link>
          <Link href="/industries" className="text-primary hover:underline flex items-center gap-1"><ArrowRight className="h-3 w-3" /> Industries</Link>
          <Link href="/certifications" className="text-primary hover:underline flex items-center gap-1"><ArrowRight className="h-3 w-3" /> Certifications</Link>
          <Link href="/blog" className="text-primary hover:underline flex items-center gap-1"><ArrowRight className="h-3 w-3" /> NDT Blog</Link>
          <Link href="/tools/ndt-method-selector" className="text-primary hover:underline flex items-center gap-1"><ArrowRight className="h-3 w-3" /> NDT Method Selector</Link>
          <Link href="/faq" className="text-primary hover:underline flex items-center gap-1"><ArrowRight className="h-3 w-3" /> FAQ</Link>
        </div>
      </div>
    </div>
  );
}
