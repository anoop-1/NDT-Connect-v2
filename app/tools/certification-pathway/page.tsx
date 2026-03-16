// src/app/tools/certification-pathway/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, ArrowRight, ArrowLeft, CheckCircle, Clock, BookOpen, DollarSign, GraduationCap } from 'lucide-react';

type CertPath = {
  certification: string;
  slug: string;
  levels: { name: string; requirements: string; timeframe: string; cost: string }[];
  description: string;
  bestFor: string[];
  industries: string[];
};

const certPaths: CertPath[] = [
  {
    certification: 'ASNT SNT-TC-1A',
    slug: 'asnt-snt-tc-1a',
    description: 'The most widely used NDT personnel qualification standard in the Americas. Employer-based certification program.',
    bestFor: ['New NDT technicians', 'US-based professionals', 'Multi-method certification seekers'],
    industries: ['Oil & Gas', 'Manufacturing', 'Power Generation', 'Aerospace'],
    levels: [
      { name: 'Level I', requirements: 'Training hours (40-80 hrs depending on method) + OJT hours + written/practical exam', timeframe: '3-6 months', cost: '$500-$1,500' },
      { name: 'Level II', requirements: 'Additional training hours + OJT hours + written/practical exam + Level I experience', timeframe: '1-2 years after Level I', cost: '$1,000-$2,500' },
      { name: 'Level III', requirements: 'Significant experience + education requirements + comprehensive written/practical exams', timeframe: '3-5 years total NDT experience', cost: '$2,000-$4,000' },
    ],
  },
  {
    certification: 'ASNT ACCP (Central Certification)',
    slug: 'asnt-accp',
    description: 'ASNT\'s central, portable certification program. Recognized globally and not tied to a single employer.',
    bestFor: ['Experienced technicians seeking portable credentials', 'Contractors and consultants', 'International work'],
    industries: ['Oil & Gas', 'Aerospace', 'Power Generation', 'Infrastructure'],
    levels: [
      { name: 'Level II ACCP', requirements: 'Meet education + experience prerequisites, pass general/specific/practical exams', timeframe: '2-4 years NDT experience required', cost: '$2,500-$4,000' },
      { name: 'Level III ACCP', requirements: 'Extensive experience + education requirements, comprehensive examination', timeframe: '5+ years NDT experience', cost: '$3,500-$5,500' },
    ],
  },
  {
    certification: 'ISO 9712',
    slug: 'iso-9712',
    description: 'International standard for NDT personnel qualification and certification. Widely recognized in Europe, Middle East, and Asia.',
    bestFor: ['International NDT professionals', 'Those seeking globally portable certification', 'European market access'],
    industries: ['Oil & Gas', 'Aerospace', 'Power Generation', 'Marine'],
    levels: [
      { name: 'Level 1', requirements: 'Approved training course + minimum experience + written/practical examination', timeframe: '3-6 months', cost: '$800-$2,000' },
      { name: 'Level 2', requirements: 'Additional training + experience as Level 1 + written/practical examination', timeframe: '1-3 years after Level 1', cost: '$1,500-$3,000' },
      { name: 'Level 3', requirements: 'Significant experience + advanced education + comprehensive examinations', timeframe: '4-6 years total experience', cost: '$3,000-$5,000' },
    ],
  },
  {
    certification: 'PCN (Personal Certification in NDT)',
    slug: 'pcn',
    description: 'UK-based certification scheme operated by the British Institute of NDT (BINDT). Highly regarded in UK, Europe, and Commonwealth nations.',
    bestFor: ['UK-based technicians', 'Offshore Oil & Gas workers', 'Those seeking European recognition'],
    industries: ['Oil & Gas', 'Offshore', 'Power Generation', 'Aerospace'],
    levels: [
      { name: 'Level 1', requirements: 'Approved training + experience logs + general/specific/practical exams', timeframe: '3-6 months', cost: '£600-£1,500' },
      { name: 'Level 2', requirements: 'Additional training + Level 1 experience + comprehensive examination', timeframe: '1-2 years after Level 1', cost: '£1,200-£2,500' },
      { name: 'Level 3', requirements: 'Extensive experience + advanced study + written/practical/oral examinations', timeframe: '4+ years experience', cost: '£2,500-£4,000' },
    ],
  },
  {
    certification: 'API Certifications',
    slug: 'api-certifications',
    description: 'American Petroleum Institute certifications specific to the oil and gas industry. Essential for refinery and pipeline inspection.',
    bestFor: ['Oil & Gas inspectors', 'Refinery and pipeline professionals', 'In-service inspection specialists'],
    industries: ['Oil & Gas', 'Petrochemical', 'Pipeline'],
    levels: [
      { name: 'API 510 (Pressure Vessel)', requirements: 'Education + experience prerequisites, 150-question closed-book exam', timeframe: '1-5 years inspection experience required', cost: '$600-$1,500' },
      { name: 'API 570 (Piping)', requirements: 'Education + experience prerequisites, 150-question closed-book exam', timeframe: '1-5 years inspection experience required', cost: '$600-$1,500' },
      { name: 'API 653 (Storage Tanks)', requirements: 'Education + experience prerequisites, 150-question closed-book exam', timeframe: '1-5 years inspection experience required', cost: '$600-$1,500' },
    ],
  },
  {
    certification: 'AWS CWI (Certified Welding Inspector)',
    slug: 'aws-cwi',
    description: 'American Welding Society certification for weld inspection. Essential for construction, fabrication, and structural welding oversight.',
    bestFor: ['Weld inspectors', 'QA/QC professionals', 'Construction inspection'],
    industries: ['Construction', 'Manufacturing', 'Structural Steel', 'Pipeline'],
    levels: [
      { name: 'CAWI (Associate)', requirements: 'Minimum education, fundamentals exam + visual acuity test', timeframe: 'Entry level', cost: '$1,100-$1,500' },
      { name: 'CWI', requirements: 'Education + experience, Part A (Fundamentals) + Part B (Practical) + Part C (Code)', timeframe: '2-5 years welding/inspection experience', cost: '$1,100-$2,000' },
      { name: 'SCWI (Senior)', requirements: 'Extensive CWI experience + advanced examination', timeframe: '6+ years as CWI', cost: '$1,500-$2,500' },
    ],
  },
];

