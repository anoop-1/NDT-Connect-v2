import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aerospace NDT Center - NDT Excellence for Aerospace and Aviation',
  description: 'Specialized aerospace NDT resource covering aircraft inspection methods, composite testing, engine component examination, and aviation regulations.',
  alternates: { canonical: 'https://aerospace-ndt-center.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>NDT Excellence for Aerospace and Aviation</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Specialized aerospace NDT resource covering aircraft inspection methods, composite testing, engine component examination, and aviation regulations. Brought to you by <a href='https://ndtconnect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#4f46e510', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #4f46e5' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndtconnect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/aerospace-ndt-overview' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Aerospace NDT Overview</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aerospace ndt overview for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/aerospace-ut-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Aircraft Ultrasonic Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aircraft ultrasonic inspection for NDT professionals in industrial inspection and asset integrity...</p>
        </a>
        <a href='/aerospace-composite-ndt' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Composite Material NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to composite material ndt for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/aerospace-eddy-current' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Eddy Current in Aerospace</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to eddy current in aerospace for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/aerospace-rt-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Aircraft Radiographic Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aircraft radiographic inspection for NDT professionals in industrial inspection and asset integri...</p>
        </a>
        <a href='/aerospace-engine-ndt' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Engine Component NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to engine component ndt for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/aerospace-pt-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Aerospace Penetrant Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aerospace penetrant testing for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/aerospace-mt-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Aerospace Magnetic Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aerospace magnetic testing for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/aerospace-thermography' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Thermography in Aerospace</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to thermography in aerospace for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/aerospace-shearography' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Shearography Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to shearography inspection for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/aerospace-acoustic-emission' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Acoustic Emission Aircraft</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to acoustic emission aircraft for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/aerospace-bond-testing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Adhesive Bond Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to adhesive bond testing for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/aerospace-landing-gear' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Landing Gear Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to landing gear inspection for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/aerospace-corrosion-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Aircraft Corrosion Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aircraft corrosion inspection for NDT professionals in industrial inspection and asset integrity ...</p>
        </a>
        <a href='/aerospace-codes-standards' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Aerospace NDT Standards</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aerospace ndt standards for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/aerospace-nas-410' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>NAS 410 Qualification Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to nas 410 qualification guide for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/aerospace-fatigue-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Aircraft Fatigue Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aircraft fatigue inspection for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/aerospace-helicopter-ndt' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Helicopter Component NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to helicopter component ndt for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/aerospace-welding-ndt' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Aerospace Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aerospace weld inspection for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/aerospace-additive-manufacturing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Additive Manufacturing NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to additive manufacturing ndt for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/aerospace-ct-scanning' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>CT Scanning Aerospace</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ct scanning aerospace for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/aerospace-health-monitoring' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Structural Health Monitoring</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to structural health monitoring for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/aerospace-maintenance-ndt' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>NDT in Aircraft Maintenance</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt in aircraft maintenance for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/aerospace-material-testing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Aerospace Material Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aerospace material testing for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/aerospace-tube-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Aircraft Tube Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aircraft tube inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/aerospace-fastener-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Fastener Hole Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to fastener hole inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/aerospace-space-vehicle' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Space Vehicle NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to space vehicle ndt for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/aerospace-digital-ndt' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Digital NDT Aerospace</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to digital ndt aerospace for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/aerospace-window-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Aircraft Window Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aircraft window inspection for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/aerospace-turbine-blade' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Turbine Blade NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to turbine blade ndt for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/aerospace-supplier-ndt' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Supplier NDT Requirements</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to supplier ndt requirements for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/aerospace-nadcap' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Nadcap Accreditation Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to nadcap accreditation guide for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/aerospace-automated-ndt' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Automated NDT Aerospace</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to automated ndt aerospace for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/aerospace-training-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Aerospace NDT Training</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aerospace ndt training for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/aerospace-ndt-future' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#4f46e5', marginTop: 0 }}>Future Aerospace NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to future aerospace ndt for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul>
          <li><a href='https://ndtconnect.com/blog/ultimate-guide-ultrasonic-testing' target='_blank' rel='noopener'>Ultrasonic Testing Guide</a></li>
          <li><a href='https://ndtconnect.com/services/phased-array-ut' target='_blank' rel='noopener'>Phased Array UT Services</a></li>
          <li><a href='https://ndtconnect.com/services/ultrasonic-testing' target='_blank' rel='noopener'>Ultrasonic Testing Services</a></li>
          <li><a href='https://ndtconnect.com/blog/ndt-digital-twins-guide' target='_blank' rel='noopener'>NDT Digital Twins</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/trinidad' target='_blank' rel='noopener'>NDT Services in Trinidad</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/sydney' target='_blank' rel='noopener'>NDT Services in Sydney</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/denver' target='_blank' rel='noopener'>NDT Services in Denver</a></li>
          <li><a href='https://ndtconnect.com/services/penetrant-testing' target='_blank' rel='noopener'>Penetrant Testing Services</a></li>
        </ul>
        <a href='https://ndtconnect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#4f46e5', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
