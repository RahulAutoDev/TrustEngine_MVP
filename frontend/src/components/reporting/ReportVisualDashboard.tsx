import type { ReportDataPayload } from './ExecutiveReportTemplate';

export function ReportVisualDashboard({ data }: { data: ReportDataPayload }) {
  return (
    <div className="w-full h-full p-12 flex flex-col">
      <div className="border-b border-slate-200 pb-6 mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Visual Dashboard</h2>
        <p className="text-slate-500 font-medium mt-2 text-sm uppercase tracking-widest">
          Key Performance Indicators
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Category Score Bar Charts (CSS based for perfect PDF rendering) */}
        <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Category Performance</h3>
          <div className="space-y-5">
            {Object.entries(data.categoryScores).map(([cat, score]) => (
              <div key={cat}>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-700">{cat}</span>
                  <span className="text-slate-900">{score}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Priority Matrix (Simplified) */}
        <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Priority Matrix</h3>
          <div className="grid grid-cols-2 grid-rows-2 gap-2 h-48 relative">
            {/* Y axis label */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-bold tracking-widest text-slate-400 uppercase">Impact</div>
            {/* X axis label */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-widest text-slate-400 uppercase">Effort</div>

            <div className="bg-amber-100/50 border border-amber-200 rounded p-2 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-amber-700 opacity-50">Quick Wins</span>
              <div className="flex flex-wrap gap-1">
                {data.investments.filter(i => i.priority === 'HIGH' && i.implementationEffort === 'Low').map((_, idx) => (
                  <div key={idx} className="w-2 h-2 rounded-full bg-amber-500"></div>
                ))}
              </div>
            </div>
            <div className="bg-red-100/50 border border-red-200 rounded p-2 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-red-700 opacity-50">Strategic</span>
              <div className="flex flex-wrap gap-1">
                {data.investments.filter(i => i.priority === 'HIGH' && i.implementationEffort !== 'Low').map((_, idx) => (
                  <div key={idx} className="w-2 h-2 rounded-full bg-red-500"></div>
                ))}
              </div>
            </div>
            <div className="bg-slate-100/50 border border-slate-200 rounded p-2 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-500 opacity-50">Low Priority</span>
            </div>
            <div className="bg-blue-100/50 border border-blue-200 rounded p-2 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-blue-700 opacity-50">Long Term</span>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Summary Cards */}
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">ROI Projections</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="border border-slate-200 rounded-lg p-4 text-center">
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Total Investments</p>
          <p className="text-2xl font-black text-slate-900">{data.investments.length}</p>
        </div>
        <div className="border border-slate-200 rounded-lg p-4 text-center">
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Projected Score</p>
          <p className="text-2xl font-black text-emerald-600">
            {Math.min(100, data.trustScore + data.investments.reduce((sum, i) => sum + (i.trustScoreGain || 0), 0))}%
          </p>
        </div>
        <div className="border border-slate-200 rounded-lg p-4 text-center">
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Avg ROI Score</p>
          <p className="text-2xl font-black text-indigo-600">8.5x</p>
        </div>
        <div className="border border-slate-200 rounded-lg p-4 text-center">
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Timeline</p>
          <p className="text-2xl font-black text-slate-900">12 Wks</p>
        </div>
      </div>
    </div>
  );
}
