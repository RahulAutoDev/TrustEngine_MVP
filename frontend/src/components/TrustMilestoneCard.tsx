import { Target, Users, Clock, Link as LinkIcon, TrendingUp } from 'lucide-react';
import type { TransformationTask } from '@/services/roadmapService';
import { Badge } from '@/components/ui/badge';

export function TrustMilestoneCard({ task }: { task: TransformationTask }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
           <div className="flex items-center gap-2 mb-2">
             <Badge variant="outline" className={`text-[10px] uppercase font-bold px-2 py-0.5 ${
               task.priority === 'HIGH' ? 'text-red-600 border-red-200 bg-red-50' :
               task.priority === 'MEDIUM' ? 'text-amber-600 border-amber-200 bg-amber-50' :
               'text-blue-600 border-blue-200 bg-blue-50'
             }`}>
               {task.priority}
             </Badge>
             <span className="text-xs font-bold text-slate-400">Target: {task.expectedCompletion}</span>
           </div>
           <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{task.title}</h4>
        </div>
        
        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
           <TrendingUp className="w-4 h-4 text-emerald-600" />
           <span className="text-xs font-bold text-emerald-700">+{task.trustScoreIncrease} Pts</span>
        </div>
      </div>

      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
         <p className="text-sm text-slate-600 font-medium flex items-start gap-2">
           <Target className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> {task.businessValue}
         </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
         <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
           <Users className="w-3.5 h-3.5 text-slate-400" /> Owner: <span className="font-bold text-slate-800">{task.owner}</span>
         </div>
         <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
           <Clock className="w-3.5 h-3.5 text-slate-400" /> Effort: <span className="font-bold text-slate-800">{task.estimatedEffort}</span>
         </div>
         <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
           <LinkIcon className="w-3.5 h-3.5 text-slate-400" /> Dep: <span className="font-bold text-slate-800">{task.dependencies}</span>
         </div>
      </div>

    </div>
  );
}
