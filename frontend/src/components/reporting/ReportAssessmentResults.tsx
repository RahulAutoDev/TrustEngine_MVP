import type { ReportDataPayload } from './ExecutiveReportTemplate';
import { CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export function ReportAssessmentResults({ data }: { data: ReportDataPayload }) {
  return (
    <div className="w-full h-full p-12 flex flex-col">
      <div className="border-b border-slate-200 pb-6 mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Assessment Results</h2>
        <p className="text-slate-500 font-medium mt-2 text-sm uppercase tracking-widest">
          Detailed Findings by Governance Category
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(data.categoryScores).map(([cat, score], index) => {
          const status = score >= 80 ? 'Optimal' : score >= 50 ? 'Developing' : 'Critical';
          const StatusIcon = score >= 80 ? CheckCircle2 : score >= 50 ? AlertTriangle : ShieldAlert;
          const statusColor = score >= 80 ? 'text-emerald-600' : score >= 50 ? 'text-amber-500' : 'text-red-500';
          const bg = score >= 80 ? 'bg-emerald-50' : score >= 50 ? 'bg-amber-50' : 'bg-red-50';

          return (
            <div key={index} className="border border-slate-200 rounded-xl p-6 bg-slate-50 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${bg}`}>
                    <StatusIcon className={`w-5 h-5 ${statusColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{cat}</h3>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded border ${statusColor} ${bg} border-current`}>
                    {status}
                  </span>
                  <span className="text-xl font-black text-slate-900 ml-4">{score}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Observations & Risks</p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {score >= 80 
                      ? `The organization demonstrates robust controls in ${cat}, with active monitoring and comprehensive documentation.` 
                      : `Significant gaps exist in ${cat} policies. Lack of formal oversight introduces operational and regulatory risk.`}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Key Recommendations</p>
                  <ul className="text-sm text-slate-700 leading-relaxed list-disc pl-4 space-y-1">
                    {data.recommendations.filter((r: any) => r.title && r.title.length > 0).slice(0, 2).map((rec: any, idx: number) => (
                      <li key={idx}>{rec.title}</li>
                    ))}
                    {data.recommendations.length === 0 && (
                      <li>Implement standard baseline controls for {cat}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
