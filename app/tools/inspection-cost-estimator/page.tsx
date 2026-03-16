"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, ArrowRight, Info } from 'lucide-react';

const methodPricing: Record<string, { baseCost: number; perJoint: number; perMeter: number; label: string }> = {
  'ut': { baseCost: 300, perJoint: 45, perMeter: 15, label: 'Ultrasonic Testing (UT)' },
  'rt': { baseCost: 500, perJoint: 120, perMeter: 40, label: 'Radiographic Testing (RT)' },
  'mt': { baseCost: 200, perJoint: 30, perMeter: 10, label: 'Magnetic Particle Testing (MT)' },
  'pt': { baseCost: 200, perJoint: 25, perMeter: 8, label: 'Liquid Penetrant Testing (PT)' },
  'et': { baseCost: 400, perJoint: 55, perMeter: 20, label: 'Eddy Current Testing (ET)' },
  'paut': { baseCost: 600, perJoint: 150, perMeter: 50, label: 'Phased Array UT (PAUT)' },
  'tofd': { baseCost: 500, perJoint: 130, perMeter: 45, label: 'TOFD Testing' },
  'gwt': { baseCost: 800, perJoint: 0, perMeter: 5, label: 'Guided Wave Testing (GWT)' },
};

export default function CostEstimatorPage() {
  const [method, setMethod] = useState('ut');
  const [joints, setJoints] = useState(10);
  const [meters, setMeters] = useState(50);
  const [urgency, setUrgency] = useState('standard');

  const pricing = methodPricing[method];
  const baseCost = pricing.baseCost;
  const jointCost = joints * pricing.perJoint;
  const meterCost = meters * pricing.perMeter;
  const subtotal = baseCost + jointCost + meterCost;
  const urgencyMultiplier = urgency === 'urgent' ? 1.5 : urgency === 'rush' ? 2.0 : 1.0;
  const total = subtotal * urgencyMultiplier;

  return (
    <div className="max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-primary">Services</Link>
        <span>/</span>
        <span className="text-foreground">Cost Estimator</span>
      </nav>

      <h1 className="text-3xl font-bold text-primary mb-4">NDT Inspection Cost Estimator</h1>
      <p className="text-muted-foreground mb-8">
        Get a rough estimate for your NDT inspection costs. Actual pricing depends on location, complexity, and provider. Use NDT Connect to get real quotes from certified inspectors.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" /> Configure Your Estimate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">NDT Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full border rounded-lg p-2.5 text-sm bg-background"
              >
                {Object.entries(methodPricing).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Number of Weld Joints / Test Points</label>
              <input
                type="range" min="1" max="100" value={joints}
                onChange={(e) => setJoints(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>1</span><span className="font-medium text-foreground">{joints} joints</span><span>100</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Total Length / Area (meters)</label>
              <input
                type="range" min="0" max="500" step="10" value={meters}
                onChange={(e) => setMeters(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>0m</span><span className="font-medium text-foreground">{meters}m</span><span>500m</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Urgency</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'standard', label: 'Standard', desc: '1x rate' },
                  { value: 'urgent', label: 'Urgent', desc: '1.5x rate' },
                  { value: 'rush', label: 'Rush', desc: '2x rate' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setUrgency(opt.value)}
                    className={`p-3 border rounded-lg text-center transition-colors ${urgency === opt.value ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                  >
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estimated Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Mobilization / Setup</span><span>${baseCost.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{joints} joints × ${pricing.perJoint}</span><span>${jointCost.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{meters}m × ${pricing.perMeter}/m</span><span>${meterCost.toLocaleString()}</span></div>
                {urgencyMultiplier > 1 && (
                  <div className="flex justify-between text-amber-600"><span>{urgency === 'rush' ? 'Rush' : 'Urgency'} premium</span><span>×{urgencyMultiplier}</span></div>
                )}
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Estimated Total</span>
                  <span className="text-primary">${Math.round(total).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              This is a rough estimate only. Actual costs vary significantly based on location, equipment requirements, surface preparation, accessibility, reporting needs, and provider rates. Get actual quotes through NDT Connect.
            </p>
          </div>

          <Button size="lg" className="w-full" asChild>
            <Link href="/request-service">Get Real Quotes from Inspectors <ArrowRight className="h-4 w-4 ml-2" /></Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full" asChild>
            <Link href="/find-providers">Browse NDT Providers</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
