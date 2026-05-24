import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'NDT Equipment Reviews - Independent NDT Equipment and Technology Reviews',
    template: '%s | NDT Equipment Reviews',
  },
  description: 'Independent reviews and comparisons of NDT equipment, software, and technology from leading manufacturers.',
  keywords: ['NDT', 'non-destructive testing', 'ndt equipment reviews', 'inspection'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta name="google-site-verification" content="dlNM5ly7deh5YYSr3uXXCL_lyNXxdluY229Ywzm34nE" />
      </head>
      <body>
        <header style={{ borderBottom: '3px solid #6366f1', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href='/' style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#6366f1', textDecoration: 'none' }}>NDT Equipment Reviews</a>
          <nav style={{ display: 'flex', gap: '16px', fontSize: '0.9rem' }}>
            <a href='/' style={{ color: '#555', textDecoration: 'none' }}>Home</a>
            <a href='https://ndt-connect.com' target='_blank' rel='noopener' style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>NDT Connect</a>
          </nav>
        </header>
        <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
          {children}
        </main>
        <footer style={{ borderTop: '1px solid #e5e7eb', padding: '32px 24px', marginTop: '48px', textAlign: 'center', color: '#888', fontSize: '0.85rem' }}>
          <p>&copy; 2026 NDT Equipment Reviews. An educational resource by <a href='https://ndt-connect.com' target='_blank' rel='noopener' style={{ color: '#6366f1' }}>NDT Connect</a>.</p>
          <div style={{ marginTop: '12px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href='https://ndt-connect.com/services' target='_blank' rel='noopener' style={{ color: '#666', fontSize: '0.8rem' }}>NDT Services</a>
            <a href='https://ndt-connect.com/industries' target='_blank' rel='noopener' style={{ color: '#666', fontSize: '0.8rem' }}>Industries</a>
            <a href='https://ndt-connect.com/certifications' target='_blank' rel='noopener' style={{ color: '#666', fontSize: '0.8rem' }}>Certifications</a>
            <a href='https://ndt-connect.com/blog' target='_blank' rel='noopener' style={{ color: '#666', fontSize: '0.8rem' }}>NDT Blog</a>
            <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener' style={{ color: '#666', fontSize: '0.8rem' }}>Find Providers</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
