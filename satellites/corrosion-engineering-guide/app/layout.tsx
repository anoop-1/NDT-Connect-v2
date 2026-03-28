import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Corrosion Engineering Guide - Understanding and Preventing Industrial Corrosion',
    template: '%s | Corrosion Engineering Guide',
  },
  description: 'Expert resource on corrosion mechanisms, prevention strategies, inspection methods, and materials selection for industrial applications.',
  keywords: ['NDT', 'non-destructive testing', 'corrosion engineering guide', 'inspection'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta name="google-site-verification" content="dlNM5ly7deh5YYSr3uXXCL_lyNXxdluY229Ywzm34nE" />
      </head>
      <body>
        <header style={{ borderBottom: '3px solid #7c3aed', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href='/' style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#7c3aed', textDecoration: 'none' }}>Corrosion Engineering Guide</a>
          <nav style={{ display: 'flex', gap: '16px', fontSize: '0.9rem' }}>
            <a href='/' style={{ color: '#555', textDecoration: 'none' }}>Home</a>
            <a href='https://ndtconnect.com' target='_blank' rel='noopener' style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600 }}>NDT Connect</a>
          </nav>
        </header>
        <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
          {children}
        </main>
        <footer style={{ borderTop: '1px solid #e5e7eb', padding: '32px 24px', marginTop: '48px', textAlign: 'center', color: '#888', fontSize: '0.85rem' }}>
          <p>&copy; 2026 Corrosion Engineering Guide. An educational resource by <a href='https://ndtconnect.com' target='_blank' rel='noopener' style={{ color: '#7c3aed' }}>NDT Connect</a>.</p>
          <div style={{ marginTop: '12px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href='https://ndtconnect.com/services' target='_blank' rel='noopener' style={{ color: '#666', fontSize: '0.8rem' }}>NDT Services</a>
            <a href='https://ndtconnect.com/industries' target='_blank' rel='noopener' style={{ color: '#666', fontSize: '0.8rem' }}>Industries</a>
            <a href='https://ndtconnect.com/certifications' target='_blank' rel='noopener' style={{ color: '#666', fontSize: '0.8rem' }}>Certifications</a>
            <a href='https://ndtconnect.com/blog' target='_blank' rel='noopener' style={{ color: '#666', fontSize: '0.8rem' }}>NDT Blog</a>
            <a href='https://ndtconnect.com/find-providers' target='_blank' rel='noopener' style={{ color: '#666', fontSize: '0.8rem' }}>Find Providers</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
