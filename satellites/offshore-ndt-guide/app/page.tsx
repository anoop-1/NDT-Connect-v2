import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offshore NDT Guide - NDT for Offshore and Marine Structures',
  description: 'Specialized resource for non-destructive testing of offshore platforms, subsea equipment, marine vessels, and floating structures.',
  alternates: { canonical: 'https://offshore-ndt-guide.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>NDT for Offshore and Marine Structures</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Specialized resource for non-destructive testing of offshore platforms, subsea equipment, marine vessels, and floating structures. Brought to you by <a href='https://ndt-connect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#0284c710', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #0284c7' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/offshore-ndt-overview' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Offshore NDT Overview</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore ndt overview for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/offshore-ut-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Offshore UT Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore ut inspection for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/offshore-subsea-methods' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Subsea Inspection Methods</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to subsea inspection methods for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/offshore-fpso-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>FPSO Inspection Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to fpso inspection guide for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/offshore-weld-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Offshore Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore weld inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/offshore-underwater-ndt' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Underwater NDT Methods</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to underwater ndt methods for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/offshore-coating-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Marine Coating Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to marine coating inspection for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/offshore-corrosion-assessment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Offshore Corrosion Assessment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore corrosion assessment for NDT professionals in industrial inspection and asset integrity ...</p>
        </a>
        <a href='/offshore-mooring-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Mooring Chain Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to mooring chain inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/offshore-fatigue-assessment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Offshore Fatigue Assessment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore fatigue assessment for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/offshore-rov-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>ROV-Based NDT Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to rov-based ndt inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/offshore-cp-surveys' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Offshore CP Assessment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore cp assessment for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/offshore-rbi' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Offshore Risk-Based Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore risk-based inspection for NDT professionals in industrial inspection and asset integrity...</p>
        </a>
        <a href='/offshore-crane-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Offshore Crane Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore crane inspection for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/offshore-pipeline-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Offshore Pipeline Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore pipeline inspection for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/offshore-jacket-structure' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Jacket Structure Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to jacket structure inspection for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/offshore-lifting-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Lifting Equipment NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to lifting equipment ndt for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/offshore-pressure-systems' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Offshore Pressure Systems</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore pressure systems for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/offshore-riser-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Riser Inspection Methods</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to riser inspection methods for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/offshore-flare-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Flare Structure Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to flare structure inspection for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/offshore-gom-requirements' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Gulf of Mexico Requirements</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to gulf of mexico requirements for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/offshore-north-sea-standards' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>North Sea Standards</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to north sea standards for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/offshore-decommissioning' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Decommissioning NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to decommissioning ndt for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/offshore-drone-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Drone Inspection Offshore</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to drone inspection offshore for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/offshore-mpi-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Offshore MPI Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore mpi testing for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/offshore-acfm-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>ACFM Offshore Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to acfm offshore inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/offshore-eddy-current' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Offshore Eddy Current</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore eddy current for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/offshore-phased-array' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Phased Array UT Offshore</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to phased array ut offshore for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/offshore-tofd' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>TOFD for Offshore Welds</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tofd for offshore welds for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/offshore-ship-hull' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Ship Hull Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ship hull inspection for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/offshore-qualifications' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Offshore NDT Qualifications</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore ndt qualifications for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/offshore-safety-procedures' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Offshore NDT Safety</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore ndt safety for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/offshore-data-management' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Inspection Data Management</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to inspection data management for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/offshore-integrity-management' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Structural Integrity Management</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to structural integrity management for NDT professionals in industrial inspection and asset integrit...</p>
        </a>
        <a href='/offshore-ndt-trends' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#0284c7', marginTop: 0 }}>Future Offshore NDT Trends</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to future offshore ndt trends for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul>
          <li><a href='https://ndt-connect.com/certifications/iso-9712' target='_blank' rel='noopener'>ISO 9712 Certification</a></li>
          <li><a href='https://ndt-connect.com/industries/marine-and-offshore' target='_blank' rel='noopener'>Marine & Offshore NDT</a></li>
          <li><a href='https://ndt-connect.com/certifications/api-570' target='_blank' rel='noopener'>API 570 Certification</a></li>
          <li><a href='https://ndt-connect.com/faq' target='_blank' rel='noopener'>NDT FAQ</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/bahrain' target='_blank' rel='noopener'>NDT Services in Bahrain</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/trinidad' target='_blank' rel='noopener'>NDT Services in Trinidad</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/denver' target='_blank' rel='noopener'>NDT Services in Denver</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/aberdeen' target='_blank' rel='noopener'>NDT Services in Aberdeen</a></li>
        </ul>
        <a href='https://ndt-connect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#0284c7', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
