// components/layout/Footer.tsx
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        {/* Main Footer Grid - 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: '#004aad' }}>NDT Connect</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#004aad' }}>
              Your trusted platform for Non-Destructive Testing services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#004aad' }}>Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:underline transition-colors" style={{ color: '#004aad' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/find-providers" className="hover:underline transition-colors" style={{ color: '#004aad' }}>
                  Find Providers
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:underline transition-colors" style={{ color: '#004aad' }}>
                  Register
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline transition-colors" style={{ color: '#004aad' }}>
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#004aad' }}>Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/blog" className="hover:underline transition-colors" style={{ color: '#004aad' }}>
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/blog/ultimate-guide-ultrasonic-testing" className="hover:underline transition-colors" style={{ color: '#004aad' }}>
                  Ultrasonic Testing
                </Link>
              </li>
              <li>
                <Link href="/blog/rbi-corrosion-management" className="hover:underline transition-colors" style={{ color: '#004aad' }}>
                  RBI Guide
                </Link>
              </li>
              <li>
                <Link href="/blog/ndt-certifications-explained" className="hover:underline transition-colors" style={{ color: '#004aad' }}>
                  NDT Certifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#004aad' }}>Contact Us</h4>
            <ul className="space-y-3 text-sm" style={{ color: '#004aad' }}>
              <li>info@ndtconnect.com</li>
              <li>Global Platform</li>
            </ul>
            <div className="mt-4">
              <Link
                href="/register"
                className="inline-block px-4 py-2 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-colors"
                style={{ backgroundColor: '#004aad' }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm" style={{ color: '#004aad' }}>
            &copy; {currentYear} NDT Connect by Atlantis NDT. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="hover:underline transition-colors" style={{ color: '#004aad' }}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline transition-colors" style={{ color: '#004aad' }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
