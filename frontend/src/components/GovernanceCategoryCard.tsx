import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, ChevronUp, AlertTriangle, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { CategoryDeepDive } from '@/services/advancedRecommendationService';

export function GovernanceCategoryCard({ data }: { data: CategoryDeepDive }) {
  const [expanded, setExpanded] = useState(false);

  const getStatusConfig = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High': return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
      case 'Medium': return { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
      case 'Low': return { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
      default: return { color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' };
    }
  };

  const config = getStatusConfig(data.riskLevel);

  return (
    <Card className={`border ${expanded ? 'border-indigo-300 shadow-md' : 'border-slate-200 shadow-sm'} overflow-hidden transition-all bg-white`}>
      <CardContent className="p-0">
        
        <div 
          className="p-5 cursor-pointer flex items-center justify-between group hover:bg-slate-50 transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-colors">
               <Shield className="w-6 h-6 text-slate-600 group-hover:text-indigo-600" />
             </div>
             <div>
               <h3 className="font-bold text-slate-900 text-lg">{data.category}</h3>
               <div className="flex items-center gap-2 mt-1 text-xs font-semibold text-slate-500">
                 <span>Score: <span className={config.color}>{data.score}/100</span></span>
                 <span>•</span>
                 <span>{data.maturity}</span>
               </div>
             </div>
           </div>
           
           <div className="flex items-center gap-4">
             <Badge variant="outline" className={`${config.bg} ${config.color} ${config.border} uppercase font-bold tracking-wider`}>
               {data.riskLevel} Risk
             </Badge>
             <div className="text-slate-400">
               {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
             </div>
           </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-slate-100 bg-slate-50/50"
            >
               <div className="p-6">
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                   <div>
                     <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                       <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" /> Observed Issues
                     </h5>
                     <ul className="space-y-2">
                       {data.observedIssues.map((issue, i) => (
                         <li key={i} className="flex items-start text-sm text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                           <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 mr-2 shrink-0"></span>
                           {issue}
                         </li>
                       ))}
                     </ul>
                   </div>
                   
                   <div>
                     <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                       <TrendingUp className="w-4 h-4 mr-2 text-indigo-500" /> Business Impact
                     </h5>
                     <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-sm text-slate-700 h-full">
                       {data.businessImpact}
                     </div>
                   </div>
                 </div>

                 <div className="bg-white p-4 rounded-xl border border-slate-200">
                   <div className="flex justify-between items-end mb-2">
                     <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Score Projection</h5>
                     <div className="flex items-center gap-2">
                       <span className="text-xl font-black text-slate-400 line-through">{data.score}</span>
                       <span className="text-emerald-500 font-bold">→</span>
                       <span className="text-2xl font-black text-emerald-600">{data.targetScore}</span>
                     </div>
                   </div>
                   <Progress value={(data.targetScore / 100) * 100} className="h-2 bg-slate-100 [&>div]:bg-emerald-500" />
                   <div className="mt-2 flex justify-between items-center text-xs font-bold text-slate-400">
                     <span>Current</span>
                     <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Target Achievable in 30 Days</span>
                   </div>
                 </div>

               </div>
            </motion.div>
          )}
        </AnimatePresence>

      </CardContent>
    </Card>
  );
}
