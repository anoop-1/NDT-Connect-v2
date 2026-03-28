import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weld Inspection Pro - Professional Weld Inspection Resource Center',
  description: 'Expert resource for welding inspection covering visual testing, NDT methods for welds, codes and standards, and inspector certification.',
  alternates: { canonical: 'https://weld-inspection-pro.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>Professional Weld Inspection Resource Center</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Expert resource for welding inspection covering visual testing, NDT methods for welds, codes and standards, and inspector certification. Brought to you by <a href='https://ndtconnect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#d9770610', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #d97706' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndtconnect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/weld-vt-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Visual Weld Inspection Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Complete guide to visual weld inspection including tools, acceptance criteria, and documentation....</p>
        </a>
        <a href='/weld-defect-types' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Common Weld Defect Types</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Identifying and classifying common weld defects including porosity, lack of fusion, and cracks....</p>
        </a>
        <a href='/weld-ut-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Ultrasonic Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Ultrasonic testing techniques for weld inspection including angle beam methods and acceptance criteria....</p>
        </a>
        <a href='/weld-rt-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Radiographic Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Radiographic testing procedures for weld quality assessment including setup and interpretation....</p>
        </a>
        <a href='/weld-mt-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Magnetic Particle Weld Testing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Magnetic particle testing procedures for surface and near-surface weld defect detection....</p>
        </a>
        <a href='/weld-pt-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Penetrant Testing for Welds</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Liquid penetrant testing methods for detecting surface-breaking defects in welds....</p>
        </a>
        <a href='/aws-d1-1-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>AWS D1.1 Structural Welding Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to AWS D1.1 Structural Welding Code requirements for inspection and quality....</p>
        </a>
        <a href='/asme-section-ix' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>ASME Section IX Overview</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Overview of ASME Section IX welding qualification requirements including WPS, PQR, and welder performance....</p>
        </a>
        <a href='/weld-joint-design' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Weld Joint Design and Preparation</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Guide to weld joint types, preparation requirements, and fit-up tolerances....</p>
        </a>
        <a href='/weld-symbol-reading' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Reading Welding Symbols</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to interpreting AWS welding symbols on engineering drawings....</p>
        </a>
        <a href='/weld-procedure-qualification' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>WPS and PQR Development</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Process for developing welding procedure specifications and procedure qualification records....</p>
        </a>
        <a href='/cwi-exam-preparation' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>CWI Exam Preparation Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Study guide for the AWS Certified Welding Inspector examination....</p>
        </a>
        <a href='/weld-heat-treatment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Post-Weld Heat Treatment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Guidelines for post-weld heat treatment including stress relief and documentation....</p>
        </a>
        <a href='/weld-preheat-requirements' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Weld Preheat Requirements</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Determining preheat and interpass temperature requirements for different materials....</p>
        </a>
        <a href='/weld-stainless-steel' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Welding Stainless Steel Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Special inspection considerations for stainless steel welding....</p>
        </a>
        <a href='/weld-pipe-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Pipe Weld Inspection Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Inspection procedures for pipe welding including butt welds and branch connections....</p>
        </a>
        <a href='/weld-structural-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Structural Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Inspection requirements for structural steel welding in buildings and bridges....</p>
        </a>
        <a href='/weld-repair-procedures' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Weld Repair Procedures</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Guidelines for weld repair including excavation methods and re-inspection....</p>
        </a>
        <a href='/weld-distortion-control' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Weld Distortion Control</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Methods for preventing and correcting welding distortion in fabrication....</p>
        </a>
        <a href='/weld-for-pressure-vessels' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Pressure Vessel Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Weld inspection requirements for pressure vessels per ASME Section VIII....</p>
        </a>
        <a href='/weld-for-pipelines' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Pipeline Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Girth weld inspection procedures for transmission pipelines per API 1104....</p>
        </a>
        <a href='/weld-dissimilar-metals' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Dissimilar Metal Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Inspection challenges and techniques for dissimilar metal welds....</p>
        </a>
        <a href='/weld-automation' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Automated Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Overview of automated weld inspection systems including mechanized UT....</p>
        </a>
        <a href='/weld-documentation' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Weld Inspection Documentation</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Requirements for weld inspection documentation and record retention....</p>
        </a>
        <a href='/weld-acceptance-criteria' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Weld Acceptance Criteria Comparison</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comparing weld acceptance criteria across AWS, ASME, API, and EN standards....</p>
        </a>
        <a href='/weld-process-selection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Welding Process Selection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Guide to selecting welding processes and their impact on inspection....</p>
        </a>
        <a href='/weld-hydrogen-cracking' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Hydrogen Induced Cracking in Welds</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Understanding and preventing hydrogen induced cracking in welds....</p>
        </a>
        <a href='/weld-fatigue-assessment' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Weld Fatigue Life Assessment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Methods for assessing fatigue life of welded joints including fracture mechanics....</p>
        </a>
        <a href='/weld-phased-array' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Phased Array for Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Application of phased array ultrasonic testing for weld inspection....</p>
        </a>
        <a href='/weld-tofd' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>TOFD for Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Time-of-flight diffraction testing for weld inspection and interpretation....</p>
        </a>
        <a href='/weld-ect-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Eddy Current Weld Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Application of eddy current testing for weld surface inspection....</p>
        </a>
        <a href='/weld-quality-management' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Weld Quality Management Systems</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Implementing quality management systems per ISO 3834....</p>
        </a>
        <a href='/weld-filler-metal' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Filler Metal Selection Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Selecting appropriate filler metals for welding applications....</p>
        </a>
        <a href='/weld-welder-qualification' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Welder Performance Qualification</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Understanding welder qualification testing requirements....</p>
        </a>
        <a href='/weld-inspection-careers' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#d97706', marginTop: 0 }}>Weld Inspection Career Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Career paths in welding inspection including CWI and CSWIP certification....</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul>
          <li><a href='https://ndtconnect.com/industries/construction' target='_blank' rel='noopener'>Construction NDT</a></li>
          <li><a href='https://ndtconnect.com/blog/ultimate-guide-ultrasonic-testing' target='_blank' rel='noopener'>Ultrasonic Testing Guide</a></li>
          <li><a href='https://ndtconnect.com/services/visual-testing' target='_blank' rel='noopener'>Visual Testing Services</a></li>
          <li><a href='https://ndtconnect.com/services/acoustic-emission-testing' target='_blank' rel='noopener'>Acoustic Emission Testing</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/germany' target='_blank' rel='noopener'>NDT Services in Germany</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/perth' target='_blank' rel='noopener'>NDT Services in Perth</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/mumbai' target='_blank' rel='noopener'>NDT Services in Mumbai</a></li>
          <li><a href='https://ndtconnect.com/services/ultrasonic-testing' target='_blank' rel='noopener'>Ultrasonic Testing Services</a></li>
        </ul>
        <a href='https://ndtconnect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#d97706', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
