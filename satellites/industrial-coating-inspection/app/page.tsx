import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industrial Coating Inspection - Professional Coating and Corrosion Protection Inspection',
  description: 'Complete resource for industrial coating inspection covering surface preparation, application monitoring, and quality assessment.',
  alternates: { canonical: 'https://industrial-coating-inspection.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>Professional Coating and Corrosion Protection Inspection</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Complete resource for industrial coating inspection covering surface preparation, application monitoring, and quality assessment. Brought to you by <a href='https://ndt-connect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#16a34a10', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #16a34a' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/coating-inspection-basics' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Coating Inspection Fundamentals</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to coating inspection fundamentals for NDT professionals in industrial inspection and asset integrit...</p>
        </a>
        <a href='/coating-surface-prep-standards' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Surface Preparation Standards</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to surface preparation standards for NDT professionals in industrial inspection and asset integrity ...</p>
        </a>
        <a href='/coating-abrasive-blast' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Abrasive Blast Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to abrasive blast inspection for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/coating-application-monitoring' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Coating Application Monitoring</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to coating application monitoring for NDT professionals in industrial inspection and asset integrity...</p>
        </a>
        <a href='/coating-dft-measurement' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>DFT Measurement Methods</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to dft measurement methods for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/coating-adhesion-testing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Adhesion Testing Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to adhesion testing guide for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/coating-holiday-testing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Holiday and Pinhole Detection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to holiday and pinhole detection for NDT professionals in industrial inspection and asset integrity ...</p>
        </a>
        <a href='/coating-failure-analysis' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Coating Failure Analysis</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to coating failure analysis for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/coating-marine-coating' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Marine Coating Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to marine coating inspection for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/coating-pipeline-coating' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Pipeline Coating Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pipeline coating inspection for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/coating-tank-coating' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Tank Coating Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tank coating inspection for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/coating-fireproofing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Fireproofing Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to fireproofing inspection for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/coating-thermal-spray' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Thermal Spray Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to thermal spray inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/coating-nace-inspector' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>NACE Inspector Certification</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to nace inspector certification for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/coating-sspc-certification' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>SSPC Inspector Certification</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to sspc inspector certification for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/coating-specifications' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Coating Specifications</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to coating specifications for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/coating-environmental-monitoring' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Environmental Monitoring</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to environmental monitoring for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/coating-compatibility' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Coating Compatibility</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to coating compatibility for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/coating-power-tool-cleaning' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Power Tool Cleaning</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to power tool cleaning for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/coating-water-jetting' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Water Jetting Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to water jetting inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/coating-for-concrete' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Coatings for Concrete</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to coatings for concrete for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/coating-zinc-coating' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Zinc Coating Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to zinc coating inspection for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/coating-epoxy-coating' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Epoxy Coating Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to epoxy coating inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/coating-polyurethane' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Polyurethane Coatings</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to polyurethane coatings for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/coating-repair-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Coating Repair Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to coating repair inspection for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/coating-overcoating' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Overcoating Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to overcoating inspection for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/coating-qa-qc-programs' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Coating QA/QC Programs</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to coating qa/qc programs for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/coating-inspection-reports' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Coating Inspection Reports</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to coating inspection reports for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/coating-defect-atlas' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Coating Defect Atlas</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to coating defect atlas for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/coating-lab-testing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Laboratory Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to laboratory testing for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/coating-oil-gas-coatings' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Oil and Gas Coatings</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to oil and gas coatings for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/coating-cui-prevention' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>CUI Prevention Coatings</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to cui prevention coatings for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/coating-immersion-service' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Immersion Service Coatings</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to immersion service coatings for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/coating-cost-estimation' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Coating Cost Estimation</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to coating cost estimation for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/coating-technology-trends' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#16a34a', marginTop: 0 }}>Coating Technology Trends</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to coating technology trends for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul>
          <li><a href='https://ndt-connect.com/certifications/iso-9712' target='_blank' rel='noopener'>ISO 9712 Certification</a></li>
          <li><a href='https://ndt-connect.com/blog/corrosion-under-insulation-guide' target='_blank' rel='noopener'>CUI Guide</a></li>
          <li><a href='https://ndt-connect.com/services/guided-wave-testing' target='_blank' rel='noopener'>Guided Wave Testing</a></li>
          <li><a href='https://ndt-connect.com/blog/ndt-career-guide-2026' target='_blank' rel='noopener'>NDT Career Guide</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/abu-dhabi' target='_blank' rel='noopener'>NDT Services in Abu Dhabi</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/germany' target='_blank' rel='noopener'>NDT Services in Germany</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/dallas' target='_blank' rel='noopener'>NDT Services in Dallas</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/los-angeles' target='_blank' rel='noopener'>NDT Services in Los Angeles</a></li>
        </ul>
        <a href='https://ndt-connect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#16a34a', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
