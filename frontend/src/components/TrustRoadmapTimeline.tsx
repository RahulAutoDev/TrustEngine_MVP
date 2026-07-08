import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Target, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';
import { TrustMilestoneCard } from './TrustMilestoneCard';
import type { TransformationPhase } from '@/services/roadmapService';

export function TrustRoadmapTimeline({ phases }: { phases: TransformationPhase[] }) {
  return (
    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-indigo-100 before:via-indigo-300 before:to-indigo-100">
      {phases.map((phase, i) => (
        <motion.div 
          key={phase.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15, type: 'spring' }}
          className="relative flex flex-col md:flex-row items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
        >
          {/* Central Timeline Marker */}
          <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-white bg-indigo-600 text-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
            <span className="text-sm font-black uppercase">P{i + 1}</span>
          </div>
          
          {/* Phase Content Box */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] mt-4 md:mt-0">
             <Card className="border-indigo-100 shadow-md bg-gradient-to-br from-white to-slate-50 overflow-hidden">
               <div className="bg-slate-900 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <div>
                   <h3 className="text-lg font-black text-white">{phase.title}: {phase.subtitle}</h3>
                   <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{phase.timeframe}</span>
                 </div>
                 <div className="bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/30 flex items-center gap-2">
                   <TrendingUp className="w-4 h-4 text-emerald-400" />
                   <span className="text-xs font-bold text-white uppercase">Score: {phase.expectedScore}</span>
                 </div>
               </div>
               
               <CardContent className="p-6">
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                   <div>
                     <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                       <Target className="w-3.5 h-3.5 text-indigo-500" /> Objectives
                     </h5>
                     <ul className="space-y-1.5">
                       {phase.objectives.map((obj, j) => (
                         <li key={j} className="text-xs font-bold text-slate-700 flex items-start gap-2">
                           <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 shrink-0"></span> {obj}
                         </li>
                       ))}
                     </ul>
                   </div>
                   
                   <div>
                     <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                       <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Business Benefits
                     </h5>
                     <ul className="space-y-1.5">
                       {phase.businessBenefits.map((ben, j) => (
                         <li key={j} className="text-xs font-bold text-slate-700 flex items-start gap-2">
                           <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 shrink-0"></span> {ben}
                         </li>
                       ))}
                     </ul>
                   </div>
                 </div>

                 <div className="mb-6">
                   <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                     <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Executive Quick Wins
                   </h5>
                   <div className="flex flex-wrap gap-2">
                     {phase.quickWins.map((win, j) => (
                       <span key={j} className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 shadow-sm">
                         {win}
                       </span>
                     ))}
                   </div>
                 </div>

                 <div className="space-y-4 border-t border-slate-100 pt-6">
                   <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Recommended Actions</h5>
                   {phase.recommendations.map(task => (
                     <TrustMilestoneCard key={task.id} task={task} />
                   ))}
                 </div>

               </CardContent>
             </Card>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
