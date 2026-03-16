// components/layout/Footer.tsx
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="font-bold text-lg mb-3" style={{ color: '#004aad' }}>NDT Connect</h3>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">
              The world&apos;s leading marketplace for Non-Destructive Testing services. Connect with certified inspectors worldwide.
            </p>
            <Link
              href="/register"
              className="inline-block px-4 py-2 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#004aad' }}
            >
              Get Started Free
            </Link>
          </div>

          {/* NDT Services */}
          <div>
            <h4 className="font-semibold text-sm mb-3" style={{ color: '#004aad' }}>NDT Services</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">All Services</Link></li>
              <li><Link href="/services/ultrasonic-testing" className="text-muted-foreground hover:text-primary transition-colors">Ultrasonic Testing</Link></li>
              <li><Link href="/services/radiographic-testing" className="text-muted-foreground hover:text-primary transition-colors">Radiographic Testing</Link></li>
              <li><Link href="/services/magnetic-particle-testing" className="text-muted-foreground hover:text-primary transition-colors">Magnetic Particle</Link></li>
              <li><Link href="/services/penetrant-testing" className="text-muted-foreground hover:text-primary transition-colors">Penetrant Testing</Link></li>
              <li><Link href="/services/phased-array-ut" className="text-muted-foreground hover:text-primary transition-colors">Phased Array (PAUT)</Link></li>
              <li><Link href="/services/tofd-testing" className="text-muted-foreground hover:text-primary transition-colors">TOFD Testing</Link></li>
              <li><Link href="/services/eddy-current-testing" className="text-muted-foreground hover:text-primary transition-colors">Eddy Current</Link></li>
              <li><Link href="/services/corrosion-mapping" className="text-muted-foreground hover:text-primary transition-colors">Corrosion Mapping</Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-semibold text-sm mb-3" style={{ color: '#004aad' }}>Industries</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link href="/industries/oil-and-gas" className="text-muted-foreground hover:text-primary transition-colors">Oil &amp; Gas</Link></li>
              <li><Link href="/industries/aerospace" className="text-muted-foreground hover:text-primary transition-colors">Aerospace</Link></li>
              <li><Link href="/industries/power-generation" className="text-muted-foreground hover:text-primary transition-colors">Power Generation</Link></li>
              <li><Link href="/industries/manufacturing" className="text-muted-foreground hover:text-primary transition-colors">Manufacturing</Link></li>
              <li><Link href="/industries/marine-and-offshore" className="text-muted-foreground hover:text-primary transition-colors">Marine &amp; Offshore</Link></li>
              <li><Link href="/industries/construction" className="text-muted-foreground hover:text-primary transition-colors">Construction</Link></li>
              <li><Link href="/industries/mining" className="text-muted-foreground hover:text-primary transition-colors">Mining</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold text-sm mb-3" style={{ color: '#004aad' }}>Locations</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link href="/ndt-services/houston" className="text-muted-foreground hover:text-primary transition-colors">Houston</Link></li>
              <li><Link href="/ndt-services/los-angeles" className="text-muted-foreground hover:text-primary transition-colors">Los Angeles</Link></li>
              <li><Link href="/ndt-services/new-york" className="text-muted-foreground hover:text-primary transition-colors">New York</Link></li>
              <li><Link href="/ndt-services/dubai" className="text-muted-foreground hover:text-primary transition-colors">Dubai</Link></li>
              <li><Link href="/ndt-services/abu-dhabi" className="text-muted-foreground hover:text-primary transition-colors">Abu Dhabi</Link></li>
              <li><Link href="/ndt-services/saudi-arabia" className="text-muted-foreground hover:text-primary transition-colors">Saudi Arabia</Link></li>
              <li><Link href="/ndt-services/london" className="text-muted-foreground hover:text-primary transition-colors">London</Link></li>
              <li><Link href="/ndt-services/singapore" className="text-muted-foreground hover:text-primary transition-colors">Singapore</Link></li>
              <li><Link href="/ndt-services/mumbai" className="text-muted-foreground hover:text-primary transition-colors">Mumbai</Link></li>
              <li><Link href="/find-providers" className="text-primary hover:underline transition-colors font-medium">All Locations →</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-3" style={{ color: '#004aad' }}>Resources</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/glossary" className="text-muted-foreground hover:text-primary transition-colors">NDT Glossary</Link></li>
              <li><Link href="/standards" className="text-muted-foreground hover:text-primary transition-colors">Standards Reference</Link></li>
              <li><Link href="/certifications" className="text-muted-foreground hover:text-primary transition-colors">Certifications</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">NDT Careers</Link></li>
              <li><Link href="/tools/ndt-method-selector" className="text-muted-foreground hover:text-primary transition-colors">Method Selector</Link></li>
              <li><Link href="/tools/inspection-cost-estimator" className="text-muted-foreground hover:text-primary transition-colors">Cost Estimator</Link></li>
              <li><Link href="/case-studies" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-3" style={{ color: '#004aad' }}>Company</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/find-providers" className="text-muted-foreground hover:text-primary transition-colors">Find Providers</Link></li>
              <li><Link href="/register" className="text-muted-foreground hover:text-primary transition-colors">Register</Link></li>
              <li><Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">Login</Link></li>
            </ul>
            <h4 className="font-semibold text-sm mt-5 mb-3" style={{ color: '#004aad' }}>Contact</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>+1-281-840-8969</li>
              <li>info@ndt-connect.com</li>
              <li>Houston, TX, USA</li>
            </ul>
          </div>
        </div>

        {/* Secondary footer - SEO link block for city x service combos */}
        <div className="border-t pt-6 mb-6">
          <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3">Popular NDT Services by City</h4>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <Link href="/ndt-services/houston/ultrasonic-testing" className="hover:text-primary transition-colors">UT in Houston</Link>
            <Link href="/ndt-services/houston/radiographic-testing" className="hover:text-primary transition-colors">RT in Houston</Link>
            <Link href="/ndt-services/los-angeles/ultrasonic-testing" className="hover:text-primary transition-colors">UT in Los Angeles</Link>
            <Link href="/ndt-services/dubai/ultrasonic-testing" className="hover:text-primary transition-colors">UT in Dubai</Link>
            <Link href="/ndt-services/dubai/radiographic-testing" className="hover:text-primary transition-colors">RT in Dubai</Link>
            <Link href="/ndt-services/new-york/magnetic-particle-testing" className="hover:text-primary transition-colors">MT in New York</Link>
            <Link href="/ndt-services/chicago/penetrant-testing" className="hover:text-primary transition-colors">PT in Chicago</Link>
            <Link href="/ndt-services/dallas/phased-array-ut" className="hover:text-primary transition-colors">PAUT in Dallas</Link>
            <Link href="/ndt-services/abu-dhabi/corrosion-mapping" className="hover:text-primary transition-colors">CM in Abu Dhabi</Link>
            <Link href="/ndt-services/saudi-arabia/ultrasonic-testing" className="hover:text-primary transition-colors">UT in Saudi Arabia</Link>
            <Link href="/ndt-services/london/eddy-current-testing" className="hover:text-primary transition-colors">ET in London</Link>
            <Link href="/ndt-services/singapore/radiographic-testing" className="hover:text-primary transition-colors">RT in Singapore</Link>
            <Link href="/ndt-services/mumbai/ultrasonic-testing" className="hover:text-primary transition-colors">UT in Mumbai</Link>
            <Link href="/ndt-services/calgary/magnetic-flux-leakage" className="hover:text-primary transition-colors">MFL in Calgary</Link>
            <Link href="/ndt-services/perth/guided-wave-testing" className="hover:text-primary transition-colors">GWT in Perth</Link>
            <Link href="/cost-guide/houston/ultrasonic-testing" className="hover:text-primary transition-colors">UT Cost Houston</Link>
            <Link href="/cost-guide/dubai/radiographic-testing" className="hover:text-primary transition-colors">RT Cost Dubai</Link>
            <Link href="/compare/ultrasonic-testing-vs-radiographic-testing" className="hover:text-primary transition-colors">UT vs RT</Link>
            <Link href="/compare/magnetic-particle-testing-vs-penetrant-testing" className="hover:text-primary transition-colors">MT vs PT</Link>
            <Link href="/training/houston" className="hover:text-primary transition-colors">NDT Training Houston</Link>
            <Link href="/careers/houston" className="hover:text-primary transition-colors">NDT Careers Houston</Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} NDT Connect by Atlantis NDT. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="text-muted-foreground hover:text-primary transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
