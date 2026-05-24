import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDT Standards Reference - Your Guide to NDT Codes and Standards',
  description: 'Comprehensive reference for NDT codes, standards, and specifications from ASME, ASTM, AWS, ISO, EN, and API.',
  alternates: { canonical: 'https://ndt-standards-reference.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>Your Guide to NDT Codes and Standards</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Comprehensive reference for NDT codes, standards, and specifications from ASME, ASTM, AWS, ISO, EN, and API. Brought to you by <a href='https://ndt-connect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#0f766e10', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #0f766e' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/standards-asme-section-v' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ASME Section V Overview</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to asme section v overview for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/standards-asme-section-viii' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ASME Section VIII NDE</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to asme section viii nde for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/standards-aws-d1-1' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>AWS D1.1 NDE Requirements</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aws d1.1 nde requirements for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/standards-api-510' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>API 510 Standard Overview</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to api 510 standard overview for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/standards-api-570' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>API 570 Standard Overview</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to api 570 standard overview for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/standards-api-653' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>API 653 Standard Overview</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to api 653 standard overview for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/standards-api-579' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>API 579 Fitness-for-Service</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to api 579 fitness-for-service for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/standards-api-580-rbi' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>API 580/581 RBI</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to api 580/581 rbi for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/standards-iso-9712' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ISO 9712 Qualification</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to iso 9712 qualification for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/standards-iso-17636' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ISO 17636 Radiographic Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to iso 17636 radiographic testing for NDT professionals in industrial inspection and asset integrity...</p>
        </a>
        <a href='/standards-iso-17640' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ISO 17640 Ultrasonic Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to iso 17640 ultrasonic testing for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/standards-iso-3452' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ISO 3452 Penetrant Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to iso 3452 penetrant testing for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/standards-iso-9934' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ISO 9934 Magnetic Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to iso 9934 magnetic testing for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/standards-en-13018' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>EN 13018 Visual Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to en 13018 visual testing for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/standards-astm-e165' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ASTM E165 Penetrant Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to astm e165 penetrant testing for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/standards-astm-e709' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ASTM E709 Magnetic Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to astm e709 magnetic testing for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/standards-astm-e2375' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ASTM E2375 Phased Array</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to astm e2375 phased array for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/standards-asnt-snt-tc-1a' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ASNT SNT-TC-1A Overview</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to asnt snt-tc-1a overview for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/standards-asnt-cp-189' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ASNT CP-189 Standard</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to asnt cp-189 standard for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/standards-norsok' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>NORSOK NDT Standards</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to norsok ndt standards for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/standards-dnv-rules' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>DNV Rules for NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to dnv rules for ndt for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/standards-pcc-2' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>API PCC-2 Repairs</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to api pcc-2 repairs for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/standards-api-1104' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>API 1104 Pipeline Welding</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to api 1104 pipeline welding for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/standards-asme-b31-3' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ASME B31.3 NDE</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to asme b31.3 nde for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/standards-asme-b31-4' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ASME B31.4 NDE</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to asme b31.4 nde for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/standards-aws-d1-5' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>AWS D1.5 Bridge Welding</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aws d1.5 bridge welding for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/standards-astm-e1444' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ASTM E1444 Magnetic Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to astm e1444 magnetic testing for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/standards-astm-a388' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ASTM A388 UT of Forgings</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to astm a388 ut of forgings for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/standards-astm-e1932' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>ASTM E1932 Acoustic Emission</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to astm e1932 acoustic emission for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/standards-pcn-scheme' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>PCN Certification Scheme</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pcn certification scheme for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/standards-cswip' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>CSWIP Welding Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to cswip welding inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/standards-nadcap-ac7114' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>Nadcap AC7114 NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to nadcap ac7114 ndt for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/standards-pcc-1' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>API PCC-1 Guidelines</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to api pcc-1 guidelines for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/standards-comparison-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>Standards Comparison Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to standards comparison guide for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/standards-updates-2026' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0f766e', marginTop: 0 }}>NDT Standards Updates 2026</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt standards updates 2026 for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul>
          <li><a href='https://ndt-connect.com/services' target='_blank' rel='noopener'>NDT Services</a></li>
          <li><a href='https://ndt-connect.com' target='_blank' rel='noopener'>NDT Connect</a></li>
          <li><a href='https://ndt-connect.com/blog/weld-inspection-complete-guide' target='_blank' rel='noopener'>Weld Inspection Guide</a></li>
          <li><a href='https://ndt-connect.com/blog/pipeline-inspection-techniques' target='_blank' rel='noopener'>Pipeline Inspection</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/sydney' target='_blank' rel='noopener'>NDT Services in Sydney</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/mumbai' target='_blank' rel='noopener'>NDT Services in Mumbai</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/denver' target='_blank' rel='noopener'>NDT Services in Denver</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/singapore' target='_blank' rel='noopener'>NDT Services in Singapore</a></li>
        </ul>
        <a href='https://ndt-connect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#0f766e', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