type Step = 'goal' | 'experience' | 'region' | 'industry' | 'results';

export default function CertificationPathwayPage() {
  const [step, setStep] = useState<Step>('goal');
  const [goal, setGoal] = useState('');
  const [experience, setExperience] = useState('');
  const [region, setRegion] = useState('');
  const [industry, setIndustry] = useState('');

  const steps: Step[] = ['goal', 'experience', 'region', 'industry', 'results'];
  const currentIndex = steps.indexOf(step);

  const getRecommendations = (): CertPath[] => {
    let scored = certPaths.map((cert) => {
      let score = 0;

      // Goal matching
      if (goal === 'start-career') {
        if (cert.slug === 'asnt-snt-tc-1a' || cert.slug === 'iso-9712' || cert.slug === 'pcn') score += 3;
      } else if (goal === 'advance-career') {
        if (cert.slug === 'asnt-accp') score += 3;
        if (cert.slug === 'api-certifications') score += 2;
      } else if (goal === 'specialize') {
        if (cert.slug === 'api-certifications') score += 3;
        if (cert.slug === 'aws-cwi') score += 3;
      } else if (goal === 'portable-cert') {
        if (cert.slug === 'asnt-accp' || cert.slug === 'iso-9712') score += 3;
      }

      // Region matching
      if (region === 'americas') {
        if (cert.slug.startsWith('asnt') || cert.slug === 'api-certifications' || cert.slug === 'aws-cwi') score += 2;
      } else if (region === 'europe-uk') {
        if (cert.slug === 'pcn' || cert.slug === 'iso-9712') score += 3;
      } else if (region === 'middle-east') {
        if (cert.slug === 'asnt-accp' || cert.slug === 'iso-9712' || cert.slug === 'api-certifications') score += 2;
      } else if (region === 'asia-pacific') {
        if (cert.slug === 'iso-9712' || cert.slug === 'asnt-accp') score += 2;
      } else if (region === 'global') {
        if (cert.slug === 'asnt-accp' || cert.slug === 'iso-9712') score += 3;
      }

      // Industry matching
      if (industry === 'oil-gas') {
        if (cert.slug === 'api-certifications') score += 3;
        if (cert.industries.includes('Oil & Gas')) score += 1;
      } else if (industry === 'aerospace') {
        if (cert.industries.includes('Aerospace')) score += 2;
      } else if (industry === 'construction') {
        if (cert.slug === 'aws-cwi') score += 3;
      } else if (industry === 'power') {
        if (cert.industries.includes('Power Generation')) score += 2;
      } else if (industry === 'manufacturing') {
        if (cert.industries.includes('Manufacturing')) score += 2;
      }

      // Experience matching
      if (experience === 'none' && cert.levels.some(l => l.name.includes('Level I') || l.name.includes('Level 1') || l.name === 'CAWI (Associate)')) score += 1;
      if (experience === 'some' && cert.levels.length >= 2) score += 1;
      if (experience === 'experienced') score += 1;

      return { cert, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map((s) => s.cert);
  };

  const renderStep = () => {
    switch (step) {
      case 'goal':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">What is your certification goal?</h2>
            <p className="text-muted-foreground text-sm mb-6">Select the option that best describes what you want to achieve.</p>
            <div className="grid gap-3">
              {[
                { value: 'start-career', label: 'Start an NDT Career', desc: 'I\'m new to NDT and want my first certification' },
                { value: 'advance-career', label: 'Advance My Career', desc: 'I have NDT experience and want to level up' },
                { value: 'specialize', label: 'Specialize in an Industry', desc: 'I want industry-specific certifications (API, AWS, etc.)' },
                { value: 'portable-cert', label: 'Get Portable Certification', desc: 'I need credentials recognized internationally' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setGoal(opt.value); setStep('experience'); }}
                  className={`p-4 border rounded-lg text-left transition-colors hover:border-primary/50 hover:bg-primary/5 ${goal === opt.value ? 'border-primary bg-primary/5' : ''}`}
                >
                  <p className="font-medium">{opt.label}</p>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">What is your current NDT experience level?</h2>
            <p className="text-muted-foreground text-sm mb-6">This helps us recommend the right starting level.</p>
            <div className="grid gap-3">
              {[
                { value: 'none', label: 'No NDT Experience', desc: 'I\'m completely new to non-destructive testing' },
                { value: 'some', label: 'Some Experience (1-3 years)', desc: 'I have basic NDT knowledge or Level I certification' },
                { value: 'experienced', label: 'Experienced (3+ years)', desc: 'I have significant NDT experience or Level II certification' },
                { value: 'senior', label: 'Senior Professional (5+ years)', desc: 'I\'m an experienced NDT professional seeking Level III or specialty certs' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setExperience(opt.value); setStep('region'); }}
                  className={`p-4 border rounded-lg text-left transition-colors hover:border-primary/50 hover:bg-primary/5 ${experience === opt.value ? 'border-primary bg-primary/5' : ''}`}
                >
                  <p className="font-medium">{opt.label}</p>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'region':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Where will you primarily work?</h2>
            <p className="text-muted-foreground text-sm mb-6">Different regions recognize different certification schemes.</p>
            <div className="grid gap-3">
              {[
                { value: 'americas', label: 'Americas (US, Canada, Latin America)' },
                { value: 'europe-uk', label: 'Europe & United Kingdom' },
                { value: 'middle-east', label: 'Middle East & Africa' },
                { value: 'asia-pacific', label: 'Asia-Pacific' },
                { value: 'global', label: 'Global / Multiple Regions' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setRegion(opt.value); setStep('industry'); }}
                  className={`p-4 border rounded-lg text-left transition-colors hover:border-primary/50 hover:bg-primary/5 ${region === opt.value ? 'border-primary bg-primary/5' : ''}`}
                >
                  <p className="font-medium">{opt.label}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'industry':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">What industry do you work in (or want to)?</h2>
            <p className="text-muted-foreground text-sm mb-6">Some certifications are industry-specific.</p>
            <div className="grid gap-3">
              {[
                { value: 'oil-gas', label: 'Oil & Gas / Petrochemical' },
                { value: 'aerospace', label: 'Aerospace & Aviation' },
                { value: 'power', label: 'Power Generation & Nuclear' },
                { value: 'manufacturing', label: 'Manufacturing & Fabrication' },
                { value: 'construction', label: 'Construction & Infrastructure' },
                { value: 'general', label: 'General / Multiple Industries' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setIndustry(opt.value); setStep('results'); }}
                  className={`p-4 border rounded-lg text-left transition-colors hover:border-primary/50 hover:bg-primary/5 ${industry === opt.value ? 'border-primary bg-primary/5' : ''}`}
                >
                  <p className="font-medium">{opt.label}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'results': {
        const recommendations = getRecommendations();
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Recommended Certification Pathway</h2>
            <p className="text-muted-foreground text-sm mb-6">Based on your goals, experience, region, and industry, here are the best certifications for you.</p>
            <div className="space-y-6">
              {recommendations.map((cert, i) => (
                <Card key={cert.slug} className={i === 0 ? 'border-primary shadow-lg' : ''}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {i === 0 && <Badge className="bg-primary text-primary-foreground">Top Recommendation</Badge>}
                      {i === 1 && <Badge variant="secondary">Strong Alternative</Badge>}
                      {i === 2 && <Badge variant="outline">Also Consider</Badge>}
                    </div>
                    <CardTitle className="text-lg mt-2">{cert.certification}</CardTitle>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Best for:</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.bestFor.map((b) => (
                          <Badge key={b} variant="outline" className="text-xs">{b}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Industries:</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.industries.map((ind) => (
                          <Badge key={ind} variant="secondary" className="text-xs">{ind}</Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm font-medium mb-3">Certification Levels:</p>
                    <div className="space-y-3">
                      {cert.levels.map((level) => (
                        <div key={level.name} className="bg-muted/50 rounded-lg p-4">
                          <p className="font-medium text-sm flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-primary" /> {level.name}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" /> {level.requirements.slice(0, 60)}...
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {level.timeframe}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" /> {level.cost}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/certifications/${cert.slug}`}>
                          Full {cert.certification} Guide <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 bg-primary/5 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Next Steps</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Research training providers for your chosen certification</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Verify experience requirements with the certification body</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Register on NDT Connect to find inspection opportunities</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Connect with certified professionals for mentorship</li>
              </ul>
            </div>

            <div className="mt-6 flex gap-4">
              <Button variant="outline" onClick={() => { setStep('goal'); setGoal(''); setExperience(''); setRegion(''); setIndustry(''); }}>
                Start Over
              </Button>
              <Button asChild>
                <Link href="/register">Join NDT Connect <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-primary">Services</Link>
        <span>/</span>
        <span className="text-foreground">Certification Pathway</span>
      </nav>

      <h1 className="text-3xl font-bold text-primary mb-4">NDT Certification Pathway Planner</h1>
      <p className="text-muted-foreground mb-8">
        Not sure which NDT certification to pursue? Answer a few questions and we&apos;ll recommend the best certification pathway for your career goals, experience level, and industry.
      </p>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
              i < currentIndex ? 'bg-primary text-primary-foreground' :
              i === currentIndex ? 'bg-primary text-primary-foreground ring-2 ring-primary/30' :
              'bg-muted text-muted-foreground'
            }`}>
              {i < currentIndex ? <CheckCircle className="h-4 w-4" /> : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-6 ${i < currentIndex ? 'bg-primary' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Back button */}
      {currentIndex > 0 && (
        <button
          onClick={() => setStep(steps[currentIndex - 1])}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      )}

      {renderStep()}

      {/* SEO content below the tool */}
      <section className="mt-16 border-t pt-12">
        <h2 className="text-2xl font-semibold mb-4">Understanding NDT Certifications</h2>
        <p className="text-muted-foreground mb-4">
          Non-destructive testing certifications are essential credentials that validate an inspector&apos;s competence to perform specific testing methods. The NDT industry uses several certification schemes, each with different recognition, requirements, and levels.
        </p>
        <p className="text-muted-foreground mb-4">
          The most common certification programs include ASNT SNT-TC-1A (employer-based, widely used in the Americas), ASNT ACCP (central, portable certification), ISO 9712 (international standard), PCN (UK and Europe), API certifications (oil and gas specific), and AWS CWI (welding inspection).
        </p>
        <p className="text-muted-foreground mb-6">
          Choosing the right certification depends on your career goals, geographic location, industry focus, and experience level. Use the tool above to get personalized recommendations, or browse our detailed certification guides below.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {certPaths.map((cert) => (
            <Link key={cert.slug} href={`/certifications/${cert.slug}`} className="p-3 border rounded-lg text-center hover:border-primary/30 hover:bg-primary/5 transition-colors">
              <p className="text-sm font-medium">{cert.certification}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
