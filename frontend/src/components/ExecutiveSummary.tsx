import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';
import type { CopilotResponse } from '@/services/copilotService';

export function ExecutiveSummary({ summary }: { summary: CopilotResponse['executiveSummary'] }) {
  return (
    <div className="space-y-6">
      
      {/* Narrative Summary */}
      <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100">
        <h4 className="text-sm font-bold text-indigo-900 mb-2 flex items-center">
          <ShieldCheck className="w-4 h-4 mr-2 text-indigo-600" /> Executive Analysis
        </h4>
        <p className="text-sm text-slate-700 leading-relaxed font-medium">
          {summary.maturity} {summary.risks} {summary.businessImpact}
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Critical Weakness */}
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-2 bg-red-50 rounded-lg shrink-0">
              <ShieldAlert className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Critical Gap</p>
              <p className="text-sm font-bold text-slate-800">{summary.criticalWeakness}</p>
            </div>
          </CardContent>
        </Card>

        {/* Regulatory Readiness */}
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardContent className="p-4 flex items-start gap-3">
             <div className="p-2 bg-amber-50 rounded-lg shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Readiness</p>
              <p className="text-sm font-bold text-slate-800">{summary.regulatoryReadiness}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Why This Matters */}
      <div className="border-l-4 border-indigo-500 pl-4 py-1">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Why This Matters</h4>
        <p className="text-sm text-slate-600 italic">"{summary.explanation}"</p>
      </div>
      
    </div>
  );
}
