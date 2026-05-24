import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RT Testing Hub - Radiographic Testing Knowledge Center',
  description: 'Complete radiographic testing resource covering X-ray and gamma ray inspection methods, film interpretation, digital radiography, and safety.',
  alternates: { canonical: 'https://rt-testing-hub.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>Radiographic Testing Knowledge Center</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Complete radiographic testing resource covering X-ray and gamma ray inspection methods, film interpretation, digital radiography, and safety. Brought to you by <a href='https://ndt-connect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#dc262610', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #dc2626' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/rt-fundamentals' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>Radiographic Testing Fundamentals</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Core principles of radiographic testing including radiation physics, image formation, and industrial applications....</p>
        </a>
        <a href='/rt-film-interpretation' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Film Interpretation Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to radiographic film interpretation including weld discontinuities and casting defects....</p>
        </a>
        <a href='/rt-digital-radiography' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>Digital Radiography Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Overview of digital radiography technology, detector types, image quality, and advantages over conventional film....</p>
        </a>
        <a href='/rt-computed-radiography' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>Computed Radiography Explained</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Understanding computed radiography systems, imaging plates, scanning technology, and industrial applications....</p>
        </a>
        <a href='/rt-safety-procedures' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Radiation Safety Procedures</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Essential radiation safety protocols for radiographic testing including ALARA principles and monitoring....</p>
        </a>
        <a href='/rt-source-selection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Source Selection Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Choosing the right radiation source for radiographic testing including X-ray tubes, Ir-192, Co-60, and Se-75....</p>
        </a>
        <a href='/rt-weld-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Weld Inspection Methods</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Radiographic techniques for weld inspection including setup, exposure calculations, and image quality indicators....</p>
        </a>
        <a href='/rt-codes-standards' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Codes and Standards</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Reference guide to radiographic testing codes including ASME Section V, AWS D1.1, and EN 17636....</p>
        </a>
        <a href='/rt-exposure-techniques' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Exposure Techniques</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Calculating exposure parameters for radiographic testing including time, distance, and source strength....</p>
        </a>
        <a href='/rt-image-quality' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Image Quality Assessment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Methods for assessing radiographic image quality including IQI placement, sensitivity, and density....</p>
        </a>
        <a href='/rt-for-pipelines' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Pipeline Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Radiographic testing procedures for pipeline girth weld inspection per API 1104 and ASME B31.3....</p>
        </a>
        <a href='/rt-for-castings' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Inspection of Castings</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Radiographic examination of cast components including reference radiograph comparison per ASTM E446....</p>
        </a>
        <a href='/rt-for-pressure-vessels' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT for Pressure Vessel Welds</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Radiographic examination requirements for pressure vessel welds per ASME Section VIII....</p>
        </a>
        <a href='/rt-film-processing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Film Processing and Handling</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Proper darkroom procedures, film processing chemistry, storage, and handling for radiographic testing....</p>
        </a>
        <a href='/rt-licensing-requirements' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Licensing Requirements</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Overview of regulatory licensing requirements for radiographic testing operations and radiation sources....</p>
        </a>
        <a href='/rt-vs-other-methods' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT vs Other NDT Methods</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comparing radiographic testing with ultrasonic, magnetic particle, and other NDT methods....</p>
        </a>
        <a href='/rt-panoramic-techniques' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>Panoramic Radiography</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Panoramic radiographic techniques for circumferential weld inspection in vessels and piping....</p>
        </a>
        <a href='/rt-profile-radiography' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>Profile and Tangential RT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Specialized radiographic techniques including profile radiography and tangential exposures....</p>
        </a>
        <a href='/rt-real-time' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>Real-Time Radiography</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Principles and applications of real-time radiography for dynamic inspection and high-throughput operations....</p>
        </a>
        <a href='/rt-ct-scanning' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>Industrial CT Scanning</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Computed tomography scanning for industrial NDT applications including 3D visualization....</p>
        </a>
        <a href='/rt-backscatter-techniques' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Backscatter Techniques</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Backscatter radiographic methods for single-side access inspection of walls and insulated components....</p>
        </a>
        <a href='/rt-for-aerospace' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT in Aerospace Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Aerospace-specific radiographic testing requirements and methods for aircraft component inspection....</p>
        </a>
        <a href='/rt-for-electronics' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT for Electronics Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Micro-focus and nano-focus radiography for electronics, solder joint, and PCB inspection....</p>
        </a>
        <a href='/rt-dose-calculation' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Dose Calculation Methods</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Methods for calculating radiation dose rates, exclusion zones, and exposure times....</p>
        </a>
        <a href='/rt-equipment-maintenance' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Equipment Maintenance</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Maintenance procedures for radiographic testing equipment including X-ray generators....</p>
        </a>
        <a href='/rt-defect-classification' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Defect Classification Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Classifying weld and casting defects found in radiographic images per industry standards....</p>
        </a>
        <a href='/rt-for-corrosion' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT for Corrosion Detection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Using radiographic testing for corrosion detection under insulation and in inaccessible areas....</p>
        </a>
        <a href='/rt-digital-vs-film' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>Digital RT vs Film RT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive comparison of digital and conventional film radiographic testing....</p>
        </a>
        <a href='/rt-training-certification' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Training and Certification</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Career development guide for radiographic testing professionals including certification paths....</p>
        </a>
        <a href='/rt-for-construction' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT in Construction Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Radiographic testing applications in structural steel and reinforced concrete construction....</p>
        </a>
        <a href='/rt-advanced-imaging' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>Advanced RT Imaging Techniques</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Advanced radiographic imaging including laminography, stereo radiography, and phase contrast....</p>
        </a>
        <a href='/rt-quality-assurance' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Quality Assurance Programs</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Establishing quality assurance programs for radiographic testing operations....</p>
        </a>
        <a href='/rt-environmental-concerns' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>RT Environmental Considerations</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Environmental regulations, waste disposal, and sustainability in radiographic testing....</p>
        </a>
        <a href='/rt-future-technology' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>Future of Radiographic Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Emerging technologies in RT including AI interpretation, portable CT, and robotic systems....</p>
        </a>
        <a href='/rt-neutron-radiography' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#dc2626', marginTop: 0 }}>Neutron Radiography Applications</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Introduction to neutron radiography, its unique capabilities, and specialized industrial applications....</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul data-section='cornerstone-links'>
          <li><a href='https://ndt-connect.com/methods/radiographic-testing' target='_blank' rel='noopener'>Radiographic Testing Guide</a></li>
          <li><a href='https://ndt-connect.com/certifications/asnt-certification' target='_blank' rel='noopener'>ASNT Certification Guide</a></li>
        </ul>
        <ul>
          <li><a href='https://ndt-connect.com/industries/oil-and-gas' target='_blank' rel='noopener'>Oil & Gas NDT</a></li>
          <li><a href='https://ndt-connect.com/services/magnetic-particle-testing' target='_blank' rel='noopener'>Magnetic Particle Testing</a></li>
          <li><a href='https://ndt-connect.com/industries/mining' target='_blank' rel='noopener'>Mining NDT</a></li>
          <li><a href='https://ndt-connect.com/tools/certification-pathway' target='_blank' rel='noopener'>Certification Pathway Planner</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/sydney' target='_blank' rel='noopener'>NDT Services in Sydney</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/malaysia' target='_blank' rel='noopener'>NDT Services in Malaysia</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/norway' target='_blank' rel='noopener'>NDT Services in Norway</a></li>
          <li><a href='https://ndt-connect.com/tools/inspection-cost-estimator' target='_blank' rel='noopener'>NDT Cost Estimator</a></li>
        </ul>
        <a href='https://ndt-connect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#dc2626', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
