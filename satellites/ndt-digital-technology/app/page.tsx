import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDT Digital Technology - Digital Transformation in Non-Destructive Testing',
  description: 'Exploring AI, machine learning, robotics, digital twins, and IoT applications transforming the NDT industry.',
  alternates: { canonical: 'https://ndt-digital-technology.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>Digital Transformation in Non-Destructive Testing</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Exploring AI, machine learning, robotics, digital twins, and IoT applications transforming the NDT industry. Brought to you by <a href='https://ndtconnect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#9333ea10', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #9333ea' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndtconnect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/digital-overview' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>NDT Digital Transformation</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt digital transformation for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/digital-ai-in-ndt' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>AI in NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ai in ndt for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/digital-digital-twins' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Digital Twins for NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to digital twins for ndt for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/digital-iot-sensors' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>IoT Sensors for NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to iot sensors for ndt for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/digital-cloud-computing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Cloud Computing for NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to cloud computing for ndt for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/digital-robotics' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Robotics in NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to robotics in ndt for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/digital-drone-technology' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Drone Technology for NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to drone technology for ndt for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/digital-augmented-reality' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Augmented Reality in NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to augmented reality in ndt for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/digital-data-analytics' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>NDT Data Analytics</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt data analytics for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/digital-machine-learning' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Machine Learning for NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to machine learning for ndt for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/digital-deep-learning' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Deep Learning Defect Detection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to deep learning defect detection for NDT professionals in industrial inspection and asset integrity...</p>
        </a>
        <a href='/digital-automated-ut' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Automated UT Analysis</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to automated ut analysis for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/digital-ai-radiograph' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>AI Radiograph Interpretation</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ai radiograph interpretation for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/digital-blockchain' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Blockchain for NDT Records</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to blockchain for ndt records for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/digital-3d-scanning' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>3D Scanning for NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to 3d scanning for ndt for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/digital-edge-computing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Edge Computing for NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to edge computing for ndt for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/digital-5g-connectivity' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>5G for Remote NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to 5g for remote ndt for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/digital-wearable-tech' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Wearable Tech for NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to wearable tech for ndt for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/digital-simulation' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>NDT Simulation Modeling</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt simulation modeling for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/digital-data-standards' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>NDT Data Standards</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt data standards for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/digital-nde-4-0' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>NDE 4.0 Framework</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to nde 4.0 framework for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/digital-cybersecurity' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>NDT Cybersecurity</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt cybersecurity for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/digital-predictive-maintenance' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Predictive Maintenance NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to predictive maintenance ndt for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/digital-mobile-apps' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>NDT Mobile Applications</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt mobile applications for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/digital-image-processing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>NDT Image Processing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt image processing for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/digital-pattern-recognition' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Pattern Recognition NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pattern recognition ndt for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/digital-virtual-reality' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>VR for NDT Training</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to vr for ndt training for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/digital-api-integration' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>NDT System Integration</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt system integration for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/digital-remote-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Remote NDT Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to remote ndt inspection for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/digital-phased-array-imaging' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Advanced PA Imaging</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to advanced pa imaging for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/digital-signal-processing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Digital Signal Processing</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to digital signal processing for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/digital-printed-sensors' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Printed NDT Sensors</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to printed ndt sensors for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/digital-quantum-sensing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Quantum Sensing NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to quantum sensing ndt for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/digital-sustainability' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Sustainable NDT Technology</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to sustainable ndt technology for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/digital-tech-future' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#9333ea', marginTop: 0 }}>Future of NDT Technology</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to future of ndt technology for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul>
          <li><a href='https://ndtconnect.com/services/magnetic-flux-leakage' target='_blank' rel='noopener'>Magnetic Flux Leakage Testing</a></li>
          <li><a href='https://ndtconnect.com/industries/aerospace' target='_blank' rel='noopener'>Aerospace NDT</a></li>
          <li><a href='https://ndtconnect.com/services/acoustic-emission-testing' target='_blank' rel='noopener'>Acoustic Emission Testing</a></li>
          <li><a href='https://ndtconnect.com/blog/ndt-career-guide-2026' target='_blank' rel='noopener'>NDT Career Guide</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/dallas' target='_blank' rel='noopener'>NDT Services in Dallas</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/calgary' target='_blank' rel='noopener'>NDT Services in Calgary</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/houston' target='_blank' rel='noopener'>NDT Services in Houston</a></li>
          <li><a href='https://ndtconnect.com/blog' target='_blank' rel='noopener'>NDT Blog</a></li>
        </ul>
        <a href='https://ndtconnect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#9333ea', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
