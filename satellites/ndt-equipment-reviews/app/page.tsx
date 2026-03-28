import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDT Equipment Reviews - Independent NDT Equipment and Technology Reviews',
  description: 'Independent reviews and comparisons of NDT equipment, software, and technology from leading manufacturers.',
  alternates: { canonical: 'https://ndt-equipment-reviews.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>Independent NDT Equipment and Technology Reviews</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Independent reviews and comparisons of NDT equipment, software, and technology from leading manufacturers. Brought to you by <a href='https://ndtconnect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#6366f110', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #6366f1' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndtconnect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/equipment-ut-flaw-detectors' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Best UT Flaw Detectors 2026</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to best ut flaw detectors 2026 for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/equipment-phased-array-units' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Phased Array UT Equipment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to phased array ut equipment for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/equipment-ut-thickness-gauges' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>UT Thickness Gauges</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ut thickness gauges for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/equipment-x-ray-generators' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>X-Ray Generators for NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to x-ray generators for ndt for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/equipment-gamma-sources' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Gamma Ray Source Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to gamma ray source guide for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/equipment-dr-detectors' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Digital Radiography Systems</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to digital radiography systems for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/equipment-mt-equipment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>MT Equipment Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to mt equipment guide for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/equipment-pt-materials' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>PT Materials Review</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pt materials review for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/equipment-ect-instruments' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Eddy Current Instruments</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to eddy current instruments for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/equipment-ndt-software' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>NDT Software Reviews</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt software reviews for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/equipment-portable-kits' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Portable NDT Kits</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to portable ndt kits for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/equipment-calibration-blocks' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>NDT Calibration Standards</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt calibration standards for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/equipment-ut-probes' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>UT Probes and Transducers</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ut probes and transducers for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/equipment-coating-gauges' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Coating Thickness Gauges</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to coating thickness gauges for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/equipment-hardness-testers' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Portable Hardness Testers</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to portable hardness testers for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/equipment-borescopes' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Borescopes and Videoscopes</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to borescopes and videoscopes for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/equipment-ndt-drones' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>NDT Inspection Drones</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt inspection drones for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/equipment-thermal-cameras' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Thermal Cameras for NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to thermal cameras for ndt for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/equipment-pmi-analyzers' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>PMI Analyzers Compared</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pmi analyzers compared for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/equipment-weld-gauges' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Weld Inspection Gauges</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to weld inspection gauges for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/equipment-ndt-crawlers' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>NDT Inspection Robots</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt inspection robots for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/equipment-ae-systems' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Acoustic Emission Systems</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to acoustic emission systems for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/equipment-guided-wave-systems' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Guided Wave Equipment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to guided wave equipment for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/equipment-tofd-equipment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>TOFD Testing Equipment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to tofd testing equipment for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/equipment-data-loggers' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>NDT Data Loggers</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt data loggers for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/equipment-mfl-equipment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>MFL Inspection Equipment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to mfl inspection equipment for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/equipment-ut-scanners' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Automated UT Scanners</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to automated ut scanners for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/equipment-cloud-platforms' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>NDT Cloud Platforms</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt cloud platforms for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/equipment-holiday-detectors' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Holiday Detectors</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to holiday detectors for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/equipment-roughness-gauges' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Surface Roughness Gauges</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to surface roughness gauges for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/equipment-uv-lighting' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>NDT UV Lighting</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt uv lighting for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/equipment-film-viewers' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>RT Film Viewers</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to rt film viewers for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/equipment-dosimeters' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Personal Dosimeters</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to personal dosimeters for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/equipment-buying-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>NDT Buying Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt buying guide for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/equipment-equipment-trends' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#6366f1', marginTop: 0 }}>Equipment Trends 2026</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to equipment trends 2026 for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul>
          <li><a href='https://ndtconnect.com/services/radiographic-testing' target='_blank' rel='noopener'>Radiographic Testing Services</a></li>
          <li><a href='https://ndtconnect.com/tools/inspection-cost-estimator' target='_blank' rel='noopener'>NDT Cost Estimator</a></li>
          <li><a href='https://ndtconnect.com/blog/ndt-digital-twins-guide' target='_blank' rel='noopener'>NDT Digital Twins</a></li>
          <li><a href='https://ndtconnect.com/tools/ndt-method-selector' target='_blank' rel='noopener'>NDT Method Selector Tool</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/germany' target='_blank' rel='noopener'>NDT Services in Germany</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/sydney' target='_blank' rel='noopener'>NDT Services in Sydney</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/chicago' target='_blank' rel='noopener'>NDT Services in Chicago</a></li>
          <li><a href='https://ndtconnect.com/blog/corrosion-under-insulation-guide' target='_blank' rel='noopener'>CUI Guide</a></li>
        </ul>
        <a href='https://ndtconnect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#6366f1', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
