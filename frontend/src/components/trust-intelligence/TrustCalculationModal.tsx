import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';

import { PipelineDiagram } from './PipelineDiagram';
import { TrustFormulaCard } from './TrustFormulaCard';
import { ContributionChart } from './ContributionChart';
import { RiskContribution } from './RiskContribution';
import { DecisionLogicCard } from './DecisionLogicCard';
import { ExplainabilityCard } from './ExplainabilityCard';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  overallScore?: number;
}

export function TrustCalculationModal({ isOpen, onClose, overallScore = 84 }: ModalProps) {
  
  const recommendations = [
    { title: 'Implement Role Based Access Control', expectedGain: '+8', priority: 'HIGH', timeline: '0-30 Days', value: 'Reduced Security Risk' },
    { title: 'Establish Bias Monitoring', expectedGain: '+12', priority: 'HIGH', timeline: '0-30 Days', value: 'Reduced Ethical Risk' },
    { title: 'Publish Model Cards', expectedGain: '+5', priority: 'MEDIUM', timeline: '30-60 Days', value: 'Increased Executive Confidence' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] md:max-w-5xl h-[90vh] p-0 gap-0 overflow-hidden bg-slate-50/95 backdrop-blur-xl border-slate-200 shadow-2xl rounded-2xl flex flex-col">
        
        <DialogHeader className="px-6 py-6 border-b border-slate-200 bg-white shadow-sm shrink-0">
          <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
              <span className="text-xl">🧠</span>
            </div>
            Trust Intelligence Engine™
          </DialogTitle>
          <DialogDescription className="text-slate-500 font-medium mt-1">
            Explainable Trust Analysis • Transparent AI Governance Assessment
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-16 pb-12">
            
            {/* Step 1: Assessment Inputs */}
            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold">1</span>
                Assessment Inputs
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Organization', value: 'Global Corp' },
                  { label: 'Industry', value: 'Financial Services' },
                  { label: 'AI System', value: 'Customer Churn Predictor' },
                  { label: 'Assessment Version', value: 'v1.4' },
                  { label: 'Questions Answered', value: '45 / 50' },
                  { label: 'Completion', value: '90%' },
                  { label: 'Statistical Confidence', value: 'High' },
                  { label: 'Model Baseline', value: 'Deterministic' }
                ].map((input, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wider">{input.label}</div>
                    <div className="text-sm font-bold text-slate-800">{input.value}</div>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="bg-slate-200" />

            {/* Step 3: Pipeline Diagram (We skip showing raw governance cards here to save space, focus on pipeline) */}
            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold">2</span>
                Execution Pipeline
              </h3>
              <PipelineDiagram />
            </section>

            <Separator className="bg-slate-200" />

            {/* Step 4: Trust Formula */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold">3</span>
                  Score Calculation
                </h3>
                <TrustFormulaCard finalScore={overallScore} />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold">4</span>
                  Core Drivers
                </h3>
                <ContributionChart 
                  type="positive" 
                  items={[
                    'Excellent Privacy Governance',
                    'Strong Transparency Protocols',
                    'High Assessment Confidence'
                  ]} 
                />
                <ContributionChart 
                  type="negative" 
                  items={[
                    'Weak Security Governance',
                    'Missing Role-Based Access Control',
                    'Limited Audit Logging',
                    'Partial Bias Monitoring'
                  ]} 
                />
              </div>
            </section>

            <Separator className="bg-slate-200" />

            {/* Step 7 & 8: Risk and Decision Logic */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold">5</span>
                  Risk Breakdown
                </h3>
                <RiskContribution />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold">6</span>
                  Decision Path
                </h3>
                <DecisionLogicCard overallScore={overallScore} />
              </div>
            </section>

            {/* Step 9: AI Explanation */}
            <section>
              <ExplainabilityCard overallScore={overallScore} />
            </section>

            <Separator className="bg-slate-200" />

            {/* Step 10 & 11: Future Improvements */}
            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold">7</span>
                Improvement Roadmap
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {recommendations.map((rec, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col h-full">
                     <div className="flex justify-between items-start mb-3">
                        <Badge variant="outline" className={`text-[10px] uppercase font-bold ${rec.priority === 'HIGH' ? 'text-red-600 border-red-200 bg-red-50' : 'text-amber-600 border-amber-200 bg-amber-50'}`}>{rec.priority}</Badge>
                        <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 font-black border-none">{rec.expectedGain} Pts</Badge>
                     </div>
                     <h5 className="font-bold text-slate-800 mb-4">{rec.title}</h5>
                     
                     <div className="mt-auto space-y-2">
                       <div className="flex items-center text-xs text-slate-500">
                          <Target className="w-3 h-3 mr-2 text-indigo-500" />
                          <span className="font-medium">{rec.value}</span>
                       </div>
                       <div className="flex items-center text-xs text-slate-500">
                          <Calendar className="w-3 h-3 mr-2 text-emerald-500" />
                          <span className="font-medium">{rec.timeline}</span>
                       </div>
                     </div>
                  </div>
                ))}
              </div>

              {/* Projected Journey */}
              <div className="bg-slate-100/50 p-6 rounded-xl border border-slate-200 text-center">
                 <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Projected Trust Journey</h4>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center">
                       <span className="text-3xl font-black text-slate-700">{overallScore}</span>
                       <span className="text-xs text-slate-500 font-medium">Current</span>
                    </div>
                    <TrendingUp className="w-6 h-6 text-indigo-400 hidden sm:block" />
                    <div className="flex flex-col items-center">
                       <span className="text-3xl font-black text-indigo-500">88</span>
                       <span className="text-xs text-slate-500 font-medium">Month 1</span>
                    </div>
                    <TrendingUp className="w-6 h-6 text-indigo-400 hidden sm:block" />
                    <div className="flex flex-col items-center">
                       <span className="text-3xl font-black text-indigo-600">92</span>
                       <span className="text-xs text-slate-500 font-medium">Month 3</span>
                    </div>
                    <TrendingUp className="w-6 h-6 text-indigo-400 hidden sm:block" />
                    <div className="flex flex-col items-center">
                       <span className="text-3xl font-black text-emerald-600">95</span>
                       <span className="text-xs text-slate-500 font-medium">Target (Trust Champion)</span>
                    </div>
                 </div>
              </div>

            </section>

            {/* Step 12: Transparency Statement */}
            <p className="text-xs text-center text-slate-400 font-medium px-12">
              <AlertTriangle className="inline-block w-3 h-3 mr-1 mb-0.5" />
              This Trust Score is generated using a deterministic governance scoring model designed for the Trust Assessment Engine MVP. It is intended to provide explainable decision support and should not be interpreted as a regulatory certification.
            </p>

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
