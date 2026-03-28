import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UT Inspection of Forgings',
  description: 'Ultrasonic testing procedures for forged components including straight beam and angle beam techniques per ASTM A388.',
  alternates: { canonical: 'https://ut-testing-academy.vercel.app/ut-for-forgings' },
};

export default function Page() {
  return (
    <div>
      <nav style={{ fontSize: '0.85rem', color: '#888', marginBottom: '24px' }}>
        <a href='/' style={{ color: '#888' }}>Home</a> / <span>UT Inspection of Forgings</span>
      </nav>

      <h1>UT Inspection of Forgings</h1>
      <p style={{ fontSize: '1.05rem', color: '#666' }}>Ultrasonic testing procedures for forged components including straight beam and angle beam techniques per ASTM A388.</p>

      <div style={{ background: '#1e40af08', padding: '16px', borderRadius: '8px', margin: '20px 0', borderLeft: '3px solid #1e40af' }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>Need professional NDT services? <a href='https://ndtconnect.com/find-providers' target='_blank' rel='noopener'>Find certified inspectors on NDT Connect</a> — the #1 NDT marketplace.</p>
      </div>

      <h2>Overview</h2>
      <p>Ultrasonic testing procedures for forged components including straight beam and angle beam techniques per ASTM A388. This is a critical area of knowledge for NDT professionals working across industries including oil and gas, aerospace, power generation, and manufacturing. Learn more about <a href='https://ndtconnect.com/services/tofd-testing' target='_blank' rel='noopener'>TOFD Testing Services</a>. Learn more about <a href='https://ndtconnect.com/blog/ut-vs-rt-comparison' target='_blank' rel='noopener'>UT vs RT Comparison</a>. Learn more about <a href='https://ndtconnect.com/certifications/api-653' target='_blank' rel='noopener'>API 653 Certification</a>.</p>

      <h2>Key Considerations</h2>
      <p>Understanding ut inspection of forgings is essential for maintaining asset integrity and ensuring safety compliance. Professional NDT inspectors rely on established codes, standards, and best practices to deliver reliable results. Whether you are performing inspections in <a href='https://ndtconnect.com/ndt-services/houston' target='_blank' rel='noopener'>Houston</a>, <a href='https://ndtconnect.com/ndt-services/aberdeen' target='_blank' rel='noopener'>Aberdeen</a>, or <a href='https://ndtconnect.com/ndt-services/singapore' target='_blank' rel='noopener'>Singapore</a>, the fundamental principles remain consistent.</p>

      <h2>Industry Applications</h2>
      <p>This topic is particularly relevant for professionals in <a href='https://ndtconnect.com/industries/oil-and-gas' target='_blank' rel='noopener'>oil and gas</a>, <a href='https://ndtconnect.com/industries/aerospace' target='_blank' rel='noopener'>aerospace</a>, and <a href='https://ndtconnect.com/industries/power-generation' target='_blank' rel='noopener'>power generation</a> industries. The demand for qualified NDT technicians continues to grow as aging infrastructure requires more frequent inspection.</p>

      <h2>Professional Development</h2>
      <p>NDT professionals looking to advance their knowledge should consider pursuing relevant <a href='https://ndtconnect.com/certifications' target='_blank' rel='noopener'>NDT certifications</a>. Use the <a href='https://ndtconnect.com/tools/certification-pathway' target='_blank' rel='noopener'>Certification Pathway Planner</a> to find the right path for your career.</p>

      <div style={{ marginTop: '32px', padding: '24px', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0, color: '#1e40af' }}>Related NDT Connect Resources</h3>
        <ul style={{ marginBottom: '16px' }}>
          <li><a href='https://ndtconnect.com/services/tofd-testing' target='_blank' rel='noopener'>TOFD Testing Services</a></li>
          <li><a href='https://ndtconnect.com/blog/ut-vs-rt-comparison' target='_blank' rel='noopener'>UT vs RT Comparison</a></li>
          <li><a href='https://ndtconnect.com/certifications/api-653' target='_blank' rel='noopener'>API 653 Certification</a></li>
          <li><a href='https://ndtconnect.com/services/eddy-current-testing' target='_blank' rel='noopener'>Eddy Current Testing</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/calgary' target='_blank' rel='noopener'>NDT Services in Calgary</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/malaysia' target='_blank' rel='noopener'>NDT Services in Malaysia</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/singapore' target='_blank' rel='noopener'>NDT Services in Singapore</a></li>
          <li><a href='https://ndtconnect.com/services/magnetic-particle-testing' target='_blank' rel='noopener'>Magnetic Particle Testing</a></li>
          <li><a href='https://ndtconnect.com/services/corrosion-mapping' target='_blank' rel='noopener'>Corrosion Mapping Services</a></li>
          <li><a href='https://ndtconnect.com/blog' target='_blank' rel='noopener'>NDT Blog</a></li>
        </ul>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <a href='https://ndtconnect.com/find-providers' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#1e40af', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Find NDT Providers</a>
          <a href='https://ndtconnect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#333', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect</a>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', fontSize: '0.9rem' }}>
        <a href='/ut-data-recording' style={{ color: '#1e40af' }}>&larr; UT Data Recording and Reporting</a>
        <a href='/ut-for-castings' style={{ color: '#1e40af' }}>UT Inspection of Castings &rarr;</a>
      </div>
    </div>
  );
}
