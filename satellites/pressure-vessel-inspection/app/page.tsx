import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pressure Vessel Inspection Guide - Complete Guide to Pressure Equipment Inspection',
  description: 'Expert resource for pressure vessel inspection covering ASME, API, and PED requirements, damage mechanisms, and fitness-for-service.',
  alternates: { canonical: 'https://pressure-vessel-inspection.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>Complete Guide to Pressure Equipment Inspection</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Expert resource for pressure vessel inspection covering ASME, API, and PED requirements, damage mechanisms, and fitness-for-service. Brought to you by <a href='https://ndt-connect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#b91c1c10', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #b91c1c' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndt-connect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/pv-inspection-basics' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV Inspection Basics</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv inspection basics for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/pv-api-510-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>API 510 Inspection Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to api 510 inspection guide for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/pv-damage-mechanisms' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV Damage Mechanisms</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv damage mechanisms for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/pv-ut-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>UT for Pressure Vessels</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ut for pressure vessels for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/pv-rt-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>RT for Pressure Vessels</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to rt for pressure vessels for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/pv-mt-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>MT for Pressure Vessels</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to mt for pressure vessels for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/pv-pt-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PT for Pressure Vessels</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pt for pressure vessels for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/pv-external-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>External PV Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to external pv inspection for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/pv-internal-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>Internal PV Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to internal pv inspection for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/pv-on-stream-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>On-Stream PV Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to on-stream pv inspection for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/pv-fitness-for-service' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV Fitness-for-Service</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv fitness-for-service for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/pv-remaining-life' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV Remaining Life</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv remaining life for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/pv-repair-alteration' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV Repair and Alteration</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv repair and alteration for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/pv-rerating' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>Pressure Vessel Rerating</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pressure vessel rerating for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/pv-heat-exchanger' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>Heat Exchanger Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to heat exchanger inspection for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/pv-boiler-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>Boiler Inspection Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to boiler inspection guide for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/pv-nozzle-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>Nozzle Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to nozzle inspection for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/pv-relief-devices' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>Relief Device Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to relief device inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/pv-insulation-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>Insulated PV Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to insulated pv inspection for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/pv-elevated-temperature' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>High Temperature PV Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to high temperature pv inspection for NDT professionals in industrial inspection and asset integrity...</p>
        </a>
        <a href='/pv-hydrogen-service' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV in Hydrogen Service</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv in hydrogen service for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/pv-sour-service' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV in Sour Service</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv in sour service for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/pv-cladded-vessels' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>Cladded Vessel Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to cladded vessel inspection for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/pv-foundation-support' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV Foundation Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv foundation inspection for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/pv-corrosion-monitoring' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV Corrosion Monitoring</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv corrosion monitoring for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/pv-phased-array' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>Phased Array for PV</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to phased array for pv for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/pv-guided-wave' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>Guided Wave for PV</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to guided wave for pv for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/pv-acoustic-emission' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>AE Testing for PV</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ae testing for pv for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/pv-codes-comparison' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV Codes Comparison</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv codes comparison for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/pv-inspection-intervals' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV Inspection Intervals</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv inspection intervals for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/pv-metallurgical' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV Metallurgical Assessment</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv metallurgical assessment for NDT professionals in industrial inspection and asset integrity ma...</p>
        </a>
        <a href='/pv-documentation' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV Documentation</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv documentation for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/pv-regulatory' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV Regulatory Requirements</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv regulatory requirements for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/pv-digital-inspection' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>Digital PV Inspection</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to digital pv inspection for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/pv-inspector-career' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#b91c1c', marginTop: 0 }}>PV Inspector Career Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to pv inspector career guide for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul data-section='cornerstone-links'>
          <li><a href='https://ndt-connect.com/pillars/heat-exchanger-tube-inspection-pillar' target='_blank' rel='noopener'>Heat Exchanger Tube Inspection</a></li>
          <li><a href='https://ndt-connect.com/certifications/api-510' target='_blank' rel='noopener'>API 510 Inspector Certification</a></li>
        </ul>
        <ul>
          <li><a href='https://ndt-connect.com/certifications/api-653' target='_blank' rel='noopener'>API 653 Certification</a></li>
          <li><a href='https://ndt-connect.com/industries/manufacturing' target='_blank' rel='noopener'>Manufacturing NDT</a></li>
          <li><a href='https://ndt-connect.com/faq' target='_blank' rel='noopener'>NDT FAQ</a></li>
          <li><a href='https://ndt-connect.com/blog/ut-vs-rt-comparison' target='_blank' rel='noopener'>UT vs RT Comparison</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/germany' target='_blank' rel='noopener'>NDT Services in Germany</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/denver' target='_blank' rel='noopener'>NDT Services in Denver</a></li>
          <li><a href='https://ndt-connect.com/ndt-services/aberdeen' target='_blank' rel='noopener'>NDT Services in Aberdeen</a></li>
          <li><a href='https://ndt-connect.com/certifications' target='_blank' rel='noopener'>NDT Certifications</a></li>
        </ul>
        <a href='https://ndt-connect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#b91c1c', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
