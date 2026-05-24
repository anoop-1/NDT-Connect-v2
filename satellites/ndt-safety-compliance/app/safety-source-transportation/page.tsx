import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Radioactive Source Transport',
  description: 'Comprehensive guide to radioactive source transport for NDT professionals in industrial inspection and asset integrity management.',
  alternates: { canonical: 'https://ndt-safety-compliance.vercel.app/safety-source-transportation' },
};

export default function Page() {
  return (
    <div>
      <nav style={{ fontSize: '0.85rem', color: '#888', marginBottom: '24px' }}>
        <a href='/' style={{ color: '#888' }}>Home</a> / <span>Radioactive Source Transport</span>
      </nav>

      <h1>Radioactive Source Transport</h1>
      <p style={{ fontSize: '1.05rem', color: '#666' }}>Comprehensive guide to radioactive source transport for NDT professionals in industrial inspection and asset integrity management.</p>

      <div style={{ background: '#ea580c08', padding: '16px', borderRadius: '8px', margin: '20px 0', borderLeft: '3px solid #ea580c' }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>Need professional NDT services? <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener'>Find certified inspectors on NDT Connect</a> — the #1 NDT marketplace.</p>
      </div>

      <h2>Overview</h2>
      <p>Comprehensive guide to radioactive source transport for NDT professionals in industrial inspection and asset integrity management. This is a critical area of knowledge for NDT professionals working across industries including oil and gas, aerospace, power generation, and manufacturing. Learn more about <a href='https://ndt-connect.com/blog/ultimate-guide-ultrasonic-testing' target='_blank' rel='noopener'>Ultrasonic Testing Guide</a>. Learn more about <a href='https://ndt-connect.com/certifications' target='_blank' rel='noopener'>NDT Certifications</a>. Learn more about <a href='https://ndt-connect.com/services/magnetic-flux-leakage' target='_blank' rel='noopener'>Magnetic Flux Leakage Testing</a>.</p>

      <h2>Key Considerations</h2>
      <p>Understanding radioactive source transport is essential for maintaining asset integrity and ensuring safety compliance. Professional NDT inspectors rely on established codes, standards, and best practices to deliver reliable results. Whether you are performing inspections in <a href='https://ndt-connect.com/ndt-services/houston' target='_blank' rel='noopener'>Houston</a>, <a href='https://ndt-connect.com/ndt-services/aberdeen' target='_blank' rel='noopener'>Aberdeen</a>, or <a href='https://ndt-connect.com/ndt-services/singapore' target='_blank' rel='noopener'>Singapore</a>, the fundamental principles remain consistent.</p>

      <h2>Industry Applications</h2>
      <p>This topic is particularly relevant for professionals in <a href='https://ndt-connect.com/industries/oil-and-gas' target='_blank' rel='noopener'>oil and gas</a>, <a href='https://ndt-connect.com/industries/aerospace' target='_blank' rel='noopener'>aerospace</a>, and <a href='https://ndt-connect.com/industries/power-generation' target='_blank' rel='noopener'>power generation</a> industries. The demand for qualified NDT technicians continues to grow as aging infrastructure requires more frequent inspection.</p>

      <h2>Professional Development</h2>
      <p>NDT professionals looking to advance their knowledge should consider pursuing relevant <a href='https://ndt-connect.com/certifications' target='_blank' rel='noopener'>NDT certifications</a>. Use the <a href='https://ndt-connect.com/tools/certification-pathway' target='_blank' rel='noopener'>Certification Pathway Planner</a> to find the right path for your career.</p>

      <div style={{ marginTop: '32px', padding: '24px', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0, color: '#ea580c' }}>Related NDT Connect Resources</h3>
        <ul style={{ marginBottom: '16px' }}>
          <li><a href='https://ndt-connect.com/blog/ultimate-guide-ultrasonic-testing' target='_blank' rel='noopener'>Ultrasonic Testing Guide</a></li>
          <li><a href='https://ndt-connect.com/certifications' target='_blank' rel='noopener'>NDT Certifications</a></li>
          <li><a href='https://ndt-connect.com/services/magnetic-flux-leakage' target='_blank' rel='noopener'>Magnetic Flux Leakage Testing</a></li>
          <li><a href='https://ndt-connect.com/industries/aerospace' target='_blank' rel='noopener'>Aerospace NDT</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/malaysia' target='_blank' rel='noopener'>NDT Services in Malaysia</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/brazil' target='_blank' rel='noopener'>NDT Services in Brazil</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/saudi-arabia' target='_blank' rel='noopener'>NDT Services in Saudi Arabia</a></li>
          <li><a href='https://ndt-connect.com/blog/ndt-career-guide-2026' target='_blank' rel='noopener'>NDT Career Guide</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/mumbai' target='_blank' rel='noopener'>NDT Services in Mumbai</a></li>
          <li><a href='https://ndt-connect.com/services/radiographic-testing' target='_blank' rel='noopener'>Radiographic Testing Services</a></li>
        </ul>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#ea580c', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Find NDT Providers</a>
          <a href='https://ndt-connect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#333', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect</a>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', fontSize: '0.9rem' }}>
        <a href='/safety-hot-work' style={{ color: '#ea580c' }}>&larr; Hot Work and NDT Safety</a>
        <a href='/safety-emergency-procedures' style={{ color: '#ea580c' }}>RT Emergency Procedures &rarr;</a>
      </div>
    </div>
  );
}
