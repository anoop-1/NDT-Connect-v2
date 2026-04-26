// src/components/layout/Footer.tsx
//
// Site-wide footer. Replaces the previous text-only "NDT Connect" brand block
// with the SVG logo, expands the Resources column with links to free-tools
// pillar + the 6 evergreen blog posts (which now exist), and keeps Privacy /
// Terms in the bottom bar (which now exist).

import Link from 'next/link';
import { NdtConnectLogo } from '@/components/shared/NdtConnectLogo';

const BRAND = '#004aad';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        {/* Main Footer Grid - 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="mb-4">
              <NdtConnectLogo variant="color" height={36} />
            </div>
            <p className="text-sm leading-relaxed mb-3" style={{ color: BRAND }}>
              Free tools and the marketplace for NDT inspection companies — equipment, calibration, and certificate management. Plus a verified directory of providers.
            </p>
            <p className="text-xs" style={{ color: BRAND }}>
              Part of the Atlantis NDT family.
            </p>
          </div>

          {/* Free tools */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: BRAND }}>Free Tools</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/free-tools" className="hover:underline" style={{ color: BRAND }}>All free tools</Link></li>
              <li><Link href="/free-tools/equipment-management" className="hover:underline" style={{ color: BRAND }}>Equipment management</Link></li>
              <li><Link href="/free-tools/calibration-tracking" className="hover:underline" style={{ color: BRAND }}>Calibration tracking</Link></li>
              <li><Link href="/free-tools/certificate-management" className="hover:underline" style={{ color: BRAND }}>Certificate management</Link></li>
            </ul>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: BRAND }}>Marketplace</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/find-providers" className="hover:underline" style={{ color: BRAND }}>Find providers</Link></li>
              <li><Link href="/find-providers/map" className="hover:underline" style={{ color: BRAND }}>Map view</Link></li>
              <li><Link href="/request-service" className="hover:underline" style={{ color: BRAND }}>Request a quote</Link></li>
              <li><Link href="/recommendations" className="hover:underline" style={{ color: BRAND }}>AI recommendations</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: BRAND }}>Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/blog" className="hover:underline" style={{ color: BRAND }}>All articles</Link></li>
              <li><Link href="/blog/ultimate-guide-ultrasonic-testing" className="hover:underline" style={{ color: BRAND }}>Ultrasonic Testing guide</Link></li>
              <li><Link href="/blog/asnt-snt-tc-1a-complete-guide" className="hover:underline" style={{ color: BRAND }}>ASNT SNT-TC-1A</Link></li>
              <li><Link href="/blog/calibration-interval-rules-by-code" className="hover:underline" style={{ color: BRAND }}>Cal interval rules</Link></li>
              <li><Link href="/blog/free-vs-paid-ndt-software" className="hover:underline" style={{ color: BRAND }}>Free vs paid NDT software</Link></li>
              <li><Link href="/about" className="hover:underline" style={{ color: BRAND }}>About</Link></li>
            </ul>
          </div>
        </div>

        {/* Sub-row — get-started CTA + contact */}
        <div className="grid md:grid-cols-2 gap-6 items-center mb-8 p-6 rounded-lg" style={{ backgroundColor: '#F5F7FA' }}>
          <div>
            <h4 className="font-semibold mb-1" style={{ color: BRAND }}>Free for inspection companies — user ID only</h4>
            <p className="text-sm" style={{ color: BRAND }}>info@ndtconnect.com · Global platform</p>
          </div>
          <div className="md:text-right">
            <Link
              href="/register"
              className="inline-block px-4 py-2 text-white text-sm font-medium rounded-lg hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              Create your free user ID
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm" style={{ color: BRAND }}>
            &copy; {currentYear} NDT Connect by Atlantis NDT. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="hover:underline" style={{ color: BRAND }}>Privacy Policy</Link>
            <Link href="/terms" className="hover:underline" style={{ color: BRAND }}>Terms of Service</Link>
            <Link href="/login" className="hover:underline" style={{ color: BRAND }}>Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
