import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pipeline Integrity Hub - Pipeline Inspection and Integrity Management',
  description: 'Comprehensive resource for pipeline integrity management, in-line inspection, corrosion control, and regulatory compliance.',
  alternates: { canonical: 'https://pipeline-integrity-hub.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>Pipeline Inspection and Integrity Management</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Comprehensive resource for pipeline integrity management, in-line inspection, corrosion control, and regulatory compliance. Brought to you by <a href='https://ndtconnect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#05966910', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #059669' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndtconnect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/pipeline-integrity-basics' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pipeline Integrity Fundamentals</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline integrity fundamentals for NDT professionals in industrial inspection and asset integrit...</p>
        </a>
        <a href='/pipeline-inline-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>In-Line Inspection Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to in-line inspection guide for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/pipeline-corrosion-management' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pipeline Corrosion Management</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline corrosion management for NDT professionals in industrial inspection and asset integrity ...</p>
        </a>
        <a href='/pipeline-codes-standards' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pipeline Codes and Standards</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline codes and standards for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/pipeline-risk-assessment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pipeline Risk Assessment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline risk assessment for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/pipeline-direct-assessment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pipeline Direct Assessment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline direct assessment for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/pipeline-hydrostatic-testing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Hydrostatic Testing Procedures</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to hydrostatic testing procedures for NDT professionals in industrial inspection and asset integrity...</p>
        </a>
        <a href='/pipeline-repair-methods' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pipeline Repair Methods</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline repair methods for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/pipeline-cathodic-protection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pipeline Cathodic Protection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline cathodic protection for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/pipeline-coating-systems' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pipeline Coating Systems</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline coating systems for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/pipeline-girth-weld-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Girth Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to girth weld inspection for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/pipeline-stress-corrosion' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Stress Corrosion Cracking</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to stress corrosion cracking for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/pipeline-dent-assessment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Dent and Mechanical Damage</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to dent and mechanical damage for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/pipeline-fitness-for-service' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pipeline Fitness for Service</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline fitness for service for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/pipeline-leak-detection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pipeline Leak Detection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline leak detection for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/pipeline-pigging-operations' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pigging Operations Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pigging operations guide for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/pipeline-mfl-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>MFL Pipeline Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to mfl pipeline inspection for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/pipeline-ut-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>UT Pipeline Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ut pipeline inspection for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/pipeline-geometry-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Geometry Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to geometry inspection for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/pipeline-regulations' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pipeline Safety Regulations</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline safety regulations for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/pipeline-integrity-planning' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Integrity Management Planning</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to integrity management planning for NDT professionals in industrial inspection and asset integrity ...</p>
        </a>
        <a href='/pipeline-data-management' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pipeline Data Management</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline data management for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/pipeline-remaining-life' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Remaining Life Assessment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to remaining life assessment for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/pipeline-scc-management' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>SCC Management</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to scc management for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/pipeline-cp-surveys' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>CP Survey Methods</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to cp survey methods for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/pipeline-anomaly-assessment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Anomaly Assessment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to anomaly assessment for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/pipeline-construction-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Construction Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to construction inspection for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/pipeline-offshore-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Offshore Pipeline Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore pipeline inspection for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/pipeline-seam-weld-assessment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Seam Weld Assessment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to seam weld assessment for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/pipeline-third-party-damage' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Third Party Damage Prevention</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to third party damage prevention for NDT professionals in industrial inspection and asset integrity ...</p>
        </a>
        <a href='/pipeline-class-location' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Class Location Changes</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to class location changes for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/pipeline-digital-twins' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pipeline Digital Twins</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline digital twins for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/pipeline-robotic-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Robotic Pipeline Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to robotic pipeline inspection for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/pipeline-ai-analytics' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>AI in Pipeline Integrity</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ai in pipeline integrity for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/pipeline-career-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>Pipeline Career Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline career guide for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul>
          <li><a href='https://ndtconnect.com/tools/certification-pathway' target='_blank' rel='noopener'>Certification Pathway Planner</a></li>
          <li><a href='https://ndtconnect.com/industries/marine-and-offshore' target='_blank' rel='noopener'>Marine & Offshore NDT</a></li>
          <li><a href='https://ndtconnect.com/blog/ultimate-guide-ultrasonic-testing' target='_blank' rel='noopener'>Ultrasonic Testing Guide</a></li>
          <li><a href='https://ndtconnect.com/industries/mining' target='_blank' rel='noopener'>Mining NDT</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/malaysia' target='_blank' rel='noopener'>NDT Services in Malaysia</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/sydney' target='_blank' rel='noopener'>NDT Services in Sydney</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/trinidad' target='_blank' rel='noopener'>NDT Services in Trinidad</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/london' target='_blank' rel='noopener'>NDT Services in London</a></li>
        </ul>
        <a href='https://ndtconnect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#059669', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
