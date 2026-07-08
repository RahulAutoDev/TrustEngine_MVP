import type { ReportDataPayload } from './ExecutiveReportTemplate';

export function ReportRoadmap({ data }: { data: ReportDataPayload }) {
  // Use provided roadmap or generate a generic one based on investments
  const roadmapSteps = data.roadmap && data.roadmap.length > 0 
    ? data.roadmap 
    : [
        { step: 1, title: 'Foundation & Discovery (30 Days)' },
        { step: 2, title: 'Core Implementation (90 Days)' },
        { step: 3, title: 'Advanced Monitoring (180 Days)' },
        { step: 4, title: 'Continuous Optimization (12 Months)' }
      ];

  return (
    <div className="w-full h-full p-12 flex flex-col">
      <div className="border-b border-slate-200 pb-6 mb-12">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Implementation Roadmap</h2>
        <p className="text-slate-500 font-medium mt-2 text-sm uppercase tracking-widest">
          Strategic Execution Timeline
        </p>
      </div>

      <div className="relative border-l-2 border-indigo-200 ml-6 space-y-12 pb-12">
        {roadmapSteps.map((item, idx) => (
          <div key={idx} className="relative pl-8">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm"></div>
            
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-1 block">Phase {item.step || idx + 1}</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Execute prioritized governance components including {data.investments[idx]?.title || 'policy standardizations'} to achieve targeted compliance benchmarks and systematically reduce operational risk.
              </p>
              
              <div className="flex gap-4 border-t border-slate-200 pt-4 mt-2">
                <div className="flex-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Target Completion</p>
                  <p className="text-sm font-semibold text-slate-900">Q{((idx % 4) + 1)} {new Date().getFullYear()}</p>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Expected Score</p>
                  <p className="text-sm font-black text-emerald-600">
                    {item.expectedScore ? `${item.expectedScore}%` : `${Math.min(100, data.trustScore + (idx + 1) * 5)}%`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
