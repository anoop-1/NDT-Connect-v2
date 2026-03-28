import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDT Career Portal - Build Your NDT Career',
  description: 'Career guidance resource for NDT professionals covering certifications, training programs, salary information, and career advancement.',
  alternates: { canonical: 'https://ndt-career-portal.vercel.app' },
};

export default function HomePage() {
  return (
    <div>
      <h1>Build Your NDT Career</h1>
      <p style={{ fontSize: '1.1rem' }}>
        Career guidance resource for NDT professionals covering certifications, training programs, salary information, and career advancement. Brought to you by <a href='https://ndtconnect.com' target='_blank' rel='noopener'>NDT Connect</a>, the leading marketplace for non-destructive testing services.
      </p>

      <div style={{ background: '#ca8a0410', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #ca8a04' }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Looking for NDT inspection services? <a href='https://ndtconnect.com/find-providers' target='_blank' rel='noopener'>Find certified NDT providers on NDT Connect</a></p>
      </div>

      <h2>Topics</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <a href='/career-overview' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Career Overview</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt career overview for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/career-entry-level' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Getting Started in NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to getting started in ndt for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/career-salary-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Salary Guide 2026</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt salary guide 2026 for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/career-level-1-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Level I Guide</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt level i guide for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/career-level-2-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Level II Career Path</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt level ii career path for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/career-level-3-guide' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Level III Career Path</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt level iii career path for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/career-training-programs' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Training Programs</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt training programs for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/career-resume-writing' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Resume Writing Tips</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt resume writing tips for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/career-interview-prep' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Interview Preparation</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt interview preparation for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/career-freelance-consulting' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Freelance Consulting</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt freelance consulting for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/career-ut-technician' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>UT Technician Career</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ut technician career for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/career-rt-technician' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>RT Technician Career</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to rt technician career for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/career-weld-inspector' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Welding Inspector Career</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to welding inspector career for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/career-ndt-manager' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Manager Career Path</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt manager career path for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/career-rope-access' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Rope Access NDT Careers</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to rope access ndt careers for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/career-offshore-careers' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Offshore NDT Careers</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to offshore ndt careers for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/career-aerospace-careers' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Aerospace NDT Careers</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to aerospace ndt careers for NDT professionals in industrial inspection and asset integrity manageme...</p>
        </a>
        <a href='/career-oil-gas-careers' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Oil and Gas NDT Careers</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to oil and gas ndt careers for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/career-power-gen-careers' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Power Generation NDT Careers</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to power generation ndt careers for NDT professionals in industrial inspection and asset integrity m...</p>
        </a>
        <a href='/career-continuing-education' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Continuing Education</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to continuing education for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/career-professional-associations' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Professional Associations</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to professional associations for NDT professionals in industrial inspection and asset integrity mana...</p>
        </a>
        <a href='/career-women-in-ndt' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Women in NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to women in ndt for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/career-veterans-transition' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Veterans in NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to veterans in ndt for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/career-job-market-trends' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Job Market Trends</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to job market trends for NDT professionals in industrial inspection and asset integrity management....</p>
        </a>
        <a href='/career-specializations' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Specializations</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt specializations for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
        <a href='/career-api-inspector' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>API Inspector Career</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to api inspector career for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/career-quality-management' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Quality Management Roles</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to quality management roles for NDT professionals in industrial inspection and asset integrity manag...</p>
        </a>
        <a href='/career-research-development' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Research Careers</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt research careers for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/career-teaching-training' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Teaching Careers</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt teaching careers for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/career-technical-sales' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Technical Sales Careers</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to technical sales careers for NDT professionals in industrial inspection and asset integrity manage...</p>
        </a>
        <a href='/career-digital-skills' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Digital Skills for NDT</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to digital skills for ndt for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/career-multi-method-cert' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>Multi-Method Certification</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to multi-method certification for NDT professionals in industrial inspection and asset integrity man...</p>
        </a>
        <a href='/career-international-work' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>International NDT Work</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to international ndt work for NDT professionals in industrial inspection and asset integrity managem...</p>
        </a>
        <a href='/career-retirement-planning' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Career Longevity</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt career longevity for NDT professionals in industrial inspection and asset integrity managemen...</p>
        </a>
        <a href='/career-career-2030' style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ color: '#ca8a04', marginTop: 0 }}>NDT Careers in 2030</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Comprehensive guide to ndt careers in 2030 for NDT professionals in industrial inspection and asset integrity management...</p>
        </a>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>NDT Connect Resources</h2>
        <p>Explore more NDT resources on NDT Connect:</p>
        <ul>
          <li><a href='https://ndtconnect.com/industries/construction' target='_blank' rel='noopener'>Construction NDT</a></li>
          <li><a href='https://ndtconnect.com/services/eddy-current-testing' target='_blank' rel='noopener'>Eddy Current Testing</a></li>
          <li><a href='https://ndtconnect.com/blog/rbi-corrosion-management' target='_blank' rel='noopener'>RBI Corrosion Management</a></li>
          <li><a href='https://ndtconnect.com/blog/ndt-industry-statistics' target='_blank' rel='noopener'>NDT Industry Statistics</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/dubai' target='_blank' rel='noopener'>NDT Services in Dubai</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/mumbai' target='_blank' rel='noopener'>NDT Services in Mumbai</a></li>
          <li><a href='https://ndtconnect.com/ndt-services/sydney' target='_blank' rel='noopener'>NDT Services in Sydney</a></li>
          <li><a href='https://ndtconnect.com/blog/choosing-ndt-service-provider' target='_blank' rel='noopener'>Choosing NDT Provider</a></li>
        </ul>
        <a href='https://ndtconnect.com/register' target='_blank' rel='noopener' style={{ display: 'inline-block', background: '#ca8a04', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Join NDT Connect Free</a>
      </div>
    </div>
  );
}
