"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';

const questions = [
  {
    id: 'defect-location',
    question: 'Where are the defects you need to detect?',
    options: [
      { label: 'Surface only', value: 'surface' },
      { label: 'Internal / subsurface', value: 'internal' },
      { label: 'Both surface and internal', value: 'both' },
      { label: 'Not sure', value: 'unsure' },
    ],
  },
  {
    id: 'material',
    question: 'What material are you inspecting?',
    options: [
      { label: 'Ferromagnetic steel/iron', value: 'ferromagnetic' },
      { label: 'Non-ferromagnetic metal (aluminum, stainless, titanium)', value: 'non-ferromagnetic' },
      { label: 'Composite / plastic', value: 'composite' },
      { label: 'Any / multiple materials', value: 'any' },
    ],
  },
  {
    id: 'application',
    question: 'What is the primary application?',
    options: [
      { label: 'Weld inspection', value: 'weld' },
      { label: 'Thickness / corrosion measurement', value: 'thickness' },
      { label: 'Crack detection', value: 'crack' },
      { label: 'Quality control in manufacturing', value: 'qc' },
      { label: 'Pipeline / long-range screening', value: 'pipeline' },
      { label: 'Tube / heat exchanger inspection', value: 'tube' },
    ],
  },
  {
    id: 'access',
    question: 'What access do you have?',
    options: [
      { label: 'Both sides accessible', value: 'both-sides' },
      { label: 'Single side only', value: 'single-side' },
      { label: 'Remote / difficult access', value: 'remote' },
      { label: 'Insulated / coated', value: 'insulated' },
    ],
  },
];

interface Recommendation {
  method: string;
  abbreviation: string;
  slug: string;
  score: number;
  reason: string;
}

function getRecommendations(answers: Record<string, string>): Recommendation[] {
  const recs: Recommendation[] = [];

  // UT
  let utScore = 50;
  if (answers['defect-location'] === 'internal' || answers['defect-location'] === 'both') utScore += 30;
  if (answers['application'] === 'thickness') utScore += 25;
  if (answers['application'] === 'weld') utScore += 20;
  if (answers['access'] === 'single-side') utScore += 15;
  recs.push({ method: 'Ultrasonic Testing', abbreviation: 'UT', slug: 'ultrasonic-testing', score: utScore, reason: 'Excellent for internal flaw detection and thickness measurement with single-sided access.' });

  // RT
  let rtScore = 40;
  if (answers['defect-location'] === 'internal') rtScore += 25;
  if (answers['application'] === 'weld') rtScore += 25;
  if (answers['access'] === 'both-sides') rtScore += 15;
  if (answers['material'] === 'any') rtScore += 10;
  recs.push({ method: 'Radiographic Testing', abbreviation: 'RT', slug: 'radiographic-testing', score: rtScore, reason: 'Provides permanent visual record of internal defects. Ideal for weld verification.' });

  // MT
  let mtScore = 35;
  if (answers['defect-location'] === 'surface') mtScore += 30;
  if (answers['material'] === 'ferromagnetic') mtScore += 30;
  if (answers['application'] === 'crack') mtScore += 20;
  recs.push({ method: 'Magnetic Particle Testing', abbreviation: 'MT', slug: 'magnetic-particle-testing', score: mtScore, reason: 'Fast and sensitive surface crack detection for ferromagnetic materials.' });

  // PT
  let ptScore = 30;
  if (answers['defect-location'] === 'surface') ptScore += 30;
  if (answers['material'] === 'non-ferromagnetic' || answers['material'] === 'any') ptScore += 25;
  if (answers['application'] === 'crack') ptScore += 15;
  recs.push({ method: 'Liquid Penetrant Testing', abbreviation: 'PT', slug: 'penetrant-testing', score: ptScore, reason: 'Works on any non-porous material. Simple, portable, and cost-effective for surface cracks.' });

  // ET
  let etScore = 30;
  if (answers['application'] === 'tube') etScore += 40;
  if (answers['defect-location'] === 'surface') etScore += 15;
  if (answers['material'] === 'non-ferromagnetic') etScore += 15;
  if (answers['access'] === 'insulated') etScore += 10;
  recs.push({ method: 'Eddy Current Testing', abbreviation: 'ET', slug: 'eddy-current-testing', score: etScore, reason: 'Ideal for tube inspection and surface crack detection. No couplant needed.' });

  // PAUT
  let pautScore = 45;
  if (answers['application'] === 'weld') pautScore += 30;
  if (answers['defect-location'] === 'both' || answers['defect-location'] === 'internal') pautScore += 20;
  if (answers['application'] === 'crack') pautScore += 15;
  recs.push({ method: 'Phased Array UT', abbreviation: 'PAUT', slug: 'phased-array-ut', score: pautScore, reason: 'Advanced imaging for critical weld inspection. Superior defect characterization.' });

  // GWT
  let gwtScore = 20;
  if (answers['application'] === 'pipeline') gwtScore += 50;
  if (answers['access'] === 'insulated' || answers['access'] === 'remote') gwtScore += 30;
  recs.push({ method: 'Guided Wave Testing', abbreviation: 'GWT', slug: 'guided-wave-testing', score: gwtScore, reason: 'Screens long pipe sections from a single point. Perfect for insulated or buried piping.' });

  return recs.sort((a, b) => b.score - a.score).slice(0, 4);
}

export default function MethodSelectorPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const recommendations = showResults ? getRecommendations(answers) : [];

  return (
    <div className="max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-primary">Services</Link>
        <span>/</span>
        <span className="text-foreground">NDT Method Selector</span>
      </nav>

      <h1 className="text-3xl font-bold text-primary mb-4">NDT Method Selector Tool</h1>
      <p className="text-muted-foreground mb-8">
        Answer a few questions about your inspection needs and we will recommend the best NDT method for your application.
      </p>

      {!showResults ? (
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge>Question {currentQuestion + 1} of {questions.length}</Badge>
              <span className="text-sm text-muted-foreground">{Math.round(((currentQuestion) / questions.length) * 100)}% complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${(currentQuestion / questions.length) * 100}%` }} />
            </div>
            <CardTitle className="text-xl">{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left p-4 border rounded-lg hover:bg-primary/5 hover:border-primary transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-primary">Recommended NDT Methods</h2>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="h-4 w-4 mr-2" /> Start Over
            </Button>
          </div>

          {recommendations.map((rec, i) => (
            <Card key={rec.slug} className={i === 0 ? 'border-primary border-2' : ''}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {i === 0 && <Badge className="bg-green-500">Best Match</Badge>}
                    <Badge variant="outline">{rec.abbreviation}</Badge>
                  </div>
                  <span className="text-sm font-semibold text-primary">{rec.score}% match</span>
                </div>
                <CardTitle className="text-lg">{rec.method}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{rec.reason}</p>
                <div className="flex gap-3">
                  <Button size="sm" asChild>
                    <Link href={`/services/${rec.slug}`}>Learn About {rec.abbreviation} <ArrowRight className="h-3 w-3 ml-1" /></Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/find-providers">Find {rec.abbreviation} Inspectors</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Not sure about the recommendation? Post a service request and let our expert inspectors advise you.
            </p>
            <Button asChild>
              <Link href="/request-service">Post a Service Request</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
