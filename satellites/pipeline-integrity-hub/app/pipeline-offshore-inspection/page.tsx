import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offshore Pipeline Inspection',
  description: 'Comprehensive guide to offshore pipeline inspection for NDT professionals in industrial inspection and asset integrity management.',
  alternates: { canonical: 'https://pipeline-integrity-hub.vercel.app/pipeline-offshore-inspection' },
};

export default function Page() {
  return (
    <div>
      <nav style={{ fontSize: '0.85rem', color: '#888', marginBottom: '24px' }}>
        <a href='/' style={{ color: '#888' }}>Home</a> / <span>Offshore Pipeline Inspection</span>
      </nav>

      <h1>Offshore Pipeline Inspection</h1>
      <p style={{ fontSize: '1.05rem', color: '#666' }}>Comprehensive guide to offshore pipeline inspection for NDT professionals in industrial inspection and asset integrity management.</p>

      <div style={{ background: '#05966908', padding: '16px', borderRadius: '8px', margin: '20px 0', borderLeft: '3px solid #059669' }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>Need professional NDT services? <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener'>Find certified inspectors on NDT Connect</a> — the #1 NDT marketplace.</p>
      </div>

      <h2>Overview</h2>
      <p>Comprehensive guide to offshore pipeline inspection for NDT professionals in industrial inspection and asset integrity management. This is a critical area of knowledge for NDT professionals working across industries including oil and gas, aerospace, power generation, and manufacturing. Learn more about <a href='https://ndt-connect.com/case-studies' target='_blank' rel='noopener'>NDT Case Studies</a>. Learn more about <a href='https://ndt-connect.com/services/penetrant-testing' target='_blank' rel='noopener'>Penetrant Testing Services</a>. Learn more about <a href='https://ndt-connect.com/blog/ultimate-guide-ultrasonic-testing' target='_blank' rel='noopener'>Ultrasonic Testing Guide</a>.</p>

      <h2>Key Considerations</h2>
      <p>Understanding offshore pipeline inspection is essential for maintaining asset integrity and ensuring safety compliance. Professional NDT inspectors rely on established codes, standards, and best practices to deliver reliable results. Whether you are performing inspections in <a href='https://ndt-connect.com/ndt-services/houston' target='_blank' rel='noopener'>Houston</a>, <a href='https://ndt-connect.com/ndt-services/aberdeen' target='_blank' rel='noopener'>Aberdeen</a>, or <a href='https://ndt-connect.com/ndt-services/singapore' target='_blank' rel='noopener'>Singapore</a>, the fundamental principles remain consistent.</p>

      <h2>Industry Applications</h2>
      <p>This topic is particularly relevant for professionals in <a href='https://ndt-connect.com/industries/oil-and-gas' target='_blank' rel='noopener'>oil and gas</a>, <a href='https://ndt-connect.com/industries/aerospace' target='_blank' rel='noopener'>aerospace</a>, and <a href='https://ndt-connect.com/industries/power-generation' target='_blank' rel='noopener'>power generation</a> industries. The demand for qualified NDT technicians continues to grow as aging infrastructure requires more frequent inspection.</p>

      <h2>Professional Development</h2>
      <p>NDT professionals looking to advance their knowledge should consider pursuing relevant <a href='https://ndt-connect.com/certifications' target='_blank' rel='noopener'>NDT certifications</a>. Use the <a href='https://ndt-connect.com/tools/certification-pathway' target='_blank' rel='noopener'>Certification Pathway Planner</a> to find the right path for your career.</p>

      <div style={{ marginTop: '32px', padding: '24px', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0, color: '#059669' }}>Related NDT Connect Resources</h3>
        <ul style={{ marginBottom: '16px' }}>
          <li><a href='https://ndt-connect.com/case-studies' target='_blank' rel='noopener'>NDT Case Studies</a></li>
          <li><a href='https://ndt-connect.com/services/penetrant-testing' target='_blank' rel='noopener'>Penetrant Testing Services</a></li>
          <li><a href='https://ndt-connect.com/blog/ultimate-guide-ultrasonic-testing' target='_blank' rel='noopener'>Ultrasonic Testing Guide</a></li>
          <li><a href='https://ndt-connect.com/services' target='_blank' rel='noopener'>NDT Services</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/london' target='_blank' rel='noopener'>NDT Services in London</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/bahrain' target='_blank' rel='noopener'>NDT Services in Bahrain</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/los-angeles' target='_blank' rel='noopener'>NDT Services in Los Angeles</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/denver' target='_blank' rel='noopener'>NDT Services in Denver</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/new-york' target='_blank' rel='noopener'>NDT Services in New York</a></li>
          <li><a href='https://ndt-connect.com/blog/pipeline-inspection-techniques' target='_blank' rel='noopener'>Pipeline Inspection</a></li>
        </ul>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#059669', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Find NDT Providers</a>
          <a href='https://ndt-connect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#333', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect</a>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', fontSize: '0.9rem' }}>
        <a href='/pipeline-construction-inspection' style={{ color: '#059669' }}>&larr; Construction Inspection</a>
        <a href='/pipeline-seam-weld-assessment' style={{ color: '#059669' }}>Seam Weld Assessment &rarr;</a>
      </div>
    </div>
  );
}
