import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, RotateCcw, Save, Download, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { simulationService, simulatorImprovements, type SimulationBaseline } from '@/services/simulationService';
import { ImprovementToggle } from './ImprovementToggle';
import { TrustComparison } from './TrustComparison';
import { BusinessImpactSummary } from './BusinessImpactSummary';
import { SimulationCharts } from './SimulationCharts';

export function TrustImpactSimulator({ trustScore }: { trustScore: number }) {
  const [activeImprovements, setActiveImprovements] = useState<string[]>([]);

  const baseline: SimulationBaseline = useMemo(() => ({
    score: trustScore,
    badge: 'Governed AI',
    risk: 'Medium',
    compliance: 65
  }), [trustScore]);

  const projection = useMemo(() => 
    simulationService.calculateProjection(baseline, activeImprovements),
  [baseline, activeImprovements]);

  const handleToggle = (id: string, active: boolean) => {
    setActiveImprovements(prev => 
      active ? [...prev, id] : prev.filter(i => i !== id)
    );
  };

  const resetSimulation = () => {
    setActiveImprovements([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="py-12 border-b-2 border-dashed border-slate-200 mb-12">
      
      {/* Section Header */}
      <div className="mb-10 text-center max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-indigo-600 border-indigo-200 bg-indigo-50 font-bold uppercase tracking-widest px-3 py-1">
          Interactive Decision Support
        </Badge>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3">
          <SlidersHorizontal className="w-8 h-8 text-indigo-600" />
          Trust Impact Simulator™
        </h2>
        <p className="text-lg text-slate-500 font-medium">
          Explore how governance improvements influence organizational AI trust.
        </p>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        
        {/* Core Visual Comparison & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <motion.div variants={itemVariants} className="lg:col-span-2">
             <TrustComparison 
               baseline={baseline} 
               projectedScore={projection.projectedScore}
               projectedBadge={projection.projectedBadge}
               projectedRisk={projection.projectedRisk}
             />
           </motion.div>
           <motion.div variants={itemVariants} className="lg:col-span-1">
             <SimulationCharts baseline={baseline} projectedScore={projection.projectedScore} />
           </motion.div>
        </div>

        {/* Business Impact KPIs */}
        <motion.div variants={itemVariants}>
           <BusinessImpactSummary totalRiskReduction={projection.totalRiskReduction} />
        </motion.div>

        {/* Executive Insight Summary */}
        <AnimatePresence>
          {activeImprovements.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 shadow-sm flex items-start gap-4 my-6">
                <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-widest mb-2">Executive Insight</h4>
                  <p className="text-indigo-900 font-medium leading-relaxed">
                    Implementing the selected <strong className="font-black text-indigo-600">{activeImprovements.length}</strong> governance improvements is projected to increase the Trust Score from <strong>{baseline.score}</strong> to <strong>{projection.projectedScore}</strong> while upgrading your badge to <strong>{projection.projectedBadge}</strong>.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggles */}
        <motion.div variants={itemVariants}>
           <div className="flex items-center justify-between mb-6">
             <h3 className="text-xl font-bold text-slate-800">Improvement Options</h3>
             <Button variant="outline" size="sm" onClick={resetSimulation} className="text-slate-500 font-bold" disabled={activeImprovements.length === 0}>
               <RotateCcw className="w-4 h-4 mr-2" /> Reset Simulation
             </Button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {simulatorImprovements.map(imp => (
               <ImprovementToggle 
                 key={imp.id} 
                 improvement={imp} 
                 isActive={activeImprovements.includes(imp.id)} 
                 onToggle={handleToggle}
               />
             ))}
           </div>
        </motion.div>

        {/* Actions */}
        <motion.div variants={itemVariants} className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
           <Button size="lg" className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto shadow-xl px-8 h-14">
             <Save className="w-5 h-5 mr-2" /> Save Scenario
           </Button>
           <Button size="lg" className="rounded-full bg-slate-900 hover:bg-slate-800 text-white w-full sm:w-auto shadow-xl px-8 h-14">
             <Download className="w-5 h-5 mr-2" /> Download Simulation Report
           </Button>
           <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto border-slate-300 font-bold text-slate-600 px-8 h-14">
             <FileText className="w-5 h-5 mr-2" /> Add to Executive Report
           </Button>
        </motion.div>

      </motion.div>
    </div>
  );
}
