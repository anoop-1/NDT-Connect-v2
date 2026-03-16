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
  <div className="border rounded-lg p-6 hover:shadow-lg transition">
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="inline-block px-3 py-1 bg-primary/20 rounded-full text-sm font-medium text-primary mb-2">
          {level}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <Award className="w-6 h-6 text-primary flex-shrink-0" />
    </div>
    <p className="text-muted-foreground mb-4">{description}</p>
    <div className="space-y-2 mb-4 text-sm">
      <p>
        <span className="font-medium">Duration:</span> {duration}
      </p>
      <div>
        <span className="font-medium block mb-2">Methods Covered:</span>
        <div className="flex flex-wrap gap-2">
          {courseMethods.map((method, idx) => (
            <span key={idx} className="px-2 py-1 bg-muted text-xs rounded">
              {method}
            </span>
          ))}
        </div>
      </div>
    </div>
    <button className="w-full px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition">
      Learn More
    </button>
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
        <Link href="/" className="text-primary hover:underline mt-4 block">
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
        <div className="bg-muted/50 py-4 px-0">
          <div className="container">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link href="/training" className="text-primary hover:underline">
                Training
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{city.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
          <div className="container">
            <div className="max-w-4xl">
              <div className="inline-block mb-4 px-3 py-1 bg-primary/20 rounded-full text-sm font-medium text-primary">
                NDT Training & Certification
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                NDT Training in {city.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Comprehensive Non-Destructive Testing (NDT) training and certification programs in {city.name}, {city.region}. Become a certified NDT Inspector with ASNT Level I, II, and III courses covering all major NDT methods.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
                  Enroll in a Course
                </button>
                <Link
                  href={`/cities/${citySlug}`}
                  className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition"
                >
                  View NDT Services in {city.name}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Train in This City */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Why Train in {city.name}?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-primary" />
                Strategic Location
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {city.name} is home to major industrial operations in {city.industries.slice(0, 2).join(', ')} and other critical sectors. Training in {city.name} puts you in the heart of diverse NDT applications and job opportunities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The {city.region} region's strong industrial presence means abundant career opportunities for certified NDT inspectors in facilities like {city.keyFacilities.slice(0, 2).join(' and ')}.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-3 text-primary" />
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

        {/* Training Levels Overview */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">ASNT Certification Levels</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            NDT certification in {city.name} follows the ASNT SNT-TC-1A standard, with three progressive levels of competency:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-transparent">
              <div className="inline-block px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-semibold mb-4">
                Level I
              </div>
              <h3 className="text-xl font-semibold mb-3">Technician</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Performs NDT operations under the direction of a Level II or Level III inspector. Learns fundamental principles and hands-on techniques.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Basic NDT principles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Equipment operation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Practical inspection techniques</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Written examination</span>
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-6 bg-gradient-to-br from-green-50 to-transparent">
              <div className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold mb-4">
                Level II
              </div>
              <h3 className="text-xl font-semibold mb-3">Inspector</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Performs examinations and evaluates results. Interprets standards, codes, and procedures. Supervises Level I technicians.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Advanced theory & principles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Result interpretation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Standards & code application</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Written exam + practical exam</span>
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-6 bg-gradient-to-br from-purple-50 to-transparent">
              <div className="inline-block px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-semibold mb-4">
                Level III
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Establishes NDT procedures and techniques. Interprets complex results. Certifies and supervises Level I and II inspectors.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Expert-level theory</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Method development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Procedure qualification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Oral exam + comprehensive exam</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Available Courses */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Available NDT Courses in {city.name}</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Comprehensive training programs covering all major NDT methods, from introductory Level I to expert Level III certifications:
          </p>

          {/* UT Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 font-bold text-blue-700">
                UT
              </span>
              Ultrasonic Testing (UT) Courses
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
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
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 font-bold text-green-700">
                RT
              </span>
              Radiographic Testing (RT) Courses
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
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
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3 font-bold text-amber-700">
                MT
              </span>
              Magnetic Particle Testing (MT) Courses
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
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
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3 font-bold text-red-700">
                PT
              </span>
              Liquid Penetrant Testing (PT) Courses
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
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
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center mr-3 font-bold text-cyan-700">
                ET
              </span>
              Eddy Current Testing (ET) Courses
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
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
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 font-bold text-indigo-700">
                +
              </span>
              Specialized & Advanced Courses
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
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

        {/* Training Benefits */}
        <section className="container bg-muted/30 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8">Benefits of NDT Training in {city.name}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Industry-Recognized Certification</h3>
                  <p className="text-sm text-muted-foreground mt-1">ASNT certifications are recognized globally and valued by employers across industries.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Career Advancement</h3>
                  <p className="text-sm text-muted-foreground mt-1">NDT certifications open doors to better positions and higher earning potential.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Practical Hands-On Training</h3>
                  <p className="text-sm text-muted-foreground mt-1">Learn from experienced instructors using real equipment and materials.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Multiple Method Options</h3>
                  <p className="text-sm text-muted-foreground mt-1">Choose to specialize in UT, RT, MT, PT, ET, or any combination of NDT methods.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Local Networking</h3>
                  <p className="text-sm text-muted-foreground mt-1">Build professional relationships with instructors and classmates in the {city.name} area.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Job Placement Support</h3>
                  <p className="text-sm text-muted-foreground mt-1">Access to job boards and connection opportunities with {city.name} employers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Context */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">NDT Career Opportunities in {city.name}</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {city.name}'s strong industrial base creates abundant career opportunities for certified NDT inspectors. Key industries driving demand for NDT expertise include:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {city.industries.map((industry, idx) => (
              <div key={idx} className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">{industry}</h3>
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
                <p className="text-xs font-medium text-primary">Typical positions: NDT Level I/II/III, Quality Control Inspector, Inspection Engineer</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certification Process */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">NDT Certification Process</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-6">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Classroom Training</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Complete structured classroom training in the chosen NDT method covering theory, principles, and best practices.
                  </p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-6">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Hands-On Practice</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Perform supervised practical work with actual NDT equipment on real test materials to develop inspection skills.
                  </p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-6">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold">Work Experience</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Complete required hours of documented work experience (varies by level and method) under qualified supervision.
                  </p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-6">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold">ASNT Examination</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pass ASNT certification exam(s) demonstrating knowledge and competency. Written and practical exams required for Level II and III.
                  </p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-6">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-semibold">Certification Issued</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upon passing, you receive your ASNT NDT Inspector certification card, valid for 5 years with continuing education requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Training FAQs</h2>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">How long does NDT certification take?</h3>
              <p className="text-muted-foreground">
                Training duration varies by method and level. Level I courses typically take 30-40 hours, Level II 50-60 hours, and Level III 100-120 hours. Additional work experience hours (100-1000+ depending on level) must be completed after training.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">What are the prerequisites for NDT training?</h3>
              <p className="text-muted-foreground">
                Most programs require high school graduation or equivalent. No prior NDT experience is necessary for Level I, though some employers prefer candidates with mechanical or technical backgrounds.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Can I train in multiple NDT methods?</h3>
              <p className="text-muted-foreground">
                Yes! Many professionals become certified in multiple methods. Training is method-specific, so you can pursue certifications in UT, RT, MT, PT, ET, and other methods to expand your career options.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">How much does NDT training cost?</h3>
              <p className="text-muted-foreground">
                Cost varies by provider, method, and level. Level I courses typically range from $500-1,000, while Level II and III courses are more expensive. Some employers cover training costs for employees.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">How long is the NDT certification valid?</h3>
              <p className="text-muted-foreground">
                ASNT NDT certifications are valid for 5 years. To maintain your certification, you must complete continuing education requirements and renew your certification before it expires.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your NDT Career?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Enroll in NDT training in {city.name} today and take the first step toward a rewarding career in Non-Destructive Testing.
          </p>
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
            Enroll Now
          </button>
        </section>

        {/* Related Pages */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Explore More in {city.name}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href={`/cities/${citySlug}`}
              className="border rounded-lg p-6 hover:shadow-lg hover:border-primary transition group"
            >
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                NDT Services in {city.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Discover all NDT inspection services and certified providers available in {city.name}.
              </p>
            </Link>
            <Link
              href="/"
              className="border rounded-lg p-6 hover:shadow-lg hover:border-primary transition group"
            >
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                NDT Methods & Services
              </h3>
              <p className="text-sm text-muted-foreground">
                Learn about all NDT methods including UT, RT, MT, PT, ET, and advanced techniques.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
