import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corrosion Engineering Guide - Understanding and Preventing Industrial Corrosion',
  description: 'Expert resource on corrosion mechanisms, prevention strategies, inspection methods, and materials selection for industrial applications.',
  alternates: { canonical: 'https://corrosion-engineering-guide.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>Understanding and Preventing Industrial Corrosion</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Expert resource on corrosion mechanisms, prevention strategies, inspection methods, and materials selection for industrial applications. Brought to you by <a href='https://ndt-connect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#7c3aed10', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #7c3aed' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/corrosion-fundamentals' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Corrosion Fundamentals</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to corrosion fundamentals for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/corrosion-types' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Types of Corrosion</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to types of corrosion for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/corrosion-cui-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Corrosion Under Insulation</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to corrosion under insulation for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/corrosion-pitting' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Pitting Corrosion</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pitting corrosion for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/corrosion-galvanic' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Galvanic Corrosion Prevention</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to galvanic corrosion prevention for NDT professionals in industrial inspection and asset integrity ...</p>
        </a>
        <a href='/corrosion-scc-mechanisms' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Stress Corrosion Cracking</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to stress corrosion cracking for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/corrosion-mic' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Microbiologically Influenced Corrosion</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to microbiologically influenced corrosion for NDT professionals in industrial inspection and asset i...</p>
        </a>
        <a href='/corrosion-high-temperature' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>High Temperature Corrosion</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to high temperature corrosion for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/corrosion-monitoring' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Corrosion Monitoring Methods</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to corrosion monitoring methods for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/corrosion-inhibitors' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Corrosion Inhibitor Selection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to corrosion inhibitor selection for NDT professionals in industrial inspection and asset integrity ...</p>
        </a>
        <a href='/corrosion-material-selection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Material Selection Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to material selection guide for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/corrosion-protective-coatings' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Protective Coatings</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to protective coatings for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/corrosion-cathodic-protection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Cathodic Protection Systems</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to cathodic protection systems for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/corrosion-ndt-methods' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>NDT for Corrosion Detection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt for corrosion detection for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/corrosion-rate-calculation' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Corrosion Rate Calculation</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to corrosion rate calculation for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/corrosion-atmospheric' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Atmospheric Corrosion</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to atmospheric corrosion for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/corrosion-erosion' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Erosion-Corrosion</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to erosion-corrosion for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/corrosion-hydrogen-damage' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Hydrogen Damage Mechanisms</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to hydrogen damage mechanisms for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/corrosion-intergranular' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Intergranular Corrosion</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to intergranular corrosion for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/corrosion-in-concrete' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Corrosion in Concrete</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to corrosion in concrete for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/corrosion-marine-environment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Marine Corrosion</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to marine corrosion for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/corrosion-crevice' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Crevice Corrosion</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to crevice corrosion for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/corrosion-management-systems' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Corrosion Management Systems</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to corrosion management systems for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/corrosion-rbi' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Risk-Based Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to risk-based inspection for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/corrosion-failure-analysis' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Corrosion Failure Analysis</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to corrosion failure analysis for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/corrosion-in-oil-gas' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Corrosion in Oil and Gas</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to corrosion in oil and gas for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/corrosion-in-water-systems' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Water Systems Corrosion</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to water systems corrosion for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/corrosion-in-chemical-plants' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Chemical Plant Corrosion</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to chemical plant corrosion for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/corrosion-weld-corrosion' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Weld Corrosion</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to weld corrosion for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/corrosion-testing-methods' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Corrosion Testing Methods</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to corrosion testing methods for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/corrosion-mapping-ut' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Corrosion Mapping with UT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to corrosion mapping with ut for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/corrosion-in-refineries' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Refinery Corrosion</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to refinery corrosion for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/corrosion-prediction-models' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Corrosion Prediction Models</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to corrosion prediction models for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/corrosion-standards-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Corrosion Standards Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to corrosion standards guide for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/corrosion-career-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Corrosion Engineering Careers</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to corrosion engineering careers for NDT professionals in industrial inspection and asset integrity ...</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul>
          <li><a href='https://ndt-connect.com/blog/ndt-certifications-explained' target='_blank' rel='noopener'>NDT Certifications Explained</a></li>
          <li><a href='https://ndt-connect.com/services/magnetic-flux-leakage' target='_blank' rel='noopener'>Magnetic Flux Leakage Testing</a></li>
          <li><a href='https://ndt-connect.com/certifications/api-510' target='_blank' rel='noopener'>API 510 Certification</a></li>
          <li><a href='https://ndt-connect.com/industries/construction' target='_blank' rel='noopener'>Construction NDT</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/abu-dhabi' target='_blank' rel='noopener'>NDT Services in Abu Dhabi</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/perth' target='_blank' rel='noopener'>NDT Services in Perth</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/london' target='_blank' rel='noopener'>NDT Services in London</a></li>
          <li><a href='https://ndt-connect.com/services/penetrant-testing' target='_blank' rel='noopener'>Penetrant Testing Services</a></li>
        </ul>
        <a href='https://ndt-connect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#7c3aed', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
