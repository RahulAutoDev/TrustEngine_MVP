import { motion } from 'framer-motion';
import { ArrowDown, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ProjectedFutureState({ currentScore, projectedScore }: { currentScore: number, projectedScore: number }) {
  const currentBadge = "Governed AI";
  const futureBadge = "AI Trust Leader";

  return (
    <Card className="border-slate-200 shadow-sm bg-white h-full">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-slate-800 font-bold">Projected Future State</CardTitle>
      </CardHeader>
      <CardContent className="p-8 flex flex-col items-center justify-center">
        
        {/* Today State */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center relative">
          <div className="absolute top-3 left-3 bg-slate-200 text-slate-600 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">
            Today
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-4">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Trust Score</span>
              <span className="text-5xl font-black text-slate-700">{currentScore}</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-slate-200"></div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Governance Badge</span>
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-sm font-bold">{currentBadge}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="my-4 relative z-10 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shadow-sm"
          >
            <ArrowDown className="w-5 h-5 text-slate-400" />
          </motion.div>
        </div>

        {/* Future State */}
        <div className="w-full bg-gradient-to-br from-indigo-50 to-emerald-50 border border-indigo-100 rounded-2xl p-6 text-center relative shadow-inner">
          <div className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded shadow-sm">
            After Implementation
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-4">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-indigo-400 mb-1">Trust Score</span>
              <motion.span 
                initial={{ scale: 0.9 }} 
                animate={{ scale: 1 }} 
                className="text-6xl font-black text-indigo-700 drop-shadow-sm"
              >
                {projectedScore}
              </motion.span>
            </div>
            <div className="hidden md:block w-px h-12 bg-indigo-200"></div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-indigo-400 mb-1">Governance Badge</span>
              <motion.div 
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-4 py-2 rounded-full border border-emerald-300 shadow-sm"
              >
                <ShieldCheck className="w-5 h-5" />
                <span className="text-base font-bold">{futureBadge}</span>
              </motion.div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
