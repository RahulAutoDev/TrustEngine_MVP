import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PortfolioExpectedReturns({ currentScore, projectedScore }: { currentScore: number, projectedScore: number }) {
  const currentBadge = "Governed AI";
  const futureBadge = "AI Trust Leader";

  return (
    <Card className="border-slate-200 shadow-sm bg-white h-full">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-slate-800 font-bold">Expected Returns</CardTitle>
      </CardHeader>
      <CardContent className="p-8 flex flex-col justify-center">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
          
          {/* Today State */}
          <div className="w-full md:w-[45%] bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
            <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-4">Current State</h4>
            <div className="flex flex-col items-center mb-4">
              <span className="text-5xl font-black text-slate-700">{currentScore}</span>
              <span className="text-xs font-bold text-slate-500 mt-1">Trust Score</span>
            </div>
            <div className="flex flex-col items-center pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 shadow-sm">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-sm font-bold">{currentBadge}</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border-2 border-indigo-100 items-center justify-center shadow-md">
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowRight className="w-6 h-6 text-indigo-500" />
            </motion.div>
          </div>

          {/* Future State */}
          <div className="w-full md:w-[45%] bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h4 className="text-[10px] uppercase font-bold text-indigo-200 tracking-widest mb-4">Projected State</h4>
              <div className="flex flex-col items-center mb-4">
                <motion.span 
                  initial={{ scale: 0.9 }} 
                  animate={{ scale: 1 }} 
                  className="text-6xl font-black text-white drop-shadow-md"
                >
                  {projectedScore}
                </motion.span>
                <span className="text-xs font-bold text-indigo-200 mt-1">Trust Score</span>
              </div>
              <div className="flex flex-col items-center pt-4 border-t border-indigo-500/50">
                <motion.div 
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 text-emerald-900 bg-emerald-400 px-4 py-2 rounded-full border border-emerald-300 shadow-lg"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-base font-bold">{futureBadge}</span>
                </motion.div>
              </div>
            </div>
          </div>

        </div>

        {/* Extra Return Details */}
        <div className="mt-8 grid grid-cols-2 gap-4">
           <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-between">
             <span className="text-xs font-bold text-slate-500 uppercase">Estimated Timeline</span>
             <span className="text-sm font-black text-slate-800">12 Weeks</span>
           </div>
           <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center justify-between">
             <span className="text-xs font-bold text-emerald-600 uppercase flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4"/> Compliance Ready</span>
             <span className="text-sm font-black text-emerald-700">100%</span>
           </div>
        </div>

      </CardContent>
    </Card>
  );
}
