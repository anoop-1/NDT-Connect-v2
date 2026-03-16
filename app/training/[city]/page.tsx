import { Metadata } from 'next';
import Link from 'next/link';
import { cities, methods, getCityBySlug } from '@/lib/seo-data';
import { ChevronRight, CheckCircle, BookOpen, Users, Award, MapPin } from 'lucide-react';

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return {
      title: 'Training Not Found',
    };
  }

  const title = `NDT Training in ${city.name} | Certification Courses | NDT Connect`;
  const description = `Comprehensive NDT training and certification programs in ${city.name}, ${city.region}. Learn UT, RT, MT, PT, and other NDT methods from certified instructors. ASNT Level I, II, and III courses available.`;

  return {
    title,
    description,
    keywords: [
      `NDT training ${city.name}`,
      `NDT certification ${city.name}`,
      `NDT courses ${city.region}`,
      `ASNT certification ${city.name}`,
      `non-destructive testing training`,
      `NDT Level II certification`,
      `NDT Level III training`,
    ],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/training/${citySlug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://ndt-connect.com/training/${citySlug}`,
    },
  };
}

function TrainingSchema({ city }: { city: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: `NDT Training and Certification in ${city.name}`,
    description: `Professional Non-Destructive Testing (NDT) training and certification programs in ${city.name}`,
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: city.name,
      address: {
        '@type': 'PostalAddress',
        addressRegion: city.region,
        addressCountry: city.country,
      },
    },
    provider: {
      '@type': 'Organization',
      name: 'NDT Connect',
      url: 'https://ndt-connect.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const TrainingCourse = ({
  level,
  title,
  description,
  duration,
  methods: courseMethods,
}: {
  level: string;
  title: string;
  description: string;
  duration: string;
  methods: string[];
}) => (
  <div className="glass animated-border card-hover-lift p-6 rounded-xl overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="inline-block px-3 py-1 glass-dark rounded-full text-sm font-medium text-white mb-2 border border-[#004aad]/30">
            {level}
          </div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        <Award className="w-6 h-6 text-[#004aad] flex-shrink-0 icon-glow" />
      </div>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="space-y-2 mb-4 text-sm">
        <p>
          <span className="font-medium text-foreground">Duration:</span> <span className="text-muted-foreground">{duration}</span>
        </p>
        <div>
          <span className="font-medium block mb-2 text-foreground">Methods Covered:</span>
          <div className="flex flex-wrap gap-2">
            {courseMethods.map((method, idx) => (
              <span key={idx} className="px-2 py-1 glass-dark text-xs rounded-full text-white border border-[#004aad]/20 hover:border-[#004aad]/50 transition">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button className="w-full px-4 py-2 bg-[#004aad] text-white rounded-lg font-medium hover:bg-[#003a8c] btn-glow transition">
        Learn More
      </button>
    </div>
  </div>
);

export default async function TrainingPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return (
      <div className="container py-12">
        <h1 className="text-2xl font-bold text-red-600">Training Program Not Found</h1>
        <p className="text-muted-foreground mt-2">The training program for this city does not exist.</p>
        <Link href="/" className="text-[#004aad] hover:underline mt-4 block">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <TrainingSchema city={city} />

      <div className="space-y-12">
        {/* Breadcrumbs */}
        <div className="bg-gradient-to-r from-[#004aad]/5 to-transparent py-4 px-0 border-b border-[#004aad]/10">
          <div className="container">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-[#004aad] hover:text-[#003a8c] font-medium transition">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link href="/training" className="text-[#004aad] hover:text-[#003a8c] font-medium transition">
                Training
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{city.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 hero-grid-bg opacity-30" />
          <div className="absolute inset-0">
            <div className="orb w-96 h-96 bg-[#004aad]/20 rounded-full blur-3xl absolute -top-20 -left-20 animate-float" />
            <div className="orb w-72 h-72 bg-[#004aad]/10 rounded-full blur-3xl absolute -bottom-32 -right-32 animate-float" style={{ animationDelay: '2s' }} />
          </div>
          <div className="container relative z-10">
            <div className="max-w-4xl">
              <div className="inline-block mb-4 px-4 py-2 glass-dark rounded-full text-sm font-medium text-white border border-[#004aad]/40 backdrop-blur-xl">
                NDT Training & Certification
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 gradient-text">
                NDT Training in {city.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl">
                Comprehensive Non-Destructive Testing (NDT) training and certification programs in {city.name}, {city.region}. Become a certified NDT Inspector with ASNT Level I, II, and III courses covering all major NDT methods.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-[#004aad] text-white rounded-lg font-medium btn-glow hover:bg-[#003a8c] transition">
                  Enroll in a Course
                </button>
                <Link
                  href={`/cities/${citySlug}`}
                  className="px-8 py-3 glass animated-border rounded-lg font-medium text-[#004aad] hover:bg-[#004aad]/10 transition"
                >
                  View NDT Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Train in This City */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 gradient-text">Why Train in {city.name}?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-xl animate-fade-in-up stagger-1">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-foreground">
                <div className="w-10 h-10 rounded-lg bg-[#004aad]/20 flex items-center justify-center mr-3">
                  <MapPin className="w-5 h-5 text-[#004aad]" />
                </div>
                Strategic Location
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {city.name} is home to major industrial operations in {city.industries.slice(0, 2).join(', ')} and other critical sectors. Training in {city.name} puts you in the heart of diverse NDT applications and job opportunities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The {city.region} region's strong industrial presence means abundant career opportunities for certified NDT inspectors in facilities like {city.keyFacilities.slice(0, 2).join(' and ')}.
              </p>
            </div>
            <div className="glass p-8 rounded-xl animate-fade-in-up stagger-2">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-foreground">
                <div className="w-10 h-10 rounded-lg bg-[#004aad]/20 flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-[#004aad]" />
                </div>
                Industry Network
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Connect with industry professionals, experienced instructors, and other aspiring NDT inspectors in {city.name}. Build relationships that will support your career development and professional growth.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Access real-world case studies and examples specific to {city.name}'s dominant industries, ensuring practical, relevant training.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Training Levels Overview */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-4 gradient-text">ASNT Certification Levels</h2>
          <p className="text-muted-foreground mb-12 leading-relaxed max-w-3xl">
            NDT certification in {city.name} follows the ASNT SNT-TC-1A standard, with three progressive levels of competency:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass animated-border card-hover-lift p-8 rounded-xl overflow-hidden group border-t-4 border-t-blue-500 stagger-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 glass-dark text-blue-200 rounded-full text-sm font-semibold mb-4 border border-blue-500/30">
                  Level I
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Technician</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Performs NDT operations under the direction of a Level II or Level III inspector. Learns fundamental principles and hands-on techniques.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Basic NDT principles</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Equipment operation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Practical inspection techniques</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Written examination</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="glass animated-border card-hover-lift p-8 rounded-xl overflow-hidden group border-t-4 border-t-green-500 stagger-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 glass-dark text-green-200 rounded-full text-sm font-semibold mb-4 border border-green-500/30">
                  Level II
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Inspector</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Performs examinations and evaluates results. Interprets standards, codes, and procedures. Supervises Level I technicians.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Advanced theory & principles</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Result interpretation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Standards & code application</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Written exam + practical exam</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="glass animated-border card-hover-lift p-8 rounded-xl overflow-hidden group border-t-4 border-t-purple-500 stagger-3">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 glass-dark text-purple-200 rounded-full text-sm font-semibold mb-4 border border-purple-500/30">
                  Level III
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Expert</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Establishes NDT procedures and techniques. Interprets complex results. Certifies and supervises Level I and II inspectors.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Expert-level theory</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Method development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Procedure qualification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Oral exam + comprehensive exam</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Available Courses */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Available NDT Courses in {city.name}</h2>
          <p className="text-muted-foreground mb-12 leading-relaxed max-w-3xl">
            Comprehensive training programs covering all major NDT methods, from introductory Level I to expert Level III certifications:
          </p>

          {/* UT Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center animate-fade-in-up">
              <span className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4 font-bold text-white shadow-lg">
                UT
              </span>
              <span className="gradient-text">Ultrasonic Testing (UT) Courses</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6 stagger-1">
              <TrainingCourse
                level="ASNT Level I"
                title="UT Level I Foundation"
                description="Learn the fundamentals of ultrasonic testing, including equipment operation, basic inspection techniques, and result interpretation."
                duration="40 hours"
                methods={['Equipment Operation', 'Couplant Application', 'Basic Signal Interpretation', 'Documentation']}
              />
              <TrainingCourse
                level="ASNT Level II"
                title="UT Level II Comprehensive"
                description="Advanced UT training covering complex inspections, standard applications, and result evaluation for critical components."
                duration="60 hours"
                methods={['Advanced Theory', 'Sensitivity Calibration', 'Complex Geometries', 'Report Generation']}
              />
              <TrainingCourse
                level="ASNT Level III"
                title="UT Level III Specialist"
                description="Expert-level UT training for developing methods, supervising inspectors, and addressing complex inspection challenges."
                duration="120 hours"
                methods={['Method Development', 'Procedure Writing', 'Inspector Certification', 'Research & Development']}
              />
            </div>
          </div>

          {/* RT Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center animate-fade-in-up">
              <span className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-4 font-bold text-white shadow-lg">
                RT
              </span>
              <span className="gradient-text">Radiographic Testing (RT) Courses</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6 stagger-2">
              <TrainingCourse
                level="ASNT Level I"
                title="RT Level I Foundation"
                description="Introduction to radiographic testing, radiation safety, equipment operation, and film interpretation basics."
                duration="40 hours"
                methods={['Radiation Safety', 'Equipment Operation', 'Film Basics', 'Exposure Technique']}
              />
              <TrainingCourse
                level="ASNT Level II"
                title="RT Level II Comprehensive"
                description="Advanced radiographic techniques, image quality standards, defect characterization, and digital radiography."
                duration="60 hours"
                methods={['IQI Standards', 'Image Quality', 'Defect Identification', 'Digital RT']}
              />
              <TrainingCourse
                level="ASNT Level III"
                title="RT Level III Specialist"
                description="Expert-level RT instruction in procedure development, quality control, and advanced imaging applications."
                duration="120 hours"
                methods={['Procedure Development', 'Quality Assurance', 'Advanced Imaging', 'Standards Compliance']}
              />
            </div>
          </div>

          {/* MT Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center animate-fade-in-up">
              <span className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mr-4 font-bold text-white shadow-lg">
                MT
              </span>
              <span className="gradient-text">Magnetic Particle Testing (MT) Courses</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6 stagger-3">
              <TrainingCourse
                level="ASNT Level I"
                title="MT Level I Foundation"
                description="Learn magnetic particle testing principles, magnetization techniques, particle application, and defect indication interpretation."
                duration="30 hours"
                methods={['Magnetization', 'Particle Application', 'Dry & Wet Methods', 'Demagnetization']}
              />
              <TrainingCourse
                level="ASNT Level II"
                title="MT Level II Comprehensive"
                description="Advanced MT training covering complex magnetization patterns, sensitivity optimization, and standards-based procedures."
                duration="50 hours"
                methods={['Field Control', 'Sensitivity Verification', 'Advanced Procedures', 'Code Compliance']}
              />
              <TrainingCourse
                level="ASNT Level III"
                title="MT Level III Specialist"
                description="Expert-level MT instruction in method development, troubleshooting, and inspector certification programs."
                duration="100 hours"
                methods={['Method Development', 'Problem Solving', 'Advanced Theory', 'Certification Programs']}
              />
            </div>
          </div>

          {/* PT Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center animate-fade-in-up">
              <span className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mr-4 font-bold text-white shadow-lg">
                PT
              </span>
              <span className="gradient-text">Liquid Penetrant Testing (PT) Courses</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6 stagger-4">
              <TrainingCourse
                level="ASNT Level I"
                title="PT Level I Foundation"
                description="Introduction to penetrant testing including material selection, surface preparation, penetrant application, and indication evaluation."
                duration="30 hours"
                methods={['Surface Prep', 'Penetrant Application', 'Developer Use', 'Indication Recognition']}
              />
              <TrainingCourse
                level="ASNT Level II"
                title="PT Level II Comprehensive"
                description="Advanced PT training covering process control, fluorescent and visible methods, sensitivity, and aerospace applications."
                duration="50 hours"
                methods={['Process Control', 'Fluorescent Method', 'Sensitivity Optimization', 'Aerospace Standards']}
              />
              <TrainingCourse
                level="ASNT Level III"
                title="PT Level III Specialist"
                description="Expert PT instruction in procedure development, method comparison studies, and advanced materials inspection."
                duration="100 hours"
                methods={['Procedure Development', 'Method Comparison', 'Advanced Applications', 'Quality Control']}
              />
            </div>
          </div>

          {/* ET Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center animate-fade-in-up">
              <span className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mr-4 font-bold text-white shadow-lg">
                ET
              </span>
              <span className="gradient-text">Eddy Current Testing (ET) Courses</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6 stagger-5">
              <TrainingCourse
                level="ASNT Level I"
                title="ET Level I Foundation"
                description="Eddy current fundamentals including electromagnetic principles, probe operation, and basic flaw detection."
                duration="40 hours"
                methods={['EM Theory', 'Probe Selection', 'Signal Interpretation', 'Lift-off Control']}
              />
              <TrainingCourse
                level="ASNT Level II"
                title="ET Level II Comprehensive"
                description="Advanced ET covering impedance diagrams, conductivity measurement, and automated inspection systems."
                duration="60 hours"
                methods={['Impedance Analysis', 'Conductivity', 'Automated Systems', 'Standards Application']}
              />
              <TrainingCourse
                level="ASNT Level III"
                title="ET Level III Specialist"
                description="Expert ET training in probe design, signal processing, and specialized applications like tube inspection."
                duration="120 hours"
                methods={['Probe Design', 'Signal Processing', 'Tube Inspection', 'Research Applications']}
              />
            </div>
          </div>

          {/* Specialized Courses */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center animate-fade-in-up">
              <span className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mr-4 font-bold text-white shadow-lg">
                +
              </span>
              <span className="gradient-text">Specialized & Advanced Courses</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6 stagger-6">
              <TrainingCourse
                level="Specialized"
                title="Phased Array Ultrasonic Testing (PAUT)"
                description="Advanced ultrasonic imaging with phased array technology for enhanced defect detection and characterization."
                duration="40 hours"
                methods={['PAUT Equipment', 'Electronic Steering', 'S-Scan Imaging', 'Data Analysis']}
              />
              <TrainingCourse
                level="Specialized"
                title="Time-of-Flight Diffraction (TOFD)"
                description="Advanced ultrasonic technique for precise defect sizing using diffracted wave signals."
                duration="35 hours"
                methods={['TOFD Theory', 'Defect Sizing', 'Critical Weld Inspection', 'Data Interpretation']}
              />
              <TrainingCourse
                level="Specialized"
                title="Guided Wave Testing (GWT)"
                description="Long-distance pipe screening using low-frequency guided waves for corrosion detection."
                duration="30 hours"
                methods={['Wave Propagation', 'Pipe Screening', 'Insulation Removal Avoidance', 'Data Analysis']}
              />
              <TrainingCourse
                level="Specialized"
                title="Corrosion Mapping & Thickness Measurement"
                description="Detailed wall thickness mapping and corrosion assessment using ultrasonic scanning systems."
                duration="32 hours"
                methods={['Scanning Systems', 'C-Scan Interpretation', 'Remaining Life Calculation', 'Reporting']}
              />
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Training Benefits */}
        <section className="container glass-strong rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-12 gradient-text">Benefits of NDT Training in {city.name}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6 stagger-1">
              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-[#004aad]/20 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-[#004aad]/40 transition">
                  <CheckCircle className="w-5 h-5 text-[#004aad]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Industry-Recognized Certification</h3>
                  <p className="text-sm text-muted-foreground mt-2">ASNT certifications are recognized globally and valued by employers across industries.</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-[#004aad]/20 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-[#004aad]/40 transition">
                  <CheckCircle className="w-5 h-5 text-[#004aad]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Career Advancement</h3>
                  <p className="text-sm text-muted-foreground mt-2">NDT certifications open doors to better positions and higher earning potential.</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-[#004aad]/20 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-[#004aad]/40 transition">
                  <CheckCircle className="w-5 h-5 text-[#004aad]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Practical Hands-On Training</h3>
                  <p className="text-sm text-muted-foreground mt-2">Learn from experienced instructors using real equipment and materials.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 stagger-2">
              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-[#004aad]/20 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-[#004aad]/40 transition">
                  <CheckCircle className="w-5 h-5 text-[#004aad]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Multiple Method Options</h3>
                  <p className="text-sm text-muted-foreground mt-2">Choose to specialize in UT, RT, MT, PT, ET, or any combination of NDT methods.</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-[#004aad]/20 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-[#004aad]/40 transition">
                  <CheckCircle className="w-5 h-5 text-[#004aad]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Local Networking</h3>
                  <p className="text-sm text-muted-foreground mt-2">Build professional relationships with instructors and classmates in the {city.name} area.</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-[#004aad]/20 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-[#004aad]/40 transition">
                  <CheckCircle className="w-5 h-5 text-[#004aad]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Job Placement Support</h3>
                  <p className="text-sm text-muted-foreground mt-2">Access to job boards and connection opportunities with {city.name} employers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Industry Context */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-4 gradient-text">NDT Career Opportunities in {city.name}</h2>
          <p className="text-muted-foreground mb-12 leading-relaxed max-w-3xl">
            {city.name}'s strong industrial base creates abundant career opportunities for certified NDT inspectors. Key industries driving demand for NDT expertise include:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {city.industries.map((industry, idx) => (
              <div key={idx} className="glass animated-border card-hover-lift p-6 rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold mb-3 text-foreground">{industry}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {industry === 'Oil & Gas'
                      ? `${city.name}'s significant oil & gas infrastructure requires regular NDT inspections of pipelines, refineries, and processing facilities. Certified inspectors are in high demand.`
                      : industry === 'Aerospace'
                      ? `Advanced aerospace and defense operations in ${city.name} maintain strict inspection standards requiring experienced NDT professionals.`
                      : industry === 'Manufacturing'
                      ? `Industrial manufacturing facilities across ${city.name} employ NDT inspectors for quality control and equipment maintenance.`
                      : industry === 'Power Generation'
                      ? `Power plants and energy infrastructure require ongoing NDT inspection services to maintain operational safety and efficiency.`
                      : industry === 'Marine'
                      ? `Marine industries and port operations in ${city.name} employ NDT inspectors for vessel and equipment inspection.`
                      : industry === 'Construction'
                      ? `Construction and structural steel projects in ${city.name} require NDT inspection for quality assurance and code compliance.`
                      : `${industry} operations throughout ${city.name} create steady demand for skilled NDT professionals.`}
                  </p>
                  <p className="text-xs font-medium text-[#004aad] bg-[#004aad]/10 px-3 py-2 rounded-lg inline-block">
                    Typical positions: NDT Level I/II/III, Quality Control Inspector, Inspection Engineer
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* Certification Process */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 gradient-text">NDT Certification Process</h2>
          <div className="space-y-4 max-w-4xl">
            {[
              {
                step: 1,
                title: 'Classroom Training',
                description: 'Complete structured classroom training in the chosen NDT method covering theory, principles, and best practices.'
              },
              {
                step: 2,
                title: 'Hands-On Practice',
                description: 'Perform supervised practical work with actual NDT equipment on real test materials to develop inspection skills.'
              },
              {
                step: 3,
                title: 'Work Experience',
                description: 'Complete required hours of documented work experience (varies by level and method) under qualified supervision.'
              },
              {
                step: 4,
                title: 'ASNT Examination',
                description: 'Pass ASNT certification exam(s) demonstrating knowledge and competency. Written and practical exams required for Level II and III.'
              },
              {
                step: 5,
                title: 'Certification Issued',
                description: 'Upon passing, you receive your ASNT NDT Inspector certification card, valid for 5 years with continuing education requirements.'
              }
            ].map((item, idx) => (
              <div key={idx} className="glass animated-border card-hover-lift p-6 rounded-xl overflow-hidden group stagger-{idx + 1}">
                <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-start">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#004aad] to-[#003a8c] text-white flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0 shadow-lg">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* FAQ Section */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 gradient-text">Training FAQs</h2>
          <div className="space-y-4 max-w-4xl">
            {[
              {
                question: 'How long does NDT certification take?',
                answer: 'Training duration varies by method and level. Level I courses typically take 30-40 hours, Level II 50-60 hours, and Level III 100-120 hours. Additional work experience hours (100-1000+ depending on level) must be completed after training.'
              },
              {
                question: 'What are the prerequisites for NDT training?',
                answer: 'Most programs require high school graduation or equivalent. No prior NDT experience is necessary for Level I, though some employers prefer candidates with mechanical or technical backgrounds.'
              },
              {
                question: 'Can I train in multiple NDT methods?',
                answer: 'Yes! Many professionals become certified in multiple methods. Training is method-specific, so you can pursue certifications in UT, RT, MT, PT, ET, and other methods to expand your career options.'
              },
              {
                question: 'How much does NDT training cost?',
                answer: 'Cost varies by provider, method, and level. Level I courses typically range from $500-1,000, while Level II and III courses are more expensive. Some employers cover training costs for employees.'
              },
              {
                question: 'How long is the NDT certification valid?',
                answer: 'ASNT NDT certifications are valid for 5 years. To maintain your certification, you must complete continuing education requirements and renew your certification before it expires.'
              }
            ].map((item, idx) => (
              <div key={idx} className="glass animated-border card-hover-lift p-6 rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h3 className="font-semibold text-lg text-foreground mb-3">{item.question}</h3>
                  <p className="text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* Call to Action */}
        <section className="relative overflow-hidden py-16 rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#004aad] to-[#003a8c] opacity-90" />
          <div className="absolute inset-0">
            <div className="orb w-72 h-72 bg-white/10 rounded-full blur-3xl absolute -top-32 -left-32 animate-float" />
            <div className="orb w-64 h-64 bg-white/5 rounded-full blur-3xl absolute -bottom-20 -right-20 animate-float" style={{ animationDelay: '3s' }} />
          </div>
          <div className="container relative z-10 text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Start Your NDT Career?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Enroll in NDT training in {city.name} today and take the first step toward a rewarding career in Non-Destructive Testing.
            </p>
            <button className="px-8 py-3 bg-white text-[#004aad] rounded-lg font-medium btn-glow hover:bg-opacity-90 transition shadow-xl">
              Enroll Now
            </button>
          </div>
        </section>

        {/* Related Pages */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 gradient-text">Explore More in {city.name}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href={`/cities/${citySlug}`}
              className="glass animated-border card-hover-3d p-6 rounded-xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[#004aad] transition flex items-center text-foreground">
                  <MapPin className="w-5 h-5 mr-2" />
                  NDT Services in {city.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Discover all NDT inspection services and certified providers available in {city.name}.
                </p>
              </div>
            </Link>
            <Link
              href="/"
              className="glass animated-border card-hover-3d p-6 rounded-xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[#004aad] transition flex items-center text-foreground">
                  <BookOpen className="w-5 h-5 mr-2" />
                  NDT Methods & Services
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn about all NDT methods including UT, RT, MT, PT, ET, and advanced techniques.
                </p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
