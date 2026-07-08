import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import type { SimulationBaseline } from '@/services/simulationService';

interface Props {
  baseline: SimulationBaseline;
  projectedScore: number;
  projectedBadge: string;
  projectedRisk: string;
}

export function TrustComparison({ baseline, projectedScore, projectedBadge, projectedRisk }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
      
      {/* Today State */}
      <div className="w-full md:w-[45%] bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-300"></span> Today
        </h4>
        
        <div className="flex items-end gap-3 mb-6">
          <span className="text-5xl font-black text-slate-800">{baseline.score}</span>
          <span className="text-xs font-bold text-slate-500 mb-1.5 uppercase">Trust Score</span>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
           <div className="flex items-center justify-between">
             <span className="text-xs font-bold text-slate-500 uppercase">Governance Badge</span>
             <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
               <ShieldAlert className="w-3.5 h-3.5" />
               <span className="text-xs font-bold">{baseline.badge}</span>
             </div>
           </div>
           <div className="flex items-center justify-between">
             <span className="text-xs font-bold text-slate-500 uppercase">Risk Level</span>
             <div className="flex items-center gap-1.5 text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
               <AlertTriangle className="w-3.5 h-3.5" />
               <span className="text-xs font-bold">{baseline.risk}</span>
             </div>
           </div>
        </div>
      </div>

      {/* Center Animated Arrow */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-12 h-12 rounded-full bg-white border-2 border-indigo-100 flex items-center justify-center shadow-md text-indigo-500"
        >
          <ArrowRight className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Projected State */}
      <div className="w-full md:w-[45%] bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-10">
          <ShieldCheck className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <h4 className="text-[10px] uppercase font-bold text-indigo-200 tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span> After Improvements
          </h4>
          
          <div className="flex items-end gap-3 mb-6">
            <motion.span 
              key={projectedScore} // Key forces re-animation on value change
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black text-white drop-shadow-md"
            >
              {projectedScore}
            </motion.span>
            <span className="text-xs font-bold text-indigo-200 mb-1.5 uppercase">Trust Score</span>
          </div>

          <div className="space-y-4 pt-4 border-t border-indigo-500/50">
             <div className="flex items-center justify-between">
               <span className="text-xs font-bold text-indigo-200 uppercase">Governance Badge</span>
               <motion.div 
                 key={projectedBadge}
                 initial={{ y: 5, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 className="flex items-center gap-1.5 text-emerald-900 bg-emerald-400 px-2.5 py-1 rounded-md border border-emerald-300 shadow-sm"
               >
                 <ShieldCheck className="w-3.5 h-3.5" />
                 <span className="text-xs font-bold">{projectedBadge}</span>
               </motion.div>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-xs font-bold text-indigo-200 uppercase">Risk Level</span>
               <motion.div 
                 key={projectedRisk}
                 initial={{ y: 5, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 className="flex items-center gap-1.5 text-blue-900 bg-blue-300 px-2.5 py-1 rounded-md border border-blue-400 shadow-sm"
               >
                 <CheckCircle2 className="w-3.5 h-3.5" />
                 <span className="text-xs font-bold">{projectedRisk}</span>
               </motion.div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}
