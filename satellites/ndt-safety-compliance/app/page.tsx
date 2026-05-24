import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDT Safety and Compliance Hub - Safety and Regulatory Compliance for NDT Operations',
  description: 'Resource for NDT safety procedures, regulatory compliance, radiation safety, and occupational health in inspection operations.',
  alternates: { canonical: 'https://ndt-safety-compliance.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>Safety and Regulatory Compliance for NDT Operations</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Resource for NDT safety procedures, regulatory compliance, radiation safety, and occupational health in inspection operations. Brought to you by <a href='https://ndt-connect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#ea580c10', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #ea580c' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/safety-overview' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>NDT Safety Fundamentals</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt safety fundamentals for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/safety-radiation-basics' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Radiation Safety Basics</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to radiation safety basics for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/safety-alara-principles' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>ALARA Principles in RT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to alara principles in rt for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/safety-protection-equipment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Radiation Protection Equipment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to radiation protection equipment for NDT professionals in industrial inspection and asset integrity...</p>
        </a>
        <a href='/safety-exclusion-zones' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>RT Exclusion Zone Setup</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to rt exclusion zone setup for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/safety-radiation-monitoring' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Radiation Monitoring Programs</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to radiation monitoring programs for NDT professionals in industrial inspection and asset integrity ...</p>
        </a>
        <a href='/safety-rt-licensing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>RT Licensing Requirements</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to rt licensing requirements for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/safety-confined-space' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Confined Space NDT Safety</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to confined space ndt safety for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/safety-working-at-height' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Working at Height NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to working at height ndt for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/safety-offshore-safety' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Offshore NDT Safety</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore ndt safety for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/safety-electrical-safety' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Electrical Safety in NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to electrical safety in ndt for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/safety-chemical-safety' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Chemical Safety PT/MT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to chemical safety pt/mt for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/safety-noise-exposure' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Noise Exposure in NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to noise exposure in ndt for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/safety-uv-safety' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>UV Radiation Safety</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to uv radiation safety for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/safety-hot-work' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Hot Work and NDT Safety</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to hot work and ndt safety for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/safety-source-transportation' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Radioactive Source Transport</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to radioactive source transport for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/safety-emergency-procedures' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>RT Emergency Procedures</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to rt emergency procedures for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/safety-quality-systems' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>NDT Quality Systems</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt quality systems for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/safety-procedure-writing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>NDT Procedure Writing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt procedure writing for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/safety-audit-preparation' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>NDT Audit Preparation</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt audit preparation for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/safety-osha-requirements' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>OSHA Requirements</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to osha requirements for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/safety-nrc-regulations' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>NRC Regulations</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to nrc regulations for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/safety-state-regulations' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>State RT Regulations</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to state rt regulations for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/safety-international-regulations' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>International RT Regulations</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to international rt regulations for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/safety-incident-reporting' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>NDT Incident Reporting</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt incident reporting for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/safety-ergonomics' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Ergonomics in NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ergonomics in ndt for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/safety-heat-stress' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Heat Stress in NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to heat stress in ndt for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/safety-cold-weather' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Cold Weather NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to cold weather ndt for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/safety-ppe-requirements' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>PPE Requirements</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ppe requirements for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/safety-toolbox-talks' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Safety Toolbox Talks</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to safety toolbox talks for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/safety-risk-assessment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Risk Assessment for NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to risk assessment for ndt for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/safety-environmental-compliance' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Environmental Compliance</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to environmental compliance for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/safety-lifting-equipment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Lifting Equipment Safety</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to lifting equipment safety for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/safety-training-safety' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>NDT Safety Training</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt safety training for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/safety-safety-culture' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ea580c', marginTop: 0 }}>Building Safety Culture</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to building safety culture for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul>
          <li><a href='https://ndt-connect.com/blog/pipeline-inspection-techniques' target='_blank' rel='noopener'>Pipeline Inspection</a></li>
          <li><a href='https://ndt-connect.com/blog/ultimate-guide-ultrasonic-testing' target='_blank' rel='noopener'>Ultrasonic Testing Guide</a></li>
          <li><a href='https://ndt-connect.com/blog/corrosion-under-insulation-guide' target='_blank' rel='noopener'>CUI Guide</a></li>
          <li><a href='https://ndt-connect.com/industries/aerospace' target='_blank' rel='noopener'>Aerospace NDT</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/aberdeen' target='_blank' rel='noopener'>NDT Services in Aberdeen</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/new-orleans' target='_blank' rel='noopener'>NDT Services in New Orleans</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/new-york' target='_blank' rel='noopener'>NDT Services in New York</a></li>
          <li><a href='https://ndt-connect.com/services/acoustic-emission-testing' target='_blank' rel='noopener'>Acoustic Emission Testing</a></li>
        </ul>
        <a href='https://ndt-connect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#ea580c', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
