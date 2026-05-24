import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tank Inspection Guide - Above Ground Storage Tank Inspection Resource',
  description: 'Complete resource for above ground storage tank inspection covering API 653 requirements, floor scanning, shell inspection, and integrity assessment.',
  alternates: { canonical: 'https://tank-inspection-guide.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>Above Ground Storage Tank Inspection Resource</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Complete resource for above ground storage tank inspection covering API 653 requirements, floor scanning, shell inspection, and integrity assessment. Brought to you by <a href='https://ndt-connect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#0d948810', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #0d9488' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/tank-inspection-basics' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Inspection Fundamentals</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank inspection fundamentals for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/tank-api-653-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>API 653 Inspection Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to api 653 inspection guide for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/tank-floor-scanning' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Floor Scanning</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank floor scanning for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/tank-shell-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Shell Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank shell inspection for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/tank-roof-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Roof Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank roof inspection for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/tank-foundation-assessment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Foundation Assessment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank foundation assessment for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/tank-corrosion-assessment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Corrosion Assessment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank corrosion assessment for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/tank-weld-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank weld inspection for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/tank-fitness-for-service' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Fitness-for-Service</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank fitness-for-service for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/tank-repair-methods' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Repair Methods</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank repair methods for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/tank-reconstruction' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Reconstruction Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank reconstruction guide for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/tank-inspection-intervals' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Inspection Intervals</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank inspection intervals for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/tank-internal-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Internal Tank Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to internal tank inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/tank-external-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>External Tank Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to external tank inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/tank-bottom-corrosion' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Bottom Corrosion</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank bottom corrosion for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/tank-cathodic-protection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Cathodic Protection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank cathodic protection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/tank-secondary-containment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Secondary Containment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to secondary containment for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/tank-coating-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Coating Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank coating inspection for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/tank-vacuum-box-testing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Vacuum Box Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to vacuum box testing for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/tank-acoustic-emission' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>AE Testing for Tanks</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ae testing for tanks for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/tank-leak-detection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Leak Detection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank leak detection for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/tank-settlement-monitoring' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Settlement Monitoring</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to settlement monitoring for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/tank-seismic-assessment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Seismic Assessment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to seismic assessment for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/tank-floating-roof' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Floating Roof Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to floating roof inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/tank-venting-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Venting System Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to venting system inspection for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/tank-appurtenance-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Appurtenance Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to appurtenance inspection for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/tank-insulated-tanks' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Insulated Tank Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to insulated tank inspection for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/tank-hot-product' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Hot Product Tanks</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to hot product tanks for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/tank-robotic-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Robotic Tank Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to robotic tank inspection for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/tank-data-management' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Data Management</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank data management for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/tank-regulatory-requirements' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Regulatory Requirements</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to regulatory requirements for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/tank-rbi' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Risk-Based Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to risk-based inspection for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/tank-decommissioning' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Decommissioning</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank decommissioning for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/tank-new-construction' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>New Tank Construction</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to new tank construction for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/tank-inspector-career' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0d9488', marginTop: 0 }}>Tank Inspector Career</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank inspector career for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul data-section='cornerstone-links'>
          <li><a href='https://ndt-connect.com/pillars/tank-inspection-pillar' target='_blank' rel='noopener'>API 653 Tank Inspection Guide</a></li>
          <li><a href='https://ndt-connect.com/certifications/api-653' target='_blank' rel='noopener'>API 653 Inspector Certification</a></li>
        </ul>
        <ul>
          <li><a href='https://ndt-connect.com/blog/ndt-digital-twins-guide' target='_blank' rel='noopener'>NDT Digital Twins</a></li>
          <li><a href='https://ndt-connect.com/services/phased-array-ut' target='_blank' rel='noopener'>Phased Array UT Services</a></li>
          <li><a href='https://ndt-connect.com/blog/ndt-career-guide-2026' target='_blank' rel='noopener'>NDT Career Guide</a></li>
          <li><a href='https://ndt-connect.com/contact' target='_blank' rel='noopener'>Contact NDT Connect</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/chicago' target='_blank' rel='noopener'>NDT Services in Chicago</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/sydney' target='_blank' rel='noopener'>NDT Services in Sydney</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/new-orleans' target='_blank' rel='noopener'>NDT Services in New Orleans</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/brazil' target='_blank' rel='noopener'>NDT Services in Brazil</a></li>
        </ul>
        <a href='https://ndt-connect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#0d9488', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
