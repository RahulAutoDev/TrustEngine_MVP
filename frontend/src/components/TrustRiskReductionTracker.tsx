import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import type { TransformationRoadmapData } from '@/services/roadmapService';

export function TrustRiskReductionTracker({ data }: { data: TransformationRoadmapData }) {
  const metrics = [
    { label: 'Risk Level', current: data.currentRiskLevel, target: data.targetRiskLevel, isGood: false },
    { label: 'Compliance', current: data.currentCompliance, target: data.targetCompliance, isGood: true },
    { label: 'Governance Badge', current: data.currentBadge, target: data.targetBadge, isGood: true }
  ];

  return (
    <Card className="border-slate-200 shadow-sm bg-white h-full">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-slate-800 font-bold flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          Risk Reduction Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        
        {metrics.map((metric, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between"
          >
             <div className="w-1/3">
               <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Current {metric.label}</span>
               <div className={`px-3 py-1.5 rounded-lg border font-bold text-sm inline-block ${
                 !metric.isGood && metric.current === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                 'bg-slate-50 text-slate-700 border-slate-200'
               }`}>
                 {metric.current}
               </div>
             </div>

             <div className="flex-1 flex justify-center text-slate-300">
               <ArrowRight className="w-5 h-5" />
             </div>

             <div className="w-1/3 text-right flex flex-col items-end">
               <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-1">Target {metric.label}</span>
               <div className="px-3 py-1.5 rounded-lg border font-bold text-sm inline-block bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm">
                 {metric.target}
               </div>
             </div>
          </motion.div>
        ))}

        <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Top Weakness</span>
            <span className="text-sm font-bold text-red-600 flex justify-center items-center gap-1.5">
               <ShieldAlert className="w-4 h-4" /> {data.topWeakness}
            </span>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Strongest Area</span>
            <span className="text-sm font-bold text-emerald-600 flex justify-center items-center gap-1.5">
               <CheckCircle2 className="w-4 h-4" /> {data.strongestArea}
            </span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
