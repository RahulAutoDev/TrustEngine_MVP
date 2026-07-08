import { Target, ShieldAlert, Sparkles, ShieldCheck, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AdvancedRecommendationsOutput } from '@/services/advancedRecommendationService';

export function ExecutiveAnalysis({ data }: { data: AdvancedRecommendationsOutput['executiveAnalysis'] }) {
  return (
    <Card className="border-indigo-100 bg-white shadow-sm overflow-hidden h-full">
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white tracking-tight">AI Executive Analysis</h3>
        </div>
        <Badge variant="outline" className="border-slate-700 text-slate-300 bg-slate-800 text-[10px] uppercase font-bold tracking-wider">
          Trust Copilot Generated
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="bg-indigo-50/50 border border-indigo-100 p-5 rounded-xl mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          <p className="text-slate-700 font-serif italic text-lg leading-relaxed">
            "{data.executiveSummary}"
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5 mb-2"><Activity className="w-3.5 h-3.5"/> Governance Maturity</span>
            <span className="text-sm font-black text-indigo-900">{data.currentMaturity}</span>
          </div>
          <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5 mb-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500"/> Regulatory Readiness</span>
            <span className="text-sm font-black text-slate-800">{data.regulatoryReadiness}</span>
          </div>
          <div className="bg-red-50/50 border border-red-100 p-4 rounded-xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-red-500/70 flex items-center gap-1.5 mb-2"><ShieldAlert className="w-3.5 h-3.5 text-red-500"/> Critical Weakness</span>
            <span className="text-sm font-black text-red-700">{data.mostCriticalWeakness}</span>
          </div>
          <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-indigo-500/70 flex items-center gap-1.5 mb-2"><Target className="w-3.5 h-3.5 text-indigo-500"/> Recommendation</span>
            <span className="text-sm font-bold text-indigo-900">{data.deploymentRecommendation}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
