// components/layout/Footer.tsx
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950 border-t section-divider">
      {/* Decorative orb background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-accent w-[400px] h-[400px] absolute -top-40 -right-40 opacity-20"></div>
        <div className="orb orb-primary w-[350px] h-[350px] absolute -bottom-32 -left-32 opacity-15"></div>
        <div className="hero-grid-bg absolute inset-0 opacity-5"></div>
      </div>

      <div className="layout-wrapper py-16 relative z-10">
        {/* Navigation Bar */}
        <nav className="mb-12 pb-8 border-b border-slate-800">
          <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 sm:gap-y-3">
            {[
              { label: 'Home', href: '/' },
              { label: 'Find Providers', href: '/find-providers' },
              { label: 'Services', href: '/services' },
              { label: 'Industries', href: '/industries' },
              { label: 'About', href: '/about' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/contact' },
              { label: 'FAQ', href: '/faq' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 mb-12 animate-fade-in-up">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <h3 className="gradient-text font-bold text-xl mb-2">NDT Connect</h3>
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
            <p className="text-sm leading-relaxed text-slate-300 mb-6">
              The world&apos;s leading marketplace for Non-Destructive Testing services. Connect with certified inspectors worldwide.
            </p>
            <Link
              href="/register"
              className="inline-block px-6 py-2.5 bg-brand hover:bg-brand-dark text-white text-sm font-medium rounded-lg transition-all duration-300 btn-glow hover:scale-105 transform"
            >
              Get Started Free
            </Link>
          </div>

          {/* NDT Services */}
          <div className="group">
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-blue-400">
                <span>NDT Services</span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors"></span>
              </h4>
              <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500/60 to-transparent rounded-full"></div>
            </div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">All Services</Link></li>
              <li><Link href="/services/ultrasonic-testing" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Ultrasonic Testing</Link></li>
              <li><Link href="/services/radiographic-testing" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Radiographic Testing</Link></li>
              <li><Link href="/services/magnetic-particle-testing" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Magnetic Particle</Link></li>
              <li><Link href="/services/penetrant-testing" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Penetrant Testing</Link></li>
              <li><Link href="/services/phased-array-ut" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Phased Array (PAUT)</Link></li>
              <li><Link href="/services/tofd-testing" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">TOFD Testing</Link></li>
              <li><Link href="/services/eddy-current-testing" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Eddy Current</Link></li>
              <li><Link href="/services/corrosion-mapping" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Corrosion Mapping</Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div className="group">
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-blue-400">
                <span>Industries</span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors"></span>
              </h4>
              <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500/60 to-transparent rounded-full"></div>
            </div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/industries/oil-and-gas" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Oil &amp; Gas</Link></li>
              <li><Link href="/industries/aerospace" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Aerospace</Link></li>
              <li><Link href="/industries/power-generation" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Power Generation</Link></li>
              <li><Link href="/industries/manufacturing" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Manufacturing</Link></li>
              <li><Link href="/industries/marine-and-offshore" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Marine &amp; Offshore</Link></li>
              <li><Link href="/industries/construction" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Construction</Link></li>
              <li><Link href="/industries/mining" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Mining</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div className="group">
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-blue-400">
                <span>Locations</span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors"></span>
              </h4>
              <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500/60 to-transparent rounded-full"></div>
            </div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ndt-services/houston-tx" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Houston</Link></li>
              <li><Link href="/ndt-services/los-angeles-ca" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Los Angeles</Link></li>
              <li><Link href="/ndt-services/new-york-ny" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">New York</Link></li>
              <li><Link href="/ndt-services/dubai-ae" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Dubai</Link></li>
              <li><Link href="/ndt-services/abu-dhabi-ae" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Abu Dhabi</Link></li>
              <li><Link href="/ndt-services/jubail-sa" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Jubail (Saudi)</Link></li>
              <li><Link href="/ndt-services/london-uk" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">London</Link></li>
              <li><Link href="/ndt-services/singapore-sg" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Singapore</Link></li>
              <li><Link href="/ndt-services/mumbai-in" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Mumbai</Link></li>
              <li><Link href="/find-providers" className="text-blue-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-1 inline-block font-medium">All Locations →</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="group">
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-blue-400">
                <span>Resources</span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors"></span>
              </h4>
              <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500/60 to-transparent rounded-full"></div>
            </div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Free Calculators</Link></li>
              <li><Link href="/reports" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Data Reports</Link></li>
              <li><Link href="/methods" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">NDT Methods</Link></li>
              <li><Link href="/pillars" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">In-Depth Guides</Link></li>
              <li><Link href="/learn" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Learn / How-To</Link></li>
              <li><Link href="/compare" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Compare Methods</Link></li>
              <li><Link href="/equipment" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Equipment Reviews</Link></li>
              <li><Link href="/standards" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Standards Reference</Link></li>
              <li><Link href="/glossary" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">NDT Glossary</Link></li>
              <li><Link href="/certifications" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Certifications</Link></li>
              <li><Link href="/careers" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">NDT Careers</Link></li>
              <li><Link href="/blog" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Blog</Link></li>
              <li><Link href="https://dt.atlantisndt.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Reporting</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="group">
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-blue-400">
                <span>Company</span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors"></span>
              </h4>
              <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500/60 to-transparent rounded-full"></div>
            </div>
            <ul className="space-y-2 text-sm mb-6">
              <li><Link href="/about" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Contact</Link></li>
              <li><Link href="/find-providers" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Find Providers</Link></li>
              <li><Link href="/register" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Register</Link></li>
              <li><Link href="/login" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">Login</Link></li>
            </ul>
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-blue-400">
                <span>Contact</span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors"></span>
              </h4>
              <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500/60 to-transparent rounded-full mb-3"></div>
              <ul className="space-y-1.5 text-sm text-slate-300">
                <li>+1-281-840-8969</li>
                <li>info@ndt-connect.com</li>
                <li>Houston, TX, USA</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Secondary footer - SEO link block with glass background */}
        <div className="section-divider pt-8 mb-8">
          <div className="glass-dark rounded-xl p-6 backdrop-blur-md border border-blue-500/20">
            <h4 className="font-semibold text-xs text-blue-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Popular NDT Services by City
            </h4>
            <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs">
              <Link href="/ndt-services/houston-tx/ultrasonic-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">UT in Houston</Link>
              <Link href="/ndt-services/houston-tx/radiographic-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">RT in Houston</Link>
              <Link href="/ndt-services/los-angeles-ca/ultrasonic-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">UT in Los Angeles</Link>
              <Link href="/ndt-services/dubai-ae/ultrasonic-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">UT in Dubai</Link>
              <Link href="/ndt-services/dubai-ae/radiographic-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">RT in Dubai</Link>
              <Link href="/ndt-services/new-york-ny/magnetic-particle-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">MT in New York</Link>
              <Link href="/ndt-services/chicago-il/penetrant-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">PT in Chicago</Link>
              <Link href="/ndt-services/dallas-tx/phased-array-ut" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">PAUT in Dallas</Link>
              <Link href="/ndt-services/abu-dhabi-ae/phased-array-ut" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">PAUT in Abu Dhabi</Link>
              <Link href="/ndt-services/jubail-sa/ultrasonic-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">UT in Jubail</Link>
              <Link href="/ndt-services/yanbu-sa/radiographic-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">RT in Yanbu</Link>
              <Link href="/ndt-services/london-uk/visual-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">VT in London</Link>
              <Link href="/ndt-services/aberdeen-uk/ultrasonic-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">UT in Aberdeen</Link>
              <Link href="/ndt-services/singapore-sg/radiographic-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">RT in Singapore</Link>
              <Link href="/ndt-services/mumbai-in/ultrasonic-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">UT in Mumbai</Link>
              <Link href="/ndt-services/bangalore-in/phased-array-ut" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">PAUT in Bangalore</Link>
              <Link href="/ndt-services/jamnagar-in/radiographic-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">RT in Jamnagar</Link>
              <Link href="/ndt-services/calgary-ab/magnetic-particle-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">MT in Calgary</Link>
              <Link href="/ndt-services/perth-au/penetrant-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">PT in Perth</Link>
              <Link href="/cost-guide/houston-tx/ultrasonic-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">UT Cost Houston</Link>
              <Link href="/cost-guide/dubai-ae/radiographic-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">RT Cost Dubai</Link>
              <Link href="/tools/ndt-procedure-generator" className="text-blue-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block font-medium">AI Procedure Generator</Link>
              <Link href="/free-tools" className="text-blue-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block font-medium">Free NDT Tools</Link>
              <Link href="/compare/ultrasonic-testing-vs-radiographic-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">UT vs RT</Link>
              <Link href="/compare/magnetic-particle-testing-vs-penetrant-testing" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">MT vs PT</Link>
              <Link href="/training/houston-tx" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">NDT Training Houston</Link>
              <Link href="/careers/houston-tx" className="text-slate-300 hover:text-blue-200 transition-all duration-200 hover:translate-x-0.5 inline-block">NDT Careers Houston</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar with glassmorphism */}
        <div className="section-divider pt-8">
          <div className="glass-dark rounded-lg p-6 backdrop-blur-md border border-blue-500/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-xs text-slate-400">
                &copy; {currentYear} NDT Connect by Atlantis NDT. All rights reserved.
              </p>
              <div className="flex gap-8 text-xs">
                <Link href="/privacy" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">
                  Terms of Service
                </Link>
                <Link href="/sitemap.xml" className="text-slate-300 hover:text-blue-300 transition-all duration-200 hover:translate-x-1 inline-block">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
