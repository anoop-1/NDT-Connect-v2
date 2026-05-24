import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UT Testing Academy - The Complete Resource for Ultrasonic Testing Education',
  description: 'Comprehensive ultrasonic testing education hub covering UT principles, techniques, equipment, and career development.',
  alternates: { canonical: 'https://ut-testing-academy.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>The Complete Resource for Ultrasonic Testing Education</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Comprehensive ultrasonic testing education hub covering UT principles, techniques, equipment, and career development. Brought to you by <a href='https://ndt-connect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#1e40af10', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #1e40af' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/ut-fundamentals' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>Ultrasonic Testing Fundamentals</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Understanding the basic principles of ultrasonic testing including sound wave propagation, transducer types, and signal ...</p>
        </a>
        <a href='/ut-equipment-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Equipment Selection Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Complete guide to choosing the right ultrasonic testing equipment including flaw detectors, thickness gauges, and phased...</p>
        </a>
        <a href='/ut-weld-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Weld Inspection Techniques</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Detailed methods for ultrasonic weld inspection covering joint preparation scanning, angle beam techniques, and acceptan...</p>
        </a>
        <a href='/ut-thickness-measurement' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>Wall Thickness Measurement with UT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ultrasonic thickness measurement for corrosion monitoring, minimum wall calculations, and remaini...</p>
        </a>
        <a href='/ut-calibration-procedures' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Calibration Procedures</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Step-by-step calibration procedures for ultrasonic testing equipment including DAC curves, TCG, and reference standards....</p>
        </a>
        <a href='/contact-ut-vs-immersion' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>Contact UT vs Immersion Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comparing contact and immersion ultrasonic testing methods, their advantages, limitations, and best applications....</p>
        </a>
        <a href='/ut-for-composites' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>Ultrasonic Testing of Composites</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Specialized UT techniques for composite material inspection including through-transmission, pulse-echo, and bond testing...</p>
        </a>
        <a href='/ut-data-recording' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Data Recording and Reporting</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Best practices for ultrasonic testing data recording, documentation requirements, and generating compliant inspection re...</p>
        </a>
        <a href='/ut-for-forgings' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Inspection of Forgings</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Ultrasonic testing procedures for forged components including straight beam and angle beam techniques per ASTM A388....</p>
        </a>
        <a href='/ut-for-castings' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Inspection of Castings</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Methods for ultrasonic examination of cast components addressing coarse grain challenges and acceptance criteria....</p>
        </a>
        <a href='/advanced-ut-techniques' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>Advanced UT Techniques Overview</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Overview of advanced ultrasonic methods including TOFD, phased array, full matrix capture, and total focusing method....</p>
        </a>
        <a href='/ut-transducer-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Transducer Selection Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Guide to selecting ultrasonic transducers by frequency, element size, type, and application requirements....</p>
        </a>
        <a href='/ut-couplant-selection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Couplant Selection and Use</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Understanding ultrasonic couplants, their properties, selection criteria for different testing scenarios....</p>
        </a>
        <a href='/ut-codes-standards' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Codes and Standards Reference</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Reference guide to major ultrasonic testing codes and standards including ASME, AWS, EN, and ISO specifications....</p>
        </a>
        <a href='/ut-for-corrosion' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Corrosion Detection Methods</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Using ultrasonic testing for corrosion detection, mapping, and monitoring in industrial facilities and infrastructure....</p>
        </a>
        <a href='/ut-for-pipelines' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Pipeline Inspection Methods</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Ultrasonic testing methods for pipeline integrity assessment including girth weld inspection and wall thickness surveys....</p>
        </a>
        <a href='/ut-signal-interpretation' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Signal Interpretation Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Guide to interpreting ultrasonic A-scan, B-scan, and C-scan displays for accurate flaw characterization....</p>
        </a>
        <a href='/ut-for-pressure-vessels' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT for Pressure Vessel Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Ultrasonic examination procedures for pressure vessels per ASME Section V and acceptance criteria per Section VIII....</p>
        </a>
        <a href='/ut-surface-preparation' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>Surface Preparation for UT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Requirements and methods for surface preparation before ultrasonic testing to ensure reliable results....</p>
        </a>
        <a href='/ut-limitations-artifacts' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Limitations and Artifacts</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Understanding common ultrasonic testing limitations, artifacts, and false indications for improved reliability....</p>
        </a>
        <a href='/ut-for-bolts-fasteners' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Inspection of Bolts and Fasteners</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Specialized ultrasonic techniques for bolt inspection including length measurement and flaw detection....</p>
        </a>
        <a href='/ut-for-railways' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT in Railway Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Application of ultrasonic testing in railway rail and wheel inspection for safety-critical defect detection....</p>
        </a>
        <a href='/ut-underwater-testing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>Underwater Ultrasonic Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Methods and equipment for performing ultrasonic testing underwater for offshore structures and marine applications....</p>
        </a>
        <a href='/ut-automated-scanning' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>Automated UT Scanning Systems</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Overview of automated and semi-automated ultrasonic scanning systems for improved productivity and reliability....</p>
        </a>
        <a href='/ut-phased-array-intro' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>Introduction to Phased Array UT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Fundamentals of phased array ultrasonic testing technology, beam steering, focusing, and practical applications....</p>
        </a>
        <a href='/ut-tofd-introduction' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>Introduction to TOFD Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Time-of-flight diffraction testing principles, setup procedures, and applications for weld inspection....</p>
        </a>
        <a href='/ut-training-paths' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Training and Certification Paths</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Career development guide for ultrasonic testing professionals including training programs and certification options....</p>
        </a>
        <a href='/ut-for-heat-exchangers' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT for Heat Exchanger Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Ultrasonic testing methods for heat exchanger tube inspection including IRIS and conventional techniques....</p>
        </a>
        <a href='/ut-digital-recording' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>Digital UT and Data Management</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Modern digital ultrasonic testing systems, data storage, cloud management, and AI-assisted analysis....</p>
        </a>
        <a href='/ut-probability-detection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Probability of Detection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Understanding probability of detection in ultrasonic testing and factors affecting inspection reliability....</p>
        </a>
        <a href='/ut-for-aerospace' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT in Aerospace Applications</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Aerospace-specific ultrasonic testing requirements, methods, and standards for aircraft structural inspection....</p>
        </a>
        <a href='/ut-guided-waves' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>Guided Wave UT Explained</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Principles and applications of guided wave ultrasonic testing for long-range pipeline and structural inspection....</p>
        </a>
        <a href='/ut-for-storage-tanks' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT for Storage Tank Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Ultrasonic testing procedures for above-ground storage tank floors, shells, and roofs per API 653....</p>
        </a>
        <a href='/ut-flaw-sizing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>UT Flaw Sizing Techniques</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Methods for accurate flaw sizing using ultrasonic testing including DGS, DAC, 6dB drop, and tip diffraction....</p>
        </a>
        <a href='/ut-future-trends' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: 0 }}>Future Trends in Ultrasonic Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Emerging trends in UT technology including AI and ML, robotics, digital twins, and advanced imaging....</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul>
          <li><a href='https://ndt-connect.com/blog/ndt-career-guide-2026' target='_blank' rel='noopener'>NDT Career Guide</a></li>
          <li><a href='https://ndt-connect.com/tools/inspection-cost-estimator' target='_blank' rel='noopener'>NDT Cost Estimator</a></li>
          <li><a href='https://ndt-connect.com/certifications/pcn-certification' target='_blank' rel='noopener'>PCN Certification</a></li>
          <li><a href='https://ndt-connect.com/industries/aerospace' target='_blank' rel='noopener'>Aerospace NDT</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/singapore' target='_blank' rel='noopener'>NDT Services in Singapore</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/houston' target='_blank' rel='noopener'>NDT Services in Houston</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/trinidad' target='_blank' rel='noopener'>NDT Services in Trinidad</a></li>
          <li><a href='https://ndt-connect.com/certifications/api-510' target='_blank' rel='noopener'>API 510 Certification</a></li>
        </ul>
        <a href='https://ndt-connect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#1e40af', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
