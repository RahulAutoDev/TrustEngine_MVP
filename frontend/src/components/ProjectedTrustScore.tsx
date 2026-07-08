import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function ProjectedTrustScore({ currentScore, projectedScore }: { currentScore: number, projectedScore: number }) {
  return (
    <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-white shadow-sm h-full flex flex-col justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <TrendingUp className="w-24 h-24 text-emerald-600" />
      </div>
      <CardContent className="p-6 relative z-10 flex flex-col items-center justify-center text-center h-full">
        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-6">Projected Trust Score</h4>
        
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="flex flex-col items-center">
             <span className="text-3xl font-black text-slate-400">{currentScore}</span>
             <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Current</span>
          </div>
          
          <motion.div 
             initial={{ x: -10, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.5, type: 'spring' }}
          >
            <TrendingUp className="w-8 h-8 text-emerald-500" />
          </motion.div>
          
          <div className="flex flex-col items-center">
             <motion.span 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.8, type: 'spring', bounce: 0.5 }}
               className="text-5xl font-black text-emerald-600 drop-shadow-sm"
             >
               {projectedScore}
             </motion.span>
             <span className="text-[10px] uppercase font-bold text-emerald-600 mt-1 tracking-widest">Projected</span>
          </div>
        </div>
        
        <div className="bg-white px-4 py-2 rounded-full border border-emerald-100 flex items-center gap-2 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-bold text-slate-700">Confidence: <span className="text-emerald-600">96%</span></span>
          <span className="w-1 h-1 rounded-full bg-slate-300 mx-1"></span>
          <span className="text-xs font-bold text-slate-700">Improvement: <span className="text-emerald-600">+{projectedScore - currentScore}</span></span>
        </div>
      </CardContent>
    </Card>
  );
}
