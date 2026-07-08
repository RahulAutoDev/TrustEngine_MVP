import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, AlertTriangle, TrendingDown, Clock, Activity } from 'lucide-react';
import type { CopilotRecommendation } from '@/services/copilotService';

export function RecommendationCard({ recommendation }: { recommendation: CopilotRecommendation }) {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'HIGH': return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: <Target className="w-5 h-5 text-red-600" /> };
      case 'MEDIUM': return { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: <AlertTriangle className="w-5 h-5 text-amber-600" /> };
      case 'LOW': return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: <TrendingDown className="w-5 h-5 text-blue-600" /> };
      default: return { color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', icon: <Activity className="w-5 h-5 text-slate-600" /> };
    }
  };

  const config = getPriorityConfig(recommendation.priority);

  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.bg}`}>
              {config.icon}
            </div>
            <h4 className="font-bold text-slate-900 text-base">{recommendation.title}</h4>
          </div>
          <Badge variant="outline" className={`text-[10px] uppercase tracking-wider font-bold ${config.color} ${config.bg} ${config.border} px-2 py-0.5`}>
            {recommendation.priority} Priority
          </Badge>
        </div>
        
        <p className="text-sm text-slate-600 mb-4 pl-12">{recommendation.description}</p>
        
        <div className="grid grid-cols-2 gap-3 pl-12">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Impact</span>
            <span className="text-xs font-semibold text-slate-700">{recommendation.businessImpact}</span>
          </div>
          <div className="bg-green-50 p-2.5 rounded-lg border border-green-100 flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-green-600/70">Trust Improvement</span>
            <span className="text-xs font-bold text-green-700">+{recommendation.estimatedTrustImprovement} Pts</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-between col-span-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{recommendation.timeline}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Activity className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{recommendation.effort} Effort</span>
              </div>
            </div>
            <Badge variant="secondary" className="bg-slate-200 text-slate-600 hover:bg-slate-200 text-[10px]">Not Started</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
