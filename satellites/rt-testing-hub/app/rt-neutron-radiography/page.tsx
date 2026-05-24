import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Neutron Radiography Applications',
  description: 'Introduction to neutron radiography, its unique capabilities, and specialized industrial applications.',
  alternates: { canonical: 'https://rt-testing-hub.vercel.app/rt-neutron-radiography' },
};

export default function Page() {
  return (
    <div>
      <nav style={{ fontSize: '0.85rem', color: '#888', marginBottom: '24px' }}>
        <a href='/' style={{ color: '#888' }}>Home</a> / <span>Neutron Radiography Applications</span>
      </nav>

      <h1>Neutron Radiography Applications</h1>
      <p style={{ fontSize: '1.05rem', color: '#666' }}>Introduction to neutron radiography, its unique capabilities, and specialized industrial applications.</p>

      <div style={{ background: '#dc262608', padding: '16px', borderRadius: '8px', margin: '20px 0', borderLeft: '3px solid #dc2626' }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>Need professional NDT services? <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener'>Find certified inspectors on NDT Connect</a> — the #1 NDT marketplace.</p>
      </div>

      <h2>Overview</h2>
      <p>Introduction to neutron radiography, its unique capabilities, and specialized industrial applications. This is a critical area of knowledge for NDT professionals working across industries including oil and gas, aerospace, power generation, and manufacturing. Learn more about <a href='https://ndt-connect.com' target='_blank' rel='noopener'>NDT Connect</a>. Learn more about <a href='https://ndt-connect.com/services/acoustic-emission-testing' target='_blank' rel='noopener'>Acoustic Emission Testing</a>. Learn more about <a href='https://ndt-connect.com/blog/corrosion-under-insulation-guide' target='_blank' rel='noopener'>CUI Guide</a>.</p>

      <h2>Key Considerations</h2>
      <p>Understanding neutron radiography applications is essential for maintaining asset integrity and ensuring safety compliance. Professional NDT inspectors rely on established codes, standards, and best practices to deliver reliable results. Whether you are performing inspections in <a href='https://ndt-connect.com/ndt-services/houston' target='_blank' rel='noopener'>Houston</a>, <a href='https://ndt-connect.com/ndt-services/aberdeen' target='_blank' rel='noopener'>Aberdeen</a>, or <a href='https://ndt-connect.com/ndt-services/singapore' target='_blank' rel='noopener'>Singapore</a>, the fundamental principles remain consistent.</p>

      <h2>Industry Applications</h2>
      <p>This topic is particularly relevant for professionals in <a href='https://ndt-connect.com/industries/oil-and-gas' target='_blank' rel='noopener'>oil and gas</a>, <a href='https://ndt-connect.com/industries/aerospace' target='_blank' rel='noopener'>aerospace</a>, and <a href='https://ndt-connect.com/industries/power-generation' target='_blank' rel='noopener'>power generation</a> industries. The demand for qualified NDT technicians continues to grow as aging infrastructure requires more frequent inspection.</p>

      <h2>Professional Development</h2>
      <p>NDT professionals looking to advance their knowledge should consider pursuing relevant <a href='https://ndt-connect.com/certifications' target='_blank' rel='noopener'>NDT certifications</a>. Use the <a href='https://ndt-connect.com/tools/certification-pathway' target='_blank' rel='noopener'>Certification Pathway Planner</a> to find the right path for your career.</p>

      <div style={{ marginTop: '32px', padding: '24px', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0, color: '#dc2626' }}>Related NDT Connect Resources</h3>
        <ul style={{ marginBottom: '16px' }}>
          <li><a href='https://ndt-connect.com' target='_blank' rel='noopener'>NDT Connect</a></li>
          <li><a href='https://ndt-connect.com/services/acoustic-emission-testing' target='_blank' rel='noopener'>Acoustic Emission Testing</a></li>
          <li><a href='https://ndt-connect.com/blog/corrosion-under-insulation-guide' target='_blank' rel='noopener'>CUI Guide</a></li>
          <li><a href='https://ndt-connect.com/industries' target='_blank' rel='noopener'>NDT Industries</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/dallas' target='_blank' rel='noopener'>NDT Services in Dallas</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/perth' target='_blank' rel='noopener'>NDT Services in Perth</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/bahrain' target='_blank' rel='noopener'>NDT Services in Bahrain</a></li>
          <li><a href='https://ndt-connect.com/industries/construction' target='_blank' rel='noopener'>Construction NDT</a></li>
          <li><a href='https://ndt-connect.com/blog/ndt-industry-statistics' target='_blank' rel='noopener'>NDT Industry Statistics</a></li>
          <li><a href='https://ndt-connect.com/services/eddy-current-testing' target='_blank' rel='noopener'>Eddy Current Testing</a></li>
        </ul>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#dc2626', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Find NDT Providers</a>
          <a href='https://ndt-connect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#333', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect</a>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', fontSize: '0.9rem' }}>
        <a href='/rt-future-technology' style={{ color: '#dc2626' }}>&larr; Future of Radiographic Testing</a>
        <span></span>
      </div>
    </div>
  );
}
