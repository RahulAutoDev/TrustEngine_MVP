import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, AlertTriangle, TrendingDown, Clock, Activity, Users, CheckCircle2, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AdvancedRecommendation } from '@/services/advancedRecommendationService';

export function AdvancedRecommendationCard({ recommendation }: { recommendation: AdvancedRecommendation }) {
  const [expanded, setExpanded] = useState(false);

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'HIGH': return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: <Target className="w-6 h-6 text-red-600" /> };
      case 'MEDIUM': return { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: <AlertTriangle className="w-6 h-6 text-amber-600" /> };
      case 'LOW': return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: <TrendingDown className="w-6 h-6 text-blue-600" /> };
      default: return { color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', icon: <Activity className="w-6 h-6 text-slate-600" /> };
    }
  };

  const config = getPriorityConfig(recommendation.priority);

  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden bg-white">
      <CardContent className="p-0">
        
        {/* Header Section (Always Visible) */}
        <div 
          className="p-6 cursor-pointer flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-start gap-4 flex-1">
             <div className={`p-3 rounded-xl ${config.bg} shrink-0 border ${config.border}`}>
               {config.icon}
             </div>
             <div>
               <div className="flex items-center gap-2 mb-1.5">
                 <Badge variant="outline" className={`text-[10px] uppercase tracking-wider font-bold ${config.color} ${config.bg} ${config.border} px-2 py-0`}>
                   {recommendation.priority} Priority
                 </Badge>
                 <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 text-[10px] uppercase tracking-wider">
                   {recommendation.category}
                 </Badge>
               </div>
               <h4 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{recommendation.title}</h4>
               <p className="text-sm text-slate-500 mt-1 line-clamp-1">{recommendation.description}</p>
             </div>
          </div>
          
          <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-green-600/70 mb-1">Impact</span>
              <span className="text-lg font-black text-green-600">+{recommendation.estimatedTrustIncrease} Pts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Effort</span>
              <span className="text-sm font-bold text-slate-700">{recommendation.effort}</span>
            </div>
            <div className="text-slate-400 group-hover:text-indigo-500 transition-colors">
              {expanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </div>
          </div>
        </div>

        {/* Expanded Details Section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-slate-100 bg-slate-50/50"
            >
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="space-y-6">
                   <div>
                     <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                       <ShieldAlert className="w-4 h-4 mr-2 text-red-400" /> Current Problem
                     </h5>
                     <p className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">{recommendation.currentProblem}</p>
                   </div>
                   
                   <div>
                     <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                       <Target className="w-4 h-4 mr-2 text-indigo-400" /> Why It Matters
                     </h5>
                     <p className="text-sm text-slate-700 bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">{recommendation.whyItMatters}</p>
                   </div>
                   
                   <div>
                     <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Risks if Ignored</h5>
                     <p className="text-sm text-red-600 font-medium">{recommendation.risksIfIgnored}</p>
                   </div>
                </div>

                <div className="space-y-6">
                   <div>
                     <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                       <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Expected Outcome
                     </h5>
                     <p className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">{recommendation.expectedOutcome}</p>
                   </div>

                   <div>
                     <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Success Criteria</h5>
                     <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm p-3 rounded-lg font-medium">
                        <Activity className="w-4 h-4 shrink-0" /> {recommendation.successCriteria}
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white p-3 rounded-lg border border-slate-200">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Users className="w-3 h-3"/> Owner</span>
                       <p className="text-sm font-bold text-slate-800 mt-1">{recommendation.owner}</p>
                     </div>
                     <div className="bg-white p-3 rounded-lg border border-slate-200">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Clock className="w-3 h-3"/> Timeline</span>
                       <p className="text-sm font-bold text-slate-800 mt-1">{recommendation.timeline}</p>
                     </div>
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
