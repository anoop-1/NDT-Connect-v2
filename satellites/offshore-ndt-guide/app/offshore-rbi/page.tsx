import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offshore Risk-Based Inspection',
  description: 'Comprehensive guide to offshore risk-based inspection for NDT professionals in industrial inspection and asset integrity management.',
  alternates: { canonical: 'https://offshore-ndt-guide.vercel.app/offshore-rbi' },
};

export default function Page() {
  return (
    <div>
      <nav style={{ fontSize: '0.85rem', color: '#888', marginBottom: '24px' }}>
        <a href='/' style={{ color: '#888' }}>Home</a> / <span>Offshore Risk-Based Inspection</span>
      </nav>

      <h1>Offshore Risk-Based Inspection</h1>
      <p style={{ fontSize: '1.05rem', color: '#666' }}>Comprehensive guide to offshore risk-based inspection for NDT professionals in industrial inspection and asset integrity management.</p>

      <div style={{ background: '#0284c708', padding: '16px', borderRadius: '8px', margin: '20px 0', borderLeft: '3px solid #0284c7' }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>Need professional NDT services? <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener'>Find certified inspectors on NDT Connect</a> — the #1 NDT marketplace.</p>
      </div>

      <h2>Overview</h2>
      <p>Comprehensive guide to offshore risk-based inspection for NDT professionals in industrial inspection and asset integrity management. This is a critical area of knowledge for NDT professionals working across industries including oil and gas, aerospace, power generation, and manufacturing. Learn more about <a href='https://ndt-connect.com/tools/certification-pathway' target='_blank' rel='noopener'>Certification Pathway Planner</a>. Learn more about <a href='https://ndt-connect.com/industries/power-generation' target='_blank' rel='noopener'>Power Generation NDT</a>. Learn more about <a href='https://ndt-connect.com/certifications/asnt-certification' target='_blank' rel='noopener'>ASNT Certification</a>.</p>

      <h2>Key Considerations</h2>
      <p>Understanding offshore risk-based inspection is essential for maintaining asset integrity and ensuring safety compliance. Professional NDT inspectors rely on established codes, standards, and best practices to deliver reliable results. Whether you are performing inspections in <a href='https://ndt-connect.com/ndt-services/houston' target='_blank' rel='noopener'>Houston</a>, <a href='https://ndt-connect.com/ndt-services/aberdeen' target='_blank' rel='noopener'>Aberdeen</a>, or <a href='https://ndt-connect.com/ndt-services/singapore' target='_blank' rel='noopener'>Singapore</a>, the fundamental principles remain consistent.</p>

      <h2>Industry Applications</h2>
      <p>This topic is particularly relevant for professionals in <a href='https://ndt-connect.com/industries/oil-and-gas' target='_blank' rel='noopener'>oil and gas</a>, <a href='https://ndt-connect.com/industries/aerospace' target='_blank' rel='noopener'>aerospace</a>, and <a href='https://ndt-connect.com/industries/power-generation' target='_blank' rel='noopener'>power generation</a> industries. The demand for qualified NDT technicians continues to grow as aging infrastructure requires more frequent inspection.</p>

      <h2>Professional Development</h2>
      <p>NDT professionals looking to advance their knowledge should consider pursuing relevant <a href='https://ndt-connect.com/certifications' target='_blank' rel='noopener'>NDT certifications</a>. Use the <a href='https://ndt-connect.com/tools/certification-pathway' target='_blank' rel='noopener'>Certification Pathway Planner</a> to find the right path for your career.</p>

      <div style={{ marginTop: '32px', padding: '24px', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0, color: '#0284c7' }}>Related NDT Connect Resources</h3>
        <ul style={{ marginBottom: '16px' }}>
          <li><a href='https://ndt-connect.com/tools/certification-pathway' target='_blank' rel='noopener'>Certification Pathway Planner</a></li>
          <li><a href='https://ndt-connect.com/industries/power-generation' target='_blank' rel='noopener'>Power Generation NDT</a></li>
          <li><a href='https://ndt-connect.com/certifications/asnt-certification' target='_blank' rel='noopener'>ASNT Certification</a></li>
          <li><a href='https://ndt-connect.com/services/magnetic-particle-testing' target='_blank' rel='noopener'>Magnetic Particle Testing</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/new-york' target='_blank' rel='noopener'>NDT Services in New York</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/saudi-arabia' target='_blank' rel='noopener'>NDT Services in Saudi Arabia</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/bahrain' target='_blank' rel='noopener'>NDT Services in Bahrain</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/brazil' target='_blank' rel='noopener'>NDT Services in Brazil</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/new-orleans' target='_blank' rel='noopener'>NDT Services in New Orleans</a></li>
          <li><a href='https://ndt-connect.com/services/phased-array-ut' target='_blank' rel='noopener'>Phased Array UT Services</a></li>
        </ul>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#0284c7', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Find NDT Providers</a>
          <a href='https://ndt-connect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#333', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect</a>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', fontSize: '0.9rem' }}>
        <a href='/offshore-cp-surveys' style={{ color: '#0284c7' }}>&larr; Offshore CP Assessment</a>
        <a href='/offshore-crane-inspection' style={{ color: '#0284c7' }}>Offshore Crane Inspection &rarr;</a>
      </div>
    </div>
  );
}
